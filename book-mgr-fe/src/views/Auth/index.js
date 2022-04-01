import { defineComponent, ref, reactive } from "vue";
import { Avatar, Lock, Message } from "@element-plus/icons-vue";
import { auth } from '@/service';
import { ElMessage } from 'element-plus';
import { result } from '@/helpers/utils'



export default defineComponent({
  // 组件初始化的时候会执行一次
  setup() {
    // 注册用的表单数据
    const regForm = reactive({
      account: '',
      password: '',
      inviteCode: ''
    });

    // 登录用的表单数据
    const loginForm = reactive({
      account: '',
      password: ''
    });

    // ajax请求， 注册逻辑
    const register = async () => {
      if(regForm.account == "" || regForm.password == "" || regForm.inviteCode == "") {
        ElMessage({
          type: "warning",
          message: "账号密码和邀请码都不能为空",
          showClose: true
        });
        return;
      }

      
      const res = await auth.register(regForm.account, regForm.password, regForm.inviteCode);

      result(res).success((data) => {
        ElMessage({
          type: "success",
          message: data.msg,
          showClose: true
        });
        return;
      }).fail((data) => {
        ElMessage({
          type: "error",
          message: data.msg,
          showClose: true
        });
        return;
      })

      //0是失败, 1表示成功
      // if(data.code) {
      //   ElMessage({
      //     type: "success",
      //     message: "注册成功",
      //     showClose: true
      //   });
      //   return;
      // }

      // 如果注册失败，信息由服务端提供
      // ElMessage({
      //   type: "error",
      //   message: data.msg,
      //   showClose: true
      // })
    };

    // ajax请求，登录逻辑
    const login = async () => {
      if(loginForm.account == "" || loginForm.password == "") {
        ElMessage({
          type: "warning",
          message: "账号和密码都不能为空",
          showClose: true
        });
        return;
      }
      const { data } =await auth.login(loginForm.account, loginForm.password);

      //0是失败, 1表示成功
      if(data.code) {
        ElMessage({
          type: "success",
          message: "登录成功",
          showClose: true
        });
        return;
      }

      // 如果登录失败，信息由服务端提供
      ElMessage({
        type: "error",
        message: data.msg,
        showClose: true
      })
    };

    return {
      Avatar,
      Lock,
      Message,
      regForm,
      loginForm,
      activeName: ref('first'),
      register,
      login
    }
  }
})