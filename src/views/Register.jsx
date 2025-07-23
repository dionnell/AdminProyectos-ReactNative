import { useNavigation } from "@react-navigation/native"
import { useState } from "react"
import { Keyboard, TouchableWithoutFeedback, View } from "react-native"
import { globalStyles } from "../styles/global"
import { Button, HelperText, Text, TextInput } from "react-native-paper"

//Apollo 
import { gql, useMutation } from '@apollo/client'

const CREAR_USUARIO = gql`
  mutation CrearUsuario($input: UsuarioInput) {
    crearUsuario(input: $input)
  }
`

export const Register = () => {
  //State del formulario
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    password: ''
  })

  //manejo de errores
  const [error, setError] = useState(false)
  const hasErrorNombre = () => {
    return (form.nombre.length <= 3 && form.nombre.length > 0) ? true : false
  }
  const hasErrorsEmail = () => {
    return (!form.email.includes('@') && form.email.length > 0) ? true : false
  }
  const hasErrorPassword = () => {
    return (form.password.length < 6 && form.password.length > 0) ? true : false
  }

  //State para mostrar/ocultar el password
  const [passVisible, setPassVisible] = useState(true)
  // react navigation
  const navigation = useNavigation()

  //Mutation de Apollo
  const [ crearUsuario ] = useMutation( CREAR_USUARIO)

  //funcion para manehar el submit del formulario
  const handleSubmit = async() => {
    //Validar
    if(form.nombre === '' || form.email === '' || form.password === ''){
      setError(true)
      setTimeout(() => setError(false), 3000)
      return
    }

    if(hasErrorNombre() || hasErrorsEmail() || hasErrorPassword()){
      return
    }

    //Guardar el usuario en la BD
    try {
      const { data } = await crearUsuario({
        variables: {
          input: {
            nombre: form.nombre,
            email: form.email,
            password: form.password
          }
        }
      })
      console.log(data)
    } catch (error) {
      console.log(error)
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
      <View style={[globalStyles.contenedor, {backgroundColor: '#e84347'}]}>
        <View style={[globalStyles.contenido, {flex:0}]}>
          <Text
            variant='titleLarge'
            style={[globalStyles.titulo, {marginBottom: 70, marginTop: 50}]}
          >UpTask</Text>
          <View style={[globalStyles.contenido, {marginHorizontal: '5%', flex: 0}]}>
            <Text 
              variant='titleLarge' 
              style={globalStyles.titulo}
            >
              Crear Cuenta
            </Text>
            {(error) && <HelperText 
              type="error"
              visible={error}
              style={{textAlign: 'center', marginBottom: 10, fontWeight: 'bold', fontSize: 12, marginTop: -10, color: '#fff' }}
            >
            *Todos los campos son obligatorios  
            </HelperText>}

            <TextInput
              label='Nombre'
              mode='flat'
              style={[globalStyles.input]}
              textColor="#000"
              underlineColor='#000'
              activeUnderlineColor="#000"
              keyboardType='default'
              placeholder='Nombre de usuario'
              onChangeText={text => setForm({...form, nombre: text})}
            />
            {(hasErrorNombre) && <HelperText 
              type="error"
              visible={hasErrorNombre()}
              style={{marginBottom: 10, fontWeight: 'bold', fontSize: 12, marginTop: -10, color: '#fff' }}
            >
            *El nombre debe ser mayor a 3 caracteres  
            </HelperText>}

            <TextInput
              label='Email'
              mode='flat'
              style={[globalStyles.input]}
              textColor="#000"
              underlineColor='#000'
              activeUnderlineColor="#000"
              keyboardType='email-address'
              placeholder='correo@correo.com'
              onChangeText={text => setForm({...form, email: text})}
            />
            {(hasErrorsEmail) && <HelperText 
              type="error"
              visible={hasErrorsEmail()}
              style={{marginBottom: 10, fontWeight: 'bold', fontSize: 12, marginTop: -10, color: '#fff' }}
            >
            *El email es invalido  
            </HelperText>}

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
              onChangeText={text => setForm({...form, password: text})}
              right={<TextInput.Icon 
                        icon={(passVisible === true) ? "eye" : "eye-off"}
                        onPress={() => setPassVisible(!passVisible)} 
                      />}
            />
            {(hasErrorPassword) && <HelperText 
              type="error"
              visible={hasErrorPassword()}
              style={{marginBottom: 10, fontWeight: 'bold', fontSize: 12, marginTop: -10, color: '#fff' }}
            >
            *El password debe tener al menos 6 caracteres  
            </HelperText>}
            <Button
              mode='contained'
              buttonColor="#28303b"
              textColor="#fff"
              labelStyle={{textTransform: 'uppercase', fontWeight: 'bold', fontSize: 16}}
              style={globalStyles.button}
              rippleColor={"#2f363fff"}
              disabled={(hasErrorNombre() || hasErrorsEmail() || hasErrorPassword()) ? true : false }
              onPress={() => handleSubmit()}
            >Crear Cuenta</Button>

          </View>
          
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}
