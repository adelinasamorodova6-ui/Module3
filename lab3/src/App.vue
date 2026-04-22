<template>
  <div class="container">
    <h1>Регистрация пользователя</h1>
    
    <div v-if="showSuccess" class="success-message">
      ✅ Регистрация успешно завершена!
    </div>
    
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label>Имя</label>
        <input 
          :value="name" 
          @input="name = $event.target.value"
          type="text"
          placeholder="Введите имя"
        />
      </div>

      <div class="form-group">
        <label>Фамилия</label>
        <input 
          :value="surname" 
          @input="surname = $event.target.value"
          type="text"
          placeholder="Введите фамилию"
        />
      </div>

      <div class="form-group">
        <label>Пол</label>
        <div class="gender-group">
          <label>
            <input 
              type="radio" 
              value="male"
              :checked="gender === 'male'"
              @change="gender = $event.target.value"
            />
            Мужской
          </label>
          <label>
            <input 
              type="radio" 
              value="female"
              :checked="gender === 'female'"
              @change="gender = $event.target.value"
            />
            Женский
          </label>
        </div>
      </div>

      <div class="form-group">
        <label>Пароль</label>
        <div class="password-wrapper">
          <input 
            :type="showPassword ? 'text' : 'password'"
            :value="password" 
            @input="password = $event.target.value"
            placeholder="Введите пароль"
          />
          <button 
            type="button"
            @mousedown="showPassword = true"
            @mouseup="showPassword = false"
            @mouseleave="showPassword = false"
            class="show-password-btn"
          >
            Показать пароль
          </button>
        </div>
      </div>

      <div class="form-group">
        <label>Подтверждение пароля</label>
        <input 
          :type="showPassword ? 'text' : 'password'"
          :value="confirmPassword" 
          @input="confirmPassword = $event.target.value"
          placeholder="Подтвердите пароль"
        />
      </div>

      <div class="info-box">
        <p>
          Пользователь: {{ name }} {{ surname }}. 
          {{ gender === 'male' ? 'Мужского пола' : gender === 'female' ? 'Женского пола' : 'Пол не указан' }}
        </p>
      </div>

      <button 
        :disabled="password !== confirmPassword || !password || !confirmPassword"
        class="register-btn"
      >
        Зарегистрироваться
      </button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const name = ref('')
    const surname = ref('')
    const gender = ref('')
    const password = ref('')
    const confirmPassword = ref('')
    const showPassword = ref(false)
    const showSuccess = ref(false)

    const handleSubmit = () => {
      if (password.value === confirmPassword.value && password.value) {
        console.log(name.value, surname.value, gender.value, password.value)
        showSuccess.value = true
        setTimeout(() => {
          showSuccess.value = false
        }, 3000)
      }
    }

    return {
      name,
      surname,
      gender,
      password,
      confirmPassword,
      showPassword,
      showSuccess,
      handleSubmit
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 500px;
  margin: 50px auto;
  padding: 30px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.2);
}

h1 {
  text-align: center;
  color: white;
  margin-bottom: 30px;
  font-size: 28px;
}

.success-message {
  background: #4CAF50;
  color: white;
  padding: 12px;
  border-radius: 10px;
  margin-bottom: 20px;
  text-align: center;
  font-weight: bold;
  animation: slideDown 0.3s ease;
}

@keyframes slideDown {
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  color: white;
  font-weight: bold;
}

input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 12px 15px;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  box-sizing: border-box;
}

input[type="text"]:focus,
input[type="password"]:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(255,255,255,0.3);
}

.gender-group {
  display: flex;
  gap: 20px;
  background: rgba(255,255,255,0.2);
  padding: 10px 15px;
  border-radius: 10px;
}

.gender-group label {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 0;
  cursor: pointer;
}

.gender-group input {
  width: auto;
  cursor: pointer;
}

.password-wrapper {
  position: relative;
  display: flex;
  gap: 10px;
}

.password-wrapper input {
  flex: 1;
}

.show-password-btn {
  padding: 0 15px;
  background: rgba(255,255,255,0.2);
  border: none;
  border-radius: 10px;
  color: white;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.1s ease;
}

.show-password-btn:active {
  background: rgba(255,255,255,0.4);
  transform: scale(0.95);
}

.info-box {
  background: rgba(255,255,255,0.2);
  padding: 15px;
  border-radius: 10px;
  margin: 20px 0;
}

.info-box p {
  margin: 0;
  color: white;
  font-size: 16px;
}

.register-btn {
  width: 100%;
  padding: 14px;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;
}

.register-btn:hover:not(:disabled) {
  background: #45a049;
  transform: translateY(-2px);
}

.register-btn:disabled {
  background: #cccccc;
  cursor: not-allowed;
  opacity: 0.6;
}
</style>