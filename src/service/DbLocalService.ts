import * as SQLite from 'expo-sqlite';

export async function InitDB() {
  const db = SQLite.openDatabase('db.salesDb');
  return db
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