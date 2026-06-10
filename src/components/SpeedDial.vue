<template >
  <div style="z-index: 1000;position:fixed;top:65px;left:110px;">
  <v-speed-dial 
  location="bottom center"
  transition="fade-transition"
  style="opacity: 0.9;"
>

  <template v-slot:activator="{ props: activatorProps }">
    <v-fab
      dark
      color="secondary"
      v-bind="activatorProps"
      icon="mdi-phone-in-talk mdi-rotate-90 mdi-dark"
    ></v-fab>
  </template>


<v-dialog max-width="500">
<template v-slot:activator="{ props: activatorProps }">

<v-tooltip text="Залишити заявку" location="end">
<template v-slot:activator="{ props }">

<div v-bind="props">
  <v-btn v-bind="activatorProps" key="1" icon="mdi-phone-incoming" color="secondary"></v-btn>
</div>

</template>
</v-tooltip>
</template>

<template v-slot:default="{ isActive }">
  <v-form ref="form" v-model="valid" @submit.prevent="submit">
    <v-card>
      <v-card-actions>
        <v-card-title>Залишити заявку</v-card-title>
        <v-spacer></v-spacer>
        <v-btn icon text="X" @click="isActive.value = false"></v-btn>
      </v-card-actions>
           
            <v-card-subtitle>Вкажіть ваші контакти</v-card-subtitle>
           
            
            <v-card-text>
              <v-text-field
                v-model="phoneNumber"
                label="Ваш номер телефону*"
                :rules="[rules.required, rules.phone]"
                required
                prepend-icon="mdi-phone"
              ></v-text-field>
              <v-text-field
                v-model="name"
                label="Ваше імʼя"
                prepend-icon="mdi-account"
              ></v-text-field>
              <v-textarea v-model="comment" label="Коментар" prepend-icon="mdi-text"></v-textarea>
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary" @click="submit">НАДІСЛАТИ</v-btn>
            </v-card-actions>
          </v-card>

  </v-form>
  </template> 

</v-dialog>

<v-tooltip text="HappyLink в facebook" location="end">
<template v-slot:activator="{ props }">
  <v-btn v-bind="props" key="2" icon="mdi-facebook" color="info" href="https://www.facebook.com/HappyLinkNetUa"></v-btn>
</template>
</v-tooltip>

<v-tooltip text="Напишіть нам: info@happylink.net.ua" location="end">
<template v-slot:activator="{ props }">
  <v-btn v-bind="props" key="3" icon="mdi-email-outline" color="surface-light" href="mailto:info@happylink.net.ua"></v-btn>
</template>
</v-tooltip>


<v-tooltip text="Де ми знаходимось" location="end">
<template v-slot:activator="{ props }">
  <v-btn v-bind="props" key="4" icon="mdi-map-marker" color="primary" to="/contact"></v-btn>
</template>
</v-tooltip>

</v-speed-dial>
  </div>
</template>


<script>
export default {
  data() {
    return {
      valid: false,
      phoneNumber: '',
      name: '',
      rules: {
        required: value => !!value || "Обов'язкове поле для заповнення",
        phone: value => {
          const pattern = /^\+38\(\d{2}\)\-\d{7}$/;
          return pattern.test(value) || "Введіть коректний номер телефону";
        },
      },
    };
  },
  methods: {
    submit() {
      this.$refs.form.validate();
      if (this.valid) {
        // Handle the form submission
        alert(`Phone: ${this.phoneNumber}\nName: ${this.name}`);
      }
    },
    isOpenForm(){
      this.isOpenForm = this.isActive
    }
  },
};
</script>
