import axios from 'axios';
import { loginreq, req } from './axiosFun';

/**
 * 用户管理
 **/
// 用户管理-获取用户列表
export const userList = (params) => { return req("post", "/user/getPageList", params) };
// 用户管理-用户添加
export const userRegister = (params) => { return req("post", "/user/register", params) };
//删除用户
export const deleteUser = (params) => { return req("post", "/user/deleteUser", params) };
//重置为通用密码
export const resetPassword = (params) => { return req("post", "/user/resetPassword", params) };


