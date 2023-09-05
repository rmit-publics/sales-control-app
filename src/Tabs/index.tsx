import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { SafeAreaView } from 'react-native-safe-area-context'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Sales from './Sales'


const Tab = createBottomTabNavigator()
const screenOptions = {
    tabBarStyle: {
        backgroundColor: "#6198D8"
    },
    tabBarActiveTintColor: "#fff",
    tabBarInactiveTintColor: "#fff"
}

const tabs = [
    {
        name: "Vendas",
        component: Sales,
        icon: 'briefcase-outline'
    },
]


export default function Tabs({ navigation }) {
    return(
        <>
          <SafeAreaView />
          <Tab.Navigator screenOptions={screenOptions}>
              {tabs.map((tab)=>(
                  <Tab.Screen
                      key={tab.name}
                      name={tab.name}
                      component={tab.component}
                      options={{
                          headerShown: false,
                          tabBarIcon: ({ color, size }) => (
                              <Ionicons name={tab.icon} color={color} size={size} />
                          )
                      }}
                  />
              ))}

          </Tab.Navigator>
        </>
    )
}