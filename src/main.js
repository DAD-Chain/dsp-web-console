import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css'
import '@/assets/style/clearDefaultStyle.less'
import VueClipboards from 'vue-clipboard2'
Vue.use(VueClipboards);
import { inspectLogin, getCache, setCache, timeFormatting, updateUserCache, getFileURL, tagsRestore, payDad, formatTimes } from '@/tools/publicFn'
import { message } from 'ant-design-vue';
Vue.prototype.$message = message;
Vue.prototype.$timeFormatting = timeFormatting;
Vue.prototype.$getCache = getCache;
Vue.prototype.$setCache = setCache;
Vue.prototype.$getFileURL = getFileURL;
Vue.prototype.$formatTimes = formatTimes;
Vue.prototype.$payDad = payDad;
Vue.prototype.$updateUserCache = updateUserCache;
Vue.prototype.$tagsRestore = tagsRestore;
Vue.use(Antd);
Vue.prototype.inspectLogin = inspectLogin;
Vue.config.productionTip = false;
new Vue({
    router,
    render: (h) => h(App),
}).$mount("#app");
