import request from '@/utils/request';

export const fetchData = query => {
    return request({
        url: '/json/table.json',
        method: 'get',
        params: query
    });
};
