package com.dc.project.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.dc.project.entity.SysUser;
import com.dc.project.dao.SysUserDao;
import com.dc.project.service.SysUserService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * 员工用户表 服务实现类
 *
 * @author zhuangcy
 * @since 2020-08-12
 */
@Service
public class SysUserServiceImpl extends ServiceImpl<SysUserDao, SysUser> implements SysUserService {

    @Override
    public SysUser findByUserName(String userName) {
        QueryWrapper<SysUser> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("user_name",userName);
        return baseMapper.selectOne(queryWrapper);
    }
}
