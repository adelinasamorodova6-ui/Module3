<script setup>
import { ref } from 'vue'

const props = defineProps({
  name: String
})

const emit = defineEmits(['name-changed'])

const editing = ref(false)
const inputName = ref('')

function startEdit() {
  inputName.value = props.name
  editing.value = true
}

function save() {
  if (inputName.value.trim()) {
    emit('name-changed', inputName.value.trim())
  }
  editing.value = false
}

function cancel() {
  editing.value = false
}
</script>

<template>
  <div class="card-container">
    <div v-if="!editing" class="display-mode">
      <h2 class="user-name">{{ name }}</h2>
      <button @click="startEdit" class="edit-btn">Редактировать</button>
    </div>
    
    <div v-else class="edit-mode">
      <input 
        v-model="inputName" 
        type="text"
        class="name-input"
        @keyup.enter="save"
        placeholder="Введите имя"
      />
      <div class="edit-buttons">
        <button @click="save" class="save-btn">✓ Сохранить</button>
        <button @click="cancel" class="cancel-btn">✗ Отмена</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-container {
  background: white;
  border-radius: 16px;
  padding: 20px 30px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  min-width: 250px;
  text-align: center;
}

.display-mode {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.user-name {
  margin: 0;
  color: #333;
  font-size: 24px;
}

.edit-btn {
  padding: 8px 20px;
  background: #66ea7e;
  color: white;
  border: none;
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.edit-btn:hover {
  background: #5a67d8;
  transform: translateY(-1px);
}

.edit-mode {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.name-input {
  padding: 10px 15px;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  font-size: 16px;
  text-align: center;
  transition: border-color 0.3s;
}

.name-input:focus {
  outline: none;
  border-color: #73ea66;
}

.edit-buttons {
  display: flex;
  gap: 10px;
  justify-content: center;
}

.save-btn {
  padding: 6px 16px;
  background: #2ecc71;
  color: white;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.save-btn:hover {
  background: #27ae60;
}

.cancel-btn {
  padding: 6px 16px;
  background: #e74c3c;
  color: white;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.cancel-btn:hover {
  background: #c0392b;
}
</style>