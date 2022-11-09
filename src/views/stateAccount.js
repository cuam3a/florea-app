import React, { useContext, useEffect, useState, useCallback } from "react"
import { TouchableHighlight, View, ActivityIndicator, Text, Alert, ScrollView, Modal } from 'react-native'
import { AppContext } from '../application/provider';
import SwipeList from '../components/swipeList'
import _ from 'lodash'
import fn from '../application/services/functions.global'
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import Service from '../application/services/api.service'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCoins, faTicketAlt } from '@fortawesome/free-solid-svg-icons'
import Component from "../components"
import DetailsTicket from '../components/DetailsTicket'

const StateAccount = (props) => {
  const [state, setState] = useContext(AppContext)
  const [isLoading, setIsLoading] = useState(true)
  const isFocused = useIsFocused();
  const [showModal, setShowModal] = React.useState(false)
  const [item, setItem] = React.useState({})

  //useFocusEffect(() => { setService(!service)});
  useEffect(() => {
    setIsLoading(true)
    api();
  }, [isFocused])

  const api = async () => {
    let res = await Service.getSales(state.id);
    if (res.Error) {
      setIsLoading(false);
      Alert.alert(
        "Error Servidor",
        res.Error,
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
      );
    }
    if (res.Success) {
      let arrCxC = [];
      let index = 0;
      _.forEach(res.Solicitudes, (item) => {
        let objSale = {}
        objSale.id = item.id;
        objSale.docNum = item.Folio;
        objSale.idUser = item.idUsuario;
        objSale.name = item.Cliente;
        objSale.deceased = item.Finado;
        objSale.phone = item.Telefono;
        objSale.address = item.DireccionEntrega;
        objSale.date = item.FechaEntrega;
        objSale.time = item.HoraEntrega;
        objSale.total = item.Total;
        objSale.subtotal = item.Subtotal;
        objSale.cash = item.Efectivo;
        objSale.card = item.Tarjeta;
        objSale.creditCard = item.TarjetaCredito;
        objSale.deposit = item.Deposito;
        objSale.transfer = item.Transferencia;
        objSale.payment = (item.Efectivo + item.Tarjeta + item.Deposito + item.Transferencia);
        objSale.discount = item.Descuento;
        objSale.extra = item.Extra;
        objSale.user = item.Usuario;
        objSale.createDate = item.FechaCreacion;
        objSale.delivery = item.TipoEntrega;
        objSale.note = item.NotaEntrega;
        objSale.salesName = item.Vendedor;
        objSale.pendingDate = item.FechaPendiente;
        objSale.idState = 1;
        objSale.cart = [];
        _.forEach(item.Carro, (itemC) => {
          let objCarro = {}
          objCarro.index = index;
          objCarro.id = itemC.id;
          objCarro.idArticulo = itemC.idArticulo;
          objCarro.Nombre = itemC.Nombre;
          objCarro.name = itemC.Nombre;
          objCarro.code = itemC.Codigo;
          objCarro.total = itemC.Total;
          objCarro.Precio = itemC.Total;
          objCarro.price = itemC.Total;
          objCarro.note = itemC.Nota;
          objCarro.label = itemC.Etiqueta;
          objSale.cart.push(objCarro);
        })
        arrCxC.push(objSale);
      })
      state.sales = arrCxC;
      setState({ ...state, sales: arrCxC, shoppingCart: [], customer: { idUser: 0, name: "", deceased: "", phone: "", address: "", date: "", cart: [], total: 0, cash: 0, card: 0, creditCard: 0, discount: 0, user: "", createDate: "", delivery: false, note: "", discount: 0, extra: 0, transfer: 0, deposit: 0, time: "" } })
      setIsLoading(false)
    }
  }

  const handlePrintTicket = (index) => {
    const sales = _.find(state.sales, (item) => { return item.id === index })
    fn.printTicket(sales)
  }

  const handleLiquidate = async () => {
    setIsLoading(true);
    let res = await Service.getLiquidate(state.id);
    if (res.Error) {
      Alert.alert(
        "Error Servidor",
        res.Error,
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
      );
      setIsLoading(false);
    }
    if (res.Success) {
      fn.printTicketLiquidate(res.Verificacion)
      api();
      //setIsLoading(false);
    }
  }

  const handleLastLiquidate = async () => {
    let res = await Service.getLastLiquidate(state.id);
    if (res.Error) {
      Alert.alert(
        "Error Servidor",
        res.Error,
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
      );
    }
    if (res.Success) {
      fn.printTicketLiquidate(res.Verificacion)
      setIsLoading(true);
      api();
    }
  }

  const handleDetail = (item) => {
    setItem(item)
    setShowModal(!showModal)
  }

  return (
    <>
      <Component.HeaderBar navigation={props.navigation} title="ESTADO DE CUENTA" showCart={false} showAdd={false} />
      {
        (isLoading)
          ?
          <ActivityIndicator size="small" color="#3A3A3A" />
          :
          <ScrollView style={{ flex: 1 }}>
            <View style={{ flex: 3 }}>
              <SwipeList data={_.filter(state.sales, (item) => { return item.idState === 1 })} type="sales" handlePrintTicket={handlePrintTicket} />
            </View>
            <View style={{ flex: 1, marginTop: 20 }}>
              <View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
                <Text style={{ fontSize: 12, fontWeight: "bold", width: "50%", textAlign: "right" }}>TOTAL EFECTIVO:</Text>
                <Text style={{ fontSize: 12, width: "20%", textAlign: "right" }}>{fn.formatAmount(_.sumBy(_.filter(state.sales, (item) => { return item.idState === 1 }), 'cash'))}</Text>
              </View>
              <View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
                <Text style={{ fontSize: 12, fontWeight: "bold", width: "50%", textAlign: "right" }}>TOTAL TARJETA DEBITO:</Text>
                <Text style={{ fontSize: 12, width: "20%", textAlign: "right" }}>{fn.formatAmount(_.sumBy(_.filter(state.sales, (item) => { return item.idState === 1 }), 'card'))}</Text>
              </View>
              <View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
                <Text style={{ fontSize: 12, fontWeight: "bold", width: "50%", textAlign: "right" }}>TOTAL TARJETA CREDITO:</Text>
                <Text style={{ fontSize: 12, width: "20%", textAlign: "right" }}>{fn.formatAmount(_.sumBy(_.filter(state.sales, (item) => { return item.idState === 1 }), 'creditCard'))}</Text>
              </View>
              <View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
                <Text style={{ fontSize: 12, fontWeight: "bold", width: "50%", textAlign: "right" }}>TOTAL TRANSFERENCIA:</Text>
                <Text style={{ fontSize: 12, width: "20%", textAlign: "right" }}>{fn.formatAmount(_.sumBy(_.filter(state.sales, (item) => { return item.idState === 1 }), 'transfer'))}</Text>
              </View>
              <View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
                <Text style={{ fontSize: 12, fontWeight: "bold", width: "50%", textAlign: "right" }}>TOTAL DEPOSITO:</Text>
                <Text style={{ fontSize: 12, width: "20%", textAlign: "right" }}>{fn.formatAmount(_.sumBy(_.filter(state.sales, (item) => { return item.idState === 1 }), 'deposit'))}</Text>
              </View>
              <View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
                <Text style={{ fontSize: 12, fontWeight: "bold", width: "50%", textAlign: "right" }}>TOTAL:</Text>
                <Text style={{ fontSize: 12, width: "20%", textAlign: "right" }}>{fn.formatAmount(_.sumBy(_.filter(state.sales, (item) => { return item.idState === 1 }), 'total'))}</Text>
              </View>
              <View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
                <TouchableHighlight onPress={handleLiquidate} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'stretch', alignSelf: 'stretch', backgroundColor: '#79BD62', borderRadius: 5, padding: 5, marginTop: 5, marginBottom: 5, minHeight: 30, width: "70%", marginLeft: "5%" }}>
                  <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', borderRadius: 10 }}>
                    {
                      isLoading
                        ?
                        <ActivityIndicator />
                        :
                        <>
                          <FontAwesomeIcon icon={faCoins} color="white" size="15" />
                          <Text style={{ color: "white", marginLeft: 10 }}>LIQUIDAR CORTE</Text>
                        </>
                    }

                  </View>
                </TouchableHighlight>
                <TouchableHighlight onPress={handleLastLiquidate} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'stretch', alignSelf: 'stretch', backgroundColor: '#4E504D', borderRadius: 5, padding: 5, marginTop: 5, marginBottom: 5, minHeight: 30, width: "10%", marginLeft: "2%" }}>
                  <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', borderRadius: 10 }}>
                    <FontAwesomeIcon icon={faTicketAlt} color="white" size="15" />
                  </View>
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
              {
                (showModal)
                  ?
                  <DetailsTicket item={item} onPressClose={() => setShowModal(false)}></DetailsTicket>
                  :
                  <></>
              }

            </Modal>
          </ScrollView>
      }
    </>
  )
}

export default StateAccount;