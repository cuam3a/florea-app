import React, { useEffect, useState, useContext } from "react"
import { AsyncStorage, Alert, LogBox, View, StyleSheet, Text, Image, TouchableHighlight, Modal, KeyboardAvoidingView, ScrollView } from 'react-native';
//import { AsyncStorage } from '@react-native-async-storage/async-storage'
import Component from '../components'
import Service from '../application/services/api.service'
import { AppContext } from '../application/provider';
//import { BluetoothManager, BluetoothEscposPrinter, BluetoothTscPrinter } from "tp-react-native-bluetooth-printer";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPrint, faCog } from '@fortawesome/free-solid-svg-icons'
import BluetoothSerial from 'react-native-bluetooth-serial-next';

const Login = (props) => {
  const [data, setData] = useState({})
  const [showModal, setShowModal] = useState(false)
  const [state, setState] = useContext(AppContext)

  LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
  LogBox.ignoreAllLogs();//Ignore all log notifications

  useEffect(async () => {
    let print = await AsyncStorage.getItem('PRINT');

    const enabled = await BluetoothSerial.isEnabled();
    if (enabled) {
      BluetoothSerial.connect((print != null ? print.toString() : "00:00:00:00:00:00"))
        .then(
          async (s) => {
            Alert.alert(
              "IMPRESORA OK", "",
              [
                { text: "OK", onPress: () => console.log("OK Pressed") }
              ]
            );
          },
          (e) => {
            Alert.alert(
              "REVISAR IMPRESORA", "Impresora apagada, sin papel o direccion MAC incorrecta",
              [
                { text: "OK", onPress: () => console.log("OK Pressed") }
              ]
            );
          }
        );
    }
    else {
      Alert.alert(
        "REVISAR BLUETOOTH", "Bluetooth apagado",
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
      );
    }
  },[])

  const handlePrintTest = async () => {
    let print = await AsyncStorage.getItem('PRINT');
    console.log(print)
    BluetoothSerial.isConnected(print).then(async res => {
      if (!res) {
        await BluetoothSerial.connect(print).then(async res => {
          if (res) {
            await BluetoothSerial.write("\r\n\r\n", print)
            await BluetoothSerial.write("     PRUEBA, IMPRIMIENDO....\r\n", print)
            await BluetoothSerial.write("          FLOREA APP....\r\n", print)
            await BluetoothSerial.write("\r\n\r\n", print)
          }
        }).catch(err => console.log("ERROR 1 " + err));
      } else {

      }
    })
      .finally(() => BluetoothSerial.disconnect(print))
      .catch((err) => {

      });
    // BluetoothManager.connect(print)
    //   .then(
    //     async (s) => {
    //       console.log("ENTRO");

    //       await BluetoothEscposPrinter.printTexta("\r\n\r\n", {});
    //       await BluetoothEscposPrinter.printText("     PRUEBA, IMPRIMIENDO....\r\n", {});
    //       await BluetoothEscposPrinter.printText("          FLOREA APP....\r\n", {});
    //       await BluetoothEscposPrinter.printText("\r\n\r\n", {});
    //       //await BluetoothTscPrinter.printLabel(options)
    //       // .then(()=>{
    //       //   console.log("TEMINO")//success
    //       // },
    //       // (err)=>{
    //       //   console.log(err)
    //       // })
    //     },
    //     (e) => {
    //       Alert.alert(
    //         "REVISAR IMPRESORA", "Impresora apagada, sin papel o direccion MAC incorrecta",
    //         [
    //           { text: "OK", onPress: () => console.log("OK Pressed") }
    //         ]
    //       );
    //     }
    //   );
  }

  const handleSignIn = async () => {
    setState({ ...state, isLoading: true })
    let res = await Service.login(data);
    console.log(res)
    if (res.Error) {
      Alert.alert(
        "Error Servidor",
        res.Error,
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
      );
      setState({ ...state, isLoading: false })
    }
    if (res.Success) {
      setState({ ...state, isLoading: true, category: res.Categorias, product: res.Articulos, name: res.Usuario, sellers: res.Vendedores, id: res.idUsuario, addresses: res.Direcciones })
      props.navigation.navigate('home')
    }
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior='height'
      enabled={true}
    >
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={{ uri: 'https://hmo.corporativoreco.com:8099/Images/florea/logo.png' }}
          alt="FloreaApp"
          resizeMode="contain"
        />
        <View style={styles.form}>
          <View style={{ flexWrap: 'wrap', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}><Text style={styles.title} >FLOREA APP</Text><Text style={{ fontSize: 8, marginLeft: 5, marginTop: 10 }} >v1.7</Text></View>
          <Component.FormInput s={13} text="USUARIO" value={data.user} onChangeText={(value) => setData({ ...data, user: value })} />
          <Component.FormInput s={13} text="PASSWORD" password={true} value={data.password} onChangeText={(value) => setData({ ...data, password: value })} />
          <View style={styles.btnGroup}>
            <Component.Button
              text="ENTRAR"
              loading={state.isLoading}
              onPress={handleSignIn}
            />
          </View>
          <View style={styles.footer}>
            <TouchableHighlight style={{ marginRight: 20 }} onPress={() => setShowModal(true)}>
              <FontAwesomeIcon icon={faCog} color="gray" size={20} />
            </TouchableHighlight>
            <TouchableHighlight onPress={handlePrintTest} loading={state.loading}>
              <FontAwesomeIcon icon={faPrint} color="gray" size={20} />
            </TouchableHighlight>
          </View>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={showModal}
          onRequestClose={() => {
            setShowModal(false);
          }}
        >
          <Component.ModalConfig onPressClose={() => setShowModal(false)} />
        </Modal>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    //position: 'absolute',
    width: '100%',
    //height: '100%',
    //justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 20,
  },
  logo: {
    margin: '5%',
    width: '90%',
    //height: 200,
    height: '40%',
    flex: 1
  },
  form: {
    flex: 3
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: "bold",
    color: '#7E7E7E',
    marginBottom: 10
  },
  btnGroup: {
    marginTop: 20
  },
  btn: {
    marginHorizontal: 10,

  },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    //flex: 1,
    flexDirection: 'row'
  }
});

export default Login;
