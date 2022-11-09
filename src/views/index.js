import React from 'react';
import LoginView from './login';
import HomeView from './home';
import CatalogView from './catalog';
import DetailView from './detail';
import PaymentView from './payment';
import StateAccountView from './stateAccount';
import PaymentAccountView from './paymentAccount'

const Login = (props) => <LoginView {...props}/>;
const Home = (props) => <HomeView {...props}/>;
const Catalog = (props) => <CatalogView  {...props}/>;
const Detail = (props) => <DetailView  {...props}/>;
const Payment = (props) => <PaymentView  {...props}/>;
const StateAccount = (props) => <StateAccountView  {...props}/>;
const PaymentAccount = (props) => <PaymentAccountView  {...props}/>;

export {  Login, Home, Catalog, Detail, Payment, StateAccount, PaymentAccount };