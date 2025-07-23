import 'react-native-gesture-handler';
import { PaperProvider } from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Login } from './src/views/Login';
import { Register } from './src/views/Register';

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
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </>
  );
}


export default App;
