import{_ as t}from"./preload-helper.7808a9b5.js";const e=t((()=>__import__("./libs.accc2d38.js")),void 0),a=parseInt(localStorage.getItem("start"),10),o=1e3*(Number.isNaN(a)?60:a);let n=-1;const s=[i("clock--top"),i("clock--bottom")],r=document.querySelector(".button--pause"),c=document.querySelector(".button--reset");function i(t){const e=document.querySelector(`.${t}`),a=e.querySelector(".clock");return{button:e,display:a,active:!1,elapsedSoFar:0,lastPaused:-1,lastDisplayed:-1}}function l(t,e){return t.active?-1!==t.lastPaused?e-t.lastPaused+t.elapsedSoFar:0:t.elapsedSoFar}function d(t,e){t.display.classList.remove("clock--active"),-1!==t.lastPaused&&(t.elapsedSoFar=l(t,e)),t.active=!1,t.lastPaused=e}function u(t=Date.now()){n=-1,r.hidden=!0,s.forEach((e=>d(e,t)))}s.forEach(((t,a)=>{const o="onpointerdown"in t.button?"pointerdown":"click";t.button.addEventListener(o,(()=>function(t,a=Date.now()){let o=t+1;if(o>=s.length&&(o=0),-1===n)r.hidden=!1,-1===s[o].lastPaused&&e.then((({track:t})=>t({id:"start-timer"})));else{if(n===o)return;d(s[n],a)}s[o].display.classList.add("clock--active"),n=o,s[o].active=!0,s[o].lastPaused=a}(a)))})),r.addEventListener("click",(()=>u())),c.addEventListener("click",(()=>{u(),window.confirm("Are you sure you want to reset the timers?")&&s.forEach((t=>{t.elapsedSoFar=0,t.lastPaused=-1}))})),requestAnimationFrame((function t(){const e=Date.now();s.forEach((t=>function(t,e=Date.now()){const a=o-l(t,e),n=Math.max(0,Math.floor(a/1e3));if(n===t.lastDisplayed)return;const s=String(Math.floor(n/60)),r=String(n%60);t.display.textContent=`${s}:${r.padStart(2,"0")}`,t.display.dateTime=`PT${s}M${r}S`,t.lastDisplayed=n,0===n&&navigator.vibrate(200)}(t,e))),requestAnimationFrame(t)}));
