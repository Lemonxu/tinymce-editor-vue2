<template>
  <div class="tinymce-box">
    <Editor
      ref="tinymceVue"
      :init="init"
      v-model="html"
      @input="handleChange"
    />
  </div>
</template>

<script>
//引入node_modules里的tinymce相关文件文件
import tinymce from "tinymce"; //tinymce默认hidden，不引入则不显示编辑器
import "tinymce/themes/silver";
import Editor from "@tinymce/tinymce-vue";
import "tinymce/icons/default";

import "tinymce/plugins/advlist"; //高级列表
import "tinymce/plugins/anchor"; //锚点
import "tinymce/plugins/autolink"; //自动链接
import "tinymce/plugins/autoresize"; //编辑器高度自适应,注：plugins里引入此插件时，Init里设置的height将失效
import "tinymce/plugins/autosave"; //自动存稿
import "tinymce/plugins/charmap"; //特殊字符
import "tinymce/plugins/code"; //编辑源码
import "tinymce/plugins/codesample"; //代码示例
import "tinymce/plugins/directionality"; //文字方向
import "tinymce/plugins/emoticons"; //表情
import "tinymce/plugins/fullpage"; //文档属性
import "tinymce/plugins/fullscreen"; //全屏
import "tinymce/plugins/help"; //帮助
import "tinymce/plugins/hr"; //水平分割线
import "tinymce/plugins/image"; //插入编辑图片
import "tinymce/plugins/importcss"; //引入css
import "tinymce/plugins/insertdatetime"; //插入日期时间
import "tinymce/plugins/link"; //超链接
import "tinymce/plugins/lists"; //列表插件
import "tinymce/plugins/media"; //插入编辑媒体
import "tinymce/plugins/nonbreaking"; //插入不间断空格
import "tinymce/plugins/pagebreak"; //插入分页符
import "tinymce/plugins/paste"; //粘贴插件
import "tinymce/plugins/preview"; //预览
import "tinymce/plugins/print"; //打印
import "tinymce/plugins/quickbars"; //快速工具栏
import "tinymce/plugins/save"; //保存
import "tinymce/plugins/searchreplace"; //查找替换
// import 'tinymce/plugins/spellchecker'  //拼写检查，暂未加入汉化，不建议使用
import "tinymce/plugins/tabfocus"; //切入切出，按tab键切出编辑器，切入页面其他输入框中
import "tinymce/plugins/table"; //表格
import "tinymce/plugins/template"; //内容模板
import "tinymce/plugins/textcolor"; //文字颜色
import "tinymce/plugins/textpattern"; //快速排版
import "tinymce/plugins/toc"; //目录生成器
import "tinymce/plugins/visualblocks"; //显示元素范围
import "tinymce/plugins/visualchars"; //显示不可见字符
import "tinymce/plugins/wordcount"; //字数统计
export default {
  props: {
    value: {
      type: [String, Number],
      default: "",
    },
    toolbar: {
      type: [String, Number],
    },
    addButton: {
      type: Function
    },
  },
  watch: {
    value: {
      handler(val, oldVal) {
        this.html = val;
      },
      immediate: true,
      deep: true,
    },
  },
  components: {
    Editor,
  },
  data() {
    const _this = this;
    return {
      html: "",
      init: {
        language_url: "/tinymce/langs/zh-Hans.js",
        language: "zh-Hans",
        theme: "silver",
        skin_url: "/tinymce/skins/ui/oxide",
        plugins:
          "print preview searchreplace autolink directionality visualblocks visualchars fullscreen image link media table charmap hr pagebreak nonbreaking insertdatetime advlist lists wordcount textpattern autosave",
        // "print preview searchreplace autolink directionality visualblocks visualchars fullscreen image link media template code codesample table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists wordcount textpattern autosave",
        toolbar: this.toolbar || [
          "fullscreen undo redo | forecolor backcolor bold italic underline strikethrough | alignleft aligncenter alignright alignjustify outdent indent lineheight bullist numlist",
          "styleselect fontselect fontsizeselect |  | blockquote subscript superscript removeformat | table image media charmap hr pagebreak insertdatetime preview searchreplace",
        ],
        // "fullscreen undo redo | forecolor backcolor bold italic underline strikethrough | alignleft aligncenter alignright alignjustify outdent indent | \
        // styleselect fontselect fontsizeselect | bullist numlist | blockquote subscript superscript removeformat | table image media charmap hr pagebreak insertdatetime print preview | code selectall searchreplace visualblocks | indent2em lineheight formatpainter axupimgs",
        statusbar: false,
        // "fullscreen undo redo restoredraft | cut copy paste pastetext | forecolor backcolor bold italic underline strikethrough link anchor | alignleft aligncenter alignright alignjustify outdent indent | styleselect formatselect fontselect fontsizeselect | bullist numlist | blockquote subscript superscript removeformat | table image media charmap hr pagebreak insertdatetime print preview | code selectall searchreplace visualblocks | indent2em lineheight formatpainter axupimgs",
        height: 400,
        paste_data_images: true,
        content_style: "body { margin: 10px 20px; }",
        images_upload_handler: (blobInfo, success, failure) => {
          console.log("上传图片", blobInfo, success, failure);
          this.$emit("imageUpload", blobInfo, success, failure);
          // if (blobInfo.blob().size / 1024 / 1024 > 2) {
          //   failure("上传失败，图片大小请控制在 2M 以内");
          // } else {
          //   let params = new FormData();
          //   params.append("file", blobInfo.blob());
          //   let config = {
          //     headers: {
          //       "Content-Type": "multipart/form-data",
          //     },
          //   };
          //   request
          //     .post(uploadUrl, params, config)
          //     .then((res) => {
          //       console.log(res);
          //       if (this.$tools.getCode(res)) {
          //         success(res.data.url); //上传成功，在成功函数里填入图片路径
          //       } else {
          //         failure("上传失败");
          //       }
          //     })
          //     .catch(() => {
          //       failure("上传出错，服务器开小差了呢");
          //     });
          // }
        },
        media_alt_source: false,
        media_filter_html: false,
        file_picker_types: "image media file",
        file_picker_callback: (callback, value, meta) => {
          console.log("上传回调~~~", callback, value, meta);
          console.log("value", value);
          let filetype = ".mp3,.mp4,.jpg,.jpeg,.png,.gif"; //限制文件的上传类型

          if (meta.filetype == "media") {
            filetype = ".mp4";
          } else if (meta.filetype == "image") {
            filetype = ".jpg,.jpeg,.png,.gif";
          } else if (meta.filetype == "file") {
            filetype = ".mp3,.mp4,.jpg,.jpeg,.png,.gif";
          }
          // else {
          //   // this.$message.error("上传格式错误，请上传图片/视频~");
          //   return true;
          // }

          let inputElem = document.createElement("input"); //创建文件选择
          inputElem.setAttribute("type", "file");
          inputElem.setAttribute("accept", filetype);
          inputElem.click();
          inputElem.onchange = () => {
            let file = inputElem.files[0]; //获取文件信息
            console.log("上传媒体", file, callback, meta);
            this.$emit("fileUpload", file, callback, meta);
            //   if (
            //     file.type.slice(0, 5) == "image" &&
            //     file.size / 1024 / 1024 > 2
            //   ) {
            //     this.$message.error("上传失败，图片大小请控制在 2M 以内");
            //   } else if (
            //     file.type.slice(0, 5) == "video" &&
            //     file.size / 1024 / 1024 > 20
            //   ) {
            //     this.$message.error("上传失败，视频大小请控制在 20M 以内");
            //   } else if (
            //     file.type.slice(0, 5) != "image" &&
            //     file.type.slice(0, 5) != "video"
            //   ) {
            //     this.$message.error("上传格式错误，请上传图片/视频~");
            //     return true;
            //   } else {
            //     let params = new FormData();
            //     params.append("file", file);
            //     let config = {
            //       headers: {
            //         "Content-Type": "multipart/form-data",
            //       },
            //     };
            //     console.log("上传文件", params, config, file);
            //     request
            //       .post(uploadUrl, params, config)
            //       .then((res) => {
            //         console.log(res);
            //         if (this.$tools.getCode(res)) {
            //           callback(res.data.url);
            //         } else {
            //           this.$message.error("上传失败，请重新上传~");
            //           return true;
            //         }
            //       })
            //       .catch(() => {
            //         this.$message.error("上传失败，请重新上传~");
            //         return true;
            //       });
            //   }
          };
        },
        setup: function (editor) {
          _this.addButton && _this.addButton(editor);
        },
      },
    };
  },
  methods: {
    handleChange(value) {
      this.$emit("input", value);
      this.$emit("content", value);
    },
  },
};
</script>

<style lang="scss" scoped>
:v-deep .tox .tox-statusbar a:focus:not(:disabled):not([aria-disabled="true"]),
.tox .tox-statusbar a:hover:not(:disabled):not([aria-disabled="true"]),
.tox .tox-statusbar__path-item:focus:not(:disabled):not([aria-disabled="true"]),
.tox .tox-statusbar__path-item:hover:not(:disabled):not([aria-disabled="true"]),
.tox .tox-statusbar__wordcount:focus:not(:disabled):not([aria-disabled="true"]),
.tox
  .tox-statusbar__wordcount:hover:not(:disabled):not([aria-disabled="true"]) {
  display: none;
}

::v-deep .mce-content-body {
  margin: 0 auto;
}
::v-deep .tox:not([dir="rtl"]) .tox-statusbar__branding {
  display: none;
}
</style>
