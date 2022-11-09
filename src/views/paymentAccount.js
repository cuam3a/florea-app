import React, { useContext, useEffect, useState, useCallback } from "react"
import { View, ActivityIndicator, ScrollView, Modal, Alert } from 'react-native'
import { AppContext } from '../application/provider'
import SwipeList from '../components/swipeList'
import _ from 'lodash'
import { useIsFocused } from '@react-navigation/native';
import Service from '../application/services/api.service'
import Component from "../components"
import fn from '../application/services/functions.global'
import DetailsTicket from '../components/DetailsTicket'

const PaymentAccount = (props) => {
  const [state, setState] = useContext(AppContext)
  const [isLoading, setIsLoading] = useState(true)
  const isFocused = useIsFocused();
  const [showModal, setShowModal] = React.useState(false)
  const [item, setItem] = React.useState({})

  useEffect(() => {
    setIsLoading(true)
    api()
  }, [isFocused])


  const api = async () => {
    console.log("API")
    let res = await Service.getCxC(state.id);
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
        objSale.index = index;
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
          objCarro.index = objSale.cart.length;
          objCarro.id = itemC.id;
          objCarro.idArticulo = itemC.idArticulo;
          objCarro.Nombre = itemC.Nombre;
          objCarro.name = itemC.Nombre;
          objCarro.code = itemC.Codigo;
          objCarro.total = itemC.Total;
          objCarro.price = itemC.Total;
          objCarro.Precio = itemC.Total;
          objCarro.note = itemC.Nota;
          objCarro.label = itemC.Etiqueta;
          objCarro.idState = 1;
          objSale.cart.push(objCarro);
        })
        arrCxC.push(objSale);
        index++;
      })
      state.cxc = arrCxC;
      setState({ ...state, cxc: arrCxC, shoppingCart: [], customer: { idUser: 0, name: "", deceased: "", phone: "", address: "", date: "", cart: [], total: 0, cash: 0, card: 0, creditCard: 0, discount: 0, user: "", createDate: "", delivery: false, note: "", discount: 0, extra: 0, transfer: 0, deposit: 0, time: "" } })
      setIsLoading(false)
    }
  }

  const handleEdit = (index) => {
    let cxc = _.find(state.cxc, (item) => { return item.id === index })
    setState({ ...state, mod: "edit" });
    props.navigation.navigate('payment', { edit: cxc.id })
  }

  const handlePrintTicketPending = (index) => {
    const cxc = _.find(state.cxc, (item) => { return item.id === index })
    fn.printTicketPending(cxc)
  }

  const handleDetail = (item) => {
    setItem(item)
    setShowModal(!showModal)
  }

  return (
    <>
      <Component.HeaderBar navigation={props.navigation} title="CUENTAS X COBRAR" showCart={false} showAdd={false} />

      {
        (isLoading)
          ?
          <ActivityIndicator size="small" color="#3A3A3A" />
          :
          <ScrollView style={{ flex: 1 }}>
            <SwipeList data={_.filter(state.cxc, (item) => { return item.idState === 1 })} type="cxc" handleEdit={handleEdit} handlePrintTicketPending={handlePrintTicketPending} handleDetail={handleDetail}/>
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

export default PaymentAccount;