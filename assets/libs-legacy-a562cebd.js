System.register([],(function(e,t){"use strict";return{execute:function(){e("trackGoal",(function(e,t){var o;window.fathom?window.fathom.trackGoal(e,t):(o={type:"trackGoal",code:e,cents:t},window.__fathomClientQueue=window.__fathomClientQueue||[],window.__fathomClientQueue.push(o))})),navigator.serviceWorker&&navigator.serviceWorker.register("sw.js")}}}));