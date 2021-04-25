/**
 * DataBase Query
 */

/**
  * 1. 메인화면 -> 영화 리스트 요청
*/
const GET_MOVIE_LIST = '' +
'select '+
	'M.name as name,' +
	'M.image as image,' +
	'M.price as price,' +
	'C.theater_no as theater,' +
	'C.theater_row * C.theater_column as seatNo,' +
	'C.theater_row as seatRow,' +
    'C.theater_column as seatCol,' +
	'times ' +
'from ' +
'(' +
	'select ' +
		'time_id,' +
		'movie_id,' +
		'theater_id,' +
		'JSON_ARRAYAGG(' +
			'JSON_OBJECT(' +
				'"time", T.time, ' +
				'"extraSeat", (' +
					'select sum(people_no) ' +
					'from book B ' +
					'where B.time_id = T.time_id ' +
					'group by time_id' +
				'),' +
                '"timeId", T.time_id' +
			')' +
		') as times ' +
	'from time T ' +
	'group by T.movie_id, T.theater_id' +
') E, movie M, theater C ' +
'where E.movie_id = M.movie_id and E.theater_id = C.theater_id'

/**
  * 2. 영화 상세 화면 -> 영화 상세 정보 요청
*/
const GET_MOVIE_DETAIL = '' +
'select ' +
	'book_row as x, ' +
	'book_column as y ' +
'from seat S ' +
'where S.book_id in (select book_id from book where time_id = ?)'

/**
  * 3. 예매 정보 추가
*/
const ADD_MOVIE_BOOK = '' +
'insert into book(time_id, phone, people_no) values(?,?,?)'
const ADD_MOVIE_SEAT = '' +
'insert into seat(book_id, book_row, book_column) values(?,?,?)'

/**
  * 4. 예매 정보 삭제
*/
const DEL_MOVIE_BOOK = '' +
'delete from book where book_id=?'
// const DEL_MOVIE_SEAT = '' +
// 'delete from seat where book_id=?'

/**
  * 5. 예매 내역 정보 요청
*/
const GET_BOOK_LIST = '' +
'select ' +
	'E.book_id as id, ' +
	'M.name as name, ' +
	'M.image as image, ' +
	'C.theater_no as theater, ' +
	'E.time as time, ' +
	'M.price as price, ' +
	'E.people_no as peopleNo, ' +
	'E.seats as seats ' +
'from ( ' +
	'select ' +
		'E.book_id, ' +
		'E.time_id, ' +
		'E.people_no, ' +
		'E.seats, ' +
		'T.movie_id, ' +
		'T.theater_id, ' +
		'T.time ' +
	'from ' +
	'( ' +
		'select ' +
			'B.book_id, ' +
			'B.time_id, ' +
			'B.people_no, ' +
			'( ' +
				'select ' +
					'JSON_ARRAYAGG( ' +
						'JSON_OBJECT( ' +
							'"row", S.book_row, ' +
							'"column", S.book_column ' +
						') ' +
					') ' +
				'from seat S ' +
				'where S.book_id = B.book_id ' +
			') as seats ' +
		'from book B ' +
		'where B.phone = ?' +
	') E, time T ' +
	'where E.time_id = T.time_id ' +
') E, movie M, theater C ' +
'where E.movie_id = M.movie_id and C.theater_id = E.theater_id '

module.exports = {
  GET_MOVIE_LIST: GET_MOVIE_LIST,
  GET_MOVIE_DETAIL: GET_MOVIE_DETAIL,
  ADD_MOVIE_BOOK: ADD_MOVIE_BOOK,
  ADD_MOVIE_SEAT: ADD_MOVIE_SEAT,
  GET_BOOK_LIST: GET_BOOK_LIST,
  DEL_MOVIE_BOOK: DEL_MOVIE_BOOK,
  DEL_MOVIE_SEAT: DEL_MOVIE_SEAT
}