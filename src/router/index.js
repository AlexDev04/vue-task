import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);
import TaskList from '@/components/pages/TaskList.vue'
import NotFound from '@/components/pages/NotFound.vue'
import UserList from '@/components/pages/UserList.vue'
import TaskView from '@/components/pages/TaskView.vue'
import TaskEdit from '@/components/pages/TaskEdit.vue'
import UserView from '@/components/pages/UserView.vue'

const routes = [
  {
    path: '/tasks',
    name: 'tasks',
    component: TaskList
  },
  {
    path: '/task/:id',
    name: 'task',
    component: TaskView,
    props: true
  },
  {
    path: '/taskEdit/:id',
    name: 'taskEdit',
    component: TaskEdit,
    props: true
  },
  {
    path: '/users',
    name: 'users',
    component: UserList
  },
  {
    path: '/user/:id',
    name: 'user',
    component: UserView,
    props: true
  },
  {
    path: '/nf',
    name: 'notFound',
    component: NotFound
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
