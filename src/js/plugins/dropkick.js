/* eslint-disable */
!function(e){function t(i){if(s[i])return s[i].exports;var a=s[i]={i:i,l:!1,exports:{}};return e[i].call(a.exports,a,a.exports,t),a.l=!0,a.exports}var s={};t.m=e,t.c=s,t.d=function(e,s,i){t.o(e,s)||Object.defineProperty(e,s,{configurable:!1,enumerable:!0,get:i})},t.n=function(e){var s=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(s,"a",s),s},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=0)}([function(e,t,s){s(1),e.exports=s(4)},function(e,t,s){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},n=function(){function e(e,t){for(var s=0;s<t.length;s++){var i=t[s];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,s,i){return s&&e(t.prototype,s),i&&e(t,i),t}}(),o=s(2),d=i(o),r=s(3),c=i(r),h=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),u=window.parent!==window.self,f=void 0,p=function(){function e(t,s){a(this,e),this.sel=t;var i=void 0,l=void 0,n=window.Dropkick;for("string"==typeof this.sel&&"#"===this.sel[0]&&(this.sel=document.getElementById(t.substr(1))),i=0;i<n.uid;i++)if((l=n.cache[i])instanceof e&&l.data.select===this.sel)return d.default.extend(l.data.settings,s),l;if(!this.sel)throw"You must pass a select to DropKick";if(this.sel.length<1)throw"You must have options inside your <select>: "+t;if("SELECT"===this.sel.nodeName)return this.init(this.sel,s)}return n(e,[{key:"init",value:function(t,s){var i,a=window.Dropkick,l=e.build(t,"dk"+a.uid);if(this.data={},this.data.select=t,this.data.elem=l.elem,this.data.settings=d.default.extend({},c.default,s),this.disabled=t.disabled,this.form=t.form,this.length=t.length,this.multiple=t.multiple,this.options=l.options.slice(0),this.selectedIndex=t.selectedIndex,this.selectedOptions=l.selected.slice(0),this.value=t.value,this.data.cacheID=a.uid,a.cache[this.data.cacheID]=this,this.data.settings.initialize.call(this),a.uid+=1,this._changeListener||(t.addEventListener("change",this),this._changeListener=!0),!h||this.data.settings.mobile){if(t.parentNode.insertBefore(this.data.elem,t),t.setAttribute("data-dkCacheId",this.data.cacheID),this.data.elem.addEventListener("click",this),this.data.elem.addEventListener("keydown",this),this.data.elem.addEventListener("keypress",this),this.form&&this.form.addEventListener("reset",this),!this.multiple)for(i=0;i<this.options.length;i++)this.options[i].addEventListener("mouseover",this);f||(document.addEventListener("click",e.onDocClick),u&&parent.document.addEventListener("click",e.onDocClick),f=!0)}return this}},{key:"add",value:function(e,t){var s,i,a;"string"==typeof e&&(s=e,e=document.createElement("option"),e.text=s),"OPTION"===e.nodeName&&(i=d.default.create("li",{class:"dk-option","data-value":e.value,text:e.text,innerHTML:e.innerHTML,role:"option","aria-selected":"false",id:"dk"+this.data.cacheID+"-"+(e.id||e.value.replace(" ","-"))}),d.default.addClass(i,e.className),this.length+=1,e.disabled&&(d.default.addClass(i,"dk-option-disabled"),i.setAttribute("aria-disabled","true")),e.hidden&&(d.default.addClass(i,"dk-option-hidden"),i.setAttribute("aria-hidden","true")),this.data.select.add(e,t),"number"==typeof t&&(t=this.item(t)),a=this.options.indexOf(t),a>-1?(t.parentNode.insertBefore(i,t),this.options.splice(a,0,i)):(this.data.elem.lastChild.appendChild(i),this.options.push(i)),i.addEventListener("mouseover",this),e.selected&&this.select(a))}},{key:"item",value:function(e){return e=e<0?this.options.length+e:e,this.options[e]||null}},{key:"remove",value:function(e){var t=this.item(e);t.parentNode.removeChild(t),this.options.splice(e,1),this.data.select.remove(e),this.select(this.data.select.selectedIndex),this.length-=1}},{key:"close",value:function(){var e,t=this.data.elem;if(!this.isOpen||this.multiple)return!1;for(e=0;e<this.options.length;e++)d.default.removeClass(this.options[e],"dk-option-highlight");t.lastChild.setAttribute("aria-expanded","false"),d.default.removeClass(t.lastChild,"dk-select-options-highlight"),d.default.removeClass(t,"dk-select-open-(up|down)"),this.isOpen=!1,this.data.settings.close.call(this)}},{key:"open",value:function(){var e=void 0,t=void 0,s=void 0,i=void 0,a=void 0,l=void 0,n=this.data.elem,o=n.lastChild,r=void 0!==window.pageXOffset,c="CSS1Compat"===(document.compatMode||""),h=r?window.pageYOffset:c?document.documentElement.scrollTop:document.body.scrollTop;if(a=d.default.offset(n).top-h,l=window.innerHeight-(a+n.offsetHeight),this.isOpen||this.multiple)return!1;o.style.display="block",e=o.offsetHeight,o.style.display="",t=a>e,s=l>e,i=t&&!s?"-up":"-down",this.isOpen=!0,d.default.addClass(n,"dk-select-open"+i),o.setAttribute("aria-expanded","true"),this._scrollTo(this.options.length-1),this._scrollTo(this.selectedIndex),this.data.settings.open.call(this)}},{key:"disable",value:function(e,t){var s="dk-option-disabled";0!==arguments.length&&"boolean"!=typeof e||(t=void 0===e,e=this.data.elem,s="dk-select-disabled",this.disabled=t),void 0===t&&(t=!0),"number"==typeof e&&(e=this.item(e)),t?(e.setAttribute("aria-disabled",!0),d.default.addClass(e,s)):(e.setAttribute("aria-disabled",!1),d.default.removeClass(e,s))}},{key:"hide",value:function(e,t){void 0===t&&(t=!0),e=this.item(e),t?(e.setAttribute("aria-hidden",!0),d.default.addClass(e,"dk-option-hidden")):(e.setAttribute("aria-hidden",!1),d.default.removeClass(e,"dk-option-hidden"))}},{key:"select",value:function(e,t){var s,i,a,l,n=this.data.select;if("number"==typeof e&&(e=this.item(e)),"string"==typeof e)for(s=0;s<this.length;s++)this.options[s].getAttribute("data-value")===e&&(e=this.options[s]);return!(!e||"string"==typeof e||!t&&d.default.hasClass(e,"dk-option-disabled"))&&(d.default.hasClass(e,"dk-option")?(i=this.options.indexOf(e),a=n.options[i],this.multiple?(d.default.toggleClass(e,"dk-option-selected"),a.selected=!a.selected,d.default.hasClass(e,"dk-option-selected")?(e.setAttribute("aria-selected","true"),this.selectedOptions.push(e)):(e.setAttribute("aria-selected","false"),i=this.selectedOptions.indexOf(e),this.selectedOptions.splice(i,1))):(l=this.data.elem.firstChild,this.selectedOptions.length&&(d.default.removeClass(this.selectedOptions[0],"dk-option-selected"),this.selectedOptions[0].setAttribute("aria-selected","false")),d.default.addClass(e,"dk-option-selected"),e.setAttribute("aria-selected","true"),l.setAttribute("aria-activedescendant",e.id),l.className="dk-selected "+a.className,l.innerHTML=a.innerHTML,this.selectedOptions[0]=e,a.selected=!0),this.selectedIndex=n.selectedIndex,this.value=n.value,t||this.data.select.dispatchEvent(new CustomEvent("change",{bubbles:this.data.settings.bubble})),e):void 0)}},{key:"selectOne",value:function(e,t){return this.reset(!0),this._scrollTo(e),this.select(e,t)}},{key:"search",value:function(e,t){var s,i,a,l,n,o,d,r,c=this.data.select.options,h=[];if(!e)return this.options;for(t=t?t.toLowerCase():"strict",t="fuzzy"===t?2:"partial"===t?1:0,r=new RegExp((t?"":"^")+e,"i"),s=0;s<c.length;s++)if(a=c[s].text.toLowerCase(),2==t){for(i=e.toLowerCase().split(""),l=n=o=d=0;n<a.length;)a[n]===i[l]?(o+=1+o,l++):o=0,d+=o,n++;l===i.length&&h.push({e:this.options[s],s:d,i:s})}else r.test(a)&&h.push(this.options[s]);return 2===t&&(h=h.sort(function(e,t){return t.s-e.s||e.i-t.i}).reduce(function(e,t){return e[e.length]=t.e,e},[])),h}},{key:"focus",value:function(){this.disabled||(this.multiple?this.data.elem:this.data.elem.children[0]).focus()}},{key:"reset",value:function(e){var t,s=this.data.select;for(this.selectedOptions.length=0,t=0;t<s.options.length;t++)s.options[t].selected=!1,d.default.removeClass(this.options[t],"dk-option-selected"),this.options[t].setAttribute("aria-selected","false"),!e&&s.options[t].defaultSelected&&this.select(t,!0);this.selectedOptions.length||this.multiple||this.select(0,!0)}},{key:"refresh",value:function(){Object.keys(this).length>0&&(!h||this.data.settings.mobile)&&this.dispose().init(this.data.select,this.data.settings)}},{key:"dispose",value:function(){var e=window.Dropkick;return Object.keys(this).length>0&&(!h||this.data.settings.mobile)&&(delete e.cache[this.data.cacheID],this.data.elem.parentNode.removeChild(this.data.elem),this.data.select.removeAttribute("data-dkCacheId")),this}},{key:"handleEvent",value:function(e){if(!this.disabled)switch(e.type){case"click":this._delegate(e);break;case"keydown":this._keyHandler(e);break;case"keypress":this._searchOptions(e);break;case"mouseover":this._highlight(e);break;case"reset":this.reset();break;case"change":this.data.settings.change.call(this)}}},{key:"_delegate",value:function(e){var t,s,i,a,l=e.target;if(d.default.hasClass(l,"dk-option-disabled"))return!1;if(this.multiple){if(d.default.hasClass(l,"dk-option"))if(t=window.getSelection(),"Range"===t.type&&t.collapseToStart(),e.shiftKey)if(i=this.options.indexOf(this.selectedOptions[0]),a=this.options.indexOf(this.selectedOptions[this.selectedOptions.length-1]),s=this.options.indexOf(l),s>i&&s<a&&(s=i),s>a&&a>i&&(a=i),this.reset(!0),a>s)for(;s<a+1;)this.select(s++);else for(;s>a-1;)this.select(s--);else e.ctrlKey||e.metaKey?this.select(l):(this.reset(!0),this.select(l))}else this[this.isOpen?"close":"open"](),d.default.hasClass(l,"dk-option")&&this.select(l)}},{key:"_highlight",value:function(e){var t,s=e.target;if(!this.multiple){for(t=0;t<this.options.length;t++)d.default.removeClass(this.options[t],"dk-option-highlight");d.default.addClass(this.data.elem.lastChild,"dk-select-options-highlight"),d.default.addClass(s,"dk-option-highlight")}}},{key:"_keyHandler",value:function(e){var t,s,i=this.selectedOptions,a=this.options,l=1,n={tab:9,enter:13,esc:27,space:32,up:38,down:40};switch(e.keyCode){case n.up:l=-1;case n.down:if(e.preventDefault(),t=i[i.length-1],d.default.hasClass(this.data.elem.lastChild,"dk-select-options-highlight"))for(d.default.removeClass(this.data.elem.lastChild,"dk-select-options-highlight"),s=0;s<a.length;s++)d.default.hasClass(a[s],"dk-option-highlight")&&(d.default.removeClass(a[s],"dk-option-highlight"),t=a[s]);l=a.indexOf(t)+l,l>a.length-1?l=a.length-1:l<0&&(l=0),this.data.select.options[l].disabled||(this.reset(!0),this.select(l),this._scrollTo(l));break;case n.space:if(!this.isOpen){e.preventDefault(),this.open();break}case n.tab:case n.enter:for(l=0;l<a.length;l++)d.default.hasClass(a[l],"dk-option-highlight")&&this.select(l);case n.esc:this.isOpen&&(e.preventDefault(),this.close())}}},{key:"_searchOptions",value:function(e){var t,s=this,i=String.fromCharCode(e.keyCode||e.which);void 0===this.data.searchString&&(this.data.searchString=""),function(){s.data.searchTimeout&&clearTimeout(s.data.searchTimeout),s.data.searchTimeout=setTimeout(function(){s.data.searchString=""},1e3)}(),this.data.searchString+=i,t=this.search(this.data.searchString,this.data.settings.search),t.length&&(d.default.hasClass(t[0],"dk-option-disabled")||this.selectOne(t[0]))}},{key:"_scrollTo",value:function(e){var t,s,i,a=this.data.elem.lastChild;if(-1===e||"number"!=typeof e&&!e||!this.isOpen&&!this.multiple)return!1;"number"==typeof e&&(e=this.item(e)),t=d.default.position(e,a).top,s=t-a.scrollTop,i=s+e.offsetHeight,i>a.offsetHeight?(t+=e.offsetHeight,a.scrollTop=t-a.offsetHeight):s<0&&(a.scrollTop=t)}}]),e}();t.default=p,window.Dropkick=p,window.Dropkick.cache={},window.Dropkick.uid=0,p.build=function(e,t){var s,i,a,l=[],n={elem:null,options:[],selected:[]},o=function e(s){var i,a,l,o,r=[];switch(s.nodeName){case"OPTION":i=d.default.create("li",{class:"dk-option ","data-value":s.value,text:s.text,innerHTML:s.innerHTML,role:"option","aria-selected":"false",id:t+"-"+(s.id||s.value.replace(" ","-"))}),d.default.addClass(i,s.className),s.disabled&&(d.default.addClass(i,"dk-option-disabled"),i.setAttribute("aria-disabled","true")),s.hidden&&(d.default.addClass(i,"dk-option-hidden"),i.setAttribute("aria-hidden","true")),s.selected&&(d.default.addClass(i,"dk-option-selected"),i.setAttribute("aria-selected","true"),n.selected.push(i)),n.options.push(this.appendChild(i));break;case"OPTGROUP":for(a=d.default.create("li",{class:"dk-optgroup"}),s.label&&a.appendChild(d.default.create("div",{class:"dk-optgroup-label",innerHTML:s.label})),l=d.default.create("ul",{class:"dk-optgroup-options"}),o=s.children.length;o--;r.unshift(s.children[o]));s.disabled&&(a.classList.add("dk-optgroup-disabled"),r.forEach(function(e){e.disabled=s.disabled})),r.forEach(e,l),this.appendChild(a).appendChild(l)}};for(n.elem=d.default.create("div",{class:"dk-select"+(e.multiple?"-multi":"")}),i=d.default.create("ul",{class:"dk-select-options",id:t+"-listbox",role:"listbox"}),e.disabled&&(d.default.addClass(n.elem,"dk-select-disabled"),n.elem.setAttribute("aria-disabled",!0)),n.elem.id=t+(e.id?"-"+e.id:""),d.default.addClass(n.elem,e.className),e.multiple?(n.elem.setAttribute("tabindex",e.getAttribute("tabindex")||"0"),i.setAttribute("aria-multiselectable","true")):(s=e.options[e.selectedIndex],n.elem.appendChild(d.default.create("div",{class:"dk-selected "+(s?s.className:""),tabindex:e.tabindex||0,innerHTML:s?s.text:"&nbsp;",id:t+"-combobox","aria-live":"assertive","aria-owns":i.id,role:"combobox"})),i.setAttribute("aria-expanded","false")),a=e.children.length;a--;l.unshift(e.children[a]));return l.forEach(o,n.elem.appendChild(i)),n},p.onDocClick=function(e){var t,s,i=window.Dropkick;if(1!==e.target.nodeType)return!1;null!==(t=e.target.getAttribute("data-dkcacheid"))&&i.cache[t].focus();for(s in i.cache)d.default.closest(e.target,i.cache[s].data.elem)||s===t||i.cache[s].disabled||i.cache[s].close()},void 0!==window.jQuery&&(window.jQuery.fn.dropkick=function(){var e=Array.prototype.slice.call(arguments);return jQuery(this).each(function(){e[0]&&"object"!==l(e[0])?"string"==typeof e[0]&&p.prototype[e[0]].apply(new p(this),e.slice(1)):new p(this,e[0]||{})})})},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=-1!==navigator.appVersion.indexOf("MSIE"),a={hasClass:function(e,t){var s=new RegExp("(^|\\s+)"+t+"(\\s+|$)");return e&&s.test(e.className)},addClass:function(e,t){e&&!this.hasClass(e,t)&&(e.className+=" "+t)},removeClass:function(e,t){var s=new RegExp("(^|\\s+)"+t+"(\\s+|$)");e&&(e.className=e.className.replace(s," "))},toggleClass:function(e,t){[(this.hasClass(e,t)?"remove":"add")+"Class"](e,t)},extend:function(e){return Array.prototype.slice.call(arguments,1).forEach(function(t){if(t)for(var s in t)e[s]=t[s]}),e},offset:function(e){var t=e.getBoundingClientRect()||{top:0,left:0},s=document.documentElement,a=i?s.scrollTop:window.pageYOffset,l=i?s.scrollLeft:window.pageXOffset;return{top:t.top+a-s.clientTop,left:t.left+l-s.clientLeft}},position:function(e,t){for(var s={top:0,left:0};e&&e!==t;)s.top+=e.offsetTop,s.left+=e.offsetLeft,e=e.parentNode;return s},closest:function(e,t){for(;e;){if(e===t)return e;e=e.parentNode}return!1},create:function(e,t){var s=void 0,i=document.createElement(e);t||(t={});for(s in t)t.hasOwnProperty(s)&&("innerHTML"===s?i.innerHTML=t[s]:i.setAttribute(s,t[s]));return i},deferred:function(e){return function(){var t=this,s=arguments;window.setTimeout(function(){e.apply(t,s)},1)}}};t.default=a},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i={initialize:function(){},mobile:!0,change:function(){},open:function(){},close:function(){},search:"strict",bubble:!0};t.default=i},function(e,t){}]);
