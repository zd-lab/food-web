<script setup>
import { computed, ref } from 'vue'
import { categories, dishes } from '../menu.js'

const selectedCategory = ref('all')
const visibleDishes = computed(() => dishes.filter(dish => selectedCategory.value === 'all' || dish.category === selectedCategory.value))
function filterMenu(category) {
  if (!categories.some(item => item.id === category)) throw new Error('不支持的菜品分类')
  selectedCategory.value = category
  return { category, dishes: visibleDishes.value.map(dish => dish.name) }
}
defineExpose({ filterMenu })
</script>

<template>
<section class="menu-section wrap" id="menu"><div class="section-heading"><div><div class="eyebrow">为你认真准备 · FROM OUR KITCHEN</div><h2>饭菜上桌，慢慢吃</h2><p>为你留一份清淡，也留一份用心。坐下来，尝尝食材本来的鲜甜。</p></div><div class="menu-tabs" role="group" aria-label="菜品分类"><button v-for="category in categories" :key="category.id" :class="{ selected: selectedCategory === category.id }" :data-category="category.id" :aria-pressed="selectedCategory === category.id" @click="filterMenu(category.id)">{{ category.label }}</button></div></div><div class="dishes"><article v-for="dish in visibleDishes" :key="dish.id" class="dish" :data-kind="dish.category"><div class="dish-picture"><img :src="dish.image" :alt="dish.alt" :class="{ 'steak-photo': dish.id === 'steak' }" loading="lazy"><span class="dish-tag">{{ dish.tag }}</span></div><div class="dish-title"><h3>{{ dish.name }}</h3><span>¥ {{ dish.price }}</span></div><p>{{ dish.description }}</p><div class="dish-meta">{{ dish.details }}</div></article></div><p class="menu-footnote">这一餐，我们做得清淡些。想添点滋味，告诉我们就好。<span>有过敏或忌口，请在点餐前告诉我们，我们会用心留意。</span></p></section>
</template>
