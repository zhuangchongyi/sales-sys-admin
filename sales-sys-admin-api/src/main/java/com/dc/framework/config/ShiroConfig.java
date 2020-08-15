package com.dc.framework.config;

import com.dc.framework.realm.LoginUserShiroRealm;
import org.apache.shiro.mgt.SecurityManager;
import org.apache.shiro.spring.security.interceptor.AuthorizationAttributeSourceAdvisor;
import org.apache.shiro.spring.web.ShiroFilterFactoryBean;
import org.apache.shiro.web.mgt.DefaultWebSecurityManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class ShiroConfig {

    /**
     * 自定义用户校验
     */
    @Bean
    public LoginUserShiroRealm loginUserShiroRealm() {
        return new LoginUserShiroRealm();
    }

    /**
     * 权限管理，配置主要是Realm的管理认证
     */
    @Bean
    public SecurityManager securityManager() {
        DefaultWebSecurityManager manager = new DefaultWebSecurityManager();
        manager.setRealm(loginUserShiroRealm());
        return manager;
    }

    /**
     * Filter工厂，设置对应的过滤条件和跳转条件
     */
    @Bean
    public ShiroFilterFactoryBean shiroFilterFactoryBean() {
        ShiroFilterFactoryBean factoryBean = new ShiroFilterFactoryBean();
        factoryBean.setSecurityManager(securityManager());
        factoryBean.setLoginUrl("/page/login");
        //factoryBean.setSuccessUrl("/index");//访问成功时跳转
        Map<String, String> filtersMap = new HashMap<>();
        /*
          认证顺序是从上往下执行。
         */
        filtersMap.put("/auth/logout", "logout");
        filtersMap.put("/auth/login", "anon");
        filtersMap.put("/auth/code", "anon");
        filtersMap.put("/static/**", "anon");
        filtersMap.put("/druid/**", "anon");
        filtersMap.put("/swagger**/**", "anon");
        filtersMap.put("/webjars/**", "anon");
        filtersMap.put("/v2/**", "anon");
        filtersMap.put("/favicon.ico", "anon");
        filtersMap.put("/css/**", "anon");
        filtersMap.put("/fonts/**", "anon");
        filtersMap.put("/img/**", "anon");
        filtersMap.put("/js/**", "anon");
        filtersMap.put("/json/**", "anon");
        filtersMap.put("**.ttf", "anon");
        filtersMap.put("**.woff", "anon");
        filtersMap.put("**.jpg", "anon");
        // 对所有用户认证
        filtersMap.put("/**", "authc");
        factoryBean.setFilterChainDefinitionMap(filtersMap);
        return factoryBean;
    }

    /**
     * 加入注解的使用，不加入这个注解不生效
     */
    @Bean
    public AuthorizationAttributeSourceAdvisor attributeSourceAdvisor() {
        AuthorizationAttributeSourceAdvisor attributeSourceAdvisor = new AuthorizationAttributeSourceAdvisor();
        attributeSourceAdvisor.setSecurityManager(securityManager());
        return attributeSourceAdvisor;
    }

}
