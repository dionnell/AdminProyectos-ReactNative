import {ApolloClient, InMemoryCache, createHttpLink} from '@apollo/client'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { setContext } from 'apollo-link-context'

const HttpLink = createHttpLink({
    uri: 'http://192.168.0.2:4000/'
})

const authLink = setContext(async(_, {header}) => {
    //Obtener el token del localStorage
    const token = await AsyncStorage.getItem('token')
    //Retornar el header modificado
    return {
        headers: {
            ...header,
            authorization: token ? `Bearer ${token}` : ''
        }
    }

})

export const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(HttpLink)
})