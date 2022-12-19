import Vue from 'vue'
import Router from 'vue-router'
import Developer from '@/components/Developer'
import Issues from '@/components/Issues'
import Releases from '@/components/Releases'
import Bar from '@/components/bar'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/Developers',
      name: 'Developer',
      component: Developer
    },
    {
      path: '/Issues',
      name: 'Issues',
      component: Issues
    },
    {
      path: '/Releases',
      name: 'Releases',
      component: Releases
    },
    {
      path: '/bar',
      name: 'Bar',
      component: Bar
    }
  ]
})
