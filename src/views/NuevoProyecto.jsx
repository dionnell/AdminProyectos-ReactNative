import { Keyboard, TouchableWithoutFeedback, View } from "react-native"
import { Button, HelperText, Surface, Text, TextInput } from "react-native-paper"
import { globalStyles } from "../styles/global"
import { useState } from "react"


export const NuevoProyecto = () => {
    //State del formulario
    const [nombre, setNombre] = useState('')

    //manejo de errores
    const [error, setError] = useState({estado: false, message: ''})
    const hasErrorNombre = () => {
        return (nombre.length <= 3 && nombre.length > 0) ? true : false
    }

    const handleSubmit = () => {
        //Validar
        if(nombre === ''){
            setError({estado: true, message: 'Todos Los campos son obligatorios'})
            setTimeout(() => setError({estado: false, message: ''}), 3000)
            return
        }
        if(hasErrorNombre()){
            return
        }

        //Crear el proyecto
        console.log('')
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
                    style={[globalStyles.contenido, globalStyles.surface]}
                    elevation={5}
                    mode='elevated'
                >
                    <Text
                        variant='headlineMedium'
                        style={globalStyles.subTitulo}
                    >Nuevo Proyecto</Text>

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
                      onChangeText={text => setNombre(text)}
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
                    >Crear Proyecto</Button>
                </Surface>
            </View>

        </View>
    </TouchableWithoutFeedback>
  )
}
