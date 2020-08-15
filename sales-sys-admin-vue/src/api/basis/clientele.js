import request from '@/utils/request';

export const listData = query => {
    return request({
        url: '/json/basis/clienteleData.json',
        method: 'get',
        params: query
    });
};
export const getClientele = query => {
    return request({
        url: '/json/basis/clienteleData.json',
        method: 'get',
        params: query
    });
};

export const treeselect = query => {
    return request({
        url: '/json/basis/clienteleType.json',
        method: 'get',
        params: query
    });
};