import { defineComponent, reactive, watch } from "vue";
import { book } from "@/service";
import { result } from '@/helpers/utils';
import { ElMessage } from "element-plus";

export default defineComponent({
  props: {
    show: Boolean,
    book: Object
  },
  setup(props, context) {
    // 对话框的数据
    const editForm = reactive({
      name: '',
      price: 0,
      author: '',
      publicDate: '',
      classify: ''
    });

    // 关闭对话框
    const close = () => {
      context.emit('update:show', false);
    }

    // book一旦发生改动，就调用后面的回调函数
    watch(() => props.book, (current) => {
      Object.assign(editForm, current);
    })


    // 提交表单数据并关闭对话框
    const submit = async () => {
      if((typeof editForm) === "string") {
        editForm.classify = editForm.classify.split(',');
      }
      const res = await book.update({
        id: props.book._id,
        name: editForm.name,
        price: editForm.price,
        author: editForm.author,
        publicDate: editForm.publicDate,
        classify: editForm.classify
      });    
      result(res).success(({msg, data}) => {
        ElMessage({
          type: 'success',
          message: msg
        });
        // 更新数据
        context.emit('update', data);
        close();
      }).fail(({msg}) => {
        ElMessage({
          type: 'error',
          message: msg
        })
      })
    }

    return {
      editForm,
      submit,
      props,
      close,
    }
  }
});