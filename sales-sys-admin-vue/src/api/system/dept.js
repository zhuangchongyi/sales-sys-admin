import request from '@/utils/request';

export const listDept = query => {
    return request({
        url: '/json/system/deptData.json',
        method: 'get',
        params: query
    });
};

export const listDeptExcludeChild = query => {
    return request({
        url: '/json/system/deptData.json',
        method: 'get',
        params: query
    });
};
export const getDept = query => {
    return request({
        url: '/json/system/deptData.json',
        method: 'get',
        params: query
    });
};
export const treeselect = query => {
    return request({
        url: '/json/system/userDept.json',
        method: 'get',
        params: query
    });
};
