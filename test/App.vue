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
