import Vue from 'vue'
import Router from 'vue-router'
import Memes from '@/components/Memes'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Memes',
      component: Memes
    }
  ]
})
