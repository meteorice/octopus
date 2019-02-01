// vue.config.js
var walk = require('walk')
var path = require('path')
const fs = require('fs')

let proxyTarget = 'http://127.0.0.1:8888'
let proxyOption = {
	target: proxyTarget,
	// 如果要代理 websockets
	ws: true,
	// 将主机标头的原点更改为目标URL
	changeOrigin: false
}
console.log('-------------------------------------------------')
console.log('#                    devilfish                  #')
console.log('-------------------------------------------------')
console.log(`proxy target : ${proxyTarget}`)
console.log(`工作目录：${__dirname}`)

let pages = {
	index: {
		// page 的入口
		entry: 'src/main.ts',
		// 模板来源
		template: 'public/index.html',
		// 在 dist/index.html 的输出
		filename: 'index.html',
		// 当使用 title 选项时，
		// template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
		title: 'Index Page',
		// 在这个页面中包含的块，默认情况下会包含
		// 提取出来的通用 chunk 和 vendor chunk。
		chunks: ['chunk-vendors', 'chunk-common', 'index']
	}
}

options = {
	listeners: {
		directories: function (root, dirStatsArray, next) {
			for (const item of dirStatsArray) {
				console.log(`页面:${item.name}`)
				pages[item.name] = {
					// page 的入口
					entry: `src/views/${item.name}/main.ts`,
					// 模板来源
					template: 'public/index.html',
					// 在 dist/index.html 的输出
					filename: `${item.name}/main.html`,
					// 当使用 title 选项时，
					// template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
					title: `${item.name}`,
					// 在这个页面中包含的块，默认情况下会包含
					// 提取出来的通用 chunk 和 vendor chunk。
					chunks: ['chunk-vendors', 'chunk-common', item.name]
				}
			}
			next();
		}
	}
}
walker = walk.walkSync(`${__dirname}/src/views`, options);

module.exports = {
	// 选项...
	devServer: {
		// 设置主机地址
		host: 'localhost',
		// 设置默认端口
		port: 8080,
		// 设置代理
		proxy: {
			'^/api': {
				// 目标 API 地址
				target: proxyTarget,
				pathRewrite: { '^/api': '' },
				// 如果要代理 websockets
				ws: true,
				// 将主机标头的原点更改为目标URL
				changeOrigin: false
			},
			'^/sshconnect': proxyOption,
			'^/login': proxyOption,
			'^/logout': proxyOption,
			'^/css': proxyOption,
			'^/js': proxyOption,
			// '*.svg': proxyOption,
		}
	},
	pages: pages,
	css: {
		loaderOptions: {
			less: {
				// modifyVars: {
				// 	'primary-color': '#1890ff',
				// 'link-color': '#1890ff',
				// 	'border-radius-base': '4px',
				// },
				javascriptEnabled: true
			},
			sass: {
				data: fs.readFileSync('src/assets/global.scss', 'utf-8')
			}
		}
	}
}