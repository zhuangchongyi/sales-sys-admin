package com.dc.common.vo;

import java.io.Serializable;

/**
 * @Author zhuangchongyi
 * @Description 请求响应实体
 * @Date 2020/8/14 11:19
 */
public class R implements Serializable {
    private static final long serialVersionUID = 1L;
    private boolean success;
    private int code;
    private String msg;
    private Object data;

    private R(boolean success, int code, String msg) {
        this.success = success;
        this.code = code;
        this.msg = msg;
    }

    public static R success() {
        return new R(true, 200, "操作成功");
    }

    public static R fail() {
        return new R(false, 400, "操作失败");
    }

    public R code(int code) {
        this.code = code;
        return this;
    }

    public R msg(String msg) {
        this.msg = msg;
        return this;
    }

    public R data(Object data) {
        this.data = data;
        return this;
    }

    @Override
    public String toString() {
        return "R{" +
                "succes=" + success +
                ", code=" + code +
                ", msg='" + msg + '\'' +
                ", data=" + data +
                '}';
    }

    public boolean isSuccess() {
        return success;
    }

    public int getCode() {
        return code;
    }

    public String getMsg() {
        return msg;
    }

    public Object getData() {
        return data;
    }
}
