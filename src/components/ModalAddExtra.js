import React, { useState } from "react";
import { ScrollView, TouchableHighlight, View, Text } from 'react-native'
import FormInput from "./FormInput"
import Button from "./Button"
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

const ModalAddExtra = ({ onPressClose, handleAddCartExtra, isLoading, size='lg' }) => {
  const [item, setItem] = useState({ name: "", label: "", note: "", price: 0, idState: 1 })
  const styles = {
    viewPanel: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      position: 'absolute'
    },
    container: {
      flex: 1,
      marginTop: (size === 'sm' ? '25%' : (size === 'md' ? '5%' : '2%')),
            marginBottom: (size === 'sm' ? '100%' : (size === 'md' ? '5%' : '2%')),
      marginLeft: 10,
      marginRight: 10,
      borderWidth: 1,
      backgroundColor: "white",
    },
    header: {
      backgroundColor: '#3A3A3A',
      color: 'white',
      height: 40,
      justifyContent: "center",
      flexDirection: 'row'
    },
    textHeader: {
      color: '#FFFFFF',
      fontWeight: "bold",
      width: '90%',
      textAlign: "center",
      marginTop: 10
    },
    close: {
      color: '#FFFFFF',
      fontWeight: "bold",
      width: '10%',
      textAlign: 'right',
      justifyContent: "center",
      alignItems: 'center'
    },
    body: {
      marginTop: 20
    },
    footer: {
      marginTop: 10
    }
  };

  return (
    <View style={styles.viewPanel}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.textHeader}>ARTICULO EXTRA</Text>
          <TouchableHighlight style={styles.close} onPress={onPressClose}><FontAwesomeIcon icon={faTimes} color="white" size={15} /></TouchableHighlight>
        </View>
        <View style={styles.body}>
          <FormInput s={12} text="NOMBRE" h={60} value={item.name} onChangeText={(value) => setItem({ ...item, name: value })} />
          <FormInput s={12} text="PRECIO" h={60} value={item.price} onChangeText={(value) => ((!isNaN(value)) ? setItem({ ...item, price: parseFloat(value) }) : setItem({ ...item, price: 0 }))} />
          <FormInput s={12} text="BANDA" h={100} multiline={true} value={item.label} onChangeText={(value) => setItem({ ...item, label: value })} />
          <FormInput s={12} text="NOTA" h={100} multiline={true} value={item.note} onChangeText={(value) => setItem({ ...item, note: value })} />
        </View>
        <View style={styles.footer}>
          <Button
            text="AGREGAR AL PEDIDO"
            loading={isLoading}
            onPress={() => handleAddCartExtra(item)}
          />
        </View>
      </View>
    </View>
  )
}

export default ModalAddExtra;