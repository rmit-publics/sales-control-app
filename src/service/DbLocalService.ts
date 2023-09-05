import * as SQLite from 'expo-sqlite';
import SaleInterface from '../interfaces/SaleInterface';

export async function InitDB() {
  const db =  SQLite.openDatabase('db.salesDb');
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS sales (id INTEGER PRIMARY KEY AUTOINCREMENT, product TEXT, amount INT, date TEXT, time TEXT, lat TEXT, lng TEXT)'
    )
  })
  return db
}

export async function DropTable(db: SQLite.Database) {
  db.transaction(tx => {
    tx.executeSql(
      'DROP TABLE IF EXISTS sales;',
      [], () => { console.log('entrou')},
      (_tx, error) => {
        console.log(error)
      });
  })
}

export async function InsertDB(sale: SaleInterface, db: SQLite.Database) {
  db.transaction(tx => {
    tx.executeSql('INSERT INTO sales (product, amount, date, time, lat, lng) values (?, ?, ?, ?, ?, ?)', [sale.product, sale.amount, sale.date, sale.time, sale.lat, sale.lng],
      (txObj, resultSet) => { console.log(resultSet)}
  )})
}

export async function DeleteDB(id: number, db: SQLite.Database) {
  db.transaction(tx => {
    tx.executeSql('DELETE FROM sales WHERE id = ?', [id],
      (txObj, resultSet) => { console.log(resultSet)}
  )})
}

export async function GetDB(db: SQLite.Database) : Promise<any> {

  let data = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM sales', null,
        (txObj, { rows: { _array } }) =>
          {
            resolve(_array)
          }
        ),
        (txObj, error) =>  reject(console.log('Error', error))
    })
  })
  return data
}

export async function GetByIdDB(id: number, db: SQLite.Database) : Promise<any> {

  let data = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM sales WHERE id = ?', [id],
        (txObj, { rows: { _array } }) =>
          {
            resolve(_array)
          }
        ),
        (txObj, error) =>  reject(console.log('Error', error))
    })
  })
  return data
}