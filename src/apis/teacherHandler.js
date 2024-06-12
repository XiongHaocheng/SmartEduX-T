import request from "./httpRequest.js";

//教师登录
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
//教师注册
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
//课程信息获取
export const getBigcourseInfoAPI = () => {
  return request({
  url: "/teacher/bigcourseinfo",
  method: "get",
  })
  };
//上传文件
export const uploadPDFAPI = (courseid,fileName,filepath) => {
  return request({
    url: "/teacher/upload", 
    method: "post",
    params:{
      courseid: courseid,
      filename: fileName,
      filepath: filepath,
  }
    });
  };
  //查看文件
  export const getAttachmentPathAPI = (courseid) => {
    return request({
      url: "/teacher/download", 
      method: "get",
      params:{
        courseid: courseid,
    }
      });
    };
  //删除文件
  export const deleteAttachmentAPI = (courseid) => {
    return request({
      url: "/teacher/delete", 
      method: "post",
      params:{
        courseid: courseid,
    }
      });
    };