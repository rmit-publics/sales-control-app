import * as Location from 'expo-location';
import { useContext, useState, useEffect } from "react";

import { Button, SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import { AppContext } from "../context/AppContext";
import SaleInterface from '../interfaces/SaleInterface';
import { GetDB, InitDB } from '../service/DbLocalService';

export default function Sale({route}) {
  const { id, pending } = route.params
  const { getSale } = useContext(AppContext)
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [sale, setSale] = useState(null);

  const [product, setProduct] = useState("");
  const [value, setValue] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  let db

  useEffect(() => {
    const dataPending = async() => {
      db = await InitDB();
      const salesDB = await GetDB(db);
      if(salesDB) {
        const parseSales = salesDB.map((sale) => {
          const item = {
            id: sale.id,
            product: sale.product,
            roming: false,
            syncronized: false

          } as SaleInterface
          return item
        })
        setSale(parseSales)
      }
    }

    const dataOld = async () => {
      const sale = await getSale(id)
      if(sale) {
        setProduct(sale.product)
        setDate(sale.date)
        setTime(sale.time)
        setValue(sale.amount)
      }
    }

    if(pending) {
      dataPending()
    } else {
      dataOld()
    }
  },[])

  const save = async () => {
    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
    console.log(product,value,date,time);
  }

  return(
    <View style={styles.container}>
      <SafeAreaView />
      <View style={styles.form}>
        <View style={styles.field}>
          <Text style={styles.text}>Produto</Text>
          <TextInput style={styles.input} value={product} onChangeText={(product) => setProduct(product)}/>
        </View>
        <View style={styles.field}>
          <Text style={styles.text}>Valor</Text>
          <TextInput style={styles.input} value={value} onChangeText={(value) => setValue(value)}/>
        </View>
        <View style={styles.field}>
          <Text style={styles.text}>Data</Text>
          <TextInput style={styles.input} value={date} onChangeText={(date) => setDate(date)}/>
        </View>
        <View style={styles.field}>
          <Text style={styles.text}>Hora</Text>
          <TextInput style={styles.input} value={time} onChangeText={(time) => setTime(time)}/>
        </View>
        <View style={styles.button}>
          <Button onPress={save} title="Salvar" />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E6E6E6",
    justifyContent: "center",
  },
  form: {
    margin: 20
  },
  field:{

  },
  text: {

  },
  input: {
    borderBottomWidth: 1,
    height: 40
  },
  button: {
    marginTop: 10
  }

})