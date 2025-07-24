import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
    contenedor: {
        flex: 1
    },
    contenedorRow: {
        flexDirection: 'row', 
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        marginVertical: 2,
    },
    contenido: {
        flexDirection: 'column',
        justifyContent: 'center',
        marginHorizontal: '2.5%',
        flex: 1
    },
    titulo: {
        textAlign: 'center',
        marginBottom: 25,
        fontSize: 32,
        fontWeight: 'bold',
        color: '#fff'
    },
    input: {
        backgroundColor: '#fff',
        marginBottom: 8,
        borderRadius: 10
    },
    button: {
        marginVertical: 10,
        paddingVertical: 3,
        borderRadius: 20,
    },
    enlace: {
        color: '#fff',
        marginTop: 60,
        textAlign: 'center',
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        fontSize: 16,
        textTransform: 'uppercase'
    },
    surface: {
    marginHorizontal: '5%', 
    flex: 0, 
    borderRadius: 15, 
    backgroundColor: '#28303b', 
    padding: 20, 
    marginBottom: 20,
    paddingVertical: 25
  }
    
})