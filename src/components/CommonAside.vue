<template>
    <el-menu :default-active="this.$route.path" class="el-menu-vertical-demo"
    :collapse="isCollapse" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
        <h3>{{isCollapse?'后台':'后台管理系统'}}</h3>
        <el-menu-item @click="clickMenu(item)" v-for="item in noChildren" :key="item.name" :index="item.path">
            <i :class="`el-icon-${item.icon}`"></i>
            <span slot="title">{{item.label}}</span>
        </el-menu-item> 
        <el-submenu v-for="item in hasChildren" :key="item.label" :index="item.label">
            <template slot="title">
                <i :class="`el-icon-${item.icon}`"></i>
                <span slot="title">{{item.label}}</span>
            </template>
            <el-menu-item-group v-for="subItem in item.children" :key="subItem.name" >
                <el-menu-item @click="clickMenu(subItem)" :index="subItem.path">{{subItem.label}}</el-menu-item>
            </el-menu-item-group>        
        </el-submenu>
    </el-menu>
</template>

<script>
import { mapState } from 'vuex';
import Cookie from 'js-cookie'
export default {
    name:'CommmonAside',

    methods: {
        clickMenu(item){
            //如果当前路径和跳转路径相同则不跳转
            if(this.$route.path !== item.path){
                this.$router.push(item.path)
            }
            this.$store.commit('tab/UPDATE_BREAD',item)
        }
    },
    computed:{
        //没有子菜单
        noChildren(){
            return this.menuData.filter(item => !item.children )
        },
        //有子菜单
        hasChildren(){
            return this.menuData.filter(item => item.children )
        },
        ...mapState('tab',['isCollapse']),
        // ...mapState('tab',['menu']),
        menuData(){
            return JSON.parse(Cookie.get('menu')) || this.$store.state.tab.menu
        }

        // isCollapse(){
        //     return this.$store.state.tab.isCollapse
        // }
    }

}
</script>

<style lang="less" scoped>

 .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;

  }
  .el-menu{
    h3{
        color: aliceblue;
        text-align: center;
        line-height: 48px;
        font-size: 16px;
        font-weight: 400;
    }
    border: 0;
    height: 100vh;
    

  }
</style>