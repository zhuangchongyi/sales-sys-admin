package com.dc.framework.filter;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.StringUtils;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;
import java.util.regex.Pattern;

/**
 * @Author zhuangchongyi
 * @Description 过滤访问前端的前缀
 * @Date 2020/8/11 17:45
 */
public class RewriteFilter implements Filter {
    private Logger logger = LoggerFactory.getLogger(getClass());
    /**
     * 需要重写到的目的地址
     */
    public static final String REWRITE_TO = "/";
    /**
     * 拦截的url,url通配符之前用英文分号隔开
     */
    public static final String REWRITE_PATTERNS = "/page/**";

    private Set<String> urlPatterns = null;//配置url通配符

    private String rewriteTo = null;

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        //初始化拦截配置
        rewriteTo = filterConfig.getInitParameter(REWRITE_TO);
        String exceptUrlString = filterConfig.getInitParameter(REWRITE_PATTERNS);
        if (StringUtils.isEmpty(exceptUrlString)) {
            urlPatterns = Collections.emptySet();
        } else {
            urlPatterns = Collections.unmodifiableSet(new HashSet<>(Arrays.asList(exceptUrlString.split(";", 0))));
        }
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        HttpServletRequest req = (HttpServletRequest) request;
        String servletPath = req.getServletPath();
        String contextPath = req.getContextPath();
        //过滤改写静态路由访问
        if (isMatches(urlPatterns, servletPath)) {
            String path = contextPath + rewriteTo;
            logger.info(servletPath + "路由转发=>" + path);
            req.getRequestDispatcher(path).forward(request, response);
        } else {
            chain.doFilter(request, response);
        }
    }

    /**
     * 匹配返回true，不匹配返回false
     *
     * @param patterns 正则表达式或通配符
     * @param url      请求的url
     * @return
     */
    private boolean isMatches(Set<String> patterns, String url) {
        if (null == patterns) {
            return false;
        }
        for (String str : patterns) {
            if (str.endsWith("/*")) {
                String name = str.substring(0, str.length() - 2);
                if (url.contains(name)) {
                    return true;
                }
            } else {
                Pattern pattern = Pattern.compile(str);
                if (pattern.matcher(url).matches()) {
                    return true;
                }
            }
        }
        return false;
    }
}
