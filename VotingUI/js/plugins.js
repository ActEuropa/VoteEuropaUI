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

// Place any jQuery/helper plugins in here.
!function(e){var t,a,i,n,o,s,d,l=e(document),r="touchstart mousedown",c="mousemove touchmove ",p="mouseup touchend",u="dragging",v="sortitem",h=".Ballot",f="box-shadow:0 0 0.625em rgba(0,0,0,0.5);",g=function(r){if(r.preventDefault(),t=r.pageY||r.originalEvent.touches[0].pageY,n=0,d=e(this).parent(),!d.hasClass(v))return!1;var h=d.parent(),f=d.index(),g=h[0].scrollHeight,b=h.children().first().offset().top,y=h.data("callback"),O=d.outerHeight(),m=d.data("restrict");if(m){var w="[data-restrict="+m+"]:first";m=d.prevAll(w),m.length&&(g+=b,b=m.offset().top+m.outerHeight(),g-=b),m=d.nextAll(w),m.length&&(g=m.offset().top-b)}return a=d.offset().top-b,i=a+O,o=d.prev().outerHeight()/2,s=d.next().outerHeight()/2,d.addClass(u),l.bind(c,function(e){e.preventDefault(),n=(e.pageY||e.originalEvent.touches[0].pageY)-t,0>a+n?n=-1*a:i+n>g?n=g-i:s>n?n+o>0||(d.insertBefore(d.prev()),_(-2*o)):(d.insertAfter(d.next()),_(2*s)),d.css({top:n+"px"})}),l.bind(p,function(){l.unbind(c+p),function t(){n>3?n-=3:-3>n?n+=3:n=0,d.css({top:n+"px"}),0==n?(d.removeClass(u),y&&d.index()!=f&&setTimeout(function(){e.globalEval(y)},20)):setTimeout(t,10)}()}),!1},_=function(e){t+=e,n-=e,a+=e,i+=e,o=d.prev().outerHeight()/2,s=d.next().outerHeight()/2};e.fn.vSort=function(){e(h).attr("unselectable","on").unbind(r,g).bind(r,g)},e("<style>."+v+"{position:relative;}."+v+" "+h+"{cursor:move;}."+v+"."+u+"{z-index:9999;}."+v+"."+u+">span{background:#C73E12;color:#DEB645;-webkit-"+f+f+"}</style>").appendTo("head"),l.ready(function(){l.vSort()})}(jQuery);
