<template>
  <div class="header-container">
    <div class="l-content">
        <el-button @click="handleMenu" icon="el-icon-menu" size="mini" style="margin-right:10px"></el-button>
        <!-- 面包屑 -->
        <!-- 刷新后面包屑会清空 已解决-->
        <!-- 面包屑，当前页面对应高亮 -->
        <!-- 点击当前路径相同的面包屑会报错 @click没用-->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item v-for="item in tabList" :key="item.name"
            :to="{ path: item.path }">{{item.label}}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <div class="r-content">
        <el-dropdown @command="handleClick">
            <span class="el-dropdown-link">
                <img class="user" src="../assets/images/bb.png" />
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>个人中心</el-dropdown-item>
                <el-dropdown-item command="setout">退出</el-dropdown-item>

            </el-dropdown-menu>
        </el-dropdown>
    </div>
  </div>
</template>

<script>
import Cookie from 'js-cookie'
import { mapState } from 'vuex'
export default {
    name:'CommonHeader',

    methods:{
        handleMenu(){
            this.$store.commit('tab/COLLAPSE_MENU')
        },
        handleClick(command){
            if(command === 'setout'){
                //清除cookie中的token
                Cookie.remove('token')
                this.$router.push('/login')
            }
           
        },

    },
    computed:{
        ...mapState('tab',['tabList']),
        // breadroute(){
        //     return JSON.parse(sessionStorage.getItem('breadroute'))
        // }
    },


}
</script>

<style lang="less" scoped>

.header-container{
    background-color: #333;
    height: 60px;
    padding: 0 20px;
    display: flex;
    justify-content: space-between; 
    align-items: center;
    .text{
        font-size: 14px;
        color:white;
        margin-left: 10px;
    }
    .user{
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
    .l-content{
        display: flex;
        align-items: center;
        /deep/.el-breadcrumb__item{
            .el-breadcrumb__inner{
                font-weight: normal;
                &.is-link{
                    color: #666;
                }
            }
            &:last-child{
                .el-breadcrumb__inner{
                    color:#fff
            }}
        }
    }
}

</style>