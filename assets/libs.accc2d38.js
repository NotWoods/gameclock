function t(){return"undefined"!=typeof window}function e(){return location.protocol+"//"+location.host}function a(){if(!t())return!1;var a=document.referrer||"",r=e();return a.substr(0,r.length)===r}function r(){return t()?{type:"locale",value:('"'===(e=void 0!==navigator.languages?navigator.languages[0]:navigator.language)[0]&&(e=e.substr(1)),e.length>0&&'"'===e[e.length-1]&&(e=e.substr(0,e.length-1)),(e&&5===e.length&&"-"===e[2]?e.substr(0,3)+e.substr(3).toLocaleUpperCase():e)||"<none>")}:{type:"locale",value:"<not-in-browser>"};var e}function n(e,a){if(void 0===e&&(e=!1),void 0===a&&(a=!1),!t())return{type:"path",value:"<not-in-browser>"};var r=window.location.pathname,n=window.location.hash,i=window.location.search;return e&&a?r+=n:e?r+=n.substr(0,n.length-i.length):a&&(r+=i),{type:"path",value:r}}function i(t,e){return{type:"transition",value:t+"  ->  "+e}}function s(t,e){return void 0===e&&(e=""),t<5e3?{type:"duration-interval",value:e+"< 5s"}:t<15e3?{type:"duration-interval",value:e+"< 15s"}:t<3e4?{type:"duration-interval",value:e+"< 30s"}:t<6e4?{type:"duration-interval",value:e+"< 1m"}:t<3e5?{type:"duration-interval",value:e+"< 5m"}:{type:"duration-interval",value:e+"> 5m"}}var o,u={},c=function(){function o(t,e){void 0===e&&(e=u),this.projectId=t,this.options=e,this.uniques={},this.trackPageData=null,this.trackPageChange=this.trackPageChange.bind(this),this.trackLastPageTimeSpent=this.trackLastPageTimeSpent.bind(this)}return o.prototype.track=function(e){if(this.options.disabled||!t())return Promise.resolve();if(e.unique){var a=JSON.stringify(e);if(this.uniques[a])return Promise.resolve();this.uniques[a]=!0}var r={id:e.id,projectId:this.projectId,ignoreErrors:this.options.ignoreErrors||!1};e.remove&&(r.remove=!0),e.parameters&&(r.parameters=e.parameters),e.update&&(r.update=!0);var n=new XMLHttpRequest;n.open("post","https://getinsights.io/app/tics",!0),n.setRequestHeader("Content-Type","application/json"),n.send(JSON.stringify(r))},o.prototype.trackPages=function(e){if(!t())return{stop:function(){}};if(this.trackPageData)return this.trackPageData.result;var a=setInterval(this.trackPageChange,2e3),r=e||{},i=r.hash,s=void 0!==i&&i,o=r.search,u=void 0!==o&&o;return this.trackPageData={hash:s,search:u,path:n(s,u).value,isOnFirstPage:!0,time:Date.now(),result:{stop:function(){clearInterval(a)}}},this.trackSinglePage(!0,this.trackPageData.path),window.addEventListener("unload",this.trackLastPageTimeSpent),this.trackPageData.result},o.prototype.getPreviousPage=function(t){var r=this.trackPageData&&this.trackPageData.path;return!t&&r?r:a()?document.referrer.replace(e(),""):document.referrer},o.prototype.trackPageChange=function(){if(this.trackPageData){var t=this.trackPageData,e=n(t.hash,t.search).value;e!==this.trackPageData.path&&this.trackSinglePage(!1,e)}},o.prototype.trackSinglePage=function(e,n){if(this.trackPageData){this.trackPageData.isOnFirstPage=e&&!a();var o,u=this.trackPageData,c=u.time,p=u.isOnFirstPage,h={path:n};p&&(h.uniqueViews=n,h.referrer=t()?a()?{type:"referrer",value:"<none>"}:{type:"referrer",value:document.referrer||"<none>"}:{type:"referrer",value:"<not-in-browser>"},h.locale=r(),h.screenType=t()?{type:"screen-type",value:(o=window.innerWidth,o<=414?"XS":o<=800?"S":o<=1200?"M":o<=1600?"L":"XL")}:{type:"screen-type",value:"<not-in-browser>"});var g=this.getPreviousPage(e);if(g&&g!==n&&(h.transitions=i(g,n),!p)){var l=Date.now();this.trackPageData.time=l,h.duration=s(l-c,g+" - ")}this.trackPageData.path=n,this.track({id:"page-views",parameters:h})}},o.prototype.trackLastPageTimeSpent=function(){var t=this.trackPageData&&this.trackPageData.time;if(t&&"function"==typeof navigator.sendBeacon&&!this.options.disabled&&this.trackPageData){var a=this.trackPageData,r=a.isOnFirstPage,n=a.path,o={};o.duration=s(Date.now()-t,n+" - ");var u=document.activeElement&&document.activeElement.href||"",c=e();u?"/"!==u[0]&&u.substr(0,c.length)!==e()&&(o.transitions=i(n,u)):o.bounces=r?"Yes":"No",navigator.sendBeacon=navigator.sendBeacon||function(t,e){var a=new XMLHttpRequest;a.open("post",t,!1),a.send(e)},navigator.sendBeacon("https://getinsights.io/app/tics",JSON.stringify({id:"page-views",projectId:this.projectId,parameters:o,ignoreErrors:this.options.ignoreErrors||!1,update:!0}))}},o}(),p=null;function h(e){p&&t()&&p.track(e)}!function(e,a){if(!t()||p)throw new Error("Already initialized!");p=new c(e,a)}("fWF3tu0I8FSImuhJ"),p&&t()&&p.trackPages(o),navigator.serviceWorker&&navigator.serviceWorker.register("sw.js");export{h as track};
