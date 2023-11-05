const Path = require('path')
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          javascriptEnabled: true,
          math: 'always'
        }
      }
    }
  },
  chainWebpack: (config) => {
    // config.resolve.alias.set('@http', resolve('src/common/http/index'))
    config.module
      .rule('lessInject')
      .test(/\.less$/)
      .use('style-resources-loader')
      .loader('style-resources-loader')
      .options({
        patterns: [resolve('src/styles/var.less'), resolve('src/styles/mixin.less')],
        injector: 'append'
      })
      .end()
    const svgPath = resolve('src/assets/svg')
    const svgColorPath = resolve('src/assets/svg/colorful')
    config.module.rule('svg').exclude.add(svgPath).end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(svgPath)
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: (filePath) => {
          const name = Path.relative(`${__dirname}/src/assets/svg`, filePath)
          return name.replace(/\\/g, '/').substring(0, name.length - 4)
        }
      })
      .end()
      .use('svgo-loader')
      .loader('svgo-loader')
      .end()
    config.module
      .rule('svgoRemoveColor')
      .test(/\.svg$/)
      .include.add(svgPath)
      .end()
      .exclude.add(svgColorPath)
      .end()
      .use('svgo-loader')
      .loader('svgo-loader')
      .options({
        plugins: [
          {
            name: 'removeAttrs',
            params: {
              attrs: 'fill'
            }
          }
        ]
      })
      .end()
  },
  devServer: {
    proxy: generateProxy(),
    client: {
      overlay: false
    }
  }
})

function resolve(dir) {
  return Path.join(__dirname, dir)
}

// 生成proxy
function generateProxy() {
  const proxy = JSON.parse(process.env.VUE_APP_PROXY || '{}')
  const result = {}
  for (const k in proxy) {
    const prefix = `/${process.env.VUE_APP_NAME}/${k}`.replace(/\/{2,}/g, '/')
    result['^' + prefix] = {
      target: proxy[k],
      changeOrigin: true,
      pathRewrite: {
        ['^' + prefix]: ''
      }
    }
  }
  console.log('result', result)
  return result
}
