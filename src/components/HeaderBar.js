import React, { useContext, useState } from "react"
import { TouchableHighlight, View, Text, StyleSheet, Modal } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faShoppingCart, faBars, faPlus } from '@fortawesome/free-solid-svg-icons'
import { AppContext } from '../application/provider';
import _ from 'lodash'
import IconBadge from 'react-native-icon-badge';
import ModalAddExtra from "./ModalAddExtra"
import ModalCart from "./ModalCart"

export default HeaderBar = ({ title = "", navigation, showCart = true, showAdd = true }) => {
    const [state, setState] = useContext(AppContext)
    let [showModal, setShowModal] = useState(false)
    let [showModalExtra, setShowModalExtra] = useState(false)

    const handleMenu = () => {
        navigation.openDrawer();
    }

    const handleDeleteItem = (index) => {
        let newShoppingCart = _.find(state.shoppingCart, (item) => { return item.index === index });
        newShoppingCart.idState = 2;
        setState({ ...state, shoppingCart: [...state.shoppingCart] })
    }

    const handlePayment = () => {
        setState({ ...state, mod: "new", customer: { id: 0, docNum: 0, idUser: 0, name: "", deceased: "", phone: "", address: "", date: "", time: "", cart: [], subtotal: 0, total: 0, cash: 0, card: 0, creditCard: 0, discount: 0, user: "", createDate: "", delivery: false, note: "", discount: 0, extra: 0, idState: 1, pendingDate: false, salesName: "", transfer: 0, deposit: 0 } })
        setShowModal(false);
        navigation.navigate('payment')
    }

    const handlePressAdd = () => {
        setShowModalExtra(true);
    }

    const handleAddCartExtra = (item) => {
        setState({ ...state, isLoading: true })
        item.index = state.shoppingCart.length + 1;
        item.idState = 1;
        if(state.type == "CATALOGO FUNERARIO"){
            item.idArticulo = 83;
        }
        else{
            item.idArticulo = 85;
        }
        item.id = 0;
        item.Total = item.price;
        item.Precio = item.price;
        item.Nombre = item.name.toUpperCase();
        item.name = item.name.toUpperCase();
        item.label = item.label.toUpperCase();
        item.note = item.note.toUpperCase();
        item.Codigo = "EXTRA"
        setState({ ...state, isLoading: false, shoppingCart: [...state.shoppingCart, item] })
        setShowModalExtra(false);
    }

    return (
        <>
            <View style={styles.container}>
                <TouchableHighlight style={styles.menu} onPress={handleMenu}>
                    <FontAwesomeIcon icon={faBars} color="white" size={25} />
                </TouchableHighlight>
                <View style={styles.title}>
                    <Text style={styles.text}>{title}</Text>
                    <Text style={styles.subtext}>{state.type}</Text>
                </View>
                <View style={styles.actions}>
                    {
                        showAdd
                            ?
                            <TouchableHighlight style={styles.button} onPress={() => setShowModalExtra(true)}>
                                <FontAwesomeIcon icon={faPlus} color="white" size={25} />
                            </TouchableHighlight>
                            : <></>
                    }
                    {
                        showCart
                            ?
                            <IconBadge
                                MainElement={
                                    <TouchableHighlight style={styles.button} onPress={() => setShowModal(true)}>
                                        <FontAwesomeIcon icon={faShoppingCart} color="white" size={25} />
                                    </TouchableHighlight>
                                }
                                BadgeElement={
                                    <Text style={{ color: '#FFFFFF' }}>{_.filter(state.shoppingCart, { "idState": 1 }).length}</Text>
                                }
                                IconBadgeStyle={
                                    {
                                        width: 20,
                                        height: 20,
                                        backgroundColor: '#B00000'
                                    }
                                }
                                Hidden={_.filter(state.shoppingCart, { "idState": 1 }).length == 0}
                            />
                            : <></>
                    }
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
                <ModalCart onPressClose={() => setShowModal(false)} list={state.shoppingCart} handleDeleteItem={handleDeleteItem} handlePayment={handlePayment} isLoading={state.isLoading}/>
            </Modal>
            <Modal
                animationType="slide"
                transparent={true}
                visible={showModalExtra}
                onRequestClose={() => {
                    setShowModalExtra(false);
                }}
            >
                <ModalAddExtra onPressClose={() => setShowModalExtra(false)} handleAddCartExtra={handleAddCartExtra} isLoading={state.isLoading}/>
            </Modal>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        //position: 'absolute',
        height: 50,
        width: '100%',
        backgroundColor: "#3A3A3A",
        flexDirection: 'row'
    },
    menu: {
        marginTop: 8,
        marginLeft: 5,
        alignItems: 'center',
        justifyContent: 'center',
        width: '15%'
    },
    title: {
        marginTop: 8,
        marginLeft: 5,
        alignItems: 'center',
        justifyContent: 'center',
        width: '55%'
    },
    subtext: {
        color: '#FFFFFF',
        fontWeight: "bold",
        fontSize: 5
    },
    actions: {
        marginTop: 4,
        marginLeft: 5,
        alignItems: 'center',
        justifyContent: 'center',
        width: '30%',
        flexDirection: 'row'
    },
    button: {
        alignItems: "center",
        marginRight: 15,
    },
    text: {
        color: '#FFFFFF',
        fontWeight: "bold"
    }
});