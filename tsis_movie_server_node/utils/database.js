/**
 * manage MySQL DBMS Connection
 */

// MySQL
const mysql = require('mysql')
const DB_INFO = {
  host: 'localhost', // 사용할 DB가 설치된 호스트의 IP
  port: '3306', // DB 포트번호(MySQL은 Default 3306)
  user: 'root', // DB user name
  password: 'Round32s!@', // DB user password
  database: 'TGV' // 사용할 DB 이름
}
module.exports = {
  init: () => { // DB init
    return mysql.createConnection(DB_INFO)
  },
  connect: (conn) => { // DB Connect
    conn.connect((error) => {
      if (error) { // 에러 발생
        console.log('Error to connect MySQL DB >>> ' + error)
      } else {
        console.log('Success to connect MySQL DB')
      }
    })
  }
}