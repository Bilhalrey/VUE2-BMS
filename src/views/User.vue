<template>
  <div class="manage">
    <!-- 对话框 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="50%"  :before-close="handleClose">
        <!-- 表单 -->
        <el-form ref="form" :model="form" label-width="80px" :inline="true" :rules="rules">
            <el-form-item label="姓名" prop="name">
                <el-input placeholder="请输入姓名" v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="年龄" prop="age">
                <el-input placeholder="请输入年龄" v-model="form.age"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="sex">
                <el-select v-model="form.sex" placeholder="请输入性别">
                    <el-option label="女" :value="0"></el-option>
                    <el-option label="男" :value="1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="出生日期" prop="birth">
                <el-date-picker v-model="form.birth" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>
            <el-form-item label="地址" prop="addr">
                <el-input placeholder="请输入地址" v-model="form.addr"></el-input>
            </el-form-item>
        </el-form>
        <!-- 表单操作 -->
        <span slot="footer" class="dialog-footer">
            <el-button @click="cancel">取 消</el-button>
            <el-button type="primary" @click="submit">确 定</el-button>
        </span>
    </el-dialog>
    <!-- 用户列表 -->
    <div class="manage-header">
        <el-button @click="handleAdd" type="primary">+ 新增</el-button>
        <!-- 查询用户栏 -->
        <el-form :model="userForm" inline>
            <el-form-item prop="name">
                <el-input placeholder="请输入姓名" v-model="userForm.name"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
        </el-form>

    </div>
    <div  class="common-table">
        <el-table :data="tableData" style="width: 100%" height="90%" stripe>
                <el-table-column prop="name" label="姓名" width="200"></el-table-column>
                <el-table-column prop="age" label="年龄" width="200"></el-table-column>
                <el-table-column prop="sex" label="性别" width="200">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.sex === 0 ? '女':'男' }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="birth" label="出生日期" width="200"></el-table-column>
                <el-table-column prop="addr" label="地址" width="200"></el-table-column>
                <el-table-column label="操作" width="200">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
        </el-table>
        <div class="pager">
            <el-pagination layout="prev, pager, next" :total="total" @current-change="handlePage"> </el-pagination>
        </div>
    </div>
  </div>
</template>

<script>
import {addUser, getUser,editUser,delUser} from '../api'
export default {
    name: "User",
    data() {
        return {
        dialogVisible: false,
        form: {
            name: "",
            age: "",
            sex: "",
            birth: "",
            addr: "",
        },
        rules:{
            name:[{required: true, message: '请输入姓名'}],
            age:[{required: true, message: '请输入姓名'}],
            sex:[{required: true, message: '请输入姓名'}],
            birth:[{required: true, message: '请输入姓名'}],
            addr:[{required: true, message: '请输入姓名'}],
        },
        tableData:[],
        total:0,//总条目数
        modalType:0, //0表示新增弹窗，1表示编辑
        pageData:{
            page:1,
            limit:10
        },
        userForm:{
            name:''
        }
        };
    },
    methods:{
        //提交用户表单
        submit(){
            this.$refs.form.validate((valid)=>{
                if(valid){
                    if(this.modalType === 0 ){
                        addUser(this.form).then(()=>{
                            //重新加载列表
                            this.getList()
                        })
                    }else{
                        editUser(this.form).then(()=>{
                            //重新加载列表
                            this.getList()
                        })
                    }
                    this.handleClose()
                    //关闭弹窗
                    this.dialogVisible = false
                }
            })
        },
        handleClose(){
            this.$refs.form.resetFields()
        },
        //取消提交
        cancel(){
            this.handleClose()
            this.dialogVisible = false
        },
        handleEdit(index, row) {
            this.modalType = 1
            this.dialogVisible = true
            //需要深拷贝，深拷贝后的对象与原来不同，互不影响
            this.form = {...row}
        },
        handleDelete(index, row) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                delUser({id:row.id}).then(()=>{
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.getList()
                })
                
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
        handleAdd(){
            this.modalType = 0
            this.dialogVisible = true
        },
        //选择页面跳转
        handlePage(val){
            this.pageData.page = val
            this.getList()
        },
        //获取列表数据
        getList(){
            //这些参数是网址后面带的那些，所以不用传递给方法
            getUser({ params : {...this.userForm, ...this.pageData}}).then(({data})=>{
                this.tableData = data.list
                this.total = data.count || 0
            })
        },
        //查询用户
        onSubmit(){
            this.getList()
        }
    },
    mounted(){
        //获取用户列表
        this.getList()
    }
};
</script>

<style lang="less" scoped>
.manage{
    height: 100%;
    .manage-header{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .common-table{
        position: relative;
        height: calc(100% - 62px);
        .pager{
            position: absolute;
            right: 20px;
        }
    }
    
}
</style>