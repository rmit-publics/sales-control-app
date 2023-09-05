import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import SaleInterface from "../../interfaces/SaleInterface";

interface LineSalesInterface {
  navigation: any,
  sale: SaleInterface
}

export default function LineSale({navigation, sale} : LineSalesInterface) {

  const showSale = (id) => {
    navigation.navigate('Sale', {id: id})
  }

  return (
    <TouchableOpacity onPress={() => { showSale(sale.id) }}>
      <View style={styles.Line}>
        <View style={styles.Id}>
          <Text>{sale.id}</Text>
        </View>
        <View style={styles.Product}>
          <Text>{sale.product}</Text>
        </View>
        <View style={styles.Sync}>
          <Text>{sale.syncronized ? 'Sim' : 'Não'}</Text>
        </View>
        <View style={styles.Roming}>
          <Text>{sale.roming ? 'Sim': "Não"}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  Line: {
    flexDirection: "row",
    padding: 10,
    borderColor: 'silver',
    borderBottomWidth: 1,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 2
  },
  Id:{
    width: 30
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