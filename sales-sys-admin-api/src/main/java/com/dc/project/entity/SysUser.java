package com.dc.project.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

import java.io.Serializable;

/**
 * 员工用户表
 *
 * @author zhuangcy
 * @since 2020-08-12
 */
@ApiModel(description = "用户实体")
public class SysUser implements Serializable {
    private static final long serialVersionUID = 1L;

    /**
     * 用户编码或者员工编码
     */
    @TableId
    @ApiModelProperty(value = "用户id")
    private String userId;

    /**
     * 用户名；员工名
     */
    @ApiModelProperty(value = "用户名称")
    private String userName;

    /**
     * 1：男；0：女
     */
    @ApiModelProperty(value = "用户性别")
    private Integer sex;

    /**
     * 部门
     */
    @ApiModelProperty(value = "用户部门id")
    private String departmentId;

    /**
     * 部门名称
     */
    @ApiModelProperty(value = "用户部门名称")
    private String departmentName;

    /**
     * 手机
     */
    @ApiModelProperty(value = "用户手机号")
    private String mobilePhone;

    /**
     * 密码
     */
    @ApiModelProperty(value = "用户密码")
    private String password;

    /**
     * 职务：1：员工；2：部门长；3：公司管理者
     */
    @ApiModelProperty(value = "用户职务")
    private Integer controller;

    /**
     * 状态:1:在职；0：离职
     */
    @ApiModelProperty(value = "用户状态")
    private Integer effect;

    /**
     * 是否用户
     */
    @ApiModelProperty(value = "是否用户")
    private Integer isUser;

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public Integer getSex() {
        return sex;
    }

    public void setSex(Integer sex) {
        this.sex = sex;
    }

    public String getDepartmentId() {
        return departmentId;
    }

    public void setDepartmentId(String departmentId) {
        this.departmentId = departmentId;
    }

    public String getDepartmentName() {
        return departmentName;
    }

    public void setDepartmentName(String departmentName) {
        this.departmentName = departmentName;
    }

    public String getMobilePhone() {
        return mobilePhone;
    }

    public void setMobilePhone(String mobilePhone) {
        this.mobilePhone = mobilePhone;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Integer getController() {
        return controller;
    }

    public void setController(Integer controller) {
        this.controller = controller;
    }

    public Integer getEffect() {
        return effect;
    }

    public void setEffect(Integer effect) {
        this.effect = effect;
    }

    public Integer getIsUser() {
        return isUser;
    }

    public void setIsUser(Integer isUser) {
        this.isUser = isUser;
    }

    @Override
    public String toString() {
        return "SysUser{" +
                "userId=" + userId +
                ", userName=" + userName +
                ", sex=" + sex +
                ", departmentId=" + departmentId +
                ", departmentName=" + departmentName +
                ", mobilePhone=" + mobilePhone +
                ", password=" + password +
                ", controller=" + controller +
                ", effect=" + effect +
                ", isUser=" + isUser +
                "}";
    }
}
