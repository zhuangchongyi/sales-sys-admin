package com.dc.framework.realm;

import com.dc.project.entity.SysUser;
import com.dc.project.service.SysUserService;
import org.apache.shiro.authc.*;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * @Author zhuangchongyi
 * @Description 实现AuthorizingRealm接口用户用户认证
 * @Date 2020/8/14 12:11
 */
public class LoginUserShiroRealm extends AuthorizingRealm {
    private Logger logger = LoggerFactory.getLogger(getClass());
    @Autowired
    private SysUserService sysUserService;

    /**
     * 角色权限认证
     */
    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principalCollection) {
        logger.info("shiro 开始角色认证------------");
        // 获取登录用户名
        String name = (String) principalCollection.getPrimaryPrincipal();
        // 查询用户名称
        SysUser user = sysUserService.findByUserName(name);
        // 添加角色权限
        SimpleAuthorizationInfo authorizationInfo = new SimpleAuthorizationInfo();
//        for (SysRole role : user.getRoles()) {
//            //添加角色
//            authorizationInfo.addRole(role.getRoleName());
            authorizationInfo.addRole("admin");
//            for (SysPermission permission : role.getPermissions()) {
//                //添加权限
//                authorizationInfo.addStringPermission(permission.getPermission());
                authorizationInfo.addStringPermission("list");
//            }
//        }
        return authorizationInfo;
    }

    /**
     * 用户认证
     */
    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken authenticationToken) throws AuthenticationException {
        logger.info("shiro 开始用户认证------------");
        if (null == authenticationToken.getPrincipal()) {
            return null;
        }
        // 获取用户信息
        String name = authenticationToken.getPrincipal().toString();
        SysUser user = sysUserService.findByUserName(name);
        if (user == null) {
            throw new UnknownAccountException("该用户不存在");
        } else {
            // 这里验证authenticationToken和simpleAuthenticationInfo的信息
            return new SimpleAuthenticationInfo(name, user.getPassword(), getName());
        }

    }
}
