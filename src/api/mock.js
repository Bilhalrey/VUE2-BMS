import Mock from 'mockjs'
import homeApi from './modeServerData/home'
import user from './modeServerData/user'
import permission from './modeServerData/permission'
//定义mock请求拦截
Mock.mock('/api/home/getData',homeApi.getStatisticalData)

//用户列表的数据
Mock.mock('/api/user/add','post', user.createUser)
Mock.mock('/api/user/edit','post', user.updateUser)
Mock.mock('/api/user/del','post', user.deleteUser)
Mock.mock(/api\/user\/getUser/, user.getUserList) //如果要传递参数就得这么写

Mock.mock(/api\/permission\/getMenu/,'post', permission.getMenu)