/**
 * 개발 proxy 설정
 */

module.exports = {
  devServer: {
    proxy: {
      '/movie': {
        target: 'http://localhost:8085',
        changeOrigin: true
      }
    }
  }
}