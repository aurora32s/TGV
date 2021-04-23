<template>
    <div class='box movie'>
        <div class='sub'>
            <div class='ly'>
                <p class='subtitle'><strong class='accent'>예매</strong>내역</p>
                <img class='thum' src='../assets/images/icon.png'/>
                <p>영화의 모든 것</p>
                <strong class='com name'>TGV</strong>
            </div>
        </div>
        <div v-if='movies' class='container history'>
            <ul class='mv_li'>
                <li v-for='(movie, index) in movies' :key='movie.id'
                class='mv_item'>
                    <p class='mv_name'>{{movie.name}}</p>
                    <div class='box_img' @click='moveToMovieConfirmPage(index)'>
                        <img class='thum' :src='movie.image'/>
                    </div>
                    <div class='tm_item'>
                        <p class='tm_tm'>
                            <strong class='accent'>{{movie.theater}}</strong>관</p>
                        <p class='tm_pl'>{{movie.time}}</p>
                    </div>
                </li>
            </ul>
        </div>
        <div class='btn con'>
            <button class='btn cancel' @click='onClickBackBtn'>돌아가기</button>
        </div>
        <SingleBtnDialog v-if='showSingleBtnDialogFlag'
          :msg='"데이터 정보를 받아오는데 실패하였습니다."'
          :onClickConfirmBtn='closeSingleBtnDialog'/>
    </div>
</template>
<script>
import * as API from '../backend/api'
import SingleBtnDialog from '../components/Dialog/SingleBtnDialog'
export default {
  name: 'BookListPage',
  props: ['phone'],
  components: { SingleBtnDialog },
  data () {
    return {
      movies: undefined,
      showSingleBtnDialogFlag: false
    }
  },
  created () {
    console.log(this.phone)
    this.requestBookList()
  },
  methods: {
    /**
     * 예매 내역 정보 요청
     */
    requestBookList () {
      API.getBookList(this.phone)
        .then((response) => {
          console.log(response)
          this.movies = response.data
        })
        .catch(() => {
          this.showSingleBtnDialogFlag = true
        })
    },
    /**
     * 예매 내역 상세 페이지로 이동
     */
    moveToMovieConfirmPage (movieIndex) {
      const movie = this.movies[movieIndex]
      movie.phone = this.phone
      this.$router.push({
        name: 'Confirm',
        params: {
          backPath: 'BookList',
          bookedInfo: movie
        }
      })
    },
    /**
     * 이전 화면으로 돌아가기
     */
    onClickBackBtn () {
      this.$router.push('/')
    },
    /**
     * Single Btn Dialog Confirm Btn Event
     */
    closeSingleBtnDialog () {
      this.showSingleBtnDialogFlag = false
    }
  }
}
</script>
