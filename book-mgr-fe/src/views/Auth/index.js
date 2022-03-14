import { defineComponent, ref } from "vue";
import { Avatar, Lock, Message } from "@element-plus/icons-vue"



export default defineComponent({
  // 组件初始化的时候会执行一次
  setup() {
    return {
      Avatar,
      Lock,
      Message,
      activeName: ref("first")
    }
  }
})