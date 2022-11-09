import React, { useState, useCallback, useContext } from "react"
import { Image, StyleSheet, ScrollView, ActivityIndicator, Text, View, TouchableHighlight } from 'react-native'
import Component from "../components"
import fn from '../application/services/functions.global'
import { AppContext } from '../application/provider';
import { useIsFocused, useFocusEffect } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'

const ImageProduct = ({ url }) => {
  return (
    <Image
      style={styles.logo}
      source={{ uri: url }}
    ></Image>
  )
}
const Detail = (props) => {
  const [state, setState] = useContext(AppContext)
  const [item, setItem] = useState({ Nombre: "", image: "", Precio: 0, Descripcion: "" });
  const isFocused = useIsFocused();
  const type = props.route.params.type;

  useFocusEffect(
    useCallback(() => {
      console.log(props.route.params.item)
      setItem(props.route.params.item)
      setState({ ...state, isLoading: false })
    }, [isFocused])
  );

  return (
    <>
      <Component.HeaderBar navigation={props.navigation} title="DETALLE PRODUCTO" showCart={true} showAdd={true} />
      <ScrollView style={styles.container}>
        {
          (state.isLoading)
            ?
            <ActivityIndicator  size="small" color="#3A3A3A"/>
            :
            <>
              <TouchableHighlight 
                onPress={() => props.navigation.navigate('catalog', { name: type })} 
                style={{ marginTop:5, paddingVertical: 5, backgroundColor: '#3A3A3A'}}
              >
                <View style={{ flexWrap: 'wrap', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                  <FontAwesomeIcon style={{ marginTop: 2}} icon={faAngleLeft} color="white" size={15} />
                  <Text style={{ color: 'white'}}>REGRESAR</Text>
                </View>
              </TouchableHighlight>
              <View style={{ justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{item.Nombre}</Text>
                <ImageProduct url={item.image} />
                <View style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 5}}>
                  <Text style={{ fontWeight: 'bold', fontSize: 15 }}>
                    {fn.formatAmount(item.Precio)}
                  </Text>
                  <Text style={{ fontStyle: 'italic', fontSize: 15 }}>
                    {item.Descripcion}
                  </Text>
                </View>
                <Component.ButtonAdd label="AGREGAR" item={item} />
              </View>
            </>
        }

      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  logo: {
    width: "90%",
    marginHorizontal: '5%',
    height: 450,
    resizeMode: "cover"
  },
});

export default Detail;