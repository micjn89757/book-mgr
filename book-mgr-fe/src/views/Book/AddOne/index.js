import { defineComponent, ref, reactive } from "vue";
import { book } from "@/service";

export default defineComponent({
  props: {
    show: Boolean,
  },
  setup(props, context) {
    const addForm = reactive({
      name: '',
      price: 0,
      author: '',
      publishDate: 0,
      classify: ''
    });

    // 关闭对话框
    const close = () => {
      context.emit('update:show', false);
    }



    // 提交表单数据并关闭对话框
    const submit = async () => {
      console.log(addForm);
      addForm.classify = addForm.classify.split(',');
      const res = await book.add(addForm);
      close();
    }

    return {
      addForm,
      submit,
      props,
      close,
    }
  }
});