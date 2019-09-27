Page({
  data: {
    dishes: [],
    prices: {
      '板烧鸡腿堡': 28,
      '薯条': 5,
      '可乐': 8,
      '麦旋风': 12.5
    }
  },
  
  order(dish, amount) {
    amount = +amount;
    const price = this.data.prices[dish];
    if (!price) {
      return my.tg.playTTS({ text: '抱歉，本店暂时没有' + dish + '哦。请问还有其他需要吗？', openMic: true });
    }
    const dishes = JSON.parse(JSON.stringify(this.data.dishes));
    const existingDishIndex = dishes.findIndex(o => o.name === dish);
    if (existingDishIndex > 0) {
      const existingDish = dishes[existingDishIndex];
      existingDish.amount = existingDish.amount + amount;
      existingDish.totalCost = existingDish.totalCost + amount * price;
      dishes.splice(existingDishIndex, 1);
      dishes.unshift(existingDish);
    } else {
      dishes.unshift({ name: dish, amount, totalCost: price * amount })
    }
    this.setData({ dishes });
    my.tg.playTTS({ text: '请问还有其他需要吗？', openMic: true })
    this.setData({ previousIntent: 'order' })
  }
});