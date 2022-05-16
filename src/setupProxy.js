const proxy = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    proxy(['/api', '/loan/'], {
        target: 'http://market.test.janesi.cn',     //  测试环境配合
        // target: 'http://47.102.205.161:8000',     //  测试环境配合
        // target: 'http://192.168.31.74:10021',  //  开发环境配合
        changeOrigin: true,
        ws: true
    })
  );
  app.use(
    proxy('/openapi', {
        target: 'https://api.central-data.co',     //  测试环境配合
        changeOrigin: true,
        ws: true
    })
  );
};
