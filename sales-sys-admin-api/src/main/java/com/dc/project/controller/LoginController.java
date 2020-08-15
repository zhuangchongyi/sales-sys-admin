package com.dc.project.controller;


import com.dc.common.vo.LoginUser;
import com.dc.common.vo.R;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Random;

/**
 * 员工用户表 前端控制器
 *
 * @author zhuangcy
 * @since 2020-08-12
 */
@Api(tags = "用户认证操作接口")
@Controller
@RequestMapping("/auth")
public class LoginController {

    @ApiOperation("用户登录")
    @PostMapping("/login")
    @ResponseBody
    public R loginUser(LoginUser user) {
        UsernamePasswordToken token = new UsernamePasswordToken(user.getUsername(), user.getPassword());
        SecurityUtils.getSubject().login(token);
        return R.success().msg("登陆成功");
    }

    @ApiOperation("用户退出登录")
    @GetMapping("/logout")
    @ResponseBody
    public void logout() {}

    @ApiOperation("获取验证码")
    @GetMapping("/code")
    @ResponseBody
    public R code() {
        int code = new Random().nextInt(9000)+1000;
        return R.success().data(code);
    }

}

