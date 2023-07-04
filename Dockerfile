# 使用 Node.js 官方提供的基础镜像作为构建环境
FROM node:16

# 设置工作目录
WORKDIR /app

# 将 package.json 和 package-lock.json 复制到容器中
COPY / /app

# 暴露应用程序所使用的端口（根据你的应用程序进行修改）
EXPOSE 3000

# 在容器中运行应用程序的命令（根据你的应用程序进行修改）
CMD [ "npm", "start" ]
