import * as SQLite from 'expo-sqlite';

export async function InitDB() {
  const db = SQLite.openDatabase('db.salesDb');
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS sales (id INTEGER PRIMARY KEY AUTOINCREMENT, product TEXT, amount INT, date TEXT, time TEXT)'
    )
  })
  return db
}

export async function DropTable(db: SQLite.Database) {
  db.transaction(tx => {
    tx.executeSql(
      'DROP TABLE sales;', [],
      (tx, results) => {
        if (results && results.rows && results.rows._array) {
          /* do something with the items */
          // results.rows._array holds all the results.
          console.log(JSON.stringify(results.rows._array));
          console.log('table dropped')
        } else {
          console.log('no results')
        }
      },
    )
  })
}

export async function InsertDB(db: SQLite.Database) {
  db.transaction(tx => {
    tx.executeSql('INSERT INTO sales (product, amount, date, time) values (?, ?, ?, ?)', ['gibberish', 100, 'teste', 'teste'],
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