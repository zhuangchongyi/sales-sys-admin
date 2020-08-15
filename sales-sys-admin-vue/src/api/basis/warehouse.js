import request from '@/utils/request';

export const listData = query => {
    return request({
        url: '/json/basis/warehouseData.json',
        method: 'get',
        params: query
    });
};
export const getWarehouse = query => {
    return request({
        url: '/json/basis/warehouseData.json',
        method: 'get',
        params: query
    });
};