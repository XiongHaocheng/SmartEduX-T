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
    
  //修改教师名
  export const changeTeacherNameAPI = (teacherid,teachername) => {
    return request({
      url: "/teacher/changeteachername", 
      method: "post",
      params:{
        teacherid: teacherid,
        teachername:teachername
    }
      });
    };
  //修改密码
  export const updatePasswordAPI = (teacherphone,oldpassword,newpassword) =>{
    return request({
      url:"/teacher/updatePassword",
      method:"post",
      data:{
        teacherphone,
        oldpassword,
        newpassword,
      }
    })
  };
  //获取学生管理页面信息
  export const getUserInfoAPI = () =>{
    return request({
      url:"/teacher/studentmanageinfo",
      method:"get",
    })
  };
  //获取学生的总学习时长
    export const getUserStudyTimeAPI = () =>{
    return request({
      url:"/teacher/studentstudytime",
      method:"get",
    })
  };