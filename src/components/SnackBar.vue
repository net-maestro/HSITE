<template >
   <div class="snackbar">
    <i
      class="mdi mdi-chat-question-outline mdi-dark icon-button"
      @click="snackbar = true"
    ></i>

    

    <v-snackbar
      :timeout="10000"
      v-model="snackbar"
      vertical
      color="dark"
    >
     <div v-html="$t('prices.snackbar-text')"></div>

      <template v-slot:actions>
        <v-btn
          color="dark"
          variant="text"
          @click="snackbar = false"
        >
          X
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>


<script>
  export default {
    data: () => ({
      snackbar: false,
    }),
  }
</script>

<style scoped>
.snackbar{
  position: fixed;
  top: 213px;
  right: 40px;
}
.icon-button {
  font-size: 32px;
}

/* Ensure the cursor remains pointer on hover */
.icon-button:hover {
  cursor: pointer;
}
    
</style>