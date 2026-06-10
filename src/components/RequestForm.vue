<!-- RequestForm.vue -->
<template>
  <div>
    <v-dialog max-width="700" v-model="dialog">
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn
          v-bind="activatorProps"
          :color="ButtonColor"
          :prepend-icon="ButtonIcon"
          :class="ButtonClass"
          :variant="ButtonVariant"
        >
          <span>{{ ButtonTitle }}</span>
        </v-btn>
      </template>

      <template v-slot:default="{ isActive }">
        <v-form ref="form" v-model="valid" @submit.prevent="submit(isActive)">
          <v-card class="request-form-card card-hover card-animate" elevation="0">
            <v-card-title class="title-section">
              <v-img
                max-height="80"
                max-width="120"
                src="@/assets/logo/happylinkLogo.svg"
                alt="HappyLink"
              ></v-img>
              <v-btn icon @click="isActive.value = false" variant="text" density="comfortable">
                <v-icon size="small">mdi-close</v-icon>
              </v-btn>
            </v-card-title>

            <v-divider class="mx-6"></v-divider>

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
                  prepend-inner-icon="mdi-phone"
                  variant="outlined"
                  density="comfortable"
                  hide-details="auto"
                  class="form-field"
                ></v-text-field>

                <v-text-field
                  v-model="FormName"
                  :label="$t('request-form.name')"
                  :rules="NameinputRules"
                  prepend-inner-icon="mdi-account"
                  variant="outlined"
                  density="comfortable"
                  hide-details="auto"
                  class="form-field"
                ></v-text-field>
              </div>

              <v-textarea
                v-if="CommentField"
                v-model="FormComment"
                :label="$t('request-form.comment')"
                prepend-inner-icon="mdi-text"
                rows="2"
                variant="outlined"
                density="comfortable"
                hide-details="auto"
                class="form-field mt-4"
              ></v-textarea>

              <v-card-subtitle class="form-data-text mt-4">
                {{ FormData }}
              </v-card-subtitle>
            </v-card-text>

            <v-card-actions class="justify-center pb-6">
              <v-btn
                color="secondary"
                class="text-black font-weight-bold px-12"
                type="submit"
                size="large"
                rounded="pill"
                variant="flat"
                :disabled="!valid"
              >
                {{ $t('request-form.send') }}
              </v-btn>
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
    ButtonTitle: { type: String },
    ButtonColor: { type: String },
    ButtonIcon: { type: String },
    ButtonClass: { type: String },
    ButtonVariant: { type: String },
    CommentField: { type: Boolean },
    FormData: { type: String }
  },
  data() {
    return {
      valid: false,
      FormPhoneNumber: '',
      FormName: '',
      FormComment: '',
      PhoneinputRules: [(v) => v?.length === 14 || '10 символів'],
      NameinputRules: [
        (v) => !/\d/.test(v) || 'Це текстове поле',
        (v) => v?.length >= 3 || 'Мінімум 3 символи',
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
          const apiPayload = {
            name: this.FormName,
            phone: this.FormPhoneNumber,
            reason: this.FormData,
            comment: this.FormComment
          };
          const apiResponse = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(apiPayload),
          });
          if (!apiResponse.ok) throw new Error(`Error: ${apiResponse.statusText}`);
          this.error = null;
          this.success = true;
          isActive.value = false;
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
.request-form-card {
  position: relative;
  background: #ffffff;
  border: 1px solid rgba(0,0,0,0.05);
  border-radius: 28px !important;
  overflow: hidden;
  padding: 40px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.08) !important;
}

.title-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0 16px 0;
}

.subtitle {
  font-size: 1rem;
  color: #424242;
  text-align: center;
  margin: 0 0 24px;
  line-height: 1.6;
}

.text-section {
  padding: 0;
}

/* Поля ввода */
.form-field :deep(.v-field__input) {
  font-size: 0.95rem;
}

.form-field :deep(.v-label) {
  font-size: 0.875rem;
  color: #757575;
}

/* Контейнер для двух полей */
.input-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

@media (min-width: 600px) {
  .input-container {
    flex-direction: row;
    gap: 20px;
  }

  .form-field {
    flex: 1;
  }
}

.form-data-text {
  font-size: 0.9rem;
  color: #666;
  font-style: italic;
  text-align: center;
  line-height: 1.5;
  white-space: normal;
  word-wrap: break-word;
}

/* Адаптив */
@media (max-width: 600px) {
  .request-form-card {
    padding: 24px;
  }

  .title-section {
    padding-bottom: 12px;
  }

  .subtitle {
    font-size: 0.95rem;
    margin-bottom: 20px;
  }
}
</style>