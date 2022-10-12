import  VueI18n from "vue-i18n"
import Vue from 'vue'
import enlocale from 'element-ui/lib/locale/lang/en'
import zhlocale from 'element-ui/lib/locale/lang/zh-CN'
import en from './en'
import zh from './zh'
import cookieJs from 'js-cookie'
Vue.use(VueI18n)
 const i18n = new VueI18n({

  locale:cookieJs.get('lang')||'en',
  messages:{
    zh:{
      h:'首页',
      ...zhlocale,
      ...zh
    },
    en:{
      h:'home',
      ...enlocale,
      ...en
    }
  }
 })
export default i18n