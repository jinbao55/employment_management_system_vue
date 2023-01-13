import axios from 'axios';
import { req } from './axiosFun';

/**
 * 访企拓岗位--企业信息
 **/
//企业信息列表查询
export const PostInformationGetPageList = (params) => { return req("post", "/postInformation/getPageList", params) };
//企业信息修改和添加
export const PostInformationEditSave = (params) => { return req("post", "/postInformation/editSave", params) };
//删除企业信息
export const PostInformationDelete = (params) => { return req("post","/postInformation/delete", params)};

/**
 * 访企拓岗位--企业招聘
 **/
//企业招聘列表查询
export const RecruitGetPageList = (params) => { return req("post", "/recruit/getPageList", params) };
//企业招聘息修改和添加
export const RecruiteditSave = (params) => { return req("post", "/recruit/editSave", params) };
//企业招聘息删除
export const Recruitdelete = (params) => { return req("post", "/recruit/delete", params) };


/**
 * 访企拓岗位--校园招聘
 **/
//校园招聘列表查询
export const CampusRecruitmentGetPageList = (params) => { return req("post", "/campusRecruitment/getPageList", params) };
//校园招聘息修改和添加
export const CampusRecruitmentEditSave = (params) => { return req("post", "/campusRecruitment/editSave", params) };
//校园招聘息删除
export const CampusRecruitmentdelete = (params) => { return req("post", "/campusRecruitment/delete", params) };
