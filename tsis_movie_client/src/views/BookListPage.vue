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
        <div class='container history'>
            <ul class='mv_li'>
                <li v-for='movie in movies' :key='movie.id'
                class='mv_item'>
                    <p class='mv_name'>{{movie.name}}</p>
                    <div class='box_img' @click='moveToMovieConfirmPage'>
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
    </div>
</template>
<script>
export default {
  name: 'BookListPage',
  data () {
    return {
      currentMovieId: 0,
      movies: [
        {
          id: 0,
          name: '클레멘타인',
          image: require('../assets/images/aladdin.jpeg'),
          theater: 1,
          time: '08:30'
        },
        {
          id: 1,
          name: '영웅',
          image: require('../assets/images/avengers.jpg'),
          theater: 2,
          time: '12:30'
        },
        {
          id: 2,
          name: '성냥팔이 소녀의 재림',
          image: require('../assets/images/parasite.jpg'),
          theater: 3,
          time: '18:30'
        }
      ]
    }
  },
  methods: {
    /**
     * 예매 내역 상세 페이지로 이동
     */
    moveToMovieConfirmPage () {
      this.$router.push({ name: 'Confirm', params: { backPath: '/book/list' } })
    },
    /**
     * 이전 화면으로 돌아가기
     */
    onClickBackBtn () {
      history.back()
    }
  }
}
</script>
