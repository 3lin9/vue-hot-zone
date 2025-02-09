import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 5174
  },
  plugins: [vue(),cssInjectedByJsPlugin({topExecutionPriority: false})],
  build: {
    cssCodeSplit: false,
    lib: {
      entry: 'src/index.js', // 入口文件  
      name: 'vue-hot-image', // 打包后的库名  
      fileName: (format) => `vue-hot-image.${format}.js` // 输出文件名  
    },  
    rollupOptions: {  
      // 确保外部化处理那些你不想打包进库的依赖  
      external: ['vue'],  
      output: {  
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量  
        globals: {  
          vue: 'Vue'  
        },  
      },  
    },  
  }
})
