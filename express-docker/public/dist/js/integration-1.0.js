window.SPWidgetBase="https://clientsecure.me",window.originalDefine=window.define,window.define=function(e,t,i){var n={};i(n),window.SPWidget=n.default,window.SPWidgetInstances={},-1===navigator.userAgent.indexOf("MSIE")&&document.querySelectorAll("[data-spwidget-autobind]").forEach(function(e){var t=e.getAttribute("data-spwidget-scope-id"),i=e.getAttribute("data-spwidget-scope-uri"),n=e.hasAttribute("data-spwidget-scope-global"),o=e.getAttribute("data-spwidget-application-id");if(t&&o){if(!window.SPWidgetInstances[t]){var s=document.body.appendChild(document.createElement("div"));window.SPWidgetInstances[t]=new window.SPWidget(s),window.SPWidgetInstances[t].init({scopeId:t,scopeUri:i,scopeGlobal:n,applicationId:o,appearance:{fullScreen:!0}})}e.onclick=function(e){e.preventDefault(),window.SPWidgetInstances[t].reveal()}}})},define("scheduling-widget/integration",["exports"],function(e){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},i=function(){function n(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(e,t,i){return t&&n(e.prototype,t),i&&n(e,i),e}}(),n="\n  .spwidget--no-scroll {\n    overflow: hidden !important;\n    "+(navigator.userAgent.match(/(iPod|iPhone|iPad)/)?"\n      position: fixed;\n      width: 100%;\n      height: 100%;\n    ":"")+"\n  }\n\n  .spwidget--overlay {\n    position: fixed;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    z-index: 999999998;\n    background: rgba(19, 25, 28, .5);\n    animation: fadeIn .3s ease-in-out;\n  }\n\n  .spwidget--preload {\n    display: none;\n  }\n\n  .spwidget--scroller {\n    position: fixed;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    z-index: 999999999;\n    overflow: auto;\n    -webkit-overflow-scrolling: touch;\n  }\n\n  .spwidget--scroller iframe {\n    transform: scale(1) translate3d(0, 0, 0);\n    animation: fadeInWidget .45s ease-in-out;\n  }\n\n  @keyframes fadeIn {\n    0% {\n      opacity: 0;\n    }\n\n    100% {\n      opacity: 1;\n    }\n  }\n\n  @keyframes fadeInWidget {\n    0% {\n      opacity: 0;\n      transform: scale(.75) translate3d(0, 100%, 0);\n    }\n\n    100% {\n      opacity: 1;\n      transform: scale(1) translate3d(0, 0, 0);\n    }\n  }\n",s=new RegExp(/^https?:\/\/(\S*\.)?(\S*\-)?(localhost|simplepractice\.dev|clientsecure\.me)(:[0-9]{2,4})?$/i),t=function(){function t(e){(function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")})(this,t),this.node=e,this._onMessage=this._onMessage.bind(this),this._close=this._close.bind(this),this._insertCss(n),this._listen()}return i(t,[{key:"init",value:function(e){this._scopeUri=e.scopeUri,delete e.scopeUri,this._fullScreen=e.appearance&&e.appearance.fullScreen,this._fullScreen&&this.node.classList.add("spwidget--preload"),this.iframe?this.iframe.setAttribute("src",this._iframeURL(e)):this._insertIframe(this._iframeURL(e))}},{key:"reveal",value:function(){this.iframe.contentWindow.postMessage({scope:"scheduling-widget-origin-to-iframe",action:"reveal"},"*"),this._fullScreen&&(this._initOverlay(),this.node.classList.remove("spwidget--preload"))}},{key:"_listen",value:function(){window.addEventListener("message",this._onMessage,!1)}},{key:"_onMessage",value:function(e){if(s.test(e.origin)&&"scheduling-widget-iframe-to-origin"===e.data.scope)if(console&&console.log("SPWidget: outgoing message "+JSON.stringify(e.data)),"height"===e.data.action){if(0===e.data.height)return;var t=this._positionAttributes(e.data.height),i=t.top,n=t.height,o=t.marginTop;this.iframe.style.top=i+"%",this.iframe.style.height=n+"px",this.iframe.style.marginTop=o+"px",console&&console.log("SPWidget: setting height to "+n)}else"scrollTop"===e.data.action?this.node.scrollTop=e.data.top:"close"===e.data.action&&this._close()}},{key:"_initOverlay",value:function(){document.querySelector("html").classList.add("spwidget--no-scroll"),document.querySelector("body").classList.add("spwidget--no-scroll"),this.overlay=this.node.parentNode.insertBefore(document.createElement("div"),this.node),this.overlay.classList.add("spwidget--overlay"),this.overlay.addEventListener("click",this._close),this.node.classList.add("spwidget--scroller"),this.node.addEventListener("click",this._close)}},{key:"_close",value:function(){this.node.classList.remove("spwidget--scroller"),this.node.classList.add("spwidget--preload"),this.overlay.parentNode.removeChild(this.overlay),document.querySelector("html").classList.remove("spwidget--no-scroll"),document.querySelector("body").classList.remove("spwidget--no-scroll")}},{key:"_serializeParams",value:function(n){return Object.keys(n).map(function(e){var t=encodeURIComponent(e),i=n[e];return"object"===o(n[e])&&(i=JSON.stringify(n[e])),t+"="+encodeURIComponent(i)}).join("&")}},{key:"_iframeURL",value:function(e){if(window.SPWidgetRedirect)return window.SPWidgetRedirect;var t=window.SPWidgetBase;if(this._scopeUri&&0<this._scopeUri.length){var i=window.SPWidgetBase.split("://");i.splice(1,0,this._scopeUri+"."),i.splice(1,0,"://"),t=i.join("")}return t+"/widget-redirect?"+this._serializeParams(e)}},{key:"_isFullHeight",value:function(){return window.innerWidth<1001&&this._fullScreen}},{key:"_positionAttributes",value:function(e){if(this._isFullHeight())if(navigator.userAgent.match(/(iPod|iPhone|iPad)/)){var t=document.documentElement.clientWidth/window.innerWidth;e=window.innerHeight*t}else e=window.innerHeight;var i=50,n=-e/2;return this._fullScreen&&!this._isFullHeight()||(n=i=0),{top:i,height:e,marginTop:n}}},{key:"_insertIframe",value:function(e){var t=this._positionAttributes(640),i=t.top,n=t.height,o=t.marginTop;this.iframe=document.createElement("iframe"),this.iframe.setAttribute("src",e),this.iframe.setAttribute("frameBorder","0"),this.iframe.setAttribute("allowtransparency","true"),this.iframe.setAttribute("allow","geolocation"),this.iframe.setAttribute("style",["display: block","position: relative","top: "+i+"%","width: 100%","max-width: 1001px","height: "+n+"px","margin: 0 auto","margin-top: "+o+"px"].join("; ")),this.node.appendChild(this.iframe)}},{key:"_insertCss",value:function(e){if(!document.querySelector("#spwidget-css")){var t=document.createElement("style");t.id="spwidget-css",t.styleSheet?t.styleSheet.cssText=e:t.appendChild(document.createTextNode(e)),document.head.appendChild(t)}}}]),t}();e.default=t}),window.define=window.originalDefine;