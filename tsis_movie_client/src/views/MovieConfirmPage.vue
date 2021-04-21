<template>
    <div class='box movie'>
        <div class='sub'>
            <div class='ly'>
                <p class='subtitle'><strong class='accent'>예매</strong>확인</p>
                <img class='thum' src='../assets/images/icon.png'/>
                <p>영화의 모든 것</p>
                <strong class='com name'>TGV</strong>
            </div>
        </div>
        <div class='book container'>
            <div class='mv_con'>
                <img class='thum' :src='movie.image'/>
                <div class='mv_info'>
                    <p class='mv_title'>{{movie.name}}</p>
                    <div class='tm_item'>
                        <p class='tm_tm'><strong class='accent'>{{movie.theater}}</strong>관</p>
                        <p class='tm_pl'>{{movie.time}}</p>
                    </div>
                    <div class='mv_mon'>
                        <p class='tm_tm'>영화</p>
                        <p class='tm_pl'>{{formatNum(movie.price)}}원</p>
                    </div>
                    <div class='mv_mon'>
                        <p class='tm_tm'>관림인원</p>
                        <p class='tm_pl'>{{movie.people}}명</p>
                    </div>
                    <div class='line'/>
                    <div class='mv_total'>
                        <p class='tm_pl'>
                            총
                            <strong class='accent'>{{formatNum(movie.price * movie.people)}}</strong>
                            원
                        </p>
                    </div>
                </div>
            </div>
            <div class='mv_seat'>
                좌석 정보
                <div class='seat_con'>
                    <div v-for='(seat, index) in movie.seats'
                        :key='index'
                        class='tm_item'>
                        <strong class='accent'>
                            {{String.fromCharCode(seat.row + 64)}}
                        </strong>
                        -{{seat.column}}
                    </div>
                </div>
            </div>
        </div>
        <div class='btn con'>
            <button class='btn cancel' @click='cancelMovieBook'>예매 취소</button>
            <button class='btn confirm' @click='moveToMoviePage'>확인</button>
        </div>
    </div>
</template>
<script>
export default {
  name: 'MovieConfirmPage',
  props: ['backPath'],
  data () {
    return {
      movie: {
        id: 0,
        name: '영웅',
        image: require('../assets/images/avengers.jpg'),
        theater: 1,
        time: '08:30',
        price: 10000,
        people: 2,
        seats: [
          { row: 1, column: 4 },
          { row: 3, column: 5 },
          { row: 4, column: 7 },
          { row: 9, column: 9 },
          { row: 10, column: 1 },
          { row: 11, column: 2 },
          { row: 2, column: 3 }
        ]
      }
    }
  },
  methods: {
    /**
     * 예매 취소 버튼 Click : 예매 취소 REST API 요청
     */
    cancelMovieBook () {
      console.log('cancelMovieBook')
    },
    /**
     * 확인 버튼 Click : 영화 예매 메인 화면으로 이동
     */
    moveToMoviePage () {
      this.$router.push(this.backPath)
    }
  }
}
</script>
