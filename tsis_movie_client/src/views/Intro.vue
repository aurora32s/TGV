<template>
    <div class='box main'>
        <div class='title'>
            <img class='thum' src='../assets/images/icon.png'/>
            <div class='txt'>
                <strong class='accent'>무엇</strong>을 하고 싶으신 가요?
            </div>
        </div>
        <div class='sub'>
            <button class='btn fr' @click='moveToMoviePage'>
                영화 예매
            </button>
            <button class='btn sc' @click='moveToBookPage'>
                예매 확인
            </button>
        </div>
    </div>
</template>
<script>
export default {
  name: 'Intro',
  methods: {
    /**
     * 영화 예매 화면으로 이동
     */
    moveToMoviePage () {
      this.$router.replace('/movie')
    },
    /**
     * 예매 내역 화면으로 이동
     */
    moveToBookPage () {
      this.$router.push('/book')
    }
  }
}
</script>
