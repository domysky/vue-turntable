# vue-turntable


## 项目说明 

```js
npm install
npm run dev
```
根据后台返回的奖品数据绘制画布，实现可定制化转盘


参考自:https://github.com/Venler/vue-lottery
## 以下已引入项目中 无需再引入

> 使用组件vue-lottery说明 

```js
npm install vue-lottery --save
```

```
import lottery from 'vue-lottery'
Vue.use(lottery)
```

> 调用示例

```
<lottery
    @lotteryClick="lotteryClick"
    @lotteryDone="lotteryDone"
    :lottery-start="0"
    :lottery-prizenum="8"
    :lottery-prizeno="1"
    lottery-bg="https://venler.github.io/demo/vue-lottery/dist/turnplate-bg.png"
    content-bg="https://venler.github.io/demo/vue-lottery/dist/turntable.png"
    pointer-bg="https://venler.github.io/demo/vue-lottery/dist/pointer.png"
    :lottery-width="['85%','35%']"
/>
```

> props说明

| 参数名 | 参数类型 | 解释 | 是否必传 |
| :--- | :--- | :--- | :--- |
| lottery-prizenum | Number | 奖品总数量 | 是 |
| lottery-prizeno | Number | 从起点开始逆时针算，中奖的是第几个 | 是 |
| lottery-bg | String | 背景图 | 否 |
| content-bg | String | 内容区域背景图 | 是 |
| pointer-bg | String | 指针背景图 | 是 |
| lottery-start | Number | 0为停止，1为开始转动 | 否 |
| lotteryDone | Function | 旋转完成后的回调函数 | 否 |
| lotteryClick | Function | 点击抽奖按钮的回调 | 否 |
| lottery-width | String | 内外圈间距百分比 | 否 |



