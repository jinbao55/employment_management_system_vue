import axios from 'axios';
import { req } from './axiosFun';

/**
 * 就业管理--就业统计
 **/
//历年毕业人数
export const NumberOfGraduates = (params) => { return req("get", "/employmentStatistics/NumberOfGraduates") };







/**
 * 就业管理-就业登记
 **/
//就业登记列表查询
export const RegisterGetPageList = (params) => { return req("post", "/register/getPageLista", params) };
//就业登记添加或修改
export const RegisterEditSave = (params) => { return req("post", "/register/editSave", params) };
//就业登记删除
export const RegisterDelete = (params) => { return req("post", "/register/delete", params) };
