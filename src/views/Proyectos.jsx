import React from 'react'
import { View } from 'react-native'
import { Button, Text } from 'react-native-paper'
import { globalStyles } from '../styles/global'
import { useNavigation } from '@react-navigation/native'

export const Proyectos = () => {

    // react navigation
    const navigation = useNavigation()
    
  return (
    < >
        <View style={[globalStyles.contenedor, {backgroundColor: '#f04d50ff'}]}>
            <Button
              mode='contained'
              icon={'plus'}
              buttonColor="#707070ff"
              textColor="#fff"
              labelStyle={{textTransform: 'uppercase', fontWeight: 'bold', fontSize: 16}}
              style={[globalStyles.button, {marginHorizontal: 30, marginTop: 30}]}
              rippleColor={"#5e5e5eff"}
              onPress={() =>navigation.navigate('NuevoProyecto')}
            >Nuevo Proyecto</Button>

            <Text
                variant='headlineMedium'
                style={globalStyles.subTitulo}
            >Selecciona un Proyecto</Text>
        </View>
    </>
  )
}
