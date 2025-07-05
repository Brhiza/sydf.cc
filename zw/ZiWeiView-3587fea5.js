import{r as D,j as he,v as ot,x as _e,y as ee,z as mt,A as P,b as _,d as $,i as a,B as ue,F as K,h as W,C as Oe,n as ne,t as v,f as M,D as pt,E as Y,G as yt,l as it,c as lt,e as xe,g as ct,H as ft,a as vt,I as We,k as xt,J as St,o as _t}from"./vendor-fcabaa7d.js";import{a as Fe}from"./iztro-8dcb482b.js";import{s as re,l as fe,a as $e,e as Ye,_ as ke,b as It,E as $t,T as bt}from"./zw-4fe8460b.js";import{S as Ue,G as Ee,a as Le}from"./tyme-86b89837.js";import{m as wt}from"./marked-9682a234.js";function Qe(s,e,t,n,i,o=!1){let r;try{if(!s||!e||!t||n===void 0||!i)throw new Error("缺少必要的出生信息");if(s<1900||s>2100)throw new Error("年份必须在1900-2100之间");if(e<1||e>12)throw new Error("月份必须在1-12之间");if(t<1||t>31)throw new Error("日期必须在1-31之间");if(n=parseInt(n),isNaN(n)||n<0||n>12)throw new Error(`时辰索引必须在0-12之间，当前值: ${n}`);if(!["male","female"].includes(i))throw new Error("性别必须是 male 或 female");if(n===0?r=0:n===12?r=23:r=(n-1)*2+1,r<0||r>23)throw new Error(`计算出的小时值无效: ${r}，timeIndex: ${n}`);const l=`${s}-${e.toString().padStart(2,"0")}-${t.toString().padStart(2,"0")}`,d=i==="male"?"男":"女";let u;o?u=Fe.byLunar(l,n,d,!1,!0,"zh-CN"):u=Fe.bySolar(l,n,d,!0,"zh-CN");const g=new Date().getFullYear(),c={name:"",gender:i,year:s,month:e,day:t,timeIndex:n,hour:r,isLunar:o,solarDate:u.solarDate,lunarDate:u.lunarDate,chineseDate:u.chineseDate,time:u.time,timeRange:u.timeRange,sign:u.sign,zodiac:u.zodiac,soulPalace:u.soul||"",bodyPalace:u.body||"",earthlyBranchOfBodyPalace:u.earthlyBranchOfBodyPalace||"",earthlyBranchOfSoulPalace:u.earthlyBranchOfSoulPalace||"",fiveElementsClass:u.fiveElementsClass||"",currentAge:g-s},y=u.palaces.map((f,m)=>({index:m,name:f.name,isBodyPalace:f.isBodyPalace,isOriginalPalace:f.isOriginalPalace,heavenlyStem:f.heavenlyStem,earthlyBranch:f.earthlyBranch,majorStars:f.majorStars.map(I=>({name:I.name,type:I.type,scope:I.scope,brightness:I.brightness,mutagen:I.mutagen||""})),minorStars:f.minorStars.map(I=>({name:I.name,type:I.type,scope:I.scope,brightness:I.brightness,mutagen:I.mutagen||""})),adjectiveStars:f.adjectiveStars.map(I=>({name:I.name,type:I.type,scope:I.scope,brightness:I.brightness,mutagen:I.mutagen||""})),changsheng12:f.changsheng12||"",boshi12:f.boshi12||"",jiangqian12:f.jiangqian12||"",suiqian12:f.suiqian12||"",decadal:f.decadal||"",ages:f.ages||[],isEmpty:f.isEmpty(),starCount:{major:f.majorStars.length,minor:f.minorStars.length,adjective:f.adjectiveStars.length,total:f.majorStars.length+f.minorStars.length+f.adjectiveStars.length}})),S={lu:"",quan:"",ke:"",ji:""};u.palaces.forEach(f=>{[...f.majorStars,...f.minorStars,...f.adjectiveStars].forEach(m=>{if(m.mutagen)switch(m.mutagen){case"禄":S.lu=m.name;break;case"权":S.quan=m.name;break;case"科":S.ke=m.name;break;case"忌":S.ji=m.name;break}})});const b=g-s;let x={currentAge:b,decadal:"",yearly:""};return console.log("运限信息暂时跳过，当前年龄:",b),{...c,palaces:y,mutagens:S,horoscope:x,_astrolabe:u}}catch(l){throw console.error("紫薇斗数计算失败:",l),console.error("计算参数:",{year:s,month:e,day:t,timeIndex:n,hourValue:r,gender:i,isLunar:o}),l.message.includes("wrong hour")?new Error(`时辰参数错误: 小时值${r}无效，请检查时辰选择`):new Error(`紫薇斗数计算失败: ${l.message}`)}}function ze(s){return s?{basicInfo:{name:s.name||"",gender:s.gender==="male"?"男":"女",birthDate:{solar:s.solarDate||"",lunar:s.lunarDate||"",chinese:s.chineseDate||""},time:s.time||"",timeRange:s.timeRange||"",sign:s.sign||"",zodiac:s.zodiac||"",fiveElementsClass:s.fiveElementsClass||"",soulPalace:s.soulPalace||"",bodyPalace:s.bodyPalace||""},palaces:(s.palaces||[]).map(e=>({name:e.name||"",isBodyPalace:e.isBodyPalace||!1,heavenlyStem:e.heavenlyStem||"",earthlyBranch:e.earthlyBranch||"",allStars:[...(e.majorStars||[]).map(t=>({...t,type:"major"})),...(e.minorStars||[]).map(t=>({...t,type:"minor"})),...(e.adjectiveStars||[]).map(t=>({...t,type:"adjective"}))].map(t=>({name:t.name||"",type:t.type||"",brightness:t.brightness||"",mutagen:t.mutagen||""})),changsheng12:e.changsheng12||"",ages:e.ages||[]})),mutagens:s.mutagens||{},horoscope:s.horoscope||{}}:null}const ut=`你是一位资深的紫薇斗数命理师，拥有深厚的紫薇斗数理论基础和丰富的实践经验。

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
- 三方四正：本宫、对宫、三合宫位的组合分析`,kt=`请重点分析以下方面：

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
   - 发展建议`,At=`请重点分析以下方面：

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
   - 理财投资的注意事项`,Pt=`请重点分析以下方面：

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
   - 心理健康的维护`,Tt=`请重点分析以下方面：

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
   - 运势提升的方法`,dt=`请重点分析以下方面：

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
   - 共同发展的方向`,Xe=`请根据用户的具体问题，结合紫薇斗数星盘信息进行专业分析。

分析时请注意：
1. 针对问题的核心进行重点分析
2. 结合相关宫位和星耀的影响
3. 给出具体可行的建议
4. 保持专业性和准确性`;function Et(s){return{personality:kt,career:At,relationship:Pt,health:Ct,fortune:Tt,compatibility:dt,custom:Xe}[s]||Xe}function Lt(s,e,t){const n=ut,i=Et(s);let o=`${n}

${i}

`;return o+=`【星盘信息】
`,o+=`基本信息：${JSON.stringify(t.basicInfo,null,2)}
`,o+=`宫位信息：${JSON.stringify(t.palaces,null,2)}
`,o+=`四化信息：${JSON.stringify(t.mutagens,null,2)}
`,o+=`运限信息：${JSON.stringify(t.horoscope,null,2)}

`,o+=`【用户问题】
${e}

`,o+="请基于以上信息进行专业分析，给出详细的解读和建议。",o}function Ut(s,e,t){let o=`${ut}

${dt}

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

`,o+="请基于以上两人的星盘信息进行专业的合盘分析，给出详细的匹配度解读和相处建议。",o}function Mt(s){if(!s)return"";try{const e=new URLSearchParams;return e.set("y",s.year),e.set("m",s.month),e.set("d",s.day),e.set("t",s.timeIndex),e.set("g",s.gender),s.name&&e.set("n",s.name),e.toString()}catch(e){return console.error("编码八字数据到URL失败:",e),""}}function Ze(s){if(!s)return null;try{const e=new URLSearchParams(s),t=e.get("y"),n=e.get("m"),i=e.get("d"),o=e.get("t"),r=e.get("g"),l=e.get("n");if(!t||!n||!i||o===null||!r)return console.warn("URL中的八字数据不完整"),null;const d=parseInt(t),u=parseInt(n),g=parseInt(i),c=parseInt(o);return d<1900||d>2100||u<1||u>12||g<1||g>31||c<0||c>12||!["male","female"].includes(r)?(console.warn("URL中的八字数据无效"),null):{year:d,month:u,day:g,timeIndex:c,gender:r,name:l||""}}catch(e){return console.error("从URL解码八字数据失败:",e),null}}function De(s){if(s)try{const e=new URL(window.location);e.searchParams.set("y",s.year),e.searchParams.set("m",s.month),e.searchParams.set("d",s.day),e.searchParams.set("t",s.timeIndex),e.searchParams.set("g",s.gender),s.name?e.searchParams.set("n",s.name):e.searchParams.delete("n"),e.searchParams.delete("bz"),window.history.replaceState({},"",e.toString())}catch(e){console.error("更新URL失败:",e)}}function Gt(){try{const s=new URL(window.location);if(s.searchParams.has("y")&&s.searchParams.has("m")&&s.searchParams.has("d")&&s.searchParams.has("t")&&s.searchParams.has("g"))return Ze(s.search.substring(1));const e=s.searchParams.get("bz");if(e)try{const t=decodeURIComponent(atob(e)),n=JSON.parse(t);return{year:parseInt(n.y),month:parseInt(n.m),day:parseInt(n.d),timeIndex:parseInt(n.t),gender:n.g,name:n.n||""}}catch(t){return console.warn("旧格式URL解码失败:",t),null}return null}catch(s){return console.error("从URL获取八字数据失败:",s),null}}function Nt(){try{const s=new URL(window.location);s.searchParams.delete("y"),s.searchParams.delete("m"),s.searchParams.delete("d"),s.searchParams.delete("t"),s.searchParams.delete("g"),s.searchParams.delete("n"),s.searchParams.delete("bz"),window.history.replaceState({},"",s.toString())}catch(s){console.error("清除URL中的八字数据失败:",s)}}function ht(s,e){if(!s||!e)return"";try{const t={p1:{y:s.year,m:s.month,d:s.day,t:s.timeIndex,g:s.gender,n:s.name||""},p2:{y:e.year,m:e.month,d:e.day,t:e.timeIndex,g:e.gender,n:e.name||""}},n=JSON.stringify(t);return btoa(encodeURIComponent(n))}catch(t){return console.error("编码合盘数据到URL失败:",t),""}}function jt(s){if(!s)return null;try{const e=decodeURIComponent(atob(s)),t=JSON.parse(e);if(!t.p1||!t.p2)return console.warn("URL中的合盘数据不完整"),null;const n=Ze(btoa(encodeURIComponent(JSON.stringify(t.p1)))),i=Ze(btoa(encodeURIComponent(JSON.stringify(t.p2))));return!n||!i?(console.warn("URL中的合盘数据无效"),null):{person1:n,person2:i}}catch(e){return console.error("从URL解码合盘数据失败:",e),null}}function Dt(s,e){if(!(!s||!e))try{const t=ht(s,e);if(t){const n=new URL(window.location);n.searchParams.set("cp",t),n.searchParams.delete("bz"),window.history.replaceState({},"",n.toString())}}catch(t){console.error("更新合盘URL失败:",t)}}function Rt(){try{const e=new URL(window.location).searchParams.get("cp");return jt(e)}catch(s){return console.error("从URL获取合盘数据失败:",s),null}}function Bt(){try{const s=new URL(window.location);s.searchParams.delete("cp"),window.history.replaceState({},"",s.toString())}catch(s){console.error("清除URL中的合盘数据失败:",s)}}function et(s,e=null){const t=window.location.origin+window.location.pathname;if(e){const n=ht(s,e);return n?`${t}?cp=${n}`:t}else{const n=Mt(s);return n?`${t}?${n}`:t}}function Ot(){try{const s=new URL(window.location);return s.searchParams.has("bz")||s.searchParams.has("cp")||s.searchParams.has("y")&&s.searchParams.has("m")&&s.searchParams.has("d")&&s.searchParams.has("t")&&s.searchParams.has("g")}catch{return!1}}function Yt(s){if(!s)return"";try{const e=new URLSearchParams;return e.set("y",s.year),e.set("m",s.month),e.set("d",s.day),e.set("t",s.timeIndex),e.set("g",s.gender),s.name&&e.set("n",s.name),s.isLunar&&e.set("l","1"),e.toString()}catch(e){return console.error("编码紫薇斗数数据到URL失败:",e),""}}function Zt(s){if(!s)return null;try{const e=new URLSearchParams(s);if(!e.has("y")||!e.has("m")||!e.has("d")||!e.has("t")||!e.has("g"))return console.warn("URL中的紫薇斗数数据不完整"),null;const t=parseInt(e.get("y")),n=parseInt(e.get("m")),i=parseInt(e.get("d")),o=parseInt(e.get("t")),r=e.get("g");return t<1900||t>2100||n<1||n>12||i<1||i>31||o<0||o>12||!["male","female"].includes(r)?(console.warn("URL中的紫薇斗数数据无效"),null):{year:t,month:n,day:i,timeIndex:o,gender:r,name:e.get("n")||"",isLunar:e.get("l")==="1"}}catch(e){return console.error("从URL解码紫薇斗数数据失败:",e),null}}function Ht(s){if(s)try{const e=new URL(window.location);e.searchParams.set("y",s.year),e.searchParams.set("m",s.month),e.searchParams.set("d",s.day),e.searchParams.set("t",s.timeIndex),e.searchParams.set("g",s.gender),s.name?e.searchParams.set("n",s.name):e.searchParams.delete("n"),s.isLunar?e.searchParams.set("l","1"):e.searchParams.delete("l"),e.searchParams.delete("zw"),e.searchParams.delete("bz"),window.history.replaceState({},"",e.toString())}catch(e){console.error("更新紫薇斗数URL失败:",e)}}function Kt(){try{const s=new URL(window.location);if(s.searchParams.has("y")&&s.searchParams.has("m")&&s.searchParams.has("d")&&s.searchParams.has("t")&&s.searchParams.has("g"))return Zt(s.search.substring(1));const e=s.searchParams.get("zw");if(e)try{const t=decodeURIComponent(atob(e)),n=JSON.parse(t);return{year:parseInt(n.y),month:parseInt(n.m),day:parseInt(n.d),timeIndex:parseInt(n.t),gender:n.g,name:n.n||"",isLunar:n.l||!1}}catch(t){return console.warn("旧格式紫薇斗数URL解码失败:",t),null}return null}catch(s){return console.error("从URL获取紫薇斗数数据失败:",s),null}}function qt(){try{const s=new URL(window.location);s.searchParams.delete("y"),s.searchParams.delete("m"),s.searchParams.delete("d"),s.searchParams.delete("t"),s.searchParams.delete("g"),s.searchParams.delete("n"),s.searchParams.delete("l"),s.searchParams.delete("zw"),window.history.replaceState({},"",s.toString())}catch(s){console.error("清除URL中的紫薇斗数数据失败:",s)}}function Vt(s,e){if(!s||!e)return"";try{const t=new URLSearchParams;return t.set("p1_y",s.year),t.set("p1_m",s.month),t.set("p1_d",s.day),t.set("p1_t",s.timeIndex),t.set("p1_g",s.gender),s.name&&t.set("p1_n",s.name),s.isLunar&&t.set("p1_l","1"),t.set("p2_y",e.year),t.set("p2_m",e.month),t.set("p2_d",e.day),t.set("p2_t",e.timeIndex),t.set("p2_g",e.gender),e.name&&t.set("p2_n",e.name),e.isLunar&&t.set("p2_l","1"),t.toString()}catch(t){return console.error("编码紫薇斗数合盘数据到URL失败:",t),""}}function Jt(s){if(!s)return null;try{const e=new URLSearchParams(s);if(!e.has("p1_y")||!e.has("p2_y"))return console.warn("URL中的紫薇斗数合盘数据不完整"),null;const t={year:parseInt(e.get("p1_y")),month:parseInt(e.get("p1_m")),day:parseInt(e.get("p1_d")),timeIndex:parseInt(e.get("p1_t")),gender:e.get("p1_g"),name:e.get("p1_n")||"",isLunar:e.get("p1_l")==="1"},n={year:parseInt(e.get("p2_y")),month:parseInt(e.get("p2_m")),day:parseInt(e.get("p2_d")),timeIndex:parseInt(e.get("p2_t")),gender:e.get("p2_g"),name:e.get("p2_n")||"",isLunar:e.get("p2_l")==="1"};return!t.year||!t.month||!t.day||t.timeIndex===void 0||!t.gender||!n.year||!n.month||!n.day||n.timeIndex===void 0||!n.gender?(console.warn("URL中的紫薇斗数合盘数据无效"),null):{person1:t,person2:n}}catch(e){return console.error("从URL解码紫薇斗数合盘数据失败:",e),null}}function Wt(s,e){if(!(!s||!e))try{const t=new URL(window.location),n=[];for(const i of t.searchParams.keys())n.push(i);n.forEach(i=>t.searchParams.delete(i)),t.searchParams.set("p1_y",s.year),t.searchParams.set("p1_m",s.month),t.searchParams.set("p1_d",s.day),t.searchParams.set("p1_t",s.timeIndex),t.searchParams.set("p1_g",s.gender),s.name&&t.searchParams.set("p1_n",s.name),s.isLunar&&t.searchParams.set("p1_l","1"),t.searchParams.set("p2_y",e.year),t.searchParams.set("p2_m",e.month),t.searchParams.set("p2_d",e.day),t.searchParams.set("p2_t",e.timeIndex),t.searchParams.set("p2_g",e.gender),e.name&&t.searchParams.set("p2_n",e.name),e.isLunar&&t.searchParams.set("p2_l","1"),window.history.replaceState({},"",t.toString())}catch(t){console.error("更新紫薇斗数合盘URL失败:",t)}}function Ft(){try{const s=new URL(window.location);if(s.searchParams.has("p1_y")&&s.searchParams.has("p2_y"))return Jt(s.search.substring(1));const e=s.searchParams.get("zwcp");if(e)try{const t=decodeURIComponent(atob(e)),n=JSON.parse(t);return!n.p1||!n.p2?null:{person1:{year:parseInt(n.p1.y),month:parseInt(n.p1.m),day:parseInt(n.p1.d),timeIndex:parseInt(n.p1.t),gender:n.p1.g,name:n.p1.n||"",isLunar:n.p1.l||!1},person2:{year:parseInt(n.p2.y),month:parseInt(n.p2.m),day:parseInt(n.p2.d),timeIndex:parseInt(n.p2.t),gender:n.p2.g,name:n.p2.n||"",isLunar:n.p2.l||!1}}}catch(t){return console.warn("旧格式紫薇斗数合盘URL解码失败:",t),null}return null}catch(s){return console.error("从URL获取紫薇斗数合盘数据失败:",s),null}}function Qt(){try{const s=new URL(window.location),e=[];for(const t of s.searchParams.keys())(t.startsWith("p1_")||t.startsWith("p2_"))&&e.push(t);e.forEach(t=>s.searchParams.delete(t)),s.searchParams.delete("zwcp"),window.history.replaceState({},"",s.toString())}catch(s){console.error("清除URL中的紫薇斗数合盘数据失败:",s)}}function tt(s,e=null){const t=window.location.origin+window.location.pathname;if(e){const n=Vt(s,e);return n?`${t}?${n}`:t}else{const n=Yt(s);return n?`${t}?${n}`:t}}function zt(s={}){const e={name:"",year:"",month:"",day:"",timeIndex:0,gender:"",isLunar:!1,...s},t=D({...e}),n=D({...e}),i=D(!1),o=D(null),r=D(null),l=D(!1),d=D(""),u=he(()=>{const y=t.value.year&&t.value.month&&t.value.day&&t.value.timeIndex!==""&&t.value.gender;if(!i.value)return y;const S=n.value.year&&n.value.month&&n.value.day&&n.value.timeIndex!==""&&n.value.gender;return y&&S}),g=he(()=>o.value!==null);return{person1:t,person2:n,enableSecondPerson:i,result1:o,result2:r,isCalculating:l,calculationError:d,canCalculate:u,hasResults:g,resetData:()=>{t.value={...e},n.value={...e},i.value=!1,o.value=null,r.value=null,d.value=""}}}const q={HEAVENLY_STEMS:["甲","乙","丙","丁","戊","己","庚","辛","壬","癸"],EARTHLY_BRANCHES:["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"],STEM_WUXING:["木","木","火","火","土","土","金","金","水","水"],BRANCH_WUXING:["水","土","木","木","土","火","火","土","金","金","土","水"],STEM_YINYANG:["阳","阴","阳","阴","阳","阴","阳","阴","阳","阴"],BRANCH_YINYANG:["阳","阴","阳","阴","阳","阴","阳","阴","阳","阴","阳","阴"],WUXING_SHENG:{木:"火",火:"土",土:"金",金:"水",水:"木"},WUXING_KE:{木:"土",火:"金",土:"水",金:"木",水:"火"},TIME_BRANCHES:[{name:"早子时",hour:0,branch:"子"},{name:"丑时",hour:1,branch:"丑"},{name:"寅时",hour:3,branch:"寅"},{name:"卯时",hour:5,branch:"卯"},{name:"辰时",hour:7,branch:"辰"},{name:"巳时",hour:9,branch:"巳"},{name:"午时",hour:11,branch:"午"},{name:"未时",hour:13,branch:"未"},{name:"申时",hour:15,branch:"申"},{name:"酉时",hour:17,branch:"酉"},{name:"戌时",hour:19,branch:"戌"},{name:"亥时",hour:21,branch:"亥"},{name:"晚子时",hour:23,branch:"子"}]},Re={子:["癸"],丑:["己","癸","辛"],寅:["甲","丙","戊"],卯:["乙"],辰:["戊","乙","癸"],巳:["丙","庚","戊"],午:["丁","己"],未:["己","丁","乙"],申:["庚","壬","戊"],酉:["辛"],戌:["戊","辛","丁"],亥:["壬","甲"]},Xt={甲子:"海中金",乙丑:"海中金",丙寅:"炉中火",丁卯:"炉中火",戊辰:"大林木",己巳:"大林木",庚午:"路旁土",辛未:"路旁土",壬申:"剑锋金",癸酉:"剑锋金",甲戌:"山头火",乙亥:"山头火",丙子:"涧下水",丁丑:"涧下水",戊寅:"城头土",己卯:"城头土",庚辰:"白蜡金",辛巳:"白蜡金",壬午:"杨柳木",癸未:"杨柳木",甲申:"泉中水",乙酉:"泉中水",丙戌:"屋上土",丁亥:"屋上土",戊子:"霹雳火",己丑:"霹雳火",庚寅:"松柏木",辛卯:"松柏木",壬辰:"长流水",癸巳:"长流水",甲午:"砂中金",乙未:"砂中金",丙申:"山下火",丁酉:"山下火",戊戌:"平地木",己亥:"平地木",庚子:"壁上土",辛丑:"壁上土",壬寅:"金箔金",癸卯:"金箔金",甲辰:"覆灯火",乙巳:"覆灯火",丙午:"天河水",丁未:"天河水",戊申:"大驿土",己酉:"大驿土",庚戌:"钗钏金",辛亥:"钗钏金",壬子:"桑柘木",癸丑:"桑柘木",甲寅:"大溪水",乙卯:"大溪水",丙辰:"沙中土",丁巳:"沙中土",戊午:"天上火",己未:"天上火",庚申:"石榴木",辛酉:"石榴木",壬戌:"大海水",癸亥:"大海水"},nt={金:{color:"白、金、银",direction:"西",industry:"金融、五金、科技、汽车、司法",advice:"增强决断力，保持原则，处事要果断。"},木:{color:"绿、青",direction:"东",industry:"教育、林业、文化、服装、医药",advice:"保持仁爱之心，积极成长，多接触自然。"},水:{color:"黑、蓝、灰",direction:"北",industry:"贸易、物流、水产、旅游、媒体",advice:"锻炼沟通能力，灵活应变，保持谦逊。"},火:{color:"红、橙、紫",direction:"南",industry:"电力、餐饮、IT、化工、礼仪",advice:"保持热情与活力，待人接物要真诚有礼。"},土:{color:"黄、棕、褐",direction:"中（本地）",industry:"地产、建筑、农业、保险",advice:"为人处事要诚信稳重，脚踏实地。"}},Be={甲:{亥:"长生",子:"沐浴",丑:"冠带",寅:"临官",卯:"帝旺",辰:"衰",巳:"病",午:"死",未:"墓",申:"绝",酉:"胎",戌:"养"},乙:{午:"长生",巳:"沐浴",辰:"冠带",卯:"临官",寅:"帝旺",丑:"衰",子:"病",亥:"死",戌:"墓",酉:"绝",申:"胎",未:"养"},丙:{寅:"长生",卯:"沐浴",辰:"冠带",巳:"临官",午:"帝旺",未:"衰",申:"病",酉:"死",戌:"墓",亥:"绝",子:"胎",丑:"养"},丁:{酉:"长生",申:"沐浴",未:"冠带",午:"临官",巳:"帝旺",辰:"衰",卯:"病",寅:"死",丑:"墓",子:"绝",亥:"胎",戌:"养"},戊:{寅:"长生",卯:"沐浴",辰:"冠带",巳:"临官",午:"帝旺",未:"衰",申:"病",酉:"死",戌:"墓",亥:"绝",子:"胎",丑:"养"},己:{酉:"长生",申:"沐浴",未:"冠带",午:"临官",巳:"帝旺",辰:"衰",卯:"病",寅:"死",丑:"墓",子:"绝",亥:"胎",戌:"养"},庚:{巳:"长生",午:"沐浴",未:"冠带",申:"临官",酉:"帝旺",戌:"衰",亥:"病",子:"死",丑:"墓",寅:"绝",卯:"胎",辰:"养"},辛:{子:"长生",亥:"沐浴",戌:"冠带",酉:"临官",申:"帝旺",未:"衰",午:"病",巳:"死",辰:"墓",卯:"绝",寅:"胎",丑:"养"},壬:{申:"长生",酉:"沐浴",戌:"冠带",亥:"临官",子:"帝旺",丑:"衰",寅:"病",卯:"死",辰:"墓",巳:"绝",午:"胎",未:"养"},癸:{卯:"长生",寅:"沐浴",丑:"冠带",子:"临官",亥:"帝旺",戌:"衰",酉:"病",申:"死",未:"墓",午:"绝",巳:"胎",辰:"养"}},en={寅:{木:"旺",火:"相",水:"休",金:"囚",土:"死"},卯:{木:"旺",火:"相",水:"休",金:"囚",土:"死"},辰:{土:"旺",金:"相",火:"休",木:"囚",水:"死"},巳:{火:"旺",土:"相",木:"休",水:"囚",金:"死"},午:{火:"旺",土:"相",木:"休",水:"囚",金:"死"},未:{土:"旺",金:"相",火:"休",木:"囚",水:"死"},申:{金:"旺",水:"相",土:"休",火:"囚",木:"死"},酉:{金:"旺",水:"相",土:"休",火:"囚",木:"死"},戌:{土:"旺",金:"相",火:"休",木:"囚",水:"死"},亥:{水:"旺",木:"相",金:"休",土:"囚",火:"死"},子:{水:"旺",木:"相",金:"休",土:"囚",火:"死"},丑:{土:"旺",金:"相",火:"休",木:"囚",水:"死"}},tn={寅:[["戊",7],["丙",7],["甲",16]],卯:[["甲",10],["乙",20]],辰:[["乙",9],["癸",3],["戊",18]],巳:[["戊",7],["庚",9],["丙",14]],午:[["丙",10],["丁",20]],未:[["丁",9],["乙",3],["己",18]],申:[["庚",10],["壬",3],["戊",17]],酉:[["庚",10],["辛",20]],戌:[["辛",9],["丁",3],["戊",18]],亥:[["戊",7],["甲",23]],子:[["壬",10],["癸",20]],丑:[["癸",9],["辛",3],["己",18]]};class nn{constructor(){this.ctg=q.HEAVENLY_STEMS,this.cdz=q.EARTHLY_BRANCHES}zhiIdx(e){return this.cdz.indexOf(e)}calculateAllShenSha(e,t){const n={},i=["year","month","day","hour"];return e.forEach((o,r)=>{const[l,d]=o,u=this.calculatePillarShenSha(l,d,r,e,t);n[i[r]]=u}),n}calculatePillarShenSha(e,t,n,i,o){const r=[],[l,d]=i[0],[u,g]=i[1],[c,y]=i[2];i[3];const S=c+y,b=e+t;this.ctg.indexOf(l)%2;const x=o==="male",f={天乙贵人:()=>{const m={甲:["丑","未"],戊:["丑","未"],庚:["丑","未"],己:["子","申"],乙:["子","申"],丙:["亥","酉"],丁:["亥","酉"],壬:["卯","巳"],癸:["卯","巳"],辛:["寅","午"]};return m[l]&&m[l].includes(t)||m[c]&&m[c].includes(t)},太极贵人:()=>{const m={甲:["子","午"],乙:["子","午"],丙:["卯","酉"],丁:["卯","酉"],戊:["辰","戌","丑","未"],己:["辰","戌","丑","未"],庚:["寅","亥"],辛:["寅","亥"],壬:["巳","申"],癸:["巳","申"]};return m[l]&&m[l].includes(t)||m[c]&&m[c].includes(t)},天德贵人:()=>{const I={寅:1,卯:2,辰:3,巳:4,午:5,未:6,申:7,酉:8,戌:9,亥:10,子:11,丑:12}[g];if(!I)return!1;const L={1:"丁",2:"申",3:"壬",4:"辛",5:"亥",6:"甲",7:"癸",8:"寅",9:"丙",10:"乙",11:"巳",12:"庚"}[I];return L===e||L===t},天德合:()=>{const I={寅:1,卯:2,辰:3,巳:4,午:5,未:6,申:7,酉:8,戌:9,亥:10,子:11,丑:12}[g];if(!I)return!1;const L={1:"丁",2:"申",3:"壬",4:"辛",5:"亥",6:"甲",7:"癸",8:"寅",9:"丙",10:"乙",11:"巳",12:"庚"}[I];return{甲:"己",乙:"庚",丙:"辛",丁:"壬",戊:"癸",己:"甲",庚:"乙",辛:"丙",壬:"丁",癸:"戊"}[L]===e},月德贵人:()=>({寅:"丙",午:"丙",戌:"丙",申:"壬",子:"壬",辰:"壬",亥:"甲",卯:"甲",未:"甲",巳:"庚",酉:"庚",丑:"庚"})[g]===e,月德合:()=>{const m={寅:"丙",午:"丙",戌:"丙",申:"壬",子:"壬",辰:"壬",亥:"甲",卯:"甲",未:"甲",巳:"庚",酉:"庚",丑:"庚"}[g];return{甲:"己",乙:"庚",丙:"辛",丁:"壬",戊:"癸",己:"甲",庚:"乙",辛:"丙",壬:"丁",癸:"戊"}[m]===e},三奇贵人:()=>{const m=i.map(L=>L[0]),I=[["乙","丙","丁"],["甲","戊","庚"],["辛","壬","癸"]];for(let L=0;L<=m.length-3;L++){const N=m.slice(L,L+3);if(I.some(Q=>Q.every((z,j)=>z===N[j])))return!0}return!1},福星贵人:()=>{const m={甲:"寅",乙:"丑",丙:"子",丁:"亥",戊:"申",己:"未",庚:"午",辛:"巳",壬:"辰",癸:"卯"};return m[l]===t||m[c]===t},文昌贵人:()=>{const m={甲:"巳",乙:"午",丙:"申",丁:"酉",戊:"申",己:"酉",庚:"亥",辛:"子",壬:"寅",癸:"卯"};return m[l]===t||m[c]===t},国印贵人:()=>{const m={甲:"戌",乙:"亥",丙:"丑",丁:"寅",戊:"丑",己:"寅",庚:"辰",辛:"巳",壬:"未",癸:"申"};return m[l]===t||m[c]===t},学堂:()=>{const m=q.STEM_WUXING[c];return{木:"亥",火:"寅",土:"申",金:"巳",水:"申"}[m]===t},词馆:()=>({甲:"寅",乙:"卯",丙:"巳",丁:"午",戊:"巳",己:"午",庚:"申",辛:"酉",壬:"亥",癸:"子"})[c]===t,天厨贵人:()=>({甲:"巳",乙:"午",丙:"子",丁:"亥",戊:"申",己:"未",庚:"寅",辛:"卯",壬:"酉",癸:"戌"})[c]===t,德秀贵人:()=>{const I={寅:"火",午:"火",戌:"火",申:"水",子:"水",辰:"水",巳:"金",酉:"金",丑:"金",亥:"木",卯:"木",未:"木"}[g],L={甲:"己",乙:"庚",丙:"辛",丁:"壬",戊:"癸"},N=[];return I==="火"?N.push("丁","己","癸","庚"):I==="水"?N.push("壬","甲","戊","己","辛"):I==="金"?N.push("庚","壬","乙","丙","戊"):I==="木"&&N.push("乙","癸","丁","丙","庚"),N.includes(e)||L[e]&&N.includes(L[e])},禄神:()=>({甲:"寅",乙:"卯",丙:"巳",丁:"午",戊:"巳",己:"午",庚:"申",辛:"酉",壬:"亥",癸:"子"})[c]===t,羊刃:()=>({甲:"卯",丙:"午",戊:"午",庚:"酉",壬:"子"})[c]===t,飞刃:()=>{const I={甲:"卯",丙:"午",戊:"午",庚:"酉",壬:"子"}[c];return I?{子:"午",丑:"未",寅:"申",卯:"酉",辰:"戌",巳:"亥",午:"子",未:"丑",申:"寅",酉:"卯",戌:"辰",亥:"巳"}[I]===t:!1},驿马:()=>{const m={申:"寅",子:"寅",辰:"寅",亥:"巳",卯:"巳",未:"巳",寅:"申",午:"申",戌:"申",巳:"亥",酉:"亥",丑:"亥"};return m[d]===t||m[y]===t},将星:()=>{const m={申:"子",子:"子",辰:"子",亥:"卯",卯:"卯",未:"卯",寅:"午",午:"午",戌:"午",巳:"酉",酉:"酉",丑:"酉"};return m[d]===t||m[y]===t},华盖:()=>{const m={申:"辰",子:"辰",辰:"辰",亥:"未",卯:"未",未:"未",寅:"戌",午:"戌",戌:"戌",巳:"丑",酉:"丑",丑:"丑"};return m[d]===t||m[y]===t},金舆:()=>({甲:"辰",乙:"巳",丙:"未",丁:"申",戊:"未",己:"申",庚:"戌",辛:"亥",壬:"丑",癸:"寅"})[c]===t,金神:()=>["乙丑","己巳","癸酉"].includes(b)&&(n===2||n===3),天赦日:()=>{if(n!==2)return!1;const m={寅:"春",卯:"春",辰:"春",巳:"夏",午:"夏",未:"夏",申:"秋",酉:"秋",戌:"秋",亥:"冬",子:"冬",丑:"冬"}[g];return m==="春"&&S==="戊寅"||m==="夏"&&S==="甲午"||m==="秋"&&S==="戊申"||m==="冬"&&S==="甲子"},魁罡:()=>n===2&&["庚辰","壬辰","戊戌","庚戌"].includes(S),阴差阳错:()=>n===2&&["丙子","丁丑","戊寅","辛卯","壬辰","癸巳","丙午","丁未","戊申","辛酉","壬戌","癸亥"].includes(S),孤鸾煞:()=>n===2&&["乙巳","丁巳","辛亥","戊申","甲寅","壬子","丙午","戊午","己未","癸丑"].includes(S),十灵日:()=>n===2&&["甲辰","乙亥","丙辰","丁酉","戊午","庚戌","辛亥","壬寅","癸未"].includes(S),六秀日:()=>n===2&&["丙午","丁未","戊子","戊午","己丑","己未"].includes(S),八专:()=>n===2&&["甲寅","乙卯","己未","丁巳","庚申","辛酉","戊戌","癸丑"].includes(S),九丑:()=>n===2&&["戊子","戊午","壬子","壬午","乙卯","辛卯","乙酉","辛酉","己卯","己酉"].includes(S),四废日:()=>{if(n!==2)return!1;const m={寅:"春",卯:"春",辰:"春",巳:"夏",午:"夏",未:"夏",申:"秋",酉:"秋",戌:"秋",亥:"冬",子:"冬",丑:"冬"},I={春:["庚申","辛酉"],夏:["壬子","癸亥"],秋:["甲寅","乙卯"],冬:["丙午","丁巳"]},L=m[g];return L&&I[L].includes(S)},十恶大败:()=>{const m=this.ctg.indexOf(l),I=this.cdz.indexOf(d);if(m===-1||I===-1)return!1;const L=(10+I-m)%12,N=(11+I-m)%12,Q=[this.cdz[L],this.cdz[N]],j={甲:"寅",乙:"卯",丙:"巳",丁:"午",戊:"巳",己:"午",庚:"申",辛:"酉",壬:"亥",癸:"子"}[c];return Q.includes(j)},童子煞:()=>{const I={寅:"春",卯:"春",辰:"春",巳:"夏",午:"夏",未:"夏",申:"秋",酉:"秋",戌:"秋",亥:"冬",子:"冬",丑:"冬"}[g];return I?(I==="春"||I==="秋")&&(t==="寅"||t==="卯")||(I==="夏"||I==="冬")&&(t==="午"||t==="子"):!1},天转:()=>(n===2||n===3)&&{春:"乙卯",夏:"戊午",秋:"辛酉",冬:"癸子"}[{寅:"春",卯:"春",辰:"春",巳:"夏",午:"夏",未:"夏",申:"秋",酉:"秋",戌:"秋",亥:"冬",子:"冬",丑:"冬"}[g]]===b,地转:()=>(n===2||n===3)&&{春:"甲寅",夏:"丁巳",秋:"庚申",冬:"癸亥"}[{寅:"春",卯:"春",辰:"春",巳:"夏",午:"夏",未:"夏",申:"秋",酉:"秋",戌:"秋",亥:"冬",子:"冬",丑:"冬"}[g]]===b,桃花:()=>{const m={寅:"卯",午:"卯",戌:"卯",亥:"子",卯:"子",未:"子",申:"酉",子:"酉",辰:"酉",巳:"午",酉:"午",丑:"午"};return m[d]===t||m[y]===t},红鸾:()=>({子:"卯",丑:"寅",寅:"丑",卯:"子",辰:"亥",巳:"戌",午:"酉",未:"申",申:"未",酉:"午",戌:"巳",亥:"辰"})[d]===t,天喜:()=>({子:"酉",丑:"申",寅:"未",卯:"午",辰:"巳",巳:"辰",午:"卯",未:"寅",申:"丑",酉:"子",戌:"亥",亥:"戌"})[d]===t,孤辰:()=>({亥:"寅",子:"寅",丑:"寅",寅:"巳",卯:"巳",辰:"巳",巳:"申",午:"申",未:"申",申:"亥",酉:"亥",戌:"亥"})[d]===t,寡宿:()=>({亥:"戌",子:"戌",丑:"戌",寅:"丑",卯:"丑",辰:"丑",巳:"辰",午:"辰",未:"辰",申:"未",酉:"未",戌:"未"})[d]===t,红艳煞:()=>({甲:"午",乙:"申",丙:"寅",丁:"未",戊:"辰",己:"辰",庚:"戌",辛:"酉",壬:"子",癸:"申"})[c]===t,勾绞煞:()=>{const m=(this.zhiIdx(d)+4)%12,I=(this.zhiIdx(d)-4+12)%12;return t===this.cdz[m]||t===this.cdz[I]},空亡:()=>{const m=this.ctg.indexOf(c),I=this.cdz.indexOf(y);if(m===-1||I===-1)return!1;const L=(10+I-m)%12,N=(11+I-m)%12;return[this.cdz[L],this.cdz[N]].includes(t)},亡神:()=>{const m={申:"亥",子:"亥",辰:"亥",亥:"申",卯:"申",未:"申",寅:"巳",午:"巳",戌:"巳",巳:"寅",酉:"寅",丑:"寅"};return m[d]===t||m[y]===t},劫煞:()=>{const m={申:"巳",子:"巳",辰:"巳",亥:"寅",卯:"寅",未:"寅",寅:"亥",午:"亥",戌:"亥",巳:"申",酉:"申",丑:"申"};return m[d]===t||m[y]===t},灾煞:()=>{const m={申:"午",子:"午",辰:"午",亥:"酉",卯:"酉",未:"酉",寅:"子",午:"子",戌:"子",巳:"卯",酉:"卯",丑:"卯"};return m[d]===t||m[y]===t},元辰:()=>{const m=this.ctg.indexOf(l)%2===0,I=m&&x||!m&&!x?7:-7,L=(this.zhiIdx(d)+I+12)%12;return this.cdz[L]===t},血刃:()=>({寅:"丑",卯:"寅",辰:"卯",巳:"辰",午:"巳",未:"午",申:"未",酉:"申",戌:"酉",亥:"戌",子:"亥",丑:"子"})[g]===t,流霞:()=>({甲:"酉",乙:"戌",丙:"未",丁:"申",戊:"巳",己:"午",庚:"辰",辛:"卯",壬:"亥",癸:"寅"})[c]===t,天罗:()=>t==="戌"||t==="亥",地网:()=>t==="辰"||t==="巳",丧门:()=>this.cdz[(this.zhiIdx(d)+2)%12]===t,吊客:()=>this.cdz[(this.zhiIdx(d)-2+12)%12]===t,披麻:()=>this.cdz[(this.zhiIdx(d)-1+12)%12]===t};for(const m in f)f[m]()&&r.push(m);return r}}class sn{constructor(){this.ctg=q.HEAVENLY_STEMS,this.cdz=q.EARTHLY_BRANCHES,this.wxtg=q.STEM_WUXING,this.wxdz=q.BRANCH_WUXING,this.wuxingKe=q.WUXING_KE,this.wuxingSheng=q.WUXING_SHENG}getIntelligentAnalysis(e){const t=[],n={甲:"己",乙:"庚",丙:"辛",丁:"壬",戊:"癸"},i={甲:"庚",乙:"辛",丙:"壬",丁:"癸"};for(let x=0;x<4;x++)for(let f=x+1;f<4;f++){const m=e[x][0],I=e[f][0];if(i[m]===I||i[I]===m)t.push(`${m}${I}相冲`);else if(n[m]===I||n[I]===m)t.push(`${m}${I}相合`);else{const L=this.wxtg[this.ctg.indexOf(m)],N=this.wxtg[this.ctg.indexOf(I)];this.wuxingKe[L]===N?t.push(`${m}克${I}`):this.wuxingKe[N]===L&&t.push(`${I}克${m}`)}}const o=[],r=e.map(x=>x[1]),l={子:"午",丑:"未",寅:"申",卯:"酉",辰:"戌",巳:"亥"},d={子:"丑",寅:"亥",卯:"戌",辰:"酉",巳:"申",午:"未"},u={子:"未",丑:"午",寅:"巳",卯:"辰",申:"亥",酉:"戌"},g={子:"酉",卯:"午",辰:"丑",未:"戌",寅:"亥",巳:"申"};for(let x=0;x<4;x++)for(let f=x+1;f<4;f++){const m=r[x],I=r[f];l[m]===I||l[I]===m?o.push(`${m}${I}相冲`):d[m]===I||d[I]===m?o.push(`${m}${I}相合`):u[m]===I||u[I]===m?o.push(`${m}${I}相害`):(g[m]===I||g[I]===m)&&o.push(`${m}${I}相破`)}const c=[...new Set(r)];c.filter(x=>["寅","巳","申"].includes(x)).length>=2&&o.push("寅巳申无恩之刑"),c.filter(x=>["丑","戌","未"].includes(x)).length>=2&&o.push("丑戌未恃势之刑"),c.includes("子")&&c.includes("卯")&&o.push("子卯无礼之刑"),r.filter(x=>x==="辰").length>1&&o.push("辰辰自刑"),r.filter(x=>x==="午").length>1&&o.push("午午自刑"),r.filter(x=>x==="酉").length>1&&o.push("酉酉自刑"),r.filter(x=>x==="亥").length>1&&o.push("亥亥自刑");const y=[];for(let x=0;x<4;x++){const f=e[x][0],m=e[x][1],I=this.wxtg[this.ctg.indexOf(f)],L=this.wxdz[this.cdz.indexOf(m)][0];this.wuxingKe[I]===L&&y.push(`${f}${m}盖头`),this.wuxingKe[L]===I&&y.push(`${f}${m}截脚`)}for(let x=0;x<4;x++)for(let f=x+1;f<4;f++){const m=e[x],I=e[f],L=i[m[0]]===I[0]||i[I[0]]===m[0],N=l[m[1]]===I[1]||l[I[1]]===m[1];L&&N&&y.push(`${m.join("")}与${I.join("")}天克地冲(反吟)`)}const b=e.map(x=>x.join("")).reduce((x,f)=>(x[f]=(x[f]||0)+1,x),{});for(const x in b)b[x]>1&&y.push(`${x}伏吟`);return{tianGan:t.length>0?`原局天干: ${t.join(" | ")}`:"",diZhi:o.length>0?`原局地支: ${o.join(" | ")}`:"",zhengZhu:y.length>0?`原局整柱: ${y.join(" | ")}`:""}}}class an{constructor(){this.timeMap=[{index:0,name:"早子时",range:"00:00-01:00",hour:0},{index:1,name:"丑时",range:"01:00-03:00",hour:1},{index:2,name:"寅时",range:"03:00-05:00",hour:3},{index:3,name:"卯时",range:"05:00-07:00",hour:5},{index:4,name:"辰时",range:"07:00-09:00",hour:7},{index:5,name:"巳时",range:"09:00-11:00",hour:9},{index:6,name:"午时",range:"11:00-13:00",hour:11},{index:7,name:"未时",range:"13:00-15:00",hour:13},{index:8,name:"申时",range:"15:00-17:00",hour:15},{index:9,name:"酉时",range:"17:00-19:00",hour:17},{index:10,name:"戌时",range:"19:00-21:00",hour:19},{index:11,name:"亥时",range:"21:00-23:00",hour:21},{index:12,name:"晚子时",range:"23:00-24:00",hour:23}],this.tenGods=["比肩","劫财","食神","伤官","偏财","正财","七杀","正官","偏印","正印"],this.wuxing=["水","木","火","土","金"],this.lifeStages=["长生","沐浴","冠带","临官","帝旺","衰","病","死","墓","绝","胎","养"],this.shenShaCalculator=new nn,this.relationshipCalculator=new sn,this.ctg=q.HEAVENLY_STEMS,this.cdz=q.EARTHLY_BRANCHES,this.wxtg=q.STEM_WUXING,this.wxdz=q.BRANCH_WUXING}calculateBazi(e,t,n,i,o){try{const r=this.timeMap[i];if(!r)throw new Error("无效的时辰索引");const l=Ue.fromYmdHms(e,t,n,r.hour,0,0),d=l.getLunarHour(),u=d.getEightChar(),g=u.getYear(),c=u.getMonth(),y=u.getDay(),S=u.getHour(),b={year:{gan:g.getHeavenStem().getName(),zhi:g.getEarthBranch().getName(),ganZhi:g.getName()},month:{gan:c.getHeavenStem().getName(),zhi:c.getEarthBranch().getName(),ganZhi:c.getName()},day:{gan:y.getHeavenStem().getName(),zhi:y.getEarthBranch().getName(),ganZhi:y.getName()},hour:{gan:S.getHeavenStem().getName(),zhi:S.getEarthBranch().getName(),ganZhi:S.getName()}},x=b.day.gan,f=[[b.year.gan,b.year.zhi],[b.month.gan,b.month.zhi],[b.day.gan,b.day.zhi],[b.hour.gan,b.hour.zhi]],m=this.calculateHiddenStems(b),I=this.calculateWuxingStrength(b,m),L=this.calculateSeasonInfo(l),N={gender:o==="male"?"男":"女",solarDate:{year:e,month:t,day:n},lunarDate:{year:d.getLunarDay().getLunarMonth().getLunarYear().getYear(),month:d.getLunarDay().getLunarMonth().getMonth(),day:d.getLunarDay().getDay(),monthName:d.getLunarDay().getLunarMonth().getName(),dayName:d.getLunarDay().getName()},timeInfo:r,pillars:b,dayMaster:{gan:x,element:this.getWuxing(x),yinYang:this.getGanYinYang(x)},zodiac:d.getLunarDay().getLunarMonth().getLunarYear().getSixtyCycle().getEarthBranch().getZodiac().getName(),constellation:l.getSolarDay().getConstellation().getName(),tenGods:this.calculateTenGods(b,x),hiddenStems:m,hiddenTenGods:this.calculateHiddenTenGods(m,x),wuxingStrength:I,luckInfo:this.calculateDayunWithTyme(l,o==="male"?Ee.MAN:Ee.WOMAN),mingGong:u.getOwnSign().getName(),shenGong:u.getBodySign().getName(),taiYuan:u.getFetalOrigin().getName(),taiXi:u.getFetalBreath().getName(),lifeStages:this.calculateLifeStages(b,x),pillarLifeStages:this.calculatePillarLifeStages(b),nayin:this.calculateNayin(b),shensha:this.shenShaCalculator.calculateAllShenSha(f,o),ziZuo:this.calculateZiZuo(b),kongWang:this.calculateKongWang(b),intelligentAnalysis:this.relationshipCalculator.getIntelligentAnalysis(f),wuxingSeasonStatus:this.getSeasonStatus(b.month.zhi),monthCommander:this.getMonthCommander(l,b.month.zhi),seasonInfo:L,analysis:this.analyzeBaziChart(b,m)};if(N.luckInfo&&N.luckInfo.cycles){const Q=e;N.luckInfo.cycles.forEach(z=>{if(!z.isXiaoyun){z.years=[];const j=z.year,J=j+9;for(let te=j;te<=J;te++){const ie=te-Q+1,E=this.calculateLiunian(te,x),C=this.calculateXiaoyun(b.hour.ganZhi,N.gender,b.year.gan,ie);z.years.push({year:te,age:ie,ganZhi:E.ganZhi,tenGod:E.tenGod,tenGodZhi:E.tenGodZhi,xiaoyun:C})}}})}return N}catch(r){throw console.error("八字计算错误:",r),new Error(`八字计算失败: ${r.message}`)}}calculateLiunian(e,t){try{const i=Ue.fromYmdHms(e,6,1,0,0,0).getLunarHour().getEightChar().getYear(),o=i.getHeavenStem().getName(),r=i.getEarthBranch().getName();return{year:e,gan:o,zhi:r,ganZhi:`${o}${r}`,tenGod:this.getTenGod(o,t),tenGodZhi:this.getTenGodForBranch(r,t)}}catch(n){console.error(`流年计算错误 (${e}年):`,n);const i=(e-4)%10,o=(e-4)%12,r=q.HEAVENLY_STEMS[i],l=q.EARTHLY_BRANCHES[o];return{year:e,gan:r,zhi:l,ganZhi:`${r}${l}`,tenGod:this.getTenGod(r,t),tenGodZhi:this.getTenGodForBranch(l,t)}}}calculateLiuyue(e,t,n){const o=Ue.fromYmdHms(e,t,1,0,0,0).getLunarHour().getEightChar().getMonth(),r=o.getHeavenStem().getName(),l=o.getEarthBranch().getName(),d=[],u=[e-1,e,e+1],g=[];u.forEach(y=>{for(let S=0;S<24;S++)g.push(Le.fromIndex(y,S))});for(const y of g){const S=y.getJulianDay().getSolarDay();S.getYear()===e&&S.getMonth()===t&&(d.find(x=>x.name===y.getName())||d.push({name:y.getName(),date:`${S.getYear()}-${S.getMonth().toString().padStart(2,"0")}-${S.getDay().toString().padStart(2,"0")}`}))}const c=d.sort((y,S)=>new Date(y.date).getDate()-new Date(S.date).getDate());return{month:t,gan:r,zhi:l,ganZhi:`${r}${l}`,tenGod:this.getTenGod(r,n),tenGodZhi:this.getTenGodForBranch(l,n),jieqi:c}}calculateLiuri(e,t,n,i){const r=Ue.fromYmdHms(e,t,n,0,0,0).getLunarHour().getEightChar().getDay(),l=r.getHeavenStem().getName(),d=r.getEarthBranch().getName();return{day:n,gan:l,zhi:d,ganZhi:`${l}${d}`,tenGod:this.getTenGod(l,i),tenGodZhi:this.getTenGodForBranch(d,i)}}getTenGodForBranch(e,t){const n=Re[e]?.[0];return n?this.getTenGod(n,t):"未知"}calculateXiaoyun(e,t,n,i){const o=[];for(const y of q.HEAVENLY_STEMS)for(const S of q.EARTHLY_BRANCHES)o.push(y+S);const r=o.indexOf(e);if(r===-1)return"未知";const d=q.HEAVENLY_STEMS.indexOf(n)%2===0,u=t==="男",g=d&&u||!d&&!u;let c;return g?c=(r+i)%60:(c=(r-i)%60,c<0&&(c+=60)),o[c]}calculatePillarLifeStages(e){const t={};for(const n in e){const i=e[n],o=i.gan,r=i.zhi;t[n]=Be[o]?.[r]||"无"}return t}getWuxing(e){const t=this.ctg.indexOf(e);if(t!==-1)return this.wxtg[t];const n=this.cdz.indexOf(e);return n!==-1?this.wxdz[n]:"未知"}getGanYinYang(e){const t=this.ctg.indexOf(e);return t===-1?"未知":q.STEM_YINYANG[t]}calculateTenGods(e,t){return Object.fromEntries(Object.entries(e).map(([n,{gan:i}])=>n==="day"?[n,"日主"]:[n,this.getTenGod(i,t)]))}getTenGod(e,t){const n=this.ctg.indexOf(e),i=this.ctg.indexOf(t);return n===-1||i===-1?"未知":[["比肩","劫财","食神","伤官","偏财","正财","七杀","正官","偏印","正印"],["劫财","比肩","伤官","食神","正财","偏财","正官","七杀","正印","偏印"],["偏印","正印","比肩","劫财","食神","伤官","偏财","正财","七杀","正官"],["正印","偏印","劫财","比肩","伤官","食神","正财","偏财","正官","七杀"],["七杀","正官","偏印","正印","比肩","劫财","食神","伤官","偏财","正财"],["正官","七杀","正印","偏印","劫财","比肩","伤官","食神","正财","偏财"],["偏财","正财","七杀","正官","偏印","正印","比肩","劫财","食神","伤官"],["正财","偏财","正官","七杀","正印","偏印","劫财","比肩","伤官","食神"],["食神","伤官","偏财","正财","七杀","正官","偏印","正印","比肩","劫财"],["伤官","食神","正财","偏财","正官","七杀","正印","偏印","劫财","比肩"]][i][n]}calculateHiddenStems(e){return Object.fromEntries(Object.entries(e).map(([t,{zhi:n}])=>[t,Re[n]||[]]))}calculateHiddenTenGods(e,t){return Object.fromEntries(Object.entries(e).map(([n,i])=>[n,i.map(o=>this.getTenGod(o,t))]))}calculateWuxingStrength(e,t){const n={tianGan:12,diZhiBenQi:12,diZhiZhongQi:6,diZhiYuQi:3},i={寅:{木:2,火:1.5,土:.8,金:.6,水:1.2},卯:{木:2.2,火:1.6,土:.7,金:.5,水:1.1},辰:{土:2,金:1.5,水:.8,木:1.2,火:.6},巳:{火:2,土:1.5,金:.8,水:.6,木:1.2},午:{火:2.2,土:1.6,金:.7,水:.5,木:1.1},未:{土:2,金:1.5,水:.8,木:1.2,火:.6},申:{金:2,水:1.5,木:.8,火:.6,土:1.2},酉:{金:2.2,水:1.6,木:.7,火:.5,土:1.1},戌:{土:2,金:1.5,水:.8,木:1.2,火:.6},亥:{水:2,木:1.5,火:.8,土:.6,金:1.2},子:{水:2.2,木:1.6,火:.7,土:.5,金:1.1},丑:{土:2,金:1.5,水:.8,木:1.2,火:.6}},o=e.month.zhi,r=i[o],l={金:0,木:0,水:0,火:0,土:0};for(const j of Object.values(e)){const J=this.getWuxing(j.gan);J!=="未知"&&(l[J]+=n.tianGan)}for(const j of Object.values(e)){const J=j.zhi;(Re[J]||[]).forEach((ie,E)=>{const C=this.getWuxing(ie);C!=="未知"&&(E===0?l[C]+=n.diZhiBenQi:E===1?l[C]+=n.diZhiZhongQi:l[C]+=n.diZhiYuQi)})}const d={...l};for(const j in d)d[j]=Math.round(d[j]*(r[j]||1));const u=Object.values(d).reduce((j,J)=>j+J,0),g={};if(u>0)for(const j in d)g[j]=Math.round(d[j]/u*100);else for(const j in d)g[j]=0;const c=this.getWuxing(e.day.gan),y={金:{allies:["金","土"],enemies:["火","水","木"]},木:{allies:["木","水"],enemies:["金","火","土"]},水:{allies:["水","金"],enemies:["土","木","火"]},火:{allies:["火","木"],enemies:["水","土","金"]},土:{allies:["土","火"],enemies:["木","金","水"]}};if(!y[c])return{scores:d,percentages:g,status:"无法判断"};const S=y[c].allies,b=y[c].enemies,x=S.reduce((j,J)=>j+(d[J]||0),0);b.reduce((j,J)=>j+(d[J]||0),0);let f="均衡";const m=u>0?x/u*100:0;m>60?f="身强":m<20?f="身弱":m>=40&&m<=60?f="中和":m>50?f="偏强":m<30&&(f="偏弱");let I=[],L=[];f==="身强"||f==="偏强"?(I=b,L=S):f==="身弱"||f==="偏弱"?(I=S,L=b):I=y[c].enemies.slice(0,2);const N=Object.entries(l).filter(([j,J])=>J===0).map(([j])=>j),Q=I.map(j=>({wuxing:j,...nt[j]})),z=L.map(j=>({wuxing:j,...nt[j]}));return{scores:d,percentages:g,status:f,yongShen:I,jiShen:L,missing:N,suggestions:{favorable:Q,unfavorable:z}}}calculateDayunWithTyme(e,t){try{const n=this.calculateTraditionalDayun(e,t);let i="";if(n.startAge!==void 0){const u=e.getSolarDay().getYear()+n.startAge;i=`出生后 ${n.startAge} 年，${u}年起运`}else i="起运时间计算失败";const o=[],r=n.startAge;if(r>0){const u=e.getLunarHour().getEightChar(),g=u.getHour().getName(),c=t===Ee.MAN?"男":"女",y=u.getYear().getHeavenStem().getName(),S=this.getGanYinYang(y),b=e.getSolarDay().getYear(),x=[],f=Math.max(1,r);for(let m=1;m<=f;m++){const I=b+m-1,L=this.calculateXiaoyun(g,c,y,m),N=this.calculateLiunian(I,u.getDay().getHeavenStem().getName());x.push({year:I,age:m,ganZhi:N.ganZhi,tenGod:N.tenGod,tenGodZhi:N.tenGodZhi,xiaoyun:{ganZhi:L,tenGod:this.getTenGod(L[0],u.getDay().getHeavenStem().getName()),tenGodZhi:this.getTenGodForBranch(L[1],u.getDay().getHeavenStem().getName())}})}x.length>0&&o.push({age:1,year:x[0].year,ganZhi:"小运",isXiaoyun:!0,type:"小运",years:x})}const l=e.getSolarDay().getYear();for(let u=0;u<12;u++){const g=n.startAge+u*10,c=l+g-1,y=n.dayunList[u];y&&o.push({age:g,year:c,ganZhi:y,isXiaoyun:!1,type:"大运",years:[]})}let d="";if(n.dayunList.length>0){const u=n.dayunList[0][0],g=q.HEAVENLY_STEMS,c=g.indexOf(u);if(c!==-1){const y=g[(c+5)%10];d=`逢 ${u}、${y} 年交运`}else d="交运信息计算失败"}else d="交运信息计算失败";return{startInfo:i,handoverInfo:d,cycles:o}}catch(n){return console.error("大运计算错误:",n),{startInfo:"计算失败",handoverInfo:"计算失败",cycles:[]}}}calculateLifeStages(e,t){const n=Be[t]||{};return Object.fromEntries(Object.entries(e).map(([i,{zhi:o}])=>[i,n[o]||"未知"]))}calculateNayin(e){return Object.fromEntries(Object.entries(e).map(([t,{gan:n,zhi:i}])=>[t,Xt[n+i]||"未知"]))}calculateWuxingStatus(e){const t=this.getSeasonStatus(e);return t?`木${t.木} 火${t.火} 土${t.土} 金${t.金} 水${t.水}`:"无法确定五行状态"}calculateKongWang(e){return Object.fromEntries(Object.entries(e).map(([t,{gan:n,zhi:i}])=>{const o=this.ctg.indexOf(n),r=this.cdz.indexOf(i);if(o===-1||r===-1)return[t,[]];const l=(10+r-o)%12,d=(11+r-o)%12;return[t,[this.cdz[l],this.cdz[d]]]}))}calculateZiZuo(e){return Object.fromEntries(Object.entries(e).map(([t,{gan:n,zhi:i}])=>{const o=Be[n]||{};return[t,o[i]||"未知"]}))}analyzeBaziChart(e,t){const n=e.day.gan,i=this.getWuxing(n),o=e.month.zhi;e.month.gan;const l=this.getSeasonStatus(o)[i],d=l==="旺"||l==="相",u=this.analyzeRoots(e,i),g=this.analyzeSupport(e,n,i),c=this.calculateDayMasterStrength(d,u,g,i,o),y=this.analyzePattern(e,t,n,i,c.strength),S=this.analyzeUsefulGod(e,i,c.strength,y);return{dayMasterStrength:c.strength,dayMasterStatus:c.status,mingGe:y.pattern,patternType:y.type,patternDescription:y.description,favorableElements:S.favorable,unfavorableElements:S.unfavorable,usefulGod:S.useful,avoidGod:S.avoid,circulation:S.circulation,rootAnalysis:u,supportAnalysis:g,seasonalStatus:{month:o,dayMasterStatus:l,isTimely:d}}}analyzeRoots(e,t){const n=[];let i=0;return Object.entries(e).forEach(([o,r])=>{if(this.getWuxing(r.zhi)===t){const d=o==="day"?3:1;n.push({position:o,branch:r.zhi,strength:d}),i+=d}}),{roots:n,totalStrength:i,hasRoot:n.length>0,strongRoot:n.some(o=>o.strength>=3)}}analyzeSupport(e,t,n){const i=[];let o=0;return Object.entries(e).forEach(([r,l])=>{if(r!=="day"&&l.gan&&this.getWuxing(l.gan)===n){const u=l.gan===t?2:1;i.push({position:r,stem:l.gan,strength:u}),o+=u}}),{supporters:i,totalStrength:o,hasSupport:i.length>0}}calculateDayMasterStrength(e,t,n,i,o){let r="中和",l=0;e&&(l+=2),l+=t.totalStrength,l+=n.totalStrength,l>=6?r="太旺":l>=4?r="偏旺":l>=2?r="中和":l>=1?r="偏弱":r="太弱";const u=this.getSeasonStatus(o)[i]||"休";return{strength:r,score:l,status:`日主${i}生于${o}月，${u}`,details:{timely:e,rootStrength:t.totalStrength,supportStrength:n.totalStrength}}}analyzePattern(e,t,n,i,o){const r=e.month.gan;e.month.zhi;const l=this.getTenGod(r,n),d=this.checkSpecialPattern(e,i,o);if(d.isSpecial)return d;let u="正格",g="普通格局",c="命局平和，无明显特殊格局";if(l)switch(l){case"正官":u="正官格",g="官格",c="月干透正官，主贵气，利于仕途功名";break;case"七杀":u="七杀格",g="杀格",c="月干透七杀，主权威，需要制化得宜";break;case"正财":u="正财格",g="财格",c="月干透正财，主富裕，利于经商理财";break;case"偏财":u="偏财格",g="财格",c="月干透偏财，主横财，善于投资经营";break;case"正印":u="正印格",g="印格",c="月干透正印，主学问，利于文化教育";break;case"偏印":u="偏印格",g="印格",c="月干透偏印，主技艺，适合专业技能";break;case"食神":u="食神格",g="食伤格",c="月干透食神，主福禄，性格温和有才华";break;case"伤官":u="伤官格",g="食伤格",c="月干透伤官，主才华，需要适当约束";break;case"比肩":u="建禄格",g="比劫格",c="月干透比肩，主自立，需要财官调节";break;case"劫财":u="劫财格",g="比劫格",c="月干透劫财，主竞争，需要官杀制约";break;default:u="正格",g="普通格局",c="命局平和，五行流通"}const y=this.checkPatternSuccess(e,u,g);return{pattern:u,type:g,description:c,success:y.success,successReason:y.reason,isSpecial:!1}}checkSpecialPattern(e,t,n){return n==="太旺"&&this.countRestraints(e,t)===0?{isSpecial:!0,pattern:"从强格",type:"特殊格局",description:"日主极旺无制，顺其旺势而行",success:!0,successReason:"格局纯粹，顺势而为"}:n==="太弱"&&this.countSupports(e,t)===0?{isSpecial:!0,pattern:"从弱格",type:"特殊格局",description:"日主极弱无助，从其弱势而行",success:!0,successReason:"格局清纯，从弱而行"}:{isSpecial:!1}}checkPatternSuccess(e,t,n){let i=!0,o="格局基本成立";switch(n){case"官格":this.hasInjuryToOfficial(e)&&(i=!1,o="伤官见官，格局受损");break;case"财格":this.hasRobberyToWealth(e)&&(i=!1,o="比劫夺财，格局不清");break}return{success:i,reason:o}}analyzeUsefulGod(e,t,n,i){const o=[],r=[];let l="",d="",u="";switch(n){case"太旺":const g=this.getWuxingChildren(t),c=this.getWuxingEnemies(t);o.push(...g,...c),r.push(t,...this.getWuxingParents(t)),l=g[0]||c[0]||"食神",d=t,u="身旺用食伤泄秀，或用官杀制身";break;case"偏旺":o.push(...this.getWuxingChildren(t)),r.push(t,...this.getWuxingParents(t)),l=this.getWuxingChildren(t)[0]||"食神",d=t,u="身旺喜泄，食伤为用";break;case"中和":o.push(t),l="调候",u="命局中和，重在调候和流通";break;case"偏弱":o.push(t,...this.getWuxingParents(t)),r.push(...this.getWuxingEnemies(t),...this.getWuxingChildren(t)),l=this.getWuxingParents(t)[0]||t,d=this.getWuxingEnemies(t)[0]||"官杀",u="身弱喜印比帮扶";break;case"太弱":i.pattern==="从弱格"?(o.push(...this.getWuxingEnemies(t),...this.getWuxingChildren(t)),r.push(t,...this.getWuxingParents(t)),l=this.getWuxingEnemies(t)[0]||"官杀",d=t,u="从弱格，顺其弱势，忌帮扶"):(o.push(t,...this.getWuxingParents(t)),r.push(...this.getWuxingEnemies(t)),l=this.getWuxingParents(t)[0]||t,d=this.getWuxingEnemies(t)[0]||"官杀",u="身弱急需印比帮扶");break}return{favorable:[...new Set(o)],unfavorable:[...new Set(r)],useful:l,avoid:d,circulation:u}}getWuxingChildren(e){return{木:["火"],火:["土"],土:["金"],金:["水"],水:["木"]}[e]||[]}getWuxingParents(e){return{火:["木"],土:["火"],金:["土"],水:["金"],木:["水"]}[e]||[]}getWuxingEnemies(e){return{木:["金"],火:["水"],土:["木"],金:["火"],水:["土"]}[e]||[]}countRestraints(e,t){let n=0;const i=this.getWuxingEnemies(t);return Object.values(e).forEach(o=>{(i.includes(this.getWuxing(o.gan))||i.includes(this.getWuxing(o.zhi)))&&n++}),n}countSupports(e,t){let n=0;const i=this.getWuxingParents(t);return Object.values(e).forEach(o=>{(this.getWuxing(o.gan)===t||this.getWuxing(o.zhi)===t||i.includes(this.getWuxing(o.gan))||i.includes(this.getWuxing(o.zhi)))&&n++}),n}hasInjuryToOfficial(e){return!1}hasRobberyToWealth(e){return!1}getGanYinYang(e){return["甲","丙","戊","庚","壬"].includes(e)?"阳":"阴"}getSeasonStatus(e){return en[e]||{}}getMonthCommander(e,t){const n=tn[t];if(!n)return"未知";try{const i=e.getSolarDay().getYear(),o=e.getJulianDay();let r=null;const l=[];for(let g=0;g<24;g++)l.push(Le.fromIndex(i,g)),l.push(Le.fromIndex(i-1,g));for(const g of l){const c=g.getJulianDay();g.isJie()&&c<=o&&(!r||c>r.getJulianDay())&&(r=g)}if(!r)return"未知(节气未找到)";const d=o-r.getJulianDay();let u=0;for(const g of n)if(u+=g[1],d<u)return g[0];return n[n.length-1][0]}catch(i){return console.error("获取月令司令失败:",i),"计算出错"}}calculateSeasonInfo(e){try{const t=[],n=e.getSolarDay().getYear(),i=e.getJulianDay();for(let c=0;c<24;c++){const y=Le.fromIndex(n,c),S=y.getJulianDay(),b=S.getSolarDay();t.push({name:y.getName(),date:`${b.getYear()}-${b.getMonth().toString().padStart(2,"0")}-${b.getDay().toString().padStart(2,"0")}`,jd:S.getDay(),index:c,isJie:y.isJie()})}let o=null,r=null;for(let c=0;c<t.length;c++){const y=t[c];if(y.jd<=i)o=y;else{r=y;break}}let l=0,d=0;o&&(l=Math.floor(i-o.jd)),r&&(d=Math.floor(r.jd-i));const g=o?{0:"冬",1:"冬",2:"春",3:"春",4:"春",5:"春",6:"春",7:"春",8:"夏",9:"夏",10:"夏",11:"夏",12:"夏",13:"夏",14:"秋",15:"秋",16:"秋",17:"秋",18:"秋",19:"秋",20:"冬",21:"冬",22:"冬",23:"冬"}[o.index]:"未知";return{currentJieqi:o?o.name:"未知",nextJieqi:r?r.name:"未知",daysSincePrev:l,daysToNext:d,currentSeason:g,jieqiList:t.map(c=>({name:c.name,date:c.date}))}}catch(t){return console.error("节气信息计算错误:",t),{currentJieqi:"计算错误",nextJieqi:"计算错误",daysSincePrev:0,daysToNext:0,currentSeason:"未知",jieqiList:[]}}}calculateTraditionalDayun(e,t){try{const n=e.getSolarDay().getYear(),i=e.getJulianDay(),o=e.getLunarHour().getEightChar(),r=o.getYear().getHeavenStem().getName(),l=o.getMonth().getHeavenStem().getName(),d=o.getMonth().getEarthBranch().getName(),g=q.HEAVENLY_STEMS.indexOf(r)%2===0,c=t===Ee.MAN,y=g&&c||!g&&!c,S=this.calculateStartAge(e,t,r),b=this.generateDayunList(l,d,y);return{startAge:S,dayunList:b,isShun:y,yearGan:r,monthGanZhi:l+d}}catch(n){return console.error("传统大运计算错误:",n),{startAge:0,dayunList:[],isShun:!0,yearGan:"",monthGanZhi:""}}}calculateStartAge(e,t,n){try{const i=e.getSolarDay().getYear(),o=e.getJulianDay(),l=q.HEAVENLY_STEMS.indexOf(n)%2===0,d=t===Ee.MAN,u=l&&d||!l&&!d,g=[];for(let b of[i-1,i,i+1])for(let x=0;x<24;x++){const f=Le.fromIndex(b,x);f.isJie()&&g.push({term:f,julianDay:f.getJulianDay(),name:f.getName()})}g.sort((b,x)=>b.julianDay-x.julianDay);let c=null,y=0;if(u){for(const b of g)if(b.julianDay>o){c=b,y=b.julianDay-o;break}}else for(let b=g.length-1;b>=0;b--){const x=g[b];if(x.julianDay<o){c=x,y=o-x.julianDay;break}}if(!c)return console.warn("未找到目标节气，使用默认起运岁数"),8;const S=Math.ceil(y/3);return console.log(`起运计算详情:
        性别: ${d?"男":"女"}
        年干: ${n} (${l?"阳":"阴"})
        顺逆: ${u?"顺排":"逆排"}
        目标节气: ${c.name}
        天数差: ${y}
        起运岁数: ${S}`),Math.max(1,S)}catch(i){return console.error("起运岁数计算错误:",i),8}}generateDayunList(e,t,n){const i=q.HEAVENLY_STEMS,o=q.EARTHLY_BRANCHES,r=i.indexOf(e),l=o.indexOf(t);if(r===-1||l===-1)return console.error("月柱干支索引错误"),[];const d=[];for(let u=0;u<12;u++){let g,c;n?(g=(r+u+1)%10,c=(l+u+1)%12):(g=(r-u-1+10)%10,c=(l-u-1+12)%12);const y=i[g],S=o[c];d.push(y+S)}return d}}const pe=new an;function rn(s){const e=new Date().getFullYear();for(let t=0;t<s.length;t++){const n=s[t],i=n.year,o=i+9;if(e>=i&&e<=o)return{current:n,previous:t>0?s[t-1]:null,future:s.slice(t+1)}}return{current:s[0]||null,previous:null,future:s.slice(1)}}function on(s,e){let t=`
### 大运详细分析
`;const n=pe.getTenGod(s.ganZhi[0],e),i=pe.getTenGodForBranch(s.ganZhi[1],e);t+=`* **当前大运**: ${s.ganZhi} (天干:${n}, 地支:${i})
`;const o=new Date().getFullYear(),r=o-s.year+1;t+=`* **大运进度**: 第${r}年/共10年
`;const l=ln(s,o,e);return t+=`
* **三大运流年分析**:
`,l.forEach(d=>{const u=d.years[0].year,g=d.years[d.years.length-1].year,c=`${u}-${g}年`;t+=`
  **${d.name}** (${d.ganZhi}, ${c}):
`,d.years.forEach(y=>{const b=y.year===o?" ← 当前":"";t+=`    - ${y.year}年(${y.age}岁): ${y.ganZhi}(${y.tenGod})${b}
`})}),t}function ln(s,e,t){const n=[],i=s.years.filter(o=>o.year>=e);i.length>0&&n.push({name:"当前大运",ganZhi:s.ganZhi,years:i});for(let o=1;o<=2;o++){const r=s.year+o*10,l=cn(s.ganZhi,o),d=hn(s,e),u=[];for(let g=0;g<10;g++){const c=r+g,y=d?d+(c-e):null,S=dn(c),b=pe.getTenGod(S[0],t);u.push({year:c,age:y,ganZhi:S,tenGod:b})}n.push({name:o===1?"下一大运":"下下大运",ganZhi:l,years:u})}return n}function cn(s,e){const t=["甲","乙","丙","丁","戊","己","庚","辛","壬","癸"],n=["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"],i=s[0],o=s[1],r=t.indexOf(i),l=n.indexOf(o),d=(r+e)%10,u=(l+e)%12;return t[d]+n[u]}function un(s,e){let t=`
### 一生大运详细分析
`;const n=new Date().getFullYear();t+=`* **大运总览**: 共${s.length}个大运，从${s[0].year}年起运
`;const i=s.findIndex(o=>n>=o.year&&n<=o.year+9);return t+=`
* **所有大运详细信息**:
`,s.forEach((o,r)=>{const l=o.year,d=l+9,u=o.years&&o.years.length>0?o.years[0].age:null,g=u?u+9:null,c=pe.getTenGod(o.ganZhi[0],e),y=pe.getTenGodForBranch(o.ganZhi[1],e),b=r===i?" ← 当前大运":"",x=u&&g?`(${u}-${g}岁)`:"";t+=`
  **第${r+1}个大运** ${o.ganZhi}(${c}) ${l}-${d}年${x}${b}:
`,t+=`    天干:${c}, 地支:${y}
`,o.years&&o.years.length>0?(t+=`    流年详情:
`,o.years.forEach(f=>{const I=f.year===n?" ← 当前年份":"";t+=`      ${f.year}年(${f.age}岁): ${f.ganZhi}(${f.tenGod})${I}
`})):t+=`    流年概况: ${l}-${d}年，共10年
`}),t+=`
* **人生阶段总结**:
`,t+=`  - 青年期: 第1-3个大运 (约${s[0]?.year||"起运"}-${s[2]?.year+9||"未知"}年)
`,s.length>3&&(t+=`  - 壮年期: 第4-6个大运 (约${s[3]?.year||"未知"}-${s[5]?.year+9||"未知"}年)
`),s.length>6&&(t+=`  - 中年期: 第7-9个大运 (约${s[6]?.year||"未知"}-${s[8]?.year+9||"未知"}年)
`),s.length>9&&(t+=`  - 晚年期: 第10个大运以后 (${s[9]?.year||"未知"}年以后)
`),t}function dn(s){const e=["甲","乙","丙","丁","戊","己","庚","辛","壬","癸"],t=["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"],i=s-1984,o=i%10,r=i%12;return e[o]+t[r]}function hn(s,e){const t=s.years.find(n=>n.year===e);return t?t.age:null}function gn(s){try{const e=[{start:"立春",end:"惊蛰"},{start:"惊蛰",end:"清明"},{start:"清明",end:"立夏"},{start:"立夏",end:"芒种"},{start:"芒种",end:"小暑"},{start:"小暑",end:"立秋"},{start:"立秋",end:"白露"},{start:"白露",end:"寒露"},{start:"寒露",end:"立冬"},{start:"立冬",end:"大雪"},{start:"大雪",end:"小寒"},{start:"小寒",end:"立春"}],t={};for(const i of[s,s+1]){const o=pe.calculateSeasonInfo(Ue.fromYmdHms(i,6,1,0,0,0));o&&o.jieqiList&&o.jieqiList.forEach(r=>{const l=new Date(r.date);l.getFullYear()===i&&(t[r.name]={month:l.getMonth()+1,day:l.getDate(),year:i})})}const n=[];for(let i=0;i<12;i++){const{start:o,end:r}=e[i],l=t[o],d=t[r];if(l&&d){let u,g;if(i===11){u=`${l.month}月${l.day}日`;const c=t.立春;if(c&&c.year===s+1){const y=c.day-1;g=`${c.month}月${y>0?y:"月底"}日`}else g="2月3日"}else{u=`${l.month}月${l.day}日`;const c=d.day-1;g=`${d.month}月${c>0?c:"月底"}日`}n.push(`${u}-${g}`)}else{const u=["2月4日-3月5日","3月6日-4月4日","4月5日-5月5日","5月6日-6月5日","6月6日-7月6日","7月7日-8月7日","8月8日-9月7日","9月8日-10月7日","10月8日-11月6日","11月7日-12月6日","12月7日-1月5日","1月6日-2月3日"];n.push(u[i])}}return n}catch(e){return console.warn("计算月份日期范围失败:",e),["2月4日-3月5日","3月6日-4月4日","4月5日-5月5日","5月6日-6月5日","6月6日-7月6日","7月7日-8月7日","8月8日-9月7日","9月8日-10月7日","10月8日-11月6日","11月7日-12月6日","12月7日-1月5日","1月6日-2月3日"]}}function we(s,e=null){if(!s)return"无法获取八字数据。";let t=`### 基本信息
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
`;const n=["year","month","day","hour"],i=["年","月","日","时"];if(n.forEach((o,r)=>{const l=s.pillars[o],d=s.tenGods[o],u=s.hiddenStems&&s.hiddenStems[o];t+=`* **${i[r]}**: ${l.ganZhi}(${d})`,u&&u.length>0&&(t+=` 藏干:${u.join(",")}`),t+=`
`}),s.intelligentAnalysis){t+=`
### 专业干支关系分析
`;const o=[[s.pillars.year.gan,s.pillars.year.zhi],[s.pillars.month.gan,s.pillars.month.zhi],[s.pillars.day.gan,s.pillars.day.zhi],[s.pillars.hour.gan,s.pillars.hour.zhi]];t+=`* **四柱干支**: ${o.map(g=>g.join("")).join(" ")}
`;const r=pn(o);r.length>0&&(t+=`* **天干关系**: ${r.join("、")}
`);const l=yn(o);l.length>0&&(t+=`* **地支关系**: ${l.join("、")}
`);const d=fn(o);d.length>0&&(t+=`* **整柱关系**: ${d.join("、")}
`);const u=vn(o);u.length>0&&(t+=`* **五行生克**: ${u.join("、")}
`)}if(s.luckInfo&&s.luckInfo.cycles&&s.luckInfo.cycles.length>0){t+=`
### 大运信息
`,s.luckInfo.startInfo&&(t+=`* **起运**: ${s.luckInfo.startInfo}
`);const o=s.luckInfo.cycles.filter(l=>!l.isXiaoyun),r=rn(o);if(r.current){const l=r.current,d=s.dayMaster.gan,u=pe.getTenGod(l.ganZhi[0],d);if(t+=`* **当前大运**: ${l.ganZhi}(${u})`,l.year){const c=l.year+9;t+=` ${l.year}-${c}年`}t+=`
`;const g=r.future.slice(0,2).map(c=>{const y=pe.getTenGod(c.ganZhi[0],d);let S=`${c.ganZhi}(${y})`;if(c.year){const b=c.year+9;S+=`${c.year}-${b}年`}return S}).join(", ");g&&(t+=`* **未来大运**: ${g}
`),e&&(e.id==="ai-current-luck"||e.id==="ai-this-year")&&(t+=on(l,d)),e&&e.id==="ai-lifetime-fortune"&&(t+=un(o,d))}}if(s.liunian&&s.liunian.length>0){const o=new Date().getFullYear(),r=s.liunian.find(l=>l.year===o);r&&(t+=`
### 流年信息
* **今年**: ${r.ganZhi}(${o}年)
`)}if(e&&e.id==="ai-year-analysis"&&(t+=`
### 逐月运势分析参考
`,["正月","二月","三月","四月","五月","六月","七月","八月","九月","十月","冬月","腊月"].forEach(r=>{t+=`* **${r}**: 请根据流年与月令的关系进行分析
`})),e&&e.id==="ai-monthly-fortune"){t+=`
### 今年流月信息
`;const o=new Date().getFullYear(),r=s.dayMaster.gan,l=["正月","二月","三月","四月","五月","六月","七月","八月","九月","十月","冬月","腊月"],d=gn(o);for(let u=1;u<=12;u++)try{const g=pe.calculateLiuyue(o,u,r),c=l[u-1],y=d[u-1]||"日期计算失败";t+=`* **${c}**(${y}): ${g.ganZhi}(${g.tenGod})
`}catch(g){console.warn(`计算${u}月流月失败:`,g);const c=l[u-1];t+=`* **${c}**: 计算失败
`}}return t}function mn(s){if(!s||!s.selectedDate)return"未指定具体日期";const{selectedDate:e,selectedTime:t}=s;let n=`${e.getFullYear()}年${e.getMonth()+1}月${e.getDate()}日`;return t&&(n+=` ${t}`),n}function pn(s){const e=[],t={甲:"己",乙:"庚",丙:"辛",丁:"壬",戊:"癸"},n={甲:"庚",乙:"辛",丙:"壬",丁:"癸"},i={甲:"木",乙:"木",丙:"火",丁:"火",戊:"土",己:"土",庚:"金",辛:"金",壬:"水",癸:"水"},o={金:"木",木:"土",土:"水",水:"火",火:"金"};for(let r=0;r<4;r++)for(let l=r+1;l<4;l++){const d=s[r][0],u=s[l][0],g=["年","月","日","时"];if(t[d]===u||t[u]===d)e.push(`${g[r]}${g[l]}天干${d}${u}相合`);else if(n[d]===u||n[u]===d)e.push(`${g[r]}${g[l]}天干${d}${u}相冲`);else{const c=i[d],y=i[u];o[c]===y?e.push(`${g[r]}${g[l]}天干${d}(${c})克${u}(${y})`):o[y]===c&&e.push(`${g[r]}${g[l]}天干${u}(${y})克${d}(${c})`)}}return e}function yn(s){const e=[],t=s.map(c=>c[1]),n=["年","月","日","时"],i={子:"午",丑:"未",寅:"申",卯:"酉",辰:"戌",巳:"亥"},o={子:"丑",寅:"亥",卯:"戌",辰:"酉",巳:"申",午:"未"},r={子:"未",丑:"午",寅:"巳",卯:"辰",申:"亥",酉:"戌"},l={子:"酉",卯:"午",辰:"丑",未:"戌",寅:"亥",巳:"申"},d={申子辰:"水局",亥卯未:"木局",寅午戌:"火局",巳酉丑:"金局"};for(let c=0;c<4;c++)for(let y=c+1;y<4;y++){const S=t[c],b=t[y];i[S]===b||i[b]===S?e.push(`${n[c]}${n[y]}地支${S}${b}相冲`):o[S]===b||o[b]===S?e.push(`${n[c]}${n[y]}地支${S}${b}六合`):r[S]===b||r[b]===S?e.push(`${n[c]}${n[y]}地支${S}${b}相害`):(l[S]===b||l[b]===S)&&e.push(`${n[c]}${n[y]}地支${S}${b}相破`)}const u=[...new Set(t)];for(const[c,y]of Object.entries(d)){const S=c.split(""),b=S.filter(x=>u.includes(x)).length;if(b>=2){const x=S.filter(f=>u.includes(f));e.push(`地支${x.join("")}${b===3?"三合":"半合"}${y}`)}}return u.filter(c=>["寅","巳","申"].includes(c)).length>=2&&e.push("寅巳申无恩之刑"),u.filter(c=>["丑","戌","未"].includes(c)).length>=2&&e.push("丑戌未恃势之刑"),u.includes("子")&&u.includes("卯")&&e.push("子卯无礼之刑"),["辰","午","酉","亥"].forEach(c=>{t.filter(y=>y===c).length>1&&e.push(`${c}${c}自刑`)}),e}function fn(s){const e=[],t=["年","月","日","时"],n={甲:"木",乙:"木",丙:"火",丁:"火",戊:"土",己:"土",庚:"金",辛:"金",壬:"水",癸:"水",子:"水",丑:"土",寅:"木",卯:"木",辰:"土",巳:"火",午:"火",未:"土",申:"金",酉:"金",戌:"土",亥:"水"},i={金:"木",木:"土",土:"水",水:"火",火:"金"},o={甲:"庚",乙:"辛",丙:"壬",丁:"癸"},r={子:"午",丑:"未",寅:"申",卯:"酉",辰:"戌",巳:"亥"};for(let u=0;u<4;u++){const g=s[u][0],c=s[u][1],y=n[g],S=n[c];i[y]===S&&e.push(`${t[u]}柱${g}${c}盖头(天干克地支)`),i[S]===y&&e.push(`${t[u]}柱${g}${c}截脚(地支克天干)`)}for(let u=0;u<4;u++)for(let g=u+1;g<4;g++){const c=s[u],y=s[g],S=o[c[0]]===y[0]||o[y[0]]===c[0],b=r[c[1]]===y[1]||r[y[1]]===c[1];S&&b&&e.push(`${t[u]}${t[g]}柱${c.join("")}与${y.join("")}天克地冲(反吟)`)}const d=s.map(u=>u.join("")).reduce((u,g)=>(u[g]=(u[g]||0)+1,u),{});for(const u in d)d[u]>1&&e.push(`${u}柱重复出现${d[u]}次(伏吟)`);return e}function vn(s){const e=[],t={甲:"木",乙:"木",丙:"火",丁:"火",戊:"土",己:"土",庚:"金",辛:"金",壬:"水",癸:"水",子:"水",丑:"土",寅:"木",卯:"木",辰:"土",巳:"火",午:"火",未:"土",申:"金",酉:"金",戌:"土",亥:"水"},n={木:0,火:0,土:0,金:0,水:0};s.forEach(l=>{const d=t[l[0]],u=t[l[1]];n[d]++,n[u]++});const i=Object.entries(n).filter(([l,d])=>d>=3).map(([l])=>l),o=Object.entries(n).filter(([l,d])=>d===0).map(([l])=>l);return i.length>0&&e.push(`五行偏强: ${i.join("、")}`),o.length>0&&e.push(`五行缺失: ${o.join("、")}`),xn(n)?e.push("五行流通顺畅"):e.push("五行流通受阻"),e}function xn(s){const e=["木","火","土","金","水"];let t=0,n=0;for(let i=0;i<e.length*2;i++){const o=e[i%e.length];s[o]>0?(t++,n=Math.max(n,t)):t=0}return n>=3}const He={master:`你是一位学贯古今的命理宗师，既精通《滴天髓》、《三命通会》等八字古籍，也了解现代社会的心理学和职业发展。请根据以下信息，为用户提供一份详尽的分析。

**八字信息:**
[CHART_DATA]

---

[PROMPT_BODY]
`,build:(s,e,t="")=>{e===void 0&&(console.warn("PROMPT_BUILDER.build received an undefined question. Defaulting to empty string."),e="");let n=`**问题:**
${e}`;return t&&(n+=`

**分析要求:**
${t}`),He.master.replace("[CHART_DATA]",s).replace("[PROMPT_BODY]",n)}},st={single:[{id:"ai-mingge-zonglun",text:"命格总论",prompt:`

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
- 长期成功的保障措施`},{id:"ai-compat-custom",text:"自定义...",prompt:""}]};function Sn(s,e,t,n=null){const i=t?we(t,e):"无法获取命盘数据。",o=e.dataset.prompt,r=e.id;if(r==="ask-ai-with-date"){const l=mn(n),d=document.getElementById("customQuestion")?.value?.trim()||"",u=s&&s!=="选定日期..."?s:d,g=u?`在${l}这个时间点, ${u}`:`请详细分析${l}的运势。`;return He.build(i,g,"请结合用户提供的具体日期进行分析，越详细越好。")}if(r==="ai-mingge-zonglun"){let l=o.replace("[八字信息]",i);return s!=="命格总论"&&(l=l.replace("为用户提供一份详尽的八字命局解读。",`为用户提供一份关于"${s}"的详尽解读。`)),l}return He.build(i,s,o)}const Ie={apiUrl:{}.VITE_AI_API_URL||"https://flow.ovo.gs/ai",apiKey:{}.VITE_AI_API_KEY||"",model:{}.VITE_AI_MODEL||"sydf-v1-250520",maxTokens:8192,temperature:.7,debug:!0};console.log("🔧 AI 配置调试信息:",{apiUrl:Ie.apiUrl,model:Ie.model,hasApiKey:!!Ie.apiKey,envVars:{VITE_AI_API_URL:{}.VITE_AI_API_URL||"未设置",VITE_AI_MODEL:{}.VITE_AI_MODEL||"未设置",VITE_AI_API_KEY:{}.VITE_AI_API_KEY?"已设置":"未设置"}});class Ge{constructor(){this.currentRequest=null,this.updateConfig(),console.log("🔧 AI Service 初始化完成:",{apiUrl:this.apiUrl,model:this.model,hasApiKey:!!this.apiKey&&this.apiKey!=="",isProd:!0,currentDomain:typeof window<"u"?window.location.hostname:"unknown"})}updateConfig(){let e=null;try{const n=localStorage.getItem("ai_api_config");n&&(e=JSON.parse(n))}catch(n){console.warn("读取用户AI配置失败:",n)}e&&e.apiUrl&&e.apiKey&&e.model?(this.apiUrl=e.apiUrl,this.apiKey=e.apiKey,this.model=e.model,this.maxTokens=e.maxTokens||8192,console.log("✅ 使用用户配置的AI设置")):(this.apiUrl=Ie.apiUrl,this.apiKey=Ie.apiKey,this.model=Ie.model,this.maxTokens=Ie.maxTokens,console.log("📋 使用默认AI配置"));const t=this.validateCurrentConfig();t.isValid||console.warn("⚠️ AI 配置问题:",t.issues)}validateCurrentConfig(){const e=[],t=this.apiUrl.includes("flow.ovo.gs");return!t&&(!this.apiKey||this.apiKey==="")&&e.push("API 密钥未设置"),this.apiUrl||e.push("API 端点未设置"),this.model||e.push("模型名称未设置"),{isValid:e.length===0,issues:e,isWorkerBackend:t}}refreshConfig(){this.updateConfig(),console.log("🔄 AI配置已刷新")}async getModelList(){try{if(this.updateConfig(),this.apiUrl.includes("flow.ovo.gs"))return[];let t;this.apiUrl.includes("/chat/completions")?t=this.apiUrl.replace("/chat/completions","/models"):this.apiUrl.includes("/v1/")?t=this.apiUrl.replace(/\/v1\/.*$/,"/v1/models"):t=this.apiUrl.replace(/\/$/,"")+"/models";const n={"Content-Type":"application/json"};this.apiKey&&this.apiKey!==""&&(n.Authorization=`Bearer ${this.apiKey}`);const i=await fetch(t,{method:"GET",headers:n});if(!i.ok)return console.warn("无法获取模型列表，返回空列表"),[];const o=await i.json();return o.data&&Array.isArray(o.data)?o.data.map(r=>({id:r.id,name:r.id,description:r.description||"可用模型"})):[]}catch(e){return console.error("获取模型列表失败:",e),[]}}filterThinkTags(e){if(!e)return"";const t=e.length,n=e.replace(/<think>[\s\S]*?<\/think>/gi,"").trim();return t!==n.length&&console.log("🧠 AI服务源头过滤思考标签:",{原始长度:t,过滤后长度:n.length,过滤掉的内容长度:t-n.length}),n}async*queryAI(e,t={}){try{this.updateConfig(),this.currentRequest&&this.currentRequest.abort();const n=new AbortController;this.currentRequest=n;const i=this.apiUrl.includes("flow.ovo.gs");let o;i?o={prompt:e,model:this.model}:o={model:this.model,messages:[{role:"user",content:e}],max_tokens:t.maxTokens||8192,temperature:t.temperature||.7,stream:!0};const r={"Content-Type":"application/json"};this.apiKey&&this.apiKey!==""&&!this.apiUrl.includes("flow.ovo.gs")&&(r.Authorization=`Bearer ${this.apiKey}`);const l=await fetch(this.apiUrl,{method:"POST",headers:r,body:JSON.stringify(o),signal:n.signal});if(!l.ok){let y="AI服务暂时不可用，请稍后再试";throw l.status===429?y="请求过于频繁，请稍等片刻再试":l.status>=500?y="服务器暂时繁忙，请稍后再试":l.status===401&&(y="API 密钥无效"),new Error(`${y} (状态码: ${l.status})`)}if(!l.body)throw new Error("Response body is null");const d=l.body.getReader(),u=new TextDecoder;let g="",c="";try{for(;;){const{done:y,value:S}=await d.read();if(y){if(g.trim()){const x=this.parseStreamChunk(g);x&&(c+=x,yield x)}break}g+=u.decode(S,{stream:!0});const b=g.split(`
`);g=b.pop()||"";for(const x of b){const f=this.parseStreamChunk(x);f&&(c+=f,yield f)}}}finally{d.releaseLock(),this.currentRequest=null,c.includes("<think>")&&console.log("🧠 AI响应包含思考标签，建议在前端进行完整过滤")}}catch(n){throw this.currentRequest=null,n.name!=="AbortError"&&console.error("AI 请求失败:",n),n}}parseStreamChunk(e){const t=e.trim();if(!t||!t.startsWith("data: "))return null;const n=t.slice(6);if(n==="[DONE]")return null;try{const i=JSON.parse(n);if(i.choices&&i.choices[0]&&i.choices[0].delta&&i.choices[0].delta.content)return i.choices[0].delta.content}catch(i){console.debug("跳过非 JSON 数据:",n,i)}return null}async queryAIComplete(e,t={}){let n="";for await(const i of this.queryAI(e,t))n+=i;return this.filterThinkTags(n)}cancelRequest(){this.currentRequest&&(this.currentRequest.abort(),this.currentRequest=null)}buildBaziPrompt(e,t,n=""){let o=`你是一位学贯古今的命理宗师，既精通《滴天髓》、《三命通会》等八字古籍，也了解现代社会的心理学和职业发展。请基于以下专业的八字干支关系信息，为用户提供一份详尽的分析。

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

请确保分析内容专业深入，指导建议实用可行，最终目的是帮助双方建立更和谐的关系。`}getPromptConfig(){return st}buildPrompt(e,t,n,i=null){return Sn(e,t,n,i)}buildPromptFromConfig(e,t,n){const i=st.single.find(o=>o.id===t.id);if(i){const o=n?we(n,t):"无法获取命盘数据。",r=new Date().toLocaleString("zh-CN");return t.id==="ai-mingge-zonglun"?i.prompt.replace("[八字信息]",o):`你是一位学贯古今的命理宗师，既精通《滴天髓》、《三命通会》等八字古籍，也了解现代社会的心理学和职业发展。请根据以下信息，为用户提供一份详尽的分析。

**当前时间:** ${r}

**八字信息:**
${o}

**问题:** ${e}

**分析要求:**
${i.prompt}`}return this.buildBaziPrompt(we(n,t),e)}}const ve=new Ge,_n=Object.freeze(Object.defineProperty({__proto__:null,AIService:Ge,aiService:ve},Symbol.toStringTag,{value:"Module"}));function In(){const s=D(""),e=D(!1),t=D("");return{aiResponse:s,isAIThinking:e,aiError:t,askAI:async(o,r="custom",l,d,u=!1)=>{if(!d){t.value="请先进行排盘计算",re("请先进行排盘计算");return}e.value=!0,t.value="",u||(s.value="");try{const g=l(o,r,d);for await(const c of ve.queryAI(g))s.value+=c;e.value=!1}catch(g){console.error("AI分析失败:",g),t.value=g.message||"AI分析失败",re(t.value),e.value=!1}},clearAIResponse:()=>{s.value="",t.value=""}}}const Ne=ot("ziWei",()=>{const s=zt({isLunar:!1}),{person1:e,person2:t,enableSecondPerson:n,result1:i,result2:o,isCalculating:r,calculationError:l,canCalculate:d,hasResults:u,resetData:g}=s,c=In(),{aiResponse:y,isAIThinking:S,aiError:b,askAI:x,clearAIResponse:f}=c,m=he(()=>ze(i.value)),I=he(()=>ze(o.value)),L=async()=>{if(!d.value)return re("请填写完整的出生信息"),!1;if(r.value)return!1;r.value=!0,l.value="";const C="ziwei-calculation";try{return fe.showLoading("正在计算紫薇斗数...",C),fe.updateLoadingMessage("正在计算第一人紫薇斗数...",C),i.value=Qe(parseInt(e.value.year),parseInt(e.value.month),parseInt(e.value.day),parseInt(e.value.timeIndex),e.value.gender,e.value.isLunar),n.value?(fe.updateLoadingMessage("正在计算第二人紫薇斗数...",C),o.value=Qe(parseInt(t.value.year),parseInt(t.value.month),parseInt(t.value.day),parseInt(t.value.timeIndex),t.value.gender,t.value.isLunar)):o.value=null,fe.hideLoading(C),$e("紫薇斗数计算完成！"),!0}catch(G){fe.hideLoading(C),console.error("紫薇斗数计算失败:",G);const O=G.message||"紫薇斗数计算失败，请检查输入信息";return l.value=O,re(O),Ye.reportError(G,"紫薇斗数计算"),!1}finally{r.value=!1}},N=async(C,G="custom",O=!1)=>{const H={person1:m.value,person2:n.value?I.value:null,enableSecondPerson:n.value};await x(C,G,(F,de,le)=>le.enableSecondPerson&&le.person2?Ut(F,le.person1,le.person2):Lt(de,F,le.person1),H,O)},Q=()=>{g(),f()},z=()=>{i.value=null,o.value=null,l.value="",y.value="",b.value="",r.value=!1,S.value=!1,qt(),Qt(),E()},j=()=>n.value&&o.value?tt(e.value,t.value):i.value?tt(e.value):window.location.origin+window.location.pathname,J=async()=>{try{const C=Ft();if(C)return e.value={...e.value,...C.person1},t.value={...t.value,...C.person2},n.value=!0,await L(),!0;const G=Kt();if(G)return e.value={...e.value,...G},await L(),!0}catch(C){console.error("从URL恢复紫薇斗数数据失败:",C)}return!1},te=()=>{try{n.value&&d.value?Wt(e.value,t.value):d.value&&Ht(e.value)}catch(C){console.error("保存紫薇斗数数据到URL失败:",C)}},ie=(C,G=null)=>{try{let O="紫薇排盘";G?O=`${C||"第一人"}与${G||"第二人"}的紫薇合盘分析`:C&&(O=`${C}的紫薇排盘`),document.title=O;const H=document.querySelector('meta[property="og:title"]');H&&H.setAttribute("content",O);const se=document.querySelector('meta[name="description"]');if(se&&C){let F="专业的AI紫薇斗数排盘和命理分析工具";G?F=`${C}与${G}的紫薇斗数合盘分析，专业AI命理解读`:F=`${C}的紫薇斗数排盘结果，专业AI命理分析`,se.setAttribute("content",F)}}catch(O){console.error("更新页面标题失败:",O)}},E=()=>{try{document.title="紫薇排盘";const C=document.querySelector('meta[property="og:title"]');C&&C.setAttribute("content","紫薇排盘");const G=document.querySelector('meta[name="description"]');G&&G.setAttribute("content","专业的AI紫薇斗数排盘和命理分析工具")}catch(C){console.error("重置页面标题失败:",C)}};return _e([e,t,n],()=>{te()},{deep:!0}),{person1:e,person2:t,enableSecondPerson:n,ziWeiResult1:i,ziWeiResult2:o,isCalculating:r,calculationError:l,aiResponse:y,isAIThinking:S,aiError:b,canCalculate:d,hasResults:u,displayData1:m,displayData2:I,calculateZiWei:L,askAI:N,resetData:Q,clearResults:z,clearAIResponse:f,restoreDataFromUrl:J,generateShareUrl:j,updatePageTitle:ie,resetPageTitle:E}});const $n={class:"input-card"},bn={class:"person-section"},wn={class:"form-group"},kn={class:"custom-date-row"},An={class:"custom-date-field"},Pn={class:"custom-date-field"},Cn={class:"custom-date-field"},Tn={class:"form-group"},En=["value"],Ln={class:"form-group"},Un={class:"gender-buttons"},Mn={key:0,class:"error-message"},Gn={class:"compatibility-section"},Nn={class:"compatibility-toggle"},jn={key:1,class:"person-section second-person"},Dn={class:"form-group"},Rn={class:"custom-date-row"},Bn={class:"custom-date-field"},On={class:"custom-date-field"},Yn={class:"custom-date-field"},Zn={class:"form-group"},Hn=["value"],Kn={class:"form-group"},qn={class:"gender-buttons"},Vn=["disabled"],Jn={__name:"ZiWeiForm",setup(s){const e=Ne(),t=[{name:"早子时",range:"00:00-01:00"},{name:"丑时",range:"01:00-03:00"},{name:"寅时",range:"03:00-05:00"},{name:"卯时",range:"05:00-07:00"},{name:"辰时",range:"07:00-09:00"},{name:"巳时",range:"09:00-11:00"},{name:"午时",range:"11:00-13:00"},{name:"未时",range:"13:00-15:00"},{name:"申时",range:"15:00-17:00"},{name:"酉时",range:"17:00-19:00"},{name:"戌时",range:"19:00-21:00"},{name:"亥时",range:"21:00-23:00"},{name:"晚子时",range:"23:00-24:00"}],n=()=>{if(e.enableSecondPerson)if(e.person1.name||e.person2.name){const o=e.person1.name||"第一人",r=e.person2.name||"第二人";e.updatePageTitle(o,r)}else e.resetPageTitle();else e.person1.name?e.updatePageTitle(e.person1.name):e.resetPageTitle()};_e([()=>e.person1.name,()=>e.person2.name,()=>e.enableSecondPerson],()=>{n()},{immediate:!0});const i=async()=>{await e.calculateZiWei()};return(o,r)=>ee((_(),$("div",$n,[r[29]||(r[29]=a("h1",null,"紫薇斗数排盘",-1)),a("div",bn,[a("div",wn,[r[15]||(r[15]=a("label",{for:"name"},"姓名（选填）",-1)),ee(a("input",{id:"name","onUpdate:modelValue":r[0]||(r[0]=l=>P(e).person1.name=l),type:"text",placeholder:"请输入姓名"},null,512),[[ue,P(e).person1.name]])]),a("div",kn,[a("div",An,[r[16]||(r[16]=a("label",{for:"year"},"年",-1)),ee(a("input",{id:"year","onUpdate:modelValue":r[1]||(r[1]=l=>P(e).person1.year=l),type:"number",placeholder:"2000",min:"1900",max:"2100",class:"custom-date-input"},null,512),[[ue,P(e).person1.year]])]),a("div",Pn,[r[17]||(r[17]=a("label",{for:"month"},"月",-1)),ee(a("input",{id:"month","onUpdate:modelValue":r[2]||(r[2]=l=>P(e).person1.month=l),type:"number",placeholder:"1-12",min:"1",max:"12",class:"custom-date-input"},null,512),[[ue,P(e).person1.month]])]),a("div",Cn,[r[18]||(r[18]=a("label",{for:"day"},"日",-1)),ee(a("input",{id:"day","onUpdate:modelValue":r[3]||(r[3]=l=>P(e).person1.day=l),type:"number",placeholder:"1-31",min:"1",max:"31",class:"custom-date-input"},null,512),[[ue,P(e).person1.day]])])]),a("div",Tn,[r[19]||(r[19]=a("label",{for:"hour"},"时辰",-1)),ee(a("select",{id:"hour","onUpdate:modelValue":r[4]||(r[4]=l=>P(e).person1.timeIndex=l)},[(_(),$(K,null,W(t,(l,d)=>a("option",{key:d,value:d},v(l.name)+" ("+v(l.range)+") ",9,En)),64))],512),[[Oe,P(e).person1.timeIndex]])]),a("div",Ln,[r[20]||(r[20]=a("label",null,"性别",-1)),a("div",Un,[a("button",{type:"button",class:ne(["gender-button",{selected:P(e).person1.gender==="male"}]),onClick:r[5]||(r[5]=l=>P(e).person1.gender="male")}," 男 ",2),a("button",{type:"button",class:ne(["gender-button",{selected:P(e).person1.gender==="female"}]),onClick:r[6]||(r[6]=l=>P(e).person1.gender="female")}," 女 ",2)])])]),P(e).calculationError?(_(),$("div",Mn,v(P(e).calculationError),1)):M("",!0),a("div",Gn,[a("label",Nn,[ee(a("input",{type:"checkbox","onUpdate:modelValue":r[7]||(r[7]=l=>P(e).enableSecondPerson=l)},null,512),[[pt,P(e).enableSecondPerson]]),r[21]||(r[21]=Y(" 启用合盘分析 "))])]),P(e).enableSecondPerson?(_(),$("div",jn,[r[28]||(r[28]=a("h3",null,"第二人信息",-1)),a("div",Dn,[r[22]||(r[22]=a("label",{for:"name2"},"姓名（选填）",-1)),ee(a("input",{id:"name2","onUpdate:modelValue":r[8]||(r[8]=l=>P(e).person2.name=l),type:"text",placeholder:"请输入第二人姓名"},null,512),[[ue,P(e).person2.name]])]),a("div",Rn,[a("div",Bn,[r[23]||(r[23]=a("label",{for:"year2"},"年",-1)),ee(a("input",{id:"year2","onUpdate:modelValue":r[9]||(r[9]=l=>P(e).person2.year=l),type:"number",placeholder:"2000",min:"1900",max:"2100",class:"custom-date-input"},null,512),[[ue,P(e).person2.year]])]),a("div",On,[r[24]||(r[24]=a("label",{for:"month2"},"月",-1)),ee(a("input",{id:"month2","onUpdate:modelValue":r[10]||(r[10]=l=>P(e).person2.month=l),type:"number",placeholder:"1-12",min:"1",max:"12",class:"custom-date-input"},null,512),[[ue,P(e).person2.month]])]),a("div",Yn,[r[25]||(r[25]=a("label",{for:"day2"},"日",-1)),ee(a("input",{id:"day2","onUpdate:modelValue":r[11]||(r[11]=l=>P(e).person2.day=l),type:"number",placeholder:"1-31",min:"1",max:"31",class:"custom-date-input"},null,512),[[ue,P(e).person2.day]])])]),a("div",Zn,[r[26]||(r[26]=a("label",{for:"hour2"},"时辰",-1)),ee(a("select",{id:"hour2","onUpdate:modelValue":r[12]||(r[12]=l=>P(e).person2.timeIndex=l)},[(_(),$(K,null,W(t,(l,d)=>a("option",{key:d,value:d},v(l.name)+" ("+v(l.range)+") ",9,Hn)),64))],512),[[Oe,P(e).person2.timeIndex]])]),a("div",Kn,[r[27]||(r[27]=a("label",null,"性别",-1)),a("div",qn,[a("button",{type:"button",class:ne(["gender-button",{selected:P(e).person2.gender==="male"}]),onClick:r[13]||(r[13]=l=>P(e).person2.gender="male")}," 男 ",2),a("button",{type:"button",class:ne(["gender-button",{selected:P(e).person2.gender==="female"}]),onClick:r[14]||(r[14]=l=>P(e).person2.gender="female")}," 女 ",2)])])])):M("",!0),a("button",{class:"primary-button",disabled:!P(e).canCalculate||P(e).isCalculating,onClick:i},v(P(e).isCalculating?"计算中...":"开始排盘"),9,Vn)],512)),[[mt,!P(e).hasResults]])}},Wn=ke(Jn,[["__scopeId","data-v-1b651200"]]);const Fn={class:"api-key-config"},Qn={class:"modal-body"},zn={class:"form-group"},Xn={class:"form-group"},es={class:"form-group"},ts={class:"model-input-group"},ns=["value"],ss=["disabled","title"],as={class:"form-hint"},rs={class:"form-group"},Me="ai_api_config",os={__name:"ApiKeyConfig",props:{visible:{type:Boolean,default:!1}},emits:["update:visible","config-saved"],setup(s,{expose:e,emit:t}){const n=s,i=t,o=D(n.visible),r=yt({apiUrl:"",apiKey:"",model:"",maxTokens:8192}),l=D([]),d=D(!1);new Ge,_e(()=>n.visible,x=>{o.value=x,x&&(u(),setTimeout(()=>{r.apiUrl&&r.apiKey&&y()},100))});const u=()=>{try{const x=localStorage.getItem(Me);if(x){const f=JSON.parse(x);Object.assign(r,{apiUrl:f.apiUrl||"",apiKey:f.apiKey||"",model:f.model||"",maxTokens:f.maxTokens||8192})}}catch(x){console.error("加载配置失败:",x)}},g=()=>{try{if(!r.apiUrl.trim()){re("请输入 API 地址");return}if(!r.apiKey.trim()){re("请输入 API 密钥");return}if(!r.model.trim()){re("请输入模型名称");return}try{new URL(r.apiUrl)}catch{re("请输入有效的 API 地址");return}const x={apiUrl:r.apiUrl.trim(),apiKey:r.apiKey.trim(),model:r.model.trim(),maxTokens:r.maxTokens};localStorage.setItem(Me,JSON.stringify(x)),$e("配置保存成功"),i("config-saved",x),S()}catch(x){console.error("保存配置失败:",x),re("保存配置失败")}},c=()=>{r.apiUrl="",r.apiKey="",r.model="",r.maxTokens=8192;try{localStorage.removeItem(Me),$e("配置已重置，将使用默认AI服务"),i("config-saved",null),S()}catch(x){console.error("重置配置失败:",x),re("重置配置失败")}},y=async()=>{if(!r.apiUrl.trim()||!r.apiKey.trim()){re("请先填写 API 地址和密钥");return}d.value=!0;try{const x=new Ge;x.apiUrl=r.apiUrl.trim(),x.apiKey=r.apiKey.trim();const f=await x.getModelList();l.value=f,f.length>0?$e(`成功获取 ${f.length} 个可用模型`):re("未获取到可用模型，请手动输入模型名称（如：gpt-3.5-turbo、gpt-4 等）")}catch(x){console.error("获取模型列表失败:",x),re("获取模型列表失败，请检查 API 配置")}finally{d.value=!1}},S=()=>{o.value=!1,i("update:visible",!1)};return e({getCurrentConfig:()=>{try{const x=localStorage.getItem(Me);return x?JSON.parse(x):null}catch{return null}}}),(x,f)=>(_(),$("div",Fn,[o.value?(_(),$("div",{key:0,class:"modal-overlay",onClick:S},[a("div",{class:"modal-content",onClick:f[5]||(f[5]=it(()=>{},["stop"]))},[a("div",{class:"modal-header"},[f[6]||(f[6]=a("h3",null,"配置 AI API",-1)),a("button",{class:"close-btn",onClick:S},"×")]),a("div",Qn,[a("div",zn,[f[7]||(f[7]=a("label",{for:"apiUrl"},"API 地址",-1)),ee(a("input",{id:"apiUrl","onUpdate:modelValue":f[0]||(f[0]=m=>r.apiUrl=m),type:"text",placeholder:"https://api.openai.com/v1/chat/completions",class:"form-input"},null,512),[[ue,r.apiUrl]]),f[8]||(f[8]=a("small",{class:"form-hint"},"兼容 OpenAI 格式的 API 地址",-1))]),a("div",Xn,[f[9]||(f[9]=a("label",{for:"apiKey"},"API 密钥",-1)),ee(a("input",{id:"apiKey","onUpdate:modelValue":f[1]||(f[1]=m=>r.apiKey=m),type:"password",placeholder:"sk-...",class:"form-input"},null,512),[[ue,r.apiKey]]),f[10]||(f[10]=a("small",{class:"form-hint"},"您的 API 密钥，将安全保存在本地浏览器",-1))]),a("div",es,[f[13]||(f[13]=a("label",{for:"model"},"模型名称",-1)),a("div",ts,[l.value.length>0?ee((_(),$("select",{key:0,id:"model","onUpdate:modelValue":f[2]||(f[2]=m=>r.model=m),class:"form-select"},[f[11]||(f[11]=a("option",{value:""},"请选择模型",-1)),(_(!0),$(K,null,W(l.value,m=>(_(),$("option",{key:m.id,value:m.id},v(m.name)+" - "+v(m.description),9,ns))),128))],512)),[[Oe,r.model]]):ee((_(),$("input",{key:1,id:"model","onUpdate:modelValue":f[3]||(f[3]=m=>r.model=m),type:"text",placeholder:"gpt-3.5-turbo",class:"form-input"},null,512)),[[ue,r.model]]),a("button",{type:"button",class:"refresh-models-btn",onClick:y,disabled:d.value||!r.apiUrl||!r.apiKey,title:d.value?"正在获取模型列表...":"刷新模型列表"},[(_(),$("svg",{class:ne(["refresh-icon",{spinning:d.value}]),viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},f[12]||(f[12]=[a("path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"},null,-1),a("path",{d:"M21 3v5h-5"},null,-1),a("path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"},null,-1),a("path",{d:"M3 21v-5h5"},null,-1)]),2))],8,ss)]),a("small",as,v(l.value.length>0?"从可用模型中选择，或点击刷新按钮获取最新列表":"使用的模型名称，填写API地址和密钥后可获取可用模型列表"),1)]),a("div",rs,[f[14]||(f[14]=a("label",{for:"maxTokens"},"最大 Token 数",-1)),ee(a("input",{id:"maxTokens","onUpdate:modelValue":f[4]||(f[4]=m=>r.maxTokens=m),type:"number",placeholder:"8192",min:"100",max:"32000",class:"form-input"},null,512),[[ue,r.maxTokens,void 0,{number:!0}]]),f[15]||(f[15]=a("small",{class:"form-hint"},"单次请求的最大 Token 数量",-1))])]),a("div",{class:"modal-footer"},[a("button",{class:"btn btn-secondary",onClick:c},"重置"),a("button",{class:"btn btn-primary",onClick:g},"保存配置")])])])):M("",!0)]))}},is=ke(os,[["__scopeId","data-v-69757954"]]);const ls={class:"action-buttons"},cs=["disabled"],us=["disabled"],ds=["onClick","disabled"],hs={key:0,class:"btn-icon",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},gs=["d"],ms={__name:"ActionButtons",props:{showRecalculate:{type:Boolean,default:!0},recalculateText:{type:String,default:"重新排盘"},showApiConfig:{type:Boolean,default:!0},apiConfigText:{type:String,default:"配置 Key"},customButtons:{type:Array,default:()=>[]},loading:{type:Boolean,default:!1},clearResultsMethod:{type:Function,default:null}},emits:["recalculate","api-config","custom-button","config-saved"],setup(s,{expose:e,emit:t}){const n=s,i=t,o=D(!1),r=()=>{n.clearResultsMethod&&n.clearResultsMethod();const g=new URL(window.location);g.search="",window.history.replaceState({},"",g.toString()),window.scrollTo({top:0,behavior:"smooth"}),$e("已清空结果，请重新输入信息进行排盘"),i("recalculate")},l=()=>{o.value=!0,i("api-config")},d=(g,c)=>{g.handler&&typeof g.handler=="function"&&g.handler(),i("custom-button",{button:g,index:c})},u=g=>{$e("API 配置已保存"),i("config-saved",g)};return e({openApiConfig:()=>{o.value=!0},closeApiConfig:()=>{o.value=!1}}),(g,c)=>(_(),$(K,null,[a("div",ls,[s.showRecalculate?(_(),$("button",{key:0,class:"action-btn btn-secondary",onClick:r,disabled:s.loading},[c[1]||(c[1]=a("svg",{class:"btn-icon",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},[a("path",{d:"M1 4v6h6"}),a("path",{d:"M23 20v-6h-6"}),a("path",{d:"M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"})],-1)),Y(" "+v(s.recalculateText),1)],8,cs)):M("",!0),s.showApiConfig?(_(),$("button",{key:1,class:"action-btn btn-primary",onClick:l,disabled:s.loading},[c[2]||(c[2]=a("svg",{class:"btn-icon",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},[a("path",{d:"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"}),a("path",{d:"M9 12l2 2 4-4"})],-1)),Y(" "+v(s.apiConfigText),1)],8,us)):M("",!0),(_(!0),$(K,null,W(s.customButtons,(y,S)=>(_(),$("button",{key:S,class:ne(["action-btn",y.type||"btn-secondary"]),onClick:b=>d(y,S),disabled:s.loading||y.disabled},[y.icon?(_(),$("svg",hs,[a("path",{d:y.icon},null,8,gs)])):M("",!0),Y(" "+v(y.text),1)],10,ds))),128))]),(_(),lt(ct,{to:"body"},[xe(is,{visible:o.value,"onUpdate:visible":c[0]||(c[0]=y=>o.value=y),onConfigSaved:u},null,8,["visible"])]))],64))}},ps=ke(ms,[["__scopeId","data-v-6750d609"]]);const ys={class:"ziwei-result-wrapper"},fs={key:0,class:"loading-container"},vs={key:1,class:"error-container"},xs={key:2,class:"result-card"},Ss={class:"basic-info-section"},_s={key:0,class:"compatibility-basic-info"},Is={class:"person-basic-info"},$s={class:"basic-info-text"},bs={class:"value"},ws={class:"value"},ks={class:"value"},As={class:"value"},Ps={class:"value"},Cs={class:"value"},Ts={class:"value"},Es={class:"person-basic-info"},Ls={class:"basic-info-text"},Us={class:"value"},Ms={class:"value"},Gs={class:"value"},Ns={class:"value"},js={class:"value"},Ds={class:"value"},Rs={class:"value"},Bs={key:1},Os={class:"basic-info-text"},Ys={class:"value"},Zs={class:"value"},Hs={class:"value"},Ks={class:"value"},qs={class:"value"},Vs={class:"value"},Js={class:"value"},Ws={class:"value"},Fs={class:"mutagen-container"},Qs={class:"mutagen-grid"},zs={class:"mutagen-item"},Xs={class:"mutagen-star"},ea={class:"mutagen-item"},ta={class:"mutagen-star"},na={class:"mutagen-item"},sa={class:"mutagen-star"},aa={class:"mutagen-item"},ra={class:"mutagen-star"},oa={class:"chart-section"},ia={key:0,class:"compatibility-charts"},la={class:"person-chart-container"},ca={class:"astrolabe-grid compact"},ua=["onClick"],da={class:"palace-header"},ha={class:"palace-name"},ga={key:0,class:"body-palace-mark"},ma={class:"palace-stems"},pa={class:"palace-stars"},ya={class:"palace-details compact"},fa={key:0,class:"changsheng"},va={key:1,class:"boshi"},xa={key:0,class:"ages"},Sa={class:"person-chart-container"},_a={class:"astrolabe-grid compact"},Ia=["onClick"],$a={class:"palace-header"},ba={class:"palace-name"},wa={key:0,class:"body-palace-mark"},ka={class:"palace-stems"},Aa={class:"palace-stars"},Pa={class:"palace-details compact"},Ca={key:0,class:"changsheng"},Ta={key:1,class:"boshi"},Ea={key:0,class:"ages"},La={class:"compatibility-analysis"},Ua={class:"compatibility-analysis-content"},Ma={key:1,class:"professional-chart-container"},Ga={class:"astrolabe-grid"},Na=["onClick"],ja={class:"palace-header"},Da={class:"palace-name"},Ra={key:0,class:"body-palace-mark"},Ba={class:"palace-stems"},Oa={class:"palace-stars"},Ya={class:"palace-details"},Za={key:0,class:"changsheng"},Ha={key:1,class:"boshi"},Ka={key:2,class:"jiangqian"},qa={key:0,class:"ages"},Va={key:1,class:"empty-palace"},Ja={key:0,class:"detailed-analysis-text"},Wa={class:"analysis-text-section"},Fa={class:"analysis-text-content"},Qa={class:"analysis-text-section"},za={class:"analysis-text-content"},Xa={class:"analysis-text-section"},er={class:"analysis-text-content"},tr={class:"analysis-text-section"},nr={class:"analysis-text-content"},sr={class:"palace-modal-header"},ar={class:"palace-modal-content"},rr={class:"palace-basic-info"},or={key:0},ir={key:1},lr={key:2},cr={key:0,class:"palace-stars-detail"},ur={key:0,class:"star-category"},dr={class:"star-list"},hr={class:"star-name"},gr={key:0,class:"star-brightness"},mr={key:1,class:"star-mutagen"},pr={key:1,class:"star-category"},yr={class:"star-list"},fr={class:"star-name"},vr={key:0,class:"star-brightness"},xr={key:1,class:"star-mutagen"},Sr={key:2,class:"star-category"},_r={class:"star-list"},Ir={class:"star-name"},$r={key:0,class:"star-brightness"},br={key:1,class:"star-mutagen"},wr={key:1,class:"palace-analysis"},kr={class:"palace-analysis-content"},Ar={class:"palace-meaning"},Pr={class:"palace-star-analysis"},Cr={class:"palace-fortune-analysis"},Tr={class:"palace-advice"},Er={class:"palace-other-info"},Lr={key:0},Ur={key:1},Mr={key:2},Gr={key:3},Nr={key:4},jr={__name:"ZiWeiResult",setup(s){const e=Ne(),t=he(()=>e.displayData1),n=D(null),i=k=>{const h=["star-item"];return k.type&&h.push(`star-${k.type}`),k.brightness&&h.push(`brightness-${k.brightness}`),k.mutagen&&h.push(`mutagen-${k.mutagen}`),h.join(" ")},o=k=>({化禄:"lu",化权:"quan",化科:"ke",化忌:"ji"})[k]||"",r=k=>{n.value=k},l=()=>{n.value=null},d=()=>{if(!t.value?.palaces)return"未知";const k=t.value.palaces.find(w=>w.name==="命宫");if(!k)return"未知";const p=(k.allStars||[]).filter(w=>w.type==="major");return p.length===0?"无主星":p.map(w=>w.name).join("、")},u=()=>{if(!t.value?.palaces)return"未知";const k=t.value.palaces.find(w=>w.isBodyPalace);if(!k)return"未知";const p=(k.allStars||[]).filter(w=>w.type==="major");return p.length===0?"无主星":p.map(w=>w.name).join("、")},g=()=>{if(!t.value?.palaces)return"未知";const k=t.value.palaces.find(U=>U.name==="命宫");if(!k)return"未知";const h=k.majorStars||[];if(h.length===0)return"平常格局";const p=h.some(U=>["紫微","天府","太阳","武曲"].includes(U.name)),w=h.some(U=>["庙","旺"].includes(U.brightness));return p&&w?"上等格局":p||w?"中等格局":"平常格局"},c=()=>{if(!t.value?.palaces)return"未知";const k=t.value.palaces.find(w=>w.name==="命宫");if(!k)return"未知";const h=k.majorStars||[];if(h.length===0)return"空宫格局";const p=h.map(w=>w.name);return p.includes("紫微")?"帝王格局":p.includes("天府")?"财库格局":p.includes("太阳")?"光明格局":p.includes("武曲")?"财星格局":p.includes("天同")?"福德格局":p.includes("廉贞")?"权威格局":"一般格局"},y=()=>{if(!t.value?.palaces)return[];const k=[];return["命宫","财帛宫","官禄宫","夫妻宫"].forEach(p=>{const w=t.value.palaces.find(U=>U.name===p);if(w&&w.allStars){const U=w.allStars.filter(V=>V.type==="major");if(U.length>0){const V=U.map(ce=>ce.name);let R=S(p,V);k.push({palace:p,stars:V,description:R})}}}),k},S=(k,h)=>{const w={命宫:{紫微:"具有领导才能，天生贵气，适合管理职位",天机:"聪明机智，善于策划，适合智力工作",太阳:"性格开朗，有正义感，适合公职或教育",武曲:"意志坚强，理财能力佳，适合金融业",天同:"性格温和，人缘好，适合服务业",廉贞:"个性刚强，有魄力，适合执法或军警"},财帛宫:{紫微:"财运亨通，有贵人相助，财源广进",武曲:"理财有道，投资眼光佳，财富稳定增长",天府:"财库丰厚，善于积累，晚年富足",太阴:"财运平稳，适合稳健投资"},官禄宫:{紫微:"事业有成，适合领导职位，官运亨通",武曲:"事业稳定，在金融或技术领域有所成就",天机:"适合策划、咨询类工作，智慧型事业",太阳:"适合公职或教育事业，声名远播"},夫妻宫:{紫微:"配偶条件佳，婚姻美满，夫妻恩爱",天同:"夫妻和睦，感情稳定，家庭幸福",太阴:"配偶温柔体贴，感情深厚",天府:"配偶贤能，家庭富足"}}[k]||{};return h.map(V=>w[V]||`${V}星坐守，影响${k}运势`).join("；")||`${h.join("、")}星坐守${k}，需结合整体命盘分析`},b=()=>{if(!t.value?.mutagens||!t.value?.palaces)return[];const k=[],h=t.value.mutagens;return Object.entries(h).forEach(([p,w])=>{if(w&&w!=="无"){const U=x(w),V=f(p,w,U);k.push({type:p,name:V.name,star:w,palace:U||"未知宫位",description:V.description})}}),k},x=k=>{if(!t.value?.palaces)return null;for(const h of t.value.palaces)if((h.allStars||[]).some(w=>w.name===k))return h.name;return null},f=(k,h,p)=>{const w={lu:"化禄",quan:"化权",ke:"化科",ji:"化忌"},U={lu:`${h}化禄在${p}，主财运亨通，此宫位运势佳，有贵人相助`,quan:`${h}化权在${p}，主权威增强，此宫位有掌控力，适合发挥领导才能`,ke:`${h}化科在${p}，主名声显达，此宫位有贵气，利于学业和声誉`,ji:`${h}化忌在${p}，主阻碍较多，此宫位需谨慎，宜化解不利因素`};return{name:w[k]||k,description:U[k]||`${h}${w[k]}的影响需要具体分析`}},m=()=>{const k=t.value?.horoscope?.currentAge||0,p=Math.floor((k-6)/10),w=["命宫","父母宫","福德宫","田宅宫","官禄宫","奴仆宫","迁移宫","疾厄宫","财帛宫","子女宫","夫妻宫","兄弟宫"],U=p%12;return w[U]||"未知"},I=()=>{const k=new Date().getFullYear(),h=t.value?.basicInfo?.birthDate?.year||k,p=k-h,w=["命宫","兄弟宫","夫妻宫","子女宫","财帛宫","疾厄宫","迁移宫","奴仆宫","官禄宫","田宅宫","福德宫","父母宫"],U=p%12;return w[U]||"未知"},L=()=>{const k=t.value?.horoscope?.currentAge||0;return k<30?"青年时期，宜努力学习，积累经验，为未来打好基础。注意身体健康，培养良好习惯。":k<50?"中年时期，事业发展的关键阶段，宜把握机会，稳健前进。注意家庭和事业的平衡。":"成熟时期，宜发挥经验优势，传承智慧，享受人生。注意身体保养，颐养天年。"},N=k=>{if(!k||k.length===0)return[];const h={紫微:10,天机:10,太阳:10,武曲:10,天同:10,廉贞:10,天府:10,太阴:10,贪狼:10,巨门:10,天相:10,天梁:10,七杀:10,破军:10,左辅:8,右弼:8,文昌:8,文曲:8,天魁:8,天钺:8,禄存:7,天马:7,化禄:9,化权:9,化科:9,化忌:9,火星:6,铃星:6,擎羊:6,陀罗:6,地空:5,地劫:5};return k.map(w=>({...w,priority:h[w.name]||(w.mutagen?9:w.type==="major"?10:3)})).sort((w,U)=>U.priority-w.priority).slice(0,6)},Q=()=>{if(!e.enableSecondPerson||!e.displayData2)return{};const k=e.displayData1,h=e.displayData2,p=j(k,h),w=J(k,h),U=te(k,h),V=ie(k,h);return{mingGong:p,wuxing:w,sihua:U,shenGong:V}},z=k=>({mingGong:"命宫关系",wuxing:"五行配合",sihua:"四化互动",shenGong:"身宫关系"})[k]||k,j=(k,h)=>{const p=k.basicInfo?.soulPalace||"未知",w=h.basicInfo?.soulPalace||"未知";if(p==="未知"||w==="未知")return"命宫信息不完整，无法分析";if(p===w)return`双方命宫同在${p}，性格相近，容易理解对方`;{const U=E(p,w);return`命宫分别在${p}和${w}，${U}`}},J=(k,h)=>{const p=k.basicInfo?.fiveElementsClass||"未知",w=h.basicInfo?.fiveElementsClass||"未知";return p==="未知"||w==="未知"?"五行局信息不完整，无法分析":p===w?`双方同为${p}，五行相同，能量共振`:`五行局分别为${p}和${w}，需要互补平衡`},te=(k,h)=>{const p=k.mutagens||{},w=h.mutagens||{},U=[],V={lu:"化禄",quan:"化权",ke:"化科",ji:"化忌"};return Object.keys(p).forEach(R=>{const ce=p[R],ye=w[R],Z=V[R]||R;ce&&ye&&ce===ye&&U.push(`双方${Z}星同为${ce}，产生共鸣`)}),U.length===0?"四化星互动平和，无明显冲突":U.join("；")},ie=(k,h)=>{const p=k.basicInfo?.bodyPalace||"未知",w=h.basicInfo?.bodyPalace||"未知";if(p==="未知"||w==="未知")return"身宫信息不完整，无法分析";if(p===w)return`双方身宫同在${p}，价值观念相近，容易产生共鸣`;{const U=E(p,w);return`身宫分别在${p}和${w}，${U}`}},E=(k,h)=>{const p={"命宫-财帛":"财运与性格相关","命宫-事业":"事业发展与个性匹配","命宫-夫妻":"感情与性格互补"},w=`${k}-${h}`,U=`${h}-${k}`;return p[w]||p[U]||"宫位关系需要通过具体星耀配置进一步分析"},C=k=>!k||!k.allStars?[]:k.allStars,G=(k,h)=>!k||!k.allStars?[]:k.allStars.filter(p=>p.type===h),O=k=>({命宫:"代表个人的性格特质、天赋才能、人生格局、基本运势和先天禀赋，是紫薇斗数中最重要的宫位",兄弟宫:"代表兄弟姐妹关系、朋友交往、同事关系、合作伙伴和人际网络的状况",夫妻宫:"代表婚姻感情、配偶关系、恋爱运势、感情模式和异性缘分",子女宫:"代表子女关系、生育能力、教育子女、创造力和部属关系",财帛宫:"代表财运状况、理财能力、赚钱方式、财富积累和金钱观念",疾厄宫:"代表身体健康、疾病倾向、体质强弱、意外灾厄和心理状态",迁移宫:"代表外出运势、变动机会、环境适应、贵人运和远方发展",奴仆宫:"代表部属关系、朋友助力、社交能力、人缘状况和团队合作",官禄宫:"代表事业发展、工作能力、职业方向、社会地位和成就表现",田宅宫:"代表不动产运势、居住环境、家庭状况、祖业传承和生活品质",福德宫:"代表精神享受、兴趣爱好、福分厚薄、心境状态和晚年运势",父母宫:"代表父母关系、长辈缘分、上司关系、学业状况和文书运势"})[k]||"此宫位的具体含义需要结合整体命盘分析",H=k=>{if(!k||!k.allStars)return"此宫位暂无星耀坐守。";const h=k.allStars.filter(R=>R.type==="major"),p=k.allStars.filter(R=>R.type==="minor");k.allStars.filter(R=>R.mutagen);let w=[];if(h.length>0){const R=h.map(ce=>ce.name).join("、");w.push(`${R}主星坐守`),h.forEach(ce=>{const ye=se(ce.name,k.name);ye&&w.push(ye)})}const U=p.filter(R=>["左辅","右弼","文昌","文曲","天魁","天钺","禄存","天马"].includes(R.name));U.length>0&&w.push(`有${U.map(R=>R.name).join("、")}等吉星相助，增强宫位正面能量`);const V=p.filter(R=>["火星","铃星","擎羊","陀罗","地空","地劫"].includes(R.name));return V.length>0&&w.push(`有${V.map(R=>R.name).join("、")}等煞星同宫，需要化解不利影响`),h.length===0&&w.push("此宫位为空宫，需借对宫星耀来论断，或依靠后天努力来充实"),w.length>0?w.join("，")+"。":"此宫位星耀配置需要结合整体命盘分析。"},se=(k,h)=>({紫微:{命宫:"具有帝王之相，天生领导才能，性格高贵，适合管理职位",财帛宫:"财运亨通，有贵人相助，财源广进，善于理财",官禄宫:"事业有成，适合领导职位，官运亨通，社会地位高",夫妻宫:"配偶条件佳，婚姻美满，夫妻恩爱，感情稳定"},天机:{命宫:"聪明机智，善于策划，反应敏捷，适合智力工作",财帛宫:"理财有方，投资眼光独到，财运变化较大",官禄宫:"适合策划、咨询类工作，智慧型事业发展佳",兄弟宫:"兄弟朋友聪明，关系变化较多，需要用智慧维系"},太阳:{命宫:"性格开朗，有正义感，光明磊落，适合公职或教育",财帛宫:"财运光明，赚钱光明正大，适合阳光行业",官禄宫:"适合公职或教育事业，声名远播，受人尊敬",父母宫:"与父亲缘分深厚，父亲对自己影响较大"},武曲:{命宫:"意志坚强，个性刚毅，理财能力佳，适合金融业",财帛宫:"理财有道，投资眼光佳，财富稳定增长，善于积累",官禄宫:"事业稳定，在金融或技术领域有所成就",夫妻宫:"配偶性格坚强，夫妻关系需要磨合"},天同:{命宫:"性格温和，人缘好，福分厚，适合服务业",财帛宫:"财运平稳，不愁吃穿，适合稳健投资",夫妻宫:"夫妻和睦，感情稳定，家庭幸福",福德宫:"精神享受丰富，心境平和，晚年福分厚"},廉贞:{命宫:"个性刚强，有魄力，适合执法或军警工作",财帛宫:"财运起伏较大，需要谨慎理财",官禄宫:"适合执法、军警或竞争性行业",疾厄宫:"需要注意心血管疾病，保持情绪稳定"}})[k]?.[h]||null,F=k=>{if(!k||!k.allStars)return"运势平平，需要后天努力。";const h=k.allStars.filter(Z=>Z.mutagen),p=k.allStars.filter(Z=>Z.type==="major"),w=k.allStars.filter(Z=>Z.type==="minor");let U=[];h.length>0&&h.forEach(Z=>{switch(Z.mutagen){case"禄":U.push(`${Z.name}化禄带来财运和贵人运，此宫位运势佳`);break;case"权":U.push(`${Z.name}化权增强掌控力，适合发挥主导作用`);break;case"科":U.push(`${Z.name}化科带来名声和贵气，利于学业和声誉`);break;case"忌":U.push(`${Z.name}化忌带来阻碍，需要谨慎处理，化解不利因素`);break}});const V=p.filter(Z=>["庙","旺"].includes(Z.brightness)),R=p.filter(Z=>["落陷","不得地"].includes(Z.brightness));V.length>0&&U.push("主星庙旺，宫位能量强，运势较佳"),R.length>0&&U.push("主星失陷，宫位能量弱，需要后天加强");const ce=w.filter(Z=>["左辅","右弼","文昌","文曲","天魁","天钺"].includes(Z.name)),ye=w.filter(Z=>["火星","铃星","擎羊","陀罗","地空","地劫"].includes(Z.name));return ce.length>ye.length?U.push("吉星多于煞星，整体运势向好"):ye.length>ce.length&&U.push("煞星较多，需要谨慎行事，化解不利"),U.length>0?U.join("，")+"。":"运势需要结合大运流年综合判断。"},de=k=>{if(!k)return"建议结合整体命盘制定人生规划。";const h=k.name,p=k.allStars?.filter(R=>R.type==="major")||[],w=k.allStars?.filter(R=>R.mutagen)||[];let U=[];const V={命宫:"注重个人修养和品格培养，发挥天赋才能，建立正确的人生观",兄弟宫:"维护兄弟朋友关系，善于合作，建立良好的人际网络",夫妻宫:"用心经营感情，理解包容，建立和谐的婚姻关系",子女宫:"关爱子女教育，发挥创造力，培养良好的师生或上下级关系",财帛宫:"合理规划财务，稳健投资，培养正确的金钱观念",疾厄宫:"注重身体健康，预防疾病，保持良好的生活习惯",迁移宫:"把握变动机会，适应环境变化，善用贵人助力",奴仆宫:"善待部属朋友，建立互信关系，发挥团队合作精神",官禄宫:"努力工作，提升能力，选择适合的职业发展方向",田宅宫:"合理置业，改善居住环境，维护家庭和睦",福德宫:"培养兴趣爱好，保持心境平和，积累福德",父母宫:"孝敬父母长辈，尊师重道，处理好上下级关系"};return U.push(V[h]||"需要根据具体情况制定相应策略"),w.some(R=>R.mutagen==="忌")&&U.push("此宫位有化忌星，需要特别谨慎，多行善事化解不利"),w.some(R=>R.mutagen==="禄")&&U.push("此宫位有化禄星，可以积极发展，把握机会"),p.length===0&&U.push("空宫需要借对宫星耀，或通过后天努力来充实此宫位"),U.join("；")+"。"},le=()=>{console.log("紫薇重新排盘")},ge=k=>{k===null?console.log("紫薇页面 - API配置已重置，将使用默认AI服务"):console.log("紫薇页面 - 新的API配置:",k),It(()=>Promise.resolve().then(()=>_n),void 0).then(({aiService:h})=>{h.refreshConfig(),console.log("✅ AI服务配置已更新")})};return(k,h)=>(_(),$("div",ys,[P(e).isCalculating?(_(),$("div",fs,h[1]||(h[1]=[a("div",{class:"loading-indicator"},"计算中...",-1)]))):P(e).calculationError?(_(),$("div",vs,[a("p",null,"错误: "+v(P(e).calculationError),1)])):P(e).hasResults?(_(),$("div",xs,[a("div",Ss,[P(e).enableSecondPerson&&P(e).displayData2?(_(),$("div",_s,[a("div",Is,[a("h4",null,v(P(e).person1.name||"第一人")+"的基本信息",1),a("div",$s,[a("p",null,[h[2]||(h[2]=a("span",{class:"label"},"性别",-1)),a("span",bs,v(P(e).displayData1?.basicInfo?.gender||"未知"),1)]),a("p",null,[h[3]||(h[3]=a("span",{class:"label"},"阳历",-1)),a("span",ws,v(P(e).displayData1?.basicInfo?.birthDate?.solar||"未知"),1)]),a("p",null,[h[4]||(h[4]=a("span",{class:"label"},"农历",-1)),a("span",ks,v(P(e).displayData1?.basicInfo?.birthDate?.lunar||"未知"),1)]),a("p",null,[h[5]||(h[5]=a("span",{class:"label"},"时辰",-1)),a("span",As,v(P(e).displayData1?.basicInfo?.time||"未知")+" "+v(P(e).displayData1?.basicInfo?.timeRange||""),1)]),a("p",null,[h[6]||(h[6]=a("span",{class:"label"},"五行局",-1)),a("span",Ps,v(P(e).displayData1?.basicInfo?.fiveElementsClass||"未知"),1)]),a("p",null,[h[7]||(h[7]=a("span",{class:"label"},"命宫",-1)),a("span",Cs,v(P(e).displayData1?.basicInfo?.soulPalace||"未知"),1)]),a("p",null,[h[8]||(h[8]=a("span",{class:"label"},"身宫",-1)),a("span",Ts,v(P(e).displayData1?.basicInfo?.bodyPalace||"未知"),1)])])]),a("div",Es,[a("h4",null,v(P(e).person2.name||"第二人")+"的基本信息",1),a("div",Ls,[a("p",null,[h[9]||(h[9]=a("span",{class:"label"},"性别",-1)),a("span",Us,v(P(e).displayData2?.basicInfo?.gender||"未知"),1)]),a("p",null,[h[10]||(h[10]=a("span",{class:"label"},"阳历",-1)),a("span",Ms,v(P(e).displayData2?.basicInfo?.birthDate?.solar||"未知"),1)]),a("p",null,[h[11]||(h[11]=a("span",{class:"label"},"农历",-1)),a("span",Gs,v(P(e).displayData2?.basicInfo?.birthDate?.lunar||"未知"),1)]),a("p",null,[h[12]||(h[12]=a("span",{class:"label"},"时辰",-1)),a("span",Ns,v(P(e).displayData2?.basicInfo?.time||"未知")+" "+v(P(e).displayData2?.basicInfo?.timeRange||""),1)]),a("p",null,[h[13]||(h[13]=a("span",{class:"label"},"五行局",-1)),a("span",js,v(P(e).displayData2?.basicInfo?.fiveElementsClass||"未知"),1)]),a("p",null,[h[14]||(h[14]=a("span",{class:"label"},"命宫",-1)),a("span",Ds,v(P(e).displayData2?.basicInfo?.soulPalace||"未知"),1)]),a("p",null,[h[15]||(h[15]=a("span",{class:"label"},"身宫",-1)),a("span",Rs,v(P(e).displayData2?.basicInfo?.bodyPalace||"未知"),1)])])])])):(_(),$("div",Bs,[a("div",Os,[a("p",null,[h[16]||(h[16]=a("span",{class:"label"},"姓名",-1)),a("span",Ys,v(t.value?.basicInfo?.name||"未填写"),1)]),a("p",null,[h[17]||(h[17]=a("span",{class:"label"},"性别",-1)),a("span",Zs,v(t.value?.basicInfo?.gender||"未知"),1)]),a("p",null,[h[18]||(h[18]=a("span",{class:"label"},"阳历",-1)),a("span",Hs,v(t.value?.basicInfo?.birthDate?.solar||"未知"),1)]),a("p",null,[h[19]||(h[19]=a("span",{class:"label"},"农历",-1)),a("span",Ks,v(t.value?.basicInfo?.birthDate?.lunar||"未知"),1)]),a("p",null,[h[20]||(h[20]=a("span",{class:"label"},"时辰",-1)),a("span",qs,v(t.value?.basicInfo?.time||"未知")+" "+v(t.value?.basicInfo?.timeRange||""),1)]),a("p",null,[h[21]||(h[21]=a("span",{class:"label"},"五行局",-1)),a("span",Vs,v(t.value?.basicInfo?.fiveElementsClass||"未知"),1)]),a("p",null,[h[22]||(h[22]=a("span",{class:"label"},"命宫",-1)),a("span",Js,v(t.value?.basicInfo?.soulPalace||"未知"),1)]),a("p",null,[h[23]||(h[23]=a("span",{class:"label"},"身宫",-1)),a("span",Ws,v(t.value?.basicInfo?.bodyPalace||"未知"),1)])]),a("div",Fs,[h[28]||(h[28]=a("h4",null,"四化信息",-1)),a("div",Qs,[a("div",zs,[h[24]||(h[24]=a("span",{class:"mutagen-type lu"},"化禄",-1)),a("span",Xs,v(t.value?.mutagens?.lu||"无"),1)]),a("div",ea,[h[25]||(h[25]=a("span",{class:"mutagen-type quan"},"化权",-1)),a("span",ta,v(t.value?.mutagens?.quan||"无"),1)]),a("div",na,[h[26]||(h[26]=a("span",{class:"mutagen-type ke"},"化科",-1)),a("span",sa,v(t.value?.mutagens?.ke||"无"),1)]),a("div",aa,[h[27]||(h[27]=a("span",{class:"mutagen-type ji"},"化忌",-1)),a("span",ra,v(t.value?.mutagens?.ji||"无"),1)])])])]))]),a("div",oa,[h[30]||(h[30]=a("h3",{class:"chart-title"},"星盘信息",-1)),P(e).enableSecondPerson&&P(e).displayData2?(_(),$("div",ia,[a("div",la,[a("h3",null,v(P(e).person1.name||"第一人")+"的紫薇星盘",1),a("div",ca,[(_(!0),$(K,null,W(P(e).displayData1.palaces,p=>(_(),$("div",{key:p.name,class:ne(["palace-cell",{"body-palace":p.isBodyPalace}]),onClick:w=>r(p)},[a("div",da,[a("span",ha,v(p.name),1),p.isBodyPalace?(_(),$("span",ga,"身")):M("",!0)]),a("div",ma,v(p.heavenlyStem)+v(p.earthlyBranch),1),a("div",pa,[(_(!0),$(K,null,W(N(p.allStars||[]),w=>(_(),$("div",{key:w.name,class:ne(i(w))},[Y(v(w.name)+" ",1),w.mutagen?(_(),$("span",{key:0,class:ne(["mutagen",o(w.mutagen)])},v(w.mutagen),3)):M("",!0)],2))),128))]),a("div",ya,[p.changsheng12?(_(),$("div",fa,v(p.changsheng12),1)):M("",!0),p.boshi12?(_(),$("div",va,v(p.boshi12),1)):M("",!0)]),p.ages&&p.ages.length>0?(_(),$("div",xa,v(p.ages.join("-"))+"岁 ",1)):M("",!0)],10,ua))),128))])]),a("div",Sa,[a("h3",null,v(P(e).person2.name||"第二人")+"的紫薇星盘",1),a("div",_a,[(_(!0),$(K,null,W(P(e).displayData2.palaces,p=>(_(),$("div",{key:p.name,class:ne(["palace-cell",{"body-palace":p.isBodyPalace}]),onClick:w=>r(p)},[a("div",$a,[a("span",ba,v(p.name),1),p.isBodyPalace?(_(),$("span",wa,"身")):M("",!0)]),a("div",ka,v(p.heavenlyStem)+v(p.earthlyBranch),1),a("div",Aa,[(_(!0),$(K,null,W(N(p.allStars||[]),w=>(_(),$("div",{key:w.name,class:ne(i(w))},[Y(v(w.name)+" ",1),w.mutagen?(_(),$("span",{key:0,class:ne(["mutagen",o(w.mutagen)])},v(w.mutagen),3)):M("",!0)],2))),128))]),a("div",Pa,[p.changsheng12?(_(),$("div",Ca,v(p.changsheng12),1)):M("",!0),p.boshi12?(_(),$("div",Ta,v(p.boshi12),1)):M("",!0)]),p.ages&&p.ages.length>0?(_(),$("div",Ea,v(p.ages.join("-"))+"岁 ",1)):M("",!0)],10,Ia))),128))])]),a("div",La,[h[29]||(h[29]=a("h4",null,"合盘分析",-1)),a("div",Ua,[(_(!0),$(K,null,W(Q(),(p,w)=>(_(),$("div",{key:w,class:"compatibility-analysis-item"},[a("p",null,[a("strong",null,v(z(w))+"：",1),Y(v(p),1)])]))),128))])])])):(_(),$("div",Ma,[a("div",Ga,[(_(!0),$(K,null,W(t.value?.palaces||[],p=>(_(),$("div",{key:p.name,class:ne(["palace-cell",{"body-palace":p.isBodyPalace}]),onClick:w=>r(p)},[a("div",ja,[a("span",Da,v(p.name),1),p.isBodyPalace?(_(),$("span",Ra,"身")):M("",!0)]),a("div",Ba,v(p.heavenlyStem)+v(p.earthlyBranch),1),a("div",Oa,[(_(!0),$(K,null,W(p.allStars||[],w=>(_(),$("div",{key:w.name,class:ne(i(w))},[Y(v(w.name)+" ",1),w.mutagen?(_(),$("span",{key:0,class:ne(["mutagen",o(w.mutagen)])},v(w.mutagen),3)):M("",!0)],2))),128))]),a("div",Ya,[p.changsheng12?(_(),$("div",Za,v(p.changsheng12),1)):M("",!0),p.boshi12?(_(),$("div",Ha,v(p.boshi12),1)):M("",!0),p.jiangqian12?(_(),$("div",Ka,v(p.jiangqian12),1)):M("",!0)]),p.ages&&p.ages.length>0?(_(),$("div",qa,v(p.ages.join("-"))+"岁 ",1)):M("",!0),p.isEmpty?(_(),$("div",Va," 空宫 ")):M("",!0)],10,Na))),128))])]))]),P(e).enableSecondPerson?M("",!0):(_(),$("div",Ja,[a("div",Wa,[h[35]||(h[35]=a("h4",null,"命盘概述",-1)),a("div",Fa,[a("p",null,[h[31]||(h[31]=a("strong",null,"命主星：",-1)),Y(v(d()),1)]),a("p",null,[h[32]||(h[32]=a("strong",null,"身主星：",-1)),Y(v(u()),1)]),a("p",null,[h[33]||(h[33]=a("strong",null,"命格层次：",-1)),Y(v(g()),1)]),a("p",null,[h[34]||(h[34]=a("strong",null,"格局特征：",-1)),Y(v(c()),1)])])]),a("div",Qa,[h[36]||(h[36]=a("h4",null,"主要星耀分析",-1)),a("div",za,[(_(!0),$(K,null,W(y(),p=>(_(),$("div",{key:p.palace,class:"star-analysis-text"},[a("p",null,[a("strong",null,v(p.palace)+"：",1),Y(v(p.stars.join("、"))+"星坐守。"+v(p.description),1)])]))),128))])]),a("div",Xa,[h[37]||(h[37]=a("h4",null,"四化详解",-1)),a("div",er,[(_(!0),$(K,null,W(b(),p=>(_(),$("div",{key:p.type,class:"mutagen-analysis-text"},[a("p",null,[a("strong",null,v(p.name)+"：",1),Y(v(p.star)+"星在"+v(p.palace)+"。"+v(p.description),1)])]))),128))])]),a("div",tr,[h[42]||(h[42]=a("h4",null,"运势概况",-1)),a("div",nr,[a("p",null,[h[38]||(h[38]=a("strong",null,"当前年龄：",-1)),Y(v(t.value?.horoscope?.currentAge||0)+"岁",1)]),a("p",null,[h[39]||(h[39]=a("strong",null,"大运宫位：",-1)),Y(v(m()),1)]),a("p",null,[h[40]||(h[40]=a("strong",null,"流年宫位：",-1)),Y(v(I()),1)]),a("p",null,[h[41]||(h[41]=a("strong",null,"运势建议：",-1)),Y(v(L()),1)])])])])),xe(ps,{"clear-results-method":P(e).clearResults,onRecalculate:le,onConfigSaved:ge},null,8,["clear-results-method"]),(_(),lt(ct,{to:"body"},[n.value?(_(),$("div",{key:0,class:"palace-modal-overlay",onClick:l},[a("div",{class:"palace-modal",onClick:h[0]||(h[0]=it(()=>{},["stop"]))},[a("div",sr,[a("h3",null,v(n.value.name)+"详情",1),a("button",{class:"close-button",onClick:l},"×")]),a("div",ar,[a("div",rr,[a("p",null,[h[43]||(h[43]=a("strong",null,"宫位：",-1)),Y(v(n.value.name),1)]),a("p",null,[h[44]||(h[44]=a("strong",null,"干支：",-1)),Y(v(n.value.heavenlyStem)+v(n.value.earthlyBranch),1)]),n.value.isBodyPalace?(_(),$("p",or,h[45]||(h[45]=[a("strong",null,"身宫",-1)]))):M("",!0),n.value.isEmpty?(_(),$("p",ir,h[46]||(h[46]=[a("strong",null,"空宫",-1)]))):M("",!0),n.value.ages&&n.value.ages.length>0?(_(),$("p",lr,[h[47]||(h[47]=a("strong",null,"年龄：",-1)),Y(v(n.value.ages.join("-"))+"岁 ",1)])):M("",!0)]),C(n.value).length>0?(_(),$("div",cr,[h[48]||(h[48]=a("h4",null,"星耀详情",-1)),G(n.value,"major").length>0?(_(),$("div",ur,[a("h5",null,"主星 ("+v(G(n.value,"major").length)+"颗)",1),a("div",dr,[(_(!0),$(K,null,W(G(n.value,"major"),p=>(_(),$("div",{key:p.name,class:"star-detail"},[a("span",hr,v(p.name),1),p.brightness?(_(),$("span",gr,v(p.brightness),1)):M("",!0),p.mutagen?(_(),$("span",mr,v(p.mutagen),1)):M("",!0)]))),128))])])):M("",!0),G(n.value,"minor").length>0?(_(),$("div",pr,[a("h5",null,"辅星 ("+v(G(n.value,"minor").length)+"颗)",1),a("div",yr,[(_(!0),$(K,null,W(G(n.value,"minor"),p=>(_(),$("div",{key:p.name,class:"star-detail"},[a("span",fr,v(p.name),1),p.brightness?(_(),$("span",vr,v(p.brightness),1)):M("",!0),p.mutagen?(_(),$("span",xr,v(p.mutagen),1)):M("",!0)]))),128))])])):M("",!0),G(n.value,"adjective").length>0?(_(),$("div",Sr,[a("h5",null,"杂耀 ("+v(G(n.value,"adjective").length)+"颗)",1),a("div",_r,[(_(!0),$(K,null,W(G(n.value,"adjective"),p=>(_(),$("div",{key:p.name,class:"star-detail"},[a("span",Ir,v(p.name),1),p.brightness?(_(),$("span",$r,v(p.brightness),1)):M("",!0),p.mutagen?(_(),$("span",br,v(p.mutagen),1)):M("",!0)]))),128))])])):M("",!0)])):M("",!0),n.value?(_(),$("div",wr,[h[52]||(h[52]=a("h4",null,"宫位分析",-1)),a("div",kr,[a("div",Ar,[a("p",null,[a("strong",null,v(n.value.name)+"含义：",1),Y(v(O(n.value.name)),1)])]),a("div",Pr,[a("p",null,[h[49]||(h[49]=a("strong",null,"星耀影响：",-1)),Y(v(H(n.value)),1)])]),a("div",Cr,[a("p",null,[h[50]||(h[50]=a("strong",null,"运势分析：",-1)),Y(v(F(n.value)),1)])]),a("div",Tr,[a("p",null,[h[51]||(h[51]=a("strong",null,"建议指导：",-1)),Y(v(de(n.value)),1)])])])])):M("",!0),a("div",Er,[h[58]||(h[58]=a("h4",null,"其他信息",-1)),n.value.changsheng12?(_(),$("p",Lr,[h[53]||(h[53]=a("strong",null,"长生十二神：",-1)),Y(v(n.value.changsheng12),1)])):M("",!0),n.value.boshi12?(_(),$("p",Ur,[h[54]||(h[54]=a("strong",null,"博士十二神：",-1)),Y(v(n.value.boshi12),1)])):M("",!0),n.value.jiangqian12?(_(),$("p",Mr,[h[55]||(h[55]=a("strong",null,"将前十二神：",-1)),Y(v(n.value.jiangqian12),1)])):M("",!0),n.value.suiqian12?(_(),$("p",Gr,[h[56]||(h[56]=a("strong",null,"岁前十二神：",-1)),Y(v(n.value.suiqian12),1)])):M("",!0),n.value.decadal?(_(),$("p",Nr,[h[57]||(h[57]=a("strong",null,"大运：",-1)),Y(v(n.value.decadal),1)])):M("",!0)])])])])):M("",!0)]))])):M("",!0)]))}},at=ke(jr,[["__scopeId","data-v-871f1930"]]);class Dr{constructor(){this.cache=new Map,this.inspirationCache=new Map,this.maxCacheSize=100,this.cacheVersion="1.0",this.init()}init(){try{const e=localStorage.getItem("ai_analysis_cache"),t=localStorage.getItem("ai_cache_version");if(e&&t===this.cacheVersion){const i=JSON.parse(e);this.cache=new Map(i)}else this.clearCache();const n=localStorage.getItem("ai_inspiration_cache");if(n&&t===this.cacheVersion){const i=JSON.parse(n);this.inspirationCache=new Map(i)}}catch(e){console.warn("加载AI缓存失败:",e),this.clearCache()}}generateCacheKey(e,t,n){const i={year:e.year,month:e.month,day:e.day,timeIndex:e.timeIndex,gender:e.gender,questionType:t,question:n.trim()},o=JSON.stringify(i);let r=0;for(let l=0;l<o.length;l++){const d=o.charCodeAt(l);r=(r<<5)-r+d,r=r&r}return Math.abs(r).toString(36)}shouldCache(e){return e!=="custom"}getCache(e,t,n){if(!this.shouldCache(t))return null;try{const i=this.generateCacheKey(e,t,n),o=this.cache.get(i);return o?(o.lastAccessed=Date.now(),this.cache.set(i,o),console.log("AI缓存命中:",t,n),o.response):null}catch(i){return console.warn("获取AI缓存失败:",i),null}}setCache(e,t,n,i){if(!(!this.shouldCache(t)||!i||!i.trim()))try{const o=this.generateCacheKey(e,t,n),r={response:i.trim(),createdAt:Date.now(),lastAccessed:Date.now(),questionType:t,question:n};this.cache.size>=this.maxCacheSize&&this.cleanupOldEntries(),this.cache.set(o,r),this.saveToStorage(),console.log("AI缓存已保存:",t,n)}catch(o){console.warn("保存AI缓存失败:",o)}}cleanupOldEntries(){try{const e=Array.from(this.cache.entries());e.sort((i,o)=>i[1].lastAccessed-o[1].lastAccessed);const t=Math.floor(this.maxCacheSize*.8),n=e.slice(0,e.length-t);n.forEach(([i])=>{this.cache.delete(i)}),console.log(`清理了 ${n.length} 个旧的AI缓存条目`)}catch(e){console.warn("清理AI缓存失败:",e)}}clearBaziCache(e){try{const t=JSON.stringify({year:e.year,month:e.month,day:e.day,timeIndex:e.timeIndex,gender:e.gender}),n=[];for(const[r,l]of this.cache.entries())try{const d=JSON.parse(atob(r));JSON.stringify({year:d.year,month:d.month,day:d.day,timeIndex:d.timeIndex,gender:d.gender})===t&&n.push(r)}catch{}n.forEach(r=>{this.cache.delete(r)});const i=this.generateBaziKey(e),o=this.inspirationCache.has(i);o&&this.inspirationCache.delete(i),(n.length>0||o)&&(this.saveToStorage(),console.log(`清理了 ${n.length} 个分析缓存条目和 ${o?1:0} 个问题灵感缓存`))}catch(t){console.warn("清理八字缓存失败:",t)}}getInspirationCache(e){try{const t=this.generateBaziKey(e),n=this.inspirationCache.get(t);return n?(n.lastAccessed=Date.now(),this.inspirationCache.set(t,n),console.log("问题灵感缓存命中"),n.suggestions):null}catch(t){return console.warn("获取问题灵感缓存失败:",t),null}}setInspirationCache(e,t){if(!(!t||!Array.isArray(t)||t.length===0))try{const n=this.generateBaziKey(e),i={suggestions:[...t],createdAt:Date.now(),lastAccessed:Date.now()};this.inspirationCache.set(n,i),this.saveToStorage(),console.log("问题灵感缓存已保存")}catch(n){console.warn("保存问题灵感缓存失败:",n)}}generateBaziKey(e){const t={year:e.year,month:e.month,day:e.day,timeIndex:e.timeIndex,gender:e.gender},n=JSON.stringify(t);let i=0;for(let o=0;o<n.length;o++){const r=n.charCodeAt(o);i=(i<<5)-i+r,i=i&i}return Math.abs(i).toString(36)}clearCache(){this.cache.clear(),this.inspirationCache.clear(),localStorage.removeItem("ai_analysis_cache"),localStorage.removeItem("ai_inspiration_cache"),localStorage.removeItem("ai_cache_version"),console.log("AI缓存已清空")}saveToStorage(){try{const e=Array.from(this.cache.entries()),t=Array.from(this.inspirationCache.entries());localStorage.setItem("ai_analysis_cache",JSON.stringify(e)),localStorage.setItem("ai_inspiration_cache",JSON.stringify(t)),localStorage.setItem("ai_cache_version",this.cacheVersion)}catch(e){if(console.warn("保存AI缓存到本地存储失败:",e),e.name==="QuotaExceededError"){this.cleanupOldEntries();try{const t=Array.from(this.cache.entries()),n=Array.from(this.inspirationCache.entries());localStorage.setItem("ai_analysis_cache",JSON.stringify(t)),localStorage.setItem("ai_inspiration_cache",JSON.stringify(n)),localStorage.setItem("ai_cache_version",this.cacheVersion)}catch(t){console.warn("重试保存AI缓存失败:",t)}}}}getStats(){return{size:this.cache.size,maxSize:this.maxCacheSize,version:this.cacheVersion}}}const Se=new Dr,Rr=ot("bazi",()=>{const s=D({name:"",year:"",month:"",day:"",timeIndex:0,gender:""}),e=D({name:"",year:"",month:"",day:"",timeIndex:0,gender:""}),t=D(!1),n=D(null),i=D(null),o=D(!1),r=D(""),l=D(""),d=D(!1),u=D(""),g=new Map,c=he(()=>{const E=s.value.year&&s.value.month&&s.value.day&&s.value.gender;if(!t.value)return E;const C=e.value.year&&e.value.month&&e.value.day&&e.value.gender;return E&&C}),y=he(()=>n.value!==null),S=async()=>{if(!c.value)return r.value="请填写完整的出生信息",!1;const E=`bazi_${s.value.year}_${s.value.month}_${s.value.day}_${s.value.timeIndex}_${s.value.gender}`,C=g.get(E);if(C)return n.value=C,De(s.value),!0;const G="calculate-bazi";o.value=!0,r.value="";try{if(fe.showLoading("正在计算八字...",G),n.value){const O={year:n.value.year,month:n.value.month,day:n.value.day,timeIndex:n.value.timeIndex,gender:n.value.gender},H={year:s.value.year,month:s.value.month,day:s.value.day,timeIndex:s.value.timeIndex,gender:s.value.gender};JSON.stringify(O)!==JSON.stringify(H)&&Se.clearBaziCache(O)}return fe.updateLoadingMessage("正在计算第一人八字...",G),n.value={...pe.calculateBazi(parseInt(s.value.year),parseInt(s.value.month),parseInt(s.value.day),s.value.timeIndex,s.value.gender)},t.value?(fe.updateLoadingMessage("正在计算第二人八字...",G),i.value={...pe.calculateBazi(parseInt(e.value.year),parseInt(e.value.month),parseInt(e.value.day),e.value.timeIndex,e.value.gender)}):i.value=null,g.set(E,n.value),De(s.value),fe.hideLoading(G),$e("八字计算完成！"),!0}catch(O){fe.hideLoading(G),console.error("八字计算失败:",O);const H=O.message||"八字计算失败，请检查输入信息";return r.value=H,re(H),Ye.reportError(O,"八字计算"),!1}finally{o.value=!1}},b=async(E,C="custom",G=!1,O=!1)=>{if(!n.value){u.value="请先进行八字排盘",re("请先进行八字排盘");return}d.value=!0,u.value="",G||(l.value="");let H=null,se=null;try{if(t.value&&i.value){const F=we(n.value),de=we(i.value),le=ve.buildCompatibilityPrompt(F,de,E);G&&(l.value+=`

---

## 追问：${E}

`);for await(const ge of ve.queryAI(le))l.value+=ge}else if(se={year:s.value.year,month:s.value.month,day:s.value.day,timeIndex:s.value.timeIndex,gender:s.value.gender},O||(H=Se.getCache(se,C,E),console.log("缓存检查:",{questionType:C,question:E.substring(0,50)+"...",hasCachedResponse:!!H,shouldCache:Se.shouldCache(C),cacheKey:Se.generateCacheKey(se,C,E).substring(0,20)+"..."})),H&&!O)G?l.value+=`

---

## 追问：${E}

${H}`:l.value=H,console.log("使用AI缓存结果");else{const F={id:L(C,E),dataset:{prompt:""}},de=we(n.value,F),le=ve.buildPromptFromConfig(E,F,n.value);G&&(l.value+=`

---

## 追问：${E}

`);let ge="";for await(const k of ve.queryAI(le))l.value+=k,ge+=k;ge&&ge.trim()&&(console.log("准备保存缓存:",{questionType:C,question:E.substring(0,50)+"...",shouldCache:Se.shouldCache(C),contentLength:ge.trim().length}),Se.setCache(se,C,E,ge.trim()),O&&console.log("强制重新生成，已更新缓存"))}}catch(F){console.error("AI 分析失败:",F);const de=F.message||"AI 分析失败，请稍后重试";u.value=de,re(de),Ye.reportError(F,"AI分析")}finally{H&&!O?setTimeout(()=>{d.value=!1},100):d.value=!1}},x=()=>{ve.cancelRequest(),d.value=!1},f=()=>{if(n.value){const E={year:n.value.year,month:n.value.month,day:n.value.day,timeIndex:n.value.timeIndex,gender:n.value.gender};Se.clearBaziCache(E)}s.value={name:"",year:"",month:"",day:"",timeIndex:0,gender:""},e.value={name:"",year:"",month:"",day:"",timeIndex:0,gender:""},t.value=!1,n.value=null,i.value=null,l.value="",r.value="",u.value="",ie(),z()},m=()=>{l.value="",u.value=""},I=()=>{n.value=null,i.value=null,r.value="",l.value="",u.value="",o.value=!1,d.value=!1,z(),ie()},L=(E,C)=>{const G={mingge:"ai-mingge-zonglun","current-luck":"ai-current-luck",year:"ai-this-year","monthly-fortune":"ai-monthly-fortune","next-three-years":"ai-next-three-years","lifetime-fortune":"ai-lifetime-fortune",career:"ai-career",marriage:"ai-marriage",health:"ai-health",custom:"custom"};return C&&C.includes("选定日期")?"ask-ai-with-date":G[E]||"custom"},N=()=>{try{const E=Rt();if(E)return s.value={...s.value,...E.person1},e.value={...e.value,...E.person2},t.value=!0,te(E.person1.name,E.person2.name),!0;const C=Gt();return C?(s.value={...s.value,...C},te(C.name),!0):!1}catch(E){return console.error("从URL加载数据失败:",E),!1}},Q=()=>{try{t.value&&c.value&&e.value.year?(Dt(s.value,e.value),te(s.value.name,e.value.name)):c.value&&(De(s.value),te(s.value.name))}catch(E){console.error("保存数据到URL失败:",E)}},z=()=>{try{Nt(),Bt()}catch(E){console.error("清除URL数据失败:",E)}},j=()=>{try{return t.value&&e.value.year?et(s.value,e.value):et(s.value)}catch(E){return console.error("生成分享链接失败:",E),window.location.href}},J=()=>Ot(),te=(E,C=null)=>{try{let G="八字排盘";C?G=`${E||"第一人"}与${C||"第二人"}的八字合盘分析`:E&&(G=`${E}的八字排盘`),document.title=G;const O=document.querySelector('meta[property="og:title"]');O&&O.setAttribute("content",G);const H=document.querySelector('meta[name="description"]');if(H&&E){let se="专业的AI八字排盘和命理分析工具";C?se=`${E}与${C}的八字合盘分析，专业AI命理解读`:se=`${E}的八字排盘结果，专业AI命理分析`,H.setAttribute("content",se)}}catch(G){console.error("更新页面标题失败:",G)}},ie=()=>{try{document.title="八字排盘";const E=document.querySelector('meta[property="og:title"]');E&&E.setAttribute("content","八字排盘");const C=document.querySelector('meta[name="description"]');C&&C.setAttribute("content","专业的AI八字排盘和命理分析工具")}catch(E){console.error("重置页面标题失败:",E)}};return{person1:s,person2:e,enableSecondPerson:t,baziResult1:n,baziResult2:i,isCalculating:o,calculationError:r,aiResponse:l,isAIThinking:d,aiError:u,canCalculate:c,hasResults:y,calculateBazi:S,askAI:b,cancelAI:x,resetForm:f,resetAI:m,clearResults:I,loadFromUrl:N,saveToUrl:Q,clearUrl:z,getShareUrl:j,hasUrlData:J,updatePageTitle:te,resetPageTitle:ie}});const Br={key:0,class:"ai-chat-container"},Or={class:"question-options"},Yr={class:"question-buttons-container"},Zr={class:"question-buttons"},Hr=["onClick"],Kr={key:0,class:"custom-question"},qr={key:1,class:"error-message"},Vr=["disabled"],Jr={class:"inspiration-container"},Wr={class:"inspiration-tab-navigation"},Fr=["onClick"],Qr={class:"inspiration-tab-content"},zr={key:0,class:"inspiration-tab-pane"},Xr={class:"questions-grid"},eo=["onClick"],to=["innerHTML"],no={key:0,class:"thinking-indicator"},so={key:1,class:"continue-explore"},ao={key:0,class:"user-question-context"},ro={class:"user-question"},oo={class:"explore-section"},io={key:0,class:"suggested-questions"},lo=["onClick"],co=["disabled"],uo={key:0,class:"suggestion-updating"},ho={key:1,class:"suggestion-loading"},go={key:2,class:"suggestion-loading"},mo={class:"explore-section"},po={class:"free-chat-input"},yo=["disabled"],fo=["disabled"],vo={class:"quick-actions"},xo=["disabled"],So=["disabled"],_o=["disabled"],Io={__name:"AIChat",setup(s){const e=ft(),t=he(()=>e.path.includes("/zw")),n=he(()=>t.value?Ne():Rr()),i=D(""),o=D(""),r=D(!1),l=D(t.value?"personality":"ganqing"),d=D([]),u=D({}),g=D([]),c=D(!1),y=D(""),S=D(null),b=D(""),x=new Map,f=new $t(S),m=A=>A?A.replace(/<think>[\s\S]*?<\/think>/gi,"").trim():"",I=D(!1),L=D(null),N=D(null),Q=D(null),z=[{id:"ai-mingge-zonglun",text:"命格总论",type:"mingge"},{id:"ai-current-luck",text:"当前大运",type:"current-luck"},{id:"ai-this-year",text:"今年运势",type:"year"},{id:"ai-monthly-fortune",text:"年运逐月",type:"monthly-fortune"},{id:"ai-next-three-years",text:"未来三年",type:"next-three-years"},{id:"ai-lifetime-fortune",text:"一生运势",type:"lifetime-fortune"},{id:"ai-career",text:"事业财运",type:"career"},{id:"ai-marriage",text:"感情婚姻",type:"marriage"},{id:"ai-health",text:"健康状况",type:"health"},{id:"ask-ai-with-date",text:"选定日期...",type:"custom"},{id:"custom",text:"自定义...",type:"custom"}],j=[{id:"ai-compat-marriage",text:"婚恋匹配",type:"marriage"},{id:"ai-compat-career",text:"事业合作",type:"career"},{id:"ai-compat-custom",text:"自定义...",type:"custom"}],J=[{id:"ai-ziwei-personality",text:"性格分析",type:"personality"},{id:"ai-ziwei-career",text:"事业财运",type:"career"},{id:"ai-ziwei-relationship",text:"感情婚姻",type:"relationship"},{id:"ai-ziwei-health",text:"健康状况",type:"health"},{id:"ai-ziwei-fortune",text:"运势分析",type:"fortune"},{id:"ai-ziwei-palace",text:"宫位分析",type:"palace"},{id:"custom",text:"自定义...",type:"custom"}],te=[{id:"ai-ziwei-compat",text:"合盘分析",type:"compatibility"},{id:"ai-ziwei-marriage",text:"感情匹配",type:"relationship"},{id:"ai-ziwei-cooperation",text:"事业合作",type:"career"},{id:"custom",text:"自定义...",type:"custom"}],ie=[{id:"ganqing",name:"感情",content:[{title:"情感发展",questions:[{text:"我近期的桃花运怎么样？",type:"marriage"},{text:"我们目前的感情走向如何？",type:"marriage"},{text:"他/她对我的真实情感是什么？",type:"marriage"},{text:"我们之间有未来吗？",type:"marriage"},{text:"如何改善我们目前的关系？",type:"marriage"},{text:"这段感情对我的影响？",type:"marriage"},{text:"我在感情中容易犯什么错误？",type:"marriage"},{text:"如何处理感情中的矛盾冲突？",type:"marriage"}]},{title:"正缘婚姻",questions:[{text:"我的正缘什么时候出现？",type:"marriage"},{text:"我的另一半是什么样的人？",type:"marriage"},{text:"我何时会结婚？",type:"marriage"},{text:"我适合和现在的对象结婚吗？",type:"marriage"},{text:"我的婚姻生活会幸福吗？",type:"marriage"},{text:"如何吸引我的正缘桃花？",type:"marriage"},{text:"我适合什么年龄结婚？",type:"marriage"},{text:"婚后我需要注意什么问题？",type:"marriage"}]},{title:"感情困扰",questions:[{text:"为什么我总是遇到不合适的人？",type:"marriage"},{text:"如何走出失恋的阴霾？",type:"marriage"},{text:"我在感情中缺乏什么？",type:"marriage"},{text:"如何提升自己的魅力？",type:"marriage"},{text:"异地恋能否有好结果？",type:"marriage"},{text:"如何判断对方是否真心？",type:"marriage"}]}]},{id:"shiye",name:"事业",content:[{title:"事业发展",questions:[{text:"我适合现在的工作/行业吗？",type:"career"},{text:"我的事业什么时候能成功？",type:"career"},{text:"我适合跳槽还是继续坚守？",type:"career"},{text:"我事业上的贵人会是谁？",type:"career"},{text:"我未来的事业走向怎么样？",type:"career"},{text:"我什么时候能找到满意的工作？",type:"career"},{text:"我适合创业还是打工？",type:"career"},{text:"如何在职场中脱颖而出？",type:"career"}]},{title:"职业规划",questions:[{text:"我最适合从事什么行业？",type:"career"},{text:"我的职业天赋在哪里？",type:"career"},{text:"如何规划我的职业发展路径？",type:"career"},{text:"我适合做管理还是技术？",type:"career"},{text:"转行对我来说是好选择吗？",type:"career"},{text:"我在什么环境下工作最有效率？",type:"career"}]},{title:"工作困扰",questions:[{text:"如何处理职场人际关系？",type:"career"},{text:"为什么我的工作总是不顺利？",type:"career"},{text:"如何获得上司的认可？",type:"career"},{text:"我在工作中的弱点是什么？",type:"career"},{text:"如何平衡工作与生活？",type:"career"},{text:"面对工作压力该如何调节？",type:"career"}]}]},{id:"caifu",name:"财富",content:[{title:"财运趋势",questions:[{text:"我近期的财运怎么样？",type:"career"},{text:"我这辈子财运的整体趋势？",type:"career"},{text:"我什么时候能发财？",type:"career"},{text:"我适合靠什么方式赚钱？",type:"career"},{text:"如何有效提升我的财运？",type:"career"},{text:"我近期会有意外之财吗？",type:"career"},{text:"我的财富巅峰期在什么时候？",type:"career"},{text:"我容易在哪些方面破财？",type:"career"}]},{title:"投资理财",questions:[{text:"我适合投资股票还是房产？",type:"career"},{text:"我的投资运势如何？",type:"career"},{text:"什么时候是我投资的好时机？",type:"career"},{text:"我适合保守理财还是激进投资？",type:"career"},{text:"如何避免投资失败？",type:"career"},{text:"我有做生意的天赋吗？",type:"career"}]},{title:"财富管理",questions:[{text:"如何培养正确的金钱观？",type:"career"},{text:"我为什么总是存不住钱？",type:"career"},{text:"如何增加被动收入？",type:"career"},{text:"我适合与人合伙做生意吗？",type:"career"},{text:"如何平衡消费与储蓄？",type:"career"},{text:"我的财富会传承给下一代吗？",type:"career"}]}]},{id:"renji",name:"人际",content:[{title:"社交模式",questions:[{text:"我的人际交往模式有何优缺点？",type:"mingge"},{text:"如何拓展我的高质量社交圈？",type:"mingge"},{text:"我目前的人际关系状态如何？",type:"mingge"},{text:"我会吸引哪些人进入我的生活？",type:"mingge"},{text:"如何获得他人的信任与支持？",type:"mingge"},{text:"如何处理与朋友的矛盾？",type:"mingge"},{text:"我在社交中的天然优势是什么？",type:"mingge"},{text:"如何克服社交恐惧？",type:"mingge"}]},{title:"家庭关系",questions:[{text:"如何改善与父母的关系？",type:"mingge"},{text:"我与兄弟姐妹的关系如何？",type:"mingge"},{text:"如何处理家庭矛盾？",type:"mingge"},{text:"我在家庭中扮演什么角色？",type:"mingge"},{text:"如何平衡家庭与个人发展？",type:"mingge"},{text:"我会是一个好父母吗？",type:"mingge"}]},{title:"人际困扰",questions:[{text:"为什么我总是遇到小人？",type:"mingge"},{text:"如何识别身边的真假朋友？",type:"mingge"},{text:"我在人际关系中的盲点是什么？",type:"mingge"},{text:"如何提升自己的人格魅力？",type:"mingge"},{text:"如何在团队中发挥领导力？",type:"mingge"},{text:"我适合与什么样的人深交？",type:"mingge"}]}]},{id:"rensheng",name:"成长",content:[{title:"个人成长",questions:[{text:"我的性格优势和劣势是什么？",type:"mingge"},{text:"我的人生主要课题是什么？",type:"mingge"},{text:"如何找到我的人生方向？",type:"mingge"},{text:"如何克服我性格中的弱点？",type:"mingge"},{text:"如何有效提升自己的能量状态？",type:"mingge"},{text:"我的人生转折点在何时？",type:"mingge"},{text:"我的天赋和潜能在哪里？",type:"mingge"},{text:"如何建立强大的内心？",type:"mingge"}]},{title:"人生规划",questions:[{text:"我这一生的使命是什么？",type:"mingge"},{text:"如何制定适合自己的人生目标？",type:"mingge"},{text:"我在什么年龄段会迎来人生高峰？",type:"mingge"},{text:"如何平衡理想与现实？",type:"mingge"},{text:"我的人生会有几次重大机遇？",type:"mingge"},{text:"如何为未来做好准备？",type:"mingge"}]},{title:"心理健康",questions:[{text:"如何管理自己的情绪？",type:"health"},{text:"我容易患哪些心理问题？",type:"health"},{text:"如何提升心理抗压能力？",type:"health"},{text:"如何走出人生低谷？",type:"health"},{text:"我的心理盲点在哪里？",type:"health"},{text:"如何保持积极的心态？",type:"health"}]},{title:"身体健康",questions:[{text:"我需要重点关注哪些健康问题？",type:"health"},{text:"我的体质特点是什么？",type:"health"},{text:"如何制定适合自己的养生方案？",type:"health"},{text:"我在什么年龄段需要特别注意健康？",type:"health"},{text:"如何通过饮食调理身体？",type:"health"},{text:"我适合什么样的运动方式？",type:"health"}]}]},{id:"xueye",name:"学业",content:[{title:"学习能力",questions:[{text:"我的学习天赋在哪个领域？",type:"mingge"},{text:"如何提高我的学习效率？",type:"mingge"},{text:"我适合什么样的学习方式？",type:"mingge"},{text:"如何克服学习中的困难？",type:"mingge"},{text:"我在学习中的优势和劣势？",type:"mingge"},{text:"如何培养良好的学习习惯？",type:"mingge"}]},{title:"专业选择",questions:[{text:"我适合学习什么专业？",type:"career"},{text:"文科还是理科更适合我？",type:"career"},{text:"我应该选择什么样的大学？",type:"career"},{text:"出国留学对我有利吗？",type:"career"},{text:"我的专业会有好的就业前景吗？",type:"career"},{text:"转专业对我来说是好选择吗？",type:"career"}]},{title:"考试运势",questions:[{text:"我的考试运势如何？",type:"year"},{text:"什么时候是我考试的最佳时机？",type:"year"},{text:"如何在重要考试中发挥最佳状态？",type:"year"},{text:"我容易在考试中犯什么错误？",type:"year"},{text:"如何克服考试焦虑？",type:"health"},{text:"我的学业会在什么时候迎来转机？",type:"year"}]},{title:"教育发展",questions:[{text:"我适合继续深造还是直接工作？",type:"career"},{text:"读研究生对我的发展有帮助吗？",type:"career"},{text:"我有做老师的天赋吗？",type:"career"},{text:"如何在学术道路上取得成功？",type:"career"},{text:"我适合从事教育行业吗？",type:"career"},{text:"如何平衡学习与其他生活？",type:"mingge"}]}]}],E=[{id:"personality",name:"性格命格",content:[{title:"命宫分析",questions:[{text:"我的命宫主星是什么？有什么特质？",type:"personality"},{text:"我的性格优势和劣势是什么？",type:"personality"},{text:"我的天赋才能在哪些方面？",type:"personality"},{text:"我适合什么样的人生道路？",type:"personality"},{text:"我的命格层次如何？",type:"personality"},{text:"我的性格中最突出的特点是什么？",type:"personality"},{text:"我在人际交往中的表现如何？",type:"personality"},{text:"我的领导能力和管理才能如何？",type:"personality"}]},{title:"身宫特质",questions:[{text:"我的身宫在哪里？有什么意义？",type:"personality"},{text:"我的人生重心应该放在哪里？",type:"personality"},{text:"身宫对我的性格有什么影响？",type:"personality"},{text:"如何发挥身宫的正面作用？",type:"personality"}]},{title:"福德宫分析",questions:[{text:"我的精神世界和内心状态如何？",type:"personality"},{text:"我的兴趣爱好和精神追求是什么？",type:"personality"},{text:"我如何获得内心的平静和快乐？",type:"personality"},{text:"我的思维模式和价值观如何？",type:"personality"}]}]},{id:"career",name:"事业财运",content:[{title:"官禄宫分析",questions:[{text:"我适合什么类型的工作？",type:"career"},{text:"我的事业发展方向是什么？",type:"career"},{text:"我什么时候会有事业突破？",type:"career"},{text:"我适合创业还是打工？",type:"career"},{text:"我的职场贵人运如何？",type:"career"},{text:"我在工作中容易遇到什么挑战？",type:"career"},{text:"我的升职加薪运势如何？",type:"career"},{text:"我适合在什么行业发展？",type:"career"}]},{title:"财帛宫分析",questions:[{text:"我的财运如何？",type:"career"},{text:"我适合什么样的投资理财？",type:"career"},{text:"我什么时候会有财运提升？",type:"career"},{text:"我的偏财运和正财运如何？",type:"career"},{text:"我容易在哪些方面破财？",type:"career"},{text:"我的理财观念和消费习惯如何？",type:"career"},{text:"我适合做什么样的投资？",type:"career"},{text:"我的财富积累能力如何？",type:"career"}]},{title:"田宅宫分析",questions:[{text:"我的房产运势如何？",type:"career"},{text:"我什么时候适合买房？",type:"career"},{text:"我适合投资房地产吗？",type:"career"},{text:"我的家庭环境对我有什么影响？",type:"career"}]}]},{id:"relationship",name:"感情婚姻",content:[{title:"夫妻宫分析",questions:[{text:"我的另一半会是什么样的人？",type:"relationship"},{text:"我什么时候会遇到正缘？",type:"relationship"},{text:"我的婚姻运势如何？",type:"relationship"},{text:"我在感情中需要注意什么？",type:"relationship"},{text:"我的桃花运什么时候最旺？",type:"relationship"},{text:"我容易遇到什么样的感情问题？",type:"relationship"},{text:"我的婚姻会幸福美满吗？",type:"relationship"},{text:"我如何改善夫妻关系？",type:"relationship"}]},{title:"子女宫分析",questions:[{text:"我的子女缘分如何？",type:"relationship"},{text:"我适合什么时候要孩子？",type:"relationship"},{text:"我的孩子会是什么性格？",type:"relationship"},{text:"我和孩子的关系如何？",type:"relationship"},{text:"我的子女对我的事业有什么影响？",type:"relationship"},{text:"我如何教育孩子？",type:"relationship"}]},{title:"兄弟宫分析",questions:[{text:"我和兄弟姐妹的关系如何？",type:"relationship"},{text:"我的朋友运势如何？",type:"relationship"},{text:"我容易交到什么样的朋友？",type:"relationship"},{text:"我在团队合作中的表现如何？",type:"relationship"}]}]},{id:"health",name:"健康疾厄",content:[{title:"疾厄宫分析",questions:[{text:"我需要注意哪些健康问题？",type:"health"},{text:"我的体质特点是什么？",type:"health"},{text:"我容易得什么疾病？",type:"health"},{text:"我如何保养身体？",type:"health"},{text:"我的精神健康状况如何？",type:"health"},{text:"我什么时候需要特别注意健康？",type:"health"},{text:"我适合什么样的运动和养生方式？",type:"health"},{text:"我的睡眠质量如何改善？",type:"health"}]},{title:"意外灾厄",questions:[{text:"我需要防范哪些意外？",type:"health"},{text:"我什么时候要特别小心？",type:"health"},{text:"我如何化解不利因素？",type:"health"},{text:"我的安全运势如何？",type:"health"}]}]},{id:"fortune",name:"运势流年",content:[{title:"大运分析",questions:[{text:"我现在处于什么大运？",type:"fortune"},{text:"我的大运对我有什么影响？",type:"fortune"},{text:"我下一个大运会如何？",type:"fortune"},{text:"我的大运什么时候最好？",type:"fortune"},{text:"我如何把握大运机遇？",type:"fortune"},{text:"我的大运对事业有什么影响？",type:"fortune"},{text:"我的大运对感情有什么影响？",type:"fortune"},{text:"我如何度过不利的大运？",type:"fortune"}]},{title:"流年分析",questions:[{text:"今年我的运势如何？",type:"fortune"},{text:"明年我需要注意什么？",type:"fortune"},{text:"我什么时候运势最好？",type:"fortune"},{text:"今年我的事业运如何？",type:"fortune"},{text:"今年我的财运如何？",type:"fortune"},{text:"今年我的感情运如何？",type:"fortune"},{text:"今年我的健康运如何？",type:"fortune"},{text:"我如何提升今年的运势？",type:"fortune"}]}]}],C=he(()=>t.value?E:ie),G=A=>{St(()=>{const T=C.value.findIndex(ae=>ae.id===A);if(T===-1||!d.value[T]){setTimeout(()=>G(A),50);return}const B=d.value[T];if(B.offsetLeft===0&&B.offsetWidth===0){setTimeout(()=>G(A),50);return}u.value={left:`${B.offsetLeft}px`,width:`${B.offsetWidth}px`}})};_e(l,A=>{G(A)},{immediate:!0});const O=A=>{l.value=A},H=he(()=>t.value?n.value.enableSecondPerson?te:J:n.value.enableSecondPerson?j:z),se=he(()=>r.value?o.value.trim().length>0:i.value!==""),F=he(()=>{if(!n.value.aiResponse)return"";let A=m(n.value.aiResponse);return A=A.replace(/^---+$/gm,""),A=A.replace(/\n\s*\n\s*\n/g,`

`),n.value.aiResponse.includes("<think>")&&console.log("🧠 检测到思考标签，已过滤:",{原始长度:n.value.aiResponse.length,过滤后长度:A.length,包含think标签:n.value.aiResponse.match(/<think>[\s\S]*?<\/think>/gi)?.length||0}),wt.parse(A.trim())}),de=A=>{i.value=A.id,r.value=A.type==="custom",r.value||(o.value="")},le=async()=>{let A="",T="custom";if(r.value)A=o.value.trim();else{const B=H.value.find(ae=>ae.id===i.value);B&&(A=B.text,T=B.type)}A&&(b.value=A,Z(),await n.value.askAI(A,T))},ge=async(A,T="custom")=>{console.log("问题灵感调用:",{question:A,questionType:T}),b.value=A,Z(),await n.value.askAI(A,T)},k=async()=>{if(c.value){console.log("智能建议生成已在进行中，跳过");return}const A=`suggestions_${n.value.person1?.year}_${n.value.person1?.month}_${n.value.person1?.day}_${b.value}`,T=x.get(A);if(T){g.value=T;return}c.value=!0;const B=setTimeout(()=>{c.value&&(console.warn("智能建议生成超时"),c.value=!1)},6e3);try{if(!(t.value?n.value.ziWeiResult1:n.value.baziResult1)){console.log("没有排盘数据，跳过建议生成"),clearTimeout(B),c.value=!1;return}await new Promise(oe=>setTimeout(oe,800));const Pe=`用户刚刚问了这个问题："${b.value||""}"

请根据这个问题，生成3个用户可能感兴趣的相关后续问题。这些问题应该：
1. 与原问题相关但有所延伸
2. 能够帮助用户更深入了解相关话题
3. 实用且有价值

请直接输出3个问题，每行一个，不要编号，不要其他说明文字。`;try{console.log("开始AI建议生成请求");const oe=await ve.queryAIComplete(Pe);if(console.log("AI建议生成完成，已过滤响应:",oe),oe&&oe.trim()){const Ce=oe.split(`
`).map(Te=>Te.trim()).filter(Te=>Te&&!Te.match(/^\d+\./)&&Te.length>5).slice(0,3);console.log("处理后的建议:",Ce),Ce.length>0?(console.log("设置建议前的状态:",{currentSuggestions:g.value,newSuggestions:Ce,isGenerating:c.value}),g.value=Ce,x.set(A,Ce),console.log("设置建议后的状态:",{currentSuggestions:g.value,isGenerating:c.value})):console.log("没有有效的建议内容")}else console.log("AI返回空内容")}catch(oe){if(oe.name==="AbortError"){console.log("建议生成请求被中止，这是正常的");return}console.warn("AI生成建议失败:",oe)}}catch(ae){f.handle(ae,"生成建议",!1)}finally{clearTimeout(B),c.value=!1}},h=async()=>{if(!c.value){c.value=!0;try{if(!(t.value?n.value.ziWeiResult1:n.value.baziResult1))return;await new Promise(X=>setTimeout(X,1e3));let T=n.value.aiResponse||"";T=m(T);const ae=`请基于以下八字分析结果和用户问题，重新生成3个不同的后续问题建议：

用户问题：${b.value||""}

分析结果：${T.substring(0,500)}...

请生成3个与之前不同的、与用户问题和分析结果高度相关的后续问题，格式为纯文本，每行一个问题，不要编号。`;try{const X=await ve.queryAIComplete(ae);if(X&&X.trim()){const Pe=X.split(`
`).map(oe=>oe.trim()).filter(oe=>oe&&!oe.match(/^\d+\./)&&oe.length>5).slice(0,3);if(Pe.length>0){g.value=Pe,c.value=!1;return}}}catch(X){if(X.name==="AbortError"){console.log("重新生成建议请求被中止，这是正常的"),c.value=!1;return}console.warn("AI重新生成建议失败:",X)}}catch(A){console.error("重新生成建议失败:",A)}finally{c.value=!1}}},p=async A=>{b.value=A,Z(),await n.value.askAI(A,"custom",!0),setTimeout(()=>{me()},500)},w=async()=>{if(!y.value.trim())return;const A=y.value.trim();y.value="",b.value=A,Z(),await n.value.askAI(A,"custom",!0),setTimeout(()=>{me()},500)},U=async()=>{const A=`请对我的${b.value||"八字分析"}进行更详细深入的分析，包括具体的时间节点和注意事项`;b.value=A,Z(),await n.value.askAI(A,"custom"),setTimeout(()=>{me()},500)},V=async()=>{const A=new Date().getFullYear(),T=`我在${A}年和${A+1}年的运势如何？有哪些重要时间节点？`;b.value=T,Z(),await n.value.askAI(T,"custom"),setTimeout(()=>{me()},500)},R=async()=>{const A="基于我的八字，如何改善和提升我的运势？有什么具体的方法和建议？";b.value=A,Z(),await n.value.askAI(A,"custom"),setTimeout(()=>{me()},500)},ce=async()=>{if(!n.value.aiResponse){S.value&&S.value.addToast("暂无AI回答内容可复制","warning","",3e3);return}try{const A=new Date().toLocaleString("zh-CN");let T=`八字分析结果
`;T+=`生成时间：${A}
`,T+=`${"=".repeat(30)}

`,T+=`问题：${b.value||"八字分析"}

`,T+=`回答：
${n.value.aiResponse.replace(/<[^>]*>/g,"").replace(/&nbsp;/g," ")}

`,T+=`${"=".repeat(30)}
`,T+=`来源：八字排盘系统
`,await navigator.clipboard.writeText(T),S.value&&S.value.addToast("AI回答已复制到剪贴板","success","",3e3)}catch(A){console.error("复制失败:",A),S.value&&S.value.addToast("复制失败，请手动选择复制","error","",3e3)}},ye=()=>{be=Date.now(),me(),setTimeout(()=>{if(be=Date.now(),N.value)N.value.scrollIntoView({behavior:"smooth",block:"end"});else{const A=document.querySelector(".ai-response");A&&A.scrollIntoView({behavior:"smooth",block:"end"})}},100)},Z=()=>{I.value=!0,console.log("开始自动滚动"),setTimeout(()=>{ye()},100),L.value=setInterval(()=>{I.value&&(n.value.isAIThinking||n.value.aiResponse)&&(me(),n.value.isAIThinking&&N.value&&setTimeout(()=>{N.value.scrollIntoView({behavior:"smooth",block:"nearest"})},100))},500)},me=()=>{try{be=Date.now(),window.scrollTo({top:999999,behavior:"smooth"}),setTimeout(()=>{be=Date.now();const A=document.documentElement.scrollHeight;window.scrollTo({top:A+1e3,behavior:"smooth"})},100)}catch{try{be=Date.now(),window.scrollTo(0,999999)}catch(T){console.error("滚动失败:",T)}}},je=()=>{I.value=!1,L.value&&(clearInterval(L.value),L.value=null),Ae=!1};let be=0;const Ke=()=>{!I.value||Date.now()-be<3e3},gt=A=>{S.value&&S.value.addToast(A,"success","AI分析完成",4e3)};H.value.length>0&&de(H.value[0]),_e(()=>n.value.isAIThinking,(A,T)=>{T&&!A&&n.value.aiResponse&&n.value.aiResponse.trim()&&(setTimeout(()=>{me()},200),setTimeout(()=>{me()},800),console.log("AI分析完成，自动滚动继续运行，用户可通过滚动操作停止"),gt("请查看分析结果"))}),_e(()=>n.value.aiResponse,(A,T)=>{A&&A!==T&&(setTimeout(()=>{(I.value||A.length>T?.length+50)&&me()},100),setTimeout(()=>{(I.value||A.length>T?.length+50)&&me()},300))}),_e(()=>n.value.isAIThinking,(A,T)=>{console.log("AI思考状态变化:",{wasThinking:T,isThinking:A,hasResponse:!!n.value.aiResponse}),T&&!A&&n.value.aiResponse&&n.value.aiResponse.trim()&&b.value&&(console.log("AI回答完成，准备生成智能建议"),Q.value&&clearTimeout(Q.value),Q.value=setTimeout(()=>{console.log("检查是否可以生成建议:",{isGenerating:c.value,hasUserQuestion:!!b.value}),!c.value&&b.value?(console.log("条件满足，基于用户问题生成智能建议"),k()):console.log("跳过建议生成，条件不满足")},500))});let Ae=!1;const qe=()=>{I.value&&(Ae=!0,je())},Ve=()=>{I.value&&(Ae=!0)},Je=()=>{I.value&&Ae&&(je(),Ae=!1)};return typeof window<"u"&&(window.addEventListener("scroll",Ke,{passive:!0}),window.addEventListener("wheel",qe,{passive:!0}),window.addEventListener("touchstart",Ve,{passive:!0}),window.addEventListener("touchmove",Je,{passive:!0})),vt(()=>{je(),Q.value&&clearTimeout(Q.value),typeof window<"u"&&(window.removeEventListener("scroll",Ke),window.removeEventListener("wheel",qe),window.removeEventListener("touchstart",Ve),window.removeEventListener("touchmove",Je))}),(A,T)=>(_(),$(K,null,[n.value.hasResults?(_(),$("div",Br,[a("div",Or,[a("h3",null,v(n.value.enableSecondPerson?"AI 合盘分析":t.value?"AI 紫薇斗数分析":"AI 命理分析"),1),a("div",Yr,[a("div",Zr,[(_(!0),$(K,null,W(H.value,B=>(_(),$("button",{key:B.id,class:ne(["question-button",{selected:i.value===B.id}]),onClick:ae=>de(B)},v(B.text),11,Hr))),128))])]),r.value?(_(),$("div",Kr,[ee(a("input",{"onUpdate:modelValue":T[0]||(T[0]=B=>o.value=B),type:"text",placeholder:"请输入您的问题",onKeyup:We(le,["enter"])},null,544),[[ue,o.value]])])):M("",!0),n.value.aiError?(_(),$("div",qr,v(n.value.aiError),1)):M("",!0),a("button",{class:ne(["primary-button ai-button",{thinking:n.value.isAIThinking}]),disabled:!se.value||n.value.isAIThinking,onClick:le},v(n.value.isAIThinking?"AI 思考中...":n.value.enableSecondPerson?"AI 合盘分析":"向 AI 提问"),11,Vr)]),a("div",Jr,[T[2]||(T[2]=a("h3",null,"问题灵感",-1)),a("div",Wr,[(_(!0),$(K,null,W(C.value,(B,ae)=>(_(),$("button",{key:B.id,ref_for:!0,ref:X=>{X&&(d.value[ae]=X)},class:ne(["inspiration-tab-button",{active:l.value===B.id}]),onClick:X=>O(B.id)},v(B.name),11,Fr))),128)),a("div",{class:"inspiration-active-tab-indicator",style:xt(u.value)},null,4)]),a("div",Qr,[(_(!0),$(K,null,W(C.value,B=>(_(),$(K,{key:B.id},[l.value===B.id?(_(),$("div",zr,[(_(!0),$(K,null,W(B.content,ae=>(_(),$("div",{key:ae.title,class:"question-group"},[a("h4",null,v(ae.title),1),a("div",Xr,[(_(!0),$(K,null,W(ae.questions,X=>(_(),$("p",{key:X.text,onClick:Pe=>ge(X.text,X.type)},v(X.text),9,eo))),128))])]))),128))])):M("",!0)],64))),128))])]),n.value.aiResponse||n.value.isAIThinking?(_(),$("div",{key:0,class:"ai-response",ref_key:"aiResponseRef",ref:N},[T[4]||(T[4]=a("h3",null,"AI 分析结果",-1)),a("div",{class:"response-content",innerHTML:F.value},null,8,to),n.value.isAIThinking?(_(),$("div",no,T[3]||(T[3]=[a("div",{class:"thinking-dots"},[a("span"),a("span"),a("span")],-1),a("p",null,"AI 正在深度分析中...",-1)]))):M("",!0)],512)):M("",!0),n.value.aiResponse&&!n.value.isAIThinking?(_(),$("div",so,[T[12]||(T[12]=a("h3",null,"继续探索",-1)),b.value?(_(),$("div",ao,[T[5]||(T[5]=a("h4",null,"您的问题",-1)),a("p",ro,v(b.value),1)])):M("",!0),a("div",oo,[T[9]||(T[9]=a("h4",null,"智能建议",-1)),g.value.length>0?(_(),$("div",io,[(_(!0),$(K,null,W(g.value,(B,ae)=>(_(),$("p",{key:ae,onClick:X=>p(B),class:"suggested-question"},v(B),9,lo))),128)),a("button",{onClick:h,class:"suggested-question regenerate-btn",disabled:c.value},v(c.value?"正在更新...":"重新生成建议"),9,co),c.value?(_(),$("div",uo,T[6]||(T[6]=[a("p",{class:"updating-text"},"正在更新建议...",-1)]))):M("",!0)])):c.value?(_(),$("div",ho,T[7]||(T[7]=[a("p",null,"正在生成智能建议...",-1)]))):(_(),$("div",go,T[8]||(T[8]=[a("p",null,"正在准备智能建议...",-1)])))]),a("div",mo,[T[10]||(T[10]=a("h4",null,"自由对话",-1)),a("div",po,[ee(a("input",{"onUpdate:modelValue":T[1]||(T[1]=B=>y.value=B),type:"text",placeholder:"继续询问相关问题...",onKeypress:We(w,["enter"]),disabled:n.value.isAIThinking},null,40,yo),[[ue,y.value]]),a("button",{onClick:w,disabled:!y.value.trim()||n.value.isAIThinking},v(n.value.isAIThinking?"发送中...":"发送"),9,fo)]),T[11]||(T[11]=a("div",{class:"chat-tips"},[a("small",null,'💡 提示：可以询问更具体的问题，如"明年3月适合跳槽吗？"')],-1))]),a("div",vo,[a("button",{class:"action-btn",onClick:U,disabled:n.value.isAIThinking}," 📊 详细分析 ",8,xo),a("button",{class:"action-btn",onClick:V,disabled:n.value.isAIThinking}," 📅 时间运势 ",8,So),a("button",{class:"action-btn",onClick:R,disabled:n.value.isAIThinking}," 💡 改善建议 ",8,_o),a("button",{class:"action-btn",onClick:ce}," 📋 复制结果 ")])])):M("",!0)])):M("",!0),xe(bt,{ref_key:"toastRef",ref:S},null,512)],64))}},rt=ke(Io,[["__scopeId","data-v-37dfdbf8"]]);const $o={class:"ziwei-view"},bo={key:0,class:"desktop-layout"},wo={class:"left-panel"},ko={class:"right-panel"},Ao={key:1,class:"mobile-layout"},Po={__name:"ZiWeiView",setup(s){const e=Ne();return _t(()=>{e.resetPageTitle(),e.restoreDataFromUrl(),console.log("紫薇斗数页面已加载")}),(t,n)=>(_(),$("div",$o,[xe(Wn),P(e).hasResults?(_(),$("div",bo,[a("div",wo,[xe(at)]),a("div",ko,[xe(rt)])])):M("",!0),P(e).hasResults?(_(),$("div",Ao,[xe(at),xe(rt)])):M("",!0)]))}},Mo=ke(Po,[["__scopeId","data-v-87d4b20e"]]);export{Mo as default};
