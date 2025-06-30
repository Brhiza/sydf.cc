import{r as Y,j as ce,v as tt,x as Ie,y as ie,z as it,A as P,b as I,d as b,i as a,B as me,F as W,h as Q,C as Ze,n as se,t as f,f as j,D as lt,E as O,c as ct,l as ut,g as ht,G as dt,a as gt,H as He,k as mt,e as $e,I as pt,o as yt}from"./vendor-2cc2d261.js";import{a as qe}from"./iztro-8dcb482b.js";import{s as Se,l as pe,a as nt,e as Me,_ as Te,E as ft,T as vt}from"./zw-4474403d.js";import{S as Ee,G as ke,a as Pe}from"./tyme-86b89837.js";import{m as xt}from"./marked-9682a234.js";function Je(s,e,t,n,i,r=!1){try{if(!s||!e||!t||n===void 0||!i)throw new Error("缺少必要的出生信息");if(s<1900||s>2100)throw new Error("年份必须在1900-2100之间");if(e<1||e>12)throw new Error("月份必须在1-12之间");if(t<1||t>31)throw new Error("日期必须在1-31之间");if(n<0||n>12)throw new Error("时辰索引必须在0-12之间");if(!["male","female"].includes(i))throw new Error("性别必须是 male 或 female");let o;n===0?o=0:n===12?o=23:o=(n-1)*2+1;const l=`${s}-${e.toString().padStart(2,"0")}-${t.toString().padStart(2,"0")}`,h=i==="male"?"男":"女";let c;r?c=qe.byLunar(l,o,h,!1,!0,"zh-CN"):c=qe.bySolar(l,o,h,!0,"zh-CN");const g=new Date().getFullYear(),u={name:"",gender:i,year:s,month:e,day:t,timeIndex:n,hour:o,isLunar:r,solarDate:c.solarDate,lunarDate:c.lunarDate,chineseDate:c.chineseDate,time:c.time,timeRange:c.timeRange,sign:c.sign,zodiac:c.zodiac,soulPalace:c.soul||"",bodyPalace:c.body||"",earthlyBranchOfBodyPalace:c.earthlyBranchOfBodyPalace||"",earthlyBranchOfSoulPalace:c.earthlyBranchOfSoulPalace||"",fiveElementsClass:c.fiveElementsClass||"",currentAge:g-s},y=c.palaces.map((A,m)=>({index:m,name:A.name,isBodyPalace:A.isBodyPalace,isOriginalPalace:A.isOriginalPalace,heavenlyStem:A.heavenlyStem,earthlyBranch:A.earthlyBranch,majorStars:A.majorStars.map(x=>({name:x.name,type:x.type,scope:x.scope,brightness:x.brightness,mutagen:x.mutagen||""})),minorStars:A.minorStars.map(x=>({name:x.name,type:x.type,scope:x.scope,brightness:x.brightness,mutagen:x.mutagen||""})),adjectiveStars:A.adjectiveStars.map(x=>({name:x.name,type:x.type,scope:x.scope,brightness:x.brightness,mutagen:x.mutagen||""})),changsheng12:A.changsheng12||"",boshi12:A.boshi12||"",jiangqian12:A.jiangqian12||"",suiqian12:A.suiqian12||"",decadal:A.decadal||"",ages:A.ages||[],isEmpty:A.isEmpty(),starCount:{major:A.majorStars.length,minor:A.minorStars.length,adjective:A.adjectiveStars.length,total:A.majorStars.length+A.minorStars.length+A.adjectiveStars.length}})),_={lu:"",quan:"",ke:"",ji:""};c.palaces.forEach(A=>{[...A.majorStars,...A.minorStars,...A.adjectiveStars].forEach(m=>{if(m.mutagen)switch(m.mutagen){case"禄":_.lu=m.name;break;case"权":_.quan=m.name;break;case"科":_.ke=m.name;break;case"忌":_.ji=m.name;break}})});const v=g-s;let w={currentAge:v,decadal:"",yearly:""};return console.log("运限信息暂时跳过，当前年龄:",v),{...u,palaces:y,mutagens:_,horoscope:w,_astrolabe:c}}catch(o){throw console.error("紫薇斗数计算失败:",o),new Error(`紫薇斗数计算失败: ${o.message}`)}}function Ve(s){return s?{basicInfo:{name:s.name||"",gender:s.gender==="male"?"男":"女",birthDate:{solar:s.solarDate||"",lunar:s.lunarDate||"",chinese:s.chineseDate||""},time:s.time||"",timeRange:s.timeRange||"",sign:s.sign||"",zodiac:s.zodiac||"",fiveElementsClass:s.fiveElementsClass||"",soulPalace:s.soulPalace||"",bodyPalace:s.bodyPalace||""},palaces:(s.palaces||[]).map(e=>({name:e.name||"",isBodyPalace:e.isBodyPalace||!1,heavenlyStem:e.heavenlyStem||"",earthlyBranch:e.earthlyBranch||"",allStars:[...(e.majorStars||[]).map(t=>({...t,type:"major"})),...(e.minorStars||[]).map(t=>({...t,type:"minor"})),...(e.adjectiveStars||[]).map(t=>({...t,type:"adjective"}))].map(t=>({name:t.name||"",type:t.type||"",brightness:t.brightness||"",mutagen:t.mutagen||""})),changsheng12:e.changsheng12||"",ages:e.ages||[]})),mutagens:s.mutagens||{},horoscope:s.horoscope||{}}:null}const st=`你是一位资深的紫薇斗数命理师，拥有深厚的紫薇斗数理论基础和丰富的实践经验。

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
- 三方四正：本宫、对宫、三合宫位的组合分析`,St=`请重点分析以下方面：

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
   - 发展建议`,_t=`请重点分析以下方面：

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
   - 理财投资的注意事项`,$t=`请重点分析以下方面：

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
   - 亲子关系的建议`,It=`请重点分析以下方面：

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
   - 心理健康的维护`,bt=`请重点分析以下方面：

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
   - 运势提升的方法`,at=`请重点分析以下方面：

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
   - 共同发展的方向`,Fe=`请根据用户的具体问题，结合紫薇斗数星盘信息进行专业分析。

分析时请注意：
1. 针对问题的核心进行重点分析
2. 结合相关宫位和星耀的影响
3. 给出具体可行的建议
4. 保持专业性和准确性`;function wt(s){return{personality:St,career:_t,relationship:$t,health:It,fortune:bt,compatibility:at,custom:Fe}[s]||Fe}function At(s,e,t){const n=st,i=wt(s);let r=`${n}

${i}

`;return r+=`【星盘信息】
`,r+=`基本信息：${JSON.stringify(t.basicInfo,null,2)}
`,r+=`宫位信息：${JSON.stringify(t.palaces,null,2)}
`,r+=`四化信息：${JSON.stringify(t.mutagens,null,2)}
`,r+=`运限信息：${JSON.stringify(t.horoscope,null,2)}

`,r+=`【用户问题】
${e}

`,r+="请基于以上信息进行专业分析，给出详细的解读和建议。",r}function kt(s,e,t){let r=`${st}

${at}

`;return r+=`【第一人星盘信息】
`,r+=`基本信息：${JSON.stringify(e.basicInfo,null,2)}
`,r+=`宫位信息：${JSON.stringify(e.palaces,null,2)}
`,r+=`四化信息：${JSON.stringify(e.mutagens,null,2)}

`,r+=`【第二人星盘信息】
`,r+=`基本信息：${JSON.stringify(t.basicInfo,null,2)}
`,r+=`宫位信息：${JSON.stringify(t.palaces,null,2)}
`,r+=`四化信息：${JSON.stringify(t.mutagens,null,2)}

`,r+=`【分析要求】
${s}

`,r+="请基于以上两人的星盘信息进行专业的合盘分析，给出详细的匹配度解读和相处建议。",r}function Pt(s){if(!s)return"";try{const e=new URLSearchParams;return e.set("y",s.year),e.set("m",s.month),e.set("d",s.day),e.set("t",s.timeIndex),e.set("g",s.gender),s.name&&e.set("n",s.name),e.toString()}catch(e){return console.error("编码八字数据到URL失败:",e),""}}function De(s){if(!s)return null;try{const e=new URLSearchParams(s),t=e.get("y"),n=e.get("m"),i=e.get("d"),r=e.get("t"),o=e.get("g"),l=e.get("n");if(!t||!n||!i||r===null||!o)return console.warn("URL中的八字数据不完整"),null;const h=parseInt(t),c=parseInt(n),g=parseInt(i),u=parseInt(r);return h<1900||h>2100||c<1||c>12||g<1||g>31||u<0||u>12||!["male","female"].includes(o)?(console.warn("URL中的八字数据无效"),null):{year:h,month:c,day:g,timeIndex:u,gender:o,name:l||""}}catch(e){return console.error("从URL解码八字数据失败:",e),null}}function Ge(s){if(s)try{const e=new URL(window.location);e.searchParams.set("y",s.year),e.searchParams.set("m",s.month),e.searchParams.set("d",s.day),e.searchParams.set("t",s.timeIndex),e.searchParams.set("g",s.gender),s.name?e.searchParams.set("n",s.name):e.searchParams.delete("n"),e.searchParams.delete("bz"),window.history.replaceState({},"",e.toString())}catch(e){console.error("更新URL失败:",e)}}function Et(){try{const s=new URL(window.location);if(s.searchParams.has("y")&&s.searchParams.has("m")&&s.searchParams.has("d")&&s.searchParams.has("t")&&s.searchParams.has("g"))return De(s.search.substring(1));const e=s.searchParams.get("bz");if(e)try{const t=decodeURIComponent(atob(e)),n=JSON.parse(t);return{year:parseInt(n.y),month:parseInt(n.m),day:parseInt(n.d),timeIndex:parseInt(n.t),gender:n.g,name:n.n||""}}catch(t){return console.warn("旧格式URL解码失败:",t),null}return null}catch(s){return console.error("从URL获取八字数据失败:",s),null}}function Tt(){try{const s=new URL(window.location);s.searchParams.delete("y"),s.searchParams.delete("m"),s.searchParams.delete("d"),s.searchParams.delete("t"),s.searchParams.delete("g"),s.searchParams.delete("n"),s.searchParams.delete("bz"),window.history.replaceState({},"",s.toString())}catch(s){console.error("清除URL中的八字数据失败:",s)}}function rt(s,e){if(!s||!e)return"";try{const t={p1:{y:s.year,m:s.month,d:s.day,t:s.timeIndex,g:s.gender,n:s.name||""},p2:{y:e.year,m:e.month,d:e.day,t:e.timeIndex,g:e.gender,n:e.name||""}},n=JSON.stringify(t);return btoa(encodeURIComponent(n))}catch(t){return console.error("编码合盘数据到URL失败:",t),""}}function Ct(s){if(!s)return null;try{const e=decodeURIComponent(atob(s)),t=JSON.parse(e);if(!t.p1||!t.p2)return console.warn("URL中的合盘数据不完整"),null;const n=De(btoa(encodeURIComponent(JSON.stringify(t.p1)))),i=De(btoa(encodeURIComponent(JSON.stringify(t.p2))));return!n||!i?(console.warn("URL中的合盘数据无效"),null):{person1:n,person2:i}}catch(e){return console.error("从URL解码合盘数据失败:",e),null}}function Lt(s,e){if(!(!s||!e))try{const t=rt(s,e);if(t){const n=new URL(window.location);n.searchParams.set("cp",t),n.searchParams.delete("bz"),window.history.replaceState({},"",n.toString())}}catch(t){console.error("更新合盘URL失败:",t)}}function Gt(){try{const e=new URL(window.location).searchParams.get("cp");return Ct(e)}catch(s){return console.error("从URL获取合盘数据失败:",s),null}}function jt(){try{const s=new URL(window.location);s.searchParams.delete("cp"),window.history.replaceState({},"",s.toString())}catch(s){console.error("清除URL中的合盘数据失败:",s)}}function We(s,e=null){const t=window.location.origin+window.location.pathname;if(e){const n=rt(s,e);return n?`${t}?cp=${n}`:t}else{const n=Pt(s);return n?`${t}?${n}`:t}}function Nt(){try{const s=new URL(window.location);return s.searchParams.has("bz")||s.searchParams.has("cp")||s.searchParams.has("y")&&s.searchParams.has("m")&&s.searchParams.has("d")&&s.searchParams.has("t")&&s.searchParams.has("g")}catch{return!1}}function Mt(s){if(!s)return"";try{const e=new URLSearchParams;return e.set("y",s.year),e.set("m",s.month),e.set("d",s.day),e.set("t",s.timeIndex),e.set("g",s.gender),s.name&&e.set("n",s.name),s.isLunar&&e.set("l","1"),e.toString()}catch(e){return console.error("编码紫薇斗数数据到URL失败:",e),""}}function Dt(s){if(!s)return null;try{const e=new URLSearchParams(s);if(!e.has("y")||!e.has("m")||!e.has("d")||!e.has("t")||!e.has("g"))return console.warn("URL中的紫薇斗数数据不完整"),null;const t=parseInt(e.get("y")),n=parseInt(e.get("m")),i=parseInt(e.get("d")),r=parseInt(e.get("t")),o=e.get("g");return t<1900||t>2100||n<1||n>12||i<1||i>31||r<0||r>12||!["male","female"].includes(o)?(console.warn("URL中的紫薇斗数数据无效"),null):{year:t,month:n,day:i,timeIndex:r,gender:o,name:e.get("n")||"",isLunar:e.get("l")==="1"}}catch(e){return console.error("从URL解码紫薇斗数数据失败:",e),null}}function Ut(s){if(s)try{const e=new URL(window.location);e.searchParams.set("y",s.year),e.searchParams.set("m",s.month),e.searchParams.set("d",s.day),e.searchParams.set("t",s.timeIndex),e.searchParams.set("g",s.gender),s.name?e.searchParams.set("n",s.name):e.searchParams.delete("n"),s.isLunar?e.searchParams.set("l","1"):e.searchParams.delete("l"),e.searchParams.delete("zw"),e.searchParams.delete("bz"),window.history.replaceState({},"",e.toString())}catch(e){console.error("更新紫薇斗数URL失败:",e)}}function Yt(){try{const s=new URL(window.location);if(s.searchParams.has("y")&&s.searchParams.has("m")&&s.searchParams.has("d")&&s.searchParams.has("t")&&s.searchParams.has("g"))return Dt(s.search.substring(1));const e=s.searchParams.get("zw");if(e)try{const t=decodeURIComponent(atob(e)),n=JSON.parse(t);return{year:parseInt(n.y),month:parseInt(n.m),day:parseInt(n.d),timeIndex:parseInt(n.t),gender:n.g,name:n.n||"",isLunar:n.l||!1}}catch(t){return console.warn("旧格式紫薇斗数URL解码失败:",t),null}return null}catch(s){return console.error("从URL获取紫薇斗数数据失败:",s),null}}function Rt(s,e){if(!s||!e)return"";try{const t=new URLSearchParams;return t.set("p1_y",s.year),t.set("p1_m",s.month),t.set("p1_d",s.day),t.set("p1_t",s.timeIndex),t.set("p1_g",s.gender),s.name&&t.set("p1_n",s.name),s.isLunar&&t.set("p1_l","1"),t.set("p2_y",e.year),t.set("p2_m",e.month),t.set("p2_d",e.day),t.set("p2_t",e.timeIndex),t.set("p2_g",e.gender),e.name&&t.set("p2_n",e.name),e.isLunar&&t.set("p2_l","1"),t.toString()}catch(t){return console.error("编码紫薇斗数合盘数据到URL失败:",t),""}}function Bt(s){if(!s)return null;try{const e=new URLSearchParams(s);if(!e.has("p1_y")||!e.has("p2_y"))return console.warn("URL中的紫薇斗数合盘数据不完整"),null;const t={year:parseInt(e.get("p1_y")),month:parseInt(e.get("p1_m")),day:parseInt(e.get("p1_d")),timeIndex:parseInt(e.get("p1_t")),gender:e.get("p1_g"),name:e.get("p1_n")||"",isLunar:e.get("p1_l")==="1"},n={year:parseInt(e.get("p2_y")),month:parseInt(e.get("p2_m")),day:parseInt(e.get("p2_d")),timeIndex:parseInt(e.get("p2_t")),gender:e.get("p2_g"),name:e.get("p2_n")||"",isLunar:e.get("p2_l")==="1"};return!t.year||!t.month||!t.day||t.timeIndex===void 0||!t.gender||!n.year||!n.month||!n.day||n.timeIndex===void 0||!n.gender?(console.warn("URL中的紫薇斗数合盘数据无效"),null):{person1:t,person2:n}}catch(e){return console.error("从URL解码紫薇斗数合盘数据失败:",e),null}}function Ot(s,e){if(!(!s||!e))try{const t=new URL(window.location),n=[];for(const i of t.searchParams.keys())n.push(i);n.forEach(i=>t.searchParams.delete(i)),t.searchParams.set("p1_y",s.year),t.searchParams.set("p1_m",s.month),t.searchParams.set("p1_d",s.day),t.searchParams.set("p1_t",s.timeIndex),t.searchParams.set("p1_g",s.gender),s.name&&t.searchParams.set("p1_n",s.name),s.isLunar&&t.searchParams.set("p1_l","1"),t.searchParams.set("p2_y",e.year),t.searchParams.set("p2_m",e.month),t.searchParams.set("p2_d",e.day),t.searchParams.set("p2_t",e.timeIndex),t.searchParams.set("p2_g",e.gender),e.name&&t.searchParams.set("p2_n",e.name),e.isLunar&&t.searchParams.set("p2_l","1"),window.history.replaceState({},"",t.toString())}catch(t){console.error("更新紫薇斗数合盘URL失败:",t)}}function Zt(){try{const s=new URL(window.location);if(s.searchParams.has("p1_y")&&s.searchParams.has("p2_y"))return Bt(s.search.substring(1));const e=s.searchParams.get("zwcp");if(e)try{const t=decodeURIComponent(atob(e)),n=JSON.parse(t);return!n.p1||!n.p2?null:{person1:{year:parseInt(n.p1.y),month:parseInt(n.p1.m),day:parseInt(n.p1.d),timeIndex:parseInt(n.p1.t),gender:n.p1.g,name:n.p1.n||"",isLunar:n.p1.l||!1},person2:{year:parseInt(n.p2.y),month:parseInt(n.p2.m),day:parseInt(n.p2.d),timeIndex:parseInt(n.p2.t),gender:n.p2.g,name:n.p2.n||"",isLunar:n.p2.l||!1}}}catch(t){return console.warn("旧格式紫薇斗数合盘URL解码失败:",t),null}return null}catch(s){return console.error("从URL获取紫薇斗数合盘数据失败:",s),null}}function Ke(s,e=null){const t=window.location.origin+window.location.pathname;if(e){const n=Rt(s,e);return n?`${t}?${n}`:t}else{const n=Mt(s);return n?`${t}?${n}`:t}}function Ht(s={}){const e={name:"",year:"",month:"",day:"",timeIndex:0,gender:"",isLunar:!1,...s},t=Y({...e}),n=Y({...e}),i=Y(!1),r=Y(null),o=Y(null),l=Y(!1),h=Y(""),c=ce(()=>{const y=t.value.year&&t.value.month&&t.value.day&&t.value.timeIndex!==""&&t.value.gender;if(!i.value)return y;const _=n.value.year&&n.value.month&&n.value.day&&n.value.timeIndex!==""&&n.value.gender;return y&&_}),g=ce(()=>r.value!==null);return{person1:t,person2:n,enableSecondPerson:i,result1:r,result2:o,isCalculating:l,calculationError:h,canCalculate:c,hasResults:g,resetData:()=>{t.value={...e},n.value={...e},i.value=!1,r.value=null,o.value=null,h.value=""}}}const J={HEAVENLY_STEMS:["甲","乙","丙","丁","戊","己","庚","辛","壬","癸"],EARTHLY_BRANCHES:["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"],STEM_WUXING:["木","木","火","火","土","土","金","金","水","水"],BRANCH_WUXING:["水","土","木","木","土","火","火","土","金","金","土","水"],STEM_YINYANG:["阳","阴","阳","阴","阳","阴","阳","阴","阳","阴"],BRANCH_YINYANG:["阳","阴","阳","阴","阳","阴","阳","阴","阳","阴","阳","阴"],WUXING_SHENG:{木:"火",火:"土",土:"金",金:"水",水:"木"},WUXING_KE:{木:"土",火:"金",土:"水",金:"木",水:"火"},TIME_BRANCHES:[{name:"早子时",hour:0,branch:"子"},{name:"丑时",hour:1,branch:"丑"},{name:"寅时",hour:3,branch:"寅"},{name:"卯时",hour:5,branch:"卯"},{name:"辰时",hour:7,branch:"辰"},{name:"巳时",hour:9,branch:"巳"},{name:"午时",hour:11,branch:"午"},{name:"未时",hour:13,branch:"未"},{name:"申时",hour:15,branch:"申"},{name:"酉时",hour:17,branch:"酉"},{name:"戌时",hour:19,branch:"戌"},{name:"亥时",hour:21,branch:"亥"},{name:"晚子时",hour:23,branch:"子"}]},je={子:["癸"],丑:["己","癸","辛"],寅:["甲","丙","戊"],卯:["乙"],辰:["戊","乙","癸"],巳:["丙","庚","戊"],午:["丁","己"],未:["己","丁","乙"],申:["庚","壬","戊"],酉:["辛"],戌:["戊","辛","丁"],亥:["壬","甲"]},qt={甲子:"海中金",乙丑:"海中金",丙寅:"炉中火",丁卯:"炉中火",戊辰:"大林木",己巳:"大林木",庚午:"路旁土",辛未:"路旁土",壬申:"剑锋金",癸酉:"剑锋金",甲戌:"山头火",乙亥:"山头火",丙子:"涧下水",丁丑:"涧下水",戊寅:"城头土",己卯:"城头土",庚辰:"白蜡金",辛巳:"白蜡金",壬午:"杨柳木",癸未:"杨柳木",甲申:"泉中水",乙酉:"泉中水",丙戌:"屋上土",丁亥:"屋上土",戊子:"霹雳火",己丑:"霹雳火",庚寅:"松柏木",辛卯:"松柏木",壬辰:"长流水",癸巳:"长流水",甲午:"砂中金",乙未:"砂中金",丙申:"山下火",丁酉:"山下火",戊戌:"平地木",己亥:"平地木",庚子:"壁上土",辛丑:"壁上土",壬寅:"金箔金",癸卯:"金箔金",甲辰:"覆灯火",乙巳:"覆灯火",丙午:"天河水",丁未:"天河水",戊申:"大驿土",己酉:"大驿土",庚戌:"钗钏金",辛亥:"钗钏金",壬子:"桑柘木",癸丑:"桑柘木",甲寅:"大溪水",乙卯:"大溪水",丙辰:"沙中土",丁巳:"沙中土",戊午:"天上火",己未:"天上火",庚申:"石榴木",辛酉:"石榴木",壬戌:"大海水",癸亥:"大海水"},Qe={金:{color:"白、金、银",direction:"西",industry:"金融、五金、科技、汽车、司法",advice:"增强决断力，保持原则，处事要果断。"},木:{color:"绿、青",direction:"东",industry:"教育、林业、文化、服装、医药",advice:"保持仁爱之心，积极成长，多接触自然。"},水:{color:"黑、蓝、灰",direction:"北",industry:"贸易、物流、水产、旅游、媒体",advice:"锻炼沟通能力，灵活应变，保持谦逊。"},火:{color:"红、橙、紫",direction:"南",industry:"电力、餐饮、IT、化工、礼仪",advice:"保持热情与活力，待人接物要真诚有礼。"},土:{color:"黄、棕、褐",direction:"中（本地）",industry:"地产、建筑、农业、保险",advice:"为人处事要诚信稳重，脚踏实地。"}},Ne={甲:{亥:"长生",子:"沐浴",丑:"冠带",寅:"临官",卯:"帝旺",辰:"衰",巳:"病",午:"死",未:"墓",申:"绝",酉:"胎",戌:"养"},乙:{午:"长生",巳:"沐浴",辰:"冠带",卯:"临官",寅:"帝旺",丑:"衰",子:"病",亥:"死",戌:"墓",酉:"绝",申:"胎",未:"养"},丙:{寅:"长生",卯:"沐浴",辰:"冠带",巳:"临官",午:"帝旺",未:"衰",申:"病",酉:"死",戌:"墓",亥:"绝",子:"胎",丑:"养"},丁:{酉:"长生",申:"沐浴",未:"冠带",午:"临官",巳:"帝旺",辰:"衰",卯:"病",寅:"死",丑:"墓",子:"绝",亥:"胎",戌:"养"},戊:{寅:"长生",卯:"沐浴",辰:"冠带",巳:"临官",午:"帝旺",未:"衰",申:"病",酉:"死",戌:"墓",亥:"绝",子:"胎",丑:"养"},己:{酉:"长生",申:"沐浴",未:"冠带",午:"临官",巳:"帝旺",辰:"衰",卯:"病",寅:"死",丑:"墓",子:"绝",亥:"胎",戌:"养"},庚:{巳:"长生",午:"沐浴",未:"冠带",申:"临官",酉:"帝旺",戌:"衰",亥:"病",子:"死",丑:"墓",寅:"绝",卯:"胎",辰:"养"},辛:{子:"长生",亥:"沐浴",戌:"冠带",酉:"临官",申:"帝旺",未:"衰",午:"病",巳:"死",辰:"墓",卯:"绝",寅:"胎",丑:"养"},壬:{申:"长生",酉:"沐浴",戌:"冠带",亥:"临官",子:"帝旺",丑:"衰",寅:"病",卯:"死",辰:"墓",巳:"绝",午:"胎",未:"养"},癸:{卯:"长生",寅:"沐浴",丑:"冠带",子:"临官",亥:"帝旺",戌:"衰",酉:"病",申:"死",未:"墓",午:"绝",巳:"胎",辰:"养"}},Jt={寅:{木:"旺",火:"相",水:"休",金:"囚",土:"死"},卯:{木:"旺",火:"相",水:"休",金:"囚",土:"死"},辰:{土:"旺",金:"相",火:"休",木:"囚",水:"死"},巳:{火:"旺",土:"相",木:"休",水:"囚",金:"死"},午:{火:"旺",土:"相",木:"休",水:"囚",金:"死"},未:{土:"旺",金:"相",火:"休",木:"囚",水:"死"},申:{金:"旺",水:"相",土:"休",火:"囚",木:"死"},酉:{金:"旺",水:"相",土:"休",火:"囚",木:"死"},戌:{土:"旺",金:"相",火:"休",木:"囚",水:"死"},亥:{水:"旺",木:"相",金:"休",土:"囚",火:"死"},子:{水:"旺",木:"相",金:"休",土:"囚",火:"死"},丑:{土:"旺",金:"相",火:"休",木:"囚",水:"死"}},Vt={寅:[["戊",7],["丙",7],["甲",16]],卯:[["甲",10],["乙",20]],辰:[["乙",9],["癸",3],["戊",18]],巳:[["戊",7],["庚",9],["丙",14]],午:[["丙",10],["丁",20]],未:[["丁",9],["乙",3],["己",18]],申:[["庚",10],["壬",3],["戊",17]],酉:[["庚",10],["辛",20]],戌:[["辛",9],["丁",3],["戊",18]],亥:[["戊",7],["甲",23]],子:[["壬",10],["癸",20]],丑:[["癸",9],["辛",3],["己",18]]};class Ft{constructor(){this.ctg=J.HEAVENLY_STEMS,this.cdz=J.EARTHLY_BRANCHES}zhiIdx(e){return this.cdz.indexOf(e)}calculateAllShenSha(e,t){const n={},i=["year","month","day","hour"];return e.forEach((r,o)=>{const[l,h]=r,c=this.calculatePillarShenSha(l,h,o,e,t);n[i[o]]=c}),n}calculatePillarShenSha(e,t,n,i,r){const o=[],[l,h]=i[0],[c,g]=i[1],[u,y]=i[2];i[3];const _=u+y,v=e+t;this.ctg.indexOf(l)%2;const w=r==="male",A={天乙贵人:()=>{const m={甲:["丑","未"],戊:["丑","未"],庚:["丑","未"],己:["子","申"],乙:["子","申"],丙:["亥","酉"],丁:["亥","酉"],壬:["卯","巳"],癸:["卯","巳"],辛:["寅","午"]};return m[l]&&m[l].includes(t)||m[u]&&m[u].includes(t)},太极贵人:()=>{const m={甲:["子","午"],乙:["子","午"],丙:["卯","酉"],丁:["卯","酉"],戊:["辰","戌","丑","未"],己:["辰","戌","丑","未"],庚:["寅","亥"],辛:["寅","亥"],壬:["巳","申"],癸:["巳","申"]};return m[l]&&m[l].includes(t)||m[u]&&m[u].includes(t)},天德贵人:()=>{const x={寅:1,卯:2,辰:3,巳:4,午:5,未:6,申:7,酉:8,戌:9,亥:10,子:11,丑:12}[g];if(!x)return!1;const L={1:"丁",2:"申",3:"壬",4:"辛",5:"亥",6:"甲",7:"癸",8:"寅",9:"丙",10:"乙",11:"巳",12:"庚"}[x];return L===e||L===t},天德合:()=>{const x={寅:1,卯:2,辰:3,巳:4,午:5,未:6,申:7,酉:8,戌:9,亥:10,子:11,丑:12}[g];if(!x)return!1;const L={1:"丁",2:"申",3:"壬",4:"辛",5:"亥",6:"甲",7:"癸",8:"寅",9:"丙",10:"乙",11:"巳",12:"庚"}[x];return{甲:"己",乙:"庚",丙:"辛",丁:"壬",戊:"癸",己:"甲",庚:"乙",辛:"丙",壬:"丁",癸:"戊"}[L]===e},月德贵人:()=>({寅:"丙",午:"丙",戌:"丙",申:"壬",子:"壬",辰:"壬",亥:"甲",卯:"甲",未:"甲",巳:"庚",酉:"庚",丑:"庚"})[g]===e,月德合:()=>{const m={寅:"丙",午:"丙",戌:"丙",申:"壬",子:"壬",辰:"壬",亥:"甲",卯:"甲",未:"甲",巳:"庚",酉:"庚",丑:"庚"}[g];return{甲:"己",乙:"庚",丙:"辛",丁:"壬",戊:"癸",己:"甲",庚:"乙",辛:"丙",壬:"丁",癸:"戊"}[m]===e},三奇贵人:()=>{const m=i.map(L=>L[0]),x=[["乙","丙","丁"],["甲","戊","庚"],["辛","壬","癸"]];for(let L=0;L<=m.length-3;L++){const M=m.slice(L,L+3);if(x.some(z=>z.every((X,D)=>X===M[D])))return!0}return!1},福星贵人:()=>{const m={甲:"寅",乙:"丑",丙:"子",丁:"亥",戊:"申",己:"未",庚:"午",辛:"巳",壬:"辰",癸:"卯"};return m[l]===t||m[u]===t},文昌贵人:()=>{const m={甲:"巳",乙:"午",丙:"申",丁:"酉",戊:"申",己:"酉",庚:"亥",辛:"子",壬:"寅",癸:"卯"};return m[l]===t||m[u]===t},国印贵人:()=>{const m={甲:"戌",乙:"亥",丙:"丑",丁:"寅",戊:"丑",己:"寅",庚:"辰",辛:"巳",壬:"未",癸:"申"};return m[l]===t||m[u]===t},学堂:()=>{const m=J.STEM_WUXING[u];return{木:"亥",火:"寅",土:"申",金:"巳",水:"申"}[m]===t},词馆:()=>({甲:"寅",乙:"卯",丙:"巳",丁:"午",戊:"巳",己:"午",庚:"申",辛:"酉",壬:"亥",癸:"子"})[u]===t,天厨贵人:()=>({甲:"巳",乙:"午",丙:"子",丁:"亥",戊:"申",己:"未",庚:"寅",辛:"卯",壬:"酉",癸:"戌"})[u]===t,德秀贵人:()=>{const x={寅:"火",午:"火",戌:"火",申:"水",子:"水",辰:"水",巳:"金",酉:"金",丑:"金",亥:"木",卯:"木",未:"木"}[g],L={甲:"己",乙:"庚",丙:"辛",丁:"壬",戊:"癸"},M=[];return x==="火"?M.push("丁","己","癸","庚"):x==="水"?M.push("壬","甲","戊","己","辛"):x==="金"?M.push("庚","壬","乙","丙","戊"):x==="木"&&M.push("乙","癸","丁","丙","庚"),M.includes(e)||L[e]&&M.includes(L[e])},禄神:()=>({甲:"寅",乙:"卯",丙:"巳",丁:"午",戊:"巳",己:"午",庚:"申",辛:"酉",壬:"亥",癸:"子"})[u]===t,羊刃:()=>({甲:"卯",丙:"午",戊:"午",庚:"酉",壬:"子"})[u]===t,飞刃:()=>{const x={甲:"卯",丙:"午",戊:"午",庚:"酉",壬:"子"}[u];return x?{子:"午",丑:"未",寅:"申",卯:"酉",辰:"戌",巳:"亥",午:"子",未:"丑",申:"寅",酉:"卯",戌:"辰",亥:"巳"}[x]===t:!1},驿马:()=>{const m={申:"寅",子:"寅",辰:"寅",亥:"巳",卯:"巳",未:"巳",寅:"申",午:"申",戌:"申",巳:"亥",酉:"亥",丑:"亥"};return m[h]===t||m[y]===t},将星:()=>{const m={申:"子",子:"子",辰:"子",亥:"卯",卯:"卯",未:"卯",寅:"午",午:"午",戌:"午",巳:"酉",酉:"酉",丑:"酉"};return m[h]===t||m[y]===t},华盖:()=>{const m={申:"辰",子:"辰",辰:"辰",亥:"未",卯:"未",未:"未",寅:"戌",午:"戌",戌:"戌",巳:"丑",酉:"丑",丑:"丑"};return m[h]===t||m[y]===t},金舆:()=>({甲:"辰",乙:"巳",丙:"未",丁:"申",戊:"未",己:"申",庚:"戌",辛:"亥",壬:"丑",癸:"寅"})[u]===t,金神:()=>["乙丑","己巳","癸酉"].includes(v)&&(n===2||n===3),天赦日:()=>{if(n!==2)return!1;const m={寅:"春",卯:"春",辰:"春",巳:"夏",午:"夏",未:"夏",申:"秋",酉:"秋",戌:"秋",亥:"冬",子:"冬",丑:"冬"}[g];return m==="春"&&_==="戊寅"||m==="夏"&&_==="甲午"||m==="秋"&&_==="戊申"||m==="冬"&&_==="甲子"},魁罡:()=>n===2&&["庚辰","壬辰","戊戌","庚戌"].includes(_),阴差阳错:()=>n===2&&["丙子","丁丑","戊寅","辛卯","壬辰","癸巳","丙午","丁未","戊申","辛酉","壬戌","癸亥"].includes(_),孤鸾煞:()=>n===2&&["乙巳","丁巳","辛亥","戊申","甲寅","壬子","丙午","戊午","己未","癸丑"].includes(_),十灵日:()=>n===2&&["甲辰","乙亥","丙辰","丁酉","戊午","庚戌","辛亥","壬寅","癸未"].includes(_),六秀日:()=>n===2&&["丙午","丁未","戊子","戊午","己丑","己未"].includes(_),八专:()=>n===2&&["甲寅","乙卯","己未","丁巳","庚申","辛酉","戊戌","癸丑"].includes(_),九丑:()=>n===2&&["戊子","戊午","壬子","壬午","乙卯","辛卯","乙酉","辛酉","己卯","己酉"].includes(_),四废日:()=>{if(n!==2)return!1;const m={寅:"春",卯:"春",辰:"春",巳:"夏",午:"夏",未:"夏",申:"秋",酉:"秋",戌:"秋",亥:"冬",子:"冬",丑:"冬"},x={春:["庚申","辛酉"],夏:["壬子","癸亥"],秋:["甲寅","乙卯"],冬:["丙午","丁巳"]},L=m[g];return L&&x[L].includes(_)},十恶大败:()=>{const m=this.ctg.indexOf(l),x=this.cdz.indexOf(h);if(m===-1||x===-1)return!1;const L=(10+x-m)%12,M=(11+x-m)%12,z=[this.cdz[L],this.cdz[M]],D={甲:"寅",乙:"卯",丙:"巳",丁:"午",戊:"巳",己:"午",庚:"申",辛:"酉",壬:"亥",癸:"子"}[u];return z.includes(D)},童子煞:()=>{const x={寅:"春",卯:"春",辰:"春",巳:"夏",午:"夏",未:"夏",申:"秋",酉:"秋",戌:"秋",亥:"冬",子:"冬",丑:"冬"}[g];return x?(x==="春"||x==="秋")&&(t==="寅"||t==="卯")||(x==="夏"||x==="冬")&&(t==="午"||t==="子"):!1},天转:()=>(n===2||n===3)&&{春:"乙卯",夏:"戊午",秋:"辛酉",冬:"癸子"}[{寅:"春",卯:"春",辰:"春",巳:"夏",午:"夏",未:"夏",申:"秋",酉:"秋",戌:"秋",亥:"冬",子:"冬",丑:"冬"}[g]]===v,地转:()=>(n===2||n===3)&&{春:"甲寅",夏:"丁巳",秋:"庚申",冬:"癸亥"}[{寅:"春",卯:"春",辰:"春",巳:"夏",午:"夏",未:"夏",申:"秋",酉:"秋",戌:"秋",亥:"冬",子:"冬",丑:"冬"}[g]]===v,桃花:()=>{const m={寅:"卯",午:"卯",戌:"卯",亥:"子",卯:"子",未:"子",申:"酉",子:"酉",辰:"酉",巳:"午",酉:"午",丑:"午"};return m[h]===t||m[y]===t},红鸾:()=>({子:"卯",丑:"寅",寅:"丑",卯:"子",辰:"亥",巳:"戌",午:"酉",未:"申",申:"未",酉:"午",戌:"巳",亥:"辰"})[h]===t,天喜:()=>({子:"酉",丑:"申",寅:"未",卯:"午",辰:"巳",巳:"辰",午:"卯",未:"寅",申:"丑",酉:"子",戌:"亥",亥:"戌"})[h]===t,孤辰:()=>({亥:"寅",子:"寅",丑:"寅",寅:"巳",卯:"巳",辰:"巳",巳:"申",午:"申",未:"申",申:"亥",酉:"亥",戌:"亥"})[h]===t,寡宿:()=>({亥:"戌",子:"戌",丑:"戌",寅:"丑",卯:"丑",辰:"丑",巳:"辰",午:"辰",未:"辰",申:"未",酉:"未",戌:"未"})[h]===t,红艳煞:()=>({甲:"午",乙:"申",丙:"寅",丁:"未",戊:"辰",己:"辰",庚:"戌",辛:"酉",壬:"子",癸:"申"})[u]===t,勾绞煞:()=>{const m=(this.zhiIdx(h)+4)%12,x=(this.zhiIdx(h)-4+12)%12;return t===this.cdz[m]||t===this.cdz[x]},空亡:()=>{const m=this.ctg.indexOf(u),x=this.cdz.indexOf(y);if(m===-1||x===-1)return!1;const L=(10+x-m)%12,M=(11+x-m)%12;return[this.cdz[L],this.cdz[M]].includes(t)},亡神:()=>{const m={申:"亥",子:"亥",辰:"亥",亥:"申",卯:"申",未:"申",寅:"巳",午:"巳",戌:"巳",巳:"寅",酉:"寅",丑:"寅"};return m[h]===t||m[y]===t},劫煞:()=>{const m={申:"巳",子:"巳",辰:"巳",亥:"寅",卯:"寅",未:"寅",寅:"亥",午:"亥",戌:"亥",巳:"申",酉:"申",丑:"申"};return m[h]===t||m[y]===t},灾煞:()=>{const m={申:"午",子:"午",辰:"午",亥:"酉",卯:"酉",未:"酉",寅:"子",午:"子",戌:"子",巳:"卯",酉:"卯",丑:"卯"};return m[h]===t||m[y]===t},元辰:()=>{const m=this.ctg.indexOf(l)%2===0,x=m&&w||!m&&!w?7:-7,L=(this.zhiIdx(h)+x+12)%12;return this.cdz[L]===t},血刃:()=>({寅:"丑",卯:"寅",辰:"卯",巳:"辰",午:"巳",未:"午",申:"未",酉:"申",戌:"酉",亥:"戌",子:"亥",丑:"子"})[g]===t,流霞:()=>({甲:"酉",乙:"戌",丙:"未",丁:"申",戊:"巳",己:"午",庚:"辰",辛:"卯",壬:"亥",癸:"寅"})[u]===t,天罗:()=>t==="戌"||t==="亥",地网:()=>t==="辰"||t==="巳",丧门:()=>this.cdz[(this.zhiIdx(h)+2)%12]===t,吊客:()=>this.cdz[(this.zhiIdx(h)-2+12)%12]===t,披麻:()=>this.cdz[(this.zhiIdx(h)-1+12)%12]===t};for(const m in A)A[m]()&&o.push(m);return o}}class Wt{constructor(){this.ctg=J.HEAVENLY_STEMS,this.cdz=J.EARTHLY_BRANCHES,this.wxtg=J.STEM_WUXING,this.wxdz=J.BRANCH_WUXING,this.wuxingKe=J.WUXING_KE,this.wuxingSheng=J.WUXING_SHENG}getIntelligentAnalysis(e){const t=[],n={甲:"己",乙:"庚",丙:"辛",丁:"壬",戊:"癸"},i={甲:"庚",乙:"辛",丙:"壬",丁:"癸"};for(let w=0;w<4;w++)for(let A=w+1;A<4;A++){const m=e[w][0],x=e[A][0];if(i[m]===x||i[x]===m)t.push(`${m}${x}相冲`);else if(n[m]===x||n[x]===m)t.push(`${m}${x}相合`);else{const L=this.wxtg[this.ctg.indexOf(m)],M=this.wxtg[this.ctg.indexOf(x)];this.wuxingKe[L]===M?t.push(`${m}克${x}`):this.wuxingKe[M]===L&&t.push(`${x}克${m}`)}}const r=[],o=e.map(w=>w[1]),l={子:"午",丑:"未",寅:"申",卯:"酉",辰:"戌",巳:"亥"},h={子:"丑",寅:"亥",卯:"戌",辰:"酉",巳:"申",午:"未"},c={子:"未",丑:"午",寅:"巳",卯:"辰",申:"亥",酉:"戌"},g={子:"酉",卯:"午",辰:"丑",未:"戌",寅:"亥",巳:"申"};for(let w=0;w<4;w++)for(let A=w+1;A<4;A++){const m=o[w],x=o[A];l[m]===x||l[x]===m?r.push(`${m}${x}相冲`):h[m]===x||h[x]===m?r.push(`${m}${x}相合`):c[m]===x||c[x]===m?r.push(`${m}${x}相害`):(g[m]===x||g[x]===m)&&r.push(`${m}${x}相破`)}const u=[...new Set(o)];u.filter(w=>["寅","巳","申"].includes(w)).length>=2&&r.push("寅巳申无恩之刑"),u.filter(w=>["丑","戌","未"].includes(w)).length>=2&&r.push("丑戌未恃势之刑"),u.includes("子")&&u.includes("卯")&&r.push("子卯无礼之刑"),o.filter(w=>w==="辰").length>1&&r.push("辰辰自刑"),o.filter(w=>w==="午").length>1&&r.push("午午自刑"),o.filter(w=>w==="酉").length>1&&r.push("酉酉自刑"),o.filter(w=>w==="亥").length>1&&r.push("亥亥自刑");const y=[];for(let w=0;w<4;w++){const A=e[w][0],m=e[w][1],x=this.wxtg[this.ctg.indexOf(A)],L=this.wxdz[this.cdz.indexOf(m)][0];this.wuxingKe[x]===L&&y.push(`${A}${m}盖头`),this.wuxingKe[L]===x&&y.push(`${A}${m}截脚`)}for(let w=0;w<4;w++)for(let A=w+1;A<4;A++){const m=e[w],x=e[A],L=i[m[0]]===x[0]||i[x[0]]===m[0],M=l[m[1]]===x[1]||l[x[1]]===m[1];L&&M&&y.push(`${m.join("")}与${x.join("")}天克地冲(反吟)`)}const v=e.map(w=>w.join("")).reduce((w,A)=>(w[A]=(w[A]||0)+1,w),{});for(const w in v)v[w]>1&&y.push(`${w}伏吟`);return{tianGan:t.length>0?`原局天干: ${t.join(" | ")}`:"",diZhi:r.length>0?`原局地支: ${r.join(" | ")}`:"",zhengZhu:y.length>0?`原局整柱: ${y.join(" | ")}`:""}}}class Kt{constructor(){this.timeMap=[{index:0,name:"早子时",range:"00:00-01:00",hour:0},{index:1,name:"丑时",range:"01:00-03:00",hour:1},{index:2,name:"寅时",range:"03:00-05:00",hour:3},{index:3,name:"卯时",range:"05:00-07:00",hour:5},{index:4,name:"辰时",range:"07:00-09:00",hour:7},{index:5,name:"巳时",range:"09:00-11:00",hour:9},{index:6,name:"午时",range:"11:00-13:00",hour:11},{index:7,name:"未时",range:"13:00-15:00",hour:13},{index:8,name:"申时",range:"15:00-17:00",hour:15},{index:9,name:"酉时",range:"17:00-19:00",hour:17},{index:10,name:"戌时",range:"19:00-21:00",hour:19},{index:11,name:"亥时",range:"21:00-23:00",hour:21},{index:12,name:"晚子时",range:"23:00-24:00",hour:23}],this.tenGods=["比肩","劫财","食神","伤官","偏财","正财","七杀","正官","偏印","正印"],this.wuxing=["水","木","火","土","金"],this.lifeStages=["长生","沐浴","冠带","临官","帝旺","衰","病","死","墓","绝","胎","养"],this.shenShaCalculator=new Ft,this.relationshipCalculator=new Wt,this.ctg=J.HEAVENLY_STEMS,this.cdz=J.EARTHLY_BRANCHES,this.wxtg=J.STEM_WUXING,this.wxdz=J.BRANCH_WUXING}calculateBazi(e,t,n,i,r){try{const o=this.timeMap[i];if(!o)throw new Error("无效的时辰索引");const l=Ee.fromYmdHms(e,t,n,o.hour,0,0),h=l.getLunarHour(),c=h.getEightChar(),g=c.getYear(),u=c.getMonth(),y=c.getDay(),_=c.getHour(),v={year:{gan:g.getHeavenStem().getName(),zhi:g.getEarthBranch().getName(),ganZhi:g.getName()},month:{gan:u.getHeavenStem().getName(),zhi:u.getEarthBranch().getName(),ganZhi:u.getName()},day:{gan:y.getHeavenStem().getName(),zhi:y.getEarthBranch().getName(),ganZhi:y.getName()},hour:{gan:_.getHeavenStem().getName(),zhi:_.getEarthBranch().getName(),ganZhi:_.getName()}},w=v.day.gan,A=[[v.year.gan,v.year.zhi],[v.month.gan,v.month.zhi],[v.day.gan,v.day.zhi],[v.hour.gan,v.hour.zhi]],m=this.calculateHiddenStems(v),x=this.calculateWuxingStrength(v,m),L=this.calculateSeasonInfo(l),M={gender:r==="male"?"男":"女",solarDate:{year:e,month:t,day:n},lunarDate:{year:h.getLunarDay().getLunarMonth().getLunarYear().getYear(),month:h.getLunarDay().getLunarMonth().getMonth(),day:h.getLunarDay().getDay(),monthName:h.getLunarDay().getLunarMonth().getName(),dayName:h.getLunarDay().getName()},timeInfo:o,pillars:v,dayMaster:{gan:w,element:this.getWuxing(w),yinYang:this.getGanYinYang(w)},zodiac:h.getLunarDay().getLunarMonth().getLunarYear().getSixtyCycle().getEarthBranch().getZodiac().getName(),constellation:l.getSolarDay().getConstellation().getName(),tenGods:this.calculateTenGods(v,w),hiddenStems:m,hiddenTenGods:this.calculateHiddenTenGods(m,w),wuxingStrength:x,luckInfo:this.calculateDayunWithTyme(l,r==="male"?ke.MAN:ke.WOMAN),mingGong:c.getOwnSign().getName(),shenGong:c.getBodySign().getName(),taiYuan:c.getFetalOrigin().getName(),taiXi:c.getFetalBreath().getName(),lifeStages:this.calculateLifeStages(v,w),pillarLifeStages:this.calculatePillarLifeStages(v),nayin:this.calculateNayin(v),shensha:this.shenShaCalculator.calculateAllShenSha(A,r),ziZuo:this.calculateZiZuo(v),kongWang:this.calculateKongWang(v),intelligentAnalysis:this.relationshipCalculator.getIntelligentAnalysis(A),wuxingSeasonStatus:this.getSeasonStatus(v.month.zhi),monthCommander:this.getMonthCommander(l,v.month.zhi),seasonInfo:L,analysis:this.analyzeBaziChart(v,m)};if(M.luckInfo&&M.luckInfo.cycles){const z=e;M.luckInfo.cycles.forEach(X=>{if(!X.isXiaoyun){X.years=[];const D=X.year,Z=D+9;for(let ae=D;ae<=Z;ae++){const C=ae-z+1,k=this.calculateLiunian(ae,w),N=this.calculateXiaoyun(v.hour.ganZhi,M.gender,v.year.gan,C);X.years.push({year:ae,age:C,ganZhi:k.ganZhi,tenGod:k.tenGod,tenGodZhi:k.tenGodZhi,xiaoyun:N})}}})}return M}catch(o){throw console.error("八字计算错误:",o),new Error(`八字计算失败: ${o.message}`)}}calculateLiunian(e,t){try{const i=Ee.fromYmdHms(e,6,1,0,0,0).getLunarHour().getEightChar().getYear(),r=i.getHeavenStem().getName(),o=i.getEarthBranch().getName();return{year:e,gan:r,zhi:o,ganZhi:`${r}${o}`,tenGod:this.getTenGod(r,t),tenGodZhi:this.getTenGodForBranch(o,t)}}catch(n){console.error(`流年计算错误 (${e}年):`,n);const i=(e-4)%10,r=(e-4)%12,o=J.HEAVENLY_STEMS[i],l=J.EARTHLY_BRANCHES[r];return{year:e,gan:o,zhi:l,ganZhi:`${o}${l}`,tenGod:this.getTenGod(o,t),tenGodZhi:this.getTenGodForBranch(l,t)}}}calculateLiuyue(e,t,n){const r=Ee.fromYmdHms(e,t,1,0,0,0).getLunarHour().getEightChar().getMonth(),o=r.getHeavenStem().getName(),l=r.getEarthBranch().getName(),h=[],c=[e-1,e,e+1],g=[];c.forEach(y=>{for(let _=0;_<24;_++)g.push(Pe.fromIndex(y,_))});for(const y of g){const _=y.getJulianDay().getSolarDay();_.getYear()===e&&_.getMonth()===t&&(h.find(w=>w.name===y.getName())||h.push({name:y.getName(),date:`${_.getYear()}-${_.getMonth().toString().padStart(2,"0")}-${_.getDay().toString().padStart(2,"0")}`}))}const u=h.sort((y,_)=>new Date(y.date).getDate()-new Date(_.date).getDate());return{month:t,gan:o,zhi:l,ganZhi:`${o}${l}`,tenGod:this.getTenGod(o,n),tenGodZhi:this.getTenGodForBranch(l,n),jieqi:u}}calculateLiuri(e,t,n,i){const o=Ee.fromYmdHms(e,t,n,0,0,0).getLunarHour().getEightChar().getDay(),l=o.getHeavenStem().getName(),h=o.getEarthBranch().getName();return{day:n,gan:l,zhi:h,ganZhi:`${l}${h}`,tenGod:this.getTenGod(l,i),tenGodZhi:this.getTenGodForBranch(h,i)}}getTenGodForBranch(e,t){const n=je[e]?.[0];return n?this.getTenGod(n,t):"未知"}calculateXiaoyun(e,t,n,i){const r=[];for(const y of J.HEAVENLY_STEMS)for(const _ of J.EARTHLY_BRANCHES)r.push(y+_);const o=r.indexOf(e);if(o===-1)return"未知";const h=J.HEAVENLY_STEMS.indexOf(n)%2===0,c=t==="男",g=h&&c||!h&&!c;let u;return g?u=(o+i)%60:(u=(o-i)%60,u<0&&(u+=60)),r[u]}calculatePillarLifeStages(e){const t={};for(const n in e){const i=e[n],r=i.gan,o=i.zhi;t[n]=Ne[r]?.[o]||"无"}return t}getWuxing(e){const t=this.ctg.indexOf(e);if(t!==-1)return this.wxtg[t];const n=this.cdz.indexOf(e);return n!==-1?this.wxdz[n]:"未知"}getGanYinYang(e){const t=this.ctg.indexOf(e);return t===-1?"未知":J.STEM_YINYANG[t]}calculateTenGods(e,t){return Object.fromEntries(Object.entries(e).map(([n,{gan:i}])=>n==="day"?[n,"日主"]:[n,this.getTenGod(i,t)]))}getTenGod(e,t){const n=this.ctg.indexOf(e),i=this.ctg.indexOf(t);return n===-1||i===-1?"未知":[["比肩","劫财","食神","伤官","偏财","正财","七杀","正官","偏印","正印"],["劫财","比肩","伤官","食神","正财","偏财","正官","七杀","正印","偏印"],["偏印","正印","比肩","劫财","食神","伤官","偏财","正财","七杀","正官"],["正印","偏印","劫财","比肩","伤官","食神","正财","偏财","正官","七杀"],["七杀","正官","偏印","正印","比肩","劫财","食神","伤官","偏财","正财"],["正官","七杀","正印","偏印","劫财","比肩","伤官","食神","正财","偏财"],["偏财","正财","七杀","正官","偏印","正印","比肩","劫财","食神","伤官"],["正财","偏财","正官","七杀","正印","偏印","劫财","比肩","伤官","食神"],["食神","伤官","偏财","正财","七杀","正官","偏印","正印","比肩","劫财"],["伤官","食神","正财","偏财","正官","七杀","正印","偏印","劫财","比肩"]][i][n]}calculateHiddenStems(e){return Object.fromEntries(Object.entries(e).map(([t,{zhi:n}])=>[t,je[n]||[]]))}calculateHiddenTenGods(e,t){return Object.fromEntries(Object.entries(e).map(([n,i])=>[n,i.map(r=>this.getTenGod(r,t))]))}calculateWuxingStrength(e,t){const n={tianGan:12,diZhiBenQi:12,diZhiZhongQi:6,diZhiYuQi:3},i={寅:{木:2,火:1.5,土:.8,金:.6,水:1.2},卯:{木:2.2,火:1.6,土:.7,金:.5,水:1.1},辰:{土:2,金:1.5,水:.8,木:1.2,火:.6},巳:{火:2,土:1.5,金:.8,水:.6,木:1.2},午:{火:2.2,土:1.6,金:.7,水:.5,木:1.1},未:{土:2,金:1.5,水:.8,木:1.2,火:.6},申:{金:2,水:1.5,木:.8,火:.6,土:1.2},酉:{金:2.2,水:1.6,木:.7,火:.5,土:1.1},戌:{土:2,金:1.5,水:.8,木:1.2,火:.6},亥:{水:2,木:1.5,火:.8,土:.6,金:1.2},子:{水:2.2,木:1.6,火:.7,土:.5,金:1.1},丑:{土:2,金:1.5,水:.8,木:1.2,火:.6}},r=e.month.zhi,o=i[r],l={金:0,木:0,水:0,火:0,土:0};for(const D of Object.values(e)){const Z=this.getWuxing(D.gan);Z!=="未知"&&(l[Z]+=n.tianGan)}for(const D of Object.values(e)){const Z=D.zhi;(je[Z]||[]).forEach((C,k)=>{const N=this.getWuxing(C);N!=="未知"&&(k===0?l[N]+=n.diZhiBenQi:k===1?l[N]+=n.diZhiZhongQi:l[N]+=n.diZhiYuQi)})}const h={...l};for(const D in h)h[D]=Math.round(h[D]*(o[D]||1));const c=Object.values(h).reduce((D,Z)=>D+Z,0),g={};if(c>0)for(const D in h)g[D]=Math.round(h[D]/c*100);else for(const D in h)g[D]=0;const u=this.getWuxing(e.day.gan),y={金:{allies:["金","土"],enemies:["火","水","木"]},木:{allies:["木","水"],enemies:["金","火","土"]},水:{allies:["水","金"],enemies:["土","木","火"]},火:{allies:["火","木"],enemies:["水","土","金"]},土:{allies:["土","火"],enemies:["木","金","水"]}};if(!y[u])return{scores:h,percentages:g,status:"无法判断"};const _=y[u].allies,v=y[u].enemies,w=_.reduce((D,Z)=>D+(h[Z]||0),0);v.reduce((D,Z)=>D+(h[Z]||0),0);let A="均衡";const m=c>0?w/c*100:0;m>60?A="身强":m<20?A="身弱":m>=40&&m<=60?A="中和":m>50?A="偏强":m<30&&(A="偏弱");let x=[],L=[];A==="身强"||A==="偏强"?(x=v,L=_):A==="身弱"||A==="偏弱"?(x=_,L=v):x=y[u].enemies.slice(0,2);const M=Object.entries(l).filter(([D,Z])=>Z===0).map(([D])=>D),z=x.map(D=>({wuxing:D,...Qe[D]})),X=L.map(D=>({wuxing:D,...Qe[D]}));return{scores:h,percentages:g,status:A,yongShen:x,jiShen:L,missing:M,suggestions:{favorable:z,unfavorable:X}}}calculateDayunWithTyme(e,t){try{const n=this.calculateTraditionalDayun(e,t);let i="";if(n.startAge!==void 0){const c=e.getSolarDay().getYear()+n.startAge;i=`出生后 ${n.startAge} 年，${c}年起运`}else i="起运时间计算失败";const r=[],o=n.startAge;if(o>0){const c=e.getLunarHour().getEightChar(),g=c.getHour().getName(),u=t===ke.MAN?"男":"女",y=c.getYear().getHeavenStem().getName(),_=this.getGanYinYang(y),v=e.getSolarDay().getYear(),w=[],A=Math.max(1,o);for(let m=1;m<=A;m++){const x=v+m-1,L=this.calculateXiaoyun(g,u,y,m),M=this.calculateLiunian(x,c.getDay().getHeavenStem().getName());w.push({year:x,age:m,ganZhi:M.ganZhi,tenGod:M.tenGod,tenGodZhi:M.tenGodZhi,xiaoyun:{ganZhi:L,tenGod:this.getTenGod(L[0],c.getDay().getHeavenStem().getName()),tenGodZhi:this.getTenGodForBranch(L[1],c.getDay().getHeavenStem().getName())}})}w.length>0&&r.push({age:1,year:w[0].year,ganZhi:"小运",isXiaoyun:!0,type:"小运",years:w})}const l=e.getSolarDay().getYear();for(let c=0;c<12;c++){const g=n.startAge+c*10,u=l+g-1,y=n.dayunList[c];y&&r.push({age:g,year:u,ganZhi:y,isXiaoyun:!1,type:"大运",years:[]})}let h="";if(n.dayunList.length>0){const c=n.dayunList[0][0],g=J.HEAVENLY_STEMS,u=g.indexOf(c);if(u!==-1){const y=g[(u+5)%10];h=`逢 ${c}、${y} 年交运`}else h="交运信息计算失败"}else h="交运信息计算失败";return{startInfo:i,handoverInfo:h,cycles:r}}catch(n){return console.error("大运计算错误:",n),{startInfo:"计算失败",handoverInfo:"计算失败",cycles:[]}}}calculateLifeStages(e,t){const n=Ne[t]||{};return Object.fromEntries(Object.entries(e).map(([i,{zhi:r}])=>[i,n[r]||"未知"]))}calculateNayin(e){return Object.fromEntries(Object.entries(e).map(([t,{gan:n,zhi:i}])=>[t,qt[n+i]||"未知"]))}calculateWuxingStatus(e){const t=this.getSeasonStatus(e);return t?`木${t.木} 火${t.火} 土${t.土} 金${t.金} 水${t.水}`:"无法确定五行状态"}calculateKongWang(e){return Object.fromEntries(Object.entries(e).map(([t,{gan:n,zhi:i}])=>{const r=this.ctg.indexOf(n),o=this.cdz.indexOf(i);if(r===-1||o===-1)return[t,[]];const l=(10+o-r)%12,h=(11+o-r)%12;return[t,[this.cdz[l],this.cdz[h]]]}))}calculateZiZuo(e){return Object.fromEntries(Object.entries(e).map(([t,{gan:n,zhi:i}])=>{const r=Ne[n]||{};return[t,r[i]||"未知"]}))}analyzeBaziChart(e,t){const n=e.day.gan,i=this.getWuxing(n),r=e.month.zhi;e.month.gan;const l=this.getSeasonStatus(r)[i],h=l==="旺"||l==="相",c=this.analyzeRoots(e,i),g=this.analyzeSupport(e,n,i),u=this.calculateDayMasterStrength(h,c,g,i,r),y=this.analyzePattern(e,t,n,i,u.strength),_=this.analyzeUsefulGod(e,i,u.strength,y);return{dayMasterStrength:u.strength,dayMasterStatus:u.status,mingGe:y.pattern,patternType:y.type,patternDescription:y.description,favorableElements:_.favorable,unfavorableElements:_.unfavorable,usefulGod:_.useful,avoidGod:_.avoid,circulation:_.circulation,rootAnalysis:c,supportAnalysis:g,seasonalStatus:{month:r,dayMasterStatus:l,isTimely:h}}}analyzeRoots(e,t){const n=[];let i=0;return Object.entries(e).forEach(([r,o])=>{if(this.getWuxing(o.zhi)===t){const h=r==="day"?3:1;n.push({position:r,branch:o.zhi,strength:h}),i+=h}}),{roots:n,totalStrength:i,hasRoot:n.length>0,strongRoot:n.some(r=>r.strength>=3)}}analyzeSupport(e,t,n){const i=[];let r=0;return Object.entries(e).forEach(([o,l])=>{if(o!=="day"&&l.gan&&this.getWuxing(l.gan)===n){const c=l.gan===t?2:1;i.push({position:o,stem:l.gan,strength:c}),r+=c}}),{supporters:i,totalStrength:r,hasSupport:i.length>0}}calculateDayMasterStrength(e,t,n,i,r){let o="中和",l=0;e&&(l+=2),l+=t.totalStrength,l+=n.totalStrength,l>=6?o="太旺":l>=4?o="偏旺":l>=2?o="中和":l>=1?o="偏弱":o="太弱";const c=this.getSeasonStatus(r)[i]||"休";return{strength:o,score:l,status:`日主${i}生于${r}月，${c}`,details:{timely:e,rootStrength:t.totalStrength,supportStrength:n.totalStrength}}}analyzePattern(e,t,n,i,r){const o=e.month.gan;e.month.zhi;const l=this.getTenGod(o,n),h=this.checkSpecialPattern(e,i,r);if(h.isSpecial)return h;let c="正格",g="普通格局",u="命局平和，无明显特殊格局";if(l)switch(l){case"正官":c="正官格",g="官格",u="月干透正官，主贵气，利于仕途功名";break;case"七杀":c="七杀格",g="杀格",u="月干透七杀，主权威，需要制化得宜";break;case"正财":c="正财格",g="财格",u="月干透正财，主富裕，利于经商理财";break;case"偏财":c="偏财格",g="财格",u="月干透偏财，主横财，善于投资经营";break;case"正印":c="正印格",g="印格",u="月干透正印，主学问，利于文化教育";break;case"偏印":c="偏印格",g="印格",u="月干透偏印，主技艺，适合专业技能";break;case"食神":c="食神格",g="食伤格",u="月干透食神，主福禄，性格温和有才华";break;case"伤官":c="伤官格",g="食伤格",u="月干透伤官，主才华，需要适当约束";break;case"比肩":c="建禄格",g="比劫格",u="月干透比肩，主自立，需要财官调节";break;case"劫财":c="劫财格",g="比劫格",u="月干透劫财，主竞争，需要官杀制约";break;default:c="正格",g="普通格局",u="命局平和，五行流通"}const y=this.checkPatternSuccess(e,c,g);return{pattern:c,type:g,description:u,success:y.success,successReason:y.reason,isSpecial:!1}}checkSpecialPattern(e,t,n){return n==="太旺"&&this.countRestraints(e,t)===0?{isSpecial:!0,pattern:"从强格",type:"特殊格局",description:"日主极旺无制，顺其旺势而行",success:!0,successReason:"格局纯粹，顺势而为"}:n==="太弱"&&this.countSupports(e,t)===0?{isSpecial:!0,pattern:"从弱格",type:"特殊格局",description:"日主极弱无助，从其弱势而行",success:!0,successReason:"格局清纯，从弱而行"}:{isSpecial:!1}}checkPatternSuccess(e,t,n){let i=!0,r="格局基本成立";switch(n){case"官格":this.hasInjuryToOfficial(e)&&(i=!1,r="伤官见官，格局受损");break;case"财格":this.hasRobberyToWealth(e)&&(i=!1,r="比劫夺财，格局不清");break}return{success:i,reason:r}}analyzeUsefulGod(e,t,n,i){const r=[],o=[];let l="",h="",c="";switch(n){case"太旺":const g=this.getWuxingChildren(t),u=this.getWuxingEnemies(t);r.push(...g,...u),o.push(t,...this.getWuxingParents(t)),l=g[0]||u[0]||"食神",h=t,c="身旺用食伤泄秀，或用官杀制身";break;case"偏旺":r.push(...this.getWuxingChildren(t)),o.push(t,...this.getWuxingParents(t)),l=this.getWuxingChildren(t)[0]||"食神",h=t,c="身旺喜泄，食伤为用";break;case"中和":r.push(t),l="调候",c="命局中和，重在调候和流通";break;case"偏弱":r.push(t,...this.getWuxingParents(t)),o.push(...this.getWuxingEnemies(t),...this.getWuxingChildren(t)),l=this.getWuxingParents(t)[0]||t,h=this.getWuxingEnemies(t)[0]||"官杀",c="身弱喜印比帮扶";break;case"太弱":i.pattern==="从弱格"?(r.push(...this.getWuxingEnemies(t),...this.getWuxingChildren(t)),o.push(t,...this.getWuxingParents(t)),l=this.getWuxingEnemies(t)[0]||"官杀",h=t,c="从弱格，顺其弱势，忌帮扶"):(r.push(t,...this.getWuxingParents(t)),o.push(...this.getWuxingEnemies(t)),l=this.getWuxingParents(t)[0]||t,h=this.getWuxingEnemies(t)[0]||"官杀",c="身弱急需印比帮扶");break}return{favorable:[...new Set(r)],unfavorable:[...new Set(o)],useful:l,avoid:h,circulation:c}}getWuxingChildren(e){return{木:["火"],火:["土"],土:["金"],金:["水"],水:["木"]}[e]||[]}getWuxingParents(e){return{火:["木"],土:["火"],金:["土"],水:["金"],木:["水"]}[e]||[]}getWuxingEnemies(e){return{木:["金"],火:["水"],土:["木"],金:["火"],水:["土"]}[e]||[]}countRestraints(e,t){let n=0;const i=this.getWuxingEnemies(t);return Object.values(e).forEach(r=>{(i.includes(this.getWuxing(r.gan))||i.includes(this.getWuxing(r.zhi)))&&n++}),n}countSupports(e,t){let n=0;const i=this.getWuxingParents(t);return Object.values(e).forEach(r=>{(this.getWuxing(r.gan)===t||this.getWuxing(r.zhi)===t||i.includes(this.getWuxing(r.gan))||i.includes(this.getWuxing(r.zhi)))&&n++}),n}hasInjuryToOfficial(e){return!1}hasRobberyToWealth(e){return!1}getGanYinYang(e){return["甲","丙","戊","庚","壬"].includes(e)?"阳":"阴"}getSeasonStatus(e){return Jt[e]||{}}getMonthCommander(e,t){const n=Vt[t];if(!n)return"未知";try{const i=e.getSolarDay().getYear(),r=e.getJulianDay();let o=null;const l=[];for(let g=0;g<24;g++)l.push(Pe.fromIndex(i,g)),l.push(Pe.fromIndex(i-1,g));for(const g of l){const u=g.getJulianDay();g.isJie()&&u<=r&&(!o||u>o.getJulianDay())&&(o=g)}if(!o)return"未知(节气未找到)";const h=r-o.getJulianDay();let c=0;for(const g of n)if(c+=g[1],h<c)return g[0];return n[n.length-1][0]}catch(i){return console.error("获取月令司令失败:",i),"计算出错"}}calculateSeasonInfo(e){try{const t=[],n=e.getSolarDay().getYear(),i=e.getJulianDay();for(let u=0;u<24;u++){const y=Pe.fromIndex(n,u),_=y.getJulianDay(),v=_.getSolarDay();t.push({name:y.getName(),date:`${v.getYear()}-${v.getMonth().toString().padStart(2,"0")}-${v.getDay().toString().padStart(2,"0")}`,jd:_.getDay(),index:u,isJie:y.isJie()})}let r=null,o=null;for(let u=0;u<t.length;u++){const y=t[u];if(y.jd<=i)r=y;else{o=y;break}}let l=0,h=0;r&&(l=Math.floor(i-r.jd)),o&&(h=Math.floor(o.jd-i));const g=r?{0:"冬",1:"冬",2:"春",3:"春",4:"春",5:"春",6:"春",7:"春",8:"夏",9:"夏",10:"夏",11:"夏",12:"夏",13:"夏",14:"秋",15:"秋",16:"秋",17:"秋",18:"秋",19:"秋",20:"冬",21:"冬",22:"冬",23:"冬"}[r.index]:"未知";return{currentJieqi:r?r.name:"未知",nextJieqi:o?o.name:"未知",daysSincePrev:l,daysToNext:h,currentSeason:g,jieqiList:t.map(u=>({name:u.name,date:u.date}))}}catch(t){return console.error("节气信息计算错误:",t),{currentJieqi:"计算错误",nextJieqi:"计算错误",daysSincePrev:0,daysToNext:0,currentSeason:"未知",jieqiList:[]}}}calculateTraditionalDayun(e,t){try{const n=e.getSolarDay().getYear(),i=e.getJulianDay(),r=e.getLunarHour().getEightChar(),o=r.getYear().getHeavenStem().getName(),l=r.getMonth().getHeavenStem().getName(),h=r.getMonth().getEarthBranch().getName(),g=J.HEAVENLY_STEMS.indexOf(o)%2===0,u=t===ke.MAN,y=g&&u||!g&&!u,_=this.calculateStartAge(e,t,o),v=this.generateDayunList(l,h,y);return{startAge:_,dayunList:v,isShun:y,yearGan:o,monthGanZhi:l+h}}catch(n){return console.error("传统大运计算错误:",n),{startAge:0,dayunList:[],isShun:!0,yearGan:"",monthGanZhi:""}}}calculateStartAge(e,t,n){try{const i=e.getSolarDay().getYear(),r=e.getJulianDay(),l=J.HEAVENLY_STEMS.indexOf(n)%2===0,h=t===ke.MAN,c=l&&h||!l&&!h,g=[];for(let v of[i-1,i,i+1])for(let w=0;w<24;w++){const A=Pe.fromIndex(v,w);A.isJie()&&g.push({term:A,julianDay:A.getJulianDay(),name:A.getName()})}g.sort((v,w)=>v.julianDay-w.julianDay);let u=null,y=0;if(c){for(const v of g)if(v.julianDay>r){u=v,y=v.julianDay-r;break}}else for(let v=g.length-1;v>=0;v--){const w=g[v];if(w.julianDay<r){u=w,y=r-w.julianDay;break}}if(!u)return console.warn("未找到目标节气，使用默认起运岁数"),8;const _=Math.ceil(y/3);return console.log(`起运计算详情:
        性别: ${h?"男":"女"}
        年干: ${n} (${l?"阳":"阴"})
        顺逆: ${c?"顺排":"逆排"}
        目标节气: ${u.name}
        天数差: ${y}
        起运岁数: ${_}`),Math.max(1,_)}catch(i){return console.error("起运岁数计算错误:",i),8}}generateDayunList(e,t,n){const i=J.HEAVENLY_STEMS,r=J.EARTHLY_BRANCHES,o=i.indexOf(e),l=r.indexOf(t);if(o===-1||l===-1)return console.error("月柱干支索引错误"),[];const h=[];for(let c=0;c<12;c++){let g,u;n?(g=(o+c+1)%10,u=(l+c+1)%12):(g=(o-c-1+10)%10,u=(l-c-1+12)%12);const y=i[g],_=r[u];h.push(y+_)}return h}}const de=new Kt;function Qt(s){const e=new Date().getFullYear();for(let t=0;t<s.length;t++){const n=s[t],i=n.year,r=i+9;if(e>=i&&e<=r)return{current:n,previous:t>0?s[t-1]:null,future:s.slice(t+1)}}return{current:s[0]||null,previous:null,future:s.slice(1)}}function zt(s,e){let t=`
### 大运详细分析
`;const n=de.getTenGod(s.ganZhi[0],e),i=de.getTenGodForBranch(s.ganZhi[1],e);t+=`* **当前大运**: ${s.ganZhi} (天干:${n}, 地支:${i})
`;const r=new Date().getFullYear(),o=r-s.year+1;t+=`* **大运进度**: 第${o}年/共10年
`;const l=Xt(s,r,e);return t+=`
* **三大运流年分析**:
`,l.forEach(h=>{const c=h.years[0].year,g=h.years[h.years.length-1].year,u=`${c}-${g}年`;t+=`
  **${h.name}** (${h.ganZhi}, ${u}):
`,h.years.forEach(y=>{const v=y.year===r?" ← 当前":"";t+=`    - ${y.year}年(${y.age}岁): ${y.ganZhi}(${y.tenGod})${v}
`})}),t}function Xt(s,e,t){const n=[],i=s.years.filter(r=>r.year>=e);i.length>0&&n.push({name:"当前大运",ganZhi:s.ganZhi,years:i});for(let r=1;r<=2;r++){const o=s.year+r*10,l=en(s.ganZhi,r),h=sn(s,e),c=[];for(let g=0;g<10;g++){const u=o+g,y=h?h+(u-e):null,_=nn(u),v=de.getTenGod(_[0],t);c.push({year:u,age:y,ganZhi:_,tenGod:v})}n.push({name:r===1?"下一大运":"下下大运",ganZhi:l,years:c})}return n}function en(s,e){const t=["甲","乙","丙","丁","戊","己","庚","辛","壬","癸"],n=["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"],i=s[0],r=s[1],o=t.indexOf(i),l=n.indexOf(r),h=(o+e)%10,c=(l+e)%12;return t[h]+n[c]}function tn(s,e){let t=`
### 一生大运详细分析
`;const n=new Date().getFullYear();t+=`* **大运总览**: 共${s.length}个大运，从${s[0].year}年起运
`;const i=s.findIndex(r=>n>=r.year&&n<=r.year+9);return t+=`
* **所有大运详细信息**:
`,s.forEach((r,o)=>{const l=r.year,h=l+9,c=r.years&&r.years.length>0?r.years[0].age:null,g=c?c+9:null,u=de.getTenGod(r.ganZhi[0],e),y=de.getTenGodForBranch(r.ganZhi[1],e),v=o===i?" ← 当前大运":"",w=c&&g?`(${c}-${g}岁)`:"";t+=`
  **第${o+1}个大运** ${r.ganZhi}(${u}) ${l}-${h}年${w}${v}:
`,t+=`    天干:${u}, 地支:${y}
`,r.years&&r.years.length>0?(t+=`    流年详情:
`,r.years.forEach(A=>{const x=A.year===n?" ← 当前年份":"";t+=`      ${A.year}年(${A.age}岁): ${A.ganZhi}(${A.tenGod})${x}
`})):t+=`    流年概况: ${l}-${h}年，共10年
`}),t+=`
* **人生阶段总结**:
`,t+=`  - 青年期: 第1-3个大运 (约${s[0]?.year||"起运"}-${s[2]?.year+9||"未知"}年)
`,s.length>3&&(t+=`  - 壮年期: 第4-6个大运 (约${s[3]?.year||"未知"}-${s[5]?.year+9||"未知"}年)
`),s.length>6&&(t+=`  - 中年期: 第7-9个大运 (约${s[6]?.year||"未知"}-${s[8]?.year+9||"未知"}年)
`),s.length>9&&(t+=`  - 晚年期: 第10个大运以后 (${s[9]?.year||"未知"}年以后)
`),t}function nn(s){const e=["甲","乙","丙","丁","戊","己","庚","辛","壬","癸"],t=["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"],i=s-1984,r=i%10,o=i%12;return e[r]+t[o]}function sn(s,e){const t=s.years.find(n=>n.year===e);return t?t.age:null}function an(s){try{const e=[{start:"立春",end:"惊蛰"},{start:"惊蛰",end:"清明"},{start:"清明",end:"立夏"},{start:"立夏",end:"芒种"},{start:"芒种",end:"小暑"},{start:"小暑",end:"立秋"},{start:"立秋",end:"白露"},{start:"白露",end:"寒露"},{start:"寒露",end:"立冬"},{start:"立冬",end:"大雪"},{start:"大雪",end:"小寒"},{start:"小寒",end:"立春"}],t={};for(const i of[s,s+1]){const r=de.calculateSeasonInfo(Ee.fromYmdHms(i,6,1,0,0,0));r&&r.jieqiList&&r.jieqiList.forEach(o=>{const l=new Date(o.date);l.getFullYear()===i&&(t[o.name]={month:l.getMonth()+1,day:l.getDate(),year:i})})}const n=[];for(let i=0;i<12;i++){const{start:r,end:o}=e[i],l=t[r],h=t[o];if(l&&h){let c,g;if(i===11){c=`${l.month}月${l.day}日`;const u=t.立春;if(u&&u.year===s+1){const y=u.day-1;g=`${u.month}月${y>0?y:"月底"}日`}else g="2月3日"}else{c=`${l.month}月${l.day}日`;const u=h.day-1;g=`${h.month}月${u>0?u:"月底"}日`}n.push(`${c}-${g}`)}else{const c=["2月4日-3月5日","3月6日-4月4日","4月5日-5月5日","5月6日-6月5日","6月6日-7月6日","7月7日-8月7日","8月8日-9月7日","9月8日-10月7日","10月8日-11月6日","11月7日-12月6日","12月7日-1月5日","1月6日-2月3日"];n.push(c[i])}}return n}catch(e){return console.warn("计算月份日期范围失败:",e),["2月4日-3月5日","3月6日-4月4日","4月5日-5月5日","5月6日-6月5日","6月6日-7月6日","7月7日-8月7日","8月8日-9月7日","9月8日-10月7日","10月8日-11月6日","11月7日-12月6日","12月7日-1月5日","1月6日-2月3日"]}}function be(s,e=null){if(!s)return"无法获取八字数据。";let t=`### 基本信息
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
`;const n=["year","month","day","hour"],i=["年","月","日","时"];if(n.forEach((r,o)=>{const l=s.pillars[r],h=s.tenGods[r],c=s.hiddenStems&&s.hiddenStems[r];t+=`* **${i[o]}**: ${l.ganZhi}(${h})`,c&&c.length>0&&(t+=` 藏干:${c.join(",")}`),t+=`
`}),s.intelligentAnalysis){t+=`
### 专业干支关系分析
`;const r=[[s.pillars.year.gan,s.pillars.year.zhi],[s.pillars.month.gan,s.pillars.month.zhi],[s.pillars.day.gan,s.pillars.day.zhi],[s.pillars.hour.gan,s.pillars.hour.zhi]];t+=`* **四柱干支**: ${r.map(g=>g.join("")).join(" ")}
`;const o=on(r);o.length>0&&(t+=`* **天干关系**: ${o.join("、")}
`);const l=ln(r);l.length>0&&(t+=`* **地支关系**: ${l.join("、")}
`);const h=cn(r);h.length>0&&(t+=`* **整柱关系**: ${h.join("、")}
`);const c=un(r);c.length>0&&(t+=`* **五行生克**: ${c.join("、")}
`)}if(s.luckInfo&&s.luckInfo.cycles&&s.luckInfo.cycles.length>0){t+=`
### 大运信息
`,s.luckInfo.startInfo&&(t+=`* **起运**: ${s.luckInfo.startInfo}
`);const r=s.luckInfo.cycles.filter(l=>!l.isXiaoyun),o=Qt(r);if(o.current){const l=o.current,h=s.dayMaster.gan,c=de.getTenGod(l.ganZhi[0],h);if(t+=`* **当前大运**: ${l.ganZhi}(${c})`,l.year){const u=l.year+9;t+=` ${l.year}-${u}年`}t+=`
`;const g=o.future.slice(0,2).map(u=>{const y=de.getTenGod(u.ganZhi[0],h);let _=`${u.ganZhi}(${y})`;if(u.year){const v=u.year+9;_+=`${u.year}-${v}年`}return _}).join(", ");g&&(t+=`* **未来大运**: ${g}
`),e&&(e.id==="ai-current-luck"||e.id==="ai-this-year")&&(t+=zt(l,h)),e&&e.id==="ai-lifetime-fortune"&&(t+=tn(r,h))}}if(s.liunian&&s.liunian.length>0){const r=new Date().getFullYear(),o=s.liunian.find(l=>l.year===r);o&&(t+=`
### 流年信息
* **今年**: ${o.ganZhi}(${r}年)
`)}if(e&&e.id==="ai-year-analysis"&&(t+=`
### 逐月运势分析参考
`,["正月","二月","三月","四月","五月","六月","七月","八月","九月","十月","冬月","腊月"].forEach(o=>{t+=`* **${o}**: 请根据流年与月令的关系进行分析
`})),e&&e.id==="ai-monthly-fortune"){t+=`
### 今年流月信息
`;const r=new Date().getFullYear(),o=s.dayMaster.gan,l=["正月","二月","三月","四月","五月","六月","七月","八月","九月","十月","冬月","腊月"],h=an(r);for(let c=1;c<=12;c++)try{const g=de.calculateLiuyue(r,c,o),u=l[c-1],y=h[c-1]||"日期计算失败";t+=`* **${u}**(${y}): ${g.ganZhi}(${g.tenGod})
`}catch(g){console.warn(`计算${c}月流月失败:`,g);const u=l[c-1];t+=`* **${u}**: 计算失败
`}}return t}function rn(s){if(!s||!s.selectedDate)return"未指定具体日期";const{selectedDate:e,selectedTime:t}=s;let n=`${e.getFullYear()}年${e.getMonth()+1}月${e.getDate()}日`;return t&&(n+=` ${t}`),n}function on(s){const e=[],t={甲:"己",乙:"庚",丙:"辛",丁:"壬",戊:"癸"},n={甲:"庚",乙:"辛",丙:"壬",丁:"癸"},i={甲:"木",乙:"木",丙:"火",丁:"火",戊:"土",己:"土",庚:"金",辛:"金",壬:"水",癸:"水"},r={金:"木",木:"土",土:"水",水:"火",火:"金"};for(let o=0;o<4;o++)for(let l=o+1;l<4;l++){const h=s[o][0],c=s[l][0],g=["年","月","日","时"];if(t[h]===c||t[c]===h)e.push(`${g[o]}${g[l]}天干${h}${c}相合`);else if(n[h]===c||n[c]===h)e.push(`${g[o]}${g[l]}天干${h}${c}相冲`);else{const u=i[h],y=i[c];r[u]===y?e.push(`${g[o]}${g[l]}天干${h}(${u})克${c}(${y})`):r[y]===u&&e.push(`${g[o]}${g[l]}天干${c}(${y})克${h}(${u})`)}}return e}function ln(s){const e=[],t=s.map(u=>u[1]),n=["年","月","日","时"],i={子:"午",丑:"未",寅:"申",卯:"酉",辰:"戌",巳:"亥"},r={子:"丑",寅:"亥",卯:"戌",辰:"酉",巳:"申",午:"未"},o={子:"未",丑:"午",寅:"巳",卯:"辰",申:"亥",酉:"戌"},l={子:"酉",卯:"午",辰:"丑",未:"戌",寅:"亥",巳:"申"},h={申子辰:"水局",亥卯未:"木局",寅午戌:"火局",巳酉丑:"金局"};for(let u=0;u<4;u++)for(let y=u+1;y<4;y++){const _=t[u],v=t[y];i[_]===v||i[v]===_?e.push(`${n[u]}${n[y]}地支${_}${v}相冲`):r[_]===v||r[v]===_?e.push(`${n[u]}${n[y]}地支${_}${v}六合`):o[_]===v||o[v]===_?e.push(`${n[u]}${n[y]}地支${_}${v}相害`):(l[_]===v||l[v]===_)&&e.push(`${n[u]}${n[y]}地支${_}${v}相破`)}const c=[...new Set(t)];for(const[u,y]of Object.entries(h)){const _=u.split(""),v=_.filter(w=>c.includes(w)).length;if(v>=2){const w=_.filter(A=>c.includes(A));e.push(`地支${w.join("")}${v===3?"三合":"半合"}${y}`)}}return c.filter(u=>["寅","巳","申"].includes(u)).length>=2&&e.push("寅巳申无恩之刑"),c.filter(u=>["丑","戌","未"].includes(u)).length>=2&&e.push("丑戌未恃势之刑"),c.includes("子")&&c.includes("卯")&&e.push("子卯无礼之刑"),["辰","午","酉","亥"].forEach(u=>{t.filter(y=>y===u).length>1&&e.push(`${u}${u}自刑`)}),e}function cn(s){const e=[],t=["年","月","日","时"],n={甲:"木",乙:"木",丙:"火",丁:"火",戊:"土",己:"土",庚:"金",辛:"金",壬:"水",癸:"水",子:"水",丑:"土",寅:"木",卯:"木",辰:"土",巳:"火",午:"火",未:"土",申:"金",酉:"金",戌:"土",亥:"水"},i={金:"木",木:"土",土:"水",水:"火",火:"金"},r={甲:"庚",乙:"辛",丙:"壬",丁:"癸"},o={子:"午",丑:"未",寅:"申",卯:"酉",辰:"戌",巳:"亥"};for(let c=0;c<4;c++){const g=s[c][0],u=s[c][1],y=n[g],_=n[u];i[y]===_&&e.push(`${t[c]}柱${g}${u}盖头(天干克地支)`),i[_]===y&&e.push(`${t[c]}柱${g}${u}截脚(地支克天干)`)}for(let c=0;c<4;c++)for(let g=c+1;g<4;g++){const u=s[c],y=s[g],_=r[u[0]]===y[0]||r[y[0]]===u[0],v=o[u[1]]===y[1]||o[y[1]]===u[1];_&&v&&e.push(`${t[c]}${t[g]}柱${u.join("")}与${y.join("")}天克地冲(反吟)`)}const h=s.map(c=>c.join("")).reduce((c,g)=>(c[g]=(c[g]||0)+1,c),{});for(const c in h)h[c]>1&&e.push(`${c}柱重复出现${h[c]}次(伏吟)`);return e}function un(s){const e=[],t={甲:"木",乙:"木",丙:"火",丁:"火",戊:"土",己:"土",庚:"金",辛:"金",壬:"水",癸:"水",子:"水",丑:"土",寅:"木",卯:"木",辰:"土",巳:"火",午:"火",未:"土",申:"金",酉:"金",戌:"土",亥:"水"},n={木:0,火:0,土:0,金:0,水:0};s.forEach(l=>{const h=t[l[0]],c=t[l[1]];n[h]++,n[c]++});const i=Object.entries(n).filter(([l,h])=>h>=3).map(([l])=>l),r=Object.entries(n).filter(([l,h])=>h===0).map(([l])=>l);return i.length>0&&e.push(`五行偏强: ${i.join("、")}`),r.length>0&&e.push(`五行缺失: ${r.join("、")}`),hn(n)?e.push("五行流通顺畅"):e.push("五行流通受阻"),e}function hn(s){const e=["木","火","土","金","水"];let t=0,n=0;for(let i=0;i<e.length*2;i++){const r=e[i%e.length];s[r]>0?(t++,n=Math.max(n,t)):t=0}return n>=3}const Ue={master:`你是一位学贯古今的命理宗师，既精通《滴天髓》、《三命通会》等八字古籍，也了解现代社会的心理学和职业发展。请根据以下信息，为用户提供一份详尽的分析。

**八字信息:**
[CHART_DATA]

---

[PROMPT_BODY]
`,build:(s,e,t="")=>{e===void 0&&(console.warn("PROMPT_BUILDER.build received an undefined question. Defaulting to empty string."),e="");let n=`**问题:**
${e}`;return t&&(n+=`

**分析要求:**
${t}`),Ue.master.replace("[CHART_DATA]",s).replace("[PROMPT_BODY]",n)}},ze={single:[{id:"ai-mingge-zonglun",text:"命格总论",prompt:`

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
- 长期成功的保障措施`},{id:"ai-compat-custom",text:"自定义...",prompt:""}]};function dn(s,e,t,n=null){const i=t?be(t,e):"无法获取命盘数据。",r=e.dataset.prompt,o=e.id;if(o==="ask-ai-with-date"){const l=rn(n),h=document.getElementById("customQuestion")?.value?.trim()||"",c=s&&s!=="选定日期..."?s:h,g=c?`在${l}这个时间点, ${c}`:`请详细分析${l}的运势。`;return Ue.build(i,g,"请结合用户提供的具体日期进行分析，越详细越好。")}if(o==="ai-mingge-zonglun"){let l=r.replace("[八字信息]",i);return s!=="命格总论"&&(l=l.replace("为用户提供一份详尽的八字命局解读。",`为用户提供一份关于"${s}"的详尽解读。`)),l}return Ue.build(i,s,r)}const ue={apiUrl:{}.VITE_AI_API_URL||"https://flow.ovo.gs/ai",apiKey:{}.VITE_AI_API_KEY||"",model:{}.VITE_AI_MODEL||"sydf-v1-250520",maxTokens:8192,temperature:.7,debug:!0};function gn(){const s=[],e=ue.apiUrl.includes("flow.ovo.gs");return!e&&(!ue.apiKey||ue.apiKey==="")&&s.push("API 密钥未设置"),ue.apiUrl||s.push("API 端点未设置"),ue.model||s.push("模型名称未设置"),{isValid:s.length===0,issues:s,config:ue,isWorkerBackend:e}}console.log("🔧 AI 配置调试信息:",{apiUrl:ue.apiUrl,model:ue.model,hasApiKey:!!ue.apiKey,envVars:{VITE_AI_API_URL:{}.VITE_AI_API_URL||"未设置",VITE_AI_MODEL:{}.VITE_AI_MODEL||"未设置",VITE_AI_API_KEY:{}.VITE_AI_API_KEY?"已设置":"未设置"}});class mn{constructor(){this.apiUrl=ue.apiUrl,this.apiKey=ue.apiKey,this.model=ue.model,this.currentRequest=null;const e=gn();e.isValid||console.warn("⚠️ AI 配置问题:",e.issues),console.log("🔧 AI Service 配置:",{apiUrl:this.apiUrl,model:this.model,hasApiKey:!!this.apiKey&&this.apiKey!=="",isProd:!0,validation:e,currentDomain:typeof window<"u"?window.location.hostname:"unknown"})}async*queryAI(e,t={}){try{this.currentRequest&&this.currentRequest.abort();const n=new AbortController;this.currentRequest=n;const i=this.apiUrl.includes("flow.ovo.gs");let r;i?r={prompt:e,model:this.model}:r={model:this.model,messages:[{role:"user",content:e}],max_tokens:t.maxTokens||8192,temperature:t.temperature||.7,stream:!0};const o={"Content-Type":"application/json"};this.apiKey&&this.apiKey!==""&&!this.apiUrl.includes("flow.ovo.gs")&&(o.Authorization=`Bearer ${this.apiKey}`);const l=await fetch(this.apiUrl,{method:"POST",headers:o,body:JSON.stringify(r),signal:n.signal});if(!l.ok){let u="AI服务暂时不可用，请稍后再试";throw l.status===429?u="请求过于频繁，请稍等片刻再试":l.status>=500?u="服务器暂时繁忙，请稍后再试":l.status===401&&(u="API 密钥无效"),new Error(`${u} (状态码: ${l.status})`)}if(!l.body)throw new Error("Response body is null");const h=l.body.getReader(),c=new TextDecoder;let g="";try{for(;;){const{done:u,value:y}=await h.read();if(u){if(g.trim()){const v=this.parseStreamChunk(g);v&&(yield v)}break}g+=c.decode(y,{stream:!0});const _=g.split(`
`);g=_.pop()||"";for(const v of _){const w=this.parseStreamChunk(v);w&&(yield w)}}}finally{h.releaseLock(),this.currentRequest=null}}catch(n){throw this.currentRequest=null,n.name!=="AbortError"&&console.error("AI 请求失败:",n),n}}parseStreamChunk(e){const t=e.trim();if(!t||!t.startsWith("data: "))return null;const n=t.slice(6);if(n==="[DONE]")return null;try{const i=JSON.parse(n);if(i.choices&&i.choices[0]&&i.choices[0].delta&&i.choices[0].delta.content)return i.choices[0].delta.content}catch(i){console.debug("跳过非 JSON 数据:",n,i)}return null}cancelRequest(){this.currentRequest&&(this.currentRequest.abort(),this.currentRequest=null)}buildBaziPrompt(e,t,n=""){let r=`你是一位学贯古今的命理宗师，既精通《滴天髓》、《三命通会》等八字古籍，也了解现代社会的心理学和职业发展。请基于以下专业的八字干支关系信息，为用户提供一份详尽的分析。

**当前时间:** ${new Date().toLocaleString("zh-CN")}

**专业八字信息:**
${e}

**分析问题:** ${t}

**专业分析指导:**
请重点关注八字中的专业干支关系信息，包括天干五合相冲、地支六合三合相冲相害相刑、整柱关系、五行生克流通等，这些是分析的重要依据。请基于这些专业信息进行深入分析，而不是简单重复这些关系，要解释这些关系对命主的具体影响和意义。`;return n&&(r+=`

**具体分析要求:**
${n}`),r}buildCompatibilityPrompt(e,t,n){return`你是一位精通八字合婚的命理大师，既深谙古典命理理论，又具备现代关系心理学的洞察力。请基于以下两个命盘的专业干支关系数据进行全面深入的合盘分析。

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

请确保分析内容专业深入，指导建议实用可行，最终目的是帮助双方建立更和谐的关系。`}getPromptConfig(){return ze}buildPrompt(e,t,n,i=null){return dn(e,t,n,i)}buildPromptFromConfig(e,t,n){const i=ze.single.find(r=>r.id===t.id);if(i){const r=n?be(n,t):"无法获取命盘数据。",o=new Date().toLocaleString("zh-CN");return t.id==="ai-mingge-zonglun"?i.prompt.replace("[八字信息]",r):`你是一位学贯古今的命理宗师，既精通《滴天髓》、《三命通会》等八字古籍，也了解现代社会的心理学和职业发展。请根据以下信息，为用户提供一份详尽的分析。

**当前时间:** ${o}

**八字信息:**
${r}

**问题:** ${e}

**分析要求:**
${i.prompt}`}return this.buildBaziPrompt(be(n,t),e)}}const ye=new mn;function pn(){const s=Y(""),e=Y(!1),t=Y("");return{aiResponse:s,isAIThinking:e,aiError:t,askAI:async(r,o="custom",l,h,c=!1)=>{if(!h){t.value="请先进行排盘计算",Se("请先进行排盘计算");return}e.value=!0,t.value="",c||(s.value="");try{const g=l(r,o,h);for await(const u of ye.queryAI(g))s.value+=u;e.value=!1}catch(g){console.error("AI分析失败:",g),t.value=g.message||"AI分析失败",Se(t.value),e.value=!1}},clearAIResponse:()=>{s.value="",t.value=""}}}const Ce=tt("ziWei",()=>{const s=Ht({isLunar:!1}),{person1:e,person2:t,enableSecondPerson:n,result1:i,result2:r,isCalculating:o,calculationError:l,canCalculate:h,hasResults:c,resetData:g}=s,u=pn(),{aiResponse:y,isAIThinking:_,aiError:v,askAI:w,clearAIResponse:A}=u,m=ce(()=>Ve(i.value)),x=ce(()=>Ve(r.value)),L=async()=>{if(!h.value)return Se("请填写完整的出生信息"),!1;if(o.value)return!1;o.value=!0,l.value="";const k="ziwei-calculation";try{return pe.showLoading("正在计算紫薇斗数...",k),pe.updateLoadingMessage("正在计算第一人紫薇斗数...",k),i.value=Je(parseInt(e.value.year),parseInt(e.value.month),parseInt(e.value.day),e.value.timeIndex,e.value.gender,e.value.isLunar),n.value?(pe.updateLoadingMessage("正在计算第二人紫薇斗数...",k),r.value=Je(parseInt(t.value.year),parseInt(t.value.month),parseInt(t.value.day),t.value.timeIndex,t.value.gender,t.value.isLunar)):r.value=null,pe.hideLoading(k),nt("紫薇斗数计算完成！"),!0}catch(N){pe.hideLoading(k),console.error("紫薇斗数计算失败:",N);const U=N.message||"紫薇斗数计算失败，请检查输入信息";return l.value=U,Se(U),Me.reportError(N,"紫薇斗数计算"),!1}finally{o.value=!1}},M=async(k,N="custom",U=!1)=>{const H={person1:m.value,person2:n.value?x.value:null,enableSecondPerson:n.value};await w(k,N,(K,le,re)=>re.enableSecondPerson&&re.person2?kt(K,re.person1,re.person2):At(le,K,re.person1),H,U)},z=()=>{g(),A()},X=()=>n.value&&r.value?Ke(e.value,t.value):i.value?Ke(e.value):window.location.origin+window.location.pathname,D=async()=>{try{const k=Zt();if(k)return e.value={...e.value,...k.person1},t.value={...t.value,...k.person2},n.value=!0,await L(),!0;const N=Yt();if(N)return e.value={...e.value,...N},await L(),!0}catch(k){console.error("从URL恢复紫薇斗数数据失败:",k)}return!1},Z=()=>{try{n.value&&h.value?Ot(e.value,t.value):h.value&&Ut(e.value)}catch(k){console.error("保存紫薇斗数数据到URL失败:",k)}},ae=(k,N=null)=>{try{let U="紫薇排盘";N?U=`${k||"第一人"}与${N||"第二人"}的紫薇合盘分析`:k&&(U=`${k}的紫薇排盘`),document.title=U;const H=document.querySelector('meta[property="og:title"]');H&&H.setAttribute("content",U);const ee=document.querySelector('meta[name="description"]');if(ee&&k){let K="专业的AI紫薇斗数排盘和命理分析工具";N?K=`${k}与${N}的紫薇斗数合盘分析，专业AI命理解读`:K=`${k}的紫薇斗数排盘结果，专业AI命理分析`,ee.setAttribute("content",K)}}catch(U){console.error("更新页面标题失败:",U)}},C=()=>{try{document.title="紫薇排盘";const k=document.querySelector('meta[property="og:title"]');k&&k.setAttribute("content","紫薇排盘");const N=document.querySelector('meta[name="description"]');N&&N.setAttribute("content","专业的AI紫薇斗数排盘和命理分析工具")}catch(k){console.error("重置页面标题失败:",k)}};return Ie([e,t,n],()=>{Z()},{deep:!0}),{person1:e,person2:t,enableSecondPerson:n,ziWeiResult1:i,ziWeiResult2:r,isCalculating:o,calculationError:l,aiResponse:y,isAIThinking:_,aiError:v,canCalculate:h,hasResults:c,displayData1:m,displayData2:x,calculateZiWei:L,askAI:M,resetData:z,clearAIResponse:A,restoreDataFromUrl:D,generateShareUrl:X,updatePageTitle:ae,resetPageTitle:C}});const yn={class:"input-card"},fn={class:"person-section"},vn={class:"form-group"},xn={class:"custom-date-row"},Sn={class:"custom-date-field"},_n={class:"custom-date-field"},$n={class:"custom-date-field"},In={class:"form-group"},bn=["value"],wn={class:"form-group"},An={class:"gender-buttons"},kn={key:0,class:"error-message"},Pn={class:"compatibility-section"},En={class:"compatibility-toggle"},Tn={key:1,class:"person-section second-person"},Cn={class:"form-group"},Ln={class:"custom-date-row"},Gn={class:"custom-date-field"},jn={class:"custom-date-field"},Nn={class:"custom-date-field"},Mn={class:"form-group"},Dn=["value"],Un={class:"form-group"},Yn={class:"gender-buttons"},Rn=["disabled"],Bn={__name:"ZiWeiForm",setup(s){const e=Ce(),t=[{name:"早子时",range:"00:00-01:00"},{name:"丑时",range:"01:00-03:00"},{name:"寅时",range:"03:00-05:00"},{name:"卯时",range:"05:00-07:00"},{name:"辰时",range:"07:00-09:00"},{name:"巳时",range:"09:00-11:00"},{name:"午时",range:"11:00-13:00"},{name:"未时",range:"13:00-15:00"},{name:"申时",range:"15:00-17:00"},{name:"酉时",range:"17:00-19:00"},{name:"戌时",range:"19:00-21:00"},{name:"亥时",range:"21:00-23:00"},{name:"晚子时",range:"23:00-24:00"}],n=()=>{if(e.enableSecondPerson)if(e.person1.name||e.person2.name){const r=e.person1.name||"第一人",o=e.person2.name||"第二人";e.updatePageTitle(r,o)}else e.resetPageTitle();else e.person1.name?e.updatePageTitle(e.person1.name):e.resetPageTitle()};Ie([()=>e.person1.name,()=>e.person2.name,()=>e.enableSecondPerson],()=>{n()},{immediate:!0});const i=async()=>{await e.calculateZiWei()};return(r,o)=>ie((I(),b("div",yn,[o[29]||(o[29]=a("h1",null,"紫薇斗数排盘",-1)),a("div",fn,[a("div",vn,[o[15]||(o[15]=a("label",{for:"name"},"姓名（选填）",-1)),ie(a("input",{id:"name","onUpdate:modelValue":o[0]||(o[0]=l=>P(e).person1.name=l),type:"text",placeholder:"请输入姓名"},null,512),[[me,P(e).person1.name]])]),a("div",xn,[a("div",Sn,[o[16]||(o[16]=a("label",{for:"year"},"年",-1)),ie(a("input",{id:"year","onUpdate:modelValue":o[1]||(o[1]=l=>P(e).person1.year=l),type:"number",placeholder:"2000",min:"1900",max:"2100",class:"custom-date-input"},null,512),[[me,P(e).person1.year]])]),a("div",_n,[o[17]||(o[17]=a("label",{for:"month"},"月",-1)),ie(a("input",{id:"month","onUpdate:modelValue":o[2]||(o[2]=l=>P(e).person1.month=l),type:"number",placeholder:"1-12",min:"1",max:"12",class:"custom-date-input"},null,512),[[me,P(e).person1.month]])]),a("div",$n,[o[18]||(o[18]=a("label",{for:"day"},"日",-1)),ie(a("input",{id:"day","onUpdate:modelValue":o[3]||(o[3]=l=>P(e).person1.day=l),type:"number",placeholder:"1-31",min:"1",max:"31",class:"custom-date-input"},null,512),[[me,P(e).person1.day]])])]),a("div",In,[o[19]||(o[19]=a("label",{for:"hour"},"时辰",-1)),ie(a("select",{id:"hour","onUpdate:modelValue":o[4]||(o[4]=l=>P(e).person1.timeIndex=l)},[(I(),b(W,null,Q(t,(l,h)=>a("option",{key:h,value:h},f(l.name)+" ("+f(l.range)+") ",9,bn)),64))],512),[[Ze,P(e).person1.timeIndex]])]),a("div",wn,[o[20]||(o[20]=a("label",null,"性别",-1)),a("div",An,[a("button",{type:"button",class:se(["gender-button",{selected:P(e).person1.gender==="male"}]),onClick:o[5]||(o[5]=l=>P(e).person1.gender="male")}," 男 ",2),a("button",{type:"button",class:se(["gender-button",{selected:P(e).person1.gender==="female"}]),onClick:o[6]||(o[6]=l=>P(e).person1.gender="female")}," 女 ",2)])])]),P(e).calculationError?(I(),b("div",kn,f(P(e).calculationError),1)):j("",!0),a("div",Pn,[a("label",En,[ie(a("input",{type:"checkbox","onUpdate:modelValue":o[7]||(o[7]=l=>P(e).enableSecondPerson=l)},null,512),[[lt,P(e).enableSecondPerson]]),o[21]||(o[21]=O(" 启用合盘分析 "))])]),P(e).enableSecondPerson?(I(),b("div",Tn,[o[28]||(o[28]=a("h3",null,"第二人信息",-1)),a("div",Cn,[o[22]||(o[22]=a("label",{for:"name2"},"姓名（选填）",-1)),ie(a("input",{id:"name2","onUpdate:modelValue":o[8]||(o[8]=l=>P(e).person2.name=l),type:"text",placeholder:"请输入第二人姓名"},null,512),[[me,P(e).person2.name]])]),a("div",Ln,[a("div",Gn,[o[23]||(o[23]=a("label",{for:"year2"},"年",-1)),ie(a("input",{id:"year2","onUpdate:modelValue":o[9]||(o[9]=l=>P(e).person2.year=l),type:"number",placeholder:"2000",min:"1900",max:"2100",class:"custom-date-input"},null,512),[[me,P(e).person2.year]])]),a("div",jn,[o[24]||(o[24]=a("label",{for:"month2"},"月",-1)),ie(a("input",{id:"month2","onUpdate:modelValue":o[10]||(o[10]=l=>P(e).person2.month=l),type:"number",placeholder:"1-12",min:"1",max:"12",class:"custom-date-input"},null,512),[[me,P(e).person2.month]])]),a("div",Nn,[o[25]||(o[25]=a("label",{for:"day2"},"日",-1)),ie(a("input",{id:"day2","onUpdate:modelValue":o[11]||(o[11]=l=>P(e).person2.day=l),type:"number",placeholder:"1-31",min:"1",max:"31",class:"custom-date-input"},null,512),[[me,P(e).person2.day]])])]),a("div",Mn,[o[26]||(o[26]=a("label",{for:"hour2"},"时辰",-1)),ie(a("select",{id:"hour2","onUpdate:modelValue":o[12]||(o[12]=l=>P(e).person2.timeIndex=l)},[(I(),b(W,null,Q(t,(l,h)=>a("option",{key:h,value:h},f(l.name)+" ("+f(l.range)+") ",9,Dn)),64))],512),[[Ze,P(e).person2.timeIndex]])]),a("div",Un,[o[27]||(o[27]=a("label",null,"性别",-1)),a("div",Yn,[a("button",{type:"button",class:se(["gender-button",{selected:P(e).person2.gender==="male"}]),onClick:o[13]||(o[13]=l=>P(e).person2.gender="male")}," 男 ",2),a("button",{type:"button",class:se(["gender-button",{selected:P(e).person2.gender==="female"}]),onClick:o[14]||(o[14]=l=>P(e).person2.gender="female")}," 女 ",2)])])])):j("",!0),a("button",{class:"primary-button",disabled:!P(e).canCalculate||P(e).isCalculating,onClick:i},f(P(e).isCalculating?"计算中...":"开始排盘"),9,Rn)],512)),[[it,!P(e).hasResults]])}},On=Te(Bn,[["__scopeId","data-v-1b651200"]]);const Zn={class:"ziwei-result-wrapper"},Hn={key:0,class:"loading-container"},qn={key:1,class:"error-container"},Jn={key:2,class:"result-card"},Vn={class:"basic-info-section"},Fn={key:0,class:"compatibility-basic-info"},Wn={class:"person-basic-info"},Kn={class:"basic-info-text"},Qn={class:"value"},zn={class:"value"},Xn={class:"value"},es={class:"value"},ts={class:"value"},ns={class:"value"},ss={class:"value"},as={class:"person-basic-info"},rs={class:"basic-info-text"},os={class:"value"},is={class:"value"},ls={class:"value"},cs={class:"value"},us={class:"value"},hs={class:"value"},ds={class:"value"},gs={key:1},ms={class:"basic-info-text"},ps={class:"value"},ys={class:"value"},fs={class:"value"},vs={class:"value"},xs={class:"value"},Ss={class:"value"},_s={class:"value"},$s={class:"value"},Is={class:"mutagen-container"},bs={class:"mutagen-grid"},ws={class:"mutagen-item"},As={class:"mutagen-star"},ks={class:"mutagen-item"},Ps={class:"mutagen-star"},Es={class:"mutagen-item"},Ts={class:"mutagen-star"},Cs={class:"mutagen-item"},Ls={class:"mutagen-star"},Gs={class:"chart-section"},js={key:0,class:"compatibility-charts"},Ns={class:"person-chart-container"},Ms={class:"astrolabe-grid compact"},Ds=["onClick"],Us={class:"palace-header"},Ys={class:"palace-name"},Rs={key:0,class:"body-palace-mark"},Bs={class:"palace-stems"},Os={class:"palace-stars"},Zs={class:"palace-details compact"},Hs={key:0,class:"changsheng"},qs={key:1,class:"boshi"},Js={key:0,class:"ages"},Vs={class:"person-chart-container"},Fs={class:"astrolabe-grid compact"},Ws=["onClick"],Ks={class:"palace-header"},Qs={class:"palace-name"},zs={key:0,class:"body-palace-mark"},Xs={class:"palace-stems"},ea={class:"palace-stars"},ta={class:"palace-details compact"},na={key:0,class:"changsheng"},sa={key:1,class:"boshi"},aa={key:0,class:"ages"},ra={class:"compatibility-analysis"},oa={class:"compatibility-analysis-content"},ia={key:1,class:"professional-chart-container"},la={class:"astrolabe-grid"},ca=["onClick"],ua={class:"palace-header"},ha={class:"palace-name"},da={key:0,class:"body-palace-mark"},ga={class:"palace-stems"},ma={class:"palace-stars"},pa={class:"palace-details"},ya={key:0,class:"changsheng"},fa={key:1,class:"boshi"},va={key:2,class:"jiangqian"},xa={key:0,class:"ages"},Sa={key:1,class:"empty-palace"},_a={key:0,class:"detailed-analysis-text"},$a={class:"analysis-text-section"},Ia={class:"analysis-text-content"},ba={class:"analysis-text-section"},wa={class:"analysis-text-content"},Aa={class:"analysis-text-section"},ka={class:"analysis-text-content"},Pa={class:"analysis-text-section"},Ea={class:"analysis-text-content"},Ta={class:"palace-modal-header"},Ca={class:"palace-modal-content"},La={class:"palace-basic-info"},Ga={key:0},ja={key:1},Na={key:2},Ma={key:0,class:"palace-stars-detail"},Da={key:0,class:"star-category"},Ua={class:"star-list"},Ya={class:"star-name"},Ra={key:0,class:"star-brightness"},Ba={key:1,class:"star-mutagen"},Oa={key:1,class:"star-category"},Za={class:"star-list"},Ha={class:"star-name"},qa={key:0,class:"star-brightness"},Ja={key:1,class:"star-mutagen"},Va={key:2,class:"star-category"},Fa={class:"star-list"},Wa={class:"star-name"},Ka={key:0,class:"star-brightness"},Qa={key:1,class:"star-mutagen"},za={key:1,class:"palace-analysis"},Xa={class:"palace-analysis-content"},er={class:"palace-meaning"},tr={class:"palace-star-analysis"},nr={class:"palace-fortune-analysis"},sr={class:"palace-advice"},ar={class:"palace-other-info"},rr={key:0},or={key:1},ir={key:2},lr={key:3},cr={key:4},ur={__name:"ZiWeiResult",setup(s){const e=Ce(),t=ce(()=>e.displayData1),n=Y(null),i=S=>{const d=["star-item"];return S.type&&d.push(`star-${S.type}`),S.brightness&&d.push(`brightness-${S.brightness}`),S.mutagen&&d.push(`mutagen-${S.mutagen}`),d.join(" ")},r=S=>({化禄:"lu",化权:"quan",化科:"ke",化忌:"ji"})[S]||"",o=S=>{n.value=S},l=()=>{n.value=null},h=()=>{if(!t.value?.palaces)return"未知";const S=t.value.palaces.find($=>$.name==="命宫");if(!S)return"未知";const p=(S.allStars||[]).filter($=>$.type==="major");return p.length===0?"无主星":p.map($=>$.name).join("、")},c=()=>{if(!t.value?.palaces)return"未知";const S=t.value.palaces.find($=>$.isBodyPalace);if(!S)return"未知";const p=(S.allStars||[]).filter($=>$.type==="major");return p.length===0?"无主星":p.map($=>$.name).join("、")},g=()=>{if(!t.value?.palaces)return"未知";const S=t.value.palaces.find(G=>G.name==="命宫");if(!S)return"未知";const d=S.majorStars||[];if(d.length===0)return"平常格局";const p=d.some(G=>["紫微","天府","太阳","武曲"].includes(G.name)),$=d.some(G=>["庙","旺"].includes(G.brightness));return p&&$?"上等格局":p||$?"中等格局":"平常格局"},u=()=>{if(!t.value?.palaces)return"未知";const S=t.value.palaces.find($=>$.name==="命宫");if(!S)return"未知";const d=S.majorStars||[];if(d.length===0)return"空宫格局";const p=d.map($=>$.name);return p.includes("紫微")?"帝王格局":p.includes("天府")?"财库格局":p.includes("太阳")?"光明格局":p.includes("武曲")?"财星格局":p.includes("天同")?"福德格局":p.includes("廉贞")?"权威格局":"一般格局"},y=()=>{if(!t.value?.palaces)return[];const S=[];return["命宫","财帛宫","官禄宫","夫妻宫"].forEach(p=>{const $=t.value.palaces.find(G=>G.name===p);if($&&$.allStars){const G=$.allStars.filter(V=>V.type==="major");if(G.length>0){const V=G.map(oe=>oe.name);let R=_(p,V);S.push({palace:p,stars:V,description:R})}}}),S},_=(S,d)=>{const $={命宫:{紫微:"具有领导才能，天生贵气，适合管理职位",天机:"聪明机智，善于策划，适合智力工作",太阳:"性格开朗，有正义感，适合公职或教育",武曲:"意志坚强，理财能力佳，适合金融业",天同:"性格温和，人缘好，适合服务业",廉贞:"个性刚强，有魄力，适合执法或军警"},财帛宫:{紫微:"财运亨通，有贵人相助，财源广进",武曲:"理财有道，投资眼光佳，财富稳定增长",天府:"财库丰厚，善于积累，晚年富足",太阴:"财运平稳，适合稳健投资"},官禄宫:{紫微:"事业有成，适合领导职位，官运亨通",武曲:"事业稳定，在金融或技术领域有所成就",天机:"适合策划、咨询类工作，智慧型事业",太阳:"适合公职或教育事业，声名远播"},夫妻宫:{紫微:"配偶条件佳，婚姻美满，夫妻恩爱",天同:"夫妻和睦，感情稳定，家庭幸福",太阴:"配偶温柔体贴，感情深厚",天府:"配偶贤能，家庭富足"}}[S]||{};return d.map(V=>$[V]||`${V}星坐守，影响${S}运势`).join("；")||`${d.join("、")}星坐守${S}，需结合整体命盘分析`},v=()=>{if(!t.value?.mutagens||!t.value?.palaces)return[];const S=[],d=t.value.mutagens;return Object.entries(d).forEach(([p,$])=>{if($&&$!=="无"){const G=w($),V=A(p,$,G);S.push({type:p,name:V.name,star:$,palace:G||"未知宫位",description:V.description})}}),S},w=S=>{if(!t.value?.palaces)return null;for(const d of t.value.palaces)if((d.allStars||[]).some($=>$.name===S))return d.name;return null},A=(S,d,p)=>{const $={lu:"化禄",quan:"化权",ke:"化科",ji:"化忌"},G={lu:`${d}化禄在${p}，主财运亨通，此宫位运势佳，有贵人相助`,quan:`${d}化权在${p}，主权威增强，此宫位有掌控力，适合发挥领导才能`,ke:`${d}化科在${p}，主名声显达，此宫位有贵气，利于学业和声誉`,ji:`${d}化忌在${p}，主阻碍较多，此宫位需谨慎，宜化解不利因素`};return{name:$[S]||S,description:G[S]||`${d}${$[S]}的影响需要具体分析`}},m=()=>{const S=t.value?.horoscope?.currentAge||0,p=Math.floor((S-6)/10),$=["命宫","父母宫","福德宫","田宅宫","官禄宫","奴仆宫","迁移宫","疾厄宫","财帛宫","子女宫","夫妻宫","兄弟宫"],G=p%12;return $[G]||"未知"},x=()=>{const S=new Date().getFullYear(),d=t.value?.basicInfo?.birthDate?.year||S,p=S-d,$=["命宫","兄弟宫","夫妻宫","子女宫","财帛宫","疾厄宫","迁移宫","奴仆宫","官禄宫","田宅宫","福德宫","父母宫"],G=p%12;return $[G]||"未知"},L=()=>{const S=t.value?.horoscope?.currentAge||0;return S<30?"青年时期，宜努力学习，积累经验，为未来打好基础。注意身体健康，培养良好习惯。":S<50?"中年时期，事业发展的关键阶段，宜把握机会，稳健前进。注意家庭和事业的平衡。":"成熟时期，宜发挥经验优势，传承智慧，享受人生。注意身体保养，颐养天年。"},M=S=>{if(!S||S.length===0)return[];const d={紫微:10,天机:10,太阳:10,武曲:10,天同:10,廉贞:10,天府:10,太阴:10,贪狼:10,巨门:10,天相:10,天梁:10,七杀:10,破军:10,左辅:8,右弼:8,文昌:8,文曲:8,天魁:8,天钺:8,禄存:7,天马:7,化禄:9,化权:9,化科:9,化忌:9,火星:6,铃星:6,擎羊:6,陀罗:6,地空:5,地劫:5};return S.map($=>({...$,priority:d[$.name]||($.mutagen?9:$.type==="major"?10:3)})).sort(($,G)=>G.priority-$.priority).slice(0,6)},z=()=>{if(!e.enableSecondPerson||!e.displayData2)return{};const S=e.displayData1,d=e.displayData2,p=D(S,d),$=Z(S,d),G=ae(S,d),V=C(S,d);return{mingGong:p,wuxing:$,sihua:G,shenGong:V}},X=S=>({mingGong:"命宫关系",wuxing:"五行配合",sihua:"四化互动",shenGong:"身宫关系"})[S]||S,D=(S,d)=>{const p=S.basicInfo?.soulPalace||"未知",$=d.basicInfo?.soulPalace||"未知";if(p==="未知"||$==="未知")return"命宫信息不完整，无法分析";if(p===$)return`双方命宫同在${p}，性格相近，容易理解对方`;{const G=k(p,$);return`命宫分别在${p}和${$}，${G}`}},Z=(S,d)=>{const p=S.basicInfo?.fiveElementsClass||"未知",$=d.basicInfo?.fiveElementsClass||"未知";return p==="未知"||$==="未知"?"五行局信息不完整，无法分析":p===$?`双方同为${p}，五行相同，能量共振`:`五行局分别为${p}和${$}，需要互补平衡`},ae=(S,d)=>{const p=S.mutagens||{},$=d.mutagens||{},G=[],V={lu:"化禄",quan:"化权",ke:"化科",ji:"化忌"};return Object.keys(p).forEach(R=>{const oe=p[R],ge=$[R],F=V[R]||R;oe&&ge&&oe===ge&&G.push(`双方${F}星同为${oe}，产生共鸣`)}),G.length===0?"四化星互动平和，无明显冲突":G.join("；")},C=(S,d)=>{const p=S.basicInfo?.bodyPalace||"未知",$=d.basicInfo?.bodyPalace||"未知";if(p==="未知"||$==="未知")return"身宫信息不完整，无法分析";if(p===$)return`双方身宫同在${p}，价值观念相近，容易产生共鸣`;{const G=k(p,$);return`身宫分别在${p}和${$}，${G}`}},k=(S,d)=>{const p={"命宫-财帛":"财运与性格相关","命宫-事业":"事业发展与个性匹配","命宫-夫妻":"感情与性格互补"},$=`${S}-${d}`,G=`${d}-${S}`;return p[$]||p[G]||"宫位关系需要通过具体星耀配置进一步分析"},N=S=>!S||!S.allStars?[]:S.allStars,U=(S,d)=>!S||!S.allStars?[]:S.allStars.filter(p=>p.type===d),H=S=>({命宫:"代表个人的性格特质、天赋才能、人生格局、基本运势和先天禀赋，是紫薇斗数中最重要的宫位",兄弟宫:"代表兄弟姐妹关系、朋友交往、同事关系、合作伙伴和人际网络的状况",夫妻宫:"代表婚姻感情、配偶关系、恋爱运势、感情模式和异性缘分",子女宫:"代表子女关系、生育能力、教育子女、创造力和部属关系",财帛宫:"代表财运状况、理财能力、赚钱方式、财富积累和金钱观念",疾厄宫:"代表身体健康、疾病倾向、体质强弱、意外灾厄和心理状态",迁移宫:"代表外出运势、变动机会、环境适应、贵人运和远方发展",奴仆宫:"代表部属关系、朋友助力、社交能力、人缘状况和团队合作",官禄宫:"代表事业发展、工作能力、职业方向、社会地位和成就表现",田宅宫:"代表不动产运势、居住环境、家庭状况、祖业传承和生活品质",福德宫:"代表精神享受、兴趣爱好、福分厚薄、心境状态和晚年运势",父母宫:"代表父母关系、长辈缘分、上司关系、学业状况和文书运势"})[S]||"此宫位的具体含义需要结合整体命盘分析",ee=S=>{if(!S||!S.allStars)return"此宫位暂无星耀坐守。";const d=S.allStars.filter(R=>R.type==="major"),p=S.allStars.filter(R=>R.type==="minor");S.allStars.filter(R=>R.mutagen);let $=[];if(d.length>0){const R=d.map(oe=>oe.name).join("、");$.push(`${R}主星坐守`),d.forEach(oe=>{const ge=K(oe.name,S.name);ge&&$.push(ge)})}const G=p.filter(R=>["左辅","右弼","文昌","文曲","天魁","天钺","禄存","天马"].includes(R.name));G.length>0&&$.push(`有${G.map(R=>R.name).join("、")}等吉星相助，增强宫位正面能量`);const V=p.filter(R=>["火星","铃星","擎羊","陀罗","地空","地劫"].includes(R.name));return V.length>0&&$.push(`有${V.map(R=>R.name).join("、")}等煞星同宫，需要化解不利影响`),d.length===0&&$.push("此宫位为空宫，需借对宫星耀来论断，或依靠后天努力来充实"),$.length>0?$.join("，")+"。":"此宫位星耀配置需要结合整体命盘分析。"},K=(S,d)=>({紫微:{命宫:"具有帝王之相，天生领导才能，性格高贵，适合管理职位",财帛宫:"财运亨通，有贵人相助，财源广进，善于理财",官禄宫:"事业有成，适合领导职位，官运亨通，社会地位高",夫妻宫:"配偶条件佳，婚姻美满，夫妻恩爱，感情稳定"},天机:{命宫:"聪明机智，善于策划，反应敏捷，适合智力工作",财帛宫:"理财有方，投资眼光独到，财运变化较大",官禄宫:"适合策划、咨询类工作，智慧型事业发展佳",兄弟宫:"兄弟朋友聪明，关系变化较多，需要用智慧维系"},太阳:{命宫:"性格开朗，有正义感，光明磊落，适合公职或教育",财帛宫:"财运光明，赚钱光明正大，适合阳光行业",官禄宫:"适合公职或教育事业，声名远播，受人尊敬",父母宫:"与父亲缘分深厚，父亲对自己影响较大"},武曲:{命宫:"意志坚强，个性刚毅，理财能力佳，适合金融业",财帛宫:"理财有道，投资眼光佳，财富稳定增长，善于积累",官禄宫:"事业稳定，在金融或技术领域有所成就",夫妻宫:"配偶性格坚强，夫妻关系需要磨合"},天同:{命宫:"性格温和，人缘好，福分厚，适合服务业",财帛宫:"财运平稳，不愁吃穿，适合稳健投资",夫妻宫:"夫妻和睦，感情稳定，家庭幸福",福德宫:"精神享受丰富，心境平和，晚年福分厚"},廉贞:{命宫:"个性刚强，有魄力，适合执法或军警工作",财帛宫:"财运起伏较大，需要谨慎理财",官禄宫:"适合执法、军警或竞争性行业",疾厄宫:"需要注意心血管疾病，保持情绪稳定"}})[S]?.[d]||null,le=S=>{if(!S||!S.allStars)return"运势平平，需要后天努力。";const d=S.allStars.filter(F=>F.mutagen),p=S.allStars.filter(F=>F.type==="major"),$=S.allStars.filter(F=>F.type==="minor");let G=[];d.length>0&&d.forEach(F=>{switch(F.mutagen){case"禄":G.push(`${F.name}化禄带来财运和贵人运，此宫位运势佳`);break;case"权":G.push(`${F.name}化权增强掌控力，适合发挥主导作用`);break;case"科":G.push(`${F.name}化科带来名声和贵气，利于学业和声誉`);break;case"忌":G.push(`${F.name}化忌带来阻碍，需要谨慎处理，化解不利因素`);break}});const V=p.filter(F=>["庙","旺"].includes(F.brightness)),R=p.filter(F=>["落陷","不得地"].includes(F.brightness));V.length>0&&G.push("主星庙旺，宫位能量强，运势较佳"),R.length>0&&G.push("主星失陷，宫位能量弱，需要后天加强");const oe=$.filter(F=>["左辅","右弼","文昌","文曲","天魁","天钺"].includes(F.name)),ge=$.filter(F=>["火星","铃星","擎羊","陀罗","地空","地劫"].includes(F.name));return oe.length>ge.length?G.push("吉星多于煞星，整体运势向好"):ge.length>oe.length&&G.push("煞星较多，需要谨慎行事，化解不利"),G.length>0?G.join("，")+"。":"运势需要结合大运流年综合判断。"},re=S=>{if(!S)return"建议结合整体命盘制定人生规划。";const d=S.name,p=S.allStars?.filter(R=>R.type==="major")||[],$=S.allStars?.filter(R=>R.mutagen)||[];let G=[];const V={命宫:"注重个人修养和品格培养，发挥天赋才能，建立正确的人生观",兄弟宫:"维护兄弟朋友关系，善于合作，建立良好的人际网络",夫妻宫:"用心经营感情，理解包容，建立和谐的婚姻关系",子女宫:"关爱子女教育，发挥创造力，培养良好的师生或上下级关系",财帛宫:"合理规划财务，稳健投资，培养正确的金钱观念",疾厄宫:"注重身体健康，预防疾病，保持良好的生活习惯",迁移宫:"把握变动机会，适应环境变化，善用贵人助力",奴仆宫:"善待部属朋友，建立互信关系，发挥团队合作精神",官禄宫:"努力工作，提升能力，选择适合的职业发展方向",田宅宫:"合理置业，改善居住环境，维护家庭和睦",福德宫:"培养兴趣爱好，保持心境平和，积累福德",父母宫:"孝敬父母长辈，尊师重道，处理好上下级关系"};return G.push(V[d]||"需要根据具体情况制定相应策略"),$.some(R=>R.mutagen==="忌")&&G.push("此宫位有化忌星，需要特别谨慎，多行善事化解不利"),$.some(R=>R.mutagen==="禄")&&G.push("此宫位有化禄星，可以积极发展，把握机会"),p.length===0&&G.push("空宫需要借对宫星耀，或通过后天努力来充实此宫位"),G.join("；")+"。"};return(S,d)=>(I(),b("div",Zn,[P(e).isCalculating?(I(),b("div",Hn,d[1]||(d[1]=[a("div",{class:"loading-indicator"},"计算中...",-1)]))):P(e).calculationError?(I(),b("div",qn,[a("p",null,"错误: "+f(P(e).calculationError),1)])):P(e).hasResults?(I(),b("div",Jn,[a("div",Vn,[P(e).enableSecondPerson&&P(e).displayData2?(I(),b("div",Fn,[a("div",Wn,[a("h4",null,f(P(e).person1.name||"第一人")+"的基本信息",1),a("div",Kn,[a("p",null,[d[2]||(d[2]=a("span",{class:"label"},"性别",-1)),a("span",Qn,f(P(e).displayData1?.basicInfo?.gender||"未知"),1)]),a("p",null,[d[3]||(d[3]=a("span",{class:"label"},"阳历",-1)),a("span",zn,f(P(e).displayData1?.basicInfo?.birthDate?.solar||"未知"),1)]),a("p",null,[d[4]||(d[4]=a("span",{class:"label"},"农历",-1)),a("span",Xn,f(P(e).displayData1?.basicInfo?.birthDate?.lunar||"未知"),1)]),a("p",null,[d[5]||(d[5]=a("span",{class:"label"},"时辰",-1)),a("span",es,f(P(e).displayData1?.basicInfo?.time||"未知")+" "+f(P(e).displayData1?.basicInfo?.timeRange||""),1)]),a("p",null,[d[6]||(d[6]=a("span",{class:"label"},"五行局",-1)),a("span",ts,f(P(e).displayData1?.basicInfo?.fiveElementsClass||"未知"),1)]),a("p",null,[d[7]||(d[7]=a("span",{class:"label"},"命宫",-1)),a("span",ns,f(P(e).displayData1?.basicInfo?.soulPalace||"未知"),1)]),a("p",null,[d[8]||(d[8]=a("span",{class:"label"},"身宫",-1)),a("span",ss,f(P(e).displayData1?.basicInfo?.bodyPalace||"未知"),1)])])]),a("div",as,[a("h4",null,f(P(e).person2.name||"第二人")+"的基本信息",1),a("div",rs,[a("p",null,[d[9]||(d[9]=a("span",{class:"label"},"性别",-1)),a("span",os,f(P(e).displayData2?.basicInfo?.gender||"未知"),1)]),a("p",null,[d[10]||(d[10]=a("span",{class:"label"},"阳历",-1)),a("span",is,f(P(e).displayData2?.basicInfo?.birthDate?.solar||"未知"),1)]),a("p",null,[d[11]||(d[11]=a("span",{class:"label"},"农历",-1)),a("span",ls,f(P(e).displayData2?.basicInfo?.birthDate?.lunar||"未知"),1)]),a("p",null,[d[12]||(d[12]=a("span",{class:"label"},"时辰",-1)),a("span",cs,f(P(e).displayData2?.basicInfo?.time||"未知")+" "+f(P(e).displayData2?.basicInfo?.timeRange||""),1)]),a("p",null,[d[13]||(d[13]=a("span",{class:"label"},"五行局",-1)),a("span",us,f(P(e).displayData2?.basicInfo?.fiveElementsClass||"未知"),1)]),a("p",null,[d[14]||(d[14]=a("span",{class:"label"},"命宫",-1)),a("span",hs,f(P(e).displayData2?.basicInfo?.soulPalace||"未知"),1)]),a("p",null,[d[15]||(d[15]=a("span",{class:"label"},"身宫",-1)),a("span",ds,f(P(e).displayData2?.basicInfo?.bodyPalace||"未知"),1)])])])])):(I(),b("div",gs,[a("div",ms,[a("p",null,[d[16]||(d[16]=a("span",{class:"label"},"姓名",-1)),a("span",ps,f(t.value?.basicInfo?.name||"未填写"),1)]),a("p",null,[d[17]||(d[17]=a("span",{class:"label"},"性别",-1)),a("span",ys,f(t.value?.basicInfo?.gender||"未知"),1)]),a("p",null,[d[18]||(d[18]=a("span",{class:"label"},"阳历",-1)),a("span",fs,f(t.value?.basicInfo?.birthDate?.solar||"未知"),1)]),a("p",null,[d[19]||(d[19]=a("span",{class:"label"},"农历",-1)),a("span",vs,f(t.value?.basicInfo?.birthDate?.lunar||"未知"),1)]),a("p",null,[d[20]||(d[20]=a("span",{class:"label"},"时辰",-1)),a("span",xs,f(t.value?.basicInfo?.time||"未知")+" "+f(t.value?.basicInfo?.timeRange||""),1)]),a("p",null,[d[21]||(d[21]=a("span",{class:"label"},"五行局",-1)),a("span",Ss,f(t.value?.basicInfo?.fiveElementsClass||"未知"),1)]),a("p",null,[d[22]||(d[22]=a("span",{class:"label"},"命宫",-1)),a("span",_s,f(t.value?.basicInfo?.soulPalace||"未知"),1)]),a("p",null,[d[23]||(d[23]=a("span",{class:"label"},"身宫",-1)),a("span",$s,f(t.value?.basicInfo?.bodyPalace||"未知"),1)])]),a("div",Is,[d[28]||(d[28]=a("h4",null,"四化信息",-1)),a("div",bs,[a("div",ws,[d[24]||(d[24]=a("span",{class:"mutagen-type lu"},"化禄",-1)),a("span",As,f(t.value?.mutagens?.lu||"无"),1)]),a("div",ks,[d[25]||(d[25]=a("span",{class:"mutagen-type quan"},"化权",-1)),a("span",Ps,f(t.value?.mutagens?.quan||"无"),1)]),a("div",Es,[d[26]||(d[26]=a("span",{class:"mutagen-type ke"},"化科",-1)),a("span",Ts,f(t.value?.mutagens?.ke||"无"),1)]),a("div",Cs,[d[27]||(d[27]=a("span",{class:"mutagen-type ji"},"化忌",-1)),a("span",Ls,f(t.value?.mutagens?.ji||"无"),1)])])])]))]),a("div",Gs,[d[30]||(d[30]=a("h3",{class:"chart-title"},"星盘信息",-1)),P(e).enableSecondPerson&&P(e).displayData2?(I(),b("div",js,[a("div",Ns,[a("h3",null,f(P(e).person1.name||"第一人")+"的紫薇星盘",1),a("div",Ms,[(I(!0),b(W,null,Q(P(e).displayData1.palaces,p=>(I(),b("div",{key:p.name,class:se(["palace-cell",{"body-palace":p.isBodyPalace}]),onClick:$=>o(p)},[a("div",Us,[a("span",Ys,f(p.name),1),p.isBodyPalace?(I(),b("span",Rs,"身")):j("",!0)]),a("div",Bs,f(p.heavenlyStem)+f(p.earthlyBranch),1),a("div",Os,[(I(!0),b(W,null,Q(M(p.allStars||[]),$=>(I(),b("div",{key:$.name,class:se(i($))},[O(f($.name)+" ",1),$.mutagen?(I(),b("span",{key:0,class:se(["mutagen",r($.mutagen)])},f($.mutagen),3)):j("",!0)],2))),128))]),a("div",Zs,[p.changsheng12?(I(),b("div",Hs,f(p.changsheng12),1)):j("",!0),p.boshi12?(I(),b("div",qs,f(p.boshi12),1)):j("",!0)]),p.ages&&p.ages.length>0?(I(),b("div",Js,f(p.ages.join("-"))+"岁 ",1)):j("",!0)],10,Ds))),128))])]),a("div",Vs,[a("h3",null,f(P(e).person2.name||"第二人")+"的紫薇星盘",1),a("div",Fs,[(I(!0),b(W,null,Q(P(e).displayData2.palaces,p=>(I(),b("div",{key:p.name,class:se(["palace-cell",{"body-palace":p.isBodyPalace}]),onClick:$=>o(p)},[a("div",Ks,[a("span",Qs,f(p.name),1),p.isBodyPalace?(I(),b("span",zs,"身")):j("",!0)]),a("div",Xs,f(p.heavenlyStem)+f(p.earthlyBranch),1),a("div",ea,[(I(!0),b(W,null,Q(M(p.allStars||[]),$=>(I(),b("div",{key:$.name,class:se(i($))},[O(f($.name)+" ",1),$.mutagen?(I(),b("span",{key:0,class:se(["mutagen",r($.mutagen)])},f($.mutagen),3)):j("",!0)],2))),128))]),a("div",ta,[p.changsheng12?(I(),b("div",na,f(p.changsheng12),1)):j("",!0),p.boshi12?(I(),b("div",sa,f(p.boshi12),1)):j("",!0)]),p.ages&&p.ages.length>0?(I(),b("div",aa,f(p.ages.join("-"))+"岁 ",1)):j("",!0)],10,Ws))),128))])]),a("div",ra,[d[29]||(d[29]=a("h4",null,"合盘分析",-1)),a("div",oa,[(I(!0),b(W,null,Q(z(),(p,$)=>(I(),b("div",{key:$,class:"compatibility-analysis-item"},[a("p",null,[a("strong",null,f(X($))+"：",1),O(f(p),1)])]))),128))])])])):(I(),b("div",ia,[a("div",la,[(I(!0),b(W,null,Q(t.value?.palaces||[],p=>(I(),b("div",{key:p.name,class:se(["palace-cell",{"body-palace":p.isBodyPalace}]),onClick:$=>o(p)},[a("div",ua,[a("span",ha,f(p.name),1),p.isBodyPalace?(I(),b("span",da,"身")):j("",!0)]),a("div",ga,f(p.heavenlyStem)+f(p.earthlyBranch),1),a("div",ma,[(I(!0),b(W,null,Q(p.allStars||[],$=>(I(),b("div",{key:$.name,class:se(i($))},[O(f($.name)+" ",1),$.mutagen?(I(),b("span",{key:0,class:se(["mutagen",r($.mutagen)])},f($.mutagen),3)):j("",!0)],2))),128))]),a("div",pa,[p.changsheng12?(I(),b("div",ya,f(p.changsheng12),1)):j("",!0),p.boshi12?(I(),b("div",fa,f(p.boshi12),1)):j("",!0),p.jiangqian12?(I(),b("div",va,f(p.jiangqian12),1)):j("",!0)]),p.ages&&p.ages.length>0?(I(),b("div",xa,f(p.ages.join("-"))+"岁 ",1)):j("",!0),p.isEmpty?(I(),b("div",Sa," 空宫 ")):j("",!0)],10,ca))),128))])]))]),P(e).enableSecondPerson?j("",!0):(I(),b("div",_a,[a("div",$a,[d[35]||(d[35]=a("h4",null,"命盘概述",-1)),a("div",Ia,[a("p",null,[d[31]||(d[31]=a("strong",null,"命主星：",-1)),O(f(h()),1)]),a("p",null,[d[32]||(d[32]=a("strong",null,"身主星：",-1)),O(f(c()),1)]),a("p",null,[d[33]||(d[33]=a("strong",null,"命格层次：",-1)),O(f(g()),1)]),a("p",null,[d[34]||(d[34]=a("strong",null,"格局特征：",-1)),O(f(u()),1)])])]),a("div",ba,[d[36]||(d[36]=a("h4",null,"主要星耀分析",-1)),a("div",wa,[(I(!0),b(W,null,Q(y(),p=>(I(),b("div",{key:p.palace,class:"star-analysis-text"},[a("p",null,[a("strong",null,f(p.palace)+"：",1),O(f(p.stars.join("、"))+"星坐守。"+f(p.description),1)])]))),128))])]),a("div",Aa,[d[37]||(d[37]=a("h4",null,"四化详解",-1)),a("div",ka,[(I(!0),b(W,null,Q(v(),p=>(I(),b("div",{key:p.type,class:"mutagen-analysis-text"},[a("p",null,[a("strong",null,f(p.name)+"：",1),O(f(p.star)+"星在"+f(p.palace)+"。"+f(p.description),1)])]))),128))])]),a("div",Pa,[d[42]||(d[42]=a("h4",null,"运势概况",-1)),a("div",Ea,[a("p",null,[d[38]||(d[38]=a("strong",null,"当前年龄：",-1)),O(f(t.value?.horoscope?.currentAge||0)+"岁",1)]),a("p",null,[d[39]||(d[39]=a("strong",null,"大运宫位：",-1)),O(f(m()),1)]),a("p",null,[d[40]||(d[40]=a("strong",null,"流年宫位：",-1)),O(f(x()),1)]),a("p",null,[d[41]||(d[41]=a("strong",null,"运势建议：",-1)),O(f(L()),1)])])])])),(I(),ct(ht,{to:"body"},[n.value?(I(),b("div",{key:0,class:"palace-modal-overlay",onClick:l},[a("div",{class:"palace-modal",onClick:d[0]||(d[0]=ut(()=>{},["stop"]))},[a("div",Ta,[a("h3",null,f(n.value.name)+"详情",1),a("button",{class:"close-button",onClick:l},"×")]),a("div",Ca,[a("div",La,[a("p",null,[d[43]||(d[43]=a("strong",null,"宫位：",-1)),O(f(n.value.name),1)]),a("p",null,[d[44]||(d[44]=a("strong",null,"干支：",-1)),O(f(n.value.heavenlyStem)+f(n.value.earthlyBranch),1)]),n.value.isBodyPalace?(I(),b("p",Ga,d[45]||(d[45]=[a("strong",null,"身宫",-1)]))):j("",!0),n.value.isEmpty?(I(),b("p",ja,d[46]||(d[46]=[a("strong",null,"空宫",-1)]))):j("",!0),n.value.ages&&n.value.ages.length>0?(I(),b("p",Na,[d[47]||(d[47]=a("strong",null,"年龄：",-1)),O(f(n.value.ages.join("-"))+"岁 ",1)])):j("",!0)]),N(n.value).length>0?(I(),b("div",Ma,[d[48]||(d[48]=a("h4",null,"星耀详情",-1)),U(n.value,"major").length>0?(I(),b("div",Da,[a("h5",null,"主星 ("+f(U(n.value,"major").length)+"颗)",1),a("div",Ua,[(I(!0),b(W,null,Q(U(n.value,"major"),p=>(I(),b("div",{key:p.name,class:"star-detail"},[a("span",Ya,f(p.name),1),p.brightness?(I(),b("span",Ra,f(p.brightness),1)):j("",!0),p.mutagen?(I(),b("span",Ba,f(p.mutagen),1)):j("",!0)]))),128))])])):j("",!0),U(n.value,"minor").length>0?(I(),b("div",Oa,[a("h5",null,"辅星 ("+f(U(n.value,"minor").length)+"颗)",1),a("div",Za,[(I(!0),b(W,null,Q(U(n.value,"minor"),p=>(I(),b("div",{key:p.name,class:"star-detail"},[a("span",Ha,f(p.name),1),p.brightness?(I(),b("span",qa,f(p.brightness),1)):j("",!0),p.mutagen?(I(),b("span",Ja,f(p.mutagen),1)):j("",!0)]))),128))])])):j("",!0),U(n.value,"adjective").length>0?(I(),b("div",Va,[a("h5",null,"杂耀 ("+f(U(n.value,"adjective").length)+"颗)",1),a("div",Fa,[(I(!0),b(W,null,Q(U(n.value,"adjective"),p=>(I(),b("div",{key:p.name,class:"star-detail"},[a("span",Wa,f(p.name),1),p.brightness?(I(),b("span",Ka,f(p.brightness),1)):j("",!0),p.mutagen?(I(),b("span",Qa,f(p.mutagen),1)):j("",!0)]))),128))])])):j("",!0)])):j("",!0),n.value?(I(),b("div",za,[d[52]||(d[52]=a("h4",null,"宫位分析",-1)),a("div",Xa,[a("div",er,[a("p",null,[a("strong",null,f(n.value.name)+"含义：",1),O(f(H(n.value.name)),1)])]),a("div",tr,[a("p",null,[d[49]||(d[49]=a("strong",null,"星耀影响：",-1)),O(f(ee(n.value)),1)])]),a("div",nr,[a("p",null,[d[50]||(d[50]=a("strong",null,"运势分析：",-1)),O(f(le(n.value)),1)])]),a("div",sr,[a("p",null,[d[51]||(d[51]=a("strong",null,"建议指导：",-1)),O(f(re(n.value)),1)])])])])):j("",!0),a("div",ar,[d[58]||(d[58]=a("h4",null,"其他信息",-1)),n.value.changsheng12?(I(),b("p",rr,[d[53]||(d[53]=a("strong",null,"长生十二神：",-1)),O(f(n.value.changsheng12),1)])):j("",!0),n.value.boshi12?(I(),b("p",or,[d[54]||(d[54]=a("strong",null,"博士十二神：",-1)),O(f(n.value.boshi12),1)])):j("",!0),n.value.jiangqian12?(I(),b("p",ir,[d[55]||(d[55]=a("strong",null,"将前十二神：",-1)),O(f(n.value.jiangqian12),1)])):j("",!0),n.value.suiqian12?(I(),b("p",lr,[d[56]||(d[56]=a("strong",null,"岁前十二神：",-1)),O(f(n.value.suiqian12),1)])):j("",!0),n.value.decadal?(I(),b("p",cr,[d[57]||(d[57]=a("strong",null,"大运：",-1)),O(f(n.value.decadal),1)])):j("",!0)])])])])):j("",!0)]))])):j("",!0)]))}},Xe=Te(ur,[["__scopeId","data-v-0a28dbda"]]);class hr{constructor(){this.cache=new Map,this.inspirationCache=new Map,this.maxCacheSize=100,this.cacheVersion="1.0",this.init()}init(){try{const e=localStorage.getItem("ai_analysis_cache"),t=localStorage.getItem("ai_cache_version");if(e&&t===this.cacheVersion){const i=JSON.parse(e);this.cache=new Map(i)}else this.clearCache();const n=localStorage.getItem("ai_inspiration_cache");if(n&&t===this.cacheVersion){const i=JSON.parse(n);this.inspirationCache=new Map(i)}}catch(e){console.warn("加载AI缓存失败:",e),this.clearCache()}}generateCacheKey(e,t,n){const i={year:e.year,month:e.month,day:e.day,timeIndex:e.timeIndex,gender:e.gender,questionType:t,question:n.trim()},r=JSON.stringify(i);let o=0;for(let l=0;l<r.length;l++){const h=r.charCodeAt(l);o=(o<<5)-o+h,o=o&o}return Math.abs(o).toString(36)}shouldCache(e){return e!=="custom"}getCache(e,t,n){if(!this.shouldCache(t))return null;try{const i=this.generateCacheKey(e,t,n),r=this.cache.get(i);return r?(r.lastAccessed=Date.now(),this.cache.set(i,r),console.log("AI缓存命中:",t,n),r.response):null}catch(i){return console.warn("获取AI缓存失败:",i),null}}setCache(e,t,n,i){if(!(!this.shouldCache(t)||!i||!i.trim()))try{const r=this.generateCacheKey(e,t,n),o={response:i.trim(),createdAt:Date.now(),lastAccessed:Date.now(),questionType:t,question:n};this.cache.size>=this.maxCacheSize&&this.cleanupOldEntries(),this.cache.set(r,o),this.saveToStorage(),console.log("AI缓存已保存:",t,n)}catch(r){console.warn("保存AI缓存失败:",r)}}cleanupOldEntries(){try{const e=Array.from(this.cache.entries());e.sort((i,r)=>i[1].lastAccessed-r[1].lastAccessed);const t=Math.floor(this.maxCacheSize*.8),n=e.slice(0,e.length-t);n.forEach(([i])=>{this.cache.delete(i)}),console.log(`清理了 ${n.length} 个旧的AI缓存条目`)}catch(e){console.warn("清理AI缓存失败:",e)}}clearBaziCache(e){try{const t=JSON.stringify({year:e.year,month:e.month,day:e.day,timeIndex:e.timeIndex,gender:e.gender}),n=[];for(const[o,l]of this.cache.entries())try{const h=JSON.parse(atob(o));JSON.stringify({year:h.year,month:h.month,day:h.day,timeIndex:h.timeIndex,gender:h.gender})===t&&n.push(o)}catch{}n.forEach(o=>{this.cache.delete(o)});const i=this.generateBaziKey(e),r=this.inspirationCache.has(i);r&&this.inspirationCache.delete(i),(n.length>0||r)&&(this.saveToStorage(),console.log(`清理了 ${n.length} 个分析缓存条目和 ${r?1:0} 个问题灵感缓存`))}catch(t){console.warn("清理八字缓存失败:",t)}}getInspirationCache(e){try{const t=this.generateBaziKey(e),n=this.inspirationCache.get(t);return n?(n.lastAccessed=Date.now(),this.inspirationCache.set(t,n),console.log("问题灵感缓存命中"),n.suggestions):null}catch(t){return console.warn("获取问题灵感缓存失败:",t),null}}setInspirationCache(e,t){if(!(!t||!Array.isArray(t)||t.length===0))try{const n=this.generateBaziKey(e),i={suggestions:[...t],createdAt:Date.now(),lastAccessed:Date.now()};this.inspirationCache.set(n,i),this.saveToStorage(),console.log("问题灵感缓存已保存")}catch(n){console.warn("保存问题灵感缓存失败:",n)}}generateBaziKey(e){const t={year:e.year,month:e.month,day:e.day,timeIndex:e.timeIndex,gender:e.gender},n=JSON.stringify(t);let i=0;for(let r=0;r<n.length;r++){const o=n.charCodeAt(r);i=(i<<5)-i+o,i=i&i}return Math.abs(i).toString(36)}clearCache(){this.cache.clear(),this.inspirationCache.clear(),localStorage.removeItem("ai_analysis_cache"),localStorage.removeItem("ai_inspiration_cache"),localStorage.removeItem("ai_cache_version"),console.log("AI缓存已清空")}saveToStorage(){try{const e=Array.from(this.cache.entries()),t=Array.from(this.inspirationCache.entries());localStorage.setItem("ai_analysis_cache",JSON.stringify(e)),localStorage.setItem("ai_inspiration_cache",JSON.stringify(t)),localStorage.setItem("ai_cache_version",this.cacheVersion)}catch(e){if(console.warn("保存AI缓存到本地存储失败:",e),e.name==="QuotaExceededError"){this.cleanupOldEntries();try{const t=Array.from(this.cache.entries()),n=Array.from(this.inspirationCache.entries());localStorage.setItem("ai_analysis_cache",JSON.stringify(t)),localStorage.setItem("ai_inspiration_cache",JSON.stringify(n)),localStorage.setItem("ai_cache_version",this.cacheVersion)}catch(t){console.warn("重试保存AI缓存失败:",t)}}}}getStats(){return{size:this.cache.size,maxSize:this.maxCacheSize,version:this.cacheVersion}}}const xe=new hr,dr=tt("bazi",()=>{const s=Y({name:"",year:"",month:"",day:"",timeIndex:0,gender:""}),e=Y({name:"",year:"",month:"",day:"",timeIndex:0,gender:""}),t=Y(!1),n=Y(null),i=Y(null),r=Y(!1),o=Y(""),l=Y(""),h=Y(!1),c=Y(""),g=new Map,u=ce(()=>{const C=s.value.year&&s.value.month&&s.value.day&&s.value.gender;if(!t.value)return C;const k=e.value.year&&e.value.month&&e.value.day&&e.value.gender;return C&&k}),y=ce(()=>n.value!==null),_=async()=>{if(!u.value)return o.value="请填写完整的出生信息",!1;const C=`bazi_${s.value.year}_${s.value.month}_${s.value.day}_${s.value.timeIndex}_${s.value.gender}`,k=g.get(C);if(k)return n.value=k,Ge(s.value),!0;const N="calculate-bazi";r.value=!0,o.value="";try{if(pe.showLoading("正在计算八字...",N),n.value){const U={year:n.value.year,month:n.value.month,day:n.value.day,timeIndex:n.value.timeIndex,gender:n.value.gender},H={year:s.value.year,month:s.value.month,day:s.value.day,timeIndex:s.value.timeIndex,gender:s.value.gender};JSON.stringify(U)!==JSON.stringify(H)&&xe.clearBaziCache(U)}return pe.updateLoadingMessage("正在计算第一人八字...",N),n.value={...de.calculateBazi(parseInt(s.value.year),parseInt(s.value.month),parseInt(s.value.day),s.value.timeIndex,s.value.gender)},t.value?(pe.updateLoadingMessage("正在计算第二人八字...",N),i.value={...de.calculateBazi(parseInt(e.value.year),parseInt(e.value.month),parseInt(e.value.day),e.value.timeIndex,e.value.gender)}):i.value=null,g.set(C,n.value),Ge(s.value),pe.hideLoading(N),nt("八字计算完成！"),!0}catch(U){pe.hideLoading(N),console.error("八字计算失败:",U);const H=U.message||"八字计算失败，请检查输入信息";return o.value=H,Se(H),Me.reportError(U,"八字计算"),!1}finally{r.value=!1}},v=async(C,k="custom",N=!1,U=!1)=>{if(!n.value){c.value="请先进行八字排盘",Se("请先进行八字排盘");return}h.value=!0,c.value="",N||(l.value="");let H=null,ee=null;try{if(t.value&&i.value){const K=be(n.value),le=be(i.value),re=ye.buildCompatibilityPrompt(K,le,C);N&&(l.value+=`

---

## 追问：${C}

`);for await(const S of ye.queryAI(re))l.value+=S}else if(ee={year:s.value.year,month:s.value.month,day:s.value.day,timeIndex:s.value.timeIndex,gender:s.value.gender},U||(H=xe.getCache(ee,k,C),console.log("缓存检查:",{questionType:k,question:C.substring(0,50)+"...",hasCachedResponse:!!H,shouldCache:xe.shouldCache(k),cacheKey:xe.generateCacheKey(ee,k,C).substring(0,20)+"..."})),H&&!U)N?l.value+=`

---

## 追问：${C}

${H}`:l.value=H,console.log("使用AI缓存结果");else{const K={id:x(k,C),dataset:{prompt:""}},le=be(n.value,K),re=ye.buildPromptFromConfig(C,K,n.value);N&&(l.value+=`

---

## 追问：${C}

`);let S="";for await(const d of ye.queryAI(re))l.value+=d,S+=d;S&&S.trim()&&(console.log("准备保存缓存:",{questionType:k,question:C.substring(0,50)+"...",shouldCache:xe.shouldCache(k),contentLength:S.trim().length}),xe.setCache(ee,k,C,S.trim()),U&&console.log("强制重新生成，已更新缓存"))}}catch(K){console.error("AI 分析失败:",K);const le=K.message||"AI 分析失败，请稍后重试";c.value=le,Se(le),Me.reportError(K,"AI分析")}finally{H&&!U?setTimeout(()=>{h.value=!1},100):h.value=!1}},w=()=>{ye.cancelRequest(),h.value=!1},A=()=>{if(n.value){const C={year:n.value.year,month:n.value.month,day:n.value.day,timeIndex:n.value.timeIndex,gender:n.value.gender};xe.clearBaziCache(C)}s.value={name:"",year:"",month:"",day:"",timeIndex:0,gender:""},e.value={name:"",year:"",month:"",day:"",timeIndex:0,gender:""},t.value=!1,n.value=null,i.value=null,l.value="",o.value="",c.value="",ae(),z()},m=()=>{l.value="",c.value=""},x=(C,k)=>{const N={mingge:"ai-mingge-zonglun","current-luck":"ai-current-luck",year:"ai-this-year","monthly-fortune":"ai-monthly-fortune","next-three-years":"ai-next-three-years","lifetime-fortune":"ai-lifetime-fortune",career:"ai-career",marriage:"ai-marriage",health:"ai-health",custom:"custom"};return k&&k.includes("选定日期")?"ask-ai-with-date":N[C]||"custom"},L=()=>{try{const C=Gt();if(C)return s.value={...s.value,...C.person1},e.value={...e.value,...C.person2},t.value=!0,Z(C.person1.name,C.person2.name),!0;const k=Et();return k?(s.value={...s.value,...k},Z(k.name),!0):!1}catch(C){return console.error("从URL加载数据失败:",C),!1}},M=()=>{try{t.value&&u.value&&e.value.year?(Lt(s.value,e.value),Z(s.value.name,e.value.name)):u.value&&(Ge(s.value),Z(s.value.name))}catch(C){console.error("保存数据到URL失败:",C)}},z=()=>{try{Tt(),jt()}catch(C){console.error("清除URL数据失败:",C)}},X=()=>{try{return t.value&&e.value.year?We(s.value,e.value):We(s.value)}catch(C){return console.error("生成分享链接失败:",C),window.location.href}},D=()=>Nt(),Z=(C,k=null)=>{try{let N="八字排盘";k?N=`${C||"第一人"}与${k||"第二人"}的八字合盘分析`:C&&(N=`${C}的八字排盘`),document.title=N;const U=document.querySelector('meta[property="og:title"]');U&&U.setAttribute("content",N);const H=document.querySelector('meta[name="description"]');if(H&&C){let ee="专业的AI八字排盘和命理分析工具";k?ee=`${C}与${k}的八字合盘分析，专业AI命理解读`:ee=`${C}的八字排盘结果，专业AI命理分析`,H.setAttribute("content",ee)}}catch(N){console.error("更新页面标题失败:",N)}},ae=()=>{try{document.title="八字排盘";const C=document.querySelector('meta[property="og:title"]');C&&C.setAttribute("content","八字排盘");const k=document.querySelector('meta[name="description"]');k&&k.setAttribute("content","专业的AI八字排盘和命理分析工具")}catch(C){console.error("重置页面标题失败:",C)}};return{person1:s,person2:e,enableSecondPerson:t,baziResult1:n,baziResult2:i,isCalculating:r,calculationError:o,aiResponse:l,isAIThinking:h,aiError:c,canCalculate:u,hasResults:y,calculateBazi:_,askAI:v,cancelAI:w,resetForm:A,resetAI:m,loadFromUrl:L,saveToUrl:M,clearUrl:z,getShareUrl:X,hasUrlData:D,updatePageTitle:Z,resetPageTitle:ae}});const gr={key:0,class:"ai-chat-container"},mr={class:"question-options"},pr={class:"question-buttons-container"},yr={class:"question-buttons"},fr=["onClick"],vr={key:0,class:"custom-question"},xr={key:1,class:"error-message"},Sr=["disabled"],_r={class:"inspiration-container"},$r={class:"inspiration-tab-navigation"},Ir=["onClick"],br={class:"inspiration-tab-content"},wr={key:0,class:"inspiration-tab-pane"},Ar={class:"questions-grid"},kr=["onClick"],Pr=["innerHTML"],Er={key:0,class:"thinking-indicator"},Tr={key:1,class:"continue-explore"},Cr={key:0,class:"user-question-context"},Lr={class:"user-question"},Gr={class:"explore-section"},jr={key:0,class:"suggested-questions"},Nr=["onClick"],Mr=["disabled"],Dr={key:0,class:"suggestion-updating"},Ur={key:1,class:"suggestion-loading"},Yr={key:2,class:"suggestion-loading"},Rr={class:"explore-section"},Br={class:"free-chat-input"},Or=["disabled"],Zr=["disabled"],Hr={class:"quick-actions"},qr=["disabled"],Jr=["disabled"],Vr=["disabled"],Fr={__name:"AIChat",setup(s){const e=dt(),t=ce(()=>e.path.includes("/zw")),n=ce(()=>t.value?Ce():dr()),i=Y(""),r=Y(""),o=Y(!1),l=Y(t.value?"personality":"ganqing"),h=Y([]),c=Y({}),g=Y([]),u=Y(!1),y=Y(""),_=Y(null),v=Y(""),w=new Map,A=new ft(_),m=Y(!1),x=Y(null),L=Y(null),M=Y(null),z=[{id:"ai-mingge-zonglun",text:"命格总论",type:"mingge"},{id:"ai-current-luck",text:"当前大运",type:"current-luck"},{id:"ai-this-year",text:"今年运势",type:"year"},{id:"ai-monthly-fortune",text:"年运逐月",type:"monthly-fortune"},{id:"ai-next-three-years",text:"未来三年",type:"next-three-years"},{id:"ai-lifetime-fortune",text:"一生运势",type:"lifetime-fortune"},{id:"ai-career",text:"事业财运",type:"career"},{id:"ai-marriage",text:"感情婚姻",type:"marriage"},{id:"ai-health",text:"健康状况",type:"health"},{id:"ask-ai-with-date",text:"选定日期...",type:"custom"},{id:"custom",text:"自定义...",type:"custom"}],X=[{id:"ai-compat-marriage",text:"婚恋匹配",type:"marriage"},{id:"ai-compat-career",text:"事业合作",type:"career"},{id:"ai-compat-custom",text:"自定义...",type:"custom"}],D=[{id:"ai-ziwei-personality",text:"性格分析",type:"personality"},{id:"ai-ziwei-career",text:"事业财运",type:"career"},{id:"ai-ziwei-relationship",text:"感情婚姻",type:"relationship"},{id:"ai-ziwei-health",text:"健康状况",type:"health"},{id:"ai-ziwei-fortune",text:"运势分析",type:"fortune"},{id:"ai-ziwei-palace",text:"宫位分析",type:"palace"},{id:"custom",text:"自定义...",type:"custom"}],Z=[{id:"ai-ziwei-compat",text:"合盘分析",type:"compatibility"},{id:"ai-ziwei-marriage",text:"感情匹配",type:"relationship"},{id:"ai-ziwei-cooperation",text:"事业合作",type:"career"},{id:"custom",text:"自定义...",type:"custom"}],ae=[{id:"ganqing",name:"感情",content:[{title:"情感发展",questions:[{text:"我近期的桃花运怎么样？",type:"marriage"},{text:"我们目前的感情走向如何？",type:"marriage"},{text:"他/她对我的真实情感是什么？",type:"marriage"},{text:"我们之间有未来吗？",type:"marriage"},{text:"如何改善我们目前的关系？",type:"marriage"},{text:"这段感情对我的影响？",type:"marriage"},{text:"我在感情中容易犯什么错误？",type:"marriage"},{text:"如何处理感情中的矛盾冲突？",type:"marriage"}]},{title:"正缘婚姻",questions:[{text:"我的正缘什么时候出现？",type:"marriage"},{text:"我的另一半是什么样的人？",type:"marriage"},{text:"我何时会结婚？",type:"marriage"},{text:"我适合和现在的对象结婚吗？",type:"marriage"},{text:"我的婚姻生活会幸福吗？",type:"marriage"},{text:"如何吸引我的正缘桃花？",type:"marriage"},{text:"我适合什么年龄结婚？",type:"marriage"},{text:"婚后我需要注意什么问题？",type:"marriage"}]},{title:"感情困扰",questions:[{text:"为什么我总是遇到不合适的人？",type:"marriage"},{text:"如何走出失恋的阴霾？",type:"marriage"},{text:"我在感情中缺乏什么？",type:"marriage"},{text:"如何提升自己的魅力？",type:"marriage"},{text:"异地恋能否有好结果？",type:"marriage"},{text:"如何判断对方是否真心？",type:"marriage"}]}]},{id:"shiye",name:"事业",content:[{title:"事业发展",questions:[{text:"我适合现在的工作/行业吗？",type:"career"},{text:"我的事业什么时候能成功？",type:"career"},{text:"我适合跳槽还是继续坚守？",type:"career"},{text:"我事业上的贵人会是谁？",type:"career"},{text:"我未来的事业走向怎么样？",type:"career"},{text:"我什么时候能找到满意的工作？",type:"career"},{text:"我适合创业还是打工？",type:"career"},{text:"如何在职场中脱颖而出？",type:"career"}]},{title:"职业规划",questions:[{text:"我最适合从事什么行业？",type:"career"},{text:"我的职业天赋在哪里？",type:"career"},{text:"如何规划我的职业发展路径？",type:"career"},{text:"我适合做管理还是技术？",type:"career"},{text:"转行对我来说是好选择吗？",type:"career"},{text:"我在什么环境下工作最有效率？",type:"career"}]},{title:"工作困扰",questions:[{text:"如何处理职场人际关系？",type:"career"},{text:"为什么我的工作总是不顺利？",type:"career"},{text:"如何获得上司的认可？",type:"career"},{text:"我在工作中的弱点是什么？",type:"career"},{text:"如何平衡工作与生活？",type:"career"},{text:"面对工作压力该如何调节？",type:"career"}]}]},{id:"caifu",name:"财富",content:[{title:"财运趋势",questions:[{text:"我近期的财运怎么样？",type:"career"},{text:"我这辈子财运的整体趋势？",type:"career"},{text:"我什么时候能发财？",type:"career"},{text:"我适合靠什么方式赚钱？",type:"career"},{text:"如何有效提升我的财运？",type:"career"},{text:"我近期会有意外之财吗？",type:"career"},{text:"我的财富巅峰期在什么时候？",type:"career"},{text:"我容易在哪些方面破财？",type:"career"}]},{title:"投资理财",questions:[{text:"我适合投资股票还是房产？",type:"career"},{text:"我的投资运势如何？",type:"career"},{text:"什么时候是我投资的好时机？",type:"career"},{text:"我适合保守理财还是激进投资？",type:"career"},{text:"如何避免投资失败？",type:"career"},{text:"我有做生意的天赋吗？",type:"career"}]},{title:"财富管理",questions:[{text:"如何培养正确的金钱观？",type:"career"},{text:"我为什么总是存不住钱？",type:"career"},{text:"如何增加被动收入？",type:"career"},{text:"我适合与人合伙做生意吗？",type:"career"},{text:"如何平衡消费与储蓄？",type:"career"},{text:"我的财富会传承给下一代吗？",type:"career"}]}]},{id:"renji",name:"人际",content:[{title:"社交模式",questions:[{text:"我的人际交往模式有何优缺点？",type:"mingge"},{text:"如何拓展我的高质量社交圈？",type:"mingge"},{text:"我目前的人际关系状态如何？",type:"mingge"},{text:"我会吸引哪些人进入我的生活？",type:"mingge"},{text:"如何获得他人的信任与支持？",type:"mingge"},{text:"如何处理与朋友的矛盾？",type:"mingge"},{text:"我在社交中的天然优势是什么？",type:"mingge"},{text:"如何克服社交恐惧？",type:"mingge"}]},{title:"家庭关系",questions:[{text:"如何改善与父母的关系？",type:"mingge"},{text:"我与兄弟姐妹的关系如何？",type:"mingge"},{text:"如何处理家庭矛盾？",type:"mingge"},{text:"我在家庭中扮演什么角色？",type:"mingge"},{text:"如何平衡家庭与个人发展？",type:"mingge"},{text:"我会是一个好父母吗？",type:"mingge"}]},{title:"人际困扰",questions:[{text:"为什么我总是遇到小人？",type:"mingge"},{text:"如何识别身边的真假朋友？",type:"mingge"},{text:"我在人际关系中的盲点是什么？",type:"mingge"},{text:"如何提升自己的人格魅力？",type:"mingge"},{text:"如何在团队中发挥领导力？",type:"mingge"},{text:"我适合与什么样的人深交？",type:"mingge"}]}]},{id:"rensheng",name:"成长",content:[{title:"个人成长",questions:[{text:"我的性格优势和劣势是什么？",type:"mingge"},{text:"我的人生主要课题是什么？",type:"mingge"},{text:"如何找到我的人生方向？",type:"mingge"},{text:"如何克服我性格中的弱点？",type:"mingge"},{text:"如何有效提升自己的能量状态？",type:"mingge"},{text:"我的人生转折点在何时？",type:"mingge"},{text:"我的天赋和潜能在哪里？",type:"mingge"},{text:"如何建立强大的内心？",type:"mingge"}]},{title:"人生规划",questions:[{text:"我这一生的使命是什么？",type:"mingge"},{text:"如何制定适合自己的人生目标？",type:"mingge"},{text:"我在什么年龄段会迎来人生高峰？",type:"mingge"},{text:"如何平衡理想与现实？",type:"mingge"},{text:"我的人生会有几次重大机遇？",type:"mingge"},{text:"如何为未来做好准备？",type:"mingge"}]},{title:"心理健康",questions:[{text:"如何管理自己的情绪？",type:"health"},{text:"我容易患哪些心理问题？",type:"health"},{text:"如何提升心理抗压能力？",type:"health"},{text:"如何走出人生低谷？",type:"health"},{text:"我的心理盲点在哪里？",type:"health"},{text:"如何保持积极的心态？",type:"health"}]},{title:"身体健康",questions:[{text:"我需要重点关注哪些健康问题？",type:"health"},{text:"我的体质特点是什么？",type:"health"},{text:"如何制定适合自己的养生方案？",type:"health"},{text:"我在什么年龄段需要特别注意健康？",type:"health"},{text:"如何通过饮食调理身体？",type:"health"},{text:"我适合什么样的运动方式？",type:"health"}]}]},{id:"xueye",name:"学业",content:[{title:"学习能力",questions:[{text:"我的学习天赋在哪个领域？",type:"mingge"},{text:"如何提高我的学习效率？",type:"mingge"},{text:"我适合什么样的学习方式？",type:"mingge"},{text:"如何克服学习中的困难？",type:"mingge"},{text:"我在学习中的优势和劣势？",type:"mingge"},{text:"如何培养良好的学习习惯？",type:"mingge"}]},{title:"专业选择",questions:[{text:"我适合学习什么专业？",type:"career"},{text:"文科还是理科更适合我？",type:"career"},{text:"我应该选择什么样的大学？",type:"career"},{text:"出国留学对我有利吗？",type:"career"},{text:"我的专业会有好的就业前景吗？",type:"career"},{text:"转专业对我来说是好选择吗？",type:"career"}]},{title:"考试运势",questions:[{text:"我的考试运势如何？",type:"year"},{text:"什么时候是我考试的最佳时机？",type:"year"},{text:"如何在重要考试中发挥最佳状态？",type:"year"},{text:"我容易在考试中犯什么错误？",type:"year"},{text:"如何克服考试焦虑？",type:"health"},{text:"我的学业会在什么时候迎来转机？",type:"year"}]},{title:"教育发展",questions:[{text:"我适合继续深造还是直接工作？",type:"career"},{text:"读研究生对我的发展有帮助吗？",type:"career"},{text:"我有做老师的天赋吗？",type:"career"},{text:"如何在学术道路上取得成功？",type:"career"},{text:"我适合从事教育行业吗？",type:"career"},{text:"如何平衡学习与其他生活？",type:"mingge"}]}]}],C=[{id:"personality",name:"性格命格",content:[{title:"命宫分析",questions:[{text:"我的命宫主星是什么？有什么特质？",type:"personality"},{text:"我的性格优势和劣势是什么？",type:"personality"},{text:"我的天赋才能在哪些方面？",type:"personality"},{text:"我适合什么样的人生道路？",type:"personality"},{text:"我的命格层次如何？",type:"personality"},{text:"我的性格中最突出的特点是什么？",type:"personality"},{text:"我在人际交往中的表现如何？",type:"personality"},{text:"我的领导能力和管理才能如何？",type:"personality"}]},{title:"身宫特质",questions:[{text:"我的身宫在哪里？有什么意义？",type:"personality"},{text:"我的人生重心应该放在哪里？",type:"personality"},{text:"身宫对我的性格有什么影响？",type:"personality"},{text:"如何发挥身宫的正面作用？",type:"personality"}]},{title:"福德宫分析",questions:[{text:"我的精神世界和内心状态如何？",type:"personality"},{text:"我的兴趣爱好和精神追求是什么？",type:"personality"},{text:"我如何获得内心的平静和快乐？",type:"personality"},{text:"我的思维模式和价值观如何？",type:"personality"}]}]},{id:"career",name:"事业财运",content:[{title:"官禄宫分析",questions:[{text:"我适合什么类型的工作？",type:"career"},{text:"我的事业发展方向是什么？",type:"career"},{text:"我什么时候会有事业突破？",type:"career"},{text:"我适合创业还是打工？",type:"career"},{text:"我的职场贵人运如何？",type:"career"},{text:"我在工作中容易遇到什么挑战？",type:"career"},{text:"我的升职加薪运势如何？",type:"career"},{text:"我适合在什么行业发展？",type:"career"}]},{title:"财帛宫分析",questions:[{text:"我的财运如何？",type:"career"},{text:"我适合什么样的投资理财？",type:"career"},{text:"我什么时候会有财运提升？",type:"career"},{text:"我的偏财运和正财运如何？",type:"career"},{text:"我容易在哪些方面破财？",type:"career"},{text:"我的理财观念和消费习惯如何？",type:"career"},{text:"我适合做什么样的投资？",type:"career"},{text:"我的财富积累能力如何？",type:"career"}]},{title:"田宅宫分析",questions:[{text:"我的房产运势如何？",type:"career"},{text:"我什么时候适合买房？",type:"career"},{text:"我适合投资房地产吗？",type:"career"},{text:"我的家庭环境对我有什么影响？",type:"career"}]}]},{id:"relationship",name:"感情婚姻",content:[{title:"夫妻宫分析",questions:[{text:"我的另一半会是什么样的人？",type:"relationship"},{text:"我什么时候会遇到正缘？",type:"relationship"},{text:"我的婚姻运势如何？",type:"relationship"},{text:"我在感情中需要注意什么？",type:"relationship"},{text:"我的桃花运什么时候最旺？",type:"relationship"},{text:"我容易遇到什么样的感情问题？",type:"relationship"},{text:"我的婚姻会幸福美满吗？",type:"relationship"},{text:"我如何改善夫妻关系？",type:"relationship"}]},{title:"子女宫分析",questions:[{text:"我的子女缘分如何？",type:"relationship"},{text:"我适合什么时候要孩子？",type:"relationship"},{text:"我的孩子会是什么性格？",type:"relationship"},{text:"我和孩子的关系如何？",type:"relationship"},{text:"我的子女对我的事业有什么影响？",type:"relationship"},{text:"我如何教育孩子？",type:"relationship"}]},{title:"兄弟宫分析",questions:[{text:"我和兄弟姐妹的关系如何？",type:"relationship"},{text:"我的朋友运势如何？",type:"relationship"},{text:"我容易交到什么样的朋友？",type:"relationship"},{text:"我在团队合作中的表现如何？",type:"relationship"}]}]},{id:"health",name:"健康疾厄",content:[{title:"疾厄宫分析",questions:[{text:"我需要注意哪些健康问题？",type:"health"},{text:"我的体质特点是什么？",type:"health"},{text:"我容易得什么疾病？",type:"health"},{text:"我如何保养身体？",type:"health"},{text:"我的精神健康状况如何？",type:"health"},{text:"我什么时候需要特别注意健康？",type:"health"},{text:"我适合什么样的运动和养生方式？",type:"health"},{text:"我的睡眠质量如何改善？",type:"health"}]},{title:"意外灾厄",questions:[{text:"我需要防范哪些意外？",type:"health"},{text:"我什么时候要特别小心？",type:"health"},{text:"我如何化解不利因素？",type:"health"},{text:"我的安全运势如何？",type:"health"}]}]},{id:"fortune",name:"运势流年",content:[{title:"大运分析",questions:[{text:"我现在处于什么大运？",type:"fortune"},{text:"我的大运对我有什么影响？",type:"fortune"},{text:"我下一个大运会如何？",type:"fortune"},{text:"我的大运什么时候最好？",type:"fortune"},{text:"我如何把握大运机遇？",type:"fortune"},{text:"我的大运对事业有什么影响？",type:"fortune"},{text:"我的大运对感情有什么影响？",type:"fortune"},{text:"我如何度过不利的大运？",type:"fortune"}]},{title:"流年分析",questions:[{text:"今年我的运势如何？",type:"fortune"},{text:"明年我需要注意什么？",type:"fortune"},{text:"我什么时候运势最好？",type:"fortune"},{text:"今年我的事业运如何？",type:"fortune"},{text:"今年我的财运如何？",type:"fortune"},{text:"今年我的感情运如何？",type:"fortune"},{text:"今年我的健康运如何？",type:"fortune"},{text:"我如何提升今年的运势？",type:"fortune"}]}]}],k=ce(()=>t.value?C:ae),N=E=>{pt(()=>{const T=k.value.findIndex(q=>q.id===E);if(T===-1||!h.value[T]){setTimeout(()=>N(E),50);return}const B=h.value[T];if(B.offsetLeft===0&&B.offsetWidth===0){setTimeout(()=>N(E),50);return}c.value={left:`${B.offsetLeft}px`,width:`${B.offsetWidth}px`}})};Ie(l,E=>{N(E)},{immediate:!0});const U=E=>{l.value=E},H=ce(()=>t.value?n.value.enableSecondPerson?Z:D:n.value.enableSecondPerson?X:z),ee=ce(()=>o.value?r.value.trim().length>0:i.value!==""),K=ce(()=>{if(!n.value.aiResponse)return"";const E=n.value.aiResponse.replace(/^---+$/gm,"");return xt.parse(E)}),le=E=>{i.value=E.id,o.value=E.type==="custom",o.value||(r.value="")},re=async()=>{let E="",T="custom";if(o.value)E=r.value.trim();else{const B=H.value.find(q=>q.id===i.value);B&&(E=B.text,T=B.type)}E&&(v.value=E,fe(),await n.value.askAI(E,T))},S=async(E,T="custom")=>{console.log("问题灵感调用:",{question:E,questionType:T}),v.value=E,fe(),await n.value.askAI(E,T)},d=async()=>{if(u.value){console.log("智能建议生成已在进行中，跳过");return}const E=`suggestions_${n.value.person1?.year}_${n.value.person1?.month}_${n.value.person1?.day}_${v.value}`,T=w.get(E);if(T){g.value=T;return}u.value=!0;const B=setTimeout(()=>{u.value&&(console.warn("智能建议生成超时"),u.value=!1)},6e3);try{if(!n.value.hasResults||!n.value.hasResults.value){console.log("没有紫薇数据，跳过建议生成"),clearTimeout(B),u.value=!1;return}await new Promise(te=>setTimeout(te,800));const ne=`用户刚刚问了这个问题："${v.value||""}"

请根据这个问题，生成3个用户可能感兴趣的相关后续问题。这些问题应该：
1. 与原问题相关但有所延伸
2. 能够帮助用户更深入了解相关话题
3. 实用且有价值

请直接输出3个问题，每行一个，不要编号，不要其他说明文字。`;try{console.log("开始AI建议生成请求");let te="";for await(const ve of ye.queryAI(ne))te+=ve;if(console.log("AI建议生成完成，原始响应:",te),te&&te.trim()){const ve=te.split(`
`).map(Ae=>Ae.trim()).filter(Ae=>Ae&&!Ae.match(/^\d+\./)&&Ae.length>5).slice(0,3);console.log("处理后的建议:",ve),ve.length>0?(console.log("设置建议前的状态:",{currentSuggestions:g.value,newSuggestions:ve,isGenerating:u.value}),g.value=ve,w.set(E,ve),console.log("设置建议后的状态:",{currentSuggestions:g.value,isGenerating:u.value})):console.log("没有有效的建议内容")}else console.log("AI返回空内容")}catch(te){if(te.name==="AbortError"){console.log("建议生成请求被中止，这是正常的");return}console.warn("AI生成建议失败:",te)}}catch(q){A.handle(q,"生成建议",!1)}finally{clearTimeout(B),u.value=!1}},p=async()=>{if(!u.value){u.value=!0;try{if(!n.value.baziResult1)return;await new Promise(q=>setTimeout(q,1e3));const E=n.value.aiResponse||"",B=`请基于以下八字分析结果和用户问题，重新生成3个不同的后续问题建议：

用户问题：${v.value||""}

分析结果：${E.substring(0,500)}...

请生成3个与之前不同的、与用户问题和分析结果高度相关的后续问题，格式为纯文本，每行一个问题，不要编号。`;try{let q="";for await(const ne of ye.queryAI(B))q+=ne;if(q&&q.trim()){const ne=q.split(`
`).map(te=>te.trim()).filter(te=>te&&!te.match(/^\d+\./)&&te.length>5).slice(0,3);if(ne.length>0){g.value=ne,u.value=!1;return}}}catch(q){if(q.name==="AbortError"){console.log("重新生成建议请求被中止，这是正常的"),u.value=!1;return}console.warn("AI重新生成建议失败:",q)}}catch(E){console.error("重新生成建议失败:",E)}finally{u.value=!1}}},$=async E=>{v.value=E,fe(),await n.value.askAI(E,"custom",!0),setTimeout(()=>{he()},500)},G=async()=>{if(!y.value.trim())return;const E=y.value.trim();y.value="",v.value=E,fe(),await n.value.askAI(E,"custom",!0),setTimeout(()=>{he()},500)},V=async()=>{const E=`请对我的${v.value||"八字分析"}进行更详细深入的分析，包括具体的时间节点和注意事项`;v.value=E,fe(),await n.value.askAI(E,"custom"),setTimeout(()=>{he()},500)},R=async()=>{const E=new Date().getFullYear(),T=`我在${E}年和${E+1}年的运势如何？有哪些重要时间节点？`;v.value=T,fe(),await n.value.askAI(T,"custom"),setTimeout(()=>{he()},500)},oe=async()=>{const E="基于我的八字，如何改善和提升我的运势？有什么具体的方法和建议？";v.value=E,fe(),await n.value.askAI(E,"custom"),setTimeout(()=>{he()},500)},ge=async()=>{if(!n.value.aiResponse){_.value&&_.value.addToast("暂无AI回答内容可复制","warning","",3e3);return}try{const E=new Date().toLocaleString("zh-CN");let T=`八字分析结果
`;T+=`生成时间：${E}
`,T+=`${"=".repeat(30)}

`,T+=`问题：${v.value||"八字分析"}

`,T+=`回答：
${n.value.aiResponse.replace(/<[^>]*>/g,"").replace(/&nbsp;/g," ")}

`,T+=`${"=".repeat(30)}
`,T+=`来源：八字排盘系统
`,await navigator.clipboard.writeText(T),_.value&&_.value.addToast("AI回答已复制到剪贴板","success","",3e3)}catch(E){console.error("复制失败:",E),_.value&&_.value.addToast("复制失败，请手动选择复制","error","",3e3)}},F=()=>{_e=Date.now(),he(),setTimeout(()=>{if(_e=Date.now(),L.value)L.value.scrollIntoView({behavior:"smooth",block:"end"});else{const E=document.querySelector(".ai-response");E&&E.scrollIntoView({behavior:"smooth",block:"end"})}},100)},fe=()=>{m.value=!0,console.log("开始自动滚动"),setTimeout(()=>{F()},100),x.value=setInterval(()=>{m.value&&(n.value.isAIThinking||n.value.aiResponse)&&(he(),n.value.isAIThinking&&L.value&&setTimeout(()=>{L.value.scrollIntoView({behavior:"smooth",block:"nearest"})},100))},500)},he=()=>{try{_e=Date.now(),window.scrollTo({top:999999,behavior:"smooth"}),setTimeout(()=>{_e=Date.now();const E=document.documentElement.scrollHeight;window.scrollTo({top:E+1e3,behavior:"smooth"})},100)}catch{try{_e=Date.now(),window.scrollTo(0,999999)}catch(T){console.error("滚动失败:",T)}}},Le=()=>{m.value=!1,x.value&&(clearInterval(x.value),x.value=null),we=!1};let _e=0;const Ye=()=>{!m.value||Date.now()-_e<3e3},ot=E=>{_.value&&_.value.addToast(E,"success","AI分析完成",4e3)};H.value.length>0&&le(H.value[0]),Ie(()=>n.value.isAIThinking,(E,T)=>{T&&!E&&n.value.aiResponse&&n.value.aiResponse.trim()&&(setTimeout(()=>{he()},200),setTimeout(()=>{he()},800),console.log("AI分析完成，自动滚动继续运行，用户可通过滚动操作停止"),ot("请查看分析结果"))}),Ie(()=>n.value.aiResponse,(E,T)=>{E&&E!==T&&(setTimeout(()=>{(m.value||E.length>T?.length+50)&&he()},100),setTimeout(()=>{(m.value||E.length>T?.length+50)&&he()},300))}),Ie(()=>n.value.isAIThinking,(E,T)=>{console.log("AI思考状态变化:",{wasThinking:T,isThinking:E,hasResponse:!!n.value.aiResponse}),T&&!E&&n.value.aiResponse&&n.value.aiResponse.trim()&&v.value&&(console.log("AI回答完成，准备生成智能建议"),M.value&&clearTimeout(M.value),M.value=setTimeout(()=>{console.log("检查是否可以生成建议:",{isGenerating:u.value,hasUserQuestion:!!v.value}),!u.value&&v.value?(console.log("条件满足，基于用户问题生成智能建议"),d()):console.log("跳过建议生成，条件不满足")},500))});let we=!1;const Re=()=>{m.value&&(we=!0,Le())},Be=()=>{m.value&&(we=!0)},Oe=()=>{m.value&&we&&(Le(),we=!1)};return typeof window<"u"&&(window.addEventListener("scroll",Ye,{passive:!0}),window.addEventListener("wheel",Re,{passive:!0}),window.addEventListener("touchstart",Be,{passive:!0}),window.addEventListener("touchmove",Oe,{passive:!0})),gt(()=>{Le(),M.value&&clearTimeout(M.value),typeof window<"u"&&(window.removeEventListener("scroll",Ye),window.removeEventListener("wheel",Re),window.removeEventListener("touchstart",Be),window.removeEventListener("touchmove",Oe))}),(E,T)=>(I(),b(W,null,[n.value.hasResults?(I(),b("div",gr,[a("div",mr,[a("h3",null,f(n.value.enableSecondPerson?"AI 合盘分析":t.value?"AI 紫薇斗数分析":"AI 命理分析"),1),a("div",pr,[a("div",yr,[(I(!0),b(W,null,Q(H.value,B=>(I(),b("button",{key:B.id,class:se(["question-button",{selected:i.value===B.id}]),onClick:q=>le(B)},f(B.text),11,fr))),128))])]),o.value?(I(),b("div",vr,[ie(a("input",{"onUpdate:modelValue":T[0]||(T[0]=B=>r.value=B),type:"text",placeholder:"请输入您的问题",onKeyup:He(re,["enter"])},null,544),[[me,r.value]])])):j("",!0),n.value.aiError?(I(),b("div",xr,f(n.value.aiError),1)):j("",!0),a("button",{class:se(["primary-button ai-button",{thinking:n.value.isAIThinking}]),disabled:!ee.value||n.value.isAIThinking,onClick:re},f(n.value.isAIThinking?"AI 思考中...":n.value.enableSecondPerson?"AI 合盘分析":"向 AI 提问"),11,Sr)]),a("div",_r,[T[2]||(T[2]=a("h3",null,"问题灵感",-1)),a("div",$r,[(I(!0),b(W,null,Q(k.value,(B,q)=>(I(),b("button",{key:B.id,ref_for:!0,ref:ne=>{ne&&(h.value[q]=ne)},class:se(["inspiration-tab-button",{active:l.value===B.id}]),onClick:ne=>U(B.id)},f(B.name),11,Ir))),128)),a("div",{class:"inspiration-active-tab-indicator",style:mt(c.value)},null,4)]),a("div",br,[(I(!0),b(W,null,Q(k.value,B=>(I(),b(W,{key:B.id},[l.value===B.id?(I(),b("div",wr,[(I(!0),b(W,null,Q(B.content,q=>(I(),b("div",{key:q.title,class:"question-group"},[a("h4",null,f(q.title),1),a("div",Ar,[(I(!0),b(W,null,Q(q.questions,ne=>(I(),b("p",{key:ne.text,onClick:te=>S(ne.text,ne.type)},f(ne.text),9,kr))),128))])]))),128))])):j("",!0)],64))),128))])]),n.value.aiResponse||n.value.isAIThinking?(I(),b("div",{key:0,class:"ai-response",ref_key:"aiResponseRef",ref:L},[T[4]||(T[4]=a("h3",null,"AI 分析结果",-1)),a("div",{class:"response-content",innerHTML:K.value},null,8,Pr),n.value.isAIThinking?(I(),b("div",Er,T[3]||(T[3]=[a("div",{class:"thinking-dots"},[a("span"),a("span"),a("span")],-1),a("p",null,"AI 正在深度分析中...",-1)]))):j("",!0)],512)):j("",!0),n.value.aiResponse&&!n.value.isAIThinking?(I(),b("div",Tr,[T[12]||(T[12]=a("h3",null,"继续探索",-1)),v.value?(I(),b("div",Cr,[T[5]||(T[5]=a("h4",null,"您的问题",-1)),a("p",Lr,f(v.value),1)])):j("",!0),a("div",Gr,[T[9]||(T[9]=a("h4",null,"智能建议",-1)),g.value.length>0?(I(),b("div",jr,[(I(!0),b(W,null,Q(g.value,(B,q)=>(I(),b("p",{key:q,onClick:ne=>$(B),class:"suggested-question"},f(B),9,Nr))),128)),a("button",{onClick:p,class:"suggested-question regenerate-btn",disabled:u.value},f(u.value?"正在更新...":"重新生成建议"),9,Mr),u.value?(I(),b("div",Dr,T[6]||(T[6]=[a("p",{class:"updating-text"},"正在更新建议...",-1)]))):j("",!0)])):u.value?(I(),b("div",Ur,T[7]||(T[7]=[a("p",null,"正在生成智能建议...",-1)]))):(I(),b("div",Yr,T[8]||(T[8]=[a("p",null,"正在准备智能建议...",-1)])))]),a("div",Rr,[T[10]||(T[10]=a("h4",null,"自由对话",-1)),a("div",Br,[ie(a("input",{"onUpdate:modelValue":T[1]||(T[1]=B=>y.value=B),type:"text",placeholder:"继续询问相关问题...",onKeypress:He(G,["enter"]),disabled:n.value.isAIThinking},null,40,Or),[[me,y.value]]),a("button",{onClick:G,disabled:!y.value.trim()||n.value.isAIThinking},f(n.value.isAIThinking?"发送中...":"发送"),9,Zr)]),T[11]||(T[11]=a("div",{class:"chat-tips"},[a("small",null,'💡 提示：可以询问更具体的问题，如"明年3月适合跳槽吗？"')],-1))]),a("div",Hr,[a("button",{class:"action-btn",onClick:V,disabled:n.value.isAIThinking}," 📊 详细分析 ",8,qr),a("button",{class:"action-btn",onClick:R,disabled:n.value.isAIThinking}," 📅 时间运势 ",8,Jr),a("button",{class:"action-btn",onClick:oe,disabled:n.value.isAIThinking}," 💡 改善建议 ",8,Vr),a("button",{class:"action-btn",onClick:ge}," 📋 复制结果 ")])])):j("",!0)])):j("",!0),$e(vt,{ref_key:"toastRef",ref:_},null,512)],64))}},et=Te(Fr,[["__scopeId","data-v-e16210c7"]]);const Wr={class:"ziwei-view"},Kr={key:0,class:"desktop-layout"},Qr={class:"left-panel"},zr={class:"right-panel"},Xr={key:1,class:"mobile-layout"},eo={__name:"ZiWeiView",setup(s){const e=Ce();return yt(()=>{e.resetPageTitle(),e.restoreDataFromUrl(),console.log("紫薇斗数页面已加载")}),(t,n)=>(I(),b("div",Wr,[$e(On),P(e).hasResults?(I(),b("div",Kr,[a("div",Qr,[$e(Xe)]),a("div",zr,[$e(et)])])):j("",!0),P(e).hasResults?(I(),b("div",Xr,[$e(Xe),$e(et)])):j("",!0)]))}},oo=Te(eo,[["__scopeId","data-v-2b79d4c2"]]);export{oo as default};
