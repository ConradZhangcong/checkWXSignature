# wx-service

微信公众号接入后端服务

## 开发环境

- node 16.15.1
- npm 8.11.0
- pnpm 8.10.2

```bash
docker ps -a --no-trunc | grep node-images-new

docker pull node:16
docker image build ./ -t wx-node-image
docker run -d --name wx-service-container -p 30001:30000 wx-node-image
```
