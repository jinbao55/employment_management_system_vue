import axios from 'axios';
import { req } from './axiosFun';

/**
 * 就业管理--就业统计
 **/
//历年毕业人数
export const NumberOfGraduates = (params) => { return req("post", "/employmentStatistics/NumberOfGraduates",params) };
//历年就业人数
export const workNumber = (params) => { return req("post", "/employmentStatistics/workNumber",params) };
//历年不就业人数
export const noWork = (params) => { return req("post", "/employmentStatistics/noWork",params) };
//历年就业类型
export const workTypeStatistics = (params) => { return req("post", "/employmentStatistics/workTypeStatistics",params) };
//合作企业类型
export const cooperativeCompanies = (params) => { return req("post", "employmentStatistics/cooperativeCompanies",params) };



/**
 * 就业管理-就业登记
 **/
//就业登记列表查询
export const RegisterGetPageList = (params) => { return req("post", "/register/getPageLista", params) };
//就业登记添加或修改
export const RegisterEditSave = (params) => { return req("post", "/register/editSave", params) };
//就业登记删除
export const RegisterDelete = (params) => { return req("post", "/register/delete", params) };
