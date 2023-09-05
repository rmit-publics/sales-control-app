import * as Location from 'expo-location';
import { useContext, useState, useEffect } from "react";

import { Button, SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import { AppContext } from "../context/AppContext";
import { GetByIdDB, InitDB } from '../service/DbLocalService';
import SaleInterface from '../interfaces/SaleInterface';

export default function Sale({route, navigation}) {
  const { id, pending } = route.params
  const { getSale, saveSale } = useContext(AppContext)
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const [product, setProduct] = useState("");
  const [value, setValue] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [cretead, setCreated] = useState("");

  let db

  useEffect(() => {
    const dataPending = async() => {
      db = await InitDB();
      const salesDB = await GetByIdDB(id, db);
      if(salesDB) {
        setProduct(salesDB[0].product)
        setDate(salesDB[0].date)
        setTime(salesDB[0].time)
        setValue(salesDB[0].amount+'')
      }
    }

    const dataOld = async () => {
      const sale = await getSale(id)
      if(sale) {
        setProduct(sale.product)
        setDate(sale.date)
        setTime(sale.time)
        setValue(sale.amount+'')
        setCreated(sale.created_at)
      }
    }

    if(id) {
      if(pending) {
        dataPending()
      } else {
        dataOld()
      }
    }
  },[])

  const save = async () => {
    let location = await Location.getCurrentPositionAsync({});
    location.coords.latitude = 1;
    location.coords.longitude = 1;
    setLocation(location);
    const amount  = Number(value)
    const payload: SaleInterface = {
      product,
      amount,
      date: date,
      time: time,
      lat: location.coords.latitude,
      lng: location.coords.longitude
    }
    const response = await saveSale(payload)
    if(response) {
      alert('Venda salva com sucesso.')
      navigation.navigate("Tabs")
    }

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
        {pending &&
          <View>
            <Text style={styles.pending}>Venda pendente de sincronização</Text>
          </View>
        }
        {!pending && id &&
          <View>
            <Text style={styles.sync}>Venda sincronizada em {cretead} </Text>
          </View>
        }
        <View style={styles.button}>
          {!id &&
            <Button onPress={save} title="Salvar" />
          }
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
  },
  pending:{
    fontWeight: 'bold',
    fontSize: 16,
    padding: 10,
    textAlign: 'center',
    backgroundColor: '#FF9966',
    marginTop: 10,
    borderRadius:10,
    color: '#333'
  },
  sync:{
    fontWeight: 'bold',
    fontSize: 16,
    padding: 10,
    textAlign: 'center',
    backgroundColor: '#99CC33',
    marginTop: 10,
    borderRadius:10,
    color: '#333'
  }

})