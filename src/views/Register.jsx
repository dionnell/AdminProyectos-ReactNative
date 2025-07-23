import { View } from "react-native"
import { Text, TextInput, Button, HelperText } from "react-native-paper"
import { globalStyles } from "../styles/global"
import { useState } from "react"
import { useNavigation } from "@react-navigation/native"


export const Register = () => {
  const [passVisible, setPassVisible] = useState(true)
  const navigation = useNavigation()

  return (
    <>
      <View style={[globalStyles.contenedor, {backgroundColor: '#e84347'}]}>
        <View style={[globalStyles.contenido, {flex:0}]}>
          <Text 
            variant='titleLarge'
            style={[globalStyles.titulo, {marginBottom: 70, marginTop: 50}]}
          >UpTask</Text>
          <View style={[globalStyles.contenido, {marginHorizontal: '5%'}]}>
            <Text 
              variant='titleLarge' 
              style={[globalStyles.titulo, {marginBottom: 30}]}
            >
              Crear Cuenta
            </Text>
            <TextInput
              label='Nombre'
              mode='flat'
              style={[globalStyles.input]}
              textColor="#000"
              underlineColor='#000'
              activeUnderlineColor="#000"
              keyboardType='default'
              placeholder='nombre'
            />
              <HelperText 
                type="error"
                visible={false}
              >
                El nombre es obligatorio  
              </HelperText>

            <TextInput
              label='Email'
              mode='flat'
              style={[globalStyles.input]}
              textColor="#000"
              underlineColor='#000'
              activeUnderlineColor="#000"
              keyboardType='email-address'
              placeholder='correo@correo.com'
            />
              <HelperText 
                type="error"
                visible={false}
              >
                El email es obligatorio  
              </HelperText>

            <TextInput
              label={'Password'}
              mode='flat'
              style={globalStyles.input}
              textColor="#000"
              underlineColor="#000"
              activeUnderlineColor="#000"
              secureTextEntry={passVisible}
              keyboardType="default"
              placeholder="Tu password"
              right={<TextInput.Icon 
                        icon={(passVisible === true) ? "eye" : "eye-off"}
                        onPress={() => setPassVisible(!passVisible)} 
                      />}
            />
              <HelperText 
                type="error"
                visible={false}
              >
                El password es obligatorio  
              </HelperText>

            <Button
              mode='contained'
              buttonColor="#28303b"
              textColor="#fff"
              labelStyle={{textTransform: 'uppercase', fontWeight: 'bold', fontSize: 16}}
              style={globalStyles.button}
              rippleColor={"#2f363fff"}
              onPress={() => console.log('iniciar sesion')}
            >Crear Cuenta</Button>

          </View>
        </View>
      </View>
    </>
  )
}
