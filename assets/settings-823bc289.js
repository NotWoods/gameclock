import{_ as r}from"./preload-helper-b3d6756e.js";function a(){import("data:text/javascript,")}r(()=>import("./libs-68db9566.js"),[]);const t=document.querySelector('input[name="start"]');t.addEventListener("change",()=>{localStorage.setItem("start",t.value)});const e=parseInt(localStorage.getItem("start"),10);Number.isNaN(e)||(t.value=e.toString());export{a as __vite_legacy_guard};