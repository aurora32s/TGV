/**
 * tsis movie server by node js
 */

const express = require('express')
const bodyParser = require('body-parser')
const app = express()

// DB
const DB_CONFIG = require(__dirname + '/utils/database')
const DB_CONN = DB_CONFIG.init()
const QUERY = require(__dirname + '/utils/query')

DB_CONFIG.connect(DB_CONN)

// PORT
const PORT = 8085
const COMMON_END_POINT = '/movie'

// app(express) 설정
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

/**
  * 1. 메인화면 -> 영화 리스트 요청
*/
app.get(COMMON_END_POINT + '/list', (req, res) => {
  var sql = QUERY.GET_MOVIE_LIST
  DB_CONN.query(sql, (error, rows, fields) => {
    if (error) {
      console.log('Fail to execute query')
    } else {
      for (const row of rows) {
        row['times'] = JSON.parse(row.times)
      }
      res.send(rows)
    }
  })
})

/**
  * 2. 영화 상세 화면 -> 영화 상세 정보 요청
*/
app.get(COMMON_END_POINT + '/detail/:timeId', (req, res) => {
    var sql = QUERY.GET_MOVIE_DETAIL
    DB_CONN.query(sql, req.params.timeId, (error, rows, fields) => {
      if (error) {
        console.log('Fail to execute query')
      } else {
        res.send(rows)
      }
    })
})

/**
  * 3. 예매 정보 추가
*/
app.post(COMMON_END_POINT + '/book', (req, res) => {
    const body = req.body
    console.log('ADD Book Req>>> ', body)
    // 예약 정보 추가
    DB_CONN.query(QUERY.ADD_MOVIE_BOOK, [body.timeId, body.phone, body.peopleNo], (error, rows) => {
      if (error) {
        console.log('Fail to add booking data >>> ' + error)
      } else {
        // 좌석 정보 추가
        try {
            for (const seat of Object.keys(body.seats)) {
                addSeatInfo(rows.insertId, body.seats[seat])
            }
        } catch (exception) {
          console.log('add book exception >>> ', exception)
          res.send({
            resultMsg: 'Data Base Error',
            resultCode: '1004'
          })
        }
        console.log('add book finish >>> ')
        res.send({
          resultMsg: 'OK',
          resultCode: '200',
          bookId: rows.insertId
        })
      }
    })
})

const addSeatInfo = async (bookId, seat) => {
    await DB_CONN.query(QUERY.ADD_MOVIE_SEAT,
        [bookId, seat.row, seat.column], (error, rows) => {
        if (error) {
            console.log('Fail to add booking seats data >>> ' + error)
            throw new Error()
        }
    })
}

/**
  * 4. 예매 정보 삭제
*/
app.get(COMMON_END_POINT + '/book/del/:bookId', (req, res) => {
    const bookId = req.params.bookId
    console.log(bookId)
    DB_CONN.query(QUERY.DEL_MOVIE_BOOK, bookId, (error, rows) => {
      if (error) {
        console.log('Fail to del book >>> ' + error)
      } else {
        res.send({
          resultMsg: 'OK',
          resultCode: 200
        })
      }
    })
})
/**
  * 5. 예매 내역 정보 요청
*/
app.get(COMMON_END_POINT + '/book/list/:phoneNo', (req, res) => {
    const phoneNo = req.params.phoneNo
    DB_CONN.query(QUERY.GET_BOOK_LIST, phoneNo, (error, rows) => {
      if (error) {
        console.log('Fail to get booking list >>> ' + error)
      } else {
        console.log('get book list finish >>> ')
        for (const row of rows) {
          row['seats'] = JSON.parse(row.seats)
        }
        res.send(rows)
      }
    })
})

app.listen(PORT, () => {
  console.log('staring server listening... PORT >>> ' + PORT)
})