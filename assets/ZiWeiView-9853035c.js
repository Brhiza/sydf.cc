import{r as D,j as de,v as rt,x as _e,y as te,z as mt,A as P,b as _,d as I,i as a,B as ce,F as K,h as F,C as Je,n as ae,t as v,f as G,D as pt,E as Y,G as yt,l as ot,c as it,e as xe,g as lt,H as ft,a as vt,I as Ve,k as xt,J as St,o as _t}from"./vendor-fcabaa7d.js";import{a as We}from"./iztro-8dcb482b.js";import{s as he,l as fe,a as we,e as Be,_ as ke,b as It,E as $t,T as bt}from"./zw-f31624c6.js";import{S as Ue,G as Ee,a as Le}from"./tyme-86b89837.js";import{m as wt}from"./marked-9682a234.js";function Fe(s,e,t,n,i,o=!1){let r;try{if(!s||!e||!t||n===void 0||!i)throw new Error("缺少必要的出生信息");if(s<1900||s>2100)throw new Error("年份必须在1900-2100之间");if(e<1||e>12)throw new Error("月份必须在1-12之间");if(t<1||t>31)throw new Error("日期必须在1-31之间");if(n=parseInt(n),isNaN(n)||n<0||n>12)throw new Error(`时辰索引必须在0-12之间，当前值: ${n}`);if(!["male","female"].includes(i))throw new Error("性别必须是 male 或 female");if(n===0?r=0:n===12?r=23:r=(n-1)*2+1,r<0||r>23)throw new Error(`计算出的小时值无效: ${r}，timeIndex: ${n}`);const l=`${s}-${e.toString().padStart(2,"0")}-${t.toString().padStart(2,"0")}`,d=i==="male"?"男":"女";let c;o?c=We.byLunar(l,n,d,!1,!0,"zh-CN"):c=We.bySolar(l,n,d,!0,"zh-CN");const g=new Date().getFullYear(),u={name:"",gender:i,year:s,month:e,day:t,timeIndex:n,hour:r,isLunar:o,solarDate:c.solarDate,lunarDate:c.lunarDate,chineseDate:c.chineseDate,time:c.time,timeRange:c.timeRange,sign:c.sign,zodiac:c.zodiac,soulPalace:c.soul||"",bodyPalace:c.body||"",earthlyBranchOfBodyPalace:c.earthlyBranchOfBodyPalace||"",earthlyBranchOfSoulPalace:c.earthlyBranchOfSoulPalace||"",fiveElementsClass:c.fiveElementsClass||"",currentAge:g-s},m=c.palaces.map((k,p)=>({index:p,name:k.name,isBodyPalace:k.isBodyPalace,isOriginalPalace:k.isOriginalPalace,heavenlyStem:k.heavenlyStem,earthlyBranch:k.earthlyBranch,majorStars:k.majorStars.map(S=>({name:S.name,type:S.type,scope:S.scope,brightness:S.brightness,mutagen:S.mutagen||""})),minorStars:k.minorStars.map(S=>({name:S.name,type:S.type,scope:S.scope,brightness:S.brightness,mutagen:S.mutagen||""})),adjectiveStars:k.adjectiveStars.map(S=>({name:S.name,type:S.type,scope:S.scope,brightness:S.brightness,mutagen:S.mutagen||""})),changsheng12:k.changsheng12||"",boshi12:k.boshi12||"",jiangqian12:k.jiangqian12||"",suiqian12:k.suiqian12||"",decadal:k.decadal||"",ages:k.ages||[],isEmpty:k.isEmpty(),starCount:{major:k.majorStars.length,minor:k.minorStars.length,adjective:k.adjectiveStars.length,total:k.majorStars.length+k.minorStars.length+k.adjectiveStars.length}})),f={lu:"",quan:"",ke:"",ji:""};c.palaces.forEach(k=>{[...k.majorStars,...k.minorStars,...k.adjectiveStars].forEach(p=>{if(p.mutagen)switch(p.mutagen){case"禄":f.lu=p.name;break;case"权":f.quan=p.name;break;case"科":f.ke=p.name;break;case"忌":f.ji=p.name;break}})});const x=g-s;let w={currentAge:x,decadal:"",yearly:""};return console.log("运限信息暂时跳过，当前年龄:",x),{...u,palaces:m,mutagens:f,horoscope:w,_astrolabe:c}}catch(l){throw console.error("紫薇斗数计算失败:",l),console.error("计算参数:",{year:s,month:e,day:t,timeIndex:n,hourValue:r,gender:i,isLunar:o}),l.message.includes("wrong hour")?new Error(`时辰参数错误: 小时值${r}无效，请检查时辰选择`):new Error(`紫薇斗数计算失败: ${l.message}`)}}function Qe(s){return s?{basicInfo:{name:s.name||"",gender:s.gender==="male"?"男":"女",birthDate:{solar:s.solarDate||"",lunar:s.lunarDate||"",chinese:s.chineseDate||""},time:s.time||"",timeRange:s.timeRange||"",sign:s.sign||"",zodiac:s.zodiac||"",fiveElementsClass:s.fiveElementsClass||"",soulPalace:s.soulPalace||"",bodyPalace:s.bodyPalace||""},palaces:(s.palaces||[]).map(e=>({name:e.name||"",isBodyPalace:e.isBodyPalace||!1,heavenlyStem:e.heavenlyStem||"",earthlyBranch:e.earthlyBranch||"",allStars:[...(e.majorStars||[]).map(t=>({...t,type:"major"})),...(e.minorStars||[]).map(t=>({...t,type:"minor"})),...(e.adjectiveStars||[]).map(t=>({...t,type:"adjective"}))].map(t=>({name:t.name||"",type:t.type||"",brightness:t.brightness||"",mutagen:t.mutagen||""})),changsheng12:e.changsheng12||"",ages:e.ages||[]})),mutagens:s.mutagens||{},horoscope:s.horoscope||{}}:null}const ct=`你是一位资深的紫薇斗数命理师，拥有深厚的紫薇斗数理论基础和丰富的实践经验。

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
4. 保持专业性和准确性`;function Et(s){return{personality:kt,career:At,relationship:Pt,health:Ct,fortune:Tt,compatibility:ut,custom:ze}[s]||ze}function Lt(s,e,t){const n=ct,i=Et(s);let o=`${n}

${i}

`;return o+=`【星盘信息】
`,o+=`基本信息：${JSON.stringify(t.basicInfo,null,2)}
`,o+=`宫位信息：${JSON.stringify(t.palaces,null,2)}
`,o+=`四化信息：${JSON.stringify(t.mutagens,null,2)}
`,o+=`运限信息：${JSON.stringify(t.horoscope,null,2)}

`,o+=`【用户问题】
${e}

`,o+="请基于以上信息进行专业分析，给出详细的解读和建议。",o}function Ut(s,e,t){let o=`${ct}

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

`,o+="请基于以上两人的星盘信息进行专业的合盘分析，给出详细的匹配度解读和相处建议。",o}function Gt(s){if(!s)return"";try{const e=new URLSearchParams;return e.set("y",s.year),e.set("m",s.month),e.set("d",s.day),e.set("t",s.timeIndex),e.set("g",s.gender),s.name&&e.set("n",s.name),e.toString()}catch(e){return console.error("编码八字数据到URL失败:",e),""}}function Oe(s){if(!s)return null;try{const e=new URLSearchParams(s),t=e.get("y"),n=e.get("m"),i=e.get("d"),o=e.get("t"),r=e.get("g"),l=e.get("n");if(!t||!n||!i||o===null||!r)return console.warn("URL中的八字数据不完整"),null;const d=parseInt(t),c=parseInt(n),g=parseInt(i),u=parseInt(o);return d<1900||d>2100||c<1||c>12||g<1||g>31||u<0||u>12||!["male","female"].includes(r)?(console.warn("URL中的八字数据无效"),null):{year:d,month:c,day:g,timeIndex:u,gender:r,name:l||""}}catch(e){return console.error("从URL解码八字数据失败:",e),null}}function Me(s){if(s)try{const e=new URL(window.location);e.searchParams.set("y",s.year),e.searchParams.set("m",s.month),e.searchParams.set("d",s.day),e.searchParams.set("t",s.timeIndex),e.searchParams.set("g",s.gender),s.name?e.searchParams.set("n",s.name):e.searchParams.delete("n"),e.searchParams.delete("bz"),window.history.replaceState({},"",e.toString())}catch(e){console.error("更新URL失败:",e)}}function Nt(){try{const s=new URL(window.location);if(s.searchParams.has("y")&&s.searchParams.has("m")&&s.searchParams.has("d")&&s.searchParams.has("t")&&s.searchParams.has("g"))return Oe(s.search.substring(1));const e=s.searchParams.get("bz");if(e)try{const t=decodeURIComponent(atob(e)),n=JSON.parse(t);return{year:parseInt(n.y),month:parseInt(n.m),day:parseInt(n.d),timeIndex:parseInt(n.t),gender:n.g,name:n.n||""}}catch(t){return console.warn("旧格式URL解码失败:",t),null}return null}catch(s){return console.error("从URL获取八字数据失败:",s),null}}function jt(){try{const s=new URL(window.location);s.searchParams.delete("y"),s.searchParams.delete("m"),s.searchParams.delete("d"),s.searchParams.delete("t"),s.searchParams.delete("g"),s.searchParams.delete("n"),s.searchParams.delete("bz"),window.history.replaceState({},"",s.toString())}catch(s){console.error("清除URL中的八字数据失败:",s)}}function dt(s,e){if(!s||!e)return"";try{const t={p1:{y:s.year,m:s.month,d:s.day,t:s.timeIndex,g:s.gender,n:s.name||""},p2:{y:e.year,m:e.month,d:e.day,t:e.timeIndex,g:e.gender,n:e.name||""}},n=JSON.stringify(t);return btoa(encodeURIComponent(n))}catch(t){return console.error("编码合盘数据到URL失败:",t),""}}function Mt(s){if(!s)return null;try{const e=decodeURIComponent(atob(s)),t=JSON.parse(e);if(!t.p1||!t.p2)return console.warn("URL中的合盘数据不完整"),null;const n=Oe(btoa(encodeURIComponent(JSON.stringify(t.p1)))),i=Oe(btoa(encodeURIComponent(JSON.stringify(t.p2))));return!n||!i?(console.warn("URL中的合盘数据无效"),null):{person1:n,person2:i}}catch(e){return console.error("从URL解码合盘数据失败:",e),null}}function Dt(s,e){if(!(!s||!e))try{const t=dt(s,e);if(t){const n=new URL(window.location);n.searchParams.set("cp",t),n.searchParams.delete("bz"),window.history.replaceState({},"",n.toString())}}catch(t){console.error("更新合盘URL失败:",t)}}function Rt(){try{const e=new URL(window.location).searchParams.get("cp");return Mt(e)}catch(s){return console.error("从URL获取合盘数据失败:",s),null}}function Bt(){try{const s=new URL(window.location);s.searchParams.delete("cp"),window.history.replaceState({},"",s.toString())}catch(s){console.error("清除URL中的合盘数据失败:",s)}}function Xe(s,e=null){const t=window.location.origin+window.location.pathname;if(e){const n=dt(s,e);return n?`${t}?cp=${n}`:t}else{const n=Gt(s);return n?`${t}?${n}`:t}}function Ot(){try{const s=new URL(window.location);return s.searchParams.has("bz")||s.searchParams.has("cp")||s.searchParams.has("y")&&s.searchParams.has("m")&&s.searchParams.has("d")&&s.searchParams.has("t")&&s.searchParams.has("g")}catch{return!1}}function Yt(s){if(!s)return"";try{const e=new URLSearchParams;return e.set("y",s.year),e.set("m",s.month),e.set("d",s.day),e.set("t",s.timeIndex),e.set("g",s.gender),s.name&&e.set("n",s.name),s.isLunar&&e.set("l","1"),e.toString()}catch(e){return console.error("编码紫薇斗数数据到URL失败:",e),""}}function Zt(s){if(!s)return null;try{const e=new URLSearchParams(s);if(!e.has("y")||!e.has("m")||!e.has("d")||!e.has("t")||!e.has("g"))return console.warn("URL中的紫薇斗数数据不完整"),null;const t=parseInt(e.get("y")),n=parseInt(e.get("m")),i=parseInt(e.get("d")),o=parseInt(e.get("t")),r=e.get("g");return t<1900||t>2100||n<1||n>12||i<1||i>31||o<0||o>12||!["male","female"].includes(r)?(console.warn("URL中的紫薇斗数数据无效"),null):{year:t,month:n,day:i,timeIndex:o,gender:r,name:e.get("n")||"",isLunar:e.get("l")==="1"}}catch(e){return console.error("从URL解码紫薇斗数数据失败:",e),null}}function Ht(s){if(s)try{const e=new URL(window.location);e.searchParams.set("y",s.year),e.searchParams.set("m",s.month),e.searchParams.set("d",s.day),e.searchParams.set("t",s.timeIndex),e.searchParams.set("g",s.gender),s.name?e.searchParams.set("n",s.name):e.searchParams.delete("n"),s.isLunar?e.searchParams.set("l","1"):e.searchParams.delete("l"),e.searchParams.delete("zw"),e.searchParams.delete("bz"),window.history.replaceState({},"",e.toString())}catch(e){console.error("更新紫薇斗数URL失败:",e)}}function qt(){try{const s=new URL(window.location);if(s.searchParams.has("y")&&s.searchParams.has("m")&&s.searchParams.has("d")&&s.searchParams.has("t")&&s.searchParams.has("g"))return Zt(s.search.substring(1));const e=s.searchParams.get("zw");if(e)try{const t=decodeURIComponent(atob(e)),n=JSON.parse(t);return{year:parseInt(n.y),month:parseInt(n.m),day:parseInt(n.d),timeIndex:parseInt(n.t),gender:n.g,name:n.n||"",isLunar:n.l||!1}}catch(t){return console.warn("旧格式紫薇斗数URL解码失败:",t),null}return null}catch(s){return console.error("从URL获取紫薇斗数数据失败:",s),null}}function Kt(){try{const s=new URL(window.location);s.searchParams.delete("y"),s.searchParams.delete("m"),s.searchParams.delete("d"),s.searchParams.delete("t"),s.searchParams.delete("g"),s.searchParams.delete("n"),s.searchParams.delete("l"),s.searchParams.delete("zw"),window.history.replaceState({},"",s.toString())}catch(s){console.error("清除URL中的紫薇斗数数据失败:",s)}}function Jt(s,e){if(!s||!e)return"";try{const t=new URLSearchParams;return t.set("p1_y",s.year),t.set("p1_m",s.month),t.set("p1_d",s.day),t.set("p1_t",s.timeIndex),t.set("p1_g",s.gender),s.name&&t.set("p1_n",s.name),s.isLunar&&t.set("p1_l","1"),t.set("p2_y",e.year),t.set("p2_m",e.month),t.set("p2_d",e.day),t.set("p2_t",e.timeIndex),t.set("p2_g",e.gender),e.name&&t.set("p2_n",e.name),e.isLunar&&t.set("p2_l","1"),t.toString()}catch(t){return console.error("编码紫薇斗数合盘数据到URL失败:",t),""}}function Vt(s){if(!s)return null;try{const e=new URLSearchParams(s);if(!e.has("p1_y")||!e.has("p2_y"))return console.warn("URL中的紫薇斗数合盘数据不完整"),null;const t={year:parseInt(e.get("p1_y")),month:parseInt(e.get("p1_m")),day:parseInt(e.get("p1_d")),timeIndex:parseInt(e.get("p1_t")),gender:e.get("p1_g"),name:e.get("p1_n")||"",isLunar:e.get("p1_l")==="1"},n={year:parseInt(e.get("p2_y")),month:parseInt(e.get("p2_m")),day:parseInt(e.get("p2_d")),timeIndex:parseInt(e.get("p2_t")),gender:e.get("p2_g"),name:e.get("p2_n")||"",isLunar:e.get("p2_l")==="1"};return!t.year||!t.month||!t.day||t.timeIndex===void 0||!t.gender||!n.year||!n.month||!n.day||n.timeIndex===void 0||!n.gender?(console.warn("URL中的紫薇斗数合盘数据无效"),null):{person1:t,person2:n}}catch(e){return console.error("从URL解码紫薇斗数合盘数据失败:",e),null}}function Wt(s,e){if(!(!s||!e))try{const t=new URL(window.location),n=[];for(const i of t.searchParams.keys())n.push(i);n.forEach(i=>t.searchParams.delete(i)),t.searchParams.set("p1_y",s.year),t.searchParams.set("p1_m",s.month),t.searchParams.set("p1_d",s.day),t.searchParams.set("p1_t",s.timeIndex),t.searchParams.set("p1_g",s.gender),s.name&&t.searchParams.set("p1_n",s.name),s.isLunar&&t.searchParams.set("p1_l","1"),t.searchParams.set("p2_y",e.year),t.searchParams.set("p2_m",e.month),t.searchParams.set("p2_d",e.day),t.searchParams.set("p2_t",e.timeIndex),t.searchParams.set("p2_g",e.gender),e.name&&t.searchParams.set("p2_n",e.name),e.isLunar&&t.searchParams.set("p2_l","1"),window.history.replaceState({},"",t.toString())}catch(t){console.error("更新紫薇斗数合盘URL失败:",t)}}function Ft(){try{const s=new URL(window.location);if(s.searchParams.has("p1_y")&&s.searchParams.has("p2_y"))return Vt(s.search.substring(1));const e=s.searchParams.get("zwcp");if(e)try{const t=decodeURIComponent(atob(e)),n=JSON.parse(t);return!n.p1||!n.p2?null:{person1:{year:parseInt(n.p1.y),month:parseInt(n.p1.m),day:parseInt(n.p1.d),timeIndex:parseInt(n.p1.t),gender:n.p1.g,name:n.p1.n||"",isLunar:n.p1.l||!1},person2:{year:parseInt(n.p2.y),month:parseInt(n.p2.m),day:parseInt(n.p2.d),timeIndex:parseInt(n.p2.t),gender:n.p2.g,name:n.p2.n||"",isLunar:n.p2.l||!1}}}catch(t){return console.warn("旧格式紫薇斗数合盘URL解码失败:",t),null}return null}catch(s){return console.error("从URL获取紫薇斗数合盘数据失败:",s),null}}function Qt(){try{const s=new URL(window.location),e=[];for(const t of s.searchParams.keys())(t.startsWith("p1_")||t.startsWith("p2_"))&&e.push(t);e.forEach(t=>s.searchParams.delete(t)),s.searchParams.delete("zwcp"),window.history.replaceState({},"",s.toString())}catch(s){console.error("清除URL中的紫薇斗数合盘数据失败:",s)}}function et(s,e=null){const t=window.location.origin+window.location.pathname;if(e){const n=Jt(s,e);return n?`${t}?${n}`:t}else{const n=Yt(s);return n?`${t}?${n}`:t}}function zt(s={}){const e={name:"",year:"",month:"",day:"",timeIndex:0,gender:"",isLunar:!1,...s},t=D({...e}),n=D({...e}),i=D(!1),o=D(null),r=D(null),l=D(!1),d=D(""),c=de(()=>{const m=t.value.year&&t.value.month&&t.value.day&&t.value.timeIndex!==""&&t.value.gender;if(!i.value)return m;const f=n.value.year&&n.value.month&&n.value.day&&n.value.timeIndex!==""&&n.value.gender;return m&&f}),g=de(()=>o.value!==null);return{person1:t,person2:n,enableSecondPerson:i,result1:o,result2:r,isCalculating:l,calculationError:d,canCalculate:c,hasResults:g,resetData:()=>{t.value={...e},n.value={...e},i.value=!1,o.value=null,r.value=null,d.value=""}}}const q={HEAVENLY_STEMS:["甲","乙","丙","丁","戊","己","庚","辛","壬","癸"],EARTHLY_BRANCHES:["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"],STEM_WUXING:["木","木","火","火","土","土","金","金","水","水"],BRANCH_WUXING:["水","土","木","木","土","火","火","土","金","金","土","水"],STEM_YINYANG:["阳","阴","阳","阴","阳","阴","阳","阴","阳","阴"],BRANCH_YINYANG:["阳","阴","阳","阴","阳","阴","阳","阴","阳","阴","阳","阴"],WUXING_SHENG:{木:"火",火:"土",土:"金",金:"水",水:"木"},WUXING_KE:{木:"土",火:"金",土:"水",金:"木",水:"火"},TIME_BRANCHES:[{name:"早子时",hour:0,branch:"子"},{name:"丑时",hour:1,branch:"丑"},{name:"寅时",hour:3,branch:"寅"},{name:"卯时",hour:5,branch:"卯"},{name:"辰时",hour:7,branch:"辰"},{name:"巳时",hour:9,branch:"巳"},{name:"午时",hour:11,branch:"午"},{name:"未时",hour:13,branch:"未"},{name:"申时",hour:15,branch:"申"},{name:"酉时",hour:17,branch:"酉"},{name:"戌时",hour:19,branch:"戌"},{name:"亥时",hour:21,branch:"亥"},{name:"晚子时",hour:23,branch:"子"}]},De={子:["癸"],丑:["己","癸","辛"],寅:["甲","丙","戊"],卯:["乙"],辰:["戊","乙","癸"],巳:["丙","庚","戊"],午:["丁","己"],未:["己","丁","乙"],申:["庚","壬","戊"],酉:["辛"],戌:["戊","辛","丁"],亥:["壬","甲"]},Xt={甲子:"海中金",乙丑:"海中金",丙寅:"炉中火",丁卯:"炉中火",戊辰:"大林木",己巳:"大林木",庚午:"路旁土",辛未:"路旁土",壬申:"剑锋金",癸酉:"剑锋金",甲戌:"山头火",乙亥:"山头火",丙子:"涧下水",丁丑:"涧下水",戊寅:"城头土",己卯:"城头土",庚辰:"白蜡金",辛巳:"白蜡金",壬午:"杨柳木",癸未:"杨柳木",甲申:"泉中水",乙酉:"泉中水",丙戌:"屋上土",丁亥:"屋上土",戊子:"霹雳火",己丑:"霹雳火",庚寅:"松柏木",辛卯:"松柏木",壬辰:"长流水",癸巳:"长流水",甲午:"砂中金",乙未:"砂中金",丙申:"山下火",丁酉:"山下火",戊戌:"平地木",己亥:"平地木",庚子:"壁上土",辛丑:"壁上土",壬寅:"金箔金",癸卯:"金箔金",甲辰:"覆灯火",乙巳:"覆灯火",丙午:"天河水",丁未:"天河水",戊申:"大驿土",己酉:"大驿土",庚戌:"钗钏金",辛亥:"钗钏金",壬子:"桑柘木",癸丑:"桑柘木",甲寅:"大溪水",乙卯:"大溪水",丙辰:"沙中土",丁巳:"沙中土",戊午:"天上火",己未:"天上火",庚申:"石榴木",辛酉:"石榴木",壬戌:"大海水",癸亥:"大海水"},tt={金:{color:"白、金、银",direction:"西",industry:"金融、五金、科技、汽车、司法",advice:"增强决断力，保持原则，处事要果断。"},木:{color:"绿、青",direction:"东",industry:"教育、林业、文化、服装、医药",advice:"保持仁爱之心，积极成长，多接触自然。"},水:{color:"黑、蓝、灰",direction:"北",industry:"贸易、物流、水产、旅游、媒体",advice:"锻炼沟通能力，灵活应变，保持谦逊。"},火:{color:"红、橙、紫",direction:"南",industry:"电力、餐饮、IT、化工、礼仪",advice:"保持热情与活力，待人接物要真诚有礼。"},土:{color:"黄、棕、褐",direction:"中（本地）",industry:"地产、建筑、农业、保险",advice:"为人处事要诚信稳重，脚踏实地。"}},Re={甲:{亥:"长生",子:"沐浴",丑:"冠带",寅:"临官",卯:"帝旺",辰:"衰",巳:"病",午:"死",未:"墓",申:"绝",酉:"胎",戌:"养"},乙:{午:"长生",巳:"沐浴",辰:"冠带",卯:"临官",寅:"帝旺",丑:"衰",子:"病",亥:"死",戌:"墓",酉:"绝",申:"胎",未:"养"},丙:{寅:"长生",卯:"沐浴",辰:"冠带",巳:"临官",午:"帝旺",未:"衰",申:"病",酉:"死",戌:"墓",亥:"绝",子:"胎",丑:"养"},丁:{酉:"长生",申:"沐浴",未:"冠带",午:"临官",巳:"帝旺",辰:"衰",卯:"病",寅:"死",丑:"墓",子:"绝",亥:"胎",戌:"养"},戊:{寅:"长生",卯:"沐浴",辰:"冠带",巳:"临官",午:"帝旺",未:"衰",申:"病",酉:"死",戌:"墓",亥:"绝",子:"胎",丑:"养"},己:{酉:"长生",申:"沐浴",未:"冠带",午:"临官",巳:"帝旺",辰:"衰",卯:"病",寅:"死",丑:"墓",子:"绝",亥:"胎",戌:"养"},庚:{巳:"长生",午:"沐浴",未:"冠带",申:"临官",酉:"帝旺",戌:"衰",亥:"病",子:"死",丑:"墓",寅:"绝",卯:"胎",辰:"养"},辛:{子:"长生",亥:"沐浴",戌:"冠带",酉:"临官",申:"帝旺",未:"衰",午:"病",巳:"死",辰:"墓",卯:"绝",寅:"胎",丑:"养"},壬:{申:"长生",酉:"沐浴",戌:"冠带",亥:"临官",子:"帝旺",丑:"衰",寅:"病",卯:"死",辰:"墓",巳:"绝",午:"胎",未:"养"},癸:{卯:"长生",寅:"沐浴",丑:"冠带",子:"临官",亥:"帝旺",戌:"衰",酉:"病",申:"死",未:"墓",午:"绝",巳:"胎",辰:"养"}},en={寅:{木:"旺",火:"相",水:"休",金:"囚",土:"死"},卯:{木:"旺",火:"相",水:"休",金:"囚",土:"死"},辰:{土:"旺",金:"相",火:"休",木:"囚",水:"死"},巳:{火:"旺",土:"相",木:"休",水:"囚",金:"死"},午:{火:"旺",土:"相",木:"休",水:"囚",金:"死"},未:{土:"旺",金:"相",火:"休",木:"囚",水:"死"},申:{金:"旺",水:"相",土:"休",火:"囚",木:"死"},酉:{金:"旺",水:"相",土:"休",火:"囚",木:"死"},戌:{土:"旺",金:"相",火:"休",木:"囚",水:"死"},亥:{水:"旺",木:"相",金:"休",土:"囚",火:"死"},子:{水:"旺",木:"相",金:"休",土:"囚",火:"死"},丑:{土:"旺",金:"相",火:"休",木:"囚",水:"死"}},tn={寅:[["戊",7],["丙",7],["甲",16]],卯:[["甲",10],["乙",20]],辰:[["乙",9],["癸",3],["戊",18]],巳:[["戊",7],["庚",9],["丙",14]],午:[["丙",10],["丁",20]],未:[["丁",9],["乙",3],["己",18]],申:[["庚",10],["壬",3],["戊",17]],酉:[["庚",10],["辛",20]],戌:[["辛",9],["丁",3],["戊",18]],亥:[["戊",7],["甲",23]],子:[["壬",10],["癸",20]],丑:[["癸",9],["辛",3],["己",18]]};class nn{constructor(){this.ctg=q.HEAVENLY_STEMS,this.cdz=q.EARTHLY_BRANCHES}zhiIdx(e){return this.cdz.indexOf(e)}calculateAllShenSha(e,t){const n={},i=["year","month","day","hour"];return e.forEach((o,r)=>{const[l,d]=o,c=this.calculatePillarShenSha(l,d,r,e,t);n[i[r]]=c}),n}calculatePillarShenSha(e,t,n,i,o){const r=[],[l,d]=i[0],[c,g]=i[1],[u,m]=i[2];i[3];const f=u+m,x=e+t;this.ctg.indexOf(l)%2;const w=o==="male",k={天乙贵人:()=>{const p={甲:["丑","未"],戊:["丑","未"],庚:["丑","未"],己:["子","申"],乙:["子","申"],丙:["亥","酉"],丁:["亥","酉"],壬:["卯","巳"],癸:["卯","巳"],辛:["寅","午"]};return p[l]&&p[l].includes(t)||p[u]&&p[u].includes(t)},太极贵人:()=>{const p={甲:["子","午"],乙:["子","午"],丙:["卯","酉"],丁:["卯","酉"],戊:["辰","戌","丑","未"],己:["辰","戌","丑","未"],庚:["寅","亥"],辛:["寅","亥"],壬:["巳","申"],癸:["巳","申"]};return p[l]&&p[l].includes(t)||p[u]&&p[u].includes(t)},天德贵人:()=>{const S={寅:1,卯:2,辰:3,巳:4,午:5,未:6,申:7,酉:8,戌:9,亥:10,子:11,丑:12}[g];if(!S)return!1;const L={1:"丁",2:"申",3:"壬",4:"辛",5:"亥",6:"甲",7:"癸",8:"寅",9:"丙",10:"乙",11:"巳",12:"庚"}[S];return L===e||L===t},天德合:()=>{const S={寅:1,卯:2,辰:3,巳:4,午:5,未:6,申:7,酉:8,戌:9,亥:10,子:11,丑:12}[g];if(!S)return!1;const L={1:"丁",2:"申",3:"壬",4:"辛",5:"亥",6:"甲",7:"癸",8:"寅",9:"丙",10:"乙",11:"巳",12:"庚"}[S];return{甲:"己",乙:"庚",丙:"辛",丁:"壬",戊:"癸",己:"甲",庚:"乙",辛:"丙",壬:"丁",癸:"戊"}[L]===e},月德贵人:()=>({寅:"丙",午:"丙",戌:"丙",申:"壬",子:"壬",辰:"壬",亥:"甲",卯:"甲",未:"甲",巳:"庚",酉:"庚",丑:"庚"})[g]===e,月德合:()=>{const p={寅:"丙",午:"丙",戌:"丙",申:"壬",子:"壬",辰:"壬",亥:"甲",卯:"甲",未:"甲",巳:"庚",酉:"庚",丑:"庚"}[g];return{甲:"己",乙:"庚",丙:"辛",丁:"壬",戊:"癸",己:"甲",庚:"乙",辛:"丙",壬:"丁",癸:"戊"}[p]===e},三奇贵人:()=>{const p=i.map(L=>L[0]),S=[["乙","丙","丁"],["甲","戊","庚"],["辛","壬","癸"]];for(let L=0;L<=p.length-3;L++){const j=p.slice(L,L+3);if(S.some(Q=>Q.every((z,M)=>z===j[M])))return!0}return!1},福星贵人:()=>{const p={甲:"寅",乙:"丑",丙:"子",丁:"亥",戊:"申",己:"未",庚:"午",辛:"巳",壬:"辰",癸:"卯"};return p[l]===t||p[u]===t},文昌贵人:()=>{const p={甲:"巳",乙:"午",丙:"申",丁:"酉",戊:"申",己:"酉",庚:"亥",辛:"子",壬:"寅",癸:"卯"};return p[l]===t||p[u]===t},国印贵人:()=>{const p={甲:"戌",乙:"亥",丙:"丑",丁:"寅",戊:"丑",己:"寅",庚:"辰",辛:"巳",壬:"未",癸:"申"};return p[l]===t||p[u]===t},学堂:()=>{const p=q.STEM_WUXING[u];return{木:"亥",火:"寅",土:"申",金:"巳",水:"申"}[p]===t},词馆:()=>({甲:"寅",乙:"卯",丙:"巳",丁:"午",戊:"巳",己:"午",庚:"申",辛:"酉",壬:"亥",癸:"子"})[u]===t,天厨贵人:()=>({甲:"巳",乙:"午",丙:"子",丁:"亥",戊:"申",己:"未",庚:"寅",辛:"卯",壬:"酉",癸:"戌"})[u]===t,德秀贵人:()=>{const S={寅:"火",午:"火",戌:"火",申:"水",子:"水",辰:"水",巳:"金",酉:"金",丑:"金",亥:"木",卯:"木",未:"木"}[g],L={甲:"己",乙:"庚",丙:"辛",丁:"壬",戊:"癸"},j=[];return S==="火"?j.push("丁","己","癸","庚"):S==="水"?j.push("壬","甲","戊","己","辛"):S==="金"?j.push("庚","壬","乙","丙","戊"):S==="木"&&j.push("乙","癸","丁","丙","庚"),j.includes(e)||L[e]&&j.includes(L[e])},禄神:()=>({甲:"寅",乙:"卯",丙:"巳",丁:"午",戊:"巳",己:"午",庚:"申",辛:"酉",壬:"亥",癸:"子"})[u]===t,羊刃:()=>({甲:"卯",丙:"午",戊:"午",庚:"酉",壬:"子"})[u]===t,飞刃:()=>{const S={甲:"卯",丙:"午",戊:"午",庚:"酉",壬:"子"}[u];return S?{子:"午",丑:"未",寅:"申",卯:"酉",辰:"戌",巳:"亥",午:"子",未:"丑",申:"寅",酉:"卯",戌:"辰",亥:"巳"}[S]===t:!1},驿马:()=>{const p={申:"寅",子:"寅",辰:"寅",亥:"巳",卯:"巳",未:"巳",寅:"申",午:"申",戌:"申",巳:"亥",酉:"亥",丑:"亥"};return p[d]===t||p[m]===t},将星:()=>{const p={申:"子",子:"子",辰:"子",亥:"卯",卯:"卯",未:"卯",寅:"午",午:"午",戌:"午",巳:"酉",酉:"酉",丑:"酉"};return p[d]===t||p[m]===t},华盖:()=>{const p={申:"辰",子:"辰",辰:"辰",亥:"未",卯:"未",未:"未",寅:"戌",午:"戌",戌:"戌",巳:"丑",酉:"丑",丑:"丑"};return p[d]===t||p[m]===t},金舆:()=>({甲:"辰",乙:"巳",丙:"未",丁:"申",戊:"未",己:"申",庚:"戌",辛:"亥",壬:"丑",癸:"寅"})[u]===t,金神:()=>["乙丑","己巳","癸酉"].includes(x)&&(n===2||n===3),天赦日:()=>{if(n!==2)return!1;const p={寅:"春",卯:"春",辰:"春",巳:"夏",午:"夏",未:"夏",申:"秋",酉:"秋",戌:"秋",亥:"冬",子:"冬",丑:"冬"}[g];return p==="春"&&f==="戊寅"||p==="夏"&&f==="甲午"||p==="秋"&&f==="戊申"||p==="冬"&&f==="甲子"},魁罡:()=>n===2&&["庚辰","壬辰","戊戌","庚戌"].includes(f),阴差阳错:()=>n===2&&["丙子","丁丑","戊寅","辛卯","壬辰","癸巳","丙午","丁未","戊申","辛酉","壬戌","癸亥"].includes(f),孤鸾煞:()=>n===2&&["乙巳","丁巳","辛亥","戊申","甲寅","壬子","丙午","戊午","己未","癸丑"].includes(f),十灵日:()=>n===2&&["甲辰","乙亥","丙辰","丁酉","戊午","庚戌","辛亥","壬寅","癸未"].includes(f),六秀日:()=>n===2&&["丙午","丁未","戊子","戊午","己丑","己未"].includes(f),八专:()=>n===2&&["甲寅","乙卯","己未","丁巳","庚申","辛酉","戊戌","癸丑"].includes(f),九丑:()=>n===2&&["戊子","戊午","壬子","壬午","乙卯","辛卯","乙酉","辛酉","己卯","己酉"].includes(f),四废日:()=>{if(n!==2)return!1;const p={寅:"春",卯:"春",辰:"春",巳:"夏",午:"夏",未:"夏",申:"秋",酉:"秋",戌:"秋",亥:"冬",子:"冬",丑:"冬"},S={春:["庚申","辛酉"],夏:["壬子","癸亥"],秋:["甲寅","乙卯"],冬:["丙午","丁巳"]},L=p[g];return L&&S[L].includes(f)},十恶大败:()=>{const p=this.ctg.indexOf(l),S=this.cdz.indexOf(d);if(p===-1||S===-1)return!1;const L=(10+S-p)%12,j=(11+S-p)%12,Q=[this.cdz[L],this.cdz[j]],M={甲:"寅",乙:"卯",丙:"巳",丁:"午",戊:"巳",己:"午",庚:"申",辛:"酉",壬:"亥",癸:"子"}[u];return Q.includes(M)},童子煞:()=>{const S={寅:"春",卯:"春",辰:"春",巳:"夏",午:"夏",未:"夏",申:"秋",酉:"秋",戌:"秋",亥:"冬",子:"冬",丑:"冬"}[g];return S?(S==="春"||S==="秋")&&(t==="寅"||t==="卯")||(S==="夏"||S==="冬")&&(t==="午"||t==="子"):!1},天转:()=>(n===2||n===3)&&{春:"乙卯",夏:"戊午",秋:"辛酉",冬:"癸子"}[{寅:"春",卯:"春",辰:"春",巳:"夏",午:"夏",未:"夏",申:"秋",酉:"秋",戌:"秋",亥:"冬",子:"冬",丑:"冬"}[g]]===x,地转:()=>(n===2||n===3)&&{春:"甲寅",夏:"丁巳",秋:"庚申",冬:"癸亥"}[{寅:"春",卯:"春",辰:"春",巳:"夏",午:"夏",未:"夏",申:"秋",酉:"秋",戌:"秋",亥:"冬",子:"冬",丑:"冬"}[g]]===x,桃花:()=>{const p={寅:"卯",午:"卯",戌:"卯",亥:"子",卯:"子",未:"子",申:"酉",子:"酉",辰:"酉",巳:"午",酉:"午",丑:"午"};return p[d]===t||p[m]===t},红鸾:()=>({子:"卯",丑:"寅",寅:"丑",卯:"子",辰:"亥",巳:"戌",午:"酉",未:"申",申:"未",酉:"午",戌:"巳",亥:"辰"})[d]===t,天喜:()=>({子:"酉",丑:"申",寅:"未",卯:"午",辰:"巳",巳:"辰",午:"卯",未:"寅",申:"丑",酉:"子",戌:"亥",亥:"戌"})[d]===t,孤辰:()=>({亥:"寅",子:"寅",丑:"寅",寅:"巳",卯:"巳",辰:"巳",巳:"申",午:"申",未:"申",申:"亥",酉:"亥",戌:"亥"})[d]===t,寡宿:()=>({亥:"戌",子:"戌",丑:"戌",寅:"丑",卯:"丑",辰:"丑",巳:"辰",午:"辰",未:"辰",申:"未",酉:"未",戌:"未"})[d]===t,红艳煞:()=>({甲:"午",乙:"申",丙:"寅",丁:"未",戊:"辰",己:"辰",庚:"戌",辛:"酉",壬:"子",癸:"申"})[u]===t,勾绞煞:()=>{const p=(this.zhiIdx(d)+4)%12,S=(this.zhiIdx(d)-4+12)%12;return t===this.cdz[p]||t===this.cdz[S]},空亡:()=>{const p=this.ctg.indexOf(u),S=this.cdz.indexOf(m);if(p===-1||S===-1)return!1;const L=(10+S-p)%12,j=(11+S-p)%12;return[this.cdz[L],this.cdz[j]].includes(t)},亡神:()=>{const p={申:"亥",子:"亥",辰:"亥",亥:"申",卯:"申",未:"申",寅:"巳",午:"巳",戌:"巳",巳:"寅",酉:"寅",丑:"寅"};return p[d]===t||p[m]===t},劫煞:()=>{const p={申:"巳",子:"巳",辰:"巳",亥:"寅",卯:"寅",未:"寅",寅:"亥",午:"亥",戌:"亥",巳:"申",酉:"申",丑:"申"};return p[d]===t||p[m]===t},灾煞:()=>{const p={申:"午",子:"午",辰:"午",亥:"酉",卯:"酉",未:"酉",寅:"子",午:"子",戌:"子",巳:"卯",酉:"卯",丑:"卯"};return p[d]===t||p[m]===t},元辰:()=>{const p=this.ctg.indexOf(l)%2===0,S=p&&w||!p&&!w?7:-7,L=(this.zhiIdx(d)+S+12)%12;return this.cdz[L]===t},血刃:()=>({寅:"丑",卯:"寅",辰:"卯",巳:"辰",午:"巳",未:"午",申:"未",酉:"申",戌:"酉",亥:"戌",子:"亥",丑:"子"})[g]===t,流霞:()=>({甲:"酉",乙:"戌",丙:"未",丁:"申",戊:"巳",己:"午",庚:"辰",辛:"卯",壬:"亥",癸:"寅"})[u]===t,天罗:()=>t==="戌"||t==="亥",地网:()=>t==="辰"||t==="巳",丧门:()=>this.cdz[(this.zhiIdx(d)+2)%12]===t,吊客:()=>this.cdz[(this.zhiIdx(d)-2+12)%12]===t,披麻:()=>this.cdz[(this.zhiIdx(d)-1+12)%12]===t};for(const p in k)k[p]()&&r.push(p);return r}}class sn{constructor(){this.ctg=q.HEAVENLY_STEMS,this.cdz=q.EARTHLY_BRANCHES,this.wxtg=q.STEM_WUXING,this.wxdz=q.BRANCH_WUXING,this.wuxingKe=q.WUXING_KE,this.wuxingSheng=q.WUXING_SHENG}getIntelligentAnalysis(e){const t=[],n={甲:"己",乙:"庚",丙:"辛",丁:"壬",戊:"癸"},i={甲:"庚",乙:"辛",丙:"壬",丁:"癸"};for(let w=0;w<4;w++)for(let k=w+1;k<4;k++){const p=e[w][0],S=e[k][0];if(i[p]===S||i[S]===p)t.push(`${p}${S}相冲`);else if(n[p]===S||n[S]===p)t.push(`${p}${S}相合`);else{const L=this.wxtg[this.ctg.indexOf(p)],j=this.wxtg[this.ctg.indexOf(S)];this.wuxingKe[L]===j?t.push(`${p}克${S}`):this.wuxingKe[j]===L&&t.push(`${S}克${p}`)}}const o=[],r=e.map(w=>w[1]),l={子:"午",丑:"未",寅:"申",卯:"酉",辰:"戌",巳:"亥"},d={子:"丑",寅:"亥",卯:"戌",辰:"酉",巳:"申",午:"未"},c={子:"未",丑:"午",寅:"巳",卯:"辰",申:"亥",酉:"戌"},g={子:"酉",卯:"午",辰:"丑",未:"戌",寅:"亥",巳:"申"};for(let w=0;w<4;w++)for(let k=w+1;k<4;k++){const p=r[w],S=r[k];l[p]===S||l[S]===p?o.push(`${p}${S}相冲`):d[p]===S||d[S]===p?o.push(`${p}${S}相合`):c[p]===S||c[S]===p?o.push(`${p}${S}相害`):(g[p]===S||g[S]===p)&&o.push(`${p}${S}相破`)}const u=[...new Set(r)];u.filter(w=>["寅","巳","申"].includes(w)).length>=2&&o.push("寅巳申无恩之刑"),u.filter(w=>["丑","戌","未"].includes(w)).length>=2&&o.push("丑戌未恃势之刑"),u.includes("子")&&u.includes("卯")&&o.push("子卯无礼之刑"),r.filter(w=>w==="辰").length>1&&o.push("辰辰自刑"),r.filter(w=>w==="午").length>1&&o.push("午午自刑"),r.filter(w=>w==="酉").length>1&&o.push("酉酉自刑"),r.filter(w=>w==="亥").length>1&&o.push("亥亥自刑");const m=[];for(let w=0;w<4;w++){const k=e[w][0],p=e[w][1],S=this.wxtg[this.ctg.indexOf(k)],L=this.wxdz[this.cdz.indexOf(p)][0];this.wuxingKe[S]===L&&m.push(`${k}${p}盖头`),this.wuxingKe[L]===S&&m.push(`${k}${p}截脚`)}for(let w=0;w<4;w++)for(let k=w+1;k<4;k++){const p=e[w],S=e[k],L=i[p[0]]===S[0]||i[S[0]]===p[0],j=l[p[1]]===S[1]||l[S[1]]===p[1];L&&j&&m.push(`${p.join("")}与${S.join("")}天克地冲(反吟)`)}const x=e.map(w=>w.join("")).reduce((w,k)=>(w[k]=(w[k]||0)+1,w),{});for(const w in x)x[w]>1&&m.push(`${w}伏吟`);return{tianGan:t.length>0?`原局天干: ${t.join(" | ")}`:"",diZhi:o.length>0?`原局地支: ${o.join(" | ")}`:"",zhengZhu:m.length>0?`原局整柱: ${m.join(" | ")}`:""}}}class an{constructor(){this.timeMap=[{index:0,name:"早子时",range:"00:00-01:00",hour:0},{index:1,name:"丑时",range:"01:00-03:00",hour:1},{index:2,name:"寅时",range:"03:00-05:00",hour:3},{index:3,name:"卯时",range:"05:00-07:00",hour:5},{index:4,name:"辰时",range:"07:00-09:00",hour:7},{index:5,name:"巳时",range:"09:00-11:00",hour:9},{index:6,name:"午时",range:"11:00-13:00",hour:11},{index:7,name:"未时",range:"13:00-15:00",hour:13},{index:8,name:"申时",range:"15:00-17:00",hour:15},{index:9,name:"酉时",range:"17:00-19:00",hour:17},{index:10,name:"戌时",range:"19:00-21:00",hour:19},{index:11,name:"亥时",range:"21:00-23:00",hour:21},{index:12,name:"晚子时",range:"23:00-24:00",hour:23}],this.tenGods=["比肩","劫财","食神","伤官","偏财","正财","七杀","正官","偏印","正印"],this.wuxing=["水","木","火","土","金"],this.lifeStages=["长生","沐浴","冠带","临官","帝旺","衰","病","死","墓","绝","胎","养"],this.shenShaCalculator=new nn,this.relationshipCalculator=new sn,this.ctg=q.HEAVENLY_STEMS,this.cdz=q.EARTHLY_BRANCHES,this.wxtg=q.STEM_WUXING,this.wxdz=q.BRANCH_WUXING}calculateBazi(e,t,n,i,o){try{const r=this.timeMap[i];if(!r)throw new Error("无效的时辰索引");const l=Ue.fromYmdHms(e,t,n,r.hour,0,0),d=l.getLunarHour(),c=d.getEightChar(),g=c.getYear(),u=c.getMonth(),m=c.getDay(),f=c.getHour(),x={year:{gan:g.getHeavenStem().getName(),zhi:g.getEarthBranch().getName(),ganZhi:g.getName()},month:{gan:u.getHeavenStem().getName(),zhi:u.getEarthBranch().getName(),ganZhi:u.getName()},day:{gan:m.getHeavenStem().getName(),zhi:m.getEarthBranch().getName(),ganZhi:m.getName()},hour:{gan:f.getHeavenStem().getName(),zhi:f.getEarthBranch().getName(),ganZhi:f.getName()}},w=x.day.gan,k=[[x.year.gan,x.year.zhi],[x.month.gan,x.month.zhi],[x.day.gan,x.day.zhi],[x.hour.gan,x.hour.zhi]],p=this.calculateHiddenStems(x),S=this.calculateWuxingStrength(x,p),L=this.calculateSeasonInfo(l),j={gender:o==="male"?"男":"女",solarDate:{year:e,month:t,day:n},lunarDate:{year:d.getLunarDay().getLunarMonth().getLunarYear().getYear(),month:d.getLunarDay().getLunarMonth().getMonth(),day:d.getLunarDay().getDay(),monthName:d.getLunarDay().getLunarMonth().getName(),dayName:d.getLunarDay().getName()},timeInfo:r,pillars:x,dayMaster:{gan:w,element:this.getWuxing(w),yinYang:this.getGanYinYang(w)},zodiac:d.getLunarDay().getLunarMonth().getLunarYear().getSixtyCycle().getEarthBranch().getZodiac().getName(),constellation:l.getSolarDay().getConstellation().getName(),tenGods:this.calculateTenGods(x,w),hiddenStems:p,hiddenTenGods:this.calculateHiddenTenGods(p,w),wuxingStrength:S,luckInfo:this.calculateDayunWithTyme(l,o==="male"?Ee.MAN:Ee.WOMAN),mingGong:c.getOwnSign().getName(),shenGong:c.getBodySign().getName(),taiYuan:c.getFetalOrigin().getName(),taiXi:c.getFetalBreath().getName(),lifeStages:this.calculateLifeStages(x,w),pillarLifeStages:this.calculatePillarLifeStages(x),nayin:this.calculateNayin(x),shensha:this.shenShaCalculator.calculateAllShenSha(k,o),ziZuo:this.calculateZiZuo(x),kongWang:this.calculateKongWang(x),intelligentAnalysis:this.relationshipCalculator.getIntelligentAnalysis(k),wuxingSeasonStatus:this.getSeasonStatus(x.month.zhi),monthCommander:this.getMonthCommander(l,x.month.zhi),seasonInfo:L,analysis:this.analyzeBaziChart(x,p)};if(j.luckInfo&&j.luckInfo.cycles){const Q=e;j.luckInfo.cycles.forEach(z=>{if(!z.isXiaoyun){z.years=[];const M=z.year,V=M+9;for(let ee=M;ee<=V;ee++){const oe=ee-Q+1,E=this.calculateLiunian(ee,w),C=this.calculateXiaoyun(x.hour.ganZhi,j.gender,x.year.gan,oe);z.years.push({year:ee,age:oe,ganZhi:E.ganZhi,tenGod:E.tenGod,tenGodZhi:E.tenGodZhi,xiaoyun:C})}}})}return j}catch(r){throw console.error("八字计算错误:",r),new Error(`八字计算失败: ${r.message}`)}}calculateLiunian(e,t){try{const i=Ue.fromYmdHms(e,6,1,0,0,0).getLunarHour().getEightChar().getYear(),o=i.getHeavenStem().getName(),r=i.getEarthBranch().getName();return{year:e,gan:o,zhi:r,ganZhi:`${o}${r}`,tenGod:this.getTenGod(o,t),tenGodZhi:this.getTenGodForBranch(r,t)}}catch(n){console.error(`流年计算错误 (${e}年):`,n);const i=(e-4)%10,o=(e-4)%12,r=q.HEAVENLY_STEMS[i],l=q.EARTHLY_BRANCHES[o];return{year:e,gan:r,zhi:l,ganZhi:`${r}${l}`,tenGod:this.getTenGod(r,t),tenGodZhi:this.getTenGodForBranch(l,t)}}}calculateLiuyue(e,t,n){const o=Ue.fromYmdHms(e,t,1,0,0,0).getLunarHour().getEightChar().getMonth(),r=o.getHeavenStem().getName(),l=o.getEarthBranch().getName(),d=[],c=[e-1,e,e+1],g=[];c.forEach(m=>{for(let f=0;f<24;f++)g.push(Le.fromIndex(m,f))});for(const m of g){const f=m.getJulianDay().getSolarDay();f.getYear()===e&&f.getMonth()===t&&(d.find(w=>w.name===m.getName())||d.push({name:m.getName(),date:`${f.getYear()}-${f.getMonth().toString().padStart(2,"0")}-${f.getDay().toString().padStart(2,"0")}`}))}const u=d.sort((m,f)=>new Date(m.date).getDate()-new Date(f.date).getDate());return{month:t,gan:r,zhi:l,ganZhi:`${r}${l}`,tenGod:this.getTenGod(r,n),tenGodZhi:this.getTenGodForBranch(l,n),jieqi:u}}calculateLiuri(e,t,n,i){const r=Ue.fromYmdHms(e,t,n,0,0,0).getLunarHour().getEightChar().getDay(),l=r.getHeavenStem().getName(),d=r.getEarthBranch().getName();return{day:n,gan:l,zhi:d,ganZhi:`${l}${d}`,tenGod:this.getTenGod(l,i),tenGodZhi:this.getTenGodForBranch(d,i)}}getTenGodForBranch(e,t){const n=De[e]?.[0];return n?this.getTenGod(n,t):"未知"}calculateXiaoyun(e,t,n,i){const o=[];for(const m of q.HEAVENLY_STEMS)for(const f of q.EARTHLY_BRANCHES)o.push(m+f);const r=o.indexOf(e);if(r===-1)return"未知";const d=q.HEAVENLY_STEMS.indexOf(n)%2===0,c=t==="男",g=d&&c||!d&&!c;let u;return g?u=(r+i)%60:(u=(r-i)%60,u<0&&(u+=60)),o[u]}calculatePillarLifeStages(e){const t={};for(const n in e){const i=e[n],o=i.gan,r=i.zhi;t[n]=Re[o]?.[r]||"无"}return t}getWuxing(e){const t=this.ctg.indexOf(e);if(t!==-1)return this.wxtg[t];const n=this.cdz.indexOf(e);return n!==-1?this.wxdz[n]:"未知"}getGanYinYang(e){const t=this.ctg.indexOf(e);return t===-1?"未知":q.STEM_YINYANG[t]}calculateTenGods(e,t){return Object.fromEntries(Object.entries(e).map(([n,{gan:i}])=>n==="day"?[n,"日主"]:[n,this.getTenGod(i,t)]))}getTenGod(e,t){const n=this.ctg.indexOf(e),i=this.ctg.indexOf(t);return n===-1||i===-1?"未知":[["比肩","劫财","食神","伤官","偏财","正财","七杀","正官","偏印","正印"],["劫财","比肩","伤官","食神","正财","偏财","正官","七杀","正印","偏印"],["偏印","正印","比肩","劫财","食神","伤官","偏财","正财","七杀","正官"],["正印","偏印","劫财","比肩","伤官","食神","正财","偏财","正官","七杀"],["七杀","正官","偏印","正印","比肩","劫财","食神","伤官","偏财","正财"],["正官","七杀","正印","偏印","劫财","比肩","伤官","食神","正财","偏财"],["偏财","正财","七杀","正官","偏印","正印","比肩","劫财","食神","伤官"],["正财","偏财","正官","七杀","正印","偏印","劫财","比肩","伤官","食神"],["食神","伤官","偏财","正财","七杀","正官","偏印","正印","比肩","劫财"],["伤官","食神","正财","偏财","正官","七杀","正印","偏印","劫财","比肩"]][i][n]}calculateHiddenStems(e){return Object.fromEntries(Object.entries(e).map(([t,{zhi:n}])=>[t,De[n]||[]]))}calculateHiddenTenGods(e,t){return Object.fromEntries(Object.entries(e).map(([n,i])=>[n,i.map(o=>this.getTenGod(o,t))]))}calculateWuxingStrength(e,t){const n={tianGan:12,diZhiBenQi:12,diZhiZhongQi:6,diZhiYuQi:3},i={寅:{木:2,火:1.5,土:.8,金:.6,水:1.2},卯:{木:2.2,火:1.6,土:.7,金:.5,水:1.1},辰:{土:2,金:1.5,水:.8,木:1.2,火:.6},巳:{火:2,土:1.5,金:.8,水:.6,木:1.2},午:{火:2.2,土:1.6,金:.7,水:.5,木:1.1},未:{土:2,金:1.5,水:.8,木:1.2,火:.6},申:{金:2,水:1.5,木:.8,火:.6,土:1.2},酉:{金:2.2,水:1.6,木:.7,火:.5,土:1.1},戌:{土:2,金:1.5,水:.8,木:1.2,火:.6},亥:{水:2,木:1.5,火:.8,土:.6,金:1.2},子:{水:2.2,木:1.6,火:.7,土:.5,金:1.1},丑:{土:2,金:1.5,水:.8,木:1.2,火:.6}},o=e.month.zhi,r=i[o],l={金:0,木:0,水:0,火:0,土:0};for(const M of Object.values(e)){const V=this.getWuxing(M.gan);V!=="未知"&&(l[V]+=n.tianGan)}for(const M of Object.values(e)){const V=M.zhi;(De[V]||[]).forEach((oe,E)=>{const C=this.getWuxing(oe);C!=="未知"&&(E===0?l[C]+=n.diZhiBenQi:E===1?l[C]+=n.diZhiZhongQi:l[C]+=n.diZhiYuQi)})}const d={...l};for(const M in d)d[M]=Math.round(d[M]*(r[M]||1));const c=Object.values(d).reduce((M,V)=>M+V,0),g={};if(c>0)for(const M in d)g[M]=Math.round(d[M]/c*100);else for(const M in d)g[M]=0;const u=this.getWuxing(e.day.gan),m={金:{allies:["金","土"],enemies:["火","水","木"]},木:{allies:["木","水"],enemies:["金","火","土"]},水:{allies:["水","金"],enemies:["土","木","火"]},火:{allies:["火","木"],enemies:["水","土","金"]},土:{allies:["土","火"],enemies:["木","金","水"]}};if(!m[u])return{scores:d,percentages:g,status:"无法判断"};const f=m[u].allies,x=m[u].enemies,w=f.reduce((M,V)=>M+(d[V]||0),0);x.reduce((M,V)=>M+(d[V]||0),0);let k="均衡";const p=c>0?w/c*100:0;p>60?k="身强":p<20?k="身弱":p>=40&&p<=60?k="中和":p>50?k="偏强":p<30&&(k="偏弱");let S=[],L=[];k==="身强"||k==="偏强"?(S=x,L=f):k==="身弱"||k==="偏弱"?(S=f,L=x):S=m[u].enemies.slice(0,2);const j=Object.entries(l).filter(([M,V])=>V===0).map(([M])=>M),Q=S.map(M=>({wuxing:M,...tt[M]})),z=L.map(M=>({wuxing:M,...tt[M]}));return{scores:d,percentages:g,status:k,yongShen:S,jiShen:L,missing:j,suggestions:{favorable:Q,unfavorable:z}}}calculateDayunWithTyme(e,t){try{const n=this.calculateTraditionalDayun(e,t);let i="";if(n.startAge!==void 0){const c=e.getSolarDay().getYear()+n.startAge;i=`出生后 ${n.startAge} 年，${c}年起运`}else i="起运时间计算失败";const o=[],r=n.startAge;if(r>0){const c=e.getLunarHour().getEightChar(),g=c.getHour().getName(),u=t===Ee.MAN?"男":"女",m=c.getYear().getHeavenStem().getName(),f=this.getGanYinYang(m),x=e.getSolarDay().getYear(),w=[],k=Math.max(1,r);for(let p=1;p<=k;p++){const S=x+p-1,L=this.calculateXiaoyun(g,u,m,p),j=this.calculateLiunian(S,c.getDay().getHeavenStem().getName());w.push({year:S,age:p,ganZhi:j.ganZhi,tenGod:j.tenGod,tenGodZhi:j.tenGodZhi,xiaoyun:{ganZhi:L,tenGod:this.getTenGod(L[0],c.getDay().getHeavenStem().getName()),tenGodZhi:this.getTenGodForBranch(L[1],c.getDay().getHeavenStem().getName())}})}w.length>0&&o.push({age:1,year:w[0].year,ganZhi:"小运",isXiaoyun:!0,type:"小运",years:w})}const l=e.getSolarDay().getYear();for(let c=0;c<12;c++){const g=n.startAge+c*10,u=l+g-1,m=n.dayunList[c];m&&o.push({age:g,year:u,ganZhi:m,isXiaoyun:!1,type:"大运",years:[]})}let d="";if(n.dayunList.length>0){const c=n.dayunList[0][0],g=q.HEAVENLY_STEMS,u=g.indexOf(c);if(u!==-1){const m=g[(u+5)%10];d=`逢 ${c}、${m} 年交运`}else d="交运信息计算失败"}else d="交运信息计算失败";return{startInfo:i,handoverInfo:d,cycles:o}}catch(n){return console.error("大运计算错误:",n),{startInfo:"计算失败",handoverInfo:"计算失败",cycles:[]}}}calculateLifeStages(e,t){const n=Re[t]||{};return Object.fromEntries(Object.entries(e).map(([i,{zhi:o}])=>[i,n[o]||"未知"]))}calculateNayin(e){return Object.fromEntries(Object.entries(e).map(([t,{gan:n,zhi:i}])=>[t,Xt[n+i]||"未知"]))}calculateWuxingStatus(e){const t=this.getSeasonStatus(e);return t?`木${t.木} 火${t.火} 土${t.土} 金${t.金} 水${t.水}`:"无法确定五行状态"}calculateKongWang(e){return Object.fromEntries(Object.entries(e).map(([t,{gan:n,zhi:i}])=>{const o=this.ctg.indexOf(n),r=this.cdz.indexOf(i);if(o===-1||r===-1)return[t,[]];const l=(10+r-o)%12,d=(11+r-o)%12;return[t,[this.cdz[l],this.cdz[d]]]}))}calculateZiZuo(e){return Object.fromEntries(Object.entries(e).map(([t,{gan:n,zhi:i}])=>{const o=Re[n]||{};return[t,o[i]||"未知"]}))}analyzeBaziChart(e,t){const n=e.day.gan,i=this.getWuxing(n),o=e.month.zhi;e.month.gan;const l=this.getSeasonStatus(o)[i],d=l==="旺"||l==="相",c=this.analyzeRoots(e,i),g=this.analyzeSupport(e,n,i),u=this.calculateDayMasterStrength(d,c,g,i,o),m=this.analyzePattern(e,t,n,i,u.strength),f=this.analyzeUsefulGod(e,i,u.strength,m);return{dayMasterStrength:u.strength,dayMasterStatus:u.status,mingGe:m.pattern,patternType:m.type,patternDescription:m.description,favorableElements:f.favorable,unfavorableElements:f.unfavorable,usefulGod:f.useful,avoidGod:f.avoid,circulation:f.circulation,rootAnalysis:c,supportAnalysis:g,seasonalStatus:{month:o,dayMasterStatus:l,isTimely:d}}}analyzeRoots(e,t){const n=[];let i=0;return Object.entries(e).forEach(([o,r])=>{if(this.getWuxing(r.zhi)===t){const d=o==="day"?3:1;n.push({position:o,branch:r.zhi,strength:d}),i+=d}}),{roots:n,totalStrength:i,hasRoot:n.length>0,strongRoot:n.some(o=>o.strength>=3)}}analyzeSupport(e,t,n){const i=[];let o=0;return Object.entries(e).forEach(([r,l])=>{if(r!=="day"&&l.gan&&this.getWuxing(l.gan)===n){const c=l.gan===t?2:1;i.push({position:r,stem:l.gan,strength:c}),o+=c}}),{supporters:i,totalStrength:o,hasSupport:i.length>0}}calculateDayMasterStrength(e,t,n,i,o){let r="中和",l=0;e&&(l+=2),l+=t.totalStrength,l+=n.totalStrength,l>=6?r="太旺":l>=4?r="偏旺":l>=2?r="中和":l>=1?r="偏弱":r="太弱";const c=this.getSeasonStatus(o)[i]||"休";return{strength:r,score:l,status:`日主${i}生于${o}月，${c}`,details:{timely:e,rootStrength:t.totalStrength,supportStrength:n.totalStrength}}}analyzePattern(e,t,n,i,o){const r=e.month.gan;e.month.zhi;const l=this.getTenGod(r,n),d=this.checkSpecialPattern(e,i,o);if(d.isSpecial)return d;let c="正格",g="普通格局",u="命局平和，无明显特殊格局";if(l)switch(l){case"正官":c="正官格",g="官格",u="月干透正官，主贵气，利于仕途功名";break;case"七杀":c="七杀格",g="杀格",u="月干透七杀，主权威，需要制化得宜";break;case"正财":c="正财格",g="财格",u="月干透正财，主富裕，利于经商理财";break;case"偏财":c="偏财格",g="财格",u="月干透偏财，主横财，善于投资经营";break;case"正印":c="正印格",g="印格",u="月干透正印，主学问，利于文化教育";break;case"偏印":c="偏印格",g="印格",u="月干透偏印，主技艺，适合专业技能";break;case"食神":c="食神格",g="食伤格",u="月干透食神，主福禄，性格温和有才华";break;case"伤官":c="伤官格",g="食伤格",u="月干透伤官，主才华，需要适当约束";break;case"比肩":c="建禄格",g="比劫格",u="月干透比肩，主自立，需要财官调节";break;case"劫财":c="劫财格",g="比劫格",u="月干透劫财，主竞争，需要官杀制约";break;default:c="正格",g="普通格局",u="命局平和，五行流通"}const m=this.checkPatternSuccess(e,c,g);return{pattern:c,type:g,description:u,success:m.success,successReason:m.reason,isSpecial:!1}}checkSpecialPattern(e,t,n){return n==="太旺"&&this.countRestraints(e,t)===0?{isSpecial:!0,pattern:"从强格",type:"特殊格局",description:"日主极旺无制，顺其旺势而行",success:!0,successReason:"格局纯粹，顺势而为"}:n==="太弱"&&this.countSupports(e,t)===0?{isSpecial:!0,pattern:"从弱格",type:"特殊格局",description:"日主极弱无助，从其弱势而行",success:!0,successReason:"格局清纯，从弱而行"}:{isSpecial:!1}}checkPatternSuccess(e,t,n){let i=!0,o="格局基本成立";switch(n){case"官格":this.hasInjuryToOfficial(e)&&(i=!1,o="伤官见官，格局受损");break;case"财格":this.hasRobberyToWealth(e)&&(i=!1,o="比劫夺财，格局不清");break}return{success:i,reason:o}}analyzeUsefulGod(e,t,n,i){const o=[],r=[];let l="",d="",c="";switch(n){case"太旺":const g=this.getWuxingChildren(t),u=this.getWuxingEnemies(t);o.push(...g,...u),r.push(t,...this.getWuxingParents(t)),l=g[0]||u[0]||"食神",d=t,c="身旺用食伤泄秀，或用官杀制身";break;case"偏旺":o.push(...this.getWuxingChildren(t)),r.push(t,...this.getWuxingParents(t)),l=this.getWuxingChildren(t)[0]||"食神",d=t,c="身旺喜泄，食伤为用";break;case"中和":o.push(t),l="调候",c="命局中和，重在调候和流通";break;case"偏弱":o.push(t,...this.getWuxingParents(t)),r.push(...this.getWuxingEnemies(t),...this.getWuxingChildren(t)),l=this.getWuxingParents(t)[0]||t,d=this.getWuxingEnemies(t)[0]||"官杀",c="身弱喜印比帮扶";break;case"太弱":i.pattern==="从弱格"?(o.push(...this.getWuxingEnemies(t),...this.getWuxingChildren(t)),r.push(t,...this.getWuxingParents(t)),l=this.getWuxingEnemies(t)[0]||"官杀",d=t,c="从弱格，顺其弱势，忌帮扶"):(o.push(t,...this.getWuxingParents(t)),r.push(...this.getWuxingEnemies(t)),l=this.getWuxingParents(t)[0]||t,d=this.getWuxingEnemies(t)[0]||"官杀",c="身弱急需印比帮扶");break}return{favorable:[...new Set(o)],unfavorable:[...new Set(r)],useful:l,avoid:d,circulation:c}}getWuxingChildren(e){return{木:["火"],火:["土"],土:["金"],金:["水"],水:["木"]}[e]||[]}getWuxingParents(e){return{火:["木"],土:["火"],金:["土"],水:["金"],木:["水"]}[e]||[]}getWuxingEnemies(e){return{木:["金"],火:["水"],土:["木"],金:["火"],水:["土"]}[e]||[]}countRestraints(e,t){let n=0;const i=this.getWuxingEnemies(t);return Object.values(e).forEach(o=>{(i.includes(this.getWuxing(o.gan))||i.includes(this.getWuxing(o.zhi)))&&n++}),n}countSupports(e,t){let n=0;const i=this.getWuxingParents(t);return Object.values(e).forEach(o=>{(this.getWuxing(o.gan)===t||this.getWuxing(o.zhi)===t||i.includes(this.getWuxing(o.gan))||i.includes(this.getWuxing(o.zhi)))&&n++}),n}hasInjuryToOfficial(e){return!1}hasRobberyToWealth(e){return!1}getGanYinYang(e){return["甲","丙","戊","庚","壬"].includes(e)?"阳":"阴"}getSeasonStatus(e){return en[e]||{}}getMonthCommander(e,t){const n=tn[t];if(!n)return"未知";try{const i=e.getSolarDay().getYear(),o=e.getJulianDay();let r=null;const l=[];for(let g=0;g<24;g++)l.push(Le.fromIndex(i,g)),l.push(Le.fromIndex(i-1,g));for(const g of l){const u=g.getJulianDay();g.isJie()&&u<=o&&(!r||u>r.getJulianDay())&&(r=g)}if(!r)return"未知(节气未找到)";const d=o-r.getJulianDay();let c=0;for(const g of n)if(c+=g[1],d<c)return g[0];return n[n.length-1][0]}catch(i){return console.error("获取月令司令失败:",i),"计算出错"}}calculateSeasonInfo(e){try{const t=[],n=e.getSolarDay().getYear(),i=e.getJulianDay();for(let u=0;u<24;u++){const m=Le.fromIndex(n,u),f=m.getJulianDay(),x=f.getSolarDay();t.push({name:m.getName(),date:`${x.getYear()}-${x.getMonth().toString().padStart(2,"0")}-${x.getDay().toString().padStart(2,"0")}`,jd:f.getDay(),index:u,isJie:m.isJie()})}let o=null,r=null;for(let u=0;u<t.length;u++){const m=t[u];if(m.jd<=i)o=m;else{r=m;break}}let l=0,d=0;o&&(l=Math.floor(i-o.jd)),r&&(d=Math.floor(r.jd-i));const g=o?{0:"冬",1:"冬",2:"春",3:"春",4:"春",5:"春",6:"春",7:"春",8:"夏",9:"夏",10:"夏",11:"夏",12:"夏",13:"夏",14:"秋",15:"秋",16:"秋",17:"秋",18:"秋",19:"秋",20:"冬",21:"冬",22:"冬",23:"冬"}[o.index]:"未知";return{currentJieqi:o?o.name:"未知",nextJieqi:r?r.name:"未知",daysSincePrev:l,daysToNext:d,currentSeason:g,jieqiList:t.map(u=>({name:u.name,date:u.date}))}}catch(t){return console.error("节气信息计算错误:",t),{currentJieqi:"计算错误",nextJieqi:"计算错误",daysSincePrev:0,daysToNext:0,currentSeason:"未知",jieqiList:[]}}}calculateTraditionalDayun(e,t){try{const n=e.getSolarDay().getYear(),i=e.getJulianDay(),o=e.getLunarHour().getEightChar(),r=o.getYear().getHeavenStem().getName(),l=o.getMonth().getHeavenStem().getName(),d=o.getMonth().getEarthBranch().getName(),g=q.HEAVENLY_STEMS.indexOf(r)%2===0,u=t===Ee.MAN,m=g&&u||!g&&!u,f=this.calculateStartAge(e,t,r),x=this.generateDayunList(l,d,m);return{startAge:f,dayunList:x,isShun:m,yearGan:r,monthGanZhi:l+d}}catch(n){return console.error("传统大运计算错误:",n),{startAge:0,dayunList:[],isShun:!0,yearGan:"",monthGanZhi:""}}}calculateStartAge(e,t,n){try{const i=e.getSolarDay().getYear(),o=e.getJulianDay(),l=q.HEAVENLY_STEMS.indexOf(n)%2===0,d=t===Ee.MAN,c=l&&d||!l&&!d,g=[];for(let x of[i-1,i,i+1])for(let w=0;w<24;w++){const k=Le.fromIndex(x,w);k.isJie()&&g.push({term:k,julianDay:k.getJulianDay(),name:k.getName()})}g.sort((x,w)=>x.julianDay-w.julianDay);let u=null,m=0;if(c){for(const x of g)if(x.julianDay>o){u=x,m=x.julianDay-o;break}}else for(let x=g.length-1;x>=0;x--){const w=g[x];if(w.julianDay<o){u=w,m=o-w.julianDay;break}}if(!u)return console.warn("未找到目标节气，使用默认起运岁数"),8;const f=Math.ceil(m/3);return console.log(`起运计算详情:
        性别: ${d?"男":"女"}
        年干: ${n} (${l?"阳":"阴"})
        顺逆: ${c?"顺排":"逆排"}
        目标节气: ${u.name}
        天数差: ${m}
        起运岁数: ${f}`),Math.max(1,f)}catch(i){return console.error("起运岁数计算错误:",i),8}}generateDayunList(e,t,n){const i=q.HEAVENLY_STEMS,o=q.EARTHLY_BRANCHES,r=i.indexOf(e),l=o.indexOf(t);if(r===-1||l===-1)return console.error("月柱干支索引错误"),[];const d=[];for(let c=0;c<12;c++){let g,u;n?(g=(r+c+1)%10,u=(l+c+1)%12):(g=(r-c-1+10)%10,u=(l-c-1+12)%12);const m=i[g],f=o[u];d.push(m+f)}return d}}const pe=new an;function rn(s){const e=new Date().getFullYear();for(let t=0;t<s.length;t++){const n=s[t],i=n.year,o=i+9;if(e>=i&&e<=o)return{current:n,previous:t>0?s[t-1]:null,future:s.slice(t+1)}}return{current:s[0]||null,previous:null,future:s.slice(1)}}function on(s,e){let t=`
### 大运详细分析
`;const n=pe.getTenGod(s.ganZhi[0],e),i=pe.getTenGodForBranch(s.ganZhi[1],e);t+=`* **当前大运**: ${s.ganZhi} (天干:${n}, 地支:${i})
`;const o=new Date().getFullYear(),r=o-s.year+1;t+=`* **大运进度**: 第${r}年/共10年
`;const l=ln(s,o,e);return t+=`
* **三大运流年分析**:
`,l.forEach(d=>{const c=d.years[0].year,g=d.years[d.years.length-1].year,u=`${c}-${g}年`;t+=`
  **${d.name}** (${d.ganZhi}, ${u}):
`,d.years.forEach(m=>{const x=m.year===o?" ← 当前":"";t+=`    - ${m.year}年(${m.age}岁): ${m.ganZhi}(${m.tenGod})${x}
`})}),t}function ln(s,e,t){const n=[],i=s.years.filter(o=>o.year>=e);i.length>0&&n.push({name:"当前大运",ganZhi:s.ganZhi,years:i});for(let o=1;o<=2;o++){const r=s.year+o*10,l=cn(s.ganZhi,o),d=hn(s,e),c=[];for(let g=0;g<10;g++){const u=r+g,m=d?d+(u-e):null,f=dn(u),x=pe.getTenGod(f[0],t);c.push({year:u,age:m,ganZhi:f,tenGod:x})}n.push({name:o===1?"下一大运":"下下大运",ganZhi:l,years:c})}return n}function cn(s,e){const t=["甲","乙","丙","丁","戊","己","庚","辛","壬","癸"],n=["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"],i=s[0],o=s[1],r=t.indexOf(i),l=n.indexOf(o),d=(r+e)%10,c=(l+e)%12;return t[d]+n[c]}function un(s,e){let t=`
### 一生大运详细分析
`;const n=new Date().getFullYear();t+=`* **大运总览**: 共${s.length}个大运，从${s[0].year}年起运
`;const i=s.findIndex(o=>n>=o.year&&n<=o.year+9);return t+=`
* **所有大运详细信息**:
`,s.forEach((o,r)=>{const l=o.year,d=l+9,c=o.years&&o.years.length>0?o.years[0].age:null,g=c?c+9:null,u=pe.getTenGod(o.ganZhi[0],e),m=pe.getTenGodForBranch(o.ganZhi[1],e),x=r===i?" ← 当前大运":"",w=c&&g?`(${c}-${g}岁)`:"";t+=`
  **第${r+1}个大运** ${o.ganZhi}(${u}) ${l}-${d}年${w}${x}:
`,t+=`    天干:${u}, 地支:${m}
`,o.years&&o.years.length>0?(t+=`    流年详情:
`,o.years.forEach(k=>{const S=k.year===n?" ← 当前年份":"";t+=`      ${k.year}年(${k.age}岁): ${k.ganZhi}(${k.tenGod})${S}
`})):t+=`    流年概况: ${l}-${d}年，共10年
`}),t+=`
* **人生阶段总结**:
`,t+=`  - 青年期: 第1-3个大运 (约${s[0]?.year||"起运"}-${s[2]?.year+9||"未知"}年)
`,s.length>3&&(t+=`  - 壮年期: 第4-6个大运 (约${s[3]?.year||"未知"}-${s[5]?.year+9||"未知"}年)
`),s.length>6&&(t+=`  - 中年期: 第7-9个大运 (约${s[6]?.year||"未知"}-${s[8]?.year+9||"未知"}年)
`),s.length>9&&(t+=`  - 晚年期: 第10个大运以后 (${s[9]?.year||"未知"}年以后)
`),t}function dn(s){const e=["甲","乙","丙","丁","戊","己","庚","辛","壬","癸"],t=["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"],i=s-1984,o=i%10,r=i%12;return e[o]+t[r]}function hn(s,e){const t=s.years.find(n=>n.year===e);return t?t.age:null}function gn(s){try{const e=[{start:"立春",end:"惊蛰"},{start:"惊蛰",end:"清明"},{start:"清明",end:"立夏"},{start:"立夏",end:"芒种"},{start:"芒种",end:"小暑"},{start:"小暑",end:"立秋"},{start:"立秋",end:"白露"},{start:"白露",end:"寒露"},{start:"寒露",end:"立冬"},{start:"立冬",end:"大雪"},{start:"大雪",end:"小寒"},{start:"小寒",end:"立春"}],t={};for(const i of[s,s+1]){const o=pe.calculateSeasonInfo(Ue.fromYmdHms(i,6,1,0,0,0));o&&o.jieqiList&&o.jieqiList.forEach(r=>{const l=new Date(r.date);l.getFullYear()===i&&(t[r.name]={month:l.getMonth()+1,day:l.getDate(),year:i})})}const n=[];for(let i=0;i<12;i++){const{start:o,end:r}=e[i],l=t[o],d=t[r];if(l&&d){let c,g;if(i===11){c=`${l.month}月${l.day}日`;const u=t.立春;if(u&&u.year===s+1){const m=u.day-1;g=`${u.month}月${m>0?m:"月底"}日`}else g="2月3日"}else{c=`${l.month}月${l.day}日`;const u=d.day-1;g=`${d.month}月${u>0?u:"月底"}日`}n.push(`${c}-${g}`)}else{const c=["2月4日-3月5日","3月6日-4月4日","4月5日-5月5日","5月6日-6月5日","6月6日-7月6日","7月7日-8月7日","8月8日-9月7日","9月8日-10月7日","10月8日-11月6日","11月7日-12月6日","12月7日-1月5日","1月6日-2月3日"];n.push(c[i])}}return n}catch(e){return console.warn("计算月份日期范围失败:",e),["2月4日-3月5日","3月6日-4月4日","4月5日-5月5日","5月6日-6月5日","6月6日-7月6日","7月7日-8月7日","8月8日-9月7日","9月8日-10月7日","10月8日-11月6日","11月7日-12月6日","12月7日-1月5日","1月6日-2月3日"]}}function be(s,e=null){if(!s)return"无法获取八字数据。";let t=`### 基本信息
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
`;const n=["year","month","day","hour"],i=["年","月","日","时"];if(n.forEach((o,r)=>{const l=s.pillars[o],d=s.tenGods[o],c=s.hiddenStems&&s.hiddenStems[o];t+=`* **${i[r]}**: ${l.ganZhi}(${d})`,c&&c.length>0&&(t+=` 藏干:${c.join(",")}`),t+=`
`}),s.intelligentAnalysis){t+=`
### 专业干支关系分析
`;const o=[[s.pillars.year.gan,s.pillars.year.zhi],[s.pillars.month.gan,s.pillars.month.zhi],[s.pillars.day.gan,s.pillars.day.zhi],[s.pillars.hour.gan,s.pillars.hour.zhi]];t+=`* **四柱干支**: ${o.map(g=>g.join("")).join(" ")}
`;const r=pn(o);r.length>0&&(t+=`* **天干关系**: ${r.join("、")}
`);const l=yn(o);l.length>0&&(t+=`* **地支关系**: ${l.join("、")}
`);const d=fn(o);d.length>0&&(t+=`* **整柱关系**: ${d.join("、")}
`);const c=vn(o);c.length>0&&(t+=`* **五行生克**: ${c.join("、")}
`)}if(s.luckInfo&&s.luckInfo.cycles&&s.luckInfo.cycles.length>0){t+=`
### 大运信息
`,s.luckInfo.startInfo&&(t+=`* **起运**: ${s.luckInfo.startInfo}
`);const o=s.luckInfo.cycles.filter(l=>!l.isXiaoyun),r=rn(o);if(r.current){const l=r.current,d=s.dayMaster.gan,c=pe.getTenGod(l.ganZhi[0],d);if(t+=`* **当前大运**: ${l.ganZhi}(${c})`,l.year){const u=l.year+9;t+=` ${l.year}-${u}年`}t+=`
`;const g=r.future.slice(0,2).map(u=>{const m=pe.getTenGod(u.ganZhi[0],d);let f=`${u.ganZhi}(${m})`;if(u.year){const x=u.year+9;f+=`${u.year}-${x}年`}return f}).join(", ");g&&(t+=`* **未来大运**: ${g}
`),e&&(e.id==="ai-current-luck"||e.id==="ai-this-year")&&(t+=on(l,d)),e&&e.id==="ai-lifetime-fortune"&&(t+=un(o,d))}}if(s.liunian&&s.liunian.length>0){const o=new Date().getFullYear(),r=s.liunian.find(l=>l.year===o);r&&(t+=`
### 流年信息
* **今年**: ${r.ganZhi}(${o}年)
`)}if(e&&e.id==="ai-year-analysis"&&(t+=`
### 逐月运势分析参考
`,["正月","二月","三月","四月","五月","六月","七月","八月","九月","十月","冬月","腊月"].forEach(r=>{t+=`* **${r}**: 请根据流年与月令的关系进行分析
`})),e&&e.id==="ai-monthly-fortune"){t+=`
### 今年流月信息
`;const o=new Date().getFullYear(),r=s.dayMaster.gan,l=["正月","二月","三月","四月","五月","六月","七月","八月","九月","十月","冬月","腊月"],d=gn(o);for(let c=1;c<=12;c++)try{const g=pe.calculateLiuyue(o,c,r),u=l[c-1],m=d[c-1]||"日期计算失败";t+=`* **${u}**(${m}): ${g.ganZhi}(${g.tenGod})
`}catch(g){console.warn(`计算${c}月流月失败:`,g);const u=l[c-1];t+=`* **${u}**: 计算失败
`}}return t}function mn(s){if(!s||!s.selectedDate)return"未指定具体日期";const{selectedDate:e,selectedTime:t}=s;let n=`${e.getFullYear()}年${e.getMonth()+1}月${e.getDate()}日`;return t&&(n+=` ${t}`),n}function pn(s){const e=[],t={甲:"己",乙:"庚",丙:"辛",丁:"壬",戊:"癸"},n={甲:"庚",乙:"辛",丙:"壬",丁:"癸"},i={甲:"木",乙:"木",丙:"火",丁:"火",戊:"土",己:"土",庚:"金",辛:"金",壬:"水",癸:"水"},o={金:"木",木:"土",土:"水",水:"火",火:"金"};for(let r=0;r<4;r++)for(let l=r+1;l<4;l++){const d=s[r][0],c=s[l][0],g=["年","月","日","时"];if(t[d]===c||t[c]===d)e.push(`${g[r]}${g[l]}天干${d}${c}相合`);else if(n[d]===c||n[c]===d)e.push(`${g[r]}${g[l]}天干${d}${c}相冲`);else{const u=i[d],m=i[c];o[u]===m?e.push(`${g[r]}${g[l]}天干${d}(${u})克${c}(${m})`):o[m]===u&&e.push(`${g[r]}${g[l]}天干${c}(${m})克${d}(${u})`)}}return e}function yn(s){const e=[],t=s.map(u=>u[1]),n=["年","月","日","时"],i={子:"午",丑:"未",寅:"申",卯:"酉",辰:"戌",巳:"亥"},o={子:"丑",寅:"亥",卯:"戌",辰:"酉",巳:"申",午:"未"},r={子:"未",丑:"午",寅:"巳",卯:"辰",申:"亥",酉:"戌"},l={子:"酉",卯:"午",辰:"丑",未:"戌",寅:"亥",巳:"申"},d={申子辰:"水局",亥卯未:"木局",寅午戌:"火局",巳酉丑:"金局"};for(let u=0;u<4;u++)for(let m=u+1;m<4;m++){const f=t[u],x=t[m];i[f]===x||i[x]===f?e.push(`${n[u]}${n[m]}地支${f}${x}相冲`):o[f]===x||o[x]===f?e.push(`${n[u]}${n[m]}地支${f}${x}六合`):r[f]===x||r[x]===f?e.push(`${n[u]}${n[m]}地支${f}${x}相害`):(l[f]===x||l[x]===f)&&e.push(`${n[u]}${n[m]}地支${f}${x}相破`)}const c=[...new Set(t)];for(const[u,m]of Object.entries(d)){const f=u.split(""),x=f.filter(w=>c.includes(w)).length;if(x>=2){const w=f.filter(k=>c.includes(k));e.push(`地支${w.join("")}${x===3?"三合":"半合"}${m}`)}}return c.filter(u=>["寅","巳","申"].includes(u)).length>=2&&e.push("寅巳申无恩之刑"),c.filter(u=>["丑","戌","未"].includes(u)).length>=2&&e.push("丑戌未恃势之刑"),c.includes("子")&&c.includes("卯")&&e.push("子卯无礼之刑"),["辰","午","酉","亥"].forEach(u=>{t.filter(m=>m===u).length>1&&e.push(`${u}${u}自刑`)}),e}function fn(s){const e=[],t=["年","月","日","时"],n={甲:"木",乙:"木",丙:"火",丁:"火",戊:"土",己:"土",庚:"金",辛:"金",壬:"水",癸:"水",子:"水",丑:"土",寅:"木",卯:"木",辰:"土",巳:"火",午:"火",未:"土",申:"金",酉:"金",戌:"土",亥:"水"},i={金:"木",木:"土",土:"水",水:"火",火:"金"},o={甲:"庚",乙:"辛",丙:"壬",丁:"癸"},r={子:"午",丑:"未",寅:"申",卯:"酉",辰:"戌",巳:"亥"};for(let c=0;c<4;c++){const g=s[c][0],u=s[c][1],m=n[g],f=n[u];i[m]===f&&e.push(`${t[c]}柱${g}${u}盖头(天干克地支)`),i[f]===m&&e.push(`${t[c]}柱${g}${u}截脚(地支克天干)`)}for(let c=0;c<4;c++)for(let g=c+1;g<4;g++){const u=s[c],m=s[g],f=o[u[0]]===m[0]||o[m[0]]===u[0],x=r[u[1]]===m[1]||r[m[1]]===u[1];f&&x&&e.push(`${t[c]}${t[g]}柱${u.join("")}与${m.join("")}天克地冲(反吟)`)}const d=s.map(c=>c.join("")).reduce((c,g)=>(c[g]=(c[g]||0)+1,c),{});for(const c in d)d[c]>1&&e.push(`${c}柱重复出现${d[c]}次(伏吟)`);return e}function vn(s){const e=[],t={甲:"木",乙:"木",丙:"火",丁:"火",戊:"土",己:"土",庚:"金",辛:"金",壬:"水",癸:"水",子:"水",丑:"土",寅:"木",卯:"木",辰:"土",巳:"火",午:"火",未:"土",申:"金",酉:"金",戌:"土",亥:"水"},n={木:0,火:0,土:0,金:0,水:0};s.forEach(l=>{const d=t[l[0]],c=t[l[1]];n[d]++,n[c]++});const i=Object.entries(n).filter(([l,d])=>d>=3).map(([l])=>l),o=Object.entries(n).filter(([l,d])=>d===0).map(([l])=>l);return i.length>0&&e.push(`五行偏强: ${i.join("、")}`),o.length>0&&e.push(`五行缺失: ${o.join("、")}`),xn(n)?e.push("五行流通顺畅"):e.push("五行流通受阻"),e}function xn(s){const e=["木","火","土","金","水"];let t=0,n=0;for(let i=0;i<e.length*2;i++){const o=e[i%e.length];s[o]>0?(t++,n=Math.max(n,t)):t=0}return n>=3}const Ye={master:`你是一位学贯古今的命理宗师，既精通《滴天髓》、《三命通会》等八字古籍，也了解现代社会的心理学和职业发展。请根据以下信息，为用户提供一份详尽的分析。

**八字信息:**
[CHART_DATA]

---

[PROMPT_BODY]
`,build:(s,e,t="")=>{e===void 0&&(console.warn("PROMPT_BUILDER.build received an undefined question. Defaulting to empty string."),e="");let n=`**问题:**
${e}`;return t&&(n+=`

**分析要求:**
${t}`),Ye.master.replace("[CHART_DATA]",s).replace("[PROMPT_BODY]",n)}},nt={single:[{id:"ai-mingge-zonglun",text:"命格总论",prompt:`

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
- 长期成功的保障措施`},{id:"ai-compat-custom",text:"自定义...",prompt:""}]};function Sn(s,e,t,n=null){const i=t?be(t,e):"无法获取命盘数据。",o=e.dataset.prompt,r=e.id;if(r==="ask-ai-with-date"){const l=mn(n),d=document.getElementById("customQuestion")?.value?.trim()||"",c=s&&s!=="选定日期..."?s:d,g=c?`在${l}这个时间点, ${c}`:`请详细分析${l}的运势。`;return Ye.build(i,g,"请结合用户提供的具体日期进行分析，越详细越好。")}if(r==="ai-mingge-zonglun"){let l=o.replace("[八字信息]",i);return s!=="命格总论"&&(l=l.replace("为用户提供一份详尽的八字命局解读。",`为用户提供一份关于"${s}"的详尽解读。`)),l}return Ye.build(i,s,o)}const Ie={apiUrl:{}.VITE_AI_API_URL||"https://flow.ovo.gs/ai",apiKey:{}.VITE_AI_API_KEY||"",model:{}.VITE_AI_MODEL||"sydf-v1-250520",maxTokens:8192,temperature:.7,debug:!0};console.log("🔧 AI 配置调试信息:",{apiUrl:Ie.apiUrl,model:Ie.model,hasApiKey:!!Ie.apiKey,envVars:{VITE_AI_API_URL:{}.VITE_AI_API_URL||"未设置",VITE_AI_MODEL:{}.VITE_AI_MODEL||"未设置",VITE_AI_API_KEY:{}.VITE_AI_API_KEY?"已设置":"未设置"}});class ht{constructor(){this.currentRequest=null,this.updateConfig(),console.log("🔧 AI Service 初始化完成:",{apiUrl:this.apiUrl,model:this.model,hasApiKey:!!this.apiKey&&this.apiKey!=="",isProd:!0,currentDomain:typeof window<"u"?window.location.hostname:"unknown"})}updateConfig(){let e=null;try{const n=localStorage.getItem("ai_api_config");n&&(e=JSON.parse(n))}catch(n){console.warn("读取用户AI配置失败:",n)}e&&e.apiUrl&&e.apiKey&&e.model?(this.apiUrl=e.apiUrl,this.apiKey=e.apiKey,this.model=e.model,this.maxTokens=e.maxTokens||8192,console.log("✅ 使用用户配置的AI设置")):(this.apiUrl=Ie.apiUrl,this.apiKey=Ie.apiKey,this.model=Ie.model,this.maxTokens=Ie.maxTokens,console.log("📋 使用默认AI配置"));const t=this.validateCurrentConfig();t.isValid||console.warn("⚠️ AI 配置问题:",t.issues)}validateCurrentConfig(){const e=[],t=this.apiUrl.includes("flow.ovo.gs");return!t&&(!this.apiKey||this.apiKey==="")&&e.push("API 密钥未设置"),this.apiUrl||e.push("API 端点未设置"),this.model||e.push("模型名称未设置"),{isValid:e.length===0,issues:e,isWorkerBackend:t}}refreshConfig(){this.updateConfig(),console.log("🔄 AI配置已刷新")}filterThinkTags(e){if(!e)return"";const t=e.length,n=e.replace(/<think>[\s\S]*?<\/think>/gi,"").trim();return t!==n.length&&console.log("🧠 AI服务源头过滤思考标签:",{原始长度:t,过滤后长度:n.length,过滤掉的内容长度:t-n.length}),n}async*queryAI(e,t={}){try{this.updateConfig(),this.currentRequest&&this.currentRequest.abort();const n=new AbortController;this.currentRequest=n;const i=this.apiUrl.includes("flow.ovo.gs");let o;i?o={prompt:e,model:this.model}:o={model:this.model,messages:[{role:"user",content:e}],max_tokens:t.maxTokens||8192,temperature:t.temperature||.7,stream:!0};const r={"Content-Type":"application/json"};this.apiKey&&this.apiKey!==""&&!this.apiUrl.includes("flow.ovo.gs")&&(r.Authorization=`Bearer ${this.apiKey}`);const l=await fetch(this.apiUrl,{method:"POST",headers:r,body:JSON.stringify(o),signal:n.signal});if(!l.ok){let m="AI服务暂时不可用，请稍后再试";throw l.status===429?m="请求过于频繁，请稍等片刻再试":l.status>=500?m="服务器暂时繁忙，请稍后再试":l.status===401&&(m="API 密钥无效"),new Error(`${m} (状态码: ${l.status})`)}if(!l.body)throw new Error("Response body is null");const d=l.body.getReader(),c=new TextDecoder;let g="",u="";try{for(;;){const{done:m,value:f}=await d.read();if(m){if(g.trim()){const w=this.parseStreamChunk(g);w&&(u+=w,yield w)}break}g+=c.decode(f,{stream:!0});const x=g.split(`
`);g=x.pop()||"";for(const w of x){const k=this.parseStreamChunk(w);k&&(u+=k,yield k)}}}finally{d.releaseLock(),this.currentRequest=null,u.includes("<think>")&&console.log("🧠 AI响应包含思考标签，建议在前端进行完整过滤")}}catch(n){throw this.currentRequest=null,n.name!=="AbortError"&&console.error("AI 请求失败:",n),n}}parseStreamChunk(e){const t=e.trim();if(!t||!t.startsWith("data: "))return null;const n=t.slice(6);if(n==="[DONE]")return null;try{const i=JSON.parse(n);if(i.choices&&i.choices[0]&&i.choices[0].delta&&i.choices[0].delta.content)return i.choices[0].delta.content}catch(i){console.debug("跳过非 JSON 数据:",n,i)}return null}async queryAIComplete(e,t={}){let n="";for await(const i of this.queryAI(e,t))n+=i;return this.filterThinkTags(n)}cancelRequest(){this.currentRequest&&(this.currentRequest.abort(),this.currentRequest=null)}buildBaziPrompt(e,t,n=""){let o=`你是一位学贯古今的命理宗师，既精通《滴天髓》、《三命通会》等八字古籍，也了解现代社会的心理学和职业发展。请基于以下专业的八字干支关系信息，为用户提供一份详尽的分析。

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

请确保分析内容专业深入，指导建议实用可行，最终目的是帮助双方建立更和谐的关系。`}getPromptConfig(){return nt}buildPrompt(e,t,n,i=null){return Sn(e,t,n,i)}buildPromptFromConfig(e,t,n){const i=nt.single.find(o=>o.id===t.id);if(i){const o=n?be(n,t):"无法获取命盘数据。",r=new Date().toLocaleString("zh-CN");return t.id==="ai-mingge-zonglun"?i.prompt.replace("[八字信息]",o):`你是一位学贯古今的命理宗师，既精通《滴天髓》、《三命通会》等八字古籍，也了解现代社会的心理学和职业发展。请根据以下信息，为用户提供一份详尽的分析。

**当前时间:** ${r}

**八字信息:**
${o}

**问题:** ${e}

**分析要求:**
${i.prompt}`}return this.buildBaziPrompt(be(n,t),e)}}const ve=new ht,_n=Object.freeze(Object.defineProperty({__proto__:null,AIService:ht,aiService:ve},Symbol.toStringTag,{value:"Module"}));function In(){const s=D(""),e=D(!1),t=D("");return{aiResponse:s,isAIThinking:e,aiError:t,askAI:async(o,r="custom",l,d,c=!1)=>{if(!d){t.value="请先进行排盘计算",he("请先进行排盘计算");return}e.value=!0,t.value="",c||(s.value="");try{const g=l(o,r,d);for await(const u of ve.queryAI(g))s.value+=u;e.value=!1}catch(g){console.error("AI分析失败:",g),t.value=g.message||"AI分析失败",he(t.value),e.value=!1}},clearAIResponse:()=>{s.value="",t.value=""}}}const Ne=rt("ziWei",()=>{const s=zt({isLunar:!1}),{person1:e,person2:t,enableSecondPerson:n,result1:i,result2:o,isCalculating:r,calculationError:l,canCalculate:d,hasResults:c,resetData:g}=s,u=In(),{aiResponse:m,isAIThinking:f,aiError:x,askAI:w,clearAIResponse:k}=u,p=de(()=>Qe(i.value)),S=de(()=>Qe(o.value)),L=async()=>{if(!d.value)return he("请填写完整的出生信息"),!1;if(r.value)return!1;r.value=!0,l.value="";const C="ziwei-calculation";try{return fe.showLoading("正在计算紫薇斗数...",C),fe.updateLoadingMessage("正在计算第一人紫薇斗数...",C),i.value=Fe(parseInt(e.value.year),parseInt(e.value.month),parseInt(e.value.day),parseInt(e.value.timeIndex),e.value.gender,e.value.isLunar),n.value?(fe.updateLoadingMessage("正在计算第二人紫薇斗数...",C),o.value=Fe(parseInt(t.value.year),parseInt(t.value.month),parseInt(t.value.day),parseInt(t.value.timeIndex),t.value.gender,t.value.isLunar)):o.value=null,fe.hideLoading(C),we("紫薇斗数计算完成！"),!0}catch(N){fe.hideLoading(C),console.error("紫薇斗数计算失败:",N);const O=N.message||"紫薇斗数计算失败，请检查输入信息";return l.value=O,he(O),Be.reportError(N,"紫薇斗数计算"),!1}finally{r.value=!1}},j=async(C,N="custom",O=!1)=>{const H={person1:p.value,person2:n.value?S.value:null,enableSecondPerson:n.value};await w(C,N,(W,ue,ie)=>ie.enableSecondPerson&&ie.person2?Ut(W,ie.person1,ie.person2):Lt(ue,W,ie.person1),H,O)},Q=()=>{g(),k()},z=()=>{i.value=null,o.value=null,l.value="",m.value="",x.value="",r.value=!1,f.value=!1,Kt(),Qt(),E()},M=()=>n.value&&o.value?et(e.value,t.value):i.value?et(e.value):window.location.origin+window.location.pathname,V=async()=>{try{const C=Ft();if(C)return e.value={...e.value,...C.person1},t.value={...t.value,...C.person2},n.value=!0,await L(),!0;const N=qt();if(N)return e.value={...e.value,...N},await L(),!0}catch(C){console.error("从URL恢复紫薇斗数数据失败:",C)}return!1},ee=()=>{try{n.value&&d.value?Wt(e.value,t.value):d.value&&Ht(e.value)}catch(C){console.error("保存紫薇斗数数据到URL失败:",C)}},oe=(C,N=null)=>{try{let O="紫薇排盘";N?O=`${C||"第一人"}与${N||"第二人"}的紫薇合盘分析`:C&&(O=`${C}的紫薇排盘`),document.title=O;const H=document.querySelector('meta[property="og:title"]');H&&H.setAttribute("content",O);const ne=document.querySelector('meta[name="description"]');if(ne&&C){let W="专业的AI紫薇斗数排盘和命理分析工具";N?W=`${C}与${N}的紫薇斗数合盘分析，专业AI命理解读`:W=`${C}的紫薇斗数排盘结果，专业AI命理分析`,ne.setAttribute("content",W)}}catch(O){console.error("更新页面标题失败:",O)}},E=()=>{try{document.title="紫薇排盘";const C=document.querySelector('meta[property="og:title"]');C&&C.setAttribute("content","紫薇排盘");const N=document.querySelector('meta[name="description"]');N&&N.setAttribute("content","专业的AI紫薇斗数排盘和命理分析工具")}catch(C){console.error("重置页面标题失败:",C)}};return _e([e,t,n],()=>{ee()},{deep:!0}),{person1:e,person2:t,enableSecondPerson:n,ziWeiResult1:i,ziWeiResult2:o,isCalculating:r,calculationError:l,aiResponse:m,isAIThinking:f,aiError:x,canCalculate:d,hasResults:c,displayData1:p,displayData2:S,calculateZiWei:L,askAI:j,resetData:Q,clearResults:z,clearAIResponse:k,restoreDataFromUrl:V,generateShareUrl:M,updatePageTitle:oe,resetPageTitle:E}});const $n={class:"input-card"},bn={class:"person-section"},wn={class:"form-group"},kn={class:"custom-date-row"},An={class:"custom-date-field"},Pn={class:"custom-date-field"},Cn={class:"custom-date-field"},Tn={class:"form-group"},En=["value"],Ln={class:"form-group"},Un={class:"gender-buttons"},Gn={key:0,class:"error-message"},Nn={class:"compatibility-section"},jn={class:"compatibility-toggle"},Mn={key:1,class:"person-section second-person"},Dn={class:"form-group"},Rn={class:"custom-date-row"},Bn={class:"custom-date-field"},On={class:"custom-date-field"},Yn={class:"custom-date-field"},Zn={class:"form-group"},Hn=["value"],qn={class:"form-group"},Kn={class:"gender-buttons"},Jn=["disabled"],Vn={__name:"ZiWeiForm",setup(s){const e=Ne(),t=[{name:"早子时",range:"00:00-01:00"},{name:"丑时",range:"01:00-03:00"},{name:"寅时",range:"03:00-05:00"},{name:"卯时",range:"05:00-07:00"},{name:"辰时",range:"07:00-09:00"},{name:"巳时",range:"09:00-11:00"},{name:"午时",range:"11:00-13:00"},{name:"未时",range:"13:00-15:00"},{name:"申时",range:"15:00-17:00"},{name:"酉时",range:"17:00-19:00"},{name:"戌时",range:"19:00-21:00"},{name:"亥时",range:"21:00-23:00"},{name:"晚子时",range:"23:00-24:00"}],n=()=>{if(e.enableSecondPerson)if(e.person1.name||e.person2.name){const o=e.person1.name||"第一人",r=e.person2.name||"第二人";e.updatePageTitle(o,r)}else e.resetPageTitle();else e.person1.name?e.updatePageTitle(e.person1.name):e.resetPageTitle()};_e([()=>e.person1.name,()=>e.person2.name,()=>e.enableSecondPerson],()=>{n()},{immediate:!0});const i=async()=>{await e.calculateZiWei()};return(o,r)=>te((_(),I("div",$n,[r[29]||(r[29]=a("h1",null,"紫薇斗数排盘",-1)),a("div",bn,[a("div",wn,[r[15]||(r[15]=a("label",{for:"name"},"姓名（选填）",-1)),te(a("input",{id:"name","onUpdate:modelValue":r[0]||(r[0]=l=>P(e).person1.name=l),type:"text",placeholder:"请输入姓名"},null,512),[[ce,P(e).person1.name]])]),a("div",kn,[a("div",An,[r[16]||(r[16]=a("label",{for:"year"},"年",-1)),te(a("input",{id:"year","onUpdate:modelValue":r[1]||(r[1]=l=>P(e).person1.year=l),type:"number",placeholder:"2000",min:"1900",max:"2100",class:"custom-date-input"},null,512),[[ce,P(e).person1.year]])]),a("div",Pn,[r[17]||(r[17]=a("label",{for:"month"},"月",-1)),te(a("input",{id:"month","onUpdate:modelValue":r[2]||(r[2]=l=>P(e).person1.month=l),type:"number",placeholder:"1-12",min:"1",max:"12",class:"custom-date-input"},null,512),[[ce,P(e).person1.month]])]),a("div",Cn,[r[18]||(r[18]=a("label",{for:"day"},"日",-1)),te(a("input",{id:"day","onUpdate:modelValue":r[3]||(r[3]=l=>P(e).person1.day=l),type:"number",placeholder:"1-31",min:"1",max:"31",class:"custom-date-input"},null,512),[[ce,P(e).person1.day]])])]),a("div",Tn,[r[19]||(r[19]=a("label",{for:"hour"},"时辰",-1)),te(a("select",{id:"hour","onUpdate:modelValue":r[4]||(r[4]=l=>P(e).person1.timeIndex=l)},[(_(),I(K,null,F(t,(l,d)=>a("option",{key:d,value:d},v(l.name)+" ("+v(l.range)+") ",9,En)),64))],512),[[Je,P(e).person1.timeIndex]])]),a("div",Ln,[r[20]||(r[20]=a("label",null,"性别",-1)),a("div",Un,[a("button",{type:"button",class:ae(["gender-button",{selected:P(e).person1.gender==="male"}]),onClick:r[5]||(r[5]=l=>P(e).person1.gender="male")}," 男 ",2),a("button",{type:"button",class:ae(["gender-button",{selected:P(e).person1.gender==="female"}]),onClick:r[6]||(r[6]=l=>P(e).person1.gender="female")}," 女 ",2)])])]),P(e).calculationError?(_(),I("div",Gn,v(P(e).calculationError),1)):G("",!0),a("div",Nn,[a("label",jn,[te(a("input",{type:"checkbox","onUpdate:modelValue":r[7]||(r[7]=l=>P(e).enableSecondPerson=l)},null,512),[[pt,P(e).enableSecondPerson]]),r[21]||(r[21]=Y(" 启用合盘分析 "))])]),P(e).enableSecondPerson?(_(),I("div",Mn,[r[28]||(r[28]=a("h3",null,"第二人信息",-1)),a("div",Dn,[r[22]||(r[22]=a("label",{for:"name2"},"姓名（选填）",-1)),te(a("input",{id:"name2","onUpdate:modelValue":r[8]||(r[8]=l=>P(e).person2.name=l),type:"text",placeholder:"请输入第二人姓名"},null,512),[[ce,P(e).person2.name]])]),a("div",Rn,[a("div",Bn,[r[23]||(r[23]=a("label",{for:"year2"},"年",-1)),te(a("input",{id:"year2","onUpdate:modelValue":r[9]||(r[9]=l=>P(e).person2.year=l),type:"number",placeholder:"2000",min:"1900",max:"2100",class:"custom-date-input"},null,512),[[ce,P(e).person2.year]])]),a("div",On,[r[24]||(r[24]=a("label",{for:"month2"},"月",-1)),te(a("input",{id:"month2","onUpdate:modelValue":r[10]||(r[10]=l=>P(e).person2.month=l),type:"number",placeholder:"1-12",min:"1",max:"12",class:"custom-date-input"},null,512),[[ce,P(e).person2.month]])]),a("div",Yn,[r[25]||(r[25]=a("label",{for:"day2"},"日",-1)),te(a("input",{id:"day2","onUpdate:modelValue":r[11]||(r[11]=l=>P(e).person2.day=l),type:"number",placeholder:"1-31",min:"1",max:"31",class:"custom-date-input"},null,512),[[ce,P(e).person2.day]])])]),a("div",Zn,[r[26]||(r[26]=a("label",{for:"hour2"},"时辰",-1)),te(a("select",{id:"hour2","onUpdate:modelValue":r[12]||(r[12]=l=>P(e).person2.timeIndex=l)},[(_(),I(K,null,F(t,(l,d)=>a("option",{key:d,value:d},v(l.name)+" ("+v(l.range)+") ",9,Hn)),64))],512),[[Je,P(e).person2.timeIndex]])]),a("div",qn,[r[27]||(r[27]=a("label",null,"性别",-1)),a("div",Kn,[a("button",{type:"button",class:ae(["gender-button",{selected:P(e).person2.gender==="male"}]),onClick:r[13]||(r[13]=l=>P(e).person2.gender="male")}," 男 ",2),a("button",{type:"button",class:ae(["gender-button",{selected:P(e).person2.gender==="female"}]),onClick:r[14]||(r[14]=l=>P(e).person2.gender="female")}," 女 ",2)])])])):G("",!0),a("button",{class:"primary-button",disabled:!P(e).canCalculate||P(e).isCalculating,onClick:i},v(P(e).isCalculating?"计算中...":"开始排盘"),9,Jn)],512)),[[mt,!P(e).hasResults]])}},Wn=ke(Vn,[["__scopeId","data-v-1b651200"]]);const Fn={class:"api-key-config"},Qn={class:"modal-body"},zn={class:"form-group"},Xn={class:"form-group"},es={class:"form-group"},ts={class:"form-group"},Ge="ai_api_config",ns={__name:"ApiKeyConfig",props:{visible:{type:Boolean,default:!1}},emits:["update:visible","config-saved"],setup(s,{expose:e,emit:t}){const n=s,i=t,o=D(n.visible),r=yt({apiUrl:"",apiKey:"",model:"",maxTokens:8192});_e(()=>n.visible,m=>{o.value=m,m&&l()});const l=()=>{try{const m=localStorage.getItem(Ge);if(m){const f=JSON.parse(m);Object.assign(r,{apiUrl:f.apiUrl||"",apiKey:f.apiKey||"",model:f.model||"",maxTokens:f.maxTokens||8192})}}catch(m){console.error("加载配置失败:",m)}},d=()=>{try{if(!r.apiUrl.trim()){he("请输入 API 地址");return}if(!r.apiKey.trim()){he("请输入 API 密钥");return}if(!r.model.trim()){he("请输入模型名称");return}try{new URL(r.apiUrl)}catch{he("请输入有效的 API 地址");return}const m={apiUrl:r.apiUrl.trim(),apiKey:r.apiKey.trim(),model:r.model.trim(),maxTokens:r.maxTokens};localStorage.setItem(Ge,JSON.stringify(m)),we("配置保存成功"),i("config-saved",m),g()}catch(m){console.error("保存配置失败:",m),he("保存配置失败")}},c=()=>{r.apiUrl="",r.apiKey="",r.model="",r.maxTokens=8192;try{localStorage.removeItem(Ge),we("配置已重置，将使用默认AI服务"),i("config-saved",null),g()}catch(m){console.error("重置配置失败:",m),he("重置配置失败")}},g=()=>{o.value=!1,i("update:visible",!1)};return e({getCurrentConfig:()=>{try{const m=localStorage.getItem(Ge);return m?JSON.parse(m):null}catch{return null}}}),(m,f)=>(_(),I("div",Fn,[o.value?(_(),I("div",{key:0,class:"modal-overlay",onClick:g},[a("div",{class:"modal-content",onClick:f[4]||(f[4]=ot(()=>{},["stop"]))},[a("div",{class:"modal-header"},[f[5]||(f[5]=a("h3",null,"配置 AI API",-1)),a("button",{class:"close-btn",onClick:g},"×")]),a("div",Qn,[a("div",zn,[f[6]||(f[6]=a("label",{for:"apiUrl"},"API 地址",-1)),te(a("input",{id:"apiUrl","onUpdate:modelValue":f[0]||(f[0]=x=>r.apiUrl=x),type:"text",placeholder:"https://api.openai.com/v1/chat/completions",class:"form-input"},null,512),[[ce,r.apiUrl]]),f[7]||(f[7]=a("small",{class:"form-hint"},"兼容 OpenAI 格式的 API 地址",-1))]),a("div",Xn,[f[8]||(f[8]=a("label",{for:"apiKey"},"API 密钥",-1)),te(a("input",{id:"apiKey","onUpdate:modelValue":f[1]||(f[1]=x=>r.apiKey=x),type:"password",placeholder:"sk-...",class:"form-input"},null,512),[[ce,r.apiKey]]),f[9]||(f[9]=a("small",{class:"form-hint"},"您的 API 密钥，将安全保存在本地浏览器",-1))]),a("div",es,[f[10]||(f[10]=a("label",{for:"model"},"模型名称",-1)),te(a("input",{id:"model","onUpdate:modelValue":f[2]||(f[2]=x=>r.model=x),type:"text",placeholder:"gpt-3.5-turbo",class:"form-input"},null,512),[[ce,r.model]]),f[11]||(f[11]=a("small",{class:"form-hint"},"使用的模型名称",-1))]),a("div",ts,[f[12]||(f[12]=a("label",{for:"maxTokens"},"最大 Token 数",-1)),te(a("input",{id:"maxTokens","onUpdate:modelValue":f[3]||(f[3]=x=>r.maxTokens=x),type:"number",placeholder:"8192",min:"100",max:"32000",class:"form-input"},null,512),[[ce,r.maxTokens,void 0,{number:!0}]]),f[13]||(f[13]=a("small",{class:"form-hint"},"单次请求的最大 Token 数量",-1))])]),a("div",{class:"modal-footer"},[a("button",{class:"btn btn-secondary",onClick:c},"重置"),a("button",{class:"btn btn-primary",onClick:d},"保存配置")])])])):G("",!0)]))}},ss=ke(ns,[["__scopeId","data-v-25104793"]]);const as={class:"action-buttons"},rs=["disabled"],os=["disabled"],is=["onClick","disabled"],ls={key:0,class:"btn-icon",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},cs=["d"],us={__name:"ActionButtons",props:{showRecalculate:{type:Boolean,default:!0},recalculateText:{type:String,default:"重新排盘"},showApiConfig:{type:Boolean,default:!0},apiConfigText:{type:String,default:"配置 Key"},customButtons:{type:Array,default:()=>[]},loading:{type:Boolean,default:!1},clearResultsMethod:{type:Function,default:null}},emits:["recalculate","api-config","custom-button","config-saved"],setup(s,{expose:e,emit:t}){const n=s,i=t,o=D(!1),r=()=>{n.clearResultsMethod&&n.clearResultsMethod();const g=new URL(window.location);g.search="",window.history.replaceState({},"",g.toString()),window.scrollTo({top:0,behavior:"smooth"}),we("已清空结果，请重新输入信息进行排盘"),i("recalculate")},l=()=>{o.value=!0,i("api-config")},d=(g,u)=>{g.handler&&typeof g.handler=="function"&&g.handler(),i("custom-button",{button:g,index:u})},c=g=>{we("API 配置已保存"),i("config-saved",g)};return e({openApiConfig:()=>{o.value=!0},closeApiConfig:()=>{o.value=!1}}),(g,u)=>(_(),I(K,null,[a("div",as,[s.showRecalculate?(_(),I("button",{key:0,class:"action-btn btn-secondary",onClick:r,disabled:s.loading},[u[1]||(u[1]=a("svg",{class:"btn-icon",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},[a("path",{d:"M1 4v6h6"}),a("path",{d:"M23 20v-6h-6"}),a("path",{d:"M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"})],-1)),Y(" "+v(s.recalculateText),1)],8,rs)):G("",!0),s.showApiConfig?(_(),I("button",{key:1,class:"action-btn btn-primary",onClick:l,disabled:s.loading},[u[2]||(u[2]=a("svg",{class:"btn-icon",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},[a("path",{d:"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"}),a("path",{d:"M9 12l2 2 4-4"})],-1)),Y(" "+v(s.apiConfigText),1)],8,os)):G("",!0),(_(!0),I(K,null,F(s.customButtons,(m,f)=>(_(),I("button",{key:f,class:ae(["action-btn",m.type||"btn-secondary"]),onClick:x=>d(m,f),disabled:s.loading||m.disabled},[m.icon?(_(),I("svg",ls,[a("path",{d:m.icon},null,8,cs)])):G("",!0),Y(" "+v(m.text),1)],10,is))),128))]),(_(),it(lt,{to:"body"},[xe(ss,{visible:o.value,"onUpdate:visible":u[0]||(u[0]=m=>o.value=m),onConfigSaved:c},null,8,["visible"])]))],64))}},ds=ke(us,[["__scopeId","data-v-6750d609"]]);const hs={class:"ziwei-result-wrapper"},gs={key:0,class:"loading-container"},ms={key:1,class:"error-container"},ps={key:2,class:"result-card"},ys={class:"basic-info-section"},fs={key:0,class:"compatibility-basic-info"},vs={class:"person-basic-info"},xs={class:"basic-info-text"},Ss={class:"value"},_s={class:"value"},Is={class:"value"},$s={class:"value"},bs={class:"value"},ws={class:"value"},ks={class:"value"},As={class:"person-basic-info"},Ps={class:"basic-info-text"},Cs={class:"value"},Ts={class:"value"},Es={class:"value"},Ls={class:"value"},Us={class:"value"},Gs={class:"value"},Ns={class:"value"},js={key:1},Ms={class:"basic-info-text"},Ds={class:"value"},Rs={class:"value"},Bs={class:"value"},Os={class:"value"},Ys={class:"value"},Zs={class:"value"},Hs={class:"value"},qs={class:"value"},Ks={class:"mutagen-container"},Js={class:"mutagen-grid"},Vs={class:"mutagen-item"},Ws={class:"mutagen-star"},Fs={class:"mutagen-item"},Qs={class:"mutagen-star"},zs={class:"mutagen-item"},Xs={class:"mutagen-star"},ea={class:"mutagen-item"},ta={class:"mutagen-star"},na={class:"chart-section"},sa={key:0,class:"compatibility-charts"},aa={class:"person-chart-container"},ra={class:"astrolabe-grid compact"},oa=["onClick"],ia={class:"palace-header"},la={class:"palace-name"},ca={key:0,class:"body-palace-mark"},ua={class:"palace-stems"},da={class:"palace-stars"},ha={class:"palace-details compact"},ga={key:0,class:"changsheng"},ma={key:1,class:"boshi"},pa={key:0,class:"ages"},ya={class:"person-chart-container"},fa={class:"astrolabe-grid compact"},va=["onClick"],xa={class:"palace-header"},Sa={class:"palace-name"},_a={key:0,class:"body-palace-mark"},Ia={class:"palace-stems"},$a={class:"palace-stars"},ba={class:"palace-details compact"},wa={key:0,class:"changsheng"},ka={key:1,class:"boshi"},Aa={key:0,class:"ages"},Pa={class:"compatibility-analysis"},Ca={class:"compatibility-analysis-content"},Ta={key:1,class:"professional-chart-container"},Ea={class:"astrolabe-grid"},La=["onClick"],Ua={class:"palace-header"},Ga={class:"palace-name"},Na={key:0,class:"body-palace-mark"},ja={class:"palace-stems"},Ma={class:"palace-stars"},Da={class:"palace-details"},Ra={key:0,class:"changsheng"},Ba={key:1,class:"boshi"},Oa={key:2,class:"jiangqian"},Ya={key:0,class:"ages"},Za={key:1,class:"empty-palace"},Ha={key:0,class:"detailed-analysis-text"},qa={class:"analysis-text-section"},Ka={class:"analysis-text-content"},Ja={class:"analysis-text-section"},Va={class:"analysis-text-content"},Wa={class:"analysis-text-section"},Fa={class:"analysis-text-content"},Qa={class:"analysis-text-section"},za={class:"analysis-text-content"},Xa={class:"palace-modal-header"},er={class:"palace-modal-content"},tr={class:"palace-basic-info"},nr={key:0},sr={key:1},ar={key:2},rr={key:0,class:"palace-stars-detail"},or={key:0,class:"star-category"},ir={class:"star-list"},lr={class:"star-name"},cr={key:0,class:"star-brightness"},ur={key:1,class:"star-mutagen"},dr={key:1,class:"star-category"},hr={class:"star-list"},gr={class:"star-name"},mr={key:0,class:"star-brightness"},pr={key:1,class:"star-mutagen"},yr={key:2,class:"star-category"},fr={class:"star-list"},vr={class:"star-name"},xr={key:0,class:"star-brightness"},Sr={key:1,class:"star-mutagen"},_r={key:1,class:"palace-analysis"},Ir={class:"palace-analysis-content"},$r={class:"palace-meaning"},br={class:"palace-star-analysis"},wr={class:"palace-fortune-analysis"},kr={class:"palace-advice"},Ar={class:"palace-other-info"},Pr={key:0},Cr={key:1},Tr={key:2},Er={key:3},Lr={key:4},Ur={__name:"ZiWeiResult",setup(s){const e=Ne(),t=de(()=>e.displayData1),n=D(null),i=b=>{const h=["star-item"];return b.type&&h.push(`star-${b.type}`),b.brightness&&h.push(`brightness-${b.brightness}`),b.mutagen&&h.push(`mutagen-${b.mutagen}`),h.join(" ")},o=b=>({化禄:"lu",化权:"quan",化科:"ke",化忌:"ji"})[b]||"",r=b=>{n.value=b},l=()=>{n.value=null},d=()=>{if(!t.value?.palaces)return"未知";const b=t.value.palaces.find($=>$.name==="命宫");if(!b)return"未知";const y=(b.allStars||[]).filter($=>$.type==="major");return y.length===0?"无主星":y.map($=>$.name).join("、")},c=()=>{if(!t.value?.palaces)return"未知";const b=t.value.palaces.find($=>$.isBodyPalace);if(!b)return"未知";const y=(b.allStars||[]).filter($=>$.type==="major");return y.length===0?"无主星":y.map($=>$.name).join("、")},g=()=>{if(!t.value?.palaces)return"未知";const b=t.value.palaces.find(U=>U.name==="命宫");if(!b)return"未知";const h=b.majorStars||[];if(h.length===0)return"平常格局";const y=h.some(U=>["紫微","天府","太阳","武曲"].includes(U.name)),$=h.some(U=>["庙","旺"].includes(U.brightness));return y&&$?"上等格局":y||$?"中等格局":"平常格局"},u=()=>{if(!t.value?.palaces)return"未知";const b=t.value.palaces.find($=>$.name==="命宫");if(!b)return"未知";const h=b.majorStars||[];if(h.length===0)return"空宫格局";const y=h.map($=>$.name);return y.includes("紫微")?"帝王格局":y.includes("天府")?"财库格局":y.includes("太阳")?"光明格局":y.includes("武曲")?"财星格局":y.includes("天同")?"福德格局":y.includes("廉贞")?"权威格局":"一般格局"},m=()=>{if(!t.value?.palaces)return[];const b=[];return["命宫","财帛宫","官禄宫","夫妻宫"].forEach(y=>{const $=t.value.palaces.find(U=>U.name===y);if($&&$.allStars){const U=$.allStars.filter(J=>J.type==="major");if(U.length>0){const J=U.map(le=>le.name);let R=f(y,J);b.push({palace:y,stars:J,description:R})}}}),b},f=(b,h)=>{const $={命宫:{紫微:"具有领导才能，天生贵气，适合管理职位",天机:"聪明机智，善于策划，适合智力工作",太阳:"性格开朗，有正义感，适合公职或教育",武曲:"意志坚强，理财能力佳，适合金融业",天同:"性格温和，人缘好，适合服务业",廉贞:"个性刚强，有魄力，适合执法或军警"},财帛宫:{紫微:"财运亨通，有贵人相助，财源广进",武曲:"理财有道，投资眼光佳，财富稳定增长",天府:"财库丰厚，善于积累，晚年富足",太阴:"财运平稳，适合稳健投资"},官禄宫:{紫微:"事业有成，适合领导职位，官运亨通",武曲:"事业稳定，在金融或技术领域有所成就",天机:"适合策划、咨询类工作，智慧型事业",太阳:"适合公职或教育事业，声名远播"},夫妻宫:{紫微:"配偶条件佳，婚姻美满，夫妻恩爱",天同:"夫妻和睦，感情稳定，家庭幸福",太阴:"配偶温柔体贴，感情深厚",天府:"配偶贤能，家庭富足"}}[b]||{};return h.map(J=>$[J]||`${J}星坐守，影响${b}运势`).join("；")||`${h.join("、")}星坐守${b}，需结合整体命盘分析`},x=()=>{if(!t.value?.mutagens||!t.value?.palaces)return[];const b=[],h=t.value.mutagens;return Object.entries(h).forEach(([y,$])=>{if($&&$!=="无"){const U=w($),J=k(y,$,U);b.push({type:y,name:J.name,star:$,palace:U||"未知宫位",description:J.description})}}),b},w=b=>{if(!t.value?.palaces)return null;for(const h of t.value.palaces)if((h.allStars||[]).some($=>$.name===b))return h.name;return null},k=(b,h,y)=>{const $={lu:"化禄",quan:"化权",ke:"化科",ji:"化忌"},U={lu:`${h}化禄在${y}，主财运亨通，此宫位运势佳，有贵人相助`,quan:`${h}化权在${y}，主权威增强，此宫位有掌控力，适合发挥领导才能`,ke:`${h}化科在${y}，主名声显达，此宫位有贵气，利于学业和声誉`,ji:`${h}化忌在${y}，主阻碍较多，此宫位需谨慎，宜化解不利因素`};return{name:$[b]||b,description:U[b]||`${h}${$[b]}的影响需要具体分析`}},p=()=>{const b=t.value?.horoscope?.currentAge||0,y=Math.floor((b-6)/10),$=["命宫","父母宫","福德宫","田宅宫","官禄宫","奴仆宫","迁移宫","疾厄宫","财帛宫","子女宫","夫妻宫","兄弟宫"],U=y%12;return $[U]||"未知"},S=()=>{const b=new Date().getFullYear(),h=t.value?.basicInfo?.birthDate?.year||b,y=b-h,$=["命宫","兄弟宫","夫妻宫","子女宫","财帛宫","疾厄宫","迁移宫","奴仆宫","官禄宫","田宅宫","福德宫","父母宫"],U=y%12;return $[U]||"未知"},L=()=>{const b=t.value?.horoscope?.currentAge||0;return b<30?"青年时期，宜努力学习，积累经验，为未来打好基础。注意身体健康，培养良好习惯。":b<50?"中年时期，事业发展的关键阶段，宜把握机会，稳健前进。注意家庭和事业的平衡。":"成熟时期，宜发挥经验优势，传承智慧，享受人生。注意身体保养，颐养天年。"},j=b=>{if(!b||b.length===0)return[];const h={紫微:10,天机:10,太阳:10,武曲:10,天同:10,廉贞:10,天府:10,太阴:10,贪狼:10,巨门:10,天相:10,天梁:10,七杀:10,破军:10,左辅:8,右弼:8,文昌:8,文曲:8,天魁:8,天钺:8,禄存:7,天马:7,化禄:9,化权:9,化科:9,化忌:9,火星:6,铃星:6,擎羊:6,陀罗:6,地空:5,地劫:5};return b.map($=>({...$,priority:h[$.name]||($.mutagen?9:$.type==="major"?10:3)})).sort(($,U)=>U.priority-$.priority).slice(0,6)},Q=()=>{if(!e.enableSecondPerson||!e.displayData2)return{};const b=e.displayData1,h=e.displayData2,y=M(b,h),$=V(b,h),U=ee(b,h),J=oe(b,h);return{mingGong:y,wuxing:$,sihua:U,shenGong:J}},z=b=>({mingGong:"命宫关系",wuxing:"五行配合",sihua:"四化互动",shenGong:"身宫关系"})[b]||b,M=(b,h)=>{const y=b.basicInfo?.soulPalace||"未知",$=h.basicInfo?.soulPalace||"未知";if(y==="未知"||$==="未知")return"命宫信息不完整，无法分析";if(y===$)return`双方命宫同在${y}，性格相近，容易理解对方`;{const U=E(y,$);return`命宫分别在${y}和${$}，${U}`}},V=(b,h)=>{const y=b.basicInfo?.fiveElementsClass||"未知",$=h.basicInfo?.fiveElementsClass||"未知";return y==="未知"||$==="未知"?"五行局信息不完整，无法分析":y===$?`双方同为${y}，五行相同，能量共振`:`五行局分别为${y}和${$}，需要互补平衡`},ee=(b,h)=>{const y=b.mutagens||{},$=h.mutagens||{},U=[],J={lu:"化禄",quan:"化权",ke:"化科",ji:"化忌"};return Object.keys(y).forEach(R=>{const le=y[R],ye=$[R],Z=J[R]||R;le&&ye&&le===ye&&U.push(`双方${Z}星同为${le}，产生共鸣`)}),U.length===0?"四化星互动平和，无明显冲突":U.join("；")},oe=(b,h)=>{const y=b.basicInfo?.bodyPalace||"未知",$=h.basicInfo?.bodyPalace||"未知";if(y==="未知"||$==="未知")return"身宫信息不完整，无法分析";if(y===$)return`双方身宫同在${y}，价值观念相近，容易产生共鸣`;{const U=E(y,$);return`身宫分别在${y}和${$}，${U}`}},E=(b,h)=>{const y={"命宫-财帛":"财运与性格相关","命宫-事业":"事业发展与个性匹配","命宫-夫妻":"感情与性格互补"},$=`${b}-${h}`,U=`${h}-${b}`;return y[$]||y[U]||"宫位关系需要通过具体星耀配置进一步分析"},C=b=>!b||!b.allStars?[]:b.allStars,N=(b,h)=>!b||!b.allStars?[]:b.allStars.filter(y=>y.type===h),O=b=>({命宫:"代表个人的性格特质、天赋才能、人生格局、基本运势和先天禀赋，是紫薇斗数中最重要的宫位",兄弟宫:"代表兄弟姐妹关系、朋友交往、同事关系、合作伙伴和人际网络的状况",夫妻宫:"代表婚姻感情、配偶关系、恋爱运势、感情模式和异性缘分",子女宫:"代表子女关系、生育能力、教育子女、创造力和部属关系",财帛宫:"代表财运状况、理财能力、赚钱方式、财富积累和金钱观念",疾厄宫:"代表身体健康、疾病倾向、体质强弱、意外灾厄和心理状态",迁移宫:"代表外出运势、变动机会、环境适应、贵人运和远方发展",奴仆宫:"代表部属关系、朋友助力、社交能力、人缘状况和团队合作",官禄宫:"代表事业发展、工作能力、职业方向、社会地位和成就表现",田宅宫:"代表不动产运势、居住环境、家庭状况、祖业传承和生活品质",福德宫:"代表精神享受、兴趣爱好、福分厚薄、心境状态和晚年运势",父母宫:"代表父母关系、长辈缘分、上司关系、学业状况和文书运势"})[b]||"此宫位的具体含义需要结合整体命盘分析",H=b=>{if(!b||!b.allStars)return"此宫位暂无星耀坐守。";const h=b.allStars.filter(R=>R.type==="major"),y=b.allStars.filter(R=>R.type==="minor");b.allStars.filter(R=>R.mutagen);let $=[];if(h.length>0){const R=h.map(le=>le.name).join("、");$.push(`${R}主星坐守`),h.forEach(le=>{const ye=ne(le.name,b.name);ye&&$.push(ye)})}const U=y.filter(R=>["左辅","右弼","文昌","文曲","天魁","天钺","禄存","天马"].includes(R.name));U.length>0&&$.push(`有${U.map(R=>R.name).join("、")}等吉星相助，增强宫位正面能量`);const J=y.filter(R=>["火星","铃星","擎羊","陀罗","地空","地劫"].includes(R.name));return J.length>0&&$.push(`有${J.map(R=>R.name).join("、")}等煞星同宫，需要化解不利影响`),h.length===0&&$.push("此宫位为空宫，需借对宫星耀来论断，或依靠后天努力来充实"),$.length>0?$.join("，")+"。":"此宫位星耀配置需要结合整体命盘分析。"},ne=(b,h)=>({紫微:{命宫:"具有帝王之相，天生领导才能，性格高贵，适合管理职位",财帛宫:"财运亨通，有贵人相助，财源广进，善于理财",官禄宫:"事业有成，适合领导职位，官运亨通，社会地位高",夫妻宫:"配偶条件佳，婚姻美满，夫妻恩爱，感情稳定"},天机:{命宫:"聪明机智，善于策划，反应敏捷，适合智力工作",财帛宫:"理财有方，投资眼光独到，财运变化较大",官禄宫:"适合策划、咨询类工作，智慧型事业发展佳",兄弟宫:"兄弟朋友聪明，关系变化较多，需要用智慧维系"},太阳:{命宫:"性格开朗，有正义感，光明磊落，适合公职或教育",财帛宫:"财运光明，赚钱光明正大，适合阳光行业",官禄宫:"适合公职或教育事业，声名远播，受人尊敬",父母宫:"与父亲缘分深厚，父亲对自己影响较大"},武曲:{命宫:"意志坚强，个性刚毅，理财能力佳，适合金融业",财帛宫:"理财有道，投资眼光佳，财富稳定增长，善于积累",官禄宫:"事业稳定，在金融或技术领域有所成就",夫妻宫:"配偶性格坚强，夫妻关系需要磨合"},天同:{命宫:"性格温和，人缘好，福分厚，适合服务业",财帛宫:"财运平稳，不愁吃穿，适合稳健投资",夫妻宫:"夫妻和睦，感情稳定，家庭幸福",福德宫:"精神享受丰富，心境平和，晚年福分厚"},廉贞:{命宫:"个性刚强，有魄力，适合执法或军警工作",财帛宫:"财运起伏较大，需要谨慎理财",官禄宫:"适合执法、军警或竞争性行业",疾厄宫:"需要注意心血管疾病，保持情绪稳定"}})[b]?.[h]||null,W=b=>{if(!b||!b.allStars)return"运势平平，需要后天努力。";const h=b.allStars.filter(Z=>Z.mutagen),y=b.allStars.filter(Z=>Z.type==="major"),$=b.allStars.filter(Z=>Z.type==="minor");let U=[];h.length>0&&h.forEach(Z=>{switch(Z.mutagen){case"禄":U.push(`${Z.name}化禄带来财运和贵人运，此宫位运势佳`);break;case"权":U.push(`${Z.name}化权增强掌控力，适合发挥主导作用`);break;case"科":U.push(`${Z.name}化科带来名声和贵气，利于学业和声誉`);break;case"忌":U.push(`${Z.name}化忌带来阻碍，需要谨慎处理，化解不利因素`);break}});const J=y.filter(Z=>["庙","旺"].includes(Z.brightness)),R=y.filter(Z=>["落陷","不得地"].includes(Z.brightness));J.length>0&&U.push("主星庙旺，宫位能量强，运势较佳"),R.length>0&&U.push("主星失陷，宫位能量弱，需要后天加强");const le=$.filter(Z=>["左辅","右弼","文昌","文曲","天魁","天钺"].includes(Z.name)),ye=$.filter(Z=>["火星","铃星","擎羊","陀罗","地空","地劫"].includes(Z.name));return le.length>ye.length?U.push("吉星多于煞星，整体运势向好"):ye.length>le.length&&U.push("煞星较多，需要谨慎行事，化解不利"),U.length>0?U.join("，")+"。":"运势需要结合大运流年综合判断。"},ue=b=>{if(!b)return"建议结合整体命盘制定人生规划。";const h=b.name,y=b.allStars?.filter(R=>R.type==="major")||[],$=b.allStars?.filter(R=>R.mutagen)||[];let U=[];const J={命宫:"注重个人修养和品格培养，发挥天赋才能，建立正确的人生观",兄弟宫:"维护兄弟朋友关系，善于合作，建立良好的人际网络",夫妻宫:"用心经营感情，理解包容，建立和谐的婚姻关系",子女宫:"关爱子女教育，发挥创造力，培养良好的师生或上下级关系",财帛宫:"合理规划财务，稳健投资，培养正确的金钱观念",疾厄宫:"注重身体健康，预防疾病，保持良好的生活习惯",迁移宫:"把握变动机会，适应环境变化，善用贵人助力",奴仆宫:"善待部属朋友，建立互信关系，发挥团队合作精神",官禄宫:"努力工作，提升能力，选择适合的职业发展方向",田宅宫:"合理置业，改善居住环境，维护家庭和睦",福德宫:"培养兴趣爱好，保持心境平和，积累福德",父母宫:"孝敬父母长辈，尊师重道，处理好上下级关系"};return U.push(J[h]||"需要根据具体情况制定相应策略"),$.some(R=>R.mutagen==="忌")&&U.push("此宫位有化忌星，需要特别谨慎，多行善事化解不利"),$.some(R=>R.mutagen==="禄")&&U.push("此宫位有化禄星，可以积极发展，把握机会"),y.length===0&&U.push("空宫需要借对宫星耀，或通过后天努力来充实此宫位"),U.join("；")+"。"},ie=()=>{console.log("紫薇重新排盘")},ge=b=>{b===null?console.log("紫薇页面 - API配置已重置，将使用默认AI服务"):console.log("紫薇页面 - 新的API配置:",b),It(()=>Promise.resolve().then(()=>_n),void 0).then(({aiService:h})=>{h.refreshConfig(),console.log("✅ AI服务配置已更新")})};return(b,h)=>(_(),I("div",hs,[P(e).isCalculating?(_(),I("div",gs,h[1]||(h[1]=[a("div",{class:"loading-indicator"},"计算中...",-1)]))):P(e).calculationError?(_(),I("div",ms,[a("p",null,"错误: "+v(P(e).calculationError),1)])):P(e).hasResults?(_(),I("div",ps,[a("div",ys,[P(e).enableSecondPerson&&P(e).displayData2?(_(),I("div",fs,[a("div",vs,[a("h4",null,v(P(e).person1.name||"第一人")+"的基本信息",1),a("div",xs,[a("p",null,[h[2]||(h[2]=a("span",{class:"label"},"性别",-1)),a("span",Ss,v(P(e).displayData1?.basicInfo?.gender||"未知"),1)]),a("p",null,[h[3]||(h[3]=a("span",{class:"label"},"阳历",-1)),a("span",_s,v(P(e).displayData1?.basicInfo?.birthDate?.solar||"未知"),1)]),a("p",null,[h[4]||(h[4]=a("span",{class:"label"},"农历",-1)),a("span",Is,v(P(e).displayData1?.basicInfo?.birthDate?.lunar||"未知"),1)]),a("p",null,[h[5]||(h[5]=a("span",{class:"label"},"时辰",-1)),a("span",$s,v(P(e).displayData1?.basicInfo?.time||"未知")+" "+v(P(e).displayData1?.basicInfo?.timeRange||""),1)]),a("p",null,[h[6]||(h[6]=a("span",{class:"label"},"五行局",-1)),a("span",bs,v(P(e).displayData1?.basicInfo?.fiveElementsClass||"未知"),1)]),a("p",null,[h[7]||(h[7]=a("span",{class:"label"},"命宫",-1)),a("span",ws,v(P(e).displayData1?.basicInfo?.soulPalace||"未知"),1)]),a("p",null,[h[8]||(h[8]=a("span",{class:"label"},"身宫",-1)),a("span",ks,v(P(e).displayData1?.basicInfo?.bodyPalace||"未知"),1)])])]),a("div",As,[a("h4",null,v(P(e).person2.name||"第二人")+"的基本信息",1),a("div",Ps,[a("p",null,[h[9]||(h[9]=a("span",{class:"label"},"性别",-1)),a("span",Cs,v(P(e).displayData2?.basicInfo?.gender||"未知"),1)]),a("p",null,[h[10]||(h[10]=a("span",{class:"label"},"阳历",-1)),a("span",Ts,v(P(e).displayData2?.basicInfo?.birthDate?.solar||"未知"),1)]),a("p",null,[h[11]||(h[11]=a("span",{class:"label"},"农历",-1)),a("span",Es,v(P(e).displayData2?.basicInfo?.birthDate?.lunar||"未知"),1)]),a("p",null,[h[12]||(h[12]=a("span",{class:"label"},"时辰",-1)),a("span",Ls,v(P(e).displayData2?.basicInfo?.time||"未知")+" "+v(P(e).displayData2?.basicInfo?.timeRange||""),1)]),a("p",null,[h[13]||(h[13]=a("span",{class:"label"},"五行局",-1)),a("span",Us,v(P(e).displayData2?.basicInfo?.fiveElementsClass||"未知"),1)]),a("p",null,[h[14]||(h[14]=a("span",{class:"label"},"命宫",-1)),a("span",Gs,v(P(e).displayData2?.basicInfo?.soulPalace||"未知"),1)]),a("p",null,[h[15]||(h[15]=a("span",{class:"label"},"身宫",-1)),a("span",Ns,v(P(e).displayData2?.basicInfo?.bodyPalace||"未知"),1)])])])])):(_(),I("div",js,[a("div",Ms,[a("p",null,[h[16]||(h[16]=a("span",{class:"label"},"姓名",-1)),a("span",Ds,v(t.value?.basicInfo?.name||"未填写"),1)]),a("p",null,[h[17]||(h[17]=a("span",{class:"label"},"性别",-1)),a("span",Rs,v(t.value?.basicInfo?.gender||"未知"),1)]),a("p",null,[h[18]||(h[18]=a("span",{class:"label"},"阳历",-1)),a("span",Bs,v(t.value?.basicInfo?.birthDate?.solar||"未知"),1)]),a("p",null,[h[19]||(h[19]=a("span",{class:"label"},"农历",-1)),a("span",Os,v(t.value?.basicInfo?.birthDate?.lunar||"未知"),1)]),a("p",null,[h[20]||(h[20]=a("span",{class:"label"},"时辰",-1)),a("span",Ys,v(t.value?.basicInfo?.time||"未知")+" "+v(t.value?.basicInfo?.timeRange||""),1)]),a("p",null,[h[21]||(h[21]=a("span",{class:"label"},"五行局",-1)),a("span",Zs,v(t.value?.basicInfo?.fiveElementsClass||"未知"),1)]),a("p",null,[h[22]||(h[22]=a("span",{class:"label"},"命宫",-1)),a("span",Hs,v(t.value?.basicInfo?.soulPalace||"未知"),1)]),a("p",null,[h[23]||(h[23]=a("span",{class:"label"},"身宫",-1)),a("span",qs,v(t.value?.basicInfo?.bodyPalace||"未知"),1)])]),a("div",Ks,[h[28]||(h[28]=a("h4",null,"四化信息",-1)),a("div",Js,[a("div",Vs,[h[24]||(h[24]=a("span",{class:"mutagen-type lu"},"化禄",-1)),a("span",Ws,v(t.value?.mutagens?.lu||"无"),1)]),a("div",Fs,[h[25]||(h[25]=a("span",{class:"mutagen-type quan"},"化权",-1)),a("span",Qs,v(t.value?.mutagens?.quan||"无"),1)]),a("div",zs,[h[26]||(h[26]=a("span",{class:"mutagen-type ke"},"化科",-1)),a("span",Xs,v(t.value?.mutagens?.ke||"无"),1)]),a("div",ea,[h[27]||(h[27]=a("span",{class:"mutagen-type ji"},"化忌",-1)),a("span",ta,v(t.value?.mutagens?.ji||"无"),1)])])])]))]),a("div",na,[h[30]||(h[30]=a("h3",{class:"chart-title"},"星盘信息",-1)),P(e).enableSecondPerson&&P(e).displayData2?(_(),I("div",sa,[a("div",aa,[a("h3",null,v(P(e).person1.name||"第一人")+"的紫薇星盘",1),a("div",ra,[(_(!0),I(K,null,F(P(e).displayData1.palaces,y=>(_(),I("div",{key:y.name,class:ae(["palace-cell",{"body-palace":y.isBodyPalace}]),onClick:$=>r(y)},[a("div",ia,[a("span",la,v(y.name),1),y.isBodyPalace?(_(),I("span",ca,"身")):G("",!0)]),a("div",ua,v(y.heavenlyStem)+v(y.earthlyBranch),1),a("div",da,[(_(!0),I(K,null,F(j(y.allStars||[]),$=>(_(),I("div",{key:$.name,class:ae(i($))},[Y(v($.name)+" ",1),$.mutagen?(_(),I("span",{key:0,class:ae(["mutagen",o($.mutagen)])},v($.mutagen),3)):G("",!0)],2))),128))]),a("div",ha,[y.changsheng12?(_(),I("div",ga,v(y.changsheng12),1)):G("",!0),y.boshi12?(_(),I("div",ma,v(y.boshi12),1)):G("",!0)]),y.ages&&y.ages.length>0?(_(),I("div",pa,v(y.ages.join("-"))+"岁 ",1)):G("",!0)],10,oa))),128))])]),a("div",ya,[a("h3",null,v(P(e).person2.name||"第二人")+"的紫薇星盘",1),a("div",fa,[(_(!0),I(K,null,F(P(e).displayData2.palaces,y=>(_(),I("div",{key:y.name,class:ae(["palace-cell",{"body-palace":y.isBodyPalace}]),onClick:$=>r(y)},[a("div",xa,[a("span",Sa,v(y.name),1),y.isBodyPalace?(_(),I("span",_a,"身")):G("",!0)]),a("div",Ia,v(y.heavenlyStem)+v(y.earthlyBranch),1),a("div",$a,[(_(!0),I(K,null,F(j(y.allStars||[]),$=>(_(),I("div",{key:$.name,class:ae(i($))},[Y(v($.name)+" ",1),$.mutagen?(_(),I("span",{key:0,class:ae(["mutagen",o($.mutagen)])},v($.mutagen),3)):G("",!0)],2))),128))]),a("div",ba,[y.changsheng12?(_(),I("div",wa,v(y.changsheng12),1)):G("",!0),y.boshi12?(_(),I("div",ka,v(y.boshi12),1)):G("",!0)]),y.ages&&y.ages.length>0?(_(),I("div",Aa,v(y.ages.join("-"))+"岁 ",1)):G("",!0)],10,va))),128))])]),a("div",Pa,[h[29]||(h[29]=a("h4",null,"合盘分析",-1)),a("div",Ca,[(_(!0),I(K,null,F(Q(),(y,$)=>(_(),I("div",{key:$,class:"compatibility-analysis-item"},[a("p",null,[a("strong",null,v(z($))+"：",1),Y(v(y),1)])]))),128))])])])):(_(),I("div",Ta,[a("div",Ea,[(_(!0),I(K,null,F(t.value?.palaces||[],y=>(_(),I("div",{key:y.name,class:ae(["palace-cell",{"body-palace":y.isBodyPalace}]),onClick:$=>r(y)},[a("div",Ua,[a("span",Ga,v(y.name),1),y.isBodyPalace?(_(),I("span",Na,"身")):G("",!0)]),a("div",ja,v(y.heavenlyStem)+v(y.earthlyBranch),1),a("div",Ma,[(_(!0),I(K,null,F(y.allStars||[],$=>(_(),I("div",{key:$.name,class:ae(i($))},[Y(v($.name)+" ",1),$.mutagen?(_(),I("span",{key:0,class:ae(["mutagen",o($.mutagen)])},v($.mutagen),3)):G("",!0)],2))),128))]),a("div",Da,[y.changsheng12?(_(),I("div",Ra,v(y.changsheng12),1)):G("",!0),y.boshi12?(_(),I("div",Ba,v(y.boshi12),1)):G("",!0),y.jiangqian12?(_(),I("div",Oa,v(y.jiangqian12),1)):G("",!0)]),y.ages&&y.ages.length>0?(_(),I("div",Ya,v(y.ages.join("-"))+"岁 ",1)):G("",!0),y.isEmpty?(_(),I("div",Za," 空宫 ")):G("",!0)],10,La))),128))])]))]),P(e).enableSecondPerson?G("",!0):(_(),I("div",Ha,[a("div",qa,[h[35]||(h[35]=a("h4",null,"命盘概述",-1)),a("div",Ka,[a("p",null,[h[31]||(h[31]=a("strong",null,"命主星：",-1)),Y(v(d()),1)]),a("p",null,[h[32]||(h[32]=a("strong",null,"身主星：",-1)),Y(v(c()),1)]),a("p",null,[h[33]||(h[33]=a("strong",null,"命格层次：",-1)),Y(v(g()),1)]),a("p",null,[h[34]||(h[34]=a("strong",null,"格局特征：",-1)),Y(v(u()),1)])])]),a("div",Ja,[h[36]||(h[36]=a("h4",null,"主要星耀分析",-1)),a("div",Va,[(_(!0),I(K,null,F(m(),y=>(_(),I("div",{key:y.palace,class:"star-analysis-text"},[a("p",null,[a("strong",null,v(y.palace)+"：",1),Y(v(y.stars.join("、"))+"星坐守。"+v(y.description),1)])]))),128))])]),a("div",Wa,[h[37]||(h[37]=a("h4",null,"四化详解",-1)),a("div",Fa,[(_(!0),I(K,null,F(x(),y=>(_(),I("div",{key:y.type,class:"mutagen-analysis-text"},[a("p",null,[a("strong",null,v(y.name)+"：",1),Y(v(y.star)+"星在"+v(y.palace)+"。"+v(y.description),1)])]))),128))])]),a("div",Qa,[h[42]||(h[42]=a("h4",null,"运势概况",-1)),a("div",za,[a("p",null,[h[38]||(h[38]=a("strong",null,"当前年龄：",-1)),Y(v(t.value?.horoscope?.currentAge||0)+"岁",1)]),a("p",null,[h[39]||(h[39]=a("strong",null,"大运宫位：",-1)),Y(v(p()),1)]),a("p",null,[h[40]||(h[40]=a("strong",null,"流年宫位：",-1)),Y(v(S()),1)]),a("p",null,[h[41]||(h[41]=a("strong",null,"运势建议：",-1)),Y(v(L()),1)])])])])),xe(ds,{"clear-results-method":P(e).clearResults,onRecalculate:ie,onConfigSaved:ge},null,8,["clear-results-method"]),(_(),it(lt,{to:"body"},[n.value?(_(),I("div",{key:0,class:"palace-modal-overlay",onClick:l},[a("div",{class:"palace-modal",onClick:h[0]||(h[0]=ot(()=>{},["stop"]))},[a("div",Xa,[a("h3",null,v(n.value.name)+"详情",1),a("button",{class:"close-button",onClick:l},"×")]),a("div",er,[a("div",tr,[a("p",null,[h[43]||(h[43]=a("strong",null,"宫位：",-1)),Y(v(n.value.name),1)]),a("p",null,[h[44]||(h[44]=a("strong",null,"干支：",-1)),Y(v(n.value.heavenlyStem)+v(n.value.earthlyBranch),1)]),n.value.isBodyPalace?(_(),I("p",nr,h[45]||(h[45]=[a("strong",null,"身宫",-1)]))):G("",!0),n.value.isEmpty?(_(),I("p",sr,h[46]||(h[46]=[a("strong",null,"空宫",-1)]))):G("",!0),n.value.ages&&n.value.ages.length>0?(_(),I("p",ar,[h[47]||(h[47]=a("strong",null,"年龄：",-1)),Y(v(n.value.ages.join("-"))+"岁 ",1)])):G("",!0)]),C(n.value).length>0?(_(),I("div",rr,[h[48]||(h[48]=a("h4",null,"星耀详情",-1)),N(n.value,"major").length>0?(_(),I("div",or,[a("h5",null,"主星 ("+v(N(n.value,"major").length)+"颗)",1),a("div",ir,[(_(!0),I(K,null,F(N(n.value,"major"),y=>(_(),I("div",{key:y.name,class:"star-detail"},[a("span",lr,v(y.name),1),y.brightness?(_(),I("span",cr,v(y.brightness),1)):G("",!0),y.mutagen?(_(),I("span",ur,v(y.mutagen),1)):G("",!0)]))),128))])])):G("",!0),N(n.value,"minor").length>0?(_(),I("div",dr,[a("h5",null,"辅星 ("+v(N(n.value,"minor").length)+"颗)",1),a("div",hr,[(_(!0),I(K,null,F(N(n.value,"minor"),y=>(_(),I("div",{key:y.name,class:"star-detail"},[a("span",gr,v(y.name),1),y.brightness?(_(),I("span",mr,v(y.brightness),1)):G("",!0),y.mutagen?(_(),I("span",pr,v(y.mutagen),1)):G("",!0)]))),128))])])):G("",!0),N(n.value,"adjective").length>0?(_(),I("div",yr,[a("h5",null,"杂耀 ("+v(N(n.value,"adjective").length)+"颗)",1),a("div",fr,[(_(!0),I(K,null,F(N(n.value,"adjective"),y=>(_(),I("div",{key:y.name,class:"star-detail"},[a("span",vr,v(y.name),1),y.brightness?(_(),I("span",xr,v(y.brightness),1)):G("",!0),y.mutagen?(_(),I("span",Sr,v(y.mutagen),1)):G("",!0)]))),128))])])):G("",!0)])):G("",!0),n.value?(_(),I("div",_r,[h[52]||(h[52]=a("h4",null,"宫位分析",-1)),a("div",Ir,[a("div",$r,[a("p",null,[a("strong",null,v(n.value.name)+"含义：",1),Y(v(O(n.value.name)),1)])]),a("div",br,[a("p",null,[h[49]||(h[49]=a("strong",null,"星耀影响：",-1)),Y(v(H(n.value)),1)])]),a("div",wr,[a("p",null,[h[50]||(h[50]=a("strong",null,"运势分析：",-1)),Y(v(W(n.value)),1)])]),a("div",kr,[a("p",null,[h[51]||(h[51]=a("strong",null,"建议指导：",-1)),Y(v(ue(n.value)),1)])])])])):G("",!0),a("div",Ar,[h[58]||(h[58]=a("h4",null,"其他信息",-1)),n.value.changsheng12?(_(),I("p",Pr,[h[53]||(h[53]=a("strong",null,"长生十二神：",-1)),Y(v(n.value.changsheng12),1)])):G("",!0),n.value.boshi12?(_(),I("p",Cr,[h[54]||(h[54]=a("strong",null,"博士十二神：",-1)),Y(v(n.value.boshi12),1)])):G("",!0),n.value.jiangqian12?(_(),I("p",Tr,[h[55]||(h[55]=a("strong",null,"将前十二神：",-1)),Y(v(n.value.jiangqian12),1)])):G("",!0),n.value.suiqian12?(_(),I("p",Er,[h[56]||(h[56]=a("strong",null,"岁前十二神：",-1)),Y(v(n.value.suiqian12),1)])):G("",!0),n.value.decadal?(_(),I("p",Lr,[h[57]||(h[57]=a("strong",null,"大运：",-1)),Y(v(n.value.decadal),1)])):G("",!0)])])])])):G("",!0)]))])):G("",!0)]))}},st=ke(Ur,[["__scopeId","data-v-e5d32f82"]]);class Gr{constructor(){this.cache=new Map,this.inspirationCache=new Map,this.maxCacheSize=100,this.cacheVersion="1.0",this.init()}init(){try{const e=localStorage.getItem("ai_analysis_cache"),t=localStorage.getItem("ai_cache_version");if(e&&t===this.cacheVersion){const i=JSON.parse(e);this.cache=new Map(i)}else this.clearCache();const n=localStorage.getItem("ai_inspiration_cache");if(n&&t===this.cacheVersion){const i=JSON.parse(n);this.inspirationCache=new Map(i)}}catch(e){console.warn("加载AI缓存失败:",e),this.clearCache()}}generateCacheKey(e,t,n){const i={year:e.year,month:e.month,day:e.day,timeIndex:e.timeIndex,gender:e.gender,questionType:t,question:n.trim()},o=JSON.stringify(i);let r=0;for(let l=0;l<o.length;l++){const d=o.charCodeAt(l);r=(r<<5)-r+d,r=r&r}return Math.abs(r).toString(36)}shouldCache(e){return e!=="custom"}getCache(e,t,n){if(!this.shouldCache(t))return null;try{const i=this.generateCacheKey(e,t,n),o=this.cache.get(i);return o?(o.lastAccessed=Date.now(),this.cache.set(i,o),console.log("AI缓存命中:",t,n),o.response):null}catch(i){return console.warn("获取AI缓存失败:",i),null}}setCache(e,t,n,i){if(!(!this.shouldCache(t)||!i||!i.trim()))try{const o=this.generateCacheKey(e,t,n),r={response:i.trim(),createdAt:Date.now(),lastAccessed:Date.now(),questionType:t,question:n};this.cache.size>=this.maxCacheSize&&this.cleanupOldEntries(),this.cache.set(o,r),this.saveToStorage(),console.log("AI缓存已保存:",t,n)}catch(o){console.warn("保存AI缓存失败:",o)}}cleanupOldEntries(){try{const e=Array.from(this.cache.entries());e.sort((i,o)=>i[1].lastAccessed-o[1].lastAccessed);const t=Math.floor(this.maxCacheSize*.8),n=e.slice(0,e.length-t);n.forEach(([i])=>{this.cache.delete(i)}),console.log(`清理了 ${n.length} 个旧的AI缓存条目`)}catch(e){console.warn("清理AI缓存失败:",e)}}clearBaziCache(e){try{const t=JSON.stringify({year:e.year,month:e.month,day:e.day,timeIndex:e.timeIndex,gender:e.gender}),n=[];for(const[r,l]of this.cache.entries())try{const d=JSON.parse(atob(r));JSON.stringify({year:d.year,month:d.month,day:d.day,timeIndex:d.timeIndex,gender:d.gender})===t&&n.push(r)}catch{}n.forEach(r=>{this.cache.delete(r)});const i=this.generateBaziKey(e),o=this.inspirationCache.has(i);o&&this.inspirationCache.delete(i),(n.length>0||o)&&(this.saveToStorage(),console.log(`清理了 ${n.length} 个分析缓存条目和 ${o?1:0} 个问题灵感缓存`))}catch(t){console.warn("清理八字缓存失败:",t)}}getInspirationCache(e){try{const t=this.generateBaziKey(e),n=this.inspirationCache.get(t);return n?(n.lastAccessed=Date.now(),this.inspirationCache.set(t,n),console.log("问题灵感缓存命中"),n.suggestions):null}catch(t){return console.warn("获取问题灵感缓存失败:",t),null}}setInspirationCache(e,t){if(!(!t||!Array.isArray(t)||t.length===0))try{const n=this.generateBaziKey(e),i={suggestions:[...t],createdAt:Date.now(),lastAccessed:Date.now()};this.inspirationCache.set(n,i),this.saveToStorage(),console.log("问题灵感缓存已保存")}catch(n){console.warn("保存问题灵感缓存失败:",n)}}generateBaziKey(e){const t={year:e.year,month:e.month,day:e.day,timeIndex:e.timeIndex,gender:e.gender},n=JSON.stringify(t);let i=0;for(let o=0;o<n.length;o++){const r=n.charCodeAt(o);i=(i<<5)-i+r,i=i&i}return Math.abs(i).toString(36)}clearCache(){this.cache.clear(),this.inspirationCache.clear(),localStorage.removeItem("ai_analysis_cache"),localStorage.removeItem("ai_inspiration_cache"),localStorage.removeItem("ai_cache_version"),console.log("AI缓存已清空")}saveToStorage(){try{const e=Array.from(this.cache.entries()),t=Array.from(this.inspirationCache.entries());localStorage.setItem("ai_analysis_cache",JSON.stringify(e)),localStorage.setItem("ai_inspiration_cache",JSON.stringify(t)),localStorage.setItem("ai_cache_version",this.cacheVersion)}catch(e){if(console.warn("保存AI缓存到本地存储失败:",e),e.name==="QuotaExceededError"){this.cleanupOldEntries();try{const t=Array.from(this.cache.entries()),n=Array.from(this.inspirationCache.entries());localStorage.setItem("ai_analysis_cache",JSON.stringify(t)),localStorage.setItem("ai_inspiration_cache",JSON.stringify(n)),localStorage.setItem("ai_cache_version",this.cacheVersion)}catch(t){console.warn("重试保存AI缓存失败:",t)}}}}getStats(){return{size:this.cache.size,maxSize:this.maxCacheSize,version:this.cacheVersion}}}const Se=new Gr,Nr=rt("bazi",()=>{const s=D({name:"",year:"",month:"",day:"",timeIndex:0,gender:""}),e=D({name:"",year:"",month:"",day:"",timeIndex:0,gender:""}),t=D(!1),n=D(null),i=D(null),o=D(!1),r=D(""),l=D(""),d=D(!1),c=D(""),g=new Map,u=de(()=>{const E=s.value.year&&s.value.month&&s.value.day&&s.value.gender;if(!t.value)return E;const C=e.value.year&&e.value.month&&e.value.day&&e.value.gender;return E&&C}),m=de(()=>n.value!==null),f=async()=>{if(!u.value)return r.value="请填写完整的出生信息",!1;const E=`bazi_${s.value.year}_${s.value.month}_${s.value.day}_${s.value.timeIndex}_${s.value.gender}`,C=g.get(E);if(C)return n.value=C,Me(s.value),!0;const N="calculate-bazi";o.value=!0,r.value="";try{if(fe.showLoading("正在计算八字...",N),n.value){const O={year:n.value.year,month:n.value.month,day:n.value.day,timeIndex:n.value.timeIndex,gender:n.value.gender},H={year:s.value.year,month:s.value.month,day:s.value.day,timeIndex:s.value.timeIndex,gender:s.value.gender};JSON.stringify(O)!==JSON.stringify(H)&&Se.clearBaziCache(O)}return fe.updateLoadingMessage("正在计算第一人八字...",N),n.value={...pe.calculateBazi(parseInt(s.value.year),parseInt(s.value.month),parseInt(s.value.day),s.value.timeIndex,s.value.gender)},t.value?(fe.updateLoadingMessage("正在计算第二人八字...",N),i.value={...pe.calculateBazi(parseInt(e.value.year),parseInt(e.value.month),parseInt(e.value.day),e.value.timeIndex,e.value.gender)}):i.value=null,g.set(E,n.value),Me(s.value),fe.hideLoading(N),we("八字计算完成！"),!0}catch(O){fe.hideLoading(N),console.error("八字计算失败:",O);const H=O.message||"八字计算失败，请检查输入信息";return r.value=H,he(H),Be.reportError(O,"八字计算"),!1}finally{o.value=!1}},x=async(E,C="custom",N=!1,O=!1)=>{if(!n.value){c.value="请先进行八字排盘",he("请先进行八字排盘");return}d.value=!0,c.value="",N||(l.value="");let H=null,ne=null;try{if(t.value&&i.value){const W=be(n.value),ue=be(i.value),ie=ve.buildCompatibilityPrompt(W,ue,E);N&&(l.value+=`

---

## 追问：${E}

`);for await(const ge of ve.queryAI(ie))l.value+=ge}else if(ne={year:s.value.year,month:s.value.month,day:s.value.day,timeIndex:s.value.timeIndex,gender:s.value.gender},O||(H=Se.getCache(ne,C,E),console.log("缓存检查:",{questionType:C,question:E.substring(0,50)+"...",hasCachedResponse:!!H,shouldCache:Se.shouldCache(C),cacheKey:Se.generateCacheKey(ne,C,E).substring(0,20)+"..."})),H&&!O)N?l.value+=`

---

## 追问：${E}

${H}`:l.value=H,console.log("使用AI缓存结果");else{const W={id:L(C,E),dataset:{prompt:""}},ue=be(n.value,W),ie=ve.buildPromptFromConfig(E,W,n.value);N&&(l.value+=`

---

## 追问：${E}

`);let ge="";for await(const b of ve.queryAI(ie))l.value+=b,ge+=b;ge&&ge.trim()&&(console.log("准备保存缓存:",{questionType:C,question:E.substring(0,50)+"...",shouldCache:Se.shouldCache(C),contentLength:ge.trim().length}),Se.setCache(ne,C,E,ge.trim()),O&&console.log("强制重新生成，已更新缓存"))}}catch(W){console.error("AI 分析失败:",W);const ue=W.message||"AI 分析失败，请稍后重试";c.value=ue,he(ue),Be.reportError(W,"AI分析")}finally{H&&!O?setTimeout(()=>{d.value=!1},100):d.value=!1}},w=()=>{ve.cancelRequest(),d.value=!1},k=()=>{if(n.value){const E={year:n.value.year,month:n.value.month,day:n.value.day,timeIndex:n.value.timeIndex,gender:n.value.gender};Se.clearBaziCache(E)}s.value={name:"",year:"",month:"",day:"",timeIndex:0,gender:""},e.value={name:"",year:"",month:"",day:"",timeIndex:0,gender:""},t.value=!1,n.value=null,i.value=null,l.value="",r.value="",c.value="",oe(),z()},p=()=>{l.value="",c.value=""},S=()=>{n.value=null,i.value=null,r.value="",l.value="",c.value="",o.value=!1,d.value=!1,z(),oe()},L=(E,C)=>{const N={mingge:"ai-mingge-zonglun","current-luck":"ai-current-luck",year:"ai-this-year","monthly-fortune":"ai-monthly-fortune","next-three-years":"ai-next-three-years","lifetime-fortune":"ai-lifetime-fortune",career:"ai-career",marriage:"ai-marriage",health:"ai-health",custom:"custom"};return C&&C.includes("选定日期")?"ask-ai-with-date":N[E]||"custom"},j=()=>{try{const E=Rt();if(E)return s.value={...s.value,...E.person1},e.value={...e.value,...E.person2},t.value=!0,ee(E.person1.name,E.person2.name),!0;const C=Nt();return C?(s.value={...s.value,...C},ee(C.name),!0):!1}catch(E){return console.error("从URL加载数据失败:",E),!1}},Q=()=>{try{t.value&&u.value&&e.value.year?(Dt(s.value,e.value),ee(s.value.name,e.value.name)):u.value&&(Me(s.value),ee(s.value.name))}catch(E){console.error("保存数据到URL失败:",E)}},z=()=>{try{jt(),Bt()}catch(E){console.error("清除URL数据失败:",E)}},M=()=>{try{return t.value&&e.value.year?Xe(s.value,e.value):Xe(s.value)}catch(E){return console.error("生成分享链接失败:",E),window.location.href}},V=()=>Ot(),ee=(E,C=null)=>{try{let N="八字排盘";C?N=`${E||"第一人"}与${C||"第二人"}的八字合盘分析`:E&&(N=`${E}的八字排盘`),document.title=N;const O=document.querySelector('meta[property="og:title"]');O&&O.setAttribute("content",N);const H=document.querySelector('meta[name="description"]');if(H&&E){let ne="专业的AI八字排盘和命理分析工具";C?ne=`${E}与${C}的八字合盘分析，专业AI命理解读`:ne=`${E}的八字排盘结果，专业AI命理分析`,H.setAttribute("content",ne)}}catch(N){console.error("更新页面标题失败:",N)}},oe=()=>{try{document.title="八字排盘";const E=document.querySelector('meta[property="og:title"]');E&&E.setAttribute("content","八字排盘");const C=document.querySelector('meta[name="description"]');C&&C.setAttribute("content","专业的AI八字排盘和命理分析工具")}catch(E){console.error("重置页面标题失败:",E)}};return{person1:s,person2:e,enableSecondPerson:t,baziResult1:n,baziResult2:i,isCalculating:o,calculationError:r,aiResponse:l,isAIThinking:d,aiError:c,canCalculate:u,hasResults:m,calculateBazi:f,askAI:x,cancelAI:w,resetForm:k,resetAI:p,clearResults:S,loadFromUrl:j,saveToUrl:Q,clearUrl:z,getShareUrl:M,hasUrlData:V,updatePageTitle:ee,resetPageTitle:oe}});const jr={key:0,class:"ai-chat-container"},Mr={class:"question-options"},Dr={class:"question-buttons-container"},Rr={class:"question-buttons"},Br=["onClick"],Or={key:0,class:"custom-question"},Yr={key:1,class:"error-message"},Zr=["disabled"],Hr={class:"inspiration-container"},qr={class:"inspiration-tab-navigation"},Kr=["onClick"],Jr={class:"inspiration-tab-content"},Vr={key:0,class:"inspiration-tab-pane"},Wr={class:"questions-grid"},Fr=["onClick"],Qr=["innerHTML"],zr={key:0,class:"thinking-indicator"},Xr={key:1,class:"continue-explore"},eo={key:0,class:"user-question-context"},to={class:"user-question"},no={class:"explore-section"},so={key:0,class:"suggested-questions"},ao=["onClick"],ro=["disabled"],oo={key:0,class:"suggestion-updating"},io={key:1,class:"suggestion-loading"},lo={key:2,class:"suggestion-loading"},co={class:"explore-section"},uo={class:"free-chat-input"},ho=["disabled"],go=["disabled"],mo={class:"quick-actions"},po=["disabled"],yo=["disabled"],fo=["disabled"],vo={__name:"AIChat",setup(s){const e=ft(),t=de(()=>e.path.includes("/zw")),n=de(()=>t.value?Ne():Nr()),i=D(""),o=D(""),r=D(!1),l=D(t.value?"personality":"ganqing"),d=D([]),c=D({}),g=D([]),u=D(!1),m=D(""),f=D(null),x=D(""),w=new Map,k=new $t(f),p=A=>A?A.replace(/<think>[\s\S]*?<\/think>/gi,"").trim():"",S=D(!1),L=D(null),j=D(null),Q=D(null),z=[{id:"ai-mingge-zonglun",text:"命格总论",type:"mingge"},{id:"ai-current-luck",text:"当前大运",type:"current-luck"},{id:"ai-this-year",text:"今年运势",type:"year"},{id:"ai-monthly-fortune",text:"年运逐月",type:"monthly-fortune"},{id:"ai-next-three-years",text:"未来三年",type:"next-three-years"},{id:"ai-lifetime-fortune",text:"一生运势",type:"lifetime-fortune"},{id:"ai-career",text:"事业财运",type:"career"},{id:"ai-marriage",text:"感情婚姻",type:"marriage"},{id:"ai-health",text:"健康状况",type:"health"},{id:"ask-ai-with-date",text:"选定日期...",type:"custom"},{id:"custom",text:"自定义...",type:"custom"}],M=[{id:"ai-compat-marriage",text:"婚恋匹配",type:"marriage"},{id:"ai-compat-career",text:"事业合作",type:"career"},{id:"ai-compat-custom",text:"自定义...",type:"custom"}],V=[{id:"ai-ziwei-personality",text:"性格分析",type:"personality"},{id:"ai-ziwei-career",text:"事业财运",type:"career"},{id:"ai-ziwei-relationship",text:"感情婚姻",type:"relationship"},{id:"ai-ziwei-health",text:"健康状况",type:"health"},{id:"ai-ziwei-fortune",text:"运势分析",type:"fortune"},{id:"ai-ziwei-palace",text:"宫位分析",type:"palace"},{id:"custom",text:"自定义...",type:"custom"}],ee=[{id:"ai-ziwei-compat",text:"合盘分析",type:"compatibility"},{id:"ai-ziwei-marriage",text:"感情匹配",type:"relationship"},{id:"ai-ziwei-cooperation",text:"事业合作",type:"career"},{id:"custom",text:"自定义...",type:"custom"}],oe=[{id:"ganqing",name:"感情",content:[{title:"情感发展",questions:[{text:"我近期的桃花运怎么样？",type:"marriage"},{text:"我们目前的感情走向如何？",type:"marriage"},{text:"他/她对我的真实情感是什么？",type:"marriage"},{text:"我们之间有未来吗？",type:"marriage"},{text:"如何改善我们目前的关系？",type:"marriage"},{text:"这段感情对我的影响？",type:"marriage"},{text:"我在感情中容易犯什么错误？",type:"marriage"},{text:"如何处理感情中的矛盾冲突？",type:"marriage"}]},{title:"正缘婚姻",questions:[{text:"我的正缘什么时候出现？",type:"marriage"},{text:"我的另一半是什么样的人？",type:"marriage"},{text:"我何时会结婚？",type:"marriage"},{text:"我适合和现在的对象结婚吗？",type:"marriage"},{text:"我的婚姻生活会幸福吗？",type:"marriage"},{text:"如何吸引我的正缘桃花？",type:"marriage"},{text:"我适合什么年龄结婚？",type:"marriage"},{text:"婚后我需要注意什么问题？",type:"marriage"}]},{title:"感情困扰",questions:[{text:"为什么我总是遇到不合适的人？",type:"marriage"},{text:"如何走出失恋的阴霾？",type:"marriage"},{text:"我在感情中缺乏什么？",type:"marriage"},{text:"如何提升自己的魅力？",type:"marriage"},{text:"异地恋能否有好结果？",type:"marriage"},{text:"如何判断对方是否真心？",type:"marriage"}]}]},{id:"shiye",name:"事业",content:[{title:"事业发展",questions:[{text:"我适合现在的工作/行业吗？",type:"career"},{text:"我的事业什么时候能成功？",type:"career"},{text:"我适合跳槽还是继续坚守？",type:"career"},{text:"我事业上的贵人会是谁？",type:"career"},{text:"我未来的事业走向怎么样？",type:"career"},{text:"我什么时候能找到满意的工作？",type:"career"},{text:"我适合创业还是打工？",type:"career"},{text:"如何在职场中脱颖而出？",type:"career"}]},{title:"职业规划",questions:[{text:"我最适合从事什么行业？",type:"career"},{text:"我的职业天赋在哪里？",type:"career"},{text:"如何规划我的职业发展路径？",type:"career"},{text:"我适合做管理还是技术？",type:"career"},{text:"转行对我来说是好选择吗？",type:"career"},{text:"我在什么环境下工作最有效率？",type:"career"}]},{title:"工作困扰",questions:[{text:"如何处理职场人际关系？",type:"career"},{text:"为什么我的工作总是不顺利？",type:"career"},{text:"如何获得上司的认可？",type:"career"},{text:"我在工作中的弱点是什么？",type:"career"},{text:"如何平衡工作与生活？",type:"career"},{text:"面对工作压力该如何调节？",type:"career"}]}]},{id:"caifu",name:"财富",content:[{title:"财运趋势",questions:[{text:"我近期的财运怎么样？",type:"career"},{text:"我这辈子财运的整体趋势？",type:"career"},{text:"我什么时候能发财？",type:"career"},{text:"我适合靠什么方式赚钱？",type:"career"},{text:"如何有效提升我的财运？",type:"career"},{text:"我近期会有意外之财吗？",type:"career"},{text:"我的财富巅峰期在什么时候？",type:"career"},{text:"我容易在哪些方面破财？",type:"career"}]},{title:"投资理财",questions:[{text:"我适合投资股票还是房产？",type:"career"},{text:"我的投资运势如何？",type:"career"},{text:"什么时候是我投资的好时机？",type:"career"},{text:"我适合保守理财还是激进投资？",type:"career"},{text:"如何避免投资失败？",type:"career"},{text:"我有做生意的天赋吗？",type:"career"}]},{title:"财富管理",questions:[{text:"如何培养正确的金钱观？",type:"career"},{text:"我为什么总是存不住钱？",type:"career"},{text:"如何增加被动收入？",type:"career"},{text:"我适合与人合伙做生意吗？",type:"career"},{text:"如何平衡消费与储蓄？",type:"career"},{text:"我的财富会传承给下一代吗？",type:"career"}]}]},{id:"renji",name:"人际",content:[{title:"社交模式",questions:[{text:"我的人际交往模式有何优缺点？",type:"mingge"},{text:"如何拓展我的高质量社交圈？",type:"mingge"},{text:"我目前的人际关系状态如何？",type:"mingge"},{text:"我会吸引哪些人进入我的生活？",type:"mingge"},{text:"如何获得他人的信任与支持？",type:"mingge"},{text:"如何处理与朋友的矛盾？",type:"mingge"},{text:"我在社交中的天然优势是什么？",type:"mingge"},{text:"如何克服社交恐惧？",type:"mingge"}]},{title:"家庭关系",questions:[{text:"如何改善与父母的关系？",type:"mingge"},{text:"我与兄弟姐妹的关系如何？",type:"mingge"},{text:"如何处理家庭矛盾？",type:"mingge"},{text:"我在家庭中扮演什么角色？",type:"mingge"},{text:"如何平衡家庭与个人发展？",type:"mingge"},{text:"我会是一个好父母吗？",type:"mingge"}]},{title:"人际困扰",questions:[{text:"为什么我总是遇到小人？",type:"mingge"},{text:"如何识别身边的真假朋友？",type:"mingge"},{text:"我在人际关系中的盲点是什么？",type:"mingge"},{text:"如何提升自己的人格魅力？",type:"mingge"},{text:"如何在团队中发挥领导力？",type:"mingge"},{text:"我适合与什么样的人深交？",type:"mingge"}]}]},{id:"rensheng",name:"成长",content:[{title:"个人成长",questions:[{text:"我的性格优势和劣势是什么？",type:"mingge"},{text:"我的人生主要课题是什么？",type:"mingge"},{text:"如何找到我的人生方向？",type:"mingge"},{text:"如何克服我性格中的弱点？",type:"mingge"},{text:"如何有效提升自己的能量状态？",type:"mingge"},{text:"我的人生转折点在何时？",type:"mingge"},{text:"我的天赋和潜能在哪里？",type:"mingge"},{text:"如何建立强大的内心？",type:"mingge"}]},{title:"人生规划",questions:[{text:"我这一生的使命是什么？",type:"mingge"},{text:"如何制定适合自己的人生目标？",type:"mingge"},{text:"我在什么年龄段会迎来人生高峰？",type:"mingge"},{text:"如何平衡理想与现实？",type:"mingge"},{text:"我的人生会有几次重大机遇？",type:"mingge"},{text:"如何为未来做好准备？",type:"mingge"}]},{title:"心理健康",questions:[{text:"如何管理自己的情绪？",type:"health"},{text:"我容易患哪些心理问题？",type:"health"},{text:"如何提升心理抗压能力？",type:"health"},{text:"如何走出人生低谷？",type:"health"},{text:"我的心理盲点在哪里？",type:"health"},{text:"如何保持积极的心态？",type:"health"}]},{title:"身体健康",questions:[{text:"我需要重点关注哪些健康问题？",type:"health"},{text:"我的体质特点是什么？",type:"health"},{text:"如何制定适合自己的养生方案？",type:"health"},{text:"我在什么年龄段需要特别注意健康？",type:"health"},{text:"如何通过饮食调理身体？",type:"health"},{text:"我适合什么样的运动方式？",type:"health"}]}]},{id:"xueye",name:"学业",content:[{title:"学习能力",questions:[{text:"我的学习天赋在哪个领域？",type:"mingge"},{text:"如何提高我的学习效率？",type:"mingge"},{text:"我适合什么样的学习方式？",type:"mingge"},{text:"如何克服学习中的困难？",type:"mingge"},{text:"我在学习中的优势和劣势？",type:"mingge"},{text:"如何培养良好的学习习惯？",type:"mingge"}]},{title:"专业选择",questions:[{text:"我适合学习什么专业？",type:"career"},{text:"文科还是理科更适合我？",type:"career"},{text:"我应该选择什么样的大学？",type:"career"},{text:"出国留学对我有利吗？",type:"career"},{text:"我的专业会有好的就业前景吗？",type:"career"},{text:"转专业对我来说是好选择吗？",type:"career"}]},{title:"考试运势",questions:[{text:"我的考试运势如何？",type:"year"},{text:"什么时候是我考试的最佳时机？",type:"year"},{text:"如何在重要考试中发挥最佳状态？",type:"year"},{text:"我容易在考试中犯什么错误？",type:"year"},{text:"如何克服考试焦虑？",type:"health"},{text:"我的学业会在什么时候迎来转机？",type:"year"}]},{title:"教育发展",questions:[{text:"我适合继续深造还是直接工作？",type:"career"},{text:"读研究生对我的发展有帮助吗？",type:"career"},{text:"我有做老师的天赋吗？",type:"career"},{text:"如何在学术道路上取得成功？",type:"career"},{text:"我适合从事教育行业吗？",type:"career"},{text:"如何平衡学习与其他生活？",type:"mingge"}]}]}],E=[{id:"personality",name:"性格命格",content:[{title:"命宫分析",questions:[{text:"我的命宫主星是什么？有什么特质？",type:"personality"},{text:"我的性格优势和劣势是什么？",type:"personality"},{text:"我的天赋才能在哪些方面？",type:"personality"},{text:"我适合什么样的人生道路？",type:"personality"},{text:"我的命格层次如何？",type:"personality"},{text:"我的性格中最突出的特点是什么？",type:"personality"},{text:"我在人际交往中的表现如何？",type:"personality"},{text:"我的领导能力和管理才能如何？",type:"personality"}]},{title:"身宫特质",questions:[{text:"我的身宫在哪里？有什么意义？",type:"personality"},{text:"我的人生重心应该放在哪里？",type:"personality"},{text:"身宫对我的性格有什么影响？",type:"personality"},{text:"如何发挥身宫的正面作用？",type:"personality"}]},{title:"福德宫分析",questions:[{text:"我的精神世界和内心状态如何？",type:"personality"},{text:"我的兴趣爱好和精神追求是什么？",type:"personality"},{text:"我如何获得内心的平静和快乐？",type:"personality"},{text:"我的思维模式和价值观如何？",type:"personality"}]}]},{id:"career",name:"事业财运",content:[{title:"官禄宫分析",questions:[{text:"我适合什么类型的工作？",type:"career"},{text:"我的事业发展方向是什么？",type:"career"},{text:"我什么时候会有事业突破？",type:"career"},{text:"我适合创业还是打工？",type:"career"},{text:"我的职场贵人运如何？",type:"career"},{text:"我在工作中容易遇到什么挑战？",type:"career"},{text:"我的升职加薪运势如何？",type:"career"},{text:"我适合在什么行业发展？",type:"career"}]},{title:"财帛宫分析",questions:[{text:"我的财运如何？",type:"career"},{text:"我适合什么样的投资理财？",type:"career"},{text:"我什么时候会有财运提升？",type:"career"},{text:"我的偏财运和正财运如何？",type:"career"},{text:"我容易在哪些方面破财？",type:"career"},{text:"我的理财观念和消费习惯如何？",type:"career"},{text:"我适合做什么样的投资？",type:"career"},{text:"我的财富积累能力如何？",type:"career"}]},{title:"田宅宫分析",questions:[{text:"我的房产运势如何？",type:"career"},{text:"我什么时候适合买房？",type:"career"},{text:"我适合投资房地产吗？",type:"career"},{text:"我的家庭环境对我有什么影响？",type:"career"}]}]},{id:"relationship",name:"感情婚姻",content:[{title:"夫妻宫分析",questions:[{text:"我的另一半会是什么样的人？",type:"relationship"},{text:"我什么时候会遇到正缘？",type:"relationship"},{text:"我的婚姻运势如何？",type:"relationship"},{text:"我在感情中需要注意什么？",type:"relationship"},{text:"我的桃花运什么时候最旺？",type:"relationship"},{text:"我容易遇到什么样的感情问题？",type:"relationship"},{text:"我的婚姻会幸福美满吗？",type:"relationship"},{text:"我如何改善夫妻关系？",type:"relationship"}]},{title:"子女宫分析",questions:[{text:"我的子女缘分如何？",type:"relationship"},{text:"我适合什么时候要孩子？",type:"relationship"},{text:"我的孩子会是什么性格？",type:"relationship"},{text:"我和孩子的关系如何？",type:"relationship"},{text:"我的子女对我的事业有什么影响？",type:"relationship"},{text:"我如何教育孩子？",type:"relationship"}]},{title:"兄弟宫分析",questions:[{text:"我和兄弟姐妹的关系如何？",type:"relationship"},{text:"我的朋友运势如何？",type:"relationship"},{text:"我容易交到什么样的朋友？",type:"relationship"},{text:"我在团队合作中的表现如何？",type:"relationship"}]}]},{id:"health",name:"健康疾厄",content:[{title:"疾厄宫分析",questions:[{text:"我需要注意哪些健康问题？",type:"health"},{text:"我的体质特点是什么？",type:"health"},{text:"我容易得什么疾病？",type:"health"},{text:"我如何保养身体？",type:"health"},{text:"我的精神健康状况如何？",type:"health"},{text:"我什么时候需要特别注意健康？",type:"health"},{text:"我适合什么样的运动和养生方式？",type:"health"},{text:"我的睡眠质量如何改善？",type:"health"}]},{title:"意外灾厄",questions:[{text:"我需要防范哪些意外？",type:"health"},{text:"我什么时候要特别小心？",type:"health"},{text:"我如何化解不利因素？",type:"health"},{text:"我的安全运势如何？",type:"health"}]}]},{id:"fortune",name:"运势流年",content:[{title:"大运分析",questions:[{text:"我现在处于什么大运？",type:"fortune"},{text:"我的大运对我有什么影响？",type:"fortune"},{text:"我下一个大运会如何？",type:"fortune"},{text:"我的大运什么时候最好？",type:"fortune"},{text:"我如何把握大运机遇？",type:"fortune"},{text:"我的大运对事业有什么影响？",type:"fortune"},{text:"我的大运对感情有什么影响？",type:"fortune"},{text:"我如何度过不利的大运？",type:"fortune"}]},{title:"流年分析",questions:[{text:"今年我的运势如何？",type:"fortune"},{text:"明年我需要注意什么？",type:"fortune"},{text:"我什么时候运势最好？",type:"fortune"},{text:"今年我的事业运如何？",type:"fortune"},{text:"今年我的财运如何？",type:"fortune"},{text:"今年我的感情运如何？",type:"fortune"},{text:"今年我的健康运如何？",type:"fortune"},{text:"我如何提升今年的运势？",type:"fortune"}]}]}],C=de(()=>t.value?E:oe),N=A=>{St(()=>{const T=C.value.findIndex(se=>se.id===A);if(T===-1||!d.value[T]){setTimeout(()=>N(A),50);return}const B=d.value[T];if(B.offsetLeft===0&&B.offsetWidth===0){setTimeout(()=>N(A),50);return}c.value={left:`${B.offsetLeft}px`,width:`${B.offsetWidth}px`}})};_e(l,A=>{N(A)},{immediate:!0});const O=A=>{l.value=A},H=de(()=>t.value?n.value.enableSecondPerson?ee:V:n.value.enableSecondPerson?M:z),ne=de(()=>r.value?o.value.trim().length>0:i.value!==""),W=de(()=>{if(!n.value.aiResponse)return"";let A=p(n.value.aiResponse);return A=A.replace(/^---+$/gm,""),A=A.replace(/\n\s*\n\s*\n/g,`

`),n.value.aiResponse.includes("<think>")&&console.log("🧠 检测到思考标签，已过滤:",{原始长度:n.value.aiResponse.length,过滤后长度:A.length,包含think标签:n.value.aiResponse.match(/<think>[\s\S]*?<\/think>/gi)?.length||0}),wt.parse(A.trim())}),ue=A=>{i.value=A.id,r.value=A.type==="custom",r.value||(o.value="")},ie=async()=>{let A="",T="custom";if(r.value)A=o.value.trim();else{const B=H.value.find(se=>se.id===i.value);B&&(A=B.text,T=B.type)}A&&(x.value=A,Z(),await n.value.askAI(A,T))},ge=async(A,T="custom")=>{console.log("问题灵感调用:",{question:A,questionType:T}),x.value=A,Z(),await n.value.askAI(A,T)},b=async()=>{if(u.value){console.log("智能建议生成已在进行中，跳过");return}const A=`suggestions_${n.value.person1?.year}_${n.value.person1?.month}_${n.value.person1?.day}_${x.value}`,T=w.get(A);if(T){g.value=T;return}u.value=!0;const B=setTimeout(()=>{u.value&&(console.warn("智能建议生成超时"),u.value=!1)},6e3);try{if(!(t.value?n.value.ziWeiResult1:n.value.baziResult1)){console.log("没有排盘数据，跳过建议生成"),clearTimeout(B),u.value=!1;return}await new Promise(re=>setTimeout(re,800));const Pe=`用户刚刚问了这个问题："${x.value||""}"

请根据这个问题，生成3个用户可能感兴趣的相关后续问题。这些问题应该：
1. 与原问题相关但有所延伸
2. 能够帮助用户更深入了解相关话题
3. 实用且有价值

请直接输出3个问题，每行一个，不要编号，不要其他说明文字。`;try{console.log("开始AI建议生成请求");const re=await ve.queryAIComplete(Pe);if(console.log("AI建议生成完成，已过滤响应:",re),re&&re.trim()){const Ce=re.split(`
`).map(Te=>Te.trim()).filter(Te=>Te&&!Te.match(/^\d+\./)&&Te.length>5).slice(0,3);console.log("处理后的建议:",Ce),Ce.length>0?(console.log("设置建议前的状态:",{currentSuggestions:g.value,newSuggestions:Ce,isGenerating:u.value}),g.value=Ce,w.set(A,Ce),console.log("设置建议后的状态:",{currentSuggestions:g.value,isGenerating:u.value})):console.log("没有有效的建议内容")}else console.log("AI返回空内容")}catch(re){if(re.name==="AbortError"){console.log("建议生成请求被中止，这是正常的");return}console.warn("AI生成建议失败:",re)}}catch(se){k.handle(se,"生成建议",!1)}finally{clearTimeout(B),u.value=!1}},h=async()=>{if(!u.value){u.value=!0;try{if(!(t.value?n.value.ziWeiResult1:n.value.baziResult1))return;await new Promise(X=>setTimeout(X,1e3));let T=n.value.aiResponse||"";T=p(T);const se=`请基于以下八字分析结果和用户问题，重新生成3个不同的后续问题建议：

用户问题：${x.value||""}

分析结果：${T.substring(0,500)}...

请生成3个与之前不同的、与用户问题和分析结果高度相关的后续问题，格式为纯文本，每行一个问题，不要编号。`;try{const X=await ve.queryAIComplete(se);if(X&&X.trim()){const Pe=X.split(`
`).map(re=>re.trim()).filter(re=>re&&!re.match(/^\d+\./)&&re.length>5).slice(0,3);if(Pe.length>0){g.value=Pe,u.value=!1;return}}}catch(X){if(X.name==="AbortError"){console.log("重新生成建议请求被中止，这是正常的"),u.value=!1;return}console.warn("AI重新生成建议失败:",X)}}catch(A){console.error("重新生成建议失败:",A)}finally{u.value=!1}}},y=async A=>{x.value=A,Z(),await n.value.askAI(A,"custom",!0),setTimeout(()=>{me()},500)},$=async()=>{if(!m.value.trim())return;const A=m.value.trim();m.value="",x.value=A,Z(),await n.value.askAI(A,"custom",!0),setTimeout(()=>{me()},500)},U=async()=>{const A=`请对我的${x.value||"八字分析"}进行更详细深入的分析，包括具体的时间节点和注意事项`;x.value=A,Z(),await n.value.askAI(A,"custom"),setTimeout(()=>{me()},500)},J=async()=>{const A=new Date().getFullYear(),T=`我在${A}年和${A+1}年的运势如何？有哪些重要时间节点？`;x.value=T,Z(),await n.value.askAI(T,"custom"),setTimeout(()=>{me()},500)},R=async()=>{const A="基于我的八字，如何改善和提升我的运势？有什么具体的方法和建议？";x.value=A,Z(),await n.value.askAI(A,"custom"),setTimeout(()=>{me()},500)},le=async()=>{if(!n.value.aiResponse){f.value&&f.value.addToast("暂无AI回答内容可复制","warning","",3e3);return}try{const A=new Date().toLocaleString("zh-CN");let T=`八字分析结果
`;T+=`生成时间：${A}
`,T+=`${"=".repeat(30)}

`,T+=`问题：${x.value||"八字分析"}

`,T+=`回答：
${n.value.aiResponse.replace(/<[^>]*>/g,"").replace(/&nbsp;/g," ")}

`,T+=`${"=".repeat(30)}
`,T+=`来源：八字排盘系统
`,await navigator.clipboard.writeText(T),f.value&&f.value.addToast("AI回答已复制到剪贴板","success","",3e3)}catch(A){console.error("复制失败:",A),f.value&&f.value.addToast("复制失败，请手动选择复制","error","",3e3)}},ye=()=>{$e=Date.now(),me(),setTimeout(()=>{if($e=Date.now(),j.value)j.value.scrollIntoView({behavior:"smooth",block:"end"});else{const A=document.querySelector(".ai-response");A&&A.scrollIntoView({behavior:"smooth",block:"end"})}},100)},Z=()=>{S.value=!0,console.log("开始自动滚动"),setTimeout(()=>{ye()},100),L.value=setInterval(()=>{S.value&&(n.value.isAIThinking||n.value.aiResponse)&&(me(),n.value.isAIThinking&&j.value&&setTimeout(()=>{j.value.scrollIntoView({behavior:"smooth",block:"nearest"})},100))},500)},me=()=>{try{$e=Date.now(),window.scrollTo({top:999999,behavior:"smooth"}),setTimeout(()=>{$e=Date.now();const A=document.documentElement.scrollHeight;window.scrollTo({top:A+1e3,behavior:"smooth"})},100)}catch{try{$e=Date.now(),window.scrollTo(0,999999)}catch(T){console.error("滚动失败:",T)}}},je=()=>{S.value=!1,L.value&&(clearInterval(L.value),L.value=null),Ae=!1};let $e=0;const Ze=()=>{!S.value||Date.now()-$e<3e3},gt=A=>{f.value&&f.value.addToast(A,"success","AI分析完成",4e3)};H.value.length>0&&ue(H.value[0]),_e(()=>n.value.isAIThinking,(A,T)=>{T&&!A&&n.value.aiResponse&&n.value.aiResponse.trim()&&(setTimeout(()=>{me()},200),setTimeout(()=>{me()},800),console.log("AI分析完成，自动滚动继续运行，用户可通过滚动操作停止"),gt("请查看分析结果"))}),_e(()=>n.value.aiResponse,(A,T)=>{A&&A!==T&&(setTimeout(()=>{(S.value||A.length>T?.length+50)&&me()},100),setTimeout(()=>{(S.value||A.length>T?.length+50)&&me()},300))}),_e(()=>n.value.isAIThinking,(A,T)=>{console.log("AI思考状态变化:",{wasThinking:T,isThinking:A,hasResponse:!!n.value.aiResponse}),T&&!A&&n.value.aiResponse&&n.value.aiResponse.trim()&&x.value&&(console.log("AI回答完成，准备生成智能建议"),Q.value&&clearTimeout(Q.value),Q.value=setTimeout(()=>{console.log("检查是否可以生成建议:",{isGenerating:u.value,hasUserQuestion:!!x.value}),!u.value&&x.value?(console.log("条件满足，基于用户问题生成智能建议"),b()):console.log("跳过建议生成，条件不满足")},500))});let Ae=!1;const He=()=>{S.value&&(Ae=!0,je())},qe=()=>{S.value&&(Ae=!0)},Ke=()=>{S.value&&Ae&&(je(),Ae=!1)};return typeof window<"u"&&(window.addEventListener("scroll",Ze,{passive:!0}),window.addEventListener("wheel",He,{passive:!0}),window.addEventListener("touchstart",qe,{passive:!0}),window.addEventListener("touchmove",Ke,{passive:!0})),vt(()=>{je(),Q.value&&clearTimeout(Q.value),typeof window<"u"&&(window.removeEventListener("scroll",Ze),window.removeEventListener("wheel",He),window.removeEventListener("touchstart",qe),window.removeEventListener("touchmove",Ke))}),(A,T)=>(_(),I(K,null,[n.value.hasResults?(_(),I("div",jr,[a("div",Mr,[a("h3",null,v(n.value.enableSecondPerson?"AI 合盘分析":t.value?"AI 紫薇斗数分析":"AI 命理分析"),1),a("div",Dr,[a("div",Rr,[(_(!0),I(K,null,F(H.value,B=>(_(),I("button",{key:B.id,class:ae(["question-button",{selected:i.value===B.id}]),onClick:se=>ue(B)},v(B.text),11,Br))),128))])]),r.value?(_(),I("div",Or,[te(a("input",{"onUpdate:modelValue":T[0]||(T[0]=B=>o.value=B),type:"text",placeholder:"请输入您的问题",onKeyup:Ve(ie,["enter"])},null,544),[[ce,o.value]])])):G("",!0),n.value.aiError?(_(),I("div",Yr,v(n.value.aiError),1)):G("",!0),a("button",{class:ae(["primary-button ai-button",{thinking:n.value.isAIThinking}]),disabled:!ne.value||n.value.isAIThinking,onClick:ie},v(n.value.isAIThinking?"AI 思考中...":n.value.enableSecondPerson?"AI 合盘分析":"向 AI 提问"),11,Zr)]),a("div",Hr,[T[2]||(T[2]=a("h3",null,"问题灵感",-1)),a("div",qr,[(_(!0),I(K,null,F(C.value,(B,se)=>(_(),I("button",{key:B.id,ref_for:!0,ref:X=>{X&&(d.value[se]=X)},class:ae(["inspiration-tab-button",{active:l.value===B.id}]),onClick:X=>O(B.id)},v(B.name),11,Kr))),128)),a("div",{class:"inspiration-active-tab-indicator",style:xt(c.value)},null,4)]),a("div",Jr,[(_(!0),I(K,null,F(C.value,B=>(_(),I(K,{key:B.id},[l.value===B.id?(_(),I("div",Vr,[(_(!0),I(K,null,F(B.content,se=>(_(),I("div",{key:se.title,class:"question-group"},[a("h4",null,v(se.title),1),a("div",Wr,[(_(!0),I(K,null,F(se.questions,X=>(_(),I("p",{key:X.text,onClick:Pe=>ge(X.text,X.type)},v(X.text),9,Fr))),128))])]))),128))])):G("",!0)],64))),128))])]),n.value.aiResponse||n.value.isAIThinking?(_(),I("div",{key:0,class:"ai-response",ref_key:"aiResponseRef",ref:j},[T[4]||(T[4]=a("h3",null,"AI 分析结果",-1)),a("div",{class:"response-content",innerHTML:W.value},null,8,Qr),n.value.isAIThinking?(_(),I("div",zr,T[3]||(T[3]=[a("div",{class:"thinking-dots"},[a("span"),a("span"),a("span")],-1),a("p",null,"AI 正在深度分析中...",-1)]))):G("",!0)],512)):G("",!0),n.value.aiResponse&&!n.value.isAIThinking?(_(),I("div",Xr,[T[12]||(T[12]=a("h3",null,"继续探索",-1)),x.value?(_(),I("div",eo,[T[5]||(T[5]=a("h4",null,"您的问题",-1)),a("p",to,v(x.value),1)])):G("",!0),a("div",no,[T[9]||(T[9]=a("h4",null,"智能建议",-1)),g.value.length>0?(_(),I("div",so,[(_(!0),I(K,null,F(g.value,(B,se)=>(_(),I("p",{key:se,onClick:X=>y(B),class:"suggested-question"},v(B),9,ao))),128)),a("button",{onClick:h,class:"suggested-question regenerate-btn",disabled:u.value},v(u.value?"正在更新...":"重新生成建议"),9,ro),u.value?(_(),I("div",oo,T[6]||(T[6]=[a("p",{class:"updating-text"},"正在更新建议...",-1)]))):G("",!0)])):u.value?(_(),I("div",io,T[7]||(T[7]=[a("p",null,"正在生成智能建议...",-1)]))):(_(),I("div",lo,T[8]||(T[8]=[a("p",null,"正在准备智能建议...",-1)])))]),a("div",co,[T[10]||(T[10]=a("h4",null,"自由对话",-1)),a("div",uo,[te(a("input",{"onUpdate:modelValue":T[1]||(T[1]=B=>m.value=B),type:"text",placeholder:"继续询问相关问题...",onKeypress:Ve($,["enter"]),disabled:n.value.isAIThinking},null,40,ho),[[ce,m.value]]),a("button",{onClick:$,disabled:!m.value.trim()||n.value.isAIThinking},v(n.value.isAIThinking?"发送中...":"发送"),9,go)]),T[11]||(T[11]=a("div",{class:"chat-tips"},[a("small",null,'💡 提示：可以询问更具体的问题，如"明年3月适合跳槽吗？"')],-1))]),a("div",mo,[a("button",{class:"action-btn",onClick:U,disabled:n.value.isAIThinking}," 📊 详细分析 ",8,po),a("button",{class:"action-btn",onClick:J,disabled:n.value.isAIThinking}," 📅 时间运势 ",8,yo),a("button",{class:"action-btn",onClick:R,disabled:n.value.isAIThinking}," 💡 改善建议 ",8,fo),a("button",{class:"action-btn",onClick:le}," 📋 复制结果 ")])])):G("",!0)])):G("",!0),xe(bt,{ref_key:"toastRef",ref:f},null,512)],64))}},at=ke(vo,[["__scopeId","data-v-37dfdbf8"]]);const xo={class:"ziwei-view"},So={key:0,class:"desktop-layout"},_o={class:"left-panel"},Io={class:"right-panel"},$o={key:1,class:"mobile-layout"},bo={__name:"ZiWeiView",setup(s){const e=Ne();return _t(()=>{e.resetPageTitle(),e.restoreDataFromUrl(),console.log("紫薇斗数页面已加载")}),(t,n)=>(_(),I("div",xo,[xe(Wn),P(e).hasResults?(_(),I("div",So,[a("div",_o,[xe(st)]),a("div",Io,[xe(at)])])):G("",!0),P(e).hasResults?(_(),I("div",$o,[xe(st),xe(at)])):G("",!0)]))}},To=ke(bo,[["__scopeId","data-v-bcebf130"]]);export{To as default};
