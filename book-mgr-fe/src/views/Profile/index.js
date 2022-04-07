import { defineComponent, reactive } from "vue"
import { profile } from "@/service"
import { result } from "@/helpers/utils"
import { ElMessage } from "element-plus";

export default defineComponent({
  setup() {

    const resetPasswordForm = reactive({
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: ''
    })

    const resetPassword = async () => {
      if(resetPasswordForm.newPassword !== resetPasswordForm.confirmNewPassword) {
        ElMessage({
          type: "warning",
          message: "两次密码输入不一致,请重新输入"
        })
        return;
      }

      const res = await profile.resetPassword(
        resetPasswordForm.newPassword,
        resetPasswordForm.oldPassword
      )

      result(res).success(({msg}) => {
        ElMessage({
          type:'success',
          message: msg
        })

        resetPasswordForm.oldPassword = '';
        resetPasswordForm.newPassword = '';
        resetPasswordForm.confirmNewPassword = '';
      }).fail(({msg}) => {
        ElMessage({
          type: 'error',
          message: msg
        })
      })
    }

    return {
      resetPasswordForm,
      resetPassword
    }
  }
})