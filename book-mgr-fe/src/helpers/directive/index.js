import { isAdmin } from "@/helpers/character";

export const regDirectives = (app) => {
  app.directive('only-admin', {
    mounted(el, { value = true}) {
      const res = isAdmin();
      // console.log(res);
    
      if(!res && value ) {
        el.style.display = 'none';
      }
    },
  });
}