import React, { useEffect, useState } from "react";
import { ScrollView, TouchableHighlight, View, Text, ActivityIndicator, Switch, Alert } from 'react-native'
import _ from 'lodash'
import fn from '../application/services/functions.global'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faTrash, faTimes } from '@fortawesome/free-solid-svg-icons'
import FormInput from "./FormInput"
import Button from "./Button"
import Service from '../application/services/api.service'

const ModalSearch = ({ onPressClose, handleSelectAFN, size = 'lg' }) => {
  const [num, setNum] = useState("");
  const [name, setName] = useState("");
  const [list, setList] = useState([]);
  const [type, setType] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true)
    api()
  }, [])

  const api = async () => {
    let res = await Service.getServicesAFN(num, name);
    if (res.Error) {
      Alert.alert(
        "Error Servidor",
        res.Error,
        [
          { text: "OK", onPress: () => setIsLoading(false) }
        ]
      );
    }
    if (res.Success) {
      setList(res.ServiciosAFN)
      setIsLoading(false)
    }
    else {
      setIsLoading(false)
    }
  }

  const handleSearch = () => {
    setIsLoading(true)
    api()
  }

  const handleChange = () =>{
    if(type){
      setNum("");
      setType(!type);
    }else{
      setName("");
      setType(!type);
    }
  }

  const styles = {
    viewPanel: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      position: 'absolute'
    },
    container: {
      flex: 1,
      marginTop: (size === 'sm' ? '25%' : (size === 'md' ? '15%' : '8%')),
      marginBottom: (size === 'sm' ? '100%' : (size === 'md' ? '100%' : '100%')),
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
      marginTop: 20,
      height: '100%'
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
            <Text style={styles.textHeader}>SERVICIOS AFN</Text>
            <TouchableHighlight style={styles.close} onPress={onPressClose}><FontAwesomeIcon icon={faTimes} color="white" size={15} /></TouchableHighlight>
          </View>
          <View style={styles.body}>
            {
              (isLoading)
                ?
                <ActivityIndicator size="small" color="#3A3A3A" />
                :
                <View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
                  <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={type ? "#4BBCF5" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={handleChange}
                    value={type}
                    style={{ width: '20%' }}
                  />
                  <View style={{ width: '80%' }}>
                    {
                      (type)
                        ?
                        <FormInput s={12} text="FOLIO" value={num} onChangeText={(value) => setNum(value)} />
                        :
                        <FormInput s={12} text="FINADO" value={name} onChangeText={(value) => setName(value)} />
                    }
                  </View>
                  <View style={{ width: '100%' }}>
                    <Button text="BUSCAR" onPress={handleSearch} />
                  </View>
                  <View style={{ width: '100%' }}>
                    <ScrollView style={{ height: '70%', width: '100%' }}>
                      {
                        list.map(item => {
                          return (
                            <TouchableHighlight onLongPress={() => handleSelectAFN(item)} style={{ borderBottomWidth: 0.2, paddingVertical: 3 }} key={item.idSolicitudAFN}>
                              <View style={{ flex: 1, flexWrap: 'wrap', flexDirection: 'row', marginTop: 5 }}>
                                <Text style={{ width: '50%', fontWeight: 'bold' }}>{item.Capilla}</Text>
                                <Text style={{ width: '50%', textAlign: 'right' }}>FOLIO: {item.FolioAFN}</Text>
                                <Text style={{ width: '100%' }}>FINADO: {item.Finado}</Text>
                              </View>
                            </TouchableHighlight>
                          )
                        })
                      }
                    </ScrollView>
                  </View>
                </View>
            }
          </View>
        </View>
      </View>
    </>
  )
}

export default ModalSearch;