import axios from "axios";
// import store from "@/store";
import { MessagePlugin } from 'tdesign-vue';

const httpRequest = axios.create({
    baseURL: 'http://8.137.127.161:9771',
    timeout: 10000,
})

// 请求拦截器
httpRequest.interceptors.request.use(config => {
    // 1.当发送网络请求时, 在页面中添加一个loading组件, 作为动画
    // 2.某些网络请求要求用户必须登录, 判断用户是否有token, 如果没有token跳转到login页面
    // 3.对请求的参数进行序列化(看服务器是否需要序列化)

    // const userStore= store.state.user
    // const token=userStore.userInfo.token?userStore.userInfo.token:''
    // if (token) {
    //     config.headers['token'] = token
    // }
    // //拦截管理员请求，验证用户权限，如果identity 为true放行，否则抛出错误
    // if (config.url.includes("/admin")){
    //     if (!userStore.userInfo.data||!userStore.userInfo.data.user.role===0){
    //         MessagePlugin.warning('您没有权限访问该页面');
    //         throw new Error('您没有权限访问该页面')
    //     }
    // }
    return config;
}, error => {
    return Promise.reject(error);
}
)
// 响应拦截器
httpRequest.interceptors.response.use(response => {
     //console.log(response)
     if(response.data.message == '成功'){
        return response;//返回数据包
     }
     else if(response.data.message == '手机号或密码错误'){
        MessagePlugin.error(response.data.message);
        return response;//返回数据包
     }
    //一般而言，只需要返回data即可
     else if(response.data.code != 0){
        //MessagePlugin.warning(response.data.message);
        return response;//返回数据包
        // if (response.data.message === 'NOT_LOGIN') {
        //     const userStore = store.state.user
        //     userStore.clearUserInfo()
        //     router.push('/login')
        // }
    }else {
        MessagePlugin.success(response.data.message);
        return response;//返回数据包
    }

}, error => {
    return Promise.reject(error);
}
)
export default httpRequest;