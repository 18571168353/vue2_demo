// 配置代理
module.exports = {
	publicPath: './',
	devServer: {
    https: false,
    hot: false,
		port:9009,
    proxy: {
      'api/': {
				target : 'http://jl.bqbim.com', //服务器下的东西
        changeOrigin: true,
        pathRewrite: {
          '^api/': ''
        }
      }
    }
  }
}
