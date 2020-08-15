import request from '@/utils/request';

export const roleData = query => {
    return request({
        url: '/json/system/roleData.json',
        method: 'get',
        params: query
    });
};
export const getRole = query => {
    return request({
        url: '/json/system/roleData.json',
        method: 'get',
        params: query
    });
};