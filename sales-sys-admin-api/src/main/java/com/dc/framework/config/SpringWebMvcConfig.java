package com.dc.framework.config;

import com.dc.framework.filter.RewriteFilter;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * @Author zhuangchongyi
 * @Date 2020/8/11 17:38
 */
@Configuration
public class SpringWebMvcConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/**").addResourceLocations("classpath:/static/");
    }

    @Bean
    public FilterRegistrationBean filterRegistrationBean() {
        FilterRegistrationBean registration = new FilterRegistrationBean();
        registration.setFilter(new RewriteFilter());//注册rewrite过滤器
        registration.addUrlPatterns("/*");
        registration.setName("sys");
        registration.setOrder(1);
        registration.addInitParameter(RewriteFilter.REWRITE_TO, "/index.html");
        registration.addInitParameter(RewriteFilter.REWRITE_PATTERNS, "/page/*");
        return registration;
    }
}
