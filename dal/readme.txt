模型数据库等
sequelize-auto -o "./define" -d 库名 -h 服务器IP  -u 用户 -x 密码 -p 端口

执行脚本注意：
1、模型定义中，主键自增字段加以下属性，否则创建时不返回
autoIncrement:true

