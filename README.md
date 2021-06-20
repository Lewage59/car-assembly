# car-assembly 
> 本项目仅供学习和参考！！！

## 一、系统环境部署
1. 服务器：由于基于Node.js v10.15.3进行开发，因此需要安装和配置相关的Node环境。具体安装步骤和部署详情：http://nodejs.cn/learn/how-to-install-nodejs。
2. 开发工具：Visual Studio Code 1.54.2
3. 数据库相关：
    - 数据库：MySQL 5.6
    - 可视化工具：Navicat Premium 11.1.13
    - 连接方式：具体连接可查看car-assembly-server后端项目中的libs\db\src\db.module.ts文件。

## 二、使用说明
### 目录结构
```
├─car-assembly-admin              //前端后台项目
├─car-assembly-client             //前端前台项目
└─car-assembly-server             //服务端项目
```

### 前端项目说明
1. 安装相关依赖：需要在相应的项目文件夹目录下的命令行窗口执行npm install命令。
2. 项目运行：前后台系统统一使用npm run dev命令运行即可（需要注意先启动后端服务）。

### 后端项目说明

1. 安装相关依赖：需要在相应的项目文件夹目录下的命令行窗口执行npm install命令。
2. 项目运行（注意端口冲突问题）

    - 启动前台服务
    ```
    nest start car-assembly-server -w
    ```

    - 启动后台服务
    ```
    nest start admin -w
    ```