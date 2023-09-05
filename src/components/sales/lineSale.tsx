import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import SaleInterface from "../../interfaces/SaleInterface";

interface LineSalesInterface {
  navigation: any,
  pending: boolean,
  sale: SaleInterface
}

export default function LineSale({navigation, pending, sale} : LineSalesInterface) {

  const showSale = (id) => {
    navigation.navigate('Sale', {id: id , pending})
  }

  return (
    <TouchableOpacity onPress={() => { showSale(sale.id) }}>
      <View style={pending ? {...styles.line, ...styles.pending }: styles.line }>
        <View style={styles.id}>
          <Text>{sale.id}</Text>
        </View>
        <View style={styles.product}>
          <Text>{sale.product}</Text>
        </View>
        <View style={styles.sync}>
          <Text>{sale.syncronized ? 'Sim' : 'Não'}</Text>
        </View>
        <View style={styles.roming}>
          <Text>{sale.roming ? 'Sim': "Não"}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  line: {
    flexDirection: "row",
    padding: 10,
    borderColor: 'silver',
    borderBottomWidth: 1,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 2
  },
  id:{
    width: 30
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
  pending:{
    backgroundColor: '#FF9966'
  }
})