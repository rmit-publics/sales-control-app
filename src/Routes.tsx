import React from "react";
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Tabs from "./Tabs";
import Login from "./Pages/login";
import Home from "./Tabs/Sales";
import Sale from "./Pages/Sale";

const Tab = createNativeStackNavigator()

export default function Rotas() {

  return(
    <>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Login" component={Login} options={{ headerShown: false}} />
          <Tab.Screen name="Tabs" component={Tabs} options={{ headerShown: false}} />
          <Tab.Screen name="Sale" component={Sale} options={{ headerShown: false}} />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  )
}