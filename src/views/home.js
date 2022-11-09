import React, { useCallback, useContext } from "react"
import { Image, StyleSheet, Text, ScrollView, View, TouchableHighlight } from 'react-native'
import Component from "../components"
import { AppContext } from '../application/provider';
var img = require('../application/images/logowhite.png')
import { useIsFocused } from '@react-navigation/native';

const Home = (props) => {
  const [state, setState] = useContext(AppContext)
  const isFocused = useIsFocused();
  React.useEffect(() => {
    setState({ ...state, isLoading: false})
  }, [isFocused])

  const handleType = (type) => {
    setState({ ...state, type: type });
    props.navigation.navigate('catalog', { name: type });
  }

  return (
    <>
      <Component.HeaderBar navigation={props.navigation} title="FLOREA APP" showCart={false} showAdd={false} />
      <ScrollView style={styles.container}>
        <View>
          <TouchableHighlight style={styles.buttonA} onPress={() => handleType("CATALOGO FUNERARIO")}>
            <View style={{ alignItems: 'center'}}>
              <Image style={{ width: 50, height: 50, resizeMode: 'contain' }} source={img} alt="Arreglos Funerarios" />
              <Text style={styles.text}>ARREGLOS FUNERARIOS</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight style={styles.buttonB} onPress={() => handleType("CATALOGO EXTERNO")}>
            <View style={{ alignItems: 'center'}}>
              <Image style={{ width: 50, height: 50, resizeMode: 'contain' }} source={img} alt="Arreglos Externo" />
              <Text style={styles.text}>ARREGLOS EXTERNO</Text>
            </View>
          </TouchableHighlight>
        </View>
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  buttonA:{
    height: 150,
    marginHorizontal: 20,
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00B226'
  },
  buttonB:{
    height: 150,
    marginHorizontal: 20,
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00A6B0'
  },
  text:{
    color: 'white',
    fontWeight: "bold",
    fontSize: 20
  }
});

export default Home;