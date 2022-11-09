import React from "react";
import { ScrollView, TouchableHighlight, View, Text } from 'react-native'
import _ from 'lodash'
import fn from '../application/services/functions.global'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faTrash, faTimes } from '@fortawesome/free-solid-svg-icons'
import Button from "./Button"

const ModalCart = ({ list, handleDeleteItem, handlePayment, onPressClose, size = "lg", isLoading }) => {
  const styles = {
    viewPanel: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
    container: {
      flex: 1,
      marginTop: (size === 'sm' ? '25%' : (size === 'md' ? '15%' : '8%')),
      marginBottom: (size === 'sm' ? '100%' : (size === 'md' ? '100%' : '8%')),
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
    <>
      <View style={styles.viewPanel}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.textHeader}>LISTA ARTICULOS</Text>
            <TouchableHighlight style={styles.close} onPress={onPressClose}><FontAwesomeIcon icon={faTimes} color="white" size={15} /></TouchableHighlight>
          </View>
          <View style={styles.body}>
            <ScrollView style={{ height: '70%' }}>
              {
                (
                  ((_.filter(list, { "idState": 1 })).length > 0)
                    ?
                    list.map(item => {
                      return (
                        (item.idState === 1)
                          ?
                          <View style={{ borderBottomWidth: 0.2 }} key={item.index}>
                            <View style={{ flex: 1, flexWrap: 'wrap', flexDirection: 'row', marginTop: 5 }}>
                              <TouchableHighlight style={{ flex: 0.2 }} onPress={() => handleDeleteItem(item.index)}><FontAwesomeIcon icon={faTrash} color="red" size={15} /></TouchableHighlight>
                              <Text style={{ flex: 0.5 }}>{item.name}</Text>
                              <Text style={{ flex: 0.3, textAlign: 'right', marginRight: 5 }}>{fn.formatAmount(item.price)}</Text>

                            </View>
                            <View style={{ flex: 1 }}>
                              {(item.label != "") ? <Text style={{ marginLeft: 20 }}>BANDA: {item.label}</Text> : <></>}
                              {(item.note != "") ? <Text style={{ marginLeft: 20 }}>NOTA: {item.note}</Text> : <></>}
                            </View>
                          </View>
                          : <></>
                      )
                    })

                    : <Text width="100%" alignItems="center" bold>SIN ARTICULOS</Text>
                )
              }
            </ScrollView>
            {
              ((_.filter(list, { "idState": 1 })).length > 0)
                ?
                <View style={{ flex: 1, flexWrap: 'wrap', flexDirection: 'row' }}>
                  <Text style={{ flex: 0.7, fontWeight: 'bold' }}>TOTAL:</Text>
                  <Text style={{ flex: 0.3, textAlign: 'right', marginRight: 5, fontWeight: 'bold' }}>{fn.formatAmount(_.sumBy(_.filter(list, { "idState": 1 }), 'price'))}</Text>
                </View>
                : <></>
            }
          </View>
          <View style={styles.footer}>
            <Button
              text="IR A PAGAR"
              loading={isLoading}
              onPress={handlePayment}
            />
          </View>
        </View>
      </View>
    </>
  )
}

export default ModalCart;