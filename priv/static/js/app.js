try{module.exports={dec:dec,enc:enc}}catch(e){}function uc(u1,u2){if(u1.byteLength==0)return u2;if(u2.byteLength==0)return u1;var a=new Uint8Array(u1.byteLength+u2.byteLength);a.set(u1,0);a.set(u2,u1.byteLength);return a}function ar(o){return o.v instanceof ArrayBuffer?new Uint8Array(o.v):o.v instanceof Uint8Array?o.v:Array.isArray(o.v)?new Uint8Array(o.v):new Uint8Array(utf8_toByteArray(o.v).v)}function fl(a){return a.reduce(function(f,t){return uc(f,t instanceof Uint8Array?t:Array.isArray(t)?fl(t):new Uint8Array([t]))},new Uint8Array)}function atom(o){return{t:100,v:utf8_toByteArray(o).v}}function bin(o){return{t:109,v:o instanceof ArrayBuffer?new Uint8Array(o):o instanceof Uint8Array?o:utf8_toByteArray(o).v}}function tuple(){return{t:104,v:Array.apply(null,arguments)}}function list(){return{t:108,v:Array.apply(null,arguments)}}function number(o){return{t:98,v:o}}function enc(o){return fl([131,ein(o)])}function ein(o){return Array.isArray(o)?en_108({t:108,v:o}):eval("en_"+o.t)(o)}function en_undefined(o){return[106]}function en_98(o){return[98,o.v>>>24,o.v>>>16&255,o.v>>>8&255,o.v&255]}function en_97(o){return[97,o.v]}function en_106(o){return[106]}function en_100(o){return[100,o.v.length>>>8,o.v.length&255,ar(o)]}function en_107(o){return[107,o.v.length>>>8,o.v.length&255,ar(o)]}function en_104(o){var l=o.v.length,r=[];for(var i=0;i<l;i++)r[i]=ein(o.v[i]);return[104,l,r]}function en_109(o){var l=o.v instanceof ArrayBuffer?o.v.byteLength:o.v.length;return[109,l>>>24,l>>>16&255,l>>>8&255,l&255,ar(o)]}function en_108(o){var l=o.v.length,r=[];for(var i=0;i<l;i++)r.push(ein(o.v[i]));return o.v.length==0?[106]:[108,l>>>24,l>>>16&255,l>>>8&255,l&255,r,106]}function nop(b){return[]}function big(b){var sk=b==1?sx.getUint8(ix++):sx.getInt32((a=ix,ix+=4,a));var ret=0,sig=sx.getUint8(ix++),count=sk;while(count-- >0){ret=256*ret+sx.getUint8(ix+count)}ix+=sk;return ret*(sig==0?1:-1)}function int(b){return b==1?sx.getUint8(ix++):sx.getInt32((a=ix,ix+=4,a))}function dec(d){sx=new DataView(d);ix=0;if(sx.getUint8(ix++)!==131)throw"BERT?";return din()}function str(b){var dv,sz=b==2?sx.getUint16(ix):sx.getInt32(ix);ix+=b;var r=sx.buffer.slice(ix,ix+=sz);return b==2?utf8_dec(r):r}function run(b){var sz=b==1?sx.getUint8(ix):sx.getUint32(ix),r=[];ix+=b;for(var i=0;i<sz;i++)r.push(din());if(b==4)ix++;return r}function din(){var c=sx.getUint8(ix++),x;switch(c){case 97:x=[int,1];break;case 98:x=[int,4];break;case 100:x=[str,2];break;case 110:x=[big,1];break;case 111:x=[big,4];break;case 104:x=[run,1];break;case 107:x=[str,2];break;case 108:x=[run,4];break;case 109:x=[str,4];break;default:x=[nop,0]}return{t:c,v:x[0](x[1])}}var $client={};$client.on=function onclient(evt,callback){try{msg=JSON.parse(evt.data);if(debug)console.log(JSON.stringify(msg));if(typeof callback=="function"&&msg)callback(msg);for(var i=0;i<$bert.protos.length;i++){p=$bert.protos[i];if(p.on(msg,p.do).status=="ok")return{status:"ok"}}}catch(ex){return{status:"error"}}return{status:"ok"}};function querySourceRaw(Id){var val,el=document.getElementById(Id);if(!el)return"";switch(el.tagName){case"FIELDSET":val=document.querySelector('[id="'+Id+'"] :checked');val=val?val.value:"";break;case"INPUT":switch(el.getAttribute("type")){case"radio":case"checkbox":val=el.checked?el.value:"";break;case"date":val=new Date(Date.parse(el.value))||"";break;case"calendar":val=pickers[el.id]._d||"";break;default:var edit=el.contentEditable;if(edit&&edit==="true")val=el.innerHTML;else val=el.value}break;default:var edit=el.contentEditable;if(edit&&edit==="true")val=el.innerHTML;else val=el.value}return val}function querySource(Id){var qs=querySourceRaw(Id);if(qs instanceof Date){return tuple(number(qs.getFullYear()),number(qs.getMonth()+1),number(qs.getDate()))}else{return utf8_toByteArray(qs)}}(function(){window.requestAnimationFrame=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame})();$ws={heart:true,interval:4e3,creator:function(url){return window.WebSocket?new window.WebSocket(url):false},onheartbeat:function(){this.channel.send("PING")}};$conn={onopen:nop,onmessage:nop,onclose:nop,onconnect:nop,send:function(data){if(this.port.channel)this.port.channel.send(data)},close:function(){if(this.port.channel)this.port.channel.close()}};ct=0;transports=[$ws];heartbeat=null;reconnectDelay=1e3;maxReconnects=100;function nop(){}function bullet(url){$conn.url=url;return $conn}function xport(){return maxReconnects<=ct?false:transports[ct++%transports.length]}function reconnect(){setTimeout(function(){connect()},reconnectDelay)}function next(){$conn.port=xport();return $conn.port?connect():false}function connect(){$conn.port.channel=$conn.port.creator($conn.url);if(!$conn.port.channel)return next();$conn.port.channel.onmessage=function(e){$conn.onmessage(e)};$conn.port.channel.onopen=function(){if($conn.port.heart)heartbeat=setInterval(function(){$conn.port.onheartbeat()},$conn.port.interval);$conn.onopen();$conn.onconnect()};$conn.port.channel.onclose=function(){$conn.onclose();clearInterval(heartbeat);reconnect()};return $conn}var active=false,debug=false,session="site-sid",protocol=window.location.protocol=="https:"?"wss://":"ws://",querystring=window.location.pathname+window.location.search,host=null==transition.host?window.location.hostname:transition.host,port=null==transition.port?window.location.port:transition.port;function N2O_start(){ws=new bullet(protocol+host+(port==""?"":":"+port)+"/ws"+querystring);ws.onmessage=function(evt){for(var i=0;i<protos.length;i++){p=protos[i];if(p.on(evt,p.do).status=="ok")return}};ws.onopen=function(){if(!active){console.log("Connect");ws.send("N2O,"+transition.pid);active=true}};ws.onclose=function(){active=false;console.log("Disconnect")};next()}function qi(name){return document.getElementById(name)}function qs(name){return document.querySelector(name)}function qn(name){return document.createElement(name)}function is(x,num,name){return x.t==106?false:x.v.length===num&&x.v[0].v===name}function co(name){match=document.cookie.match(new RegExp(name+"=([^;]+)"));return match?match[1]:undefined}var $io={};$io.on=function onio(r,cb){if(is(r,3,"io")){try{eval(utf8_dec(r.v[1].v));if(typeof cb=="function")cb(r);return{status:"ok"}}catch(e){console.log(e);return{status:""}}}else return{status:""}};var $file={};$file.on=function onfile(r,cb){if(is(r,10,"ftp")){if(typeof cb=="function")cb(r);return{status:"ok"}}else return{status:""}};var $bin={};$bin.on=function onbin(r,cb){if(is(r,2,"bin")){if(typeof cb=="function")cb(r);return{status:"ok"}}else return{status:""}};var $bert={};$bert.protos=[$io,$bin,$file];$bert.on=function onbert(evt,cb){if(Blob.prototype.isPrototypeOf(evt.data)&&(evt.data.length>0||evt.data.size>0)){var r=new FileReader;r.addEventListener("loadend",function(){try{erlang=dec(r.result);if(debug)console.log(JSON.stringify(erlang));if(typeof cb=="function")cb(erlang);for(var i=0;i<$bert.protos.length;i++){p=$bert.protos[i];if(p.on(erlang,p.do).status=="ok")return}}catch(e){console.log(e)}});r.readAsArrayBuffer(evt.data);return{status:"ok"}}else return{status:"error",desc:"data"}};var protos=[$bert];function validateSources(list){return list.reduce(function(acc,x){var event=new CustomEvent("validation");event.initCustomEvent("validation",true,true,querySourceRaw(x));var el=qi(x),listener=el&&el.validation,res=!listener||listener&&el.dispatchEvent(event);console.log(res);if(el)el.style.background=res?"":"pink";return res&&acc},true)}(function(){function CustomEvent(event,params){params=params||{bubbles:false,cancelable:false,detail:undefined};var evt=document.createEvent("CustomEvent");evt.initCustomEvent(event,params.bubbles,params.cancelable,params.detail);return evt}CustomEvent.prototype=window.Event.prototype;window.CustomEvent=CustomEvent})();protos=[$client,$bert];N2O_start();function closeHelp(e){e.preventDefault();qi("help-callout").style.display="none"}function clearAltForm(){qi("alt_text").value=""}function onSliderChange(slider){console.log(slider.value);var text=qi(slider.id+"text");text.classList.remove("bg-success");text.classList.remove("bg-danger");if(slider.value>0){text.classList.add("bg-success");text.innerHTML="+"+slider.value}if(slider.value<0){text.classList.add("bg-danger");text.innerHTML="&minus;"+-slider.value}if(slider.value==0){text.innerHTML="&empty;"}}function voteSubmit(event){event.preventDefault();if(!validateName()){return false}var x=document.querySelectorAll('#alts input[id^="vote"]');var votes=[];for(var i=0;i<x.length;i++){votes.push([x[i].id.substring(4),x[i].value])}data={title:qi("title")?qi("title").value:"",name:qi("name").value,votes:votes,alt_text:qi("alt_text").value};vote(data);return false}function validateName(){var text=qi("name").value.trim();if(text===""){qi("name").classList.add("is-invalid");return false}qi("name").classList.remove('is-invalid"');return true}function statusChangeCallback(response){console.log("statusChangeCallback");if(response.status==="connected"){fb_login(response.authResponse.accessToken)}else if(response.status==="not_authorized"){alert("Please log into this app.")}else{alert("Please log into Facebook.")}}function checkLoginState(){FB.getLoginStatus(function(response){statusChangeCallback(response)})}try{module.exports={dec:utf8_dec,enc:utf8_toByteArray}}catch(e){}function utf8_toByteArray(str){var byteArray=[];if(str!==undefined&&str!==null)byteArray=new TextEncoder("utf-8").encode(str);return{t:107,v:byteArray}}function utf8_dec(ab){return(new TextDecoder).decode(ab)}