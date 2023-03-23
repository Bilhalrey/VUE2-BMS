import Cookie from "js-cookie"

export default{
    namespaced:true,
    state:{
        isCollapse:false,  //控制菜单状态 展开/收起
        tabList: JSON.parse(sessionStorage.getItem('breadroute')) || [{  //面包屑默认内容
            path:'/home',
            name:'home',
            label:'首页',
            icon:'s-home',
            url:'Home/Home'
        }],
        menu:[]
    },
    mutations:{
        //修改菜单展开收起
        COLLAPSE_MENU(state){
            state.isCollapse = !state.isCollapse
        },
        //更新面包屑
        UPDATE_BREAD(state,val) {
            //添加的数据不是首页
            if(val.name !== 'home'){
                const index = state.tabList.findIndex(item => item.name === val.name)
                //如果不存在index返回-1，存在返回索引
                if(index === -1){
                    state.tabList.push(val)
                    sessionStorage.setItem('breadroute',JSON.stringify(state.tabList))
                }
            }
        },
        CLOSETAG(state,val){
            state.tabList =  state.tabList.filter(item => item.name !== val.name)
            sessionStorage.setItem('breadroute',JSON.stringify(state.tabList))
        },
        //设置menu的数据，用于切换用户时显示不同的侧边栏、面包屑
        SET_MENU(state,val){
            state.menu = val
            Cookie.set('menu',JSON.stringify(val))//cookie的set方法必须是字符串
        },
        //动态注册路由，只可以通过侧边栏访问路由，不能通过地址访问
        ADD_MENU(state,router){
            //判断缓存中是否有数据
            if(!Cookie.get('menu')) return
            const menu = JSON.parse(Cookie.get('menu'))
            state.menu = menu
            //组装动态路由的数据
            const menuArray = []
            menu.forEach(item => {
                //有子菜单的情况
                if(item.children){
                    item.children.map(item=>{
                        item.component = ()=> import(`../views/${item.url}`)
                        return item
                    })
                    menuArray.push(...item.children)
                }else{
                    item.component = ()=> import(`../views/${item.url}`)
                    menuArray.push(item)
                }
                menuArray.forEach(item =>{
                    router.addRoute('Main',item)
                })
            });
        }


    }
}