import { Alert, FlatList, Keyboard, TouchableWithoutFeedback, View } from "react-native"
import { Button, HelperText, IconButton, List, Surface, Text, TextInput } from "react-native-paper"
import { globalStyles } from "../styles/global"
import { useState } from "react"

//Apollo 
import { gql, useMutation, useQuery } from '@apollo/client'

//Mutatiom
const CREAR_TAREA = gql`
  mutation CrearTarea($input: TareaInput) {
    crearTarea(input: $input) {
        estado
        id
        nombre
        proyecto
    }
  }
`

const ELIMINAR_TAREAS = gql`
    mutation EliminarTarea($eliminarTareaId: ID!) {
        eliminarTarea(id: $eliminarTareaId)
    }
`

//Query
const OBTENER_TAREAS = gql`
    query obtenerTareas($input: ProyectoIDInput) {
      obtenerTareas(input: $input) {
        estado
        id
        nombre
      }
    }
`


export const Proyecto = ({route}) => {

    //State del formulario
    const [nombre, setNombre] = useState('')

    //manejo de errores
    const [errorQL, setErrorQL] = useState({estado: false, message: ''})
    const hasErrorNombre = () => {
        return (nombre.length <= 3 && nombre.length > 0) ? true : false
    }
  
    //Mutation de Apollo
    const [ crearTarea ] = useMutation( CREAR_TAREA)
    const [ eliminarTarea ] = useMutation( ELIMINAR_TAREAS)

    //Apollo query
    const {data, loading, error, refetch} = useQuery(OBTENER_TAREAS, {
        variables: {
            input: {
                proyecto: route.params.id,
            }
        }
    })

    const handleSubmit = async() => {
        //Validar
        if(nombre === ''){
            setErrorQL({estado: true, message: 'Todos Los campos son obligatorios'})
            setTimeout(() => setErrorQL({estado: false, message: ''}), 3000)
            return
        }
        if(hasErrorNombre()){
            return
        }

        //Guardar el proyecto en la BD
        try {
          await crearTarea({
            variables: {
              input: {
                nombre,
                proyecto: route.params.id,
              }
            }
          })
          setNombre('')
          Keyboard.dismiss()
          refetch()

        } catch (error) {
          const { message} = error
          console.log(error)
          setErrorQL({estado: true, message: message.replace('GraphQL error: ', '')})
          setTimeout(() => setErrorQL({estado: false, message: ''}), 4000)
        }
    } 

    const confirmarEliminacion = (id) => {
        Alert.alert(
          '¿Desea Eliminar esta Tarea?',
          'Una vez eliminado no se puede recuperar',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'Confirmar',
              onPress: async() => {
                try {
                  await eliminarTarea({
                  variables: {
                    eliminarTareaId: id
                  }
                  })
                  refetch() 
    
                } catch (error) {
                  console.log(error)
                }
                
    
              }
            }
          ]
        )
    }

    //Ocultar teclado al tocar fuera del input
    const ocultarTeclado = () => {
      Keyboard.dismiss()
    }

  return (
    <TouchableWithoutFeedback 
        onPress={() => ocultarTeclado()}
    >
        <View style={[globalStyles.contenedor, {backgroundColor: '#f04d50ff'}]}>
            <View style={[globalStyles.contenido, {justifyContent:'flex-start'}]}>
                <Surface 
                    style={[globalStyles.contenido, globalStyles.surface, {height: 180, marginTop: 10}]}
                    elevation={5}
                    mode='elevated'
                >
                    <TextInput
                      label='Nombre de la Tarea'
                      mode='flat'
                      style={[globalStyles.input, {marginBottom: 10}]}
                      textColor="#000"
                      underlineColor='#000'
                      activeUnderlineColor="#000"
                      underlineStyle= {{marginHorizontal: 6}}
                      keyboardType='default'
                      placeholder='Nombre'
                      value={nombre}
                      onChangeText={text => setNombre(text)}
                    />
                    {(errorQL.estado) && <HelperText
                          type="error"
                          visible={errorQL.estado}
                          style={{marginBottom: -18, fontWeight: 'bold', fontSize: 10, marginTop: -10, color: '#fff' }}
                        >
                        *{errorQL.message} 
                        </HelperText>
                    }
                    {(hasErrorNombre) && <HelperText
                          type="error"
                          visible={hasErrorNombre()}
                          style={{marginBottom: 5, fontWeight: 'bold', fontSize: 10, marginTop: -10, color: '#fff' }}
                        >
                        *El nombre debe ser mayor a 3 caracteres  
                        </HelperText>
                    }
                    <Button
                      mode='contained'
                      buttonColor="#707070ff"
                      textColor="#fff"
                      labelStyle={{textTransform: 'uppercase', fontWeight: 'bold', fontSize: 16}}
                      style={globalStyles.button}
                      rippleColor={"#5e5e5eff"}
                      disabled={hasErrorNombre() ? true : false}
                      onPress={() =>handleSubmit()}
                    >Crear Tarea</Button>
                </Surface>

                <Text variant='displayMedium' style={[globalStyles.subTitulo, {marginTop: -5}]}>
                    Tareas: {route.params.nombre}
                </Text>
                
                {loading ? <Text variant='headlineMedium'>...Cargando</Text> :
                  <>
                    <View style={{height: 'auto', maxHeight: 380}}>
                      <FlatList
                        data={data.obtenerTareas}
                        contentContainerStyle={{backgroundColor:'#f04d50ff', borderRadius: 15, overflow: 'scroll'}}
                        keyExtractor={proyecto => proyecto.id}
                        overScrollMode='auto'
                        renderItem={({item}) => {
                          return (
                            <>
                              <List.Item
                                title={item.nombre}
                                titleNumberOfLines={2}
                                onPress={console.log()}
                                style={{backgroundColor: '#fff', marginVertical: 1, paddingHorizontal: 5, height: 100, borderRadius: 15}}
                                titleStyle={{color: '#000', fontSize: 20, fontWeight: 'bold', textAlign: 'center', width: 150}}
                                right={props => 
                                        <View style={[globalStyles.contenido, {alignContent: 'center'}]}>
                                            <IconButton
                                                icon='check'
                                                size={30}
                                                iconColor='#ff0c0c'
                                                style={{borderWidth: 1}}
                                                onPress={() => confirmarEliminacion(item.id)}
                                            />
                                        </View>}
                                left={props =>  
                                        <View style={[globalStyles.contenido, {marginHorizontal: 0, height: 90, marginTop: -8}]}>
                                            <IconButton
                                                icon='pencil'
                                                size={20}
                                                iconColor='#3223ffff'
                                                style={{borderWidth:1}}
                                                onPress={console.log()}
                                            />
                                            <IconButton
                                                icon='trash-can'
                                                size={20}
                                                iconColor='#ff0c0c'
                                                style={{borderWidth:1}}
                                                onPress={() => confirmarEliminacion(item.id)}
                                            />
                                        </View>}
                              />
                            </>
                          )
                        }}
                      />
                    </View>
                  </>
                }
            </View>
        </View>
    </TouchableWithoutFeedback>
  )
}
