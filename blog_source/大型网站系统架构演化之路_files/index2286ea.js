define("appmsg/share.js",["biz_common/utils/string/html.js","biz_common/dom/event.js","biz_wap/utils/ajax.js","biz_wap/jsapi/core.js"],function(i){
"use strict";
function e(i,e){
var t="";
""!=tid&&(t="tid="+tid+"&aid=54");
var n=i.split("?")[1]||"";
if(n=n.split("#")[0],""!=n){
var s=[n,"scene="+e];
return""!=t&&s.push(t),n=s.join("&"),i.split("?")[0]+"?"+n+"#"+(i.split("#")[1]||"");
}
}
function t(i,e,t){
var s=i.split("?").pop();
if(s=s.split("#").shift(),""!=s){
var a=[s,"action_type="+t,"uin="+e].join("&");
n({
url:"/mp/appmsg/show",
type:"POST",
timeout:2e3,
data:a
});
}
}
i("biz_common/utils/string/html.js");
var n=(i("biz_common/dom/event.js"),i("biz_wap/utils/ajax.js")),s=i("biz_wap/jsapi/core.js");
s.call("hideToolbar");
var a=msg_title.htmlDecode(),o=(msg_source_url.htmlDecode(),""),m=msg_cdn_url,l=msg_link.htmlDecode(),a=msg_title.htmlDecode(),r=msg_desc.htmlDecode();
r=r||l,"1"==is_limit_user&&s.call("hideOptionMenu"),s.on("menu:share:appmessage",function(i){
var n=1;
i&&"favorite"==i.scene&&(n=4),s.invoke("sendAppMessage",{
appid:o,
img_url:m,
img_width:"640",
img_height:"640",
link:e(l,n),
desc:r,
title:a
},function(){
t(l,fakeid,n);
});
}),s.on("menu:share:timeline",function(){
t(l,fakeid,2),s.invoke("shareTimeline",{
img_url:m,
img_width:"640",
img_height:"640",
link:e(l,2),
desc:r,
title:a
},function(){});
});
s.on("menu:share:weibo",function(){
s.invoke("shareWeibo",{
content:a+e(l,3),
url:e(l,3)
},function(){
t(l,fakeid,3);
});
}),s.on("menu:share:facebook",function(){
t(l,fakeid,4),s.invoke("shareFB",{
img_url:m,
img_width:"640",
img_height:"640",
link:e(l,4),
desc:r,
title:a
},function(){});
}),s.on("menu:general:share",function(i){
var n=0;
switch(i.shareTo){
case"friend":
n=1;
break;

case"timeline":
n=2;
break;

case"weibo":
n=3;
}
i.generalShare({
appid:o,
img_url:m,
img_width:"640",
img_height:"640",
link:e(l,n),
desc:r,
title:a
},function(){
t(l,fakeid,n);
});
});
});define("appmsg/comment.js",["biz_common/dom/event.js","biz_common/dom/class.js","biz_wap/utils/ajax.js","biz_common/utils/string/html.js","biz_common/tmpl.js"],function(e){
"use strict";
function t(e,t){
e.style.display=t?t:"block";
}
function n(e){
e.style.display="none";
}
function o(){
t(B.toast),setTimeout(function(){
n(B.toast);
},1500);
}
function m(e){
return e.replace(/^\s+|\s+$/g,"");
}
function i(){
clearTimeout(w),w=setTimeout(function(){
if(!j&&-1!=b&&(0==b||"#more"==location.hash)){
var e=window.innerHeight||document.documentElement.clientHeight,o=window.pageYOffset||document.documentElement.scrollTop,m=document.documentElement.scrollHeight;
if(!(m-o-e>200)){
j=!0,n(B.tips),t(B.loading);
var i="/mp/appmsg_comment?action=getcomment&__biz="+biz+"&appmsgid="+appmsgid+"&idx="+idx+"&comment_id="+comment_id+"&offset="+b+"&limit="+h;
g({
url:i,
type:"get",
success:function(e){
var t={};
try{
t=window.eval.call(window,"("+e+")");
}catch(n){}
var o=t.base_resp&&t.base_resp.ret;
0==o?c(t):y.src="http://mp.weixin.qq.com/mp/jsreport?key=18&content=type:resperr;url:"+encodeURIComponent(i)+";ret="+o+"&r="+Math.random();
},
error:function(){
y.src="http://mp.weixin.qq.com/mp/jsreport?key=18&content=type:ajaxerr;url:"+encodeURIComponent(i)+"&r="+Math.random();
},
complete:function(){
j=!1,n(B.loading);
}
});
}
}
},100);
}
function c(e){
var o,m=document.createDocumentFragment();
0==b?(E=e.logo_url,I=e.nick_name,o=e.elected_comment,o.length?(d(o,m,"elected"),
B.list.appendChild(m),d(o,m,"elected"),B.morelist.appendChild(m),t(B.main),1!=e.is_fans?(t(document.getElementById("js_cmt_nofans1"),"inline"),
t(document.getElementById("js_cmt_nofans3"),"inline")):(t(document.getElementById("js_cmt_addbtn1")),
t(document.getElementById("js_cmt_addbtn3"))),t(e.elected_comment_total_cnt>10?document.getElementById("js_cmt_morebtn"):document.getElementById("js_cmt_statement"))):(n(B.main),
t(1!=e.is_fans?document.getElementById("js_cmt_nofans2"):document.getElementById("js_cmt_addbtn2"))),
o=e.my_comment,o.length&&(d(o,m),B.mylist.appendChild(m),t(B.mylist.parentNode))):(o=e.elected_comment,
o.length&&(d(o,m,"elected"),B.morelist.appendChild(m))),b+h>=e.elected_comment_total_cnt?(b=-1,
_.off(window,"scroll",i),n(document.getElementById("js_cmt_more_loading")),t(document.getElementById("js_cmt_more_end"))):b+=e.elected_comment.length;
}
function l(){
var e=m(B.input.value);
if(!p.hasClass(B.submit,"btn_disabled")){
if(e.length<1)return a("评论不能为空");
if(e.length>600)return a("字数不能多于600个");
p.addClass(B.submit,"btn_disabled");
var n="/mp/appmsg_comment?action=addcomment&comment_id="+comment_id+"&__biz="+biz+"&idx="+idx+"&appmsgid="+appmsgid;
g({
url:n,
data:"content="+e,
type:"POST",
success:function(m){
var i={},c=document.createDocumentFragment();
try{
i=window.eval.call(window,"("+m+")");
}catch(l){}
switch(+i.ret){
case 0:
o(),d([{
content:e,
nick_name:I,
create_time:(new Date).getTime()/1e3|0,
is_elected:0,
logo_url:E
}],c),B.mylist.insertBefore(c,B.mylist.firstChild),t(B.mylist.parentNode),B.input.value="";
break;

case-6:
a("你评论的太频繁了，休息一下吧");
break;

case-7:
a("你还未关注该公众号，不能参与评论");
break;

case-10:
a("字数不能多于600个");
break;

case-15:
a("评论已关闭");
break;

default:
a("系统错误，请重试");
}
0!=i.ret&&(y.src="http://mp.weixin.qq.com/mp/jsreport?key=19&content=type:resperr;url:"+encodeURIComponent(n)+";ret="+i.ret+"&r="+Math.random());
},
error:function(){
y.src="http://mp.weixin.qq.com/mp/jsreport?key=19&content=type:ajaxerr;url:"+encodeURIComponent(n)+"&r="+Math.random();
},
complete:function(){
p.removeClass(B.submit,"btn_disabled");
}
});
}
}
function s(e){
var t=(new Date).getTime(),n=new Date;
n.setDate(n.getDate()+1),n.setHours(0),n.setMinutes(0),n.setSeconds(0),n=n.getTime();
var o=t/1e3-e,m=n/1e3-e;
return 3600>o?Math.ceil(o/60)+"分钟前":86400>m?Math.floor(o/60/60)+"小时前":172800>m?"昨天":Math.floor(m/24/60/60)+"天前";
}
function d(e,t){
for(var n,o,m="",i=document.createElement("div"),c="http://mmbiz.qpic.cn/mmbiz/ByCS3p9sHiak6fjSeA7cianwo25C0CIt5ib8nAcZjW7QT1ZEmUo4r5iazzAKhuQibEXOReDGmXzj8rNg/0",l=0;o=e[l];++l)o.time=s(o.create_time),
o.status="",o.logo_url=o.logo_url||c,o.logo_url=-1!=o.logo_url.indexOf("wx.qlogo.cn")?o.logo_url.replace(/\/132$/,"/96"):o.logo_url,
o.content=o.content.htmlDecode().htmlEncode(),o.nick_name=o.nick_name.htmlDecode().htmlEncode(),
m+=f.render("t_cmt",o);
for(i.innerHTML=m;n=i.children.item(0);)t.appendChild(n);
}
function a(e){
return setTimeout(function(){
alert(e);
});
}
function r(){
if("#comment"==location.hash)n(B.article),n(B.more),t(B.mine),window.scrollTo(0,0);else if("#more"==location.hash){
var e=B.list.children.item(9).getBoundingClientRect().top;
n(B.article),n(B.mine),t(B.more),i(),window.scrollTo(0,(window.pageYOffset||document.documentElement.scrollTop)+B.morelist.children.item(9).getBoundingClientRect().top-e);
}else n(B.mine),n(B.more),t(B.article),window.scrollTo(0,document.documentElement.scrollHeight);
B.input.blur();
}
var u=document.getElementById("js_cmt_area");
if(0!=comment_id&&1==comment_enabled&&uin&&key){
if(-1==navigator.userAgent.indexOf("MicroMessenger"))return void(u&&(u.style.display="none"));
u&&(u.style.display="block");
var _=e("biz_common/dom/event.js"),p=e("biz_common/dom/class.js"),g=e("biz_wap/utils/ajax.js"),f=(e("biz_common/utils/string/html.js"),
e("biz_common/tmpl.js")),y=new Image,b=0,h=10,j=!1,w=null,E="",I="我",B={
article:document.getElementById("js_article"),
more:document.getElementById("js_cmt_more"),
mine:document.getElementById("js_cmt_mine"),
main:document.getElementById("js_cmt_main"),
input:document.getElementById("js_cmt_input"),
submit:document.getElementById("js_cmt_submit"),
addbtn:document.getElementById("js_cmt_addbtn"),
list:document.getElementById("js_cmt_list"),
mylist:document.getElementById("js_cmt_mylist"),
morelist:document.getElementById("js_cmt_morelist"),
toast:document.getElementById("js_cmt_toast"),
tips:document.getElementById("js_cmt_tips"),
loading:document.getElementById("js_cmt_loading")
};
!function(){
i(),r();
}(),_.on(window,"scroll",i),_.on(window,"hashchange",r),_.on(B.input,"input",function(){
var e=m(B.input.value);
e.length<1?p.addClass(B.submit,"btn_disabled"):p.removeClass(B.submit,"btn_disabled");
}),_.on(B.submit,"touchend",l);
}
});define("appmsg/page_pos.js",["biz_common/utils/string/html.js","biz_common/dom/event.js","biz_wap/utils/ajax.js","biz_common/utils/cookie.js"],function(e){
"use strict";
function t(e){
for(var t=5381,n=0;n<e.length;n++)t=(t<<5)+t+e.charCodeAt(n),t&=2147483647;
return t;
}
function n(e,t){
if(e&&!(e.length<=0))for(var n,o,i,m=/http(s)?\:\/\/([^\/]*)(\?|\/)?/,a=0,c=e.length;c>a;++a)n=e[a],
n&&(o=n.getAttribute(t),o&&(i=o.match(m),i&&i[2]&&(l[i[2]]=!0)));
}
function o(){
l={},n(document.getElementsByTagName("a"),"href"),n(document.getElementsByTagName("link"),"href"),
n(document.getElementsByTagName("iframe"),"src"),n(document.getElementsByTagName("script"),"src"),
n(document.getElementsByTagName("img"),"src");
var e=[];
for(var t in l)l.hasOwnProperty(t)&&e.push(t);
return l={},e.join(",");
}
function i(){
var e=window.pageYOffset||document.documentElement.scrollTop,t=document.getElementById("js_content"),n=document.documentElement.clientHeight||window.innerHeight,i=document.body.scrollHeight,m=Math.ceil(i/n),l=(window.logs.read_height||e)+n,d=document.getElementById("js_toobar").offsetTop,g=t.getElementsByTagName("img")||[],s=Math.ceil(l/n)||1,r=document.getElementById("media"),u=50,_=0,h=0,w=0,f=0,p=l+u>d?1:0;
s>m&&(s=m);
var T=function(e){
if(e)for(var t=0,n=e.length;n>t;++t){
_++;
var o=e[t],i=o.getAttribute("src");
i&&"http://mmbiz.qpic.cn/mmbiz/ByCS3p9sHianTpT5NjcxRyqOdPZ49QtN2F4lUOibezlT1JzzjDCtAtDynZuPTXzEm8XReKPy6HQCk/0"!=i&&(h++,
0==i.indexOf("http://mmbiz.qpic.cn")&&(w++,-1!=i.indexOf("?tp=webp")&&f++));
}
};
T(!!r&&r.getElementsByTagName("img")),T(g);
var b=window.appmsgstat||{},v={
__biz:biz,
title:msg_title.htmlDecode(),
mid:mid,
idx:idx,
read_cnt:b.read_num||0,
like_cnt:b.like_num||0,
screen_height:n,
screen_num:m,
video_cnt:window.logs.video_cnt||0,
img_cnt:_||0,
download_img_cnt:h||0,
download_cdn_img_cnt:w||0,
download_cdn_webp_img_cnt:f||0,
read_screen_num:s||0,
is_finished_read:p,
scene:source,
content_len:c.content_length||0,
start_time:page_begintime,
end_time:(new Date).getTime()
},y=(new Date).getDay();
0!==user_uin&&Math.floor(user_uin/100)%7==y&&(v.domain_list=o()),a({
url:"/mp/appmsgreport?action=page_time",
type:"POST",
data:v,
async:!1,
timeout:2e3
});
}
e("biz_common/utils/string/html.js");
var m=e("biz_common/dom/event.js"),a=e("biz_wap/utils/ajax.js"),c=(e("biz_common/utils/cookie.js"),
{});
!function(){
var e=document.getElementsByTagName("html");
if(e&&1==!!e.length){
e=e[0].innerHTML;
var t=e.replace(/[\x00-\xff]/g,""),n=e.replace(/[^\x00-\xff]/g,"");
c.content_length=1*n.length+3*t.length+"<!DOCTYPE html><html></html>".length;
}
window.logs.pageinfo=c;
}();
var l={},d=null,g=0,s=msg_link.split("?").pop(),r=t(s);
window.localStorage&&(m.on(window,"load",function(){
g=1*localStorage.getItem(r),window.scrollTo(0,g);
}),m.on(window,"unload",function(){
localStorage.setItem(r,g),i();
}),window.logs.read_height=0,m.on(window,"scroll",function(){
var e=window.pageYOffset||document.documentElement.scrollTop;
window.logs.read_height=Math.max(window.logs.read_height,e),clearTimeout(d),d=setTimeout(function(){
g=window.pageYOffset;
},500);
}),m.on(document,"touchmove",function(){
var e=window.pageYOffset||document.documentElement.scrollTop;
window.logs.read_height=Math.max(window.logs.read_height,e),clearTimeout(d),d=setTimeout(function(){
g=window.pageYOffset;
},500);
}));
});define("appmsg/cdn_speed_report.js",["biz_common/dom/event.js","biz_wap/jsapi/core.js","biz_wap/utils/ajax.js"],function(e){
"use strict";
function n(){
function e(e){
var n=[];
for(var i in e)n.push(i+"="+encodeURIComponent(e[i]||""));
return n.join("&");
}
if(networkType){
var n=window.performance||window.msPerformance||window.webkitPerformance;
if(n&&"undefined"!=typeof n.getEntries){
var i,t,a=100,o=document.getElementsByTagName("img"),s=o.length,p=navigator.userAgent,m=!1;
/micromessenger\/(\d+\.\d+)/i.test(p),t=RegExp.$1;
for(var g=0,w=o.length;w>g;g++)if(i=parseInt(100*Math.random()),!(i>a)){
var d=o[g].getAttribute("src");
if(d&&!(d.indexOf("mp.weixin.qq.com")>=0)){
for(var f,c=n.getEntries(),_=0;_<c.length;_++)if(f=c[_],f.name==d){
r({
type:"POST",
url:"/mp/appmsgpicreport?__biz="+biz+"#wechat_redirect",
data:e({
rnd:Math.random(),
uin:uin,
version:version,
client_version:t,
device:navigator.userAgent,
time_stamp:parseInt(+new Date/1e3),
url:d,
img_size:o[g].fileSize||0,
user_agent:navigator.userAgent,
net_type:networkType,
appmsg_id:window.appmsgid||"",
sample:s>100?100:s,
delay_time:parseInt(f.duration)
})
}),m=!0;
break;
}
if(m)break;
}
}
}
}
}
var i=e("biz_common/dom/event.js"),t=e("biz_wap/jsapi/core.js"),r=e("biz_wap/utils/ajax.js"),a={
"network_type:fail":"fail",
"network_type:edge":"2g/3g",
"network_type:wwan":"2g/3g",
"network_type:wifi":"wifi"
};
t.invoke("getNetworkType",{},function(e){
networkType=a[e.err_msg],n();
}),i.on(window,"load",n,!1);
});define("appmsg/iframe.js",[],function(){
"use strict";
function e(e){
var t=0;
e.contentDocument&&e.contentDocument.body.offsetHeight?t=e.contentDocument.body.offsetHeight:e.Document&&e.Document.body&&e.Document.body.scrollHeight?t=e.Document.body.scrollHeight:e.document&&e.document.body&&e.document.body.scrollHeight&&(t=e.document.body.scrollHeight);
var i=e.parentElement;
if(i&&(e.style.height=t+"px"),/MSIE\s(7|8)/.test(navigator.userAgent)&&e.contentWindow&&e.contentWindow.document){
var n=e.contentWindow.document.getElementsByTagName("html");
n&&n.length&&(n[0].style.overflow="hidden");
}
}
var t,i=document.getElementsByTagName("iframe"),n=document.getElementById("js_content"),o=n.offsetWidth,r=3*o/4;
window.logs.video_cnt=0;
for(var c=0,d=i.length;d>c;++c){
t=i[c];
var m=t.getAttribute("data-src"),s=t.className||"",a=t.getAttribute("src")||m;
!a||0!=a.indexOf("http://v.qq.com/iframe/player.html")&&0!=a.indexOf("http://z.weishi.com/weixin/player.html")?m&&(0==m.indexOf("http://mp.weixin.qq.com/mp/appmsgvote")&&s.indexOf("js_editor_vote_card")>=0||0==m.indexOf("http://mp.weixin.qq.com/bizmall/appmsgcard")&&s.indexOf("card_iframe")>=0)&&(s.indexOf("card_iframe")>=0?t.setAttribute("src",m.replace("#wechat_redirect",["&uin=",uin,"&key=",key,"&scene=",source,"&msgid=",appmsgid,"&msgidx=",itemidx||idx,"&version=",version,"&devicetype=",window.devicetype||""].join(""))):t.setAttribute("src",m.replace("#wechat_redirect",["&uin=",uin,"&key=",key].join(""))),
function(t){
t.onload=function(){
e(t);
};
}(t),t.appmsg_idx=c):(a=a.replace(/width=\d+/g,"width="+o),a=a.replace(/height=\d+/g,"height="+r),
window.appmsgticket&&0==a.indexOf("http://v.qq.com/iframe/player.html")&&(a=a+"&encryptVer=6.0&platform=61001&cKey="+window.appmsgticket),
t.setAttribute("src",a),t.width=o,t.height=r,t.style.setProperty&&(t.style.setProperty("width",o+"px","important"),
t.style.setProperty("height",r+"px","important")),window.logs.video_cnt++);
}
if(window.iframe_reload=function(){
for(var n=0,o=i.length;o>n;++n){
t=i[n];
var r=t.getAttribute("src");
r&&0==r.indexOf("http://mp.weixin.qq.com/mp/appmsgvote")&&e(t);
}
},"getElementsByClassName"in document)for(var l,p=document.getElementsByClassName("video_iframe"),c=0;l=p.item(c++);)l.setAttribute("scrolling","no"),
l.style.overflow="hidden";
});define("appmsg/review_image.js",["biz_common/dom/event.js","biz_wap/jsapi/core.js"],function(e){
"use strict";
function t(e,t){
r.invoke("imagePreview",{
current:e,
urls:t
});
}
function i(e){
var i=[],r=e.container;
r=r?r.getElementsByTagName("img"):[];
for(var a=0,c=r.length;c>a;a++){
var o=r.item(a),s=o.getAttribute("data-src")||o.getAttribute("src");
if(s){
for(;-1!=s.indexOf("?tp=webp");)s=s.replace("?tp=webp","");
o.dataset&&o.dataset.s&&0==s.indexOf("http://mmbiz.qpic.cn")&&(s=s.replace(/\/640$/,"/0")),
i.push(s),function(e){
n.on(o,"click",function(){
return t(e,i),!1;
});
}(s);
}
}
}
var n=e("biz_common/dom/event.js"),r=e("biz_wap/jsapi/core.js");
return i;
});define("appmsg/outer_link.js",["biz_common/dom/event.js"],function(e){
"use strict";
function n(e){
var n=e.container;
if(!n)return!1;
for(var i=n.getElementsByTagName("a")||[],r=0,o=i.length;o>r;++r)!function(n){
var r=i[n],o=r.getAttribute("href");
if(!o)return!1;
0!=o.indexOf("http://mp.weixin.qq.com")&&0!=o.indexOf("http://mp.weixin.qq.com");
var c=0,f=r.innerHTML;
/^[^<>]+$/.test(f)?c=1:/^<img[^>]*>$/.test(f)&&(c=2),!!e.changeHref&&(o=e.changeHref(o,c)),
t.on(r,"click",function(){
return location.href=o,!1;
},!0);
}(r);
}
var t=e("biz_common/dom/event.js");
return n;
});define("biz_wap/jsapi/core.js",[],function(){
"use strict";
var e={
ready:function(e){
"undefined"!=typeof WeixinJSBridge&&WeixinJSBridge.invoke?e():document.addEventListener?document.addEventListener("WeixinJSBridgeReady",e,!1):document.attachEvent&&(document.attachEvent("WeixinJSBridgeReady",e),
document.attachEvent("onWeixinJSBridgeReady",e));
},
invoke:function(e,i,n){
this.ready(function(){
return"object"!=typeof WeixinJSBridge?(alert("请在微信中打开此链接！"),!1):void WeixinJSBridge.invoke(e,i,n);
});
},
call:function(e){
this.ready(function(){
return"object"!=typeof WeixinJSBridge?!1:void WeixinJSBridge.call(e);
});
},
on:function(e,i){
this.ready(function(){
return"object"==typeof WeixinJSBridge&&WeixinJSBridge.on?void WeixinJSBridge.on(e,i):!1;
});
}
};
return e;
});define("biz_wap/utils/mmversion.js",[],function(){
"use strict";
function n(){
var n=/MicroMessenger\/([\d\.]+)/i,t=s.match(n);
return t&&t[1]?t[1]:!1;
}
function t(t,r,i){
var e=n();
if(e){
e=e.split("."),t=t.split("."),e.pop();
for(var o,s,u=f["cp"+r],c=0,a=Math.max(e.length,t.length);a>c;++c){
o=e[c]||0,s=t[c]||0,o=parseInt(o)||0,s=parseInt(s)||0;
var p=f.cp0(o,s);
if(!p)return u(o,s);
}
return i||0==r?!0:!1;
}
}
function r(n){
return t(n,0);
}
function i(n,r){
return t(n,1,r);
}
function e(n,r){
return t(n,-1,r);
}
function o(){
return u?"ios":a?"android":"unknown";
}
var s=navigator.userAgent,u=/(iPhone|iPad|iPod|iOS)/i.test(s),c=/Windows\sPhone/i.test(s),a=/(Android)/i.test(s),f={
"cp-1":function(n,t){
return t>n;
},
cp0:function(n,t){
return n==t;
},
cp1:function(n,t){
return n>t;
}
};
return{
get:n,
cpVersion:t,
eqVersion:r,
gtVersion:i,
ltVersion:e,
getPlatform:o,
isWp:c,
isIOS:u,
isAndroid:a
};
});define("biz_common/dom/event.js",[],function(){
"use strict";
function e(e,t,n,o){
if(e){
if(e==window&&"load"==t&&/complete|loaded/.test(document.readyState))return void n({
type:"load"
});
var r=function(e){
var t=n(e);
return t===!1&&(e.stopPropagation&&e.stopPropagation(),e.preventDefault&&e.preventDefault()),
t;
};
return n[t+"_handler"]=r,e.addEventListener?void e.addEventListener(t,r,!!o):e.attachEvent?void e.attachEvent("on"+t,r,!!o):void 0;
}
}
function t(e,t,n,o){
if(e){
var r=n[t+"_handler"]||n;
return e.removeEventListener?void e.removeEventListener(t,r,!!o):e.detachEvent?void e.detachEvent("on"+t,r,!!o):void 0;
}
}
return{
on:e,
off:t
};
});define("appmsg/async.js",["biz_common/utils/string/html.js","biz_common/dom/event.js","biz_wap/utils/ajax.js","biz_common/dom/class.js","biz_common/tmpl.js","appmsg/a.js","appmsg/like.js"],function(require,exports,module){
"use strict";
function saveCopy(e){
var a={};
for(var t in e)if(e.hasOwnProperty(t)){
var n=e[t],i=typeof n;
n="string"==i?n.htmlDecode():n,"object"==i&&(n=saveCopy(n)),a[t]=n;
}
return a;
}
function fillData(e){
var a=e.adRenderData;
if(a.biz_info=a.biz_info||{},a.app_info=a.app_info||{},!a.flag&&a.advertisement_num>0){
if(a.pos_type=a.pos_type||0,window.pos_type=a.pos_type,100==a.pt)window.adData={
usename:a.biz_info.user_name,
pt:a.pt,
traceid:a.traceid,
adid:a.aid,
is_appmsg:!0
};else if(102==a.pt)window.adData={
appname:a.app_info.app_name,
versioncode:a.app_info.version_code,
pkgname:a.app_info.apk_name,
androiddownurl:a.app_info.apk_url,
md5sum:a.app_info.app_md5,
signature:a.app_info.version_code,
rl:a.rl,
traceid:a.traceid,
pt:a.pt,
type:a.type,
adid:a.aid,
is_appmsg:!0
};else if(101==a.pt)window.adData={
appname:a.app_info.app_name,
app_id:a.app_info.app_id,
icon_url:a.app_info.icon_url,
appinfo_url:a.app_info.appinfo_url,
rl:a.rl,
traceid:a.traceid,
pt:a.pt,
type:a.type,
adid:a.aid,
is_appmsg:!0
};else if(103==a.pt||104==a.pt){
var t=a.app_info.down_count||0,n=a.app_info.app_size||0,i=a.app_info.category,o=["万","百万","亿"];
if(t>=1e4){
t/=1e4;
for(var p=0;t>=10&&2>p;)t/=100,p++;
t=t.toFixed(1)+o[p]+"次";
}else t=t.toFixed(1)+"次";
n>=1024?(n/=1024,n=n>=1024?(n/1024).toFixed(2)+"MB":n.toFixed(2)+"KB"):n=n.toFixed(2)+"B",
i=i?i[0]||"其他":"其他",a.app_info.down_count=t,a.app_info.app_size=n,a.app_info.category=i,
window.adData={
appname:a.app_info.app_name,
app_id:a.app_info.app_id,
rl:a.rl,
pkgname:a.app_info.apk_name,
androiddownurl:a.app_info.apk_url,
versioncode:a.app_info.version_code,
appinfo_url:a.app_info.appinfo_url,
traceid:a.traceid,
pt:a.pt,
ticket:a.ticket,
type:a.type,
adid:a.aid,
is_appmsg:!0
};
}
var r=function(e){
var t=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop;
"undefined"!=typeof e&&(t=e);
10>=t&&(document.getElementById("js_top_ad_area").innerHTML=TMPL.render("t_ad",a),
require("appmsg/a.js"),DomEvent.off(window,"scroll",r));
};
if(0==a.pos_type)document.getElementById("js_bottom_ad_area").innerHTML=TMPL.render("t_ad",a),
require("appmsg/a.js");else if(1==a.pos_type){
DomEvent.on(window,"scroll",r);
var d=0;
window.localStorage&&(d=1*localStorage.getItem(key)||0),window.scrollTo(0,d),r(d);
}
}
var s=e.appmsgstat;
window.appmsgstat||(window.appmsgstat=s),s.show&&(!function(){
var e=document.getElementById("js_read_area"),a=document.getElementById("like");
e.style.display="block",a.style.display="inline",s.liked&&Class.addClass(a,"praised"),
a.setAttribute("like",s.liked?"1":"0");
var t=document.getElementById("likeNum"),n=document.getElementById("readNum"),i=s.read_num,o=s.like_num;
i||(i=1),o||(o="赞"),parseInt(i)>1e5?i="100000+":"",parseInt(o)>1e5?o="100000+":"",
n&&(n.innerHTML=i),t&&(t.innerHTML=o);
}(),require("appmsg/like.js"));
}
function getAsyncData(){
ajax({
url:"/mp/getappmsgext?__biz="+biz+"&mid="+mid+"&idx="+idx+"&scene="+source+"&title="+encodeURIComponent(msg_title.htmlDecode())+"&ct="+ct+"&devicetype="+devicetype.htmlDecode()+"&version="+version.htmlDecode()+"&r="+Math.random(),
type:"GET",
async:!1,
success:function(ret){
if(ret)try{
ret=eval("("+ret+")");
var adRenderData={};
if(ret.advertisement_num>0&&ret.advertisement_info&&ret.advertisement_info.length>0){
var d=ret.advertisement_info[0];
adRenderData=saveCopy(d);
}
adRenderData.advertisement_num=ret.advertisement_num,fillData({
adRenderData:adRenderData,
appmsgstat:ret.appmsgstat
});
}catch(e){
return;
}
}
});
}
if(uin&&key){
require("biz_common/utils/string/html.js");
var iswifi=!1,ua=navigator.userAgent,DomEvent=require("biz_common/dom/event.js"),offset=200,ajax=require("biz_wap/utils/ajax.js"),Class=require("biz_common/dom/class.js"),TMPL=require("biz_common/tmpl.js");
if(window.adRenderData||window.appmsgstat)fillData({
adRenderData:saveCopy(window.adRenderData||{
flag:!0
}),
appmsgstat:window.appmsgstat||{
flag:!0
}
});else{
var js_toobar=document.getElementById("js_toobar"),innerHeight=window.innerHeight||document.documentElement.clientHeight,onScroll=function(){
var e=window.pageYOffset||document.documentElement.scrollTop,a=js_toobar.offsetTop;
e+innerHeight+offset>=a&&(getAsyncData(),DomEvent.off(window,"scroll",onScroll));
};
iswifi?(DomEvent.on(window,"scroll",onScroll),onScroll()):getAsyncData();
}
}
});define("biz_wap/ui/lazyload_img.js",["biz_wap/utils/mmversion.js","biz_common/dom/event.js","biz_common/dom/attr.js","biz_common/ui/imgonepx.js"],function(t){
"use strict";
function i(){
var t=this.images;
if(!t||t.length<=0)return!1;
for(var i=window.pageYOffset||document.documentElement.scrollTop,e=window.innerHeight||document.documentElement.clientHeight,o=e+40,n=this.offset||20,s=+new Date,a=[],h=this.sw,c=0,d=t.length;d>c;c++){
var u=t[c],w=u.el.offsetTop;
if(!u.show&&("wifi"==networkType||i>=w&&i<=w+u.height+n||w>i&&i+o+n>w)){
var p=u.src,f=this;
this.changeSrc&&(p=this.changeSrc(u.el,p)),u.el.onerror=function(){
!!f.onerror&&f.onerror(p);
},u.el.onload=function(){
var t=this;
m(t,"height","auto","important"),t.getAttribute("_width")?m(t,"width",t.getAttribute("_width"),"important"):m(t,"width","auto","important");
},l(u.el,"src",p),a.push(p),u.show=!0,m(u.el,"visibility","visible","important");
}
r.isWp&&1*u.el.width>h&&(u.el.width=h);
}
a.length>0&&this.detect&&this.detect({
time:s,
loadList:a,
scrollTop:i
});
}
function e(){
var t=document.getElementsByTagName("img"),e=[],o=this.container,n=this.attrKey||"data-src",r=o.offsetWidth,s=0;
o.currentStyle?s=o.currentStyle.width:"undefined"!=typeof getComputedStyle&&(s=getComputedStyle(o).width),
this.sw=1*s.replace("px","");
for(var a=0,c=t.length;c>a;a++){
var d=t.item(a),u=l(d,n);
if(u){
var w=100;
if(d.dataset&&d.dataset.ratio){
var p=1*d.dataset.ratio,f=1*d.dataset.w||r;
"number"==typeof p&&p>0?(f=r>=f?f:r,w=f*p,d.style.width&&d.setAttribute("_width",d.style.width),
m(d,"width",f+"px","important"),m(d,"visibility","visible","important"),d.setAttribute("src",h)):m(d,"visibility","hidden","important");
}else m(d,"visibility","hidden","important");
m(d,"height",w+"px","important"),e.push({
el:d,
src:u,
height:w,
show:!1
});
}
}
this.images=e,i.call(this);
}
function o(t){
var e=this,o=e.timer;
clearTimeout(o),e.timer=setTimeout(function(){
i.call(e,t);
},300);
}
function n(t){
s.on(window,"scroll",function(i){
o.call(t,i);
}),s.on(window,"load",function(i){
e.call(t,i);
}),s.on(document,"touchmove",function(i){
o.call(t,i);
});
}
var r=t("biz_wap/utils/mmversion.js"),s=t("biz_common/dom/event.js"),a=t("biz_common/dom/attr.js"),l=a.attr,m=a.setProperty,h=t("biz_common/ui/imgonepx.js");
return n;
});define("biz_common/log/jserr.js",[],function(){
function e(e,n){
return e?(r.replaceStr&&(e=e.replace(r.replaceStr,"")),n&&(e=e.substr(0,n)),encodeURIComponent(e.replace("\n",","))):"";
}
var r={};
return window.onerror=function(n,o,t,c,i){
return"Script error."==n||o?"undefined"==typeof r.key||"undefined"==typeof r.reporturl?!0:(setTimeout(function(){
c=c||window.event&&window.event.errorCharacter||0;
var l=[];
if(l.push("msg:"+e(n,100)),o&&(o=o.replace(/[^\,]*\/js\//g,"")),l.push("url:"+e(o,200)),
l.push("line:"+t),l.push("col:"+c),i&&i.stack)l.push("info:"+e(i.stack.toString(),200));else if(arguments.callee){
for(var s=[],u=arguments.callee.caller,a=3;u&&--a>0&&(s.push(u.toString()),u!==u.caller);)u=u.caller;
s=s.join(","),l.push("info:"+e(s,200));
}
var p=new Image;
if(p.src=(r.reporturl+"&key="+r.key+"&content="+l.join("||")).substr(0,1024),window.console&&window.console.log){
var f=l.join("\n");
try{
f=decodeURIComponent(f);
}catch(d){}
console.log(f);
}
},0),!0):!0;
},function(e){
r=e;
};
});define("appmsg/index.js",["biz_common/log/jserr.js","biz_wap/ui/lazyload_img.js","appmsg/async.js","biz_common/dom/event.js","biz_wap/utils/mmversion.js","biz_wap/jsapi/core.js","appmsg/outer_link.js","appmsg/review_image.js","appmsg/iframe.js","appmsg/cdn_speed_report.js","appmsg/page_pos.js","appmsg/comment.js","appmsg/share.js","appmsg/report_and_source.js","appmsg/report.js"],function(e){
"use strict";
if(window.page_endtime=+new Date,window.logs={},"mp.weixin.qq.com"==location.host){
var t=e("biz_common/log/jserr.js");
t({
key:0,
reporturl:"http://mp.weixin.qq.com/mp/jsreport?1=1",
replaceStr:/http(s)?:(.*?)js\//g
});
}
!function(){
var e=document.getElementById("js_iframetest");
e&&-1!=navigator.userAgent.indexOf("MicroMessenger")&&Math.random()<.001&&(e.innerHTML='<iframe src="http://mp.weixin.qq.com/mp/iframetest#wechat_redirect"></iframe>');
}();
var n=function(e){
var t=new Image;
t.onerror=function(){
e(!1);
},t.onload=function(){
e(1==t.width);
},t.src="data:image/webp;base64,UklGRiwAAABXRUJQVlA4ICAAAAAUAgCdASoBAAEAL/3+/3+CAB/AAAFzrNsAAP5QAAAAAA==";
},i=function(e){
var t=new Image;
t.onerror=function(){
e(!1);
},t.onload=function(){
e(1==t.width);
},t.src="data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAsAAAABBxAREYiI/gcAAABWUDggGAAAADABAJ0BKgEAAQABABwlpAADcAD+/gbQAA==";
},o=function(e){
n(function(t){
t?i(e):!!e&&e(!1);
});
};
window.webp=!1,o(function(t){
window.webp=t,t&&window.localStorage&&window.localStorage.setItem&&window.localStorage.setItem("webp","1");
var n=document.getElementById("js_cover");
if(n){
var i=n.getAttribute("data-src");
if(i){
if(0==i.indexOf("http://mmbiz.qpic.cn")){
for(;-1!=i.indexOf("?tp=webp");)i=i.replace("?tp=webp","");
t&&(i+="?tp=webp");
}
n.setAttribute("src",i),n.removeAttribute("data-src");
}
}
window.logs.img={
download:{}
};
var o=e("biz_wap/ui/lazyload_img.js");
new o({
attrKey:"data-src",
changeSrc:function(e,t){
if(!t)return"";
for(var n=t;-1!=n.indexOf("?tp=webp");)n=n.replace("?tp=webp","");
0==t.indexOf("http://mmbiz.qpic.cn")&&(e.dataset&&e.dataset.s&&(n=n.replace(/\/0$/,"/640")),
window.webp&&(n+="?tp=webp"));
var i=/^http\:\/\/(a|b)(\d)+\.photo\.store\.qq\.com/g;
return n.replace(i,"http://m.qpic.cn");
},
onerror:function(e){
if(e&&0==e.indexOf("http://mmbiz.qpic.cn")){
var t=10;
/\?tp\=webp$/.test(e)&&(t=11);
var n=new Image;
n.src="http://mp.weixin.qq.com/mp/jsreport?key="+t+"&content="+encodeURIComponent(e)+"&r="+Math.random();
}
},
detect:function(e){
if(e&&e.time&&e.loadList){
var t=e.time,n=e.loadList;
window.logs.img.download[t]=n;
}
},
container:document.getElementById("page-content")
});
}),e("appmsg/async.js");
var r=e("biz_common/dom/event.js"),a=e("biz_wap/utils/mmversion.js"),s=e("biz_wap/jsapi/core.js");
!function(){
var e=document.getElementById("post-user");
e&&(r.on(e,"click",function(){
return s.invoke("profile",{
username:user_name,
scene:"57"
}),!1;
}),a.isWp&&e&&e.setAttribute("href","weixin://profile/"+user_name));
}(),function(){
location.href.match(/fontScale=\d+/)&&a.isIOS&&s.on("menu:setfont",function(e){
e.fontScale<=0&&(e.fontScale=100),document.getElementsByTagName("html").item(0).style.webkitTextSizeAdjust=e.fontScale+"%",
document.getElementsByTagName("html").item(0).style.lineHeight=160/e.fontScale;
});
}();
var p=e("appmsg/outer_link.js");
new p({
container:document.getElementById("js_content"),
changeHref:function(e,t){
return e&&0==e.indexOf("http://mp.weixin.qq.com/s")&&(e=e.replace(/#rd\s*$/,"#wechat_redirect")),
0!=e.indexOf("http://mp.weixin.qq.com/mp/redirect")?"http://"+location.host+"/mp/redirect?url="+encodeURIComponent(e)+"&action=appmsg_redirect&uin="+uin+"&biz="+biz+"&mid="+mid+"&idx="+idx+"&type="+t+"&scene=0":e;
}
});
var m=e("appmsg/review_image.js");
new m({
container:document.getElementById("img-content")
}),e("appmsg/iframe.js"),e("appmsg/cdn_speed_report.js"),e("appmsg/page_pos.js"),
e("appmsg/comment.js"),setTimeout(function(){
e("appmsg/share.js"),e("appmsg/report_and_source.js"),function(){
var e=document.getElementById("js_pc_qr_code_img");
if(e&&-1==navigator.userAgent.indexOf("MicroMessenger")){
var t=10000004,n=document.referrer;
0==n.indexOf("http://weixin.sogou.com")?t=10000001:0==n.indexOf("https://wx.qq.com")&&(t=10000003),
e.setAttribute("src","/mp/qrcode?scene="+t+"&size=102&__biz="+biz),document.getElementById("js_pc_qr_code").style.display="block";
}
}(),e("appmsg/report.js");
},1e3);
});