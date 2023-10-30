# tinymce 富文本 Vue2版本

组件内引入了所有相关的插件用途，包括锚点、自动链接、特殊字符、文字方向、插入编辑图片、插入编辑媒体等插件内容。
### 安装
```
npm install tinymce-editor-vue2
```

### 组件内引入插件
```
import TinymceEditorVue2 from "tinymce-editor-vue2";

export default{
    components: {
        TinymceEditorVue2
    }
}
```

### 全局引入
```
import TinymceEditorVue2 from "tinymce-editor-vue2";

Vue.use(TinymceEditorVue2);
```

### 页面使用
```
<template>
  <div>
    测试页面
    <tinymce-editor
      v-model="html"
      @imageUpload="imageUpload"
      @fileUpload="fileUpload"
      :addButton="addButton"
    ></tinymce-editor>
    <tinymce-editor
      v-model="html"
      @imageUpload="imageUpload"
      @fileUpload="fileUpload"
    ></tinymce-editor>
  </div>
</template>

<script>
export default {
  data() {
    return {
      html: "8888",
    };
  },
  methods: {
    imageUpload(blobInfo, success, failure) {
      console.log("上传接收", blobInfo, success, failure);
    },
    fileUpload(file, callback, meta) {
      console.log("上传文件接收", file, callback, meta);
    },
    addButton(editor) {
    //   editor.ui.registry.addButton("materialspace", {
    //     text: "素材空间",
    //     icon: "image",
    //     onAction: function () {
    //       editor.windowManager.openUrl({
    //         title: "选择会议模板",
    //         url: "https://www.163.com",
    //         width: 840,
    //         height: 300,
    //       });
    //     },
    //   });
    },
  },
};
</script>

<style lang="scss" scoped></style>
```

### 组件参数
名称|用途|返回参数
---|---|---|
value/v-model|文本内容| |
toolbar | 富文本上面的用途内容|
addButton | 自定义按钮添加,具体如上图进行添加| 