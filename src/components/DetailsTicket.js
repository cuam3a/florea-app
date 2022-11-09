import React from 'react'
import { Text, View, Modal, TouchableHighlight, ScrollView } from 'react-native'
import fn from '../application/services/functions.global'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

export default DetailsTicket = ({ item, onPressClose }) => {
    const styles = {
      viewPanel: {
        flex: 1,
        backgroundColor: '#00000009',
      },
      container: {
        flex: 1,
        marginTop: 100,
        marginBottom: 100,
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
        flexDirection: 'row',
  
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
        <ScrollView style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.textHeader}>PEDIDO # {item.id}</Text>
            <TouchableHighlight underlayColor="#979797" style={styles.close} onPress={onPressClose}><FontAwesomeIcon icon={faTimes} color="white" size={15} /></TouchableHighlight>
          </View>
          <View style={styles.body}>
            <View style={{ flex: 1, flexWrap: 'wrap', flexDirection: "row", paddingHorizontal: 5 }}>
              <Text style={{ width: "20%", marginVertical: 5, fontWeight: "bold", fontSize: 12 }}>CLIENTE:</Text>
              <Text style={{ width: "80%", marginTop: 3, fontSize: 12 }}>{item.name}</Text>
              <Text style={{ width: "20%", marginVertical: 5, fontWeight: "bold", fontSize: 12 }}>FINADO:</Text>
              <Text style={{ width: "80%", marginTop: 3, fontSize: 12 }}>{item.deceased}</Text>
              <Text style={{ width: "20%", marginVertical: 5, fontWeight: "bold", fontSize: 12 }}>TELEFONO:</Text>
              <Text style={{ width: "30%", marginTop: 3, fontSize: 12 }}>{item.phone}</Text>
              <Text style={{ width: "20%", marginVertical: 5, fontWeight: "bold", fontSize: 12 }}>FECHA ENTREGA:</Text>
              <Text style={{ width: "30%", marginTop: 3, fontSize: 12 }}>{item.date + " " + item.time}</Text>
              <Text style={{ width: "20%", marginVertical: 5, fontWeight: "bold", fontSize: 12 }}>LUGAR ENTREGA:</Text>
              <Text style={{ width: "80%", marginTop: 3, fontSize: 12 }}>{item.address}</Text>
              <Text style={{ width: "20%", marginVertical: 5, fontWeight: "bold", fontSize: 12 }}>NOTA ENTREGA:</Text>
              <Text style={{ width: "80%", marginTop: 3, fontSize: 12 }}>{item.delivery}</Text>
              <Text style={{ width: "20%", marginVertical: 5, fontWeight: "bold", fontSize: 12 }}>VENDEDOR:</Text>
              <Text style={{ width: "80%", marginTop: 3, fontSize: 12 }}>{item.salesName}</Text>
  
              <Text style={{ width: "100%", marginVertical: 5, fontWeight: "bold", fontSize: 12 }}>ARTICULOS:</Text>
              {
                item.cart.map(item => {
                  return (
                    <>
                      <View style={{ flexWrap: 'wrap', flexDirection: "row" }}>
                        <Text style={{ width: "70%", marginTop: 6, fontSize: 12 }}>{item.name}</Text>
                        <Text style={{ width: "30%", marginTop: 6, textAlign: "right", fontSize: 12 }}>{fn.formatAmount(item.price)}</Text>
                        {(item.label != "") ? <Text style={{ width: "30%", marginTop: 6, textAlign: "right", fontSize: 12 }}>ETIQUETA: {item.label}</Text> : <></>}
                        {(item.note != "") ? <Text style={{ width: "30%", marginTop: 6, textAlign: "right", fontSize: 12 }}>NOTA: {item.note}</Text> : <></>}
                      </View>
                    </>
                  )
                })
              }
  
              <Text style={{ width: "80%", marginVertical: 5, fontWeight: "bold", fontSize: 12, textAlign: 'right' }}>SUBTOTAL:</Text>
              <Text style={{ width: "20%", marginTop: 3, fontSize: 12, textAlign: 'right' }}>{fn.formatAmount(item.subtotal)}</Text>
              <Text style={{ width: "80%", marginVertical: 5, fontWeight: "bold", fontSize: 12, textAlign: 'right' }}>EXTRA:</Text>
              <Text style={{ width: "20%", marginTop: 3, fontSize: 12, textAlign: 'right' }}>{fn.formatAmount(item.extra)}</Text>
              <Text style={{ width: "80%", marginVertical: 5, fontWeight: "bold", fontSize: 12, textAlign: 'right' }}>DESCUENTO:</Text>
              <Text style={{ width: "20%", marginTop: 3, fontSize: 12, textAlign: 'right' }}>{fn.formatAmount(item.discount)}</Text>
              <Text style={{ width: "80%", marginVertical: 5, fontWeight: "bold", fontSize: 12, textAlign: 'right' }}>TOTAL:</Text>
              <Text style={{ width: "20%", marginTop: 3, fontSize: 12, textAlign: 'right' }}>{fn.formatAmount(item.subtotal + item.extra - item.discount)}</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }