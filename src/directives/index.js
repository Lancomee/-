import store from "@/store/index"
export default{
   // 自定义指令----解决图片出错问题
   directives: {
    imgerror: {
      bind() {},
      inserted(dom, obj) {
        dom.src = dom.src || obj.value
        dom.onerror = () => {
          dom.src = obj.value
        }
      },
      update() {},
      componentUpdated(dom,obj) {
        dom.src = dom.src || obj.value
      },
      unbind(dom){
        dom.onerror = null
      }
    },
    btnShow:{
      inserted(dom,obj){
        setBtn(dom,obj)
      },
      componentUpdated(dom,obj){
        setBtn(dom,obj)
      }
    }
  },
}
function setBtn(dom,obj) {
  if (store.state.user.userInfo.roles.points.includes(obj.value)) {
    if (obj.arg==='inlineBlock') {
      dom.style.display='inline-block'
    } else {
      dom.style.display='block'
    }
    
  }else{
    dom.style.display='none'
  }
}