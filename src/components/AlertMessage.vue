<template>
  <div>
  </div>
</template>


<script>
import { defineComponent } from 'vue';
import toastr, { success } from 'toastr';
import 'toastr/build/toastr.css';
toastr.options = {
  "progressBar": true,
  "preventDuplicates": true,
  "positionClass": "toast-top-right",
  "hideDuration": "4000",
  "timeOut": "5000",
}

export default defineComponent({
  name: 'AlertMessage',
  props: {
    error: {
      type: [String, Object], 
      default: () => ({}),
    },
    success: {
      type: Boolean,
    },
  },
  methods: {
    showToast(type) {
      switch (type) {
        case 'success':
          toastr.success('Ми зателефонуємо вам найближчим часом!');
          break;
        case 'success':
          toastr.error(this.error);
          break;
        default:
          break;
      }
    },
  },
  watch: {
    success() {
      if (this.success == true) {
        this.showToast('success');
      }
    },
    error(newVal) {
      if (newVal) {
        this.showToast('error');
      }
    },
  },
});
</script>
