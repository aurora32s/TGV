/**
 * 개발 proxy 설정
 */

module.exports = {
  devServer: {
    proxy: {
      '^movie': {
        target: 'http://localhost:8086',
        changeOrigin: true
      }
    }
  }
}