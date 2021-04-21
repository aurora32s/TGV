import axios from 'axios'

axios.interceptors.request.use((config) => {
  console.log('request>>> ', config.data)
}),
axios.interceptors.response.use((response) => {
  console.log(response)
},
(error) => {
  console.log(error)
})