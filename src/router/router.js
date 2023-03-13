import {createRouter, createWebHistory} from 'vue-router'

import Main from '@/pages/Main'
import PostsPage from '@/pages/PostsPage'
import PostIdPage  from '@/pages/PostIdPage'
import PostsPageWithStore from '@/pages/PostsPageWithStore'
import PostsPageComposition from '@/pages/PostsPageComposition'

const routes = [
  {
    path: '/',
    component: Main
  },
  {
    path: '/posts',
    component: PostsPage
  },
  {
    path: '/posts/:id',
    component: PostIdPage
  },
  {
    path: '/store',
    component: PostsPageWithStore
  },
  {
    path: '/composition',
    component: PostsPageComposition
  }
]

export const router = createRouter({
  routes,
  history: createWebHistory()
})