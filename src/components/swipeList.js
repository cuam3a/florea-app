import React from "react";
import { Text, View, Modal, TouchableHighlight, ScrollView } from 'react-native'
import { SwipeListView } from 'react-native-swipe-list-view';
import fn from '../application/services/functions.global'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faTicketAlt, faCoins, faTimes } from '@fortawesome/free-solid-svg-icons'

const ModalInfo = ({ item, onPressClose }) => {
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

const SwipeList = ({ data, type, handlePrintTicket, handlePrintTicketPending, handleEdit, handleDetail }) => {
  //let [showModal, setShowModal] = React.useState(false)
  let [itemInfo, setItemInfo] = React.useState({})
  console.log("LISTA")
  const renderItem = ({ item, index }) => (
    <View key={item.id}>
      <TouchableHighlight
        underlayColor="#C7C7C7"
        onPress={() => {
          handleDetail(item)
          setItemInfo(item)
        }}
        style={{
          shadowColor: 'black',
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 6,
          shadowOpacity: 0.26,
          elevation: 8,
          backgroundColor: 'white',
          padding: 15,
          //borderRadius: 10,
          borderWidth: 0.2
        }}
      >
        <View>
          <View style={{ flex: 1, flexWrap: 'wrap', flexDirection: "row" }}>
            <View style={{ flex: 0.6, flexWrap: 'wrap', flexDirection: "row" }}>
              <View>
                <Text style={{ fontWeight: 'bold' }}>
                  {item.name + " " + item.phone}
                </Text>
                <Text>
                  {" PROD.: " + item.cart.length}
                </Text>
                <Text>{"ENTREGA: " + item.date + " " + item.time + " " + item.address}</Text>
              </View>
            </View>
            {
              (type === "cxc")
                ?
                <View style={{ flex: 0.4, flexWrap: 'wrap', flexDirection: "row" }}>
                  <Text style={{ width: '35%', fontWeight: 'bold' }}>
                    TOT.:
                  </Text>
                  <Text style={{ width: '65%', textAlign: 'right' }}>
                    {fn.formatAmount(item.total)}
                  </Text>
                  <Text style={{ width: '35%', fontWeight: 'bold' }}>
                    PAG.:
                  </Text>
                  <Text style={{ width: '65%', textAlign: 'right' }}>
                    {fn.formatAmount(item.payment)}
                  </Text>
                  <Text style={{ width: '35%', fontWeight: 'bold' }}>
                    PEND.:
                  </Text>
                  <Text style={{ width: '65%', textAlign: 'right' }}>
                    {fn.formatAmount(item.total - item.payment)}
                  </Text>
                </View>
                :
                <View style={{ flex: 0.4, flexWrap: 'wrap', flexDirection: "row" }}>
                  <Text style={{ width: '35%', fontWeight: 'bold' }}>
                    TOT.:
                  </Text>
                  <Text style={{ width: '65%', textAlign: 'right' }}>
                    {fn.formatAmount(item.total)}
                  </Text>
                  {
                    (item.cash > 0)
                      ?
                      <>
                        <Text style={{ width: '35%', fontWeight: 'bold' }}>
                          EFEC.:
                        </Text>
                        <Text style={{ width: '65%', textAlign: 'right' }}>
                          {fn.formatAmount(item.cash)}
                        </Text>
                      </>
                      :
                      <></>
                  }
                  {
                    (item.card > 0)
                      ?
                      <>
                        <Text style={{ width: '35%', fontWeight: 'bold' }}>
                          TD.:
                        </Text>
                        <Text style={{ width: '65%', textAlign: 'right' }}>
                          {fn.formatAmount(item.card)}
                        </Text>
                      </>
                      :
                      <></>
                  }
                  {
                    (item.creditCard > 0)
                      ?
                      <>
                        <Text style={{ width: '35%', fontWeight: 'bold' }}>
                          TC.:
                        </Text>
                        <Text style={{ width: '65%', textAlign: 'right' }}>
                          {fn.formatAmount(item.creditCard)}
                        </Text>
                      </>
                      :
                      <></>
                  }
                  {
                    (item.transfer > 0)
                      ?
                      <>
                        <Text style={{ width: '35%', fontWeight: 'bold' }}>
                          TRANSF.:
                        </Text>
                        <Text style={{ width: '65%', textAlign: 'right' }}>
                          {fn.formatAmount(item.transfer)}
                        </Text>
                      </>
                      :
                      <></>
                  }
                  {
                    (item.deposit > 0)
                      ?
                      <>
                        <Text style={{ width: '35%', fontWeight: 'bold' }}>
                          DEPOS.:
                        </Text>
                        <Text style={{ width: '65%', textAlign: 'right' }}>
                          {fn.formatAmount(item.deposit)}
                        </Text>
                      </>
                      :
                      <></>
                  }

                </View>
            }

          </View>
        </View>
      </TouchableHighlight>
      {/* <Modal
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
            //<ModalInfo item={itemInfo} onPressClose={() => setShowModal(false)}></ModalInfo>
            <View>
              <Text>PEDIDO #</Text>
              <TouchableHighlight underlayColor="#979797"  onPress={() => setShowModal(false)}><FontAwesomeIcon icon={faTimes} color="white" size={15} /></TouchableHighlight>
            </View>
            :
            <></>
        }

      </Modal> */}
    </View>
  );

  const renderHiddenItem = (data, rowMap) => (
    <View style={{ flexWrap: 'wrap', alignContent: 'flex-end' }}>
      {
        (type === "sales")
          ?
          <TouchableHighlight
            onPress={() => handlePrintTicket(data.item.id)}
            style={{ backgroundColor: '#969696', borderWidth: 0.2, width: '12%', height: '100%', flexWrap: 'wrap' }}
          >
            <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center', marginLeft: '10%' }}>
              <FontAwesomeIcon icon={faTicketAlt} color="white" size={20} />
              <Text style={{ color: '#FFFFFF' }}>
                Ticket
              </Text>
            </View>
          </TouchableHighlight>
          :
          (type === "cxc")
            ?
            <>
              <TouchableHighlight
                onPress={() => handlePrintTicketPending(data.item.id)}
                style={{ backgroundColor: '#969696', borderWidth: 0.2, width: '12%', height: '100%', flexWrap: 'wrap' }}
              >
                <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center', marginLeft: '10%' }}>
                  <FontAwesomeIcon icon={faTicketAlt} color="white" size={20} />
                  <Text style={{ color: '#FFFFFF' }}>
                    Ticket
                  </Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight
                onPress={() => handleEdit(data.item.id)}
                style={{ backgroundColor: '#00A41B', borderWidth: 0.2, width: '12%', height: '100%', flexWrap: 'wrap' }}
              >
                <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center', marginLeft: '10%' }}>
                  <FontAwesomeIcon icon={faCoins} color="white" size={20} />
                  <Text style={{ color: '#FFFFFF' }}>
                    Pagar
                  </Text>
                </View>
              </TouchableHighlight>
            </>
            :
            <></>
      }
    </View>
  );

  const onRowDidOpen = (rowKey) => {
    console.log('This row opened', rowKey);
  };

  return (
    <SwipeListView
      data={data}
      renderItem={renderItem}
      renderHiddenItem={renderHiddenItem}
      rightOpenValue={-150}
      previewRowKey={'0'}
      previewOpenValue={-40}
      previewOpenDelay={3000}
      onRowDidOpen={onRowDidOpen}
    />
  )
}

export default React.memo(SwipeList);