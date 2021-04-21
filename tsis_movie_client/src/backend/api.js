import axios from 'axios'

/**
 * 1. 영화 예매 메인 화면 -> 영화 리스트 요청
 */
export function getMovies () {
  return axios.get('/movie/list')
}
