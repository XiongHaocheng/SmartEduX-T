import request from "./httpRequest.js";


export const teacherLoginAPI = (password,mobile) => {
  return request({
    url: "/teacher/login",
    method: "post",
    data:{
        teacherpassword: password,
        teacherphone: mobile,
    }
  })
};
export const teacherRegisterAPI = (password,mobile,name) => {
        return request({
        url: "/teacher/register",
        method: "post",
        data:{
            teacherpassword: password,
            teacherphone: mobile,
            teachername: name,
        }
        })
    };