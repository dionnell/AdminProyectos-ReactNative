import { Keyboard, TouchableWithoutFeedback, View } from "react-native"
import { Text, TextInput, Button, HelperText, Surface } from "react-native-paper"
import { globalStyles } from "../styles/global"
import { useState } from "react"
import { useNavigation } from "@react-navigation/native"
import AsyncStorage from "@react-native-async-storage/async-storage"

//Apollo 
import { gql, useMutation } from '@apollo/client'


const AUTENTICAR_USUARIO = gql`
  mutation AuthenticarUsuario($input: AutenticarInput) {
    authenticarUsuario(input: $input) {
      token
    }
  }
`

export const Login = () => {
  //State del formulario
  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  //State para mostrar/ocultar el password
  const [passVisible, setPassVisible] = useState(true)
  const [errorGraphQL, setErrorGraphQL] = useState({estado: false, message: ''})

  // react navigation
  const navigation = useNavigation()

  //Mutation de Apollo
  const [ authenticarUsuario ] = useMutation( AUTENTICAR_USUARIO)

  const handleSubmit = async() => {
    //Validar
    if(form.email === '' || form.password === ''){
      setErrorGraphQL({estado: true, message: 'Todos Los campos son obligatorios'})
      setTimeout(() => setErrorGraphQL({estado: false, message: ''}), 3000)
    }
    //Autenticar al usuario
    try {
      const {data} = await authenticarUsuario({
        variables: {
          input: {
            email: form.email,
            password: form.password
          }
        }
      })
      const {token} = data.authenticarUsuario
      //Guardar el token en AsyncSotrage
      await AsyncStorage.setItem('token', token)
      //Redireccionar a las tarteas
      navigation.navigate('Proyectos')
      
    } catch (error) {
      const { message} = error
      setErrorGraphQL({estado: true, message: message.replace('GraphQL error: ', '')})
      setTimeout(() => setErrorGraphQL({estado: false, message: ''}), 4000)
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
          <Text 
            variant='headlineMedium'
            style={[globalStyles.titulo, {marginBottom: 50}]}
          >UpTask</Text>
          <Surface 
            style={[globalStyles.contenido, globalStyles.surface]}
            elevation={5}
            mode='elevated'
          >
            <Text 
              variant='titleLarge' 
              style={globalStyles.titulo}
            >
              Iniciar Sesion
            </Text>

            {(errorGraphQL.estado) && <HelperText 
              type="error"
              visible={errorGraphQL.estado}
              style={{textAlign: 'center', marginBottom: 12, fontWeight: 'bold', fontSize: 10, marginTop: -10, color: '#fff' }}
            >
            *{errorGraphQL.message}  
            </HelperText>}

            <TextInput
              label='Email'
              mode='flat'
              style={[globalStyles.input, {marginBottom: 15}]}
              textColor="#000"
              underlineColor='#000'
              activeUnderlineColor="#000"
              underlineStyle= {{marginHorizontal: 6}}
              keyboardType='email-address'
              placeholder='correo@correo.com'
              onChangeText={text => setForm({...form, email: text})}
            />
            
            <TextInput
              label={'Password'}
              mode='flat'
              style={[globalStyles.input, {marginBottom: 15}]}
              textColor="#000"
              underlineColor="#000"
              activeUnderlineColor="#000"
              underlineStyle= {{marginHorizontal: 6}}
              secureTextEntry={passVisible}
              keyboardType="default"
              placeholder="Tu password"
              onChangeText={text => setForm({...form, password: text})}
              right={<TextInput.Icon 
                        icon={(passVisible === true) ? "eye" : "eye-off"}
                        onPress={() => setPassVisible(!passVisible)} 
                      />}
            />
            
            <Button
              mode='contained'
              buttonColor="#707070ff"
              textColor="#fff"
              labelStyle={{textTransform: 'uppercase', fontWeight: 'bold', fontSize: 16}}
              style={globalStyles.button}
              rippleColor={"#5e5e5eff"}
              onPress={() =>handleSubmit()}
            >Iniciar sesion</Button>
            <Text 
              variant='bodyMedium' 
              style={globalStyles.enlace}
              onPress={() => navigation.navigate('Register')}
            >
              ¿No tienes Cuenta?
            </Text>

          </Surface>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

