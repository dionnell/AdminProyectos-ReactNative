import {ApolloClient, InMemoryCache, HttpLink} from '@apollo/client'

export const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
        uri: 'http://192.168.0.2:4000/'
    })
})