import { useState } from "react";
import * as Location from 'expo-location';

import { Button, SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";

export default function Sale({}) {

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const [product, setProduct] = useState("");
  const [value, setValue] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

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
          <TextInput style={styles.input} onChangeText={(product) => setProduct(product)}/>
        </View>
        <View style={styles.field}>
          <Text style={styles.text}>Valor</Text>
          <TextInput style={styles.input} onChangeText={(value) => setValue(value)}/>
        </View>
        <View style={styles.field}>
          <Text style={styles.text}>Data</Text>
          <TextInput style={styles.input} onChangeText={(date) => setDate(date)}/>
        </View>
        <View style={styles.field}>
          <Text style={styles.text}>Hora</Text>
          <TextInput style={styles.input} onChangeText={(time) => setTime(time)}/>
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