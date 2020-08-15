import request from '@/utils/request';

export const listUser = query => {
    return request({
        url: '/json/system/userData.json',
        method: 'get',
        params: query
    });
};
