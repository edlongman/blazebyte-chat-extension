/*!
 * Amplify 1.0a1
 * 
 * Copyright 2011 appendTo LLC. (http://appendto.com/team)
 * Dual licensed under the MIT or GPL licenses.
 * http://appendto.com/open-source-licenses
 * 
 * http://amplifyjs.com
 */
(function(g){var i=[].slice,c={};this.amplify={publish:function(a){var d=i.call(arguments,1),b;if(!c[a])return true;g.each(c[a],function(e,f){return b=f.callback.apply(f.context,d)});return b!==false},subscribe:function(a,d,b,e){if(arguments.length===3&&typeof b==="number"){e=b;b=d;d=null}if(arguments.length===2){b=d;d=null}e=e||10;c[a]||(c[a]=[]);for(var f=c[a].length-1,h={callback:b,context:d,priority:e};f>=0;f--)if(c[a][f].priority<=e){c[a].splice(f+1,0,h);return b}c[a].unshift(h);return b},unsubscribe:function(a,
d){c[a]&&g.each(c[a],function(b,e){if(e.callback===d){c[a].splice(b,1);return false}})}}})(jQuery);
/*!
 * Amplify Store - Persistent Client-Side Storage 1.0a1
 * 
 * Copyright 2011 appendTo LLC. (http://appendto.com/team)
 * Dual licensed under the MIT or GPL licenses.
 * http://appendto.com/open-source-licenses
 * 
 * http://amplifyjs.com
 */
(function(f,h,l){function j(d,c){var b=c.__amplify__?JSON.parse(c.__amplify__):{};f.store.addType(d,function(a,e,i){var g=e,k=(new Date).getTime();if(!a){g={};for(a in b){e=(e=c[a])?JSON.parse(e):{expires:-1};if(e.expires&&e.expires<=k){delete c[a];delete b[a]}else g[a.replace(/^__amplify__/,"")]=e.data}c.__amplify__=JSON.stringify(b);return g}a="__amplify__"+a;if(e===l){if(b[a]){e=(e=c[a])?JSON.parse(e):{expires:-1};if(e.expires&&e.expires<=k){delete c[a];delete b[a]}else return e.data}}else if(e===
null){delete c[a];delete b[a]}else{c[a]=JSON.stringify({data:e,expires:i.expires?k+i.expires:null});b[a]=true}c.__amplify__=JSON.stringify(b);return g})}f.store=function(d,c,b){var a=f.store.type;if(b&&b.type&&b.type in f.store.types)a=b.type;return f.store.types[a](d,c,b||{})};h.extend(f.store,{types:{},type:null,addType:function(d,c){if(!this.type)this.type=d;this.types[d]=c;f.store[d]=function(b,a,e){return f.store(b,a,h.extend({type:d},e))}}});h.each(["localStorage","sessionStorage"],function(d,
c){try{window[c].getItem&&j(c,window[c])}catch(b){}});window.globalStorage&&j("globalStorage",window.globalStorage[window.location.hostname]);(function(){var d=h("<div>").hide().appendTo("html")[0],c;if(d.addBehavior){d.addBehavior("#default#userdata");d.load("amplify");c=d.getAttribute("amplify")?JSON.parse(d.getAttribute("amplify")):{};f.store.addType("userData",function(b,a,e){var i=a,g=(new Date).getTime();if(!b){i={};for(b in c){a=(a=d.getAttribute(b))?JSON.parse(a):{expires:-1};if(a.expires&&
a.expires<=g){d.removeAttribute(b);delete c[b]}else i[b]=a.data}d.setAttribute("amplify",JSON.stringify(c));d.save("amplify");return i}b=b.replace(/[^-._0-9A-Za-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u37f-\u1fff\u200c-\u200d\u203f\u2040\u2070-\u218f]/g,"-");if(a===l){if(b in c){a=(a=d.getAttribute(b))?JSON.parse(a):{expires:-1};if(a.expires&&a.expires<=g){d.removeAttribute(b);delete c[b]}else return a.data}}else if(a===null){d.removeAttribute(b);delete c[b]}else{d.setAttribute(b,JSON.stringify({data:a,
expires:e.expires?g+e.expires:null}));c[b]=true}d.setAttribute("amplify",JSON.stringify(c));d.save("amplify");return i})}})();j("memory",{});h.cookie&&h.support.cookie&&f.store.addType("cookie",function(d,c,b){return h.cookie(d,c,{expires:b.expires||99E9,path:"/"})})})(amplify,jQuery);
