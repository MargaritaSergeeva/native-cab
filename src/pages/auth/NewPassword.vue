<template>
  <div class="login-page">
    <h1 class="login-page__title guest-title custom-font">Введите новый пароль</h1>
    <div class="login-page__form-wrapper">
      <q-form class="login-page__form login-form" @submit.prevent.stop="onSubmit">
        <div class="login-form__group">
          <label class="label">Пароль</label>
          <q-input
            ref="passwordInputRef"
            v-model="formData.password"
            :type="isPassword ? 'password' : 'text'"
            lazy-rules
            dense
            square
            borderless
            class="input"
            @keydown.space.prevent
          >
            <template #append>
              <q-icon
                class="cursor-pointer"
                :style="{color: isPassword ? '#C4C4C4' : '#5D5FEF'}"
                @click="isPassword = !isPassword"
              >
                <div v-if="!isPassword" class="login-form__eye-visible">
                  <svg width="16" height="16" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M11.9603 9.95985C10.8207 10.8285 9.43306 11.3098 8.00033 11.3332C3.33366 11.3332 0.666992 5.99985 0.666992 5.99985C1.49625 4.45445 2.64642 3.10426 4.04033 2.03985M6.60033 0.826521C7.05921 0.719107 7.52904 0.665413 8.00033 0.666521C12.667 0.666521 15.3337 5.99985 15.3337 5.99985C14.929 6.75693 14.4464 7.46968 13.8937 8.12652M9.41366 7.41319C9.23056 7.60969 9.00976 7.76729 8.76443 7.8766C8.5191 7.98591 8.25426 8.04469 7.98572 8.04943C7.71718 8.05417 7.45043 8.00477 7.2014 7.90418C6.95236 7.80359 6.72614 7.65387 6.53622 7.46396C6.34631 7.27404 6.19659 7.04782 6.096 6.79878C5.99541 6.54975 5.94601 6.283 5.95075 6.01446C5.95549 5.74592 6.01426 5.48108 6.12358 5.23575C6.23289 4.99042 6.39049 4.76962 6.58699 4.58652"
                      stroke="#999999" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
                <div v-else class="login-form__eye-invisible">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M11.9603 11.9599C10.8207 12.8285 9.43306 13.3098 8.00033 13.3332C3.33366 13.3332 0.666992 7.99985 0.666992 7.99985C1.49625 6.45445 2.64642 5.10426 4.04033 4.03985M6.60033 2.82652C7.05921 2.71911 7.52904 2.66541 8.00033 2.66652C12.667 2.66652 15.3337 7.99985 15.3337 7.99985C14.929 8.75693 14.4464 9.46968 13.8937 10.1265M9.41366 9.41319C9.23056 9.60969 9.00976 9.76729 8.76443 9.8766C8.5191 9.98591 8.25426 10.0447 7.98572 10.0494C7.71718 10.0542 7.45043 10.0048 7.2014 9.90418C6.95236 9.80359 6.72614 9.65387 6.53622 9.46396C6.34631 9.27404 6.19659 9.04782 6.096 8.79878C5.99541 8.54975 5.94601 8.283 5.95075 8.01446C5.95549 7.74592 6.01426 7.48108 6.12358 7.23575C6.23289 6.99042 6.39049 6.76962 6.58699 6.58652"
                      stroke="#999999" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M0.666992 0.666504L15.3337 15.3332" stroke="#999999" stroke-width="1.33333"
                          stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
              </q-icon>
            </template>
          </q-input>
          <small v-if="formErrors.password" class="text-red">{{ formErrors.email }}</small>
        </div>
        <div class="login-form__group">
          <label class="label">Повторите пароль</label>
          <q-input
            ref="passwordInputRef"
            v-model="formData.repeated_password"
            :type="isPassword ? 'password' : 'text'"
            lazy-rules
            dense
            square
            borderless
            class="input"
            @keydown.space.prevent
          >
            <template #append>
              <q-icon
                class="cursor-pointer"
                :style="{color: isPassword ? '#C4C4C4' : '#5D5FEF'}"
                @click="isPassword = !isPassword"
              >
                <div v-if="!isPassword" class="login-form__eye-visible">
                  <svg width="16" height="16" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M11.9603 9.95985C10.8207 10.8285 9.43306 11.3098 8.00033 11.3332C3.33366 11.3332 0.666992 5.99985 0.666992 5.99985C1.49625 4.45445 2.64642 3.10426 4.04033 2.03985M6.60033 0.826521C7.05921 0.719107 7.52904 0.665413 8.00033 0.666521C12.667 0.666521 15.3337 5.99985 15.3337 5.99985C14.929 6.75693 14.4464 7.46968 13.8937 8.12652M9.41366 7.41319C9.23056 7.60969 9.00976 7.76729 8.76443 7.8766C8.5191 7.98591 8.25426 8.04469 7.98572 8.04943C7.71718 8.05417 7.45043 8.00477 7.2014 7.90418C6.95236 7.80359 6.72614 7.65387 6.53622 7.46396C6.34631 7.27404 6.19659 7.04782 6.096 6.79878C5.99541 6.54975 5.94601 6.283 5.95075 6.01446C5.95549 5.74592 6.01426 5.48108 6.12358 5.23575C6.23289 4.99042 6.39049 4.76962 6.58699 4.58652"
                      stroke="#999999" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
                <div v-else class="login-form__eye-invisible">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M11.9603 11.9599C10.8207 12.8285 9.43306 13.3098 8.00033 13.3332C3.33366 13.3332 0.666992 7.99985 0.666992 7.99985C1.49625 6.45445 2.64642 5.10426 4.04033 4.03985M6.60033 2.82652C7.05921 2.71911 7.52904 2.66541 8.00033 2.66652C12.667 2.66652 15.3337 7.99985 15.3337 7.99985C14.929 8.75693 14.4464 9.46968 13.8937 10.1265M9.41366 9.41319C9.23056 9.60969 9.00976 9.76729 8.76443 9.8766C8.5191 9.98591 8.25426 10.0447 7.98572 10.0494C7.71718 10.0542 7.45043 10.0048 7.2014 9.90418C6.95236 9.80359 6.72614 9.65387 6.53622 9.46396C6.34631 9.27404 6.19659 9.04782 6.096 8.79878C5.99541 8.54975 5.94601 8.283 5.95075 8.01446C5.95549 7.74592 6.01426 7.48108 6.12358 7.23575C6.23289 6.99042 6.39049 6.76962 6.58699 6.58652"
                      stroke="#999999" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M0.666992 0.666504L15.3337 15.3332" stroke="#999999" stroke-width="1.33333"
                          stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
              </q-icon>
            </template>
          </q-input>
          <small v-if="formErrors.password" class="text-red">{{ formErrors.password }}</small>
        </div>
        <q-btn class="login-form__main-btn main-btn main-btn--blue main-btn--wide" type="submit">Продолжить</q-btn>

        <q-inner-loading
          :showing="processing"
          label-class="text-teal"
          label-style="font-size: 1.1em"/>
      </q-form>

      <div class="login-page__links">
        <router-link to="/auth/registration">Регистрация</router-link>
        <router-link to="/auth/login">Вход</router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {reactive, ref} from 'vue';

const isPassword = ref(true);

interface Credentials {
  email: string;
  password: string;
  repeated_password: string;
  role: number;
}

interface CredentialsErrors {
  email: string;
  password: string;
}

const processing = ref(false);
const formData = reactive<Credentials>({
  email: '',
  password: '',
  repeated_password: '',
  role: 1,
});

const formErrors = ref<CredentialsErrors>({
  email: '',
  password: '',
});
</script>
