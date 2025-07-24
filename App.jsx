import 'react-native-gesture-handler';
import { PaperProvider } from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Login } from './src/views/Login';
import { Register } from './src/views/Register';
import { Proyectos } from './src/views/Proyectos';
import { NuevoProyecto } from './src/views/NuevoProyecto';

const Stack = createStackNavigator()

function App() {

  return (
    <>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName='Login'
          >
            <Stack.Screen
              name='Login'
              component={Login}
              options={{
                title: 'Iniciar Sesion',
                headerShown: false
              }}
            />
            <Stack.Screen
              name='Register'
              component={Register}
              options={{
                title: 'Crear Cuenta',
                headerStyle: {
                  backgroundColor: '#28303b'
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold'
                },
              }}
            />
            <Stack.Screen
              name='Proyectos'
              component={Proyectos}
              options={{
                title: 'Proyectos',
                headerStyle: {
                  backgroundColor: '#28303b'
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                  fontSize: 25
                },
                headerTitleAlign: 'center',
                headerLeft: () => null //Oculta el boton de retroceso
              }}
            />
            <Stack.Screen
              name='NuevoProyecto'
              component={NuevoProyecto}
              options={{
                title: 'Nuevo Proyecto',
                headerStyle: {
                  backgroundColor: '#28303b'
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold'
                },
                headerTitleAlign: 'center'
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </>
  );
}


export default App;
