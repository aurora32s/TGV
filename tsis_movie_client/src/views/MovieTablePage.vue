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
                        관 {{movie.totalSeat}}석
                    </p>
                </div>
                <div class='tm_item'>
                    <p class='tm_tm'>{{movie.time}}</p>
                    <p class='tm_pl'>
                        <strong class='accent'>{{movie.totalSeat - movie.booked.length}}</strong>석
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
                    <tr v-for='row in movie.size.row'
                        :key='row'>
                        <th v-for='column in movie.size.column'
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
            :showUserInfoDialogFlag.sync='showUserInfoDialogFlag'/>
    </div>
</template>
<script>
import UserInfoDialog from '../components/Dialog/UserInfoDialog.vue'
export default {
  name: 'MovieTablePage',
  props: ['movieId'],
  components: { UserInfoDialog },
  data () {
    return {
      showUserInfoDialogFlag: false,
      peopleNo: 1,
      movie: {
        id: 0,
        name: '클레멘타인',
        image: require('../assets/images/aladdin.jpeg'),
        theater: 1,
        totalSeat: 156,
        time: '08:30',
        booked: [
          { row: 1, column: 4 },
          { row: 5, column: 3 },
          { row: 5, column: 2 },
          { row: 9, column: 10 },
          { row: 7, column: 3 },
          { row: 3, column: 4 }
        ],
        price: 10000,
        size: {
          row: 22,
          column: 13
        }
      },
      seats: {},
      selectedSeatNo: 0
    }
  },
  methods: {
    /**
     * 해당 좌석이 예매 되었는지 확인
     */
    checkSeatBooked (row, column) {
      for (const seat of this.movie.booked) {
        if (seat.row === row && seat.column === column) {
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
      this.peopleNo++
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
    }
  }
}
</script>
