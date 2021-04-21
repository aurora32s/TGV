<template>
    <div class='box movie'>
        <div class='sub'>
            <div class='ly'>
                <img class='thum' src='../assets/images/icon.png'/>
                <p>영화의 모든 것</p>
                <strong class='com name'>TGV</strong>
            </div>
        </div>
        <div class='container'>
            <ul class='mv_li'>
                <li v-for='movie in movies'
                    :key='movie.id'
                    class='mv_item'>
                    <p class='mv_name'>{{movie.name}}</p>
                    <div class='box_img' :class='{"select":movie.id === currentMovieId}'
                        @click='selectMovie(movie.id)'>
                        <img :src='movie.image' class='thum'/>
                    </div>
                    <p class='mv_place'>
                        <strong class='accent'>{{movie.theater}}</strong>
                        관 {{movie.seatNo}}석
                    </p>
                </li>
            </ul>
            <ul class='tm_li'>
                <li v-for='(time, index) in timeTable'
                    :key='index'
                    class='tm_item' @click='moveToTablePage'>
                    <p class='tm_tm'>{{time.time}}</p>
                    <p class='tm_pl'>
                        <strong class='accent'>{{time.extraSeat}}</strong>석
                    </p>
                </li>
            </ul>
        </div>
        <div class='btn con'>
            <button class='btn cancel' @click='onClickBackBtn'>돌아가기</button>
        </div>
    </div>
</template>
<script>
import * as API from '../backend/api'
export default {
  name: 'MovieMainPage',
  data () {
    return {
      currentMovieId: 0,
      movies: [
        {
          id: 0,
          name: '클레멘타인',
          image: require('../assets/images/aladdin.jpeg'),
          theater: 1,
          seatNo: 156,
          time: [
            {
              time: '09:00',
              extraSeat: 41
            },
            {
              time: '15:00',
              extraSeat: 12
            },
            {
              time: '21:00',
              extraSeat: 96
            }
          ]
        },
        {
          id: 1,
          name: '영웅',
          image: require('../assets/images/avengers.jpg'),
          theater: 2,
          seatNo: 100,
          time: [
            {
              time: '08:30',
              extraSeat: 98
            },
            {
              time: '13:30',
              extraSeat: 67
            },
            {
              time: '18:30',
              extraSeat: 2
            }
          ]
        },
        {
          id: 2,
          name: '성냥팔이 소녀의 재림',
          image: require('../assets/images/parasite.jpg'),
          theater: 3,
          seatNo: 144,
          time: [
            {
              time: '10:00',
              extraSeat: 98
            },
            {
              time: '14:00',
              extraSeat: 28
            },
            {
              time: '18:00',
              extraSeat: 35
            },
            {
              time: '22:00',
              extraSeat: 73
            }
          ]
        }
      ]
    }
  },
  mounted () {
    this.currentMovieId = 0
    this.requestMovieList()
  },
  computed: {
    timeTable () { return this.movies[this.currentMovieId].time }
  },
  methods: {
    /**
     * 영화 리스트 요청
     */
    requestMovieList () {
      API.getMovies()
        .then()
    },
    /**
     * 돌아가기 버튼 Click : 이전 화면(인트로 화면으로 이동)
     */
    onClickBackBtn () {
      this.$router.replace('/')
    },
    /**
     * 영화의 상영시간 Click : 해당 영화(상영시간) 좌석 예매
     * 페이지로 이동
     */
    moveToTablePage () {
      this.$router.replace({ name: 'Table', params: { movieId: this.currentMovieId } })
    },
    /**
     * 영화 포스터 Click : 해당 영화의 상영시간으로 변경
     */
    selectMovie (movieId) {
      this.currentMovieId = movieId
    }
  }
}
</script>
