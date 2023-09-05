import { useContext, useState } from "react";
import Logo from "../../assets/log2.png";
import { Button, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { AppContext } from "../context/AppContext";

export default function Login ({ navigation }) {

    const { login } = useContext(AppContext)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const sendData = async () => {
      const response = await login(email, password)
      if(response) {
        navigation.navigate("Tabs")
      }
    }

    return(
      <View style={styles.container}>
        <View style={styles.box}>
          <View style={styles.boxLogo}>
            <Image style={styles.logo} source={Logo}/>
            <Text style={styles.title}>Sales Control</Text>
          </View>
          <Text style={styles.text}>E-mail</Text>
          <TextInput
            style={styles.input}
            onChangeText={(email) => setEmail(email)}
          />

          <Text style={styles.text}>Senha</Text>
          <TextInput
            style={styles.input} secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          />
          <Button onPress={() => {sendData()}} title="Entrar"/>
        </View>
      </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E6E6E6",
    alignItems: "center",
    justifyContent: "center",

  },
  box: {
    borderRadius: 10,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    padding: 20,
    justifyContent: "center",
  },
  text: {
    textAlign: 'left',
  },
  input:{
    width: 270,
    borderColor: 'silver',
    borderWidth: 1,
    height: 40,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 10,
    padding: 10
  },
  boxLogo: {
    flexDirection: 'row',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 20,
    marginLeft: 10,
    color: "#6198D8"
  },
  logo: {
    width: 70,
    height: 70,
  }
});