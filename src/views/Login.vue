<template>
    <el-card class="box-card">
        <el-form :model="form" :rules="rules" :inline="true" ref="form">
            <h3>系统登录</h3>
            <el-form-item label="用户名" prop="username">
                <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="form.password" placeholder="请输入密码" show-password></el-input>
            </el-form-item>
            <el-form-item class="btn">
                <el-button type="primary" @click="submitForm">登录</el-button>
                <el-button @click="resetForm">重置</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script>
import Cookie from 'js-cookie'
import {getMenu} from '../api'
export default {
    name:'Login',
    data() {
        return {
            form:{
                username:'',
                password:'',
            },
            rules:{
                username:[{ required: true, message: '请输入用户名', trigger: 'blur'}],
                password:[{ required: true, message: '请输入密码', trigger: 'blur'}],
            }
        }
    },
    methods:{
        submitForm(){
            //校验通过
            this.$refs.form.validate(valid => {
                if(valid){
                    getMenu(this.form).then(({data}) =>{
                        
                        if(data.code === 20000){
                            //token存入cookie
                            Cookie.set('token',data.data.token)

                            //获取菜单数据，存入store
                            this.$store.commit('tab/SET_MENU',data.data.menu)
                            this.$store.commit('tab/ADD_MENU',this.$router)

                            //跳转
                            this.$router.push('/home')
                        }else{
                             this.$message.error(data.data.message);
                        }
                    
                    })
                }
            })
            
        },
        resetForm(){
            this.form = {username:'',password:''}
        }
    }
    
    
}
</script>

<style lang="less" scoped>
.box-card {
    width: 350px;
    padding: 15px;
    text-align: center;
    border-radius: 10px;
    margin: 180px auto 0;
    
    h3{ 
        margin-bottom: 35px;
    }
  }
</style>