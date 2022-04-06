import { defineComponent, ref, reactive } from "vue";
import { user } from "@/service";
import { result, clone } from '@/helpers/utils';
import { ElMessage } from "element-plus";
import store from "@/store";

const defaultFormData = {
    account: '',
    password: '',
    character: ''
}

export default defineComponent({
  props: {
    show: Boolean,
  },
  setup(props, context) {
    const { characterInfo } = store.state;

    // 对话框的数据
    const addForm = reactive(clone(defaultFormData));

    // 默认选择成员角色
    addForm.character = characterInfo[1]._id;

    // 提交时进行表单校验使用
    const ruleFormRef = ref('');

    // 表单校验规则
    const rules = reactive({
      account:[
        {required: true, message: '请输入账号', trigger: 'change'}
      ],
      password: [
        {required:true, message:'请输入密码', trigger:'change'}
      ],
      character: [
        {required:true, message:'请选择角色', trigger:'change'}
      ]
    })

    // 关闭对话框
    const close = () => {
      context.emit('update:show', false);
    }


    // 提交表单数据并关闭对话框
    const submit = async (ruleForm) => {
      if(!ruleForm) return;
      await ruleForm.validate(async(valid, fields) => {
        if(valid) {
          const res = await user.add(addForm);    
          result(res).success(({msg}) => {
            Object.assign(addForm, defaultFormData); // 添加完就清空数据
            ElMessage({
              type: 'success',
              message: msg
            });
            close();

            context.emit('getList');
          })
        }else {
          console.log('error', fields)
        }
      })
    }

    return {
      addForm,
      submit,
      props,
      close,
      rules,
      ruleFormRef,
      characterInfo
    }
  }
});