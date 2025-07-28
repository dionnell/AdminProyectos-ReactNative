import React, { useState } from 'react'
import { Alert, FlatList, View } from 'react-native'
import { Button, Text, List, Portal, Modal, IconButton } from 'react-native-paper'
import { globalStyles } from '../styles/global'
import { useNavigation } from '@react-navigation/native'
import { gql, useMutation, useQuery } from '@apollo/client'
import { NuevoProyecto } from './NuevoProyecto'
import { ActualizarProyecto  } from './ActualizarProyecto'


const OBTENER_PROYECTOS = gql`
  query obtenerProyectos {
    obtenerProyectos {
      id
      nombre
    }
  }
`
const ELIMINAR_PROYECTO = gql`mutation EliminarProyecto($eliminarProyectoId: ID!) {
  eliminarProyecto(id: $eliminarProyectoId)
}`

export const Proyectos = () => {
  //State para el modal
  const [visible, setVisible] = useState(false)
  const [visibleAct, setVisibleAct] = useState(false)
 
  // react navigation
  const navigation = useNavigation()

  //Apollo query
  const {data, loading, error, refetch} = useQuery(OBTENER_PROYECTOS, {
    fetchPolicy: 'network-only',
  })
  
  //Mutation de Apollo
  const [ eliminarProyecto ] = useMutation(ELIMINAR_PROYECTO)
  
  //eliminar un Proyecto
  const confirmarEliminacion = (id) => {
    Alert.alert(
      '¿Desea Eliminar este Proyecto?',
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
              await eliminarProyecto({
              variables: {
                eliminarProyectoId: id
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

  return (
    < >
        <Portal>
          <Modal visible={visible} onDismiss={() => setVisible(false)} >
            <NuevoProyecto setVisible={setVisible} refetch={refetch}/>
          </Modal>
        </Portal>
        
        <View style={[globalStyles.contenedor, {backgroundColor: '#f04d50ff'}]}>
            <Button
              mode='contained'
              icon={'plus'}
              buttonColor="#707070ff"
              textColor="#fff"
              labelStyle={{textTransform: 'uppercase', fontWeight: 'bold', fontSize: 16}}
              style={[globalStyles.button, {marginHorizontal: 30, marginTop: 30}]}
              rippleColor={"#5e5e5eff"}
              onPress={() => setVisible(true) }
            >Nuevo Proyecto</Button>

            <Text
                variant='headlineMedium'
                style={globalStyles.subTitulo}
            >Selecciona un Proyecto</Text>

            {loading ? <Text variant='headlineMedium'>...Cargando</Text> :
              <>
                <View style={globalStyles.contenido}>
                  <FlatList
                    data={data.obtenerProyectos}
                    contentContainerStyle={{backgroundColor:'#f04d50ff'}}
                    keyExtractor={proyecto => proyecto.id}
                    renderItem={({item}) => {
                      return (
                        <>
                          <Portal>
                            <Modal visible={visibleAct} onDismiss={() => setVisibleAct(false)} >
                              <ActualizarProyecto setVisibleAct={setVisibleAct} refetch={refetch} nombre={item.nombre} id={item.id}/>
                            </Modal>
                          </Portal>
                          <View style={[globalStyles.contenedorRow, {backgroundColor:'#f04d50ff', marginBottom: 3}]}>
                            <View style={[globalStyles.itemLeft, {borderTopLeftRadius: 15, borderBottomLeftRadius: 15}]}>
                              <IconButton
                                icon='pencil'
                                size={25}
                                iconColor='#3223ffff'
                                style={{marginVertical:'auto'}}
                                onPress={() => setVisibleAct(true)}
                              />
                            </View>
                            <View style={globalStyles.itemCenter}>
                              <List.Item
                                title={item.nombre}
                                titleNumberOfLines={2}
                                onPress={() => navigation.navigate('Proyecto', item)}
                                style={{backgroundColor: '#fff'}}
                                titleStyle={{color: '#000', fontSize: 20, fontWeight: 'bold', textAlign: 'left'}}
                              />
                            </View>
                            <View style={[globalStyles.itemRigth, {borderTopEndRadius: 15, borderBottomRightRadius: 15}]}>
                              <IconButton
                                icon='trash-can'
                                size={25}
                                iconColor='#ff0c0c'
                                style={{marginVertical:'auto'}}
                                onPress={() => confirmarEliminacion(item.id)}
                              />
                            </View>
                          </View>
                        </>
                      )
                    }}
                  />
                </View>
              </>
            }
        </View>
    </>
  )
}
