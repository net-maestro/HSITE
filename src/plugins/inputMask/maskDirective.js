export default {
    mounted(el) {
      el.addEventListener('input', (e) => {
        let x = e.target.value.replace(/\D/g, '');
        x = x.match(/(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
        e.target.value = !x[2]
          ? x[1]
          : '(' + x[1] + ')' + x[2] + (x[3] ? '-' + x[3] : '') + (x[4] ? '-' + x[4] : '');
      });
    }
  };
  