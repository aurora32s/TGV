<template>
    <div>
        <div class='layer'>
          <div class='box main'>
            <div class='title'>
                <img class='thum' src='../../assets/images/icon.png'/>
                <div class='txt'>
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
              <button class='btn cancel' @click='cancelMovieBook'>취소</button>
              <button class='btn confirm' @click='confirmMovieBook'>예매</button>
          </div>
        </div>
        <div id='dim'/>
    </div>
</template>
<script>
export default {
  name: 'UserInfoDialog',
  props: ['showUserInfoDialogFlag'],
  data () {
    return {
      phone_1: '', // 휴대폰번호 1
      phone_2: '', // 휴대폰번호 2
      phone_3: '' // 휴대폰번호 3
    }
  },
  methods: {
    /**
     * 취소 버튼 Click Event : Dialog 제거
     */
    cancelMovieBook () {
      this.$emit('update:showUserInfoDialogFlag', false)
    },
    /**
     * 확인 버튼 Click Event : 예매 Rest API
     * 성공 : 예매 확인 페이지로 이동
     * 실패 : 실패 메세지 show
     */
    confirmMovieBook () {
      const phone = this.phone_1 + this.phone_2 + this.phone_3
      if (phone.length < 11) { // 휴대폰 번호 전부 입력 안함.
        return
      } else if (/[^0-9]/.test(phone)) { // 문자 입력
        return
      }
      this.$emit('requestBook', phone)
    }
  }
}
</script>
