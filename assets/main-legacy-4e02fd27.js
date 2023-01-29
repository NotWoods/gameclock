System.register(["./preload-helper-legacy-f8638e03.js"],(function(t,e){"use strict";var o,a=document.createElement("style");return a.textContent='html,body,.container{height:100%}body{display:flex;margin:0;align-items:center;justify-content:center;background:#312e2b;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Open Sans,Helvetica Neue,sans-serif;font-size:5em;text-align:center}.container{display:grid;width:100%;grid-template:"clock_top" 1fr "buttons" auto "clock_bottom" 1fr / auto;max-width:25rem;max-height:50rem}.buttons{grid-area:buttons;display:flex;align-items:center;justify-content:space-evenly}.button{padding:.75rem;border:0;border-radius:50%;background:transparent;cursor:pointer}.button:hover{background:rgba(255,255,255,.1)}.button svg{display:block}.clock__container{display:flex;margin:0;padding:1rem;border:0;background:none;position:relative;cursor:pointer;font:inherit}.clock--top{grid-area:clock_top}.clock--bottom{grid-area:clock_bottom}.clock{display:flex;align-self:stretch;align-items:center;justify-content:center;position:absolute;top:1rem;left:1rem;right:1rem;bottom:1rem;color:#000;background:#524e48;border-radius:.5rem}.clock--active{color:#fff;background:linear-gradient(135deg,#eba249,#e38528)}.clock[datetime=PT0M0S]{color:#fff;background:linear-gradient(135deg,#ae2c33,#ec3339)}.clock--top .clock{transform:rotate(180deg)}@media (orientation: landscape){.container{grid-template:"buttons buttons" auto "clock_top clock_bottom" 1fr / 1fr 1fr;max-width:50rem;max-height:25rem}.clock--top .clock{transform:none}}\n',document.head.appendChild(a),{setters:[t=>{o=t._}],execute:function(){const t=o((()=>e.import("./libs-legacy-a562cebd.js")),void 0),a=parseInt(localStorage.getItem("start"),10),n=1e3*(Number.isNaN(a)?60:a);let r=-1;const c=[l("clock--top"),l("clock--bottom")],i=document.querySelector(".button--pause"),s=document.querySelector(".button--reset");function l(t){const e=document.querySelector(`.${t}`),o=e.querySelector(".clock");return{button:e,display:o,active:!1,elapsedSoFar:0,lastPaused:-1,lastDisplayed:-1}}function d(t,e){return t.active?-1!==t.lastPaused?e-t.lastPaused+t.elapsedSoFar:0:t.elapsedSoFar}function u(t,e){t.display.classList.remove("clock--active"),-1!==t.lastPaused&&(t.elapsedSoFar=d(t,e)),t.active=!1,t.lastPaused=e}function m(t=Date.now()){r=-1,i.hidden=!0,c.forEach((e=>u(e,t)))}c.forEach(((e,o)=>{const a="onpointerdown"in e.button?"pointerdown":"click";e.button.addEventListener(a,(()=>function(e,o=Date.now()){let a=e+1;if(a>=c.length&&(a=0),-1===r)i.hidden=!1,-1===c[a].lastPaused&&t.then((({trackGoal:t})=>t("7GNS1PRY",0)));else{if(r===a)return;u(c[r],o)}c[a].display.classList.add("clock--active"),r=a,c[a].active=!0,c[a].lastPaused=o}(o)))})),i.addEventListener("click",(()=>m())),s.addEventListener("click",(()=>{m(),window.confirm("Are you sure you want to reset the timers?")&&c.forEach((t=>{t.elapsedSoFar=0,t.lastPaused=-1}))})),requestAnimationFrame((function t(){const e=Date.now();c.forEach((t=>function(t,e=Date.now()){const o=n-d(t,e),a=Math.max(0,Math.floor(o/1e3));if(a===t.lastDisplayed)return;const r=String(Math.floor(a/60)),c=String(a%60);t.display.textContent=`${r}:${c.padStart(2,"0")}`,t.display.dateTime=`PT${r}M${c}S`,t.lastDisplayed=a,0===a&&navigator.vibrate(200)}(t,e))),requestAnimationFrame(t)}))}}}));