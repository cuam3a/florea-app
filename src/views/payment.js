import React, { useContext, useState, useEffect, useCallback } from "react"
import { Alert, TextInput, Picker, Switch, Text, TouchableHighlight, ActivityIndicator, ScrollView, View, Modal, Button } from 'react-native'
import { AppContext } from '../application/provider';
import Component from "../components"
import DatePicker from 'react-native-datepicker'
import _ from 'lodash'
import moment from 'moment'
import fn from '../application/services/functions.global'
import Service from '../application/services/api.service'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faTrash, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons'
import { useIsFocused } from '@react-navigation/native';
import ModalSearch from "../components/ModalSearch";

const Payment = (props) => {
  const [state, setState] = useContext(AppContext)
  const [errors, setErrors] = useState({});
  const [mod, setMod] = useState("new");
  const [isLoadingCxc, setIsLoadingCxc] = useState(false);
  const [isLoadingSale, setIsLoadingSale] = useState(false);
  const [isLoading, setIsLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editModal, setEditModal] = useState({ index: 0, note: "", label: "" })
  const [showSearch, setShowSearch] = useState(false)
  const [other, setOther] = useState(false)
  const [sellers, setSellers] = useState([])
  const [addresses, setAddresses] = useState([])
  const isFocused = useIsFocused();

  useEffect(() => {
    setIsLoading(true)
    setSellers(state.sellers)
    setAddresses(state.addresses)
    if (state.mod == "edit") {
      const index = props.route.params.edit;
      const cxc = _.find(state.cxc, (item) => { return item.id === index });
      state.customer.id = cxc.id;
      state.customer.docNum = cxc.docNum;
      state.customer.name = cxc.name;
      state.customer.deceased = cxc.deceased;
      state.customer.address = cxc.address;
      state.customer.phone = cxc.phone;
      state.customer.delivery = cxc.delivery;
      state.customer.date = cxc.date;
      state.customer.time = cxc.time;
      state.customer.cash = cxc.cash;
      state.customer.card = cxc.card;
      state.customer.creditCard = cxc.creditCard;
      state.customer.discount = cxc.discount;
      state.customer.extra = cxc.extra;
      state.customer.transfer = cxc.transfer;
      state.customer.deposit = cxc.deposit;
      state.shoppingCart = cxc.cart;
      state.note = cxc.note;
      state.customer.pendingDate = cxc.pendingDate;
      state.customer.salesName = cxc.salesName;
      setState({ ...state, shoppingCart: [...state.shoppingCart], mod: "" })
      setMod("edit")
    }
    else {
      setState({ ...state })
    }
    setIsLoading(false)
  }, [state.mod])

  const validate = (fieldValues = state.customer) => {
    let temp = { ...errors }

    if ('total' in fieldValues)
      temp.total = (fieldValues.total !== "" && fieldValues.total > 0) ? "" : "Colocar nombre."
    // if ('name' in fieldValues)
    //   temp.name = (fieldValues.name !== "") ? "" : "Colocar nombre cliente."
    // if ('phone' in fieldValues)
    //   temp.phone = isNaN(fieldValues.phone) ? "Formato incorrecto solo numeros" : (fieldValues.phone.length === 10 ? "" : "Telefono a 10 digitos.")
    if ('address' in fieldValues)
      temp.address = (fieldValues.address !== "") ? "" : "Colocar direccion de entrega."
    if ('date' in fieldValues)
      temp.date = (fieldValues.date !== "" || fieldValues.pendingDate) ? "" : "Colocar fecha."
    if ('time' in fieldValues)
      temp.time = (fieldValues.time !== "" || fieldValues.pendingDate) ? "" : "Colocar hora."

    setErrors({
      ...temp
    })
    console.log(errors)
    //if (fieldValues === state.customer)
    return Object.values(temp).every(x => x === "")
  }

  const handleDeleteItem = (index) => {
    let newShoppingCart = _.find(state.shoppingCart, (item) => { return item.index === index });
    newShoppingCart.idState = 2;
    setState({ ...state, shoppingCart: [...state.shoppingCart] })
    if (_.filter(state.shoppingCart, { "idState": 1 }).length === 0) {
      props.navigation.navigate('home')
    }
  }

  const handlePaymentMethod = (type, value) => {
    if (!isNaN(value) && parseFloat(value) >= 0) {
      if (type === "cash") {
        setState({ ...state, customer: { ...state.customer, cash: parseFloat(value) } })
      }
      if (type === "card") {
        setState({ ...state, customer: { ...state.customer, card: parseFloat(value) } })
      }
      if (type === "creditCard") {
        setState({ ...state, customer: { ...state.customer, creditCard: parseFloat(value) } })
      }
      if (type === "discount") {
        setState({ ...state, customer: { ...state.customer, discount: parseFloat(value) } })
      }
      if (type === "extra") {
        setState({ ...state, customer: { ...state.customer, extra: parseFloat(value) } })
      }
      if (type === "transfer") {
        setState({ ...state, customer: { ...state.customer, transfer: parseFloat(value) } })
      }
      if (type === "deposit") {
        setState({ ...state, customer: { ...state.customer, deposit: parseFloat(value) } })
      }
    }
    else {
      if (type === "cash") {
        setState({ ...state, customer: { ...state.customer, cash: 0 } })
      }
      if (type === "card") {
        setState({ ...state, customer: { ...state.customer, card: 0 } })
      }
      if (type === "creditCard") {
        setState({ ...state, customer: { ...state.customer, creditCard: 0 } })
      }
      if (type === "discount") {
        setState({ ...state, customer: { ...state.customer, discount: 0 } })
      }
      if (type === "extra") {
        setState({ ...state, customer: { ...state.customer, extra: 0 } })
      }
      if (type === "transfer") {
        setState({ ...state, customer: { ...state.customer, transfer: 0 } })
      }
      if (type === "deposit") {
        setState({ ...state, customer: { ...state.customer, deposit: 0 } })
      }
    }
  }

  const handlePhone = (value) => {
    if (!isNaN(value)) {
      setState({ ...state, customer: { ...state.customer, phone: value } })
    }
  }

  const handleEditProduct = (item) => {
    setEditModal({ index: item.index, note: item.note, label: item.label })
    setShowModal(true)
  }

  const handleSetNote = (index, value) => {
    setEditModal({ ...editModal, note: value })
    let shoppingCart = _.find(state.shoppingCart, (item) => { return item.index === index });
    shoppingCart.note = value;
    setState({ ...state, shoppingCart: [...state.shoppingCart] })
  }

  const handleSetLabel = (index, value) => {
    setEditModal({ ...editModal, label: value })
    let shoppingCart = _.find(state.shoppingCart, (item) => { return item.index === index });
    shoppingCart.label = value;
    setState({ ...state, shoppingCart: [...state.shoppingCart] })
  }

  const handleCxC = async () => {
    setIsLoadingCxc(true)
    const customer = JSON.parse(JSON.stringify(state.customer))
    const cart = _.filter(state.shoppingCart, (item) => { return item.idState === 1 });
    const payment = (customer.cash + customer.card + customer.transfer + customer.deposit);
    const total = (_.sumBy(cart, "price") + customer.extra) - customer.discount;
    if (payment < total && total > 0) {
      customer.index = state.cxc.length + 1;
      customer.cart = cart;
      customer.user = state.name;
      customer.idUser = state.id;
      customer.createDate = moment().format()
      customer.total = _.sumBy(customer.cart, "price");
      customer.subtotal = _.sumBy(customer.cart, "price");
      customer.payment = payment;
      customer.idState = 1;
      if (true) {
        let res = await Service.setSale(customer, 'cxc');
        if (res.Error) {
          setIsLoadingCxc(false)
          Alert.alert(
            "Error Servidor",
            res.Error,
            [
              { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
          );
        }
        if (res.Success) {
          console.log(res)
          customer.id = res.id;
          if (mod === "edit") {
            const cxcOld = _.find(state.cxc, (item) => { return item.index === props.route.params.edit })
            if (typeof cxcOld !== "undefined") {
              customer.index = cxcOld.index;
              state.cxc = _.filter(state.cxc, (item) => { return item.index !== cxcOld.index })
              console.log(state.cxc)
            }
          }
          setState({ ...state, cxc: [...state.cxc, customer], shoppingCart: [], customer: { idUser: 0, name: "", deceased: "", phone: "", address: "", date: "", cart: [], total: 0, cash: 0, card: 0, discount: 0, user: "", createDate: "", delivery: false, note: "", discount: 0, extra: 0, transfer: 0, deposit: 0, creditCard: 0, pendingDate: false, salesName: "", docNum: 0 } })
          setIsLoadingCxc(false)
          fn.printTicketPending(customer)
          props.navigation.navigate('paymentAccount')
        }
      }
      else {
        setIsLoadingCxc(false)
        console.log(errors)
        Alert.alert(
          "Error Datos Entrega",
          "Revisar Datos de Entrega",
          [
            { text: "OK", onPress: () => console.log("OK Pressed") }
          ]
        );
      }
    }
    else {
      setIsLoadingCxc(false)
      Alert.alert(
        "Error Pago",
        "Pago no es igual al Total, Saldo no puede ser negativo",
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
      );
    }
  }

  const handlePayment = async () => {
    setIsLoadingSale(true)
    const customer = JSON.parse(JSON.stringify(state.customer))
    const cart = _.filter(state.shoppingCart, (item) => { return item.idState === 1 });
    const payment = (customer.cash + customer.card + customer.transfer + customer.deposit + customer.creditCard);
    const total = (_.sumBy(cart, "price") + customer.extra) - customer.discount;
    console.log(customer.extra + " " + customer.discount + " " + JSON.stringify(customer))
    if (payment === total) {
      customer.index = state.sales.length + 1;
      customer.cart = cart;
      customer.user = state.name;
      customer.idUser = state.id;
      customer.createDate = moment().format()
      customer.subtotal = _.sumBy(customer.cart, "price");
      customer.total = (_.sumBy(cart, "price") + customer.extra) - customer.discount;
      customer.payment = customer.cash + customer.card + customer.transfer + customer.deposit;
      customer.idState = 1;
      if (await validate(customer)) {
        let res = await Service.setSale(customer, 'sale');
        if (res.Error) {
          setIsLoadingSale(false)
          Alert.alert(
            "Error Servidor",
            res.Error,
            [
              { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
          );
        }
        if (res.Success) {
          customer.id = res.id;
          customer.docNum = res.Folio;
          setState({ ...state, sales: [...state.sales, customer], shoppingCart: [], customer: { docNum: 0, name: "", deceased: "", phone: "", address: "", date: "", cart: [], total: 0, cash: 0, card: 0, creditCard: 0, discount: 0, user: "", createDate: "", delivery: false, note: "", discount: 0, extra: 0, transfer: 0, deposit: 0, pendingDate: false, salesName: "" } })
          setIsLoadingSale(false)
          fn.printTicket(customer)
          props.navigation.navigate('stateAccount')
        }
      }
      else {
        setIsLoadingSale(false)
        console.log(errors)
        Alert.alert(
          "Error Datos Entrega",
          "Revisar Datos de Entrega",
          [
            { text: "OK", onPress: () => console.log("OK Pressed") }
          ]
        );
      }
    }
    else {
      setIsLoadingSale(false)
      Alert.alert(
        "Error Pago",
        "Pago no es igual al Total",
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
      );
    }
  }

  const handleSelectAFN = (item) => {
    setState({ ...state, customer: { ...state.customer, FolioAFN: item.FolioAFN, idSolicitudAFN: item.idSolicitudAFN, delivery: false, deceased: item.Finado, address: item.Capilla } })
    setShowSearch(false)
  }

  const handleDeleteAFN = () => {
    Alert.alert(
      "Eliminar Referencia",
      "Se eliminara la referencia a servicio AFN",
      [
        { text: "OK", onPress: () => setState({ ...state, customer: { ...state.customer, FolioAFN: "", idSolicitudAFN: null } }) },
        { text: "CANCELAR", onPress: () => console.log("CANCELAR") }
      ]
    );
  }

  const styles = {
    viewPanel: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      position: 'absolute'
    },
    container: {
      flex: 1,
      marginTop: '15%',
      marginBottom: '100%',
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
      marginBottom: 20
    },
    footer: {
      marginTop: 10
    }
  };

  return (
    <>
      <Component.HeaderBar navigation={props.navigation} title="PAGO" showCart={false} showAdd={false} />
      {
        (isLoading)
          ?
          <ActivityIndicator />
          :
          <ScrollView>
            <View style={{ flex: 1, flexWrap: 'wrap', flexDirection: "row" }}>
              <View style={{ width: '70%' }}>
                <Text>
                  Cliente
                </Text>
                <TextInput 
                  name="name" 
                  style={{ borderWidth: 1, height: 40, fontSize: 12, padding: 10, margin: 5, borderColor: '#DADADA' }} 
                  value={state.customer.name} 
                  onChangeText={(value) => setState({ ...state, customer: { ...state.customer, name: value } })} 
                  autoCapitalize="none"
                />
                {
                  (errors.name)
                    ? <Text>
                      {errors.name}
                    </Text>
                    : <></>
                }
              </View>
              <View style={{ width: '30%' }}>
                <Text>
                  Telefono
                </Text>
                <TextInput name="phone" style={{ borderWidth: 1, height: 40, fontSize: 12, padding: 10, margin: 5, borderColor: '#DADADA' }} value={state.customer.phone} onChangeText={(value) => handlePhone(value)} />
                {
                  (errors.phone)
                    ? <Text>
                      {errors.phone}
                    </Text>
                    : <></>
                }
              </View>
              <View style={{ width: '50%' }}>
                <TouchableHighlight
                  onPress={() => setShowSearch(true)}
                  style={{ paddingVertical: 5, justifyContent: 'center', alignItems: 'center', backgroundColor: '#126ACA', marginVertical: 5, marginHorizontal: 5 }}
                >
                  <FontAwesomeIcon icon={faSearch} color="white" size={15} />
                </TouchableHighlight>
              </View>
              <View style={{ width: '50%', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#DADADA' }}>
                <TouchableHighlight onLongPress={handleDeleteAFN} style={{ width: '50%', marginHorizontal: 5, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ fontWeight: 'bold' }}>{state.customer.FolioAFN}</Text>
                </TouchableHighlight>
              </View>
              <View style={{ width: '100%' }}>
                <Text>
                  Finado
                </Text>
                <TextInput name="deceased" style={{ borderWidth: 1, height: 40, fontSize: 12, padding: 10, margin: 5, borderColor: '#DADADA' }} value={state.customer.deceased} onChangeText={(value) => setState({ ...state, customer: { ...state.customer, deceased: value } })} />
                {
                  (errors.deceased)
                    ? <Text>
                      {errors.deceased}
                    </Text>
                    : <></>
                }
              </View>
              {
                state.customer.pendingDate
                  ?
                  <>
                  </>
                  :
                  <>
                    <View style={{ width: '100%', flexWrap: 'wrap', flexDirection: 'row', marginTop: 5 }}>
                      <View style={{ width: '50%' }}>
                        <Text>
                          Fecha Entrega
                        </Text>
                        <DatePicker
                          style={{ width: 180, margin: 5 }}
                          date={state.customer.date}
                          mode="date"
                          placeholder="Fecha"
                          format="YYYY-MM-DD"
                          confirmBtnText="Ok"
                          cancelBtnText="Cancelar"
                          onDateChange={(value) => setState({ ...state, customer: { ...state.customer, date: value } })}
                          customStyles={{
                            dateIcon: {
                              position: 'absolute',
                              left: 0,
                              top: 4,
                              marginLeft: 0
                            },
                            dateInput: {
                              marginLeft: 36
                            }
                          }}
                        />
                      </View>
                      <View style={{ width: '50%' }}>
                        <Text>
                          Hora Entrega
                        </Text>
                        <DatePicker
                          style={{ width: 150, margin: 5 }}
                          date={state.customer.time}
                          mode="time"
                          placeholder="Hora"
                          format="h:mm A"
                          confirmBtnText="Ok"
                          cancelBtnText="Cancelar"
                          onDateChange={(value) => setState({ ...state, customer: { ...state.customer, time: value } })}
                          customStyles={{
                            dateIcon: {
                              position: 'absolute',
                              left: 0,
                              top: 4,
                              marginLeft: 0
                            },
                            dateInput: {
                              marginLeft: 36
                            }
                          }}
                        />
                      </View>
                    </View>
                  </>
              }
              <View style={{ width: '100%', flexWrap: 'wrap', flexDirection: 'row', marginTop: 5 }}>
                <View alignItems="center" space={4} width="48%">
                  <Text>Fecha Entrega Pendiente</Text>
                  <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={state.customer.pendingDate ? "#4BBCF5" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={() => setState({ ...state, customer: { ...state.customer, pendingDate: !state.customer.pendingDate, date: "", time: "" } })}
                    value={state.customer.pendingDate}
                  />
                </View>
                <View alignItems="center" space={4} width="48%">
                  <Text>Entrega en domicilio</Text>
                  <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={state.customer.delivery ? "#4BBCF5" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={() => setState({ ...state, customer: { ...state.customer, delivery: !state.customer.delivery } })}
                    value={state.customer.delivery}
                  />
                </View>
              </View>
              <View style={{ width: '100%' }}>
                <Text>
                  Direccion Entrega
                </Text>
                {
                  (state.customer.delivery)
                    ?
                    <TextInput width="98%" name="address" style={{ borderWidth: 1, height: 40, fontSize: 12, padding: 10, margin: 5, borderColor: '#DADADA' }} value={state.customer.address} onChangeText={(value) => setState({ ...state, customer: { ...state.customer, address: value } })} />
                    :
                    <Picker
                      style={{ borderWidth: 1, height: 40, fontSize: 12, padding: 10, margin: 5, borderColor: '#DADADA' }}
                      width="98%"
                      selectedValue={state.customer.address}
                      accessibilityLabel="Seleccionar Capilla"
                      placeholder="Seleccionar Capilla"
                      onValueChange={(value) => setState({ ...state, customer: { ...state.customer, address: value } })}
                    >
                      <Picker.Item width="98%" label="SELECCIONAR" value="" />
                      {
                        addresses.map((item) => {
                          return (<Picker.Item key={item} width="98%" label={item} value={item} />)
                        })
                      }
                      {/* <Picker.Item width="98%" label="SELECCIONAR" value="" />
                      <Picker.Item width="98%" label="CAPILLA A1" value="CAPILLA A1" />
                      <Picker.Item width="98%" label="CAPILLA A2" value="CAPILLA A2" />
                      <Picker.Item width="98%" label="CAPILLA A3" value="CAPILLA A3" />
                      <Picker.Item width="98%" label="CAPILLA B1" value="CAPILLA B1" />
                      <Picker.Item width="98%" label="CAPILLA B2" value="CAPILLA B2" />
                      <Picker.Item width="98%" label="CAPILLA C1" value="CAPILLA C1" />
                      <Picker.Item width="98%" label="CAPILLA C2" value="CAPILLA C2" />
                      <Picker.Item width="98%" label="CAPILLA F1" value="CAPILLA F1" />
                      <Picker.Item width="98%" label="CAPILLA F2" value="CAPILLA F2" />
                      <Picker.Item width="98%" label="CAPILLA F3" value="CAPILLA F3" /> */}
                    </Picker>
                }
                {
                  (errors.address)
                    ? <Text>
                      {errors.address}
                    </Text>
                    : <></>
                }
              </View>
              <View style={{ width: '20%', alignItems: 'center' }}>
                <Text>
                  Otro Vendedor
                </Text>
                <Switch
                  trackColor={{ false: "#767577", true: "#81b0ff" }}
                  thumbColor={other ? "#4BBCF5" : "#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={() => setOther(!other)}
                  value={other}
                  style={{ marginTop: 6 }}
                />
              </View>
              <View style={{ width: '80%' }}>
                <Text>
                  Vendedor
                </Text>
                {
                  (other)
                    ?
                    <TextInput width="98%" name="address" style={{ borderWidth: 1, height: 40, fontSize: 12, padding: 10, margin: 5, borderColor: '#DADADA' }} value={state.customer.salesName} onChangeText={(value) => setState({ ...state, customer: { ...state.customer, salesName: value } })} />
                    :
                    <Picker
                      style={{ borderWidth: 1, height: 40, fontSize: 12, padding: 10, margin: 5, borderColor: '#DADADA' }}
                      width="98%"
                      selectedValue={state.customer.salesName}
                      accessibilityLabel="Seleccionar Capilla"
                      placeholder="Seleccionar Capilla"
                      onValueChange={(value) => setState({ ...state, customer: { ...state.customer, salesName: value } })}
                    >
                      <Picker.Item width="98%" label="SELECCIONAR" value="" />
                      {
                        sellers.map((item) => {
                          return (<Picker.Item key={item} width="98%" label={item} value={item} />)
                        })
                      }
                    </Picker>
                }
                {
                  (errors.salesName)
                    ? <Text>
                      {errors.salesName}
                    </Text>
                    : <></>
                }
              </View>
              <View style={{ width: '100%' }}>
                <Text>Nota entrega</Text>
                <TextInput
                  style={{ borderWidth: 1, fontSize: 12, padding: 10, margin: 5, borderColor: '#DADADA' }}
                  width="99%"
                  placeholder=""
                  multiline
                  numberOfLines={4}
                  value={state.customer.note}
                  onChangeText={(value) => setState({ ...state, customer: { ...state.customer, note: value } })}
                />
              </View>
            </View>

            <View mt={4}>
              {
                state.shoppingCart.map(item => {
                  return (
                    (item.idState === 1)
                      ?
                      <TouchableHighlight key={item.index} onLongPress={() => handleEditProduct(item)}>
                        <View style={{ flex: 1, flexWrap: 'wrap', flexDirection: 'row', marginTop: 5, borderColor: '#DADADA', borderWidth: 1, padding: 5 }}>
                          <TouchableHighlight style={{ flex: 0.2, justifyContent: 'center', alignItems: 'center' }} onPress={() => handleDeleteItem(item.index)}><FontAwesomeIcon icon={faTrash} color="red" size={15} /></TouchableHighlight>
                          <Text style={{ flex: 0.5 }}>{item.name}</Text>
                          <Text style={{ flex: 0.3, textAlign: 'right', marginRight: 5 }}>{fn.formatAmount(item.price)}</Text>
                          {(item.label != "") ? <Text style={{ marginLeft: "10%", width: "90%", fontSize: 10, marginLeft: 80 }}>BANDA: {item.label}</Text> : <></>}
                          {(item.note != "") ? <Text style={{ marginLeft: "10%", width: "90%", fontSize: 10, marginLeft: 80 }}>NOTA: {item.note}</Text> : <></>}
                        </View>
                      </TouchableHighlight>
                      : <></>
                  )
                })
              }
            </View>
            <View mt={4}>
              <View style={{ flex: 1, flexWrap: 'wrap', flexDirection: 'row', marginTop: 5 }}>
                <Text style={{ width: "58%", textAlign: "right", marginTop: 6 }} >EXTRA: $</Text>
                <TextInput
                  style={{ borderWidth: 1, fontSize: 12, paddingHorizontal: 10, paddingVertical: 3, marginTop: 3, marginLeft: 25, borderColor: '#DADADA' }}
                  width="35%"
                  name="extra"
                  textAlign="right"
                  keyboardType="number-pad"
                  value={state.customer.extra.toString()}
                  onChangeText={(value) => handlePaymentMethod("extra", value)}
                />
                <Text style={{ width: "58%", textAlign: "right", marginTop: 6 }} >DESCUENTO: $</Text>
                <TextInput
                  style={{ borderWidth: 1, fontSize: 12, paddingHorizontal: 10, paddingVertical: 3, marginTop: 3, marginLeft: 25, borderColor: '#DADADA' }}
                  width="35%"
                  textAlign="right"
                  name="discount"
                  keyboardType="number-pad"
                  value={state.customer.discount.toString()}
                  onChangeText={(value) => handlePaymentMethod("discount", value)}
                />
                <Text style={{ width: "58%", textAlign: "right", marginTop: 6, fontWeight: "bold" }} >TOTAL: </Text>
                <Text style={{ width: "35%", textAlign: "right", marginTop: 6, fontWeight: "bold" }}> {fn.formatAmount((_.sumBy(_.filter(state.shoppingCart, { "idState": 1 }), 'price') + (isNaN(state.customer.extra) ? 0 : state.customer.extra)) - (isNaN(state.customer.discount) ? 0 : state.customer.discount))}</Text>

              </View>
            </View>

            <View my={4}>
              <View style={{ flex: 1, flexWrap: 'wrap', flexDirection: 'row', marginTop: 5 }}>
                <Text style={{ width: "100%", textAlign: "center", marginVertical: 10, fontWeight: "bold" }}>METODO DE PAGO</Text>
                <Text style={{ width: "58%", textAlign: "right", marginTop: 6 }}>EFECTIVO: $</Text>
                <TextInput
                  style={{ borderWidth: 1, fontSize: 12, paddingHorizontal: 10, paddingVertical: 3, marginTop: 3, marginLeft: 25, borderColor: '#DADADA' }}
                  textAlign="right"
                  width="35%"
                  name="cash"
                  keyboardType="number-pad"
                  value={state.customer.cash.toString()}
                  onChangeText={(value) => handlePaymentMethod("cash", value)}
                />
                <Text style={{ width: "58%", textAlign: "right", marginTop: 6 }}>TARJETA DEBITO: $</Text>
                <TextInput
                  style={{ borderWidth: 1, fontSize: 12, paddingHorizontal: 10, paddingVertical: 3, marginTop: 3, marginLeft: 25, borderColor: '#DADADA' }}
                  textAlign="right"
                  width="35%"
                  name="card"
                  keyboardType="number-pad"
                  value={state.customer.card.toString()}
                  onChangeText={(value) => handlePaymentMethod("card", value)}
                />
                <Text style={{ width: "58%", textAlign: "right", marginTop: 6 }}>TARJETA CREDITO: $</Text>
                <TextInput
                  style={{ borderWidth: 1, fontSize: 12, paddingHorizontal: 10, paddingVertical: 3, marginTop: 3, marginLeft: 25, borderColor: '#DADADA' }}
                  textAlign="right"
                  width="35%"
                  name="creditCard"
                  keyboardType="number-pad"
                  value={state.customer.creditCard.toString()}
                  onChangeText={(value) => handlePaymentMethod("creditCard", value)}
                />
                <Text style={{ width: "58%", textAlign: "right", marginTop: 6 }}>TRANSFERENCIA: $</Text>
                <TextInput
                  style={{ borderWidth: 1, fontSize: 12, paddingHorizontal: 10, paddingVertical: 3, marginTop: 3, marginLeft: 25, borderColor: '#DADADA' }}
                  textAlign="right"
                  width="35%"
                  name="card"
                  keyboardType="number-pad"
                  value={state.customer.transfer.toString()}
                  onChangeText={(value) => handlePaymentMethod("transfer", value)}
                />
                <Text style={{ width: "58%", textAlign: "right", marginTop: 6 }}>DEPOSITO: $</Text>
                <TextInput
                  style={{ borderWidth: 1, fontSize: 12, paddingHorizontal: 10, paddingVertical: 3, marginTop: 3, marginLeft: 25, borderColor: '#DADADA' }}
                  textAlign="right"
                  width="35%"
                  name="card"
                  keyboardType="number-pad"
                  value={state.customer.deposit.toString()}
                  onChangeText={(value) => handlePaymentMethod("deposit", value)}
                />
                <Text style={{ width: "58%", textAlign: "right", marginTop: 6, fontWeight: "bold" }}>SALDO: </Text>
                <Text style={{ width: "35%", textAlign: "right", marginTop: 6, fontWeight: "bold" }}> {fn.formatAmount((_.sumBy(_.filter(state.shoppingCart, { "idState": 1 }), 'price') + (isNaN(state.customer.extra) ? 0 : state.customer.extra)) - (isNaN(state.customer.discount) ? 0 : state.customer.discount) - (isNaN(state.customer.cash) ? 0 : state.customer.cash) - (isNaN(state.customer.card) ? 0 : state.customer.card) - (isNaN(state.customer.creditCard) ? 0 : state.customer.creditCard) - (isNaN(state.customer.transfer) ? 0 : state.customer.transfer) - (isNaN(state.customer.deposit) ? 0 : state.customer.deposit))}</Text>

                <View style={{ width: '50%' }}>
                  <Component.Button
                    color="#F73F00"
                    text="PENDIENTE"
                    loading={isLoadingCxc}
                    onPress={handleCxC}
                  />
                </View>
                <View style={{ width: '50%' }}>
                  <Component.Button
                    text="APLICAR PAGO"
                    loading={isLoadingSale}
                    onPress={handlePayment}
                  />
                </View>
              </View>
            </View>
            <Modal
              animationType="slide"
              transparent={true}
              visible={showSearch}
              style={{ position: 'absolute' }}
              onRequestClose={() => {
                setShowSearch(false);
              }}
            >
              <Component.ModalSearch onPressClose={() => setShowSearch(false)} handleSelectAFN={handleSelectAFN} />
            </Modal>
            <Modal
              animationType="slide"
              transparent={true}
              visible={showModal}
              style={{ position: 'absolute' }}
              onRequestClose={() => {
                setShowModal(false);
              }}
            >
              <View style={styles.viewPanel}>
                <View style={styles.container}>
                  <View style={styles.header}>
                    <Text style={styles.textHeader}>EDITAR ARTICULO</Text>
                    <TouchableHighlight style={styles.close} onPress={() => setShowModal(false)}><FontAwesomeIcon icon={faTimes} color="white" size={15} /></TouchableHighlight>
                  </View>
                  <View style={styles.body}>
                    <FormInput s={12} text="BANDA" h={100} multiline={true} value={editModal.label} onChangeText={(value) => handleSetLabel(editModal.index, value)} />
                    <FormInput s={12} text="NOTA" h={100} multiline={true} value={editModal.note} onChangeText={(value) => handleSetNote(editModal.index, value)} />
                  </View>
                </View>
              </View>
            </Modal>
          </ScrollView>
      }
    </>
  )
}

export default Payment;