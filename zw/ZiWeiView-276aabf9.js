import{r as D,j as ge,v as rt,x as Ie,y as ee,z as mt,A as C,b as I,d as b,i as a,B as de,F as q,h as Q,C as Be,n as se,t as $,f as U,D as pt,E as B,G as yt,l as ot,c as it,e as ve,g as lt,H as ft,a as vt,I as Je,k as xt,J as St,o as $t}from"./vendor-fcabaa7d.js";import{a as We}from"./iztro-8dcb482b.js";import{s as te,l as ye,a as Se,e as Oe,_ as ke,E as It,T as bt}from"./zw-b26fc31b.js";import{S as Ue,G as Ee,a as Le}from"./tyme-86b89837.js";import{m as _t}from"./marked-9682a234.js";function Fe(s,e,t,n,i,o=!1){let r;try{if(!s||!e||!t||n===void 0||!i)throw new Error("缺少必要的出生信息");if(s<1900||s>2100)throw new Error("年份必须在1900-2100之间");if(e<1||e>12)throw new Error("月份必须在1-12之间");if(t<1||t>31)throw new Error("日期必须在1-31之间");if(n=parseInt(n),isNaN(n)||n<0||n>12)throw new Error(`时辰索引必须在0-12之间，当前值: ${n}`);if(!["male","female"].includes(i))throw new Error("性别必须是 male 或 female");if(n===0?r=0:n===12?r=23:r=(n-1)*2+1,r<0||r>23)throw new Error(`计算出的小时值无效: ${r}，timeIndex: ${n}`);const l=`${s}-${e.toString().padStart(2,"0")}-${t.toString().padStart(2,"0")}`,h=i==="male"?"男":"女";let u;o?u=We.byLunar(l,n,h,!1,!0,"zh-CN"):u=We.bySolar(l,n,h,!0,"zh-CN");const m=new Date().getFullYear(),d={name:"",gender:i,year:s,month:e,day:t,timeIndex:n,hour:r,isLunar:o,solarDate:u.solarDate,lunarDate:u.lunarDate,chineseDate:u.chineseDate,time:u.time,timeRange:u.timeRange,sign:u.sign,zodiac:u.zodiac,soulPalace:u.soul||"",bodyPalace:u.body||"",earthlyBranchOfBodyPalace:u.earthlyBranchOfBodyPalace||"",earthlyBranchOfSoulPalace:u.earthlyBranchOfSoulPalace||"",fiveElementsClass:u.fiveElementsClass||"",currentAge:m-s},x=u.palaces.map((p,c)=>({index:c,name:p.name,isBodyPalace:p.isBodyPalace,isOriginalPalace:p.isOriginalPalace,heavenlyStem:p.heavenlyStem,earthlyBranch:p.earthlyBranch,majorStars:p.majorStars.map(v=>({name:v.name,type:v.type,scope:v.scope,brightness:v.brightness,mutagen:v.mutagen||""})),minorStars:p.minorStars.map(v=>({name:v.name,type:v.type,scope:v.scope,brightness:v.brightness,mutagen:v.mutagen||""})),adjectiveStars:p.adjectiveStars.map(v=>({name:v.name,type:v.type,scope:v.scope,brightness:v.brightness,mutagen:v.mutagen||""})),changsheng12:p.changsheng12||"",boshi12:p.boshi12||"",jiangqian12:p.jiangqian12||"",suiqian12:p.suiqian12||"",decadal:p.decadal||"",ages:p.ages||[],isEmpty:p.isEmpty(),starCount:{major:p.majorStars.length,minor:p.minorStars.length,adjective:p.adjectiveStars.length,total:p.majorStars.length+p.minorStars.length+p.adjectiveStars.length}})),_={lu:"",quan:"",ke:"",ji:""};u.palaces.forEach(p=>{[...p.majorStars,...p.minorStars,...p.adjectiveStars].forEach(c=>{if(c.mutagen)switch(c.mutagen){case"禄":_.lu=c.name;break;case"权":_.quan=c.name;break;case"科":_.ke=c.name;break;case"忌":_.ji=c.name;break}})});const f=m-s;let S={currentAge:f,decadal:"",yearly:""};return console.log("运限信息暂时跳过，当前年龄:",f),{...d,palaces:x,mutagens:_,horoscope:S,_astrolabe:u}}catch(l){throw console.error("紫薇斗数计算失败:",l),console.error("计算参数:",{year:s,month:e,day:t,timeIndex:n,hourValue:r,gender:i,isLunar:o}),l.message.includes("wrong hour")?new Error(`时辰参数错误: 小时值${r}无效，请检查时辰选择`):new Error(`紫薇斗数计算失败: ${l.message}`)}}function Qe(s){return s?{basicInfo:{name:s.name||"",gender:s.gender==="male"?"男":"女",birthDate:{solar:s.solarDate||"",lunar:s.lunarDate||"",chinese:s.chineseDate||""},time:s.time||"",timeRange:s.timeRange||"",sign:s.sign||"",zodiac:s.zodiac||"",fiveElementsClass:s.fiveElementsClass||"",soulPalace:s.soulPalace||"",bodyPalace:s.bodyPalace||""},palaces:(s.palaces||[]).map(e=>({name:e.name||"",isBodyPalace:e.isBodyPalace||!1,heavenlyStem:e.heavenlyStem||"",earthlyBranch:e.earthlyBranch||"",allStars:[...(e.majorStars||[]).map(t=>({...t,type:"major"})),...(e.minorStars||[]).map(t=>({...t,type:"minor"})),...(e.adjectiveStars||[]).map(t=>({...t,type:"adjective"}))].map(t=>({name:t.name||"",type:t.type||"",brightness:t.brightness||"",mutagen:t.mutagen||""})),changsheng12:e.changsheng12||"",ages:e.ages||[]})),mutagens:s.mutagens||{},horoscope:s.horoscope||{}}:null}const ct=`你是一位资深的紫薇斗数命理师，拥有深厚的紫薇斗数理论基础和丰富的实践经验。

请根据提供的紫薇斗数星盘信息进行专业分析，要求：

1. 分析要准确、专业，基于传统紫薇斗数理论
2. 语言要通俗易懂，避免过于深奥的术语
3. 结构清晰，重点突出
4. 给出具体的建议和指导
5. 保持客观理性，不做过于绝对的判断

紫薇斗数基础知识：
- 十二宫位：命宫、兄弟宫、夫妻宫、子女宫、财帛宫、疾厄宫、迁移宫、奴仆宫、官禄宫、田宅宫、福德宫、父母宫
- 主要星耀：紫微、天机、太阳、武曲、天同、廉贞、天府、太阴、贪狼、巨门、天相、天梁、七杀、破军
- 四化：化禄、化权、化科、化忌
- 星耀亮度：庙、旺、得、利、平、不得地、落陷
- 三方四正：本宫、对宫、三合宫位的组合分析`,wt=`请重点分析以下方面：

1. **命宫分析**
   - 命宫主星的特质和影响
   - 命宫星耀组合的性格特征
   - 四化对性格的影响

2. **身宫分析**
   - 身宫位置的意义
   - 身宫对人生重心的指导

3. **性格特质**
   - 主要性格优势
   - 需要注意的性格弱点
   - 天赋才能和潜力

4. **人生格局**
   - 整体命格层次
   - 适合的人生道路
   - 发展建议`,kt=`请重点分析以下方面：

1. **官禄宫分析**
   - 官禄宫主星对事业的影响
   - 适合的职业类型和发展方向
   - 事业成就的可能性

2. **财帛宫分析**
   - 财帛宫星耀对财运的影响
   - 财富积累的方式和途径
   - 投资理财的建议

3. **事业发展**
   - 事业发展的时机和阶段
   - 适合创业还是就业
   - 职场人际关系处理

4. **财运分析**
   - 正财和偏财的情况
   - 财运的起伏周期
   - 理财投资的注意事项`,At=`请重点分析以下方面：

1. **夫妻宫分析**
   - 夫妻宫主星对婚姻的影响
   - 理想伴侣的特征
   - 婚姻关系的发展趋势

2. **感情模式**
   - 恋爱中的表现和特点
   - 感情中的优势和挑战
   - 感情发展的建议

3. **婚姻运势**
   - 结婚的适宜时机
   - 婚姻生活的和谐度
   - 夫妻相处的建议

4. **子女宫分析**
   - 子女缘分的深浅
   - 子女的特质和发展
   - 亲子关系的建议`,Ct=`请重点分析以下方面：

1. **疾厄宫分析**
   - 疾厄宫星耀对健康的影响
   - 容易出现的健康问题
   - 身体的强弱部位

2. **健康趋势**
   - 整体健康状况
   - 不同年龄段的健康变化
   - 需要特别注意的时期

3. **养生建议**
   - 适合的养生方法
   - 饮食起居的注意事项
   - 运动和保健的建议

4. **预防措施**
   - 疾病预防的重点
   - 定期检查的建议
   - 心理健康的维护`,Pt=`请重点分析以下方面：

1. **大运分析**
   - 当前大运的特点和影响
   - 大运对各方面的作用
   - 下一个大运的变化

2. **流年分析**
   - 近期流年的运势变化
   - 流年重点关注的方面
   - 流年的机遇和挑战

3. **运势周期**
   - 人生运势的起伏规律
   - 高峰期和低谷期的时间
   - 不同阶段的发展重点

4. **趋吉避凶**
   - 如何把握好运时机
   - 如何化解不利因素
   - 运势提升的方法`,ut=`请重点分析以下方面：

1. **命格匹配度**
   - 两人命宫主星的配合
   - 整体命格的协调性
   - 性格互补的程度

2. **感情匹配**
   - 夫妻宫的相互影响
   - 感情发展的和谐度
   - 恋爱模式的匹配

3. **事业合作**
   - 事业发展的互助性
   - 财运的相互促进
   - 合作的优势和挑战

4. **相处建议**
   - 如何增进感情
   - 如何化解矛盾
   - 长期相处的建议

5. **婚姻前景**
   - 婚姻的稳定性
   - 家庭生活的和谐度
   - 共同发展的方向`,ze=`请根据用户的具体问题，结合紫薇斗数星盘信息进行专业分析。

分析时请注意：
1. 针对问题的核心进行重点分析
2. 结合相关宫位和星耀的影响
3. 给出具体可行的建议
4. 保持专业性和准确性`;function Tt(s){return{personality:wt,career:kt,relationship:At,health:Ct,fortune:Pt,compatibility:ut,custom:ze}[s]||ze}function Et(s,e,t){const n=ct,i=Tt(s);let o=`${n}

${i}

`;return o+=`【星盘信息】
`,o+=`基本信息：${JSON.stringify(t.basicInfo,null,2)}
`,o+=`宫位信息：${JSON.stringify(t.palaces,null,2)}
`,o+=`四化信息：${JSON.stringify(t.mutagens,null,2)}
`,o+=`运限信息：${JSON.stringify(t.horoscope,null,2)}

`,o+=`【用户问题】
${e}

`,o+="请基于以上信息进行专业分析，给出详细的解读和建议。",o}function Lt(s,e,t){let o=`${ct}

${ut}

`;return o+=`【第一人星盘信息】
`,o+=`基本信息：${JSON.stringify(e.basicInfo,null,2)}
`,o+=`宫位信息：${JSON.stringify(e.palaces,null,2)}
`,o+=`四化信息：${JSON.stringify(e.mutagens,null,2)}

`,o+=`【第二人星盘信息】
`,o+=`基本信息：${JSON.stringify(t.basicInfo,null,2)}
`,o+=`宫位信息：${JSON.stringify(t.palaces,null,2)}
`,o+=`四化信息：${JSON.stringify(t.mutagens,null,2)}

`,o+=`【分析要求】
${s}

`,o+="请基于以上两人的星盘信息进行专业的合盘分析，给出详细的匹配度解读和相处建议。",o}function Ut(s){if(!s)return"";try{const e=new URLSearchParams;return e.set("y",s.year),e.set("m",s.month),e.set("d",s.day),e.set("t",s.timeIndex),e.set("g",s.gender),s.name&&e.set("n",s.name),e.toString()}catch(e){return console.error("编码八字数据到URL失败:",e),""}}function Ye(s){if(!s)return null;try{const e=new URLSearchParams(s),t=e.get("y"),n=e.get("m"),i=e.get("d"),o=e.get("t"),r=e.get("g"),l=e.get("n");if(!t||!n||!i||o===null||!r)return console.warn("URL中的八字数据不完整"),null;const h=parseInt(t),u=parseInt(n),m=parseInt(i),d=parseInt(o);return h<1900||h>2100||u<1||u>12||m<1||m>31||d<0||d>12||!["male","female"].includes(r)?(console.warn("URL中的八字数据无效"),null):{year:h,month:u,day:m,timeIndex:d,gender:r,name:l||""}}catch(e){return console.error("从URL解码八字数据失败:",e),null}}function Ne(s){if(s)try{const e=new URL(window.location);e.searchParams.set("y",s.year),e.searchParams.set("m",s.month),e.searchParams.set("d",s.day),e.searchParams.set("t",s.timeIndex),e.searchParams.set("g",s.gender),s.name?e.searchParams.set("n",s.name):e.searchParams.delete("n"),e.searchParams.delete("bz"),window.history.replaceState({},"",e.toString())}catch(e){console.error("更新URL失败:",e)}}function Mt(){try{const s=new URL(window.location);if(s.searchParams.has("y")&&s.searchParams.has("m")&&s.searchParams.has("d")&&s.searchParams.has("t")&&s.searchParams.has("g"))return Ye(s.search.substring(1));const e=s.searchParams.get("bz");if(e)try{const t=decodeURIComponent(atob(e)),n=JSON.parse(t);return{year:parseInt(n.y),month:parseInt(n.m),day:parseInt(n.d),timeIndex:parseInt(n.t),gender:n.g,name:n.n||""}}catch(t){return console.warn("旧格式URL解码失败:",t),null}return null}catch(s){return console.error("从URL获取八字数据失败:",s),null}}function jt(){try{const s=new URL(window.location);s.searchParams.delete("y"),s.searchParams.delete("m"),s.searchParams.delete("d"),s.searchParams.delete("t"),s.searchParams.delete("g"),s.searchParams.delete("n"),s.searchParams.delete("bz"),window.history.replaceState({},"",s.toString())}catch(s){console.error("清除URL中的八字数据失败:",s)}}function dt(s,e){if(!s||!e)return"";try{const t={p1:{y:s.year,m:s.month,d:s.day,t:s.timeIndex,g:s.gender,n:s.name||""},p2:{y:e.year,m:e.month,d:e.day,t:e.timeIndex,g:e.gender,n:e.name||""}},n=JSON.stringify(t);return btoa(encodeURIComponent(n))}catch(t){return console.error("编码合盘数据到URL失败:",t),""}}function Gt(s){if(!s)return null;try{const e=decodeURIComponent(atob(s)),t=JSON.parse(e);if(!t.p1||!t.p2)return console.warn("URL中的合盘数据不完整"),null;const n=Ye(btoa(encodeURIComponent(JSON.stringify(t.p1)))),i=Ye(btoa(encodeURIComponent(JSON.stringify(t.p2))));return!n||!i?(console.warn("URL中的合盘数据无效"),null):{person1:n,person2:i}}catch(e){return console.error("从URL解码合盘数据失败:",e),null}}function Nt(s,e){if(!(!s||!e))try{const t=dt(s,e);if(t){const n=new URL(window.location);n.searchParams.set("cp",t),n.searchParams.delete("bz"),window.history.replaceState({},"",n.toString())}}catch(t){console.error("更新合盘URL失败:",t)}}function Dt(){try{const e=new URL(window.location).searchParams.get("cp");return Gt(e)}catch(s){return console.error("从URL获取合盘数据失败:",s),null}}function Rt(){try{const s=new URL(window.location);s.searchParams.delete("cp"),window.history.replaceState({},"",s.toString())}catch(s){console.error("清除URL中的合盘数据失败:",s)}}function Xe(s,e=null){const t=window.location.origin+window.location.pathname;if(e){const n=dt(s,e);return n?`${t}?cp=${n}`:t}else{const n=Ut(s);return n?`${t}?${n}`:t}}function Bt(){try{const s=new URL(window.location);return s.searchParams.has("bz")||s.searchParams.has("cp")||s.searchParams.has("y")&&s.searchParams.has("m")&&s.searchParams.has("d")&&s.searchParams.has("t")&&s.searchParams.has("g")}catch{return!1}}function Ot(s){if(!s)return"";try{const e=new URLSearchParams;return e.set("y",s.year),e.set("m",s.month),e.set("d",s.day),e.set("t",s.timeIndex),e.set("g",s.gender),s.name&&e.set("n",s.name),s.isLunar&&e.set("l","1"),e.toString()}catch(e){return console.error("编码紫薇斗数数据到URL失败:",e),""}}function Yt(s){if(!s)return null;try{const e=new URLSearchParams(s);if(!e.has("y")||!e.has("m")||!e.has("d")||!e.has("t")||!e.has("g"))return console.warn("URL中的紫薇斗数数据不完整"),null;const t=parseInt(e.get("y")),n=parseInt(e.get("m")),i=parseInt(e.get("d")),o=parseInt(e.get("t")),r=e.get("g");return t<1900||t>2100||n<1||n>12||i<1||i>31||o<0||o>12||!["male","female"].includes(r)?(console.warn("URL中的紫薇斗数数据无效"),null):{year:t,month:n,day:i,timeIndex:o,gender:r,name:e.get("n")||"",isLunar:e.get("l")==="1"}}catch(e){return console.error("从URL解码紫薇斗数数据失败:",e),null}}function Zt(s){if(s)try{const e=new URL(window.location);e.searchParams.set("y",s.year),e.searchParams.set("m",s.month),e.searchParams.set("d",s.day),e.searchParams.set("t",s.timeIndex),e.searchParams.set("g",s.gender),s.name?e.searchParams.set("n",s.name):e.searchParams.delete("n"),s.isLunar?e.searchParams.set("l","1"):e.searchParams.delete("l"),e.searchParams.delete("zw"),e.searchParams.delete("bz"),window.history.replaceState({},"",e.toString())}catch(e){console.error("更新紫薇斗数URL失败:",e)}}function Ht(){try{const s=new URL(window.location);if(s.searchParams.has("y")&&s.searchParams.has("m")&&s.searchParams.has("d")&&s.searchParams.has("t")&&s.searchParams.has("g"))return Yt(s.search.substring(1));const e=s.searchParams.get("zw");if(e)try{const t=decodeURIComponent(atob(e)),n=JSON.parse(t);return{year:parseInt(n.y),month:parseInt(n.m),day:parseInt(n.d),timeIndex:parseInt(n.t),gender:n.g,name:n.n||"",isLunar:n.l||!1}}catch(t){return console.warn("旧格式紫薇斗数URL解码失败:",t),null}return null}catch(s){return console.error("从URL获取紫薇斗数数据失败:",s),null}}function Kt(){try{const s=new URL(window.location);s.searchParams.delete("y"),s.searchParams.delete("m"),s.searchParams.delete("d"),s.searchParams.delete("t"),s.searchParams.delete("g"),s.searchParams.delete("n"),s.searchParams.delete("l"),s.searchParams.delete("zw"),window.history.replaceState({},"",s.toString())}catch(s){console.error("清除URL中的紫薇斗数数据失败:",s)}}function qt(s,e){if(!s||!e)return"";try{const t=new URLSearchParams;return t.set("p1_y",s.year),t.set("p1_m",s.month),t.set("p1_d",s.day),t.set("p1_t",s.timeIndex),t.set("p1_g",s.gender),s.name&&t.set("p1_n",s.name),s.isLunar&&t.set("p1_l","1"),t.set("p2_y",e.year),t.set("p2_m",e.month),t.set("p2_d",e.day),t.set("p2_t",e.timeIndex),t.set("p2_g",e.gender),e.name&&t.set("p2_n",e.name),e.isLunar&&t.set("p2_l","1"),t.toString()}catch(t){return console.error("编码紫薇斗数合盘数据到URL失败:",t),""}}function Vt(s){if(!s)return null;try{const e=new URLSearchParams(s);if(!e.has("p1_y")||!e.has("p2_y"))return console.warn("URL中的紫薇斗数合盘数据不完整"),null;const t={year:parseInt(e.get("p1_y")),month:parseInt(e.get("p1_m")),day:parseInt(e.get("p1_d")),timeIndex:parseInt(e.get("p1_t")),gender:e.get("p1_g"),name:e.get("p1_n")||"",isLunar:e.get("p1_l")==="1"},n={year:parseInt(e.get("p2_y")),month:parseInt(e.get("p2_m")),day:parseInt(e.get("p2_d")),timeIndex:parseInt(e.get("p2_t")),gender:e.get("p2_g"),name:e.get("p2_n")||"",isLunar:e.get("p2_l")==="1"};return!t.year||!t.month||!t.day||t.timeIndex===void 0||!t.gender||!n.year||!n.month||!n.day||n.timeIndex===void 0||!n.gender?(console.warn("URL中的紫薇斗数合盘数据无效"),null):{person1:t,person2:n}}catch(e){return console.error("从URL解码紫薇斗数合盘数据失败:",e),null}}function Jt(s,e){if(!(!s||!e))try{const t=new URL(window.location),n=[];for(const i of t.searchParams.keys())n.push(i);n.forEach(i=>t.searchParams.delete(i)),t.searchParams.set("p1_y",s.year),t.searchParams.set("p1_m",s.month),t.searchParams.set("p1_d",s.day),t.searchParams.set("p1_t",s.timeIndex),t.searchParams.set("p1_g",s.gender),s.name&&t.searchParams.set("p1_n",s.name),s.isLunar&&t.searchParams.set("p1_l","1"),t.searchParams.set("p2_y",e.year),t.searchParams.set("p2_m",e.month),t.searchParams.set("p2_d",e.day),t.searchParams.set("p2_t",e.timeIndex),t.searchParams.set("p2_g",e.gender),e.name&&t.searchParams.set("p2_n",e.name),e.isLunar&&t.searchParams.set("p2_l","1"),window.history.replaceState({},"",t.toString())}catch(t){console.error("更新紫薇斗数合盘URL失败:",t)}}function Wt(){try{const s=new URL(window.location);if(s.searchParams.has("p1_y")&&s.searchParams.has("p2_y"))return Vt(s.search.substring(1));const e=s.searchParams.get("zwcp");if(e)try{const t=decodeURIComponent(atob(e)),n=JSON.parse(t);return!n.p1||!n.p2?null:{person1:{year:parseInt(n.p1.y),month:parseInt(n.p1.m),day:parseInt(n.p1.d),timeIndex:parseInt(n.p1.t),gender:n.p1.g,name:n.p1.n||"",isLunar:n.p1.l||!1},person2:{year:parseInt(n.p2.y),month:parseInt(n.p2.m),day:parseInt(n.p2.d),timeIndex:parseInt(n.p2.t),gender:n.p2.g,name:n.p2.n||"",isLunar:n.p2.l||!1}}}catch(t){return console.warn("旧格式紫薇斗数合盘URL解码失败:",t),null}return null}catch(s){return console.error("从URL获取紫薇斗数合盘数据失败:",s),null}}function Ft(){try{const s=new URL(window.location),e=[];for(const t of s.searchParams.keys())(t.startsWith("p1_")||t.startsWith("p2_"))&&e.push(t);e.forEach(t=>s.searchParams.delete(t)),s.searchParams.delete("zwcp"),window.history.replaceState({},"",s.toString())}catch(s){console.error("清除URL中的紫薇斗数合盘数据失败:",s)}}function et(s,e=null){const t=window.location.origin+window.location.pathname;if(e){const n=qt(s,e);return n?`${t}?${n}`:t}else{const n=Ot(s);return n?`${t}?${n}`:t}}function Qt(s={}){const e={name:"",year:"",month:"",day:"",timeIndex:0,gender:"",isLunar:!1,...s},t=D({...e}),n=D({...e}),i=D(!1),o=D(null),r=D(null),l=D(!1),h=D(""),u=ge(()=>{const x=t.value.year&&t.value.month&&t.value.day&&t.value.timeIndex!==""&&t.value.gender;if(!i.value)return x;const _=n.value.year&&n.value.month&&n.value.day&&n.value.timeIndex!==""&&n.value.gender;return x&&_}),m=ge(()=>o.value!==null);return{person1:t,person2:n,enableSecondPerson:i,result1:o,result2:r,isCalculating:l,calculationError:h,canCalculate:u,hasResults:m,resetData:()=>{t.value={...e},n.value={...e},i.value=!1,o.value=null,r.value=null,h.value=""}}}const J={HEAVENLY_STEMS:["甲","乙","丙","丁","戊","己","庚","辛","壬","癸"],EARTHLY_BRANCHES:["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"],STEM_WUXING:["木","木","火","火","土","土","金","金","水","水"],BRANCH_WUXING:["水","土","木","木","土","火","火","土","金","金","土","水"],STEM_YINYANG:["阳","阴","阳","阴","阳","阴","阳","阴","阳","阴"],BRANCH_YINYANG:["阳","阴","阳","阴","阳","阴","阳","阴","阳","阴","阳","阴"],WUXING_SHENG:{木:"火",火:"土",土:"金",金:"水",水:"木"},WUXING_KE:{木:"土",火:"金",土:"水",金:"木",水:"火"},TIME_BRANCHES:[{name:"早子时",hour:0,branch:"子"},{name:"丑时",hour:1,branch:"丑"},{name:"寅时",hour:3,branch:"寅"},{name:"卯时",hour:5,branch:"卯"},{name:"辰时",hour:7,branch:"辰"},{name:"巳时",hour:9,branch:"巳"},{name:"午时",hour:11,branch:"午"},{name:"未时",hour:13,branch:"未"},{name:"申时",hour:15,branch:"申"},{name:"酉时",hour:17,branch:"酉"},{name:"戌时",hour:19,branch:"戌"},{name:"亥时",hour:21,branch:"亥"},{name:"晚子时",hour:23,branch:"子"}]},De={子:["癸"],丑:["己","癸","辛"],寅:["甲","丙","戊"],卯:["乙"],辰:["戊","乙","癸"],巳:["丙","庚","戊"],午:["丁","己"],未:["己","丁","乙"],申:["庚","壬","戊"],酉:["辛"],戌:["戊","辛","丁"],亥:["壬","甲"]},zt={甲子:"海中金",乙丑:"海中金",丙寅:"炉中火",丁卯:"炉中火",戊辰:"大林木",己巳:"大林木",庚午:"路旁土",辛未:"路旁土",壬申:"剑锋金",癸酉:"剑锋金",甲戌:"山头火",乙亥:"山头火",丙子:"涧下水",丁丑:"涧下水",戊寅:"城头土",己卯:"城头土",庚辰:"白蜡金",辛巳:"白蜡金",壬午:"杨柳木",癸未:"杨柳木",甲申:"泉中水",乙酉:"泉中水",丙戌:"屋上土",丁亥:"屋上土",戊子:"霹雳火",己丑:"霹雳火",庚寅:"松柏木",辛卯:"松柏木",壬辰:"长流水",癸巳:"长流水",甲午:"砂中金",乙未:"砂中金",丙申:"山下火",丁酉:"山下火",戊戌:"平地木",己亥:"平地木",庚子:"壁上土",辛丑:"壁上土",壬寅:"金箔金",癸卯:"金箔金",甲辰:"覆灯火",乙巳:"覆灯火",丙午:"天河水",丁未:"天河水",戊申:"大驿土",己酉:"大驿土",庚戌:"钗钏金",辛亥:"钗钏金",壬子:"桑柘木",癸丑:"桑柘木",甲寅:"大溪水",乙卯:"大溪水",丙辰:"沙中土",丁巳:"沙中土",戊午:"天上火",己未:"天上火",庚申:"石榴木",辛酉:"石榴木",壬戌:"大海水",癸亥:"大海水"},tt={金:{color:"白、金、银",direction:"西",industry:"金融、五金、科技、汽车、司法",advice:"增强决断力，保持原则，处事要果断。"},木:{color:"绿、青",direction:"东",industry:"教育、林业、文化、服装、医药",advice:"保持仁爱之心，积极成长，多接触自然。"},水:{color:"黑、蓝、灰",direction:"北",industry:"贸易、物流、水产、旅游、媒体",advice:"锻炼沟通能力，灵活应变，保持谦逊。"},火:{color:"红、橙、紫",direction:"南",industry:"电力、餐饮、IT、化工、礼仪",advice:"保持热情与活力，待人接物要真诚有礼。"},土:{color:"黄、棕、褐",direction:"中（本地）",industry:"地产、建筑、农业、保险",advice:"为人处事要诚信稳重，脚踏实地。"}},Re={甲:{亥:"长生",子:"沐浴",丑:"冠带",寅:"临官",卯:"帝旺",辰:"衰",巳:"病",午:"死",未:"墓",申:"绝",酉:"胎",戌:"养"},乙:{午:"长生",巳:"沐浴",辰:"冠带",卯:"临官",寅:"帝旺",丑:"衰",子:"病",亥:"死",戌:"墓",酉:"绝",申:"胎",未:"养"},丙:{寅:"长生",卯:"沐浴",辰:"冠带",巳:"临官",午:"帝旺",未:"衰",申:"病",酉:"死",戌:"墓",亥:"绝",子:"胎",丑:"养"},丁:{酉:"长生",申:"沐浴",未:"冠带",午:"临官",巳:"帝旺",辰:"衰",卯:"病",寅:"死",丑:"墓",子:"绝",亥:"胎",戌:"养"},戊:{寅:"长生",卯:"沐浴",辰:"冠带",巳:"临官",午:"帝旺",未:"衰",申:"病",酉:"死",戌:"墓",亥:"绝",子:"胎",丑:"养"},己:{酉:"长生",申:"沐浴",未:"冠带",午:"临官",巳:"帝旺",辰:"衰",卯:"病",寅:"死",丑:"墓",子:"绝",亥:"胎",戌:"养"},庚:{巳:"长生",午:"沐浴",未:"冠带",申:"临官",酉:"帝旺",戌:"衰",亥:"病",子:"死",丑:"墓",寅:"绝",卯:"胎",辰:"养"},辛:{子:"长生",亥:"沐浴",戌:"冠带",酉:"临官",申:"帝旺",未:"衰",午:"病",巳:"死",辰:"墓",卯:"绝",寅:"胎",丑:"养"},壬:{申:"长生",酉:"沐浴",戌:"冠带",亥:"临官",子:"帝旺",丑:"衰",寅:"病",卯:"死",辰:"墓",巳:"绝",午:"胎",未:"养"},癸:{卯:"长生",寅:"沐浴",丑:"冠带",子:"临官",亥:"帝旺",戌:"衰",酉:"病",申:"死",未:"墓",午:"绝",巳:"胎",辰:"养"}},Xt={寅:{木:"旺",火:"相",水:"休",金:"囚",土:"死"},卯:{木:"旺",火:"相",水:"休",金:"囚",土:"死"},辰:{土:"旺",金:"相",火:"休",木:"囚",水:"死"},巳:{火:"旺",土:"相",木:"休",水:"囚",金:"死"},午:{火:"旺",土:"相",木:"休",水:"囚",金:"死"},未:{土:"旺",金:"相",火:"休",木:"囚",水:"死"},申:{金:"旺",水:"相",土:"休",火:"囚",木:"死"},酉:{金:"旺",水:"相",土:"休",火:"囚",木:"死"},戌:{土:"旺",金:"相",火:"休",木:"囚",水:"死"},亥:{水:"旺",木:"相",金:"休",土:"囚",火:"死"},子:{水:"旺",木:"相",金:"休",土:"囚",火:"死"},丑:{土:"旺",金:"相",火:"休",木:"囚",水:"死"}},en={寅:[["戊",7],["丙",7],["甲",16]],卯:[["甲",10],["乙",20]],辰:[["乙",9],["癸",3],["戊",18]],巳:[["戊",7],["庚",9],["丙",14]],午:[["丙",10],["丁",20]],未:[["丁",9],["乙",3],["己",18]],申:[["庚",10],["壬",3],["戊",17]],酉:[["庚",10],["辛",20]],戌:[["辛",9],["丁",3],["戊",18]],亥:[["戊",7],["甲",23]],子:[["壬",10],["癸",20]],丑:[["癸",9],["辛",3],["己",18]]};class tn{constructor(){this.ctg=J.HEAVENLY_STEMS,this.cdz=J.EARTHLY_BRANCHES}zhiIdx(e){return this.cdz.indexOf(e)}calculateAllShenSha(e,t){const n={},i=["year","month","day","hour"];return e.forEach((o,r)=>{const[l,h]=o,u=this.calculatePillarShenSha(l,h,r,e,t);n[i[r]]=u}),n}calculatePillarShenSha(e,t,n,i,o){const r=[],[l,h]=i[0],[u,m]=i[1],[d,x]=i[2];i[3];const _=d+x,f=e+t;this.ctg.indexOf(l)%2;const S=o==="male",p={天乙贵人:()=>{const c={甲:["丑","未"],戊:["丑","未"],庚:["丑","未"],己:["子","申"],乙:["子","申"],丙:["亥","酉"],丁:["亥","酉"],壬:["卯","巳"],癸:["卯","巳"],辛:["寅","午"]};return c[l]&&c[l].includes(t)||c[d]&&c[d].includes(t)},太极贵人:()=>{const c={甲:["子","午"],乙:["子","午"],丙:["卯","酉"],丁:["卯","酉"],戊:["辰","戌","丑","未"],己:["辰","戌","丑","未"],庚:["寅","亥"],辛:["寅","亥"],壬:["巳","申"],癸:["巳","申"]};return c[l]&&c[l].includes(t)||c[d]&&c[d].includes(t)},天德贵人:()=>{const v={寅:1,卯:2,辰:3,巳:4,午:5,未:6,申:7,酉:8,戌:9,亥:10,子:11,丑:12}[m];if(!v)return!1;const P={1:"丁",2:"申",3:"壬",4:"辛",5:"亥",6:"甲",7:"癸",8:"寅",9:"丙",10:"乙",11:"巳",12:"庚"}[v];return P===e||P===t},天德合:()=>{const v={寅:1,卯:2,辰:3,巳:4,午:5,未:6,申:7,酉:8,戌:9,亥:10,子:11,丑:12}[m];if(!v)return!1;const P={1:"丁",2:"申",3:"壬",4:"辛",5:"亥",6:"甲",7:"癸",8:"寅",9:"丙",10:"乙",11:"巳",12:"庚"}[v];return{甲:"己",乙:"庚",丙:"辛",丁:"壬",戊:"癸",己:"甲",庚:"乙",辛:"丙",壬:"丁",癸:"戊"}[P]===e},月德贵人:()=>({寅:"丙",午:"丙",戌:"丙",申:"壬",子:"壬",辰:"壬",亥:"甲",卯:"甲",未:"甲",巳:"庚",酉:"庚",丑:"庚"})[m]===e,月德合:()=>{const c={寅:"丙",午:"丙",戌:"丙",申:"壬",子:"壬",辰:"壬",亥:"甲",卯:"甲",未:"甲",巳:"庚",酉:"庚",丑:"庚"}[m];return{甲:"己",乙:"庚",丙:"辛",丁:"壬",戊:"癸",己:"甲",庚:"乙",辛:"丙",壬:"丁",癸:"戊"}[c]===e},三奇贵人:()=>{const c=i.map(P=>P[0]),v=[["乙","丙","丁"],["甲","戊","庚"],["辛","壬","癸"]];for(let P=0;P<=c.length-3;P++){const j=c.slice(P,P+3);if(v.some(K=>K.every((V,G)=>V===j[G])))return!0}return!1},福星贵人:()=>{const c={甲:"寅",乙:"丑",丙:"子",丁:"亥",戊:"申",己:"未",庚:"午",辛:"巳",壬:"辰",癸:"卯"};return c[l]===t||c[d]===t},文昌贵人:()=>{const c={甲:"巳",乙:"午",丙:"申",丁:"酉",戊:"申",己:"酉",庚:"亥",辛:"子",壬:"寅",癸:"卯"};return c[l]===t||c[d]===t},国印贵人:()=>{const c={甲:"戌",乙:"亥",丙:"丑",丁:"寅",戊:"丑",己:"寅",庚:"辰",辛:"巳",壬:"未",癸:"申"};return c[l]===t||c[d]===t},学堂:()=>{const c=J.STEM_WUXING[d];return{木:"亥",火:"寅",土:"申",金:"巳",水:"申"}[c]===t},词馆:()=>({甲:"寅",乙:"卯",丙:"巳",丁:"午",戊:"巳",己:"午",庚:"申",辛:"酉",壬:"亥",癸:"子"})[d]===t,天厨贵人:()=>({甲:"巳",乙:"午",丙:"子",丁:"亥",戊:"申",己:"未",庚:"寅",辛:"卯",壬:"酉",癸:"戌"})[d]===t,德秀贵人:()=>{const v={寅:"火",午:"火",戌:"火",申:"水",子:"水",辰:"水",巳:"金",酉:"金",丑:"金",亥:"木",卯:"木",未:"木"}[m],P={甲:"己",乙:"庚",丙:"辛",丁:"壬",戊:"癸"},j=[];return v==="火"?j.push("丁","己","癸","庚"):v==="水"?j.push("壬","甲","戊","己","辛"):v==="金"?j.push("庚","壬","乙","丙","戊"):v==="木"&&j.push("乙","癸","丁","丙","庚"),j.includes(e)||P[e]&&j.includes(P[e])},禄神:()=>({甲:"寅",乙:"卯",丙:"巳",丁:"午",戊:"巳",己:"午",庚:"申",辛:"酉",壬:"亥",癸:"子"})[d]===t,羊刃:()=>({甲:"卯",丙:"午",戊:"午",庚:"酉",壬:"子"})[d]===t,飞刃:()=>{const v={甲:"卯",丙:"午",戊:"午",庚:"酉",壬:"子"}[d];return v?{子:"午",丑:"未",寅:"申",卯:"酉",辰:"戌",巳:"亥",午:"子",未:"丑",申:"寅",酉:"卯",戌:"辰",亥:"巳"}[v]===t:!1},驿马:()=>{const c={申:"寅",子:"寅",辰:"寅",亥:"巳",卯:"巳",未:"巳",寅:"申",午:"申",戌:"申",巳:"亥",酉:"亥",丑:"亥"};return c[h]===t||c[x]===t},将星:()=>{const c={申:"子",子:"子",辰:"子",亥:"卯",卯:"卯",未:"卯",寅:"午",午:"午",戌:"午",巳:"酉",酉:"酉",丑:"酉"};return c[h]===t||c[x]===t},华盖:()=>{const c={申:"辰",子:"辰",辰:"辰",亥:"未",卯:"未",未:"未",寅:"戌",午:"戌",戌:"戌",巳:"丑",酉:"丑",丑:"丑"};return c[h]===t||c[x]===t},金舆:()=>({甲:"辰",乙:"巳",丙:"未",丁:"申",戊:"未",己:"申",庚:"戌",辛:"亥",壬:"丑",癸:"寅"})[d]===t,金神:()=>["乙丑","己巳","癸酉"].includes(f)&&(n===2||n===3),天赦日:()=>{if(n!==2)return!1;const c={寅:"春",卯:"春",辰:"春",巳:"夏",午:"夏",未:"夏",申:"秋",酉:"秋",戌:"秋",亥:"冬",子:"冬",丑:"冬"}[m];return c==="春"&&_==="戊寅"||c==="夏"&&_==="甲午"||c==="秋"&&_==="戊申"||c==="冬"&&_==="甲子"},魁罡:()=>n===2&&["庚辰","壬辰","戊戌","庚戌"].includes(_),阴差阳错:()=>n===2&&["丙子","丁丑","戊寅","辛卯","壬辰","癸巳","丙午","丁未","戊申","辛酉","壬戌","癸亥"].includes(_),孤鸾煞:()=>n===2&&["乙巳","丁巳","辛亥","戊申","甲寅","壬子","丙午","戊午","己未","癸丑"].includes(_),十灵日:()=>n===2&&["甲辰","乙亥","丙辰","丁酉","戊午","庚戌","辛亥","壬寅","癸未"].includes(_),六秀日:()=>n===2&&["丙午","丁未","戊子","戊午","己丑","己未"].includes(_),八专:()=>n===2&&["甲寅","乙卯","己未","丁巳","庚申","辛酉","戊戌","癸丑"].includes(_),九丑:()=>n===2&&["戊子","戊午","壬子","壬午","乙卯","辛卯","乙酉","辛酉","己卯","己酉"].includes(_),四废日:()=>{if(n!==2)return!1;const c={寅:"春",卯:"春",辰:"春",巳:"夏",午:"夏",未:"夏",申:"秋",酉:"秋",戌:"秋",亥:"冬",子:"冬",丑:"冬"},v={春:["庚申","辛酉"],夏:["壬子","癸亥"],秋:["甲寅","乙卯"],冬:["丙午","丁巳"]},P=c[m];return P&&v[P].includes(_)},十恶大败:()=>{const c=this.ctg.indexOf(l),v=this.cdz.indexOf(h);if(c===-1||v===-1)return!1;const P=(10+v-c)%12,j=(11+v-c)%12,K=[this.cdz[P],this.cdz[j]],G={甲:"寅",乙:"卯",丙:"巳",丁:"午",戊:"巳",己:"午",庚:"申",辛:"酉",壬:"亥",癸:"子"}[d];return K.includes(G)},童子煞:()=>{const v={寅:"春",卯:"春",辰:"春",巳:"夏",午:"夏",未:"夏",申:"秋",酉:"秋",戌:"秋",亥:"冬",子:"冬",丑:"冬"}[m];return v?(v==="春"||v==="秋")&&(t==="寅"||t==="卯")||(v==="夏"||v==="冬")&&(t==="午"||t==="子"):!1},天转:()=>(n===2||n===3)&&{春:"乙卯",夏:"戊午",秋:"辛酉",冬:"癸子"}[{寅:"春",卯:"春",辰:"春",巳:"夏",午:"夏",未:"夏",申:"秋",酉:"秋",戌:"秋",亥:"冬",子:"冬",丑:"冬"}[m]]===f,地转:()=>(n===2||n===3)&&{春:"甲寅",夏:"丁巳",秋:"庚申",冬:"癸亥"}[{寅:"春",卯:"春",辰:"春",巳:"夏",午:"夏",未:"夏",申:"秋",酉:"秋",戌:"秋",亥:"冬",子:"冬",丑:"冬"}[m]]===f,桃花:()=>{const c={寅:"卯",午:"卯",戌:"卯",亥:"子",卯:"子",未:"子",申:"酉",子:"酉",辰:"酉",巳:"午",酉:"午",丑:"午"};return c[h]===t||c[x]===t},红鸾:()=>({子:"卯",丑:"寅",寅:"丑",卯:"子",辰:"亥",巳:"戌",午:"酉",未:"申",申:"未",酉:"午",戌:"巳",亥:"辰"})[h]===t,天喜:()=>({子:"酉",丑:"申",寅:"未",卯:"午",辰:"巳",巳:"辰",午:"卯",未:"寅",申:"丑",酉:"子",戌:"亥",亥:"戌"})[h]===t,孤辰:()=>({亥:"寅",子:"寅",丑:"寅",寅:"巳",卯:"巳",辰:"巳",巳:"申",午:"申",未:"申",申:"亥",酉:"亥",戌:"亥"})[h]===t,寡宿:()=>({亥:"戌",子:"戌",丑:"戌",寅:"丑",卯:"丑",辰:"丑",巳:"辰",午:"辰",未:"辰",申:"未",酉:"未",戌:"未"})[h]===t,红艳煞:()=>({甲:"午",乙:"申",丙:"寅",丁:"未",戊:"辰",己:"辰",庚:"戌",辛:"酉",壬:"子",癸:"申"})[d]===t,勾绞煞:()=>{const c=(this.zhiIdx(h)+4)%12,v=(this.zhiIdx(h)-4+12)%12;return t===this.cdz[c]||t===this.cdz[v]},空亡:()=>{const c=this.ctg.indexOf(d),v=this.cdz.indexOf(x);if(c===-1||v===-1)return!1;const P=(10+v-c)%12,j=(11+v-c)%12;return[this.cdz[P],this.cdz[j]].includes(t)},亡神:()=>{const c={申:"亥",子:"亥",辰:"亥",亥:"申",卯:"申",未:"申",寅:"巳",午:"巳",戌:"巳",巳:"寅",酉:"寅",丑:"寅"};return c[h]===t||c[x]===t},劫煞:()=>{const c={申:"巳",子:"巳",辰:"巳",亥:"寅",卯:"寅",未:"寅",寅:"亥",午:"亥",戌:"亥",巳:"申",酉:"申",丑:"申"};return c[h]===t||c[x]===t},灾煞:()=>{const c={申:"午",子:"午",辰:"午",亥:"酉",卯:"酉",未:"酉",寅:"子",午:"子",戌:"子",巳:"卯",酉:"卯",丑:"卯"};return c[h]===t||c[x]===t},元辰:()=>{const c=this.ctg.indexOf(l)%2===0,v=c&&S||!c&&!S?7:-7,P=(this.zhiIdx(h)+v+12)%12;return this.cdz[P]===t},血刃:()=>({寅:"丑",卯:"寅",辰:"卯",巳:"辰",午:"巳",未:"午",申:"未",酉:"申",戌:"酉",亥:"戌",子:"亥",丑:"子"})[m]===t,流霞:()=>({甲:"酉",乙:"戌",丙:"未",丁:"申",戊:"巳",己:"午",庚:"辰",辛:"卯",壬:"亥",癸:"寅"})[d]===t,天罗:()=>t==="戌"||t==="亥",地网:()=>t==="辰"||t==="巳",丧门:()=>this.cdz[(this.zhiIdx(h)+2)%12]===t,吊客:()=>this.cdz[(this.zhiIdx(h)-2+12)%12]===t,披麻:()=>this.cdz[(this.zhiIdx(h)-1+12)%12]===t};for(const c in p)p[c]()&&r.push(c);return r}}class nn{constructor(){this.ctg=J.HEAVENLY_STEMS,this.cdz=J.EARTHLY_BRANCHES,this.wxtg=J.STEM_WUXING,this.wxdz=J.BRANCH_WUXING,this.wuxingKe=J.WUXING_KE,this.wuxingSheng=J.WUXING_SHENG}getIntelligentAnalysis(e){const t=[],n={甲:"己",乙:"庚",丙:"辛",丁:"壬",戊:"癸"},i={甲:"庚",乙:"辛",丙:"壬",丁:"癸"};for(let S=0;S<4;S++)for(let p=S+1;p<4;p++){const c=e[S][0],v=e[p][0];if(i[c]===v||i[v]===c)t.push(`${c}${v}相冲`);else if(n[c]===v||n[v]===c)t.push(`${c}${v}相合`);else{const P=this.wxtg[this.ctg.indexOf(c)],j=this.wxtg[this.ctg.indexOf(v)];this.wuxingKe[P]===j?t.push(`${c}克${v}`):this.wuxingKe[j]===P&&t.push(`${v}克${c}`)}}const o=[],r=e.map(S=>S[1]),l={子:"午",丑:"未",寅:"申",卯:"酉",辰:"戌",巳:"亥"},h={子:"丑",寅:"亥",卯:"戌",辰:"酉",巳:"申",午:"未"},u={子:"未",丑:"午",寅:"巳",卯:"辰",申:"亥",酉:"戌"},m={子:"酉",卯:"午",辰:"丑",未:"戌",寅:"亥",巳:"申"};for(let S=0;S<4;S++)for(let p=S+1;p<4;p++){const c=r[S],v=r[p];l[c]===v||l[v]===c?o.push(`${c}${v}相冲`):h[c]===v||h[v]===c?o.push(`${c}${v}相合`):u[c]===v||u[v]===c?o.push(`${c}${v}相害`):(m[c]===v||m[v]===c)&&o.push(`${c}${v}相破`)}const d=[...new Set(r)];d.filter(S=>["寅","巳","申"].includes(S)).length>=2&&o.push("寅巳申无恩之刑"),d.filter(S=>["丑","戌","未"].includes(S)).length>=2&&o.push("丑戌未恃势之刑"),d.includes("子")&&d.includes("卯")&&o.push("子卯无礼之刑"),r.filter(S=>S==="辰").length>1&&o.push("辰辰自刑"),r.filter(S=>S==="午").length>1&&o.push("午午自刑"),r.filter(S=>S==="酉").length>1&&o.push("酉酉自刑"),r.filter(S=>S==="亥").length>1&&o.push("亥亥自刑");const x=[];for(let S=0;S<4;S++){const p=e[S][0],c=e[S][1],v=this.wxtg[this.ctg.indexOf(p)],P=this.wxdz[this.cdz.indexOf(c)][0];this.wuxingKe[v]===P&&x.push(`${p}${c}盖头`),this.wuxingKe[P]===v&&x.push(`${p}${c}截脚`)}for(let S=0;S<4;S++)for(let p=S+1;p<4;p++){const c=e[S],v=e[p],P=i[c[0]]===v[0]||i[v[0]]===c[0],j=l[c[1]]===v[1]||l[v[1]]===c[1];P&&j&&x.push(`${c.join("")}与${v.join("")}天克地冲(反吟)`)}const f=e.map(S=>S.join("")).reduce((S,p)=>(S[p]=(S[p]||0)+1,S),{});for(const S in f)f[S]>1&&x.push(`${S}伏吟`);return{tianGan:t.length>0?`原局天干: ${t.join(" | ")}`:"",diZhi:o.length>0?`原局地支: ${o.join(" | ")}`:"",zhengZhu:x.length>0?`原局整柱: ${x.join(" | ")}`:""}}}class sn{constructor(){this.timeMap=[{index:0,name:"早子时",range:"00:00-01:00",hour:0},{index:1,name:"丑时",range:"01:00-03:00",hour:1},{index:2,name:"寅时",range:"03:00-05:00",hour:3},{index:3,name:"卯时",range:"05:00-07:00",hour:5},{index:4,name:"辰时",range:"07:00-09:00",hour:7},{index:5,name:"巳时",range:"09:00-11:00",hour:9},{index:6,name:"午时",range:"11:00-13:00",hour:11},{index:7,name:"未时",range:"13:00-15:00",hour:13},{index:8,name:"申时",range:"15:00-17:00",hour:15},{index:9,name:"酉时",range:"17:00-19:00",hour:17},{index:10,name:"戌时",range:"19:00-21:00",hour:19},{index:11,name:"亥时",range:"21:00-23:00",hour:21},{index:12,name:"晚子时",range:"23:00-24:00",hour:23}],this.tenGods=["比肩","劫财","食神","伤官","偏财","正财","七杀","正官","偏印","正印"],this.wuxing=["水","木","火","土","金"],this.lifeStages=["长生","沐浴","冠带","临官","帝旺","衰","病","死","墓","绝","胎","养"],this.shenShaCalculator=new tn,this.relationshipCalculator=new nn,this.ctg=J.HEAVENLY_STEMS,this.cdz=J.EARTHLY_BRANCHES,this.wxtg=J.STEM_WUXING,this.wxdz=J.BRANCH_WUXING}calculateBazi(e,t,n,i,o){try{const r=this.timeMap[i];if(!r)throw new Error("无效的时辰索引");const l=Ue.fromYmdHms(e,t,n,r.hour,0,0),h=l.getLunarHour(),u=h.getEightChar(),m=u.getYear(),d=u.getMonth(),x=u.getDay(),_=u.getHour(),f={year:{gan:m.getHeavenStem().getName(),zhi:m.getEarthBranch().getName(),ganZhi:m.getName()},month:{gan:d.getHeavenStem().getName(),zhi:d.getEarthBranch().getName(),ganZhi:d.getName()},day:{gan:x.getHeavenStem().getName(),zhi:x.getEarthBranch().getName(),ganZhi:x.getName()},hour:{gan:_.getHeavenStem().getName(),zhi:_.getEarthBranch().getName(),ganZhi:_.getName()}},S=f.day.gan,p=[[f.year.gan,f.year.zhi],[f.month.gan,f.month.zhi],[f.day.gan,f.day.zhi],[f.hour.gan,f.hour.zhi]],c=this.calculateHiddenStems(f),v=this.calculateWuxingStrength(f,c),P=this.calculateSeasonInfo(l),j={gender:o==="male"?"男":"女",solarDate:{year:e,month:t,day:n},lunarDate:{year:h.getLunarDay().getLunarMonth().getLunarYear().getYear(),month:h.getLunarDay().getLunarMonth().getMonth(),day:h.getLunarDay().getDay(),monthName:h.getLunarDay().getLunarMonth().getName(),dayName:h.getLunarDay().getName()},timeInfo:r,pillars:f,dayMaster:{gan:S,element:this.getWuxing(S),yinYang:this.getGanYinYang(S)},zodiac:h.getLunarDay().getLunarMonth().getLunarYear().getSixtyCycle().getEarthBranch().getZodiac().getName(),constellation:l.getSolarDay().getConstellation().getName(),tenGods:this.calculateTenGods(f,S),hiddenStems:c,hiddenTenGods:this.calculateHiddenTenGods(c,S),wuxingStrength:v,luckInfo:this.calculateDayunWithTyme(l,o==="male"?Ee.MAN:Ee.WOMAN),mingGong:u.getOwnSign().getName(),shenGong:u.getBodySign().getName(),taiYuan:u.getFetalOrigin().getName(),taiXi:u.getFetalBreath().getName(),lifeStages:this.calculateLifeStages(f,S),pillarLifeStages:this.calculatePillarLifeStages(f),nayin:this.calculateNayin(f),shensha:this.shenShaCalculator.calculateAllShenSha(p,o),ziZuo:this.calculateZiZuo(f),kongWang:this.calculateKongWang(f),intelligentAnalysis:this.relationshipCalculator.getIntelligentAnalysis(p),wuxingSeasonStatus:this.getSeasonStatus(f.month.zhi),monthCommander:this.getMonthCommander(l,f.month.zhi),seasonInfo:P,analysis:this.analyzeBaziChart(f,c)};if(j.luckInfo&&j.luckInfo.cycles){const K=e;j.luckInfo.cycles.forEach(V=>{if(!V.isXiaoyun){V.years=[];const G=V.year,W=G+9;for(let ne=G;ne<=W;ne++){const le=ne-K+1,L=this.calculateLiunian(ne,S),T=this.calculateXiaoyun(f.hour.ganZhi,j.gender,f.year.gan,le);V.years.push({year:ne,age:le,ganZhi:L.ganZhi,tenGod:L.tenGod,tenGodZhi:L.tenGodZhi,xiaoyun:T})}}})}return j}catch(r){throw console.error("八字计算错误:",r),new Error(`八字计算失败: ${r.message}`)}}calculateLiunian(e,t){try{const i=Ue.fromYmdHms(e,6,1,0,0,0).getLunarHour().getEightChar().getYear(),o=i.getHeavenStem().getName(),r=i.getEarthBranch().getName();return{year:e,gan:o,zhi:r,ganZhi:`${o}${r}`,tenGod:this.getTenGod(o,t),tenGodZhi:this.getTenGodForBranch(r,t)}}catch(n){console.error(`流年计算错误 (${e}年):`,n);const i=(e-4)%10,o=(e-4)%12,r=J.HEAVENLY_STEMS[i],l=J.EARTHLY_BRANCHES[o];return{year:e,gan:r,zhi:l,ganZhi:`${r}${l}`,tenGod:this.getTenGod(r,t),tenGodZhi:this.getTenGodForBranch(l,t)}}}calculateLiuyue(e,t,n){const o=Ue.fromYmdHms(e,t,1,0,0,0).getLunarHour().getEightChar().getMonth(),r=o.getHeavenStem().getName(),l=o.getEarthBranch().getName(),h=[],u=[e-1,e,e+1],m=[];u.forEach(x=>{for(let _=0;_<24;_++)m.push(Le.fromIndex(x,_))});for(const x of m){const _=x.getJulianDay().getSolarDay();_.getYear()===e&&_.getMonth()===t&&(h.find(S=>S.name===x.getName())||h.push({name:x.getName(),date:`${_.getYear()}-${_.getMonth().toString().padStart(2,"0")}-${_.getDay().toString().padStart(2,"0")}`}))}const d=h.sort((x,_)=>new Date(x.date).getDate()-new Date(_.date).getDate());return{month:t,gan:r,zhi:l,ganZhi:`${r}${l}`,tenGod:this.getTenGod(r,n),tenGodZhi:this.getTenGodForBranch(l,n),jieqi:d}}calculateLiuri(e,t,n,i){const r=Ue.fromYmdHms(e,t,n,0,0,0).getLunarHour().getEightChar().getDay(),l=r.getHeavenStem().getName(),h=r.getEarthBranch().getName();return{day:n,gan:l,zhi:h,ganZhi:`${l}${h}`,tenGod:this.getTenGod(l,i),tenGodZhi:this.getTenGodForBranch(h,i)}}getTenGodForBranch(e,t){const n=De[e]?.[0];return n?this.getTenGod(n,t):"未知"}calculateXiaoyun(e,t,n,i){const o=[];for(const x of J.HEAVENLY_STEMS)for(const _ of J.EARTHLY_BRANCHES)o.push(x+_);const r=o.indexOf(e);if(r===-1)return"未知";const h=J.HEAVENLY_STEMS.indexOf(n)%2===0,u=t==="男",m=h&&u||!h&&!u;let d;return m?d=(r+i)%60:(d=(r-i)%60,d<0&&(d+=60)),o[d]}calculatePillarLifeStages(e){const t={};for(const n in e){const i=e[n],o=i.gan,r=i.zhi;t[n]=Re[o]?.[r]||"无"}return t}getWuxing(e){const t=this.ctg.indexOf(e);if(t!==-1)return this.wxtg[t];const n=this.cdz.indexOf(e);return n!==-1?this.wxdz[n]:"未知"}getGanYinYang(e){const t=this.ctg.indexOf(e);return t===-1?"未知":J.STEM_YINYANG[t]}calculateTenGods(e,t){return Object.fromEntries(Object.entries(e).map(([n,{gan:i}])=>n==="day"?[n,"日主"]:[n,this.getTenGod(i,t)]))}getTenGod(e,t){const n=this.ctg.indexOf(e),i=this.ctg.indexOf(t);return n===-1||i===-1?"未知":[["比肩","劫财","食神","伤官","偏财","正财","七杀","正官","偏印","正印"],["劫财","比肩","伤官","食神","正财","偏财","正官","七杀","正印","偏印"],["偏印","正印","比肩","劫财","食神","伤官","偏财","正财","七杀","正官"],["正印","偏印","劫财","比肩","伤官","食神","正财","偏财","正官","七杀"],["七杀","正官","偏印","正印","比肩","劫财","食神","伤官","偏财","正财"],["正官","七杀","正印","偏印","劫财","比肩","伤官","食神","正财","偏财"],["偏财","正财","七杀","正官","偏印","正印","比肩","劫财","食神","伤官"],["正财","偏财","正官","七杀","正印","偏印","劫财","比肩","伤官","食神"],["食神","伤官","偏财","正财","七杀","正官","偏印","正印","比肩","劫财"],["伤官","食神","正财","偏财","正官","七杀","正印","偏印","劫财","比肩"]][i][n]}calculateHiddenStems(e){return Object.fromEntries(Object.entries(e).map(([t,{zhi:n}])=>[t,De[n]||[]]))}calculateHiddenTenGods(e,t){return Object.fromEntries(Object.entries(e).map(([n,i])=>[n,i.map(o=>this.getTenGod(o,t))]))}calculateWuxingStrength(e,t){const n={tianGan:12,diZhiBenQi:12,diZhiZhongQi:6,diZhiYuQi:3},i={寅:{木:2,火:1.5,土:.8,金:.6,水:1.2},卯:{木:2.2,火:1.6,土:.7,金:.5,水:1.1},辰:{土:2,金:1.5,水:.8,木:1.2,火:.6},巳:{火:2,土:1.5,金:.8,水:.6,木:1.2},午:{火:2.2,土:1.6,金:.7,水:.5,木:1.1},未:{土:2,金:1.5,水:.8,木:1.2,火:.6},申:{金:2,水:1.5,木:.8,火:.6,土:1.2},酉:{金:2.2,水:1.6,木:.7,火:.5,土:1.1},戌:{土:2,金:1.5,水:.8,木:1.2,火:.6},亥:{水:2,木:1.5,火:.8,土:.6,金:1.2},子:{水:2.2,木:1.6,火:.7,土:.5,金:1.1},丑:{土:2,金:1.5,水:.8,木:1.2,火:.6}},o=e.month.zhi,r=i[o],l={金:0,木:0,水:0,火:0,土:0};for(const G of Object.values(e)){const W=this.getWuxing(G.gan);W!=="未知"&&(l[W]+=n.tianGan)}for(const G of Object.values(e)){const W=G.zhi;(De[W]||[]).forEach((le,L)=>{const T=this.getWuxing(le);T!=="未知"&&(L===0?l[T]+=n.diZhiBenQi:L===1?l[T]+=n.diZhiZhongQi:l[T]+=n.diZhiYuQi)})}const h={...l};for(const G in h)h[G]=Math.round(h[G]*(r[G]||1));const u=Object.values(h).reduce((G,W)=>G+W,0),m={};if(u>0)for(const G in h)m[G]=Math.round(h[G]/u*100);else for(const G in h)m[G]=0;const d=this.getWuxing(e.day.gan),x={金:{allies:["金","土"],enemies:["火","水","木"]},木:{allies:["木","水"],enemies:["金","火","土"]},水:{allies:["水","金"],enemies:["土","木","火"]},火:{allies:["火","木"],enemies:["水","土","金"]},土:{allies:["土","火"],enemies:["木","金","水"]}};if(!x[d])return{scores:h,percentages:m,status:"无法判断"};const _=x[d].allies,f=x[d].enemies,S=_.reduce((G,W)=>G+(h[W]||0),0);f.reduce((G,W)=>G+(h[W]||0),0);let p="均衡";const c=u>0?S/u*100:0;c>60?p="身强":c<20?p="身弱":c>=40&&c<=60?p="中和":c>50?p="偏强":c<30&&(p="偏弱");let v=[],P=[];p==="身强"||p==="偏强"?(v=f,P=_):p==="身弱"||p==="偏弱"?(v=_,P=f):v=x[d].enemies.slice(0,2);const j=Object.entries(l).filter(([G,W])=>W===0).map(([G])=>G),K=v.map(G=>({wuxing:G,...tt[G]})),V=P.map(G=>({wuxing:G,...tt[G]}));return{scores:h,percentages:m,status:p,yongShen:v,jiShen:P,missing:j,suggestions:{favorable:K,unfavorable:V}}}calculateDayunWithTyme(e,t){try{const n=this.calculateTraditionalDayun(e,t);let i="";if(n.startAge!==void 0){const u=e.getSolarDay().getYear()+n.startAge;i=`出生后 ${n.startAge} 年，${u}年起运`}else i="起运时间计算失败";const o=[],r=n.startAge;if(r>0){const u=e.getLunarHour().getEightChar(),m=u.getHour().getName(),d=t===Ee.MAN?"男":"女",x=u.getYear().getHeavenStem().getName(),_=this.getGanYinYang(x),f=e.getSolarDay().getYear(),S=[],p=Math.max(1,r);for(let c=1;c<=p;c++){const v=f+c-1,P=this.calculateXiaoyun(m,d,x,c),j=this.calculateLiunian(v,u.getDay().getHeavenStem().getName());S.push({year:v,age:c,ganZhi:j.ganZhi,tenGod:j.tenGod,tenGodZhi:j.tenGodZhi,xiaoyun:{ganZhi:P,tenGod:this.getTenGod(P[0],u.getDay().getHeavenStem().getName()),tenGodZhi:this.getTenGodForBranch(P[1],u.getDay().getHeavenStem().getName())}})}S.length>0&&o.push({age:1,year:S[0].year,ganZhi:"小运",isXiaoyun:!0,type:"小运",years:S})}const l=e.getSolarDay().getYear();for(let u=0;u<12;u++){const m=n.startAge+u*10,d=l+m-1,x=n.dayunList[u];x&&o.push({age:m,year:d,ganZhi:x,isXiaoyun:!1,type:"大运",years:[]})}let h="";if(n.dayunList.length>0){const u=n.dayunList[0][0],m=J.HEAVENLY_STEMS,d=m.indexOf(u);if(d!==-1){const x=m[(d+5)%10];h=`逢 ${u}、${x} 年交运`}else h="交运信息计算失败"}else h="交运信息计算失败";return{startInfo:i,handoverInfo:h,cycles:o}}catch(n){return console.error("大运计算错误:",n),{startInfo:"计算失败",handoverInfo:"计算失败",cycles:[]}}}calculateLifeStages(e,t){const n=Re[t]||{};return Object.fromEntries(Object.entries(e).map(([i,{zhi:o}])=>[i,n[o]||"未知"]))}calculateNayin(e){return Object.fromEntries(Object.entries(e).map(([t,{gan:n,zhi:i}])=>[t,zt[n+i]||"未知"]))}calculateWuxingStatus(e){const t=this.getSeasonStatus(e);return t?`木${t.木} 火${t.火} 土${t.土} 金${t.金} 水${t.水}`:"无法确定五行状态"}calculateKongWang(e){return Object.fromEntries(Object.entries(e).map(([t,{gan:n,zhi:i}])=>{const o=this.ctg.indexOf(n),r=this.cdz.indexOf(i);if(o===-1||r===-1)return[t,[]];const l=(10+r-o)%12,h=(11+r-o)%12;return[t,[this.cdz[l],this.cdz[h]]]}))}calculateZiZuo(e){return Object.fromEntries(Object.entries(e).map(([t,{gan:n,zhi:i}])=>{const o=Re[n]||{};return[t,o[i]||"未知"]}))}analyzeBaziChart(e,t){const n=e.day.gan,i=this.getWuxing(n),o=e.month.zhi;e.month.gan;const l=this.getSeasonStatus(o)[i],h=l==="旺"||l==="相",u=this.analyzeRoots(e,i),m=this.analyzeSupport(e,n,i),d=this.calculateDayMasterStrength(h,u,m,i,o),x=this.analyzePattern(e,t,n,i,d.strength),_=this.analyzeUsefulGod(e,i,d.strength,x);return{dayMasterStrength:d.strength,dayMasterStatus:d.status,mingGe:x.pattern,patternType:x.type,patternDescription:x.description,favorableElements:_.favorable,unfavorableElements:_.unfavorable,usefulGod:_.useful,avoidGod:_.avoid,circulation:_.circulation,rootAnalysis:u,supportAnalysis:m,seasonalStatus:{month:o,dayMasterStatus:l,isTimely:h}}}analyzeRoots(e,t){const n=[];let i=0;return Object.entries(e).forEach(([o,r])=>{if(this.getWuxing(r.zhi)===t){const h=o==="day"?3:1;n.push({position:o,branch:r.zhi,strength:h}),i+=h}}),{roots:n,totalStrength:i,hasRoot:n.length>0,strongRoot:n.some(o=>o.strength>=3)}}analyzeSupport(e,t,n){const i=[];let o=0;return Object.entries(e).forEach(([r,l])=>{if(r!=="day"&&l.gan&&this.getWuxing(l.gan)===n){const u=l.gan===t?2:1;i.push({position:r,stem:l.gan,strength:u}),o+=u}}),{supporters:i,totalStrength:o,hasSupport:i.length>0}}calculateDayMasterStrength(e,t,n,i,o){let r="中和",l=0;e&&(l+=2),l+=t.totalStrength,l+=n.totalStrength,l>=6?r="太旺":l>=4?r="偏旺":l>=2?r="中和":l>=1?r="偏弱":r="太弱";const u=this.getSeasonStatus(o)[i]||"休";return{strength:r,score:l,status:`日主${i}生于${o}月，${u}`,details:{timely:e,rootStrength:t.totalStrength,supportStrength:n.totalStrength}}}analyzePattern(e,t,n,i,o){const r=e.month.gan;e.month.zhi;const l=this.getTenGod(r,n),h=this.checkSpecialPattern(e,i,o);if(h.isSpecial)return h;let u="正格",m="普通格局",d="命局平和，无明显特殊格局";if(l)switch(l){case"正官":u="正官格",m="官格",d="月干透正官，主贵气，利于仕途功名";break;case"七杀":u="七杀格",m="杀格",d="月干透七杀，主权威，需要制化得宜";break;case"正财":u="正财格",m="财格",d="月干透正财，主富裕，利于经商理财";break;case"偏财":u="偏财格",m="财格",d="月干透偏财，主横财，善于投资经营";break;case"正印":u="正印格",m="印格",d="月干透正印，主学问，利于文化教育";break;case"偏印":u="偏印格",m="印格",d="月干透偏印，主技艺，适合专业技能";break;case"食神":u="食神格",m="食伤格",d="月干透食神，主福禄，性格温和有才华";break;case"伤官":u="伤官格",m="食伤格",d="月干透伤官，主才华，需要适当约束";break;case"比肩":u="建禄格",m="比劫格",d="月干透比肩，主自立，需要财官调节";break;case"劫财":u="劫财格",m="比劫格",d="月干透劫财，主竞争，需要官杀制约";break;default:u="正格",m="普通格局",d="命局平和，五行流通"}const x=this.checkPatternSuccess(e,u,m);return{pattern:u,type:m,description:d,success:x.success,successReason:x.reason,isSpecial:!1}}checkSpecialPattern(e,t,n){return n==="太旺"&&this.countRestraints(e,t)===0?{isSpecial:!0,pattern:"从强格",type:"特殊格局",description:"日主极旺无制，顺其旺势而行",success:!0,successReason:"格局纯粹，顺势而为"}:n==="太弱"&&this.countSupports(e,t)===0?{isSpecial:!0,pattern:"从弱格",type:"特殊格局",description:"日主极弱无助，从其弱势而行",success:!0,successReason:"格局清纯，从弱而行"}:{isSpecial:!1}}checkPatternSuccess(e,t,n){let i=!0,o="格局基本成立";switch(n){case"官格":this.hasInjuryToOfficial(e)&&(i=!1,o="伤官见官，格局受损");break;case"财格":this.hasRobberyToWealth(e)&&(i=!1,o="比劫夺财，格局不清");break}return{success:i,reason:o}}analyzeUsefulGod(e,t,n,i){const o=[],r=[];let l="",h="",u="";switch(n){case"太旺":const m=this.getWuxingChildren(t),d=this.getWuxingEnemies(t);o.push(...m,...d),r.push(t,...this.getWuxingParents(t)),l=m[0]||d[0]||"食神",h=t,u="身旺用食伤泄秀，或用官杀制身";break;case"偏旺":o.push(...this.getWuxingChildren(t)),r.push(t,...this.getWuxingParents(t)),l=this.getWuxingChildren(t)[0]||"食神",h=t,u="身旺喜泄，食伤为用";break;case"中和":o.push(t),l="调候",u="命局中和，重在调候和流通";break;case"偏弱":o.push(t,...this.getWuxingParents(t)),r.push(...this.getWuxingEnemies(t),...this.getWuxingChildren(t)),l=this.getWuxingParents(t)[0]||t,h=this.getWuxingEnemies(t)[0]||"官杀",u="身弱喜印比帮扶";break;case"太弱":i.pattern==="从弱格"?(o.push(...this.getWuxingEnemies(t),...this.getWuxingChildren(t)),r.push(t,...this.getWuxingParents(t)),l=this.getWuxingEnemies(t)[0]||"官杀",h=t,u="从弱格，顺其弱势，忌帮扶"):(o.push(t,...this.getWuxingParents(t)),r.push(...this.getWuxingEnemies(t)),l=this.getWuxingParents(t)[0]||t,h=this.getWuxingEnemies(t)[0]||"官杀",u="身弱急需印比帮扶");break}return{favorable:[...new Set(o)],unfavorable:[...new Set(r)],useful:l,avoid:h,circulation:u}}getWuxingChildren(e){return{木:["火"],火:["土"],土:["金"],金:["水"],水:["木"]}[e]||[]}getWuxingParents(e){return{火:["木"],土:["火"],金:["土"],水:["金"],木:["水"]}[e]||[]}getWuxingEnemies(e){return{木:["金"],火:["水"],土:["木"],金:["火"],水:["土"]}[e]||[]}countRestraints(e,t){let n=0;const i=this.getWuxingEnemies(t);return Object.values(e).forEach(o=>{(i.includes(this.getWuxing(o.gan))||i.includes(this.getWuxing(o.zhi)))&&n++}),n}countSupports(e,t){let n=0;const i=this.getWuxingParents(t);return Object.values(e).forEach(o=>{(this.getWuxing(o.gan)===t||this.getWuxing(o.zhi)===t||i.includes(this.getWuxing(o.gan))||i.includes(this.getWuxing(o.zhi)))&&n++}),n}hasInjuryToOfficial(e){return!1}hasRobberyToWealth(e){return!1}getGanYinYang(e){return["甲","丙","戊","庚","壬"].includes(e)?"阳":"阴"}getSeasonStatus(e){return Xt[e]||{}}getMonthCommander(e,t){const n=en[t];if(!n)return"未知";try{const i=e.getSolarDay().getYear(),o=e.getJulianDay();let r=null;const l=[];for(let m=0;m<24;m++)l.push(Le.fromIndex(i,m)),l.push(Le.fromIndex(i-1,m));for(const m of l){const d=m.getJulianDay();m.isJie()&&d<=o&&(!r||d>r.getJulianDay())&&(r=m)}if(!r)return"未知(节气未找到)";const h=o-r.getJulianDay();let u=0;for(const m of n)if(u+=m[1],h<u)return m[0];return n[n.length-1][0]}catch(i){return console.error("获取月令司令失败:",i),"计算出错"}}calculateSeasonInfo(e){try{const t=[],n=e.getSolarDay().getYear(),i=e.getJulianDay();for(let d=0;d<24;d++){const x=Le.fromIndex(n,d),_=x.getJulianDay(),f=_.getSolarDay();t.push({name:x.getName(),date:`${f.getYear()}-${f.getMonth().toString().padStart(2,"0")}-${f.getDay().toString().padStart(2,"0")}`,jd:_.getDay(),index:d,isJie:x.isJie()})}let o=null,r=null;for(let d=0;d<t.length;d++){const x=t[d];if(x.jd<=i)o=x;else{r=x;break}}let l=0,h=0;o&&(l=Math.floor(i-o.jd)),r&&(h=Math.floor(r.jd-i));const m=o?{0:"冬",1:"冬",2:"春",3:"春",4:"春",5:"春",6:"春",7:"春",8:"夏",9:"夏",10:"夏",11:"夏",12:"夏",13:"夏",14:"秋",15:"秋",16:"秋",17:"秋",18:"秋",19:"秋",20:"冬",21:"冬",22:"冬",23:"冬"}[o.index]:"未知";return{currentJieqi:o?o.name:"未知",nextJieqi:r?r.name:"未知",daysSincePrev:l,daysToNext:h,currentSeason:m,jieqiList:t.map(d=>({name:d.name,date:d.date}))}}catch(t){return console.error("节气信息计算错误:",t),{currentJieqi:"计算错误",nextJieqi:"计算错误",daysSincePrev:0,daysToNext:0,currentSeason:"未知",jieqiList:[]}}}calculateTraditionalDayun(e,t){try{const n=e.getSolarDay().getYear(),i=e.getJulianDay(),o=e.getLunarHour().getEightChar(),r=o.getYear().getHeavenStem().getName(),l=o.getMonth().getHeavenStem().getName(),h=o.getMonth().getEarthBranch().getName(),m=J.HEAVENLY_STEMS.indexOf(r)%2===0,d=t===Ee.MAN,x=m&&d||!m&&!d,_=this.calculateStartAge(e,t,r),f=this.generateDayunList(l,h,x);return{startAge:_,dayunList:f,isShun:x,yearGan:r,monthGanZhi:l+h}}catch(n){return console.error("传统大运计算错误:",n),{startAge:0,dayunList:[],isShun:!0,yearGan:"",monthGanZhi:""}}}calculateStartAge(e,t,n){try{const i=e.getSolarDay().getYear(),o=e.getJulianDay(),l=J.HEAVENLY_STEMS.indexOf(n)%2===0,h=t===Ee.MAN,u=l&&h||!l&&!h,m=[];for(let f of[i-1,i,i+1])for(let S=0;S<24;S++){const p=Le.fromIndex(f,S);p.isJie()&&m.push({term:p,julianDay:p.getJulianDay(),name:p.getName()})}m.sort((f,S)=>f.julianDay-S.julianDay);let d=null,x=0;if(u){for(const f of m)if(f.julianDay>o){d=f,x=f.julianDay-o;break}}else for(let f=m.length-1;f>=0;f--){const S=m[f];if(S.julianDay<o){d=S,x=o-S.julianDay;break}}if(!d)return console.warn("未找到目标节气，使用默认起运岁数"),8;const _=Math.ceil(x/3);return console.log(`起运计算详情:
        性别: ${h?"男":"女"}
        年干: ${n} (${l?"阳":"阴"})
        顺逆: ${u?"顺排":"逆排"}
        目标节气: ${d.name}
        天数差: ${x}
        起运岁数: ${_}`),Math.max(1,_)}catch(i){return console.error("起运岁数计算错误:",i),8}}generateDayunList(e,t,n){const i=J.HEAVENLY_STEMS,o=J.EARTHLY_BRANCHES,r=i.indexOf(e),l=o.indexOf(t);if(r===-1||l===-1)return console.error("月柱干支索引错误"),[];const h=[];for(let u=0;u<12;u++){let m,d;n?(m=(r+u+1)%10,d=(l+u+1)%12):(m=(r-u-1+10)%10,d=(l-u-1+12)%12);const x=i[m],_=o[d];h.push(x+_)}return h}}const pe=new sn;function an(s){const e=new Date().getFullYear();for(let t=0;t<s.length;t++){const n=s[t],i=n.year,o=i+9;if(e>=i&&e<=o)return{current:n,previous:t>0?s[t-1]:null,future:s.slice(t+1)}}return{current:s[0]||null,previous:null,future:s.slice(1)}}function rn(s,e){let t=`
### 大运详细分析
`;const n=pe.getTenGod(s.ganZhi[0],e),i=pe.getTenGodForBranch(s.ganZhi[1],e);t+=`* **当前大运**: ${s.ganZhi} (天干:${n}, 地支:${i})
`;const o=new Date().getFullYear(),r=o-s.year+1;t+=`* **大运进度**: 第${r}年/共10年
`;const l=on(s,o,e);return t+=`
* **三大运流年分析**:
`,l.forEach(h=>{const u=h.years[0].year,m=h.years[h.years.length-1].year,d=`${u}-${m}年`;t+=`
  **${h.name}** (${h.ganZhi}, ${d}):
`,h.years.forEach(x=>{const f=x.year===o?" ← 当前":"";t+=`    - ${x.year}年(${x.age}岁): ${x.ganZhi}(${x.tenGod})${f}
`})}),t}function on(s,e,t){const n=[],i=s.years.filter(o=>o.year>=e);i.length>0&&n.push({name:"当前大运",ganZhi:s.ganZhi,years:i});for(let o=1;o<=2;o++){const r=s.year+o*10,l=ln(s.ganZhi,o),h=dn(s,e),u=[];for(let m=0;m<10;m++){const d=r+m,x=h?h+(d-e):null,_=un(d),f=pe.getTenGod(_[0],t);u.push({year:d,age:x,ganZhi:_,tenGod:f})}n.push({name:o===1?"下一大运":"下下大运",ganZhi:l,years:u})}return n}function ln(s,e){const t=["甲","乙","丙","丁","戊","己","庚","辛","壬","癸"],n=["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"],i=s[0],o=s[1],r=t.indexOf(i),l=n.indexOf(o),h=(r+e)%10,u=(l+e)%12;return t[h]+n[u]}function cn(s,e){let t=`
### 一生大运详细分析
`;const n=new Date().getFullYear();t+=`* **大运总览**: 共${s.length}个大运，从${s[0].year}年起运
`;const i=s.findIndex(o=>n>=o.year&&n<=o.year+9);return t+=`
* **所有大运详细信息**:
`,s.forEach((o,r)=>{const l=o.year,h=l+9,u=o.years&&o.years.length>0?o.years[0].age:null,m=u?u+9:null,d=pe.getTenGod(o.ganZhi[0],e),x=pe.getTenGodForBranch(o.ganZhi[1],e),f=r===i?" ← 当前大运":"",S=u&&m?`(${u}-${m}岁)`:"";t+=`
  **第${r+1}个大运** ${o.ganZhi}(${d}) ${l}-${h}年${S}${f}:
`,t+=`    天干:${d}, 地支:${x}
`,o.years&&o.years.length>0?(t+=`    流年详情:
`,o.years.forEach(p=>{const v=p.year===n?" ← 当前年份":"";t+=`      ${p.year}年(${p.age}岁): ${p.ganZhi}(${p.tenGod})${v}
`})):t+=`    流年概况: ${l}-${h}年，共10年
`}),t+=`
* **人生阶段总结**:
`,t+=`  - 青年期: 第1-3个大运 (约${s[0]?.year||"起运"}-${s[2]?.year+9||"未知"}年)
`,s.length>3&&(t+=`  - 壮年期: 第4-6个大运 (约${s[3]?.year||"未知"}-${s[5]?.year+9||"未知"}年)
`),s.length>6&&(t+=`  - 中年期: 第7-9个大运 (约${s[6]?.year||"未知"}-${s[8]?.year+9||"未知"}年)
`),s.length>9&&(t+=`  - 晚年期: 第10个大运以后 (${s[9]?.year||"未知"}年以后)
`),t}function un(s){const e=["甲","乙","丙","丁","戊","己","庚","辛","壬","癸"],t=["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"],i=s-1984,o=i%10,r=i%12;return e[o]+t[r]}function dn(s,e){const t=s.years.find(n=>n.year===e);return t?t.age:null}function hn(s){try{const e=[{start:"立春",end:"惊蛰"},{start:"惊蛰",end:"清明"},{start:"清明",end:"立夏"},{start:"立夏",end:"芒种"},{start:"芒种",end:"小暑"},{start:"小暑",end:"立秋"},{start:"立秋",end:"白露"},{start:"白露",end:"寒露"},{start:"寒露",end:"立冬"},{start:"立冬",end:"大雪"},{start:"大雪",end:"小寒"},{start:"小寒",end:"立春"}],t={};for(const i of[s,s+1]){const o=pe.calculateSeasonInfo(Ue.fromYmdHms(i,6,1,0,0,0));o&&o.jieqiList&&o.jieqiList.forEach(r=>{const l=new Date(r.date);l.getFullYear()===i&&(t[r.name]={month:l.getMonth()+1,day:l.getDate(),year:i})})}const n=[];for(let i=0;i<12;i++){const{start:o,end:r}=e[i],l=t[o],h=t[r];if(l&&h){let u,m;if(i===11){u=`${l.month}月${l.day}日`;const d=t.立春;if(d&&d.year===s+1){const x=d.day-1;m=`${d.month}月${x>0?x:"月底"}日`}else m="2月3日"}else{u=`${l.month}月${l.day}日`;const d=h.day-1;m=`${h.month}月${d>0?d:"月底"}日`}n.push(`${u}-${m}`)}else{const u=["2月4日-3月5日","3月6日-4月4日","4月5日-5月5日","5月6日-6月5日","6月6日-7月6日","7月7日-8月7日","8月8日-9月7日","9月8日-10月7日","10月8日-11月6日","11月7日-12月6日","12月7日-1月5日","1月6日-2月3日"];n.push(u[i])}}return n}catch(e){return console.warn("计算月份日期范围失败:",e),["2月4日-3月5日","3月6日-4月4日","4月5日-5月5日","5月6日-6月5日","6月6日-7月6日","7月7日-8月7日","8月8日-9月7日","9月8日-10月7日","10月8日-11月6日","11月7日-12月6日","12月7日-1月5日","1月6日-2月3日"]}}function we(s,e=null){if(!s)return"无法获取八字数据。";let t=`### 基本信息
`;t+=`* **性别**: ${s.gender}
`,t+=`* **出生**: ${s.solarDate.year}年${s.solarDate.month}月${s.solarDate.day}日 ${s.timeInfo.name}
`,t+=`* **日主**: ${s.dayMaster.gan}${s.dayMaster.element} (${s.dayMaster.yinYang})
`,t+=`* **生肖**: ${s.zodiac}
`,s.age&&(t+=`* **年龄**: ${s.age}岁
`),s.analysis&&(s.analysis.dayMasterStrength&&(t+=`* **强弱**: ${s.analysis.dayMasterStrength}
`),s.analysis.mingGe&&(t+=`* **格局**: ${s.analysis.mingGe}
`),s.analysis.patternType&&(t+=`* **格局类型**: ${s.analysis.patternType}
`),s.analysis.patternDescription&&(t+=`* **格局说明**: ${s.analysis.patternDescription}
`),s.analysis.usefulGod&&(t+=`* **用神**: ${s.analysis.usefulGod}
`),s.analysis.avoidGod&&(t+=`* **忌神**: ${s.analysis.avoidGod}
`),s.analysis.favorableElements&&s.analysis.favorableElements.length>0&&(t+=`* **喜用五行**: ${s.analysis.favorableElements.join("、")}
`),s.analysis.unfavorableElements&&s.analysis.unfavorableElements.length>0&&(t+=`* **忌讳五行**: ${s.analysis.unfavorableElements.join("、")}
`),s.analysis.circulation&&(t+=`* **五行流通**: ${s.analysis.circulation}
`)),t+=`
### 八字四柱
`;const n=["year","month","day","hour"],i=["年","月","日","时"];if(n.forEach((o,r)=>{const l=s.pillars[o],h=s.tenGods[o],u=s.hiddenStems&&s.hiddenStems[o];t+=`* **${i[r]}**: ${l.ganZhi}(${h})`,u&&u.length>0&&(t+=` 藏干:${u.join(",")}`),t+=`
`}),s.intelligentAnalysis){t+=`
### 专业干支关系分析
`;const o=[[s.pillars.year.gan,s.pillars.year.zhi],[s.pillars.month.gan,s.pillars.month.zhi],[s.pillars.day.gan,s.pillars.day.zhi],[s.pillars.hour.gan,s.pillars.hour.zhi]];t+=`* **四柱干支**: ${o.map(m=>m.join("")).join(" ")}
`;const r=mn(o);r.length>0&&(t+=`* **天干关系**: ${r.join("、")}
`);const l=pn(o);l.length>0&&(t+=`* **地支关系**: ${l.join("、")}
`);const h=yn(o);h.length>0&&(t+=`* **整柱关系**: ${h.join("、")}
`);const u=fn(o);u.length>0&&(t+=`* **五行生克**: ${u.join("、")}
`)}if(s.luckInfo&&s.luckInfo.cycles&&s.luckInfo.cycles.length>0){t+=`
### 大运信息
`,s.luckInfo.startInfo&&(t+=`* **起运**: ${s.luckInfo.startInfo}
`);const o=s.luckInfo.cycles.filter(l=>!l.isXiaoyun),r=an(o);if(r.current){const l=r.current,h=s.dayMaster.gan,u=pe.getTenGod(l.ganZhi[0],h);if(t+=`* **当前大运**: ${l.ganZhi}(${u})`,l.year){const d=l.year+9;t+=` ${l.year}-${d}年`}t+=`
`;const m=r.future.slice(0,2).map(d=>{const x=pe.getTenGod(d.ganZhi[0],h);let _=`${d.ganZhi}(${x})`;if(d.year){const f=d.year+9;_+=`${d.year}-${f}年`}return _}).join(", ");m&&(t+=`* **未来大运**: ${m}
`),e&&(e.id==="ai-current-luck"||e.id==="ai-this-year")&&(t+=rn(l,h)),e&&e.id==="ai-lifetime-fortune"&&(t+=cn(o,h))}}if(s.liunian&&s.liunian.length>0){const o=new Date().getFullYear(),r=s.liunian.find(l=>l.year===o);r&&(t+=`
### 流年信息
* **今年**: ${r.ganZhi}(${o}年)
`)}if(e&&e.id==="ai-year-analysis"&&(t+=`
### 逐月运势分析参考
`,["正月","二月","三月","四月","五月","六月","七月","八月","九月","十月","冬月","腊月"].forEach(r=>{t+=`* **${r}**: 请根据流年与月令的关系进行分析
`})),e&&e.id==="ai-monthly-fortune"){t+=`
### 今年流月信息
`;const o=new Date().getFullYear(),r=s.dayMaster.gan,l=["正月","二月","三月","四月","五月","六月","七月","八月","九月","十月","冬月","腊月"],h=hn(o);for(let u=1;u<=12;u++)try{const m=pe.calculateLiuyue(o,u,r),d=l[u-1],x=h[u-1]||"日期计算失败";t+=`* **${d}**(${x}): ${m.ganZhi}(${m.tenGod})
`}catch(m){console.warn(`计算${u}月流月失败:`,m);const d=l[u-1];t+=`* **${d}**: 计算失败
`}}return t}function gn(s){if(!s||!s.selectedDate)return"未指定具体日期";const{selectedDate:e,selectedTime:t}=s;let n=`${e.getFullYear()}年${e.getMonth()+1}月${e.getDate()}日`;return t&&(n+=` ${t}`),n}function mn(s){const e=[],t={甲:"己",乙:"庚",丙:"辛",丁:"壬",戊:"癸"},n={甲:"庚",乙:"辛",丙:"壬",丁:"癸"},i={甲:"木",乙:"木",丙:"火",丁:"火",戊:"土",己:"土",庚:"金",辛:"金",壬:"水",癸:"水"},o={金:"木",木:"土",土:"水",水:"火",火:"金"};for(let r=0;r<4;r++)for(let l=r+1;l<4;l++){const h=s[r][0],u=s[l][0],m=["年","月","日","时"];if(t[h]===u||t[u]===h)e.push(`${m[r]}${m[l]}天干${h}${u}相合`);else if(n[h]===u||n[u]===h)e.push(`${m[r]}${m[l]}天干${h}${u}相冲`);else{const d=i[h],x=i[u];o[d]===x?e.push(`${m[r]}${m[l]}天干${h}(${d})克${u}(${x})`):o[x]===d&&e.push(`${m[r]}${m[l]}天干${u}(${x})克${h}(${d})`)}}return e}function pn(s){const e=[],t=s.map(d=>d[1]),n=["年","月","日","时"],i={子:"午",丑:"未",寅:"申",卯:"酉",辰:"戌",巳:"亥"},o={子:"丑",寅:"亥",卯:"戌",辰:"酉",巳:"申",午:"未"},r={子:"未",丑:"午",寅:"巳",卯:"辰",申:"亥",酉:"戌"},l={子:"酉",卯:"午",辰:"丑",未:"戌",寅:"亥",巳:"申"},h={申子辰:"水局",亥卯未:"木局",寅午戌:"火局",巳酉丑:"金局"};for(let d=0;d<4;d++)for(let x=d+1;x<4;x++){const _=t[d],f=t[x];i[_]===f||i[f]===_?e.push(`${n[d]}${n[x]}地支${_}${f}相冲`):o[_]===f||o[f]===_?e.push(`${n[d]}${n[x]}地支${_}${f}六合`):r[_]===f||r[f]===_?e.push(`${n[d]}${n[x]}地支${_}${f}相害`):(l[_]===f||l[f]===_)&&e.push(`${n[d]}${n[x]}地支${_}${f}相破`)}const u=[...new Set(t)];for(const[d,x]of Object.entries(h)){const _=d.split(""),f=_.filter(S=>u.includes(S)).length;if(f>=2){const S=_.filter(p=>u.includes(p));e.push(`地支${S.join("")}${f===3?"三合":"半合"}${x}`)}}return u.filter(d=>["寅","巳","申"].includes(d)).length>=2&&e.push("寅巳申无恩之刑"),u.filter(d=>["丑","戌","未"].includes(d)).length>=2&&e.push("丑戌未恃势之刑"),u.includes("子")&&u.includes("卯")&&e.push("子卯无礼之刑"),["辰","午","酉","亥"].forEach(d=>{t.filter(x=>x===d).length>1&&e.push(`${d}${d}自刑`)}),e}function yn(s){const e=[],t=["年","月","日","时"],n={甲:"木",乙:"木",丙:"火",丁:"火",戊:"土",己:"土",庚:"金",辛:"金",壬:"水",癸:"水",子:"水",丑:"土",寅:"木",卯:"木",辰:"土",巳:"火",午:"火",未:"土",申:"金",酉:"金",戌:"土",亥:"水"},i={金:"木",木:"土",土:"水",水:"火",火:"金"},o={甲:"庚",乙:"辛",丙:"壬",丁:"癸"},r={子:"午",丑:"未",寅:"申",卯:"酉",辰:"戌",巳:"亥"};for(let u=0;u<4;u++){const m=s[u][0],d=s[u][1],x=n[m],_=n[d];i[x]===_&&e.push(`${t[u]}柱${m}${d}盖头(天干克地支)`),i[_]===x&&e.push(`${t[u]}柱${m}${d}截脚(地支克天干)`)}for(let u=0;u<4;u++)for(let m=u+1;m<4;m++){const d=s[u],x=s[m],_=o[d[0]]===x[0]||o[x[0]]===d[0],f=r[d[1]]===x[1]||r[x[1]]===d[1];_&&f&&e.push(`${t[u]}${t[m]}柱${d.join("")}与${x.join("")}天克地冲(反吟)`)}const h=s.map(u=>u.join("")).reduce((u,m)=>(u[m]=(u[m]||0)+1,u),{});for(const u in h)h[u]>1&&e.push(`${u}柱重复出现${h[u]}次(伏吟)`);return e}function fn(s){const e=[],t={甲:"木",乙:"木",丙:"火",丁:"火",戊:"土",己:"土",庚:"金",辛:"金",壬:"水",癸:"水",子:"水",丑:"土",寅:"木",卯:"木",辰:"土",巳:"火",午:"火",未:"土",申:"金",酉:"金",戌:"土",亥:"水"},n={木:0,火:0,土:0,金:0,水:0};s.forEach(l=>{const h=t[l[0]],u=t[l[1]];n[h]++,n[u]++});const i=Object.entries(n).filter(([l,h])=>h>=3).map(([l])=>l),o=Object.entries(n).filter(([l,h])=>h===0).map(([l])=>l);return i.length>0&&e.push(`五行偏强: ${i.join("、")}`),o.length>0&&e.push(`五行缺失: ${o.join("、")}`),vn(n)?e.push("五行流通顺畅"):e.push("五行流通受阻"),e}function vn(s){const e=["木","火","土","金","水"];let t=0,n=0;for(let i=0;i<e.length*2;i++){const o=e[i%e.length];s[o]>0?(t++,n=Math.max(n,t)):t=0}return n>=3}const Ze={master:`你是一位学贯古今的命理宗师，既精通《滴天髓》、《三命通会》等八字古籍，也了解现代社会的心理学和职业发展。请根据以下信息，为用户提供一份详尽的分析。

**八字信息:**
[CHART_DATA]

---

[PROMPT_BODY]
`,build:(s,e,t="")=>{e===void 0&&(console.warn("PROMPT_BUILDER.build received an undefined question. Defaulting to empty string."),e="");let n=`**问题:**
${e}`;return t&&(n+=`

**分析要求:**
${t}`),Ze.master.replace("[CHART_DATA]",s).replace("[PROMPT_BODY]",n)}},nt={single:[{id:"ai-mingge-zonglun",text:"命格总论",prompt:`

**八字信息:**
[八字信息]

**解读要求:**
请作为一位精通古今命理学的专业大师，严格按照以下结构进行全面深入的命格分析，确保理论扎实、逻辑清晰、指导实用。

---

### 1. 命局基础解析
**日主分析:**
- 日主五行属性、阴阳特质及其在四季中的旺衰状态
- 日主在命局中的力量强弱（身强/身弱/从格等）
- 日主的根基深浅（通根情况、得令与否）

**格局判定:**
- 命局的核心格局类型（正格/特殊格局）
- 格局成败的关键因素分析
- 格局层次的高低评估

**五行配置:**
- 五行分布的均衡性与偏颇性
- 用神、忌神的准确判定
- 调候用神的重要性分析

### 2. 十神关系解读
**核心十神分析:**
- 主要十神的力量强弱及其对命主的影响
- 十神之间的生克制化关系
- 十神所代表的人生领域的吉凶判断

**六亲关系:**
- 父母、兄弟、配偶、子女等六亲的缘分深浅
- 各六亲对命主人生的助益或阻碍
- 六亲关系的和谐程度预测

### 3. 性格特质深度剖析
**核心性格:**
- 基于日主和格局的根本性格特征
- 思维模式、价值观念、行为习惯
- 性格中的优势与潜在弱点

**处世风格:**
- 与人交往的模式和偏好
- 面对困难和机遇的应对方式
- 决策风格和执行能力特点

**情感特质:**
- 情感表达方式和情感需求
- 对感情的态度和期望
- 情感生活中的优势与挑战

### 4. 人生各领域详析
**事业发展:**
- 适合的职业方向和行业领域
- 事业发展的模式（创业/打工/合作等）
- 职场中的优势能力和注意事项
- 官运和领导能力的评估

**财富状况:**
- 财富获取的主要途径和方式
- 理财能力和投资偏好分析
- 财运的起伏规律和关键时期
- 破财风险的预防建议

**感情婚姻:**
- 感情观念和择偶标准
- 婚姻生活的特点和模式
- 配偶的大致特征和缘分深浅
- 感情发展的关键时期

**健康养生:**
- 基于五行的体质特点分析
- 易发疾病的部位和类型
- 养生保健的重点方向
- 生活习惯的调整建议

### 5. 大运流年指导
**大运总览:**
- 一生大运的整体走势分析
- 各步大运的吉凶特点
- 人生重要转折期的时间节点

**当前大运:**
- 当前大运对命局的具体影响
- 这十年的主要机遇和挑战
- 各个生活领域的发展趋势

**近期流年:**
- 未来3-5年的重要流年分析
- 关键年份的注意事项
- 重要决策的最佳时机选择

### 6. 现代生活指导
**个人成长:**
- 性格优化和能力提升的方向
- 心理调节和情绪管理建议
- 人际关系的改善策略

**职业规划:**
- 结合现代社会的职业发展建议
- 技能学习和能力培养重点
- 职场晋升和转型的时机把握

**生活智慧:**
- 日常生活中的趋吉避凶方法
- 重要决策的参考原则
- 人生规划的长远建议

### 7. 总结与启示
**命格特色:**
- 这个命局最突出的特点和优势
- 人生使命和价值实现的方向

**人生建议:**
- 基于命理分析的人生智慧
- 如何在顺境中保持清醒，在逆境中坚持前行
- 实现人生价值最大化的路径建议
`},{id:"ai-current-luck",text:"当前大运",prompt:`请对命主当前所处的大运进行全面深入的分析。

**大运基础信息分析:**
- 当前大运的天干地支及其五行属性
- 大运与原命局的生克制化关系（合、冲、刑、害、会、拱等）
- 大运对命局用神忌神的影响程度
- 大运改变命局格局的具体表现

**十神力量变化:**
- 大运引入的新十神及其作用
- 原有十神力量的增强或减弱
- 十神组合产生的新的吉凶效应
- 对六亲关系的具体影响

**四大领域详细分析:**

1. **事业发展:**
   - 职业发展的整体趋势和机遇
   - 工作环境和人际关系的变化
   - 升职加薪或跳槽转行的时机
   - 创业或投资的可行性分析
   - 需要避免的职场陷阱

2. **财富运势:**
   - 正财偏财的具体表现和来源
   - 投资理财的吉凶和注意事项
   - 破财风险的时间节点和原因
   - 增加收入的最佳策略和方向
   - 财务管理的重点建议

3. **感情婚姻:**
   - 单身者的桃花运势和正缘时机
   - 恋爱中的关系发展和稳定性
   - 已婚者的夫妻关系和家庭和谐
   - 感情中的挑战和化解方法
   - 子女缘分和教育方面的考虑

4. **健康状况:**
   - 基于五行变化的体质调整
   - 需要重点关注的身体部位和疾病
   - 养生保健的具体方法和时机
   - 心理健康和情绪管理建议
   - 生活作息的优化方向

**行事策略指导:**
- 这十年的总体行事原则和策略
- 不同阶段的重点关注方向
- 重大决策的最佳时机选择
- 人际关系的经营和维护建议
- 如何趋吉避凶，化解不利因素

**时间节点提醒:**
- 大运中特别吉利的年份和月份
- 需要格外谨慎的时间段
- 重要转折点的具体时机
- 各种计划实施的最佳时间窗口`},{id:"ai-this-year",text:"今年运势",prompt:`请对命主今年的流年运势进行全面精准的分析。

**流年基础分析:**
- 今年流年天干地支的五行属性和特质
- 流年与原命局的生克制化关系详解
- 流年与当前大运的相互作用分析
- 流年对命局格局和用神的具体影响

**年度运势总论:**
- 今年整体运势的吉凶程度和主要特征
- 年度关键词和核心主题
- 与去年相比的变化趋势
- 今年最需要把握的机遇和最需要防范的风险

**四大核心领域深度解析:**

1. **事业学业运势:**
   - 工作发展的整体趋势和关键机遇
   - 职场人际关系的变化和贵人运
   - 升职、跳槽、创业的时机分析
   - 学业进步和考试运势（如适用）
   - 需要避免的职场风险和小人

2. **财富收入状况:**
   - 正财运势：工资收入、稳定收益的变化
   - 偏财运势：投资、兼职、意外收入的机会
   - 破财风险：需要防范的财务陷阱和损失
   - 理财建议：今年最适合的投资策略
   - 消费指导：大额支出的最佳时机

3. **感情婚姻发展:**
   - 单身者：桃花运势、正缘出现的时机和特征
   - 恋爱中：关系发展、结婚时机、感情稳定性
   - 已婚者：夫妻关系、家庭和谐、感情升温机会
   - 感情挑战：可能出现的矛盾和化解方法
   - 人际关系：朋友圈的扩展和社交运势

4. **健康养生状况:**
   - 整体健康趋势和体质变化
   - 需要重点关注的身体部位和潜在疾病
   - 心理健康和情绪管理的重要性
   - 养生保健的最佳方法和时机
   - 意外伤害的防范和安全注意事项

**逐月运势指导:**
请按照农历月份，简要分析每个月的运势重点：
- 正月至三月：春季运势特点和注意事项
- 四月至六月：夏季发展机遇和挑战
- 七月至九月：秋季收获期的把握要点
- 十月至腊月：冬季总结和来年准备

**关键时间节点:**
- 特别吉利的月份和具体日期
- 需要格外谨慎的时间段
- 重要决策的最佳时机
- 各种计划启动的理想时间

**全年行动指南:**
- 今年的总体行事原则和策略
- 如何最大化利用有利因素
- 如何化解和规避不利影响
- 重要决策的参考标准
- 年度目标设定和实现路径`},{id:"ai-year-analysis",text:"年运分析",prompt:`请为我进行一次全面而深入的流年运势分析。你需要扮演一位既精通传统命理，又善于现代生活指导的八字专家。

分析报告必须严格遵循以下结构，确保逻辑清晰、内容详实、指导性强：

**第一部分：流年总论——定调全年**

1.  **核心关系解读**：首先，请明确指出今年的流年天干和地支，分别与我的原命局四柱、以及当前大运的天干地支产生了哪些核心的生克制化关系（如天合地合、天克地冲、三会、三合、刑冲破害等）。
2.  **年度基调判断**：基于上述关系，请用一两句精炼的话，为我今年的整体运势定下一个总基调。例如："机遇与挑战并存，事业有突破，但需防口舌是非"，或"平稳发展之年，宜静守内敛，不宜冒进"等。
3.  **年度关键词**：请为我提炼3-5个今年的年度运势关键词，如"变革"、"合作"、"学习"、"健康"、"家庭"等。

**第二部分：四大领域深度剖析**

请分别从以下四个核心领域，详细分析我今年的具体运势：

1.  **事业学业**：
    *   **机遇**：今年在工作或学习上可能出现哪些新的机会、突破点或贵人？
    *   **挑战**：可能遇到哪些阻碍、竞争或需要特别注意的陷阱？
    *   **行动指南**：我应该采取什么样的策略来抓住机遇、规避风险？

2.  **财富收入**：
    *   **机遇**：正财和偏财方面有哪些机会？是否适合投资或拓展新的收入来源？
    *   **挑战**：需要注意哪些潜在的破财风险或不必要的开支？
    *   **理财建议**：我今年的理财策略应该是积极进取还是保守稳健？

3.  **感情婚恋**：
    *   **机遇**：单身者是否有正缘桃花机会？有伴侣者关系能否升温？
    *   **挑战**：感情上可能出现哪些矛盾、烂桃花或外部干扰？
    *   **相处之道**：我应该如何与伴侣沟通或提升个人魅力来促进感情和谐？

4.  **健康状况**：
    *   **机遇**：今年是否适合养生、健身或改善不良生活习惯？
    *   **挑战**：需要特别关注哪些身体部位的健康问题？（需结合五行分析）
    *   **养生贴士**：请提供一些简单易行的年度健康保养建议。

**第三部分：逐月运势详批——把握节奏**

请严格按照命盘信息中的"逐月运势分析参考"列表，从正月到腊月，逐一分析每个月的运势。每个月的分析需包含：

1.  **运势简评**：用一句话概括当月运势的吉凶与主要特点。
2.  **重点关注**：指出当月在事业、财运、感情、健康中，哪个领域的变化最为突出。
3.  **行动锦囊**：给出一句当月最核心的行动建议或提醒。

请确保你的语言风格既专业又通俗易懂，充满善意和智慧，避免使用恐吓性或宿命论的断语，最终目的是赋能于我，让我更好地规划和度过这一年。`},{id:"ai-career",text:"事业财运",prompt:`请从命理学角度对命主的事业发展和财富运势进行全面深入的分析。

**一、整体命格的事业财运分析**

**事业发展特质:**
- 基于日主和格局的事业发展模式（领导型/技术型/服务型等）
- 工作能力和职场优势的具体表现
- 适合的管理层级和职责范围
- 创业潜质和独立工作能力评估
- 团队合作能力和人际协调技巧

**行业方向指导:**
- 基于五行喜忌的最佳行业选择
- 具体的职业领域和岗位推荐
- 传统行业 vs 新兴行业的适应性
- 不同发展阶段的行业转换建议
- 需要避免的行业和工作环境

**财富获取模式:**
- 正财运势：稳定收入的获取能力和增长潜力
- 偏财运势：投资理财、副业收入的天赋
- 财富积累的主要途径和最佳策略
- 理财观念和消费习惯的特点
- 财富保值增值的能力评估

**职场人际关系:**
- 与上级领导的相处模式和发展机会
- 同事关系的处理技巧和合作优势
- 下属管理能力和团队建设天赋
- 职场贵人的特征和出现时机
- 需要防范的小人和职场陷阱

**二、当前大运的事业财运分析**

**这十年的整体趋势:**
- 大运对事业发展的总体影响（助力/阻碍/平稳）
- 职业生涯的重要转折点和机遇期
- 收入水平的变化趋势和增长空间
- 财富积累的关键时期和方法

**分阶段发展规划:**
- 大运前期（前3-4年）：重点发展方向和策略
- 大运中期（中间3-4年）：巩固提升和突破机会
- 大运后期（后2-3年）：收获总结和下步准备

**具体机遇把握:**
- 升职加薪的最佳时机和准备要点
- 跳槽转行的可行性分析和时机选择
- 创业投资的成功概率和注意事项
- 合作伙伴的选择标准和合作模式
- 技能提升和学习进修的重点方向

**风险防范指导:**
- 可能遇到的事业挫折和应对策略
- 财务风险的识别和预防措施
- 职场竞争和人际冲突的化解方法
- 投资理财的陷阱和避险原则

**三、实用行动建议**

**短期策略（1-2年）:**
- 当前工作的优化和改进方向
- 收入增长的具体实施方案
- 人脉建设和关系维护重点
- 技能学习和能力提升计划

**中期规划（3-5年）:**
- 职业发展的阶段性目标设定
- 财富积累的具体数量目标
- 行业地位和影响力的建立
- 副业发展和多元化收入布局

**长期愿景（5-10年）:**
- 事业成就的最高目标和实现路径
- 财富自由的可能性和实现方式
- 社会价值和个人成就的平衡
- 退休规划和财富传承考虑

**关键成功要素:**
- 最需要培养和强化的核心能力
- 最重要的人际关系和资源整合
- 最关键的时机把握和决策原则
- 最有效的风险管控和应变策略`},{id:"ai-marriage",text:"感情婚姻",prompt:`请从命理学角度对命主的感情生活和婚姻状况进行全面深入的分析。

**一、整体命格的感情婚姻分析**

**感情观念特质:**
- 基于日主和夫妻宫的感情态度和价值观
- 对爱情和婚姻的期望和理想模式
- 感情表达方式和沟通风格特点
- 感情中的优势品质和魅力所在
- 感情处理中的弱点和需要改进之处

**择偶标准解析:**
- 理想伴侣的性格特征和外在条件
- 最容易被吸引的异性类型
- 择偶过程中的重点考虑因素
- 容易忽视但重要的配偶品质
- 需要避免的感情陷阱和错误选择

**配偶特征预测:**
- 未来配偶的大致性格和能力特点
- 配偶的家庭背景和社会地位
- 配偶的职业方向和经济能力
- 配偶的外貌特征和气质类型
- 夫妻年龄差距和最佳匹配度

**婚姻生活模式:**
- 夫妻相处的基本模式和互动方式
- 家庭角色分工和责任承担
- 婚姻中的主导地位和决策权
- 夫妻感情的发展趋势和稳定性
- 婚姻生活中的幸福指数和满意度

**子女缘分分析:**
- 子女运势的强弱和生育时机
- 子女的性格特点和发展潜力
- 亲子关系的和谐程度和教育方式
- 子女对家庭和事业的影响
- 子女成才的可能性和支持方向

**二、当前大运的感情婚姻分析**

**这十年的感情总趋势:**
- 大运对感情运势的整体影响
- 感情发展的关键时期和转折点
- 婚姻状态的变化和稳定性
- 感情生活的幸福指数变化

**不同阶段的感情发展:**

**单身者专项分析:**
- 桃花运势的强弱和出现时机
- 正缘出现的年份和月份预测
- 最容易遇到合适对象的场所和方式
- 脱单成功的关键因素和准备要点
- 需要避免的烂桃花和感情陷阱

**恋爱中专项分析:**
- 当前感情关系的发展前景
- 结婚时机的最佳选择和准备
- 感情稳定性和长久性评估
- 恋爱过程中的挑战和化解方法
- 双方家庭的接受度和融合建议

**已婚者专项分析:**
- 夫妻关系的发展趋势和改善空间
- 婚姻稳定性和危机防范
- 夫妻感情升温的机会和方法
- 家庭和谐的维护策略
- 第三者介入的风险和预防

**三、感情发展指导建议**

**个人魅力提升:**
- 最需要培养的个人品质和魅力
- 外在形象和内在修养的改善方向
- 社交能力和沟通技巧的提升
- 感情智慧和情商的培养

**感情经营策略:**
- 不同阶段的感情经营重点
- 与伴侣沟通的最佳方式和技巧
- 感情矛盾的预防和化解方法
- 保持感情新鲜感的具体建议

**重要时机把握:**
- 表白、求婚、结婚的最佳时机
- 感情修复和关系改善的关键时期
- 重要感情决策的参考时间
- 感情投入的最佳节奏和分寸

**风险防范指导:**
- 感情中最容易出现的问题和预防
- 第三者和外界干扰的应对策略
- 家庭矛盾和婆媳关系的处理
- 感情危机的识别和化解方案

**长期幸福规划:**
- 感情生活的长远目标和愿景
- 夫妻共同成长的方向和计划
- 家庭建设和子女教育的规划
- 感情与事业的平衡和协调`},{id:"ai-health",text:"健康状况",prompt:`请从中医命理学角度对命主的健康状况进行全面系统的分析。

**一、整体命格的健康分析**

**五行体质特征:**
- 基于五行分布的先天体质类型
- 五行偏盛偏衰对身体的具体影响
- 先天体质的优势和易发问题
- 体质调理的基本原则和方向
- 不同季节的体质变化和适应性

**脏腑功能评估:**
- 心脏系统：心血管健康和循环功能
- 肝胆系统：肝功能和情绪调节能力
- 脾胃系统：消化吸收和营养代谢
- 肺肾系统：呼吸功能和泌尿生殖
- 各脏腑之间的协调性和平衡状态

**易发疾病预测:**
- 基于命局的疾病易感性分析
- 最需要重点关注的身体部位
- 可能出现的慢性疾病类型
- 急性疾病的发病规律和诱因
- 遗传性疾病的风险评估

**体质调理方向:**
- 五行调和的具体方法和原则
- 饮食调理的重点和禁忌
- 运动锻炼的最佳方式和强度
- 作息规律的优化建议
- 情绪管理和心理健康维护

**二、当前大运的健康分析**

**这十年的健康总趋势:**
- 大运对整体健康的影响程度
- 健康状况的变化趋势和关键时期
- 疾病风险的增减和防范重点
- 体质改善的机会和最佳时机

**分阶段健康管理:**
- 大运前期：重点关注的健康问题和预防
- 大运中期：健康维护的关键措施和调理
- 大运后期：健康巩固和下阶段准备

**重点健康风险:**
- 这十年最需要防范的疾病类型
- 健康危机可能出现的时间节点
- 意外伤害和安全事故的预防
- 慢性疾病的发展趋势和控制

**健康改善机遇:**
- 体质调理的最佳时机和方法
- 疾病康复的有利时期和条件
- 健康习惯养成的关键时间
- 医疗保健的最佳投入时机

**三、具体养生保健指导**

**日常生活调理:**
- 最适合的作息时间安排
- 睡眠质量的改善方法
- 工作强度和休息节奏的平衡
- 生活环境的优化建议
- 季节性养生的重点措施

**饮食营养指导:**
- 基于五行的饮食搭配原则
- 最适合的食物类型和烹饪方式
- 需要避免或限制的食物
- 营养补充的重点和时机
- 特殊时期的饮食调理

**运动锻炼建议:**
- 最适合的运动类型和强度
- 运动时间和频率的安排
- 不同季节的运动调整
- 运动中的注意事项和禁忌
- 运动与体质调理的结合

**心理健康维护:**
- 情绪管理和压力释放方法
- 心理调节的重点和技巧
- 人际关系对健康的影响
- 精神修养和内心平衡
- 心理疾病的预防和调理

**医疗保健规划:**
- 定期体检的重点项目和频率
- 预防性医疗措施的安排
- 中医调理的最佳时机和方法
- 保健品选择的原则和建议
- 医疗资源的合理利用

**四、特殊时期健康指导**

**关键年份提醒:**
- 健康风险较高的年份和月份
- 需要格外注意的身体信号
- 重要体检和治疗的最佳时机
- 健康投资的重点时期

**应急预案建议:**
- 突发疾病的应对准备
- 健康危机的处理原则
- 医疗资源的提前规划
- 家庭健康管理的完善

**长期健康愿景:**
- 健康长寿的实现路径
- 老年健康的提前准备
- 健康与事业的平衡协调
- 家庭健康文化的建立`},{id:"ai-next-three-years",text:"未来三年",prompt:`请对命主未来三年的流年运势进行详细的逐年分析和规划指导。

**整体三年运势概览:**
- 未来三年的总体运势趋势和发展主线
- 三年中的重要转折点和关键机遇
- 需要重点关注的生活领域和发展方向
- 三年规划的核心目标和实现策略

**第一年运势详析:**

**流年基础分析:**
- 流年干支与命局、大运的相互作用
- 这一年的整体运势特点和主要挑战
- 年度关键词和核心发展主题

**各领域具体运势:**
- **事业发展:** 工作机遇、职业发展、创业投资的可行性
- **财富收入:** 收入变化、投资理财、破财风险的防范
- **感情婚姻:** 桃花运势、感情发展、婚姻状况的变化
- **健康状况:** 身体健康、疾病预防、养生保健的重点
- **人际关系:** 贵人运势、人脉拓展、小人防范

**重要时间节点:**
- 特别吉利的月份和关键机遇期
- 需要谨慎的时间段和注意事项
- 重大决策的最佳时机选择

**行动建议:**
- 这一年的重点发展策略和行动计划
- 需要把握的机遇和避免的风险
- 年度目标的设定和实现路径

**第二年运势详析:**

**流年基础分析:**
- 与第一年相比的运势变化和发展趋势
- 这一年的新机遇和新挑战
- 承上启下的关键作用和重要性

**各领域具体运势:**
- **事业发展:** 在第一年基础上的进一步发展和突破
- **财富收入:** 财富积累的加速期和投资机会
- **感情婚姻:** 感情关系的深化和婚姻生活的调整
- **健康状况:** 健康管理的持续和体质改善的机会
- **人际关系:** 社交圈的扩展和重要关系的建立

**重要时间节点:**
- 关键的发展机遇期和转折点
- 需要特别注意的风险时段
- 重要计划实施的最佳时机

**行动建议:**
- 在第一年基础上的策略调整和优化
- 新的发展机遇的把握和利用
- 风险防范和应对措施的完善

**第三年运势详析:**

**流年基础分析:**
- 三年周期的收官之年特点
- 前两年积累的成果和经验的运用
- 为下一个发展阶段的准备和铺垫

**各领域具体运势:**
- **事业发展:** 成果收获期和新发展方向的确立
- **财富收入:** 财富积累的巩固和增值机会
- **感情婚姻:** 感情生活的稳定和家庭建设的完善
- **健康状况:** 健康状况的稳定和长期保健计划
- **人际关系:** 人脉资源的整合和社会影响力的提升

**重要时间节点:**
- 成果收获的关键时期
- 新计划启动的准备阶段
- 重要转换的过渡时期

**行动建议:**
- 三年成果的总结和巩固
- 新发展周期的规划和准备
- 经验教训的总结和应用

**三年综合规划建议:**

**短期目标（每年）:**
- 年度重点发展方向和具体目标
- 阶段性成果的评估标准
- 年度计划的调整和优化机制

**中期规划（三年）:**
- 三年总体发展目标和实现路径
- 重要里程碑的设定和达成策略
- 资源配置和能力建设的重点

**风险管控:**
- 三年中可能遇到的主要风险和挑战
- 风险预防和应对措施的准备
- 应急预案和备选方案的制定

**成功要素:**
- 三年成功的关键因素和核心能力
- 需要持续培养和强化的优势
- 外部资源和支持的获取策略

**长远展望:**
- 三年后的发展前景和机遇
- 为更长远目标的准备和铺垫
- 持续发展的动力和方向规划`},{id:"ai-monthly-fortune",text:"年运逐月",prompt:`请对命主今年的逐月运势进行详细分析。

**分析要求:**
请按照农历月份，从正月到腊月，逐一分析每个月的运势特点和注意事项。

**分析框架:**
对于每个月，请提供以下内容：

**[月份名称]（农历X月）**
- **整体运势**: 用一句话概括本月的总体运势特点
- **事业工作**: 工作发展、项目进展、人际关系的具体情况
- **财运状况**: 收入变化、投资机会、消费建议
- **感情生活**: 感情发展、人际交往、家庭关系的变化
- **健康养生**: 身体状况、疾病预防、养生重点
- **重要提醒**: 本月最需要注意的事项和最佳行动时机

**特别要求:**
1. **结合流年**: 分析每月的月令与今年流年的相互作用
2. **突出重点**: 每月重点关注1-2个最重要的生活领域
3. **实用指导**: 提供具体可行的建议和行动方案
4. **时机把握**: 指出每月的最佳决策时间和需要谨慎的时期
5. **承前启后**: 说明每月与前后月份的运势连接和发展趋势

请确保分析既有理论依据又贴近实际生活，帮助命主更好地规划和把握全年的运势节奏。`},{id:"ai-lifetime-fortune",text:"一生运势",prompt:`请对命主的一生运势进行全面深入的分析。

**分析要求:**
基于提供的完整大运信息，从人生全局的角度进行系统性分析。

**分析框架:**

### 1. 人生运势总览
- **整体格局评估**: 命局层次、人生成就潜力、社会地位预测
- **人生主题**: 这一生的核心使命和价值实现方向
- **运势起伏规律**: 一生中的高峰期、低谷期、转折期分析
- **关键年龄节点**: 人生重要转折点的具体年龄和时机

### 2. 人生阶段划分分析
请按照人生不同阶段进行详细分析：

**青年期（起运-30岁）:**
- 学业成就和教育发展
- 性格形成和能力培养
- 早期事业选择和发展方向
- 感情启蒙和早期恋爱经历

**壮年期（30-50岁）:**
- 事业发展的黄金期和挑战期
- 财富积累的主要阶段和方式
- 婚姻家庭的建立和发展
- 社会地位的确立和影响力扩展

**中年期（50-65岁）:**
- 事业巅峰期和转型期
- 财富管理和投资理财
- 家庭责任和子女教育
- 健康管理和养生重点

**晚年期（65岁以后）:**
- 退休生活和精神追求
- 健康状况和长寿因素
- 财富传承和家族发展
- 人生总结和精神升华

### 3. 各大运详细解析
对每个大运进行深入分析：

**大运X（年龄段）:**
- **大运特色**: 这十年的主要特征和发展主题
- **事业发展**: 职业发展、创业机会、职场变化
- **财富状况**: 收入变化、投资机会、财富积累
- **感情婚姻**: 感情发展、婚姻状况、家庭变化
- **健康状况**: 身体健康、疾病预防、养生要点
- **关键年份**: 这十年中最重要的2-3个年份及其意义
- **行事建议**: 这十年的总体策略和注意事项

### 4. 人生重大决策指导
- **最佳创业时机**: 适合创业的大运和具体年份
- **投资理财时机**: 财富增值的最佳时期和方式
- **婚姻时机**: 最适合结婚的年龄段和时机
- **置业时机**: 购房置业的最佳时期
- **子女教育**: 生育时机和子女教育的重点时期
- **健康管理**: 不同年龄段的健康重点和预防措施

### 5. 人生智慧总结
- **性格优势的发挥**: 如何在不同人生阶段发挥性格优势
- **挑战的应对**: 人生主要挑战的出现时期和应对策略
- **机遇的把握**: 一生中最重要的几次机遇及把握方法
- **人生价值实现**: 如何在有限的生命中实现最大价值

**特别要求:**
1. **全局视角**: 从整个人生的角度看待每个阶段的意义
2. **承前启后**: 分析各个阶段之间的关联和影响
3. **重点突出**: 识别人生中最关键的时期和决策点
4. **实用指导**: 提供具体可行的人生规划建议
5. **积极导向**: 即使面对挑战期也要提供积极的应对方案

请确保分析内容丰富全面，既有宏观的人生规划，又有具体的阶段指导，帮助命主更好地规划和把握整个人生的发展轨迹。`},{id:"ask-ai-with-date",text:"选定日期...",prompt:""},{id:"ai-custom",text:"自定义...",prompt:""}],combined:[{id:"ai-compat-marriage",text:"婚恋匹配",prompt:`请对这两个命盘进行全面深入的婚恋匹配分析。

**一、基础匹配度分析**

**五行互补性:**
- 双方五行分布的互补程度和平衡效果
- 五行相生相克对感情的具体影响
- 通过五行调和改善关系的方法
- 五行失衡可能带来的感情问题

**格局层次匹配:**
- 双方命格层次的匹配程度
- 人生追求和价值观的一致性
- 社会地位和发展潜力的协调性
- 格局差异对关系稳定性的影响

**用神喜忌分析:**
- 双方用神是否相互有利
- 忌神冲突对感情的负面影响
- 通过调理化解用神忌神冲突
- 用神互补带来的感情助益

**二、性格匹配分析**

**核心性格特质:**
- 双方性格的互补性和相似性
- 性格优势的相互促进作用
- 性格弱点的相互包容度
- 性格冲突的表现和化解方式

**沟通模式匹配:**
- 双方的沟通风格和表达方式
- 理解能力和共情水平
- 沟通障碍的主要原因和改善方法
- 有效沟通的建立策略

**价值观念协调:**
- 人生观、世界观的一致程度
- 对家庭、事业、金钱的态度差异
- 价值观冲突的调和可能性
- 共同价值观的培养方向

**三、感情发展分析**

**感情基础评估:**
- 双方感情的真实程度和深度
- 感情发展的自然性和稳定性
- 感情基础的牢固程度
- 感情持久性的预测

**夫妻宫互动:**
- 双方夫妻宫的相互作用分析
- 夫妻宫对感情运势的影响
- 夫妻关系的和谐程度预测
- 夫妻宫不利因素的化解方法

**桃花运势影响:**
- 双方桃花运对感情的影响
- 第三者介入的风险评估
- 外界诱惑的抵抗能力
- 感情专一性的维护策略

**四、婚姻生活预测**

**家庭角色分工:**
- 双方在家庭中的角色定位
- 家务分工和责任承担
- 家庭决策权的分配
- 家庭和谐的维护方式

**经济状况匹配:**
- 双方财运的互补和促进作用
- 经济观念和理财方式的协调
- 家庭财务管理的最佳模式
- 经济压力对婚姻的影响

**子女缘分分析:**
- 双方的子女运势和生育时机
- 子女教育理念的一致性
- 亲子关系的和谐程度
- 子女对婚姻稳定性的影响

**五、大运同步性分析**

**运势周期匹配:**
- 双方大运的同步程度
- 运势起伏的相互影响
- 共同发展的最佳时期
- 运势差异的应对策略

**人生阶段协调:**
- 不同人生阶段的匹配度
- 共同目标的设定和实现
- 人生规划的协调统一
- 阶段性挑战的共同应对

**六、关系改善建议**

**优势强化策略:**
- 双方匹配优势的最大化利用
- 相互促进的具体方法
- 优势互补的深度挖掘
- 共同成长的方向规划

**矛盾化解方案:**
- 主要矛盾点的识别和分析
- 矛盾化解的具体步骤和方法
- 预防矛盾升级的措施
- 矛盾转化为成长机会的策略

**感情维护指导:**
- 日常感情维护的重点和方法
- 特殊时期的关系维护策略
- 感情升温的具体建议
- 长期关系稳定的保障措施

**实用行动建议:**
- 短期内可以实施的改善措施
- 中长期关系发展的规划
- 重要决策的参考原则
- 外部支持资源的利用`},{id:"ai-compat-career",text:"事业合作",prompt:`请对这两个命盘进行全面的事业合作匹配分析。

**一、合作基础评估**

**能力互补分析:**
- 双方专业能力和技能的互补性
- 工作经验和资源的相互补充
- 能力结构的优化组合效果
- 能力短板的相互弥补程度

**性格匹配度:**
- 工作风格和处事方式的协调性
- 决策模式和执行能力的配合
- 压力承受和应变能力的互补
- 团队协作精神的匹配程度

**价值观念一致性:**
- 事业目标和发展愿景的一致程度
- 商业理念和经营哲学的协调性
- 诚信度和职业操守的匹配
- 风险偏好和投资理念的统一

**二、合作模式分析**

**角色分工建议:**
- 最适合的合作角色和职责分工
- 决策权和执行权的合理分配
- 专业领域的责任划分
- 管理层级的最佳安排

**合作领域选择:**
- 最适合合作的行业和项目类型
- 双方优势的最大化发挥领域
- 市场机会的共同把握方向
- 创新发展的重点合作方向

**合作时机把握:**
- 开始合作的最佳时机选择
- 合作深化的关键时间节点
- 重大决策的最佳时机
- 合作调整的适当时期

**三、合作优势分析**

**资源整合效应:**
- 双方资源的有效整合程度
- 资源利用效率的提升空间
- 新资源获取的协同效应
- 资源配置的优化方案

**市场竞争优势:**
- 合作后的市场竞争力提升
- 市场份额扩大的可能性
- 品牌影响力的协同增强
- 客户资源的共享和拓展

**创新发展潜力:**
- 合作创新的可能性和方向
- 技术突破和产品创新机会
- 商业模式创新的空间
- 行业引领的发展潜力

**四、潜在风险分析**

**合作冲突预测:**
- 可能出现的主要矛盾和分歧
- 利益分配的潜在争议点
- 决策权争夺的风险评估
- 理念冲突的表现和影响

**经营风险评估:**
- 合作经营中的主要风险点
- 市场风险的共同承担能力
- 财务风险的防范和控制
- 法律风险的预防措施

**关系维护挑战:**
- 长期合作关系的稳定性
- 信任建立和维护的难点
- 沟通协调的潜在障碍
- 合作关系恶化的风险因素

**五、成功策略建议**

**合作机制建立:**
- 有效的沟通协调机制
- 科学的决策制定流程
- 公平的利益分配方案
- 完善的监督管理体系

**风险防控措施:**
- 主要风险的预防策略
- 风险发生时的应对预案
- 合作协议的关键条款
- 退出机制的合理设计

**关系维护策略:**
- 日常关系维护的重点
- 信任建立的具体方法
- 矛盾化解的有效途径
- 合作深化的推进策略

**发展规划指导:**
- 短期合作目标的设定
- 中期发展规划的制定
- 长期愿景的共同构建
- 阶段性评估的实施方案

**六、实施建议**

**启动阶段:**
- 合作启动的准备工作
- 初期磨合的注意事项
- 快速建立信任的方法
- 早期成果的获取策略

**发展阶段:**
- 合作深化的推进步骤
- 业务扩展的优先顺序
- 团队建设的重点方向
- 市场拓展的协同策略

**成熟阶段:**
- 合作关系的稳定维护
- 持续创新的动力机制
- 市场领先地位的巩固
- 新机遇的共同把握

**关键成功因素:**
- 合作成功的核心要素
- 需要重点关注的关键指标
- 持续改进的重点方向
- 长期成功的保障措施`},{id:"ai-compat-custom",text:"自定义...",prompt:""}]};function xn(s,e,t,n=null){const i=t?we(t,e):"无法获取命盘数据。",o=e.dataset.prompt,r=e.id;if(r==="ask-ai-with-date"){const l=gn(n),h=document.getElementById("customQuestion")?.value?.trim()||"",u=s&&s!=="选定日期..."?s:h,m=u?`在${l}这个时间点, ${u}`:`请详细分析${l}的运势。`;return Ze.build(i,m,"请结合用户提供的具体日期进行分析，越详细越好。")}if(r==="ai-mingge-zonglun"){let l=o.replace("[八字信息]",i);return s!=="命格总论"&&(l=l.replace("为用户提供一份详尽的八字命局解读。",`为用户提供一份关于"${s}"的详尽解读。`)),l}return Ze.build(i,s,o)}const xe={apiUrl:{}.VITE_AI_API_URL||"https://flow.ovo.gs/ai",apiKey:{}.VITE_AI_API_KEY||"",model:{}.VITE_AI_MODEL||"sydf-v1-250520",maxTokens:8192,temperature:.7,debug:!0};console.log("🔧 AI 配置调试信息:",{apiUrl:xe.apiUrl,model:xe.model,hasApiKey:!!xe.apiKey,envVars:{VITE_AI_API_URL:{}.VITE_AI_API_URL||"未设置",VITE_AI_MODEL:{}.VITE_AI_MODEL||"未设置",VITE_AI_API_KEY:{}.VITE_AI_API_KEY?"已设置":"未设置"}});class ht{constructor(){this.currentRequest=null,this.updateConfig(),console.log("🔧 AI Service 初始化完成:",{apiUrl:this.apiUrl,model:this.model,hasApiKey:!!this.apiKey&&this.apiKey!=="",isProd:!0,currentDomain:typeof window<"u"?window.location.hostname:"unknown"})}updateConfig(){let e=null;try{const n=localStorage.getItem("ai_api_config");n&&(e=JSON.parse(n))}catch(n){console.warn("读取用户AI配置失败:",n)}e&&e.apiUrl?(this.apiUrl=e.apiUrl,this.apiKey=e.apiKey||"",this.model=e.model||xe.model,this.maxTokens=e.maxTokens||8192,console.log("✅ 使用用户配置的AI设置:",{apiUrl:this.apiUrl,hasApiKey:!!this.apiKey,model:this.model})):(this.apiUrl=xe.apiUrl,this.apiKey=xe.apiKey,this.model=xe.model,this.maxTokens=xe.maxTokens,console.log("📋 使用默认AI配置:",{apiUrl:this.apiUrl,hasApiKey:!!this.apiKey,model:this.model}));const t=this.validateCurrentConfig();t.isValid||console.warn("⚠️ AI 配置问题:",t.issues)}refreshConfig(){console.log("🔄 刷新AI服务配置..."),this.updateConfig()}validateCurrentConfig(){const e=[],t=this.apiUrl.includes("flow.ovo.gs");return!t&&(!this.apiKey||this.apiKey==="")&&e.push("API 密钥未设置"),this.apiUrl||e.push("API 端点未设置"),this.model||e.push("模型名称未设置"),{isValid:e.length===0,issues:e,isWorkerBackend:t}}refreshConfig(){this.updateConfig(),console.log("🔄 AI配置已刷新")}async getModelList(){try{this.updateConfig();let e;this.apiUrl.includes("/chat/completions")?e=this.apiUrl.replace("/chat/completions","/models"):this.apiUrl.includes("/v1/")?e=this.apiUrl.replace(/\/v1\/.*$/,"/v1/models"):e=this.apiUrl.replace(/\/$/,"")+"/models";const t={"Content-Type":"application/json"};this.apiKey&&this.apiKey!==""&&(t.Authorization=`Bearer ${this.apiKey}`);const n=await fetch(e,{method:"GET",headers:t});if(!n.ok)return console.warn("无法获取模型列表，返回空列表"),[];const i=await n.json();return i.data&&Array.isArray(i.data)?i.data.map(o=>({id:o.id,name:o.id,description:o.description||"可用模型"})):[]}catch(e){return console.error("获取模型列表失败:",e),[]}}filterThinkTags(e){if(!e)return"";const t=e.length,n=e.replace(/<think>[\s\S]*?<\/think>/gi,"").trim();return t!==n.length&&console.log("🧠 AI服务源头过滤思考标签:",{原始长度:t,过滤后长度:n.length,过滤掉的内容长度:t-n.length}),n}async*queryAI(e,t={}){try{this.updateConfig(),this.currentRequest&&this.currentRequest.abort();const n=new AbortController;this.currentRequest=n;const i=this.apiUrl.includes("flow.ovo.gs");let o;i?o={prompt:e,model:this.model}:o={model:this.model,messages:[{role:"user",content:e}],max_tokens:t.maxTokens||8192,temperature:t.temperature||.7,stream:!0};const r={"Content-Type":"application/json"};this.apiKey&&this.apiKey!==""&&!this.apiUrl.includes("flow.ovo.gs")&&(r.Authorization=`Bearer ${this.apiKey}`);const l=await fetch(this.apiUrl,{method:"POST",headers:r,body:JSON.stringify(o),signal:n.signal});if(!l.ok){let x="AI服务暂时不可用，请稍后再试";throw l.status===429?x="请求过于频繁，请稍等片刻再试":l.status>=500?x="服务器暂时繁忙，请稍后再试":l.status===401&&(x="API 密钥无效"),new Error(`${x} (状态码: ${l.status})`)}if(!l.body)throw new Error("Response body is null");const h=l.body.getReader(),u=new TextDecoder;let m="",d="";try{for(;;){const{done:x,value:_}=await h.read();if(x){if(m.trim()){const S=this.parseStreamChunk(m);S&&(d+=S,yield S)}break}m+=u.decode(_,{stream:!0});const f=m.split(`
`);m=f.pop()||"";for(const S of f){const p=this.parseStreamChunk(S);p&&(d+=p,yield p)}}}finally{h.releaseLock(),this.currentRequest=null,d.includes("<think>")&&console.log("🧠 AI响应包含思考标签，建议在前端进行完整过滤")}}catch(n){throw this.currentRequest=null,n.name!=="AbortError"&&console.error("AI 请求失败:",n),n}}parseStreamChunk(e){const t=e.trim();if(!t||!t.startsWith("data: "))return null;const n=t.slice(6);if(n==="[DONE]")return null;try{const i=JSON.parse(n);if(i.choices&&i.choices[0]&&i.choices[0].delta&&i.choices[0].delta.content)return i.choices[0].delta.content}catch(i){console.debug("跳过非 JSON 数据:",n,i)}return null}async queryAIComplete(e,t={}){let n="";for await(const i of this.queryAI(e,t))n+=i;return this.filterThinkTags(n)}cancelRequest(){this.currentRequest&&(this.currentRequest.abort(),this.currentRequest=null)}buildBaziPrompt(e,t,n=""){let o=`你是一位学贯古今的命理宗师，既精通《滴天髓》、《三命通会》等八字古籍，也了解现代社会的心理学和职业发展。请基于以下专业的八字干支关系信息，为用户提供一份详尽的分析。

**当前时间:** ${new Date().toLocaleString("zh-CN")}

**专业八字信息:**
${e}

**分析问题:** ${t}

**专业分析指导:**
请重点关注八字中的专业干支关系信息，包括天干五合相冲、地支六合三合相冲相害相刑、整柱关系、五行生克流通等，这些是分析的重要依据。请基于这些专业信息进行深入分析，而不是简单重复这些关系，要解释这些关系对命主的具体影响和意义。`;return n&&(o+=`

**具体分析要求:**
${n}`),o}buildCompatibilityPrompt(e,t,n){return`你是一位精通八字合婚的命理大师，既深谙古典命理理论，又具备现代关系心理学的洞察力。请基于以下两个命盘的专业干支关系数据进行全面深入的合盘分析。

**当前时间:** ${new Date().toLocaleString("zh-CN")}

# 第一人命盘专业信息
${e}

# 第二人命盘专业信息
${t}

**分析问题**: ${n}

---

**专业分析要求**:

1. **干支关系分析**: 重点分析两人八字中的天干五合、相冲关系，地支六合、三合、相冲、相害、相刑关系，以及整柱的天克地冲、伏吟反吟等专业关系。

2. **五行互补分析**: 深入分析两人五行配置的互补性、冲突性，以及五行流通的顺畅程度，判断双方能量场的和谐度。

3. **格局匹配分析**: 分析两人的八字格局、强弱、用神忌神的匹配情况，判断双方命理层面的契合度。

4. **日主关系分析**: 重点分析两人日主的五行生克关系、阴阳配合，以及对双方性格特质和相处模式的影响。

5. **时空因素分析**: 考虑两人的生辰时空信息，分析在不同时期（大运、流年）的关系变化趋势。

**输出要求**:
- 基于专业的干支关系数据进行分析，不要重复已有的关系信息
- 用通俗易懂的语言解释专业的命理概念
- 提供具体的相处建议和关系优化策略
- 给出不同时期的关系发展建议
- 分析要有理有据，避免空泛的结论

请确保分析内容专业深入，指导建议实用可行，最终目的是帮助双方建立更和谐的关系。`}getPromptConfig(){return nt}buildPrompt(e,t,n,i=null){return xn(e,t,n,i)}buildPromptFromConfig(e,t,n){const i=nt.single.find(o=>o.id===t.id);if(i){const o=n?we(n,t):"无法获取命盘数据。",r=new Date().toLocaleString("zh-CN");return t.id==="ai-mingge-zonglun"?i.prompt.replace("[八字信息]",o):`你是一位学贯古今的命理宗师，既精通《滴天髓》、《三命通会》等八字古籍，也了解现代社会的心理学和职业发展。请根据以下信息，为用户提供一份详尽的分析。

**当前时间:** ${r}

**八字信息:**
${o}

**问题:** ${e}

**分析要求:**
${i.prompt}`}return this.buildBaziPrompt(we(n,t),e)}}const fe=new ht;function Sn(){const s=D(""),e=D(!1),t=D("");return{aiResponse:s,isAIThinking:e,aiError:t,askAI:async(o,r="custom",l,h,u=!1)=>{if(!h){t.value="请先进行排盘计算",te("请先进行排盘计算");return}e.value=!0,t.value="",u||(s.value="");try{const m=l(o,r,h);for await(const d of fe.queryAI(m))s.value+=d;e.value=!1}catch(m){console.error("AI分析失败:",m),t.value=m.message||"AI分析失败",te(t.value),e.value=!1}},clearAIResponse:()=>{s.value="",t.value=""}}}const je=rt("ziWei",()=>{const s=Qt({isLunar:!1}),{person1:e,person2:t,enableSecondPerson:n,result1:i,result2:o,isCalculating:r,calculationError:l,canCalculate:h,hasResults:u,resetData:m}=s,d=Sn(),{aiResponse:x,isAIThinking:_,aiError:f,askAI:S,clearAIResponse:p}=d,c=ge(()=>Qe(i.value)),v=ge(()=>Qe(o.value)),P=async()=>{if(!h.value)return te("请填写完整的出生信息"),!1;if(r.value)return!1;r.value=!0,l.value="";const T="ziwei-calculation";try{return ye.showLoading("正在计算紫薇斗数...",T),ye.updateLoadingMessage("正在计算第一人紫薇斗数...",T),i.value=Fe(parseInt(e.value.year),parseInt(e.value.month),parseInt(e.value.day),parseInt(e.value.timeIndex),e.value.gender,e.value.isLunar),n.value?(ye.updateLoadingMessage("正在计算第二人紫薇斗数...",T),o.value=Fe(parseInt(t.value.year),parseInt(t.value.month),parseInt(t.value.day),parseInt(t.value.timeIndex),t.value.gender,t.value.isLunar)):o.value=null,ye.hideLoading(T),Se("紫薇斗数计算完成！"),!0}catch(N){ye.hideLoading(T),console.error("紫薇斗数计算失败:",N);const Z=N.message||"紫薇斗数计算失败，请检查输入信息";return l.value=Z,te(Z),Oe.reportError(N,"紫薇斗数计算"),!1}finally{r.value=!1}},j=async(T,N="custom",Z=!1)=>{const H={person1:c.value,person2:n.value?v.value:null,enableSecondPerson:n.value};await S(T,N,(z,he,ce)=>ce.enableSecondPerson&&ce.person2?Lt(z,ce.person1,ce.person2):Et(he,z,ce.person1),H,Z)},K=()=>{m(),p()},V=()=>{i.value=null,o.value=null,l.value="",x.value="",f.value="",r.value=!1,_.value=!1,Kt(),Ft(),L()},G=()=>n.value&&o.value?et(e.value,t.value):i.value?et(e.value):window.location.origin+window.location.pathname,W=async()=>{try{const T=Wt();if(T)return e.value={...e.value,...T.person1},t.value={...t.value,...T.person2},n.value=!0,await P(),!0;const N=Ht();if(N)return e.value={...e.value,...N},await P(),!0}catch(T){console.error("从URL恢复紫薇斗数数据失败:",T)}return!1},ne=()=>{try{n.value&&h.value?Jt(e.value,t.value):h.value&&Zt(e.value)}catch(T){console.error("保存紫薇斗数数据到URL失败:",T)}},le=(T,N=null)=>{try{let Z="紫薇排盘";N?Z=`${T||"第一人"}与${N||"第二人"}的紫薇合盘分析`:T&&(Z=`${T}的紫薇排盘`),document.title=Z;const H=document.querySelector('meta[property="og:title"]');H&&H.setAttribute("content",Z);const ae=document.querySelector('meta[name="description"]');if(ae&&T){let z="专业的AI紫薇斗数排盘和命理分析工具";N?z=`${T}与${N}的紫薇斗数合盘分析，专业AI命理解读`:z=`${T}的紫薇斗数排盘结果，专业AI命理分析`,ae.setAttribute("content",z)}}catch(Z){console.error("更新页面标题失败:",Z)}},L=()=>{try{document.title="紫薇排盘";const T=document.querySelector('meta[property="og:title"]');T&&T.setAttribute("content","紫薇排盘");const N=document.querySelector('meta[name="description"]');N&&N.setAttribute("content","专业的AI紫薇斗数排盘和命理分析工具")}catch(T){console.error("重置页面标题失败:",T)}};return Ie([e,t,n],()=>{ne()},{deep:!0}),{person1:e,person2:t,enableSecondPerson:n,ziWeiResult1:i,ziWeiResult2:o,isCalculating:r,calculationError:l,aiResponse:x,isAIThinking:_,aiError:f,canCalculate:h,hasResults:u,displayData1:c,displayData2:v,calculateZiWei:P,askAI:j,resetData:K,clearResults:V,clearAIResponse:p,restoreDataFromUrl:W,generateShareUrl:G,updatePageTitle:le,resetPageTitle:L}});const $n={class:"input-card"},In={class:"person-section"},bn={class:"form-group"},_n={class:"custom-date-row"},wn={class:"custom-date-field"},kn={class:"custom-date-field"},An={class:"custom-date-field"},Cn={class:"form-group"},Pn=["value"],Tn={class:"form-group"},En={class:"gender-buttons"},Ln={key:0,class:"error-message"},Un={class:"compatibility-section"},Mn={class:"compatibility-toggle"},jn={key:1,class:"person-section second-person"},Gn={class:"form-group"},Nn={class:"custom-date-row"},Dn={class:"custom-date-field"},Rn={class:"custom-date-field"},Bn={class:"custom-date-field"},On={class:"form-group"},Yn=["value"],Zn={class:"form-group"},Hn={class:"gender-buttons"},Kn=["disabled"],qn={__name:"ZiWeiForm",setup(s){const e=je(),t=[{name:"早子时",range:"00:00-01:00"},{name:"丑时",range:"01:00-03:00"},{name:"寅时",range:"03:00-05:00"},{name:"卯时",range:"05:00-07:00"},{name:"辰时",range:"07:00-09:00"},{name:"巳时",range:"09:00-11:00"},{name:"午时",range:"11:00-13:00"},{name:"未时",range:"13:00-15:00"},{name:"申时",range:"15:00-17:00"},{name:"酉时",range:"17:00-19:00"},{name:"戌时",range:"19:00-21:00"},{name:"亥时",range:"21:00-23:00"},{name:"晚子时",range:"23:00-24:00"}],n=()=>{if(e.enableSecondPerson)if(e.person1.name||e.person2.name){const o=e.person1.name||"第一人",r=e.person2.name||"第二人";e.updatePageTitle(o,r)}else e.resetPageTitle();else e.person1.name?e.updatePageTitle(e.person1.name):e.resetPageTitle()};Ie([()=>e.person1.name,()=>e.person2.name,()=>e.enableSecondPerson],()=>{n()},{immediate:!0});const i=async()=>{await e.calculateZiWei()};return(o,r)=>ee((I(),b("div",$n,[r[29]||(r[29]=a("h1",null,"紫薇斗数排盘",-1)),a("div",In,[a("div",bn,[r[15]||(r[15]=a("label",{for:"name"},"姓名（选填）",-1)),ee(a("input",{id:"name","onUpdate:modelValue":r[0]||(r[0]=l=>C(e).person1.name=l),type:"text",placeholder:"请输入姓名"},null,512),[[de,C(e).person1.name]])]),a("div",_n,[a("div",wn,[r[16]||(r[16]=a("label",{for:"year"},"年",-1)),ee(a("input",{id:"year","onUpdate:modelValue":r[1]||(r[1]=l=>C(e).person1.year=l),type:"number",placeholder:"2000",min:"1900",max:"2100",class:"custom-date-input"},null,512),[[de,C(e).person1.year]])]),a("div",kn,[r[17]||(r[17]=a("label",{for:"month"},"月",-1)),ee(a("input",{id:"month","onUpdate:modelValue":r[2]||(r[2]=l=>C(e).person1.month=l),type:"number",placeholder:"1-12",min:"1",max:"12",class:"custom-date-input"},null,512),[[de,C(e).person1.month]])]),a("div",An,[r[18]||(r[18]=a("label",{for:"day"},"日",-1)),ee(a("input",{id:"day","onUpdate:modelValue":r[3]||(r[3]=l=>C(e).person1.day=l),type:"number",placeholder:"1-31",min:"1",max:"31",class:"custom-date-input"},null,512),[[de,C(e).person1.day]])])]),a("div",Cn,[r[19]||(r[19]=a("label",{for:"hour"},"时辰",-1)),ee(a("select",{id:"hour","onUpdate:modelValue":r[4]||(r[4]=l=>C(e).person1.timeIndex=l)},[(I(),b(q,null,Q(t,(l,h)=>a("option",{key:h,value:h},$(l.name)+" ("+$(l.range)+") ",9,Pn)),64))],512),[[Be,C(e).person1.timeIndex]])]),a("div",Tn,[r[20]||(r[20]=a("label",null,"性别",-1)),a("div",En,[a("button",{type:"button",class:se(["gender-button",{selected:C(e).person1.gender==="male"}]),onClick:r[5]||(r[5]=l=>C(e).person1.gender="male")}," 男 ",2),a("button",{type:"button",class:se(["gender-button",{selected:C(e).person1.gender==="female"}]),onClick:r[6]||(r[6]=l=>C(e).person1.gender="female")}," 女 ",2)])])]),C(e).calculationError?(I(),b("div",Ln,$(C(e).calculationError),1)):U("",!0),a("div",Un,[a("label",Mn,[ee(a("input",{type:"checkbox","onUpdate:modelValue":r[7]||(r[7]=l=>C(e).enableSecondPerson=l)},null,512),[[pt,C(e).enableSecondPerson]]),r[21]||(r[21]=B(" 启用合盘分析 "))])]),C(e).enableSecondPerson?(I(),b("div",jn,[r[28]||(r[28]=a("h3",null,"第二人信息",-1)),a("div",Gn,[r[22]||(r[22]=a("label",{for:"name2"},"姓名（选填）",-1)),ee(a("input",{id:"name2","onUpdate:modelValue":r[8]||(r[8]=l=>C(e).person2.name=l),type:"text",placeholder:"请输入第二人姓名"},null,512),[[de,C(e).person2.name]])]),a("div",Nn,[a("div",Dn,[r[23]||(r[23]=a("label",{for:"year2"},"年",-1)),ee(a("input",{id:"year2","onUpdate:modelValue":r[9]||(r[9]=l=>C(e).person2.year=l),type:"number",placeholder:"2000",min:"1900",max:"2100",class:"custom-date-input"},null,512),[[de,C(e).person2.year]])]),a("div",Rn,[r[24]||(r[24]=a("label",{for:"month2"},"月",-1)),ee(a("input",{id:"month2","onUpdate:modelValue":r[10]||(r[10]=l=>C(e).person2.month=l),type:"number",placeholder:"1-12",min:"1",max:"12",class:"custom-date-input"},null,512),[[de,C(e).person2.month]])]),a("div",Bn,[r[25]||(r[25]=a("label",{for:"day2"},"日",-1)),ee(a("input",{id:"day2","onUpdate:modelValue":r[11]||(r[11]=l=>C(e).person2.day=l),type:"number",placeholder:"1-31",min:"1",max:"31",class:"custom-date-input"},null,512),[[de,C(e).person2.day]])])]),a("div",On,[r[26]||(r[26]=a("label",{for:"hour2"},"时辰",-1)),ee(a("select",{id:"hour2","onUpdate:modelValue":r[12]||(r[12]=l=>C(e).person2.timeIndex=l)},[(I(),b(q,null,Q(t,(l,h)=>a("option",{key:h,value:h},$(l.name)+" ("+$(l.range)+") ",9,Yn)),64))],512),[[Be,C(e).person2.timeIndex]])]),a("div",Zn,[r[27]||(r[27]=a("label",null,"性别",-1)),a("div",Hn,[a("button",{type:"button",class:se(["gender-button",{selected:C(e).person2.gender==="male"}]),onClick:r[13]||(r[13]=l=>C(e).person2.gender="male")}," 男 ",2),a("button",{type:"button",class:se(["gender-button",{selected:C(e).person2.gender==="female"}]),onClick:r[14]||(r[14]=l=>C(e).person2.gender="female")}," 女 ",2)])])])):U("",!0),a("button",{class:"primary-button",disabled:!C(e).canCalculate||C(e).isCalculating,onClick:i},$(C(e).isCalculating?"计算中...":"开始排盘"),9,Kn)],512)),[[mt,!C(e).hasResults]])}},Vn=ke(qn,[["__scopeId","data-v-1b651200"]]);const Jn={class:"api-key-config"},Wn={class:"modal-body"},Fn={class:"form-group"},Qn={class:"form-group"},zn={class:"form-group"},Xn={class:"model-input-group"},es=["value"],ts=["disabled","title"],ns={class:"form-hint"},ss={class:"form-group"},as={key:0,class:"error-details"},rs={class:"error-content"},os={key:0},is={key:1,class:"error-response"},Me="ai_api_config",ls={__name:"ApiKeyConfig",props:{visible:{type:Boolean,default:!1}},emits:["update:visible","config-saved"],setup(s,{expose:e,emit:t}){const n=s,i=t,o=D(n.visible),r=yt({apiUrl:"",apiKey:"",model:"",maxTokens:8192}),l=D([]),h=D(!1),u=D(null);new ht,Ie(()=>n.visible,p=>{o.value=p,p&&(u.value=null,m(),setTimeout(()=>{r.apiUrl&&r.apiKey&&_()},100))});const m=()=>{try{const p=localStorage.getItem(Me);if(p){const c=JSON.parse(p);Object.assign(r,{apiUrl:c.apiUrl||"",apiKey:c.apiKey||"",model:c.model||"",maxTokens:c.maxTokens||8192})}}catch(p){console.error("加载配置失败:",p)}},d=()=>{try{if(!r.apiUrl.trim()){te("请输入 API 地址");return}if(!r.apiKey.trim()){te("请输入 API 密钥");return}if(!r.model.trim()){te("请输入模型名称");return}let p=r.apiUrl.trim();try{new URL(p),p.includes("/v1")||(p=p.replace(/\/$/,"")+"/v1"),p.includes("/chat/completions")||(p=p.replace(/\/$/,"")+"/chat/completions")}catch{te("请输入有效的 API 地址");return}const c={apiUrl:p,apiKey:r.apiKey.trim(),model:r.model.trim(),maxTokens:r.maxTokens};localStorage.setItem(Me,JSON.stringify(c)),Se("配置保存成功"),i("config-saved",c),f()}catch(p){console.error("保存配置失败:",p),te("保存配置失败")}},x=()=>{r.apiUrl="",r.apiKey="",r.model="",r.maxTokens=8192;try{localStorage.removeItem(Me),Se("配置已重置，将使用默认AI服务"),i("config-saved",null),f()}catch(p){console.error("重置配置失败:",p),te("重置配置失败")}},_=async()=>{if(!r.apiUrl.trim()){te("请先填写 API 地址");return}h.value=!0,u.value=null;let p=r.apiUrl.trim();const c=r.apiKey.trim();p.includes("/v1")||(p=p.replace(/\/$/,"")+"/v1");const v=p.replace(/\/$/,"")+"/models";try{console.log("🔍 尝试获取模型列表:",v);const P={"Content-Type":"application/json"};c&&(P.Authorization=`Bearer ${c}`);const j=await fetch(v,{method:"GET",headers:P});if(!j.ok){console.warn("无法获取模型列表，状态码:",j.status);let G=null;try{G=await j.text()}catch{G="无法读取错误响应"}u.value={status:j.status,message:`HTTP ${j.status} ${j.statusText}`,url:v,response:G},l.value=[],te("未获取到可用模型，请检查下方错误详情或手动输入模型名称");return}const K=await j.json();console.log("📋 获取到的模型数据:",K);let V=[];K.data&&Array.isArray(K.data)&&(V=K.data.map(G=>({id:G.id,name:G.id,description:G.description||"可用模型"}))),l.value=V,V.length>0?Se(`成功获取 ${V.length} 个可用模型`):te("未获取到可用模型，请手动输入模型名称（如：gpt-3.5-turbo、gpt-4 等）")}catch(P){console.error("获取模型列表失败:",P),u.value={status:"Network Error",message:P.message||"网络请求失败",url:v,response:P.stack||"无详细信息"},te("获取模型列表失败，请检查下方错误详情"),l.value=[]}finally{h.value=!1}},f=()=>{o.value=!1,i("update:visible",!1)};return e({getCurrentConfig:()=>{try{const p=localStorage.getItem(Me);return p?JSON.parse(p):null}catch{return null}}}),(p,c)=>(I(),b("div",Jn,[o.value?(I(),b("div",{key:0,class:"modal-overlay",onClick:f},[a("div",{class:"modal-content",onClick:c[5]||(c[5]=ot(()=>{},["stop"]))},[a("div",{class:"modal-header"},[c[6]||(c[6]=a("h3",null,"配置 AI API",-1)),a("button",{class:"close-btn",onClick:f},"×")]),a("div",Wn,[a("div",Fn,[c[7]||(c[7]=a("label",{for:"apiUrl"},"API 地址",-1)),ee(a("input",{id:"apiUrl","onUpdate:modelValue":c[0]||(c[0]=v=>r.apiUrl=v),type:"text",placeholder:"https://api.example.com/v1",class:"form-input"},null,512),[[de,r.apiUrl]]),c[8]||(c[8]=a("small",{class:"form-hint"},"API 基础地址，系统会自动添加 /chat/completions",-1))]),a("div",Qn,[c[9]||(c[9]=a("label",{for:"apiKey"},"API 密钥",-1)),ee(a("input",{id:"apiKey","onUpdate:modelValue":c[1]||(c[1]=v=>r.apiKey=v),type:"text",placeholder:"sk-...",class:"form-input"},null,512),[[de,r.apiKey]]),c[10]||(c[10]=a("small",{class:"form-hint"},"您的 API 密钥，将安全保存在本地浏览器",-1))]),a("div",zn,[c[13]||(c[13]=a("label",{for:"model"},"模型名称",-1)),a("div",Xn,[l.value.length>0?ee((I(),b("select",{key:0,id:"model","onUpdate:modelValue":c[2]||(c[2]=v=>r.model=v),class:"form-select"},[c[11]||(c[11]=a("option",{value:""},"请选择模型",-1)),(I(!0),b(q,null,Q(l.value,v=>(I(),b("option",{key:v.id,value:v.id},$(v.name)+" - "+$(v.description),9,es))),128))],512)),[[Be,r.model]]):ee((I(),b("input",{key:1,id:"model","onUpdate:modelValue":c[3]||(c[3]=v=>r.model=v),type:"text",placeholder:"gpt-3.5-turbo",class:"form-input"},null,512)),[[de,r.model]]),a("button",{type:"button",class:"refresh-models-btn",onClick:_,disabled:h.value||!r.apiUrl||!r.apiKey,title:h.value?"正在获取模型列表...":"刷新模型列表"},[(I(),b("svg",{class:se(["refresh-icon",{spinning:h.value}]),viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},c[12]||(c[12]=[a("path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"},null,-1),a("path",{d:"M21 3v5h-5"},null,-1),a("path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"},null,-1),a("path",{d:"M3 21v-5h5"},null,-1)]),2))],8,ts)]),a("small",ns,$(l.value.length>0?"从可用模型中选择，或点击刷新按钮获取最新列表":"使用的模型名称，填写API地址和密钥后可获取可用模型列表"),1)]),a("div",ss,[c[14]||(c[14]=a("label",{for:"maxTokens"},"最大 Token 数",-1)),ee(a("input",{id:"maxTokens","onUpdate:modelValue":c[4]||(c[4]=v=>r.maxTokens=v),type:"number",placeholder:"8192",min:"100",max:"32000",class:"form-input"},null,512),[[de,r.maxTokens,void 0,{number:!0}]]),c[15]||(c[15]=a("small",{class:"form-hint"},"单次请求的最大 Token 数量",-1))])]),u.value?(I(),b("div",as,[c[20]||(c[20]=a("h4",null,"错误详情",-1)),a("div",rs,[a("p",null,[c[16]||(c[16]=a("strong",null,"状态码:",-1)),B(" "+$(u.value.status),1)]),a("p",null,[c[17]||(c[17]=a("strong",null,"错误信息:",-1)),B(" "+$(u.value.message),1)]),u.value.url?(I(),b("p",os,[c[18]||(c[18]=a("strong",null,"请求地址:",-1)),B(" "+$(u.value.url),1)])):U("",!0),u.value.response?(I(),b("div",is,[c[19]||(c[19]=a("strong",null,"服务器响应:",-1)),a("pre",null,$(u.value.response),1)])):U("",!0)])])):U("",!0),a("div",{class:"modal-footer"},[a("button",{class:"btn btn-secondary",onClick:x},"重置"),a("button",{class:"btn btn-primary",onClick:d},"保存配置")])])])):U("",!0)]))}},cs=ke(ls,[["__scopeId","data-v-15f6e6e3"]]);const us={class:"action-buttons"},ds=["disabled"],hs=["disabled"],gs=["disabled"],ms=["onClick","disabled"],ps={key:0,class:"btn-icon",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},ys=["d"],fs={__name:"ActionButtons",props:{showRecalculate:{type:Boolean,default:!0},recalculateText:{type:String,default:"重新排盘"},showApiConfig:{type:Boolean,default:!0},apiConfigText:{type:String,default:"配置 Key"},customButtons:{type:Array,default:()=>[]},loading:{type:Boolean,default:!1},clearResultsMethod:{type:Function,default:null},showCopyChart:{type:Boolean,default:!0},copyChartText:{type:String,default:"复制排盘"},chartData:{type:Object,default:null}},emits:["recalculate","api-config","custom-button","config-saved","copy-chart"],setup(s,{expose:e,emit:t}){const n=s,i=t,o=D(!1),r=()=>{n.clearResultsMethod&&n.clearResultsMethod();const f=new URL(window.location);f.search="",window.history.replaceState({},"",f.toString()),window.scrollTo({top:0,behavior:"smooth"}),Se("已清空结果，请重新输入信息进行排盘"),i("recalculate")},l=()=>{o.value=!0,i("api-config")},h=async()=>{if(!n.chartData){te("没有可复制的排盘数据");return}try{const f=u(n.chartData);await navigator.clipboard.writeText(f),Se("排盘结果已复制到剪贴板，可以发给其他AI询问"),i("copy-chart",n.chartData)}catch(f){console.error("复制失败:",f),te("复制失败，请手动选择文本复制")}},u=f=>{if(!f)return"";let S="";return f.baziResult||f.dayMaster?S=m(f):f.palaces||f.displayData?S=d(f):S="排盘数据格式不支持",S},m=f=>{const S=f.baziResult||f;let p=`=== 八字排盘结果 ===

`;if(S.basicInfo&&(p+=`【基本信息】
`,p+=`性别：${S.basicInfo.gender||"未知"}
`,p+=`出生时间：${S.basicInfo.birthDate?.solar||"未知"}
`,p+=`农历：${S.basicInfo.birthDate?.lunar||"未知"}

`),S.pillars){p+=`【四柱八字】
`;const c=["年柱","月柱","日柱","时柱"];S.pillars.forEach((v,P)=>{p+=`${c[P]}：${v.heavenlyStem}${v.earthlyBranch}
`}),p+=`
`}return S.dayMaster&&(p+=`【日主分析】
`,p+=`日主：${S.dayMaster.gan} (${S.dayMaster.yinYang}${S.dayMaster.element})
`,S.analysis?.dayMasterStrength&&(p+=`强弱：${S.analysis.dayMasterStrength}
`),p+=`
`),S.analysis?.elements&&(p+=`【五行分析】
`,Object.entries(S.analysis.elements).forEach(([c,v])=>{p+=`${c}：${v}个
`}),p+=`
`),S.shensha&&S.shensha.length>0&&(p+=`【神煞】
`,S.shensha.forEach(c=>{p+=`${c.name}：${c.description||"无描述"}
`}),p+=`
`),p},d=f=>{const S=f.displayData||f;let p=`=== 紫薇斗数排盘结果 ===

`;return S.basicInfo&&(p+=`【基本信息】
`,p+=`性别：${S.basicInfo.gender||"未知"}
`,p+=`出生时间：${S.basicInfo.birthDate?.solar||"未知"}
`,p+=`农历：${S.basicInfo.birthDate?.lunar||"未知"}

`),S.palaces&&S.palaces.length>0&&(p+=`【十二宫位】
`,S.palaces.forEach(c=>{if(p+=`${c.name}：${c.heavenlyStem}${c.earthlyBranch}`,c.isBodyPalace&&(p+=" (身宫)"),p+=`
`,c.allStars&&c.allStars.length>0){const v=c.allStars.map(P=>{let j=P.name;return P.mutagen&&(j+=P.mutagen),j}).join("、");p+=`  星耀：${v}
`}p+=`
`})),p},x=(f,S)=>{f.handler&&typeof f.handler=="function"&&f.handler(),i("custom-button",{button:f,index:S})},_=f=>{Se("API 配置已保存"),i("config-saved",f)};return e({openApiConfig:()=>{o.value=!0},closeApiConfig:()=>{o.value=!1}}),(f,S)=>(I(),b(q,null,[a("div",us,[s.showRecalculate?(I(),b("button",{key:0,class:"action-btn btn-secondary",onClick:r,disabled:s.loading},[S[1]||(S[1]=a("svg",{class:"btn-icon",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},[a("path",{d:"M1 4v6h6"}),a("path",{d:"M23 20v-6h-6"}),a("path",{d:"M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"})],-1)),B(" "+$(s.recalculateText),1)],8,ds)):U("",!0),s.showCopyChart&&s.chartData?(I(),b("button",{key:1,class:"action-btn btn-secondary",onClick:h,disabled:s.loading},[S[2]||(S[2]=a("svg",{class:"btn-icon",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},[a("rect",{x:"9",y:"9",width:"13",height:"13",rx:"2",ry:"2"}),a("path",{d:"M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"})],-1)),B(" "+$(s.copyChartText),1)],8,hs)):U("",!0),s.showApiConfig?(I(),b("button",{key:2,class:"action-btn btn-primary",onClick:l,disabled:s.loading},[S[3]||(S[3]=a("svg",{class:"btn-icon",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},[a("path",{d:"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"}),a("path",{d:"M9 12l2 2 4-4"})],-1)),B(" "+$(s.apiConfigText),1)],8,gs)):U("",!0),(I(!0),b(q,null,Q(s.customButtons,(p,c)=>(I(),b("button",{key:c,class:se(["action-btn",p.type||"btn-secondary"]),onClick:v=>x(p,c),disabled:s.loading||p.disabled},[p.icon?(I(),b("svg",ps,[a("path",{d:p.icon},null,8,ys)])):U("",!0),B(" "+$(p.text),1)],10,ms))),128))]),(I(),it(lt,{to:"body"},[ve(cs,{visible:o.value,"onUpdate:visible":S[0]||(S[0]=p=>o.value=p),onConfigSaved:_},null,8,["visible"])]))],64))}},vs=ke(fs,[["__scopeId","data-v-875de694"]]);const xs={class:"ziwei-result-wrapper"},Ss={key:0,class:"loading-container"},$s={key:1,class:"error-container"},Is={key:2,class:"result-card"},bs={class:"basic-info-section"},_s={key:0,class:"compatibility-basic-info"},ws={class:"person-basic-info"},ks={class:"basic-info-text"},As={class:"value"},Cs={class:"value"},Ps={class:"value"},Ts={class:"value"},Es={class:"value"},Ls={class:"value"},Us={class:"value"},Ms={class:"person-basic-info"},js={class:"basic-info-text"},Gs={class:"value"},Ns={class:"value"},Ds={class:"value"},Rs={class:"value"},Bs={class:"value"},Os={class:"value"},Ys={class:"value"},Zs={key:1},Hs={class:"basic-info-text"},Ks={class:"value"},qs={class:"value"},Vs={class:"value"},Js={class:"value"},Ws={class:"value"},Fs={class:"value"},Qs={class:"value"},zs={class:"value"},Xs={class:"mutagen-container"},ea={class:"mutagen-grid"},ta={class:"mutagen-item"},na={class:"mutagen-star"},sa={class:"mutagen-item"},aa={class:"mutagen-star"},ra={class:"mutagen-item"},oa={class:"mutagen-star"},ia={class:"mutagen-item"},la={class:"mutagen-star"},ca={class:"chart-section"},ua={key:0,class:"compatibility-charts"},da={class:"person-chart-container"},ha={class:"astrolabe-grid compact"},ga=["onClick"],ma={class:"palace-header"},pa={class:"palace-name"},ya={key:0,class:"body-palace-mark"},fa={class:"palace-stems"},va={class:"palace-stars"},xa={class:"palace-details compact"},Sa={key:0,class:"changsheng"},$a={key:1,class:"boshi"},Ia={key:0,class:"ages"},ba={class:"person-chart-container"},_a={class:"astrolabe-grid compact"},wa=["onClick"],ka={class:"palace-header"},Aa={class:"palace-name"},Ca={key:0,class:"body-palace-mark"},Pa={class:"palace-stems"},Ta={class:"palace-stars"},Ea={class:"palace-details compact"},La={key:0,class:"changsheng"},Ua={key:1,class:"boshi"},Ma={key:0,class:"ages"},ja={class:"compatibility-analysis"},Ga={class:"compatibility-analysis-content"},Na={key:1,class:"professional-chart-container"},Da={class:"astrolabe-grid"},Ra=["onClick"],Ba={class:"palace-header"},Oa={class:"palace-name"},Ya={key:0,class:"body-palace-mark"},Za={class:"palace-stems"},Ha={class:"palace-stars"},Ka={class:"palace-details"},qa={key:0,class:"changsheng"},Va={key:1,class:"boshi"},Ja={key:2,class:"jiangqian"},Wa={key:0,class:"ages"},Fa={key:1,class:"empty-palace"},Qa={key:0,class:"detailed-analysis-text"},za={class:"analysis-text-section"},Xa={class:"analysis-text-content"},er={class:"analysis-text-section"},tr={class:"analysis-text-content"},nr={class:"analysis-text-section"},sr={class:"analysis-text-content"},ar={class:"analysis-text-section"},rr={class:"analysis-text-content"},or={class:"palace-modal-header"},ir={class:"palace-modal-content"},lr={class:"palace-basic-info"},cr={key:0},ur={key:1},dr={key:2},hr={key:0,class:"palace-stars-detail"},gr={key:0,class:"star-category"},mr={class:"star-list"},pr={class:"star-name"},yr={key:0,class:"star-brightness"},fr={key:1,class:"star-mutagen"},vr={key:1,class:"star-category"},xr={class:"star-list"},Sr={class:"star-name"},$r={key:0,class:"star-brightness"},Ir={key:1,class:"star-mutagen"},br={key:2,class:"star-category"},_r={class:"star-list"},wr={class:"star-name"},kr={key:0,class:"star-brightness"},Ar={key:1,class:"star-mutagen"},Cr={key:1,class:"palace-analysis"},Pr={class:"palace-analysis-content"},Tr={class:"palace-meaning"},Er={class:"palace-star-analysis"},Lr={class:"palace-fortune-analysis"},Ur={class:"palace-advice"},Mr={class:"palace-other-info"},jr={key:0},Gr={key:1},Nr={key:2},Dr={key:3},Rr={key:4},Br={__name:"ZiWeiResult",setup(s){const e=je(),t=ge(()=>e.displayData1),n=D(null),i=k=>{const g=["star-item"];return k.type&&g.push(`star-${k.type}`),k.brightness&&g.push(`brightness-${k.brightness}`),k.mutagen&&g.push(`mutagen-${k.mutagen}`),g.join(" ")},o=k=>({化禄:"lu",化权:"quan",化科:"ke",化忌:"ji"})[k]||"",r=k=>{n.value=k},l=()=>{n.value=null},h=()=>{if(!t.value?.palaces)return"未知";const k=t.value.palaces.find(w=>w.name==="命宫");if(!k)return"未知";const y=(k.allStars||[]).filter(w=>w.type==="major");return y.length===0?"无主星":y.map(w=>w.name).join("、")},u=()=>{if(!t.value?.palaces)return"未知";const k=t.value.palaces.find(w=>w.isBodyPalace);if(!k)return"未知";const y=(k.allStars||[]).filter(w=>w.type==="major");return y.length===0?"无主星":y.map(w=>w.name).join("、")},m=()=>{if(!t.value?.palaces)return"未知";const k=t.value.palaces.find(M=>M.name==="命宫");if(!k)return"未知";const g=k.majorStars||[];if(g.length===0)return"平常格局";const y=g.some(M=>["紫微","天府","太阳","武曲"].includes(M.name)),w=g.some(M=>["庙","旺"].includes(M.brightness));return y&&w?"上等格局":y||w?"中等格局":"平常格局"},d=()=>{if(!t.value?.palaces)return"未知";const k=t.value.palaces.find(w=>w.name==="命宫");if(!k)return"未知";const g=k.majorStars||[];if(g.length===0)return"空宫格局";const y=g.map(w=>w.name);return y.includes("紫微")?"帝王格局":y.includes("天府")?"财库格局":y.includes("太阳")?"光明格局":y.includes("武曲")?"财星格局":y.includes("天同")?"福德格局":y.includes("廉贞")?"权威格局":"一般格局"},x=()=>{if(!t.value?.palaces)return[];const k=[];return["命宫","财帛宫","官禄宫","夫妻宫"].forEach(y=>{const w=t.value.palaces.find(M=>M.name===y);if(w&&w.allStars){const M=w.allStars.filter(F=>F.type==="major");if(M.length>0){const F=M.map(ue=>ue.name);let R=_(y,F);k.push({palace:y,stars:F,description:R})}}}),k},_=(k,g)=>{const w={命宫:{紫微:"具有领导才能，天生贵气，适合管理职位",天机:"聪明机智，善于策划，适合智力工作",太阳:"性格开朗，有正义感，适合公职或教育",武曲:"意志坚强，理财能力佳，适合金融业",天同:"性格温和，人缘好，适合服务业",廉贞:"个性刚强，有魄力，适合执法或军警"},财帛宫:{紫微:"财运亨通，有贵人相助，财源广进",武曲:"理财有道，投资眼光佳，财富稳定增长",天府:"财库丰厚，善于积累，晚年富足",太阴:"财运平稳，适合稳健投资"},官禄宫:{紫微:"事业有成，适合领导职位，官运亨通",武曲:"事业稳定，在金融或技术领域有所成就",天机:"适合策划、咨询类工作，智慧型事业",太阳:"适合公职或教育事业，声名远播"},夫妻宫:{紫微:"配偶条件佳，婚姻美满，夫妻恩爱",天同:"夫妻和睦，感情稳定，家庭幸福",太阴:"配偶温柔体贴，感情深厚",天府:"配偶贤能，家庭富足"}}[k]||{};return g.map(F=>w[F]||`${F}星坐守，影响${k}运势`).join("；")||`${g.join("、")}星坐守${k}，需结合整体命盘分析`},f=()=>{if(!t.value?.mutagens||!t.value?.palaces)return[];const k=[],g=t.value.mutagens;return Object.entries(g).forEach(([y,w])=>{if(w&&w!=="无"){const M=S(w),F=p(y,w,M);k.push({type:y,name:F.name,star:w,palace:M||"未知宫位",description:F.description})}}),k},S=k=>{if(!t.value?.palaces)return null;for(const g of t.value.palaces)if((g.allStars||[]).some(w=>w.name===k))return g.name;return null},p=(k,g,y)=>{const w={lu:"化禄",quan:"化权",ke:"化科",ji:"化忌"},M={lu:`${g}化禄在${y}，主财运亨通，此宫位运势佳，有贵人相助`,quan:`${g}化权在${y}，主权威增强，此宫位有掌控力，适合发挥领导才能`,ke:`${g}化科在${y}，主名声显达，此宫位有贵气，利于学业和声誉`,ji:`${g}化忌在${y}，主阻碍较多，此宫位需谨慎，宜化解不利因素`};return{name:w[k]||k,description:M[k]||`${g}${w[k]}的影响需要具体分析`}},c=()=>{const k=t.value?.horoscope?.currentAge||0,y=Math.floor((k-6)/10),w=["命宫","父母宫","福德宫","田宅宫","官禄宫","奴仆宫","迁移宫","疾厄宫","财帛宫","子女宫","夫妻宫","兄弟宫"],M=y%12;return w[M]||"未知"},v=()=>{const k=new Date().getFullYear(),g=t.value?.basicInfo?.birthDate?.year||k,y=k-g,w=["命宫","兄弟宫","夫妻宫","子女宫","财帛宫","疾厄宫","迁移宫","奴仆宫","官禄宫","田宅宫","福德宫","父母宫"],M=y%12;return w[M]||"未知"},P=()=>{const k=t.value?.horoscope?.currentAge||0;return k<30?"青年时期，宜努力学习，积累经验，为未来打好基础。注意身体健康，培养良好习惯。":k<50?"中年时期，事业发展的关键阶段，宜把握机会，稳健前进。注意家庭和事业的平衡。":"成熟时期，宜发挥经验优势，传承智慧，享受人生。注意身体保养，颐养天年。"},j=k=>{if(!k||k.length===0)return[];const g={紫微:10,天机:10,太阳:10,武曲:10,天同:10,廉贞:10,天府:10,太阴:10,贪狼:10,巨门:10,天相:10,天梁:10,七杀:10,破军:10,左辅:8,右弼:8,文昌:8,文曲:8,天魁:8,天钺:8,禄存:7,天马:7,化禄:9,化权:9,化科:9,化忌:9,火星:6,铃星:6,擎羊:6,陀罗:6,地空:5,地劫:5};return k.map(w=>({...w,priority:g[w.name]||(w.mutagen?9:w.type==="major"?10:3)})).sort((w,M)=>M.priority-w.priority).slice(0,6)},K=()=>{if(!e.enableSecondPerson||!e.displayData2)return{};const k=e.displayData1,g=e.displayData2,y=G(k,g),w=W(k,g),M=ne(k,g),F=le(k,g);return{mingGong:y,wuxing:w,sihua:M,shenGong:F}},V=k=>({mingGong:"命宫关系",wuxing:"五行配合",sihua:"四化互动",shenGong:"身宫关系"})[k]||k,G=(k,g)=>{const y=k.basicInfo?.soulPalace||"未知",w=g.basicInfo?.soulPalace||"未知";if(y==="未知"||w==="未知")return"命宫信息不完整，无法分析";if(y===w)return`双方命宫同在${y}，性格相近，容易理解对方`;{const M=L(y,w);return`命宫分别在${y}和${w}，${M}`}},W=(k,g)=>{const y=k.basicInfo?.fiveElementsClass||"未知",w=g.basicInfo?.fiveElementsClass||"未知";return y==="未知"||w==="未知"?"五行局信息不完整，无法分析":y===w?`双方同为${y}，五行相同，能量共振`:`五行局分别为${y}和${w}，需要互补平衡`},ne=(k,g)=>{const y=k.mutagens||{},w=g.mutagens||{},M=[],F={lu:"化禄",quan:"化权",ke:"化科",ji:"化忌"};return Object.keys(y).forEach(R=>{const ue=y[R],oe=w[R],O=F[R]||R;ue&&oe&&ue===oe&&M.push(`双方${O}星同为${ue}，产生共鸣`)}),M.length===0?"四化星互动平和，无明显冲突":M.join("；")},le=(k,g)=>{const y=k.basicInfo?.bodyPalace||"未知",w=g.basicInfo?.bodyPalace||"未知";if(y==="未知"||w==="未知")return"身宫信息不完整，无法分析";if(y===w)return`双方身宫同在${y}，价值观念相近，容易产生共鸣`;{const M=L(y,w);return`身宫分别在${y}和${w}，${M}`}},L=(k,g)=>{const y={"命宫-财帛":"财运与性格相关","命宫-事业":"事业发展与个性匹配","命宫-夫妻":"感情与性格互补"},w=`${k}-${g}`,M=`${g}-${k}`;return y[w]||y[M]||"宫位关系需要通过具体星耀配置进一步分析"},T=k=>!k||!k.allStars?[]:k.allStars,N=(k,g)=>!k||!k.allStars?[]:k.allStars.filter(y=>y.type===g),Z=k=>({命宫:"代表个人的性格特质、天赋才能、人生格局、基本运势和先天禀赋，是紫薇斗数中最重要的宫位",兄弟宫:"代表兄弟姐妹关系、朋友交往、同事关系、合作伙伴和人际网络的状况",夫妻宫:"代表婚姻感情、配偶关系、恋爱运势、感情模式和异性缘分",子女宫:"代表子女关系、生育能力、教育子女、创造力和部属关系",财帛宫:"代表财运状况、理财能力、赚钱方式、财富积累和金钱观念",疾厄宫:"代表身体健康、疾病倾向、体质强弱、意外灾厄和心理状态",迁移宫:"代表外出运势、变动机会、环境适应、贵人运和远方发展",奴仆宫:"代表部属关系、朋友助力、社交能力、人缘状况和团队合作",官禄宫:"代表事业发展、工作能力、职业方向、社会地位和成就表现",田宅宫:"代表不动产运势、居住环境、家庭状况、祖业传承和生活品质",福德宫:"代表精神享受、兴趣爱好、福分厚薄、心境状态和晚年运势",父母宫:"代表父母关系、长辈缘分、上司关系、学业状况和文书运势"})[k]||"此宫位的具体含义需要结合整体命盘分析",H=k=>{if(!k||!k.allStars)return"此宫位暂无星耀坐守。";const g=k.allStars.filter(R=>R.type==="major"),y=k.allStars.filter(R=>R.type==="minor");k.allStars.filter(R=>R.mutagen);let w=[];if(g.length>0){const R=g.map(ue=>ue.name).join("、");w.push(`${R}主星坐守`),g.forEach(ue=>{const oe=ae(ue.name,k.name);oe&&w.push(oe)})}const M=y.filter(R=>["左辅","右弼","文昌","文曲","天魁","天钺","禄存","天马"].includes(R.name));M.length>0&&w.push(`有${M.map(R=>R.name).join("、")}等吉星相助，增强宫位正面能量`);const F=y.filter(R=>["火星","铃星","擎羊","陀罗","地空","地劫"].includes(R.name));return F.length>0&&w.push(`有${F.map(R=>R.name).join("、")}等煞星同宫，需要化解不利影响`),g.length===0&&w.push("此宫位为空宫，需借对宫星耀来论断，或依靠后天努力来充实"),w.length>0?w.join("，")+"。":"此宫位星耀配置需要结合整体命盘分析。"},ae=(k,g)=>({紫微:{命宫:"具有帝王之相，天生领导才能，性格高贵，适合管理职位",财帛宫:"财运亨通，有贵人相助，财源广进，善于理财",官禄宫:"事业有成，适合领导职位，官运亨通，社会地位高",夫妻宫:"配偶条件佳，婚姻美满，夫妻恩爱，感情稳定"},天机:{命宫:"聪明机智，善于策划，反应敏捷，适合智力工作",财帛宫:"理财有方，投资眼光独到，财运变化较大",官禄宫:"适合策划、咨询类工作，智慧型事业发展佳",兄弟宫:"兄弟朋友聪明，关系变化较多，需要用智慧维系"},太阳:{命宫:"性格开朗，有正义感，光明磊落，适合公职或教育",财帛宫:"财运光明，赚钱光明正大，适合阳光行业",官禄宫:"适合公职或教育事业，声名远播，受人尊敬",父母宫:"与父亲缘分深厚，父亲对自己影响较大"},武曲:{命宫:"意志坚强，个性刚毅，理财能力佳，适合金融业",财帛宫:"理财有道，投资眼光佳，财富稳定增长，善于积累",官禄宫:"事业稳定，在金融或技术领域有所成就",夫妻宫:"配偶性格坚强，夫妻关系需要磨合"},天同:{命宫:"性格温和，人缘好，福分厚，适合服务业",财帛宫:"财运平稳，不愁吃穿，适合稳健投资",夫妻宫:"夫妻和睦，感情稳定，家庭幸福",福德宫:"精神享受丰富，心境平和，晚年福分厚"},廉贞:{命宫:"个性刚强，有魄力，适合执法或军警工作",财帛宫:"财运起伏较大，需要谨慎理财",官禄宫:"适合执法、军警或竞争性行业",疾厄宫:"需要注意心血管疾病，保持情绪稳定"}})[k]?.[g]||null,z=k=>{if(!k||!k.allStars)return"运势平平，需要后天努力。";const g=k.allStars.filter(O=>O.mutagen),y=k.allStars.filter(O=>O.type==="major"),w=k.allStars.filter(O=>O.type==="minor");let M=[];g.length>0&&g.forEach(O=>{switch(O.mutagen){case"禄":M.push(`${O.name}化禄带来财运和贵人运，此宫位运势佳`);break;case"权":M.push(`${O.name}化权增强掌控力，适合发挥主导作用`);break;case"科":M.push(`${O.name}化科带来名声和贵气，利于学业和声誉`);break;case"忌":M.push(`${O.name}化忌带来阻碍，需要谨慎处理，化解不利因素`);break}});const F=y.filter(O=>["庙","旺"].includes(O.brightness)),R=y.filter(O=>["落陷","不得地"].includes(O.brightness));F.length>0&&M.push("主星庙旺，宫位能量强，运势较佳"),R.length>0&&M.push("主星失陷，宫位能量弱，需要后天加强");const ue=w.filter(O=>["左辅","右弼","文昌","文曲","天魁","天钺"].includes(O.name)),oe=w.filter(O=>["火星","铃星","擎羊","陀罗","地空","地劫"].includes(O.name));return ue.length>oe.length?M.push("吉星多于煞星，整体运势向好"):oe.length>ue.length&&M.push("煞星较多，需要谨慎行事，化解不利"),M.length>0?M.join("，")+"。":"运势需要结合大运流年综合判断。"},he=k=>{if(!k)return"建议结合整体命盘制定人生规划。";const g=k.name,y=k.allStars?.filter(R=>R.type==="major")||[],w=k.allStars?.filter(R=>R.mutagen)||[];let M=[];const F={命宫:"注重个人修养和品格培养，发挥天赋才能，建立正确的人生观",兄弟宫:"维护兄弟朋友关系，善于合作，建立良好的人际网络",夫妻宫:"用心经营感情，理解包容，建立和谐的婚姻关系",子女宫:"关爱子女教育，发挥创造力，培养良好的师生或上下级关系",财帛宫:"合理规划财务，稳健投资，培养正确的金钱观念",疾厄宫:"注重身体健康，预防疾病，保持良好的生活习惯",迁移宫:"把握变动机会，适应环境变化，善用贵人助力",奴仆宫:"善待部属朋友，建立互信关系，发挥团队合作精神",官禄宫:"努力工作，提升能力，选择适合的职业发展方向",田宅宫:"合理置业，改善居住环境，维护家庭和睦",福德宫:"培养兴趣爱好，保持心境平和，积累福德",父母宫:"孝敬父母长辈，尊师重道，处理好上下级关系"};return M.push(F[g]||"需要根据具体情况制定相应策略"),w.some(R=>R.mutagen==="忌")&&M.push("此宫位有化忌星，需要特别谨慎，多行善事化解不利"),w.some(R=>R.mutagen==="禄")&&M.push("此宫位有化禄星，可以积极发展，把握机会"),y.length===0&&M.push("空宫需要借对宫星耀，或通过后天努力来充实此宫位"),M.join("；")+"。"},ce=()=>{console.log("紫薇重新排盘")},me=k=>{k===null?console.log("紫薇页面 - API配置已重置，将使用默认AI服务"):console.log("紫薇页面 - 新的API配置:",k);try{fe.refreshConfig(),console.log("✅ AI服务配置已更新")}catch(g){console.error("❌ 刷新AI服务配置失败:",g)}},be=k=>{console.log("紫薇排盘已复制:",k)};return(k,g)=>(I(),b("div",xs,[C(e).isCalculating?(I(),b("div",Ss,g[1]||(g[1]=[a("div",{class:"loading-indicator"},"计算中...",-1)]))):C(e).calculationError?(I(),b("div",$s,[a("p",null,"错误: "+$(C(e).calculationError),1)])):C(e).hasResults?(I(),b("div",Is,[a("div",bs,[C(e).enableSecondPerson&&C(e).displayData2?(I(),b("div",_s,[a("div",ws,[a("h4",null,$(C(e).person1.name||"第一人")+"的基本信息",1),a("div",ks,[a("p",null,[g[2]||(g[2]=a("span",{class:"label"},"性别",-1)),a("span",As,$(C(e).displayData1?.basicInfo?.gender||"未知"),1)]),a("p",null,[g[3]||(g[3]=a("span",{class:"label"},"阳历",-1)),a("span",Cs,$(C(e).displayData1?.basicInfo?.birthDate?.solar||"未知"),1)]),a("p",null,[g[4]||(g[4]=a("span",{class:"label"},"农历",-1)),a("span",Ps,$(C(e).displayData1?.basicInfo?.birthDate?.lunar||"未知"),1)]),a("p",null,[g[5]||(g[5]=a("span",{class:"label"},"时辰",-1)),a("span",Ts,$(C(e).displayData1?.basicInfo?.time||"未知")+" "+$(C(e).displayData1?.basicInfo?.timeRange||""),1)]),a("p",null,[g[6]||(g[6]=a("span",{class:"label"},"五行局",-1)),a("span",Es,$(C(e).displayData1?.basicInfo?.fiveElementsClass||"未知"),1)]),a("p",null,[g[7]||(g[7]=a("span",{class:"label"},"命宫",-1)),a("span",Ls,$(C(e).displayData1?.basicInfo?.soulPalace||"未知"),1)]),a("p",null,[g[8]||(g[8]=a("span",{class:"label"},"身宫",-1)),a("span",Us,$(C(e).displayData1?.basicInfo?.bodyPalace||"未知"),1)])])]),a("div",Ms,[a("h4",null,$(C(e).person2.name||"第二人")+"的基本信息",1),a("div",js,[a("p",null,[g[9]||(g[9]=a("span",{class:"label"},"性别",-1)),a("span",Gs,$(C(e).displayData2?.basicInfo?.gender||"未知"),1)]),a("p",null,[g[10]||(g[10]=a("span",{class:"label"},"阳历",-1)),a("span",Ns,$(C(e).displayData2?.basicInfo?.birthDate?.solar||"未知"),1)]),a("p",null,[g[11]||(g[11]=a("span",{class:"label"},"农历",-1)),a("span",Ds,$(C(e).displayData2?.basicInfo?.birthDate?.lunar||"未知"),1)]),a("p",null,[g[12]||(g[12]=a("span",{class:"label"},"时辰",-1)),a("span",Rs,$(C(e).displayData2?.basicInfo?.time||"未知")+" "+$(C(e).displayData2?.basicInfo?.timeRange||""),1)]),a("p",null,[g[13]||(g[13]=a("span",{class:"label"},"五行局",-1)),a("span",Bs,$(C(e).displayData2?.basicInfo?.fiveElementsClass||"未知"),1)]),a("p",null,[g[14]||(g[14]=a("span",{class:"label"},"命宫",-1)),a("span",Os,$(C(e).displayData2?.basicInfo?.soulPalace||"未知"),1)]),a("p",null,[g[15]||(g[15]=a("span",{class:"label"},"身宫",-1)),a("span",Ys,$(C(e).displayData2?.basicInfo?.bodyPalace||"未知"),1)])])])])):(I(),b("div",Zs,[a("div",Hs,[a("p",null,[g[16]||(g[16]=a("span",{class:"label"},"姓名",-1)),a("span",Ks,$(t.value?.basicInfo?.name||"未填写"),1)]),a("p",null,[g[17]||(g[17]=a("span",{class:"label"},"性别",-1)),a("span",qs,$(t.value?.basicInfo?.gender||"未知"),1)]),a("p",null,[g[18]||(g[18]=a("span",{class:"label"},"阳历",-1)),a("span",Vs,$(t.value?.basicInfo?.birthDate?.solar||"未知"),1)]),a("p",null,[g[19]||(g[19]=a("span",{class:"label"},"农历",-1)),a("span",Js,$(t.value?.basicInfo?.birthDate?.lunar||"未知"),1)]),a("p",null,[g[20]||(g[20]=a("span",{class:"label"},"时辰",-1)),a("span",Ws,$(t.value?.basicInfo?.time||"未知")+" "+$(t.value?.basicInfo?.timeRange||""),1)]),a("p",null,[g[21]||(g[21]=a("span",{class:"label"},"五行局",-1)),a("span",Fs,$(t.value?.basicInfo?.fiveElementsClass||"未知"),1)]),a("p",null,[g[22]||(g[22]=a("span",{class:"label"},"命宫",-1)),a("span",Qs,$(t.value?.basicInfo?.soulPalace||"未知"),1)]),a("p",null,[g[23]||(g[23]=a("span",{class:"label"},"身宫",-1)),a("span",zs,$(t.value?.basicInfo?.bodyPalace||"未知"),1)])]),a("div",Xs,[g[28]||(g[28]=a("h4",null,"四化信息",-1)),a("div",ea,[a("div",ta,[g[24]||(g[24]=a("span",{class:"mutagen-type lu"},"化禄",-1)),a("span",na,$(t.value?.mutagens?.lu||"无"),1)]),a("div",sa,[g[25]||(g[25]=a("span",{class:"mutagen-type quan"},"化权",-1)),a("span",aa,$(t.value?.mutagens?.quan||"无"),1)]),a("div",ra,[g[26]||(g[26]=a("span",{class:"mutagen-type ke"},"化科",-1)),a("span",oa,$(t.value?.mutagens?.ke||"无"),1)]),a("div",ia,[g[27]||(g[27]=a("span",{class:"mutagen-type ji"},"化忌",-1)),a("span",la,$(t.value?.mutagens?.ji||"无"),1)])])])]))]),a("div",ca,[g[30]||(g[30]=a("h3",{class:"chart-title"},"星盘信息",-1)),C(e).enableSecondPerson&&C(e).displayData2?(I(),b("div",ua,[a("div",da,[a("h3",null,$(C(e).person1.name||"第一人")+"的紫薇星盘",1),a("div",ha,[(I(!0),b(q,null,Q(C(e).displayData1.palaces,y=>(I(),b("div",{key:y.name,class:se(["palace-cell",{"body-palace":y.isBodyPalace}]),onClick:w=>r(y)},[a("div",ma,[a("span",pa,$(y.name),1),y.isBodyPalace?(I(),b("span",ya,"身")):U("",!0)]),a("div",fa,$(y.heavenlyStem)+$(y.earthlyBranch),1),a("div",va,[(I(!0),b(q,null,Q(j(y.allStars||[]),w=>(I(),b("div",{key:w.name,class:se(i(w))},[B($(w.name)+" ",1),w.mutagen?(I(),b("span",{key:0,class:se(["mutagen",o(w.mutagen)])},$(w.mutagen),3)):U("",!0)],2))),128))]),a("div",xa,[y.changsheng12?(I(),b("div",Sa,$(y.changsheng12),1)):U("",!0),y.boshi12?(I(),b("div",$a,$(y.boshi12),1)):U("",!0)]),y.ages&&y.ages.length>0?(I(),b("div",Ia,$(y.ages.join("-"))+"岁 ",1)):U("",!0)],10,ga))),128))])]),a("div",ba,[a("h3",null,$(C(e).person2.name||"第二人")+"的紫薇星盘",1),a("div",_a,[(I(!0),b(q,null,Q(C(e).displayData2.palaces,y=>(I(),b("div",{key:y.name,class:se(["palace-cell",{"body-palace":y.isBodyPalace}]),onClick:w=>r(y)},[a("div",ka,[a("span",Aa,$(y.name),1),y.isBodyPalace?(I(),b("span",Ca,"身")):U("",!0)]),a("div",Pa,$(y.heavenlyStem)+$(y.earthlyBranch),1),a("div",Ta,[(I(!0),b(q,null,Q(j(y.allStars||[]),w=>(I(),b("div",{key:w.name,class:se(i(w))},[B($(w.name)+" ",1),w.mutagen?(I(),b("span",{key:0,class:se(["mutagen",o(w.mutagen)])},$(w.mutagen),3)):U("",!0)],2))),128))]),a("div",Ea,[y.changsheng12?(I(),b("div",La,$(y.changsheng12),1)):U("",!0),y.boshi12?(I(),b("div",Ua,$(y.boshi12),1)):U("",!0)]),y.ages&&y.ages.length>0?(I(),b("div",Ma,$(y.ages.join("-"))+"岁 ",1)):U("",!0)],10,wa))),128))])]),a("div",ja,[g[29]||(g[29]=a("h4",null,"合盘分析",-1)),a("div",Ga,[(I(!0),b(q,null,Q(K(),(y,w)=>(I(),b("div",{key:w,class:"compatibility-analysis-item"},[a("p",null,[a("strong",null,$(V(w))+"：",1),B($(y),1)])]))),128))])])])):(I(),b("div",Na,[a("div",Da,[(I(!0),b(q,null,Q(t.value?.palaces||[],y=>(I(),b("div",{key:y.name,class:se(["palace-cell",{"body-palace":y.isBodyPalace}]),onClick:w=>r(y)},[a("div",Ba,[a("span",Oa,$(y.name),1),y.isBodyPalace?(I(),b("span",Ya,"身")):U("",!0)]),a("div",Za,$(y.heavenlyStem)+$(y.earthlyBranch),1),a("div",Ha,[(I(!0),b(q,null,Q(y.allStars||[],w=>(I(),b("div",{key:w.name,class:se(i(w))},[B($(w.name)+" ",1),w.mutagen?(I(),b("span",{key:0,class:se(["mutagen",o(w.mutagen)])},$(w.mutagen),3)):U("",!0)],2))),128))]),a("div",Ka,[y.changsheng12?(I(),b("div",qa,$(y.changsheng12),1)):U("",!0),y.boshi12?(I(),b("div",Va,$(y.boshi12),1)):U("",!0),y.jiangqian12?(I(),b("div",Ja,$(y.jiangqian12),1)):U("",!0)]),y.ages&&y.ages.length>0?(I(),b("div",Wa,$(y.ages.join("-"))+"岁 ",1)):U("",!0),y.isEmpty?(I(),b("div",Fa," 空宫 ")):U("",!0)],10,Ra))),128))])]))]),C(e).enableSecondPerson?U("",!0):(I(),b("div",Qa,[a("div",za,[g[35]||(g[35]=a("h4",null,"命盘概述",-1)),a("div",Xa,[a("p",null,[g[31]||(g[31]=a("strong",null,"命主星：",-1)),B($(h()),1)]),a("p",null,[g[32]||(g[32]=a("strong",null,"身主星：",-1)),B($(u()),1)]),a("p",null,[g[33]||(g[33]=a("strong",null,"命格层次：",-1)),B($(m()),1)]),a("p",null,[g[34]||(g[34]=a("strong",null,"格局特征：",-1)),B($(d()),1)])])]),a("div",er,[g[36]||(g[36]=a("h4",null,"主要星耀分析",-1)),a("div",tr,[(I(!0),b(q,null,Q(x(),y=>(I(),b("div",{key:y.palace,class:"star-analysis-text"},[a("p",null,[a("strong",null,$(y.palace)+"：",1),B($(y.stars.join("、"))+"星坐守。"+$(y.description),1)])]))),128))])]),a("div",nr,[g[37]||(g[37]=a("h4",null,"四化详解",-1)),a("div",sr,[(I(!0),b(q,null,Q(f(),y=>(I(),b("div",{key:y.type,class:"mutagen-analysis-text"},[a("p",null,[a("strong",null,$(y.name)+"：",1),B($(y.star)+"星在"+$(y.palace)+"。"+$(y.description),1)])]))),128))])]),a("div",ar,[g[42]||(g[42]=a("h4",null,"运势概况",-1)),a("div",rr,[a("p",null,[g[38]||(g[38]=a("strong",null,"当前年龄：",-1)),B($(t.value?.horoscope?.currentAge||0)+"岁",1)]),a("p",null,[g[39]||(g[39]=a("strong",null,"大运宫位：",-1)),B($(c()),1)]),a("p",null,[g[40]||(g[40]=a("strong",null,"流年宫位：",-1)),B($(v()),1)]),a("p",null,[g[41]||(g[41]=a("strong",null,"运势建议：",-1)),B($(P()),1)])])])])),ve(vs,{"clear-results-method":C(e).clearResults,"chart-data":t.value,onRecalculate:ce,onConfigSaved:me,onCopyChart:be},null,8,["clear-results-method","chart-data"]),(I(),it(lt,{to:"body"},[n.value?(I(),b("div",{key:0,class:"palace-modal-overlay",onClick:l},[a("div",{class:"palace-modal",onClick:g[0]||(g[0]=ot(()=>{},["stop"]))},[a("div",or,[a("h3",null,$(n.value.name)+"详情",1),a("button",{class:"close-button",onClick:l},"×")]),a("div",ir,[a("div",lr,[a("p",null,[g[43]||(g[43]=a("strong",null,"宫位：",-1)),B($(n.value.name),1)]),a("p",null,[g[44]||(g[44]=a("strong",null,"干支：",-1)),B($(n.value.heavenlyStem)+$(n.value.earthlyBranch),1)]),n.value.isBodyPalace?(I(),b("p",cr,g[45]||(g[45]=[a("strong",null,"身宫",-1)]))):U("",!0),n.value.isEmpty?(I(),b("p",ur,g[46]||(g[46]=[a("strong",null,"空宫",-1)]))):U("",!0),n.value.ages&&n.value.ages.length>0?(I(),b("p",dr,[g[47]||(g[47]=a("strong",null,"年龄：",-1)),B($(n.value.ages.join("-"))+"岁 ",1)])):U("",!0)]),T(n.value).length>0?(I(),b("div",hr,[g[48]||(g[48]=a("h4",null,"星耀详情",-1)),N(n.value,"major").length>0?(I(),b("div",gr,[a("h5",null,"主星 ("+$(N(n.value,"major").length)+"颗)",1),a("div",mr,[(I(!0),b(q,null,Q(N(n.value,"major"),y=>(I(),b("div",{key:y.name,class:"star-detail"},[a("span",pr,$(y.name),1),y.brightness?(I(),b("span",yr,$(y.brightness),1)):U("",!0),y.mutagen?(I(),b("span",fr,$(y.mutagen),1)):U("",!0)]))),128))])])):U("",!0),N(n.value,"minor").length>0?(I(),b("div",vr,[a("h5",null,"辅星 ("+$(N(n.value,"minor").length)+"颗)",1),a("div",xr,[(I(!0),b(q,null,Q(N(n.value,"minor"),y=>(I(),b("div",{key:y.name,class:"star-detail"},[a("span",Sr,$(y.name),1),y.brightness?(I(),b("span",$r,$(y.brightness),1)):U("",!0),y.mutagen?(I(),b("span",Ir,$(y.mutagen),1)):U("",!0)]))),128))])])):U("",!0),N(n.value,"adjective").length>0?(I(),b("div",br,[a("h5",null,"杂耀 ("+$(N(n.value,"adjective").length)+"颗)",1),a("div",_r,[(I(!0),b(q,null,Q(N(n.value,"adjective"),y=>(I(),b("div",{key:y.name,class:"star-detail"},[a("span",wr,$(y.name),1),y.brightness?(I(),b("span",kr,$(y.brightness),1)):U("",!0),y.mutagen?(I(),b("span",Ar,$(y.mutagen),1)):U("",!0)]))),128))])])):U("",!0)])):U("",!0),n.value?(I(),b("div",Cr,[g[52]||(g[52]=a("h4",null,"宫位分析",-1)),a("div",Pr,[a("div",Tr,[a("p",null,[a("strong",null,$(n.value.name)+"含义：",1),B($(Z(n.value.name)),1)])]),a("div",Er,[a("p",null,[g[49]||(g[49]=a("strong",null,"星耀影响：",-1)),B($(H(n.value)),1)])]),a("div",Lr,[a("p",null,[g[50]||(g[50]=a("strong",null,"运势分析：",-1)),B($(z(n.value)),1)])]),a("div",Ur,[a("p",null,[g[51]||(g[51]=a("strong",null,"建议指导：",-1)),B($(he(n.value)),1)])])])])):U("",!0),a("div",Mr,[g[58]||(g[58]=a("h4",null,"其他信息",-1)),n.value.changsheng12?(I(),b("p",jr,[g[53]||(g[53]=a("strong",null,"长生十二神：",-1)),B($(n.value.changsheng12),1)])):U("",!0),n.value.boshi12?(I(),b("p",Gr,[g[54]||(g[54]=a("strong",null,"博士十二神：",-1)),B($(n.value.boshi12),1)])):U("",!0),n.value.jiangqian12?(I(),b("p",Nr,[g[55]||(g[55]=a("strong",null,"将前十二神：",-1)),B($(n.value.jiangqian12),1)])):U("",!0),n.value.suiqian12?(I(),b("p",Dr,[g[56]||(g[56]=a("strong",null,"岁前十二神：",-1)),B($(n.value.suiqian12),1)])):U("",!0),n.value.decadal?(I(),b("p",Rr,[g[57]||(g[57]=a("strong",null,"大运：",-1)),B($(n.value.decadal),1)])):U("",!0)])])])])):U("",!0)]))])):U("",!0)]))}},st=ke(Br,[["__scopeId","data-v-60a7033a"]]);class Or{constructor(){this.cache=new Map,this.inspirationCache=new Map,this.maxCacheSize=100,this.cacheVersion="1.0",this.init()}init(){try{const e=localStorage.getItem("ai_analysis_cache"),t=localStorage.getItem("ai_cache_version");if(e&&t===this.cacheVersion){const i=JSON.parse(e);this.cache=new Map(i)}else this.clearCache();const n=localStorage.getItem("ai_inspiration_cache");if(n&&t===this.cacheVersion){const i=JSON.parse(n);this.inspirationCache=new Map(i)}}catch(e){console.warn("加载AI缓存失败:",e),this.clearCache()}}generateCacheKey(e,t,n){const i={year:e.year,month:e.month,day:e.day,timeIndex:e.timeIndex,gender:e.gender,questionType:t,question:n.trim()},o=JSON.stringify(i);let r=0;for(let l=0;l<o.length;l++){const h=o.charCodeAt(l);r=(r<<5)-r+h,r=r&r}return Math.abs(r).toString(36)}shouldCache(e){return e!=="custom"}getCache(e,t,n){if(!this.shouldCache(t))return null;try{const i=this.generateCacheKey(e,t,n),o=this.cache.get(i);return o?(o.lastAccessed=Date.now(),this.cache.set(i,o),console.log("AI缓存命中:",t,n),o.response):null}catch(i){return console.warn("获取AI缓存失败:",i),null}}setCache(e,t,n,i){if(!(!this.shouldCache(t)||!i||!i.trim()))try{const o=this.generateCacheKey(e,t,n),r={response:i.trim(),createdAt:Date.now(),lastAccessed:Date.now(),questionType:t,question:n};this.cache.size>=this.maxCacheSize&&this.cleanupOldEntries(),this.cache.set(o,r),this.saveToStorage(),console.log("AI缓存已保存:",t,n)}catch(o){console.warn("保存AI缓存失败:",o)}}cleanupOldEntries(){try{const e=Array.from(this.cache.entries());e.sort((i,o)=>i[1].lastAccessed-o[1].lastAccessed);const t=Math.floor(this.maxCacheSize*.8),n=e.slice(0,e.length-t);n.forEach(([i])=>{this.cache.delete(i)}),console.log(`清理了 ${n.length} 个旧的AI缓存条目`)}catch(e){console.warn("清理AI缓存失败:",e)}}clearBaziCache(e){try{const t=JSON.stringify({year:e.year,month:e.month,day:e.day,timeIndex:e.timeIndex,gender:e.gender}),n=[];for(const[r,l]of this.cache.entries())try{const h=JSON.parse(atob(r));JSON.stringify({year:h.year,month:h.month,day:h.day,timeIndex:h.timeIndex,gender:h.gender})===t&&n.push(r)}catch{}n.forEach(r=>{this.cache.delete(r)});const i=this.generateBaziKey(e),o=this.inspirationCache.has(i);o&&this.inspirationCache.delete(i),(n.length>0||o)&&(this.saveToStorage(),console.log(`清理了 ${n.length} 个分析缓存条目和 ${o?1:0} 个问题灵感缓存`))}catch(t){console.warn("清理八字缓存失败:",t)}}getInspirationCache(e){try{const t=this.generateBaziKey(e),n=this.inspirationCache.get(t);return n?(n.lastAccessed=Date.now(),this.inspirationCache.set(t,n),console.log("问题灵感缓存命中"),n.suggestions):null}catch(t){return console.warn("获取问题灵感缓存失败:",t),null}}setInspirationCache(e,t){if(!(!t||!Array.isArray(t)||t.length===0))try{const n=this.generateBaziKey(e),i={suggestions:[...t],createdAt:Date.now(),lastAccessed:Date.now()};this.inspirationCache.set(n,i),this.saveToStorage(),console.log("问题灵感缓存已保存")}catch(n){console.warn("保存问题灵感缓存失败:",n)}}generateBaziKey(e){const t={year:e.year,month:e.month,day:e.day,timeIndex:e.timeIndex,gender:e.gender},n=JSON.stringify(t);let i=0;for(let o=0;o<n.length;o++){const r=n.charCodeAt(o);i=(i<<5)-i+r,i=i&i}return Math.abs(i).toString(36)}clearCache(){this.cache.clear(),this.inspirationCache.clear(),localStorage.removeItem("ai_analysis_cache"),localStorage.removeItem("ai_inspiration_cache"),localStorage.removeItem("ai_cache_version"),console.log("AI缓存已清空")}saveToStorage(){try{const e=Array.from(this.cache.entries()),t=Array.from(this.inspirationCache.entries());localStorage.setItem("ai_analysis_cache",JSON.stringify(e)),localStorage.setItem("ai_inspiration_cache",JSON.stringify(t)),localStorage.setItem("ai_cache_version",this.cacheVersion)}catch(e){if(console.warn("保存AI缓存到本地存储失败:",e),e.name==="QuotaExceededError"){this.cleanupOldEntries();try{const t=Array.from(this.cache.entries()),n=Array.from(this.inspirationCache.entries());localStorage.setItem("ai_analysis_cache",JSON.stringify(t)),localStorage.setItem("ai_inspiration_cache",JSON.stringify(n)),localStorage.setItem("ai_cache_version",this.cacheVersion)}catch(t){console.warn("重试保存AI缓存失败:",t)}}}}getStats(){return{size:this.cache.size,maxSize:this.maxCacheSize,version:this.cacheVersion}}}const $e=new Or,Yr=rt("bazi",()=>{const s=D({name:"",year:"",month:"",day:"",timeIndex:0,gender:""}),e=D({name:"",year:"",month:"",day:"",timeIndex:0,gender:""}),t=D(!1),n=D(null),i=D(null),o=D(!1),r=D(""),l=D(""),h=D(!1),u=D(""),m=new Map,d=ge(()=>{const L=s.value.year&&s.value.month&&s.value.day&&s.value.gender;if(!t.value)return L;const T=e.value.year&&e.value.month&&e.value.day&&e.value.gender;return L&&T}),x=ge(()=>n.value!==null),_=async()=>{if(!d.value)return r.value="请填写完整的出生信息",!1;const L=`bazi_${s.value.year}_${s.value.month}_${s.value.day}_${s.value.timeIndex}_${s.value.gender}`,T=m.get(L);if(T)return n.value=T,Ne(s.value),!0;const N="calculate-bazi";o.value=!0,r.value="";try{if(ye.showLoading("正在计算八字...",N),n.value){const Z={year:n.value.year,month:n.value.month,day:n.value.day,timeIndex:n.value.timeIndex,gender:n.value.gender},H={year:s.value.year,month:s.value.month,day:s.value.day,timeIndex:s.value.timeIndex,gender:s.value.gender};JSON.stringify(Z)!==JSON.stringify(H)&&$e.clearBaziCache(Z)}return ye.updateLoadingMessage("正在计算第一人八字...",N),n.value={...pe.calculateBazi(parseInt(s.value.year),parseInt(s.value.month),parseInt(s.value.day),s.value.timeIndex,s.value.gender)},t.value?(ye.updateLoadingMessage("正在计算第二人八字...",N),i.value={...pe.calculateBazi(parseInt(e.value.year),parseInt(e.value.month),parseInt(e.value.day),e.value.timeIndex,e.value.gender)}):i.value=null,m.set(L,n.value),Ne(s.value),ye.hideLoading(N),Se("八字计算完成！"),!0}catch(Z){ye.hideLoading(N),console.error("八字计算失败:",Z);const H=Z.message||"八字计算失败，请检查输入信息";return r.value=H,te(H),Oe.reportError(Z,"八字计算"),!1}finally{o.value=!1}},f=async(L,T="custom",N=!1,Z=!1)=>{if(!n.value){u.value="请先进行八字排盘",te("请先进行八字排盘");return}h.value=!0,u.value="",N||(l.value="");let H=null,ae=null;try{if(t.value&&i.value){const z=we(n.value),he=we(i.value),ce=fe.buildCompatibilityPrompt(z,he,L);N&&(l.value+=`

---

## 追问：${L}

`);for await(const me of fe.queryAI(ce))l.value+=me}else if(ae={year:s.value.year,month:s.value.month,day:s.value.day,timeIndex:s.value.timeIndex,gender:s.value.gender},Z||(H=$e.getCache(ae,T,L),console.log("缓存检查:",{questionType:T,question:L.substring(0,50)+"...",hasCachedResponse:!!H,shouldCache:$e.shouldCache(T),cacheKey:$e.generateCacheKey(ae,T,L).substring(0,20)+"..."})),H&&!Z)N?l.value+=`

---

## 追问：${L}

${H}`:l.value=H,console.log("使用AI缓存结果");else{const z={id:P(T,L),dataset:{prompt:""}},he=we(n.value,z),ce=fe.buildPromptFromConfig(L,z,n.value);N&&(l.value+=`

---

## 追问：${L}

`);let me="";for await(const be of fe.queryAI(ce))l.value+=be,me+=be;me&&me.trim()&&(console.log("准备保存缓存:",{questionType:T,question:L.substring(0,50)+"...",shouldCache:$e.shouldCache(T),contentLength:me.trim().length}),$e.setCache(ae,T,L,me.trim()),Z&&console.log("强制重新生成，已更新缓存"))}}catch(z){console.error("AI 分析失败:",z);const he=z.message||"AI 分析失败，请稍后重试";u.value=he,te(he),Oe.reportError(z,"AI分析")}finally{H&&!Z?setTimeout(()=>{h.value=!1},100):h.value=!1}},S=()=>{fe.cancelRequest(),h.value=!1},p=()=>{if(n.value){const L={year:n.value.year,month:n.value.month,day:n.value.day,timeIndex:n.value.timeIndex,gender:n.value.gender};$e.clearBaziCache(L)}s.value={name:"",year:"",month:"",day:"",timeIndex:0,gender:""},e.value={name:"",year:"",month:"",day:"",timeIndex:0,gender:""},t.value=!1,n.value=null,i.value=null,l.value="",r.value="",u.value="",le(),V()},c=()=>{l.value="",u.value=""},v=()=>{n.value=null,i.value=null,r.value="",l.value="",u.value="",o.value=!1,h.value=!1,V(),le()},P=(L,T)=>{const N={mingge:"ai-mingge-zonglun","current-luck":"ai-current-luck",year:"ai-this-year","monthly-fortune":"ai-monthly-fortune","next-three-years":"ai-next-three-years","lifetime-fortune":"ai-lifetime-fortune",career:"ai-career",marriage:"ai-marriage",health:"ai-health",custom:"custom"};return T&&T.includes("选定日期")?"ask-ai-with-date":N[L]||"custom"},j=()=>{try{const L=Dt();if(L)return s.value={...s.value,...L.person1},e.value={...e.value,...L.person2},t.value=!0,ne(L.person1.name,L.person2.name),!0;const T=Mt();return T?(s.value={...s.value,...T},ne(T.name),!0):!1}catch(L){return console.error("从URL加载数据失败:",L),!1}},K=()=>{try{t.value&&d.value&&e.value.year?(Nt(s.value,e.value),ne(s.value.name,e.value.name)):d.value&&(Ne(s.value),ne(s.value.name))}catch(L){console.error("保存数据到URL失败:",L)}},V=()=>{try{jt(),Rt()}catch(L){console.error("清除URL数据失败:",L)}},G=()=>{try{return t.value&&e.value.year?Xe(s.value,e.value):Xe(s.value)}catch(L){return console.error("生成分享链接失败:",L),window.location.href}},W=()=>Bt(),ne=(L,T=null)=>{try{let N="八字排盘";T?N=`${L||"第一人"}与${T||"第二人"}的八字合盘分析`:L&&(N=`${L}的八字排盘`),document.title=N;const Z=document.querySelector('meta[property="og:title"]');Z&&Z.setAttribute("content",N);const H=document.querySelector('meta[name="description"]');if(H&&L){let ae="专业的AI八字排盘和命理分析工具";T?ae=`${L}与${T}的八字合盘分析，专业AI命理解读`:ae=`${L}的八字排盘结果，专业AI命理分析`,H.setAttribute("content",ae)}}catch(N){console.error("更新页面标题失败:",N)}},le=()=>{try{document.title="八字排盘";const L=document.querySelector('meta[property="og:title"]');L&&L.setAttribute("content","八字排盘");const T=document.querySelector('meta[name="description"]');T&&T.setAttribute("content","专业的AI八字排盘和命理分析工具")}catch(L){console.error("重置页面标题失败:",L)}};return{person1:s,person2:e,enableSecondPerson:t,baziResult1:n,baziResult2:i,isCalculating:o,calculationError:r,aiResponse:l,isAIThinking:h,aiError:u,canCalculate:d,hasResults:x,calculateBazi:_,askAI:f,cancelAI:S,resetForm:p,resetAI:c,clearResults:v,loadFromUrl:j,saveToUrl:K,clearUrl:V,getShareUrl:G,hasUrlData:W,updatePageTitle:ne,resetPageTitle:le}});const Zr={key:0,class:"ai-chat-container"},Hr={class:"question-options"},Kr={class:"question-buttons-container"},qr={class:"question-buttons"},Vr=["onClick"],Jr={key:0,class:"custom-question"},Wr={key:1,class:"error-message"},Fr=["disabled"],Qr={class:"inspiration-container"},zr={class:"inspiration-tab-navigation"},Xr=["onClick"],eo={class:"inspiration-tab-content"},to={key:0,class:"inspiration-tab-pane"},no={class:"questions-grid"},so=["onClick"],ao=["innerHTML"],ro={key:0,class:"thinking-indicator"},oo={key:1,class:"continue-explore"},io={key:0,class:"user-question-context"},lo={class:"user-question"},co={class:"explore-section"},uo={key:0,class:"suggested-questions"},ho=["onClick"],go=["disabled"],mo={key:0,class:"suggestion-updating"},po={key:1,class:"suggestion-loading"},yo={key:2,class:"suggestion-loading"},fo={class:"explore-section"},vo={class:"free-chat-input"},xo=["disabled"],So=["disabled"],$o={class:"quick-actions"},Io=["disabled"],bo=["disabled"],_o=["disabled"],wo={__name:"AIChat",setup(s){const e=ft(),t=ge(()=>e.path.includes("/zw")),n=ge(()=>t.value?je():Yr()),i=D(""),o=D(""),r=D(!1),l=D(t.value?"personality":"ganqing"),h=D([]),u=D({}),m=D([]),d=D(!1),x=D(""),_=D(null),f=D(""),S=new Map,p=new It(_),c=A=>A?A.replace(/<think>[\s\S]*?<\/think>/gi,"").trim():"",v=D(!1),P=D(null),j=D(null),K=D(null),V=[{id:"ai-mingge-zonglun",text:"命格总论",type:"mingge"},{id:"ai-current-luck",text:"当前大运",type:"current-luck"},{id:"ai-this-year",text:"今年运势",type:"year"},{id:"ai-monthly-fortune",text:"年运逐月",type:"monthly-fortune"},{id:"ai-next-three-years",text:"未来三年",type:"next-three-years"},{id:"ai-lifetime-fortune",text:"一生运势",type:"lifetime-fortune"},{id:"ai-career",text:"事业财运",type:"career"},{id:"ai-marriage",text:"感情婚姻",type:"marriage"},{id:"ai-health",text:"健康状况",type:"health"},{id:"ask-ai-with-date",text:"选定日期...",type:"custom"},{id:"custom",text:"自定义...",type:"custom"}],G=[{id:"ai-compat-marriage",text:"婚恋匹配",type:"marriage"},{id:"ai-compat-career",text:"事业合作",type:"career"},{id:"ai-compat-custom",text:"自定义...",type:"custom"}],W=[{id:"ai-ziwei-personality",text:"性格分析",type:"personality"},{id:"ai-ziwei-career",text:"事业财运",type:"career"},{id:"ai-ziwei-relationship",text:"感情婚姻",type:"relationship"},{id:"ai-ziwei-health",text:"健康状况",type:"health"},{id:"ai-ziwei-fortune",text:"运势分析",type:"fortune"},{id:"ai-ziwei-palace",text:"宫位分析",type:"palace"},{id:"custom",text:"自定义...",type:"custom"}],ne=[{id:"ai-ziwei-compat",text:"合盘分析",type:"compatibility"},{id:"ai-ziwei-marriage",text:"感情匹配",type:"relationship"},{id:"ai-ziwei-cooperation",text:"事业合作",type:"career"},{id:"custom",text:"自定义...",type:"custom"}],le=[{id:"ganqing",name:"感情",content:[{title:"情感发展",questions:[{text:"我近期的桃花运怎么样？",type:"marriage"},{text:"我们目前的感情走向如何？",type:"marriage"},{text:"他/她对我的真实情感是什么？",type:"marriage"},{text:"我们之间有未来吗？",type:"marriage"},{text:"如何改善我们目前的关系？",type:"marriage"},{text:"这段感情对我的影响？",type:"marriage"},{text:"我在感情中容易犯什么错误？",type:"marriage"},{text:"如何处理感情中的矛盾冲突？",type:"marriage"}]},{title:"正缘婚姻",questions:[{text:"我的正缘什么时候出现？",type:"marriage"},{text:"我的另一半是什么样的人？",type:"marriage"},{text:"我何时会结婚？",type:"marriage"},{text:"我适合和现在的对象结婚吗？",type:"marriage"},{text:"我的婚姻生活会幸福吗？",type:"marriage"},{text:"如何吸引我的正缘桃花？",type:"marriage"},{text:"我适合什么年龄结婚？",type:"marriage"},{text:"婚后我需要注意什么问题？",type:"marriage"}]},{title:"感情困扰",questions:[{text:"为什么我总是遇到不合适的人？",type:"marriage"},{text:"如何走出失恋的阴霾？",type:"marriage"},{text:"我在感情中缺乏什么？",type:"marriage"},{text:"如何提升自己的魅力？",type:"marriage"},{text:"异地恋能否有好结果？",type:"marriage"},{text:"如何判断对方是否真心？",type:"marriage"}]}]},{id:"shiye",name:"事业",content:[{title:"事业发展",questions:[{text:"我适合现在的工作/行业吗？",type:"career"},{text:"我的事业什么时候能成功？",type:"career"},{text:"我适合跳槽还是继续坚守？",type:"career"},{text:"我事业上的贵人会是谁？",type:"career"},{text:"我未来的事业走向怎么样？",type:"career"},{text:"我什么时候能找到满意的工作？",type:"career"},{text:"我适合创业还是打工？",type:"career"},{text:"如何在职场中脱颖而出？",type:"career"}]},{title:"职业规划",questions:[{text:"我最适合从事什么行业？",type:"career"},{text:"我的职业天赋在哪里？",type:"career"},{text:"如何规划我的职业发展路径？",type:"career"},{text:"我适合做管理还是技术？",type:"career"},{text:"转行对我来说是好选择吗？",type:"career"},{text:"我在什么环境下工作最有效率？",type:"career"}]},{title:"工作困扰",questions:[{text:"如何处理职场人际关系？",type:"career"},{text:"为什么我的工作总是不顺利？",type:"career"},{text:"如何获得上司的认可？",type:"career"},{text:"我在工作中的弱点是什么？",type:"career"},{text:"如何平衡工作与生活？",type:"career"},{text:"面对工作压力该如何调节？",type:"career"}]}]},{id:"caifu",name:"财富",content:[{title:"财运趋势",questions:[{text:"我近期的财运怎么样？",type:"career"},{text:"我这辈子财运的整体趋势？",type:"career"},{text:"我什么时候能发财？",type:"career"},{text:"我适合靠什么方式赚钱？",type:"career"},{text:"如何有效提升我的财运？",type:"career"},{text:"我近期会有意外之财吗？",type:"career"},{text:"我的财富巅峰期在什么时候？",type:"career"},{text:"我容易在哪些方面破财？",type:"career"}]},{title:"投资理财",questions:[{text:"我适合投资股票还是房产？",type:"career"},{text:"我的投资运势如何？",type:"career"},{text:"什么时候是我投资的好时机？",type:"career"},{text:"我适合保守理财还是激进投资？",type:"career"},{text:"如何避免投资失败？",type:"career"},{text:"我有做生意的天赋吗？",type:"career"}]},{title:"财富管理",questions:[{text:"如何培养正确的金钱观？",type:"career"},{text:"我为什么总是存不住钱？",type:"career"},{text:"如何增加被动收入？",type:"career"},{text:"我适合与人合伙做生意吗？",type:"career"},{text:"如何平衡消费与储蓄？",type:"career"},{text:"我的财富会传承给下一代吗？",type:"career"}]}]},{id:"renji",name:"人际",content:[{title:"社交模式",questions:[{text:"我的人际交往模式有何优缺点？",type:"mingge"},{text:"如何拓展我的高质量社交圈？",type:"mingge"},{text:"我目前的人际关系状态如何？",type:"mingge"},{text:"我会吸引哪些人进入我的生活？",type:"mingge"},{text:"如何获得他人的信任与支持？",type:"mingge"},{text:"如何处理与朋友的矛盾？",type:"mingge"},{text:"我在社交中的天然优势是什么？",type:"mingge"},{text:"如何克服社交恐惧？",type:"mingge"}]},{title:"家庭关系",questions:[{text:"如何改善与父母的关系？",type:"mingge"},{text:"我与兄弟姐妹的关系如何？",type:"mingge"},{text:"如何处理家庭矛盾？",type:"mingge"},{text:"我在家庭中扮演什么角色？",type:"mingge"},{text:"如何平衡家庭与个人发展？",type:"mingge"},{text:"我会是一个好父母吗？",type:"mingge"}]},{title:"人际困扰",questions:[{text:"为什么我总是遇到小人？",type:"mingge"},{text:"如何识别身边的真假朋友？",type:"mingge"},{text:"我在人际关系中的盲点是什么？",type:"mingge"},{text:"如何提升自己的人格魅力？",type:"mingge"},{text:"如何在团队中发挥领导力？",type:"mingge"},{text:"我适合与什么样的人深交？",type:"mingge"}]}]},{id:"rensheng",name:"成长",content:[{title:"个人成长",questions:[{text:"我的性格优势和劣势是什么？",type:"mingge"},{text:"我的人生主要课题是什么？",type:"mingge"},{text:"如何找到我的人生方向？",type:"mingge"},{text:"如何克服我性格中的弱点？",type:"mingge"},{text:"如何有效提升自己的能量状态？",type:"mingge"},{text:"我的人生转折点在何时？",type:"mingge"},{text:"我的天赋和潜能在哪里？",type:"mingge"},{text:"如何建立强大的内心？",type:"mingge"}]},{title:"人生规划",questions:[{text:"我这一生的使命是什么？",type:"mingge"},{text:"如何制定适合自己的人生目标？",type:"mingge"},{text:"我在什么年龄段会迎来人生高峰？",type:"mingge"},{text:"如何平衡理想与现实？",type:"mingge"},{text:"我的人生会有几次重大机遇？",type:"mingge"},{text:"如何为未来做好准备？",type:"mingge"}]},{title:"心理健康",questions:[{text:"如何管理自己的情绪？",type:"health"},{text:"我容易患哪些心理问题？",type:"health"},{text:"如何提升心理抗压能力？",type:"health"},{text:"如何走出人生低谷？",type:"health"},{text:"我的心理盲点在哪里？",type:"health"},{text:"如何保持积极的心态？",type:"health"}]},{title:"身体健康",questions:[{text:"我需要重点关注哪些健康问题？",type:"health"},{text:"我的体质特点是什么？",type:"health"},{text:"如何制定适合自己的养生方案？",type:"health"},{text:"我在什么年龄段需要特别注意健康？",type:"health"},{text:"如何通过饮食调理身体？",type:"health"},{text:"我适合什么样的运动方式？",type:"health"}]}]},{id:"xueye",name:"学业",content:[{title:"学习能力",questions:[{text:"我的学习天赋在哪个领域？",type:"mingge"},{text:"如何提高我的学习效率？",type:"mingge"},{text:"我适合什么样的学习方式？",type:"mingge"},{text:"如何克服学习中的困难？",type:"mingge"},{text:"我在学习中的优势和劣势？",type:"mingge"},{text:"如何培养良好的学习习惯？",type:"mingge"}]},{title:"专业选择",questions:[{text:"我适合学习什么专业？",type:"career"},{text:"文科还是理科更适合我？",type:"career"},{text:"我应该选择什么样的大学？",type:"career"},{text:"出国留学对我有利吗？",type:"career"},{text:"我的专业会有好的就业前景吗？",type:"career"},{text:"转专业对我来说是好选择吗？",type:"career"}]},{title:"考试运势",questions:[{text:"我的考试运势如何？",type:"year"},{text:"什么时候是我考试的最佳时机？",type:"year"},{text:"如何在重要考试中发挥最佳状态？",type:"year"},{text:"我容易在考试中犯什么错误？",type:"year"},{text:"如何克服考试焦虑？",type:"health"},{text:"我的学业会在什么时候迎来转机？",type:"year"}]},{title:"教育发展",questions:[{text:"我适合继续深造还是直接工作？",type:"career"},{text:"读研究生对我的发展有帮助吗？",type:"career"},{text:"我有做老师的天赋吗？",type:"career"},{text:"如何在学术道路上取得成功？",type:"career"},{text:"我适合从事教育行业吗？",type:"career"},{text:"如何平衡学习与其他生活？",type:"mingge"}]}]}],L=[{id:"personality",name:"性格命格",content:[{title:"命宫分析",questions:[{text:"我的命宫主星是什么？有什么特质？",type:"personality"},{text:"我的性格优势和劣势是什么？",type:"personality"},{text:"我的天赋才能在哪些方面？",type:"personality"},{text:"我适合什么样的人生道路？",type:"personality"},{text:"我的命格层次如何？",type:"personality"},{text:"我的性格中最突出的特点是什么？",type:"personality"},{text:"我在人际交往中的表现如何？",type:"personality"},{text:"我的领导能力和管理才能如何？",type:"personality"}]},{title:"身宫特质",questions:[{text:"我的身宫在哪里？有什么意义？",type:"personality"},{text:"我的人生重心应该放在哪里？",type:"personality"},{text:"身宫对我的性格有什么影响？",type:"personality"},{text:"如何发挥身宫的正面作用？",type:"personality"}]},{title:"福德宫分析",questions:[{text:"我的精神世界和内心状态如何？",type:"personality"},{text:"我的兴趣爱好和精神追求是什么？",type:"personality"},{text:"我如何获得内心的平静和快乐？",type:"personality"},{text:"我的思维模式和价值观如何？",type:"personality"}]}]},{id:"career",name:"事业财运",content:[{title:"官禄宫分析",questions:[{text:"我适合什么类型的工作？",type:"career"},{text:"我的事业发展方向是什么？",type:"career"},{text:"我什么时候会有事业突破？",type:"career"},{text:"我适合创业还是打工？",type:"career"},{text:"我的职场贵人运如何？",type:"career"},{text:"我在工作中容易遇到什么挑战？",type:"career"},{text:"我的升职加薪运势如何？",type:"career"},{text:"我适合在什么行业发展？",type:"career"}]},{title:"财帛宫分析",questions:[{text:"我的财运如何？",type:"career"},{text:"我适合什么样的投资理财？",type:"career"},{text:"我什么时候会有财运提升？",type:"career"},{text:"我的偏财运和正财运如何？",type:"career"},{text:"我容易在哪些方面破财？",type:"career"},{text:"我的理财观念和消费习惯如何？",type:"career"},{text:"我适合做什么样的投资？",type:"career"},{text:"我的财富积累能力如何？",type:"career"}]},{title:"田宅宫分析",questions:[{text:"我的房产运势如何？",type:"career"},{text:"我什么时候适合买房？",type:"career"},{text:"我适合投资房地产吗？",type:"career"},{text:"我的家庭环境对我有什么影响？",type:"career"}]}]},{id:"relationship",name:"感情婚姻",content:[{title:"夫妻宫分析",questions:[{text:"我的另一半会是什么样的人？",type:"relationship"},{text:"我什么时候会遇到正缘？",type:"relationship"},{text:"我的婚姻运势如何？",type:"relationship"},{text:"我在感情中需要注意什么？",type:"relationship"},{text:"我的桃花运什么时候最旺？",type:"relationship"},{text:"我容易遇到什么样的感情问题？",type:"relationship"},{text:"我的婚姻会幸福美满吗？",type:"relationship"},{text:"我如何改善夫妻关系？",type:"relationship"}]},{title:"子女宫分析",questions:[{text:"我的子女缘分如何？",type:"relationship"},{text:"我适合什么时候要孩子？",type:"relationship"},{text:"我的孩子会是什么性格？",type:"relationship"},{text:"我和孩子的关系如何？",type:"relationship"},{text:"我的子女对我的事业有什么影响？",type:"relationship"},{text:"我如何教育孩子？",type:"relationship"}]},{title:"兄弟宫分析",questions:[{text:"我和兄弟姐妹的关系如何？",type:"relationship"},{text:"我的朋友运势如何？",type:"relationship"},{text:"我容易交到什么样的朋友？",type:"relationship"},{text:"我在团队合作中的表现如何？",type:"relationship"}]}]},{id:"health",name:"健康疾厄",content:[{title:"疾厄宫分析",questions:[{text:"我需要注意哪些健康问题？",type:"health"},{text:"我的体质特点是什么？",type:"health"},{text:"我容易得什么疾病？",type:"health"},{text:"我如何保养身体？",type:"health"},{text:"我的精神健康状况如何？",type:"health"},{text:"我什么时候需要特别注意健康？",type:"health"},{text:"我适合什么样的运动和养生方式？",type:"health"},{text:"我的睡眠质量如何改善？",type:"health"}]},{title:"意外灾厄",questions:[{text:"我需要防范哪些意外？",type:"health"},{text:"我什么时候要特别小心？",type:"health"},{text:"我如何化解不利因素？",type:"health"},{text:"我的安全运势如何？",type:"health"}]}]},{id:"fortune",name:"运势流年",content:[{title:"大运分析",questions:[{text:"我现在处于什么大运？",type:"fortune"},{text:"我的大运对我有什么影响？",type:"fortune"},{text:"我下一个大运会如何？",type:"fortune"},{text:"我的大运什么时候最好？",type:"fortune"},{text:"我如何把握大运机遇？",type:"fortune"},{text:"我的大运对事业有什么影响？",type:"fortune"},{text:"我的大运对感情有什么影响？",type:"fortune"},{text:"我如何度过不利的大运？",type:"fortune"}]},{title:"流年分析",questions:[{text:"今年我的运势如何？",type:"fortune"},{text:"明年我需要注意什么？",type:"fortune"},{text:"我什么时候运势最好？",type:"fortune"},{text:"今年我的事业运如何？",type:"fortune"},{text:"今年我的财运如何？",type:"fortune"},{text:"今年我的感情运如何？",type:"fortune"},{text:"今年我的健康运如何？",type:"fortune"},{text:"我如何提升今年的运势？",type:"fortune"}]}]}],T=ge(()=>t.value?L:le),N=A=>{St(()=>{const E=T.value.findIndex(re=>re.id===A);if(E===-1||!h.value[E]){setTimeout(()=>N(A),50);return}const Y=h.value[E];if(Y.offsetLeft===0&&Y.offsetWidth===0){setTimeout(()=>N(A),50);return}u.value={left:`${Y.offsetLeft}px`,width:`${Y.offsetWidth}px`}})};Ie(l,A=>{N(A)},{immediate:!0});const Z=A=>{l.value=A},H=ge(()=>t.value?n.value.enableSecondPerson?ne:W:n.value.enableSecondPerson?G:V),ae=ge(()=>r.value?o.value.trim().length>0:i.value!==""),z=ge(()=>{if(!n.value.aiResponse)return"";let A=c(n.value.aiResponse);return A=A.replace(/^---+$/gm,""),A=A.replace(/\n\s*\n\s*\n/g,`

`),n.value.aiResponse.includes("<think>")&&console.log("🧠 检测到思考标签，已过滤:",{原始长度:n.value.aiResponse.length,过滤后长度:A.length,包含think标签:n.value.aiResponse.match(/<think>[\s\S]*?<\/think>/gi)?.length||0}),_t.parse(A.trim())}),he=A=>{i.value=A.id,r.value=A.type==="custom",r.value||(o.value="")},ce=async()=>{let A="",E="custom";if(r.value)A=o.value.trim();else{const Y=H.value.find(re=>re.id===i.value);Y&&(A=Y.text,E=Y.type)}A&&(f.value=A,oe(),await n.value.askAI(A,E))},me=async(A,E="custom")=>{console.log("问题灵感调用:",{question:A,questionType:E}),f.value=A,oe(),await n.value.askAI(A,E)},be=async()=>{if(d.value){console.log("智能建议生成已在进行中，跳过");return}const A=`suggestions_${n.value.person1?.year}_${n.value.person1?.month}_${n.value.person1?.day}_${f.value}`,E=S.get(A);if(E){m.value=E;return}d.value=!0;const Y=setTimeout(()=>{d.value&&(console.warn("智能建议生成超时"),d.value=!1)},6e3);try{if(!(t.value?n.value.ziWeiResult1:n.value.baziResult1)){console.log("没有排盘数据，跳过建议生成"),clearTimeout(Y),d.value=!1;return}await new Promise(ie=>setTimeout(ie,800));const Ce=`用户刚刚问了这个问题："${f.value||""}"

请根据这个问题，生成3个用户可能感兴趣的相关后续问题。这些问题应该：
1. 与原问题相关但有所延伸
2. 能够帮助用户更深入了解相关话题
3. 实用且有价值

请直接输出3个问题，每行一个，不要编号，不要其他说明文字。`;try{console.log("开始AI建议生成请求");const ie=await fe.queryAIComplete(Ce);if(console.log("AI建议生成完成，已过滤响应:",ie),ie&&ie.trim()){const Pe=ie.split(`
`).map(Te=>Te.trim()).filter(Te=>Te&&!Te.match(/^\d+\./)&&Te.length>5).slice(0,3);console.log("处理后的建议:",Pe),Pe.length>0?(console.log("设置建议前的状态:",{currentSuggestions:m.value,newSuggestions:Pe,isGenerating:d.value}),m.value=Pe,S.set(A,Pe),console.log("设置建议后的状态:",{currentSuggestions:m.value,isGenerating:d.value})):console.log("没有有效的建议内容")}else console.log("AI返回空内容")}catch(ie){if(ie.name==="AbortError"){console.log("建议生成请求被中止，这是正常的");return}console.warn("AI生成建议失败:",ie)}}catch(re){p.handle(re,"生成建议",!1)}finally{clearTimeout(Y),d.value=!1}},k=async()=>{if(!d.value){d.value=!0;try{if(!(t.value?n.value.ziWeiResult1:n.value.baziResult1))return;await new Promise(X=>setTimeout(X,1e3));let E=n.value.aiResponse||"";E=c(E);const re=`请基于以下八字分析结果和用户问题，重新生成3个不同的后续问题建议：

用户问题：${f.value||""}

分析结果：${E.substring(0,500)}...

请生成3个与之前不同的、与用户问题和分析结果高度相关的后续问题，格式为纯文本，每行一个问题，不要编号。`;try{const X=await fe.queryAIComplete(re);if(X&&X.trim()){const Ce=X.split(`
`).map(ie=>ie.trim()).filter(ie=>ie&&!ie.match(/^\d+\./)&&ie.length>5).slice(0,3);if(Ce.length>0){m.value=Ce,d.value=!1;return}}}catch(X){if(X.name==="AbortError"){console.log("重新生成建议请求被中止，这是正常的"),d.value=!1;return}console.warn("AI重新生成建议失败:",X)}}catch(A){console.error("重新生成建议失败:",A)}finally{d.value=!1}}},g=async A=>{f.value=A,oe(),await n.value.askAI(A,"custom",!0),setTimeout(()=>{O()},500)},y=async()=>{if(!x.value.trim())return;const A=x.value.trim();x.value="",f.value=A,oe(),await n.value.askAI(A,"custom",!0),setTimeout(()=>{O()},500)},w=async()=>{const A=`请对我的${f.value||"八字分析"}进行更详细深入的分析，包括具体的时间节点和注意事项`;f.value=A,oe(),await n.value.askAI(A,"custom"),setTimeout(()=>{O()},500)},M=async()=>{const A=new Date().getFullYear(),E=`我在${A}年和${A+1}年的运势如何？有哪些重要时间节点？`;f.value=E,oe(),await n.value.askAI(E,"custom"),setTimeout(()=>{O()},500)},F=async()=>{const A="基于我的八字，如何改善和提升我的运势？有什么具体的方法和建议？";f.value=A,oe(),await n.value.askAI(A,"custom"),setTimeout(()=>{O()},500)},R=async()=>{if(!n.value.aiResponse){_.value&&_.value.addToast("暂无AI回答内容可复制","warning","",3e3);return}try{const A=new Date().toLocaleString("zh-CN");let E=`八字分析结果
`;E+=`生成时间：${A}
`,E+=`${"=".repeat(30)}

`,E+=`问题：${f.value||"八字分析"}

`,E+=`回答：
${n.value.aiResponse.replace(/<[^>]*>/g,"").replace(/&nbsp;/g," ")}

`,E+=`${"=".repeat(30)}
`,E+=`来源：八字排盘系统
`,await navigator.clipboard.writeText(E),_.value&&_.value.addToast("AI回答已复制到剪贴板","success","",3e3)}catch(A){console.error("复制失败:",A),_.value&&_.value.addToast("复制失败，请手动选择复制","error","",3e3)}},ue=()=>{_e=Date.now(),O(),setTimeout(()=>{if(_e=Date.now(),j.value)j.value.scrollIntoView({behavior:"smooth",block:"end"});else{const A=document.querySelector(".ai-response");A&&A.scrollIntoView({behavior:"smooth",block:"end"})}},100)},oe=()=>{v.value=!0,console.log("开始自动滚动"),setTimeout(()=>{ue()},100),P.value=setInterval(()=>{v.value&&(n.value.isAIThinking||n.value.aiResponse)&&(O(),n.value.isAIThinking&&j.value&&setTimeout(()=>{j.value.scrollIntoView({behavior:"smooth",block:"nearest"})},100))},500)},O=()=>{try{_e=Date.now(),window.scrollTo({top:999999,behavior:"smooth"}),setTimeout(()=>{_e=Date.now();const A=document.documentElement.scrollHeight;window.scrollTo({top:A+1e3,behavior:"smooth"})},100)}catch{try{_e=Date.now(),window.scrollTo(0,999999)}catch(E){console.error("滚动失败:",E)}}},Ge=()=>{v.value=!1,P.value&&(clearInterval(P.value),P.value=null),Ae=!1};let _e=0;const He=()=>{!v.value||Date.now()-_e<3e3},gt=A=>{_.value&&_.value.addToast(A,"success","AI分析完成",4e3)};H.value.length>0&&he(H.value[0]),Ie(()=>n.value.isAIThinking,(A,E)=>{E&&!A&&n.value.aiResponse&&n.value.aiResponse.trim()&&(setTimeout(()=>{O()},200),setTimeout(()=>{O()},800),console.log("AI分析完成，自动滚动继续运行，用户可通过滚动操作停止"),gt("请查看分析结果"))}),Ie(()=>n.value.aiResponse,(A,E)=>{A&&A!==E&&(setTimeout(()=>{(v.value||A.length>E?.length+50)&&O()},100),setTimeout(()=>{(v.value||A.length>E?.length+50)&&O()},300))}),Ie(()=>n.value.isAIThinking,(A,E)=>{console.log("AI思考状态变化:",{wasThinking:E,isThinking:A,hasResponse:!!n.value.aiResponse}),E&&!A&&n.value.aiResponse&&n.value.aiResponse.trim()&&f.value&&(console.log("AI回答完成，准备生成智能建议"),K.value&&clearTimeout(K.value),K.value=setTimeout(()=>{console.log("检查是否可以生成建议:",{isGenerating:d.value,hasUserQuestion:!!f.value}),!d.value&&f.value?(console.log("条件满足，基于用户问题生成智能建议"),be()):console.log("跳过建议生成，条件不满足")},500))});let Ae=!1;const Ke=()=>{v.value&&(Ae=!0,Ge())},qe=()=>{v.value&&(Ae=!0)},Ve=()=>{v.value&&Ae&&(Ge(),Ae=!1)};return typeof window<"u"&&(window.addEventListener("scroll",He,{passive:!0}),window.addEventListener("wheel",Ke,{passive:!0}),window.addEventListener("touchstart",qe,{passive:!0}),window.addEventListener("touchmove",Ve,{passive:!0})),vt(()=>{Ge(),K.value&&clearTimeout(K.value),typeof window<"u"&&(window.removeEventListener("scroll",He),window.removeEventListener("wheel",Ke),window.removeEventListener("touchstart",qe),window.removeEventListener("touchmove",Ve))}),(A,E)=>(I(),b(q,null,[n.value.hasResults?(I(),b("div",Zr,[a("div",Hr,[a("h3",null,$(n.value.enableSecondPerson?"AI 合盘分析":t.value?"AI 紫薇斗数分析":"AI 命理分析"),1),a("div",Kr,[a("div",qr,[(I(!0),b(q,null,Q(H.value,Y=>(I(),b("button",{key:Y.id,class:se(["question-button",{selected:i.value===Y.id}]),onClick:re=>he(Y)},$(Y.text),11,Vr))),128))])]),r.value?(I(),b("div",Jr,[ee(a("input",{"onUpdate:modelValue":E[0]||(E[0]=Y=>o.value=Y),type:"text",placeholder:"请输入您的问题",onKeyup:Je(ce,["enter"])},null,544),[[de,o.value]])])):U("",!0),n.value.aiError?(I(),b("div",Wr,$(n.value.aiError),1)):U("",!0),a("button",{class:se(["primary-button ai-button",{thinking:n.value.isAIThinking}]),disabled:!ae.value||n.value.isAIThinking,onClick:ce},$(n.value.isAIThinking?"AI 思考中...":n.value.enableSecondPerson?"AI 合盘分析":"向 AI 提问"),11,Fr)]),a("div",Qr,[E[2]||(E[2]=a("h3",null,"问题灵感",-1)),a("div",zr,[(I(!0),b(q,null,Q(T.value,(Y,re)=>(I(),b("button",{key:Y.id,ref_for:!0,ref:X=>{X&&(h.value[re]=X)},class:se(["inspiration-tab-button",{active:l.value===Y.id}]),onClick:X=>Z(Y.id)},$(Y.name),11,Xr))),128)),a("div",{class:"inspiration-active-tab-indicator",style:xt(u.value)},null,4)]),a("div",eo,[(I(!0),b(q,null,Q(T.value,Y=>(I(),b(q,{key:Y.id},[l.value===Y.id?(I(),b("div",to,[(I(!0),b(q,null,Q(Y.content,re=>(I(),b("div",{key:re.title,class:"question-group"},[a("h4",null,$(re.title),1),a("div",no,[(I(!0),b(q,null,Q(re.questions,X=>(I(),b("p",{key:X.text,onClick:Ce=>me(X.text,X.type)},$(X.text),9,so))),128))])]))),128))])):U("",!0)],64))),128))])]),n.value.aiResponse||n.value.isAIThinking?(I(),b("div",{key:0,class:"ai-response",ref_key:"aiResponseRef",ref:j},[E[4]||(E[4]=a("h3",null,"AI 分析结果",-1)),a("div",{class:"response-content",innerHTML:z.value},null,8,ao),n.value.isAIThinking?(I(),b("div",ro,E[3]||(E[3]=[a("div",{class:"thinking-dots"},[a("span"),a("span"),a("span")],-1),a("p",null,"AI 正在深度分析中...",-1)]))):U("",!0)],512)):U("",!0),n.value.aiResponse&&!n.value.isAIThinking?(I(),b("div",oo,[E[12]||(E[12]=a("h3",null,"继续探索",-1)),f.value?(I(),b("div",io,[E[5]||(E[5]=a("h4",null,"您的问题",-1)),a("p",lo,$(f.value),1)])):U("",!0),a("div",co,[E[9]||(E[9]=a("h4",null,"智能建议",-1)),m.value.length>0?(I(),b("div",uo,[(I(!0),b(q,null,Q(m.value,(Y,re)=>(I(),b("p",{key:re,onClick:X=>g(Y),class:"suggested-question"},$(Y),9,ho))),128)),a("button",{onClick:k,class:"suggested-question regenerate-btn",disabled:d.value},$(d.value?"正在更新...":"重新生成建议"),9,go),d.value?(I(),b("div",mo,E[6]||(E[6]=[a("p",{class:"updating-text"},"正在更新建议...",-1)]))):U("",!0)])):d.value?(I(),b("div",po,E[7]||(E[7]=[a("p",null,"正在生成智能建议...",-1)]))):(I(),b("div",yo,E[8]||(E[8]=[a("p",null,"正在准备智能建议...",-1)])))]),a("div",fo,[E[10]||(E[10]=a("h4",null,"自由对话",-1)),a("div",vo,[ee(a("input",{"onUpdate:modelValue":E[1]||(E[1]=Y=>x.value=Y),type:"text",placeholder:"继续询问相关问题...",onKeypress:Je(y,["enter"]),disabled:n.value.isAIThinking},null,40,xo),[[de,x.value]]),a("button",{onClick:y,disabled:!x.value.trim()||n.value.isAIThinking},$(n.value.isAIThinking?"发送中...":"发送"),9,So)]),E[11]||(E[11]=a("div",{class:"chat-tips"},[a("small",null,'💡 提示：可以询问更具体的问题，如"明年3月适合跳槽吗？"')],-1))]),a("div",$o,[a("button",{class:"action-btn",onClick:w,disabled:n.value.isAIThinking}," 📊 详细分析 ",8,Io),a("button",{class:"action-btn",onClick:M,disabled:n.value.isAIThinking}," 📅 时间运势 ",8,bo),a("button",{class:"action-btn",onClick:F,disabled:n.value.isAIThinking}," 💡 改善建议 ",8,_o),a("button",{class:"action-btn",onClick:R}," 📋 复制结果 ")])])):U("",!0)])):U("",!0),ve(bt,{ref_key:"toastRef",ref:_},null,512)],64))}},at=ke(wo,[["__scopeId","data-v-37dfdbf8"]]);const ko={class:"ziwei-view"},Ao={key:0,class:"desktop-layout"},Co={class:"left-panel"},Po={class:"right-panel"},To={key:1,class:"mobile-layout"},Eo={__name:"ZiWeiView",setup(s){const e=je();return $t(()=>{e.resetPageTitle(),e.restoreDataFromUrl(),console.log("紫薇斗数页面已加载")}),(t,n)=>(I(),b("div",ko,[ve(Vn),C(e).hasResults?(I(),b("div",Ao,[a("div",Co,[ve(st)]),a("div",Po,[ve(at)])])):U("",!0),C(e).hasResults?(I(),b("div",To,[ve(st),ve(at)])):U("",!0)]))}},No=ke(Eo,[["__scopeId","data-v-87d4b20e"]]);export{No as default};
