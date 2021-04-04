import Password from 'antd/lib/input/Password';
import ajax from './axios';

export const reqLogin = (username,password)=>ajax('/login',{username,password},'POST')