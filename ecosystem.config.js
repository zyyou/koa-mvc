module.exports = {
    apps: [{
      //项目名称
      name: 'koamvc-dev',
      //启用或禁用观察模式（文件变动重启）
      watch: true,
      //指定要注入的环境变量
      env: {
        NODE_ENV: 'development',
        //应用配置目录，默认当前工程/config
        config_path: '',
        //应用配置
        app_config: 'koamvc.js',
        //公共配置文件目录
        config_path_common: '~/Projects/Framework/comconfig'
      },
      //应用入口
      script: 'bin/www',
      // 传递给脚本的参数
      args: [''],
      //studout的文件路径（每行都附加到该文件中）,不记录设置 /dev/null
      output: '~/logs/koamvc_out.log',
      //stderr的文件路径（每行都附加到此文件中）,不记录设置 /dev/null
      error: '~/logs/koamvc_out.err',
      //禁用所有日志存储
      disable_logs: false,
      //设置执行模式，可能的值为：fork|cluster
      exec_mode: 'fork',
      //进程失败后自重启
      autorestart: true,
      //观察模式要忽略的路径列表（正则表达式）
      ignore_watch: ['logs', 'public', 'views', 'docs'],
      //如果超出内存量，重新启动应用
      max_memory_restart: '2G',
      //将环境名称附加到应用名称
      append_env_to_name: true
    }, {
      //项目名称
      name: 'koamvc-121',
      //启用或禁用观察模式（文件变动重启）
      watch: false,
      //指定要注入的环境变量
      env: {
        NODE_ENV: 'development',
        app_config: 'koamvc.js',
        config_path: '',
        config_path_common: '/app/comconfig',
        //pm2-webhooks 配置
        webhook_log_out: false,
        webhook_log_error: true,
        webhook_log_kill: true,
        webhook_process_exception: true,
        webhook_process_event: true,
        webhook_process_msg: true,
        webhook_mobiles: '',
        webhook_url: 'https://oapi.dingtalk.com/robot/send?access_token=****',
        webhook_type: 'dingtalk'
      },
      //应用入口
      script: 'bin/www',
      // 传递给脚本的参数
      args: [''],
      //studout的文件路径（每行都附加到该文件中）,不记录设置 /dev/null
      output: '/hy/logs/koamvc_out.log',
      //stderr的文件路径（每行都附加到此文件中）,不记录设置 /dev/null
      error: '/hy/logs/koamvc_out.err',
      //禁用所有日志存储
      disable_logs: false,
      //设置执行模式，可能的值为：fork|cluster
      exec_mode: 'fork',
      //在群集模式下启动的实例数, 数字 或 max=按CPU核数启动
      //instances: 'max',
      //在群集模式下，将每种类型的日志合并到一个文件中（而不是每个群集都单独一个）
      merge_logs: true,
      //进程失败后自重启
      autorestart: true,
      //如果超出内存量，重新启动应用
      max_memory_restart: '2G',
      //将环境名称附加到应用名称
      append_env_to_name: true
    }, {
      //项目名称
      name: 'koamvc',
      //启用或禁用观察模式（文件变动重启）
      watch: false,
      //指定要注入的环境变量
      env: {
        NODE_ENV: 'production',
        app_config: 'koamvc.js',
        config_path: '',
        config_path_common: '/app/comconfig',
      },
      //应用入口
      script: 'bin/www',
      // 传递给脚本的参数
      args: [''],
      //studout的文件路径（每行都附加到该文件中）,不记录设置 /dev/null
      output: '~/logs/koamvc_out.log',
      //stderr的文件路径（每行都附加到此文件中）,不记录设置 /dev/null
      error: '~/logs/koamvc_out.err',
      //禁用所有日志存储
      disable_logs: false,
      //设置执行模式，可能的值为：fork|cluster
      exec_mode: 'cluster',
      //在群集模式下启动的实例数, 数字 或 max=按CPU核数启动
      instances: 'max',
      //在群集模式下，将每种类型的日志合并到一个文件中（而不是每个群集都单独一个）
      merge_logs: true,
      //进程失败后自重启
      autorestart: true,
      //如果超出内存量，重新启动应用
      max_memory_restart: '3G',
      //将环境名称附加到应用名称
      append_env_to_name: true
    }],
  
    deploy: {
      dev121: {
        //服务器用户名
        user: 'root',
        //服务器IP
        host: ['192.168.***.***'],
        //仓库分支
        ref: 'origin/dev121',
        //仓库地址
        repo: 'git@192.168.100.222:heechain/fabric-api.git',
        //应用部署到服务器的目录
        path: '/app/nodeapp/koamvc',
        //'post-setup': "npm install && ls -la",
        'post-setup': "npm install && ls -la",
        // 获取版本后在服务器上执行的脚本 
        'post-deploy': 'pm2 reload ecosystem.config.js --only koamvc-121 && pm2 ls'
      }
    }
  };