package com.dc.common.vo;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

import java.io.Serializable;

/**
 * @Author zhuangchongyi
 * @Description 登录用户实体
 * @Date 2020/8/13 16:46
 */
@ApiModel(description = "登录用户实体")
public class LoginUser implements Serializable {
    private static final long serialVersionUID = 568303825611102737L;
    /**
     * 用户名
     */
    @ApiModelProperty(value = "用户名", required = true)
    private String username;
    /**
     * 密码
     */
    @ApiModelProperty(value = "密码", required = true)
    private String password;
    /**
     * 输入验证码
     */
    @ApiModelProperty(value = "验证码")
    private String code;
    /**
     * 验证码对应Key
     */
    @ApiModelProperty(value = "验证码key")
    private String codeKey;
    /**
     * 是否记住
     */
    @ApiModelProperty(value = "是否记住")
    private boolean rememberMe;

    public boolean getRememberMe() {
        return rememberMe;
    }

    public void setRememberMe(boolean rememberMe) {
        this.rememberMe = rememberMe;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getCodeKey() {
        return codeKey;
    }

    public void setCodeKey(String codeKey) {
        this.codeKey = codeKey;
    }
}
