<script setup>
import { ref } from 'vue'
import UserAvatar from './components/UserAvatar.vue'
import UserCard from './components/UserCard.vue'

const name = ref('Сергей Челищев')
const currentColor = ref('#d84a23')

function handleColorChange(color) {
  currentColor.value = color
}
</script>

<template>
  <div class="app">
    <div class="profile-container">
      <h1>Профиль пользователя</h1>
      
      <div class="profile-card">
        <UserAvatar 
          :name="name" 
          @color-changed="handleColorChange"
        />
        <UserCard 
          :name="name" 
          @name-changed="name = $event"
        />
      </div>
      
    </div>
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
  background: linear-gradient(135deg, #66ea6f 0%, #4ba27c 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.profile-container {
  text-align: center;
  padding: 40px;
}

h1 {
  color: white;
  margin-bottom: 30px;
  font-size: 2rem;
}

.profile-card {
  background: rgba(255,255,255,0.95);
  border-radius: 30px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.2);
  min-width: 320px;
}

.info-note {
  margin-top: 30px;
  background: rgba(255,255,255,0.2);
  padding: 15px 25px;
  border-radius: 15px;
  color: white;
  font-size: 14px;
}

.info-note p {
  margin: 5px 0;
}
</style>