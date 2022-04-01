import { defineComponent } from "vue";

import {
  Search,
  Plus
} from '@element-plus/icons-vue'



export default defineComponent({
  setup() {
    const tableData = [
      {
        name: "ddd",
        age: 12
      }
    ]
    return {
      Search,
      Plus,
      tableData
    }
  }
});