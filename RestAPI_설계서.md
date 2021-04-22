/**
  * RestAPI 설계서
*/

/**
  * 메인화면 -> 영화 리스트 요청
*/
path : '/movie/list'
method: GET

1. request
{

}

2. response
{
  resultCode: 0, // 결과
  resultMsg: 'api result msg',
  movies: [
    id: 0, // movie id
    name: 'movie name',
    image: 'movie image path',
    theater: 1, // theater no
    seatNo: 156, // 영화관 총 좌석 개수
    times: [ // 상영 시간
      time: '09:00', // movie time
      extraSeat: 20 // 남은 좌석 개수
    ]
  ]
}

3. Query
select
	E.time_id as id,
	M.name as name,
	M.image as image,
	C.theater_no as theater,
	C.theater_row * C.theater_column as seatNo,
	times
from
(
	select
		time_id,
		movie_id,
		theater_id,
		JSON_ARRAYAGG(
			JSON_OBJECT(
				'time', T.time,
				'extra', (
					select sum(people_no)
					from book B
					where B.time_id = T.time_id
					group by time_id
				)
			)
		) as times
	from time T
	group by T.movie_id, T.theater_id
) E, movie M, theater C
where E.movie_id = M.movie_id and E.theater_id = C.theater_id

/**
  * 영화 상세 화면 -> 영화 상세 정보 요청
*/
path: '/movie/:movieId'
method: GET

1. request
{

}

2. response
{
  resultCode: 0, // 결과
  resultMsg: 'api result msg',
  movie: {
    id: 0, // movie id
    name: 'movie name',
    image: 'movie image path',
    theater: 1, // theater no,
    totalSeat: 156, // 영화관 총 좌석 개수
    time: '08:30', // 상영시간
    booked: [ // 이미 예매된 좌석 정보
      {
        row: 1, // 행
        column: 4 // 열
      }
    ],
    price: 10000, // 영화 기본 가격,
    size: { // 상영관의 크기
      row: 22,
      column: 13
    }
  }
}

3. Query
select
	book_row as x,
	book_column as y
from seat S
where S.book_id in (select book_id from book where time_id = 1)

/**
  * 예매 정보 추가
*/
path: '/movie/book'
method: POST

1. request
{
  timeId: 0, // 영화 id
  phone: 'user phone no',
  seats: [ // 선택된 좌석 번호
    {
      row: 5,
      column: 3
    }
  ],
  peopleNo: 3 // 관람인원  
}

2. response
{
  resultCode: 0, // 결과
  resultMsg: 'api result msg',
  bookId: 1 // 예매 id
}

3. Query
(1) insert into book(time_id, phone, people_no) values(timeId, phone, peopleNo)
(2) insert into seat(book_id, book_row, book_column) valuse((1)에서 생성된 book_id, [seats.row], [seats.column])

/**
  * 예매 정보 삭제
*/
path: '/movie/book/del'
method: POST

1. request
{
  bookId: 1 // 예매 id
}

2. response
{
  resultCode: 0, // 결과
  resultMsg: 'api result msg'
}

/**
  * 예매 내역 정보 요청
/
path: '/movie/book/list'
method: GET

1. request
{
  phoneNo: '' // 사용자 휴대폰 번호
}

2. response
{
  books: [
    {
      bookId: 0, // 예매 id
      name: 'movie name',
      image: 'movie image path',
      theater: 1, // theater no
      time: '09:00', // 상영 시간
      price: 10000, // 영화 기본 가격
      peopleNo: 1, // 관림 인원
      seats: [ // 예매한 좌석 정보
        {
          row: 5,
          column: 6
        }
      ]
    }
  ]
}

3. Query
select
	E.book_id as id,
	M.name as name,
	M.image as image,
	C.theater_no as theater,
	E.time as time,
	M.price as price,
	E.people_no as peopleNo,
	E.seats as seats
from (
	select
		E.book_id,
		E.time_id,
		E.people_no,
		E.seats,
		T.movie_id,
		T.theater_id,
		T.time
	from
	(
		select
			B.book_id,
			B.time_id,
			B.people_no,
			JSON_ARRAYAGG(
				JSON_OBJECT(
					'row', S.book_row,
					'column', S.book_column
				)
			) as seats
		from (
			select * from Book where book_id=2
		) B join seat S
		on B.book_id = S.book_id
	) E, time T
	where E.time_id = T.time_id
) E, movie M, theater C
where E.movie_id = M.movie_id and C.theater_id = E.theater_id
