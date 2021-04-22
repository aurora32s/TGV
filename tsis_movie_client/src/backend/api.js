import axios from 'axios'

/**
 * 1. 영화 예매 메인 화면 -> 영화 리스트 요청
 */
export function getMovies () {
  return axios.get('/movie/list')
}

/**
  * 2. 영화 상세 화면 -> 영화 상세 정보 요청
*/
export function getMovie (timeId) {
  return axios.get('/movie/detail/' + timeId)
}

/**
  * 3. 예매 정보 추가
*/
export function addBook (bookingData) {
  return axios.post('/movie/book', bookingData)
}

/**
  * 4. 예매 정보 삭제
*/
export function delBook (bookId) {
  return axios.get('/movie/book/del/' + bookId)
}
/**
  * 5. 예매 내역 정보 요청
*/
export function getBookList (phoneNo) {
  return axios.get('/movie/book/list/' + phoneNo)
}
