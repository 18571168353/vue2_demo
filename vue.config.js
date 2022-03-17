// 配置代理
module.exports = {
	devServer: {
		host: 'localhost',
		open: true,
		port: 9009,
		proxy: {
			'/api': {
				target: 'http://jl.bqbim.com', //服务器下的东西
				changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
				ws: true, // proxy websockets
				//pathRewrite方法重写url
				pathRewrite: {
					'^/api': '/'
					//pathRewrite: {'^/api': '/'} 重写之后url为 http://jl.bqbim.com/xxxx
					//pathRewrite: {'^/api': '/api'} 重写之后url为 http://jl.bqbim.com/api/xxxx
				}
			}
		}
	}
}
