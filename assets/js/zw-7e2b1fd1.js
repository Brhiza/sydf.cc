import{r as k,o as S,a as C,b as m,c as A,d as g,e as x,w as I,T as $,f as w,g as O,F as B,h as q,n as H,i as p,t as v,j as T,k as N,l as F,m as R,p as j,q as Q,s as U,u as W}from"./vendor-1aace270.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();const V="modulepreload",G=function(n){return"/"+n},z={},J=function(e,t,o){if(!t||t.length===0)return e();const s=document.getElementsByTagName("link");return Promise.all(t.map(r=>{if(r=G(r),r in z)return;z[r]=!0;const i=r.endsWith(".css"),u=i?'[rel="stylesheet"]':"";if(!!o)for(let d=s.length-1;d>=0;d--){const a=s[d];if(a.href===r&&(!i||a.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${r}"]${u}`))return;const h=document.createElement("link");if(h.rel=i?"stylesheet":V,i||(h.as="script",h.crossOrigin=""),h.href=r,document.head.appendChild(h),i)return new Promise((d,a)=>{h.addEventListener("load",d),h.addEventListener("error",()=>a(new Error(`Unable to preload CSS for ${r}`)))})})).then(()=>e()).catch(r=>{const i=new Event("vite:preloadError",{cancelable:!0});if(i.payload=r,window.dispatchEvent(i),!i.defaultPrevented)throw r})};class Z{constructor(){this.errorQueue=[],this.maxErrors=10,this.errorCallbacks=new Map,this.init()}init(){window.addEventListener("error",e=>{this.handleError({type:"javascript",message:e.message,filename:e.filename,lineno:e.lineno,colno:e.colno,stack:e.error?.stack,timestamp:new Date().toISOString()})}),window.addEventListener("unhandledrejection",e=>{this.handleError({type:"promise",message:e.reason?.message||String(e.reason),stack:e.reason?.stack,timestamp:new Date().toISOString()})})}handleError(e){this.errorQueue.push(e),this.errorQueue.length>this.maxErrors&&this.errorQueue.shift(),console.error("Error captured:",e),this.triggerCallbacks("error",e),this.showUserFriendlyError(e)}showUserFriendlyError(e){let t="发生了一个错误，请稍后重试";e.message?.includes("fetch")?t="网络连接出现问题，请检查网络后重试":e.message?.includes("AI")||e.message?.includes("api")?t="AI服务暂时不可用，请稍后再试":(e.message?.includes("tyme")||e.message?.includes("八字"))&&(t="排盘功能加载失败，请刷新页面重试"),this.showErrorToast(t)}showErrorToast(e,t=5e3){this.triggerCallbacks("showError",{message:e,duration:t,type:"error"})}showSuccessToast(e,t=3e3){this.triggerCallbacks("showSuccess",{message:e,duration:t,type:"success"})}showInfoToast(e,t=3e3){this.triggerCallbacks("showInfo",{message:e,duration:t,type:"info"})}reportError(e,t=""){const o={type:"manual",message:e.message||String(e),stack:e.stack,context:t,timestamp:new Date().toISOString()};this.handleError(o)}getErrorHistory(){return[...this.errorQueue]}clearErrorHistory(){this.errorQueue=[]}hasDuplicateErrors(e=6e4){const t=Date.now(),s=this.errorQueue.filter(i=>{const u=new Date(i.timestamp).getTime();return t-u<e}).map(i=>i.message),r=new Set(s);return s.length>r.size}onEvent(e){const t=Date.now()+Math.random();return this.errorCallbacks.set(t,e),t}offEvent(e){this.errorCallbacks.delete(e)}triggerCallbacks(e,t){this.errorCallbacks.forEach(o=>{try{o(e,t)}catch(s){console.error("Error callback error:",s)}})}async safeExecute(e,t=""){try{return await e()}catch(o){throw this.reportError(o,t),o}}wrapPromise(e,t=""){return e.catch(o=>{throw this.reportError(o,t),o})}}const b=new Z;function K(){window.addEventListener("unhandledrejection",n=>{b.reportError(n.reason,"Unhandled Promise Rejection"),console.error("Unhandled Promise Rejection:",n.reason)}),window.addEventListener("error",n=>{b.reportError(n.error,"Global JavaScript Error"),console.error("Global JavaScript Error:",n.error)})}const xe=(n,e)=>b.showErrorToast(n,e),_e=(n,e)=>b.showSuccessToast(n,e);const P=(n,e)=>{const t=n.__vccOpts||n;for(const[o,s]of e)t[o]=s;return t},X={key:0,class:"toast-container"},Y={class:"toast-content"},ee={class:"toast-icon"},te={class:"toast-message"},oe={key:0},se=["onClick"],re={__name:"ToastNotification",setup(n,{expose:e}){const t=k([]);let o=0,s=null;const r=d=>({error:"⚠️",success:"✅",info:"ℹ️",warning:"⚠️"})[d]||"ℹ️",i=(d,a="info",l="",c=3e3)=>{const f=++o,_={id:f,message:d,type:a,title:l,duration:c};return t.value.push(_),c>0&&setTimeout(()=>{u(f)},c),f},u=d=>{const a=t.value.findIndex(l=>l.id===d);a>-1&&t.value.splice(a,1)},y=()=>{t.value=[]},h=(d,a)=>{switch(d){case"showError":i(a.message,"error","错误提示",a.duration);break;case"showSuccess":i(a.message,"success","",a.duration);break;case"showInfo":i(a.message,"info","",a.duration);break}};return S(()=>{s=b.onEvent(h)}),C(()=>{s&&b.offEvent(s)}),e({addToast:i,removeToast:u,clearAllToasts:y}),(d,a)=>(m(),A(O,{to:"body"},[t.value.length>0?(m(),g("div",X,[x($,{name:"toast",tag:"div"},{default:I(()=>[(m(!0),g(B,null,q(t.value,l=>(m(),g("div",{key:l.id,class:H(["toast",`toast-${l.type}`])},[p("div",Y,[p("span",ee,v(r(l.type)),1),p("div",te,[l.title?(m(),g("strong",oe,v(l.title),1)):w("",!0),p("div",null,v(l.message),1)]),p("button",{class:"toast-close",onClick:c=>u(l.id)}," × ",8,se)])],2))),128))]),_:1})])):w("",!0)]))}},ie=P(re,[["__scopeId","data-v-f6aabfb8"]]);class ne{constructor(){this.loadingStates=new Map,this.loadingCallbacks=new Map}showLoading(e="正在处理中...",t="default"){this.loadingStates.set(t,{message:e,startTime:Date.now()}),this.triggerCallbacks("show",{taskId:t,message:e}),console.log(`Loading started: ${t} - ${e}`)}hideLoading(e="default"){const t=this.loadingStates.get(e);if(t){const o=Date.now()-t.startTime;console.log(`Loading completed: ${e} - Duration: ${o}ms`),this.loadingStates.delete(e)}this.triggerCallbacks("hide",{taskId:e})}updateLoadingMessage(e,t="default"){const o=this.loadingStates.get(t);o&&(o.message=e,this.triggerCallbacks("update",{taskId:t,message:e}))}isLoading(e="default"){return this.loadingStates.has(e)}getAllLoadingTasks(){return Array.from(this.loadingStates.keys())}clearAllLoading(){this.loadingStates.clear(),this.triggerCallbacks("clearAll",{})}onStateChange(e){const t=Date.now()+Math.random();return this.loadingCallbacks.set(t,e),t}offStateChange(e){this.loadingCallbacks.delete(e)}triggerCallbacks(e,t){this.loadingCallbacks.forEach(o=>{try{o(e,t)}catch(s){console.error("Loading callback error:",s)}})}getState(){return{isAnyLoading:this.loadingStates.size>0,loadingTasks:Array.from(this.loadingStates.entries()).map(([e,t])=>({taskId:e,message:t.message,duration:Date.now()-t.startTime}))}}}const E=new ne;const ae={class:"loading-content"},le={class:"loading-message"},ce={key:0,class:"loading-progress"},de={class:"progress-bar"},pe={class:"progress-text"},he={key:1,class:"loading-actions"},ue={__name:"LoadingIndicator",props:{message:{type:String,default:"正在处理中..."},cancellable:{type:Boolean,default:!1},showProgress:{type:Boolean,default:!1},progress:{type:Number,default:0}},emits:["cancel"],setup(n,{emit:e}){const t=n,o=e,s=k(new Map),r=k(t.message);let i=null;const u=T(()=>s.value.size>0),y=T(()=>t.cancellable&&u.value),h=()=>{},d=()=>{o("cancel")},a=(l,c)=>{switch(l){case"show":s.value.set(c.taskId,{message:c.message,startTime:Date.now()}),r.value=c.message;break;case"hide":if(s.value.delete(c.taskId),s.value.size>0){const _=Array.from(s.value.values()).pop();r.value=_.message}break;case"update":const f=s.value.get(c.taskId);f&&(f.message=c.message,r.value=c.message);break;case"clearAll":s.value.clear();break}};return S(()=>{i=E.onStateChange(a);const l=E.getState();l.isAnyLoading&&(l.loadingTasks.forEach(c=>{s.value.set(c.taskId,{message:c.message,startTime:Date.now()-c.duration})}),l.loadingTasks.length>0&&(r.value=l.loadingTasks[l.loadingTasks.length-1].message))}),C(()=>{i&&E.offStateChange(i)}),(l,c)=>(m(),A(O,{to:"body"},[u.value?(m(),g("div",{key:0,class:"loading-overlay",onClick:F(h,["self"])},[p("div",ae,[c[0]||(c[0]=p("div",{class:"loading-spinner"},[p("div",{class:"spinner-ring"}),p("div",{class:"spinner-ring"}),p("div",{class:"spinner-ring"})],-1)),p("div",le,v(r.value),1),n.showProgress?(m(),g("div",ce,[p("div",de,[p("div",{class:"progress-fill",style:N({width:`${n.progress}%`})},null,4)]),p("div",pe,v(n.progress)+"%",1)])):w("",!0),y.value?(m(),g("div",he,[p("button",{class:"cancel-btn",onClick:d},"取消")])):w("",!0)])])):w("",!0)]))}},me=P(ue,[["__scopeId","data-v-8fba94a1"]]);class ge{constructor(){this.isMobile=this.detectMobile(),this.isTouch="ontouchstart"in window,this.callbacks=new Map,this.init()}detectMobile(){return/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)||window.innerWidth<=768}init(){this.isMobile&&this.optimizeForMobile(),window.addEventListener("orientationchange",()=>{setTimeout(()=>{this.handleOrientationChange()},100)}),window.addEventListener("resize",this.debounce(()=>{const e=this.isMobile;this.isMobile=this.detectMobile(),this.isMobile&&!e&&this.optimizeForMobile(),this.triggerCallbacks("resize",{isMobile:this.isMobile})},250)),this.addMobileStyles()}optimizeForMobile(){this.optimizeTouchExperience(),this.optimizeScrolling(),this.optimizeButtons(),this.optimizeTables(),this.triggerCallbacks("optimized",{isMobile:this.isMobile})}optimizeTouchExperience(){document.addEventListener("touchstart",t=>{t.target.matches("button, .btn, .tab-btn, .questions-grid p, .back-button")&&(t.target.style.transform="scale(0.95)",t.target.style.transition="transform 0.1s ease")}),document.addEventListener("touchend",t=>{t.target.matches("button, .btn, .tab-btn, .questions-grid p, .back-button")&&setTimeout(()=>{t.target.style.transform=""},100)});let e=0;document.addEventListener("touchend",t=>{const o=Date.now();o-e<=300&&t.preventDefault(),e=o},!1)}optimizeScrolling(){document.documentElement.style.scrollBehavior="smooth",document.querySelectorAll(".ai-response, .result-card").forEach(t=>{t.style.webkitOverflowScrolling="touch",t.style.overflowScrolling="touch"})}optimizeButtons(){document.querySelectorAll("button, .btn, .tab-btn").forEach(t=>{t.getBoundingClientRect().height<44&&(t.style.minHeight="44px",t.style.display="flex",t.style.alignItems="center",t.style.justifyContent="center")})}optimizeTables(){document.querySelectorAll("table").forEach(t=>{if(!t.parentElement.classList.contains("table-wrapper")){const o=document.createElement("div");o.className="table-wrapper",o.style.cssText=`
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          margin: 10px 0;
        `,t.parentElement.insertBefore(o,t),o.appendChild(t)}})}handleOrientationChange(){if(this.optimizeForMobile(),/iPhone|iPad|iPod/.test(navigator.userAgent)){const e=window.innerHeight*.01;document.documentElement.style.setProperty("--vh",`${e}px`)}this.triggerCallbacks("orientationChange",{isMobile:this.isMobile})}debounce(e,t){let o;return function(...r){const i=()=>{clearTimeout(o),e(...r)};clearTimeout(o),o=setTimeout(i,t)}}addMobileStyles(){const e=document.createElement("style");e.textContent=`
      /* 移动端紧凑优化样式 */
      @media (max-width: 768px) {
        /* 全局紧凑化 */
        body {
          font-size: 14px;
          line-height: 1.4;
        }

        /* 防止iOS Safari缩放 */
        input, select, textarea {
          font-size: 16px !important;
        }

        /* 优化触摸目标 - 保持可用性 */
        button, .btn, .tab-btn, a {
          min-height: 40px;
          min-width: 40px;
        }

        /* 移除容器边距，实现沉浸式 */
        .container {
          padding: 6px 0 !important;
          margin: 0 !important;
        }

        /* 添加轻量容器背景，保持模块清晰 */
        .input-card,
        .result-card,
        .ai-response,
        .question-options,
        .inspiration-card,
        .continue-explore {
          background: #f8f9fa !important;
          border-radius: 6px !important;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06) !important;
          border: 1px solid #e9ecef !important;
          backdrop-filter: none !important;
          padding: 15px 12px !important;
          margin: 8px 0 !important;
          word-wrap: break-word !important;
          overflow-wrap: break-word !important;
          max-width: 100% !important;
        }

        /* 紧凑表格样式 */
        .table-wrapper {
          border: none;
          border-radius: 0;
          overflow: hidden;
          margin: 4px 0;
        }

        .bazi-table,
        .professional-chart {
          font-size: 14px;
          border: 1px solid #ddd;
        }

        .bazi-table th,
        .bazi-table td,
        .cell {
          padding: 4px 2px !important;
          min-height: 32px !important;
        }

        /* 紧凑问题灵感卡片 */
        .questions-grid {
          gap: 6px !important;
        }

        .questions-grid p {
          min-height: 36px !important;
          padding: 6px 8px !important;
          font-size: 13px !important;
          border-radius: 4px !important;
          margin: 0 !important;
        }

        /* 紧凑按钮样式 */
        .primary-button,
        .question-button,
        .ai-button,
        .back-button {
          padding: 8px 12px !important;
          font-size: 13px !important;
          min-height: 36px !important;
          border-radius: 4px !important;
        }

        /* 紧凑标题 */
        h1, h2, h3, h4 {
          font-size: 1.1em !important;
          margin: 8px 0 6px 0 !important;
          line-height: 1.3 !important;
        }

        /* 紧凑段落 */
        p {
          margin-bottom: 8px !important;
          font-size: 13px !important;
          line-height: 1.4 !important;
        }



        /* 紧凑标签页 */
        .tab-navigation {
          padding: 2px !important;
          margin-bottom: 6px !important;
        }

        .tab-button {
          padding: 6px 8px !important;
          font-size: 12px !important;
        }

        /* 紧凑AI响应 */
        .ai-response h3,
        .question-options h3,
        .inspiration-card h3 {
          font-size: 1em !important;
          margin-bottom: 8px !important;
        }

        /* 移除多余的间距和装饰 */
        .ai-chat-container {
          margin-top: 8px !important;
          padding: 0 !important;
        }

        /* 紧凑专业详情 */
        .professional-detail-container {
          padding: 4px !important;
          font-size: 11px !important;
        }

        .pro-info-panel {
          padding: 4px 6px !important;
          margin-bottom: 6px !important;
          font-size: 11px !important;
          background: #f8f9fa !important;
          border-radius: 4px !important;
        }

        .fortune-item {
          padding: 2px 1px !important;
          font-size: 10px !important;
          min-width: 45px !important;
          max-width: 60px !important;
        }

        /* 移除加载和错误容器的多余装饰 */
        .loading-container,
        .error-container {
          padding: 20px 8px !important;
          font-size: 14px !important;
        }
      }

      /* iOS Safari视口修复 */
      .full-height {
        height: 100vh;
        height: calc(var(--vh, 1vh) * 100);
      }
    `,document.head.appendChild(e)}onEvent(e){const t=Date.now()+Math.random();return this.callbacks.set(t,e),t}offEvent(e){this.callbacks.delete(e)}triggerCallbacks(e,t){this.callbacks.forEach(o=>{try{o(e,t)}catch(s){console.error("Mobile optimizer callback error:",s)}})}getDeviceInfo(){return{isMobile:this.isMobile,isTouch:this.isTouch,userAgent:navigator.userAgent,screenWidth:window.screen.width,screenHeight:window.screen.height,windowWidth:window.innerWidth,windowHeight:window.innerHeight}}}const L=new ge;const fe={id:"app"},be={__name:"App-zw",setup(n){let e=null;return S(()=>{e=L.onEvent((t,o)=>{console.log("Mobile optimizer event:",t,o)}),K(),console.log("紫薇排盘应用初始化完成")}),C(()=>{e&&L.offEvent(e)}),(t,o)=>{const s=R("router-view");return m(),g("div",fe,[x(s),x(ie,{ref:"toastRef"},null,512),x(me,{cancellable:!1,"show-progress":!1})])}}};const we=[{path:"/",name:"ZiWei",component:()=>J(()=>import("./ZiWeiView-2fcf836d.js"),["assets/js/ZiWeiView-2fcf836d.js","assets/js/vendor-1aace270.js","assets/js/iztro-8dcb482b.js","assets/js/tyme-86b89837.js","assets/js/marked-9682a234.js","assets/css/ZiWeiView-c576281d.css"])},{path:"/:pathMatch(.*)*",redirect:"/"}],D=j({history:Q(),routes:we});D.beforeEach((n,e,t)=>{document.title="紫薇排盘",t()});const ve=U(),M=W(be);M.use(ve);M.use(D);M.mount("#app");export{Z as E,ie as T,P as _,_e as a,b as e,E as l,xe as s};
