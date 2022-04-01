import { defineComponent } from "vue";
import { User } from "@element-plus/icons-vue";
import Nav from "./Nav/index.vue"

export default defineComponent({
  components: {
    AppNav:Nav
  },
  setup() {
    return {
      User,
    }
  }
});