package com.dc.project.service;

import com.dc.project.entity.SysUser;
import com.baomidou.mybatisplus.extension.service.IService;

/**
 * 员工用户表 服务类
 *
 * @author zhuangcy
 * @since 2020-08-12
 */
public interface SysUserService extends IService<SysUser> {

    SysUser findByUserName(String userName);
}
