<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import SiteHeader from './components/SiteHeader.vue'
import SeasonalMenu from './components/SeasonalMenu.vue'
import ReservationDialog from './components/ReservationDialog.vue'
import heroImage from './assets/hero.jpg'
import { registerPageTools } from './webmcp.js'

const menu = ref(null)
const reservation = ref(null)
const year = new Date().getFullYear()
const openReservation = () => reservation.value.open()
let cleanupTools = () => {}
onMounted(() => {
  cleanupTools = registerPageTools(document.modelContext, {
    filterMenu: category => menu.value.filterMenu(category),
    openReservation,
  })
})
onBeforeUnmount(() => cleanupTools())
</script>

<template>

  <SiteHeader @reserve="openReservation" />
  <main>
    <section class="hero wrap" id="home"><div class="hero-copy"><div class="eyebrow"><span></span> FRESH INGREDIENTS. SLOW MOMENTS.</div><h1>推荐</h1><p class="hero-description">从田野到餐桌，从当季到当下。<br>我们把对生活的热爱，认真做进每一道菜里。</p><div class="hero-actions"><a class="button" href="#menu">探索时令菜单</a><button class="text-button" @click="openReservation"><span class="small-icon">▦</span> 预约美好一餐</button></div><div class="hero-note"><span class="leaf-icon">❧</span><span>顺时而食 · 新鲜手作 · 好好吃饭</span></div></div><div class="hero-art"><img class="hero-photo" :src="heroImage" alt="精心摆盘的当季餐食" fetchpriority="high"><div class="image-shade"></div><div class="photo-caption"><span>THE JOY OF A GOOD MEAL</span><strong>一餐一饭，皆是好时光。</strong></div><div class="season-stamp"><span>当季好食</span><strong>秋</strong><span>SEASONAL SELECTION</span></div><span class="photo-index">01 / THE TABLE</span></div></section>
    <div class="values"><div class="wrap values-inner"><span>把平凡的一餐，吃得有滋有味。</span><div><span>✳ 当季食材</span><span>♧ 每日鲜制</span><span>♡ 用心款待</span></div></div></div>
    <SeasonalMenu ref="menu" />
    <section class="story" id="story"><div class="wrap story-inner"><div class="story-title"><div class="eyebrow">OUR PHILOSOPHY</div><h2>在禾间，<br>吃饭也是生活。</h2></div><div class="story-copy"><p>我们相信，令人惦记的味道，往往来自简单的食材和不敷衍的用心。</p><p>禾间是一张为你留着的餐桌。午后的独处、朋友的相聚，或是下班后的一顿热饭，都值得被认真对待。不必匆忙，坐下来，尝尝这个季节。</p><span class="signature">好好做饭，好好相见。<b>禾间</b></span></div></div></section>
    <section class="visit wrap" id="visit"><div><div class="eyebrow">THERE'S A SEAT FOR YOU</div><h2>把下一次相聚，<br>留给禾间。</h2><p>有好吃的，也有刚刚好的自在。</p><button class="button" @click="openReservation">预订一张桌</button></div><div class="visit-info"><div><span>营业时间</span><p>周一至周日</p><strong>11:00–14:30 <i>/</i> 17:00–21:30</strong></div><div><span>用餐方式</span><p>堂食 · 朋友小聚 · 日常约会</p><small>我们建议提前预约，让相聚更从容。</small></div></div><div class="visit-mark" aria-hidden="true">禾<br>间</div></section>
  </main>
  <footer><div class="wrap footer-inner"><a class="brand" href="#home"><span class="brand-cn">禾间</span><span class="brand-en">GOOD FOOD. GOOD MOMENTS.</span></a><p>© <span id="year">{{ year }}</span> 禾间 HEJIAN <span>一餐一饭，用心相待。</span></p><a href="#home">回到顶部 ↑</a></div></footer>
    <ReservationDialog ref="reservation" />
</template>
