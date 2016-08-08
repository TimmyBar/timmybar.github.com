/**
 * Created by limm on 16/6/30.
 */
function getStyle(obj,name){
  return (obj.currentStyle || getComputedStyle(obj,false))[name];

}
//obj:对象；
// json{name:属性名；iTargrt：目标值；}
// option中包含三个参数duration(所需时间）,easing（运动形式）,complete（函数）
function move(obj,json,options){

    //如果有options则调用，如果没有则为空json
    var options=options ||{};
    //设置时间的默认值为1s
    options.duration=options.duration || 3000;
    //设置运动形式默认值为匀速
    options.easing=options.easing || 'ease-in';
    //需要定时器执行的次数1s/30ms
    var count=Math.floor(options.duration/30);
    //获取初始样式并转化为数字
    var start={};
    var dis={};
    for(var name in json){
        //初始状态,将初始状态写入start中
        start[name]=parseFloat(getStyle(obj,name));
        //运动过程=最终状态-初始状态，将运动过程数据写入到dis中
        dis[name]=json[name]-start[name];
       // console.log(start);
    }
    var n=0;
    //关闭定时器
    clearInterval(obj.timer);
    //设置定时器
    obj.timer=setInterval(function(){
        n++;
        for(var name in json){
            //判断运动形式easing。
            // linear:匀速；
            // ease-in：减速；
            // ease-out:加速
            switch (options.easing){
                case 'linear':
                    var a=n/count;
                    var cur=dis[name] * a+ start[name];
                    break;
                case 'ease-in':
                    var a=1-n/count;
                    var cur=dis[name] *(1-a*a*a)+ start[name];
                    break;
                case 'ease-out':
                    var a=n/count;
                    var cur=dis[name] * a*a*a+ start[name];
                    break;
            }
            //判断是否为opacity，对样式进行设置
            if(name=='opacity'){
                obj.style[name]=cur;
                obj.style.filter='alpha(opacity:'+cur*100+')';
            }else if(name=='border-radius'){
                obj.style[name]=cur+'%';
            }else{
                //执行一次需要移动的距离
                obj.style[name]=cur+'px';
            }
        }
        //当n>移动次数时，关闭定时器
        if(n>=count){
            clearInterval(obj.timer);
            options.complete && options.complete();
        }
    },30)
}