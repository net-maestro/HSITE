<template lang="">
  <div>
    <v-dialog max-width="700" v-model="dialog">
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn v-bind="activatorProps" :color="ButtonColor" :prepend-icon="ButtonIcon" :class="ButtonClass" :variant="ButtonVariant">
         <span> {{ ButtonTitle }}</span>
        </v-btn>
      </template>

      <template v-slot:default="{ isActive }">
        <v-form ref="form" v-model="valid" @submit.prevent="submit(isActive)">
          <v-card class="rounded-form card-animate">
             
            <v-card-title class="title-section">
              <v-img max-height="120" max-width="150" src="@/assets/logo/happylinkLogo.svg"></v-img>
              <v-btn icon @click="isActive.value = false" >
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>

            <v-divider></v-divider>

            

            <v-card-text class="text-section">
              <p class="subtitle" v-html="$t('request-form.our-manager')"></p>
              <div class="input-container">
              <v-text-field
                v-model="FormPhoneNumber"
                :label="$t('request-form.phone-number')"
                :rules="PhoneinputRules"
                v-mask="'(###) ###-##-##'"
                placeholder="(___) ___-__-__"
                required
                prepend-icon="mdi-phone"
              ></v-text-field>
              <v-text-field
                v-model="FormName"
                :label="$t('request-form.name')"
                :rules="NameinputRules"
                prepend-icon="mdi-account"
              ></v-text-field>
            </div>
              <v-textarea
                v-if="CommentField"
                v-model="FormComment"
                :label="$t('request-form.comment')"
                prepend-icon="mdi-text"
                rows="1"
                variant="solo-filled"
              ></v-textarea>
            
              <v-card-subtitle class="text-center form-data-text">{{ FormData }}</v-card-subtitle>
            </v-card-text>
            <v-card-actions class="justify-center">
              <v-btn color="my-grey"  type="submit">{{$t('request-form.send')}}</v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </template>
    </v-dialog>

    <AlertMessage :error="error" :success="success" />
  </div>
</template>

<script>
export default {
  name: 'RequestForm',
  props: {
    ButtonTitle: {
      type: String,
    },
    ButtonColor: {
      type: String,
    },
    ButtonIcon: {
      type: String,
    },
    ButtonClass: {
      type: String,
    },
    ButtonVariant:{
       type: String,
    },
    CommentField: {
      type: Boolean
    },
    FormData: {
      type: String,
    }
  },
  data() {
    return {
      valid: false,
      FormPhoneNumber: '',
      FormName: '',
      FormComment: '',
      PhoneinputRules: [(v) => v.length == 14 || '10 символів'],
      NameinputRules: [
        (v) => !/\d/.test(v) || 'Це текстове поле',
        (v) => v.length >= 3 || 'Мінімум 3 символи',
      ],
      dialog: false,
      error: null,
      success: false,
    };
  },
  methods: {
    async submit(isActive) {
      this.$refs.form.validate();
      if (this.valid) {
       
        const apiUrl = import.meta.env.VITE_API_LINK;

        if (!apiUrl) {
          console.error("Переменные окружения не найдены!");
          return;
        }
        
        try {
          //Add the POST request to the new API
         
          const apiPayload = {
            name: this.FormName,
            phone: this.FormPhoneNumber,
            reason: this.FormData,
            comment: this.FormComment
          };

          const apiResponse = await fetch(apiUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(apiPayload),
          });

          if (!apiResponse.ok) {
            throw new Error(`Error: ${apiResponse.statusText}`);
          }

          this.error = null;
          this.success = true;
          isActive.value = false; // Close the dialog on successful submission
        } catch (err) {
          this.error = err.message;
          this.success = false;
        }
      }
    },
  },
};
</script>

<style scoped>
.rounded-form {
  border-radius: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  padding: 32px;
  background: #f9f9f9;
}

.title-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.5rem;
  font-weight: bold;
}

.form-title {
  color: #333;
}

.subtitle {
  font-size: 1rem;
  color: #666;
  text-align: center;
  margin: 16px 0 32px;
}

.text-section {
  text-align: center;
  padding: 0 24px;
}

.v-text-field {
  border-radius: 8px;
}

.form-data-text {
  white-space: normal; /* Разрешить перенос текста на несколько строк */
  word-wrap: break-word; /* Разрешить перенос слов, если они слишком длинные */
  word-break: break-word; /* Разрешить перенос слов в случае длинных слов */
}

@media (min-width: 1024px) { /* Adjust 1024px as needed for your breakpoint */
  .input-container {
    display: flex;
    gap: 16px;
    justify-content: center;
  }
}


</style>