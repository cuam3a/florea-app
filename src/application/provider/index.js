import React, { createContext, useState } from 'react';

const MyProvider = (props) => {
    const initialState =  {
        id: 0,
        name: "",
        customer: { id: 0, idUser: 0, name: "", deceased: "", phone: "", address: "", date: "", time: "", cart: [], subtotal: 0, total: 0, cash: 0, card: 0, creditCard: 0, discount: 0, user: "", createDate: "", delivery: false, note: "", salesName: "", discount: 0, extra: 0, idState: 1, FolioAFN: "", idSolicitudAFN: null },
        shoppingCart: [],
        itemAdd: {},
        category: [],
        product: [],
        sellers: [],
        addresses: [],
        cxc: [],
        sales: [],
        isLoading: false,
        mod: "",
        type: ""
    }
    
    const [state, setState] = useState(initialState);

    return ( 
        <AppContext.Provider value = {[ state, setState ]} > 
            { props.children } 
        </AppContext.Provider>  
    );
}

export default MyProvider;
export const AppContext = createContext();