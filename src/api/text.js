import request from '../utils/request.js'
export function login() {
  return request({
    url:"/sys/login",
    methods:"post",
    data:{
      mobile:'13800000002',
      password:'123456'
    }
  })
 

}