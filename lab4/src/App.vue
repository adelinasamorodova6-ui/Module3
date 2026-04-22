<template>
  <div class="container">
    <h1>Семейный бюджет</h1>
    
    <div class="balance-card">
      <h2>Текущий баланс</h2>
      <div class="balance-amount" :class="{'positive': totalBalance >= 0, 'negative': totalBalance < 0}">
        {{ totalBalance }} ₽
      </div>
    </div>

    <div class="add-form">
      <h3>Добавить операцию</h3>
      <div class="form-group">
        <input 
          v-model.trim="title"
          type="text"
          placeholder="Название операции"
          class="form-input"
        />
      </div>
      <div class="form-group">
        <input 
          v-model.number="amount"
          type="number"
          placeholder="Сумма (+ доход, - расход)"
          class="form-input"
        />
      </div>
      <button 
        @click="addTransaction"
        :disabled="!title || !amount"
        class="add-btn"
      >
        Добавить
      </button>
    </div>

    <div class="history-section">
      <h3>История операций</h3>
      
      <div v-if="history.length === 0" class="empty-history">
        Вы не совершали финансовых операций
      </div>
      
      <ul v-else class="history-list">
        <li 
          v-for="item in history" 
          :key="item.id"
          class="history-item"
          :class="{'income': item.amount > 0, 'expense': item.amount < 0}"
        >
          <span class="item-text">{{ item.text }}</span>
          <span class="item-amount">
            {{ item.amount > 0 ? '+' : '' }}{{ item.amount }} ₽
          </span>
          <button 
            @click="deleteTransaction(item.id)"
            class="delete-btn"
            title="Удалить"
          >
            ❌
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'

export default {
  setup() {
    const history = ref([])
    const title = ref('')
    const amount = ref('')

    const totalBalance = computed(() => {
      return history.value.reduce((sum, item) => sum + item.amount, 0)
    })

    const addTransaction = () => {
      if (!title.value || !amount.value) return
      
      const newTransaction = {
        text: title.value,
        amount: Number(amount.value),
        id: Date.now()
      }
      
      history.value.push(newTransaction)
      
      title.value = ''
      amount.value = ''
    }

    const deleteTransaction = (id) => {
      const index = history.value.findIndex(item => item.id === id)
      if (index !== -1) {
        history.value.splice(index, 1)
      }
    }

    return {
      history,
      title,
      amount,
      totalBalance,
      addTransaction,
      deleteTransaction
    }
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.container {
  max-width: 800px;
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
  font-size: 32px;
}

h2 {
  color: white;
  font-size: 20px;
  margin-bottom: 10px;
}

h3 {
  color: white;
  margin-bottom: 20px;
  font-size: 22px;
}

.balance-card {
  background: rgba(255,255,255,0.2);
  padding: 20px;
  border-radius: 15px;
  text-align: center;
  margin-bottom: 30px;
}

.balance-amount {
  font-size: 48px;
  font-weight: bold;
  margin-top: 10px;
}

.balance-amount.positive {
  color: #0ce914;
}

.balance-amount.negative {
  color: #ff6b6b;
}

.add-form {
  background: rgba(255,255,255,0.15);
  padding: 20px;
  border-radius: 15px;
  margin-bottom: 30px;
}

.form-group {
  margin-bottom: 15px;
}

.form-input {
  width: 100%;
  padding: 12px 15px;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  box-sizing: border-box;
}

.form-input:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(255,255,255,0.3);
}

.add-btn {
  width: 100%;
  padding: 12px;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;
}

.add-btn:hover:not(:disabled) {
  background: #45a049;
  transform: translateY(-2px);
}

.add-btn:disabled {
  background: #cccccc;
  cursor: not-allowed;
  opacity: 0.6;
}

.history-section {
  background: rgba(255,255,255,0.15);
  padding: 20px;
  border-radius: 15px;
}

.empty-history {
  text-align: center;
  padding: 40px;
  color: white;
  font-size: 18px;
  font-style: italic;
  background: rgba(0,0,0,0.2);
  border-radius: 10px;
}

.history-list {
  list-style: none;
  max-height: 400px;
  overflow-y: auto;
}

.history-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 15px;
  margin-bottom: 10px;
  background: white;
  border-radius: 10px;
  transition: all 0.2s ease;
}

.history-item:hover {
  transform: translateX(5px);
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.history-item.income {
  border-left: 5px solid #4CAF50;
}

.history-item.expense {
  border-left: 5px solid #ff6b6b;
}

.item-text {
  font-size: 16px;
  color: #333;
  flex: 1;
}

.item-amount {
  font-size: 18px;
  font-weight: bold;
  margin: 0 15px;
}

.history-item.income .item-amount {
  color: #4CAF50;
}

.history-item.expense .item-amount {
  color: #ff6b6b;
}

.delete-btn {
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  padding: 5px 8px;
  border-radius: 8px;
  transition: all 0.1s ease;
}

.delete-btn:hover {
  background: #ff6b6b;
  transform: scale(1.1);
}

.history-list::-webkit-scrollbar {
  width: 8px;
}

.history-list::-webkit-scrollbar-track {
  background: rgba(255,255,255,0.2);
  border-radius: 10px;
}

.history-list::-webkit-scrollbar-thumb {
  background: rgba(255,255,255,0.5);
  border-radius: 10px;
}

@media (max-width: 600px) {
  .container {
    margin: 20px;
    padding: 20px;
  }
  
  .balance-amount {
    font-size: 36px;
  }
  
  .item-amount {
    font-size: 14px;
    margin: 0 8px;
  }
  
  .item-text {
    font-size: 14px;
  }
}
</style>