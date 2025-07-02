import{r as D,j as he,v as at,x as Ie,y as ee,z as gt,A,b as S,d as I,i as a,B as ce,F as q,h as F,C as Ke,n as se,t as x,f as G,D as mt,E as Z,G as pt,l as rt,c as ot,e as ve,g as it,H as yt,a as ft,I as Je,k as vt,J as xt,o as St}from"./vendor-fcabaa7d.js";import{a as Ve}from"./iztro-8dcb482b.js";import{s as ge,l as ye,a as ke,e as Re,_ as Ae,b as _t,E as It,T as $t}from"./zw-3cbf5457.js";import{S as Le,G as Te,a as Ee}from"./tyme-86b89837.js";import{m as bt}from"./marked-9682a234.js";function We(s,e,t,n,i,o=!1){let r;try{if(!s||!e||!t||n===void 0||!i)throw new Error("缺少必要的出生信息");if(s<1900||s>2100)throw new Error("年份必须在1900-2100之间");if(e<1||e>12)throw new Error("月份必须在1-12之间");if(t<1||t>31)throw new Error("日期必须在1-31之间");if(n=parseInt(n),isNaN(n)||n<0||n>12)throw new Error(`时辰索引必须在0-12之间，当前值: ${n}`);if(!["male","female"].includes(i))throw new Error("性别必须是 male 或 female");if(n===0?r=0:n===12?r=23:r=(n-1)*2+1,r<0||r>23)throw new Error(`计算出的小时值无效: ${r}，timeIndex: ${n}`);const l=`${s}-${e.toString().padStart(2,"0")}-${t.toString().padStart(2,"0")}`,d=i==="male"?"男":"女";let u;o?u=Ve.byLunar(l,n,d,!1,!0,"zh-CN"):u=Ve.bySolar(l,n,d,!0,"zh-CN");const g=new Date().getFullYear(),c={name:"",gender:i,year:s,month:e,day:t,timeIndex:n,hour:r,isLunar:o,solarDate:u.solarDate,lunarDate:u.lunarDate,chineseDate:u.chineseDate,time:u.time,timeRange:u.timeRange,sign:u.sign,zodiac:u.zodiac,soulPalace:u.soul||"",bodyPalace:u.body||"",earthlyBranchOfBodyPalace:u.earthlyBranchOfBodyPalace||"",earthlyBranchOfSoulPalace:u.earthlyBranchOfSoulPalace||"",fiveElementsClass:u.fiveElementsClass||"",currentAge:g-s},p=u.palaces.map((k,m)=>({index:m,name:k.name,isBodyPalace:k.isBodyPalace,isOriginalPalace:k.isOriginalPalace,heavenlyStem:k.heavenlyStem,earthlyBranch:k.earthlyBranch,majorStars:k.majorStars.map(_=>({name:_.name,type:_.type,scope:_.scope,brightness:_.brightness,mutagen:_.mutagen||""})),minorStars:k.minorStars.map(_=>({name:_.name,type:_.type,scope:_.scope,brightness:_.brightness,mutagen:_.mutagen||""})),adjectiveStars:k.adjectiveStars.map(_=>({name:_.name,type:_.type,scope:_.scope,brightness:_.brightness,mutagen:_.mutagen||""})),changsheng12:k.changsheng12||"",boshi12:k.boshi12||"",jiangqian12:k.jiangqian12||"",suiqian12:k.suiqian12||"",decadal:k.decadal||"",ages:k.ages||[],isEmpty:k.isEmpty(),starCount:{major:k.majorStars.length,minor:k.minorStars.length,adjective:k.adjectiveStars.length,total:k.majorStars.length+k.minorStars.length+k.adjectiveStars.length}})),f={lu:"",quan:"",ke:"",ji:""};u.palaces.forEach(k=>{[...k.majorStars,...k.minorStars,...k.adjectiveStars].forEach(m=>{if(m.mutagen)switch(m.mutagen){case"禄":f.lu=m.name;break;case"权":f.quan=m.name;break;case"科":f.ke=m.name;break;case"忌":f.ji=m.name;break}})});const v=g-s;let w={currentAge:v,decadal:"",yearly:""};return console.log("运限信息暂时跳过，当前年龄:",v),{...c,palaces:p,mutagens:f,horoscope:w,_astrolabe:u}}catch(l){throw console.error("紫薇斗数计算失败:",l),console.error("计算参数:",{year:s,month:e,day:t,timeIndex:n,hourValue:r,gender:i,isLunar:o}),l.message.includes("wrong hour")?new Error(`时辰参数错误: 小时值${r}无效，请检查时辰选择`):new Error(`紫薇斗数计算失败: ${l.message}`)}}function Fe(s){return s?{basicInfo:{name:s.name||"",gender:s.gender==="male"?"男":"女",birthDate:{solar:s.solarDate||"",lunar:s.lunarDate||"",chinese:s.chineseDate||""},time:s.time||"",timeRange:s.timeRange||"",sign:s.sign||"",zodiac:s.zodiac||"",fiveElementsClass:s.fiveElementsClass||"",soulPalace:s.soulPalace||"",bodyPalace:s.bodyPalace||""},palaces:(s.palaces||[]).map(e=>({name:e.name||"",isBodyPalace:e.isBodyPalace||!1,heavenlyStem:e.heavenlyStem||"",earthlyBranch:e.earthlyBranch||"",allStars:[...(e.majorStars||[]).map(t=>({...t,type:"major"})),...(e.minorStars||[]).map(t=>({...t,type:"minor"})),...(e.adjectiveStars||[]).map(t=>({...t,type:"adjective"}))].map(t=>({name:t.name||"",type:t.type||"",brightness:t.brightness||"",mutagen:t.mutagen||""})),changsheng12:e.changsheng12||"",ages:e.ages||[]})),mutagens:s.mutagens||{},horoscope:s.horoscope||{}}:null}const lt=`你是一位资深的紫薇斗数命理师，拥有深厚的紫薇斗数理论基础和丰富的实践经验。

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
   - 亲子关系的建议`,Pt=`请重点分析以下方面：

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
   - 心理健康的维护`,Ct=`请重点分析以下方面：

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
   - 运势提升的方法`,ct=`请重点分析以下方面：

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
   - 共同发展的方向`,Qe=`请根据用户的具体问题，结合紫薇斗数星盘信息进行专业分析。

分析时请注意：
1. 针对问题的核心进行重点分析
2. 结合相关宫位和星耀的影响
3. 给出具体可行的建议
4. 保持专业性和准确性`;function Tt(s){return{personality:wt,career:kt,relationship:At,health:Pt,fortune:Ct,compatibility:ct,custom:Qe}[s]||Qe}function Et(s,e,t){const n=lt,i=Tt(s);let o=`${n}

${i}

`;return o+=`【星盘信息】
`,o+=`基本信息：${JSON.stringify(t.basicInfo,null,2)}
`,o+=`宫位信息：${JSON.stringify(t.palaces,null,2)}
`,o+=`四化信息：${JSON.stringify(t.mutagens,null,2)}
`,o+=`运限信息：${JSON.stringify(t.horoscope,null,2)}

`,o+=`【用户问题】
${e}

`,o+="请基于以上信息进行专业分析，给出详细的解读和建议。",o}function Lt(s,e,t){let o=`${lt}

${ct}

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

`,o+="请基于以上两人的星盘信息进行专业的合盘分析，给出详细的匹配度解读和相处建议。",o}function Ut(s){if(!s)return"";try{const e=new URLSearchParams;return e.set("y",s.year),e.set("m",s.month),e.set("d",s.day),e.set("t",s.timeIndex),e.set("g",s.gender),s.name&&e.set("n",s.name),e.toString()}catch(e){return console.error("编码八字数据到URL失败:",e),""}}function Be(s){if(!s)return null;try{const e=new URLSearchParams(s),t=e.get("y"),n=e.get("m"),i=e.get("d"),o=e.get("t"),r=e.get("g"),l=e.get("n");if(!t||!n||!i||o===null||!r)return console.warn("URL中的八字数据不完整"),null;const d=parseInt(t),u=parseInt(n),g=parseInt(i),c=parseInt(o);return d<1900||d>2100||u<1||u>12||g<1||g>31||c<0||c>12||!["male","female"].includes(r)?(console.warn("URL中的八字数据无效"),null):{year:d,month:u,day:g,timeIndex:c,gender:r,name:l||""}}catch(e){return console.error("从URL解码八字数据失败:",e),null}}function je(s){if(s)try{const e=new URL(window.location);e.searchParams.set("y",s.year),e.searchParams.set("m",s.month),e.searchParams.set("d",s.day),e.searchParams.set("t",s.timeIndex),e.searchParams.set("g",s.gender),s.name?e.searchParams.set("n",s.name):e.searchParams.delete("n"),e.searchParams.delete("bz"),window.history.replaceState({},"",e.toString())}catch(e){console.error("更新URL失败:",e)}}function Gt(){try{const s=new URL(window.location);if(s.searchParams.has("y")&&s.searchParams.has("m")&&s.searchParams.has("d")&&s.searchParams.has("t")&&s.searchParams.has("g"))return Be(s.search.substring(1));const e=s.searchParams.get("bz");if(e)try{const t=decodeURIComponent(atob(e)),n=JSON.parse(t);return{year:parseInt(n.y),month:parseInt(n.m),day:parseInt(n.d),timeIndex:parseInt(n.t),gender:n.g,name:n.n||""}}catch(t){return console.warn("旧格式URL解码失败:",t),null}return null}catch(s){return console.error("从URL获取八字数据失败:",s),null}}function Nt(){try{const s=new URL(window.location);s.searchParams.delete("y"),s.searchParams.delete("m"),s.searchParams.delete("d"),s.searchParams.delete("t"),s.searchParams.delete("g"),s.searchParams.delete("n"),s.searchParams.delete("bz"),window.history.replaceState({},"",s.toString())}catch(s){console.error("清除URL中的八字数据失败:",s)}}function ut(s,e){if(!s||!e)return"";try{const t={p1:{y:s.year,m:s.month,d:s.day,t:s.timeIndex,g:s.gender,n:s.name||""},p2:{y:e.year,m:e.month,d:e.day,t:e.timeIndex,g:e.gender,n:e.name||""}},n=JSON.stringify(t);return btoa(encodeURIComponent(n))}catch(t){return console.error("编码合盘数据到URL失败:",t),""}}function jt(s){if(!s)return null;try{const e=decodeURIComponent(atob(s)),t=JSON.parse(e);if(!t.p1||!t.p2)return console.warn("URL中的合盘数据不完整"),null;const n=Be(btoa(encodeURIComponent(JSON.stringify(t.p1)))),i=Be(btoa(encodeURIComponent(JSON.stringify(t.p2))));return!n||!i?(console.warn("URL中的合盘数据无效"),null):{person1:n,person2:i}}catch(e){return console.error("从URL解码合盘数据失败:",e),null}}function Mt(s,e){if(!(!s||!e))try{const t=ut(s,e);if(t){const n=new URL(window.location);n.searchParams.set("cp",t),n.searchParams.delete("bz"),window.history.replaceState({},"",n.toString())}}catch(t){console.error("更新合盘URL失败:",t)}}function Dt(){try{const e=new URL(window.location).searchParams.get("cp");return jt(e)}catch(s){return console.error("从URL获取合盘数据失败:",s),null}}function Rt(){try{const s=new URL(window.location);s.searchParams.delete("cp"),window.history.replaceState({},"",s.toString())}catch(s){console.error("清除URL中的合盘数据失败:",s)}}function ze(s,e=null){const t=window.location.origin+window.location.pathname;if(e){const n=ut(s,e);return n?`${t}?cp=${n}`:t}else{const n=Ut(s);return n?`${t}?${n}`:t}}function Bt(){try{const s=new URL(window.location);return s.searchParams.has("bz")||s.searchParams.has("cp")||s.searchParams.has("y")&&s.searchParams.has("m")&&s.searchParams.has("d")&&s.searchParams.has("t")&&s.searchParams.has("g")}catch{return!1}}function Ot(s){if(!s)return"";try{const e=new URLSearchParams;return e.set("y",s.year),e.set("m",s.month),e.set("d",s.day),e.set("t",s.timeIndex),e.set("g",s.gender),s.name&&e.set("n",s.name),s.isLunar&&e.set("l","1"),e.toString()}catch(e){return console.error("编码紫薇斗数数据到URL失败:",e),""}}function Yt(s){if(!s)return null;try{const e=new URLSearchParams(s);if(!e.has("y")||!e.has("m")||!e.has("d")||!e.has("t")||!e.has("g"))return console.warn("URL中的紫薇斗数数据不完整"),null;const t=parseInt(e.get("y")),n=parseInt(e.get("m")),i=parseInt(e.get("d")),o=parseInt(e.get("t")),r=e.get("g");return t<1900||t>2100||n<1||n>12||i<1||i>31||o<0||o>12||!["male","female"].includes(r)?(console.warn("URL中的紫薇斗数数据无效"),null):{year:t,month:n,day:i,timeIndex:o,gender:r,name:e.get("n")||"",isLunar:e.get("l")==="1"}}catch(e){return console.error("从URL解码紫薇斗数数据失败:",e),null}}function Zt(s){if(s)try{const e=new URL(window.location);e.searchParams.set("y",s.year),e.searchParams.set("m",s.month),e.searchParams.set("d",s.day),e.searchParams.set("t",s.timeIndex),e.searchParams.set("g",s.gender),s.name?e.searchParams.set("n",s.name):e.searchParams.delete("n"),s.isLunar?e.searchParams.set("l","1"):e.searchParams.delete("l"),e.searchParams.delete("zw"),e.searchParams.delete("bz"),window.history.replaceState({},"",e.toString())}catch(e){console.error("更新紫薇斗数URL失败:",e)}}function Ht(){try{const s=new URL(window.location);if(s.searchParams.has("y")&&s.searchParams.has("m")&&s.searchParams.has("d")&&s.searchParams.has("t")&&s.searchParams.has("g"))return Yt(s.search.substring(1));const e=s.searchParams.get("zw");if(e)try{const t=decodeURIComponent(atob(e)),n=JSON.parse(t);return{year:parseInt(n.y),month:parseInt(n.m),day:parseInt(n.d),timeIndex:parseInt(n.t),gender:n.g,name:n.n||"",isLunar:n.l||!1}}catch(t){return console.warn("旧格式紫薇斗数URL解码失败:",t),null}return null}catch(s){return console.error("从URL获取紫薇斗数数据失败:",s),null}}function qt(){try{const s=new URL(window.location);s.searchParams.delete("y"),s.searchParams.delete("m"),s.searchParams.delete("d"),s.searchParams.delete("t"),s.searchParams.delete("g"),s.searchParams.delete("n"),s.searchParams.delete("l"),s.searchParams.delete("zw"),window.history.replaceState({},"",s.toString())}catch(s){console.error("清除URL中的紫薇斗数数据失败:",s)}}function Kt(s,e){if(!s||!e)return"";try{const t=new URLSearchParams;return t.set("p1_y",s.year),t.set("p1_m",s.month),t.set("p1_d",s.day),t.set("p1_t",s.timeIndex),t.set("p1_g",s.gender),s.name&&t.set("p1_n",s.name),s.isLunar&&t.set("p1_l","1"),t.set("p2_y",e.year),t.set("p2_m",e.month),t.set("p2_d",e.day),t.set("p2_t",e.timeIndex),t.set("p2_g",e.gender),e.name&&t.set("p2_n",e.name),e.isLunar&&t.set("p2_l","1"),t.toString()}catch(t){return console.error("编码紫薇斗数合盘数据到URL失败:",t),""}}function Jt(s){if(!s)return null;try{const e=new URLSearchParams(s);if(!e.has("p1_y")||!e.has("p2_y"))return console.warn("URL中的紫薇斗数合盘数据不完整"),null;const t={year:parseInt(e.get("p1_y")),month:parseInt(e.get("p1_m")),day:parseInt(e.get("p1_d")),timeIndex:parseInt(e.get("p1_t")),gender:e.get("p1_g"),name:e.get("p1_n")||"",isLunar:e.get("p1_l")==="1"},n={year:parseInt(e.get("p2_y")),month:parseInt(e.get("p2_m")),day:parseInt(e.get("p2_d")),timeIndex:parseInt(e.get("p2_t")),gender:e.get("p2_g"),name:e.get("p2_n")||"",isLunar:e.get("p2_l")==="1"};return!t.year||!t.month||!t.day||t.timeIndex===void 0||!t.gender||!n.year||!n.month||!n.day||n.timeIndex===void 0||!n.gender?(console.warn("URL中的紫薇斗数合盘数据无效"),null):{person1:t,person2:n}}catch(e){return console.error("从URL解码紫薇斗数合盘数据失败:",e),null}}function Vt(s,e){if(!(!s||!e))try{const t=new URL(window.location),n=[];for(const i of t.searchParams.keys())n.push(i);n.forEach(i=>t.searchParams.delete(i)),t.searchParams.set("p1_y",s.year),t.searchParams.set("p1_m",s.month),t.searchParams.set("p1_d",s.day),t.searchParams.set("p1_t",s.timeIndex),t.searchParams.set("p1_g",s.gender),s.name&&t.searchParams.set("p1_n",s.name),s.isLunar&&t.searchParams.set("p1_l","1"),t.searchParams.set("p2_y",e.year),t.searchParams.set("p2_m",e.month),t.searchParams.set("p2_d",e.day),t.searchParams.set("p2_t",e.timeIndex),t.searchParams.set("p2_g",e.gender),e.name&&t.searchParams.set("p2_n",e.name),e.isLunar&&t.searchParams.set("p2_l","1"),window.history.replaceState({},"",t.toString())}catch(t){console.error("更新紫薇斗数合盘URL失败:",t)}}function Wt(){try{const s=new URL(window.location);if(s.searchParams.has("p1_y")&&s.searchParams.has("p2_y"))return Jt(s.search.substring(1));const e=s.searchParams.get("zwcp");if(e)try{const t=decodeURIComponent(atob(e)),n=JSON.parse(t);return!n.p1||!n.p2?null:{person1:{year:parseInt(n.p1.y),month:parseInt(n.p1.m),day:parseInt(n.p1.d),timeIndex:parseInt(n.p1.t),gender:n.p1.g,name:n.p1.n||"",isLunar:n.p1.l||!1},person2:{year:parseInt(n.p2.y),month:parseInt(n.p2.m),day:parseInt(n.p2.d),timeIndex:parseInt(n.p2.t),gender:n.p2.g,name:n.p2.n||"",isLunar:n.p2.l||!1}}}catch(t){return console.warn("旧格式紫薇斗数合盘URL解码失败:",t),null}return null}catch(s){return console.error("从URL获取紫薇斗数合盘数据失败:",s),null}}function Ft(){try{const s=new URL(window.location),e=[];for(const t of s.searchParams.keys())(t.startsWith("p1_")||t.startsWith("p2_"))&&e.push(t);e.forEach(t=>s.searchParams.delete(t)),s.searchParams.delete("zwcp"),window.history.replaceState({},"",s.toString())}catch(s){console.error("清除URL中的紫薇斗数合盘数据失败:",s)}}function Xe(s,e=null){const t=window.location.origin+window.location.pathname;if(e){const n=Kt(s,e);return n?`${t}?${n}`:t}else{const n=Ot(s);return n?`${t}?${n}`:t}}function Qt(s={}){const e={name:"",year:"",month:"",day:"",timeIndex:0,gender:"",isLunar:!1,...s},t=D({...e}),n=D({...e}),i=D(!1),o=D(null),r=D(null),l=D(!1),d=D(""),u=he(()=>{const p=t.value.year&&t.value.month&&t.value.day&&t.value.timeIndex!==""&&t.value.gender;if(!i.value)return p;const f=n.value.year&&n.value.month&&n.value.day&&n.value.timeIndex!==""&&n.value.gender;return p&&f}),g=he(()=>o.value!==null);return{person1:t,person2:n,enableSecondPerson:i,result1:o,result2:r,isCalculating:l,calculationError:d,canCalculate:u,hasResults:g,resetData:()=>{t.value={...e},n.value={...e},i.value=!1,o.value=null,r.value=null,d.value=""}}}const H={HEAVENLY_STEMS:["甲","乙","丙","丁","戊","己","庚","辛","壬","癸"],EARTHLY_BRANCHES:["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"],STEM_WUXING:["木","木","火","火","土","土","金","金","水","水"],BRANCH_WUXING:["水","土","木","木","土","火","火","土","金","金","土","水"],STEM_YINYANG:["阳","阴","阳","阴","阳","阴","阳","阴","阳","阴"],BRANCH_YINYANG:["阳","阴","阳","阴","阳","阴","阳","阴","阳","阴","阳","阴"],WUXING_SHENG:{木:"火",火:"土",土:"金",金:"水",水:"木"},WUXING_KE:{木:"土",火:"金",土:"水",金:"木",水:"火"},TIME_BRANCHES:[{name:"早子时",hour:0,branch:"子"},{name:"丑时",hour:1,branch:"丑"},{name:"寅时",hour:3,branch:"寅"},{name:"卯时",hour:5,branch:"卯"},{name:"辰时",hour:7,branch:"辰"},{name:"巳时",hour:9,branch:"巳"},{name:"午时",hour:11,branch:"午"},{name:"未时",hour:13,branch:"未"},{name:"申时",hour:15,branch:"申"},{name:"酉时",hour:17,branch:"酉"},{name:"戌时",hour:19,branch:"戌"},{name:"亥时",hour:21,branch:"亥"},{name:"晚子时",hour:23,branch:"子"}]},Me={子:["癸"],丑:["己","癸","辛"],寅:["甲","丙","戊"],卯:["乙"],辰:["戊","乙","癸"],巳:["丙","庚","戊"],午:["丁","己"],未:["己","丁","乙"],申:["庚","壬","戊"],酉:["辛"],戌:["戊","辛","丁"],亥:["壬","甲"]},zt={甲子:"海中金",乙丑:"海中金",丙寅:"炉中火",丁卯:"炉中火",戊辰:"大林木",己巳:"大林木",庚午:"路旁土",辛未:"路旁土",壬申:"剑锋金",癸酉:"剑锋金",甲戌:"山头火",乙亥:"山头火",丙子:"涧下水",丁丑:"涧下水",戊寅:"城头土",己卯:"城头土",庚辰:"白蜡金",辛巳:"白蜡金",壬午:"杨柳木",癸未:"杨柳木",甲申:"泉中水",乙酉:"泉中水",丙戌:"屋上土",丁亥:"屋上土",戊子:"霹雳火",己丑:"霹雳火",庚寅:"松柏木",辛卯:"松柏木",壬辰:"长流水",癸巳:"长流水",甲午:"砂中金",乙未:"砂中金",丙申:"山下火",丁酉:"山下火",戊戌:"平地木",己亥:"平地木",庚子:"壁上土",辛丑:"壁上土",壬寅:"金箔金",癸卯:"金箔金",甲辰:"覆灯火",乙巳:"覆灯火",丙午:"天河水",丁未:"天河水",戊申:"大驿土",己酉:"大驿土",庚戌:"钗钏金",辛亥:"钗钏金",壬子:"桑柘木",癸丑:"桑柘木",甲寅:"大溪水",乙卯:"大溪水",丙辰:"沙中土",丁巳:"沙中土",戊午:"天上火",己未:"天上火",庚申:"石榴木",辛酉:"石榴木",壬戌:"大海水",癸亥:"大海水"},et={金:{color:"白、金、银",direction:"西",industry:"金融、五金、科技、汽车、司法",advice:"增强决断力，保持原则，处事要果断。"},木:{color:"绿、青",direction:"东",industry:"教育、林业、文化、服装、医药",advice:"保持仁爱之心，积极成长，多接触自然。"},水:{color:"黑、蓝、灰",direction:"北",industry:"贸易、物流、水产、旅游、媒体",advice:"锻炼沟通能力，灵活应变，保持谦逊。"},火:{color:"红、橙、紫",direction:"南",industry:"电力、餐饮、IT、化工、礼仪",advice:"保持热情与活力，待人接物要真诚有礼。"},土:{color:"黄、棕、褐",direction:"中（本地）",industry:"地产、建筑、农业、保险",advice:"为人处事要诚信稳重，脚踏实地。"}},De={甲:{亥:"长生",子:"沐浴",丑:"冠带",寅:"临官",卯:"帝旺",辰:"衰",巳:"病",午:"死",未:"墓",申:"绝",酉:"胎",戌:"养"},乙:{午:"长生",巳:"沐浴",辰:"冠带",卯:"临官",寅:"帝旺",丑:"衰",子:"病",亥:"死",戌:"墓",酉:"绝",申:"胎",未:"养"},丙:{寅:"长生",卯:"沐浴",辰:"冠带",巳:"临官",午:"帝旺",未:"衰",申:"病",酉:"死",戌:"墓",亥:"绝",子:"胎",丑:"养"},丁:{酉:"长生",申:"沐浴",未:"冠带",午:"临官",巳:"帝旺",辰:"衰",卯:"病",寅:"死",丑:"墓",子:"绝",亥:"胎",戌:"养"},戊:{寅:"长生",卯:"沐浴",辰:"冠带",巳:"临官",午:"帝旺",未:"衰",申:"病",酉:"死",戌:"墓",亥:"绝",子:"胎",丑:"养"},己:{酉:"长生",申:"沐浴",未:"冠带",午:"临官",巳:"帝旺",辰:"衰",卯:"病",寅:"死",丑:"墓",子:"绝",亥:"胎",戌:"养"},庚:{巳:"长生",午:"沐浴",未:"冠带",申:"临官",酉:"帝旺",戌:"衰",亥:"病",子:"死",丑:"墓",寅:"绝",卯:"胎",辰:"养"},辛:{子:"长生",亥:"沐浴",戌:"冠带",酉:"临官",申:"帝旺",未:"衰",午:"病",巳:"死",辰:"墓",卯:"绝",寅:"胎",丑:"养"},壬:{申:"长生",酉:"沐浴",戌:"冠带",亥:"临官",子:"帝旺",丑:"衰",寅:"病",卯:"死",辰:"墓",巳:"绝",午:"胎",未:"养"},癸:{卯:"长生",寅:"沐浴",丑:"冠带",子:"临官",亥:"帝旺",戌:"衰",酉:"病",申:"死",未:"墓",午:"绝",巳:"胎",辰:"养"}},Xt={寅:{木:"旺",火:"相",水:"休",金:"囚",土:"死"},卯:{木:"旺",火:"相",水:"休",金:"囚",土:"死"},辰:{土:"旺",金:"相",火:"休",木:"囚",水:"死"},巳:{火:"旺",土:"相",木:"休",水:"囚",金:"死"},午:{火:"旺",土:"相",木:"休",水:"囚",金:"死"},未:{土:"旺",金:"相",火:"休",木:"囚",水:"死"},申:{金:"旺",水:"相",土:"休",火:"囚",木:"死"},酉:{金:"旺",水:"相",土:"休",火:"囚",木:"死"},戌:{土:"旺",金:"相",火:"休",木:"囚",水:"死"},亥:{水:"旺",木:"相",金:"休",土:"囚",火:"死"},子:{水:"旺",木:"相",金:"休",土:"囚",火:"死"},丑:{土:"旺",金:"相",火:"休",木:"囚",水:"死"}},en={寅:[["戊",7],["丙",7],["甲",16]],卯:[["甲",10],["乙",20]],辰:[["乙",9],["癸",3],["戊",18]],巳:[["戊",7],["庚",9],["丙",14]],午:[["丙",10],["丁",20]],未:[["丁",9],["乙",3],["己",18]],申:[["庚",10],["壬",3],["戊",17]],酉:[["庚",10],["辛",20]],戌:[["辛",9],["丁",3],["戊",18]],亥:[["戊",7],["甲",23]],子:[["壬",10],["癸",20]],丑:[["癸",9],["辛",3],["己",18]]};class tn{constructor(){this.ctg=H.HEAVENLY_STEMS,this.cdz=H.EARTHLY_BRANCHES}zhiIdx(e){return this.cdz.indexOf(e)}calculateAllShenSha(e,t){const n={},i=["year","month","day","hour"];return e.forEach((o,r)=>{const[l,d]=o,u=this.calculatePillarShenSha(l,d,r,e,t);n[i[r]]=u}),n}calculatePillarShenSha(e,t,n,i,o){const r=[],[l,d]=i[0],[u,g]=i[1],[c,p]=i[2];i[3];const f=c+p,v=e+t;this.ctg.indexOf(l)%2;const w=o==="male",k={天乙贵人:()=>{const m={甲:["丑","未"],戊:["丑","未"],庚:["丑","未"],己:["子","申"],乙:["子","申"],丙:["亥","酉"],丁:["亥","酉"],壬:["卯","巳"],癸:["卯","巳"],辛:["寅","午"]};return m[l]&&m[l].includes(t)||m[c]&&m[c].includes(t)},太极贵人:()=>{const m={甲:["子","午"],乙:["子","午"],丙:["卯","酉"],丁:["卯","酉"],戊:["辰","戌","丑","未"],己:["辰","戌","丑","未"],庚:["寅","亥"],辛:["寅","亥"],壬:["巳","申"],癸:["巳","申"]};return m[l]&&m[l].includes(t)||m[c]&&m[c].includes(t)},天德贵人:()=>{const _={寅:1,卯:2,辰:3,巳:4,午:5,未:6,申:7,酉:8,戌:9,亥:10,子:11,丑:12}[g];if(!_)return!1;const L={1:"丁",2:"申",3:"壬",4:"辛",5:"亥",6:"甲",7:"癸",8:"寅",9:"丙",10:"乙",11:"巳",12:"庚"}[_];return L===e||L===t},天德合:()=>{const _={寅:1,卯:2,辰:3,巳:4,午:5,未:6,申:7,酉:8,戌:9,亥:10,子:11,丑:12}[g];if(!_)return!1;const L={1:"丁",2:"申",3:"壬",4:"辛",5:"亥",6:"甲",7:"癸",8:"寅",9:"丙",10:"乙",11:"巳",12:"庚"}[_];return{甲:"己",乙:"庚",丙:"辛",丁:"壬",戊:"癸",己:"甲",庚:"乙",辛:"丙",壬:"丁",癸:"戊"}[L]===e},月德贵人:()=>({寅:"丙",午:"丙",戌:"丙",申:"壬",子:"壬",辰:"壬",亥:"甲",卯:"甲",未:"甲",巳:"庚",酉:"庚",丑:"庚"})[g]===e,月德合:()=>{const m={寅:"丙",午:"丙",戌:"丙",申:"壬",子:"壬",辰:"壬",亥:"甲",卯:"甲",未:"甲",巳:"庚",酉:"庚",丑:"庚"}[g];return{甲:"己",乙:"庚",丙:"辛",丁:"壬",戊:"癸",己:"甲",庚:"乙",辛:"丙",壬:"丁",癸:"戊"}[m]===e},三奇贵人:()=>{const m=i.map(L=>L[0]),_=[["乙","丙","丁"],["甲","戊","庚"],["辛","壬","癸"]];for(let L=0;L<=m.length-3;L++){const j=m.slice(L,L+3);if(_.some(ae=>ae.every((z,M)=>z===j[M])))return!0}return!1},福星贵人:()=>{const m={甲:"寅",乙:"丑",丙:"子",丁:"亥",戊:"申",己:"未",庚:"午",辛:"巳",壬:"辰",癸:"卯"};return m[l]===t||m[c]===t},文昌贵人:()=>{const m={甲:"巳",乙:"午",丙:"申",丁:"酉",戊:"申",己:"酉",庚:"亥",辛:"子",壬:"寅",癸:"卯"};return m[l]===t||m[c]===t},国印贵人:()=>{const m={甲:"戌",乙:"亥",丙:"丑",丁:"寅",戊:"丑",己:"寅",庚:"辰",辛:"巳",壬:"未",癸:"申"};return m[l]===t||m[c]===t},学堂:()=>{const m=H.STEM_WUXING[c];return{木:"亥",火:"寅",土:"申",金:"巳",水:"申"}[m]===t},词馆:()=>({甲:"寅",乙:"卯",丙:"巳",丁:"午",戊:"巳",己:"午",庚:"申",辛:"酉",壬:"亥",癸:"子"})[c]===t,天厨贵人:()=>({甲:"巳",乙:"午",丙:"子",丁:"亥",戊:"申",己:"未",庚:"寅",辛:"卯",壬:"酉",癸:"戌"})[c]===t,德秀贵人:()=>{const _={寅:"火",午:"火",戌:"火",申:"水",子:"水",辰:"水",巳:"金",酉:"金",丑:"金",亥:"木",卯:"木",未:"木"}[g],L={甲:"己",乙:"庚",丙:"辛",丁:"壬",戊:"癸"},j=[];return _==="火"?j.push("丁","己","癸","庚"):_==="水"?j.push("壬","甲","戊","己","辛"):_==="金"?j.push("庚","壬","乙","丙","戊"):_==="木"&&j.push("乙","癸","丁","丙","庚"),j.includes(e)||L[e]&&j.includes(L[e])},禄神:()=>({甲:"寅",乙:"卯",丙:"巳",丁:"午",戊:"巳",己:"午",庚:"申",辛:"酉",壬:"亥",癸:"子"})[c]===t,羊刃:()=>({甲:"卯",丙:"午",戊:"午",庚:"酉",壬:"子"})[c]===t,飞刃:()=>{const _={甲:"卯",丙:"午",戊:"午",庚:"酉",壬:"子"}[c];return _?{子:"午",丑:"未",寅:"申",卯:"酉",辰:"戌",巳:"亥",午:"子",未:"丑",申:"寅",酉:"卯",戌:"辰",亥:"巳"}[_]===t:!1},驿马:()=>{const m={申:"寅",子:"寅",辰:"寅",亥:"巳",卯:"巳",未:"巳",寅:"申",午:"申",戌:"申",巳:"亥",酉:"亥",丑:"亥"};return m[d]===t||m[p]===t},将星:()=>{const m={申:"子",子:"子",辰:"子",亥:"卯",卯:"卯",未:"卯",寅:"午",午:"午",戌:"午",巳:"酉",酉:"酉",丑:"酉"};return m[d]===t||m[p]===t},华盖:()=>{const m={申:"辰",子:"辰",辰:"辰",亥:"未",卯:"未",未:"未",寅:"戌",午:"戌",戌:"戌",巳:"丑",酉:"丑",丑:"丑"};return m[d]===t||m[p]===t},金舆:()=>({甲:"辰",乙:"巳",丙:"未",丁:"申",戊:"未",己:"申",庚:"戌",辛:"亥",壬:"丑",癸:"寅"})[c]===t,金神:()=>["乙丑","己巳","癸酉"].includes(v)&&(n===2||n===3),天赦日:()=>{if(n!==2)return!1;const m={寅:"春",卯:"春",辰:"春",巳:"夏",午:"夏",未:"夏",申:"秋",酉:"秋",戌:"秋",亥:"冬",子:"冬",丑:"冬"}[g];return m==="春"&&f==="戊寅"||m==="夏"&&f==="甲午"||m==="秋"&&f==="戊申"||m==="冬"&&f==="甲子"},魁罡:()=>n===2&&["庚辰","壬辰","戊戌","庚戌"].includes(f),阴差阳错:()=>n===2&&["丙子","丁丑","戊寅","辛卯","壬辰","癸巳","丙午","丁未","戊申","辛酉","壬戌","癸亥"].includes(f),孤鸾煞:()=>n===2&&["乙巳","丁巳","辛亥","戊申","甲寅","壬子","丙午","戊午","己未","癸丑"].includes(f),十灵日:()=>n===2&&["甲辰","乙亥","丙辰","丁酉","戊午","庚戌","辛亥","壬寅","癸未"].includes(f),六秀日:()=>n===2&&["丙午","丁未","戊子","戊午","己丑","己未"].includes(f),八专:()=>n===2&&["甲寅","乙卯","己未","丁巳","庚申","辛酉","戊戌","癸丑"].includes(f),九丑:()=>n===2&&["戊子","戊午","壬子","壬午","乙卯","辛卯","乙酉","辛酉","己卯","己酉"].includes(f),四废日:()=>{if(n!==2)return!1;const m={寅:"春",卯:"春",辰:"春",巳:"夏",午:"夏",未:"夏",申:"秋",酉:"秋",戌:"秋",亥:"冬",子:"冬",丑:"冬"},_={春:["庚申","辛酉"],夏:["壬子","癸亥"],秋:["甲寅","乙卯"],冬:["丙午","丁巳"]},L=m[g];return L&&_[L].includes(f)},十恶大败:()=>{const m=this.ctg.indexOf(l),_=this.cdz.indexOf(d);if(m===-1||_===-1)return!1;const L=(10+_-m)%12,j=(11+_-m)%12,ae=[this.cdz[L],this.cdz[j]],M={甲:"寅",乙:"卯",丙:"巳",丁:"午",戊:"巳",己:"午",庚:"申",辛:"酉",壬:"亥",癸:"子"}[c];return ae.includes(M)},童子煞:()=>{const _={寅:"春",卯:"春",辰:"春",巳:"夏",午:"夏",未:"夏",申:"秋",酉:"秋",戌:"秋",亥:"冬",子:"冬",丑:"冬"}[g];return _?(_==="春"||_==="秋")&&(t==="寅"||t==="卯")||(_==="夏"||_==="冬")&&(t==="午"||t==="子"):!1},天转:()=>(n===2||n===3)&&{春:"乙卯",夏:"戊午",秋:"辛酉",冬:"癸子"}[{寅:"春",卯:"春",辰:"春",巳:"夏",午:"夏",未:"夏",申:"秋",酉:"秋",戌:"秋",亥:"冬",子:"冬",丑:"冬"}[g]]===v,地转:()=>(n===2||n===3)&&{春:"甲寅",夏:"丁巳",秋:"庚申",冬:"癸亥"}[{寅:"春",卯:"春",辰:"春",巳:"夏",午:"夏",未:"夏",申:"秋",酉:"秋",戌:"秋",亥:"冬",子:"冬",丑:"冬"}[g]]===v,桃花:()=>{const m={寅:"卯",午:"卯",戌:"卯",亥:"子",卯:"子",未:"子",申:"酉",子:"酉",辰:"酉",巳:"午",酉:"午",丑:"午"};return m[d]===t||m[p]===t},红鸾:()=>({子:"卯",丑:"寅",寅:"丑",卯:"子",辰:"亥",巳:"戌",午:"酉",未:"申",申:"未",酉:"午",戌:"巳",亥:"辰"})[d]===t,天喜:()=>({子:"酉",丑:"申",寅:"未",卯:"午",辰:"巳",巳:"辰",午:"卯",未:"寅",申:"丑",酉:"子",戌:"亥",亥:"戌"})[d]===t,孤辰:()=>({亥:"寅",子:"寅",丑:"寅",寅:"巳",卯:"巳",辰:"巳",巳:"申",午:"申",未:"申",申:"亥",酉:"亥",戌:"亥"})[d]===t,寡宿:()=>({亥:"戌",子:"戌",丑:"戌",寅:"丑",卯:"丑",辰:"丑",巳:"辰",午:"辰",未:"辰",申:"未",酉:"未",戌:"未"})[d]===t,红艳煞:()=>({甲:"午",乙:"申",丙:"寅",丁:"未",戊:"辰",己:"辰",庚:"戌",辛:"酉",壬:"子",癸:"申"})[c]===t,勾绞煞:()=>{const m=(this.zhiIdx(d)+4)%12,_=(this.zhiIdx(d)-4+12)%12;return t===this.cdz[m]||t===this.cdz[_]},空亡:()=>{const m=this.ctg.indexOf(c),_=this.cdz.indexOf(p);if(m===-1||_===-1)return!1;const L=(10+_-m)%12,j=(11+_-m)%12;return[this.cdz[L],this.cdz[j]].includes(t)},亡神:()=>{const m={申:"亥",子:"亥",辰:"亥",亥:"申",卯:"申",未:"申",寅:"巳",午:"巳",戌:"巳",巳:"寅",酉:"寅",丑:"寅"};return m[d]===t||m[p]===t},劫煞:()=>{const m={申:"巳",子:"巳",辰:"巳",亥:"寅",卯:"寅",未:"寅",寅:"亥",午:"亥",戌:"亥",巳:"申",酉:"申",丑:"申"};return m[d]===t||m[p]===t},灾煞:()=>{const m={申:"午",子:"午",辰:"午",亥:"酉",卯:"酉",未:"酉",寅:"子",午:"子",戌:"子",巳:"卯",酉:"卯",丑:"卯"};return m[d]===t||m[p]===t},元辰:()=>{const m=this.ctg.indexOf(l)%2===0,_=m&&w||!m&&!w?7:-7,L=(this.zhiIdx(d)+_+12)%12;return this.cdz[L]===t},血刃:()=>({寅:"丑",卯:"寅",辰:"卯",巳:"辰",午:"巳",未:"午",申:"未",酉:"申",戌:"酉",亥:"戌",子:"亥",丑:"子"})[g]===t,流霞:()=>({甲:"酉",乙:"戌",丙:"未",丁:"申",戊:"巳",己:"午",庚:"辰",辛:"卯",壬:"亥",癸:"寅"})[c]===t,天罗:()=>t==="戌"||t==="亥",地网:()=>t==="辰"||t==="巳",丧门:()=>this.cdz[(this.zhiIdx(d)+2)%12]===t,吊客:()=>this.cdz[(this.zhiIdx(d)-2+12)%12]===t,披麻:()=>this.cdz[(this.zhiIdx(d)-1+12)%12]===t};for(const m in k)k[m]()&&r.push(m);return r}}class nn{constructor(){this.ctg=H.HEAVENLY_STEMS,this.cdz=H.EARTHLY_BRANCHES,this.wxtg=H.STEM_WUXING,this.wxdz=H.BRANCH_WUXING,this.wuxingKe=H.WUXING_KE,this.wuxingSheng=H.WUXING_SHENG}getIntelligentAnalysis(e){const t=[],n={甲:"己",乙:"庚",丙:"辛",丁:"壬",戊:"癸"},i={甲:"庚",乙:"辛",丙:"壬",丁:"癸"};for(let w=0;w<4;w++)for(let k=w+1;k<4;k++){const m=e[w][0],_=e[k][0];if(i[m]===_||i[_]===m)t.push(`${m}${_}相冲`);else if(n[m]===_||n[_]===m)t.push(`${m}${_}相合`);else{const L=this.wxtg[this.ctg.indexOf(m)],j=this.wxtg[this.ctg.indexOf(_)];this.wuxingKe[L]===j?t.push(`${m}克${_}`):this.wuxingKe[j]===L&&t.push(`${_}克${m}`)}}const o=[],r=e.map(w=>w[1]),l={子:"午",丑:"未",寅:"申",卯:"酉",辰:"戌",巳:"亥"},d={子:"丑",寅:"亥",卯:"戌",辰:"酉",巳:"申",午:"未"},u={子:"未",丑:"午",寅:"巳",卯:"辰",申:"亥",酉:"戌"},g={子:"酉",卯:"午",辰:"丑",未:"戌",寅:"亥",巳:"申"};for(let w=0;w<4;w++)for(let k=w+1;k<4;k++){const m=r[w],_=r[k];l[m]===_||l[_]===m?o.push(`${m}${_}相冲`):d[m]===_||d[_]===m?o.push(`${m}${_}相合`):u[m]===_||u[_]===m?o.push(`${m}${_}相害`):(g[m]===_||g[_]===m)&&o.push(`${m}${_}相破`)}const c=[...new Set(r)];c.filter(w=>["寅","巳","申"].includes(w)).length>=2&&o.push("寅巳申无恩之刑"),c.filter(w=>["丑","戌","未"].includes(w)).length>=2&&o.push("丑戌未恃势之刑"),c.includes("子")&&c.includes("卯")&&o.push("子卯无礼之刑"),r.filter(w=>w==="辰").length>1&&o.push("辰辰自刑"),r.filter(w=>w==="午").length>1&&o.push("午午自刑"),r.filter(w=>w==="酉").length>1&&o.push("酉酉自刑"),r.filter(w=>w==="亥").length>1&&o.push("亥亥自刑");const p=[];for(let w=0;w<4;w++){const k=e[w][0],m=e[w][1],_=this.wxtg[this.ctg.indexOf(k)],L=this.wxdz[this.cdz.indexOf(m)][0];this.wuxingKe[_]===L&&p.push(`${k}${m}盖头`),this.wuxingKe[L]===_&&p.push(`${k}${m}截脚`)}for(let w=0;w<4;w++)for(let k=w+1;k<4;k++){const m=e[w],_=e[k],L=i[m[0]]===_[0]||i[_[0]]===m[0],j=l[m[1]]===_[1]||l[_[1]]===m[1];L&&j&&p.push(`${m.join("")}与${_.join("")}天克地冲(反吟)`)}const v=e.map(w=>w.join("")).reduce((w,k)=>(w[k]=(w[k]||0)+1,w),{});for(const w in v)v[w]>1&&p.push(`${w}伏吟`);return{tianGan:t.length>0?`原局天干: ${t.join(" | ")}`:"",diZhi:o.length>0?`原局地支: ${o.join(" | ")}`:"",zhengZhu:p.length>0?`原局整柱: ${p.join(" | ")}`:""}}}class sn{constructor(){this.timeMap=[{index:0,name:"早子时",range:"00:00-01:00",hour:0},{index:1,name:"丑时",range:"01:00-03:00",hour:1},{index:2,name:"寅时",range:"03:00-05:00",hour:3},{index:3,name:"卯时",range:"05:00-07:00",hour:5},{index:4,name:"辰时",range:"07:00-09:00",hour:7},{index:5,name:"巳时",range:"09:00-11:00",hour:9},{index:6,name:"午时",range:"11:00-13:00",hour:11},{index:7,name:"未时",range:"13:00-15:00",hour:13},{index:8,name:"申时",range:"15:00-17:00",hour:15},{index:9,name:"酉时",range:"17:00-19:00",hour:17},{index:10,name:"戌时",range:"19:00-21:00",hour:19},{index:11,name:"亥时",range:"21:00-23:00",hour:21},{index:12,name:"晚子时",range:"23:00-24:00",hour:23}],this.tenGods=["比肩","劫财","食神","伤官","偏财","正财","七杀","正官","偏印","正印"],this.wuxing=["水","木","火","土","金"],this.lifeStages=["长生","沐浴","冠带","临官","帝旺","衰","病","死","墓","绝","胎","养"],this.shenShaCalculator=new tn,this.relationshipCalculator=new nn,this.ctg=H.HEAVENLY_STEMS,this.cdz=H.EARTHLY_BRANCHES,this.wxtg=H.STEM_WUXING,this.wxdz=H.BRANCH_WUXING}calculateBazi(e,t,n,i,o){try{const r=this.timeMap[i];if(!r)throw new Error("无效的时辰索引");const l=Le.fromYmdHms(e,t,n,r.hour,0,0),d=l.getLunarHour(),u=d.getEightChar(),g=u.getYear(),c=u.getMonth(),p=u.getDay(),f=u.getHour(),v={year:{gan:g.getHeavenStem().getName(),zhi:g.getEarthBranch().getName(),ganZhi:g.getName()},month:{gan:c.getHeavenStem().getName(),zhi:c.getEarthBranch().getName(),ganZhi:c.getName()},day:{gan:p.getHeavenStem().getName(),zhi:p.getEarthBranch().getName(),ganZhi:p.getName()},hour:{gan:f.getHeavenStem().getName(),zhi:f.getEarthBranch().getName(),ganZhi:f.getName()}},w=v.day.gan,k=[[v.year.gan,v.year.zhi],[v.month.gan,v.month.zhi],[v.day.gan,v.day.zhi],[v.hour.gan,v.hour.zhi]],m=this.calculateHiddenStems(v),_=this.calculateWuxingStrength(v,m),L=this.calculateSeasonInfo(l),j={gender:o==="male"?"男":"女",solarDate:{year:e,month:t,day:n},lunarDate:{year:d.getLunarDay().getLunarMonth().getLunarYear().getYear(),month:d.getLunarDay().getLunarMonth().getMonth(),day:d.getLunarDay().getDay(),monthName:d.getLunarDay().getLunarMonth().getName(),dayName:d.getLunarDay().getName()},timeInfo:r,pillars:v,dayMaster:{gan:w,element:this.getWuxing(w),yinYang:this.getGanYinYang(w)},zodiac:d.getLunarDay().getLunarMonth().getLunarYear().getSixtyCycle().getEarthBranch().getZodiac().getName(),constellation:l.getSolarDay().getConstellation().getName(),tenGods:this.calculateTenGods(v,w),hiddenStems:m,hiddenTenGods:this.calculateHiddenTenGods(m,w),wuxingStrength:_,luckInfo:this.calculateDayunWithTyme(l,o==="male"?Te.MAN:Te.WOMAN),mingGong:u.getOwnSign().getName(),shenGong:u.getBodySign().getName(),taiYuan:u.getFetalOrigin().getName(),taiXi:u.getFetalBreath().getName(),lifeStages:this.calculateLifeStages(v,w),pillarLifeStages:this.calculatePillarLifeStages(v),nayin:this.calculateNayin(v),shensha:this.shenShaCalculator.calculateAllShenSha(k,o),ziZuo:this.calculateZiZuo(v),kongWang:this.calculateKongWang(v),intelligentAnalysis:this.relationshipCalculator.getIntelligentAnalysis(k),wuxingSeasonStatus:this.getSeasonStatus(v.month.zhi),monthCommander:this.getMonthCommander(l,v.month.zhi),seasonInfo:L,analysis:this.analyzeBaziChart(v,m)};if(j.luckInfo&&j.luckInfo.cycles){const ae=e;j.luckInfo.cycles.forEach(z=>{if(!z.isXiaoyun){z.years=[];const M=z.year,V=M+9;for(let X=M;X<=V;X++){const ie=X-ae+1,T=this.calculateLiunian(X,w),P=this.calculateXiaoyun(v.hour.ganZhi,j.gender,v.year.gan,ie);z.years.push({year:X,age:ie,ganZhi:T.ganZhi,tenGod:T.tenGod,tenGodZhi:T.tenGodZhi,xiaoyun:P})}}})}return j}catch(r){throw console.error("八字计算错误:",r),new Error(`八字计算失败: ${r.message}`)}}calculateLiunian(e,t){try{const i=Le.fromYmdHms(e,6,1,0,0,0).getLunarHour().getEightChar().getYear(),o=i.getHeavenStem().getName(),r=i.getEarthBranch().getName();return{year:e,gan:o,zhi:r,ganZhi:`${o}${r}`,tenGod:this.getTenGod(o,t),tenGodZhi:this.getTenGodForBranch(r,t)}}catch(n){console.error(`流年计算错误 (${e}年):`,n);const i=(e-4)%10,o=(e-4)%12,r=H.HEAVENLY_STEMS[i],l=H.EARTHLY_BRANCHES[o];return{year:e,gan:r,zhi:l,ganZhi:`${r}${l}`,tenGod:this.getTenGod(r,t),tenGodZhi:this.getTenGodForBranch(l,t)}}}calculateLiuyue(e,t,n){const o=Le.fromYmdHms(e,t,1,0,0,0).getLunarHour().getEightChar().getMonth(),r=o.getHeavenStem().getName(),l=o.getEarthBranch().getName(),d=[],u=[e-1,e,e+1],g=[];u.forEach(p=>{for(let f=0;f<24;f++)g.push(Ee.fromIndex(p,f))});for(const p of g){const f=p.getJulianDay().getSolarDay();f.getYear()===e&&f.getMonth()===t&&(d.find(w=>w.name===p.getName())||d.push({name:p.getName(),date:`${f.getYear()}-${f.getMonth().toString().padStart(2,"0")}-${f.getDay().toString().padStart(2,"0")}`}))}const c=d.sort((p,f)=>new Date(p.date).getDate()-new Date(f.date).getDate());return{month:t,gan:r,zhi:l,ganZhi:`${r}${l}`,tenGod:this.getTenGod(r,n),tenGodZhi:this.getTenGodForBranch(l,n),jieqi:c}}calculateLiuri(e,t,n,i){const r=Le.fromYmdHms(e,t,n,0,0,0).getLunarHour().getEightChar().getDay(),l=r.getHeavenStem().getName(),d=r.getEarthBranch().getName();return{day:n,gan:l,zhi:d,ganZhi:`${l}${d}`,tenGod:this.getTenGod(l,i),tenGodZhi:this.getTenGodForBranch(d,i)}}getTenGodForBranch(e,t){const n=Me[e]?.[0];return n?this.getTenGod(n,t):"未知"}calculateXiaoyun(e,t,n,i){const o=[];for(const p of H.HEAVENLY_STEMS)for(const f of H.EARTHLY_BRANCHES)o.push(p+f);const r=o.indexOf(e);if(r===-1)return"未知";const d=H.HEAVENLY_STEMS.indexOf(n)%2===0,u=t==="男",g=d&&u||!d&&!u;let c;return g?c=(r+i)%60:(c=(r-i)%60,c<0&&(c+=60)),o[c]}calculatePillarLifeStages(e){const t={};for(const n in e){const i=e[n],o=i.gan,r=i.zhi;t[n]=De[o]?.[r]||"无"}return t}getWuxing(e){const t=this.ctg.indexOf(e);if(t!==-1)return this.wxtg[t];const n=this.cdz.indexOf(e);return n!==-1?this.wxdz[n]:"未知"}getGanYinYang(e){const t=this.ctg.indexOf(e);return t===-1?"未知":H.STEM_YINYANG[t]}calculateTenGods(e,t){return Object.fromEntries(Object.entries(e).map(([n,{gan:i}])=>n==="day"?[n,"日主"]:[n,this.getTenGod(i,t)]))}getTenGod(e,t){const n=this.ctg.indexOf(e),i=this.ctg.indexOf(t);return n===-1||i===-1?"未知":[["比肩","劫财","食神","伤官","偏财","正财","七杀","正官","偏印","正印"],["劫财","比肩","伤官","食神","正财","偏财","正官","七杀","正印","偏印"],["偏印","正印","比肩","劫财","食神","伤官","偏财","正财","七杀","正官"],["正印","偏印","劫财","比肩","伤官","食神","正财","偏财","正官","七杀"],["七杀","正官","偏印","正印","比肩","劫财","食神","伤官","偏财","正财"],["正官","七杀","正印","偏印","劫财","比肩","伤官","食神","正财","偏财"],["偏财","正财","七杀","正官","偏印","正印","比肩","劫财","食神","伤官"],["正财","偏财","正官","七杀","正印","偏印","劫财","比肩","伤官","食神"],["食神","伤官","偏财","正财","七杀","正官","偏印","正印","比肩","劫财"],["伤官","食神","正财","偏财","正官","七杀","正印","偏印","劫财","比肩"]][i][n]}calculateHiddenStems(e){return Object.fromEntries(Object.entries(e).map(([t,{zhi:n}])=>[t,Me[n]||[]]))}calculateHiddenTenGods(e,t){return Object.fromEntries(Object.entries(e).map(([n,i])=>[n,i.map(o=>this.getTenGod(o,t))]))}calculateWuxingStrength(e,t){const n={tianGan:12,diZhiBenQi:12,diZhiZhongQi:6,diZhiYuQi:3},i={寅:{木:2,火:1.5,土:.8,金:.6,水:1.2},卯:{木:2.2,火:1.6,土:.7,金:.5,水:1.1},辰:{土:2,金:1.5,水:.8,木:1.2,火:.6},巳:{火:2,土:1.5,金:.8,水:.6,木:1.2},午:{火:2.2,土:1.6,金:.7,水:.5,木:1.1},未:{土:2,金:1.5,水:.8,木:1.2,火:.6},申:{金:2,水:1.5,木:.8,火:.6,土:1.2},酉:{金:2.2,水:1.6,木:.7,火:.5,土:1.1},戌:{土:2,金:1.5,水:.8,木:1.2,火:.6},亥:{水:2,木:1.5,火:.8,土:.6,金:1.2},子:{水:2.2,木:1.6,火:.7,土:.5,金:1.1},丑:{土:2,金:1.5,水:.8,木:1.2,火:.6}},o=e.month.zhi,r=i[o],l={金:0,木:0,水:0,火:0,土:0};for(const M of Object.values(e)){const V=this.getWuxing(M.gan);V!=="未知"&&(l[V]+=n.tianGan)}for(const M of Object.values(e)){const V=M.zhi;(Me[V]||[]).forEach((ie,T)=>{const P=this.getWuxing(ie);P!=="未知"&&(T===0?l[P]+=n.diZhiBenQi:T===1?l[P]+=n.diZhiZhongQi:l[P]+=n.diZhiYuQi)})}const d={...l};for(const M in d)d[M]=Math.round(d[M]*(r[M]||1));const u=Object.values(d).reduce((M,V)=>M+V,0),g={};if(u>0)for(const M in d)g[M]=Math.round(d[M]/u*100);else for(const M in d)g[M]=0;const c=this.getWuxing(e.day.gan),p={金:{allies:["金","土"],enemies:["火","水","木"]},木:{allies:["木","水"],enemies:["金","火","土"]},水:{allies:["水","金"],enemies:["土","木","火"]},火:{allies:["火","木"],enemies:["水","土","金"]},土:{allies:["土","火"],enemies:["木","金","水"]}};if(!p[c])return{scores:d,percentages:g,status:"无法判断"};const f=p[c].allies,v=p[c].enemies,w=f.reduce((M,V)=>M+(d[V]||0),0);v.reduce((M,V)=>M+(d[V]||0),0);let k="均衡";const m=u>0?w/u*100:0;m>60?k="身强":m<20?k="身弱":m>=40&&m<=60?k="中和":m>50?k="偏强":m<30&&(k="偏弱");let _=[],L=[];k==="身强"||k==="偏强"?(_=v,L=f):k==="身弱"||k==="偏弱"?(_=f,L=v):_=p[c].enemies.slice(0,2);const j=Object.entries(l).filter(([M,V])=>V===0).map(([M])=>M),ae=_.map(M=>({wuxing:M,...et[M]})),z=L.map(M=>({wuxing:M,...et[M]}));return{scores:d,percentages:g,status:k,yongShen:_,jiShen:L,missing:j,suggestions:{favorable:ae,unfavorable:z}}}calculateDayunWithTyme(e,t){try{const n=this.calculateTraditionalDayun(e,t);let i="";if(n.startAge!==void 0){const u=e.getSolarDay().getYear()+n.startAge;i=`出生后 ${n.startAge} 年，${u}年起运`}else i="起运时间计算失败";const o=[],r=n.startAge;if(r>0){const u=e.getLunarHour().getEightChar(),g=u.getHour().getName(),c=t===Te.MAN?"男":"女",p=u.getYear().getHeavenStem().getName(),f=this.getGanYinYang(p),v=e.getSolarDay().getYear(),w=[],k=Math.max(1,r);for(let m=1;m<=k;m++){const _=v+m-1,L=this.calculateXiaoyun(g,c,p,m),j=this.calculateLiunian(_,u.getDay().getHeavenStem().getName());w.push({year:_,age:m,ganZhi:j.ganZhi,tenGod:j.tenGod,tenGodZhi:j.tenGodZhi,xiaoyun:{ganZhi:L,tenGod:this.getTenGod(L[0],u.getDay().getHeavenStem().getName()),tenGodZhi:this.getTenGodForBranch(L[1],u.getDay().getHeavenStem().getName())}})}w.length>0&&o.push({age:1,year:w[0].year,ganZhi:"小运",isXiaoyun:!0,type:"小运",years:w})}const l=e.getSolarDay().getYear();for(let u=0;u<12;u++){const g=n.startAge+u*10,c=l+g-1,p=n.dayunList[u];p&&o.push({age:g,year:c,ganZhi:p,isXiaoyun:!1,type:"大运",years:[]})}let d="";if(n.dayunList.length>0){const u=n.dayunList[0][0],g=H.HEAVENLY_STEMS,c=g.indexOf(u);if(c!==-1){const p=g[(c+5)%10];d=`逢 ${u}、${p} 年交运`}else d="交运信息计算失败"}else d="交运信息计算失败";return{startInfo:i,handoverInfo:d,cycles:o}}catch(n){return console.error("大运计算错误:",n),{startInfo:"计算失败",handoverInfo:"计算失败",cycles:[]}}}calculateLifeStages(e,t){const n=De[t]||{};return Object.fromEntries(Object.entries(e).map(([i,{zhi:o}])=>[i,n[o]||"未知"]))}calculateNayin(e){return Object.fromEntries(Object.entries(e).map(([t,{gan:n,zhi:i}])=>[t,zt[n+i]||"未知"]))}calculateWuxingStatus(e){const t=this.getSeasonStatus(e);return t?`木${t.木} 火${t.火} 土${t.土} 金${t.金} 水${t.水}`:"无法确定五行状态"}calculateKongWang(e){return Object.fromEntries(Object.entries(e).map(([t,{gan:n,zhi:i}])=>{const o=this.ctg.indexOf(n),r=this.cdz.indexOf(i);if(o===-1||r===-1)return[t,[]];const l=(10+r-o)%12,d=(11+r-o)%12;return[t,[this.cdz[l],this.cdz[d]]]}))}calculateZiZuo(e){return Object.fromEntries(Object.entries(e).map(([t,{gan:n,zhi:i}])=>{const o=De[n]||{};return[t,o[i]||"未知"]}))}analyzeBaziChart(e,t){const n=e.day.gan,i=this.getWuxing(n),o=e.month.zhi;e.month.gan;const l=this.getSeasonStatus(o)[i],d=l==="旺"||l==="相",u=this.analyzeRoots(e,i),g=this.analyzeSupport(e,n,i),c=this.calculateDayMasterStrength(d,u,g,i,o),p=this.analyzePattern(e,t,n,i,c.strength),f=this.analyzeUsefulGod(e,i,c.strength,p);return{dayMasterStrength:c.strength,dayMasterStatus:c.status,mingGe:p.pattern,patternType:p.type,patternDescription:p.description,favorableElements:f.favorable,unfavorableElements:f.unfavorable,usefulGod:f.useful,avoidGod:f.avoid,circulation:f.circulation,rootAnalysis:u,supportAnalysis:g,seasonalStatus:{month:o,dayMasterStatus:l,isTimely:d}}}analyzeRoots(e,t){const n=[];let i=0;return Object.entries(e).forEach(([o,r])=>{if(this.getWuxing(r.zhi)===t){const d=o==="day"?3:1;n.push({position:o,branch:r.zhi,strength:d}),i+=d}}),{roots:n,totalStrength:i,hasRoot:n.length>0,strongRoot:n.some(o=>o.strength>=3)}}analyzeSupport(e,t,n){const i=[];let o=0;return Object.entries(e).forEach(([r,l])=>{if(r!=="day"&&l.gan&&this.getWuxing(l.gan)===n){const u=l.gan===t?2:1;i.push({position:r,stem:l.gan,strength:u}),o+=u}}),{supporters:i,totalStrength:o,hasSupport:i.length>0}}calculateDayMasterStrength(e,t,n,i,o){let r="中和",l=0;e&&(l+=2),l+=t.totalStrength,l+=n.totalStrength,l>=6?r="太旺":l>=4?r="偏旺":l>=2?r="中和":l>=1?r="偏弱":r="太弱";const u=this.getSeasonStatus(o)[i]||"休";return{strength:r,score:l,status:`日主${i}生于${o}月，${u}`,details:{timely:e,rootStrength:t.totalStrength,supportStrength:n.totalStrength}}}analyzePattern(e,t,n,i,o){const r=e.month.gan;e.month.zhi;const l=this.getTenGod(r,n),d=this.checkSpecialPattern(e,i,o);if(d.isSpecial)return d;let u="正格",g="普通格局",c="命局平和，无明显特殊格局";if(l)switch(l){case"正官":u="正官格",g="官格",c="月干透正官，主贵气，利于仕途功名";break;case"七杀":u="七杀格",g="杀格",c="月干透七杀，主权威，需要制化得宜";break;case"正财":u="正财格",g="财格",c="月干透正财，主富裕，利于经商理财";break;case"偏财":u="偏财格",g="财格",c="月干透偏财，主横财，善于投资经营";break;case"正印":u="正印格",g="印格",c="月干透正印，主学问，利于文化教育";break;case"偏印":u="偏印格",g="印格",c="月干透偏印，主技艺，适合专业技能";break;case"食神":u="食神格",g="食伤格",c="月干透食神，主福禄，性格温和有才华";break;case"伤官":u="伤官格",g="食伤格",c="月干透伤官，主才华，需要适当约束";break;case"比肩":u="建禄格",g="比劫格",c="月干透比肩，主自立，需要财官调节";break;case"劫财":u="劫财格",g="比劫格",c="月干透劫财，主竞争，需要官杀制约";break;default:u="正格",g="普通格局",c="命局平和，五行流通"}const p=this.checkPatternSuccess(e,u,g);return{pattern:u,type:g,description:c,success:p.success,successReason:p.reason,isSpecial:!1}}checkSpecialPattern(e,t,n){return n==="太旺"&&this.countRestraints(e,t)===0?{isSpecial:!0,pattern:"从强格",type:"特殊格局",description:"日主极旺无制，顺其旺势而行",success:!0,successReason:"格局纯粹，顺势而为"}:n==="太弱"&&this.countSupports(e,t)===0?{isSpecial:!0,pattern:"从弱格",type:"特殊格局",description:"日主极弱无助，从其弱势而行",success:!0,successReason:"格局清纯，从弱而行"}:{isSpecial:!1}}checkPatternSuccess(e,t,n){let i=!0,o="格局基本成立";switch(n){case"官格":this.hasInjuryToOfficial(e)&&(i=!1,o="伤官见官，格局受损");break;case"财格":this.hasRobberyToWealth(e)&&(i=!1,o="比劫夺财，格局不清");break}return{success:i,reason:o}}analyzeUsefulGod(e,t,n,i){const o=[],r=[];let l="",d="",u="";switch(n){case"太旺":const g=this.getWuxingChildren(t),c=this.getWuxingEnemies(t);o.push(...g,...c),r.push(t,...this.getWuxingParents(t)),l=g[0]||c[0]||"食神",d=t,u="身旺用食伤泄秀，或用官杀制身";break;case"偏旺":o.push(...this.getWuxingChildren(t)),r.push(t,...this.getWuxingParents(t)),l=this.getWuxingChildren(t)[0]||"食神",d=t,u="身旺喜泄，食伤为用";break;case"中和":o.push(t),l="调候",u="命局中和，重在调候和流通";break;case"偏弱":o.push(t,...this.getWuxingParents(t)),r.push(...this.getWuxingEnemies(t),...this.getWuxingChildren(t)),l=this.getWuxingParents(t)[0]||t,d=this.getWuxingEnemies(t)[0]||"官杀",u="身弱喜印比帮扶";break;case"太弱":i.pattern==="从弱格"?(o.push(...this.getWuxingEnemies(t),...this.getWuxingChildren(t)),r.push(t,...this.getWuxingParents(t)),l=this.getWuxingEnemies(t)[0]||"官杀",d=t,u="从弱格，顺其弱势，忌帮扶"):(o.push(t,...this.getWuxingParents(t)),r.push(...this.getWuxingEnemies(t)),l=this.getWuxingParents(t)[0]||t,d=this.getWuxingEnemies(t)[0]||"官杀",u="身弱急需印比帮扶");break}return{favorable:[...new Set(o)],unfavorable:[...new Set(r)],useful:l,avoid:d,circulation:u}}getWuxingChildren(e){return{木:["火"],火:["土"],土:["金"],金:["水"],水:["木"]}[e]||[]}getWuxingParents(e){return{火:["木"],土:["火"],金:["土"],水:["金"],木:["水"]}[e]||[]}getWuxingEnemies(e){return{木:["金"],火:["水"],土:["木"],金:["火"],水:["土"]}[e]||[]}countRestraints(e,t){let n=0;const i=this.getWuxingEnemies(t);return Object.values(e).forEach(o=>{(i.includes(this.getWuxing(o.gan))||i.includes(this.getWuxing(o.zhi)))&&n++}),n}countSupports(e,t){let n=0;const i=this.getWuxingParents(t);return Object.values(e).forEach(o=>{(this.getWuxing(o.gan)===t||this.getWuxing(o.zhi)===t||i.includes(this.getWuxing(o.gan))||i.includes(this.getWuxing(o.zhi)))&&n++}),n}hasInjuryToOfficial(e){return!1}hasRobberyToWealth(e){return!1}getGanYinYang(e){return["甲","丙","戊","庚","壬"].includes(e)?"阳":"阴"}getSeasonStatus(e){return Xt[e]||{}}getMonthCommander(e,t){const n=en[t];if(!n)return"未知";try{const i=e.getSolarDay().getYear(),o=e.getJulianDay();let r=null;const l=[];for(let g=0;g<24;g++)l.push(Ee.fromIndex(i,g)),l.push(Ee.fromIndex(i-1,g));for(const g of l){const c=g.getJulianDay();g.isJie()&&c<=o&&(!r||c>r.getJulianDay())&&(r=g)}if(!r)return"未知(节气未找到)";const d=o-r.getJulianDay();let u=0;for(const g of n)if(u+=g[1],d<u)return g[0];return n[n.length-1][0]}catch(i){return console.error("获取月令司令失败:",i),"计算出错"}}calculateSeasonInfo(e){try{const t=[],n=e.getSolarDay().getYear(),i=e.getJulianDay();for(let c=0;c<24;c++){const p=Ee.fromIndex(n,c),f=p.getJulianDay(),v=f.getSolarDay();t.push({name:p.getName(),date:`${v.getYear()}-${v.getMonth().toString().padStart(2,"0")}-${v.getDay().toString().padStart(2,"0")}`,jd:f.getDay(),index:c,isJie:p.isJie()})}let o=null,r=null;for(let c=0;c<t.length;c++){const p=t[c];if(p.jd<=i)o=p;else{r=p;break}}let l=0,d=0;o&&(l=Math.floor(i-o.jd)),r&&(d=Math.floor(r.jd-i));const g=o?{0:"冬",1:"冬",2:"春",3:"春",4:"春",5:"春",6:"春",7:"春",8:"夏",9:"夏",10:"夏",11:"夏",12:"夏",13:"夏",14:"秋",15:"秋",16:"秋",17:"秋",18:"秋",19:"秋",20:"冬",21:"冬",22:"冬",23:"冬"}[o.index]:"未知";return{currentJieqi:o?o.name:"未知",nextJieqi:r?r.name:"未知",daysSincePrev:l,daysToNext:d,currentSeason:g,jieqiList:t.map(c=>({name:c.name,date:c.date}))}}catch(t){return console.error("节气信息计算错误:",t),{currentJieqi:"计算错误",nextJieqi:"计算错误",daysSincePrev:0,daysToNext:0,currentSeason:"未知",jieqiList:[]}}}calculateTraditionalDayun(e,t){try{const n=e.getSolarDay().getYear(),i=e.getJulianDay(),o=e.getLunarHour().getEightChar(),r=o.getYear().getHeavenStem().getName(),l=o.getMonth().getHeavenStem().getName(),d=o.getMonth().getEarthBranch().getName(),g=H.HEAVENLY_STEMS.indexOf(r)%2===0,c=t===Te.MAN,p=g&&c||!g&&!c,f=this.calculateStartAge(e,t,r),v=this.generateDayunList(l,d,p);return{startAge:f,dayunList:v,isShun:p,yearGan:r,monthGanZhi:l+d}}catch(n){return console.error("传统大运计算错误:",n),{startAge:0,dayunList:[],isShun:!0,yearGan:"",monthGanZhi:""}}}calculateStartAge(e,t,n){try{const i=e.getSolarDay().getYear(),o=e.getJulianDay(),l=H.HEAVENLY_STEMS.indexOf(n)%2===0,d=t===Te.MAN,u=l&&d||!l&&!d,g=[];for(let v of[i-1,i,i+1])for(let w=0;w<24;w++){const k=Ee.fromIndex(v,w);k.isJie()&&g.push({term:k,julianDay:k.getJulianDay(),name:k.getName()})}g.sort((v,w)=>v.julianDay-w.julianDay);let c=null,p=0;if(u){for(const v of g)if(v.julianDay>o){c=v,p=v.julianDay-o;break}}else for(let v=g.length-1;v>=0;v--){const w=g[v];if(w.julianDay<o){c=w,p=o-w.julianDay;break}}if(!c)return console.warn("未找到目标节气，使用默认起运岁数"),8;const f=Math.ceil(p/3);return console.log(`起运计算详情:
        性别: ${d?"男":"女"}
        年干: ${n} (${l?"阳":"阴"})
        顺逆: ${u?"顺排":"逆排"}
        目标节气: ${c.name}
        天数差: ${p}
        起运岁数: ${f}`),Math.max(1,f)}catch(i){return console.error("起运岁数计算错误:",i),8}}generateDayunList(e,t,n){const i=H.HEAVENLY_STEMS,o=H.EARTHLY_BRANCHES,r=i.indexOf(e),l=o.indexOf(t);if(r===-1||l===-1)return console.error("月柱干支索引错误"),[];const d=[];for(let u=0;u<12;u++){let g,c;n?(g=(r+u+1)%10,c=(l+u+1)%12):(g=(r-u-1+10)%10,c=(l-u-1+12)%12);const p=i[g],f=o[c];d.push(p+f)}return d}}const pe=new sn;function an(s){const e=new Date().getFullYear();for(let t=0;t<s.length;t++){const n=s[t],i=n.year,o=i+9;if(e>=i&&e<=o)return{current:n,previous:t>0?s[t-1]:null,future:s.slice(t+1)}}return{current:s[0]||null,previous:null,future:s.slice(1)}}function rn(s,e){let t=`
### 大运详细分析
`;const n=pe.getTenGod(s.ganZhi[0],e),i=pe.getTenGodForBranch(s.ganZhi[1],e);t+=`* **当前大运**: ${s.ganZhi} (天干:${n}, 地支:${i})
`;const o=new Date().getFullYear(),r=o-s.year+1;t+=`* **大运进度**: 第${r}年/共10年
`;const l=on(s,o,e);return t+=`
* **三大运流年分析**:
`,l.forEach(d=>{const u=d.years[0].year,g=d.years[d.years.length-1].year,c=`${u}-${g}年`;t+=`
  **${d.name}** (${d.ganZhi}, ${c}):
`,d.years.forEach(p=>{const v=p.year===o?" ← 当前":"";t+=`    - ${p.year}年(${p.age}岁): ${p.ganZhi}(${p.tenGod})${v}
`})}),t}function on(s,e,t){const n=[],i=s.years.filter(o=>o.year>=e);i.length>0&&n.push({name:"当前大运",ganZhi:s.ganZhi,years:i});for(let o=1;o<=2;o++){const r=s.year+o*10,l=ln(s.ganZhi,o),d=dn(s,e),u=[];for(let g=0;g<10;g++){const c=r+g,p=d?d+(c-e):null,f=un(c),v=pe.getTenGod(f[0],t);u.push({year:c,age:p,ganZhi:f,tenGod:v})}n.push({name:o===1?"下一大运":"下下大运",ganZhi:l,years:u})}return n}function ln(s,e){const t=["甲","乙","丙","丁","戊","己","庚","辛","壬","癸"],n=["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"],i=s[0],o=s[1],r=t.indexOf(i),l=n.indexOf(o),d=(r+e)%10,u=(l+e)%12;return t[d]+n[u]}function cn(s,e){let t=`
### 一生大运详细分析
`;const n=new Date().getFullYear();t+=`* **大运总览**: 共${s.length}个大运，从${s[0].year}年起运
`;const i=s.findIndex(o=>n>=o.year&&n<=o.year+9);return t+=`
* **所有大运详细信息**:
`,s.forEach((o,r)=>{const l=o.year,d=l+9,u=o.years&&o.years.length>0?o.years[0].age:null,g=u?u+9:null,c=pe.getTenGod(o.ganZhi[0],e),p=pe.getTenGodForBranch(o.ganZhi[1],e),v=r===i?" ← 当前大运":"",w=u&&g?`(${u}-${g}岁)`:"";t+=`
  **第${r+1}个大运** ${o.ganZhi}(${c}) ${l}-${d}年${w}${v}:
`,t+=`    天干:${c}, 地支:${p}
`,o.years&&o.years.length>0?(t+=`    流年详情:
`,o.years.forEach(k=>{const _=k.year===n?" ← 当前年份":"";t+=`      ${k.year}年(${k.age}岁): ${k.ganZhi}(${k.tenGod})${_}
`})):t+=`    流年概况: ${l}-${d}年，共10年
`}),t+=`
* **人生阶段总结**:
`,t+=`  - 青年期: 第1-3个大运 (约${s[0]?.year||"起运"}-${s[2]?.year+9||"未知"}年)
`,s.length>3&&(t+=`  - 壮年期: 第4-6个大运 (约${s[3]?.year||"未知"}-${s[5]?.year+9||"未知"}年)
`),s.length>6&&(t+=`  - 中年期: 第7-9个大运 (约${s[6]?.year||"未知"}-${s[8]?.year+9||"未知"}年)
`),s.length>9&&(t+=`  - 晚年期: 第10个大运以后 (${s[9]?.year||"未知"}年以后)
`),t}function un(s){const e=["甲","乙","丙","丁","戊","己","庚","辛","壬","癸"],t=["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"],i=s-1984,o=i%10,r=i%12;return e[o]+t[r]}function dn(s,e){const t=s.years.find(n=>n.year===e);return t?t.age:null}function hn(s){try{const e=[{start:"立春",end:"惊蛰"},{start:"惊蛰",end:"清明"},{start:"清明",end:"立夏"},{start:"立夏",end:"芒种"},{start:"芒种",end:"小暑"},{start:"小暑",end:"立秋"},{start:"立秋",end:"白露"},{start:"白露",end:"寒露"},{start:"寒露",end:"立冬"},{start:"立冬",end:"大雪"},{start:"大雪",end:"小寒"},{start:"小寒",end:"立春"}],t={};for(const i of[s,s+1]){const o=pe.calculateSeasonInfo(Le.fromYmdHms(i,6,1,0,0,0));o&&o.jieqiList&&o.jieqiList.forEach(r=>{const l=new Date(r.date);l.getFullYear()===i&&(t[r.name]={month:l.getMonth()+1,day:l.getDate(),year:i})})}const n=[];for(let i=0;i<12;i++){const{start:o,end:r}=e[i],l=t[o],d=t[r];if(l&&d){let u,g;if(i===11){u=`${l.month}月${l.day}日`;const c=t.立春;if(c&&c.year===s+1){const p=c.day-1;g=`${c.month}月${p>0?p:"月底"}日`}else g="2月3日"}else{u=`${l.month}月${l.day}日`;const c=d.day-1;g=`${d.month}月${c>0?c:"月底"}日`}n.push(`${u}-${g}`)}else{const u=["2月4日-3月5日","3月6日-4月4日","4月5日-5月5日","5月6日-6月5日","6月6日-7月6日","7月7日-8月7日","8月8日-9月7日","9月8日-10月7日","10月8日-11月6日","11月7日-12月6日","12月7日-1月5日","1月6日-2月3日"];n.push(u[i])}}return n}catch(e){return console.warn("计算月份日期范围失败:",e),["2月4日-3月5日","3月6日-4月4日","4月5日-5月5日","5月6日-6月5日","6月6日-7月6日","7月7日-8月7日","8月8日-9月7日","9月8日-10月7日","10月8日-11月6日","11月7日-12月6日","12月7日-1月5日","1月6日-2月3日"]}}function we(s,e=null){if(!s)return"无法获取八字数据。";let t=`### 基本信息
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
`;const r=mn(o);r.length>0&&(t+=`* **天干关系**: ${r.join("、")}
`);const l=pn(o);l.length>0&&(t+=`* **地支关系**: ${l.join("、")}
`);const d=yn(o);d.length>0&&(t+=`* **整柱关系**: ${d.join("、")}
`);const u=fn(o);u.length>0&&(t+=`* **五行生克**: ${u.join("、")}
`)}if(s.luckInfo&&s.luckInfo.cycles&&s.luckInfo.cycles.length>0){t+=`
### 大运信息
`,s.luckInfo.startInfo&&(t+=`* **起运**: ${s.luckInfo.startInfo}
`);const o=s.luckInfo.cycles.filter(l=>!l.isXiaoyun),r=an(o);if(r.current){const l=r.current,d=s.dayMaster.gan,u=pe.getTenGod(l.ganZhi[0],d);if(t+=`* **当前大运**: ${l.ganZhi}(${u})`,l.year){const c=l.year+9;t+=` ${l.year}-${c}年`}t+=`
`;const g=r.future.slice(0,2).map(c=>{const p=pe.getTenGod(c.ganZhi[0],d);let f=`${c.ganZhi}(${p})`;if(c.year){const v=c.year+9;f+=`${c.year}-${v}年`}return f}).join(", ");g&&(t+=`* **未来大运**: ${g}
`),e&&(e.id==="ai-current-luck"||e.id==="ai-this-year")&&(t+=rn(l,d)),e&&e.id==="ai-lifetime-fortune"&&(t+=cn(o,d))}}if(s.liunian&&s.liunian.length>0){const o=new Date().getFullYear(),r=s.liunian.find(l=>l.year===o);r&&(t+=`
### 流年信息
* **今年**: ${r.ganZhi}(${o}年)
`)}if(e&&e.id==="ai-year-analysis"&&(t+=`
### 逐月运势分析参考
`,["正月","二月","三月","四月","五月","六月","七月","八月","九月","十月","冬月","腊月"].forEach(r=>{t+=`* **${r}**: 请根据流年与月令的关系进行分析
`})),e&&e.id==="ai-monthly-fortune"){t+=`
### 今年流月信息
`;const o=new Date().getFullYear(),r=s.dayMaster.gan,l=["正月","二月","三月","四月","五月","六月","七月","八月","九月","十月","冬月","腊月"],d=hn(o);for(let u=1;u<=12;u++)try{const g=pe.calculateLiuyue(o,u,r),c=l[u-1],p=d[u-1]||"日期计算失败";t+=`* **${c}**(${p}): ${g.ganZhi}(${g.tenGod})
`}catch(g){console.warn(`计算${u}月流月失败:`,g);const c=l[u-1];t+=`* **${c}**: 计算失败
`}}return t}function gn(s){if(!s||!s.selectedDate)return"未指定具体日期";const{selectedDate:e,selectedTime:t}=s;let n=`${e.getFullYear()}年${e.getMonth()+1}月${e.getDate()}日`;return t&&(n+=` ${t}`),n}function mn(s){const e=[],t={甲:"己",乙:"庚",丙:"辛",丁:"壬",戊:"癸"},n={甲:"庚",乙:"辛",丙:"壬",丁:"癸"},i={甲:"木",乙:"木",丙:"火",丁:"火",戊:"土",己:"土",庚:"金",辛:"金",壬:"水",癸:"水"},o={金:"木",木:"土",土:"水",水:"火",火:"金"};for(let r=0;r<4;r++)for(let l=r+1;l<4;l++){const d=s[r][0],u=s[l][0],g=["年","月","日","时"];if(t[d]===u||t[u]===d)e.push(`${g[r]}${g[l]}天干${d}${u}相合`);else if(n[d]===u||n[u]===d)e.push(`${g[r]}${g[l]}天干${d}${u}相冲`);else{const c=i[d],p=i[u];o[c]===p?e.push(`${g[r]}${g[l]}天干${d}(${c})克${u}(${p})`):o[p]===c&&e.push(`${g[r]}${g[l]}天干${u}(${p})克${d}(${c})`)}}return e}function pn(s){const e=[],t=s.map(c=>c[1]),n=["年","月","日","时"],i={子:"午",丑:"未",寅:"申",卯:"酉",辰:"戌",巳:"亥"},o={子:"丑",寅:"亥",卯:"戌",辰:"酉",巳:"申",午:"未"},r={子:"未",丑:"午",寅:"巳",卯:"辰",申:"亥",酉:"戌"},l={子:"酉",卯:"午",辰:"丑",未:"戌",寅:"亥",巳:"申"},d={申子辰:"水局",亥卯未:"木局",寅午戌:"火局",巳酉丑:"金局"};for(let c=0;c<4;c++)for(let p=c+1;p<4;p++){const f=t[c],v=t[p];i[f]===v||i[v]===f?e.push(`${n[c]}${n[p]}地支${f}${v}相冲`):o[f]===v||o[v]===f?e.push(`${n[c]}${n[p]}地支${f}${v}六合`):r[f]===v||r[v]===f?e.push(`${n[c]}${n[p]}地支${f}${v}相害`):(l[f]===v||l[v]===f)&&e.push(`${n[c]}${n[p]}地支${f}${v}相破`)}const u=[...new Set(t)];for(const[c,p]of Object.entries(d)){const f=c.split(""),v=f.filter(w=>u.includes(w)).length;if(v>=2){const w=f.filter(k=>u.includes(k));e.push(`地支${w.join("")}${v===3?"三合":"半合"}${p}`)}}return u.filter(c=>["寅","巳","申"].includes(c)).length>=2&&e.push("寅巳申无恩之刑"),u.filter(c=>["丑","戌","未"].includes(c)).length>=2&&e.push("丑戌未恃势之刑"),u.includes("子")&&u.includes("卯")&&e.push("子卯无礼之刑"),["辰","午","酉","亥"].forEach(c=>{t.filter(p=>p===c).length>1&&e.push(`${c}${c}自刑`)}),e}function yn(s){const e=[],t=["年","月","日","时"],n={甲:"木",乙:"木",丙:"火",丁:"火",戊:"土",己:"土",庚:"金",辛:"金",壬:"水",癸:"水",子:"水",丑:"土",寅:"木",卯:"木",辰:"土",巳:"火",午:"火",未:"土",申:"金",酉:"金",戌:"土",亥:"水"},i={金:"木",木:"土",土:"水",水:"火",火:"金"},o={甲:"庚",乙:"辛",丙:"壬",丁:"癸"},r={子:"午",丑:"未",寅:"申",卯:"酉",辰:"戌",巳:"亥"};for(let u=0;u<4;u++){const g=s[u][0],c=s[u][1],p=n[g],f=n[c];i[p]===f&&e.push(`${t[u]}柱${g}${c}盖头(天干克地支)`),i[f]===p&&e.push(`${t[u]}柱${g}${c}截脚(地支克天干)`)}for(let u=0;u<4;u++)for(let g=u+1;g<4;g++){const c=s[u],p=s[g],f=o[c[0]]===p[0]||o[p[0]]===c[0],v=r[c[1]]===p[1]||r[p[1]]===c[1];f&&v&&e.push(`${t[u]}${t[g]}柱${c.join("")}与${p.join("")}天克地冲(反吟)`)}const d=s.map(u=>u.join("")).reduce((u,g)=>(u[g]=(u[g]||0)+1,u),{});for(const u in d)d[u]>1&&e.push(`${u}柱重复出现${d[u]}次(伏吟)`);return e}function fn(s){const e=[],t={甲:"木",乙:"木",丙:"火",丁:"火",戊:"土",己:"土",庚:"金",辛:"金",壬:"水",癸:"水",子:"水",丑:"土",寅:"木",卯:"木",辰:"土",巳:"火",午:"火",未:"土",申:"金",酉:"金",戌:"土",亥:"水"},n={木:0,火:0,土:0,金:0,水:0};s.forEach(l=>{const d=t[l[0]],u=t[l[1]];n[d]++,n[u]++});const i=Object.entries(n).filter(([l,d])=>d>=3).map(([l])=>l),o=Object.entries(n).filter(([l,d])=>d===0).map(([l])=>l);return i.length>0&&e.push(`五行偏强: ${i.join("、")}`),o.length>0&&e.push(`五行缺失: ${o.join("、")}`),vn(n)?e.push("五行流通顺畅"):e.push("五行流通受阻"),e}function vn(s){const e=["木","火","土","金","水"];let t=0,n=0;for(let i=0;i<e.length*2;i++){const o=e[i%e.length];s[o]>0?(t++,n=Math.max(n,t)):t=0}return n>=3}const Oe={master:`你是一位学贯古今的命理宗师，既精通《滴天髓》、《三命通会》等八字古籍，也了解现代社会的心理学和职业发展。请根据以下信息，为用户提供一份详尽的分析。

**八字信息:**
[CHART_DATA]

---

[PROMPT_BODY]
`,build:(s,e,t="")=>{e===void 0&&(console.warn("PROMPT_BUILDER.build received an undefined question. Defaulting to empty string."),e="");let n=`**问题:**
${e}`;return t&&(n+=`

**分析要求:**
${t}`),Oe.master.replace("[CHART_DATA]",s).replace("[PROMPT_BODY]",n)}},tt={single:[{id:"ai-mingge-zonglun",text:"命格总论",prompt:`

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
- 长期成功的保障措施`},{id:"ai-compat-custom",text:"自定义...",prompt:""}]};function xn(s,e,t,n=null){const i=t?we(t,e):"无法获取命盘数据。",o=e.dataset.prompt,r=e.id;if(r==="ask-ai-with-date"){const l=gn(n),d=document.getElementById("customQuestion")?.value?.trim()||"",u=s&&s!=="选定日期..."?s:d,g=u?`在${l}这个时间点, ${u}`:`请详细分析${l}的运势。`;return Oe.build(i,g,"请结合用户提供的具体日期进行分析，越详细越好。")}if(r==="ai-mingge-zonglun"){let l=o.replace("[八字信息]",i);return s!=="命格总论"&&(l=l.replace("为用户提供一份详尽的八字命局解读。",`为用户提供一份关于"${s}"的详尽解读。`)),l}return Oe.build(i,s,o)}const $e={apiUrl:{}.VITE_AI_API_URL||"https://flow.ovo.gs/ai",apiKey:{}.VITE_AI_API_KEY||"",model:{}.VITE_AI_MODEL||"sydf-v1-250520",maxTokens:8192,temperature:.7,debug:!0};console.log("🔧 AI 配置调试信息:",{apiUrl:$e.apiUrl,model:$e.model,hasApiKey:!!$e.apiKey,envVars:{VITE_AI_API_URL:{}.VITE_AI_API_URL||"未设置",VITE_AI_MODEL:{}.VITE_AI_MODEL||"未设置",VITE_AI_API_KEY:{}.VITE_AI_API_KEY?"已设置":"未设置"}});class dt{constructor(){this.currentRequest=null,this.updateConfig(),console.log("🔧 AI Service 初始化完成:",{apiUrl:this.apiUrl,model:this.model,hasApiKey:!!this.apiKey&&this.apiKey!=="",isProd:!0,currentDomain:typeof window<"u"?window.location.hostname:"unknown"})}updateConfig(){let e=null;try{const n=localStorage.getItem("ai_api_config");n&&(e=JSON.parse(n))}catch(n){console.warn("读取用户AI配置失败:",n)}e&&e.apiUrl&&e.apiKey&&e.model?(this.apiUrl=e.apiUrl,this.apiKey=e.apiKey,this.model=e.model,this.maxTokens=e.maxTokens||8192,console.log("✅ 使用用户配置的AI设置")):(this.apiUrl=$e.apiUrl,this.apiKey=$e.apiKey,this.model=$e.model,this.maxTokens=$e.maxTokens,console.log("📋 使用默认AI配置"));const t=this.validateCurrentConfig();t.isValid||console.warn("⚠️ AI 配置问题:",t.issues)}validateCurrentConfig(){const e=[],t=this.apiUrl.includes("flow.ovo.gs");return!t&&(!this.apiKey||this.apiKey==="")&&e.push("API 密钥未设置"),this.apiUrl||e.push("API 端点未设置"),this.model||e.push("模型名称未设置"),{isValid:e.length===0,issues:e,isWorkerBackend:t}}refreshConfig(){this.updateConfig(),console.log("🔄 AI配置已刷新")}async*queryAI(e,t={}){try{this.updateConfig(),this.currentRequest&&this.currentRequest.abort();const n=new AbortController;this.currentRequest=n;const i=this.apiUrl.includes("flow.ovo.gs");let o;i?o={prompt:e,model:this.model}:o={model:this.model,messages:[{role:"user",content:e}],max_tokens:t.maxTokens||8192,temperature:t.temperature||.7,stream:!0};const r={"Content-Type":"application/json"};this.apiKey&&this.apiKey!==""&&!this.apiUrl.includes("flow.ovo.gs")&&(r.Authorization=`Bearer ${this.apiKey}`);const l=await fetch(this.apiUrl,{method:"POST",headers:r,body:JSON.stringify(o),signal:n.signal});if(!l.ok){let c="AI服务暂时不可用，请稍后再试";throw l.status===429?c="请求过于频繁，请稍等片刻再试":l.status>=500?c="服务器暂时繁忙，请稍后再试":l.status===401&&(c="API 密钥无效"),new Error(`${c} (状态码: ${l.status})`)}if(!l.body)throw new Error("Response body is null");const d=l.body.getReader(),u=new TextDecoder;let g="";try{for(;;){const{done:c,value:p}=await d.read();if(c){if(g.trim()){const v=this.parseStreamChunk(g);v&&(yield v)}break}g+=u.decode(p,{stream:!0});const f=g.split(`
`);g=f.pop()||"";for(const v of f){const w=this.parseStreamChunk(v);w&&(yield w)}}}finally{d.releaseLock(),this.currentRequest=null}}catch(n){throw this.currentRequest=null,n.name!=="AbortError"&&console.error("AI 请求失败:",n),n}}parseStreamChunk(e){const t=e.trim();if(!t||!t.startsWith("data: "))return null;const n=t.slice(6);if(n==="[DONE]")return null;try{const i=JSON.parse(n);if(i.choices&&i.choices[0]&&i.choices[0].delta&&i.choices[0].delta.content)return i.choices[0].delta.content}catch(i){console.debug("跳过非 JSON 数据:",n,i)}return null}cancelRequest(){this.currentRequest&&(this.currentRequest.abort(),this.currentRequest=null)}buildBaziPrompt(e,t,n=""){let o=`你是一位学贯古今的命理宗师，既精通《滴天髓》、《三命通会》等八字古籍，也了解现代社会的心理学和职业发展。请基于以下专业的八字干支关系信息，为用户提供一份详尽的分析。

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

请确保分析内容专业深入，指导建议实用可行，最终目的是帮助双方建立更和谐的关系。`}getPromptConfig(){return tt}buildPrompt(e,t,n,i=null){return xn(e,t,n,i)}buildPromptFromConfig(e,t,n){const i=tt.single.find(o=>o.id===t.id);if(i){const o=n?we(n,t):"无法获取命盘数据。",r=new Date().toLocaleString("zh-CN");return t.id==="ai-mingge-zonglun"?i.prompt.replace("[八字信息]",o):`你是一位学贯古今的命理宗师，既精通《滴天髓》、《三命通会》等八字古籍，也了解现代社会的心理学和职业发展。请根据以下信息，为用户提供一份详尽的分析。

**当前时间:** ${r}

**八字信息:**
${o}

**问题:** ${e}

**分析要求:**
${i.prompt}`}return this.buildBaziPrompt(we(n,t),e)}}const fe=new dt,Sn=Object.freeze(Object.defineProperty({__proto__:null,AIService:dt,aiService:fe},Symbol.toStringTag,{value:"Module"}));function _n(){const s=D(""),e=D(!1),t=D("");return{aiResponse:s,isAIThinking:e,aiError:t,askAI:async(o,r="custom",l,d,u=!1)=>{if(!d){t.value="请先进行排盘计算",ge("请先进行排盘计算");return}e.value=!0,t.value="",u||(s.value="");try{const g=l(o,r,d);for await(const c of fe.queryAI(g))s.value+=c;e.value=!1}catch(g){console.error("AI分析失败:",g),t.value=g.message||"AI分析失败",ge(t.value),e.value=!1}},clearAIResponse:()=>{s.value="",t.value=""}}}const Ge=at("ziWei",()=>{const s=Qt({isLunar:!1}),{person1:e,person2:t,enableSecondPerson:n,result1:i,result2:o,isCalculating:r,calculationError:l,canCalculate:d,hasResults:u,resetData:g}=s,c=_n(),{aiResponse:p,isAIThinking:f,aiError:v,askAI:w,clearAIResponse:k}=c,m=he(()=>Fe(i.value)),_=he(()=>Fe(o.value)),L=async()=>{if(!d.value)return ge("请填写完整的出生信息"),!1;if(r.value)return!1;r.value=!0,l.value="";const P="ziwei-calculation";try{return ye.showLoading("正在计算紫薇斗数...",P),ye.updateLoadingMessage("正在计算第一人紫薇斗数...",P),i.value=We(parseInt(e.value.year),parseInt(e.value.month),parseInt(e.value.day),parseInt(e.value.timeIndex),e.value.gender,e.value.isLunar),n.value?(ye.updateLoadingMessage("正在计算第二人紫薇斗数...",P),o.value=We(parseInt(t.value.year),parseInt(t.value.month),parseInt(t.value.day),parseInt(t.value.timeIndex),t.value.gender,t.value.isLunar)):o.value=null,ye.hideLoading(P),ke("紫薇斗数计算完成！"),!0}catch(N){ye.hideLoading(P),console.error("紫薇斗数计算失败:",N);const B=N.message||"紫薇斗数计算失败，请检查输入信息";return l.value=B,ge(B),Re.reportError(N,"紫薇斗数计算"),!1}finally{r.value=!1}},j=async(P,N="custom",B=!1)=>{const K={person1:m.value,person2:n.value?_.value:null,enableSecondPerson:n.value};await w(P,N,(W,ue,de)=>de.enableSecondPerson&&de.person2?Lt(W,de.person1,de.person2):Et(ue,W,de.person1),K,B)},ae=()=>{g(),k()},z=()=>{i.value=null,o.value=null,l.value="",p.value="",v.value="",r.value=!1,f.value=!1,qt(),Ft(),T()},M=()=>n.value&&o.value?Xe(e.value,t.value):i.value?Xe(e.value):window.location.origin+window.location.pathname,V=async()=>{try{const P=Wt();if(P)return e.value={...e.value,...P.person1},t.value={...t.value,...P.person2},n.value=!0,await L(),!0;const N=Ht();if(N)return e.value={...e.value,...N},await L(),!0}catch(P){console.error("从URL恢复紫薇斗数数据失败:",P)}return!1},X=()=>{try{n.value&&d.value?Vt(e.value,t.value):d.value&&Zt(e.value)}catch(P){console.error("保存紫薇斗数数据到URL失败:",P)}},ie=(P,N=null)=>{try{let B="紫薇排盘";N?B=`${P||"第一人"}与${N||"第二人"}的紫薇合盘分析`:P&&(B=`${P}的紫薇排盘`),document.title=B;const K=document.querySelector('meta[property="og:title"]');K&&K.setAttribute("content",B);const te=document.querySelector('meta[name="description"]');if(te&&P){let W="专业的AI紫薇斗数排盘和命理分析工具";N?W=`${P}与${N}的紫薇斗数合盘分析，专业AI命理解读`:W=`${P}的紫薇斗数排盘结果，专业AI命理分析`,te.setAttribute("content",W)}}catch(B){console.error("更新页面标题失败:",B)}},T=()=>{try{document.title="紫薇排盘";const P=document.querySelector('meta[property="og:title"]');P&&P.setAttribute("content","紫薇排盘");const N=document.querySelector('meta[name="description"]');N&&N.setAttribute("content","专业的AI紫薇斗数排盘和命理分析工具")}catch(P){console.error("重置页面标题失败:",P)}};return Ie([e,t,n],()=>{X()},{deep:!0}),{person1:e,person2:t,enableSecondPerson:n,ziWeiResult1:i,ziWeiResult2:o,isCalculating:r,calculationError:l,aiResponse:p,isAIThinking:f,aiError:v,canCalculate:d,hasResults:u,displayData1:m,displayData2:_,calculateZiWei:L,askAI:j,resetData:ae,clearResults:z,clearAIResponse:k,restoreDataFromUrl:V,generateShareUrl:M,updatePageTitle:ie,resetPageTitle:T}});const In={class:"input-card"},$n={class:"person-section"},bn={class:"form-group"},wn={class:"custom-date-row"},kn={class:"custom-date-field"},An={class:"custom-date-field"},Pn={class:"custom-date-field"},Cn={class:"form-group"},Tn=["value"],En={class:"form-group"},Ln={class:"gender-buttons"},Un={key:0,class:"error-message"},Gn={class:"compatibility-section"},Nn={class:"compatibility-toggle"},jn={key:1,class:"person-section second-person"},Mn={class:"form-group"},Dn={class:"custom-date-row"},Rn={class:"custom-date-field"},Bn={class:"custom-date-field"},On={class:"custom-date-field"},Yn={class:"form-group"},Zn=["value"],Hn={class:"form-group"},qn={class:"gender-buttons"},Kn=["disabled"],Jn={__name:"ZiWeiForm",setup(s){const e=Ge(),t=[{name:"早子时",range:"00:00-01:00"},{name:"丑时",range:"01:00-03:00"},{name:"寅时",range:"03:00-05:00"},{name:"卯时",range:"05:00-07:00"},{name:"辰时",range:"07:00-09:00"},{name:"巳时",range:"09:00-11:00"},{name:"午时",range:"11:00-13:00"},{name:"未时",range:"13:00-15:00"},{name:"申时",range:"15:00-17:00"},{name:"酉时",range:"17:00-19:00"},{name:"戌时",range:"19:00-21:00"},{name:"亥时",range:"21:00-23:00"},{name:"晚子时",range:"23:00-24:00"}],n=()=>{if(e.enableSecondPerson)if(e.person1.name||e.person2.name){const o=e.person1.name||"第一人",r=e.person2.name||"第二人";e.updatePageTitle(o,r)}else e.resetPageTitle();else e.person1.name?e.updatePageTitle(e.person1.name):e.resetPageTitle()};Ie([()=>e.person1.name,()=>e.person2.name,()=>e.enableSecondPerson],()=>{n()},{immediate:!0});const i=async()=>{await e.calculateZiWei()};return(o,r)=>ee((S(),I("div",In,[r[29]||(r[29]=a("h1",null,"紫薇斗数排盘",-1)),a("div",$n,[a("div",bn,[r[15]||(r[15]=a("label",{for:"name"},"姓名（选填）",-1)),ee(a("input",{id:"name","onUpdate:modelValue":r[0]||(r[0]=l=>A(e).person1.name=l),type:"text",placeholder:"请输入姓名"},null,512),[[ce,A(e).person1.name]])]),a("div",wn,[a("div",kn,[r[16]||(r[16]=a("label",{for:"year"},"年",-1)),ee(a("input",{id:"year","onUpdate:modelValue":r[1]||(r[1]=l=>A(e).person1.year=l),type:"number",placeholder:"2000",min:"1900",max:"2100",class:"custom-date-input"},null,512),[[ce,A(e).person1.year]])]),a("div",An,[r[17]||(r[17]=a("label",{for:"month"},"月",-1)),ee(a("input",{id:"month","onUpdate:modelValue":r[2]||(r[2]=l=>A(e).person1.month=l),type:"number",placeholder:"1-12",min:"1",max:"12",class:"custom-date-input"},null,512),[[ce,A(e).person1.month]])]),a("div",Pn,[r[18]||(r[18]=a("label",{for:"day"},"日",-1)),ee(a("input",{id:"day","onUpdate:modelValue":r[3]||(r[3]=l=>A(e).person1.day=l),type:"number",placeholder:"1-31",min:"1",max:"31",class:"custom-date-input"},null,512),[[ce,A(e).person1.day]])])]),a("div",Cn,[r[19]||(r[19]=a("label",{for:"hour"},"时辰",-1)),ee(a("select",{id:"hour","onUpdate:modelValue":r[4]||(r[4]=l=>A(e).person1.timeIndex=l)},[(S(),I(q,null,F(t,(l,d)=>a("option",{key:d,value:d},x(l.name)+" ("+x(l.range)+") ",9,Tn)),64))],512),[[Ke,A(e).person1.timeIndex]])]),a("div",En,[r[20]||(r[20]=a("label",null,"性别",-1)),a("div",Ln,[a("button",{type:"button",class:se(["gender-button",{selected:A(e).person1.gender==="male"}]),onClick:r[5]||(r[5]=l=>A(e).person1.gender="male")}," 男 ",2),a("button",{type:"button",class:se(["gender-button",{selected:A(e).person1.gender==="female"}]),onClick:r[6]||(r[6]=l=>A(e).person1.gender="female")}," 女 ",2)])])]),A(e).calculationError?(S(),I("div",Un,x(A(e).calculationError),1)):G("",!0),a("div",Gn,[a("label",Nn,[ee(a("input",{type:"checkbox","onUpdate:modelValue":r[7]||(r[7]=l=>A(e).enableSecondPerson=l)},null,512),[[mt,A(e).enableSecondPerson]]),r[21]||(r[21]=Z(" 启用合盘分析 "))])]),A(e).enableSecondPerson?(S(),I("div",jn,[r[28]||(r[28]=a("h3",null,"第二人信息",-1)),a("div",Mn,[r[22]||(r[22]=a("label",{for:"name2"},"姓名（选填）",-1)),ee(a("input",{id:"name2","onUpdate:modelValue":r[8]||(r[8]=l=>A(e).person2.name=l),type:"text",placeholder:"请输入第二人姓名"},null,512),[[ce,A(e).person2.name]])]),a("div",Dn,[a("div",Rn,[r[23]||(r[23]=a("label",{for:"year2"},"年",-1)),ee(a("input",{id:"year2","onUpdate:modelValue":r[9]||(r[9]=l=>A(e).person2.year=l),type:"number",placeholder:"2000",min:"1900",max:"2100",class:"custom-date-input"},null,512),[[ce,A(e).person2.year]])]),a("div",Bn,[r[24]||(r[24]=a("label",{for:"month2"},"月",-1)),ee(a("input",{id:"month2","onUpdate:modelValue":r[10]||(r[10]=l=>A(e).person2.month=l),type:"number",placeholder:"1-12",min:"1",max:"12",class:"custom-date-input"},null,512),[[ce,A(e).person2.month]])]),a("div",On,[r[25]||(r[25]=a("label",{for:"day2"},"日",-1)),ee(a("input",{id:"day2","onUpdate:modelValue":r[11]||(r[11]=l=>A(e).person2.day=l),type:"number",placeholder:"1-31",min:"1",max:"31",class:"custom-date-input"},null,512),[[ce,A(e).person2.day]])])]),a("div",Yn,[r[26]||(r[26]=a("label",{for:"hour2"},"时辰",-1)),ee(a("select",{id:"hour2","onUpdate:modelValue":r[12]||(r[12]=l=>A(e).person2.timeIndex=l)},[(S(),I(q,null,F(t,(l,d)=>a("option",{key:d,value:d},x(l.name)+" ("+x(l.range)+") ",9,Zn)),64))],512),[[Ke,A(e).person2.timeIndex]])]),a("div",Hn,[r[27]||(r[27]=a("label",null,"性别",-1)),a("div",qn,[a("button",{type:"button",class:se(["gender-button",{selected:A(e).person2.gender==="male"}]),onClick:r[13]||(r[13]=l=>A(e).person2.gender="male")}," 男 ",2),a("button",{type:"button",class:se(["gender-button",{selected:A(e).person2.gender==="female"}]),onClick:r[14]||(r[14]=l=>A(e).person2.gender="female")}," 女 ",2)])])])):G("",!0),a("button",{class:"primary-button",disabled:!A(e).canCalculate||A(e).isCalculating,onClick:i},x(A(e).isCalculating?"计算中...":"开始排盘"),9,Kn)],512)),[[gt,!A(e).hasResults]])}},Vn=Ae(Jn,[["__scopeId","data-v-1b651200"]]);const Wn={class:"api-key-config"},Fn={class:"modal-body"},Qn={class:"form-group"},zn={class:"form-group"},Xn={class:"form-group"},es={class:"form-group"},Ue="ai_api_config",ts={__name:"ApiKeyConfig",props:{visible:{type:Boolean,default:!1}},emits:["update:visible","config-saved"],setup(s,{expose:e,emit:t}){const n=s,i=t,o=D(n.visible),r=pt({apiUrl:"",apiKey:"",model:"",maxTokens:8192});Ie(()=>n.visible,p=>{o.value=p,p&&l()});const l=()=>{try{const p=localStorage.getItem(Ue);if(p){const f=JSON.parse(p);Object.assign(r,{apiUrl:f.apiUrl||"",apiKey:f.apiKey||"",model:f.model||"",maxTokens:f.maxTokens||8192})}}catch(p){console.error("加载配置失败:",p)}},d=()=>{try{if(!r.apiUrl.trim()){ge("请输入 API 地址");return}if(!r.apiKey.trim()){ge("请输入 API 密钥");return}if(!r.model.trim()){ge("请输入模型名称");return}try{new URL(r.apiUrl)}catch{ge("请输入有效的 API 地址");return}const p={apiUrl:r.apiUrl.trim(),apiKey:r.apiKey.trim(),model:r.model.trim(),maxTokens:r.maxTokens};localStorage.setItem(Ue,JSON.stringify(p)),ke("配置保存成功"),i("config-saved",p),g()}catch(p){console.error("保存配置失败:",p),ge("保存配置失败")}},u=()=>{r.apiUrl="",r.apiKey="",r.model="",r.maxTokens=8192;try{localStorage.removeItem(Ue),ke("配置已重置，将使用默认AI服务"),i("config-saved",null),g()}catch(p){console.error("重置配置失败:",p),ge("重置配置失败")}},g=()=>{o.value=!1,i("update:visible",!1)};return e({getCurrentConfig:()=>{try{const p=localStorage.getItem(Ue);return p?JSON.parse(p):null}catch{return null}}}),(p,f)=>(S(),I("div",Wn,[o.value?(S(),I("div",{key:0,class:"modal-overlay",onClick:g},[a("div",{class:"modal-content",onClick:f[4]||(f[4]=rt(()=>{},["stop"]))},[a("div",{class:"modal-header"},[f[5]||(f[5]=a("h3",null,"配置 AI API",-1)),a("button",{class:"close-btn",onClick:g},"×")]),a("div",Fn,[a("div",Qn,[f[6]||(f[6]=a("label",{for:"apiUrl"},"API 地址",-1)),ee(a("input",{id:"apiUrl","onUpdate:modelValue":f[0]||(f[0]=v=>r.apiUrl=v),type:"text",placeholder:"https://api.openai.com/v1/chat/completions",class:"form-input"},null,512),[[ce,r.apiUrl]]),f[7]||(f[7]=a("small",{class:"form-hint"},"兼容 OpenAI 格式的 API 地址",-1))]),a("div",zn,[f[8]||(f[8]=a("label",{for:"apiKey"},"API 密钥",-1)),ee(a("input",{id:"apiKey","onUpdate:modelValue":f[1]||(f[1]=v=>r.apiKey=v),type:"password",placeholder:"sk-...",class:"form-input"},null,512),[[ce,r.apiKey]]),f[9]||(f[9]=a("small",{class:"form-hint"},"您的 API 密钥，将安全保存在本地浏览器",-1))]),a("div",Xn,[f[10]||(f[10]=a("label",{for:"model"},"模型名称",-1)),ee(a("input",{id:"model","onUpdate:modelValue":f[2]||(f[2]=v=>r.model=v),type:"text",placeholder:"gpt-3.5-turbo",class:"form-input"},null,512),[[ce,r.model]]),f[11]||(f[11]=a("small",{class:"form-hint"},"使用的模型名称",-1))]),a("div",es,[f[12]||(f[12]=a("label",{for:"maxTokens"},"最大 Token 数",-1)),ee(a("input",{id:"maxTokens","onUpdate:modelValue":f[3]||(f[3]=v=>r.maxTokens=v),type:"number",placeholder:"8192",min:"100",max:"32000",class:"form-input"},null,512),[[ce,r.maxTokens,void 0,{number:!0}]]),f[13]||(f[13]=a("small",{class:"form-hint"},"单次请求的最大 Token 数量",-1))])]),a("div",{class:"modal-footer"},[a("button",{class:"btn btn-secondary",onClick:u},"重置"),a("button",{class:"btn btn-primary",onClick:d},"保存配置")])])])):G("",!0)]))}},ns=Ae(ts,[["__scopeId","data-v-25104793"]]);const ss={class:"action-buttons"},as=["disabled"],rs=["disabled"],os=["onClick","disabled"],is={key:0,class:"btn-icon",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},ls=["d"],cs={__name:"ActionButtons",props:{showRecalculate:{type:Boolean,default:!0},recalculateText:{type:String,default:"重新排盘"},showApiConfig:{type:Boolean,default:!0},apiConfigText:{type:String,default:"配置 Key"},customButtons:{type:Array,default:()=>[]},loading:{type:Boolean,default:!1},clearResultsMethod:{type:Function,default:null}},emits:["recalculate","api-config","custom-button","config-saved"],setup(s,{expose:e,emit:t}){const n=s,i=t,o=D(!1),r=()=>{n.clearResultsMethod&&n.clearResultsMethod();const g=new URL(window.location);g.search="",window.history.replaceState({},"",g.toString()),window.scrollTo({top:0,behavior:"smooth"}),ke("已清空结果，请重新输入信息进行排盘"),i("recalculate")},l=()=>{o.value=!0,i("api-config")},d=(g,c)=>{g.handler&&typeof g.handler=="function"&&g.handler(),i("custom-button",{button:g,index:c})},u=g=>{ke("API 配置已保存"),i("config-saved",g)};return e({openApiConfig:()=>{o.value=!0},closeApiConfig:()=>{o.value=!1}}),(g,c)=>(S(),I(q,null,[a("div",ss,[s.showRecalculate?(S(),I("button",{key:0,class:"action-btn btn-secondary",onClick:r,disabled:s.loading},[c[1]||(c[1]=a("svg",{class:"btn-icon",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},[a("path",{d:"M1 4v6h6"}),a("path",{d:"M23 20v-6h-6"}),a("path",{d:"M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"})],-1)),Z(" "+x(s.recalculateText),1)],8,as)):G("",!0),s.showApiConfig?(S(),I("button",{key:1,class:"action-btn btn-primary",onClick:l,disabled:s.loading},[c[2]||(c[2]=a("svg",{class:"btn-icon",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},[a("path",{d:"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"}),a("path",{d:"M9 12l2 2 4-4"})],-1)),Z(" "+x(s.apiConfigText),1)],8,rs)):G("",!0),(S(!0),I(q,null,F(s.customButtons,(p,f)=>(S(),I("button",{key:f,class:se(["action-btn",p.type||"btn-secondary"]),onClick:v=>d(p,f),disabled:s.loading||p.disabled},[p.icon?(S(),I("svg",is,[a("path",{d:p.icon},null,8,ls)])):G("",!0),Z(" "+x(p.text),1)],10,os))),128))]),(S(),ot(it,{to:"body"},[ve(ns,{visible:o.value,"onUpdate:visible":c[0]||(c[0]=p=>o.value=p),onConfigSaved:u},null,8,["visible"])]))],64))}},us=Ae(cs,[["__scopeId","data-v-6750d609"]]);const ds={class:"ziwei-result-wrapper"},hs={key:0,class:"loading-container"},gs={key:1,class:"error-container"},ms={key:2,class:"result-card"},ps={class:"basic-info-section"},ys={key:0,class:"compatibility-basic-info"},fs={class:"person-basic-info"},vs={class:"basic-info-text"},xs={class:"value"},Ss={class:"value"},_s={class:"value"},Is={class:"value"},$s={class:"value"},bs={class:"value"},ws={class:"value"},ks={class:"person-basic-info"},As={class:"basic-info-text"},Ps={class:"value"},Cs={class:"value"},Ts={class:"value"},Es={class:"value"},Ls={class:"value"},Us={class:"value"},Gs={class:"value"},Ns={key:1},js={class:"basic-info-text"},Ms={class:"value"},Ds={class:"value"},Rs={class:"value"},Bs={class:"value"},Os={class:"value"},Ys={class:"value"},Zs={class:"value"},Hs={class:"value"},qs={class:"mutagen-container"},Ks={class:"mutagen-grid"},Js={class:"mutagen-item"},Vs={class:"mutagen-star"},Ws={class:"mutagen-item"},Fs={class:"mutagen-star"},Qs={class:"mutagen-item"},zs={class:"mutagen-star"},Xs={class:"mutagen-item"},ea={class:"mutagen-star"},ta={class:"chart-section"},na={key:0,class:"compatibility-charts"},sa={class:"person-chart-container"},aa={class:"astrolabe-grid compact"},ra=["onClick"],oa={class:"palace-header"},ia={class:"palace-name"},la={key:0,class:"body-palace-mark"},ca={class:"palace-stems"},ua={class:"palace-stars"},da={class:"palace-details compact"},ha={key:0,class:"changsheng"},ga={key:1,class:"boshi"},ma={key:0,class:"ages"},pa={class:"person-chart-container"},ya={class:"astrolabe-grid compact"},fa=["onClick"],va={class:"palace-header"},xa={class:"palace-name"},Sa={key:0,class:"body-palace-mark"},_a={class:"palace-stems"},Ia={class:"palace-stars"},$a={class:"palace-details compact"},ba={key:0,class:"changsheng"},wa={key:1,class:"boshi"},ka={key:0,class:"ages"},Aa={class:"compatibility-analysis"},Pa={class:"compatibility-analysis-content"},Ca={key:1,class:"professional-chart-container"},Ta={class:"astrolabe-grid"},Ea=["onClick"],La={class:"palace-header"},Ua={class:"palace-name"},Ga={key:0,class:"body-palace-mark"},Na={class:"palace-stems"},ja={class:"palace-stars"},Ma={class:"palace-details"},Da={key:0,class:"changsheng"},Ra={key:1,class:"boshi"},Ba={key:2,class:"jiangqian"},Oa={key:0,class:"ages"},Ya={key:1,class:"empty-palace"},Za={key:0,class:"detailed-analysis-text"},Ha={class:"analysis-text-section"},qa={class:"analysis-text-content"},Ka={class:"analysis-text-section"},Ja={class:"analysis-text-content"},Va={class:"analysis-text-section"},Wa={class:"analysis-text-content"},Fa={class:"analysis-text-section"},Qa={class:"analysis-text-content"},za={class:"palace-modal-header"},Xa={class:"palace-modal-content"},er={class:"palace-basic-info"},tr={key:0},nr={key:1},sr={key:2},ar={key:0,class:"palace-stars-detail"},rr={key:0,class:"star-category"},or={class:"star-list"},ir={class:"star-name"},lr={key:0,class:"star-brightness"},cr={key:1,class:"star-mutagen"},ur={key:1,class:"star-category"},dr={class:"star-list"},hr={class:"star-name"},gr={key:0,class:"star-brightness"},mr={key:1,class:"star-mutagen"},pr={key:2,class:"star-category"},yr={class:"star-list"},fr={class:"star-name"},vr={key:0,class:"star-brightness"},xr={key:1,class:"star-mutagen"},Sr={key:1,class:"palace-analysis"},_r={class:"palace-analysis-content"},Ir={class:"palace-meaning"},$r={class:"palace-star-analysis"},br={class:"palace-fortune-analysis"},wr={class:"palace-advice"},kr={class:"palace-other-info"},Ar={key:0},Pr={key:1},Cr={key:2},Tr={key:3},Er={key:4},Lr={__name:"ZiWeiResult",setup(s){const e=Ge(),t=he(()=>e.displayData1),n=D(null),i=$=>{const h=["star-item"];return $.type&&h.push(`star-${$.type}`),$.brightness&&h.push(`brightness-${$.brightness}`),$.mutagen&&h.push(`mutagen-${$.mutagen}`),h.join(" ")},o=$=>({化禄:"lu",化权:"quan",化科:"ke",化忌:"ji"})[$]||"",r=$=>{n.value=$},l=()=>{n.value=null},d=()=>{if(!t.value?.palaces)return"未知";const $=t.value.palaces.find(b=>b.name==="命宫");if(!$)return"未知";const y=($.allStars||[]).filter(b=>b.type==="major");return y.length===0?"无主星":y.map(b=>b.name).join("、")},u=()=>{if(!t.value?.palaces)return"未知";const $=t.value.palaces.find(b=>b.isBodyPalace);if(!$)return"未知";const y=($.allStars||[]).filter(b=>b.type==="major");return y.length===0?"无主星":y.map(b=>b.name).join("、")},g=()=>{if(!t.value?.palaces)return"未知";const $=t.value.palaces.find(U=>U.name==="命宫");if(!$)return"未知";const h=$.majorStars||[];if(h.length===0)return"平常格局";const y=h.some(U=>["紫微","天府","太阳","武曲"].includes(U.name)),b=h.some(U=>["庙","旺"].includes(U.brightness));return y&&b?"上等格局":y||b?"中等格局":"平常格局"},c=()=>{if(!t.value?.palaces)return"未知";const $=t.value.palaces.find(b=>b.name==="命宫");if(!$)return"未知";const h=$.majorStars||[];if(h.length===0)return"空宫格局";const y=h.map(b=>b.name);return y.includes("紫微")?"帝王格局":y.includes("天府")?"财库格局":y.includes("太阳")?"光明格局":y.includes("武曲")?"财星格局":y.includes("天同")?"福德格局":y.includes("廉贞")?"权威格局":"一般格局"},p=()=>{if(!t.value?.palaces)return[];const $=[];return["命宫","财帛宫","官禄宫","夫妻宫"].forEach(y=>{const b=t.value.palaces.find(U=>U.name===y);if(b&&b.allStars){const U=b.allStars.filter(J=>J.type==="major");if(U.length>0){const J=U.map(le=>le.name);let R=f(y,J);$.push({palace:y,stars:J,description:R})}}}),$},f=($,h)=>{const b={命宫:{紫微:"具有领导才能，天生贵气，适合管理职位",天机:"聪明机智，善于策划，适合智力工作",太阳:"性格开朗，有正义感，适合公职或教育",武曲:"意志坚强，理财能力佳，适合金融业",天同:"性格温和，人缘好，适合服务业",廉贞:"个性刚强，有魄力，适合执法或军警"},财帛宫:{紫微:"财运亨通，有贵人相助，财源广进",武曲:"理财有道，投资眼光佳，财富稳定增长",天府:"财库丰厚，善于积累，晚年富足",太阴:"财运平稳，适合稳健投资"},官禄宫:{紫微:"事业有成，适合领导职位，官运亨通",武曲:"事业稳定，在金融或技术领域有所成就",天机:"适合策划、咨询类工作，智慧型事业",太阳:"适合公职或教育事业，声名远播"},夫妻宫:{紫微:"配偶条件佳，婚姻美满，夫妻恩爱",天同:"夫妻和睦，感情稳定，家庭幸福",太阴:"配偶温柔体贴，感情深厚",天府:"配偶贤能，家庭富足"}}[$]||{};return h.map(J=>b[J]||`${J}星坐守，影响${$}运势`).join("；")||`${h.join("、")}星坐守${$}，需结合整体命盘分析`},v=()=>{if(!t.value?.mutagens||!t.value?.palaces)return[];const $=[],h=t.value.mutagens;return Object.entries(h).forEach(([y,b])=>{if(b&&b!=="无"){const U=w(b),J=k(y,b,U);$.push({type:y,name:J.name,star:b,palace:U||"未知宫位",description:J.description})}}),$},w=$=>{if(!t.value?.palaces)return null;for(const h of t.value.palaces)if((h.allStars||[]).some(b=>b.name===$))return h.name;return null},k=($,h,y)=>{const b={lu:"化禄",quan:"化权",ke:"化科",ji:"化忌"},U={lu:`${h}化禄在${y}，主财运亨通，此宫位运势佳，有贵人相助`,quan:`${h}化权在${y}，主权威增强，此宫位有掌控力，适合发挥领导才能`,ke:`${h}化科在${y}，主名声显达，此宫位有贵气，利于学业和声誉`,ji:`${h}化忌在${y}，主阻碍较多，此宫位需谨慎，宜化解不利因素`};return{name:b[$]||$,description:U[$]||`${h}${b[$]}的影响需要具体分析`}},m=()=>{const $=t.value?.horoscope?.currentAge||0,y=Math.floor(($-6)/10),b=["命宫","父母宫","福德宫","田宅宫","官禄宫","奴仆宫","迁移宫","疾厄宫","财帛宫","子女宫","夫妻宫","兄弟宫"],U=y%12;return b[U]||"未知"},_=()=>{const $=new Date().getFullYear(),h=t.value?.basicInfo?.birthDate?.year||$,y=$-h,b=["命宫","兄弟宫","夫妻宫","子女宫","财帛宫","疾厄宫","迁移宫","奴仆宫","官禄宫","田宅宫","福德宫","父母宫"],U=y%12;return b[U]||"未知"},L=()=>{const $=t.value?.horoscope?.currentAge||0;return $<30?"青年时期，宜努力学习，积累经验，为未来打好基础。注意身体健康，培养良好习惯。":$<50?"中年时期，事业发展的关键阶段，宜把握机会，稳健前进。注意家庭和事业的平衡。":"成熟时期，宜发挥经验优势，传承智慧，享受人生。注意身体保养，颐养天年。"},j=$=>{if(!$||$.length===0)return[];const h={紫微:10,天机:10,太阳:10,武曲:10,天同:10,廉贞:10,天府:10,太阴:10,贪狼:10,巨门:10,天相:10,天梁:10,七杀:10,破军:10,左辅:8,右弼:8,文昌:8,文曲:8,天魁:8,天钺:8,禄存:7,天马:7,化禄:9,化权:9,化科:9,化忌:9,火星:6,铃星:6,擎羊:6,陀罗:6,地空:5,地劫:5};return $.map(b=>({...b,priority:h[b.name]||(b.mutagen?9:b.type==="major"?10:3)})).sort((b,U)=>U.priority-b.priority).slice(0,6)},ae=()=>{if(!e.enableSecondPerson||!e.displayData2)return{};const $=e.displayData1,h=e.displayData2,y=M($,h),b=V($,h),U=X($,h),J=ie($,h);return{mingGong:y,wuxing:b,sihua:U,shenGong:J}},z=$=>({mingGong:"命宫关系",wuxing:"五行配合",sihua:"四化互动",shenGong:"身宫关系"})[$]||$,M=($,h)=>{const y=$.basicInfo?.soulPalace||"未知",b=h.basicInfo?.soulPalace||"未知";if(y==="未知"||b==="未知")return"命宫信息不完整，无法分析";if(y===b)return`双方命宫同在${y}，性格相近，容易理解对方`;{const U=T(y,b);return`命宫分别在${y}和${b}，${U}`}},V=($,h)=>{const y=$.basicInfo?.fiveElementsClass||"未知",b=h.basicInfo?.fiveElementsClass||"未知";return y==="未知"||b==="未知"?"五行局信息不完整，无法分析":y===b?`双方同为${y}，五行相同，能量共振`:`五行局分别为${y}和${b}，需要互补平衡`},X=($,h)=>{const y=$.mutagens||{},b=h.mutagens||{},U=[],J={lu:"化禄",quan:"化权",ke:"化科",ji:"化忌"};return Object.keys(y).forEach(R=>{const le=y[R],re=b[R],O=J[R]||R;le&&re&&le===re&&U.push(`双方${O}星同为${le}，产生共鸣`)}),U.length===0?"四化星互动平和，无明显冲突":U.join("；")},ie=($,h)=>{const y=$.basicInfo?.bodyPalace||"未知",b=h.basicInfo?.bodyPalace||"未知";if(y==="未知"||b==="未知")return"身宫信息不完整，无法分析";if(y===b)return`双方身宫同在${y}，价值观念相近，容易产生共鸣`;{const U=T(y,b);return`身宫分别在${y}和${b}，${U}`}},T=($,h)=>{const y={"命宫-财帛":"财运与性格相关","命宫-事业":"事业发展与个性匹配","命宫-夫妻":"感情与性格互补"},b=`${$}-${h}`,U=`${h}-${$}`;return y[b]||y[U]||"宫位关系需要通过具体星耀配置进一步分析"},P=$=>!$||!$.allStars?[]:$.allStars,N=($,h)=>!$||!$.allStars?[]:$.allStars.filter(y=>y.type===h),B=$=>({命宫:"代表个人的性格特质、天赋才能、人生格局、基本运势和先天禀赋，是紫薇斗数中最重要的宫位",兄弟宫:"代表兄弟姐妹关系、朋友交往、同事关系、合作伙伴和人际网络的状况",夫妻宫:"代表婚姻感情、配偶关系、恋爱运势、感情模式和异性缘分",子女宫:"代表子女关系、生育能力、教育子女、创造力和部属关系",财帛宫:"代表财运状况、理财能力、赚钱方式、财富积累和金钱观念",疾厄宫:"代表身体健康、疾病倾向、体质强弱、意外灾厄和心理状态",迁移宫:"代表外出运势、变动机会、环境适应、贵人运和远方发展",奴仆宫:"代表部属关系、朋友助力、社交能力、人缘状况和团队合作",官禄宫:"代表事业发展、工作能力、职业方向、社会地位和成就表现",田宅宫:"代表不动产运势、居住环境、家庭状况、祖业传承和生活品质",福德宫:"代表精神享受、兴趣爱好、福分厚薄、心境状态和晚年运势",父母宫:"代表父母关系、长辈缘分、上司关系、学业状况和文书运势"})[$]||"此宫位的具体含义需要结合整体命盘分析",K=$=>{if(!$||!$.allStars)return"此宫位暂无星耀坐守。";const h=$.allStars.filter(R=>R.type==="major"),y=$.allStars.filter(R=>R.type==="minor");$.allStars.filter(R=>R.mutagen);let b=[];if(h.length>0){const R=h.map(le=>le.name).join("、");b.push(`${R}主星坐守`),h.forEach(le=>{const re=te(le.name,$.name);re&&b.push(re)})}const U=y.filter(R=>["左辅","右弼","文昌","文曲","天魁","天钺","禄存","天马"].includes(R.name));U.length>0&&b.push(`有${U.map(R=>R.name).join("、")}等吉星相助，增强宫位正面能量`);const J=y.filter(R=>["火星","铃星","擎羊","陀罗","地空","地劫"].includes(R.name));return J.length>0&&b.push(`有${J.map(R=>R.name).join("、")}等煞星同宫，需要化解不利影响`),h.length===0&&b.push("此宫位为空宫，需借对宫星耀来论断，或依靠后天努力来充实"),b.length>0?b.join("，")+"。":"此宫位星耀配置需要结合整体命盘分析。"},te=($,h)=>({紫微:{命宫:"具有帝王之相，天生领导才能，性格高贵，适合管理职位",财帛宫:"财运亨通，有贵人相助，财源广进，善于理财",官禄宫:"事业有成，适合领导职位，官运亨通，社会地位高",夫妻宫:"配偶条件佳，婚姻美满，夫妻恩爱，感情稳定"},天机:{命宫:"聪明机智，善于策划，反应敏捷，适合智力工作",财帛宫:"理财有方，投资眼光独到，财运变化较大",官禄宫:"适合策划、咨询类工作，智慧型事业发展佳",兄弟宫:"兄弟朋友聪明，关系变化较多，需要用智慧维系"},太阳:{命宫:"性格开朗，有正义感，光明磊落，适合公职或教育",财帛宫:"财运光明，赚钱光明正大，适合阳光行业",官禄宫:"适合公职或教育事业，声名远播，受人尊敬",父母宫:"与父亲缘分深厚，父亲对自己影响较大"},武曲:{命宫:"意志坚强，个性刚毅，理财能力佳，适合金融业",财帛宫:"理财有道，投资眼光佳，财富稳定增长，善于积累",官禄宫:"事业稳定，在金融或技术领域有所成就",夫妻宫:"配偶性格坚强，夫妻关系需要磨合"},天同:{命宫:"性格温和，人缘好，福分厚，适合服务业",财帛宫:"财运平稳，不愁吃穿，适合稳健投资",夫妻宫:"夫妻和睦，感情稳定，家庭幸福",福德宫:"精神享受丰富，心境平和，晚年福分厚"},廉贞:{命宫:"个性刚强，有魄力，适合执法或军警工作",财帛宫:"财运起伏较大，需要谨慎理财",官禄宫:"适合执法、军警或竞争性行业",疾厄宫:"需要注意心血管疾病，保持情绪稳定"}})[$]?.[h]||null,W=$=>{if(!$||!$.allStars)return"运势平平，需要后天努力。";const h=$.allStars.filter(O=>O.mutagen),y=$.allStars.filter(O=>O.type==="major"),b=$.allStars.filter(O=>O.type==="minor");let U=[];h.length>0&&h.forEach(O=>{switch(O.mutagen){case"禄":U.push(`${O.name}化禄带来财运和贵人运，此宫位运势佳`);break;case"权":U.push(`${O.name}化权增强掌控力，适合发挥主导作用`);break;case"科":U.push(`${O.name}化科带来名声和贵气，利于学业和声誉`);break;case"忌":U.push(`${O.name}化忌带来阻碍，需要谨慎处理，化解不利因素`);break}});const J=y.filter(O=>["庙","旺"].includes(O.brightness)),R=y.filter(O=>["落陷","不得地"].includes(O.brightness));J.length>0&&U.push("主星庙旺，宫位能量强，运势较佳"),R.length>0&&U.push("主星失陷，宫位能量弱，需要后天加强");const le=b.filter(O=>["左辅","右弼","文昌","文曲","天魁","天钺"].includes(O.name)),re=b.filter(O=>["火星","铃星","擎羊","陀罗","地空","地劫"].includes(O.name));return le.length>re.length?U.push("吉星多于煞星，整体运势向好"):re.length>le.length&&U.push("煞星较多，需要谨慎行事，化解不利"),U.length>0?U.join("，")+"。":"运势需要结合大运流年综合判断。"},ue=$=>{if(!$)return"建议结合整体命盘制定人生规划。";const h=$.name,y=$.allStars?.filter(R=>R.type==="major")||[],b=$.allStars?.filter(R=>R.mutagen)||[];let U=[];const J={命宫:"注重个人修养和品格培养，发挥天赋才能，建立正确的人生观",兄弟宫:"维护兄弟朋友关系，善于合作，建立良好的人际网络",夫妻宫:"用心经营感情，理解包容，建立和谐的婚姻关系",子女宫:"关爱子女教育，发挥创造力，培养良好的师生或上下级关系",财帛宫:"合理规划财务，稳健投资，培养正确的金钱观念",疾厄宫:"注重身体健康，预防疾病，保持良好的生活习惯",迁移宫:"把握变动机会，适应环境变化，善用贵人助力",奴仆宫:"善待部属朋友，建立互信关系，发挥团队合作精神",官禄宫:"努力工作，提升能力，选择适合的职业发展方向",田宅宫:"合理置业，改善居住环境，维护家庭和睦",福德宫:"培养兴趣爱好，保持心境平和，积累福德",父母宫:"孝敬父母长辈，尊师重道，处理好上下级关系"};return U.push(J[h]||"需要根据具体情况制定相应策略"),b.some(R=>R.mutagen==="忌")&&U.push("此宫位有化忌星，需要特别谨慎，多行善事化解不利"),b.some(R=>R.mutagen==="禄")&&U.push("此宫位有化禄星，可以积极发展，把握机会"),y.length===0&&U.push("空宫需要借对宫星耀，或通过后天努力来充实此宫位"),U.join("；")+"。"},de=()=>{console.log("紫薇重新排盘")},me=$=>{$===null?console.log("紫薇页面 - API配置已重置，将使用默认AI服务"):console.log("紫薇页面 - 新的API配置:",$),_t(()=>Promise.resolve().then(()=>Sn),void 0).then(({aiService:h})=>{h.refreshConfig(),console.log("✅ AI服务配置已更新")})};return($,h)=>(S(),I("div",ds,[A(e).isCalculating?(S(),I("div",hs,h[1]||(h[1]=[a("div",{class:"loading-indicator"},"计算中...",-1)]))):A(e).calculationError?(S(),I("div",gs,[a("p",null,"错误: "+x(A(e).calculationError),1)])):A(e).hasResults?(S(),I("div",ms,[a("div",ps,[A(e).enableSecondPerson&&A(e).displayData2?(S(),I("div",ys,[a("div",fs,[a("h4",null,x(A(e).person1.name||"第一人")+"的基本信息",1),a("div",vs,[a("p",null,[h[2]||(h[2]=a("span",{class:"label"},"性别",-1)),a("span",xs,x(A(e).displayData1?.basicInfo?.gender||"未知"),1)]),a("p",null,[h[3]||(h[3]=a("span",{class:"label"},"阳历",-1)),a("span",Ss,x(A(e).displayData1?.basicInfo?.birthDate?.solar||"未知"),1)]),a("p",null,[h[4]||(h[4]=a("span",{class:"label"},"农历",-1)),a("span",_s,x(A(e).displayData1?.basicInfo?.birthDate?.lunar||"未知"),1)]),a("p",null,[h[5]||(h[5]=a("span",{class:"label"},"时辰",-1)),a("span",Is,x(A(e).displayData1?.basicInfo?.time||"未知")+" "+x(A(e).displayData1?.basicInfo?.timeRange||""),1)]),a("p",null,[h[6]||(h[6]=a("span",{class:"label"},"五行局",-1)),a("span",$s,x(A(e).displayData1?.basicInfo?.fiveElementsClass||"未知"),1)]),a("p",null,[h[7]||(h[7]=a("span",{class:"label"},"命宫",-1)),a("span",bs,x(A(e).displayData1?.basicInfo?.soulPalace||"未知"),1)]),a("p",null,[h[8]||(h[8]=a("span",{class:"label"},"身宫",-1)),a("span",ws,x(A(e).displayData1?.basicInfo?.bodyPalace||"未知"),1)])])]),a("div",ks,[a("h4",null,x(A(e).person2.name||"第二人")+"的基本信息",1),a("div",As,[a("p",null,[h[9]||(h[9]=a("span",{class:"label"},"性别",-1)),a("span",Ps,x(A(e).displayData2?.basicInfo?.gender||"未知"),1)]),a("p",null,[h[10]||(h[10]=a("span",{class:"label"},"阳历",-1)),a("span",Cs,x(A(e).displayData2?.basicInfo?.birthDate?.solar||"未知"),1)]),a("p",null,[h[11]||(h[11]=a("span",{class:"label"},"农历",-1)),a("span",Ts,x(A(e).displayData2?.basicInfo?.birthDate?.lunar||"未知"),1)]),a("p",null,[h[12]||(h[12]=a("span",{class:"label"},"时辰",-1)),a("span",Es,x(A(e).displayData2?.basicInfo?.time||"未知")+" "+x(A(e).displayData2?.basicInfo?.timeRange||""),1)]),a("p",null,[h[13]||(h[13]=a("span",{class:"label"},"五行局",-1)),a("span",Ls,x(A(e).displayData2?.basicInfo?.fiveElementsClass||"未知"),1)]),a("p",null,[h[14]||(h[14]=a("span",{class:"label"},"命宫",-1)),a("span",Us,x(A(e).displayData2?.basicInfo?.soulPalace||"未知"),1)]),a("p",null,[h[15]||(h[15]=a("span",{class:"label"},"身宫",-1)),a("span",Gs,x(A(e).displayData2?.basicInfo?.bodyPalace||"未知"),1)])])])])):(S(),I("div",Ns,[a("div",js,[a("p",null,[h[16]||(h[16]=a("span",{class:"label"},"姓名",-1)),a("span",Ms,x(t.value?.basicInfo?.name||"未填写"),1)]),a("p",null,[h[17]||(h[17]=a("span",{class:"label"},"性别",-1)),a("span",Ds,x(t.value?.basicInfo?.gender||"未知"),1)]),a("p",null,[h[18]||(h[18]=a("span",{class:"label"},"阳历",-1)),a("span",Rs,x(t.value?.basicInfo?.birthDate?.solar||"未知"),1)]),a("p",null,[h[19]||(h[19]=a("span",{class:"label"},"农历",-1)),a("span",Bs,x(t.value?.basicInfo?.birthDate?.lunar||"未知"),1)]),a("p",null,[h[20]||(h[20]=a("span",{class:"label"},"时辰",-1)),a("span",Os,x(t.value?.basicInfo?.time||"未知")+" "+x(t.value?.basicInfo?.timeRange||""),1)]),a("p",null,[h[21]||(h[21]=a("span",{class:"label"},"五行局",-1)),a("span",Ys,x(t.value?.basicInfo?.fiveElementsClass||"未知"),1)]),a("p",null,[h[22]||(h[22]=a("span",{class:"label"},"命宫",-1)),a("span",Zs,x(t.value?.basicInfo?.soulPalace||"未知"),1)]),a("p",null,[h[23]||(h[23]=a("span",{class:"label"},"身宫",-1)),a("span",Hs,x(t.value?.basicInfo?.bodyPalace||"未知"),1)])]),a("div",qs,[h[28]||(h[28]=a("h4",null,"四化信息",-1)),a("div",Ks,[a("div",Js,[h[24]||(h[24]=a("span",{class:"mutagen-type lu"},"化禄",-1)),a("span",Vs,x(t.value?.mutagens?.lu||"无"),1)]),a("div",Ws,[h[25]||(h[25]=a("span",{class:"mutagen-type quan"},"化权",-1)),a("span",Fs,x(t.value?.mutagens?.quan||"无"),1)]),a("div",Qs,[h[26]||(h[26]=a("span",{class:"mutagen-type ke"},"化科",-1)),a("span",zs,x(t.value?.mutagens?.ke||"无"),1)]),a("div",Xs,[h[27]||(h[27]=a("span",{class:"mutagen-type ji"},"化忌",-1)),a("span",ea,x(t.value?.mutagens?.ji||"无"),1)])])])]))]),a("div",ta,[h[30]||(h[30]=a("h3",{class:"chart-title"},"星盘信息",-1)),A(e).enableSecondPerson&&A(e).displayData2?(S(),I("div",na,[a("div",sa,[a("h3",null,x(A(e).person1.name||"第一人")+"的紫薇星盘",1),a("div",aa,[(S(!0),I(q,null,F(A(e).displayData1.palaces,y=>(S(),I("div",{key:y.name,class:se(["palace-cell",{"body-palace":y.isBodyPalace}]),onClick:b=>r(y)},[a("div",oa,[a("span",ia,x(y.name),1),y.isBodyPalace?(S(),I("span",la,"身")):G("",!0)]),a("div",ca,x(y.heavenlyStem)+x(y.earthlyBranch),1),a("div",ua,[(S(!0),I(q,null,F(j(y.allStars||[]),b=>(S(),I("div",{key:b.name,class:se(i(b))},[Z(x(b.name)+" ",1),b.mutagen?(S(),I("span",{key:0,class:se(["mutagen",o(b.mutagen)])},x(b.mutagen),3)):G("",!0)],2))),128))]),a("div",da,[y.changsheng12?(S(),I("div",ha,x(y.changsheng12),1)):G("",!0),y.boshi12?(S(),I("div",ga,x(y.boshi12),1)):G("",!0)]),y.ages&&y.ages.length>0?(S(),I("div",ma,x(y.ages.join("-"))+"岁 ",1)):G("",!0)],10,ra))),128))])]),a("div",pa,[a("h3",null,x(A(e).person2.name||"第二人")+"的紫薇星盘",1),a("div",ya,[(S(!0),I(q,null,F(A(e).displayData2.palaces,y=>(S(),I("div",{key:y.name,class:se(["palace-cell",{"body-palace":y.isBodyPalace}]),onClick:b=>r(y)},[a("div",va,[a("span",xa,x(y.name),1),y.isBodyPalace?(S(),I("span",Sa,"身")):G("",!0)]),a("div",_a,x(y.heavenlyStem)+x(y.earthlyBranch),1),a("div",Ia,[(S(!0),I(q,null,F(j(y.allStars||[]),b=>(S(),I("div",{key:b.name,class:se(i(b))},[Z(x(b.name)+" ",1),b.mutagen?(S(),I("span",{key:0,class:se(["mutagen",o(b.mutagen)])},x(b.mutagen),3)):G("",!0)],2))),128))]),a("div",$a,[y.changsheng12?(S(),I("div",ba,x(y.changsheng12),1)):G("",!0),y.boshi12?(S(),I("div",wa,x(y.boshi12),1)):G("",!0)]),y.ages&&y.ages.length>0?(S(),I("div",ka,x(y.ages.join("-"))+"岁 ",1)):G("",!0)],10,fa))),128))])]),a("div",Aa,[h[29]||(h[29]=a("h4",null,"合盘分析",-1)),a("div",Pa,[(S(!0),I(q,null,F(ae(),(y,b)=>(S(),I("div",{key:b,class:"compatibility-analysis-item"},[a("p",null,[a("strong",null,x(z(b))+"：",1),Z(x(y),1)])]))),128))])])])):(S(),I("div",Ca,[a("div",Ta,[(S(!0),I(q,null,F(t.value?.palaces||[],y=>(S(),I("div",{key:y.name,class:se(["palace-cell",{"body-palace":y.isBodyPalace}]),onClick:b=>r(y)},[a("div",La,[a("span",Ua,x(y.name),1),y.isBodyPalace?(S(),I("span",Ga,"身")):G("",!0)]),a("div",Na,x(y.heavenlyStem)+x(y.earthlyBranch),1),a("div",ja,[(S(!0),I(q,null,F(y.allStars||[],b=>(S(),I("div",{key:b.name,class:se(i(b))},[Z(x(b.name)+" ",1),b.mutagen?(S(),I("span",{key:0,class:se(["mutagen",o(b.mutagen)])},x(b.mutagen),3)):G("",!0)],2))),128))]),a("div",Ma,[y.changsheng12?(S(),I("div",Da,x(y.changsheng12),1)):G("",!0),y.boshi12?(S(),I("div",Ra,x(y.boshi12),1)):G("",!0),y.jiangqian12?(S(),I("div",Ba,x(y.jiangqian12),1)):G("",!0)]),y.ages&&y.ages.length>0?(S(),I("div",Oa,x(y.ages.join("-"))+"岁 ",1)):G("",!0),y.isEmpty?(S(),I("div",Ya," 空宫 ")):G("",!0)],10,Ea))),128))])]))]),A(e).enableSecondPerson?G("",!0):(S(),I("div",Za,[a("div",Ha,[h[35]||(h[35]=a("h4",null,"命盘概述",-1)),a("div",qa,[a("p",null,[h[31]||(h[31]=a("strong",null,"命主星：",-1)),Z(x(d()),1)]),a("p",null,[h[32]||(h[32]=a("strong",null,"身主星：",-1)),Z(x(u()),1)]),a("p",null,[h[33]||(h[33]=a("strong",null,"命格层次：",-1)),Z(x(g()),1)]),a("p",null,[h[34]||(h[34]=a("strong",null,"格局特征：",-1)),Z(x(c()),1)])])]),a("div",Ka,[h[36]||(h[36]=a("h4",null,"主要星耀分析",-1)),a("div",Ja,[(S(!0),I(q,null,F(p(),y=>(S(),I("div",{key:y.palace,class:"star-analysis-text"},[a("p",null,[a("strong",null,x(y.palace)+"：",1),Z(x(y.stars.join("、"))+"星坐守。"+x(y.description),1)])]))),128))])]),a("div",Va,[h[37]||(h[37]=a("h4",null,"四化详解",-1)),a("div",Wa,[(S(!0),I(q,null,F(v(),y=>(S(),I("div",{key:y.type,class:"mutagen-analysis-text"},[a("p",null,[a("strong",null,x(y.name)+"：",1),Z(x(y.star)+"星在"+x(y.palace)+"。"+x(y.description),1)])]))),128))])]),a("div",Fa,[h[42]||(h[42]=a("h4",null,"运势概况",-1)),a("div",Qa,[a("p",null,[h[38]||(h[38]=a("strong",null,"当前年龄：",-1)),Z(x(t.value?.horoscope?.currentAge||0)+"岁",1)]),a("p",null,[h[39]||(h[39]=a("strong",null,"大运宫位：",-1)),Z(x(m()),1)]),a("p",null,[h[40]||(h[40]=a("strong",null,"流年宫位：",-1)),Z(x(_()),1)]),a("p",null,[h[41]||(h[41]=a("strong",null,"运势建议：",-1)),Z(x(L()),1)])])])])),ve(us,{"clear-results-method":A(e).clearResults,onRecalculate:de,onConfigSaved:me},null,8,["clear-results-method"]),(S(),ot(it,{to:"body"},[n.value?(S(),I("div",{key:0,class:"palace-modal-overlay",onClick:l},[a("div",{class:"palace-modal",onClick:h[0]||(h[0]=rt(()=>{},["stop"]))},[a("div",za,[a("h3",null,x(n.value.name)+"详情",1),a("button",{class:"close-button",onClick:l},"×")]),a("div",Xa,[a("div",er,[a("p",null,[h[43]||(h[43]=a("strong",null,"宫位：",-1)),Z(x(n.value.name),1)]),a("p",null,[h[44]||(h[44]=a("strong",null,"干支：",-1)),Z(x(n.value.heavenlyStem)+x(n.value.earthlyBranch),1)]),n.value.isBodyPalace?(S(),I("p",tr,h[45]||(h[45]=[a("strong",null,"身宫",-1)]))):G("",!0),n.value.isEmpty?(S(),I("p",nr,h[46]||(h[46]=[a("strong",null,"空宫",-1)]))):G("",!0),n.value.ages&&n.value.ages.length>0?(S(),I("p",sr,[h[47]||(h[47]=a("strong",null,"年龄：",-1)),Z(x(n.value.ages.join("-"))+"岁 ",1)])):G("",!0)]),P(n.value).length>0?(S(),I("div",ar,[h[48]||(h[48]=a("h4",null,"星耀详情",-1)),N(n.value,"major").length>0?(S(),I("div",rr,[a("h5",null,"主星 ("+x(N(n.value,"major").length)+"颗)",1),a("div",or,[(S(!0),I(q,null,F(N(n.value,"major"),y=>(S(),I("div",{key:y.name,class:"star-detail"},[a("span",ir,x(y.name),1),y.brightness?(S(),I("span",lr,x(y.brightness),1)):G("",!0),y.mutagen?(S(),I("span",cr,x(y.mutagen),1)):G("",!0)]))),128))])])):G("",!0),N(n.value,"minor").length>0?(S(),I("div",ur,[a("h5",null,"辅星 ("+x(N(n.value,"minor").length)+"颗)",1),a("div",dr,[(S(!0),I(q,null,F(N(n.value,"minor"),y=>(S(),I("div",{key:y.name,class:"star-detail"},[a("span",hr,x(y.name),1),y.brightness?(S(),I("span",gr,x(y.brightness),1)):G("",!0),y.mutagen?(S(),I("span",mr,x(y.mutagen),1)):G("",!0)]))),128))])])):G("",!0),N(n.value,"adjective").length>0?(S(),I("div",pr,[a("h5",null,"杂耀 ("+x(N(n.value,"adjective").length)+"颗)",1),a("div",yr,[(S(!0),I(q,null,F(N(n.value,"adjective"),y=>(S(),I("div",{key:y.name,class:"star-detail"},[a("span",fr,x(y.name),1),y.brightness?(S(),I("span",vr,x(y.brightness),1)):G("",!0),y.mutagen?(S(),I("span",xr,x(y.mutagen),1)):G("",!0)]))),128))])])):G("",!0)])):G("",!0),n.value?(S(),I("div",Sr,[h[52]||(h[52]=a("h4",null,"宫位分析",-1)),a("div",_r,[a("div",Ir,[a("p",null,[a("strong",null,x(n.value.name)+"含义：",1),Z(x(B(n.value.name)),1)])]),a("div",$r,[a("p",null,[h[49]||(h[49]=a("strong",null,"星耀影响：",-1)),Z(x(K(n.value)),1)])]),a("div",br,[a("p",null,[h[50]||(h[50]=a("strong",null,"运势分析：",-1)),Z(x(W(n.value)),1)])]),a("div",wr,[a("p",null,[h[51]||(h[51]=a("strong",null,"建议指导：",-1)),Z(x(ue(n.value)),1)])])])])):G("",!0),a("div",kr,[h[58]||(h[58]=a("h4",null,"其他信息",-1)),n.value.changsheng12?(S(),I("p",Ar,[h[53]||(h[53]=a("strong",null,"长生十二神：",-1)),Z(x(n.value.changsheng12),1)])):G("",!0),n.value.boshi12?(S(),I("p",Pr,[h[54]||(h[54]=a("strong",null,"博士十二神：",-1)),Z(x(n.value.boshi12),1)])):G("",!0),n.value.jiangqian12?(S(),I("p",Cr,[h[55]||(h[55]=a("strong",null,"将前十二神：",-1)),Z(x(n.value.jiangqian12),1)])):G("",!0),n.value.suiqian12?(S(),I("p",Tr,[h[56]||(h[56]=a("strong",null,"岁前十二神：",-1)),Z(x(n.value.suiqian12),1)])):G("",!0),n.value.decadal?(S(),I("p",Er,[h[57]||(h[57]=a("strong",null,"大运：",-1)),Z(x(n.value.decadal),1)])):G("",!0)])])])])):G("",!0)]))])):G("",!0)]))}},nt=Ae(Lr,[["__scopeId","data-v-75fd29c5"]]);class Ur{constructor(){this.cache=new Map,this.inspirationCache=new Map,this.maxCacheSize=100,this.cacheVersion="1.0",this.init()}init(){try{const e=localStorage.getItem("ai_analysis_cache"),t=localStorage.getItem("ai_cache_version");if(e&&t===this.cacheVersion){const i=JSON.parse(e);this.cache=new Map(i)}else this.clearCache();const n=localStorage.getItem("ai_inspiration_cache");if(n&&t===this.cacheVersion){const i=JSON.parse(n);this.inspirationCache=new Map(i)}}catch(e){console.warn("加载AI缓存失败:",e),this.clearCache()}}generateCacheKey(e,t,n){const i={year:e.year,month:e.month,day:e.day,timeIndex:e.timeIndex,gender:e.gender,questionType:t,question:n.trim()},o=JSON.stringify(i);let r=0;for(let l=0;l<o.length;l++){const d=o.charCodeAt(l);r=(r<<5)-r+d,r=r&r}return Math.abs(r).toString(36)}shouldCache(e){return e!=="custom"}getCache(e,t,n){if(!this.shouldCache(t))return null;try{const i=this.generateCacheKey(e,t,n),o=this.cache.get(i);return o?(o.lastAccessed=Date.now(),this.cache.set(i,o),console.log("AI缓存命中:",t,n),o.response):null}catch(i){return console.warn("获取AI缓存失败:",i),null}}setCache(e,t,n,i){if(!(!this.shouldCache(t)||!i||!i.trim()))try{const o=this.generateCacheKey(e,t,n),r={response:i.trim(),createdAt:Date.now(),lastAccessed:Date.now(),questionType:t,question:n};this.cache.size>=this.maxCacheSize&&this.cleanupOldEntries(),this.cache.set(o,r),this.saveToStorage(),console.log("AI缓存已保存:",t,n)}catch(o){console.warn("保存AI缓存失败:",o)}}cleanupOldEntries(){try{const e=Array.from(this.cache.entries());e.sort((i,o)=>i[1].lastAccessed-o[1].lastAccessed);const t=Math.floor(this.maxCacheSize*.8),n=e.slice(0,e.length-t);n.forEach(([i])=>{this.cache.delete(i)}),console.log(`清理了 ${n.length} 个旧的AI缓存条目`)}catch(e){console.warn("清理AI缓存失败:",e)}}clearBaziCache(e){try{const t=JSON.stringify({year:e.year,month:e.month,day:e.day,timeIndex:e.timeIndex,gender:e.gender}),n=[];for(const[r,l]of this.cache.entries())try{const d=JSON.parse(atob(r));JSON.stringify({year:d.year,month:d.month,day:d.day,timeIndex:d.timeIndex,gender:d.gender})===t&&n.push(r)}catch{}n.forEach(r=>{this.cache.delete(r)});const i=this.generateBaziKey(e),o=this.inspirationCache.has(i);o&&this.inspirationCache.delete(i),(n.length>0||o)&&(this.saveToStorage(),console.log(`清理了 ${n.length} 个分析缓存条目和 ${o?1:0} 个问题灵感缓存`))}catch(t){console.warn("清理八字缓存失败:",t)}}getInspirationCache(e){try{const t=this.generateBaziKey(e),n=this.inspirationCache.get(t);return n?(n.lastAccessed=Date.now(),this.inspirationCache.set(t,n),console.log("问题灵感缓存命中"),n.suggestions):null}catch(t){return console.warn("获取问题灵感缓存失败:",t),null}}setInspirationCache(e,t){if(!(!t||!Array.isArray(t)||t.length===0))try{const n=this.generateBaziKey(e),i={suggestions:[...t],createdAt:Date.now(),lastAccessed:Date.now()};this.inspirationCache.set(n,i),this.saveToStorage(),console.log("问题灵感缓存已保存")}catch(n){console.warn("保存问题灵感缓存失败:",n)}}generateBaziKey(e){const t={year:e.year,month:e.month,day:e.day,timeIndex:e.timeIndex,gender:e.gender},n=JSON.stringify(t);let i=0;for(let o=0;o<n.length;o++){const r=n.charCodeAt(o);i=(i<<5)-i+r,i=i&i}return Math.abs(i).toString(36)}clearCache(){this.cache.clear(),this.inspirationCache.clear(),localStorage.removeItem("ai_analysis_cache"),localStorage.removeItem("ai_inspiration_cache"),localStorage.removeItem("ai_cache_version"),console.log("AI缓存已清空")}saveToStorage(){try{const e=Array.from(this.cache.entries()),t=Array.from(this.inspirationCache.entries());localStorage.setItem("ai_analysis_cache",JSON.stringify(e)),localStorage.setItem("ai_inspiration_cache",JSON.stringify(t)),localStorage.setItem("ai_cache_version",this.cacheVersion)}catch(e){if(console.warn("保存AI缓存到本地存储失败:",e),e.name==="QuotaExceededError"){this.cleanupOldEntries();try{const t=Array.from(this.cache.entries()),n=Array.from(this.inspirationCache.entries());localStorage.setItem("ai_analysis_cache",JSON.stringify(t)),localStorage.setItem("ai_inspiration_cache",JSON.stringify(n)),localStorage.setItem("ai_cache_version",this.cacheVersion)}catch(t){console.warn("重试保存AI缓存失败:",t)}}}}getStats(){return{size:this.cache.size,maxSize:this.maxCacheSize,version:this.cacheVersion}}}const _e=new Ur,Gr=at("bazi",()=>{const s=D({name:"",year:"",month:"",day:"",timeIndex:0,gender:""}),e=D({name:"",year:"",month:"",day:"",timeIndex:0,gender:""}),t=D(!1),n=D(null),i=D(null),o=D(!1),r=D(""),l=D(""),d=D(!1),u=D(""),g=new Map,c=he(()=>{const T=s.value.year&&s.value.month&&s.value.day&&s.value.gender;if(!t.value)return T;const P=e.value.year&&e.value.month&&e.value.day&&e.value.gender;return T&&P}),p=he(()=>n.value!==null),f=async()=>{if(!c.value)return r.value="请填写完整的出生信息",!1;const T=`bazi_${s.value.year}_${s.value.month}_${s.value.day}_${s.value.timeIndex}_${s.value.gender}`,P=g.get(T);if(P)return n.value=P,je(s.value),!0;const N="calculate-bazi";o.value=!0,r.value="";try{if(ye.showLoading("正在计算八字...",N),n.value){const B={year:n.value.year,month:n.value.month,day:n.value.day,timeIndex:n.value.timeIndex,gender:n.value.gender},K={year:s.value.year,month:s.value.month,day:s.value.day,timeIndex:s.value.timeIndex,gender:s.value.gender};JSON.stringify(B)!==JSON.stringify(K)&&_e.clearBaziCache(B)}return ye.updateLoadingMessage("正在计算第一人八字...",N),n.value={...pe.calculateBazi(parseInt(s.value.year),parseInt(s.value.month),parseInt(s.value.day),s.value.timeIndex,s.value.gender)},t.value?(ye.updateLoadingMessage("正在计算第二人八字...",N),i.value={...pe.calculateBazi(parseInt(e.value.year),parseInt(e.value.month),parseInt(e.value.day),e.value.timeIndex,e.value.gender)}):i.value=null,g.set(T,n.value),je(s.value),ye.hideLoading(N),ke("八字计算完成！"),!0}catch(B){ye.hideLoading(N),console.error("八字计算失败:",B);const K=B.message||"八字计算失败，请检查输入信息";return r.value=K,ge(K),Re.reportError(B,"八字计算"),!1}finally{o.value=!1}},v=async(T,P="custom",N=!1,B=!1)=>{if(!n.value){u.value="请先进行八字排盘",ge("请先进行八字排盘");return}d.value=!0,u.value="",N||(l.value="");let K=null,te=null;try{if(t.value&&i.value){const W=we(n.value),ue=we(i.value),de=fe.buildCompatibilityPrompt(W,ue,T);N&&(l.value+=`

---

## 追问：${T}

`);for await(const me of fe.queryAI(de))l.value+=me}else if(te={year:s.value.year,month:s.value.month,day:s.value.day,timeIndex:s.value.timeIndex,gender:s.value.gender},B||(K=_e.getCache(te,P,T),console.log("缓存检查:",{questionType:P,question:T.substring(0,50)+"...",hasCachedResponse:!!K,shouldCache:_e.shouldCache(P),cacheKey:_e.generateCacheKey(te,P,T).substring(0,20)+"..."})),K&&!B)N?l.value+=`

---

## 追问：${T}

${K}`:l.value=K,console.log("使用AI缓存结果");else{const W={id:L(P,T),dataset:{prompt:""}},ue=we(n.value,W),de=fe.buildPromptFromConfig(T,W,n.value);N&&(l.value+=`

---

## 追问：${T}

`);let me="";for await(const $ of fe.queryAI(de))l.value+=$,me+=$;me&&me.trim()&&(console.log("准备保存缓存:",{questionType:P,question:T.substring(0,50)+"...",shouldCache:_e.shouldCache(P),contentLength:me.trim().length}),_e.setCache(te,P,T,me.trim()),B&&console.log("强制重新生成，已更新缓存"))}}catch(W){console.error("AI 分析失败:",W);const ue=W.message||"AI 分析失败，请稍后重试";u.value=ue,ge(ue),Re.reportError(W,"AI分析")}finally{K&&!B?setTimeout(()=>{d.value=!1},100):d.value=!1}},w=()=>{fe.cancelRequest(),d.value=!1},k=()=>{if(n.value){const T={year:n.value.year,month:n.value.month,day:n.value.day,timeIndex:n.value.timeIndex,gender:n.value.gender};_e.clearBaziCache(T)}s.value={name:"",year:"",month:"",day:"",timeIndex:0,gender:""},e.value={name:"",year:"",month:"",day:"",timeIndex:0,gender:""},t.value=!1,n.value=null,i.value=null,l.value="",r.value="",u.value="",ie(),z()},m=()=>{l.value="",u.value=""},_=()=>{n.value=null,i.value=null,r.value="",l.value="",u.value="",o.value=!1,d.value=!1,z(),ie()},L=(T,P)=>{const N={mingge:"ai-mingge-zonglun","current-luck":"ai-current-luck",year:"ai-this-year","monthly-fortune":"ai-monthly-fortune","next-three-years":"ai-next-three-years","lifetime-fortune":"ai-lifetime-fortune",career:"ai-career",marriage:"ai-marriage",health:"ai-health",custom:"custom"};return P&&P.includes("选定日期")?"ask-ai-with-date":N[T]||"custom"},j=()=>{try{const T=Dt();if(T)return s.value={...s.value,...T.person1},e.value={...e.value,...T.person2},t.value=!0,X(T.person1.name,T.person2.name),!0;const P=Gt();return P?(s.value={...s.value,...P},X(P.name),!0):!1}catch(T){return console.error("从URL加载数据失败:",T),!1}},ae=()=>{try{t.value&&c.value&&e.value.year?(Mt(s.value,e.value),X(s.value.name,e.value.name)):c.value&&(je(s.value),X(s.value.name))}catch(T){console.error("保存数据到URL失败:",T)}},z=()=>{try{Nt(),Rt()}catch(T){console.error("清除URL数据失败:",T)}},M=()=>{try{return t.value&&e.value.year?ze(s.value,e.value):ze(s.value)}catch(T){return console.error("生成分享链接失败:",T),window.location.href}},V=()=>Bt(),X=(T,P=null)=>{try{let N="八字排盘";P?N=`${T||"第一人"}与${P||"第二人"}的八字合盘分析`:T&&(N=`${T}的八字排盘`),document.title=N;const B=document.querySelector('meta[property="og:title"]');B&&B.setAttribute("content",N);const K=document.querySelector('meta[name="description"]');if(K&&T){let te="专业的AI八字排盘和命理分析工具";P?te=`${T}与${P}的八字合盘分析，专业AI命理解读`:te=`${T}的八字排盘结果，专业AI命理分析`,K.setAttribute("content",te)}}catch(N){console.error("更新页面标题失败:",N)}},ie=()=>{try{document.title="八字排盘";const T=document.querySelector('meta[property="og:title"]');T&&T.setAttribute("content","八字排盘");const P=document.querySelector('meta[name="description"]');P&&P.setAttribute("content","专业的AI八字排盘和命理分析工具")}catch(T){console.error("重置页面标题失败:",T)}};return{person1:s,person2:e,enableSecondPerson:t,baziResult1:n,baziResult2:i,isCalculating:o,calculationError:r,aiResponse:l,isAIThinking:d,aiError:u,canCalculate:c,hasResults:p,calculateBazi:f,askAI:v,cancelAI:w,resetForm:k,resetAI:m,clearResults:_,loadFromUrl:j,saveToUrl:ae,clearUrl:z,getShareUrl:M,hasUrlData:V,updatePageTitle:X,resetPageTitle:ie}});const Nr={key:0,class:"ai-chat-container"},jr={class:"question-options"},Mr={class:"question-buttons-container"},Dr={class:"question-buttons"},Rr=["onClick"],Br={key:0,class:"custom-question"},Or={key:1,class:"error-message"},Yr=["disabled"],Zr={class:"inspiration-container"},Hr={class:"inspiration-tab-navigation"},qr=["onClick"],Kr={class:"inspiration-tab-content"},Jr={key:0,class:"inspiration-tab-pane"},Vr={class:"questions-grid"},Wr=["onClick"],Fr=["innerHTML"],Qr={key:0,class:"thinking-indicator"},zr={key:1,class:"continue-explore"},Xr={key:0,class:"user-question-context"},eo={class:"user-question"},to={class:"explore-section"},no={key:0,class:"suggested-questions"},so=["onClick"],ao=["disabled"],ro={key:0,class:"suggestion-updating"},oo={key:1,class:"suggestion-loading"},io={key:2,class:"suggestion-loading"},lo={class:"explore-section"},co={class:"free-chat-input"},uo=["disabled"],ho=["disabled"],go={class:"quick-actions"},mo=["disabled"],po=["disabled"],yo=["disabled"],fo={__name:"AIChat",setup(s){const e=yt(),t=he(()=>e.path.includes("/zw")),n=he(()=>t.value?Ge():Gr()),i=D(""),o=D(""),r=D(!1),l=D(t.value?"personality":"ganqing"),d=D([]),u=D({}),g=D([]),c=D(!1),p=D(""),f=D(null),v=D(""),w=new Map,k=new It(f),m=D(!1),_=D(null),L=D(null),j=D(null),ae=[{id:"ai-mingge-zonglun",text:"命格总论",type:"mingge"},{id:"ai-current-luck",text:"当前大运",type:"current-luck"},{id:"ai-this-year",text:"今年运势",type:"year"},{id:"ai-monthly-fortune",text:"年运逐月",type:"monthly-fortune"},{id:"ai-next-three-years",text:"未来三年",type:"next-three-years"},{id:"ai-lifetime-fortune",text:"一生运势",type:"lifetime-fortune"},{id:"ai-career",text:"事业财运",type:"career"},{id:"ai-marriage",text:"感情婚姻",type:"marriage"},{id:"ai-health",text:"健康状况",type:"health"},{id:"ask-ai-with-date",text:"选定日期...",type:"custom"},{id:"custom",text:"自定义...",type:"custom"}],z=[{id:"ai-compat-marriage",text:"婚恋匹配",type:"marriage"},{id:"ai-compat-career",text:"事业合作",type:"career"},{id:"ai-compat-custom",text:"自定义...",type:"custom"}],M=[{id:"ai-ziwei-personality",text:"性格分析",type:"personality"},{id:"ai-ziwei-career",text:"事业财运",type:"career"},{id:"ai-ziwei-relationship",text:"感情婚姻",type:"relationship"},{id:"ai-ziwei-health",text:"健康状况",type:"health"},{id:"ai-ziwei-fortune",text:"运势分析",type:"fortune"},{id:"ai-ziwei-palace",text:"宫位分析",type:"palace"},{id:"custom",text:"自定义...",type:"custom"}],V=[{id:"ai-ziwei-compat",text:"合盘分析",type:"compatibility"},{id:"ai-ziwei-marriage",text:"感情匹配",type:"relationship"},{id:"ai-ziwei-cooperation",text:"事业合作",type:"career"},{id:"custom",text:"自定义...",type:"custom"}],X=[{id:"ganqing",name:"感情",content:[{title:"情感发展",questions:[{text:"我近期的桃花运怎么样？",type:"marriage"},{text:"我们目前的感情走向如何？",type:"marriage"},{text:"他/她对我的真实情感是什么？",type:"marriage"},{text:"我们之间有未来吗？",type:"marriage"},{text:"如何改善我们目前的关系？",type:"marriage"},{text:"这段感情对我的影响？",type:"marriage"},{text:"我在感情中容易犯什么错误？",type:"marriage"},{text:"如何处理感情中的矛盾冲突？",type:"marriage"}]},{title:"正缘婚姻",questions:[{text:"我的正缘什么时候出现？",type:"marriage"},{text:"我的另一半是什么样的人？",type:"marriage"},{text:"我何时会结婚？",type:"marriage"},{text:"我适合和现在的对象结婚吗？",type:"marriage"},{text:"我的婚姻生活会幸福吗？",type:"marriage"},{text:"如何吸引我的正缘桃花？",type:"marriage"},{text:"我适合什么年龄结婚？",type:"marriage"},{text:"婚后我需要注意什么问题？",type:"marriage"}]},{title:"感情困扰",questions:[{text:"为什么我总是遇到不合适的人？",type:"marriage"},{text:"如何走出失恋的阴霾？",type:"marriage"},{text:"我在感情中缺乏什么？",type:"marriage"},{text:"如何提升自己的魅力？",type:"marriage"},{text:"异地恋能否有好结果？",type:"marriage"},{text:"如何判断对方是否真心？",type:"marriage"}]}]},{id:"shiye",name:"事业",content:[{title:"事业发展",questions:[{text:"我适合现在的工作/行业吗？",type:"career"},{text:"我的事业什么时候能成功？",type:"career"},{text:"我适合跳槽还是继续坚守？",type:"career"},{text:"我事业上的贵人会是谁？",type:"career"},{text:"我未来的事业走向怎么样？",type:"career"},{text:"我什么时候能找到满意的工作？",type:"career"},{text:"我适合创业还是打工？",type:"career"},{text:"如何在职场中脱颖而出？",type:"career"}]},{title:"职业规划",questions:[{text:"我最适合从事什么行业？",type:"career"},{text:"我的职业天赋在哪里？",type:"career"},{text:"如何规划我的职业发展路径？",type:"career"},{text:"我适合做管理还是技术？",type:"career"},{text:"转行对我来说是好选择吗？",type:"career"},{text:"我在什么环境下工作最有效率？",type:"career"}]},{title:"工作困扰",questions:[{text:"如何处理职场人际关系？",type:"career"},{text:"为什么我的工作总是不顺利？",type:"career"},{text:"如何获得上司的认可？",type:"career"},{text:"我在工作中的弱点是什么？",type:"career"},{text:"如何平衡工作与生活？",type:"career"},{text:"面对工作压力该如何调节？",type:"career"}]}]},{id:"caifu",name:"财富",content:[{title:"财运趋势",questions:[{text:"我近期的财运怎么样？",type:"career"},{text:"我这辈子财运的整体趋势？",type:"career"},{text:"我什么时候能发财？",type:"career"},{text:"我适合靠什么方式赚钱？",type:"career"},{text:"如何有效提升我的财运？",type:"career"},{text:"我近期会有意外之财吗？",type:"career"},{text:"我的财富巅峰期在什么时候？",type:"career"},{text:"我容易在哪些方面破财？",type:"career"}]},{title:"投资理财",questions:[{text:"我适合投资股票还是房产？",type:"career"},{text:"我的投资运势如何？",type:"career"},{text:"什么时候是我投资的好时机？",type:"career"},{text:"我适合保守理财还是激进投资？",type:"career"},{text:"如何避免投资失败？",type:"career"},{text:"我有做生意的天赋吗？",type:"career"}]},{title:"财富管理",questions:[{text:"如何培养正确的金钱观？",type:"career"},{text:"我为什么总是存不住钱？",type:"career"},{text:"如何增加被动收入？",type:"career"},{text:"我适合与人合伙做生意吗？",type:"career"},{text:"如何平衡消费与储蓄？",type:"career"},{text:"我的财富会传承给下一代吗？",type:"career"}]}]},{id:"renji",name:"人际",content:[{title:"社交模式",questions:[{text:"我的人际交往模式有何优缺点？",type:"mingge"},{text:"如何拓展我的高质量社交圈？",type:"mingge"},{text:"我目前的人际关系状态如何？",type:"mingge"},{text:"我会吸引哪些人进入我的生活？",type:"mingge"},{text:"如何获得他人的信任与支持？",type:"mingge"},{text:"如何处理与朋友的矛盾？",type:"mingge"},{text:"我在社交中的天然优势是什么？",type:"mingge"},{text:"如何克服社交恐惧？",type:"mingge"}]},{title:"家庭关系",questions:[{text:"如何改善与父母的关系？",type:"mingge"},{text:"我与兄弟姐妹的关系如何？",type:"mingge"},{text:"如何处理家庭矛盾？",type:"mingge"},{text:"我在家庭中扮演什么角色？",type:"mingge"},{text:"如何平衡家庭与个人发展？",type:"mingge"},{text:"我会是一个好父母吗？",type:"mingge"}]},{title:"人际困扰",questions:[{text:"为什么我总是遇到小人？",type:"mingge"},{text:"如何识别身边的真假朋友？",type:"mingge"},{text:"我在人际关系中的盲点是什么？",type:"mingge"},{text:"如何提升自己的人格魅力？",type:"mingge"},{text:"如何在团队中发挥领导力？",type:"mingge"},{text:"我适合与什么样的人深交？",type:"mingge"}]}]},{id:"rensheng",name:"成长",content:[{title:"个人成长",questions:[{text:"我的性格优势和劣势是什么？",type:"mingge"},{text:"我的人生主要课题是什么？",type:"mingge"},{text:"如何找到我的人生方向？",type:"mingge"},{text:"如何克服我性格中的弱点？",type:"mingge"},{text:"如何有效提升自己的能量状态？",type:"mingge"},{text:"我的人生转折点在何时？",type:"mingge"},{text:"我的天赋和潜能在哪里？",type:"mingge"},{text:"如何建立强大的内心？",type:"mingge"}]},{title:"人生规划",questions:[{text:"我这一生的使命是什么？",type:"mingge"},{text:"如何制定适合自己的人生目标？",type:"mingge"},{text:"我在什么年龄段会迎来人生高峰？",type:"mingge"},{text:"如何平衡理想与现实？",type:"mingge"},{text:"我的人生会有几次重大机遇？",type:"mingge"},{text:"如何为未来做好准备？",type:"mingge"}]},{title:"心理健康",questions:[{text:"如何管理自己的情绪？",type:"health"},{text:"我容易患哪些心理问题？",type:"health"},{text:"如何提升心理抗压能力？",type:"health"},{text:"如何走出人生低谷？",type:"health"},{text:"我的心理盲点在哪里？",type:"health"},{text:"如何保持积极的心态？",type:"health"}]},{title:"身体健康",questions:[{text:"我需要重点关注哪些健康问题？",type:"health"},{text:"我的体质特点是什么？",type:"health"},{text:"如何制定适合自己的养生方案？",type:"health"},{text:"我在什么年龄段需要特别注意健康？",type:"health"},{text:"如何通过饮食调理身体？",type:"health"},{text:"我适合什么样的运动方式？",type:"health"}]}]},{id:"xueye",name:"学业",content:[{title:"学习能力",questions:[{text:"我的学习天赋在哪个领域？",type:"mingge"},{text:"如何提高我的学习效率？",type:"mingge"},{text:"我适合什么样的学习方式？",type:"mingge"},{text:"如何克服学习中的困难？",type:"mingge"},{text:"我在学习中的优势和劣势？",type:"mingge"},{text:"如何培养良好的学习习惯？",type:"mingge"}]},{title:"专业选择",questions:[{text:"我适合学习什么专业？",type:"career"},{text:"文科还是理科更适合我？",type:"career"},{text:"我应该选择什么样的大学？",type:"career"},{text:"出国留学对我有利吗？",type:"career"},{text:"我的专业会有好的就业前景吗？",type:"career"},{text:"转专业对我来说是好选择吗？",type:"career"}]},{title:"考试运势",questions:[{text:"我的考试运势如何？",type:"year"},{text:"什么时候是我考试的最佳时机？",type:"year"},{text:"如何在重要考试中发挥最佳状态？",type:"year"},{text:"我容易在考试中犯什么错误？",type:"year"},{text:"如何克服考试焦虑？",type:"health"},{text:"我的学业会在什么时候迎来转机？",type:"year"}]},{title:"教育发展",questions:[{text:"我适合继续深造还是直接工作？",type:"career"},{text:"读研究生对我的发展有帮助吗？",type:"career"},{text:"我有做老师的天赋吗？",type:"career"},{text:"如何在学术道路上取得成功？",type:"career"},{text:"我适合从事教育行业吗？",type:"career"},{text:"如何平衡学习与其他生活？",type:"mingge"}]}]}],ie=[{id:"personality",name:"性格命格",content:[{title:"命宫分析",questions:[{text:"我的命宫主星是什么？有什么特质？",type:"personality"},{text:"我的性格优势和劣势是什么？",type:"personality"},{text:"我的天赋才能在哪些方面？",type:"personality"},{text:"我适合什么样的人生道路？",type:"personality"},{text:"我的命格层次如何？",type:"personality"},{text:"我的性格中最突出的特点是什么？",type:"personality"},{text:"我在人际交往中的表现如何？",type:"personality"},{text:"我的领导能力和管理才能如何？",type:"personality"}]},{title:"身宫特质",questions:[{text:"我的身宫在哪里？有什么意义？",type:"personality"},{text:"我的人生重心应该放在哪里？",type:"personality"},{text:"身宫对我的性格有什么影响？",type:"personality"},{text:"如何发挥身宫的正面作用？",type:"personality"}]},{title:"福德宫分析",questions:[{text:"我的精神世界和内心状态如何？",type:"personality"},{text:"我的兴趣爱好和精神追求是什么？",type:"personality"},{text:"我如何获得内心的平静和快乐？",type:"personality"},{text:"我的思维模式和价值观如何？",type:"personality"}]}]},{id:"career",name:"事业财运",content:[{title:"官禄宫分析",questions:[{text:"我适合什么类型的工作？",type:"career"},{text:"我的事业发展方向是什么？",type:"career"},{text:"我什么时候会有事业突破？",type:"career"},{text:"我适合创业还是打工？",type:"career"},{text:"我的职场贵人运如何？",type:"career"},{text:"我在工作中容易遇到什么挑战？",type:"career"},{text:"我的升职加薪运势如何？",type:"career"},{text:"我适合在什么行业发展？",type:"career"}]},{title:"财帛宫分析",questions:[{text:"我的财运如何？",type:"career"},{text:"我适合什么样的投资理财？",type:"career"},{text:"我什么时候会有财运提升？",type:"career"},{text:"我的偏财运和正财运如何？",type:"career"},{text:"我容易在哪些方面破财？",type:"career"},{text:"我的理财观念和消费习惯如何？",type:"career"},{text:"我适合做什么样的投资？",type:"career"},{text:"我的财富积累能力如何？",type:"career"}]},{title:"田宅宫分析",questions:[{text:"我的房产运势如何？",type:"career"},{text:"我什么时候适合买房？",type:"career"},{text:"我适合投资房地产吗？",type:"career"},{text:"我的家庭环境对我有什么影响？",type:"career"}]}]},{id:"relationship",name:"感情婚姻",content:[{title:"夫妻宫分析",questions:[{text:"我的另一半会是什么样的人？",type:"relationship"},{text:"我什么时候会遇到正缘？",type:"relationship"},{text:"我的婚姻运势如何？",type:"relationship"},{text:"我在感情中需要注意什么？",type:"relationship"},{text:"我的桃花运什么时候最旺？",type:"relationship"},{text:"我容易遇到什么样的感情问题？",type:"relationship"},{text:"我的婚姻会幸福美满吗？",type:"relationship"},{text:"我如何改善夫妻关系？",type:"relationship"}]},{title:"子女宫分析",questions:[{text:"我的子女缘分如何？",type:"relationship"},{text:"我适合什么时候要孩子？",type:"relationship"},{text:"我的孩子会是什么性格？",type:"relationship"},{text:"我和孩子的关系如何？",type:"relationship"},{text:"我的子女对我的事业有什么影响？",type:"relationship"},{text:"我如何教育孩子？",type:"relationship"}]},{title:"兄弟宫分析",questions:[{text:"我和兄弟姐妹的关系如何？",type:"relationship"},{text:"我的朋友运势如何？",type:"relationship"},{text:"我容易交到什么样的朋友？",type:"relationship"},{text:"我在团队合作中的表现如何？",type:"relationship"}]}]},{id:"health",name:"健康疾厄",content:[{title:"疾厄宫分析",questions:[{text:"我需要注意哪些健康问题？",type:"health"},{text:"我的体质特点是什么？",type:"health"},{text:"我容易得什么疾病？",type:"health"},{text:"我如何保养身体？",type:"health"},{text:"我的精神健康状况如何？",type:"health"},{text:"我什么时候需要特别注意健康？",type:"health"},{text:"我适合什么样的运动和养生方式？",type:"health"},{text:"我的睡眠质量如何改善？",type:"health"}]},{title:"意外灾厄",questions:[{text:"我需要防范哪些意外？",type:"health"},{text:"我什么时候要特别小心？",type:"health"},{text:"我如何化解不利因素？",type:"health"},{text:"我的安全运势如何？",type:"health"}]}]},{id:"fortune",name:"运势流年",content:[{title:"大运分析",questions:[{text:"我现在处于什么大运？",type:"fortune"},{text:"我的大运对我有什么影响？",type:"fortune"},{text:"我下一个大运会如何？",type:"fortune"},{text:"我的大运什么时候最好？",type:"fortune"},{text:"我如何把握大运机遇？",type:"fortune"},{text:"我的大运对事业有什么影响？",type:"fortune"},{text:"我的大运对感情有什么影响？",type:"fortune"},{text:"我如何度过不利的大运？",type:"fortune"}]},{title:"流年分析",questions:[{text:"今年我的运势如何？",type:"fortune"},{text:"明年我需要注意什么？",type:"fortune"},{text:"我什么时候运势最好？",type:"fortune"},{text:"今年我的事业运如何？",type:"fortune"},{text:"今年我的财运如何？",type:"fortune"},{text:"今年我的感情运如何？",type:"fortune"},{text:"今年我的健康运如何？",type:"fortune"},{text:"我如何提升今年的运势？",type:"fortune"}]}]}],T=he(()=>t.value?ie:X),P=C=>{xt(()=>{const E=T.value.findIndex(ne=>ne.id===C);if(E===-1||!d.value[E]){setTimeout(()=>P(C),50);return}const Y=d.value[E];if(Y.offsetLeft===0&&Y.offsetWidth===0){setTimeout(()=>P(C),50);return}u.value={left:`${Y.offsetLeft}px`,width:`${Y.offsetWidth}px`}})};Ie(l,C=>{P(C)},{immediate:!0});const N=C=>{l.value=C},B=he(()=>t.value?n.value.enableSecondPerson?V:M:n.value.enableSecondPerson?z:ae),K=he(()=>r.value?o.value.trim().length>0:i.value!==""),te=he(()=>{if(!n.value.aiResponse)return"";const C=n.value.aiResponse.replace(/^---+$/gm,"");return bt.parse(C)}),W=C=>{i.value=C.id,r.value=C.type==="custom",r.value||(o.value="")},ue=async()=>{let C="",E="custom";if(r.value)C=o.value.trim();else{const Y=B.value.find(ne=>ne.id===i.value);Y&&(C=Y.text,E=Y.type)}C&&(v.value=C,re(),await n.value.askAI(C,E))},de=async(C,E="custom")=>{console.log("问题灵感调用:",{question:C,questionType:E}),v.value=C,re(),await n.value.askAI(C,E)},me=async()=>{if(c.value){console.log("智能建议生成已在进行中，跳过");return}const C=`suggestions_${n.value.person1?.year}_${n.value.person1?.month}_${n.value.person1?.day}_${v.value}`,E=w.get(C);if(E){g.value=E;return}c.value=!0;const Y=setTimeout(()=>{c.value&&(console.warn("智能建议生成超时"),c.value=!1)},6e3);try{if(!(t.value?n.value.ziWeiResult1:n.value.baziResult1)){console.log("没有排盘数据，跳过建议生成"),clearTimeout(Y),c.value=!1;return}await new Promise(oe=>setTimeout(oe,800));const xe=`用户刚刚问了这个问题："${v.value||""}"

请根据这个问题，生成3个用户可能感兴趣的相关后续问题。这些问题应该：
1. 与原问题相关但有所延伸
2. 能够帮助用户更深入了解相关话题
3. 实用且有价值

请直接输出3个问题，每行一个，不要编号，不要其他说明文字。`;try{console.log("开始AI建议生成请求");let oe="";for await(const Se of fe.queryAI(xe))oe+=Se;if(console.log("AI建议生成完成，原始响应:",oe),oe&&oe.trim()){const Se=oe.split(`
`).map(Ce=>Ce.trim()).filter(Ce=>Ce&&!Ce.match(/^\d+\./)&&Ce.length>5).slice(0,3);console.log("处理后的建议:",Se),Se.length>0?(console.log("设置建议前的状态:",{currentSuggestions:g.value,newSuggestions:Se,isGenerating:c.value}),g.value=Se,w.set(C,Se),console.log("设置建议后的状态:",{currentSuggestions:g.value,isGenerating:c.value})):console.log("没有有效的建议内容")}else console.log("AI返回空内容")}catch(oe){if(oe.name==="AbortError"){console.log("建议生成请求被中止，这是正常的");return}console.warn("AI生成建议失败:",oe)}}catch(ne){k.handle(ne,"生成建议",!1)}finally{clearTimeout(Y),c.value=!1}},$=async()=>{if(!c.value){c.value=!0;try{if(!(t.value?n.value.ziWeiResult1:n.value.baziResult1))return;await new Promise(Q=>setTimeout(Q,1e3));const E=n.value.aiResponse||"",ne=`请基于以下八字分析结果和用户问题，重新生成3个不同的后续问题建议：

用户问题：${v.value||""}

分析结果：${E.substring(0,500)}...

请生成3个与之前不同的、与用户问题和分析结果高度相关的后续问题，格式为纯文本，每行一个问题，不要编号。`;try{let Q="";for await(const xe of fe.queryAI(ne))Q+=xe;if(Q&&Q.trim()){const xe=Q.split(`
`).map(oe=>oe.trim()).filter(oe=>oe&&!oe.match(/^\d+\./)&&oe.length>5).slice(0,3);if(xe.length>0){g.value=xe,c.value=!1;return}}}catch(Q){if(Q.name==="AbortError"){console.log("重新生成建议请求被中止，这是正常的"),c.value=!1;return}console.warn("AI重新生成建议失败:",Q)}}catch(C){console.error("重新生成建议失败:",C)}finally{c.value=!1}}},h=async C=>{v.value=C,re(),await n.value.askAI(C,"custom",!0),setTimeout(()=>{O()},500)},y=async()=>{if(!p.value.trim())return;const C=p.value.trim();p.value="",v.value=C,re(),await n.value.askAI(C,"custom",!0),setTimeout(()=>{O()},500)},b=async()=>{const C=`请对我的${v.value||"八字分析"}进行更详细深入的分析，包括具体的时间节点和注意事项`;v.value=C,re(),await n.value.askAI(C,"custom"),setTimeout(()=>{O()},500)},U=async()=>{const C=new Date().getFullYear(),E=`我在${C}年和${C+1}年的运势如何？有哪些重要时间节点？`;v.value=E,re(),await n.value.askAI(E,"custom"),setTimeout(()=>{O()},500)},J=async()=>{const C="基于我的八字，如何改善和提升我的运势？有什么具体的方法和建议？";v.value=C,re(),await n.value.askAI(C,"custom"),setTimeout(()=>{O()},500)},R=async()=>{if(!n.value.aiResponse){f.value&&f.value.addToast("暂无AI回答内容可复制","warning","",3e3);return}try{const C=new Date().toLocaleString("zh-CN");let E=`八字分析结果
`;E+=`生成时间：${C}
`,E+=`${"=".repeat(30)}

`,E+=`问题：${v.value||"八字分析"}

`,E+=`回答：
${n.value.aiResponse.replace(/<[^>]*>/g,"").replace(/&nbsp;/g," ")}

`,E+=`${"=".repeat(30)}
`,E+=`来源：八字排盘系统
`,await navigator.clipboard.writeText(E),f.value&&f.value.addToast("AI回答已复制到剪贴板","success","",3e3)}catch(C){console.error("复制失败:",C),f.value&&f.value.addToast("复制失败，请手动选择复制","error","",3e3)}},le=()=>{be=Date.now(),O(),setTimeout(()=>{if(be=Date.now(),L.value)L.value.scrollIntoView({behavior:"smooth",block:"end"});else{const C=document.querySelector(".ai-response");C&&C.scrollIntoView({behavior:"smooth",block:"end"})}},100)},re=()=>{m.value=!0,console.log("开始自动滚动"),setTimeout(()=>{le()},100),_.value=setInterval(()=>{m.value&&(n.value.isAIThinking||n.value.aiResponse)&&(O(),n.value.isAIThinking&&L.value&&setTimeout(()=>{L.value.scrollIntoView({behavior:"smooth",block:"nearest"})},100))},500)},O=()=>{try{be=Date.now(),window.scrollTo({top:999999,behavior:"smooth"}),setTimeout(()=>{be=Date.now();const C=document.documentElement.scrollHeight;window.scrollTo({top:C+1e3,behavior:"smooth"})},100)}catch{try{be=Date.now(),window.scrollTo(0,999999)}catch(E){console.error("滚动失败:",E)}}},Ne=()=>{m.value=!1,_.value&&(clearInterval(_.value),_.value=null),Pe=!1};let be=0;const Ye=()=>{!m.value||Date.now()-be<3e3},ht=C=>{f.value&&f.value.addToast(C,"success","AI分析完成",4e3)};B.value.length>0&&W(B.value[0]),Ie(()=>n.value.isAIThinking,(C,E)=>{E&&!C&&n.value.aiResponse&&n.value.aiResponse.trim()&&(setTimeout(()=>{O()},200),setTimeout(()=>{O()},800),console.log("AI分析完成，自动滚动继续运行，用户可通过滚动操作停止"),ht("请查看分析结果"))}),Ie(()=>n.value.aiResponse,(C,E)=>{C&&C!==E&&(setTimeout(()=>{(m.value||C.length>E?.length+50)&&O()},100),setTimeout(()=>{(m.value||C.length>E?.length+50)&&O()},300))}),Ie(()=>n.value.isAIThinking,(C,E)=>{console.log("AI思考状态变化:",{wasThinking:E,isThinking:C,hasResponse:!!n.value.aiResponse}),E&&!C&&n.value.aiResponse&&n.value.aiResponse.trim()&&v.value&&(console.log("AI回答完成，准备生成智能建议"),j.value&&clearTimeout(j.value),j.value=setTimeout(()=>{console.log("检查是否可以生成建议:",{isGenerating:c.value,hasUserQuestion:!!v.value}),!c.value&&v.value?(console.log("条件满足，基于用户问题生成智能建议"),me()):console.log("跳过建议生成，条件不满足")},500))});let Pe=!1;const Ze=()=>{m.value&&(Pe=!0,Ne())},He=()=>{m.value&&(Pe=!0)},qe=()=>{m.value&&Pe&&(Ne(),Pe=!1)};return typeof window<"u"&&(window.addEventListener("scroll",Ye,{passive:!0}),window.addEventListener("wheel",Ze,{passive:!0}),window.addEventListener("touchstart",He,{passive:!0}),window.addEventListener("touchmove",qe,{passive:!0})),ft(()=>{Ne(),j.value&&clearTimeout(j.value),typeof window<"u"&&(window.removeEventListener("scroll",Ye),window.removeEventListener("wheel",Ze),window.removeEventListener("touchstart",He),window.removeEventListener("touchmove",qe))}),(C,E)=>(S(),I(q,null,[n.value.hasResults?(S(),I("div",Nr,[a("div",jr,[a("h3",null,x(n.value.enableSecondPerson?"AI 合盘分析":t.value?"AI 紫薇斗数分析":"AI 命理分析"),1),a("div",Mr,[a("div",Dr,[(S(!0),I(q,null,F(B.value,Y=>(S(),I("button",{key:Y.id,class:se(["question-button",{selected:i.value===Y.id}]),onClick:ne=>W(Y)},x(Y.text),11,Rr))),128))])]),r.value?(S(),I("div",Br,[ee(a("input",{"onUpdate:modelValue":E[0]||(E[0]=Y=>o.value=Y),type:"text",placeholder:"请输入您的问题",onKeyup:Je(ue,["enter"])},null,544),[[ce,o.value]])])):G("",!0),n.value.aiError?(S(),I("div",Or,x(n.value.aiError),1)):G("",!0),a("button",{class:se(["primary-button ai-button",{thinking:n.value.isAIThinking}]),disabled:!K.value||n.value.isAIThinking,onClick:ue},x(n.value.isAIThinking?"AI 思考中...":n.value.enableSecondPerson?"AI 合盘分析":"向 AI 提问"),11,Yr)]),a("div",Zr,[E[2]||(E[2]=a("h3",null,"问题灵感",-1)),a("div",Hr,[(S(!0),I(q,null,F(T.value,(Y,ne)=>(S(),I("button",{key:Y.id,ref_for:!0,ref:Q=>{Q&&(d.value[ne]=Q)},class:se(["inspiration-tab-button",{active:l.value===Y.id}]),onClick:Q=>N(Y.id)},x(Y.name),11,qr))),128)),a("div",{class:"inspiration-active-tab-indicator",style:vt(u.value)},null,4)]),a("div",Kr,[(S(!0),I(q,null,F(T.value,Y=>(S(),I(q,{key:Y.id},[l.value===Y.id?(S(),I("div",Jr,[(S(!0),I(q,null,F(Y.content,ne=>(S(),I("div",{key:ne.title,class:"question-group"},[a("h4",null,x(ne.title),1),a("div",Vr,[(S(!0),I(q,null,F(ne.questions,Q=>(S(),I("p",{key:Q.text,onClick:xe=>de(Q.text,Q.type)},x(Q.text),9,Wr))),128))])]))),128))])):G("",!0)],64))),128))])]),n.value.aiResponse||n.value.isAIThinking?(S(),I("div",{key:0,class:"ai-response",ref_key:"aiResponseRef",ref:L},[E[4]||(E[4]=a("h3",null,"AI 分析结果",-1)),a("div",{class:"response-content",innerHTML:te.value},null,8,Fr),n.value.isAIThinking?(S(),I("div",Qr,E[3]||(E[3]=[a("div",{class:"thinking-dots"},[a("span"),a("span"),a("span")],-1),a("p",null,"AI 正在深度分析中...",-1)]))):G("",!0)],512)):G("",!0),n.value.aiResponse&&!n.value.isAIThinking?(S(),I("div",zr,[E[12]||(E[12]=a("h3",null,"继续探索",-1)),v.value?(S(),I("div",Xr,[E[5]||(E[5]=a("h4",null,"您的问题",-1)),a("p",eo,x(v.value),1)])):G("",!0),a("div",to,[E[9]||(E[9]=a("h4",null,"智能建议",-1)),g.value.length>0?(S(),I("div",no,[(S(!0),I(q,null,F(g.value,(Y,ne)=>(S(),I("p",{key:ne,onClick:Q=>h(Y),class:"suggested-question"},x(Y),9,so))),128)),a("button",{onClick:$,class:"suggested-question regenerate-btn",disabled:c.value},x(c.value?"正在更新...":"重新生成建议"),9,ao),c.value?(S(),I("div",ro,E[6]||(E[6]=[a("p",{class:"updating-text"},"正在更新建议...",-1)]))):G("",!0)])):c.value?(S(),I("div",oo,E[7]||(E[7]=[a("p",null,"正在生成智能建议...",-1)]))):(S(),I("div",io,E[8]||(E[8]=[a("p",null,"正在准备智能建议...",-1)])))]),a("div",lo,[E[10]||(E[10]=a("h4",null,"自由对话",-1)),a("div",co,[ee(a("input",{"onUpdate:modelValue":E[1]||(E[1]=Y=>p.value=Y),type:"text",placeholder:"继续询问相关问题...",onKeypress:Je(y,["enter"]),disabled:n.value.isAIThinking},null,40,uo),[[ce,p.value]]),a("button",{onClick:y,disabled:!p.value.trim()||n.value.isAIThinking},x(n.value.isAIThinking?"发送中...":"发送"),9,ho)]),E[11]||(E[11]=a("div",{class:"chat-tips"},[a("small",null,'💡 提示：可以询问更具体的问题，如"明年3月适合跳槽吗？"')],-1))]),a("div",go,[a("button",{class:"action-btn",onClick:b,disabled:n.value.isAIThinking}," 📊 详细分析 ",8,mo),a("button",{class:"action-btn",onClick:U,disabled:n.value.isAIThinking}," 📅 时间运势 ",8,po),a("button",{class:"action-btn",onClick:J,disabled:n.value.isAIThinking}," 💡 改善建议 ",8,yo),a("button",{class:"action-btn",onClick:R}," 📋 复制结果 ")])])):G("",!0)])):G("",!0),ve($t,{ref_key:"toastRef",ref:f},null,512)],64))}},st=Ae(fo,[["__scopeId","data-v-0d9c4cda"]]);const vo={class:"ziwei-view"},xo={key:0,class:"desktop-layout"},So={class:"left-panel"},_o={class:"right-panel"},Io={key:1,class:"mobile-layout"},$o={__name:"ZiWeiView",setup(s){const e=Ge();return St(()=>{e.resetPageTitle(),e.restoreDataFromUrl(),console.log("紫薇斗数页面已加载")}),(t,n)=>(S(),I("div",vo,[ve(Vn),A(e).hasResults?(S(),I("div",xo,[a("div",So,[ve(nt)]),a("div",_o,[ve(st)])])):G("",!0),A(e).hasResults?(S(),I("div",Io,[ve(nt),ve(st)])):G("",!0)]))}},Co=Ae($o,[["__scopeId","data-v-2b79d4c2"]]);export{Co as default};
