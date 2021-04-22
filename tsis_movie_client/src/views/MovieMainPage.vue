<template>
    <div class='box movie'>
        <div class='sub'>
            <div class='ly'>
                <img class='thum' src='../assets/images/icon.png'/>
                <p>영화의 모든 것</p>
                <strong class='com name'>TGV</strong>
            </div>
        </div>
        <div v-if='movies' class='container'>
            <ul class='mv_li'>
                <li v-for='(movie, index) in movies'
                    :key='movie.id'
                    class='mv_item'>
                    <p class='mv_name'>{{movie.name}}</p>
                    <div class='box_img' :class='{"select":index === currentMovieId}'
                        @click='selectMovie(index)'>
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
                    class='tm_item' @click='moveToTablePage(time)'>
                    <p class='tm_tm'>{{time.time}}</p>
                    <p class='tm_pl'>
                        <strong class='accent'>{{maxSeatNo - time.extraSeat}}</strong>석
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
import * as CloneDeep from 'lodash'
export default {
  name: 'MovieMainPage',
  data () {
    return {
      currentMovieId: 0,
      movies: undefined
    }
  },
  mounted () {
    this.requestMovieList()
  },
  computed: {
    maxSeatNo () { return this.movies[this.currentMovieId].seatNo },
    timeTable () { return this.movies[this.currentMovieId].times }
  },
  methods: {
    /**
     * 영화 리스트 요청
     */
    requestMovieList () {
      API.getMovies()
        .then((response) => {
          this.movies = response.data
          this.currentMovieId = 0
        })
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
    moveToTablePage (selectedTime) {
      const currentMovie = CloneDeep.cloneDeep(this.movies[this.currentMovieId])
      delete currentMovie.times
      currentMovie.time = selectedTime.time
      currentMovie.id = selectedTime.timeId
      this.$router.replace({ name: 'Table', params: { movie: currentMovie } })
    },
    /**
     * 영화 포스터 Click : 해당 영화의 상영시간으로 변경
     */
    selectMovie (movieIndex) {
      this.currentMovieId = movieIndex
    }
  }
}
</script>
