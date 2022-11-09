import React, { useCallback, useContext } from "react"
import { StyleSheet, Text, ScrollView, View, TouchableHighlight, ActivityIndicator, Image } from 'react-native'
import Component from "../components"
import fn from '../application/services/functions.global'
import { AppContext } from '../application/provider';
import Service from '../application/services/api.service'
import _ from 'lodash'
import { useIsFocused } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';

const Catalog = (props) => {
  const [state, setState] = useContext(AppContext)
  const [catalog, setCatalog] = React.useState([])
  const [select, setSelect] = React.useState("")
  const [product, setProduct] = React.useState([])
  const [url, setUrl] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)
  const isFocused = useIsFocused();

  React.useEffect(() => {
    let category = []
    if (props.route.params.name == "CATALOGO FUNERARIO") {
      category = _.filter(state.category, (item) => { return item.Tipo == "FUNERARIO" })
    } else {
      category = _.filter(state.category, (item) => { return item.Tipo == "EXTERNO" })
    }
    let newCategory = []
    _.forEach(category, (item) => {
      newCategory.push({ label: item.Nombre, value: item.id });
    })
    setCatalog(newCategory);
    const ur = async () => {
      setUrl(await Service.getURLServer())
    }
    ur();
    //setSelect("")
    setState({ ...state, isLoading: false })
  }, [isFocused])

  React.useEffect(() => {
    setState({ ...state, isLoading: true })
    const api = async () => {
      if (select !== "") {
        let product = _.filter(state.product, (item) => { return item.idCategoria == select })
        _.forEach(product, (item) => {
          item.image = (url.toLowerCase()) + item.URL.trim();
        })
        setProduct(product)
      }
      setState({ ...state, isLoading: false })
    }
    api()
  }, [select])

  const handleDetail = (item) => {
    setState({ ...state, isLoading: true })
    props.navigation.navigate('detail', { item: item, type: props.route.params.name })
  }

  return (
    <>
      <Component.HeaderBar navigation={props.navigation} title="CATALOGO" showCart={true} showAdd={true} />
      <ScrollView style={styles.container}>
        <View>
          <Text>CATEGORIA</Text>
          <View style={{ borderWidth: 1, borderColor: '#E5E5E5' }}>
            <RNPickerSelect
              placeholder={{ label: "SELECCIONAR CATEGORIA", value: 0 }}
              onValueChange={(value) => setSelect(value)}
              items={catalog}
              value={select}
              style={{ inputAndroid: { color: 'black', height: 40 } }}
              useNativeAndroidPickerStyle={false}
            />
          </View>
        </View>
        {
          (state.isLoading)
            ?
            <ActivityIndicator />
            :
            <View style={{ flex: 1, flexWrap: 'wrap', flexDirection: "row" }}>
              {
                product.map((item) => {
                  return (
                    <View key={item.id} style={styles.itemCatalog}>
                      <TouchableHighlight underlayColor="#C7C7C7" onPress={() => { handleDetail(item) }}>
                        <Image
                          style={styles.logo}
                          source={{ uri: item.image }}
                          alt={item.Nombre}
                          resizeMode="cover"

                        />
                      </TouchableHighlight>
                      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Text>{fn.formatAmount(item.Precio)}</Text>
                        <Text>{item.Nombre}</Text>
                        <Text ellipsizeMode='tail' numberOfLines={1}>{item.Descripcion}</Text>
                        <Component.ButtonAdd item={item} />
                      </View>
                    </View >
                  )
                })
              }
            </View>
        }
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  buttonA: {
    height: 150,
    marginHorizontal: 20,
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00B226'
  },
  buttonB: {
    height: 150,
    marginHorizontal: 20,
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00A6B0'
  },
  text: {
    color: 'white',
    fontWeight: "bold",
    fontSize: 20
  },
  logo: {
    margin: '5%',
    width: '90%',
    height: 200,
  },
  itemCatalog: {
    flexDirection: 'column',
    width: '50%',
  }
});

export default Catalog;