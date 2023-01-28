<template>
  <div id="main">
    <div style="display: flex;">
      <n-upload
          multiple
          directory-dnd
          v-model:file-list="files"
      >
        <n-upload-dragger>
          <div style="margin-bottom: 12px">
            <n-icon size="48" :depth="3">
              <archive-icon/>
            </n-icon>
          </div>
          <n-text style="font-size: 16px">
            点击或者拖动文件到该区域
          </n-text>
        </n-upload-dragger>
      </n-upload>
      <n-button tertiary circle style="margin-left: 5px;" @click="files=[]">
        <template #icon>
          <n-icon>
            <Clean/>
          </n-icon>
        </template>
      </n-button>
    </div>
    <n-select v-model:value="selType" :options="Object.keys(types).map(v =>  {
      return {
        label:v,
        value:v
      }
    })"></n-select>
    <div style="display: flex;flex-flow: row-reverse;margin-top: 5px;">
      <n-button @click="cover" :disabled="files.length < 1">转换</n-button>
    </div>
  </div>
</template>
<script>
import {ArchiveOutline as ArchiveIcon} from "@vicons/ionicons5";
import {Clean} from "@vicons/carbon";
import {useMessage} from "naive-ui";
import {defineComponent} from 'vue'

export default defineComponent({
  components: {
    ArchiveIcon,
    Clean
  },
  data() {
    return {
      files: [],
      selType: '7z',
      types: {
        '7z': [55, 122, 188, 175],
        'rar': [83, 97, 114, 33],
        'zip': [80, 75, 3, 4],
        'exe': [77, 90, 96, 0],
        'iso': [51, 237, 144, 144],
        'apk': [80, 75, 3, 4]
      }
    }
  },
  methods: {
    cover() {
      for (let file of this.files) {
        let fileReader = new FileReader();
        fileReader.onloadend = (v) => {
          let uint8Array = new Uint8Array(v.target.result);
          let type = this.types[this.selType];
          type.forEach((v, i) => {
            uint8Array[i] = v;
          })
          let url = window.URL.createObjectURL(new Blob([uint8Array.buffer], {type: "arraybuffer"}))
          const link = document.createElement('a');
          link.style.display = 'none';
          link.href = url;
          link.setAttribute('download', file.name + '.' + this.selType);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
        fileReader.onerror = (v) => {
          this.message.error(v.target.error.toString())
        }
        fileReader.readAsArrayBuffer(file['file'])
      }
    }
  },
  setup() {
    let message = useMessage();
    return {
      message,
    };
  }
});
</script>
