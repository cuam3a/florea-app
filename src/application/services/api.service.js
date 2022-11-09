import axios from "axios";
import { AsyncStorage } from 'react-native'
import _ from 'lodash';

const getURLServer = async () => {
    return await AsyncStorage.getItem('SERVER');
}

const login = async (data) => {
    let res = {};
    let URL_SERVER = await getURLServer();
    if(URL_SERVER != null && URL_SERVER != ""){
        await axios({
            url: URL_SERVER + '/Florea/Login',
            method: 'POST',
            data: { Usuario: data.user, Password: data.password },
            timeout: 1000 * 10 //10 segundos
        })
        .then(function(response) {
            res = response.data;
        })
        .catch(function(error) {
            res.Error = error.message && "ERROR CONEXION SERVIDOR";
        })
    }
    else{
        res.Error = "VERIFICAR DIRECCION DEL SERVIDOR"
    }
    return res;
}

const setSale = async (data, type) => {
    console.log("DATA SEND: " + data)
    let res = {};
    let URL_SERVER = await getURLServer();

    let objData = {};
    objData.Carro = [];
    objData.id = data.id;
    objData.Folio = data.docNum;
    objData.idUsuario = data.idUser;
    objData.idSolicitudAFN = data.idSolicitudAFN;
    objData.Cliente = data.name;
    objData.Finado = data.deceased;
    objData.Telefono = data.phone;
    objData.DireccionEntrega = data.address;
    objData.TipoEntrega = data.delivery;
    if(data.pendingDate){
        objData.FechaEntrega = "1999-01-01";
    }
    else{
        objData.FechaEntrega = data.date + " " + data.time;
    }
    
    objData.NotaEntrega = data.note;
    objData.Subtotal = data.subtotal;
    objData.Extra = data.extra;
    objData.Descuento = data.discount;
    objData.Total = data.total;
    objData.Efectivo = data.cash;
    objData.Transferencia = data.transfer;
    objData.Deposito = data.deposit;
    objData.Tarjeta = data.card;
    objData.TarjetaCredito = data.creditCard;
    objData.Vendedor = data.salesName;
    objData.FechaPendiente = data.pendingDate;
    if(type === "sale"){
        objData.idEstado = 6;
    }
    if(type === "cxc"){
        objData.idEstado = 5;
    }
    _.forEach(data.cart, (item) => {
        let objCar = {};
        objCar.id = item.id;
        objCar.idArticulo = item.idArticulo;
        objCar.Nombre = item.Nombre;
        objCar.Codigo = item.Codigo;
        objCar.Total = item.Precio;
        objCar.Nota = item.note;
        objCar.Etiqueta = item.label;
        objData.Carro.push(objCar);
    })
    await axios({
            url: URL_SERVER + '/Florea/Venta',
            method: 'POST',
            data: objData
        })
        .then(function(response) {
            res = response.data;
        })
        .catch(function(error) {
            res.Error = error.message && "ERROR CONEXION SERVIDOR";
        })
    console.log(res)
    return res;
}

const getCxC = async (id) => {
    let res = {};
    let URL_SERVER = await getURLServer();

    await axios({
            url: URL_SERVER + '/Florea/SolicitudesCxC?_idUsuario=' + id,
            method: 'POST',
            timeout: 1000 * 10 //10 segundos
        })
        .then(function(response) {
            res = response.data;
        })
        .catch(function(error) {
            console.log(error)
            res.Error = error.message && "ERROR CONEXION SERVIDOR";
        })
    console.log(res)
    return res;
}

const getSales = async (id) => {
    let res = {};
    let URL_SERVER = await getURLServer();

    await axios({
            url: URL_SERVER + '/Florea/SolicitudesVenta?_idUsuario=' + id,
            method: 'POST',
            timeout: 1000 * 10 //10 segundos
        })
        .then(function(response) {
            res = response.data;
        })
        .catch(function(error) {
            res.Error = error.message && "ERROR CONEXION SERVIDOR";
        })
    console.log(res)
    return res;
}

const getLiquidate = async (id) => {
    let res = {};
    let URL_SERVER = await getURLServer();

    await axios({
            url: URL_SERVER + '/Florea/LiquidarVenta?_idUsuario=' + id,
            method: 'POST',
            timeout: 1000 * 10 //10 segundos
        })
        .then(function(response) {
            res = response.data;
        })
        .catch(function(error) {
            res.Error = error.message && "ERROR CONEXION SERVIDOR";
        })
    console.log(res)
    return res;
}

const getLastLiquidate = async (id) => {
    let res = {};
    let URL_SERVER = await getURLServer();

    await axios({
            url: URL_SERVER + '/Florea/UltimoCorte?_idUsuario=' + id,
            method: 'POST',
            timeout: 1000 * 10 //10 segundos
        })
        .then(function(response) {
            res = response.data;
        })
        .catch(function(error) {
            res.Error = error.message && "ERROR CONEXION SERVIDOR";
        })
    console.log(res)
    return res;
}

const getServicesAFN = async (num, name) => {
    let res = {};
    let URL_SERVER = await getURLServer();
    
    await axios({
            url: URL_SERVER + '/Florea/BuscarServicioAFN',
            method: 'POST',
            data: { FolioAFN: num, Finado: name },
            timeout: 1000 * 10 //10 segundos
        })
        .then(function(response) {
            res = response.data;
        })
        .catch(function(error) {
            res.Error = error.message && "ERROR CONEXION SERVIDOR";
        })
    console.log(res)
    return res;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    login,
    setSale,
    getCxC,
    getSales,
    getLiquidate,
    getURLServer,
    getLastLiquidate,
    getServicesAFN
};