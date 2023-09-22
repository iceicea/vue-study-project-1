import service from "../service";
import qs from "qs";
//登陆接口
const Login = (data) => {
  return service({
    method: "post",
    url: "/login",
    data,
  });
};
//学生列表查询接口

const students = (params) => {
  return service({
    method: "get",
    url: "/students",
    params,
  });
};

//学生列表删除接口

const studentDel = (id) => {
  return service({
    method: "delete",
    url: `/students/${id}`,
  });
};
//信息列表新增接口
const info = (data) => {
  data = qs.stringify(data);
  return service({
    method: "post",
    url: "/info",
    data,
  });
};
//信息列表查询接口
const getInfo = () => {
  return service({
    method: "get",
    url: "/info",
  });
};
//信息修改接口
const updateInfo = (data) => {
  return service({
    method: "put",
    url: "/info",
    data,
  });
};

//信息删除接口
const delInfo = (id) => {
  return service({
    method: "delete",
    url: `/info/${id}`,
  });
};

//数据概览接口
const dataView = () => {
  return service({
    method: "get",
    url: "/dataview",
  });
};
export {
  Login,
  students,
  studentDel,
  info,
  getInfo,
  updateInfo,
  delInfo,
  dataView,
};
