import React, { useContext, useEffect, useState } from 'react'
import { Button, RootTagContext, ScrollView, StyleSheet, Text, View } from "react-native";
import ListSales from '../components/sales/listSales';
import SaleInterface from '../interfaces/SaleInterface';
import * as Location from 'expo-location';
import { GetDB, InitDB } from '../service/DbLocalService';
import { AppContext } from '../context/AppContext';

export default function Sales({navigation}) {
  const { getSales } = useContext(AppContext)
  const [sales, setSales] = useState<SaleInterface[]>([])
  const [localSales, setLocalSales] = useState<SaleInterface[]>([])
  let db
  useEffect(() => {
    const data = async() => {
      db = await InitDB();
      const salesDB = await GetDB(db);

      if(salesDB) {
        const parseSales = salesDB.map((sale) => {
          const item = {
            id: 0,
            product: sale.product,
            roming: false,
            syncronized: false

          } as SaleInterface
          return item
        })
        setLocalSales(parseSales)

        const oldSales = await getSales()

        const parseOldSales = oldSales.map((sale) => {
          const item = {
            id: sale.id,
            product: sale.product,
            roming: sale.roming,
            syncronized: true

          } as SaleInterface
          return item
        })
        setSales(parseOldSales)
      }
    }
    data()
  },[])

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }

    })();
  }, []);

  return(
    <View>
      <Text>Vendas</Text>
      <View style={styles.line}>
      <View style={styles.id}>
        <Text>#</Text>
      </View>
      <View style={styles.product}>
        <Text>Produto</Text>
      </View>
      <View style={styles.sync}>
        <Text>Sincronizado</Text>
      </View>
      <View style={styles.roming}>
        <Text>Roming</Text>
      </View>
    </View>
      <ScrollView>
        {localSales.length > 0 &&
          <>
            <Text style={styles.title}>Pendentes sincronização</Text>
            <ListSales navigation={navigation} pending={true} sales={localSales} />
          </>
        }
        {sales.length > 0 &&
          <>
            <Text style={styles.title}>Lançadas</Text>
            <ListSales navigation={navigation} pending={false} sales={sales} />
          </>
        }
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  line: {
    flexDirection: "row",
    padding: 10,
    margin: 10,
    backgroundColor: '#6198D8',
  },
  id:{
    width: 30,
  },
  product:{
    width: 120
  },
  sync: {
    width: 90
  },
  roming: {
    width: 90
  },
  title: {
    fontWeight: 'bold',
    padding: 10,
    fontSize: 20,
    marginLeft: 5
  },
})