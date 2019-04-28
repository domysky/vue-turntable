<template>
  <div class="wrap bg-white flex-column ">
    <!-- <mu-infinite-scroll  :loading="loading" loadingText="" class="load maskloading" v-if="loading"/> -->
    <div class="wraper  flex-item " :style="{backgroundImage:'url('+require('@/assets/images/bg-image.png')+')'}">
      <div class="content">
        <lottery
          @lotteryClick="lotteryClick"
          @lotteryDone="lotteryDone"
          :lottery-start="lotteryStart"
          :lottery-prizenum="9"
          :lottery-prizeno="prizeNo"
          :lottery-bg="require('@/assets/images/turnplate-bg.png')"
          :content-bg="turntableImg"
          :pointer-bg="require('@/assets/images/pointer.png')"
          :lottery-width="['85%','30%']"
        />
      </div>
    </div>

    <canvas id="wheelCanvas" width="680" height="680" style="border:1px solid #c3c3c3;" v-show="false">
      您的浏览器不支持 HTML5 canvas 标签。
    </canvas>

    <!-- 遮罩层 -->
    <div class="mask-box" v-if="openMask" @click="openMask=false">
      <div class="bg-white content">
        <img :src="require('@/assets/images/task_draw_reward_gereward_img.png')">
        <div class="font28" v-if='prize.isPrize'>恭喜您获得<span class="red">{{prize.name}}</span></div>
        <div class="font28" v-else>好遗憾！<span class="red">{{prize.name}}</span></div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">



  export default{
    data(){
      return {
        lotteryStart: 0,
        prizeNo: 1,
        prizeList: [{
          id:1,name:'1元红包',isPrize:true,img:require('@/assets/images/pointer.png')},{
          id:2,name:'5元红包',isPrize:true,img:require('@/assets/images/pointer.png')},{
          id:3,name:'谢谢参与',isPrize:false,img:''},{
          id:4,name:'1元红包',isPrize:true,img:require('@/assets/images/pointer.png')},{
          id:5,name:'10元红包',isPrize:true,img:require('@/assets/images/pointer.png')},{
          id:6,name:'5元红包',isPrize:true,img:require('@/assets/images/pointer.png')},{
          id:7,name:'1元红包',isPrize:true,img:require('@/assets/images/pointer.png')},{
          id:8,name:'谢谢参与',isPrize:false,img:''},{
          id:9,name:'1元红包',isPrize:true,img:require('@/assets/images/pointer.png')},
        ],
        colors: ["#f9d725","#f6ab20","#fc9714" ],
        
        outsideRadius: 330, //转盘外圆的半径
        textRadius: 360, //转盘奖品位置距离圆心的距离
        insideRadius: 0, //转盘内圆的半径
        startAngle: 0, //开始角度
        
        openMask: false,
        prize:'',//奖品

        turntableImg:'',//生成的转盘图片
        total:3,//总次数
        use:0,//使用次数
      }
    },
    created(){
      
    },
    mounted() {
      this.initCanvas()
       
    },
    watch:{
     
    },
    computed:{
       
    },
    methods:{
     
      // 初始化画布  生成奖品图
      initCanvas() {
        var canvas = document.getElementById("wheelCanvas");
        var baseAngle = Math.PI * 2 / (this.prizeList.length);
        this.startAngle = - Math.PI * 2 / 4 - baseAngle;//画布开始渲染是在90度位置，故需将开始位置定位0度
        var ctx = canvas.getContext("2d");
        var canvasW = canvas.width; // 画板的高度
        var canvasH = canvas.height; // 画板的宽度
        ctx.fillStyle = "#fff000";
        ctx.clearRect(0,0,canvasW,canvasH);//去掉背景默认的黑色
        ctx.strokeStyle = "rgba(0,0,0,0)"; //线的颜色
        ctx.font = '28px bold Microsoft YaHei';
        //ctx.closePath();
        //使用了beginPath(),canvas会知道是重新画一条，如果给这几条设置不同的属性也是可以的。
        for(var index = 0; index < this.prizeList.length; index++) {
            var angle = this.startAngle - index * baseAngle;
            // 避免随机产生的颜色色差较大，故配置三个颜色  实现颜色循环 
            let color = index % 3 ? (index % 3 == 1 ? this.colors[1]:this.colors[2]) : this.colors[0] ;
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(canvasW * 0.5, canvasH * 0.5, this.outsideRadius, angle, angle + baseAngle, false);
            ctx.arc(canvasW * 0.5, canvasH * 0.5, this.insideRadius, angle + baseAngle, angle, true);
            ctx.stroke();
            ctx.fill();
            ctx.save();
            ctx.fillStyle = "#853601";
            var rewardName = this.prizeList[index].name;

            var line_height = 24;
            var translateX = canvasW * 0.5 + Math.cos(angle + baseAngle / 2) * this.textRadius;
            var translateY = canvasH * 0.5 + Math.sin(angle + baseAngle / 2) * this.textRadius;
            ctx.translate(translateX, translateY);
            ctx.rotate(angle + baseAngle / 2 + Math.PI / 2);
            //ctx.drawImage(imgUrl1, -15, 10);
            ctx.fillText(rewardName, -ctx.measureText(rewardName).width / 2, 100);
            //添加对应图标
            let imgUrl = new Image();
            imgUrl.src = this.prizeList[index].img;
            ctx.drawImage(imgUrl,-35,120,60,60);
           
            ctx.restore(); //很关键

            this.turntableImg = canvas.toDataURL();
        }
      },
      lotteryClick () {
            this.lotteryStart = 1
            let randomNum = 1 + parseInt(Math.random() * this.prizeList.length)
            this.prizeNo = randomNum
            console.log(randomNum)
      },
      lotteryDone (res) {
          this.lotteryStart = 0
          let index = res.prizeNo - 1
          this.openMask = true
          this.prize = this.prizeList[index]

          console.log(this.prizeList[index])
      },


      
    },
    components: {
     
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
*{
  padding: 0;
  margin: 0
}
.wraper{
    background-repeat: no-repeat;
    background-size: cover;
    
    .content{
      padding: 30px;
      .lottery_wraper{
          width:100%;
          max-width: 100% !important;
      }
      .lottery_bg{
        animation:anticlockwise 10s linear infinite;
      }
      @keyframes anticlockwise{
        from{transform:rotate(0)}
        to{transform:rotate(-360deg)}  
      }
      #lottery_turntable{
        animation:clockwise 12s linear infinite;
      }
      @keyframes clockwise{
        from{transform:rotate(0)}
        to{transform:rotate(360deg)}  
      }
      
    }
    
}
.mask-box {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background:  rgba(0, 0, 0, 0.5);
    background-size: cover;
    z-index: 999;

    .content {
      width: 60%;
      border-radius: 20px;
      overflow: hidden;
      position: absolute;
      max-width: 85%;
      top: 50%;
      left: 50%;
      transform: translate3d(-50%, -50%, 0);
      text-align: center;
      padding: 30px;
      img{
        width: 150px;
        margin-bottom:30px;
      }
    }
}
</style>


