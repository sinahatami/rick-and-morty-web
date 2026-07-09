(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[636],{89:(t,e,r)=>{"use strict";r.d(e,{Q:()=>i});var i=class{constructor(){this.listeners=new Set,this.subscribe=this.subscribe.bind(this)}subscribe(t){return this.listeners.add(t),this.onSubscribe(),()=>{this.listeners.delete(t),this.onUnsubscribe()}}hasListeners(){return this.listeners.size>0}onSubscribe(){}onUnsubscribe(){}}},92:(t,e,r)=>{(window.__NEXT_P=window.__NEXT_P||[]).push(["/_app",function(){return r(2921)}])},388:(t,e,r)=>{"use strict";r.d(e,{jG:()=>s});var i=r(8306).Zq,s=function(){let t=[],e=0,r=t=>{t()},s=t=>{t()},a=i,o=i=>{e?t.push(i):a(()=>{r(i)})};return{batch:i=>{let o;e++;try{o=i()}finally{--e||(()=>{let e=t;t=[],e.length&&a(()=>{s(()=>{e.forEach(t=>{r(t)})})})})()}return o},batchCalls:t=>(...e)=>{o(()=>{t(...e)})},schedule:o,setNotifyFunction:t=>{r=t},setBatchNotifyFunction:t=>{s=t},setScheduler:t=>{a=t}}}()},1482:(t,e,r)=>{"use strict";r.d(e,{PL:()=>s,RQ:()=>l,rB:()=>n});var i=r(7149);function s(t){return{onFetch:(e,r)=>{let s=e.options,n=e.fetchOptions?.meta?.fetchMore?.direction,l=e.state.data?.pages||[],c=e.state.data?.pageParams||[],u={pages:[],pageParams:[]},d=0,f=async()=>{let r=!1,f=(0,i.ZM)(e.options,e.fetchOptions),h=async(t,s,a)=>{if(r)return Promise.reject(e.signal.reason);if(null==s&&t.pages.length)return Promise.resolve(t);let o=(()=>{let t={client:e.client,queryKey:e.queryKey,pageParam:s,direction:a?"backward":"forward",meta:e.options.meta};return(0,i.ox)(t,()=>e.signal,()=>r=!0),t})(),n=await f(o),{maxPages:l}=e.options,c=a?i.ZZ:i.y9;return{pages:c(t.pages,n,l),pageParams:c(t.pageParams,s,l)}};if(n&&l.length){let t="backward"===n,e={pages:l,pageParams:c},r=(t?o:a)(s,e);u=await h(e,r,t)}else{let e=t??l.length;do{let t=0===d?c[0]??s.initialPageParam:a(s,u);if(d>0&&null==t)break;u=await h(u,t),d++}while(d<e)}return u};e.options.persister?e.fetchFn=()=>e.options.persister?.(f,{client:e.client,queryKey:e.queryKey,meta:e.options.meta,signal:e.signal},r):e.fetchFn=f}}}function a(t,{pages:e,pageParams:r}){let i=e.length-1;return e.length>0?t.getNextPageParam(e[i],e,r[i],r):void 0}function o(t,{pages:e,pageParams:r}){return e.length>0?t.getPreviousPageParam?.(e[0],e,r[0],r):void 0}function n(t,e){return!!e&&null!=a(t,e)}function l(t,e){return!!e&&!!t.getPreviousPageParam&&null!=o(t,e)}},1673:(t,e,r)=>{"use strict";r.d(e,{q:()=>s});let i={portal:{primary:"#B8E986",secondary:"#97C06B",text:"text-green-700",lightBg:"bg-[#B8E986]/10",lightBorder:"border-[#B8E986]/20",gradient:"from-[#B8E986] via-[#43D45D] to-[#B8E986]",name:"Portal"},rick:{primary:"#00B5CC",secondary:"#0091A3",text:"text-[#0091A3]",lightBg:"bg-[#00B5CC]/10",lightBorder:"border-[#00B5CC]/20",gradient:"from-[#00B5CC] via-[#00E5FF] to-[#00B5CC]",name:"Rick"},morty:{primary:"#FF9800",secondary:"#F57C00",text:"text-[#E65100]",lightBg:"bg-[#FF9800]/10",lightBorder:"border-[#FF9800]/20",gradient:"from-orange-400 via-amber-300 to-yellow-400",name:"Morty"}};function s(t,e){let r=(null==t?void 0:t.toLowerCase())||"default",s=(null==e?void 0:e.toLowerCase())||"";return s.includes("citadel of ricks")||"last known location"===s?i.portal:i[({character:"portal",location:"rick",episode:"morty",portal:"portal",rick:"rick",morty:"morty"})[r]||"default"]}},1883:(t,e,r)=>{"use strict";function i(){let t,e,r=new Promise((r,i)=>{t=r,e=i});function i(t){Object.assign(r,t),delete r.resolve,delete r.reject}return r.status="pending",r.catch(()=>{}),r.resolve=e=>{i({status:"fulfilled",value:e}),t(e)},r.reject=t=>{i({status:"rejected",reason:t}),e(t)},r}r.d(e,{T:()=>i})},2921:(t,e,r)=>{"use strict";r.r(e),r.d(e,{default:()=>K});var i=r(7876),s=r(7149),a=r(8444),o=r(388),n=r(89),l=class extends n.Q{constructor(t={}){super(),this.config=t,this.#t=new Map}#t;build(t,e,r){let i=e.queryKey,o=e.queryHash??(0,s.F$)(i,e),n=this.get(o);return n||(n=new a.X({client:t,queryKey:i,queryHash:o,options:t.defaultQueryOptions(e),state:r,defaultOptions:t.getQueryDefaults(i)}),this.add(n)),n}add(t){this.#t.has(t.queryHash)||(this.#t.set(t.queryHash,t),this.notify({type:"added",query:t}))}remove(t){let e=this.#t.get(t.queryHash);e&&(t.destroy(),e===t&&this.#t.delete(t.queryHash),this.notify({type:"removed",query:t}))}clear(){o.jG.batch(()=>{this.getAll().forEach(t=>{this.remove(t)})})}get(t){return this.#t.get(t)}getAll(){return[...this.#t.values()]}find(t){let e={exact:!0,...t};return this.getAll().find(t=>(0,s.MK)(e,t))}findAll(t={}){let e=this.getAll();return Object.keys(t).length>0?e.filter(e=>(0,s.MK)(t,e)):e}notify(t){o.jG.batch(()=>{this.listeners.forEach(e=>{e(t)})})}onFocus(){o.jG.batch(()=>{this.getAll().forEach(t=>{t.onFocus()})})}onOnline(){o.jG.batch(()=>{this.getAll().forEach(t=>{t.onOnline()})})}},c=r(6305),u=r(8149),d=class extends c.k{#e;#r;#i;#s;constructor(t){super(),this.#e=t.client,this.mutationId=t.mutationId,this.#i=t.mutationCache,this.#r=[],this.state=t.state||{context:void 0,data:void 0,error:null,failureCount:0,failureReason:null,isPaused:!1,status:"idle",variables:void 0,submittedAt:0},this.setOptions(t.options),this.scheduleGc()}setOptions(t){this.options=t,this.updateGcTime(this.options.gcTime)}get meta(){return this.options.meta}addObserver(t){this.#r.includes(t)||(this.#r.push(t),this.clearGcTimeout(),this.#i.notify({type:"observerAdded",mutation:this,observer:t}))}removeObserver(t){this.#r=this.#r.filter(e=>e!==t),this.scheduleGc(),this.#i.notify({type:"observerRemoved",mutation:this,observer:t})}optionalRemove(){this.#r.length||("pending"===this.state.status?this.scheduleGc():this.#i.remove(this))}continue(){return this.#s?.continue()??this.execute(this.state.variables)}async execute(t){let e=()=>{this.#a({type:"continue"})},r={client:this.#e,meta:this.options.meta,mutationKey:this.options.mutationKey};this.#s=(0,u.II)({fn:()=>this.options.mutationFn?this.options.mutationFn(t,r):Promise.reject(Error("No mutationFn found")),onFail:(t,e)=>{this.#a({type:"failed",failureCount:t,error:e})},onPause:()=>{this.#a({type:"pause"})},onContinue:e,retry:this.options.retry??0,retryDelay:this.options.retryDelay,networkMode:this.options.networkMode,canRun:()=>this.#i.canRun(this)});let i="pending"===this.state.status,s=!this.#s.canStart();try{if(i)e();else{this.#a({type:"pending",variables:t,isPaused:s}),this.#i.config.onMutate&&await this.#i.config.onMutate(t,this,r);let e=await this.options.onMutate?.(t,r);e!==this.state.context&&this.#a({type:"pending",context:e,variables:t,isPaused:s})}let a=await this.#s.start();return await this.#i.config.onSuccess?.(a,t,this.state.context,this,r),await this.options.onSuccess?.(a,t,this.state.context,r),await this.#i.config.onSettled?.(a,null,this.state.variables,this.state.context,this,r),await this.options.onSettled?.(a,null,t,this.state.context,r),this.#a({type:"success",data:a}),a}catch(e){try{await this.#i.config.onError?.(e,t,this.state.context,this,r)}catch(t){Promise.reject(t)}try{await this.options.onError?.(e,t,this.state.context,r)}catch(t){Promise.reject(t)}try{await this.#i.config.onSettled?.(void 0,e,this.state.variables,this.state.context,this,r)}catch(t){Promise.reject(t)}try{await this.options.onSettled?.(void 0,e,t,this.state.context,r)}catch(t){Promise.reject(t)}throw this.#a({type:"error",error:e}),e}finally{this.#i.runNext(this)}}#a(t){this.state=(e=>{switch(t.type){case"failed":return{...e,failureCount:t.failureCount,failureReason:t.error};case"pause":return{...e,isPaused:!0};case"continue":return{...e,isPaused:!1};case"pending":return{...e,context:t.context,data:void 0,failureCount:0,failureReason:null,error:null,isPaused:t.isPaused,status:"pending",variables:t.variables,submittedAt:Date.now()};case"success":return{...e,data:t.data,failureCount:0,failureReason:null,error:null,status:"success",isPaused:!1};case"error":return{...e,data:void 0,error:t.error,failureCount:e.failureCount+1,failureReason:t.error,isPaused:!1,status:"error"}}})(this.state),o.jG.batch(()=>{this.#r.forEach(e=>{e.onMutationUpdate(t)}),this.#i.notify({mutation:this,type:"updated",action:t})})}},f=class extends n.Q{constructor(t={}){super(),this.config=t,this.#o=new Set,this.#n=new Map,this.#l=0}#o;#n;#l;build(t,e,r){let i=new d({client:t,mutationCache:this,mutationId:++this.#l,options:t.defaultMutationOptions(e),state:r});return this.add(i),i}add(t){this.#o.add(t);let e=h(t);if("string"==typeof e){let r=this.#n.get(e);r?r.push(t):this.#n.set(e,[t])}this.notify({type:"added",mutation:t})}remove(t){if(this.#o.delete(t)){let e=h(t);if("string"==typeof e){let r=this.#n.get(e);if(r)if(r.length>1){let e=r.indexOf(t);-1!==e&&r.splice(e,1)}else r[0]===t&&this.#n.delete(e)}}this.notify({type:"removed",mutation:t})}canRun(t){let e=h(t);if("string"!=typeof e)return!0;{let r=this.#n.get(e),i=r?.find(t=>"pending"===t.state.status);return!i||i===t}}runNext(t){let e=h(t);if("string"!=typeof e)return Promise.resolve();{let r=this.#n.get(e)?.find(e=>e!==t&&e.state.isPaused);return r?.continue()??Promise.resolve()}}clear(){o.jG.batch(()=>{this.#o.forEach(t=>{this.notify({type:"removed",mutation:t})}),this.#o.clear(),this.#n.clear()})}getAll(){return Array.from(this.#o)}find(t){let e={exact:!0,...t};return this.getAll().find(t=>(0,s.nJ)(e,t))}findAll(t={}){return this.getAll().filter(e=>(0,s.nJ)(t,e))}notify(t){o.jG.batch(()=>{this.listeners.forEach(e=>{e(t)})})}resumePausedMutations(){let t=this.getAll().filter(t=>t.state.isPaused);return o.jG.batch(()=>Promise.all(t.map(t=>t.continue().catch(s.lQ))))}};function h(t){return t.options.scope?.id}var p=r(8275),y=r(8070),m=class{#c;#i;#u;#d;#f;#h;#p;#y;constructor(t={}){this.#c=t.queryCache||new l,this.#i=t.mutationCache||new f,this.#u=t.defaultOptions||{},this.#d=new Map,this.#f=new Map,this.#h=0}mount(){this.#h++,1===this.#h&&(this.#p=p.m.subscribe(async t=>{t&&(await this.resumePausedMutations(),this.#c.onFocus())}),this.#y=y.t.subscribe(async t=>{t&&(await this.resumePausedMutations(),this.#c.onOnline())}))}unmount(){this.#h--,0===this.#h&&(this.#p?.(),this.#p=void 0,this.#y?.(),this.#y=void 0)}isFetching(t){return this.#c.findAll({...t,fetchStatus:"fetching"}).length}isMutating(t){return this.#i.findAll({...t,status:"pending"}).length}getQueryData(t){let e=this.defaultQueryOptions({queryKey:t});return this.#c.get(e.queryHash)?.state.data}ensureQueryData(t){let e=this.defaultQueryOptions(t),r=this.#c.build(this,e),i=r.state.data;return void 0===i?this.fetchQuery(t):(t.revalidateIfStale&&r.isStaleByTime((0,s.d2)(e.staleTime,r))&&this.prefetchQuery(e),Promise.resolve(i))}getQueriesData(t){return this.#c.findAll(t).map(({queryKey:t,state:e})=>[t,e.data])}setQueryData(t,e,r){let i=this.defaultQueryOptions({queryKey:t}),a=this.#c.get(i.queryHash),o=a?.state.data,n=(0,s.Zw)(e,o);if(void 0!==n)return this.#c.build(this,i).setData(n,{...r,manual:!0})}setQueriesData(t,e,r){return o.jG.batch(()=>this.#c.findAll(t).map(({queryKey:t})=>[t,this.setQueryData(t,e,r)]))}getQueryState(t){let e=this.defaultQueryOptions({queryKey:t});return this.#c.get(e.queryHash)?.state}removeQueries(t){let e=this.#c;o.jG.batch(()=>{e.findAll(t).forEach(t=>{e.remove(t)})})}resetQueries(t,e){let r=this.#c;return o.jG.batch(()=>(r.findAll(t).forEach(t=>{t.reset()}),this.refetchQueries({type:"active",...t},e)))}cancelQueries(t,e={}){let r={revert:!0,...e};return Promise.all(o.jG.batch(()=>this.#c.findAll(t).map(t=>t.cancel(r)))).then(s.lQ).catch(s.lQ)}invalidateQueries(t,e={}){return o.jG.batch(()=>(this.#c.findAll(t).forEach(t=>{t.invalidate()}),t?.refetchType==="none")?Promise.resolve():this.refetchQueries({...t,type:t?.refetchType??t?.type??"active"},e))}refetchQueries(t,e={}){let r={...e,cancelRefetch:e.cancelRefetch??!0};return Promise.all(o.jG.batch(()=>this.#c.findAll(t).filter(t=>!t.isDisabled()&&!t.isStatic()).map(t=>{let e=t.fetch(void 0,r);return r.throwOnError||(e=e.catch(s.lQ)),"paused"===t.state.fetchStatus?Promise.resolve():e}))).then(s.lQ)}fetchQuery(t){let e=this.defaultQueryOptions(t);void 0===e.retry&&(e.retry=!1);let r=this.#c.build(this,e);return r.isStaleByTime((0,s.d2)(e.staleTime,r))?r.fetch(e):Promise.resolve(r.state.data)}prefetchQuery(t){return this.fetchQuery(t).then(s.lQ).catch(s.lQ)}fetchInfiniteQuery(t){return t._type="infinite",this.fetchQuery(t)}prefetchInfiniteQuery(t){return this.fetchInfiniteQuery(t).then(s.lQ).catch(s.lQ)}ensureInfiniteQueryData(t){return t._type="infinite",this.ensureQueryData(t)}resumePausedMutations(){return y.t.isOnline()?this.#i.resumePausedMutations():Promise.resolve()}getQueryCache(){return this.#c}getMutationCache(){return this.#i}getDefaultOptions(){return this.#u}setDefaultOptions(t){this.#u=t}setQueryDefaults(t,e){this.#d.set((0,s.EN)(t),{queryKey:t,defaultOptions:e})}getQueryDefaults(t){let e=[...this.#d.values()],r={};return e.forEach(e=>{(0,s.Cp)(t,e.queryKey)&&Object.assign(r,e.defaultOptions)}),r}setMutationDefaults(t,e){this.#f.set((0,s.EN)(t),{mutationKey:t,defaultOptions:e})}getMutationDefaults(t){let e=[...this.#f.values()],r={};return e.forEach(e=>{(0,s.Cp)(t,e.mutationKey)&&Object.assign(r,e.defaultOptions)}),r}defaultQueryOptions(t){if(t._defaulted)return t;let e={...this.#u.queries,...this.getQueryDefaults(t.queryKey),...t,_defaulted:!0};return e.queryHash||(e.queryHash=(0,s.F$)(e.queryKey,e)),void 0===e.refetchOnReconnect&&(e.refetchOnReconnect="always"!==e.networkMode),void 0===e.throwOnError&&(e.throwOnError=!!e.suspense),!e.networkMode&&e.persister&&(e.networkMode="offlineFirst"),e.queryFn===s.hT&&(e.enabled=!1),e}defaultMutationOptions(t){return t?._defaulted?t:{...this.#u.mutations,...t?.mutationKey&&this.getMutationDefaults(t.mutationKey),...t,_defaulted:!0}}clear(){this.#c.clear(),this.#i.clear()}},g=r(7768),v=r(8230),b=r.n(v),_=r(4587),x=r.n(_),T=r(9099),w=r(4232),C=r(7963);let k=(0,C.A)("users-round",[["path",{d:"M18 21a8 8 0 0 0-16 0",key:"3ypg7q"}],["circle",{cx:"10",cy:"8",r:"5",key:"o932ke"}],["path",{d:"M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3",key:"10s06x"}]]),E=(0,C.A)("map",[["path",{d:"M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z",key:"169xi5"}],["path",{d:"M15 5.764v15",key:"1pn4in"}],["path",{d:"M9 3.236v15",key:"1uimfh"}]]);var j=r(2925),O=r(8249);let P=(0,C.A)("menu",[["path",{d:"M4 5h16",key:"1tepv9"}],["path",{d:"M4 12h16",key:"1lakjw"}],["path",{d:"M4 19h16",key:"1djgab"}]]);var S=r(9230);function I(t){let{href:e,label:r,icon:s,isActive:a,onClick:o,isMobile:n=!1}=t,{theme:l,styles:c}=(0,S.D)(),u=a?c:null;return n?(0,i.jsxs)(b(),{href:e,onClick:o,className:"\n        flex items-center justify-center gap-3 px-4 py-4 font-semibold text-lg\n        transition-all duration-200 w-full\n        ".concat(a?"".concat((null==u?void 0:u.lightBg)||"bg-gray-100"):"text-gray-500 hover:bg-gray-50 hover:text-black","\n      "),style:a?{color:null==u?void 0:u.primary}:void 0,children:[(0,i.jsx)("span",{className:a?"":"text-gray-400",style:a?{color:null==u?void 0:u.primary}:void 0,children:s}),(0,i.jsx)("span",{style:a?{color:null==u?void 0:u.primary}:void 0,children:r})]}):(0,i.jsxs)(b(),{href:e,onClick:o,className:"\n          group flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-sm\n          transition-all duration-200 ease-in-out\n          ".concat(a?"".concat((null==u?void 0:u.lightBg)||"bg-gray-100"," font-bold"):"text-gray-500 hover:bg-gray-50 hover:text-black","\n        "),style:a?{color:null==u?void 0:u.primary}:void 0,children:[(0,i.jsx)("div",{className:"transition-colors duration-200 ".concat(a?(null==u?void 0:u.text)||"text-black":"text-gray-400 group-hover:text-black"),style:a?{color:null==u?void 0:u.primary}:void 0,children:(0,i.jsx)("div",{className:"h-4 w-4 flex items-center justify-center",children:s})}),(0,i.jsx)("span",{style:a?{color:null==u?void 0:u.primary}:void 0,children:r})]})}var M=r(9478);let A={HOME:"/",CHARACTERS:{LIST:"/",DETAIL:t=>"/characters/".concat(t)},LOCATIONS:{LIST:"/locations",DETAIL:t=>"/locations/".concat(t)},EPISODES:{LIST:"/episodes",DETAIL:t=>"/episodes/".concat(t)}},R=()=>{let[t,e]=(0,w.useState)(!1),r=(0,T.useRouter)(),s=[{label:"Characters",href:A.CHARACTERS.LIST,icon:(0,i.jsx)(k,{className:"h-5 w-5"})},{label:"Locations",href:A.LOCATIONS.LIST,icon:(0,i.jsx)(E,{className:"h-5 w-5"})},{label:"Episodes",href:A.EPISODES.LIST,icon:(0,i.jsx)(j.A,{className:"h-5 w-5"})}],a=t=>"/"===t?"/"===r.pathname||r.pathname.startsWith("/characters"):r.pathname.startsWith(t);return(0,i.jsxs)("nav",{className:"fixed top-0 inset-x-0 z-50 glass border-b border-gray-200/50",children:[(0,i.jsx)(M.m,{children:(0,i.jsxs)("div",{className:"flex justify-between h-16 items-center",children:[(0,i.jsx)(b(),{href:A.HOME,className:"flex items-center gap-2",children:(0,i.jsx)(x(),{src:"".concat("/rick-and-morty-web","/images/icon.png"),alt:"Logo",width:42,height:42,priority:!0,unoptimized:!0})}),(0,i.jsx)("div",{className:"hidden md:flex items-center gap-2",children:s.map(t=>(0,i.jsx)(I,{href:t.href,label:t.label,icon:t.icon,isActive:a(t.href),isMobile:!1},t.href))}),(0,i.jsx)("button",{onClick:()=>e(!t),className:"md:hidden p-2 rounded-lg hover:bg-gray-100",children:t?(0,i.jsx)(O.A,{}):(0,i.jsx)(P,{})})]})}),t&&(0,i.jsx)("div",{className:"md:hidden bg-white border-t",children:(0,i.jsx)("div",{className:"flex flex-col p-4 gap-2",children:s.map(t=>(0,i.jsx)(I,{href:t.href,label:t.label,icon:t.icon,isActive:a(t.href),isMobile:!0,onClick:()=>e(!1)},t.href))})})]})},L=(0,C.A)("github",[["path",{d:"M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4",key:"tonef"}],["path",{d:"M9 18c-4.51 2-5-2-7-2",key:"9comsn"}]]),N=(0,C.A)("linkedin",[["path",{d:"M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z",key:"c2jq9f"}],["rect",{width:"4",height:"12",x:"2",y:"9",key:"mk3on5"}],["circle",{cx:"4",cy:"4",r:"2",key:"bt5ra8"}]]),D=(0,C.A)("heart",[["path",{d:"M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5",key:"mvr1a0"}]]);function q(){return(0,i.jsx)("footer",{className:"glass border-t border-gray-200/50 mt-auto",children:(0,i.jsxs)(M.m,{className:"py-12",children:[(0,i.jsxs)("div",{className:"flex flex-col md:flex-row justify-between items-center gap-6",children:[(0,i.jsxs)("div",{className:"text-center md:text-left",children:[(0,i.jsx)("h3",{className:"text-xl font-black text-[#0B1E2D] mb-2",children:"Rick & Morty Wiki"}),(0,i.jsxs)("p",{className:"text-gray-500 text-sm font-medium",children:["Data provided by"," ",(0,i.jsx)("a",{href:"https://rickandmortyapi.com/",target:"_blank",rel:"noreferrer",className:"text-[#00B5CC] hover:underline",children:"The Rick and Morty API"})]})]}),(0,i.jsxs)("div",{className:"flex items-center gap-4",children:[(0,i.jsx)("a",{href:"https://github.com/sinahatami/",className:"p-2 bg-gray-50 rounded-lg text-gray-400 hover:text-[#00B5CC] hover:bg-[#00B5CC]/10 transition-colors",children:(0,i.jsx)(L,{className:"w-5 h-5"})}),(0,i.jsx)("a",{href:"https://www.linkedin.com/in/sina-hatami/",className:"p-2 bg-gray-50 rounded-lg text-gray-400 hover:text-[#00B5CC] hover:bg-[#00B5CC]/10 transition-colors",children:(0,i.jsx)(N,{className:"w-5 h-5"})})]})]}),(0,i.jsxs)("div",{className:"mt-8 pt-8 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-bold text-gray-400 uppercase tracking-widest",children:[(0,i.jsxs)("div",{className:"flex items-center gap-3",children:[(0,i.jsxs)("span",{children:["\xa9 ",new Date().getFullYear()," Sina Hatami"]}),(0,i.jsx)("span",{className:"text-gray-200",children:"|"}),(0,i.jsxs)("span",{children:["v","1.0.0"]})]}),(0,i.jsxs)("span",{className:"flex items-center gap-1",children:["Made with ",(0,i.jsx)(D,{className:"w-3 h-3 text-red-500 fill-current"})," in Alpha Centauri"]})]})]})})}var F=r(5739);function z(t,e){return t.findAll(e.filters).map(t=>e.select?e.select(t):t.state)}function Q(){return!function(t,e){let r=(0,g.jE)(void 0);return function(t={},e){let r=(0,g.jE)(e).getMutationCache(),i=w.useRef(t),a=w.useRef(null);return null===a.current&&(a.current=z(r,t)),w.useEffect(()=>{i.current=t}),w.useSyncExternalStore(w.useCallback(t=>r.subscribe(()=>{let e=(0,s.BH)(a.current,z(r,i.current));a.current!==e&&(a.current=e,o.jG.schedule(t))}),[r]),()=>a.current,()=>a.current)}({filters:{...void 0,status:"pending"}},r).length}()?null:(0,i.jsx)("div",{className:"fixed top-4 right-4 z-50 animate-in fade-in slide-in-from-top-2 duration-300",children:(0,i.jsxs)("div",{className:"flex items-center gap-3 px-4 py-2.5 bg-gray-900/95 backdrop-blur text-white rounded-xl shadow-2xl border border-gray-700/50",children:[(0,i.jsx)(F.A,{className:"h-4 w-4 animate-spin text-blue-400"}),(0,i.jsx)("span",{className:"text-sm font-medium tracking-wide",children:"Processing..."})]})})}let B=(0,C.A)("chevron-up",[["path",{d:"m18 15-6-6-6 6",key:"153udz"}]]);function U(){let[t,e]=(0,w.useState)(!1),[r,s]=(0,w.useState)(!1),{styles:a}=(0,S.D)();return(0,w.useEffect)(()=>{let t=()=>e(window.scrollY>500);return window.addEventListener("scroll",t),()=>window.removeEventListener("scroll",t)},[]),(0,i.jsx)("button",{onClick:()=>window.scrollTo({top:0,behavior:"smooth"}),onMouseEnter:()=>s(!0),onMouseLeave:()=>s(!1),className:"\n        fixed bottom-8 right-8 z-50 \n        p-3 rounded-full \n        shadow-lg cursor-pointer\n        backdrop-blur-sm\n        transition-all duration-300 ease-in-out\n        border-2\n        ".concat(t?"opacity-100 translate-y-0":"opacity-0 translate-y-10 pointer-events-none","\n      "),style:{borderColor:r?a.primary:"#e5e7eb",color:r?a.primary:"#6b7280",backgroundColor:r?"".concat(a.primary,"20"):"rgba(255, 255, 255, 0.8)",transform:r?"translateY(-4px)":"translateY(0)"},children:(0,i.jsx)(B,{className:"h-6 w-6"})})}function G(t){let{children:e}=t;return(0,i.jsxs)("div",{className:"min-h-screen flex flex-col bg-white text-gray-900",children:[(0,i.jsx)(R,{}),(0,i.jsx)(Q,{}),(0,i.jsx)(U,{}),(0,i.jsx)("main",{className:"flex-1",children:e}),(0,i.jsx)(q,{})]})}r(9407);var H=r(4301);r(3754);let $=new m({defaultOptions:{queries:{staleTime:3e5,gcTime:6e5,retry:2,refetchOnWindowFocus:!1,refetchOnMount:!1}}});function K(t){let{Component:e,pageProps:r}=t;return(0,i.jsx)(g.Ht,{client:$,children:(0,i.jsxs)(S.N,{defaultTheme:"portal",children:[(0,i.jsx)(G,{children:(0,i.jsx)(e,{...r})}),(0,i.jsx)(H.N9,{position:"bottom-right",theme:"dark"})]})})}},2925:(t,e,r)=>{"use strict";r.d(e,{A:()=>i});let i=(0,r(7963).A)("film",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M7 3v18",key:"bbkbws"}],["path",{d:"M3 7.5h4",key:"zfgn84"}],["path",{d:"M3 12h18",key:"1i2n21"}],["path",{d:"M3 16.5h4",key:"1230mu"}],["path",{d:"M17 3v18",key:"in4fa5"}],["path",{d:"M17 7.5h4",key:"myr1c1"}],["path",{d:"M17 16.5h4",key:"go4c1d"}]])},3408:(t,e,r)=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"getImgProps",{enumerable:!0,get:function(){return l}}),r(6201);let i=r(8637),s=r(9161),a=["-moz-initial","fill","none","scale-down",void 0];function o(t){return void 0!==t.default}function n(t){return void 0===t?t:"number"==typeof t?Number.isFinite(t)?t:NaN:"string"==typeof t&&/^[0-9]+$/.test(t)?parseInt(t,10):NaN}function l(t,e){var r,l;let c,u,d,{src:f,sizes:h,unoptimized:p=!1,priority:y=!1,loading:m,className:g,quality:v,width:b,height:_,fill:x=!1,style:T,overrideSrc:w,onLoad:C,onLoadingComplete:k,placeholder:E="empty",blurDataURL:j,fetchPriority:O,decoding:P="async",layout:S,objectFit:I,objectPosition:M,lazyBoundary:A,lazyRoot:R,...L}=t,{imgConf:N,showAltText:D,blurComplete:q,defaultLoader:F}=e,z=N||s.imageConfigDefault;if("allSizes"in z)c=z;else{let t=[...z.deviceSizes,...z.imageSizes].sort((t,e)=>t-e),e=z.deviceSizes.sort((t,e)=>t-e),i=null==(r=z.qualities)?void 0:r.sort((t,e)=>t-e);c={...z,allSizes:t,deviceSizes:e,qualities:i}}if(void 0===F)throw Object.defineProperty(Error("images.loaderFile detected but the file is missing default export.\nRead more: https://nextjs.org/docs/messages/invalid-images-config"),"__NEXT_ERROR_CODE",{value:"E163",enumerable:!1,configurable:!0});let Q=L.loader||F;delete L.loader,delete L.srcSet;let B="__next_img_default"in Q;if(B){if("custom"===c.loader)throw Object.defineProperty(Error('Image with src "'+f+'" is missing "loader" prop.\nRead more: https://nextjs.org/docs/messages/next-image-missing-loader'),"__NEXT_ERROR_CODE",{value:"E252",enumerable:!1,configurable:!0})}else{let t=Q;Q=e=>{let{config:r,...i}=e;return t(i)}}if(S){"fill"===S&&(x=!0);let t={intrinsic:{maxWidth:"100%",height:"auto"},responsive:{width:"100%",height:"auto"}}[S];t&&(T={...T,...t});let e={responsive:"100vw",fill:"100vw"}[S];e&&!h&&(h=e)}let U="",G=n(b),H=n(_);if((l=f)&&"object"==typeof l&&(o(l)||void 0!==l.src)){let t=o(f)?f.default:f;if(!t.src)throw Object.defineProperty(Error("An object should only be passed to the image component src parameter if it comes from a static image import. It must include src. Received "+JSON.stringify(t)),"__NEXT_ERROR_CODE",{value:"E460",enumerable:!1,configurable:!0});if(!t.height||!t.width)throw Object.defineProperty(Error("An object should only be passed to the image component src parameter if it comes from a static image import. It must include height and width. Received "+JSON.stringify(t)),"__NEXT_ERROR_CODE",{value:"E48",enumerable:!1,configurable:!0});if(u=t.blurWidth,d=t.blurHeight,j=j||t.blurDataURL,U=t.src,!x)if(G||H){if(G&&!H){let e=G/t.width;H=Math.round(t.height*e)}else if(!G&&H){let e=H/t.height;G=Math.round(t.width*e)}}else G=t.width,H=t.height}let $=!y&&("lazy"===m||void 0===m);(!(f="string"==typeof f?f:U)||f.startsWith("data:")||f.startsWith("blob:"))&&(p=!0,$=!1),c.unoptimized&&(p=!0),B&&!c.dangerouslyAllowSVG&&f.split("?",1)[0].endsWith(".svg")&&(p=!0);let K=n(v),X=Object.assign(x?{position:"absolute",height:"100%",width:"100%",left:0,top:0,right:0,bottom:0,objectFit:I,objectPosition:M}:{},D?{}:{color:"transparent"},T),W=q||"empty"===E?null:"blur"===E?'url("data:image/svg+xml;charset=utf-8,'+(0,i.getImageBlurSvg)({widthInt:G,heightInt:H,blurWidth:u,blurHeight:d,blurDataURL:j||"",objectFit:X.objectFit})+'")':'url("'+E+'")',Z=a.includes(X.objectFit)?"fill"===X.objectFit?"100% 100%":"cover":X.objectFit,Y=W?{backgroundSize:Z,backgroundPosition:X.objectPosition||"50% 50%",backgroundRepeat:"no-repeat",backgroundImage:W}:{},V=function(t){let{config:e,src:r,unoptimized:i,width:s,quality:a,sizes:o,loader:n}=t;if(i)return{src:r,srcSet:void 0,sizes:void 0};let{widths:l,kind:c}=function(t,e,r){let{deviceSizes:i,allSizes:s}=t;if(r){let t=/(^|\s)(1?\d?\d)vw/g,e=[];for(let i;i=t.exec(r);)e.push(parseInt(i[2]));if(e.length){let t=.01*Math.min(...e);return{widths:s.filter(e=>e>=i[0]*t),kind:"w"}}return{widths:s,kind:"w"}}return"number"!=typeof e?{widths:i,kind:"w"}:{widths:[...new Set([e,2*e].map(t=>s.find(e=>e>=t)||s[s.length-1]))],kind:"x"}}(e,s,o),u=l.length-1;return{sizes:o||"w"!==c?o:"100vw",srcSet:l.map((t,i)=>n({config:e,src:r,quality:a,width:t})+" "+("w"===c?t:i+1)+c).join(", "),src:n({config:e,src:r,quality:a,width:l[u]})}}({config:c,src:f,unoptimized:p,width:G,quality:K,sizes:h,loader:Q});return{props:{...L,loading:$?"lazy":m,fetchPriority:O,width:G,height:H,decoding:P,className:g,style:{...X,...Y},sizes:V.sizes,srcSet:V.srcSet,src:w||V.src},meta:{unoptimized:p,priority:y,placeholder:E,fill:x}}}},3754:()=>{},3786:(t,e,r)=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"useIntersection",{enumerable:!0,get:function(){return l}});let i=r(4232),s=r(3273),a="function"==typeof IntersectionObserver,o=new Map,n=[];function l(t){let{rootRef:e,rootMargin:r,disabled:l}=t,c=l||!a,[u,d]=(0,i.useState)(!1),f=(0,i.useRef)(null),h=(0,i.useCallback)(t=>{f.current=t},[]);return(0,i.useEffect)(()=>{if(a){if(c||u)return;let t=f.current;if(t&&t.tagName)return function(t,e,r){let{id:i,observer:s,elements:a}=function(t){let e,r={root:t.root||null,margin:t.rootMargin||""},i=n.find(t=>t.root===r.root&&t.margin===r.margin);if(i&&(e=o.get(i)))return e;let s=new Map;return e={id:r,observer:new IntersectionObserver(t=>{t.forEach(t=>{let e=s.get(t.target),r=t.isIntersecting||t.intersectionRatio>0;e&&r&&e(r)})},t),elements:s},n.push(r),o.set(r,e),e}(r);return a.set(t,e),s.observe(t),function(){if(a.delete(t),s.unobserve(t),0===a.size){s.disconnect(),o.delete(i);let t=n.findIndex(t=>t.root===i.root&&t.margin===i.margin);t>-1&&n.splice(t,1)}}}(t,t=>t&&d(t),{root:null==e?void 0:e.current,rootMargin:r})}else if(!u){let t=(0,s.requestIdleCallback)(()=>d(!0));return()=>(0,s.cancelIdleCallback)(t)}},[c,r,e,u,f.current]),[h,u,(0,i.useCallback)(()=>{d(!1)},[])]}("function"==typeof e.default||"object"==typeof e.default&&null!==e.default)&&void 0===e.default.__esModule&&(Object.defineProperty(e.default,"__esModule",{value:!0}),Object.assign(e.default,e),t.exports=e.default)},4009:(t,e,r)=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),!function(t,e){for(var r in e)Object.defineProperty(t,r,{enumerable:!0,get:e[r]})}(e,{default:function(){return T},useLinkStatus:function(){return x}});let i=r(8365),s=r(7876),a=i._(r(4232)),o=r(4727),n=r(1623),l=r(170),c=r(464),u=r(125),d=r(242),f=r(3786),h=r(4327),p=r(9094),y=r(9203);r(5785);let m=new Set;function g(t,e,r,i){if((0,n.isLocalURL)(e)){if(!i.bypassPrefetchedCheck){let s=e+"%"+r+"%"+(void 0!==i.locale?i.locale:"locale"in t?t.locale:void 0);if(m.has(s))return;m.add(s)}t.prefetch(e,r,i).catch(t=>{})}}function v(t){return"string"==typeof t?t:(0,l.formatUrl)(t)}let b=a.default.forwardRef(function(t,e){let r,i,{href:l,as:m,children:b,prefetch:_=null,passHref:x,replace:T,shallow:w,scroll:C,locale:k,onClick:E,onNavigate:j,onMouseEnter:O,onTouchStart:P,legacyBehavior:S=!1,...I}=t;r=b,S&&("string"==typeof r||"number"==typeof r)&&(r=(0,s.jsx)("a",{children:r}));let M=a.default.useContext(d.RouterContext),A=!1!==_,{href:R,as:L}=a.default.useMemo(()=>{if(!M){let t=v(l);return{href:t,as:m?v(m):t}}let[t,e]=(0,o.resolveHref)(M,l,!0);return{href:t,as:m?(0,o.resolveHref)(M,m):e||t}},[M,l,m]),N=a.default.useRef(R),D=a.default.useRef(L);S&&(i=a.default.Children.only(r));let q=S?i&&"object"==typeof i&&i.ref:e,[F,z,Q]=(0,f.useIntersection)({rootMargin:"200px"}),B=a.default.useCallback(t=>{(D.current!==L||N.current!==R)&&(Q(),D.current=L,N.current=R),F(t)},[L,R,Q,F]),U=(0,y.useMergedRef)(B,q);a.default.useEffect(()=>{M&&z&&A&&g(M,R,L,{locale:k})},[L,R,z,k,A,null==M?void 0:M.locale,M]);let G={ref:U,onClick(t){S||"function"!=typeof E||E(t),S&&i.props&&"function"==typeof i.props.onClick&&i.props.onClick(t),M&&(t.defaultPrevented||function(t,e,r,i,s,a,o,l,c){let{nodeName:u}=t.currentTarget;if(!("A"===u.toUpperCase()&&function(t){let e=t.currentTarget.getAttribute("target");return e&&"_self"!==e||t.metaKey||t.ctrlKey||t.shiftKey||t.altKey||t.nativeEvent&&2===t.nativeEvent.which}(t)||t.currentTarget.hasAttribute("download"))){if(!(0,n.isLocalURL)(r)){s&&(t.preventDefault(),location.replace(r));return}t.preventDefault(),(()=>{if(c){let t=!1;if(c({preventDefault:()=>{t=!0}}),t)return}let t=null==o||o;"beforePopState"in e?e[s?"replace":"push"](r,i,{shallow:a,locale:l,scroll:t}):e[s?"replace":"push"](i||r,{scroll:t})})()}}(t,M,R,L,T,w,C,k,j))},onMouseEnter(t){S||"function"!=typeof O||O(t),S&&i.props&&"function"==typeof i.props.onMouseEnter&&i.props.onMouseEnter(t),M&&g(M,R,L,{locale:k,priority:!0,bypassPrefetchedCheck:!0})},onTouchStart:function(t){S||"function"!=typeof P||P(t),S&&i.props&&"function"==typeof i.props.onTouchStart&&i.props.onTouchStart(t),M&&g(M,R,L,{locale:k,priority:!0,bypassPrefetchedCheck:!0})}};if((0,c.isAbsoluteUrl)(L))G.href=L;else if(!S||x||"a"===i.type&&!("href"in i.props)){let t=void 0!==k?k:null==M?void 0:M.locale;G.href=(null==M?void 0:M.isLocaleDomain)&&(0,h.getDomainLocale)(L,t,null==M?void 0:M.locales,null==M?void 0:M.domainLocales)||(0,p.addBasePath)((0,u.addLocale)(L,t,null==M?void 0:M.defaultLocale))}return S?a.default.cloneElement(i,G):(0,s.jsx)("a",{...I,...G,children:r})}),_=(0,a.createContext)({pending:!1}),x=()=>(0,a.useContext)(_),T=b;("function"==typeof e.default||"object"==typeof e.default&&null!==e.default)&&void 0===e.default.__esModule&&(Object.defineProperty(e.default,"__esModule",{value:!0}),Object.assign(e.default,e),t.exports=e.default)},4301:(t,e,r)=>{"use strict";r.d(e,{N9:()=>L,oR:()=>C});var i=r(4232);let s=function(){for(var t,e,r=0,i="",s=arguments.length;r<s;r++)(t=arguments[r])&&(e=function t(e){var r,i,s="";if("string"==typeof e||"number"==typeof e)s+=e;else if("object"==typeof e)if(Array.isArray(e)){var a=e.length;for(r=0;r<a;r++)e[r]&&(i=t(e[r]))&&(s&&(s+=" "),s+=i)}else for(i in e)e[i]&&(s&&(s+=" "),s+=i);return s}(t))&&(i&&(i+=" "),i+=e);return i};var a=t=>"number"==typeof t&&!isNaN(t),o=t=>"string"==typeof t||"function"==typeof t?t:null,n=t=>(0,i.isValidElement)(t)||"string"==typeof t||"function"==typeof t||a(t);function l({enter:t,exit:e,appendPosition:r=!1,collapse:s=!0,collapseDuration:a=300}){return function({children:o,position:n,preventExitTransition:l,done:c,nodeRef:u,isIn:d,playToast:f}){let h=r?`${t}--${n}`:t,p=r?`${e}--${n}`:e,y=(0,i.useRef)(0);return(0,i.useLayoutEffect)(()=>{let t=u.current,e=h.split(" "),r=i=>{i.target===u.current&&(f(),t.removeEventListener("animationend",r),t.removeEventListener("animationcancel",r),0===y.current&&"animationcancel"!==i.type&&t.classList.remove(...e))};t.classList.add(...e),t.addEventListener("animationend",r),t.addEventListener("animationcancel",r)},[]),(0,i.useEffect)(()=>{let t=u.current,e=()=>{t.removeEventListener("animationend",e),s?function(t,e,r=300){let{scrollHeight:i,style:s}=t;requestAnimationFrame(()=>{s.minHeight="initial",s.height=i+"px",s.transition=`all ${r}ms`,requestAnimationFrame(()=>{s.height="0",s.padding="0",s.margin="0",setTimeout(e,r)})})}(t,c,a):c()};d||(l?e():(y.current=1,t.className+=` ${p}`,t.addEventListener("animationend",e)))},[d]),i.createElement(i.Fragment,null,o)}}function c(t,e){return{content:u(t.content,t.props),containerId:t.props.containerId,id:t.props.toastId,theme:t.props.theme,type:t.props.type,data:t.props.data||{},isLoading:t.props.isLoading,icon:t.props.icon,reason:t.removalReason,status:e}}function u(t,e,r=!1){return(0,i.isValidElement)(t)&&"string"!=typeof t.type?(0,i.cloneElement)(t,{closeToast:e.closeToast,toastProps:e,data:e.data,isPaused:r}):"function"==typeof t?t({closeToast:e.closeToast,toastProps:e,data:e.data,isPaused:r}):t}function d({delay:t,isRunning:e,closeToast:r,type:a="default",hide:o,className:n,controlledProgress:l,progress:c,rtl:u,isIn:d,theme:f}){let h=o||l&&0===c,p={animationDuration:`${t}ms`,animationPlayState:e?"running":"paused"};l&&(p.transform=`scaleX(${c})`);let y=s("Toastify__progress-bar",l?"Toastify__progress-bar--controlled":"Toastify__progress-bar--animated",`Toastify__progress-bar-theme--${f}`,`Toastify__progress-bar--${a}`,{"Toastify__progress-bar--rtl":u}),m="function"==typeof n?n({rtl:u,type:a,defaultClassName:y}):s(y,n);return i.createElement("div",{className:"Toastify__progress-bar--wrp","data-hidden":h},i.createElement("div",{className:`Toastify__progress-bar--bg Toastify__progress-bar-theme--${f} Toastify__progress-bar--${a}`}),i.createElement("div",{role:"progressbar","aria-hidden":h?"true":"false","aria-label":"notification timer","aria-valuenow":l?Math.round(100*c):void 0,"aria-valuemin":0,"aria-valuemax":100,className:m,style:p,...{[l&&c>=1?"onTransitionEnd":"onAnimationEnd"]:l&&c<1?null:()=>{d&&r()}}}))}var f=1,h=()=>`${f++}`,p=new Map,y=[],m=new Set,g=t=>m.forEach(e=>e(t));function v(t,e){var r;if(e)return!!(null!=(r=p.get(e))&&r.isToastActive(t));let i=!1;return p.forEach(e=>{e.isToastActive(t)&&(i=!0)}),i}function b(t,e){n(t)&&(p.size>0||y.push({content:t,options:e}),p.forEach(r=>{r.buildToast(t,e)}))}function _(t,e){p.forEach(r=>{null!=e&&null!=e&&e.containerId&&(null==e?void 0:e.containerId)!==r.id||r.toggle(t,null==e?void 0:e.id)})}function x(t,e){return b(t,e),e.toastId}function T(t,e){var r;return{...e,type:e&&e.type||t,toastId:(r=e)&&("string"==typeof r.toastId||a(r.toastId))?r.toastId:h()}}function w(t){return(e,r)=>x(e,T(t,r))}function C(t,e){return x(t,T("default",e))}C.loading=(t,e)=>x(t,T("default",{isLoading:!0,autoClose:!1,closeOnClick:!1,closeButton:!1,draggable:!1,...e})),C.promise=function(t,{pending:e,error:r,success:i},s){let a;e&&(a="string"==typeof e?C.loading(e,s):C.loading(e.render,{...s,...e}));let o={isLoading:null,autoClose:null,closeOnClick:null,closeButton:null,draggable:null},n=(t,e,r)=>{if(null==e)return void C.dismiss(a);let i={type:t,...o,...s,data:r},n="string"==typeof e?{render:e}:e;return a?C.update(a,{...i,...n}):C(n.render,{...i,...n}),r},l="function"==typeof t?t():t;return l.then(t=>n("success",i,t)).catch(t=>n("error",r,t)),l},C.success=w("success"),C.info=w("info"),C.error=w("error"),C.warning=w("warning"),C.warn=C.warning,C.dark=(t,e)=>x(t,T("default",{theme:"dark",...e})),C.dismiss=function(t){!function(t){let e;if(!(p.size>0)){y=y.filter(e=>null!=t&&e.options.toastId!==t);return}if(null==t||"string"==typeof(e=t)||a(e))p.forEach(e=>{e.removeToast(t)});else if(t&&("containerId"in t||"id"in t)){let e=p.get(t.containerId);e?e.removeToast(t.id):p.forEach(e=>{e.removeToast(t.id)})}}(t)},C.clearWaitingQueue=(t={})=>{p.forEach(e=>{e.props.limit&&(!t.containerId||e.id===t.containerId)&&e.clearQueue()})},C.isActive=v,C.update=(t,e={})=>{let r=((t,{containerId:e})=>{var r;return null==(r=p.get(e||1))?void 0:r.toasts.get(t)})(t,e);if(r){let{props:i,content:s}=r,a={delay:100,...i,...e,toastId:e.toastId||t,updateId:h()};a.toastId!==t&&(a.staleId=t);let o=a.render||s;delete a.render,x(o,a)}},C.done=t=>{C.update(t,{progress:1})},C.onChange=function(t){return m.add(t),()=>{m.delete(t)}},C.play=t=>_(!0,t),C.pause=t=>_(!1,t);var k="undefined"!=typeof window?i.useLayoutEffect:i.useEffect,E=({theme:t,type:e,isLoading:r,...s})=>i.createElement("svg",{viewBox:"0 0 24 24",width:"100%",height:"100%",fill:"colored"===t?"currentColor":`var(--toastify-icon-color-${e})`,...s}),j={info:function(t){return i.createElement(E,{...t},i.createElement("path",{d:"M12 0a12 12 0 1012 12A12.013 12.013 0 0012 0zm.25 5a1.5 1.5 0 11-1.5 1.5 1.5 1.5 0 011.5-1.5zm2.25 13.5h-4a1 1 0 010-2h.75a.25.25 0 00.25-.25v-4.5a.25.25 0 00-.25-.25h-.75a1 1 0 010-2h1a2 2 0 012 2v4.75a.25.25 0 00.25.25h.75a1 1 0 110 2z"}))},warning:function(t){return i.createElement(E,{...t},i.createElement("path",{d:"M23.32 17.191L15.438 2.184C14.728.833 13.416 0 11.996 0c-1.42 0-2.733.833-3.443 2.184L.533 17.448a4.744 4.744 0 000 4.368C1.243 23.167 2.555 24 3.975 24h16.05C22.22 24 24 22.044 24 19.632c0-.904-.251-1.746-.68-2.44zm-9.622 1.46c0 1.033-.724 1.823-1.698 1.823s-1.698-.79-1.698-1.822v-.043c0-1.028.724-1.822 1.698-1.822s1.698.79 1.698 1.822v.043zm.039-12.285l-.84 8.06c-.057.581-.408.943-.897.943-.49 0-.84-.367-.896-.942l-.84-8.065c-.057-.624.25-1.095.779-1.095h1.91c.528.005.84.476.784 1.1z"}))},success:function(t){return i.createElement(E,{...t},i.createElement("path",{d:"M12 0a12 12 0 1012 12A12.014 12.014 0 0012 0zm6.927 8.2l-6.845 9.289a1.011 1.011 0 01-1.43.188l-4.888-3.908a1 1 0 111.25-1.562l4.076 3.261 6.227-8.451a1 1 0 111.61 1.183z"}))},error:function(t){return i.createElement(E,{...t},i.createElement("path",{d:"M11.983 0a12.206 12.206 0 00-8.51 3.653A11.8 11.8 0 000 12.207 11.779 11.779 0 0011.8 24h.214A12.111 12.111 0 0024 11.791 11.766 11.766 0 0011.983 0zM10.5 16.542a1.476 1.476 0 011.449-1.53h.027a1.527 1.527 0 011.523 1.47 1.475 1.475 0 01-1.449 1.53h-.027a1.529 1.529 0 01-1.523-1.47zM11 12.5v-6a1 1 0 012 0v6a1 1 0 11-2 0z"}))},spinner:function(){return i.createElement("div",{className:"Toastify__spinner"})}},O=t=>{let{isRunning:e,preventExitTransition:r,toastRef:a,eventHandlers:o,playToast:n}=function(t){var e,r;let[s,a]=(0,i.useState)(!1),[o,n]=(0,i.useState)(!1),l=(0,i.useRef)(null),c=(0,i.useRef)({start:0,delta:0,removalDistance:0,canCloseOnClick:!0,canDrag:!1,didMove:!1}).current,{autoClose:u,pauseOnHover:d,closeToast:f,onClick:h,closeOnClick:y}=t;function m(){a(!0)}function g(){a(!1)}function v(e){let r=l.current;if(c.canDrag&&r){c.didMove=!0,s&&g(),"x"===t.draggableDirection?c.delta=e.clientX-c.start:c.delta=e.clientY-c.start,c.start!==e.clientX&&(c.canCloseOnClick=!1);let i="x"===t.draggableDirection?`${c.delta}px, var(--y)`:`0, calc(${c.delta}px + var(--y))`;r.style.transform=`translate3d(${i},0)`,r.style.opacity=`${1-Math.abs(c.delta/c.removalDistance)}`}}function b(){document.removeEventListener("pointermove",v),document.removeEventListener("pointerup",b);let e=l.current;if(c.canDrag&&c.didMove&&e){if(c.canDrag=!1,Math.abs(c.delta)>c.removalDistance){n(!0),t.closeToast(!0),t.collapseAll();return}e.style.transition="transform 0.2s, opacity 0.2s",e.style.removeProperty("transform"),e.style.removeProperty("opacity")}}e={id:t.toastId,containerId:t.containerId,fn:a},null==(r=p.get(e.containerId||1))||r.setToggle(e.id,e.fn),(0,i.useEffect)(()=>{if(t.pauseOnFocusLoss)return document.hasFocus()||g(),window.addEventListener("focus",m),window.addEventListener("blur",g),()=>{window.removeEventListener("focus",m),window.removeEventListener("blur",g)}},[t.pauseOnFocusLoss]);let _={onPointerDown:function(e){if(!0===t.draggable||t.draggable===e.pointerType){c.didMove=!1,document.addEventListener("pointermove",v),document.addEventListener("pointerup",b);let r=l.current;c.canCloseOnClick=!0,c.canDrag=!0,r.style.transition="none","x"===t.draggableDirection?(c.start=e.clientX,c.removalDistance=r.offsetWidth*(t.draggablePercent/100)):(c.start=e.clientY,c.removalDistance=r.offsetHeight*(80===t.draggablePercent?1.5*t.draggablePercent:t.draggablePercent)/100)}},onPointerUp:function(e){let{top:r,bottom:i,left:s,right:a}=l.current.getBoundingClientRect();"mouse"===e.pointerType&&t.pauseOnHover&&e.clientX>=s&&e.clientX<=a&&e.clientY>=r&&e.clientY<=i?g():m()}};return u&&d&&(_.onMouseEnter=g,t.stacked||(_.onMouseLeave=m)),y&&(_.onClick=t=>{h&&h(t),c.canCloseOnClick&&f(!0)}),{playToast:m,pauseToast:g,isRunning:s,preventExitTransition:o,toastRef:l,eventHandlers:_}}(t),{closeButton:l,children:c,autoClose:f,onClick:h,type:y,hideProgressBar:m,closeToast:g,transition:v,position:b,className:_,style:x,progressClassName:T,updateId:w,role:C,progress:k,rtl:E,toastId:O,deleteToast:P,isIn:S,isLoading:I,closeOnClick:M,theme:A,ariaLabel:R}=t,L=s("Toastify__toast",`Toastify__toast-theme--${A}`,`Toastify__toast--${y}`,{"Toastify__toast--rtl":E},{"Toastify__toast--close-on-click":M}),N="function"==typeof _?_({rtl:E,position:b,type:y,defaultClassName:L}):s(L,_),D=function({theme:t,type:e,isLoading:r,icon:s}){let a=null,o={theme:t,type:e};return!1===s||("function"==typeof s?a=s({...o,isLoading:r}):(0,i.isValidElement)(s)?a=(0,i.cloneElement)(s,o):r?a=j.spinner():e in j&&(a=j[e](o))),a}(t),q=!!k||!f,F={closeToast:g,type:y,theme:A},z=null;return!1===l||(z="function"==typeof l?l(F):(0,i.isValidElement)(l)?(0,i.cloneElement)(l,F):function({closeToast:t,theme:e,ariaLabel:r="close"}){return i.createElement("button",{className:`Toastify__close-button Toastify__close-button--${e}`,type:"button",onClick:e=>{e.stopPropagation(),t(!0)},"aria-label":r},i.createElement("svg",{"aria-hidden":"true",viewBox:"0 0 14 16"},i.createElement("path",{fillRule:"evenodd",d:"M7.71 8.23l3.75 3.75-1.48 1.48-3.75-3.75-3.75 3.75L1 11.98l3.75-3.75L1 4.48 2.48 3l3.75 3.75L9.98 3l1.48 1.48-3.75 3.75z"})))}(F)),i.createElement(v,{isIn:S,done:P,position:b,preventExitTransition:r,nodeRef:a,playToast:n},i.createElement("div",{id:O,tabIndex:0,onClick:h,"data-in":S,className:N,...o,style:x,ref:a,...S&&{role:C,"aria-label":R}},null!=D&&i.createElement("div",{className:s("Toastify__toast-icon",{"Toastify--animate-icon Toastify__zoom-enter":!I})},D),u(c,t,!e),z,!t.customProgressBar&&i.createElement(d,{...w&&!q?{key:`p-${w}`}:{},rtl:E,theme:A,delay:f,isRunning:e,isIn:S,closeToast:g,hide:m,type:y,className:T,controlledProgress:q,progress:k||0})))},P=(t,e=!1)=>({enter:`Toastify--animate Toastify__${t}-enter`,exit:`Toastify--animate Toastify__${t}-exit`,appendPosition:e}),S=l(P("bounce",!0));l(P("slide",!0)),l(P("zoom")),l(P("flip"));var I={position:"top-right",transition:S,autoClose:5e3,closeButton:!0,pauseOnHover:!0,pauseOnFocusLoss:!0,draggable:"touch",draggablePercent:80,draggableDirection:"x",role:"alert",theme:"light","aria-label":"Notifications Alt+T",hotKeys:t=>t.altKey&&"KeyT"===t.code};function M(t){let e={...I,...t},r=t.stacked,[l,u]=(0,i.useState)(!0),d=(0,i.useRef)(null),{getToastToRender:f,isToastActive:h,count:m}=function(t){var e;let r,{subscribe:s,getSnapshot:l,setProps:u}=(0,i.useRef)((r=t.containerId||1,{subscribe(e){let i,s,l,u,d,f,h,m,v,_,x,T=(i=1,s=0,l=[],u=[],d=t,f=new Map,h=new Set,m=()=>{u=Array.from(f.values()),h.forEach(t=>t())},v=t=>{var e,r;t.isActive&&(null==(r=null==(e=t.props)?void 0:e.onClose)||r.call(e,t.removalReason),t.isActive=!1,g(c(t,"removed")))},_=t=>{if(null==t)f.forEach(v);else{let e=f.get(t);e&&v(e)}m()},x=t=>{var e,r;let{toastId:i,updateId:s}=t.props,a=null==s;t.staleId&&f.delete(t.staleId),t.isActive=!0,f.set(i,t),m(),g(c(t,a?"added":"updated")),a&&(null==(r=(e=t.props).onOpen)||r.call(e))},{id:r,props:d,observe:t=>(h.add(t),()=>h.delete(t)),toggle:(t,e)=>{f.forEach(r=>{var i;(null==e||e===r.props.toastId)&&(null==(i=r.toggle)||i.call(r,t))})},removeToast:_,toasts:f,clearQueue:()=>{s-=l.length,l=[]},buildToast:(t,e)=>{let c,u;if((({containerId:t,toastId:e,updateId:i})=>{let s=f.has(e)&&null==i;return(t?t!==r:1!==r)||s})(e))return;let{toastId:h,updateId:p,data:y,staleId:g,delay:v}=e,b=null==p;b&&s++;let T={...d,style:d.toastStyle,key:i++,...Object.fromEntries(Object.entries(e).filter(([t,e])=>null!=e)),toastId:h,updateId:p,data:y,isIn:!1,className:o(e.className||d.toastClassName),progressClassName:o(e.progressClassName||d.progressClassName),autoClose:!e.isLoading&&(c=e.autoClose,u=d.autoClose,!1===c||a(c)&&c>0?c:u),closeToast(t){let e=f.get(h);e&&(e.removalReason=t,_(h))},deleteToast(){if(null!=f.get(h)){if(f.delete(h),--s<0&&(s=0),l.length>0)return void x(l.shift());m()}}};T.closeButton=d.closeButton,!1===e.closeButton||n(e.closeButton)?T.closeButton=e.closeButton:!0===e.closeButton&&(T.closeButton=!n(d.closeButton)||d.closeButton);let w={content:t,props:T,staleId:g};d.limit&&d.limit>0&&s>d.limit&&b?l.push(w):a(v)?setTimeout(()=>{x(w)},v):x(w)},setProps(t){d=t},setToggle:(t,e)=>{let r=f.get(t);r&&(r.toggle=e)},isToastActive:t=>{var e;return null==(e=f.get(t))?void 0:e.isActive},getSnapshot:()=>u});p.set(r,T);let w=T.observe(e);return y.forEach(t=>b(t.content,t.options)),y=[],()=>{w(),p.delete(r)}},setProps(t){var e;null==(e=p.get(r))||e.setProps(t)},getSnapshot(){var t;return null==(t=p.get(r))?void 0:t.getSnapshot()}})).current;u(t);let d=null==(e=(0,i.useSyncExternalStore)(s,l,l))?void 0:e.slice();return{getToastToRender:function(e){if(!d)return[];let r=new Map;return t.newestOnTop&&d.reverse(),d.forEach(t=>{let{position:e}=t.props;r.has(e)||r.set(e,[]),r.get(e).push(t)}),Array.from(r,t=>e(t[0],t[1]))},isToastActive:v,count:null==d?void 0:d.length}}(e),{className:_,style:x,rtl:T,containerId:w,hotKeys:E}=e;function j(){r&&(u(!0),C.play())}return k(()=>{var t;if(r){let r=d.current.querySelectorAll('[data-in="true"]'),i=null==(t=e.position)?void 0:t.includes("top"),s=0,a=0;Array.from(r).reverse().forEach((t,e)=>{t.classList.add("Toastify__toast--stacked"),e>0&&(t.dataset.collapsed=`${l}`),t.dataset.pos||(t.dataset.pos=i?"top":"bot");let r=s*(l?.2:1)+(l?0:12*e),o=Math.max(.5,1-(l?a:0));t.style.setProperty("--y",`${i?r:-1*r}px`),t.style.setProperty("--g","12"),t.style.setProperty("--s",`${o}`),s+=t.offsetHeight,a+=.025})}},[l,m,r]),(0,i.useEffect)(()=>{function t(t){var e;let r=d.current;E(t)&&(null==(e=null==r?void 0:r.querySelector('[tabIndex="0"]'))||e.focus(),u(!1),C.pause()),"Escape"===t.key&&(document.activeElement===r||null!=r&&r.contains(document.activeElement))&&(u(!0),C.play())}return document.addEventListener("keydown",t),()=>{document.removeEventListener("keydown",t)}},[E]),i.createElement("section",{ref:d,className:"Toastify",id:w,onMouseEnter:()=>{r&&(u(!1),C.pause())},onMouseLeave:j,"aria-live":"polite","aria-atomic":"false","aria-relevant":"additions text","aria-label":e["aria-label"]},f((t,e)=>{var a;let n,l=e.length?{...x}:{...x,pointerEvents:"none"};return i.createElement("div",{tabIndex:-1,className:(a=t,n=s("Toastify__toast-container",`Toastify__toast-container--${a}`,{"Toastify__toast-container--rtl":T}),"function"==typeof _?_({position:a,rtl:T,defaultClassName:n}):s(n,o(_))),"data-stacked":r,style:l,key:`c-${t}`},e.map(({content:t,props:e})=>i.createElement(O,{...e,stacked:r,collapseAll:j,isIn:h(e.toastId,e.containerId),key:`t-${e.key}`},t)))}))}var A=`:root {
  --toastify-color-light: #fff;
  --toastify-color-dark: #121212;
  --toastify-color-info: #3498db;
  --toastify-color-success: #07bc0c;
  --toastify-color-warning: #f1c40f;
  --toastify-color-error: hsl(6, 78%, 57%);
  --toastify-color-transparent: rgba(255, 255, 255, 0.7);

  --toastify-icon-color-info: var(--toastify-color-info);
  --toastify-icon-color-success: var(--toastify-color-success);
  --toastify-icon-color-warning: var(--toastify-color-warning);
  --toastify-icon-color-error: var(--toastify-color-error);

  --toastify-container-width: fit-content;
  --toastify-toast-width: 320px;
  --toastify-toast-offset: 16px;
  --toastify-toast-top: max(var(--toastify-toast-offset), env(safe-area-inset-top));
  --toastify-toast-right: max(var(--toastify-toast-offset), env(safe-area-inset-right));
  --toastify-toast-left: max(var(--toastify-toast-offset), env(safe-area-inset-left));
  --toastify-toast-bottom: max(var(--toastify-toast-offset), env(safe-area-inset-bottom));
  --toastify-toast-background: #fff;
  --toastify-toast-padding: 14px;
  --toastify-toast-min-height: 64px;
  --toastify-toast-max-height: 800px;
  --toastify-toast-bd-radius: 6px;
  --toastify-toast-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  --toastify-font-family: sans-serif;
  --toastify-z-index: 9999;
  --toastify-text-color-light: #757575;
  --toastify-text-color-dark: #fff;

  /* Used only for colored theme */
  --toastify-text-color-info: #fff;
  --toastify-text-color-success: #fff;
  --toastify-text-color-warning: #fff;
  --toastify-text-color-error: #fff;

  --toastify-spinner-color: #616161;
  --toastify-spinner-color-empty-area: #e0e0e0;
  --toastify-color-progress-light: linear-gradient(to right, #4cd964, #5ac8fa, #007aff, #34aadc, #5856d6, #ff2d55);
  --toastify-color-progress-dark: #bb86fc;
  --toastify-color-progress-info: var(--toastify-color-info);
  --toastify-color-progress-success: var(--toastify-color-success);
  --toastify-color-progress-warning: var(--toastify-color-warning);
  --toastify-color-progress-error: var(--toastify-color-error);
  /* used to control the opacity of the progress trail */
  --toastify-color-progress-bgo: 0.2;
}

.Toastify__toast-container {
  z-index: var(--toastify-z-index);
  -webkit-transform: translate3d(0, 0, var(--toastify-z-index));
  position: fixed;
  width: var(--toastify-container-width);
  box-sizing: border-box;
  color: #fff;
  display: flex;
  flex-direction: column;
}

.Toastify__toast-container--top-left {
  top: var(--toastify-toast-top);
  left: var(--toastify-toast-left);
}
.Toastify__toast-container--top-center {
  top: var(--toastify-toast-top);
  left: 50%;
  transform: translateX(-50%);
  align-items: center;
}
.Toastify__toast-container--top-right {
  top: var(--toastify-toast-top);
  right: var(--toastify-toast-right);
  align-items: end;
}
.Toastify__toast-container--bottom-left {
  bottom: var(--toastify-toast-bottom);
  left: var(--toastify-toast-left);
}
.Toastify__toast-container--bottom-center {
  bottom: var(--toastify-toast-bottom);
  left: 50%;
  transform: translateX(-50%);
  align-items: center;
}
.Toastify__toast-container--bottom-right {
  bottom: var(--toastify-toast-bottom);
  right: var(--toastify-toast-right);
  align-items: end;
}

.Toastify__toast {
  --y: 0px;
  position: relative;
  touch-action: none;
  width: var(--toastify-toast-width);
  min-height: var(--toastify-toast-min-height);
  box-sizing: border-box;
  margin-bottom: 1rem;
  padding: var(--toastify-toast-padding);
  border-radius: var(--toastify-toast-bd-radius);
  box-shadow: var(--toastify-toast-shadow);
  max-height: var(--toastify-toast-max-height);
  font-family: var(--toastify-font-family);
  /* webkit only issue #791 */
  z-index: 0;
  /* inner swag */
  display: flex;
  flex: 1 auto;
  align-items: center;
  word-break: break-word;
}

@media only screen and (max-width: 480px) {
  .Toastify__toast-container {
    width: 100vw;
    left: env(safe-area-inset-left);
    margin: 0;
  }
  .Toastify__toast-container--top-left,
  .Toastify__toast-container--top-center,
  .Toastify__toast-container--top-right {
    top: env(safe-area-inset-top);
    transform: translateX(0);
  }
  .Toastify__toast-container--bottom-left,
  .Toastify__toast-container--bottom-center,
  .Toastify__toast-container--bottom-right {
    bottom: env(safe-area-inset-bottom);
    transform: translateX(0);
  }
  .Toastify__toast-container--rtl {
    right: env(safe-area-inset-right);
    left: initial;
  }
  .Toastify__toast {
    --toastify-toast-width: 100%;
    margin-bottom: 0;
    border-radius: 0;
  }
}

.Toastify__toast-container[data-stacked='true'] {
  width: var(--toastify-toast-width);
}

@media only screen and (max-width: 480px) {
  .Toastify__toast-container[data-stacked='true'] {
    width: 100vw;
  }
}

.Toastify__toast--stacked {
  position: absolute;
  width: 100%;
  transform: translate3d(0, var(--y), 0) scale(var(--s));
  transition: transform 0.3s;
}

.Toastify__toast--stacked[data-collapsed] .Toastify__toast-body,
.Toastify__toast--stacked[data-collapsed] .Toastify__close-button {
  transition: opacity 0.1s;
}

.Toastify__toast--stacked[data-collapsed='false'] {
  overflow: visible;
}

.Toastify__toast--stacked[data-collapsed='true']:not(:last-child) > * {
  opacity: 0;
}

.Toastify__toast--stacked:after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  height: calc(var(--g) * 1px);
  bottom: 100%;
}

.Toastify__toast--stacked[data-pos='top'] {
  top: 0;
}

.Toastify__toast--stacked[data-pos='bot'] {
  bottom: 0;
}

.Toastify__toast--stacked[data-pos='bot'].Toastify__toast--stacked:before {
  transform-origin: top;
}

.Toastify__toast--stacked[data-pos='top'].Toastify__toast--stacked:before {
  transform-origin: bottom;
}

.Toastify__toast--stacked:before {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  transform: scaleY(3);
  z-index: -1;
}

.Toastify__toast--rtl {
  direction: rtl;
}

.Toastify__toast--close-on-click {
  cursor: pointer;
}

.Toastify__toast-icon {
  margin-inline-end: 10px;
  width: 22px;
  flex-shrink: 0;
  display: flex;
}

.Toastify--animate {
  animation-fill-mode: both;
  animation-duration: 0.5s;
}

.Toastify--animate-icon {
  animation-fill-mode: both;
  animation-duration: 0.3s;
}

.Toastify__toast-theme--dark {
  background: var(--toastify-color-dark);
  color: var(--toastify-text-color-dark);
}

.Toastify__toast-theme--light {
  background: var(--toastify-color-light);
  color: var(--toastify-text-color-light);
}

.Toastify__toast-theme--colored.Toastify__toast--default {
  background: var(--toastify-color-light);
  color: var(--toastify-text-color-light);
}

.Toastify__toast-theme--colored.Toastify__toast--info {
  color: var(--toastify-text-color-info);
  background: var(--toastify-color-info);
}

.Toastify__toast-theme--colored.Toastify__toast--success {
  color: var(--toastify-text-color-success);
  background: var(--toastify-color-success);
}

.Toastify__toast-theme--colored.Toastify__toast--warning {
  color: var(--toastify-text-color-warning);
  background: var(--toastify-color-warning);
}

.Toastify__toast-theme--colored.Toastify__toast--error {
  color: var(--toastify-text-color-error);
  background: var(--toastify-color-error);
}

.Toastify__progress-bar-theme--light {
  background: var(--toastify-color-progress-light);
}

.Toastify__progress-bar-theme--dark {
  background: var(--toastify-color-progress-dark);
}

.Toastify__progress-bar--info {
  background: var(--toastify-color-progress-info);
}

.Toastify__progress-bar--success {
  background: var(--toastify-color-progress-success);
}

.Toastify__progress-bar--warning {
  background: var(--toastify-color-progress-warning);
}

.Toastify__progress-bar--error {
  background: var(--toastify-color-progress-error);
}

.Toastify__progress-bar-theme--colored.Toastify__progress-bar--info,
.Toastify__progress-bar-theme--colored.Toastify__progress-bar--success,
.Toastify__progress-bar-theme--colored.Toastify__progress-bar--warning,
.Toastify__progress-bar-theme--colored.Toastify__progress-bar--error {
  background: var(--toastify-color-transparent);
}

.Toastify__close-button {
  color: #fff;
  position: absolute;
  top: 6px;
  right: 6px;
  background: transparent;
  outline: none;
  border: none;
  padding: 0;
  cursor: pointer;
  opacity: 0.7;
  transition: 0.3s ease;
  z-index: 1;
}

.Toastify__toast--rtl .Toastify__close-button {
  left: 6px;
  right: unset;
}

.Toastify__close-button--light {
  color: #000;
  opacity: 0.3;
}

.Toastify__close-button > svg {
  fill: currentColor;
  height: 16px;
  width: 14px;
}

.Toastify__close-button:hover,
.Toastify__close-button:focus {
  opacity: 1;
}

@keyframes Toastify__trackProgress {
  0% {
    transform: scaleX(1);
  }
  100% {
    transform: scaleX(0);
  }
}

.Toastify__progress-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  opacity: 0.7;
  transform-origin: left;
}

.Toastify__progress-bar--animated {
  animation: Toastify__trackProgress linear 1 forwards;
}

.Toastify__progress-bar--controlled {
  transition: transform 0.2s;
}

.Toastify__progress-bar--rtl {
  right: 0;
  left: initial;
  transform-origin: right;
  border-bottom-left-radius: initial;
}

.Toastify__progress-bar--wrp {
  position: absolute;
  overflow: hidden;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 5px;
  border-bottom-left-radius: var(--toastify-toast-bd-radius);
  border-bottom-right-radius: var(--toastify-toast-bd-radius);
}

.Toastify__progress-bar--wrp[data-hidden='true'] {
  opacity: 0;
}

.Toastify__progress-bar--bg {
  opacity: var(--toastify-color-progress-bgo);
  width: 100%;
  height: 100%;
}

.Toastify__spinner {
  width: 20px;
  height: 20px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: var(--toastify-spinner-color-empty-area);
  border-right-color: var(--toastify-spinner-color);
  animation: Toastify__spin 0.65s linear infinite;
}

@keyframes Toastify__bounceInRight {
  from,
  60%,
  75%,
  90%,
  to {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  from {
    opacity: 0;
    transform: translate3d(3000px, 0, 0);
  }
  60% {
    opacity: 1;
    transform: translate3d(-25px, 0, 0);
  }
  75% {
    transform: translate3d(10px, 0, 0);
  }
  90% {
    transform: translate3d(-5px, 0, 0);
  }
  to {
    transform: none;
  }
}

@keyframes Toastify__bounceOutRight {
  20% {
    opacity: 1;
    transform: translate3d(-20px, var(--y), 0);
  }
  to {
    opacity: 0;
    transform: translate3d(2000px, var(--y), 0);
  }
}

@keyframes Toastify__bounceInLeft {
  from,
  60%,
  75%,
  90%,
  to {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  0% {
    opacity: 0;
    transform: translate3d(-3000px, 0, 0);
  }
  60% {
    opacity: 1;
    transform: translate3d(25px, 0, 0);
  }
  75% {
    transform: translate3d(-10px, 0, 0);
  }
  90% {
    transform: translate3d(5px, 0, 0);
  }
  to {
    transform: none;
  }
}

@keyframes Toastify__bounceOutLeft {
  20% {
    opacity: 1;
    transform: translate3d(20px, var(--y), 0);
  }
  to {
    opacity: 0;
    transform: translate3d(-2000px, var(--y), 0);
  }
}

@keyframes Toastify__bounceInUp {
  from,
  60%,
  75%,
  90%,
  to {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  from {
    opacity: 0;
    transform: translate3d(0, 3000px, 0);
  }
  60% {
    opacity: 1;
    transform: translate3d(0, -20px, 0);
  }
  75% {
    transform: translate3d(0, 10px, 0);
  }
  90% {
    transform: translate3d(0, -5px, 0);
  }
  to {
    transform: translate3d(0, 0, 0);
  }
}

@keyframes Toastify__bounceOutUp {
  20% {
    transform: translate3d(0, calc(var(--y) - 10px), 0);
  }
  40%,
  45% {
    opacity: 1;
    transform: translate3d(0, calc(var(--y) + 20px), 0);
  }
  to {
    opacity: 0;
    transform: translate3d(0, -2000px, 0);
  }
}

@keyframes Toastify__bounceInDown {
  from,
  60%,
  75%,
  90%,
  to {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  0% {
    opacity: 0;
    transform: translate3d(0, -3000px, 0);
  }
  60% {
    opacity: 1;
    transform: translate3d(0, 25px, 0);
  }
  75% {
    transform: translate3d(0, -10px, 0);
  }
  90% {
    transform: translate3d(0, 5px, 0);
  }
  to {
    transform: none;
  }
}

@keyframes Toastify__bounceOutDown {
  20% {
    transform: translate3d(0, calc(var(--y) - 10px), 0);
  }
  40%,
  45% {
    opacity: 1;
    transform: translate3d(0, calc(var(--y) + 20px), 0);
  }
  to {
    opacity: 0;
    transform: translate3d(0, 2000px, 0);
  }
}

.Toastify__bounce-enter--top-left,
.Toastify__bounce-enter--bottom-left {
  animation-name: Toastify__bounceInLeft;
}

.Toastify__bounce-enter--top-right,
.Toastify__bounce-enter--bottom-right {
  animation-name: Toastify__bounceInRight;
}

.Toastify__bounce-enter--top-center {
  animation-name: Toastify__bounceInDown;
}

.Toastify__bounce-enter--bottom-center {
  animation-name: Toastify__bounceInUp;
}

.Toastify__bounce-exit--top-left,
.Toastify__bounce-exit--bottom-left {
  animation-name: Toastify__bounceOutLeft;
}

.Toastify__bounce-exit--top-right,
.Toastify__bounce-exit--bottom-right {
  animation-name: Toastify__bounceOutRight;
}

.Toastify__bounce-exit--top-center {
  animation-name: Toastify__bounceOutUp;
}

.Toastify__bounce-exit--bottom-center {
  animation-name: Toastify__bounceOutDown;
}

@keyframes Toastify__zoomIn {
  from {
    opacity: 0;
    transform: scale3d(0.3, 0.3, 0.3);
  }
  50% {
    opacity: 1;
  }
}

@keyframes Toastify__zoomOut {
  from {
    opacity: 1;
  }
  50% {
    opacity: 0;
    transform: translate3d(0, var(--y), 0) scale3d(0.3, 0.3, 0.3);
  }
  to {
    opacity: 0;
  }
}

.Toastify__zoom-enter {
  animation-name: Toastify__zoomIn;
}

.Toastify__zoom-exit {
  animation-name: Toastify__zoomOut;
}

@keyframes Toastify__flipIn {
  from {
    transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
    animation-timing-function: ease-in;
    opacity: 0;
  }
  40% {
    transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
    animation-timing-function: ease-in;
  }
  60% {
    transform: perspective(400px) rotate3d(1, 0, 0, 10deg);
    opacity: 1;
  }
  80% {
    transform: perspective(400px) rotate3d(1, 0, 0, -5deg);
  }
  to {
    transform: perspective(400px);
  }
}

@keyframes Toastify__flipOut {
  from {
    transform: translate3d(0, var(--y), 0) perspective(400px);
  }
  30% {
    transform: translate3d(0, var(--y), 0) perspective(400px) rotate3d(1, 0, 0, -20deg);
    opacity: 1;
  }
  to {
    transform: translate3d(0, var(--y), 0) perspective(400px) rotate3d(1, 0, 0, 90deg);
    opacity: 0;
  }
}

.Toastify__flip-enter {
  animation-name: Toastify__flipIn;
}

.Toastify__flip-exit {
  animation-name: Toastify__flipOut;
}

@keyframes Toastify__slideInRight {
  from {
    transform: translate3d(110%, 0, 0);
    visibility: visible;
  }
  to {
    transform: translate3d(0, var(--y), 0);
  }
}

@keyframes Toastify__slideInLeft {
  from {
    transform: translate3d(-110%, 0, 0);
    visibility: visible;
  }
  to {
    transform: translate3d(0, var(--y), 0);
  }
}

@keyframes Toastify__slideInUp {
  from {
    transform: translate3d(0, 110%, 0);
    visibility: visible;
  }
  to {
    transform: translate3d(0, var(--y), 0);
  }
}

@keyframes Toastify__slideInDown {
  from {
    transform: translate3d(0, -110%, 0);
    visibility: visible;
  }
  to {
    transform: translate3d(0, var(--y), 0);
  }
}

@keyframes Toastify__slideOutRight {
  from {
    transform: translate3d(0, var(--y), 0);
  }
  to {
    visibility: hidden;
    transform: translate3d(110%, var(--y), 0);
  }
}

@keyframes Toastify__slideOutLeft {
  from {
    transform: translate3d(0, var(--y), 0);
  }
  to {
    visibility: hidden;
    transform: translate3d(-110%, var(--y), 0);
  }
}

@keyframes Toastify__slideOutDown {
  from {
    transform: translate3d(0, var(--y), 0);
  }
  to {
    visibility: hidden;
    transform: translate3d(0, 500px, 0);
  }
}

@keyframes Toastify__slideOutUp {
  from {
    transform: translate3d(0, var(--y), 0);
  }
  to {
    visibility: hidden;
    transform: translate3d(0, -500px, 0);
  }
}

.Toastify__slide-enter--top-left,
.Toastify__slide-enter--bottom-left {
  animation-name: Toastify__slideInLeft;
}

.Toastify__slide-enter--top-right,
.Toastify__slide-enter--bottom-right {
  animation-name: Toastify__slideInRight;
}

.Toastify__slide-enter--top-center {
  animation-name: Toastify__slideInDown;
}

.Toastify__slide-enter--bottom-center {
  animation-name: Toastify__slideInUp;
}

.Toastify__slide-exit--top-left,
.Toastify__slide-exit--bottom-left {
  animation-name: Toastify__slideOutLeft;
  animation-timing-function: ease-in;
  animation-duration: 0.3s;
}

.Toastify__slide-exit--top-right,
.Toastify__slide-exit--bottom-right {
  animation-name: Toastify__slideOutRight;
  animation-timing-function: ease-in;
  animation-duration: 0.3s;
}

.Toastify__slide-exit--top-center {
  animation-name: Toastify__slideOutUp;
  animation-timing-function: ease-in;
  animation-duration: 0.3s;
}

.Toastify__slide-exit--bottom-center {
  animation-name: Toastify__slideOutDown;
  animation-timing-function: ease-in;
  animation-duration: 0.3s;
}

@keyframes Toastify__spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
`,R=new Map;function L(t){var e;return k(()=>{if(!A||"undefined"==typeof document)return;let t=document,r=R.get(t);if(r){e&&r.setAttribute("nonce",e);return}let i=t.createElement("style");i.textContent=A,e&&i.setAttribute("nonce",e),t.head.appendChild(i),R.set(t,i)},[e=t.nonce]),i.createElement(M,{...t})}},4327:(t,e,r)=>{"use strict";function i(t,e,r,i){return!1}Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"getDomainLocale",{enumerable:!0,get:function(){return i}}),r(9783),("function"==typeof e.default||"object"==typeof e.default&&null!==e.default)&&void 0===e.default.__esModule&&(Object.defineProperty(e.default,"__esModule",{value:!0}),Object.assign(e.default,e),t.exports=e.default)},4468:(t,e,r)=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),!function(t,e){for(var r in e)Object.defineProperty(t,r,{enumerable:!0,get:e[r]})}(e,{default:function(){return l},getImageProps:function(){return n}});let i=r(4252),s=r(3408),a=r(9420),o=i._(r(5540));function n(t){let{props:e}=(0,s.getImgProps)(t,{defaultLoader:o.default,imgConf:{deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[16,32,48,64,96,128,256,384],path:"/rick-and-morty-web/_next/image",loader:"default",dangerouslyAllowSVG:!1,unoptimized:!0}});for(let[t,r]of Object.entries(e))void 0===r&&delete e[t];return{props:e}}let l=a.Image},4587:(t,e,r)=>{t.exports=r(4468)},5028:(t,e,r)=>{"use strict";r.d(e,{H:()=>s});var i=r(7149),s=(()=>{let t=()=>i.S$;return{isServer:()=>t(),setIsServer(e){t=e}}})()},5540:(t,e)=>{"use strict";function r(t){var e;let{config:r,src:i,width:s,quality:a}=t,o=a||(null==(e=r.qualities)?void 0:e.reduce((t,e)=>Math.abs(e-75)<Math.abs(t-75)?e:t))||75;return r.path+"?url="+encodeURIComponent(i)+"&w="+s+"&q="+o+(i.startsWith("/_next/static/media/"),"")}Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return i}}),r.__next_img_default=!0;let i=r},5739:(t,e,r)=>{"use strict";r.d(e,{A:()=>i});let i=(0,r(7963).A)("loader-circle",[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]])},5785:(t,e)=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"errorOnce",{enumerable:!0,get:function(){return r}});let r=t=>{}},6305:(t,e,r)=>{"use strict";r.d(e,{k:()=>o});var i=r(8306),s=r(5028),a=r(7149),o=class{#m;destroy(){this.clearGcTimeout()}scheduleGc(){this.clearGcTimeout(),(0,a.gn)(this.gcTime)&&(this.#m=i.zs.setTimeout(()=>{this.optionalRemove()},this.gcTime))}updateGcTime(t){this.gcTime=Math.max(this.gcTime||0,t??(s.H.isServer()?1/0:3e5))}clearGcTimeout(){void 0!==this.#m&&(i.zs.clearTimeout(this.#m),this.#m=void 0)}}},7149:(t,e,r)=>{"use strict";r.d(e,{BH:()=>g,Cp:()=>y,EN:()=>p,F$:()=>h,GU:()=>O,MK:()=>d,S$:()=>s,ZM:()=>j,ZZ:()=>k,Zw:()=>o,d2:()=>c,f8:()=>v,gn:()=>n,hT:()=>E,j3:()=>l,lQ:()=>a,nJ:()=>f,nU:()=>u,ox:()=>P,pl:()=>w,y9:()=>C,yy:()=>T});var i=r(8306),s="undefined"==typeof window||"Deno"in globalThis;function a(){}function o(t,e){return"function"==typeof t?t(e):t}function n(t){return"number"==typeof t&&t>=0&&t!==1/0}function l(t,e){return Math.max(t+(e||0)-Date.now(),0)}function c(t,e){return"function"==typeof t?t(e):t}function u(t,e){return"function"==typeof t?t(e):t}function d(t,e){let{type:r="all",exact:i,fetchStatus:s,predicate:a,queryKey:o,stale:n}=t;if(o){if(i){if(e.queryHash!==h(o,e.options))return!1}else if(!y(e.queryKey,o))return!1}if("all"!==r){let t=e.isActive();if("active"===r&&!t||"inactive"===r&&t)return!1}return("boolean"!=typeof n||e.isStale()===n)&&(!s||s===e.state.fetchStatus)&&(!a||!!a(e))}function f(t,e){let{exact:r,status:i,predicate:s,mutationKey:a}=t;if(a){if(!e.options.mutationKey)return!1;if(r){if(p(e.options.mutationKey)!==p(a))return!1}else if(!y(e.options.mutationKey,a))return!1}return(!i||e.state.status===i)&&(!s||!!s(e))}function h(t,e){return(e?.queryKeyHashFn||p)(t)}function p(t){return JSON.stringify(t,(t,e)=>_(e)?Object.keys(e).sort().reduce((t,r)=>(t[r]=e[r],t),{}):e)}function y(t,e){return t===e||typeof t==typeof e&&!!t&&!!e&&"object"==typeof t&&"object"==typeof e&&Object.keys(e).every(r=>y(t[r],e[r]))}var m=Object.prototype.hasOwnProperty;function g(t,e,r=0){if(t===e)return t;if(r>500)return e;let i=b(t)&&b(e);if(!i&&!(_(t)&&_(e)))return e;let s=(i?t:Object.keys(t)).length,a=i?e:Object.keys(e),o=a.length,n=i?Array(o):{},l=0;for(let c=0;c<o;c++){let o=i?c:a[c],u=t[o],d=e[o];if(u===d){n[o]=u,(i?c<s:m.call(t,o))&&l++;continue}if(null===u||null===d||"object"!=typeof u||"object"!=typeof d){n[o]=d;continue}let f=g(u,d,r+1);n[o]=f,f===u&&l++}return s===o&&l===s?t:n}function v(t,e){if(!e||Object.keys(t).length!==Object.keys(e).length)return!1;for(let r in t)if(t[r]!==e[r])return!1;return!0}function b(t){return Array.isArray(t)&&t.length===Object.keys(t).length}function _(t){if(!x(t))return!1;let e=t.constructor;if(void 0===e)return!0;let r=e.prototype;return!!x(r)&&!!r.hasOwnProperty("isPrototypeOf")&&Object.getPrototypeOf(t)===Object.prototype}function x(t){return"[object Object]"===Object.prototype.toString.call(t)}function T(t){return new Promise(e=>{i.zs.setTimeout(e,t)})}function w(t,e,r){return"function"==typeof r.structuralSharing?r.structuralSharing(t,e):!1!==r.structuralSharing?g(t,e):e}function C(t,e,r=0){let i=[...t,e];return r&&i.length>r?i.slice(1):i}function k(t,e,r=0){let i=[e,...t];return r&&i.length>r?i.slice(0,-1):i}var E=Symbol();function j(t,e){return!t.queryFn&&e?.initialPromise?()=>e.initialPromise:t.queryFn&&t.queryFn!==E?t.queryFn:()=>Promise.reject(Error(`Missing queryFn: '${t.queryHash}'`))}function O(t,e){return"function"==typeof t?t(...e):!!t}function P(t,e,r){let i,s=!1;return Object.defineProperty(t,"signal",{enumerable:!0,get:()=>(i??=e(),s||(s=!0,i.aborted?r():i.addEventListener("abort",r,{once:!0})),i)}),t}},7768:(t,e,r)=>{"use strict";r.d(e,{Ht:()=>n,jE:()=>o});var i=r(4232),s=r(7876),a=i.createContext(void 0),o=t=>{let e=i.useContext(a);if(t)return t;if(!e)throw Error("No QueryClient set, use QueryClientProvider to set one");return e},n=({client:t,children:e})=>(i.useEffect(()=>(t.mount(),()=>{t.unmount()}),[t]),(0,s.jsx)(a.Provider,{value:t,children:e}))},7963:(t,e,r)=>{"use strict";r.d(e,{A:()=>l});var i=r(4232);let s=t=>{let e=t.replace(/^([A-Z])|[\s-_]+(\w)/g,(t,e,r)=>r?r.toUpperCase():e.toLowerCase());return e.charAt(0).toUpperCase()+e.slice(1)},a=function(){for(var t=arguments.length,e=Array(t),r=0;r<t;r++)e[r]=arguments[r];return e.filter((t,e,r)=>!!t&&""!==t.trim()&&r.indexOf(t)===e).join(" ").trim()};var o={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};let n=(0,i.forwardRef)((t,e)=>{let{color:r="currentColor",size:s=24,strokeWidth:n=2,absoluteStrokeWidth:l,className:c="",children:u,iconNode:d,...f}=t;return(0,i.createElement)("svg",{ref:e,...o,width:s,height:s,stroke:r,strokeWidth:l?24*Number(n)/Number(s):n,className:a("lucide",c),...!u&&!(t=>{for(let e in t)if(e.startsWith("aria-")||"role"===e||"title"===e)return!0})(f)&&{"aria-hidden":"true"},...f},[...d.map(t=>{let[e,r]=t;return(0,i.createElement)(e,r)}),...Array.isArray(u)?u:[u]])}),l=(t,e)=>{let r=(0,i.forwardRef)((r,o)=>{let{className:l,...c}=r;return(0,i.createElement)(n,{ref:o,iconNode:e,className:a("lucide-".concat(s(t).replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase()),"lucide-".concat(t),l),...c})});return r.displayName=s(t),r}},8070:(t,e,r)=>{"use strict";r.d(e,{t:()=>s});var i=r(89),s=new class extends i.Q{#g=!0;#v;#b;constructor(){super(),this.#b=t=>{if("undefined"!=typeof window&&window.addEventListener){let e=()=>t(!0),r=()=>t(!1);return window.addEventListener("online",e,!1),window.addEventListener("offline",r,!1),()=>{window.removeEventListener("online",e),window.removeEventListener("offline",r)}}}}onSubscribe(){this.#v||this.setEventListener(this.#b)}onUnsubscribe(){this.hasListeners()||(this.#v?.(),this.#v=void 0)}setEventListener(t){this.#b=t,this.#v?.(),this.#v=t(this.setOnline.bind(this))}setOnline(t){this.#g!==t&&(this.#g=t,this.listeners.forEach(e=>{e(t)}))}isOnline(){return this.#g}}},8149:(t,e,r)=>{"use strict";r.d(e,{II:()=>d,cc:()=>u,v_:()=>c});var i=r(8275),s=r(8070),a=r(1883),o=r(5028),n=r(7149);function l(t){return Math.min(1e3*2**t,3e4)}function c(t){return(t??"online")!=="online"||s.t.isOnline()}var u=class extends Error{constructor(t){super("CancelledError"),this.revert=t?.revert,this.silent=t?.silent}};function d(t){let e,r=!1,d=0,f=(0,a.T)(),h=()=>i.m.isFocused()&&("always"===t.networkMode||s.t.isOnline())&&t.canRun(),p=()=>c(t.networkMode)&&t.canRun(),y=t=>{"pending"===f.status&&(e?.(),f.resolve(t))},m=t=>{"pending"===f.status&&(e?.(),f.reject(t))},g=()=>new Promise(r=>{e=t=>{("pending"!==f.status||h())&&r(t)},t.onPause?.()}).then(()=>{e=void 0,"pending"===f.status&&t.onContinue?.()}),v=()=>{let e;if("pending"!==f.status)return;let i=0===d?t.initialPromise:void 0;try{e=i??t.fn()}catch(t){e=Promise.reject(t)}Promise.resolve(e).then(y).catch(e=>{if("pending"!==f.status)return;let i=t.retry??3*!o.H.isServer(),s=t.retryDelay??l,a="function"==typeof s?s(d,e):s,c=!0===i||"number"==typeof i&&d<i||"function"==typeof i&&i(d,e);if(r||!c)return void m(e);d++,t.onFail?.(d,e),(0,n.yy)(a).then(()=>h()?void 0:g()).then(()=>{r?m(e):v()})})};return{promise:f,status:()=>f.status,cancel:e=>{if("pending"===f.status){let r=new u(e);m(r),t.onCancel?.(r)}},continue:()=>(e?.(),f),cancelRetry:()=>{r=!0},continueRetry:()=>{r=!1},canStart:p,start:()=>(p()?v():g().then(v),f)}}},8230:(t,e,r)=>{t.exports=r(4009)},8249:(t,e,r)=>{"use strict";r.d(e,{A:()=>i});let i=(0,r(7963).A)("x",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]])},8275:(t,e,r)=>{"use strict";r.d(e,{m:()=>s});var i=r(89),s=new class extends i.Q{#_;#v;#b;constructor(){super(),this.#b=t=>{if("undefined"!=typeof window&&window.addEventListener){let e=()=>t();return window.addEventListener("visibilitychange",e,!1),()=>{window.removeEventListener("visibilitychange",e)}}}}onSubscribe(){this.#v||this.setEventListener(this.#b)}onUnsubscribe(){this.hasListeners()||(this.#v?.(),this.#v=void 0)}setEventListener(t){this.#b=t,this.#v?.(),this.#v=t(t=>{"boolean"==typeof t?this.setFocused(t):this.onFocus()})}setFocused(t){this.#_!==t&&(this.#_=t,this.onFocus())}onFocus(){let t=this.isFocused();this.listeners.forEach(e=>{e(t)})}isFocused(){return"boolean"==typeof this.#_?this.#_:globalThis.document?.visibilityState!=="hidden"}}},8306:(t,e,r)=>{"use strict";r.d(e,{Zq:()=>a,zs:()=>s});var i={setTimeout:(t,e)=>setTimeout(t,e),clearTimeout:t=>clearTimeout(t),setInterval:(t,e)=>setInterval(t,e),clearInterval:t=>clearInterval(t)},s=new class{#x=i;#T=!1;setTimeoutProvider(t){this.#x=t}setTimeout(t,e){return this.#x.setTimeout(t,e)}clearTimeout(t){this.#x.clearTimeout(t)}setInterval(t,e){return this.#x.setInterval(t,e)}clearInterval(t){this.#x.clearInterval(t)}};function a(t){setTimeout(t,0)}},8444:(t,e,r)=>{"use strict";r.d(e,{X:()=>l,k:()=>c});var i=r(7149),s=r(388),a=r(8149),o=r(6305),n=r(1482),l=class extends o.k{#w;#C;#k;#E;#e;#s;#u;#j;constructor(t){super(),this.#j=!1,this.#u=t.defaultOptions,this.setOptions(t.options),this.observers=[],this.#e=t.client,this.#E=this.#e.getQueryCache(),this.queryKey=t.queryKey,this.queryHash=t.queryHash,this.#C=d(this.options),this.state=t.state??this.#C,this.scheduleGc()}get meta(){return this.options.meta}get queryType(){return this.#w}get promise(){return this.#s?.promise}setOptions(t){if(this.options={...this.#u,...t},t?._type&&(this.#w=t._type),this.updateGcTime(this.options.gcTime),this.state&&void 0===this.state.data){let t=d(this.options);void 0!==t.data&&(this.setState(u(t.data,t.dataUpdatedAt)),this.#C=t)}}optionalRemove(){this.observers.length||"idle"!==this.state.fetchStatus||this.#E.remove(this)}setData(t,e){let r=(0,i.pl)(this.state.data,t,this.options);return this.#a({data:r,type:"success",dataUpdatedAt:e?.updatedAt,manual:e?.manual}),r}setState(t){this.#a({type:"setState",state:t})}cancel(t){let e=this.#s?.promise;return this.#s?.cancel(t),e?e.then(i.lQ).catch(i.lQ):Promise.resolve()}destroy(){super.destroy(),this.cancel({silent:!0})}get resetState(){return this.#C}reset(){this.destroy(),this.setState(this.resetState)}isActive(){return this.observers.some(t=>!1!==(0,i.nU)(t.options.enabled,this))}isDisabled(){return this.getObserversCount()>0?!this.isActive():this.options.queryFn===i.hT||!this.isFetched()}isFetched(){return this.state.dataUpdateCount+this.state.errorUpdateCount>0}isStatic(){return this.getObserversCount()>0&&this.observers.some(t=>"static"===(0,i.d2)(t.options.staleTime,this))}isStale(){return this.getObserversCount()>0?this.observers.some(t=>t.getCurrentResult().isStale):void 0===this.state.data||this.state.isInvalidated}isStaleByTime(t=0){return void 0===this.state.data||"static"!==t&&(!!this.state.isInvalidated||!(0,i.j3)(this.state.dataUpdatedAt,t))}onFocus(){let t=this.observers.find(t=>t.shouldFetchOnWindowFocus());t?.refetch({cancelRefetch:!1}),this.#s?.continue()}onOnline(){let t=this.observers.find(t=>t.shouldFetchOnReconnect());t?.refetch({cancelRefetch:!1}),this.#s?.continue()}addObserver(t){this.observers.includes(t)||(this.observers.push(t),this.clearGcTimeout(),this.#E.notify({type:"observerAdded",query:this,observer:t}))}removeObserver(t){this.observers.includes(t)&&(this.observers=this.observers.filter(e=>e!==t),this.observers.length||(this.#s&&(this.#j||this.#O()?this.#s.cancel({revert:!0}):this.#s.cancelRetry()),this.scheduleGc()),this.#E.notify({type:"observerRemoved",query:this,observer:t}))}getObserversCount(){return this.observers.length}#O(){return"paused"===this.state.fetchStatus&&"pending"===this.state.status}invalidate(){this.state.isInvalidated||this.#a({type:"invalidate"})}async fetch(t,e){if("idle"!==this.state.fetchStatus&&this.#s?.status()!=="rejected"){if(void 0!==this.state.data&&e?.cancelRefetch)this.cancel({silent:!0});else if(this.#s)return this.#s.continueRetry(),this.#s.promise}if(t&&this.setOptions(t),!this.options.queryFn){let t=this.observers.find(t=>t.options.queryFn);t&&this.setOptions(t.options)}let r=new AbortController,s=t=>{Object.defineProperty(t,"signal",{enumerable:!0,get:()=>(this.#j=!0,r.signal)})},o=()=>{let t=(0,i.ZM)(this.options,e),r=(()=>{let t={client:this.#e,queryKey:this.queryKey,meta:this.meta};return s(t),t})();return(this.#j=!1,this.options.persister)?this.options.persister(t,r,this):t(r)},l=(()=>{let t={fetchOptions:e,options:this.options,queryKey:this.queryKey,client:this.#e,state:this.state,fetchFn:o};return s(t),t})(),c="infinite"===this.#w?(0,n.PL)(this.options.pages):this.options.behavior;c?.onFetch(l,this),this.#k=this.state,("idle"===this.state.fetchStatus||this.state.fetchMeta!==l.fetchOptions?.meta)&&this.#a({type:"fetch",meta:l.fetchOptions?.meta}),this.#s=(0,a.II)({initialPromise:e?.initialPromise,fn:l.fetchFn,onCancel:t=>{t instanceof a.cc&&t.revert&&this.setState({...this.#k,fetchStatus:"idle"}),r.abort()},onFail:(t,e)=>{this.#a({type:"failed",failureCount:t,error:e})},onPause:()=>{this.#a({type:"pause"})},onContinue:()=>{this.#a({type:"continue"})},retry:l.options.retry,retryDelay:l.options.retryDelay,networkMode:l.options.networkMode,canRun:()=>!0});try{let t=await this.#s.start();if(void 0===t)throw Error(`${this.queryHash} data is undefined`);return this.setData(t),this.#E.config.onSuccess?.(t,this),this.#E.config.onSettled?.(t,this.state.error,this),t}catch(t){if(t instanceof a.cc){if(t.silent)return this.#s.promise;else if(t.revert){if(void 0===this.state.data)throw t;return this.state.data}}throw this.#a({type:"error",error:t}),this.#E.config.onError?.(t,this),this.#E.config.onSettled?.(this.state.data,t,this),t}finally{this.scheduleGc()}}#a(t){let e=e=>{switch(t.type){case"failed":return{...e,fetchFailureCount:t.failureCount,fetchFailureReason:t.error};case"pause":return{...e,fetchStatus:"paused"};case"continue":return{...e,fetchStatus:"fetching"};case"fetch":return{...e,...c(e.data,this.options),fetchMeta:t.meta??null};case"success":let r={...e,...u(t.data,t.dataUpdatedAt),dataUpdateCount:e.dataUpdateCount+1,...!t.manual&&{fetchStatus:"idle",fetchFailureCount:0,fetchFailureReason:null}};return this.#k=t.manual?r:void 0,r;case"error":let i=t.error;return{...e,error:i,errorUpdateCount:e.errorUpdateCount+1,errorUpdatedAt:Date.now(),fetchFailureCount:e.fetchFailureCount+1,fetchFailureReason:i,fetchStatus:"idle",status:"error",isInvalidated:!0};case"invalidate":return{...e,isInvalidated:!0};case"setState":return{...e,...t.state}}};this.state=e(this.state),s.jG.batch(()=>{this.observers.forEach(t=>{t.onQueryUpdate()}),this.#E.notify({query:this,type:"updated",action:t})})}};function c(t,e){return{fetchFailureCount:0,fetchFailureReason:null,fetchStatus:(0,a.v_)(e.networkMode)?"fetching":"paused",...void 0===t&&{error:null,status:"pending"}}}function u(t,e){return{data:t,dataUpdatedAt:e??Date.now(),error:null,isInvalidated:!1,status:"success"}}function d(t){let e="function"==typeof t.initialData?t.initialData():t.initialData,r=void 0!==e,i=r?"function"==typeof t.initialDataUpdatedAt?t.initialDataUpdatedAt():t.initialDataUpdatedAt:0;return{data:e,dataUpdateCount:0,dataUpdatedAt:r?i??Date.now():0,error:null,errorUpdateCount:0,errorUpdatedAt:0,fetchFailureCount:0,fetchFailureReason:null,fetchMeta:null,isInvalidated:!1,status:r?"success":"pending",fetchStatus:"idle"}}},8637:(t,e)=>{"use strict";function r(t){let{widthInt:e,heightInt:r,blurWidth:i,blurHeight:s,blurDataURL:a,objectFit:o}=t,n=i?40*i:e,l=s?40*s:r,c=n&&l?"viewBox='0 0 "+n+" "+l+"'":"";return"%3Csvg xmlns='http://www.w3.org/2000/svg' "+c+"%3E%3Cfilter id='b' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3CfeColorMatrix values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 100 -1' result='s'/%3E%3CfeFlood x='0' y='0' width='100%25' height='100%25'/%3E%3CfeComposite operator='out' in='s'/%3E%3CfeComposite in2='SourceGraphic'/%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3C/filter%3E%3Cimage width='100%25' height='100%25' x='0' y='0' preserveAspectRatio='"+(c?"none":"contain"===o?"xMidYMid":"cover"===o?"xMidYMid slice":"none")+"' style='filter: url(%23b);' href='"+a+"'/%3E%3C/svg%3E"}Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"getImageBlurSvg",{enumerable:!0,get:function(){return r}})},9099:(t,e,r)=>{t.exports=r(6296)},9203:(t,e,r)=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"useMergedRef",{enumerable:!0,get:function(){return s}});let i=r(4232);function s(t,e){let r=(0,i.useRef)(null),s=(0,i.useRef)(null);return(0,i.useCallback)(i=>{if(null===i){let t=r.current;t&&(r.current=null,t());let e=s.current;e&&(s.current=null,e())}else t&&(r.current=a(t,i)),e&&(s.current=a(e,i))},[t,e])}function a(t,e){if("function"!=typeof t)return t.current=e,()=>{t.current=null};{let r=t(e);return"function"==typeof r?r:()=>t(null)}}("function"==typeof e.default||"object"==typeof e.default&&null!==e.default)&&void 0===e.default.__esModule&&(Object.defineProperty(e.default,"__esModule",{value:!0}),Object.assign(e.default,e),t.exports=e.default)},9230:(t,e,r)=>{"use strict";r.d(e,{D:()=>c,N:()=>l});var i=r(7876),s=r(4232),a=r(9099),o=r(1673);let n=(0,s.createContext)(void 0);function l(t){let{children:e,defaultTheme:r="portal"}=t,l=(0,a.useRouter)(),[c,u]=(0,s.useState)(r);(0,s.useEffect)(()=>{l.isReady&&(l.pathname.startsWith("/locations")?u("rick"):l.pathname.startsWith("/episodes")?u("morty"):u("portal"))},[l.isReady,l.pathname]);let d=(0,o.q)(c);return(0,i.jsx)(n.Provider,{value:{theme:c,styles:d,setTheme:u},children:e})}function c(){let t=(0,s.useContext)(n);if(!t)throw Error("useTheme must be used within ThemeProvider");return t}},9407:()=>{},9420:(t,e,r)=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"Image",{enumerable:!0,get:function(){return _}});let i=r(4252),s=r(8365),a=r(7876),o=s._(r(4232)),n=i._(r(8477)),l=i._(r(9269)),c=r(3408),u=r(9161),d=r(9263);r(6201);let f=r(242),h=i._(r(5540)),p=r(9203),y={deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[16,32,48,64,96,128,256,384],path:"/rick-and-morty-web/_next/image",loader:"default",dangerouslyAllowSVG:!1,unoptimized:!0};function m(t,e,r,i,s,a,o){let n=null==t?void 0:t.src;t&&t["data-loaded-src"]!==n&&(t["data-loaded-src"]=n,("decode"in t?t.decode():Promise.resolve()).catch(()=>{}).then(()=>{if(t.parentElement&&t.isConnected){if("empty"!==e&&s(!0),null==r?void 0:r.current){let e=new Event("load");Object.defineProperty(e,"target",{writable:!1,value:t});let i=!1,s=!1;r.current({...e,nativeEvent:e,currentTarget:t,target:t,isDefaultPrevented:()=>i,isPropagationStopped:()=>s,persist:()=>{},preventDefault:()=>{i=!0,e.preventDefault()},stopPropagation:()=>{s=!0,e.stopPropagation()}})}(null==i?void 0:i.current)&&i.current(t)}}))}function g(t){return o.use?{fetchPriority:t}:{fetchpriority:t}}let v=(0,o.forwardRef)((t,e)=>{let{src:r,srcSet:i,sizes:s,height:n,width:l,decoding:c,className:u,style:d,fetchPriority:f,placeholder:h,loading:y,unoptimized:v,fill:b,onLoadRef:_,onLoadingCompleteRef:x,setBlurComplete:T,setShowAltText:w,sizesInput:C,onLoad:k,onError:E,...j}=t,O=(0,o.useCallback)(t=>{t&&(E&&(t.src=t.src),t.complete&&m(t,h,_,x,T,v,C))},[r,h,_,x,T,E,v,C]),P=(0,p.useMergedRef)(e,O);return(0,a.jsx)("img",{...j,...g(f),loading:y,width:l,height:n,decoding:c,"data-nimg":b?"fill":"1",className:u,style:d,sizes:s,srcSet:i,src:r,ref:P,onLoad:t=>{m(t.currentTarget,h,_,x,T,v,C)},onError:t=>{w(!0),"empty"!==h&&T(!0),E&&E(t)}})});function b(t){let{isAppRouter:e,imgAttributes:r}=t,i={as:"image",imageSrcSet:r.srcSet,imageSizes:r.sizes,crossOrigin:r.crossOrigin,referrerPolicy:r.referrerPolicy,...g(r.fetchPriority)};return e&&n.default.preload?(n.default.preload(r.src,i),null):(0,a.jsx)(l.default,{children:(0,a.jsx)("link",{rel:"preload",href:r.srcSet?void 0:r.src,...i},"__nimg-"+r.src+r.srcSet+r.sizes)})}let _=(0,o.forwardRef)((t,e)=>{let r=(0,o.useContext)(f.RouterContext),i=(0,o.useContext)(d.ImageConfigContext),s=(0,o.useMemo)(()=>{var t;let e=y||i||u.imageConfigDefault,r=[...e.deviceSizes,...e.imageSizes].sort((t,e)=>t-e),s=e.deviceSizes.sort((t,e)=>t-e),a=null==(t=e.qualities)?void 0:t.sort((t,e)=>t-e);return{...e,allSizes:r,deviceSizes:s,qualities:a}},[i]),{onLoad:n,onLoadingComplete:l}=t,p=(0,o.useRef)(n);(0,o.useEffect)(()=>{p.current=n},[n]);let m=(0,o.useRef)(l);(0,o.useEffect)(()=>{m.current=l},[l]);let[g,_]=(0,o.useState)(!1),[x,T]=(0,o.useState)(!1),{props:w,meta:C}=(0,c.getImgProps)(t,{defaultLoader:h.default,imgConf:s,blurComplete:g,showAltText:x});return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(v,{...w,unoptimized:C.unoptimized,placeholder:C.placeholder,fill:C.fill,onLoadRef:p,onLoadingCompleteRef:m,setBlurComplete:_,setShowAltText:T,sizesInput:t.sizes,ref:e}),C.priority?(0,a.jsx)(b,{isAppRouter:!r,imgAttributes:w}):null]})});("function"==typeof e.default||"object"==typeof e.default&&null!==e.default)&&void 0===e.default.__esModule&&(Object.defineProperty(e.default,"__esModule",{value:!0}),Object.assign(e.default,e),t.exports=e.default)},9478:(t,e,r)=>{"use strict";r.d(e,{m:()=>s});var i=r(7876);function s(t){let{children:e,className:r=""}=t;return(0,i.jsx)("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 ".concat(r),children:e})}}},t=>{var e=e=>t(t.s=e);t.O(0,[593,792],()=>(e(92),e(6296))),_N_E=t.O()}]);