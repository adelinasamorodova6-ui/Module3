<script setup>
import { computed, ref } from 'vue'

const props = defineProps(['name'])
const emit = defineEmits(['color-changed'])

const colors = ['#3498db', '#e74c3c', '#2ecc71', '#9b59b6', '#f39c12', '#bc1a83', '#e67e22', '#34495e']
const index = ref(0)

const initials = computed(() => {
  const nameParts = props.name.split(' ')
  if (nameParts.length === 1) {
    return nameParts[0].charAt(0).toUpperCase()
  }
  return (nameParts[0].charAt(0) + nameParts[nameParts.length - 1].charAt(0)).toUpperCase()
})

function changeColor() {
  index.value = (index.value + 1) % colors.length
  emit('color-changed', colors[index.value])
}
</script>

<template>
  <div class="avatar-container">
    <div class="circle" :style="{ backgroundColor: colors[index] }">
      {{ initials }}
    </div>
    <button @click="changeColor" class="color-btn">Сменить цвет</button>
  </div>
</template>

<style scoped>
.avatar-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.circle {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 32px;
  font-weight: bold;
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
  transition: all 0.3s ease;
}

.circle:hover {
  transform: scale(1.05);
}

.color-btn {
  padding: 8px 20px;
  background: #f0f0f0;
  border: none;
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.color-btn:hover {
  background: #e0e0e0;
  transform: translateY(-1px);
}
</style>