<template>
  <div class="registration-page">
    <div class="registration-page__stepper-wrapper">
      <q-stepper
        v-model="step"
        ref="stepper"
        color="primary"
        animated
        header-class="hidden"
        class="registration-stepper"
      >
        <q-step
          :name="1"
          :done="step > 1"
          class="registration-stepper__step registration-stepper__step--first"
        >
          <h1 class="registration-page__title guest-title custom-font">Регистрация</h1>

          <div class="registration-stepper__item">
            <q-select
              :options="USER_TYPES"
              map-options
              emit-value
              option-value="id"
              option-label="name"
              v-model="registrationData.userType"
              class="registration-stepper__select select"
              popup-content-class="select__menu"
              options-selected-class="select__option"
              dropdown-icon="keyboard_arrow_down"
              square
              borderless
            />
          </div>
          <div
            class="registration-stepper__item registration-stepper__item--last"
          >
            <q-select
              :options="ORGANIZATION_TYPES"
              map-options
              emit-value
              option-value="id"
              option-label="name"
              v-model="registrationData.organizationType"
              class="registration-stepper__select select"
              popup-content-class="select__menu"
              options-selected-class="select__option"
              dropdown-icon="keyboard_arrow_down"
              square
              borderless
              @update:model-value="registrationData.conditions='offer'"
            />
          </div>
        </q-step>

        <q-step
          :name="2"
          :done="step > 2"
          class="registration-stepper__step"
        >
          <div class="registration-stepper__fix-height"
               :class="{'registration-stepper__fix-height--hidden' : registrationData.organizationType === OrganizationTypes.SOLE_ENTREPRENEUR}">
            <div v-if="registrationData.organizationType === OrganizationTypes.LLC"
                 class="registration-stepper__group registration-stepper__group--rules">
              <label class="label">Наименование организации</label>
              <q-input
                ref="organizationNameInputRef"
                v-model="registrationData.llc_name"
                dense
                square
                borderless
                bottom-slots
                lazy-rules
                class="input"
                :rules="[rules.required, rules.minLen(3), rules.maxLen(60)]"
              />
            </div>
          </div>
          <div class="registration-stepper__block-wrapper">
            <div class="registration-stepper__block">
              <div v-if="registrationData.organizationType === OrganizationTypes.SOLE_ENTREPRENEUR"
                   class="registration-stepper__group registration-stepper__group--rules">
                <label class="label">Наименование</label>
                <q-input
                  ref="organizationInputRef"
                  v-model="registrationData.sole_entrepreneur_name"
                  dense
                  square
                  borderless
                  bottom-slots
                  lazy-rules
                  class="input"
                  :rules="[rules.required, rules.minLen(3), rules.maxLen(60)]"
                />
              </div>
              <div class="registration-stepper__group registration-stepper__group--rules">
                <label class="label">ФИО</label>
                <q-input
                  ref="nameInputRef"
                  v-model="registrationData.user_name"
                  dense
                  square
                  borderless
                  bottom-slots
                  lazy-rules
                  class="input"
                  :rules="[rules.required, rules.minLen(3), rules.maxLen(60)]"
                />
              </div>
              <div class="registration-stepper__group registration-stepper__group--rules">
                <label class="label">Электронная почта</label>
                <q-input
                  ref="emailInputRef"
                  v-model="registrationData.email"
                  type="email"
                  dense
                  square
                  borderless
                  bottom-slots
                  lazy-rules
                  class="input"
                  :rules="[rules.required, rules.email]"
                  @keydown.space.prevent
                />
              </div>
              <div v-if="registrationData.organizationType === OrganizationTypes.LLC"
                   class="registration-stepper__group registration-stepper__group--rules">
                <label class="label">ИНН</label>
                <q-input
                  ref="innInputRef"
                  v-model="registrationData.inn"
                  type="number"
                  dense
                  square
                  borderless
                  bottom-slots
                  lazy-rules
                  class="input"
                  :rules="[rules.required, rules.inn]"
                  @keydown.space.prevent
                />
              </div>
            </div>
            <div class="registration-stepper__block">
              <div class="registration-stepper__group registration-stepper__group--rules">
                <label class="label">Телефон</label>
                <q-input
                  ref="phoneInputRef"
                  v-model="registrationData.contact"
                  dense
                  square
                  borderless
                  bottom-slots
                  lazy-rules
                  :rules="[rules.required]"
                  class="input"
                  mask="+7 (###) ### - ####"
                />
              </div>
              <div class="registration-stepper__group registration-stepper__group--rules">
                <label class="label">Пароль</label>
                <q-input
                  ref="passwordInputRef"
                  v-model="registrationData.password"
                  dense
                  square
                  borderless
                  bottom-slots
                  lazy-rules
                  type="password"
                  class="input"
                  :rules="[rules.required, rules.minLen(8)]"
                  @keydown.space.prevent
                />
              </div>
              <div class="registration-stepper__group registration-stepper__group--rules">
                <label class="label">Повторить пароль</label>
                <q-input
                  ref="confirmedPasswordInputRef"
                  v-model="registrationData.password_confirmation"
                  dense
                  square
                  borderless
                  bottom-slots
                  lazy-rules
                  type="password"
                  class="input"
                  :rules="[rules.required, rules.password, rules.minLen(8)]"
                  @keydown.space.prevent
                />
              </div>
            </div>
          </div>

        </q-step>

        <q-step
          :name="3"
          :done="step > 3"
          :disable="registrationData.userType === UserRoles.AGENCY_CLIENT"
          class="registration-stepper__step registration-stepper__step--short registration-stepper__step--big-padding"
        >
          <div class="registration-stepper__group">
            <q-radio
              v-model="registrationData.conditions"
              class="radio"
              val="offer"
              label="Готов работать по оферте">
            </q-radio>
            <q-radio
              class="radio"
              v-model="registrationData.conditions"
              val="contract"
              label="Нужен физический договор">
            </q-radio>
          </div>
        </q-step>

        <q-step
          :name="4"
          :done="step > 4"
          :disable="registrationData.userType === UserRoles.AGENCY_CLIENT || registrationData.conditions === Conditions.OFFER"
          class="registration-stepper__step registration-stepper__step--short registration-stepper__step--big-padding"
        >
          <div class="registration-stepper__group">
            <label class="label">Электронная почта</label>
            <q-input
              ref="emailContractInputRef"
              v-model="registrationData.email_for_contract"
              type="email"
              dense
              square
              borderless
              class="input"
              :rules="[rules.required, rules.email]"
              @keydown.space.prevent
            />
          </div>
        </q-step>

        <q-step
          :name="5"
          :done="step > 5"
          :disable="registrationData.conditions === Conditions.CONTRACT"
          class="registration-stepper__step registration-stepper__step--padding"
        >
          <p
            v-if="registrationData.userType === UserRoles.AGENCY"
            class="registration-stepper__text"
          >
            <a href="https://docs.google.com/document/d/19UySEsCoO5IHLrYbWPCJaBnezKXBmDSc6PUusSRazZo/edit"
              target="_blank">Оферта</a> для рекламных агентств
          </p>
          <p
            v-if="registrationData.userType === UserRoles.AGENCY"
            class="registration-stepper__text"
          >
            <a href="https://docs.google.com/document/d/1A9rhilL3w2Yw6hhg-88RYgulk7fyWeK79t-FGaEkbZs/edit"
               target="_blank">Договор</a> об оказании услуг информационного взаимодействия с ОРД
          </p>
          <p class="registration-stepper__text">
            <a href="https://docs.google.com/document/d/1q6J4pqJj6V6t0qBzcNGthO4xoYPkseox7SKdFNcGIFc/edit"
              target="_blank">Правила</a> оказания услуг для рекламных агентств
          </p>
          <div class="registration-stepper__item registration-stepper__item--checkbox">
            <q-checkbox
              v-model="registrationData.is_contract_agreed"
              class="checkbox"
              dense
              checked-icon="done"
            >
              <template #default>
                Проставление вами галочки подтверждает, что вы прочитали и полностью безоговорочно принимаете условия
                следующих документов:
                <span v-if="registrationData.userType === UserRoles.AGENCY">1) оферту для рекламных агентств,</span><span v-if="registrationData.userType === UserRoles.AGENCY">2)</span> правила оказания услуг
                для рекламных агентств <span v-if="registrationData.userType === UserRoles.AGENCY">3) договор об оказании услуг информационного взаимодействия с ОРД</span>
              </template>
            </q-checkbox>
          </div>
          <p class="registration-stepper__text">
            <a href="https://docs.google.com/document/d/1GLuPKtIPD_DJX0Qt2FyHc3p659D7JVnnioKWExqz_58/edit"
               target="_blank">Политика конфиденциальности</a>
          </p>
          <div class="registration-stepper__item registration-stepper__item--checkbox">
            <q-checkbox
              v-model="registrationData.is_privacy_policy_agreed"
              class="checkbox"
              dense
              checked-icon="done"
            >
              <template #default>
                Проставление вами галочки свидетельствует о том, что вы прочитали и полностью безоговорочно принимаете
                условия политики конфиденциальности
              </template>
            </q-checkbox>
          </div>
        </q-step>

        <q-step
          :name="6"
          class="registration-stepper__step registration-stepper__step--big-padding"
        >
          <p class="registration-stepper__text">
            Вы являетесь рекламораспространителем или оператором рекламной системы?
          </p>

          <div class="registration-stepper__btn-wrapper">
            <q-btn class="registration-stepper__main-btn main-btn main-btn--transparent"
                   @click="registrationData.is_advertising_system=false; onSubmit()">Нет
            </q-btn>
            <q-btn class="registration-stepper__main-btn main-btn main-btn--transparent"
                   @click="registrationData.is_advertising_system=true; onSubmit()">Да
            </q-btn>
          </div>
        </q-step>

        <template v-slot:navigation>
          <q-stepper-navigation
            class="registration-stepper__nav"
            :class="{'registration-stepper__nav--short': step === 1 || step === 3 || step === 4 }">
            <q-btn v-if="step > 1" class="registration-stepper__nav-btn registration-stepper__nav-btn--back" flat
                   @click="$refs.stepper.previous()" label="Назад"></q-btn>
            <q-btn v-if="step !== 6" class="registration-stepper__nav-btn" @click="toNext"
                   :label="step === 4 ? 'Запросить договор' : 'Далее'"></q-btn>
          </q-stepper-navigation>
        </template>
      </q-stepper>
    </div>
  </div>
</template>


<script lang="ts" setup>
import {ref, computed, reactive} from 'vue';
import {useAuth} from '@websanova/vue-auth';
import axios from 'axios';
import {Validate} from 'src/common/validateErrors';
import {UserRoles, OrganizationTypes, Conditions} from 'src/types/user.type';

interface RegistrationDataInterface {
  userType: number,
  organizationType: number,
  llc_name: string | null,
  sole_entrepreneur_name: string | null,
  user_name: string,
  contact: string,
  contact_type: string,
  email: string,
  password: string,
  password_confirmation: string,
  inn: string | null,
  is_contract_agreed: boolean,
  is_privacy_policy_agreed: boolean,
  email_for_contract: string | null,
  is_advertising_system: boolean,
  conditions: string,
  currency: string,
}

interface FormErrorsInterface {
  email: string;
  password: string,
  contact: string,
  inn: string,
  email_for_contract: string,
}

const ORGANIZATION_TYPES = [
  {
    id: 1,
    name: 'ООО',
  },
  {
    id: 2,
    name: 'ИП',
  },
];

const USER_TYPES = [
  {
    id: 1,
    name: 'Клиент рекламного агентства'
  },
  {
    id: 2,
    name: 'Рекламное агенство'
  },
];

const auth = useAuth();
const step = ref<number>(1);
const stepper = ref();
const processing = ref(false);

const organizationNameInputRef = ref();
const organizationInputRef = ref()
const nameInputRef = ref()
const innInputRef = ref()
const emailInputRef = ref()
const phoneInputRef = ref()
const passwordInputRef = ref();
const confirmedPasswordInputRef = ref();
const emailContractInputRef = ref();

const registrationData = reactive<RegistrationDataInterface>({
  userType: 1,
  organizationType: 1,
  llc_name: null,
  sole_entrepreneur_name: null,
  user_name: '',
  contact: '',
  contact_type: 'telephone',
  email: '',
  password: '',
  password_confirmation: '',
  inn: null,
  is_contract_agreed: true,
  is_privacy_policy_agreed: true,
  conditions: 'offer',
  email_for_contract: null,
  is_advertising_system: false,
  currency: '1',
});

const formErrors = ref<FormErrorsInterface>({
  email: '',
  password: '',
  contact: '',
  inn: '',
  email_for_contract: '',
})

async function onSubmit() {
  processing.value = true;

  await auth.register({
    data: {...registrationData},
    autoLogin: true,
    staySignedIn: true,
    fetchUser: true
  }).then(() => {
    console.log(registrationData)
    auth.ready();
  }).catch((err) => {
    processing.value = false;
    if (axios.isAxiosError(err)) {
      if (err.response?.status === 422) {
        new Validate(err.response?.data, formErrors.value)
      }
    }
  }).finally(() => {
    processing.value = false;
  })
}

const checkValidate = computed(() => (...inputs: any[]) => {
  console.log(inputs)
  return inputs.reduce((isValid = true, input) => {
    const isValidInput = input.validate();
    if (!isValidInput) isValid = isValidInput;
    return isValid;
  }, []);
});

const toNext = () => {
  switch (step.value) {
    case 2:
      if (registrationData.organizationType === OrganizationTypes.LLC &&
        checkValidate.value(organizationNameInputRef.value, nameInputRef.value, innInputRef.value, emailInputRef.value, phoneInputRef.value, passwordInputRef.value, confirmedPasswordInputRef.value)) {
        stepper.value.next();
      } else if (registrationData.organizationType === OrganizationTypes.SOLE_ENTREPRENEUR &&
        checkValidate.value(organizationInputRef.value, nameInputRef.value, emailInputRef.value, phoneInputRef.value, passwordInputRef.value, confirmedPasswordInputRef.value)) {
        stepper.value.next();
      }
      break;
    case 4:
      if (checkValidate.value(emailContractInputRef.value)) {
        stepper.value.next();
      }
      break;
    case 5:
      if (registrationData.is_contract_agreed && registrationData.is_privacy_policy_agreed) {
        stepper.value.next()
      }
      break;
    default:
      stepper.value.next()
  }
};

const rules = {
  required: (v: boolean | undefined) => !!v || 'Поле обязательно для заполнения',
  minLen: (minLen: number) => (v: string) => {
    return v.length >= minLen || `Минимум ${minLen} символов`;
  },
  maxLen: (maxLen: number) => (v: string) => {
    return v.length <= maxLen || `Максимум ${maxLen} символов`;
  },
  inn: (v: string) => {
    const innPattern = /^[\d+]{10,12}$/;
    return innPattern.test(v) || 'Неверный формат ИНН';
  },
  email: (v: string) => {
    const emailPattern = /.+@.+\..+$/;
    return emailPattern.test(v) || 'Неверный формат email';
  },
  password: (v: string) => {
    return v === registrationData.password || 'Пароли не совпадают';
  }
};
</script>
