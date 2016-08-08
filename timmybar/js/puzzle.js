/**
 * Created by limm on 16/7/22.
 */
//获取随机数
function getRandom(n,m){
    return parseInt(Math.random()*(m-n)+n);
}



function Drag(obj,row,col,size,img){
    //row:行
    //col:每行的数量
    //size：span的尺寸
    obj.style.background='none';
    obj.innerHTML='';
    var z=999;
    var arrIndex=[];
    for(var i=0;i<row*col;i++){
        var oSpan=document.createElement('span');
        oSpan.style.width=size+'px';
        oSpan.style.height=size+'px';
        oSpan.innerHTML=i;
        oSpan.style.background='url('+img+') no-repeat '+(-i%col*size)+'px '+(-parseInt(i/col)*size)+'px';
        obj.appendChild(oSpan);
        arrIndex.push({'l':i%col*size,'t':parseInt(i/col)*size});
    }
    // console.log(arrIndex);
    var aSpan=obj.children;
    var arr = [];
    for (var i = 0; i < row*col; i++) {

        var l = getRandom(0, col) * size;
        var t = getRandom(0, row) * size;
        arr.push({'l': l, 't': t});
        //console.log(arr);
        for (var j = 0; j < i; j++) {
            if (arr[i].l == arr[j].l && arr[i].t == arr[j].t) {
                arr.pop();
                i--;
            }
        }
        aSpan[i].style.left = arr[i].l + 'px';
        aSpan[i].style.top = arr[i].t + 'px';

    }

    for(var i=0;i<aSpan.length;i++){
        (function(i){
            aSpan[i].onmousedown=function(ev){
                var arrPos=[];
                for(var j=0;j<aSpan.length;j++){
                    arrPos.push({'l':aSpan[j].offsetLeft,'t':aSpan[j].offsetTop});
                }
                //console.log(arrPos);
                aSpan[i].style.zIndex=z++;
                var oEvent=ev||event;
                var disX=oEvent.clientX-aSpan[i].offsetLeft;
                var disY=oEvent.clientY-aSpan[i].offsetTop;
                document.onmousemove=function(ev){
                    var oEvent=ev||event;
                    var min=9999;
                    var minIndex;
                    var l=oEvent.clientX-disX;
                    var t=oEvent.clientY-disY;
                    if(l<0){
                        l=0;
                    }
                    if(t<0){
                        t=0;
                    }
                    if(l>obj.offsetWidth-aSpan[i].offsetWidth-2){
                        l=obj.offsetWidth-aSpan[i].offsetWidth-2;
                    }
                    if(t>obj.offsetHeight-aSpan[i].offsetWidth-2){
                        t=obj.offsetHeight-aSpan[i].offsetHeight-2;
                    }
                    aSpan[i].style.left=l+'px';
                    aSpan[i].style.top=t+'px';

                    //console.log(minIndex);
                    //碰撞
                    for(var j=0;j<aSpan.length;j++){
                        if(i==j){
                            continue;
                        }else{
                            if(aSpan[i].offsetLeft+aSpan[i].offsetWidth>aSpan[j].offsetLeft &&aSpan[i].offsetLeft<aSpan[j].offsetLeft+aSpan[j].offsetWidth && aSpan[i].offsetTop+aSpan[i].offsetHeight>aSpan[j].offsetTop &&aSpan[i].offsetTop<aSpan[j].offsetTop+aSpan[j].offsetHeight){
                                //判断最小距离
                                var a=aSpan[j].offsetLeft+aSpan[j].offsetWidth/2-aSpan[i].offsetLeft-aSpan[i].offsetWidth/2;
                                var b=aSpan[j].offsetTop+aSpan[j].offsetHeight/2-aSpan[i].offsetTop-aSpan[i].offsetHeight/2;
                                var s=Math.sqrt(a*a+b*b);

                                if(min>s){
                                    min=s;
                                    minIndex=j;
                                }
                            }
                        }
                    }
                    for(var j=0;j<aSpan.length;j++){
                        aSpan[j].className='';
                    }
                    aSpan[minIndex].className='ac';
                }


                document.onmouseup=function(){
                    //交换位置
                    document.onmousemove=null;
                    document.onmouseup=null;
                    var min=9999;
                    var minIndex;
                    var bOk=true;
                    for(var j=0;j<aSpan.length;j++){
                        if(i==j){
                            continue;
                        }else{
                            if(aSpan[i].offsetLeft+aSpan[i].offsetWidth>aSpan[j].offsetLeft &&aSpan[i].offsetLeft<aSpan[j].offsetLeft+aSpan[j].offsetWidth && aSpan[i].offsetTop+aSpan[i].offsetHeight>aSpan[j].offsetTop &&aSpan[i].offsetTop<aSpan[j].offsetTop+aSpan[j].offsetHeight){
                                //判断最小距离
                                var a=aSpan[j].offsetLeft+aSpan[j].offsetWidth/2-aSpan[i].offsetLeft-aSpan[i].offsetWidth/2;
                                var b=aSpan[j].offsetTop+aSpan[j].offsetHeight/2-aSpan[i].offsetTop-aSpan[i].offsetHeight/2;
                                var s=Math.sqrt(a*a+b*b);
                                if(min>s){
                                    min=s;
                                    minIndex=j;
                                }
                            }
                        }
                    }
                    console.log(minIndex);
                    if(minIndex){
                        aSpan[minIndex].style.left=arrPos[i].l+'px';
                        aSpan[minIndex].style.top=arrPos[i].t+'px';
                        aSpan[i].style.left=arrPos[minIndex].l+'px';
                        aSpan[i].style.top=arrPos[minIndex].t+'px';
                        aSpan[minIndex].className='';
                    }else{
                        aSpan[i].style.left=arrPos[i].l+'px';
                        aSpan[i].style.top=arrPos[i].t+'px';
                    }
                    for(var count=0;count<aSpan.length;count++){
                        if(aSpan[count].offsetLeft!=arrIndex[count].l || aSpan[count].offsetTop!=arrIndex[count].t){
                            bOk=false;
                        }
                    }
                    if(bOk){
                        alert('恭喜完成拼图');
                        obj.innerHTML='';
                        obj.style.background='url('+img+')';
                    }
                    //aSpan[i].releaseCapture && aSpan[i].releaseCapture();
                }
                aSpan[i].setCapture && aSpan[i].setCapture();
                return false;
            }
        })(i);

    }

}
