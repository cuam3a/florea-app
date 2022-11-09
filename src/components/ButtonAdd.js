import React from "react";
import { TouchableHighlight, View, Text, Modal } from 'react-native'
import ModalAdd from "./ModalAdd"
import { AppContext } from '../application/provider';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import _ from 'lodash'

const ButtonAdd = ({ label, item }) => {
    let [showModal, setShowModal] = React.useState(false)
    const [state, setState] = React.useContext(AppContext)

    const handleAdd = () => {
        state.itemAdd = JSON.parse(JSON.stringify(item));
        setState({ ...state })
        setShowModal(true);
    }

    const handleAddCart = () => {
        setState({ ...state, isLoading: true })
        let obj = JSON.parse(JSON.stringify(state.itemAdd))
        obj.index = state.shoppingCart.length + 1;
        obj.idState = 1;
        obj.idArticulo = obj.id;
        obj.id = 0;
        obj.price = obj.Precio;
        obj.name = obj.Nombre;
        setState({ ...state, isLoading: false, itemAdd: {}, shoppingCart: [...state.shoppingCart, obj] })
        setShowModal(false);
    }

    const handleSetNote = (e) => {
        state.itemAdd.note = e
        setState({ ...state })
    }

    const handleSetLabel = (e) => {
        state.itemAdd.label = e
        setState({ ...state })
    }

    return (
        <>
            <TouchableHighlight onPress={handleAdd} title={item.Nombre} style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'stretch', alignSelf: 'stretch', backgroundColor: '#79BD62', borderRadius: 5, padding: 5, marginTop: 5, marginBottom: 5, minHeight: 30, width: "90%", marginLeft: "5%" }}>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', borderRadius: 10 }}>
                    <FontAwesomeIcon icon={faShoppingCart} color="white" size="15" />
                    <Text style={{ color: "white", marginLeft: 10 }}>{item.Nombre}</Text>
                </View>
            </TouchableHighlight>
            <Modal
                animationType="slide"
                transparent={true}
                visible={showModal}
                style={{position: 'absolute' }}
                onRequestClose={() => {
                    setShowModal(false);
                }}
            >
                <ModalAdd onPressClose={() => setShowModal(false)} handleAddCart={handleAddCart} handleSetNote={handleSetNote} itemAdd={state.itemAdd} handleSetLabel={handleSetLabel} isLoading={state.isLoading}/>
            </Modal>
        </>
    )
}

export default ButtonAdd;