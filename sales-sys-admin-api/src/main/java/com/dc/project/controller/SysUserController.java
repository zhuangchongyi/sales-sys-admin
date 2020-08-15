package com.dc.project.controller;


import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.dc.project.entity.SysUser;
import com.dc.project.service.SysUserService;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 员工用户表 前端控制器
 *
 * @author zhuangcy
 * @since 2020-08-12
 */
@Api(tags = "用户操作接口")
@RestController
@RequestMapping("/api/sysUser")
public class SysUserController {
    @Autowired
    private SysUserService sysUserService;

    @ApiOperation(value = "查询用户信息列表")
    @GetMapping
    public List<SysUser> list() {
        return sysUserService.list();
    }

    @ApiOperation("根据userId查询用户信息")
    @GetMapping("/{userId}")
    public SysUser get(
            @ApiParam(name = "userId", value = "用户id", required = true)
            @PathVariable("userId") Long userId) {
        return sysUserService.getById(userId);
    }

    @ApiOperation("查询用户分页信息")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "page", value = "页码", required = true, example = "1",dataTypeClass = Integer.class),
            @ApiImplicitParam(name = "size", value = "总数", required = true, example = "10", dataTypeClass = Integer.class)
    })
    @PostMapping("/{page}/{size}")
    public IPage<SysUser> login(@PathVariable("page") int page, @PathVariable("size") int size) {
        return sysUserService.page(new Page<>(page, size));
    }

}

