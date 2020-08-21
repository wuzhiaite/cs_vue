
import VueI18n from 'vue-i18n'
import Vue from 'vue';
import zh from './zh-cn';
import hk from './zh-hk';
import en from './en-us';


Vue.use(VueI18n)

const messages = {
  "zh-cn":zh,
  "zh-hk":hk,
  "en-us":en
}


// eslint-disable-next-line no-unused-vars
const i18n = new VueI18n({
    // locale: 'zh-cn',
    messages,
    fallbackLocale: 'zh-cn',
    formatFallbackMessages: true,
    silentFallbackWarn:true,//避免退到 fallbackLocale 产生警告
})

export default i18n;








