import { defineComponent } from "vue";
import menu from '@/config/menu';

import {
  Document,
  Menu as IconMenu,
  User,
  Message
} from '@element-plus/icons-vue'

export default defineComponent({
  components: {
    Document,
    IconMenu,
    User,
    Message
    
  },
  setup() {
    return {     
      menu      
    }
  }
});