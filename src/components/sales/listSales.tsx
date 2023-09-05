import { StyleSheet, Text, View } from "react-native"
import LineSale from "./lineSale"
import SaleInterface from "../../interfaces/SaleInterface"

interface ListSalesInterface {
  navigation: any,
  pending: boolean,
  sales: SaleInterface[]
}

export default function ListSales({navigation, pending, sales} : ListSalesInterface) {
  return(
    <View style={styles.content}>
        {sales.map((sale : SaleInterface) => (
          <LineSale key={pending ? (sale.id + Math.random()) : sale.id} pending={pending} navigation={navigation} sale={sale} />
        ))}
    </View>
  )
}

const styles = StyleSheet.create({
  content:{
    marginBottom: 100
  }
})