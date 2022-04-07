import { defineComponent } from "vue";
import { useRoute } from "vue-router";
import {items, subitems} from '@/config/menu';

import {
  Collection,
  Menu as IconMenu,
  User,
  Message,
  Menu,
  Position,
  Box,
  Lollipop,
  Pointer,
  List
} from '@element-plus/icons-vue'

export default defineComponent({
  components: {
    Collection,
    IconMenu,
    User,
    Message,
    Menu,
    Position,
    Box,
    Lollipop,
    Pointer,
    List
  },
  setup() {
    const router = useRoute()
    // console.log(router.path);

    return {     
      items,
      subitems,
      router      
    }
  }
});