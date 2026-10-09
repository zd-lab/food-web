<script setup>
import { ref } from 'vue'

defineEmits(['reserve'])
const expanded = ref(false)
const active = ref('#home')
const links = [
  { href: '#home', label: '首页' },
  { href: '#menu', label: '时令菜单' },
  { href: '#story', label: '关于禾间' },
  { href: '#visit', label: '来坐坐' },
]
function navigate(href) {
  active.value = href
  expanded.value = false
}
</script>

<template>
  <header class="header">
    <a class="brand" href="#home" aria-label="禾间首页"><span class="brand-cn">禾间<span class="brand-dot">○</span></span><span class="brand-en">HEJIAN · SEASONAL TABLE</span></a>
    <nav aria-label="主导航" :class="{ open: expanded }">
      <a v-for="link in links" :key="link.href" :href="link.href" :class="{ active: active === link.href }" @click="navigate(link.href)">{{ link.label }}</a>
    </nav>
    <button class="button nav-book" @click="$emit('reserve')">预订一张桌</button>
    <button class="mobile-toggle" :aria-label="expanded ? '收起导航' : '展开导航'" :aria-expanded="expanded" @click="expanded = !expanded">☰</button>
  </header>
</template>
