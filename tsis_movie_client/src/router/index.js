import Vue from 'vue'
import VueRouter from 'vue-router'

// Page
import Intro from '../views/Intro.vue'
import MovieMain from '../views/MovieMainPage.vue'
import MovieTable from '../views/MovieTablePage.vue'
import MovieConfirm from '../views/MovieConfirmPage.vue'
import BookLogin from '../views/BookLoginPage.vue'
import BookList from '../views/BookListPage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Intro',
    component: Intro
  },
  {
    path: '/movie',
    name: 'Movie',
    component: MovieMain
  },
  {
    path: '/table',
    name: 'Table',
    component: MovieTable,
    props: true
  },
  {
    path: '/confirm',
    name: 'Confirm',
    component: MovieConfirm,
    props: true
  },
  {
    path: '/book',
    name: 'BookLogin',
    component: BookLogin
  },
  {
    path: '/book/list',
    name: 'BookList',
    component: BookList
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
