/**
 * Created by limm on 16/6/29.
 */
function domReady(fn){
    if(document.addEventListener){
        document.addEventListener('DOMContentLoaded',
            function(){
                fn && fn();
            },false);
    }else{
        document.attachEvent('onreadystatechange',
            function(){
               if(document.readyState=='complete'){
                   fn&&fn();
               }
            }
        )
    }
}