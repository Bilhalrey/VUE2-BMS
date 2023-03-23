<template>
  <div>    
    <el-container>
        <el-aside width="auto"><common-aside/></el-aside>
        <el-container>
            <el-header><common-header/></el-header>
            <common-tag/>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
  </div>
</template>

<script>
import CommonAside from '@/components/CommonAside.vue'
import CommonHeader from '@/components/CommonHeader.vue'
import CommonTag from '@/components/CommonTag.vue'
export default {
  components: { CommonAside, CommonHeader, CommonTag },
    name:'Main'
}
</script>

<style lang="less" scoped>
.el-container{
    height: 100vh;
    .el-container{

        .el-header{
    
            padding: 0;
        }
    }
}


</style>