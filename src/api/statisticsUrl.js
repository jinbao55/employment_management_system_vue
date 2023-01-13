import axios from 'axios';
import { req } from './axiosFun';

/**
 * 就业管理--就业登记
 **/
//历年毕业人数
export const NumberOfGraduates = (params) => { return req("get", "/employmentStatistics/NumberOfGraduates") };
