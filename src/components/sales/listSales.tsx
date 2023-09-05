import { Text, View } from "react-native"
import LineSale from "./lineSale"
import SaleInterface from "../../interfaces/SaleInterface"

interface ListSalesInterface {
  navigation: any,
  sales: SaleInterface[]
}

export default function ListSales({navigation, sales} : ListSalesInterface) {
  return(
    <View>
        {sales.map((sale : SaleInterface) => (
          <LineSale key={sale.id} navigation={navigation} sale={sale} />
        ))}
    </View>
  )
}