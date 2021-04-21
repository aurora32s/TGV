<template>
    <div class='box book'>
        <div class='layer'>
          <div class='box main'>
            <div class='title'>
                <img class='thum' src='../assets/images/icon.png'/>
                <div class='txt'>
                    <p class='tmp'>예매할 때 입력한</p>
                    <strong class='accent'>휴대폰</strong>번호를 입력해 주세요.
                </div>
            </div>
          </div>
          <div class='info'>
            <input type='text' class='type input txt'
              :maxlength="3" v-model='phone_1'/>
            -
            <input type='text' class='ph input txt'
              :maxlength="4" v-model='phone_2'/>
            -
            <input type='text' class='ph input txt'
              :maxlength="4" v-model='phone_3'/>
          </div>
          <div class='con'>
              <button class='btn cancel' @click='cancelBookLogin'>돌아가기</button>
              <button class='btn confirm' @click='confirmBookLogin'>확인</button>
          </div>
        </div>
    </div>
</template>
<script>
export default {
  name: 'BookLoginPage',
  data () {
    return {
      phone_1: '', // 휴대폰번호 1
      phone_2: '', // 휴대폰번호 2
      phone_3: '' // 휴대폰번호 3
    }
  },
  methods: {
    /**
     * 취소 버튼 Click : 예매 확인 로그인 취소 -> 인트로 화면으로 이동
     */
    cancelBookLogin () {
      history.back()
    },
    /**
     * 확인 버튼 Click : 로그인 REST API 요청
     */
    confirmBookLogin () {
      const phone = this.phone_1 + this.phone_2 + this.phone_3
      if (phone.length < 11) { // 휴대폰 번호 전부 입력 안함.
        return
      } else if (/[^0-9]/.test(phone)) { // 문자 입력
        return
      }
      this.$router.push('/book/list')
    }
  }
}
</script>
