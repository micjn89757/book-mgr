import { defineComponent, ref, reactive } from "vue";
import { book } from "@/service";
import { result, clone } from '@/helpers/utils';
import { ElMessage } from "element-plus";

const defaultFormData = {
      name: '',
      price: 0,
      author: '',
      publishDate: '',
      classify: '',
      count: ''
}

export default defineComponent({
  props: {
    show: Boolean,
  },
  setup(props, context) {
    // 对话框的数据
    const addForm = reactive(clone(defaultFormData));

    // 提交时进行表单校验使用
    const ruleFormRef = ref('');

    // 表单校验规则
    const rules = reactive({
      name:[
        {required: true, message: '请输入书名', trigger: 'change'}
      ],
      author: [
        {required:true, message:'请输入作者', trigger:'change'}
      ],
      publishDate: [
        {type:'date', required:true, message:'请选择日期', trigger:'change'}
      ],
      classify: [
        {required:true, message:'请输入分类', trigger:'change'}
      ]
    })

    // 关闭对话框
    const close = () => {
      context.emit('update:show', false);
    }


    // 提交表单数据并关闭对话框
    const submit = async (ruleForm) => {
      console.log(addForm);
      if(!ruleForm) return;
      await ruleForm.validate(async(valid, fields) => {
        if(valid) {
          addForm.classify = addForm.classify.split(',');
          const res = await book.add(addForm);    
          result(res).success(({msg}) => {
            Object.assign(addForm, defaultFormData); // 添加完就清空数据
            ElMessage({
              type: 'success',
              message: msg
            })
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
      ruleFormRef
    }
  }
});