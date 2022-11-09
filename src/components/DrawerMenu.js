import React, { useContext } from 'react'
import { TouchableHighlight, View, Text, StyleSheet, Image } from 'react-native'
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { AppContext } from '../application/provider';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHome, faReceipt, faFileInvoice, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
var img = require('../application/images/logocolor.png')

export default DrawerMenu = (props) => {
    const [ state, setState ] = useContext(AppContext);

    return (
        <DrawerContentScrollView {...props}>
            <View style={styles.container}>
                <View style={styles.containerTitle}>
                    <Image style={styles.logo} source={img} resizeMode="contain" alt="icono" />
                    <Text style={styles.text}>FLOREA APP</Text>
                    <Text style={styles.text}>{state.name}</Text>
                </View>
                <View style={styles.containerBody}>
                    <TouchableHighlight underlayColor="#979797" style={styles.button} onPress={() => props.navigation.navigate("home") }>
                        <View style={{ flexDirection: 'row' }}>
                            <FontAwesomeIcon style={styles.icon} icon={ faHome } size="20"/>
                            <Text style={styles.text}>INICIO</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight underlayColor="#979797" style={styles.button} onPress={() => props.navigation.navigate("paymentAccount") }>
                        <View style={{ flexDirection: 'row' }}>
                            <FontAwesomeIcon style={styles.icon} icon={ faReceipt } size="20"/>
                            <Text style={styles.text}>CUENTAS X COBRAR</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight underlayColor="#979797" style={styles.button} onPress={() => props.navigation.navigate("stateAccount") }>
                        <View style={{ flexDirection: 'row' }}>
                            <FontAwesomeIcon style={styles.icon} icon={ faFileInvoice } size="20"/>
                            <Text style={styles.text}>ESTADO DE CUENTA</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight underlayColor="#979797" style={styles.button} onPress={() => props.navigation.navigate("login") }>
                        <View style={{ flexDirection: 'row' }}>
                            <FontAwesomeIcon style={styles.icon} icon={ faSignOutAlt } size="20"/>
                            <Text style={styles.text}>SALIR</Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </View>
        </DrawerContentScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20
    },
    logo: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 70,
        height: 70,
        paddingVertical: 20
    },
    containerTitle:{
        width: '100%', 
        height: 180, 
        alignItems: 'center'
    },
    containerBody:{
        width: '100%'
    },
    button: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginRight: 15,
        marginVertical: 10
    },
    text: {
        color: '#3A3A3A',
        fontWeight: "bold",
        fontSize: 15
    },
    icon:{
        color: "#3A3A3A",
        marginHorizontal: 15
    }
});