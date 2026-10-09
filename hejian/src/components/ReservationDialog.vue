<script setup>
import { reactive, ref, onBeforeUnmount } from 'vue'

const dialog = ref(null)
const form = ref(null)
const nameInput = ref(null)
const minimumDate = ref(localDate())
const fields = reactive({ date: '', time: '11:30', guests: '2 位', name: '' })
const result = ref('')
const times = ['11:30', '12:00', '13:00', '17:30', '18:00', '18:30', '19:00', '20:00']
const guests = ['2 位', '1 位', '3 位', '4 位', '5 位', '6 位']

function localDate() {
  const today = new Date()
  return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`
}
function open() {
  minimumDate.value = localDate()
  if (!fields.date || fields.date < minimumDate.value) fields.date = minimumDate.value
  result.value = ''
  if (!dialog.value.open) dialog.value.showModal()
  document.body.classList.add('modal-open')
  return { opened: true, status: 'draft_only' }
}
function unlockScroll() {
  document.body.classList.remove('modal-open')
}
function close() {
  dialog.value.close()
  unlockScroll()
}
function closeOnBackdrop(event) {
  if (event.target !== dialog.value) return
  const rect = dialog.value.getBoundingClientRect()
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) close()
}
function submit() {
  minimumDate.value = localDate()
  // Update the native constraint immediately, including across midnight.
  form.value.elements.date.min = minimumDate.value
  nameInput.value.setCustomValidity(fields.name.trim() ? '' : '请填写你的称呼')
  if (!form.value.reportValidity()) return
  result.value = `${fields.name.trim()}，你的预约信息已整理：\n${fields.date} ${fields.time} · ${fields.guests}\n这是一份预约草稿，尚未发送或确认。`
}
onBeforeUnmount(() => {
  if (dialog.value?.open) dialog.value.close()
  unlockScroll()
})
defineExpose({ open })
</script>

<template>
  <dialog id="reservation" ref="dialog" aria-labelledby="reservation-title" @close="unlockScroll" @click="closeOnBackdrop">
    <form id="reservation-form" ref="form" @submit.prevent="submit">
      <button class="dialog-close" type="button" aria-label="关闭预约窗口" @click="close">×</button>
      <div class="eyebrow">A MOMENT TOGETHER</div>
      <h2 id="reservation-title">留一张桌，给好时光。</h2>
      <p class="dialog-intro">选择相聚的时间，生成你的预约信息。<br>当前为预约演示，不会发送至餐馆。</p>
      <div class="form-grid">
        <label>用餐日期<input v-model="fields.date" type="date" name="date" :min="minimumDate" required></label>
        <label>到店时间<select v-model="fields.time" name="time"><option v-for="time in times" :key="time">{{ time }}</option></select></label>
        <label>用餐人数<select v-model="fields.guests" name="guests"><option v-for="count in guests" :key="count">{{ count }}</option></select></label>
        <label>称呼<input ref="nameInput" v-model="fields.name" name="name" maxlength="30" placeholder="怎么称呼你" required autocomplete="name" @input="nameInput.setCustomValidity('')"></label>
      </div>
      <button class="button form-submit" type="submit">生成预约信息</button>
      <div id="reservation-result" role="status" :hidden="!result">{{ result }}</div>
    </form>
  </dialog>
</template>
