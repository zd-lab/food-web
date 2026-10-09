import heroImage from './assets/hero.jpg'
import pastaImage from './assets/pasta.jpg'
import saladImage from './assets/salad.jpg'

export const categories = [
  { id: 'all', label: '全部菜品' },
  { id: 'main', label: '招牌主菜' },
  { id: 'light', label: '清爽轻食' },
]

export const dishes = [
  {
    "id": "steak",
    "category": "main",
    "image": heroImage,
    "alt": "香煎牛排搭配时令蔬菜",
    "tag": "主厨推荐",
    "name": "香煎牛排 · 时蔬",
    "price": 128,
    "description": "原味煎好的牛排，配上清蒸时蔬，热热地端到你面前。不额外加盐，也不淋酱汁。",
    "details": "原味牛排 / 清蒸时蔬 / 不加酱汁"
  },
  {
    "id": "pasta",
    "category": "main",
    "image": pastaImage,
    "alt": "手作意大利面",
    "tag": "人气之选",
    "name": "主厨手作意面",
    "price": 68,
    "description": "鲜番茄轻轻煮软，陪一盘热乎的意面。不额外加盐、油或干酪，吃着清淡、舒心。",
    "details": "意大利面 / 清煮鲜番茄 / 不加干酪"
  },
  {
    "id": "salad",
    "category": "light",
    "image": saladImage,
    "alt": "色彩丰富的新鲜蔬菜沙拉",
    "tag": "清新轻盈",
    "name": "田园时蔬沙拉",
    "price": 48,
    "description": "把脆嫩生菜和当季蔬果装进一盘小清新。不加盐、油或沙拉汁，慢慢尝那一口鲜甜。",
    "details": "混合生菜 / 当季蔬果 / 不加沙拉汁"
  }
]
