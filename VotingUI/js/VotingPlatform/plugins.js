// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

//STV sort
!function(e){var t,a,i,n,o,s,d,l=e(document),r="touchstart mousedown",c="mousemove touchmove ",p="mouseup touchend",u="dragging",v="sortitem",h=".Ballot",f="box-shadow:0 0 0.625em rgba(0,0,0,0.5);",g=function(r){if(r.preventDefault(),t=r.pageY||r.originalEvent.touches[0].pageY,n=0,d=e(this).parent(),!d.hasClass(v))return!1;var h=d.parent(),f=d.index(),g=h[0].scrollHeight,b=h.children().first().offset().top,y=h.data("callback"),O=d.outerHeight(),m=d.data("restrict");if(m){var w="[data-restrict="+m+"]:first";m=d.prevAll(w),m.length&&(g+=b,b=m.offset().top+m.outerHeight(),g-=b),m=d.nextAll(w),m.length&&(g=m.offset().top-b)}return a=d.offset().top-b,i=a+O,o=d.prev().outerHeight()/2,s=d.next().outerHeight()/2,d.addClass(u),l.bind(c,function(e){e.preventDefault(),n=(e.pageY||e.originalEvent.touches[0].pageY)-t,0>a+n?n=-1*a:i+n>g?n=g-i:s>n?n+o>0||(d.insertBefore(d.prev()),_(-2*o)):(d.insertAfter(d.next()),_(2*s)),d.css({top:n+"px"})}),l.bind(p,function(){l.unbind(c+p),function t(){n>3?n-=3:-3>n?n+=3:n=0,d.css({top:n+"px"}),0==n?(d.removeClass(u),y&&d.index()!=f&&setTimeout(function(){e.globalEval(y)},20)):setTimeout(t,10)}()}),!1},_=function(e){t+=e,n-=e,a+=e,i+=e,o=d.prev().outerHeight()/2,s=d.next().outerHeight()/2};e.fn.vSort=function(){e(h).attr("unselectable","on").unbind(r,g).bind(r,g)},e("<style>."+v+"{position:relative;}."+v+" "+h+"{cursor:move;}."+v+"."+u+"{z-index:9999;}."+v+"."+u+">span{background:#C73E12;color:#DEB645;-webkit-"+f+f+"}</style>").appendTo("head"),l.ready(function(){l.vSort()})}(jQuery);
//Easing modes
(function(factory){if(typeof define==="function"&&define.amd){define(["jquery"],function($){return factory($)})}else if(typeof module==="object"&&typeof module.exports==="object"){exports=factory(require("jquery"))}else{factory(jQuery)}})(function($){$.easing["jswing"]=$.easing["swing"];var pow=Math.pow,sqrt=Math.sqrt,sin=Math.sin,cos=Math.cos,PI=Math.PI,c1=1.70158,c2=c1*1.525,c3=c1+1,c4=2*PI/3,c5=2*PI/4.5;function bounceOut(x){var n1=7.5625,d1=2.75;if(x<1/d1){return n1*x*x}else if(x<2/d1){return n1*(x-=1.5/d1)*x+.75}else if(x<2.5/d1){return n1*(x-=2.25/d1)*x+.9375}else{return n1*(x-=2.625/d1)*x+.984375}}$.extend($.easing,{def:"easeOutQuad",swing:function(x){return $.easing[$.easing.def](x)},easeInQuad:function(x){return x*x},easeOutQuad:function(x){return 1-(1-x)*(1-x)},easeInOutQuad:function(x){return x<.5?2*x*x:1-pow(-2*x+2,2)/2},easeInCubic:function(x){return x*x*x},easeOutCubic:function(x){return 1-pow(1-x,3)},easeInOutCubic:function(x){return x<.5?4*x*x*x:1-pow(-2*x+2,3)/2},easeInQuart:function(x){return x*x*x*x},easeOutQuart:function(x){return 1-pow(1-x,4)},easeInOutQuart:function(x){return x<.5?8*x*x*x*x:1-pow(-2*x+2,4)/2},easeInQuint:function(x){return x*x*x*x*x},easeOutQuint:function(x){return 1-pow(1-x,5)},easeInOutQuint:function(x){return x<.5?16*x*x*x*x*x:1-pow(-2*x+2,5)/2},easeInSine:function(x){return 1-cos(x*PI/2)},easeOutSine:function(x){return sin(x*PI/2)},easeInOutSine:function(x){return-(cos(PI*x)-1)/2},easeInExpo:function(x){return x===0?0:pow(2,10*x-10)},easeOutExpo:function(x){return x===1?1:1-pow(2,-10*x)},easeInOutExpo:function(x){return x===0?0:x===1?1:x<.5?pow(2,20*x-10)/2:(2-pow(2,-20*x+10))/2},easeInCirc:function(x){return 1-sqrt(1-pow(x,2))},easeOutCirc:function(x){return sqrt(1-pow(x-1,2))},easeInOutCirc:function(x){return x<.5?(1-sqrt(1-pow(2*x,2)))/2:(sqrt(1-pow(-2*x+2,2))+1)/2},easeInElastic:function(x){return x===0?0:x===1?1:-pow(2,10*x-10)*sin((x*10-10.75)*c4)},easeOutElastic:function(x){return x===0?0:x===1?1:pow(2,-10*x)*sin((x*10-.75)*c4)+1},easeInOutElastic:function(x){return x===0?0:x===1?1:x<.5?-(pow(2,20*x-10)*sin((20*x-11.125)*c5))/2:pow(2,-20*x+10)*sin((20*x-11.125)*c5)/2+1},easeInBack:function(x){return c3*x*x*x-c1*x*x},easeOutBack:function(x){return 1+c3*pow(x-1,3)+c1*pow(x-1,2)},easeInOutBack:function(x){return x<.5?pow(2*x,2)*((c2+1)*2*x-c2)/2:(pow(2*x-2,2)*((c2+1)*(x*2-2)+c2)+2)/2},easeInBounce:function(x){return 1-bounceOut(1-x)},easeOutBounce:bounceOut,easeInOutBounce:function(x){return x<.5?(1-bounceOut(1-2*x))/2:(1+bounceOut(2*x-1))/2}})});
