/* echarts组件 */
import TinymceEditor from './index.vue'
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.component('tinymce-editor', TinymceEditor)
}
//这样就可以使用Vue.use进行全局安装了。
TinymceEditor.install = function(Vue){
  Vue.component(TinymceEditor.name, TinymceEditor)
}

/* 暴露 */
export default TinymceEditor;