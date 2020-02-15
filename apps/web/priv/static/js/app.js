function uc(t,n){if(0==t.byteLength)return n;if(0==n.byteLength)return t;var e=new Uint8Array(t.byteLength+n.byteLength);return e.set(t,0),e.set(n,t.byteLength),e}function ar(t){return t.v instanceof ArrayBuffer?new Uint8Array(t.v):t.v instanceof Uint8Array?t.v:Array.isArray(t.v)?new Uint8Array(t.v):new Uint8Array(utf8_toByteArray(t.v).v)}function fl(t){return t.reduce(function(t,n){return uc(t,n instanceof Uint8Array?n:Array.isArray(n)?fl(n):new Uint8Array([n]))},new Uint8Array)}function atom(t){return{t:100,v:utf8_toByteArray(t).v}}function bin(t){return{t:109,v:t instanceof ArrayBuffer?new Uint8Array(t):t instanceof Uint8Array?t:utf8_toByteArray(t).v}}function tuple(){return{t:104,v:Array.apply(null,arguments)}}function list(){return{t:108,v:Array.apply(null,arguments)}}function number(t){return{t:98,v:t}}function enc(t){return fl([131,ein(t)])}function ein(o){return Array.isArray(o)?en_108({t:108,v:o}):eval("en_"+o.t)(o)}function en_undefined(t){return[106]}function en_98(t){return[98,t.v>>>24,t.v>>>16&255,t.v>>>8&255,255&t.v]}function en_97(t){return[97,t.v]}function en_106(t){return[106]}function en_100(t){return[100,t.v.length>>>8,255&t.v.length,ar(t)]}function en_107(t){return[107,t.v.length>>>8,255&t.v.length,ar(t)]}function en_104(t){for(var n=t.v.length,e=[],r=0;r<n;r++)e[r]=ein(t.v[r]);return[104,n,e]}function en_109(t){var n=t.v instanceof ArrayBuffer?t.v.byteLength:t.v.length;return[109,n>>>24,n>>>16&255,n>>>8&255,255&n,ar(t)]}function en_108(t){for(var n=t.v.length,e=[],r=0;r<n;r++)e.push(ein(t.v[r]));return 0==t.v.length?[106]:[108,n>>>24,n>>>16&255,n>>>8&255,255&n,e,106]}function nop(t){return[]}function big(t){for(var n=1==t?sx.getUint8(ix++):sx.getInt32((a=ix,ix+=4,a)),e=0,r=sx.getUint8(ix++),o=n;o-- >0;)e=256*e+sx.getUint8(ix+o);return ix+=n,e*(0==r?1:-1)}function int(t){return 1==t?sx.getUint8(ix++):sx.getInt32((a=ix,ix+=4,a))}function dec(t){if(sx=new DataView(t),ix=0,131!==sx.getUint8(ix++))throw"BERT?";return din()}function str(t){var n=2==t?sx.getUint16(ix):sx.getInt32(ix);ix+=t;var e=sx.buffer.slice(ix,ix+=n);return 2==t?utf8_dec(e):e}function run(t){var n=1==t?sx.getUint8(ix):sx.getUint32(ix),e=[];ix+=t;for(var r=0;r<n;r++)e.push(din());return 4==t&&ix++,e}function din(){var t,n=sx.getUint8(ix++);switch(n){case 97:t=[int,1];break;case 98:t=[int,4];break;case 100:t=[str,2];break;case 110:t=[big,1];break;case 111:t=[big,4];break;case 104:t=[run,1];break;case 107:t=[str,2];break;case 108:t=[run,4];break;case 109:t=[str,4];break;default:t=[nop,0]}return{t:n,v:t[0](t[1])}}function querySourceRaw(t){var n,e=document.getElementById(t);if(!e)return"";switch(e.tagName){case"FIELDSET":n=document.querySelector('[id="'+t+'"] :checked'),n=n?n.value:"";break;case"INPUT":switch(e.getAttribute("type")){case"radio":case"checkbox":n=e.checked?e.value:"";break;case"date":n=new Date(Date.parse(e.value))||"";break;case"calendar":n=pickers[e.id]._d||"";break;default:var r=e.contentEditable;n=r&&"true"===r?e.innerHTML:e.value}break;default:var r=e.contentEditable;n=r&&"true"===r?e.innerHTML:e.value}return n}function querySource(t){var n=querySourceRaw(t);return n instanceof Date?tuple(number(n.getFullYear()),number(n.getMonth()+1),number(n.getDate())):utf8_toByteArray(n)}function nop(){}function bullet(t){return $conn.url=t,$conn}function xport(){return!(maxReconnects<=ct)&&transports[ct++%transports.length]}function reconnect(){setTimeout(function(){connect()},reconnectDelay)}function next(){return $conn.port=xport(),!!$conn.port&&connect()}function connect(){return $conn.port.channel=$conn.port.creator($conn.url),$conn.port.channel?($conn.port.channel.onmessage=function(t){$conn.onmessage(t)},$conn.port.channel.onopen=function(){$conn.port.heart&&(heartbeat=setInterval(function(){$conn.port.onheartbeat()},$conn.port.interval)),$conn.onopen(),$conn.onconnect()},$conn.port.channel.onclose=function(){$conn.onclose(),clearInterval(heartbeat),reconnect()},$conn):next()}function N2O_start(){ws=new bullet(protocol+host+(""==port?"":":"+port)+"/ws"+querystring),ws.onmessage=function(t){for(var n=0;n<protos.length;n++)if(p=protos[n],"ok"==p.on(t,p["do"]).status)return},ws.onopen=function(){active||(console.log("Connect"),ws.send("N2O,"+transition.pid),active=!0)},ws.onclose=function(){active=!1,console.log("Disconnect")},next()}function qi(t){return document.getElementById(t)}function qs(t){return document.querySelector(t)}function qn(t){return document.createElement(t)}function is(t,n,e){return 106!=t.t&&(t.v.length===n&&t.v[0].v===e)}function co(t){return match=document.cookie.match(new RegExp(t+"=([^;]+)")),match?match[1]:void 0}function utf8_toByteArray(t){var n=[];return void 0!==t&&null!==t&&(n=new TextEncoder("utf-8").encode(t)),{t:107,v:n}}function utf8_dec(t){return(new TextDecoder).decode(t)}function validateSources(t){return t.reduce(function(t,n){var e=new CustomEvent("validation");e.initCustomEvent("validation",!0,!0,querySourceRaw(n));var r=qi(n),o=r&&r.validation,a=!o||o&&r.dispatchEvent(e);return console.log(a),r&&(r.style.background=a?"":"pink"),a&&t},!0)}function closeHelp(){qi("help-callout").style.display="none"}function clearAltForm(){qi("alt_text").value="",slider=qi("alt_vote"),slider.value=0,onSliderChange(slider)}function onSliderChange(t){t.classList.remove("positive"),t.classList.remove("negative");var n=qi(t.id+"text");t.value>0&&(t.classList.add("positive"),n.innerHTML="&#65291;"+t.value),t.value<0&&(t.classList.add("negative"),n.innerHTML="&mdash;"+-t.value),0==t.value&&(n.innerHTML="&empty;")}function voteSubmit(){for(var t=document.querySelectorAll('#alts input[id^="vote"]'),n=[],e=0;e<t.length;e++)n.push([t[e].id.substring(4),t[e].value]);return data={title:qi("title")?qi("title").value:"",name:qi("name").value,votes:n,alt_text:qi("alt_text").value,alt_vote:qi("alt_vote").value},vote(data),!1}function showResults(){view_results()}function statusChangeCallback(t){console.log("statusChangeCallback"),"connected"===t.status?fb_login(t.authResponse.accessToken):"not_authorized"===t.status?alert("Please log into this app."):alert("Please log into Facebook.")}function onLoginClick(){FB.login(function(t){statusChangeCallback(t)},{scope:"public_profile"})}try{module.exports={dec:dec,enc:enc}}catch(e){}var $client={};$client.on=function(t,n){try{msg=JSON.parse(t.data),debug&&console.log(JSON.stringify(msg)),"function"==typeof n&&msg&&n(msg);for(var e=0;e<$bert.protos.length;e++)if(p=$bert.protos[e],"ok"==p.on(msg,p["do"]).status)return{status:"ok"}}catch(r){return{status:"error"}}return{status:"ok"}},function(){window.requestAnimationFrame=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame}(),$ws={heart:!0,interval:4e3,creator:function(t){return!!window.WebSocket&&new window.WebSocket(t)},onheartbeat:function(){this.channel.send("PING")}},$conn={onopen:nop,onmessage:nop,onclose:nop,onconnect:nop,send:function(t){this.port.channel&&this.port.channel.send(t)},close:function(){this.port.channel&&this.port.channel.close()}},ct=0,transports=[$ws],heartbeat=null,reconnectDelay=1e3,maxReconnects=100;var active=!1,debug=!1,session="site-sid",protocol="https:"==window.location.protocol?"wss://":"ws://",querystring=window.location.pathname+window.location.search,host=null==transition.host?window.location.hostname:transition.host,port=null==transition.port?window.location.port:transition.port,$io={};$io.on=function onio(r,cb){if(!is(r,3,"io"))return{status:""};try{return eval(utf8_dec(r.v[1].v)),"function"==typeof cb&&cb(r),{status:"ok"}}catch(e){return console.log(e),{status:""}}};var $file={};$file.on=function(t,n){return is(t,10,"ftp")?("function"==typeof n&&n(t),{status:"ok"}):{status:""}};var $bin={};$bin.on=function(t,n){return is(t,2,"bin")?("function"==typeof n&&n(t),{status:"ok"}):{status:""}};var $bert={};$bert.protos=[$io,$bin,$file],$bert.on=function(t,n){if(Blob.prototype.isPrototypeOf(t.data)&&(t.data.length>0||t.data.size>0)){var e=new FileReader;return e.addEventListener("loadend",function(){try{erlang=dec(e.result),debug&&console.log(JSON.stringify(erlang)),"function"==typeof n&&n(erlang);for(var t=0;t<$bert.protos.length;t++)if(p=$bert.protos[t],"ok"==p.on(erlang,p["do"]).status)return}catch(r){console.log(r)}}),e.readAsArrayBuffer(t.data),{status:"ok"}}return{status:"error",desc:"data"}};var protos=[$bert];try{module.exports={dec:utf8_dec,enc:utf8_toByteArray}}catch(e){}!function(){function t(t,n){n=n||{bubbles:!1,cancelable:!1,detail:void 0};var e=document.createEvent("CustomEvent");return e.initCustomEvent(t,n.bubbles,n.cancelable,n.detail),e}t.prototype=window.Event.prototype,window.CustomEvent=t}(),protos=[$client,$bert],N2O_start();