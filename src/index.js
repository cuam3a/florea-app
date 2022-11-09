import React from "react"
import { Login, Home, Catalog, Detail, Payment, PaymentAccount, StateAccount} from './views'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Component from './components/'

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function Menu() {
    return (
        <Drawer.Navigator initialRouteName="login" screenOptions={{ headerShown: false }} drawerContent={(props) => <Component.DrawerMenu {...props} />}>
            <Drawer.Screen name="login" component={Login} options={{ swipeEnabled: false, drawerLabel: () => null, title: null, drawerIcon: () => null, headerShown: false }} />
            <Drawer.Screen name="home" component={Home} />
            <Drawer.Screen name="catalog" component={Catalog} />
            <Drawer.Screen name="detail" component={Detail} />
            <Drawer.Screen name="payment" component={Payment} />
            <Drawer.Screen name="paymentAccount" component={PaymentAccount} />
            <Drawer.Screen name="stateAccount" component={StateAccount} />
        </Drawer.Navigator>
    );
  }

function FloreaApp(){
    return(
        <NavigationContainer>
            <Menu></Menu>
        </NavigationContainer>
    )
}

function RouteWrapper({
    component: Component,
    ...rest
  }) {
    return (
      <Route exact {...rest} render={(props) =>
          <Component {...props} />
      } />
    );
  }

  export default FloreaApp;