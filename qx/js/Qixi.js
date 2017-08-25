/**
 * 灯动画
 **/
var lamp={
	elem:$(".b_background"),
	bright:function(){
		this.elem.addClass("lamp-bright")
	},
	dark:function(){
		this.elem.removeClass("lamp-bright")
	}
}
var container = $("#content");
var swipe = Swipe(container);
var visualWidth = container.width();
var visualHeight=container.height();
// 页面滚动到指定的位置
function scrollTo(time, proportionX) {
    var distX = container.width() * proportionX;
    swipe.scrollTo(distX, time);
}
//获取数据
var getValue=function(className){
	var $elem=$(""+className+"");
	//走路胡路线坐标
    	return{
    		height:$elem.height(),
    		top:$elem.position().top
    	}
    }

   //桥的Y轴
   var bridgeY=function(){
   	   var data=getValue(".c_background_middle");
   	   return data.top;
   }();
/**
 * 小女孩
 * **/

var girl={
   	elem:$(".girl"),
	getHeight:function(){
		return this.elem.height()
	},
	//转身动作
	rotate:function(){
	   this.elem.addClass("girl-rotate");
   	},
   	setPosition:function(){
   		this.elem.css({
   			left:visualWidth/2,
   			top:bridgeY-this.getHeight()
   		})
   	},
   	getPosition: function() {
            return this.elem.position();
    },
   	getWidth:function(){
   		return this.elem.width();
   	},

}
    
    //修正小女孩的位置
 girl.setPosition();
   
/////////
//右边飞鸟 //
/////////
var bird = {
    elem: $(".bird"),
    fly: function() {
        this.elem.addClass('birdFly')
        this.elem.transition({
            right: container.width()
        }, 15000, 'linear');
    }
}; 
/**飘雪花**/
  var snowflakeURL=[
     "image/snow1.png",
     "image/snow2.png",
     "image/snow3.png",
     "image/snow4.png",
     "image/snow5.png",
     "image/snow6.png"
  ]
  
function snowflake(){
  	//雪花容器
	var $flakeContainer=$("#snowflake");
	
	//随机六张图
	function getImagesName(){
		return snowflakeURL[(Math.floor(Math.random()*6))];
	}
	//创建一个雪花元素
	function createSnowBox(){
		var url=getImagesName();
		return $("<div class='snowbox'/>").css({
			"width":41,
			"height":41,
			"position":"absolute",
			"backgroundSize":"cover",
			"zIndex":100000,
			"top":"-41px",
			"backgroundImage":"url("+url+")"
		}).addClass("snowRoll");
}
//开始飘花
setInterval(function(){
	//运动轨迹
	var startPositionLeft=Math.random()*visualWidth-100,
	    startOpacity=1,
	    endPositionTop=visualHeight-40,
	    endPositionLef=startPositionLeft-100+Math.random()*500,
	    duration=visualHeight*10+Math.random()*5000;
	
	//随机透明度，不小于0.5
	var randomStart=Math.random();
	randomStart=randomStart<0.5?startOpacity:randomStart;
	
	//创建一个雪花
	var $flake=createSnowBox();
	
	//设计起点位置
	$flake.css({
		left:startPositionLeft,
		opacity:randomStart
	})
	
	//加入到容器
	$flakeContainer.append($flake);
	
	//开始执行动画
	$flake.transition({
		top:endPositionTop,
		left:endPositionLef,
		opacity:0.7,
	},duration,"ease-out",function(){
		$(this).remove()  //结束后删除
      		})
      	},200)
      }
 
        //音乐配置
   var audioConfig={
   	   enable:true,  //是否开启音乐
   playURL:"music/happy.mp3",  //正常播放
   cycleURL:"music/circulation.mp3"  //正常循环
   }
   
   /*背景音乐*/
  function Html5Audio(url,isloop){
  	console.log(url);
  	var audio=new Audio(url);
  	audio.autoplay=true;
  	audio.loop=isloop||false;
  	audio.play();
  	return{
  		end:function(callback){
  			audio.addEventListener("ended",function(){
  				callback();
  			},false);
  		}
  	}
  }
function doorAction(left,right,time){
	 	var $door=$(".door");
	 	var doorLeft=$(".door-left");
	 	var doorRight=$(".door-right");
	 	var defer=$.Deferred();// 新建一个deferred对象
	 	var count=2;
	 	//等待开门完成
	 	var complete=function(){
	 		if(count==1){
	 			defer.resolve();// 改变deferred对象的执行状态
	 			return;
	 		}
	 		count--;
	 	};
	 	doorLeft.transition({
	 		'left':left
	 	},time,complete);
	 	
	 	doorRight.transition({
	    'left': right
	    }, time, complete);
	    
	 	return defer;
}
 
 //开门
 function openDoor(){
 	return doorAction('-50%','100%',2000);
 }
 
 //关门
 function shutDoor(){
 	return doorAction('0%','50%',2000);
 }
 
var instanceX;
         
/**
 * 小孩走路
 * @param {[type]} container [description]
 */
function BoyWalk() {

    var container = $("#content");
    // 页面可视区域
    var visualWidth = container.width();
    var visualHeight = container.height();

    // 获取数据
    var getValue = function(className) {
        var $elem = $('' + className + '');
            //走路的路线坐标
        return {
            height: $elem.height(),
            top: $elem.position().top
        };
    }
    // 路的Y轴
    var pathY = function() {
        var data = getValue('.a_background_middle');
        return data.top + data.height / 2;
    }();
    
    var $boy = $("#boy");
    var boyWidth = $boy.width();
    var boyHeight = $boy.height();

    // 设置下高度    
    $boy.css({
        top: pathY - boyHeight + 25
    });

    // 暂停走路
    function pauseWalk() {
        $boy.addClass('pauseWalk');
    }

    // 恢复走路
    function restoreWalk() {
        $boy.removeClass('pauseWalk');
    }

    // css3的动作变化
    function slowWalk() {
        $boy.addClass('slowWalk');
    }

    // 用transition做运动
    function stratRun(options, runTime) {
        var dfdPlay = $.Deferred();
        // 恢复走路
        restoreWalk();
        // 运动的属性
        $boy.transition(
            options,
            runTime,
            'linear',
            function() {
                dfdPlay.resolve(); // 动画完成
            });
        return dfdPlay;
    }

    // 开始走路
    function walkRun(time, dist, disY) {
        time = time || 3000;
        // 脚动作
        slowWalk();
        // 开始走路
        var d1 = stratRun({
            'left': dist + 'px',
            'top': disY ? disY : undefined
        }, time);
        return d1;
    }
    
    //进入商店
    function walkToShop(runTime){
    	var defer=$.Deferred();
    	var doorObj=$(".door");
    	//门坐标
    	var offsetDoor=doorObj.offset();
    	var doorOffsetLeft=offsetDoor.left;
    	//小孩当前的坐标
    	var offsetBoy=$boy.offset();
    	var boyOffetLeft=offsetBoy.left;
    	
    	//当前需要移动的坐标   门中间的left值 - 小男孩中间的left值
        instanceX=(doorOffsetLeft+doorObj.width()/2)-(boyOffetLeft+$boy.width()/2);
        
        //开始走路
        var walkPlay = stratRun({
            transform: 'translateX(' + instanceX + 'px),scale(0.3,0.3)',
            opacity: 0.1
        }, 2000);
        //走路完毕
        walkPlay.done(function(){
        	$boy.css({
        		opacity:0
        	})
        	defer.resolve();
        })
        return defer;
    }
    
    //走出店
    function walkOutShop(runTime){
    	var defer = $.Deferred();
		restoreWalk();
		//开始走路
		var walkPlay = stratRun({
		    transform: 'translateX(' + instanceX + 'px),scale(1,1)',
		   opacity: 1
		}, runTime);
		//走路完毕
		walkPlay.done(function() {
		    defer.resolve();
		});
		return defer; 
    }
    
    //取花
    function talkFlower(){
    	//增加延时等待效果
    	var defer=$.Deferred();
    	setTimeout(function(){
    		//取花
    		$boy.addClass("slowFlolerWalk");
    		defer.resolve();
    	},1000);
    	return defer;
    }
    
    // 计算移动距离
    function calculateDist(direction, proportion) {
        return (direction == "x" ?
            visualWidth : visualHeight) * proportion;
    }
    

    return {
        // 开始走路
        walkTo: function(time, proportionX, proportionY) {
            var distX = calculateDist('x', proportionX)
            var distY = calculateDist('y', proportionY)
            return walkRun(time, distX, distY);
        },
        //走进商店
        toShop:function(){
        	return walkToShop.apply(null,arguments);
        },
        //走出商店
        outShop:function(){
        	return walkOutShop.apply(null,arguments);
        },
        //取花
        talkFlower:function(){
        	return talkFlower();
        },
        // 停止走路
        stopWalk: function() {
            pauseWalk();
        },
        setColoer:function(value){
            $boy.css('background-color',value)
        },
        getWidth:function(){
        	return $boy.width();
        },
        //复位初始化状态
        resetOriginal:function(){
        	this.stopWalk();
        	//恢复图片
        	$boy.removeClass("slowWalk slowFlolerWalk").addClass("boyOriginal");
        },
        //取花状态
        setFlolerWalk:function(){
        	$boy.addClass("slowFlolerWalk");
        },
        //转身动作
        rotate:function(callback){
        	restoreWalk();
        	$boy.addClass("boy-rotate");
        	//监听转身完毕
        	if(callback){
        		$boy.on(onanimationend,function(){
        			callback();
        			$(this).off();
        		})
        	}
        }
    }
    
    
}

function  init(){
  		var boy=BoyWalk();
  		// 太阳公转
        $("#sun").addClass('rotation');
        // 飘云
        $(".cloud:first").addClass('cloud1Anim');
        $(".cloud:last").addClass('cloud2Anim');
        //音乐
  		var audio1 = Html5Audio(audioConfig.playURL);
  		console.log("play="+audioConfig.playURL);
        audio1.end(function() {
           Html5Audio(audioConfig.cycleURL, true);
        });
  		// 开始第一次走路
        boy.walkTo(2000, 0.2)
                .then(function() {
                    // 第一次走路完成
                    // 开始页面滚动
                    scrollTo(6000, 1);
                }).then(function() {
                    // 第二次走路
                    return boy.walkTo(5000, 0.5);
                })
                .then(function(){
                	//暂停走路
                	boy.stopWalk();
                }).then(function(){
                	//开门
                	return openDoor();
                })
                .then(function(){
                	//开灯
                	lamp.bright();
                })
                .then(function(){
                	//走进商店
                	return boy.toShop(2000);
                })
                .then(function(){
                	 //取花
                	 return boy.talkFlower();
                })
                .then(function(){
                	//飞鸟
                	bird.fly();
                })
                .then(function(){
                	//走出商店
                	return boy.outShop(2000);
                })
                .then(function(){
                	//关门
                	return shutDoor();
                })
                .then(function(){
                	//灯暗
                	lamp.dark();
                }).then(function(){
                	//第三个页面
                	scrollTo(5000, 2);
                })
                .then(function(){
                	//第一次走路到桥底边left,top
                	return boy.walkTo(4000, 0.15)
                })
	       	   .then(function(){
	       	   	  //第二次走路到桥底边left，top
	       	   	 
	       	   	  return boy.walkTo(1500,0.25,(bridgeY-girl.getHeight())/visualHeight);
	       	   })
	       	   .then(function(){
	       	   	   //实际走路的比例
	       	   	    var proportionX = (girl.getPosition().left - (boy.getWidth() + girl.getWidth() / 2)) / visualWidth;
	       	   	  console.log(girl.getPosition().left);
	       	   	   //第三次桥上直走到小女孩面前
	       	   	  return boy.walkTo(1500, proportionX);
	       	   }) 
	       	   .then(function(){
	       	   	 //图片还原原地停止
	       	   	 boy.resetOriginal();
	       	   })	       	   
        	   .then(function(){
       	   	   //增加转身效果
       	   	   setTimeout(function(){
       	   	   	   girl.rotate();
       	   	   	   boy.rotate();
       	   	   },1000)
       	      }).then(function(){
       	      	//撒花效果
       	   	     snowflake()
       	      })       
  	}

 init();