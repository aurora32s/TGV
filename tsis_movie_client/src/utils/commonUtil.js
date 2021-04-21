/**
 * 공통 Util 관리
 */

// 금액 Formatting
function formatNum (num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
export default {
  methods: {
    formatNum
  }
}
