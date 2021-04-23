<template>
    <div class='box table'>
        <div class='sub'>
            <div class='container'>
                <div class='mv_item'>
                    <div class='box_img'>
                        <img class='thum' :src='movie.image'/>
                    </div>
                    <p class='mv_name'>{{movie.name}}</p>
                    <p class='mv_place'>
                        <strong class='accent'>{{movie.theater}}</strong>
                        관 {{movie.seatNo}}석
                    </p>
                </div>
                <div class='tm_item'>
                    <p class='tm_tm'>{{movie.time}}</p>
                    <p class='tm_pl'>
                        <strong class='accent'>{{extraSeatNo}}</strong>석
                    </p>
                </div>
            </div>
        </div>
        <div class='table'>
            <div>
                <div class='tb_mem'>
                    관람인원
                    <div class='tb_count'>
                        <button class='btn minus none'
                            @click='subPeopleNo'>-</button>
                        {{peopleNo}}
                        <button class='btn plus'
                            @click='addPeopleNo'>+</button>
                    </div>
                </div>
                <p class='tb_mon'>{{formatNum(movie.price)}} X {{peopleNo}}</p>
            </div>
            <div class='tb_total'>
                총
                <strong class='accent'>
                    {{formatNum(movie.price * peopleNo)}}
                </strong>
                원
            </div>
            <div class='tb_screen'>Screen</div>
            <div class='tb_seat'>
                <table>
                    <tr v-for='row in movie.seatRow'
                        :key='row'>
                        <th v-for='column in movie.seatCol'
                            :key='column'>
                            <button class='seat_item' :disabled='checkSeatBooked(row, column)'
                                @click='addSeat($event, row, column)'>
                                {{String.fromCharCode(row + 64)}}-{{column}}
                            </button>
                        </th>
                    </tr>
                </table>
            </div>
            <div class='btn con'>
                <button class='btn cancel' @click='moveToMoviePage'>취소</button>
                <button class='btn confirm' @click='showUserInfoDialog'>확인</button>
            </div>
        </div>
        <UserInfoDialog v-if='showUserInfoDialogFlag'
            :showUserInfoDialogFlag.sync='showUserInfoDialogFlag'
            @requestBook='requestBook'/>
        <SingleBtnDialog v-if='showSingleBtnDialogFlag'
          :msg='"데이터 정보를 받아오는데 실패하였습니다."'
          :onClickConfirmBtn='moveToMoviePage'/>
    </div>
</template>
<script>
import * as API from '../backend/api'
import UserInfoDialog from '../components/Dialog/UserInfoDialog.vue'
import SingleBtnDialog from '../components/Dialog/SingleBtnDialog'
export default {
  name: 'MovieTablePage',
  props: ['movie'],
  components: { UserInfoDialog, SingleBtnDialog },
  data () {
    return {
      showUserInfoDialogFlag: false,
      peopleNo: 1,
      seats: {},
      extraSeatNo: 0,
      selectedSeatNo: 0,
      bookedSeat: [],
      showSingleBtnDialogFlag: false
    }
  },
  created () {
    this.requestMovie()
  },
  methods: {
    /**
     * 영화 세부정보 요청
     */
    requestMovie () {
      API.getMovie(this.movie.id)
        .then((response) => {
          this.bookedSeat = response.data
          this.extraSeatNo = this.movie.seatNo - this.bookedSeat.length
        })
        .catch(() => {
          this.showSingleBtnDialogFlag = true
        })
    },
    /**
     * 해당 좌석이 예매 되었는지 확인
     */
    checkSeatBooked (row, column) {
      for (const seat of this.bookedSeat) {
        if (seat.x === row && seat.y === column) {
          return true
        }
      }
      return false
    },
    /**
     * 영화 예매 화면으로 이동
     */
    moveToMoviePage () {
      this.$router.push('/movie')
    },
    /**
     * 사용자 정보 입력 alert show
     */
    showUserInfoDialog () {
      if (this.selectedSeatNo < this.peopleNo) return
      this.showUserInfoDialogFlag = true
    },
    /**
     * 관람인원 수 마이너스
     */
    subPeopleNo () {
      if (this.peopleNo > 1) {
        this.peopleNo--
      }
    },
    /**
     * 관람인원 수 추가
     */
    addPeopleNo () {
      if (this.peopleNo < this.extraSeatNo) {
        this.peopleNo++
      }
    },
    /**
     * 좌석 추가/제거
     */
    addSeat (event, row, column) {
      // 체크 안 된 구역
      if (event.target.id === '') {
        if (this.selectedSeatNo === this.peopleNo) {
          return
        }
        this.seats[row + '' + column] = {
          row: row, column: column
        }
        event.target.id = 'selected'
        this.selectedSeatNo++
      } else {
        delete this.seats[row + '' + column]
        event.target.id = ''
        this.selectedSeatNo--
      }
    },
    /**
     * 예매 등록 요청
     */
    requestBook (phoneNo) {
      const bookInfo = {
        timeId: this.movie.id,
        phone: phoneNo,
        peopleNo: this.peopleNo,
        seats: this.seats
      }
      API.addBook(bookInfo)
        .then((response) => {
          this.showUserInfoDialogFlag = false
          bookInfo.id = response.data.bookId
          this.$router.push({
            name: 'Confirm',
            params: {
              backPath: 'Movie',
              bookedInfo: Object.assign(this.movie, bookInfo)
            }
          })
        })
        .catch(() => {
          this.showUserInfoDialogFlag = false
          this.showSingleBtnDialogFlag = true
        })
    }
  }
}
</script>
