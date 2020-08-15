import request from '@/utils/request';

export const listData = query => {
    return request({
        url: '/json/basis/materielData.json',
        method: 'get',
        params: query
    });
};
export const getMateriel = query => {
    return request({
        url: '/json/basis/materielData.json',
        method: 'get',
        params: query
    });
};