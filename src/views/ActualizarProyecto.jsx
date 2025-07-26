import { Keyboard, TouchableWithoutFeedback, View } from "react-native"
import { Button, HelperText, Surface, Text, TextInput } from "react-native-paper"
import { globalStyles } from "../styles/global"
import { useState } from "react"
//import { useNavigation } from "@react-navigation/native"

//Apollo 
import { gql, useMutation } from '@apollo/client'

const ACTUALIZAR_PROYECTO = gql`
  mutation ActualizarProyecto($actualizarProyectoId: ID!, $input: ProyectoInput) {
    actualizarProyecto(id: $actualizarProyectoId, input: $input) {
      id
      nombre
    }
}
`

export const ActualizarProyecto = ({setVisibleAct, refetch, nombre, id}) => {
    //State del formulario
    const [nombreAct, setNombreAct] = useState(nombre)

    //manejo de errores
    const [error, setError] = useState({estado: false, message: ''})
    const hasErrorNombre = () => {
        return (nombre.length <= 3 && nombre.length > 0) ? true : false
    }

    //react navigation 
    //const navigation = useNavigation()
    
    //Mutation de Apollo
    const [ actualizarProyecto ] = useMutation( ACTUALIZAR_PROYECTO)
    

    const handleSubmit = async() => {
        //Validar
        if(nombre === ''){
            setError({estado: true, message: 'Todos Los campos son obligatorios'})
            setTimeout(() => setError({estado: false, message: ''}), 3000)
            return
        }
        if(hasErrorNombre()){
            return
        }

        //Guardar el proyecto en la BD
        try {
          await actualizarProyecto({
            variables: {
                actualizarProyectoId: id,
              input: {
                nombre: nombreAct,
              }
            }
          })
          //navigation.navigate('Proyectos')

          setVisibleAct(false)
          refetch()//Refrescar la lista de proyectos

        } catch (error) {
          const { message} = error
          console.log(error)
          setError({estado: true, message: message.replace('GraphQL error: ', '')})
          setTimeout(() => setError({estado: false, message: ''}), 4000)
        }
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
            <View style={[globalStyles.contenido, {alignContent: 'space-between'}]}>
                <Surface 
                    style={[globalStyles.contenido, globalStyles.surface, {height: 280}]}
                    elevation={5}
                    mode='elevated'
                >
                    <Text
                        variant='headlineMedium'
                        style={globalStyles.subTitulo}
                    >Actualizar nombre Proyecto</Text>

                    {(error.estado) && <HelperText
                          type="error"
                          visible={error.estado}
                          style={{marginBottom: -18, fontWeight: 'bold', fontSize: 10, marginTop: -10, color: '#fff' }}
                        >
                        *{error.message} 
                        </HelperText>
                    }
                    {(hasErrorNombre) && <HelperText
                          type="error"
                          visible={hasErrorNombre()}
                          style={{marginBottom: 10, fontWeight: 'bold', fontSize: 10, marginTop: -10, color: '#fff' }}
                        >
                        *El nombre debe ser mayor a 3 caracteres  
                        </HelperText>
                    }

                    <TextInput
                      label='Nombre del Proyecto'
                      mode='flat'
                      style={[globalStyles.input, {marginBottom: 15}]}
                      textColor="#000"
                      underlineColor='#000'
                      activeUnderlineColor="#000"
                      underlineStyle= {{marginHorizontal: 6}}
                      keyboardType='default'
                      placeholder='Nombre'
                      value={nombreAct}
                      onChangeText={text => setNombreAct(text)}
                    />
                    <Button
                      mode='contained'
                      buttonColor="#707070ff"
                      textColor="#fff"
                      labelStyle={{textTransform: 'uppercase', fontWeight: 'bold', fontSize: 16}}
                      style={globalStyles.button}
                      rippleColor={"#5e5e5eff"}
                      disabled={hasErrorNombre() ? true : false}
                      onPress={() =>handleSubmit()}
                    >Actualizar Proyecto</Button>
                </Surface>
            </View>

        </View>
    </TouchableWithoutFeedback>
  )
}
