<template>
  <div class="login-page">
    <h1 class="login-page__title guest-title custom-font">Забыли пароль?</h1>
    <div class="login-page__form-wrapper">
      <p>Укажите e-mail, на который мы отправим ссылку для восстановления учетной записи.</p>
      <q-form class="login-page__login-form login-form" @submit.prevent.stop="onSubmit">
        <div class="login-form__group">
          <label class="label">Email</label>
          <q-input
            ref="emailInputRef"
            v-model="formData.email"
            type="email"
            dense
            square
            borderless
            class="input"
            @keydown.space.prevent
          />
          <small v-if="formErrors.email" class="text-red">{{ formErrors.email }}</small>
        </div>
        <q-btn class="login-form__main-btn main-btn main-btn--blue main-btn--wide" type="submit">Отправить ссылку</q-btn>

        <q-inner-loading
          :showing="processing"
          label-class="text-teal"
          label-style="font-size: 1.1em"/>
      </q-form>

      <div class="login-page__links">
        <router-link to="/auth/registration">Регистрация</router-link>
        <router-link to="/auth/login">Войти</router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref} from 'vue';


interface Credentials {
  email: string;
}

interface CredentialsErrors {
  email: string;
}

const processing = ref(false);
const formData = ref<Credentials>({
  email: '',
});

const formErrors = ref<CredentialsErrors>({
  email: '',
});
</script>
