import React, { useEffect, useState } from 'react'
import { AsyncStorage, TouchableHighlight, View, Text, KeyboardAvoidingView } from 'react-native'
//import { AsyncStorage } from '@react-native-async-storage/async-storage'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import Button from "./Button"
import FormInput from "./FormInput"

export default ModalAdd = ({ onPressClose, handleAddCart, handleSetNote, itemAdd, handleSetLabel, isLoading, size = "md" }) => {
    const styles = {
        viewPanel: {
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            position: 'absolute'
        },
        container: {
            flex: 1,
            marginTop: (size === 'sm' ? '25%' : (size === 'md' ? '15%' : '2%')),
            marginBottom: (size === 'sm' ? '100%' : (size === 'md' ? '100%' : '2%')),
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
                        <Text style={styles.textHeader}>ARTICULO {itemAdd.Nombre}</Text>
                        <TouchableHighlight style={styles.close} onPress={onPressClose}><FontAwesomeIcon icon={faTimes} color="white" size={15} /></TouchableHighlight>
                    </View>

                    <View style={styles.body}>

                        <FormInput s={12} text="BANDA" h={100} multiline={true} value={itemAdd.label} onChangeText={(value) => handleSetLabel(value)} />
                        <FormInput s={12} text="NOTA" h={100} multiline={true} value={itemAdd.note} onChangeText={(value) => handleSetNote(value)} />

                    </View>
                    <View style={styles.footer}>
                        <Button
                            text="AGREGAR AL PEDIDO"
                            loading={isLoading}
                            onPress={handleAddCart}
                        />
                    </View>

                </View>
            </View>
    )
}
