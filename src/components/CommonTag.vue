<template>
    <div class="tags">
        <!-- 左侧导航栏高亮需要和当前动态绑定 已解决-->
        <!-- 刷新tag不变 已解决 -->
        <!-- el的tag属性比较完善 -->
        <el-tag
            v-for="item in tabList"
            :key="item.label" size="small"
            :closable="item.name !== 'home'"
            :effect="$route.name === item.name ? 'dark' : 'plain'"
            @click="changMenu(item)" @close="handleClose(item)">
            {{ item.label }}
        </el-tag>
    </div>
</template>

<script>
import router from '@/router'
import { mapMutations, mapState } from 'vuex'
export default {
    name:'CommonTag',
    data() {
        return {
        }
    },
    computed:{
        ...mapState('tab',['tabList'])
    },
    methods:{
        ...mapMutations('tab',['CLOSETAG']),
        //点击tag跳转
        changMenu(item){
            this.$router.push(item.path)
        },
        //删除tag
        handleClose(item){
            //判断tag位置
            this.CLOSETAG(item)
            //关闭后跳转到前一个页面
            this.$router.back()
            // state.tabList.forEach(element => {this.$router.push(element.path)})
        }
    }

}
</script>

<style lang="less" scoped>
.tags{
    padding: 10px 0 0 20px;
    .el-tag{
        margin-right: 15px;
        cursor: pointer;
       
    }
}
</style>