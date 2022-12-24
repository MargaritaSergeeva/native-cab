<template>
  <div class="login-page">
    <h1 class="login-page__title guest-title custom-font">Пароль был изменен!</h1>
    <div class="login-page__form-wrapper">
      <p>Вы успешно изменили пароль.</p>
      <p> Нажмите "Вход" и введите только что созданный пароль для входа в ваш аккаунт.</p>
      <div class="login-page__links">
        <router-link to="/auth/login">Вход</router-link>
      </div>
    </div>
  </div>
</template>
