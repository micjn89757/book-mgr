import { defineComponent } from "vue";
import { User } from "@element-plus/icons-vue";
import { delToken } from "@/helpers/token";
import { useRouter } from 'vue-router'
import Store from "../../store"
import Nav from "./Nav/index.vue"

export default defineComponent({
  components: {
    AppNav:Nav
  },
  setup() {
    // console.log(Store.state);
    const router = useRouter();

    const exit = () => {
      delToken();

      router.replace('/auth')
    }
    return {
      User,
      exit,
      Store
    }
  }
});