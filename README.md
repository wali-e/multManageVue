# 这是一个多页面VUE应用管理

### 配置

> .env.dev 

node http serve 模式下开发配置，主要配置 接口host

> .env.pro 

build product 模式下配置，主要配置 接口host 和 资源cdn host

> vue.config.js

主要配置多应用入口文件加载 及 打包、插件 配置 文件内有详细的注释说明
___


### 相关命令

> yarn run serve

node http serve 模式下开发

> yarn build [module]

打包指定模块至根目录的dist目录
___


### Nginx conf 
```
server {
        server_name www.wali.com;
        root /var/www/multManageVue/public/dist;
        location / {
                index  index.html index.htm;
        }
        location ^~ /twelve/ {
                try_files $uri /twelve/index.html;
        }
}
```