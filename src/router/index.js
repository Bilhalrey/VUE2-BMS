import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import User from '../views/User'
import Login from '../views/Login'
import Main from '../views/Main'
import Mall from '../views/Mall'
import PageOne from '../views/PageOne'
import PageTwo from '../views/PageTwo'
Vue.use(VueRouter)

//1、创建路由组件在views文件夹中
//2、路由映射组件
const routes = [
    { 
        //主路由
        path: '/', 
        component: Main ,
        name:'Main',
        redirect:'/login',//重定向，当是/的时候跳转到home
        children:[
            // { path: 'home',name: 'home', component: Home },
            // { path: 'user',name: 'user', component: User },
            // { path: 'mall',name: 'mall', component: Mall },
            // { path: 'page1',name: 'page1', component: PageOne },
            // { path: 'page2',name: 'page2', component: PageTwo },
        ]
    },
    {
        path:'/login',
        component:Login
    }
]
//3、创建 router 实例
const router = new VueRouter({
    routes // (缩写) 相当于 routes: routes
  })

  export default router