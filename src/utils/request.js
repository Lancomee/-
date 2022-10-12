import axios from 'axios';
import { Message } from 'element-ui';
import store from '@/store';
import router from '@/router';
let cancelArr =[]

// 取消所有请求
export function cancelAll(){
  cancelArr = cancelArr.filter((item)=>{
    item.fn()
    return false
  })
}

const service = axios.create({
  baseURL:process.env.VUE_APP_BASE_API
})

service.interceptors.request.use(
  config => {
    // // 找出相同api请求进行取消
    // cancelArr = cancelArr.filter((item)=>{
    //   if (item.url === config.url && item.method === config.method) {
    //     item.fn()
    //     return false
    //   }
    //   return true
    // })
    // config.cancelToken = new axios.CancelToken((cancelFn)=>{
    //   cancelArr.push({
    //     url:config.url,
    //     method:config.method,
    //     fn:cancelFn
    //   })
    //   console.log('cancelFn',cancelFn);
    // })


    config.headers.Authorization = `Bearer ${store.state.user.token}`
    return config
  },
  error =>{
    return Promise.reject(error)
  }
)
service.interceptors.response.use(
  res => {
    // 接口能连接上时,// 在响应拦截内只返回对应的data数据
    if (res.data.success) {
      return res.data
  }else{
    // 用户名和密码错误 的提示
    Message.error(res.data.message)
    return Promise.reject(res.data.message)
  }
  },
  error =>{
   console.dir(error);
    if (error.response.status === 401) {
      store.commit('user/logout')
      router.push('/login?redirect=' + window.location.href.split('#')[1])
      Message.error('登陆失败')
    }
  }
)
export default service