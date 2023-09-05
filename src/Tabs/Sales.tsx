import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from "react-native";
import ListSales from '../components/sales/listSales';
import SaleInterface from '../interfaces/SaleInterface';
import * as Location from 'expo-location';

export default function Sales({navigation}) {

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const sales: SaleInterface[] = [
    {
      id: 1,
      product: 'teste',
      syncronized: false,
      roming: false
    },
    {
      id: 2,
      product: 'teste',
      syncronized: false,
      roming: false
    },
    {
      id: 3,
      product: 'teste',
      syncronized: false,
      roming: false
    },
    {
      id: 4,
      product: 'teste',
      syncronized: false,
      roming: false
    },
    {
      id: 5,
      product: 'teste',
      syncronized: false,
      roming: false
    },
  ]
  return(
    <View>
      <Text>Vendas</Text>
      <View style={styles.Line}>
      <View style={styles.Id}>
        <Text>#</Text>
      </View>
      <View style={styles.Product}>
        <Text>Produto</Text>
      </View>
      <View style={styles.Sync}>
        <Text>Sincronizado</Text>
      </View>
      <View style={styles.Roming}>
        <Text>Roming</Text>
      </View>
    </View>
      <ListSales navigation={navigation} sales={sales} />
    </View>
  )
}

const styles = StyleSheet.create({
  Line: {
    flexDirection: "row",
    padding: 10,
    margin: 10,
    backgroundColor: '#6198D8',
  },
  Id:{
    width: 30,
  },
  Product:{
    width: 120
  },
  Sync: {
    width: 90
  },
  Roming: {
    width: 90
  }
})