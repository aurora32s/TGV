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
                <img class='thum' :src='bookedInfo.image'/>
                <div class='mv_info'>
                    <p class='mv_title'>{{bookedInfo.name}}</p>
                    <div class='tm_item'>
                        <p class='tm_tm'><strong class='accent'>{{bookedInfo.theater}}</strong>관</p>
                        <p class='tm_pl'>{{bookedInfo.time}}</p>
                    </div>
                    <div class='mv_mon'>
                        <p class='tm_tm'>영화</p>
                        <p class='tm_pl'>{{formatNum(bookedInfo.price)}}원</p>
                    </div>
                    <div class='mv_mon'>
                        <p class='tm_tm'>관림인원</p>
                        <p class='tm_pl'>{{bookedInfo.peopleNo}}명</p>
                    </div>
                    <div class='line'/>
                    <div class='mv_total'>
                        <p class='tm_pl'>
                            총
                            <strong class='accent'>{{formatNum(bookedInfo.price * bookedInfo.peopleNo)}}</strong>
                            원
                        </p>
                    </div>
                </div>
            </div>
            <div class='mv_seat'>
                좌석 정보
                <div class='seat_con'>
                    <div v-for='(seat, index) in bookedInfo.seats'
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
            <button class='btn cancel' @click='showDoubleBtnDialog'>예매 취소</button>
            <button class='btn confirm' @click='moveToMoviePage'>확인</button>
        </div>
        <DoubleBtnDialog v-if='showDoubleBtnDialogFlag'
            :msg='"영화 예매를 취소하시겠습니까?"'
            :onClickConfirmBtn='cancelMovieBook'
            :onClickCancelBtn='hideDoubleBtnDialog'/>
    </div>
</template>
<script>
import * as API from '../backend/api'
import DoubleBtnDialog from '../components/Dialog/DoubleBtnDialog'
export default {
  name: 'MovieConfirmPage',
  props: ['backPath', 'bookedInfo'],
  components: {
    DoubleBtnDialog
  },
  data () {
    return {
      showDoubleBtnDialogFlag: false
    }
  },
  methods: {
    /**
     * 예매 취소 버튼 Click : 예매 취소 REST API 요청
     */
    cancelMovieBook () {
      console.log(this.bookedInfo)
      API.delBook(this.bookedInfo.id)
        .then((response) => {
          console.log(response.data)
          this.moveToMoviePage()
        })
    },
    /**
     * 확인 버튼 Click : 영화 예매 메인 화면으로 이동
     */
    moveToMoviePage () {
      this.$router.push({ name: this.backPath, params: { phone: this.bookedInfo.phone } })
    },
    /**
     * 예매 취소 버튼 Click : 취소 확인 dialog show
     */
    showDoubleBtnDialog () {
      this.showDoubleBtnDialogFlag = true
    },
    /**
     * Double Btn Dialog -> 취소 버튼
     */
    hideDoubleBtnDialog () {
      this.showDoubleBtnDialogFlag = false
    }

  }
}
</script>
