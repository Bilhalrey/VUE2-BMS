<template>
<el-row>
  <!-- 左 -->
  <el-col :span="8">
    <!-- 左上 -->
    <el-card class="box-card">
        <div class="user">
          <img src="../assets/images/bb.png">
          <div class="user-info">
            <p class="name">Admin</p>
            <p class="access">超级管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登录时间:<span>2022-1-1</span></p>
          <p>上次登录地点:<span>广东</span></p>
        </div>
    </el-card>
    <!-- 左下 -->
    <el-card style="margin-top:20px;height:437px;">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column v-for="(val,key) in tableLabel" :prop="key" :label="val" :key="key"></el-table-column>
      </el-table>
    </el-card>
  </el-col>         
  <!-- 右 -->
  <el-col :span="16" style="padding-left:20px">
    <!-- 右上 -->
    <div class="num">
      <el-card v-for="item in countData" :key="item.name" :body-style="{display:'flex',padding:0}">
        <i class="icon" :class="`el-icon-${item.icon}`" :style="{backgroundColor:item.color}"></i>
        <div class="detail">
          <p class="price">￥{{item.value}}</p>
          <p class="desc">{{item.name}}</p>
        </div>
      </el-card>
    </div>
    <!-- 右中 -->
    <el-card style="height:280px">
      <!-- 折线图 -->
      <div ref="echarts1" style="height:280px"></div>
    </el-card>
    <!-- 右下 -->
    <div class="graph">
      <el-card><div ref="echarts2" style="height:260px"></div></el-card>
      <el-card><div ref="echarts3" style="height:260px"></div></el-card>
    </div>
  </el-col>
</el-row>
</template>

<script>
import {getData} from '../api'
import * as echarts from 'echarts'
export default {
  name: "Home",
  data() {
    return {
      tableData: [],
      tableLabel:{
        name:'课程',
        todayBuy:'今日购买',
        monthBuy:'本月购买',
        totalBuy:'总购买'
      },
      countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
      ],
    }
  },
  mounted(){
    getData().then(({data})=>{
      const {tableData,orderData,userData,videoData} = data.data
      this.tableData = tableData

      /**
       * 
       * 折线图绘制区
       */
      //#region 
      //基于准备好的dom，初始化echarts结点
      const echarts1 = echarts.init(this.$refs.echarts1)
      //指定折线图匹配数据
      var e1Option = {}
      //取出xAxis
      const xAxis = Object.keys(orderData.data[0])
      e1Option.xAxis = {data: orderData.date}   //横坐标
      e1Option.yAxis = {}   //y坐标
      e1Option.legend = {data: xAxis} //图例
      e1Option.series = []   //数据
      xAxis.forEach(key=>{ 
        e1Option.series.push({
          name: key,
          type: 'line', //图表类型
          data: orderData.data.map(item => item[key]) //map会产生一个新数组，值是每次遍历的返回值
        })
      })
      // console.log(userData)
      //绘制图表
      echarts1.setOption(e1Option)
      //#endregion

      /**
       * 
       * 柱状图绘制区
       */
      //#region
      
      const echarts2 = echarts.init(this.$refs.echarts2)
      const e2Option ={
          legend: {textStyle: {color: "#333"}},  // 图例文字颜色
          grid: {left: "20%",},
          // 提示框
          tooltip: {
            trigger: "axis",
          },
          xAxis: {
            type: "category", // 类目轴
            data: userData.map(item => item.date),
            axisLine: {
              lineStyle: {
                color: "#17b3a3",
              },
            },
            axisLabel: {
              interval: 0,
              color: "#333",
            },
          },
          yAxis: [
            {
              type: "value",
              axisLine: {
                lineStyle: {
                  color: "#17b3a3",
                },
              },
            },
          ],
          color: ["#2ec7c9", "#b6a2de"],
          series: [
            {
              name:'新增用户',
              data:userData.map(item => item.new),
              type:'bar'
            },
            {
              name:'活跃用户',
              data:userData.map(item => item.active),
              type:'bar'
            },
          ],
        }
        echarts2.setOption(e2Option)
        //#endregion
    
      /**
       * 
       * 饼图绘制区
       */
      //#region 
      const echarts3 = echarts.init(this.$refs.echarts3)
      const e3Option ={
          tooltip: {trigger: "item",},
          color: [
            "#0f78f4",
            "#dd536b",
            "#9462e5",
            "#a6a6a6",
            "#e1bb22",
            "#39c362",
            "#3ed1cf",
          ],
          series: [{
            data:videoData,
            type:'pie'

          }],
      }
      echarts3.setOption(e3Option)



      //#endregion
    })

  }
};
</script>

<style lang="less" scoped>
.user{
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ccc;
  margin-bottom: 20px;
  padding-bottom: 20px;
  img{
    width: 150px;
    height: 150px;
    border-radius: 50%;
    margin-right: 40px;
  }
  .user-info{
    .name{
      font-size: 32px;
      margin-bottom: 10px;
    }
    .access{
      color: #999;
    }
  }
}
.login-info {
  p{
    line-height: 28px;
    font-size: 14px;
    color: #999999;
    span{
      color:#666666;
      margin-left: 60px;
    }
    
  }
}
.num{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-left: 20px;
  .el-card{
    width: 32%;
    margin-bottom:20px ;
  }
  .icon{
    width: 60px;
    height: 60px;
    font-size: 40px;
    text-align: center;
    line-height: 60px;
    color:#fff;
  }
  .detail{
    margin-left: 15px;
    display: flex;
    
    justify-content: center;
    flex-direction: column;
    .price{
      font-size: 20px;
      margin-bottom: 4px;
      line-height: 30px;
      height: 30px;
    }
    .desc{
      font-size: 14px;
      color:#999;
      text-align: center;
    }
  }
}
.graph{
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  .el-card{
    width: 48%;
    height: 280px;

  }
}
</style>