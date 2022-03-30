import { defineComponent, ref, reactive } from "vue";
import { Avatar, Lock, Message } from "@element-plus/icons-vue"
import {auth} from '@/service'


export default defineComponent({
  // 组件初始化的时候会执行一次
  setup() {
    const regForm = reactive({
      account: '',
      password: ''
    });

    const register = () => {
      auth.register(regForm.account, regForm.password);
    }

    return {
      Avatar,
      Lock,
      Message,
      regForm,
      activeName: ref('first'),
      register
    }
  }
})