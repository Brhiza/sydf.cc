import{r as B,j as se,v as Le,x as Se,y as J,z as Me,A as x,b as I,d as P,i as s,B as z,F as R,h as q,C as _e,n as W,t as y,f as G,D as Ne,E as N,c as Ye,l as Ze,g as Be,o as je,a as Oe,G as $e,e as re,H as Ue}from"./vendor-6907a719.js";import{a as Ie}from"./iztro-8dcb482b.js";import{s as ge,l as le,a as He,e as Re,_ as me,E as qe,T as We}from"./zw-eef6d097.js";import{S as de,G as ce,a as ue}from"./tyme-86b89837.js";import{m as Ve}from"./marked-9682a234.js";function xe(a,e,t,n,l,o=!1){try{if(!a||!e||!t||n===void 0||!l)throw new Error("缺少必要的出生信息");if(a<1900||a>2100)throw new Error("年份必须在1900-2100之间");if(e<1||e>12)throw new Error("月份必须在1-12之间");if(t<1||t>31)throw new Error("日期必须在1-31之间");if(n<0||n>12)throw new Error("时辰索引必须在0-12之间");if(!["male","female"].includes(l))throw new Error("性别必须是 male 或 female");let r;n===0?r=0:n===12?r=23:r=(n-1)*2+1;const i=`${a}-${e.toString().padStart(2,"0")}-${t.toString().padStart(2,"0")}`,h=l==="male"?"男":"女";let c;o?c=Ie.byLunar(i,r,h,!1,!0,"zh-CN"):c=Ie.bySolar(i,r,h,!0,"zh-CN");const g=new Date().getFullYear(),d={name:"",gender:l,year:a,month:e,day:t,timeIndex:n,hour:r,isLunar:o,solarDate:c.solarDate,lunarDate:c.lunarDate,chineseDate:c.chineseDate,time:c.time,timeRange:c.timeRange,sign:c.sign,zodiac:c.zodiac,soulPalace:c.soul||"",bodyPalace:c.body||"",earthlyBranchOfBodyPalace:c.earthlyBranchOfBodyPalace||"",earthlyBranchOfSoulPalace:c.earthlyBranchOfSoulPalace||"",fiveElementsClass:c.fiveElementsClass||"",currentAge:g-a},f=c.palaces.map((w,m)=>({index:m,name:w.name,isBodyPalace:w.isBodyPalace,isOriginalPalace:w.isOriginalPalace,heavenlyStem:w.heavenlyStem,earthlyBranch:w.earthlyBranch,majorStars:w.majorStars.map(v=>({name:v.name,type:v.type,scope:v.scope,brightness:v.brightness,mutagen:v.mutagen||""})),minorStars:w.minorStars.map(v=>({name:v.name,type:v.type,scope:v.scope,brightness:v.brightness,mutagen:v.mutagen||""})),adjectiveStars:w.adjectiveStars.map(v=>({name:v.name,type:v.type,scope:v.scope,brightness:v.brightness,mutagen:v.mutagen||""})),changsheng12:w.changsheng12||"",boshi12:w.boshi12||"",jiangqian12:w.jiangqian12||"",suiqian12:w.suiqian12||"",decadal:w.decadal||"",ages:w.ages||[],isEmpty:w.isEmpty(),starCount:{major:w.majorStars.length,minor:w.minorStars.length,adjective:w.adjectiveStars.length,total:w.majorStars.length+w.minorStars.length+w.adjectiveStars.length}})),_={lu:"",quan:"",ke:"",ji:""};c.palaces.forEach(w=>{[...w.majorStars,...w.minorStars,...w.adjectiveStars].forEach(m=>{if(m.mutagen)switch(m.mutagen){case"禄":_.lu=m.name;break;case"权":_.quan=m.name;break;case"科":_.ke=m.name;break;case"忌":_.ji=m.name;break}})});const $=g-a;let k={currentAge:$,decadal:"",yearly:""};return console.log("运限信息暂时跳过，当前年龄:",$),{...d,palaces:f,mutagens:_,horoscope:k,_astrolabe:c}}catch(r){throw console.error("紫薇斗数计算失败:",r),new Error(`紫薇斗数计算失败: ${r.message}`)}}function ke(a){return a?{basicInfo:{name:a.name||"",gender:a.gender==="male"?"男":"女",birthDate:{solar:a.solarDate||"",lunar:a.lunarDate||"",chinese:a.chineseDate||""},time:a.time||"",timeRange:a.timeRange||"",sign:a.sign||"",zodiac:a.zodiac||"",fiveElementsClass:a.fiveElementsClass||"",soulPalace:a.soulPalace||"",bodyPalace:a.bodyPalace||""},palaces:(a.palaces||[]).map(e=>({name:e.name||"",isBodyPalace:e.isBodyPalace||!1,heavenlyStem:e.heavenlyStem||"",earthlyBranch:e.earthlyBranch||"",allStars:[...(e.majorStars||[]).map(t=>({...t,type:"major"})),...(e.minorStars||[]).map(t=>({...t,type:"minor"})),...(e.adjectiveStars||[]).map(t=>({...t,type:"adjective"}))].map(t=>({name:t.name||"",type:t.type||"",brightness:t.brightness||"",mutagen:t.mutagen||""})),changsheng12:e.changsheng12||"",ages:e.ages||[]})),mutagens:a.mutagens||{},horoscope:a.horoscope||{}}:null}const Ce=`你是一位资深的紫薇斗数命理师，拥有深厚的紫薇斗数理论基础和丰富的实践经验。

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
- 三方四正：本宫、对宫、三合宫位的组合分析`,Fe=`请重点分析以下方面：

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
   - 发展建议`,Je=`请重点分析以下方面：

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
   - 理财投资的注意事项`,Ke=`请重点分析以下方面：

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
   - 亲子关系的建议`,Qe=`请重点分析以下方面：

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
   - 心理健康的维护`,Xe=`请重点分析以下方面：

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
   - 运势提升的方法`,De=`请重点分析以下方面：

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
   - 共同发展的方向`,Pe=`请根据用户的具体问题，结合紫薇斗数星盘信息进行专业分析。

分析时请注意：
1. 针对问题的核心进行重点分析
2. 结合相关宫位和星耀的影响
3. 给出具体可行的建议
4. 保持专业性和准确性`;function ze(a){return{personality:Fe,career:Je,relationship:Ke,health:Qe,fortune:Xe,compatibility:De,custom:Pe}[a]||Pe}function et(a,e,t){const n=Ce,l=ze(a);let o=`${n}

${l}

`;return o+=`【星盘信息】
`,o+=`基本信息：${JSON.stringify(t.basicInfo,null,2)}
`,o+=`宫位信息：${JSON.stringify(t.palaces,null,2)}
`,o+=`四化信息：${JSON.stringify(t.mutagens,null,2)}
`,o+=`运限信息：${JSON.stringify(t.horoscope,null,2)}

`,o+=`【用户问题】
${e}

`,o+="请基于以上信息进行专业分析，给出详细的解读和建议。",o}function tt(a,e,t){let o=`${Ce}

${De}

`;return o+=`【第一人星盘信息】
`,o+=`基本信息：${JSON.stringify(e.basicInfo,null,2)}
`,o+=`宫位信息：${JSON.stringify(e.palaces,null,2)}
`,o+=`四化信息：${JSON.stringify(e.mutagens,null,2)}

`,o+=`【第二人星盘信息】
`,o+=`基本信息：${JSON.stringify(t.basicInfo,null,2)}
`,o+=`宫位信息：${JSON.stringify(t.palaces,null,2)}
`,o+=`四化信息：${JSON.stringify(t.mutagens,null,2)}

`,o+=`【分析要求】
${a}

`,o+="请基于以上两人的星盘信息进行专业的合盘分析，给出详细的匹配度解读和相处建议。",o}function nt(a){if(!a)return"";try{const e=new URLSearchParams;return e.set("y",a.year),e.set("m",a.month),e.set("d",a.day),e.set("t",a.timeIndex),e.set("g",a.gender),a.name&&e.set("n",a.name),a.isLunar&&e.set("l","1"),e.toString()}catch(e){return console.error("编码紫薇斗数数据到URL失败:",e),""}}function st(a){if(!a)return null;try{const e=new URLSearchParams(a);if(!e.has("y")||!e.has("m")||!e.has("d")||!e.has("t")||!e.has("g"))return console.warn("URL中的紫薇斗数数据不完整"),null;const t=parseInt(e.get("y")),n=parseInt(e.get("m")),l=parseInt(e.get("d")),o=parseInt(e.get("t")),r=e.get("g");return t<1900||t>2100||n<1||n>12||l<1||l>31||o<0||o>12||!["male","female"].includes(r)?(console.warn("URL中的紫薇斗数数据无效"),null):{year:t,month:n,day:l,timeIndex:o,gender:r,name:e.get("n")||"",isLunar:e.get("l")==="1"}}catch(e){return console.error("从URL解码紫薇斗数数据失败:",e),null}}function at(a){if(a)try{const e=new URL(window.location);e.searchParams.set("y",a.year),e.searchParams.set("m",a.month),e.searchParams.set("d",a.day),e.searchParams.set("t",a.timeIndex),e.searchParams.set("g",a.gender),a.name?e.searchParams.set("n",a.name):e.searchParams.delete("n"),a.isLunar?e.searchParams.set("l","1"):e.searchParams.delete("l"),e.searchParams.delete("zw"),e.searchParams.delete("bz"),window.history.replaceState({},"",e.toString())}catch(e){console.error("更新紫薇斗数URL失败:",e)}}function ot(){try{const a=new URL(window.location);if(a.searchParams.has("y")&&a.searchParams.has("m")&&a.searchParams.has("d")&&a.searchParams.has("t")&&a.searchParams.has("g"))return st(a.search.substring(1));const e=a.searchParams.get("zw");if(e)try{const t=decodeURIComponent(atob(e)),n=JSON.parse(t);return{year:parseInt(n.y),month:parseInt(n.m),day:parseInt(n.d),timeIndex:parseInt(n.t),gender:n.g,name:n.n||"",isLunar:n.l||!1}}catch(t){return console.warn("旧格式紫薇斗数URL解码失败:",t),null}return null}catch(a){return console.error("从URL获取紫薇斗数数据失败:",a),null}}function rt(a,e){if(!a||!e)return"";try{const t=new URLSearchParams;return t.set("p1_y",a.year),t.set("p1_m",a.month),t.set("p1_d",a.day),t.set("p1_t",a.timeIndex),t.set("p1_g",a.gender),a.name&&t.set("p1_n",a.name),a.isLunar&&t.set("p1_l","1"),t.set("p2_y",e.year),t.set("p2_m",e.month),t.set("p2_d",e.day),t.set("p2_t",e.timeIndex),t.set("p2_g",e.gender),e.name&&t.set("p2_n",e.name),e.isLunar&&t.set("p2_l","1"),t.toString()}catch(t){return console.error("编码紫薇斗数合盘数据到URL失败:",t),""}}function it(a){if(!a)return null;try{const e=new URLSearchParams(a);if(!e.has("p1_y")||!e.has("p2_y"))return console.warn("URL中的紫薇斗数合盘数据不完整"),null;const t={year:parseInt(e.get("p1_y")),month:parseInt(e.get("p1_m")),day:parseInt(e.get("p1_d")),timeIndex:parseInt(e.get("p1_t")),gender:e.get("p1_g"),name:e.get("p1_n")||"",isLunar:e.get("p1_l")==="1"},n={year:parseInt(e.get("p2_y")),month:parseInt(e.get("p2_m")),day:parseInt(e.get("p2_d")),timeIndex:parseInt(e.get("p2_t")),gender:e.get("p2_g"),name:e.get("p2_n")||"",isLunar:e.get("p2_l")==="1"};return!t.year||!t.month||!t.day||t.timeIndex===void 0||!t.gender||!n.year||!n.month||!n.day||n.timeIndex===void 0||!n.gender?(console.warn("URL中的紫薇斗数合盘数据无效"),null):{person1:t,person2:n}}catch(e){return console.error("从URL解码紫薇斗数合盘数据失败:",e),null}}function lt(a,e){if(!(!a||!e))try{const t=new URL(window.location),n=[];for(const l of t.searchParams.keys())n.push(l);n.forEach(l=>t.searchParams.delete(l)),t.searchParams.set("p1_y",a.year),t.searchParams.set("p1_m",a.month),t.searchParams.set("p1_d",a.day),t.searchParams.set("p1_t",a.timeIndex),t.searchParams.set("p1_g",a.gender),a.name&&t.searchParams.set("p1_n",a.name),a.isLunar&&t.searchParams.set("p1_l","1"),t.searchParams.set("p2_y",e.year),t.searchParams.set("p2_m",e.month),t.searchParams.set("p2_d",e.day),t.searchParams.set("p2_t",e.timeIndex),t.searchParams.set("p2_g",e.gender),e.name&&t.searchParams.set("p2_n",e.name),e.isLunar&&t.searchParams.set("p2_l","1"),window.history.replaceState({},"",t.toString())}catch(t){console.error("更新紫薇斗数合盘URL失败:",t)}}function ct(){try{const a=new URL(window.location);if(a.searchParams.has("p1_y")&&a.searchParams.has("p2_y"))return it(a.search.substring(1));const e=a.searchParams.get("zwcp");if(e)try{const t=decodeURIComponent(atob(e)),n=JSON.parse(t);return!n.p1||!n.p2?null:{person1:{year:parseInt(n.p1.y),month:parseInt(n.p1.m),day:parseInt(n.p1.d),timeIndex:parseInt(n.p1.t),gender:n.p1.g,name:n.p1.n||"",isLunar:n.p1.l||!1},person2:{year:parseInt(n.p2.y),month:parseInt(n.p2.m),day:parseInt(n.p2.d),timeIndex:parseInt(n.p2.t),gender:n.p2.g,name:n.p2.n||"",isLunar:n.p2.l||!1}}}catch(t){return console.warn("旧格式紫薇斗数合盘URL解码失败:",t),null}return null}catch(a){return console.error("从URL获取紫薇斗数合盘数据失败:",a),null}}function we(a,e=null){const t=window.location.origin+window.location.pathname;if(e){const n=rt(a,e);return n?`${t}?${n}`:t}else{const n=nt(a);return n?`${t}?${n}`:t}}function ut(a={}){const e={name:"",year:"",month:"",day:"",timeIndex:0,gender:"",isLunar:!1,...a},t=B({...e}),n=B({...e}),l=B(!1),o=B(null),r=B(null),i=B(!1),h=B(""),c=se(()=>{const f=t.value.year&&t.value.month&&t.value.day&&t.value.timeIndex!==""&&t.value.gender;if(!l.value)return f;const _=n.value.year&&n.value.month&&n.value.day&&n.value.timeIndex!==""&&n.value.gender;return f&&_}),g=se(()=>o.value!==null);return{person1:t,person2:n,enableSecondPerson:l,result1:o,result2:r,isCalculating:i,calculationError:h,canCalculate:c,hasResults:g,resetData:()=>{t.value={...e},n.value={...e},l.value=!1,o.value=null,r.value=null,h.value=""}}}const Z={HEAVENLY_STEMS:["甲","乙","丙","丁","戊","己","庚","辛","壬","癸"],EARTHLY_BRANCHES:["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"],STEM_WUXING:["木","木","火","火","土","土","金","金","水","水"],BRANCH_WUXING:["水","土","木","木","土","火","火","土","金","金","土","水"],STEM_YINYANG:["阳","阴","阳","阴","阳","阴","阳","阴","阳","阴"],BRANCH_YINYANG:["阳","阴","阳","阴","阳","阴","阳","阴","阳","阴","阳","阴"],WUXING_SHENG:{木:"火",火:"土",土:"金",金:"水",水:"木"},WUXING_KE:{木:"土",火:"金",土:"水",金:"木",水:"火"},TIME_BRANCHES:[{name:"早子时",hour:0,branch:"子"},{name:"丑时",hour:1,branch:"丑"},{name:"寅时",hour:3,branch:"寅"},{name:"卯时",hour:5,branch:"卯"},{name:"辰时",hour:7,branch:"辰"},{name:"巳时",hour:9,branch:"巳"},{name:"午时",hour:11,branch:"午"},{name:"未时",hour:13,branch:"未"},{name:"申时",hour:15,branch:"申"},{name:"酉时",hour:17,branch:"酉"},{name:"戌时",hour:19,branch:"戌"},{name:"亥时",hour:21,branch:"亥"},{name:"晚子时",hour:23,branch:"子"}]},fe={子:["癸"],丑:["己","癸","辛"],寅:["甲","丙","戊"],卯:["乙"],辰:["戊","乙","癸"],巳:["丙","庚","戊"],午:["丁","己"],未:["己","丁","乙"],申:["庚","壬","戊"],酉:["辛"],戌:["戊","辛","丁"],亥:["壬","甲"]},dt={甲子:"海中金",乙丑:"海中金",丙寅:"炉中火",丁卯:"炉中火",戊辰:"大林木",己巳:"大林木",庚午:"路旁土",辛未:"路旁土",壬申:"剑锋金",癸酉:"剑锋金",甲戌:"山头火",乙亥:"山头火",丙子:"涧下水",丁丑:"涧下水",戊寅:"城头土",己卯:"城头土",庚辰:"白蜡金",辛巳:"白蜡金",壬午:"杨柳木",癸未:"杨柳木",甲申:"泉中水",乙酉:"泉中水",丙戌:"屋上土",丁亥:"屋上土",戊子:"霹雳火",己丑:"霹雳火",庚寅:"松柏木",辛卯:"松柏木",壬辰:"长流水",癸巳:"长流水",甲午:"砂中金",乙未:"砂中金",丙申:"山下火",丁酉:"山下火",戊戌:"平地木",己亥:"平地木",庚子:"壁上土",辛丑:"壁上土",壬寅:"金箔金",癸卯:"金箔金",甲辰:"覆灯火",乙巳:"覆灯火",丙午:"天河水",丁未:"天河水",戊申:"大驿土",己酉:"大驿土",庚戌:"钗钏金",辛亥:"钗钏金",壬子:"桑柘木",癸丑:"桑柘木",甲寅:"大溪水",乙卯:"大溪水",丙辰:"沙中土",丁巳:"沙中土",戊午:"天上火",己未:"天上火",庚申:"石榴木",辛酉:"石榴木",壬戌:"大海水",癸亥:"大海水"},Ee={金:{color:"白、金、银",direction:"西",industry:"金融、五金、科技、汽车、司法",advice:"增强决断力，保持原则，处事要果断。"},木:{color:"绿、青",direction:"东",industry:"教育、林业、文化、服装、医药",advice:"保持仁爱之心，积极成长，多接触自然。"},水:{color:"黑、蓝、灰",direction:"北",industry:"贸易、物流、水产、旅游、媒体",advice:"锻炼沟通能力，灵活应变，保持谦逊。"},火:{color:"红、橙、紫",direction:"南",industry:"电力、餐饮、IT、化工、礼仪",advice:"保持热情与活力，待人接物要真诚有礼。"},土:{color:"黄、棕、褐",direction:"中（本地）",industry:"地产、建筑、农业、保险",advice:"为人处事要诚信稳重，脚踏实地。"}},ye={甲:{亥:"长生",子:"沐浴",丑:"冠带",寅:"临官",卯:"帝旺",辰:"衰",巳:"病",午:"死",未:"墓",申:"绝",酉:"胎",戌:"养"},乙:{午:"长生",巳:"沐浴",辰:"冠带",卯:"临官",寅:"帝旺",丑:"衰",子:"病",亥:"死",戌:"墓",酉:"绝",申:"胎",未:"养"},丙:{寅:"长生",卯:"沐浴",辰:"冠带",巳:"临官",午:"帝旺",未:"衰",申:"病",酉:"死",戌:"墓",亥:"绝",子:"胎",丑:"养"},丁:{酉:"长生",申:"沐浴",未:"冠带",午:"临官",巳:"帝旺",辰:"衰",卯:"病",寅:"死",丑:"墓",子:"绝",亥:"胎",戌:"养"},戊:{寅:"长生",卯:"沐浴",辰:"冠带",巳:"临官",午:"帝旺",未:"衰",申:"病",酉:"死",戌:"墓",亥:"绝",子:"胎",丑:"养"},己:{酉:"长生",申:"沐浴",未:"冠带",午:"临官",巳:"帝旺",辰:"衰",卯:"病",寅:"死",丑:"墓",子:"绝",亥:"胎",戌:"养"},庚:{巳:"长生",午:"沐浴",未:"冠带",申:"临官",酉:"帝旺",戌:"衰",亥:"病",子:"死",丑:"墓",寅:"绝",卯:"胎",辰:"养"},辛:{子:"长生",亥:"沐浴",戌:"冠带",酉:"临官",申:"帝旺",未:"衰",午:"病",巳:"死",辰:"墓",卯:"绝",寅:"胎",丑:"养"},壬:{申:"长生",酉:"沐浴",戌:"冠带",亥:"临官",子:"帝旺",丑:"衰",寅:"病",卯:"死",辰:"墓",巳:"绝",午:"胎",未:"养"},癸:{卯:"长生",寅:"沐浴",丑:"冠带",子:"临官",亥:"帝旺",戌:"衰",酉:"病",申:"死",未:"墓",午:"绝",巳:"胎",辰:"养"}},ht={寅:{木:"旺",火:"相",水:"休",金:"囚",土:"死"},卯:{木:"旺",火:"相",水:"休",金:"囚",土:"死"},辰:{土:"旺",金:"相",火:"休",木:"囚",水:"死"},巳:{火:"旺",土:"相",木:"休",水:"囚",金:"死"},午:{火:"旺",土:"相",木:"休",水:"囚",金:"死"},未:{土:"旺",金:"相",火:"休",木:"囚",水:"死"},申:{金:"旺",水:"相",土:"休",火:"囚",木:"死"},酉:{金:"旺",水:"相",土:"休",火:"囚",木:"死"},戌:{土:"旺",金:"相",火:"休",木:"囚",水:"死"},亥:{水:"旺",木:"相",金:"休",土:"囚",火:"死"},子:{水:"旺",木:"相",金:"休",土:"囚",火:"死"},丑:{土:"旺",金:"相",火:"休",木:"囚",水:"死"}},gt={寅:[["戊",7],["丙",7],["甲",16]],卯:[["甲",10],["乙",20]],辰:[["乙",9],["癸",3],["戊",18]],巳:[["戊",7],["庚",9],["丙",14]],午:[["丙",10],["丁",20]],未:[["丁",9],["乙",3],["己",18]],申:[["庚",10],["壬",3],["戊",17]],酉:[["庚",10],["辛",20]],戌:[["辛",9],["丁",3],["戊",18]],亥:[["戊",7],["甲",23]],子:[["壬",10],["癸",20]],丑:[["癸",9],["辛",3],["己",18]]};class mt{constructor(){this.ctg=Z.HEAVENLY_STEMS,this.cdz=Z.EARTHLY_BRANCHES}zhiIdx(e){return this.cdz.indexOf(e)}calculateAllShenSha(e,t){const n={},l=["year","month","day","hour"];return e.forEach((o,r)=>{const[i,h]=o,c=this.calculatePillarShenSha(i,h,r,e,t);n[l[r]]=c}),n}calculatePillarShenSha(e,t,n,l,o){const r=[],[i,h]=l[0],[c,g]=l[1],[d,f]=l[2];l[3];const _=d+f,$=e+t;this.ctg.indexOf(i)%2;const k=o==="male",w={天乙贵人:()=>{const m={甲:["丑","未"],戊:["丑","未"],庚:["丑","未"],己:["子","申"],乙:["子","申"],丙:["亥","酉"],丁:["亥","酉"],壬:["卯","巳"],癸:["卯","巳"],辛:["寅","午"]};return m[i]&&m[i].includes(t)||m[d]&&m[d].includes(t)},太极贵人:()=>{const m={甲:["子","午"],乙:["子","午"],丙:["卯","酉"],丁:["卯","酉"],戊:["辰","戌","丑","未"],己:["辰","戌","丑","未"],庚:["寅","亥"],辛:["寅","亥"],壬:["巳","申"],癸:["巳","申"]};return m[i]&&m[i].includes(t)||m[d]&&m[d].includes(t)},天德贵人:()=>{const v={寅:1,卯:2,辰:3,巳:4,午:5,未:6,申:7,酉:8,戌:9,亥:10,子:11,丑:12}[g];if(!v)return!1;const T={1:"丁",2:"申",3:"壬",4:"辛",5:"亥",6:"甲",7:"癸",8:"寅",9:"丙",10:"乙",11:"巳",12:"庚"}[v];return T===e||T===t},天德合:()=>{const v={寅:1,卯:2,辰:3,巳:4,午:5,未:6,申:7,酉:8,戌:9,亥:10,子:11,丑:12}[g];if(!v)return!1;const T={1:"丁",2:"申",3:"壬",4:"辛",5:"亥",6:"甲",7:"癸",8:"寅",9:"丙",10:"乙",11:"巳",12:"庚"}[v];return{甲:"己",乙:"庚",丙:"辛",丁:"壬",戊:"癸",己:"甲",庚:"乙",辛:"丙",壬:"丁",癸:"戊"}[T]===e},月德贵人:()=>({寅:"丙",午:"丙",戌:"丙",申:"壬",子:"壬",辰:"壬",亥:"甲",卯:"甲",未:"甲",巳:"庚",酉:"庚",丑:"庚"})[g]===e,月德合:()=>{const m={寅:"丙",午:"丙",戌:"丙",申:"壬",子:"壬",辰:"壬",亥:"甲",卯:"甲",未:"甲",巳:"庚",酉:"庚",丑:"庚"}[g];return{甲:"己",乙:"庚",丙:"辛",丁:"壬",戊:"癸",己:"甲",庚:"乙",辛:"丙",壬:"丁",癸:"戊"}[m]===e},三奇贵人:()=>{const m=l.map(T=>T[0]),v=[["乙","丙","丁"],["甲","戊","庚"],["辛","壬","癸"]];for(let T=0;T<=m.length-3;T++){const L=m.slice(T,T+3);if(v.some(F=>F.every((V,D)=>V===L[D])))return!0}return!1},福星贵人:()=>{const m={甲:"寅",乙:"丑",丙:"子",丁:"亥",戊:"申",己:"未",庚:"午",辛:"巳",壬:"辰",癸:"卯"};return m[i]===t||m[d]===t},文昌贵人:()=>{const m={甲:"巳",乙:"午",丙:"申",丁:"酉",戊:"申",己:"酉",庚:"亥",辛:"子",壬:"寅",癸:"卯"};return m[i]===t||m[d]===t},国印贵人:()=>{const m={甲:"戌",乙:"亥",丙:"丑",丁:"寅",戊:"丑",己:"寅",庚:"辰",辛:"巳",壬:"未",癸:"申"};return m[i]===t||m[d]===t},学堂:()=>{const m=Z.STEM_WUXING[d];return{木:"亥",火:"寅",土:"申",金:"巳",水:"申"}[m]===t},词馆:()=>({甲:"寅",乙:"卯",丙:"巳",丁:"午",戊:"巳",己:"午",庚:"申",辛:"酉",壬:"亥",癸:"子"})[d]===t,天厨贵人:()=>({甲:"巳",乙:"午",丙:"子",丁:"亥",戊:"申",己:"未",庚:"寅",辛:"卯",壬:"酉",癸:"戌"})[d]===t,德秀贵人:()=>{const v={寅:"火",午:"火",戌:"火",申:"水",子:"水",辰:"水",巳:"金",酉:"金",丑:"金",亥:"木",卯:"木",未:"木"}[g],T={甲:"己",乙:"庚",丙:"辛",丁:"壬",戊:"癸"},L=[];return v==="火"?L.push("丁","己","癸","庚"):v==="水"?L.push("壬","甲","戊","己","辛"):v==="金"?L.push("庚","壬","乙","丙","戊"):v==="木"&&L.push("乙","癸","丁","丙","庚"),L.includes(e)||T[e]&&L.includes(T[e])},禄神:()=>({甲:"寅",乙:"卯",丙:"巳",丁:"午",戊:"巳",己:"午",庚:"申",辛:"酉",壬:"亥",癸:"子"})[d]===t,羊刃:()=>({甲:"卯",丙:"午",戊:"午",庚:"酉",壬:"子"})[d]===t,飞刃:()=>{const v={甲:"卯",丙:"午",戊:"午",庚:"酉",壬:"子"}[d];return v?{子:"午",丑:"未",寅:"申",卯:"酉",辰:"戌",巳:"亥",午:"子",未:"丑",申:"寅",酉:"卯",戌:"辰",亥:"巳"}[v]===t:!1},驿马:()=>{const m={申:"寅",子:"寅",辰:"寅",亥:"巳",卯:"巳",未:"巳",寅:"申",午:"申",戌:"申",巳:"亥",酉:"亥",丑:"亥"};return m[h]===t||m[f]===t},将星:()=>{const m={申:"子",子:"子",辰:"子",亥:"卯",卯:"卯",未:"卯",寅:"午",午:"午",戌:"午",巳:"酉",酉:"酉",丑:"酉"};return m[h]===t||m[f]===t},华盖:()=>{const m={申:"辰",子:"辰",辰:"辰",亥:"未",卯:"未",未:"未",寅:"戌",午:"戌",戌:"戌",巳:"丑",酉:"丑",丑:"丑"};return m[h]===t||m[f]===t},金舆:()=>({甲:"辰",乙:"巳",丙:"未",丁:"申",戊:"未",己:"申",庚:"戌",辛:"亥",壬:"丑",癸:"寅"})[d]===t,金神:()=>["乙丑","己巳","癸酉"].includes($)&&(n===2||n===3),天赦日:()=>{if(n!==2)return!1;const m={寅:"春",卯:"春",辰:"春",巳:"夏",午:"夏",未:"夏",申:"秋",酉:"秋",戌:"秋",亥:"冬",子:"冬",丑:"冬"}[g];return m==="春"&&_==="戊寅"||m==="夏"&&_==="甲午"||m==="秋"&&_==="戊申"||m==="冬"&&_==="甲子"},魁罡:()=>n===2&&["庚辰","壬辰","戊戌","庚戌"].includes(_),阴差阳错:()=>n===2&&["丙子","丁丑","戊寅","辛卯","壬辰","癸巳","丙午","丁未","戊申","辛酉","壬戌","癸亥"].includes(_),孤鸾煞:()=>n===2&&["乙巳","丁巳","辛亥","戊申","甲寅","壬子","丙午","戊午","己未","癸丑"].includes(_),十灵日:()=>n===2&&["甲辰","乙亥","丙辰","丁酉","戊午","庚戌","辛亥","壬寅","癸未"].includes(_),六秀日:()=>n===2&&["丙午","丁未","戊子","戊午","己丑","己未"].includes(_),八专:()=>n===2&&["甲寅","乙卯","己未","丁巳","庚申","辛酉","戊戌","癸丑"].includes(_),九丑:()=>n===2&&["戊子","戊午","壬子","壬午","乙卯","辛卯","乙酉","辛酉","己卯","己酉"].includes(_),四废日:()=>{if(n!==2)return!1;const m={寅:"春",卯:"春",辰:"春",巳:"夏",午:"夏",未:"夏",申:"秋",酉:"秋",戌:"秋",亥:"冬",子:"冬",丑:"冬"},v={春:["庚申","辛酉"],夏:["壬子","癸亥"],秋:["甲寅","乙卯"],冬:["丙午","丁巳"]},T=m[g];return T&&v[T].includes(_)},十恶大败:()=>{const m=this.ctg.indexOf(i),v=this.cdz.indexOf(h);if(m===-1||v===-1)return!1;const T=(10+v-m)%12,L=(11+v-m)%12,F=[this.cdz[T],this.cdz[L]],D={甲:"寅",乙:"卯",丙:"巳",丁:"午",戊:"巳",己:"午",庚:"申",辛:"酉",壬:"亥",癸:"子"}[d];return F.includes(D)},童子煞:()=>{const v={寅:"春",卯:"春",辰:"春",巳:"夏",午:"夏",未:"夏",申:"秋",酉:"秋",戌:"秋",亥:"冬",子:"冬",丑:"冬"}[g];return v?(v==="春"||v==="秋")&&(t==="寅"||t==="卯")||(v==="夏"||v==="冬")&&(t==="午"||t==="子"):!1},天转:()=>(n===2||n===3)&&{春:"乙卯",夏:"戊午",秋:"辛酉",冬:"癸子"}[{寅:"春",卯:"春",辰:"春",巳:"夏",午:"夏",未:"夏",申:"秋",酉:"秋",戌:"秋",亥:"冬",子:"冬",丑:"冬"}[g]]===$,地转:()=>(n===2||n===3)&&{春:"甲寅",夏:"丁巳",秋:"庚申",冬:"癸亥"}[{寅:"春",卯:"春",辰:"春",巳:"夏",午:"夏",未:"夏",申:"秋",酉:"秋",戌:"秋",亥:"冬",子:"冬",丑:"冬"}[g]]===$,桃花:()=>{const m={寅:"卯",午:"卯",戌:"卯",亥:"子",卯:"子",未:"子",申:"酉",子:"酉",辰:"酉",巳:"午",酉:"午",丑:"午"};return m[h]===t||m[f]===t},红鸾:()=>({子:"卯",丑:"寅",寅:"丑",卯:"子",辰:"亥",巳:"戌",午:"酉",未:"申",申:"未",酉:"午",戌:"巳",亥:"辰"})[h]===t,天喜:()=>({子:"酉",丑:"申",寅:"未",卯:"午",辰:"巳",巳:"辰",午:"卯",未:"寅",申:"丑",酉:"子",戌:"亥",亥:"戌"})[h]===t,孤辰:()=>({亥:"寅",子:"寅",丑:"寅",寅:"巳",卯:"巳",辰:"巳",巳:"申",午:"申",未:"申",申:"亥",酉:"亥",戌:"亥"})[h]===t,寡宿:()=>({亥:"戌",子:"戌",丑:"戌",寅:"丑",卯:"丑",辰:"丑",巳:"辰",午:"辰",未:"辰",申:"未",酉:"未",戌:"未"})[h]===t,红艳煞:()=>({甲:"午",乙:"申",丙:"寅",丁:"未",戊:"辰",己:"辰",庚:"戌",辛:"酉",壬:"子",癸:"申"})[d]===t,勾绞煞:()=>{const m=(this.zhiIdx(h)+4)%12,v=(this.zhiIdx(h)-4+12)%12;return t===this.cdz[m]||t===this.cdz[v]},空亡:()=>{const m=this.ctg.indexOf(d),v=this.cdz.indexOf(f);if(m===-1||v===-1)return!1;const T=(10+v-m)%12,L=(11+v-m)%12;return[this.cdz[T],this.cdz[L]].includes(t)},亡神:()=>{const m={申:"亥",子:"亥",辰:"亥",亥:"申",卯:"申",未:"申",寅:"巳",午:"巳",戌:"巳",巳:"寅",酉:"寅",丑:"寅"};return m[h]===t||m[f]===t},劫煞:()=>{const m={申:"巳",子:"巳",辰:"巳",亥:"寅",卯:"寅",未:"寅",寅:"亥",午:"亥",戌:"亥",巳:"申",酉:"申",丑:"申"};return m[h]===t||m[f]===t},灾煞:()=>{const m={申:"午",子:"午",辰:"午",亥:"酉",卯:"酉",未:"酉",寅:"子",午:"子",戌:"子",巳:"卯",酉:"卯",丑:"卯"};return m[h]===t||m[f]===t},元辰:()=>{const m=this.ctg.indexOf(i)%2===0,v=m&&k||!m&&!k?7:-7,T=(this.zhiIdx(h)+v+12)%12;return this.cdz[T]===t},血刃:()=>({寅:"丑",卯:"寅",辰:"卯",巳:"辰",午:"巳",未:"午",申:"未",酉:"申",戌:"酉",亥:"戌",子:"亥",丑:"子"})[g]===t,流霞:()=>({甲:"酉",乙:"戌",丙:"未",丁:"申",戊:"巳",己:"午",庚:"辰",辛:"卯",壬:"亥",癸:"寅"})[d]===t,天罗:()=>t==="戌"||t==="亥",地网:()=>t==="辰"||t==="巳",丧门:()=>this.cdz[(this.zhiIdx(h)+2)%12]===t,吊客:()=>this.cdz[(this.zhiIdx(h)-2+12)%12]===t,披麻:()=>this.cdz[(this.zhiIdx(h)-1+12)%12]===t};for(const m in w)w[m]()&&r.push(m);return r}}class pt{constructor(){this.ctg=Z.HEAVENLY_STEMS,this.cdz=Z.EARTHLY_BRANCHES,this.wxtg=Z.STEM_WUXING,this.wxdz=Z.BRANCH_WUXING,this.wuxingKe=Z.WUXING_KE,this.wuxingSheng=Z.WUXING_SHENG}getIntelligentAnalysis(e){const t=[],n={甲:"己",乙:"庚",丙:"辛",丁:"壬",戊:"癸"},l={甲:"庚",乙:"辛",丙:"壬",丁:"癸"};for(let k=0;k<4;k++)for(let w=k+1;w<4;w++){const m=e[k][0],v=e[w][0];if(l[m]===v||l[v]===m)t.push(`${m}${v}相冲`);else if(n[m]===v||n[v]===m)t.push(`${m}${v}相合`);else{const T=this.wxtg[this.ctg.indexOf(m)],L=this.wxtg[this.ctg.indexOf(v)];this.wuxingKe[T]===L?t.push(`${m}克${v}`):this.wuxingKe[L]===T&&t.push(`${v}克${m}`)}}const o=[],r=e.map(k=>k[1]),i={子:"午",丑:"未",寅:"申",卯:"酉",辰:"戌",巳:"亥"},h={子:"丑",寅:"亥",卯:"戌",辰:"酉",巳:"申",午:"未"},c={子:"未",丑:"午",寅:"巳",卯:"辰",申:"亥",酉:"戌"},g={子:"酉",卯:"午",辰:"丑",未:"戌",寅:"亥",巳:"申"};for(let k=0;k<4;k++)for(let w=k+1;w<4;w++){const m=r[k],v=r[w];i[m]===v||i[v]===m?o.push(`${m}${v}相冲`):h[m]===v||h[v]===m?o.push(`${m}${v}相合`):c[m]===v||c[v]===m?o.push(`${m}${v}相害`):(g[m]===v||g[v]===m)&&o.push(`${m}${v}相破`)}const d=[...new Set(r)];d.filter(k=>["寅","巳","申"].includes(k)).length>=2&&o.push("寅巳申无恩之刑"),d.filter(k=>["丑","戌","未"].includes(k)).length>=2&&o.push("丑戌未恃势之刑"),d.includes("子")&&d.includes("卯")&&o.push("子卯无礼之刑"),r.filter(k=>k==="辰").length>1&&o.push("辰辰自刑"),r.filter(k=>k==="午").length>1&&o.push("午午自刑"),r.filter(k=>k==="酉").length>1&&o.push("酉酉自刑"),r.filter(k=>k==="亥").length>1&&o.push("亥亥自刑");const f=[];for(let k=0;k<4;k++){const w=e[k][0],m=e[k][1],v=this.wxtg[this.ctg.indexOf(w)],T=this.wxdz[this.cdz.indexOf(m)][0];this.wuxingKe[v]===T&&f.push(`${w}${m}盖头`),this.wuxingKe[T]===v&&f.push(`${w}${m}截脚`)}for(let k=0;k<4;k++)for(let w=k+1;w<4;w++){const m=e[k],v=e[w],T=l[m[0]]===v[0]||l[v[0]]===m[0],L=i[m[1]]===v[1]||i[v[1]]===m[1];T&&L&&f.push(`${m.join("")}与${v.join("")}天克地冲(反吟)`)}const $=e.map(k=>k.join("")).reduce((k,w)=>(k[w]=(k[w]||0)+1,k),{});for(const k in $)$[k]>1&&f.push(`${k}伏吟`);return{tianGan:t.length>0?`原局天干: ${t.join(" | ")}`:"",diZhi:o.length>0?`原局地支: ${o.join(" | ")}`:"",zhengZhu:f.length>0?`原局整柱: ${f.join(" | ")}`:""}}}class ft{constructor(){this.timeMap=[{index:0,name:"早子时",range:"00:00-01:00",hour:0},{index:1,name:"丑时",range:"01:00-03:00",hour:1},{index:2,name:"寅时",range:"03:00-05:00",hour:3},{index:3,name:"卯时",range:"05:00-07:00",hour:5},{index:4,name:"辰时",range:"07:00-09:00",hour:7},{index:5,name:"巳时",range:"09:00-11:00",hour:9},{index:6,name:"午时",range:"11:00-13:00",hour:11},{index:7,name:"未时",range:"13:00-15:00",hour:13},{index:8,name:"申时",range:"15:00-17:00",hour:15},{index:9,name:"酉时",range:"17:00-19:00",hour:17},{index:10,name:"戌时",range:"19:00-21:00",hour:19},{index:11,name:"亥时",range:"21:00-23:00",hour:21},{index:12,name:"晚子时",range:"23:00-24:00",hour:23}],this.tenGods=["比肩","劫财","食神","伤官","偏财","正财","七杀","正官","偏印","正印"],this.wuxing=["水","木","火","土","金"],this.lifeStages=["长生","沐浴","冠带","临官","帝旺","衰","病","死","墓","绝","胎","养"],this.shenShaCalculator=new mt,this.relationshipCalculator=new pt,this.ctg=Z.HEAVENLY_STEMS,this.cdz=Z.EARTHLY_BRANCHES,this.wxtg=Z.STEM_WUXING,this.wxdz=Z.BRANCH_WUXING}calculateBazi(e,t,n,l,o){try{const r=this.timeMap[l];if(!r)throw new Error("无效的时辰索引");const i=de.fromYmdHms(e,t,n,r.hour,0,0),h=i.getLunarHour(),c=h.getEightChar(),g=c.getYear(),d=c.getMonth(),f=c.getDay(),_=c.getHour(),$={year:{gan:g.getHeavenStem().getName(),zhi:g.getEarthBranch().getName(),ganZhi:g.getName()},month:{gan:d.getHeavenStem().getName(),zhi:d.getEarthBranch().getName(),ganZhi:d.getName()},day:{gan:f.getHeavenStem().getName(),zhi:f.getEarthBranch().getName(),ganZhi:f.getName()},hour:{gan:_.getHeavenStem().getName(),zhi:_.getEarthBranch().getName(),ganZhi:_.getName()}},k=$.day.gan,w=[[$.year.gan,$.year.zhi],[$.month.gan,$.month.zhi],[$.day.gan,$.day.zhi],[$.hour.gan,$.hour.zhi]],m=this.calculateHiddenStems($),v=this.calculateWuxingStrength($,m),T=this.calculateSeasonInfo(i),L={gender:o==="male"?"男":"女",solarDate:{year:e,month:t,day:n},lunarDate:{year:h.getLunarDay().getLunarMonth().getLunarYear().getYear(),month:h.getLunarDay().getLunarMonth().getMonth(),day:h.getLunarDay().getDay(),monthName:h.getLunarDay().getLunarMonth().getName(),dayName:h.getLunarDay().getName()},timeInfo:r,pillars:$,dayMaster:{gan:k,element:this.getWuxing(k),yinYang:this.getGanYinYang(k)},zodiac:h.getLunarDay().getLunarMonth().getLunarYear().getSixtyCycle().getEarthBranch().getZodiac().getName(),constellation:i.getSolarDay().getConstellation().getName(),tenGods:this.calculateTenGods($,k),hiddenStems:m,hiddenTenGods:this.calculateHiddenTenGods(m,k),wuxingStrength:v,luckInfo:this.calculateDayunWithTyme(i,o==="male"?ce.MAN:ce.WOMAN),mingGong:c.getOwnSign().getName(),shenGong:c.getBodySign().getName(),taiYuan:c.getFetalOrigin().getName(),taiXi:c.getFetalBreath().getName(),lifeStages:this.calculateLifeStages($,k),pillarLifeStages:this.calculatePillarLifeStages($),nayin:this.calculateNayin($),shensha:this.shenShaCalculator.calculateAllShenSha(w,o),ziZuo:this.calculateZiZuo($),kongWang:this.calculateKongWang($),intelligentAnalysis:this.relationshipCalculator.getIntelligentAnalysis(w),wuxingSeasonStatus:this.getSeasonStatus($.month.zhi),monthCommander:this.getMonthCommander(i,$.month.zhi),seasonInfo:T,analysis:this.analyzeBaziChart($,m)};if(L.luckInfo&&L.luckInfo.cycles){const F=e;L.luckInfo.cycles.forEach(V=>{if(!V.isXiaoyun){V.years=[];const D=V.year,O=D+9;for(let K=D;K<=O;K++){const j=K-F+1,E=this.calculateLiunian(K,k),C=this.calculateXiaoyun($.hour.ganZhi,L.gender,$.year.gan,j);V.years.push({year:K,age:j,ganZhi:E.ganZhi,tenGod:E.tenGod,tenGodZhi:E.tenGodZhi,xiaoyun:C})}}})}return L}catch(r){throw console.error("八字计算错误:",r),new Error(`八字计算失败: ${r.message}`)}}calculateLiunian(e,t){try{const l=de.fromYmdHms(e,6,1,0,0,0).getLunarHour().getEightChar().getYear(),o=l.getHeavenStem().getName(),r=l.getEarthBranch().getName();return{year:e,gan:o,zhi:r,ganZhi:`${o}${r}`,tenGod:this.getTenGod(o,t),tenGodZhi:this.getTenGodForBranch(r,t)}}catch(n){console.error(`流年计算错误 (${e}年):`,n);const l=(e-4)%10,o=(e-4)%12,r=Z.HEAVENLY_STEMS[l],i=Z.EARTHLY_BRANCHES[o];return{year:e,gan:r,zhi:i,ganZhi:`${r}${i}`,tenGod:this.getTenGod(r,t),tenGodZhi:this.getTenGodForBranch(i,t)}}}calculateLiuyue(e,t,n){const o=de.fromYmdHms(e,t,1,0,0,0).getLunarHour().getEightChar().getMonth(),r=o.getHeavenStem().getName(),i=o.getEarthBranch().getName(),h=[],c=[e-1,e,e+1],g=[];c.forEach(f=>{for(let _=0;_<24;_++)g.push(ue.fromIndex(f,_))});for(const f of g){const _=f.getJulianDay().getSolarDay();_.getYear()===e&&_.getMonth()===t&&(h.find(k=>k.name===f.getName())||h.push({name:f.getName(),date:`${_.getYear()}-${_.getMonth().toString().padStart(2,"0")}-${_.getDay().toString().padStart(2,"0")}`}))}const d=h.sort((f,_)=>new Date(f.date).getDate()-new Date(_.date).getDate());return{month:t,gan:r,zhi:i,ganZhi:`${r}${i}`,tenGod:this.getTenGod(r,n),tenGodZhi:this.getTenGodForBranch(i,n),jieqi:d}}calculateLiuri(e,t,n,l){const r=de.fromYmdHms(e,t,n,0,0,0).getLunarHour().getEightChar().getDay(),i=r.getHeavenStem().getName(),h=r.getEarthBranch().getName();return{day:n,gan:i,zhi:h,ganZhi:`${i}${h}`,tenGod:this.getTenGod(i,l),tenGodZhi:this.getTenGodForBranch(h,l)}}getTenGodForBranch(e,t){const n=fe[e]?.[0];return n?this.getTenGod(n,t):"未知"}calculateXiaoyun(e,t,n,l){const o=[];for(const f of Z.HEAVENLY_STEMS)for(const _ of Z.EARTHLY_BRANCHES)o.push(f+_);const r=o.indexOf(e);if(r===-1)return"未知";const h=Z.HEAVENLY_STEMS.indexOf(n)%2===0,c=t==="男",g=h&&c||!h&&!c;let d;return g?d=(r+l)%60:(d=(r-l)%60,d<0&&(d+=60)),o[d]}calculatePillarLifeStages(e){const t={};for(const n in e){const l=e[n],o=l.gan,r=l.zhi;t[n]=ye[o]?.[r]||"无"}return t}getWuxing(e){const t=this.ctg.indexOf(e);if(t!==-1)return this.wxtg[t];const n=this.cdz.indexOf(e);return n!==-1?this.wxdz[n]:"未知"}getGanYinYang(e){const t=this.ctg.indexOf(e);return t===-1?"未知":Z.STEM_YINYANG[t]}calculateTenGods(e,t){return Object.fromEntries(Object.entries(e).map(([n,{gan:l}])=>n==="day"?[n,"日主"]:[n,this.getTenGod(l,t)]))}getTenGod(e,t){const n=this.ctg.indexOf(e),l=this.ctg.indexOf(t);return n===-1||l===-1?"未知":[["比肩","劫财","食神","伤官","偏财","正财","七杀","正官","偏印","正印"],["劫财","比肩","伤官","食神","正财","偏财","正官","七杀","正印","偏印"],["偏印","正印","比肩","劫财","食神","伤官","偏财","正财","七杀","正官"],["正印","偏印","劫财","比肩","伤官","食神","正财","偏财","正官","七杀"],["七杀","正官","偏印","正印","比肩","劫财","食神","伤官","偏财","正财"],["正官","七杀","正印","偏印","劫财","比肩","伤官","食神","正财","偏财"],["偏财","正财","七杀","正官","偏印","正印","比肩","劫财","食神","伤官"],["正财","偏财","正官","七杀","正印","偏印","劫财","比肩","伤官","食神"],["食神","伤官","偏财","正财","七杀","正官","偏印","正印","比肩","劫财"],["伤官","食神","正财","偏财","正官","七杀","正印","偏印","劫财","比肩"]][l][n]}calculateHiddenStems(e){return Object.fromEntries(Object.entries(e).map(([t,{zhi:n}])=>[t,fe[n]||[]]))}calculateHiddenTenGods(e,t){return Object.fromEntries(Object.entries(e).map(([n,l])=>[n,l.map(o=>this.getTenGod(o,t))]))}calculateWuxingStrength(e,t){const n={tianGan:12,diZhiBenQi:12,diZhiZhongQi:6,diZhiYuQi:3},l={寅:{木:2,火:1.5,土:.8,金:.6,水:1.2},卯:{木:2.2,火:1.6,土:.7,金:.5,水:1.1},辰:{土:2,金:1.5,水:.8,木:1.2,火:.6},巳:{火:2,土:1.5,金:.8,水:.6,木:1.2},午:{火:2.2,土:1.6,金:.7,水:.5,木:1.1},未:{土:2,金:1.5,水:.8,木:1.2,火:.6},申:{金:2,水:1.5,木:.8,火:.6,土:1.2},酉:{金:2.2,水:1.6,木:.7,火:.5,土:1.1},戌:{土:2,金:1.5,水:.8,木:1.2,火:.6},亥:{水:2,木:1.5,火:.8,土:.6,金:1.2},子:{水:2.2,木:1.6,火:.7,土:.5,金:1.1},丑:{土:2,金:1.5,水:.8,木:1.2,火:.6}},o=e.month.zhi,r=l[o],i={金:0,木:0,水:0,火:0,土:0};for(const D of Object.values(e)){const O=this.getWuxing(D.gan);O!=="未知"&&(i[O]+=n.tianGan)}for(const D of Object.values(e)){const O=D.zhi;(fe[O]||[]).forEach((j,E)=>{const C=this.getWuxing(j);C!=="未知"&&(E===0?i[C]+=n.diZhiBenQi:E===1?i[C]+=n.diZhiZhongQi:i[C]+=n.diZhiYuQi)})}const h={...i};for(const D in h)h[D]=Math.round(h[D]*(r[D]||1));const c=Object.values(h).reduce((D,O)=>D+O,0),g={};if(c>0)for(const D in h)g[D]=Math.round(h[D]/c*100);else for(const D in h)g[D]=0;const d=this.getWuxing(e.day.gan),f={金:{allies:["金","土"],enemies:["火","水","木"]},木:{allies:["木","水"],enemies:["金","火","土"]},水:{allies:["水","金"],enemies:["土","木","火"]},火:{allies:["火","木"],enemies:["水","土","金"]},土:{allies:["土","火"],enemies:["木","金","水"]}};if(!f[d])return{scores:h,percentages:g,status:"无法判断"};const _=f[d].allies,$=f[d].enemies,k=_.reduce((D,O)=>D+(h[O]||0),0);$.reduce((D,O)=>D+(h[O]||0),0);let w="均衡";const m=c>0?k/c*100:0;m>60?w="身强":m<20?w="身弱":m>=40&&m<=60?w="中和":m>50?w="偏强":m<30&&(w="偏弱");let v=[],T=[];w==="身强"||w==="偏强"?(v=$,T=_):w==="身弱"||w==="偏弱"?(v=_,T=$):v=f[d].enemies.slice(0,2);const L=Object.entries(i).filter(([D,O])=>O===0).map(([D])=>D),F=v.map(D=>({wuxing:D,...Ee[D]})),V=T.map(D=>({wuxing:D,...Ee[D]}));return{scores:h,percentages:g,status:w,yongShen:v,jiShen:T,missing:L,suggestions:{favorable:F,unfavorable:V}}}calculateDayunWithTyme(e,t){try{const n=this.calculateTraditionalDayun(e,t);let l="";if(n.startAge!==void 0){const c=e.getSolarDay().getYear()+n.startAge;l=`出生后 ${n.startAge} 年，${c}年起运`}else l="起运时间计算失败";const o=[],r=n.startAge;if(r>0){const c=e.getLunarHour().getEightChar(),g=c.getHour().getName(),d=t===ce.MAN?"男":"女",f=c.getYear().getHeavenStem().getName(),_=this.getGanYinYang(f),$=e.getSolarDay().getYear(),k=[],w=Math.max(1,r);for(let m=1;m<=w;m++){const v=$+m-1,T=this.calculateXiaoyun(g,d,f,m),L=this.calculateLiunian(v,c.getDay().getHeavenStem().getName());k.push({year:v,age:m,ganZhi:L.ganZhi,tenGod:L.tenGod,tenGodZhi:L.tenGodZhi,xiaoyun:{ganZhi:T,tenGod:this.getTenGod(T[0],c.getDay().getHeavenStem().getName()),tenGodZhi:this.getTenGodForBranch(T[1],c.getDay().getHeavenStem().getName())}})}k.length>0&&o.push({age:1,year:k[0].year,ganZhi:"小运",isXiaoyun:!0,type:"小运",years:k})}const i=e.getSolarDay().getYear();for(let c=0;c<12;c++){const g=n.startAge+c*10,d=i+g-1,f=n.dayunList[c];f&&o.push({age:g,year:d,ganZhi:f,isXiaoyun:!1,type:"大运",years:[]})}let h="";if(n.dayunList.length>0){const c=n.dayunList[0][0],g=Z.HEAVENLY_STEMS,d=g.indexOf(c);if(d!==-1){const f=g[(d+5)%10];h=`逢 ${c}、${f} 年交运`}else h="交运信息计算失败"}else h="交运信息计算失败";return{startInfo:l,handoverInfo:h,cycles:o}}catch(n){return console.error("大运计算错误:",n),{startInfo:"计算失败",handoverInfo:"计算失败",cycles:[]}}}calculateLifeStages(e,t){const n=ye[t]||{};return Object.fromEntries(Object.entries(e).map(([l,{zhi:o}])=>[l,n[o]||"未知"]))}calculateNayin(e){return Object.fromEntries(Object.entries(e).map(([t,{gan:n,zhi:l}])=>[t,dt[n+l]||"未知"]))}calculateWuxingStatus(e){const t=this.getSeasonStatus(e);return t?`木${t.木} 火${t.火} 土${t.土} 金${t.金} 水${t.水}`:"无法确定五行状态"}calculateKongWang(e){return Object.fromEntries(Object.entries(e).map(([t,{gan:n,zhi:l}])=>{const o=this.ctg.indexOf(n),r=this.cdz.indexOf(l);if(o===-1||r===-1)return[t,[]];const i=(10+r-o)%12,h=(11+r-o)%12;return[t,[this.cdz[i],this.cdz[h]]]}))}calculateZiZuo(e){return Object.fromEntries(Object.entries(e).map(([t,{gan:n,zhi:l}])=>{const o=ye[n]||{};return[t,o[l]||"未知"]}))}analyzeBaziChart(e,t){const n=e.day.gan,l=this.getWuxing(n),o=e.month.zhi;e.month.gan;const i=this.getSeasonStatus(o)[l],h=i==="旺"||i==="相",c=this.analyzeRoots(e,l),g=this.analyzeSupport(e,n,l),d=this.calculateDayMasterStrength(h,c,g,l,o),f=this.analyzePattern(e,t,n,l,d.strength),_=this.analyzeUsefulGod(e,l,d.strength,f);return{dayMasterStrength:d.strength,dayMasterStatus:d.status,mingGe:f.pattern,patternType:f.type,patternDescription:f.description,favorableElements:_.favorable,unfavorableElements:_.unfavorable,usefulGod:_.useful,avoidGod:_.avoid,circulation:_.circulation,rootAnalysis:c,supportAnalysis:g,seasonalStatus:{month:o,dayMasterStatus:i,isTimely:h}}}analyzeRoots(e,t){const n=[];let l=0;return Object.entries(e).forEach(([o,r])=>{if(this.getWuxing(r.zhi)===t){const h=o==="day"?3:1;n.push({position:o,branch:r.zhi,strength:h}),l+=h}}),{roots:n,totalStrength:l,hasRoot:n.length>0,strongRoot:n.some(o=>o.strength>=3)}}analyzeSupport(e,t,n){const l=[];let o=0;return Object.entries(e).forEach(([r,i])=>{if(r!=="day"&&i.gan&&this.getWuxing(i.gan)===n){const c=i.gan===t?2:1;l.push({position:r,stem:i.gan,strength:c}),o+=c}}),{supporters:l,totalStrength:o,hasSupport:l.length>0}}calculateDayMasterStrength(e,t,n,l,o){let r="中和",i=0;e&&(i+=2),i+=t.totalStrength,i+=n.totalStrength,i>=6?r="太旺":i>=4?r="偏旺":i>=2?r="中和":i>=1?r="偏弱":r="太弱";const c=this.getSeasonStatus(o)[l]||"休";return{strength:r,score:i,status:`日主${l}生于${o}月，${c}`,details:{timely:e,rootStrength:t.totalStrength,supportStrength:n.totalStrength}}}analyzePattern(e,t,n,l,o){const r=e.month.gan;e.month.zhi;const i=this.getTenGod(r,n),h=this.checkSpecialPattern(e,l,o);if(h.isSpecial)return h;let c="正格",g="普通格局",d="命局平和，无明显特殊格局";if(i)switch(i){case"正官":c="正官格",g="官格",d="月干透正官，主贵气，利于仕途功名";break;case"七杀":c="七杀格",g="杀格",d="月干透七杀，主权威，需要制化得宜";break;case"正财":c="正财格",g="财格",d="月干透正财，主富裕，利于经商理财";break;case"偏财":c="偏财格",g="财格",d="月干透偏财，主横财，善于投资经营";break;case"正印":c="正印格",g="印格",d="月干透正印，主学问，利于文化教育";break;case"偏印":c="偏印格",g="印格",d="月干透偏印，主技艺，适合专业技能";break;case"食神":c="食神格",g="食伤格",d="月干透食神，主福禄，性格温和有才华";break;case"伤官":c="伤官格",g="食伤格",d="月干透伤官，主才华，需要适当约束";break;case"比肩":c="建禄格",g="比劫格",d="月干透比肩，主自立，需要财官调节";break;case"劫财":c="劫财格",g="比劫格",d="月干透劫财，主竞争，需要官杀制约";break;default:c="正格",g="普通格局",d="命局平和，五行流通"}const f=this.checkPatternSuccess(e,c,g);return{pattern:c,type:g,description:d,success:f.success,successReason:f.reason,isSpecial:!1}}checkSpecialPattern(e,t,n){return n==="太旺"&&this.countRestraints(e,t)===0?{isSpecial:!0,pattern:"从强格",type:"特殊格局",description:"日主极旺无制，顺其旺势而行",success:!0,successReason:"格局纯粹，顺势而为"}:n==="太弱"&&this.countSupports(e,t)===0?{isSpecial:!0,pattern:"从弱格",type:"特殊格局",description:"日主极弱无助，从其弱势而行",success:!0,successReason:"格局清纯，从弱而行"}:{isSpecial:!1}}checkPatternSuccess(e,t,n){let l=!0,o="格局基本成立";switch(n){case"官格":this.hasInjuryToOfficial(e)&&(l=!1,o="伤官见官，格局受损");break;case"财格":this.hasRobberyToWealth(e)&&(l=!1,o="比劫夺财，格局不清");break}return{success:l,reason:o}}analyzeUsefulGod(e,t,n,l){const o=[],r=[];let i="",h="",c="";switch(n){case"太旺":const g=this.getWuxingChildren(t),d=this.getWuxingEnemies(t);o.push(...g,...d),r.push(t,...this.getWuxingParents(t)),i=g[0]||d[0]||"食神",h=t,c="身旺用食伤泄秀，或用官杀制身";break;case"偏旺":o.push(...this.getWuxingChildren(t)),r.push(t,...this.getWuxingParents(t)),i=this.getWuxingChildren(t)[0]||"食神",h=t,c="身旺喜泄，食伤为用";break;case"中和":o.push(t),i="调候",c="命局中和，重在调候和流通";break;case"偏弱":o.push(t,...this.getWuxingParents(t)),r.push(...this.getWuxingEnemies(t),...this.getWuxingChildren(t)),i=this.getWuxingParents(t)[0]||t,h=this.getWuxingEnemies(t)[0]||"官杀",c="身弱喜印比帮扶";break;case"太弱":l.pattern==="从弱格"?(o.push(...this.getWuxingEnemies(t),...this.getWuxingChildren(t)),r.push(t,...this.getWuxingParents(t)),i=this.getWuxingEnemies(t)[0]||"官杀",h=t,c="从弱格，顺其弱势，忌帮扶"):(o.push(t,...this.getWuxingParents(t)),r.push(...this.getWuxingEnemies(t)),i=this.getWuxingParents(t)[0]||t,h=this.getWuxingEnemies(t)[0]||"官杀",c="身弱急需印比帮扶");break}return{favorable:[...new Set(o)],unfavorable:[...new Set(r)],useful:i,avoid:h,circulation:c}}getWuxingChildren(e){return{木:["火"],火:["土"],土:["金"],金:["水"],水:["木"]}[e]||[]}getWuxingParents(e){return{火:["木"],土:["火"],金:["土"],水:["金"],木:["水"]}[e]||[]}getWuxingEnemies(e){return{木:["金"],火:["水"],土:["木"],金:["火"],水:["土"]}[e]||[]}countRestraints(e,t){let n=0;const l=this.getWuxingEnemies(t);return Object.values(e).forEach(o=>{(l.includes(this.getWuxing(o.gan))||l.includes(this.getWuxing(o.zhi)))&&n++}),n}countSupports(e,t){let n=0;const l=this.getWuxingParents(t);return Object.values(e).forEach(o=>{(this.getWuxing(o.gan)===t||this.getWuxing(o.zhi)===t||l.includes(this.getWuxing(o.gan))||l.includes(this.getWuxing(o.zhi)))&&n++}),n}hasInjuryToOfficial(e){return!1}hasRobberyToWealth(e){return!1}getGanYinYang(e){return["甲","丙","戊","庚","壬"].includes(e)?"阳":"阴"}getSeasonStatus(e){return ht[e]||{}}getMonthCommander(e,t){const n=gt[t];if(!n)return"未知";try{const l=e.getSolarDay().getYear(),o=e.getJulianDay();let r=null;const i=[];for(let g=0;g<24;g++)i.push(ue.fromIndex(l,g)),i.push(ue.fromIndex(l-1,g));for(const g of i){const d=g.getJulianDay();g.isJie()&&d<=o&&(!r||d>r.getJulianDay())&&(r=g)}if(!r)return"未知(节气未找到)";const h=o-r.getJulianDay();let c=0;for(const g of n)if(c+=g[1],h<c)return g[0];return n[n.length-1][0]}catch(l){return console.error("获取月令司令失败:",l),"计算出错"}}calculateSeasonInfo(e){try{const t=[],n=e.getSolarDay().getYear(),l=e.getJulianDay();for(let d=0;d<24;d++){const f=ue.fromIndex(n,d),_=f.getJulianDay(),$=_.getSolarDay();t.push({name:f.getName(),date:`${$.getYear()}-${$.getMonth().toString().padStart(2,"0")}-${$.getDay().toString().padStart(2,"0")}`,jd:_.getDay(),index:d,isJie:f.isJie()})}let o=null,r=null;for(let d=0;d<t.length;d++){const f=t[d];if(f.jd<=l)o=f;else{r=f;break}}let i=0,h=0;o&&(i=Math.floor(l-o.jd)),r&&(h=Math.floor(r.jd-l));const g=o?{0:"冬",1:"冬",2:"春",3:"春",4:"春",5:"春",6:"春",7:"春",8:"夏",9:"夏",10:"夏",11:"夏",12:"夏",13:"夏",14:"秋",15:"秋",16:"秋",17:"秋",18:"秋",19:"秋",20:"冬",21:"冬",22:"冬",23:"冬"}[o.index]:"未知";return{currentJieqi:o?o.name:"未知",nextJieqi:r?r.name:"未知",daysSincePrev:i,daysToNext:h,currentSeason:g,jieqiList:t.map(d=>({name:d.name,date:d.date}))}}catch(t){return console.error("节气信息计算错误:",t),{currentJieqi:"计算错误",nextJieqi:"计算错误",daysSincePrev:0,daysToNext:0,currentSeason:"未知",jieqiList:[]}}}calculateTraditionalDayun(e,t){try{const n=e.getSolarDay().getYear(),l=e.getJulianDay(),o=e.getLunarHour().getEightChar(),r=o.getYear().getHeavenStem().getName(),i=o.getMonth().getHeavenStem().getName(),h=o.getMonth().getEarthBranch().getName(),g=Z.HEAVENLY_STEMS.indexOf(r)%2===0,d=t===ce.MAN,f=g&&d||!g&&!d,_=this.calculateStartAge(e,t,r),$=this.generateDayunList(i,h,f);return{startAge:_,dayunList:$,isShun:f,yearGan:r,monthGanZhi:i+h}}catch(n){return console.error("传统大运计算错误:",n),{startAge:0,dayunList:[],isShun:!0,yearGan:"",monthGanZhi:""}}}calculateStartAge(e,t,n){try{const l=e.getSolarDay().getYear(),o=e.getJulianDay(),i=Z.HEAVENLY_STEMS.indexOf(n)%2===0,h=t===ce.MAN,c=i&&h||!i&&!h,g=[];for(let $ of[l-1,l,l+1])for(let k=0;k<24;k++){const w=ue.fromIndex($,k);w.isJie()&&g.push({term:w,julianDay:w.getJulianDay(),name:w.getName()})}g.sort(($,k)=>$.julianDay-k.julianDay);let d=null,f=0;if(c){for(const $ of g)if($.julianDay>o){d=$,f=$.julianDay-o;break}}else for(let $=g.length-1;$>=0;$--){const k=g[$];if(k.julianDay<o){d=k,f=o-k.julianDay;break}}if(!d)return console.warn("未找到目标节气，使用默认起运岁数"),8;const _=Math.ceil(f/3);return console.log(`起运计算详情:
        性别: ${h?"男":"女"}
        年干: ${n} (${i?"阳":"阴"})
        顺逆: ${c?"顺排":"逆排"}
        目标节气: ${d.name}
        天数差: ${f}
        起运岁数: ${_}`),Math.max(1,_)}catch(l){return console.error("起运岁数计算错误:",l),8}}generateDayunList(e,t,n){const l=Z.HEAVENLY_STEMS,o=Z.EARTHLY_BRANCHES,r=l.indexOf(e),i=o.indexOf(t);if(r===-1||i===-1)return console.error("月柱干支索引错误"),[];const h=[];for(let c=0;c<12;c++){let g,d;n?(g=(r+c+1)%10,d=(i+c+1)%12):(g=(r-c-1+10)%10,d=(i-c-1+12)%12);const f=l[g],_=o[d];h.push(f+_)}return h}}const te=new ft;function yt(a){const e=new Date().getFullYear();for(let t=0;t<a.length;t++){const n=a[t],l=n.year,o=l+9;if(e>=l&&e<=o)return{current:n,previous:t>0?a[t-1]:null,future:a.slice(t+1)}}return{current:a[0]||null,previous:null,future:a.slice(1)}}function vt(a,e){let t=`
### 大运详细分析
`;const n=te.getTenGod(a.ganZhi[0],e),l=te.getTenGodForBranch(a.ganZhi[1],e);t+=`* **当前大运**: ${a.ganZhi} (天干:${n}, 地支:${l})
`;const o=new Date().getFullYear(),r=o-a.year+1;t+=`* **大运进度**: 第${r}年/共10年
`;const i=bt(a,o,e);return t+=`
* **三大运流年分析**:
`,i.forEach(h=>{const c=h.years[0].year,g=h.years[h.years.length-1].year,d=`${c}-${g}年`;t+=`
  **${h.name}** (${h.ganZhi}, ${d}):
`,h.years.forEach(f=>{const $=f.year===o?" ← 当前":"";t+=`    - ${f.year}年(${f.age}岁): ${f.ganZhi}(${f.tenGod})${$}
`})}),t}function bt(a,e,t){const n=[],l=a.years.filter(o=>o.year>=e);l.length>0&&n.push({name:"当前大运",ganZhi:a.ganZhi,years:l});for(let o=1;o<=2;o++){const r=a.year+o*10,i=St(a.ganZhi,o),h=It(a,e),c=[];for(let g=0;g<10;g++){const d=r+g,f=h?h+(d-e):null,_=$t(d),$=te.getTenGod(_[0],t);c.push({year:d,age:f,ganZhi:_,tenGod:$})}n.push({name:o===1?"下一大运":"下下大运",ganZhi:i,years:c})}return n}function St(a,e){const t=["甲","乙","丙","丁","戊","己","庚","辛","壬","癸"],n=["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"],l=a[0],o=a[1],r=t.indexOf(l),i=n.indexOf(o),h=(r+e)%10,c=(i+e)%12;return t[h]+n[c]}function _t(a,e){let t=`
### 一生大运详细分析
`;const n=new Date().getFullYear();t+=`* **大运总览**: 共${a.length}个大运，从${a[0].year}年起运
`;const l=a.findIndex(o=>n>=o.year&&n<=o.year+9);return t+=`
* **所有大运详细信息**:
`,a.forEach((o,r)=>{const i=o.year,h=i+9,c=o.years&&o.years.length>0?o.years[0].age:null,g=c?c+9:null,d=te.getTenGod(o.ganZhi[0],e),f=te.getTenGodForBranch(o.ganZhi[1],e),$=r===l?" ← 当前大运":"",k=c&&g?`(${c}-${g}岁)`:"";t+=`
  **第${r+1}个大运** ${o.ganZhi}(${d}) ${i}-${h}年${k}${$}:
`,t+=`    天干:${d}, 地支:${f}
`,o.years&&o.years.length>0?(t+=`    流年详情:
`,o.years.forEach(w=>{const v=w.year===n?" ← 当前年份":"";t+=`      ${w.year}年(${w.age}岁): ${w.ganZhi}(${w.tenGod})${v}
`})):t+=`    流年概况: ${i}-${h}年，共10年
`}),t+=`
* **人生阶段总结**:
`,t+=`  - 青年期: 第1-3个大运 (约${a[0]?.year||"起运"}-${a[2]?.year+9||"未知"}年)
`,a.length>3&&(t+=`  - 壮年期: 第4-6个大运 (约${a[3]?.year||"未知"}-${a[5]?.year+9||"未知"}年)
`),a.length>6&&(t+=`  - 中年期: 第7-9个大运 (约${a[6]?.year||"未知"}-${a[8]?.year+9||"未知"}年)
`),a.length>9&&(t+=`  - 晚年期: 第10个大运以后 (${a[9]?.year||"未知"}年以后)
`),t}function $t(a){const e=["甲","乙","丙","丁","戊","己","庚","辛","壬","癸"],t=["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"],l=a-1984,o=l%10,r=l%12;return e[o]+t[r]}function It(a,e){const t=a.years.find(n=>n.year===e);return t?t.age:null}function xt(a){try{const e=[{start:"立春",end:"惊蛰"},{start:"惊蛰",end:"清明"},{start:"清明",end:"立夏"},{start:"立夏",end:"芒种"},{start:"芒种",end:"小暑"},{start:"小暑",end:"立秋"},{start:"立秋",end:"白露"},{start:"白露",end:"寒露"},{start:"寒露",end:"立冬"},{start:"立冬",end:"大雪"},{start:"大雪",end:"小寒"},{start:"小寒",end:"立春"}],t={};for(const l of[a,a+1]){const o=te.calculateSeasonInfo(de.fromYmdHms(l,6,1,0,0,0));o&&o.jieqiList&&o.jieqiList.forEach(r=>{const i=new Date(r.date);i.getFullYear()===l&&(t[r.name]={month:i.getMonth()+1,day:i.getDate(),year:l})})}const n=[];for(let l=0;l<12;l++){const{start:o,end:r}=e[l],i=t[o],h=t[r];if(i&&h){let c,g;if(l===11){c=`${i.month}月${i.day}日`;const d=t.立春;if(d&&d.year===a+1){const f=d.day-1;g=`${d.month}月${f>0?f:"月底"}日`}else g="2月3日"}else{c=`${i.month}月${i.day}日`;const d=h.day-1;g=`${h.month}月${d>0?d:"月底"}日`}n.push(`${c}-${g}`)}else{const c=["2月4日-3月5日","3月6日-4月4日","4月5日-5月5日","5月6日-6月5日","6月6日-7月6日","7月7日-8月7日","8月8日-9月7日","9月8日-10月7日","10月8日-11月6日","11月7日-12月6日","12月7日-1月5日","1月6日-2月3日"];n.push(c[l])}}return n}catch(e){return console.warn("计算月份日期范围失败:",e),["2月4日-3月5日","3月6日-4月4日","4月5日-5月5日","5月6日-6月5日","6月6日-7月6日","7月7日-8月7日","8月8日-9月7日","9月8日-10月7日","10月8日-11月6日","11月7日-12月6日","12月7日-1月5日","1月6日-2月3日"]}}function ve(a,e=null){if(!a)return"无法获取八字数据。";let t=`### 基本信息
`;t+=`* **性别**: ${a.gender}
`,t+=`* **出生**: ${a.solarDate.year}年${a.solarDate.month}月${a.solarDate.day}日 ${a.timeInfo.name}
`,t+=`* **日主**: ${a.dayMaster.gan}${a.dayMaster.element} (${a.dayMaster.yinYang})
`,t+=`* **生肖**: ${a.zodiac}
`,a.age&&(t+=`* **年龄**: ${a.age}岁
`),a.analysis&&(a.analysis.dayMasterStrength&&(t+=`* **强弱**: ${a.analysis.dayMasterStrength}
`),a.analysis.mingGe&&(t+=`* **格局**: ${a.analysis.mingGe}
`),a.analysis.patternType&&(t+=`* **格局类型**: ${a.analysis.patternType}
`),a.analysis.patternDescription&&(t+=`* **格局说明**: ${a.analysis.patternDescription}
`),a.analysis.usefulGod&&(t+=`* **用神**: ${a.analysis.usefulGod}
`),a.analysis.avoidGod&&(t+=`* **忌神**: ${a.analysis.avoidGod}
`),a.analysis.favorableElements&&a.analysis.favorableElements.length>0&&(t+=`* **喜用五行**: ${a.analysis.favorableElements.join("、")}
`),a.analysis.unfavorableElements&&a.analysis.unfavorableElements.length>0&&(t+=`* **忌讳五行**: ${a.analysis.unfavorableElements.join("、")}
`),a.analysis.circulation&&(t+=`* **五行流通**: ${a.analysis.circulation}
`)),t+=`
### 八字四柱
`;const n=["year","month","day","hour"],l=["年","月","日","时"];if(n.forEach((o,r)=>{const i=a.pillars[o],h=a.tenGods[o],c=a.hiddenStems&&a.hiddenStems[o];t+=`* **${l[r]}**: ${i.ganZhi}(${h})`,c&&c.length>0&&(t+=` 藏干:${c.join(",")}`),t+=`
`}),a.intelligentAnalysis){t+=`
### 专业干支关系分析
`;const o=[[a.pillars.year.gan,a.pillars.year.zhi],[a.pillars.month.gan,a.pillars.month.zhi],[a.pillars.day.gan,a.pillars.day.zhi],[a.pillars.hour.gan,a.pillars.hour.zhi]];t+=`* **四柱干支**: ${o.map(g=>g.join("")).join(" ")}
`;const r=Pt(o);r.length>0&&(t+=`* **天干关系**: ${r.join("、")}
`);const i=wt(o);i.length>0&&(t+=`* **地支关系**: ${i.join("、")}
`);const h=Et(o);h.length>0&&(t+=`* **整柱关系**: ${h.join("、")}
`);const c=At(o);c.length>0&&(t+=`* **五行生克**: ${c.join("、")}
`)}if(a.luckInfo&&a.luckInfo.cycles&&a.luckInfo.cycles.length>0){t+=`
### 大运信息
`,a.luckInfo.startInfo&&(t+=`* **起运**: ${a.luckInfo.startInfo}
`);const o=a.luckInfo.cycles.filter(i=>!i.isXiaoyun),r=yt(o);if(r.current){const i=r.current,h=a.dayMaster.gan,c=te.getTenGod(i.ganZhi[0],h);if(t+=`* **当前大运**: ${i.ganZhi}(${c})`,i.year){const d=i.year+9;t+=` ${i.year}-${d}年`}t+=`
`;const g=r.future.slice(0,2).map(d=>{const f=te.getTenGod(d.ganZhi[0],h);let _=`${d.ganZhi}(${f})`;if(d.year){const $=d.year+9;_+=`${d.year}-${$}年`}return _}).join(", ");g&&(t+=`* **未来大运**: ${g}
`),e&&(e.id==="ai-current-luck"||e.id==="ai-this-year")&&(t+=vt(i,h)),e&&e.id==="ai-lifetime-fortune"&&(t+=_t(o,h))}}if(a.liunian&&a.liunian.length>0){const o=new Date().getFullYear(),r=a.liunian.find(i=>i.year===o);r&&(t+=`
### 流年信息
* **今年**: ${r.ganZhi}(${o}年)
`)}if(e&&e.id==="ai-year-analysis"&&(t+=`
### 逐月运势分析参考
`,["正月","二月","三月","四月","五月","六月","七月","八月","九月","十月","冬月","腊月"].forEach(r=>{t+=`* **${r}**: 请根据流年与月令的关系进行分析
`})),e&&e.id==="ai-monthly-fortune"){t+=`
### 今年流月信息
`;const o=new Date().getFullYear(),r=a.dayMaster.gan,i=["正月","二月","三月","四月","五月","六月","七月","八月","九月","十月","冬月","腊月"],h=xt(o);for(let c=1;c<=12;c++)try{const g=te.calculateLiuyue(o,c,r),d=i[c-1],f=h[c-1]||"日期计算失败";t+=`* **${d}**(${f}): ${g.ganZhi}(${g.tenGod})
`}catch(g){console.warn(`计算${c}月流月失败:`,g);const d=i[c-1];t+=`* **${d}**: 计算失败
`}}return t}function kt(a){if(!a||!a.selectedDate)return"未指定具体日期";const{selectedDate:e,selectedTime:t}=a;let n=`${e.getFullYear()}年${e.getMonth()+1}月${e.getDate()}日`;return t&&(n+=` ${t}`),n}function Pt(a){const e=[],t={甲:"己",乙:"庚",丙:"辛",丁:"壬",戊:"癸"},n={甲:"庚",乙:"辛",丙:"壬",丁:"癸"},l={甲:"木",乙:"木",丙:"火",丁:"火",戊:"土",己:"土",庚:"金",辛:"金",壬:"水",癸:"水"},o={金:"木",木:"土",土:"水",水:"火",火:"金"};for(let r=0;r<4;r++)for(let i=r+1;i<4;i++){const h=a[r][0],c=a[i][0],g=["年","月","日","时"];if(t[h]===c||t[c]===h)e.push(`${g[r]}${g[i]}天干${h}${c}相合`);else if(n[h]===c||n[c]===h)e.push(`${g[r]}${g[i]}天干${h}${c}相冲`);else{const d=l[h],f=l[c];o[d]===f?e.push(`${g[r]}${g[i]}天干${h}(${d})克${c}(${f})`):o[f]===d&&e.push(`${g[r]}${g[i]}天干${c}(${f})克${h}(${d})`)}}return e}function wt(a){const e=[],t=a.map(d=>d[1]),n=["年","月","日","时"],l={子:"午",丑:"未",寅:"申",卯:"酉",辰:"戌",巳:"亥"},o={子:"丑",寅:"亥",卯:"戌",辰:"酉",巳:"申",午:"未"},r={子:"未",丑:"午",寅:"巳",卯:"辰",申:"亥",酉:"戌"},i={子:"酉",卯:"午",辰:"丑",未:"戌",寅:"亥",巳:"申"},h={申子辰:"水局",亥卯未:"木局",寅午戌:"火局",巳酉丑:"金局"};for(let d=0;d<4;d++)for(let f=d+1;f<4;f++){const _=t[d],$=t[f];l[_]===$||l[$]===_?e.push(`${n[d]}${n[f]}地支${_}${$}相冲`):o[_]===$||o[$]===_?e.push(`${n[d]}${n[f]}地支${_}${$}六合`):r[_]===$||r[$]===_?e.push(`${n[d]}${n[f]}地支${_}${$}相害`):(i[_]===$||i[$]===_)&&e.push(`${n[d]}${n[f]}地支${_}${$}相破`)}const c=[...new Set(t)];for(const[d,f]of Object.entries(h)){const _=d.split(""),$=_.filter(k=>c.includes(k)).length;if($>=2){const k=_.filter(w=>c.includes(w));e.push(`地支${k.join("")}${$===3?"三合":"半合"}${f}`)}}return c.filter(d=>["寅","巳","申"].includes(d)).length>=2&&e.push("寅巳申无恩之刑"),c.filter(d=>["丑","戌","未"].includes(d)).length>=2&&e.push("丑戌未恃势之刑"),c.includes("子")&&c.includes("卯")&&e.push("子卯无礼之刑"),["辰","午","酉","亥"].forEach(d=>{t.filter(f=>f===d).length>1&&e.push(`${d}${d}自刑`)}),e}function Et(a){const e=[],t=["年","月","日","时"],n={甲:"木",乙:"木",丙:"火",丁:"火",戊:"土",己:"土",庚:"金",辛:"金",壬:"水",癸:"水",子:"水",丑:"土",寅:"木",卯:"木",辰:"土",巳:"火",午:"火",未:"土",申:"金",酉:"金",戌:"土",亥:"水"},l={金:"木",木:"土",土:"水",水:"火",火:"金"},o={甲:"庚",乙:"辛",丙:"壬",丁:"癸"},r={子:"午",丑:"未",寅:"申",卯:"酉",辰:"戌",巳:"亥"};for(let c=0;c<4;c++){const g=a[c][0],d=a[c][1],f=n[g],_=n[d];l[f]===_&&e.push(`${t[c]}柱${g}${d}盖头(天干克地支)`),l[_]===f&&e.push(`${t[c]}柱${g}${d}截脚(地支克天干)`)}for(let c=0;c<4;c++)for(let g=c+1;g<4;g++){const d=a[c],f=a[g],_=o[d[0]]===f[0]||o[f[0]]===d[0],$=r[d[1]]===f[1]||r[f[1]]===d[1];_&&$&&e.push(`${t[c]}${t[g]}柱${d.join("")}与${f.join("")}天克地冲(反吟)`)}const h=a.map(c=>c.join("")).reduce((c,g)=>(c[g]=(c[g]||0)+1,c),{});for(const c in h)h[c]>1&&e.push(`${c}柱重复出现${h[c]}次(伏吟)`);return e}function At(a){const e=[],t={甲:"木",乙:"木",丙:"火",丁:"火",戊:"土",己:"土",庚:"金",辛:"金",壬:"水",癸:"水",子:"水",丑:"土",寅:"木",卯:"木",辰:"土",巳:"火",午:"火",未:"土",申:"金",酉:"金",戌:"土",亥:"水"},n={木:0,火:0,土:0,金:0,水:0};a.forEach(i=>{const h=t[i[0]],c=t[i[1]];n[h]++,n[c]++});const l=Object.entries(n).filter(([i,h])=>h>=3).map(([i])=>i),o=Object.entries(n).filter(([i,h])=>h===0).map(([i])=>i);return l.length>0&&e.push(`五行偏强: ${l.join("、")}`),o.length>0&&e.push(`五行缺失: ${o.join("、")}`),Tt(n)?e.push("五行流通顺畅"):e.push("五行流通受阻"),e}function Tt(a){const e=["木","火","土","金","水"];let t=0,n=0;for(let l=0;l<e.length*2;l++){const o=e[l%e.length];a[o]>0?(t++,n=Math.max(n,t)):t=0}return n>=3}const be={master:`你是一位学贯古今的命理宗师，既精通《滴天髓》、《三命通会》等八字古籍，也了解现代社会的心理学和职业发展。请根据以下信息，为用户提供一份详尽的分析。

**八字信息:**
[CHART_DATA]

---

[PROMPT_BODY]
`,build:(a,e,t="")=>{e===void 0&&(console.warn("PROMPT_BUILDER.build received an undefined question. Defaulting to empty string."),e="");let n=`**问题:**
${e}`;return t&&(n+=`

**分析要求:**
${t}`),be.master.replace("[CHART_DATA]",a).replace("[PROMPT_BODY]",n)}},Ae={single:[{id:"ai-mingge-zonglun",text:"命格总论",prompt:`

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
- 长期成功的保障措施`},{id:"ai-compat-custom",text:"自定义...",prompt:""}]};function Gt(a,e,t,n=null){const l=t?ve(t,e):"无法获取命盘数据。",o=e.dataset.prompt,r=e.id;if(r==="ask-ai-with-date"){const i=kt(n),h=document.getElementById("customQuestion")?.value?.trim()||"",c=a&&a!=="选定日期..."?a:h,g=c?`在${i}这个时间点, ${c}`:`请详细分析${i}的运势。`;return be.build(l,g,"请结合用户提供的具体日期进行分析，越详细越好。")}if(r==="ai-mingge-zonglun"){let i=o.replace("[八字信息]",l);return a!=="命格总论"&&(i=i.replace("为用户提供一份详尽的八字命局解读。",`为用户提供一份关于"${a}"的详尽解读。`)),i}return be.build(l,a,o)}const X={apiUrl:{}.VITE_AI_API_URL||"https://flow.ovo.gs/ai",apiKey:{}.VITE_AI_API_KEY||"",model:{}.VITE_AI_MODEL||"sydf-v1-250520",maxTokens:8192,temperature:.7,debug:!0};function jt(){const a=[],e=X.apiUrl.includes("flow.ovo.gs");return!e&&(!X.apiKey||X.apiKey==="")&&a.push("API 密钥未设置"),X.apiUrl||a.push("API 端点未设置"),X.model||a.push("模型名称未设置"),{isValid:a.length===0,issues:a,config:X,isWorkerBackend:e}}console.log("🔧 AI 配置调试信息:",{apiUrl:X.apiUrl,model:X.model,hasApiKey:!!X.apiKey,envVars:{VITE_AI_API_URL:{}.VITE_AI_API_URL||"未设置",VITE_AI_MODEL:{}.VITE_AI_MODEL||"未设置",VITE_AI_API_KEY:{}.VITE_AI_API_KEY?"已设置":"未设置"}});class Ct{constructor(){this.apiUrl=X.apiUrl,this.apiKey=X.apiKey,this.model=X.model,this.currentRequest=null;const e=jt();e.isValid||console.warn("⚠️ AI 配置问题:",e.issues),console.log("🔧 AI Service 配置:",{apiUrl:this.apiUrl,model:this.model,hasApiKey:!!this.apiKey&&this.apiKey!=="",isProd:!0,validation:e,currentDomain:typeof window<"u"?window.location.hostname:"unknown"})}async*queryAI(e,t={}){try{this.currentRequest&&this.currentRequest.abort();const n=new AbortController;this.currentRequest=n;const l=this.apiUrl.includes("flow.ovo.gs");let o;l?o={prompt:e,model:this.model}:o={model:this.model,messages:[{role:"user",content:e}],max_tokens:t.maxTokens||8192,temperature:t.temperature||.7,stream:!0};const r={"Content-Type":"application/json"};this.apiKey&&this.apiKey!==""&&!this.apiUrl.includes("flow.ovo.gs")&&(r.Authorization=`Bearer ${this.apiKey}`);const i=await fetch(this.apiUrl,{method:"POST",headers:r,body:JSON.stringify(o),signal:n.signal});if(!i.ok){let d="AI服务暂时不可用，请稍后再试";throw i.status===429?d="请求过于频繁，请稍等片刻再试":i.status>=500?d="服务器暂时繁忙，请稍后再试":i.status===401&&(d="API 密钥无效"),new Error(`${d} (状态码: ${i.status})`)}if(!i.body)throw new Error("Response body is null");const h=i.body.getReader(),c=new TextDecoder;let g="";try{for(;;){const{done:d,value:f}=await h.read();if(d){if(g.trim()){const $=this.parseStreamChunk(g);$&&(yield $)}break}g+=c.decode(f,{stream:!0});const _=g.split(`
`);g=_.pop()||"";for(const $ of _){const k=this.parseStreamChunk($);k&&(yield k)}}}finally{h.releaseLock(),this.currentRequest=null}}catch(n){throw this.currentRequest=null,n.name!=="AbortError"&&console.error("AI 请求失败:",n),n}}parseStreamChunk(e){const t=e.trim();if(!t||!t.startsWith("data: "))return null;const n=t.slice(6);if(n==="[DONE]")return null;try{const l=JSON.parse(n);if(l.choices&&l.choices[0]&&l.choices[0].delta&&l.choices[0].delta.content)return l.choices[0].delta.content}catch(l){console.debug("跳过非 JSON 数据:",n,l)}return null}cancelRequest(){this.currentRequest&&(this.currentRequest.abort(),this.currentRequest=null)}buildBaziPrompt(e,t,n=""){let o=`你是一位学贯古今的命理宗师，既精通《滴天髓》、《三命通会》等八字古籍，也了解现代社会的心理学和职业发展。请基于以下专业的八字干支关系信息，为用户提供一份详尽的分析。

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

请确保分析内容专业深入，指导建议实用可行，最终目的是帮助双方建立更和谐的关系。`}getPromptConfig(){return Ae}buildPrompt(e,t,n,l=null){return Gt(e,t,n,l)}buildPromptFromConfig(e,t,n){const l=Ae.single.find(o=>o.id===t.id);if(l){const o=n?ve(n,t):"无法获取命盘数据。",r=new Date().toLocaleString("zh-CN");return t.id==="ai-mingge-zonglun"?l.prompt.replace("[八字信息]",o):`你是一位学贯古今的命理宗师，既精通《滴天髓》、《三命通会》等八字古籍，也了解现代社会的心理学和职业发展。请根据以下信息，为用户提供一份详尽的分析。

**当前时间:** ${r}

**八字信息:**
${o}

**问题:** ${e}

**分析要求:**
${l.prompt}`}return this.buildBaziPrompt(ve(n,t),e)}}const Dt=new Ct;function Lt(){const a=B(""),e=B(!1),t=B("");return{aiResponse:a,isAIThinking:e,aiError:t,askAI:async(o,r="custom",i,h,c=!1)=>{if(!h){t.value="请先进行排盘计算",ge("请先进行排盘计算");return}e.value=!0,t.value="",c||(a.value="");try{const g=i(o,r,h);for await(const d of Dt.queryAI(g))a.value+=d;e.value=!1}catch(g){console.error("AI分析失败:",g),t.value=g.message||"AI分析失败",ge(t.value),e.value=!1}},clearAIResponse:()=>{a.value="",t.value=""}}}const pe=Le("ziWei",()=>{const a=ut({isLunar:!1}),{person1:e,person2:t,enableSecondPerson:n,result1:l,result2:o,isCalculating:r,calculationError:i,canCalculate:h,hasResults:c,resetData:g}=a,d=Lt(),{aiResponse:f,isAIThinking:_,aiError:$,askAI:k,clearAIResponse:w}=d,m=se(()=>ke(l.value)),v=se(()=>ke(o.value)),T=async()=>{if(!h.value)return ge("请填写完整的出生信息"),!1;if(r.value)return!1;r.value=!0,i.value="";const E="ziwei-calculation";try{return le.showLoading("正在计算紫薇斗数...",E),le.updateLoadingMessage("正在计算第一人紫薇斗数...",E),l.value=xe(parseInt(e.value.year),parseInt(e.value.month),parseInt(e.value.day),e.value.timeIndex,e.value.gender,e.value.isLunar),n.value?(le.updateLoadingMessage("正在计算第二人紫薇斗数...",E),o.value=xe(parseInt(t.value.year),parseInt(t.value.month),parseInt(t.value.day),t.value.timeIndex,t.value.gender,t.value.isLunar)):o.value=null,le.hideLoading(E),He("紫薇斗数计算完成！"),!0}catch(C){le.hideLoading(E),console.error("紫薇斗数计算失败:",C);const Y=C.message||"紫薇斗数计算失败，请检查输入信息";return i.value=Y,ge(Y),Re.reportError(C,"紫薇斗数计算"),!1}finally{r.value=!1}},L=async(E,C="custom",Y=!1)=>{const ae={person1:m.value,person2:n.value?v.value:null,enableSecondPerson:n.value};await k(E,C,(ee,he,oe)=>oe.enableSecondPerson&&oe.person2?tt(ee,oe.person1,oe.person2):et(he,ee,oe.person1),ae,Y)},F=()=>{g(),w()},V=()=>n.value&&o.value?we(e.value,t.value):l.value?we(e.value):window.location.origin+window.location.pathname,D=async()=>{try{const E=ct();if(E)return e.value={...e.value,...E.person1},t.value={...t.value,...E.person2},n.value=!0,await T(),!0;const C=ot();if(C)return e.value={...e.value,...C},await T(),!0}catch(E){console.error("从URL恢复紫薇斗数数据失败:",E)}return!1},O=()=>{try{n.value&&h.value?lt(e.value,t.value):h.value&&at(e.value)}catch(E){console.error("保存紫薇斗数数据到URL失败:",E)}},K=(E,C=null)=>{try{let Y="紫薇排盘";C?Y=`${E||"第一人"}与${C||"第二人"}的紫薇合盘分析`:E&&(Y=`${E}的紫薇排盘`),document.title=Y;const ae=document.querySelector('meta[property="og:title"]');ae&&ae.setAttribute("content",Y);const ie=document.querySelector('meta[name="description"]');if(ie&&E){let ee="专业的AI紫薇斗数排盘和命理分析工具";C?ee=`${E}与${C}的紫薇斗数合盘分析，专业AI命理解读`:ee=`${E}的紫薇斗数排盘结果，专业AI命理分析`,ie.setAttribute("content",ee)}}catch(Y){console.error("更新页面标题失败:",Y)}},j=()=>{try{document.title="紫薇排盘";const E=document.querySelector('meta[property="og:title"]');E&&E.setAttribute("content","紫薇排盘");const C=document.querySelector('meta[name="description"]');C&&C.setAttribute("content","专业的AI紫薇斗数排盘和命理分析工具")}catch(E){console.error("重置页面标题失败:",E)}};return Se([e,t,n],()=>{O()},{deep:!0}),{person1:e,person2:t,enableSecondPerson:n,ziWeiResult1:l,ziWeiResult2:o,isCalculating:r,calculationError:i,aiResponse:f,isAIThinking:_,aiError:$,canCalculate:h,hasResults:c,displayData1:m,displayData2:v,calculateZiWei:T,askAI:L,resetData:F,clearAIResponse:w,restoreDataFromUrl:D,generateShareUrl:V,updatePageTitle:K,resetPageTitle:j}});const Mt={class:"input-card"},Nt={class:"person-section"},Yt={class:"form-group"},Zt={class:"custom-date-row"},Bt={class:"custom-date-field"},Ot={class:"custom-date-field"},Ut={class:"custom-date-field"},Ht={class:"form-group"},Rt=["value"],qt={class:"form-group"},Wt={class:"gender-buttons"},Vt={key:0,class:"error-message"},Ft={class:"compatibility-section"},Jt={class:"compatibility-toggle"},Kt={key:1,class:"person-section second-person"},Qt={class:"form-group"},Xt={class:"custom-date-row"},zt={class:"custom-date-field"},en={class:"custom-date-field"},tn={class:"custom-date-field"},nn={class:"form-group"},sn=["value"],an={class:"form-group"},on={class:"gender-buttons"},rn=["disabled"],ln={__name:"ZiWeiForm",setup(a){const e=pe(),t=[{name:"早子时",range:"00:00-01:00"},{name:"丑时",range:"01:00-03:00"},{name:"寅时",range:"03:00-05:00"},{name:"卯时",range:"05:00-07:00"},{name:"辰时",range:"07:00-09:00"},{name:"巳时",range:"09:00-11:00"},{name:"午时",range:"11:00-13:00"},{name:"未时",range:"13:00-15:00"},{name:"申时",range:"15:00-17:00"},{name:"酉时",range:"17:00-19:00"},{name:"戌时",range:"19:00-21:00"},{name:"亥时",range:"21:00-23:00"},{name:"晚子时",range:"23:00-24:00"}],n=()=>{if(e.enableSecondPerson)if(e.person1.name||e.person2.name){const o=e.person1.name||"第一人",r=e.person2.name||"第二人";e.updatePageTitle(o,r)}else e.resetPageTitle();else e.person1.name?e.updatePageTitle(e.person1.name):e.resetPageTitle()};Se([()=>e.person1.name,()=>e.person2.name,()=>e.enableSecondPerson],()=>{n()},{immediate:!0});const l=async()=>{await e.calculateZiWei()};return(o,r)=>J((I(),P("div",Mt,[r[29]||(r[29]=s("h1",null,"紫薇斗数排盘",-1)),s("div",Nt,[s("div",Yt,[r[15]||(r[15]=s("label",{for:"name"},"姓名（选填）",-1)),J(s("input",{id:"name","onUpdate:modelValue":r[0]||(r[0]=i=>x(e).person1.name=i),type:"text",placeholder:"请输入姓名"},null,512),[[z,x(e).person1.name]])]),s("div",Zt,[s("div",Bt,[r[16]||(r[16]=s("label",{for:"year"},"年",-1)),J(s("input",{id:"year","onUpdate:modelValue":r[1]||(r[1]=i=>x(e).person1.year=i),type:"number",placeholder:"2000",min:"1900",max:"2100",class:"custom-date-input"},null,512),[[z,x(e).person1.year]])]),s("div",Ot,[r[17]||(r[17]=s("label",{for:"month"},"月",-1)),J(s("input",{id:"month","onUpdate:modelValue":r[2]||(r[2]=i=>x(e).person1.month=i),type:"number",placeholder:"1-12",min:"1",max:"12",class:"custom-date-input"},null,512),[[z,x(e).person1.month]])]),s("div",Ut,[r[18]||(r[18]=s("label",{for:"day"},"日",-1)),J(s("input",{id:"day","onUpdate:modelValue":r[3]||(r[3]=i=>x(e).person1.day=i),type:"number",placeholder:"1-31",min:"1",max:"31",class:"custom-date-input"},null,512),[[z,x(e).person1.day]])])]),s("div",Ht,[r[19]||(r[19]=s("label",{for:"hour"},"时辰",-1)),J(s("select",{id:"hour","onUpdate:modelValue":r[4]||(r[4]=i=>x(e).person1.timeIndex=i)},[(I(),P(R,null,q(t,(i,h)=>s("option",{key:h,value:h},y(i.name)+" ("+y(i.range)+") ",9,Rt)),64))],512),[[_e,x(e).person1.timeIndex]])]),s("div",qt,[r[20]||(r[20]=s("label",null,"性别",-1)),s("div",Wt,[s("button",{type:"button",class:W(["gender-button",{selected:x(e).person1.gender==="male"}]),onClick:r[5]||(r[5]=i=>x(e).person1.gender="male")}," 男 ",2),s("button",{type:"button",class:W(["gender-button",{selected:x(e).person1.gender==="female"}]),onClick:r[6]||(r[6]=i=>x(e).person1.gender="female")}," 女 ",2)])])]),x(e).calculationError?(I(),P("div",Vt,y(x(e).calculationError),1)):G("",!0),s("div",Ft,[s("label",Jt,[J(s("input",{type:"checkbox","onUpdate:modelValue":r[7]||(r[7]=i=>x(e).enableSecondPerson=i)},null,512),[[Ne,x(e).enableSecondPerson]]),r[21]||(r[21]=N(" 启用合盘分析 "))])]),x(e).enableSecondPerson?(I(),P("div",Kt,[r[28]||(r[28]=s("h3",null,"第二人信息",-1)),s("div",Qt,[r[22]||(r[22]=s("label",{for:"name2"},"姓名（选填）",-1)),J(s("input",{id:"name2","onUpdate:modelValue":r[8]||(r[8]=i=>x(e).person2.name=i),type:"text",placeholder:"请输入第二人姓名"},null,512),[[z,x(e).person2.name]])]),s("div",Xt,[s("div",zt,[r[23]||(r[23]=s("label",{for:"year2"},"年",-1)),J(s("input",{id:"year2","onUpdate:modelValue":r[9]||(r[9]=i=>x(e).person2.year=i),type:"number",placeholder:"2000",min:"1900",max:"2100",class:"custom-date-input"},null,512),[[z,x(e).person2.year]])]),s("div",en,[r[24]||(r[24]=s("label",{for:"month2"},"月",-1)),J(s("input",{id:"month2","onUpdate:modelValue":r[10]||(r[10]=i=>x(e).person2.month=i),type:"number",placeholder:"1-12",min:"1",max:"12",class:"custom-date-input"},null,512),[[z,x(e).person2.month]])]),s("div",tn,[r[25]||(r[25]=s("label",{for:"day2"},"日",-1)),J(s("input",{id:"day2","onUpdate:modelValue":r[11]||(r[11]=i=>x(e).person2.day=i),type:"number",placeholder:"1-31",min:"1",max:"31",class:"custom-date-input"},null,512),[[z,x(e).person2.day]])])]),s("div",nn,[r[26]||(r[26]=s("label",{for:"hour2"},"时辰",-1)),J(s("select",{id:"hour2","onUpdate:modelValue":r[12]||(r[12]=i=>x(e).person2.timeIndex=i)},[(I(),P(R,null,q(t,(i,h)=>s("option",{key:h,value:h},y(i.name)+" ("+y(i.range)+") ",9,sn)),64))],512),[[_e,x(e).person2.timeIndex]])]),s("div",an,[r[27]||(r[27]=s("label",null,"性别",-1)),s("div",on,[s("button",{type:"button",class:W(["gender-button",{selected:x(e).person2.gender==="male"}]),onClick:r[13]||(r[13]=i=>x(e).person2.gender="male")}," 男 ",2),s("button",{type:"button",class:W(["gender-button",{selected:x(e).person2.gender==="female"}]),onClick:r[14]||(r[14]=i=>x(e).person2.gender="female")}," 女 ",2)])])])):G("",!0),s("button",{class:"primary-button",disabled:!x(e).canCalculate||x(e).isCalculating,onClick:l},y(x(e).isCalculating?"计算中...":"开始排盘"),9,rn)],512)),[[Me,!x(e).hasResults]])}},cn=me(ln,[["__scopeId","data-v-1b651200"]]);const un={class:"ziwei-result-wrapper"},dn={key:0,class:"loading-container"},hn={key:1,class:"error-container"},gn={key:2,class:"result-card"},mn={class:"basic-info-section"},pn={key:0,class:"compatibility-basic-info"},fn={class:"person-basic-info"},yn={class:"basic-info-text"},vn={class:"value"},bn={class:"value"},Sn={class:"value"},_n={class:"value"},$n={class:"value"},In={class:"value"},xn={class:"value"},kn={class:"person-basic-info"},Pn={class:"basic-info-text"},wn={class:"value"},En={class:"value"},An={class:"value"},Tn={class:"value"},Gn={class:"value"},jn={class:"value"},Cn={class:"value"},Dn={key:1},Ln={class:"basic-info-text"},Mn={class:"value"},Nn={class:"value"},Yn={class:"value"},Zn={class:"value"},Bn={class:"value"},On={class:"value"},Un={class:"value"},Hn={class:"value"},Rn={class:"mutagen-container"},qn={class:"mutagen-grid"},Wn={class:"mutagen-item"},Vn={class:"mutagen-star"},Fn={class:"mutagen-item"},Jn={class:"mutagen-star"},Kn={class:"mutagen-item"},Qn={class:"mutagen-star"},Xn={class:"mutagen-item"},zn={class:"mutagen-star"},es={class:"chart-section"},ts={key:0,class:"compatibility-charts"},ns={class:"person-chart-container"},ss={class:"astrolabe-grid compact"},as=["onClick"],os={class:"palace-header"},rs={class:"palace-name"},is={key:0,class:"body-palace-mark"},ls={class:"palace-stems"},cs={class:"palace-stars"},us={class:"palace-details compact"},ds={key:0,class:"changsheng"},hs={key:1,class:"boshi"},gs={key:0,class:"ages"},ms={class:"person-chart-container"},ps={class:"astrolabe-grid compact"},fs=["onClick"],ys={class:"palace-header"},vs={class:"palace-name"},bs={key:0,class:"body-palace-mark"},Ss={class:"palace-stems"},_s={class:"palace-stars"},$s={class:"palace-details compact"},Is={key:0,class:"changsheng"},xs={key:1,class:"boshi"},ks={key:0,class:"ages"},Ps={class:"compatibility-analysis"},ws={class:"compatibility-analysis-content"},Es={key:1,class:"professional-chart-container"},As={class:"astrolabe-grid"},Ts=["onClick"],Gs={class:"palace-header"},js={class:"palace-name"},Cs={key:0,class:"body-palace-mark"},Ds={class:"palace-stems"},Ls={class:"palace-stars"},Ms={class:"palace-details"},Ns={key:0,class:"changsheng"},Ys={key:1,class:"boshi"},Zs={key:2,class:"jiangqian"},Bs={key:0,class:"ages"},Os={key:1,class:"empty-palace"},Us={key:0,class:"detailed-analysis-text"},Hs={class:"analysis-text-section"},Rs={class:"analysis-text-content"},qs={class:"analysis-text-section"},Ws={class:"analysis-text-content"},Vs={class:"analysis-text-section"},Fs={class:"analysis-text-content"},Js={class:"analysis-text-section"},Ks={class:"analysis-text-content"},Qs={class:"palace-modal-header"},Xs={class:"palace-modal-content"},zs={class:"palace-basic-info"},ea={key:0},ta={key:1},na={key:2},sa={key:0,class:"palace-stars-detail"},aa={key:0,class:"star-category"},oa={class:"star-list"},ra={class:"star-name"},ia={key:0,class:"star-brightness"},la={key:1,class:"star-mutagen"},ca={key:1,class:"star-category"},ua={class:"star-list"},da={class:"star-name"},ha={key:0,class:"star-brightness"},ga={key:1,class:"star-mutagen"},ma={key:2,class:"star-category"},pa={class:"star-list"},fa={class:"star-name"},ya={key:0,class:"star-brightness"},va={key:1,class:"star-mutagen"},ba={key:1,class:"palace-analysis"},Sa={class:"palace-analysis-content"},_a={class:"palace-meaning"},$a={class:"palace-star-analysis"},Ia={class:"palace-fortune-analysis"},xa={class:"palace-advice"},ka={class:"palace-other-info"},Pa={key:0},wa={key:1},Ea={key:2},Aa={key:3},Ta={key:4},Ga={__name:"ZiWeiResult",setup(a){const e=pe(),t=se(()=>e.displayData1),n=B(null),l=S=>{const u=["star-item"];return S.type&&u.push(`star-${S.type}`),S.brightness&&u.push(`brightness-${S.brightness}`),S.mutagen&&u.push(`mutagen-${S.mutagen}`),u.join(" ")},o=S=>({化禄:"lu",化权:"quan",化科:"ke",化忌:"ji"})[S]||"",r=S=>{n.value=S},i=()=>{n.value=null},h=()=>{if(!t.value?.palaces)return"未知";const S=t.value.palaces.find(b=>b.name==="命宫");if(!S)return"未知";const p=(S.allStars||[]).filter(b=>b.type==="major");return p.length===0?"无主星":p.map(b=>b.name).join("、")},c=()=>{if(!t.value?.palaces)return"未知";const S=t.value.palaces.find(b=>b.isBodyPalace);if(!S)return"未知";const p=(S.allStars||[]).filter(b=>b.type==="major");return p.length===0?"无主星":p.map(b=>b.name).join("、")},g=()=>{if(!t.value?.palaces)return"未知";const S=t.value.palaces.find(A=>A.name==="命宫");if(!S)return"未知";const u=S.majorStars||[];if(u.length===0)return"平常格局";const p=u.some(A=>["紫微","天府","太阳","武曲"].includes(A.name)),b=u.some(A=>["庙","旺"].includes(A.brightness));return p&&b?"上等格局":p||b?"中等格局":"平常格局"},d=()=>{if(!t.value?.palaces)return"未知";const S=t.value.palaces.find(b=>b.name==="命宫");if(!S)return"未知";const u=S.majorStars||[];if(u.length===0)return"空宫格局";const p=u.map(b=>b.name);return p.includes("紫微")?"帝王格局":p.includes("天府")?"财库格局":p.includes("太阳")?"光明格局":p.includes("武曲")?"财星格局":p.includes("天同")?"福德格局":p.includes("廉贞")?"权威格局":"一般格局"},f=()=>{if(!t.value?.palaces)return[];const S=[];return["命宫","财帛宫","官禄宫","夫妻宫"].forEach(p=>{const b=t.value.palaces.find(A=>A.name===p);if(b&&b.allStars){const A=b.allStars.filter(U=>U.type==="major");if(A.length>0){const U=A.map(Q=>Q.name);let M=_(p,U);S.push({palace:p,stars:U,description:M})}}}),S},_=(S,u)=>{const b={命宫:{紫微:"具有领导才能，天生贵气，适合管理职位",天机:"聪明机智，善于策划，适合智力工作",太阳:"性格开朗，有正义感，适合公职或教育",武曲:"意志坚强，理财能力佳，适合金融业",天同:"性格温和，人缘好，适合服务业",廉贞:"个性刚强，有魄力，适合执法或军警"},财帛宫:{紫微:"财运亨通，有贵人相助，财源广进",武曲:"理财有道，投资眼光佳，财富稳定增长",天府:"财库丰厚，善于积累，晚年富足",太阴:"财运平稳，适合稳健投资"},官禄宫:{紫微:"事业有成，适合领导职位，官运亨通",武曲:"事业稳定，在金融或技术领域有所成就",天机:"适合策划、咨询类工作，智慧型事业",太阳:"适合公职或教育事业，声名远播"},夫妻宫:{紫微:"配偶条件佳，婚姻美满，夫妻恩爱",天同:"夫妻和睦，感情稳定，家庭幸福",太阴:"配偶温柔体贴，感情深厚",天府:"配偶贤能，家庭富足"}}[S]||{};return u.map(U=>b[U]||`${U}星坐守，影响${S}运势`).join("；")||`${u.join("、")}星坐守${S}，需结合整体命盘分析`},$=()=>{if(!t.value?.mutagens||!t.value?.palaces)return[];const S=[],u=t.value.mutagens;return Object.entries(u).forEach(([p,b])=>{if(b&&b!=="无"){const A=k(b),U=w(p,b,A);S.push({type:p,name:U.name,star:b,palace:A||"未知宫位",description:U.description})}}),S},k=S=>{if(!t.value?.palaces)return null;for(const u of t.value.palaces)if((u.allStars||[]).some(b=>b.name===S))return u.name;return null},w=(S,u,p)=>{const b={lu:"化禄",quan:"化权",ke:"化科",ji:"化忌"},A={lu:`${u}化禄在${p}，主财运亨通，此宫位运势佳，有贵人相助`,quan:`${u}化权在${p}，主权威增强，此宫位有掌控力，适合发挥领导才能`,ke:`${u}化科在${p}，主名声显达，此宫位有贵气，利于学业和声誉`,ji:`${u}化忌在${p}，主阻碍较多，此宫位需谨慎，宜化解不利因素`};return{name:b[S]||S,description:A[S]||`${u}${b[S]}的影响需要具体分析`}},m=()=>{const S=t.value?.horoscope?.currentAge||0,p=Math.floor((S-6)/10),b=["命宫","父母宫","福德宫","田宅宫","官禄宫","奴仆宫","迁移宫","疾厄宫","财帛宫","子女宫","夫妻宫","兄弟宫"],A=p%12;return b[A]||"未知"},v=()=>{const S=new Date().getFullYear(),u=t.value?.basicInfo?.birthDate?.year||S,p=S-u,b=["命宫","兄弟宫","夫妻宫","子女宫","财帛宫","疾厄宫","迁移宫","奴仆宫","官禄宫","田宅宫","福德宫","父母宫"],A=p%12;return b[A]||"未知"},T=()=>{const S=t.value?.horoscope?.currentAge||0;return S<30?"青年时期，宜努力学习，积累经验，为未来打好基础。注意身体健康，培养良好习惯。":S<50?"中年时期，事业发展的关键阶段，宜把握机会，稳健前进。注意家庭和事业的平衡。":"成熟时期，宜发挥经验优势，传承智慧，享受人生。注意身体保养，颐养天年。"},L=S=>{if(!S||S.length===0)return[];const u={紫微:10,天机:10,太阳:10,武曲:10,天同:10,廉贞:10,天府:10,太阴:10,贪狼:10,巨门:10,天相:10,天梁:10,七杀:10,破军:10,左辅:8,右弼:8,文昌:8,文曲:8,天魁:8,天钺:8,禄存:7,天马:7,化禄:9,化权:9,化科:9,化忌:9,火星:6,铃星:6,擎羊:6,陀罗:6,地空:5,地劫:5};return S.map(b=>({...b,priority:u[b.name]||(b.mutagen?9:b.type==="major"?10:3)})).sort((b,A)=>A.priority-b.priority).slice(0,6)},F=()=>{if(!e.enableSecondPerson||!e.displayData2)return{};const S=e.displayData1,u=e.displayData2,p=D(S,u),b=O(S,u),A=K(S,u),U=j(S,u);return{mingGong:p,wuxing:b,sihua:A,shenGong:U}},V=S=>({mingGong:"命宫关系",wuxing:"五行配合",sihua:"四化互动",shenGong:"身宫关系"})[S]||S,D=(S,u)=>{const p=S.basicInfo?.soulPalace||"未知",b=u.basicInfo?.soulPalace||"未知";if(p==="未知"||b==="未知")return"命宫信息不完整，无法分析";if(p===b)return`双方命宫同在${p}，性格相近，容易理解对方`;{const A=E(p,b);return`命宫分别在${p}和${b}，${A}`}},O=(S,u)=>{const p=S.basicInfo?.fiveElementsClass||"未知",b=u.basicInfo?.fiveElementsClass||"未知";return p==="未知"||b==="未知"?"五行局信息不完整，无法分析":p===b?`双方同为${p}，五行相同，能量共振`:`五行局分别为${p}和${b}，需要互补平衡`},K=(S,u)=>{const p=S.mutagens||{},b=u.mutagens||{},A=[],U={lu:"化禄",quan:"化权",ke:"化科",ji:"化忌"};return Object.keys(p).forEach(M=>{const Q=p[M],ne=b[M],H=U[M]||M;Q&&ne&&Q===ne&&A.push(`双方${H}星同为${Q}，产生共鸣`)}),A.length===0?"四化星互动平和，无明显冲突":A.join("；")},j=(S,u)=>{const p=S.basicInfo?.bodyPalace||"未知",b=u.basicInfo?.bodyPalace||"未知";if(p==="未知"||b==="未知")return"身宫信息不完整，无法分析";if(p===b)return`双方身宫同在${p}，价值观念相近，容易产生共鸣`;{const A=E(p,b);return`身宫分别在${p}和${b}，${A}`}},E=(S,u)=>{const p={"命宫-财帛":"财运与性格相关","命宫-事业":"事业发展与个性匹配","命宫-夫妻":"感情与性格互补"},b=`${S}-${u}`,A=`${u}-${S}`;return p[b]||p[A]||"宫位关系需要通过具体星耀配置进一步分析"},C=S=>!S||!S.allStars?[]:S.allStars,Y=(S,u)=>!S||!S.allStars?[]:S.allStars.filter(p=>p.type===u),ae=S=>({命宫:"代表个人的性格特质、天赋才能、人生格局、基本运势和先天禀赋，是紫薇斗数中最重要的宫位",兄弟宫:"代表兄弟姐妹关系、朋友交往、同事关系、合作伙伴和人际网络的状况",夫妻宫:"代表婚姻感情、配偶关系、恋爱运势、感情模式和异性缘分",子女宫:"代表子女关系、生育能力、教育子女、创造力和部属关系",财帛宫:"代表财运状况、理财能力、赚钱方式、财富积累和金钱观念",疾厄宫:"代表身体健康、疾病倾向、体质强弱、意外灾厄和心理状态",迁移宫:"代表外出运势、变动机会、环境适应、贵人运和远方发展",奴仆宫:"代表部属关系、朋友助力、社交能力、人缘状况和团队合作",官禄宫:"代表事业发展、工作能力、职业方向、社会地位和成就表现",田宅宫:"代表不动产运势、居住环境、家庭状况、祖业传承和生活品质",福德宫:"代表精神享受、兴趣爱好、福分厚薄、心境状态和晚年运势",父母宫:"代表父母关系、长辈缘分、上司关系、学业状况和文书运势"})[S]||"此宫位的具体含义需要结合整体命盘分析",ie=S=>{if(!S||!S.allStars)return"此宫位暂无星耀坐守。";const u=S.allStars.filter(M=>M.type==="major"),p=S.allStars.filter(M=>M.type==="minor");S.allStars.filter(M=>M.mutagen);let b=[];if(u.length>0){const M=u.map(Q=>Q.name).join("、");b.push(`${M}主星坐守`),u.forEach(Q=>{const ne=ee(Q.name,S.name);ne&&b.push(ne)})}const A=p.filter(M=>["左辅","右弼","文昌","文曲","天魁","天钺","禄存","天马"].includes(M.name));A.length>0&&b.push(`有${A.map(M=>M.name).join("、")}等吉星相助，增强宫位正面能量`);const U=p.filter(M=>["火星","铃星","擎羊","陀罗","地空","地劫"].includes(M.name));return U.length>0&&b.push(`有${U.map(M=>M.name).join("、")}等煞星同宫，需要化解不利影响`),u.length===0&&b.push("此宫位为空宫，需借对宫星耀来论断，或依靠后天努力来充实"),b.length>0?b.join("，")+"。":"此宫位星耀配置需要结合整体命盘分析。"},ee=(S,u)=>({紫微:{命宫:"具有帝王之相，天生领导才能，性格高贵，适合管理职位",财帛宫:"财运亨通，有贵人相助，财源广进，善于理财",官禄宫:"事业有成，适合领导职位，官运亨通，社会地位高",夫妻宫:"配偶条件佳，婚姻美满，夫妻恩爱，感情稳定"},天机:{命宫:"聪明机智，善于策划，反应敏捷，适合智力工作",财帛宫:"理财有方，投资眼光独到，财运变化较大",官禄宫:"适合策划、咨询类工作，智慧型事业发展佳",兄弟宫:"兄弟朋友聪明，关系变化较多，需要用智慧维系"},太阳:{命宫:"性格开朗，有正义感，光明磊落，适合公职或教育",财帛宫:"财运光明，赚钱光明正大，适合阳光行业",官禄宫:"适合公职或教育事业，声名远播，受人尊敬",父母宫:"与父亲缘分深厚，父亲对自己影响较大"},武曲:{命宫:"意志坚强，个性刚毅，理财能力佳，适合金融业",财帛宫:"理财有道，投资眼光佳，财富稳定增长，善于积累",官禄宫:"事业稳定，在金融或技术领域有所成就",夫妻宫:"配偶性格坚强，夫妻关系需要磨合"},天同:{命宫:"性格温和，人缘好，福分厚，适合服务业",财帛宫:"财运平稳，不愁吃穿，适合稳健投资",夫妻宫:"夫妻和睦，感情稳定，家庭幸福",福德宫:"精神享受丰富，心境平和，晚年福分厚"},廉贞:{命宫:"个性刚强，有魄力，适合执法或军警工作",财帛宫:"财运起伏较大，需要谨慎理财",官禄宫:"适合执法、军警或竞争性行业",疾厄宫:"需要注意心血管疾病，保持情绪稳定"}})[S]?.[u]||null,he=S=>{if(!S||!S.allStars)return"运势平平，需要后天努力。";const u=S.allStars.filter(H=>H.mutagen),p=S.allStars.filter(H=>H.type==="major"),b=S.allStars.filter(H=>H.type==="minor");let A=[];u.length>0&&u.forEach(H=>{switch(H.mutagen){case"禄":A.push(`${H.name}化禄带来财运和贵人运，此宫位运势佳`);break;case"权":A.push(`${H.name}化权增强掌控力，适合发挥主导作用`);break;case"科":A.push(`${H.name}化科带来名声和贵气，利于学业和声誉`);break;case"忌":A.push(`${H.name}化忌带来阻碍，需要谨慎处理，化解不利因素`);break}});const U=p.filter(H=>["庙","旺"].includes(H.brightness)),M=p.filter(H=>["落陷","不得地"].includes(H.brightness));U.length>0&&A.push("主星庙旺，宫位能量强，运势较佳"),M.length>0&&A.push("主星失陷，宫位能量弱，需要后天加强");const Q=b.filter(H=>["左辅","右弼","文昌","文曲","天魁","天钺"].includes(H.name)),ne=b.filter(H=>["火星","铃星","擎羊","陀罗","地空","地劫"].includes(H.name));return Q.length>ne.length?A.push("吉星多于煞星，整体运势向好"):ne.length>Q.length&&A.push("煞星较多，需要谨慎行事，化解不利"),A.length>0?A.join("，")+"。":"运势需要结合大运流年综合判断。"},oe=S=>{if(!S)return"建议结合整体命盘制定人生规划。";const u=S.name,p=S.allStars?.filter(M=>M.type==="major")||[],b=S.allStars?.filter(M=>M.mutagen)||[];let A=[];const U={命宫:"注重个人修养和品格培养，发挥天赋才能，建立正确的人生观",兄弟宫:"维护兄弟朋友关系，善于合作，建立良好的人际网络",夫妻宫:"用心经营感情，理解包容，建立和谐的婚姻关系",子女宫:"关爱子女教育，发挥创造力，培养良好的师生或上下级关系",财帛宫:"合理规划财务，稳健投资，培养正确的金钱观念",疾厄宫:"注重身体健康，预防疾病，保持良好的生活习惯",迁移宫:"把握变动机会，适应环境变化，善用贵人助力",奴仆宫:"善待部属朋友，建立互信关系，发挥团队合作精神",官禄宫:"努力工作，提升能力，选择适合的职业发展方向",田宅宫:"合理置业，改善居住环境，维护家庭和睦",福德宫:"培养兴趣爱好，保持心境平和，积累福德",父母宫:"孝敬父母长辈，尊师重道，处理好上下级关系"};return A.push(U[u]||"需要根据具体情况制定相应策略"),b.some(M=>M.mutagen==="忌")&&A.push("此宫位有化忌星，需要特别谨慎，多行善事化解不利"),b.some(M=>M.mutagen==="禄")&&A.push("此宫位有化禄星，可以积极发展，把握机会"),p.length===0&&A.push("空宫需要借对宫星耀，或通过后天努力来充实此宫位"),A.join("；")+"。"};return(S,u)=>(I(),P("div",un,[x(e).isCalculating?(I(),P("div",dn,u[1]||(u[1]=[s("div",{class:"loading-indicator"},"计算中...",-1)]))):x(e).calculationError?(I(),P("div",hn,[s("p",null,"错误: "+y(x(e).calculationError),1)])):x(e).hasResults?(I(),P("div",gn,[s("div",mn,[x(e).enableSecondPerson&&x(e).displayData2?(I(),P("div",pn,[s("div",fn,[s("h4",null,y(x(e).person1.name||"第一人")+"的基本信息",1),s("div",yn,[s("p",null,[u[2]||(u[2]=s("span",{class:"label"},"性别",-1)),s("span",vn,y(x(e).displayData1?.basicInfo?.gender||"未知"),1)]),s("p",null,[u[3]||(u[3]=s("span",{class:"label"},"阳历",-1)),s("span",bn,y(x(e).displayData1?.basicInfo?.birthDate?.solar||"未知"),1)]),s("p",null,[u[4]||(u[4]=s("span",{class:"label"},"农历",-1)),s("span",Sn,y(x(e).displayData1?.basicInfo?.birthDate?.lunar||"未知"),1)]),s("p",null,[u[5]||(u[5]=s("span",{class:"label"},"时辰",-1)),s("span",_n,y(x(e).displayData1?.basicInfo?.time||"未知")+" "+y(x(e).displayData1?.basicInfo?.timeRange||""),1)]),s("p",null,[u[6]||(u[6]=s("span",{class:"label"},"五行局",-1)),s("span",$n,y(x(e).displayData1?.basicInfo?.fiveElementsClass||"未知"),1)]),s("p",null,[u[7]||(u[7]=s("span",{class:"label"},"命宫",-1)),s("span",In,y(x(e).displayData1?.basicInfo?.soulPalace||"未知"),1)]),s("p",null,[u[8]||(u[8]=s("span",{class:"label"},"身宫",-1)),s("span",xn,y(x(e).displayData1?.basicInfo?.bodyPalace||"未知"),1)])])]),s("div",kn,[s("h4",null,y(x(e).person2.name||"第二人")+"的基本信息",1),s("div",Pn,[s("p",null,[u[9]||(u[9]=s("span",{class:"label"},"性别",-1)),s("span",wn,y(x(e).displayData2?.basicInfo?.gender||"未知"),1)]),s("p",null,[u[10]||(u[10]=s("span",{class:"label"},"阳历",-1)),s("span",En,y(x(e).displayData2?.basicInfo?.birthDate?.solar||"未知"),1)]),s("p",null,[u[11]||(u[11]=s("span",{class:"label"},"农历",-1)),s("span",An,y(x(e).displayData2?.basicInfo?.birthDate?.lunar||"未知"),1)]),s("p",null,[u[12]||(u[12]=s("span",{class:"label"},"时辰",-1)),s("span",Tn,y(x(e).displayData2?.basicInfo?.time||"未知")+" "+y(x(e).displayData2?.basicInfo?.timeRange||""),1)]),s("p",null,[u[13]||(u[13]=s("span",{class:"label"},"五行局",-1)),s("span",Gn,y(x(e).displayData2?.basicInfo?.fiveElementsClass||"未知"),1)]),s("p",null,[u[14]||(u[14]=s("span",{class:"label"},"命宫",-1)),s("span",jn,y(x(e).displayData2?.basicInfo?.soulPalace||"未知"),1)]),s("p",null,[u[15]||(u[15]=s("span",{class:"label"},"身宫",-1)),s("span",Cn,y(x(e).displayData2?.basicInfo?.bodyPalace||"未知"),1)])])])])):(I(),P("div",Dn,[s("div",Ln,[s("p",null,[u[16]||(u[16]=s("span",{class:"label"},"姓名",-1)),s("span",Mn,y(t.value?.basicInfo?.name||"未填写"),1)]),s("p",null,[u[17]||(u[17]=s("span",{class:"label"},"性别",-1)),s("span",Nn,y(t.value?.basicInfo?.gender||"未知"),1)]),s("p",null,[u[18]||(u[18]=s("span",{class:"label"},"阳历",-1)),s("span",Yn,y(t.value?.basicInfo?.birthDate?.solar||"未知"),1)]),s("p",null,[u[19]||(u[19]=s("span",{class:"label"},"农历",-1)),s("span",Zn,y(t.value?.basicInfo?.birthDate?.lunar||"未知"),1)]),s("p",null,[u[20]||(u[20]=s("span",{class:"label"},"时辰",-1)),s("span",Bn,y(t.value?.basicInfo?.time||"未知")+" "+y(t.value?.basicInfo?.timeRange||""),1)]),s("p",null,[u[21]||(u[21]=s("span",{class:"label"},"五行局",-1)),s("span",On,y(t.value?.basicInfo?.fiveElementsClass||"未知"),1)]),s("p",null,[u[22]||(u[22]=s("span",{class:"label"},"命宫",-1)),s("span",Un,y(t.value?.basicInfo?.soulPalace||"未知"),1)]),s("p",null,[u[23]||(u[23]=s("span",{class:"label"},"身宫",-1)),s("span",Hn,y(t.value?.basicInfo?.bodyPalace||"未知"),1)])]),s("div",Rn,[u[28]||(u[28]=s("h4",null,"四化信息",-1)),s("div",qn,[s("div",Wn,[u[24]||(u[24]=s("span",{class:"mutagen-type lu"},"化禄",-1)),s("span",Vn,y(t.value?.mutagens?.lu||"无"),1)]),s("div",Fn,[u[25]||(u[25]=s("span",{class:"mutagen-type quan"},"化权",-1)),s("span",Jn,y(t.value?.mutagens?.quan||"无"),1)]),s("div",Kn,[u[26]||(u[26]=s("span",{class:"mutagen-type ke"},"化科",-1)),s("span",Qn,y(t.value?.mutagens?.ke||"无"),1)]),s("div",Xn,[u[27]||(u[27]=s("span",{class:"mutagen-type ji"},"化忌",-1)),s("span",zn,y(t.value?.mutagens?.ji||"无"),1)])])])]))]),s("div",es,[u[30]||(u[30]=s("h3",{class:"chart-title"},"星盘信息",-1)),x(e).enableSecondPerson&&x(e).displayData2?(I(),P("div",ts,[s("div",ns,[s("h3",null,y(x(e).person1.name||"第一人")+"的紫薇星盘",1),s("div",ss,[(I(!0),P(R,null,q(x(e).displayData1.palaces,p=>(I(),P("div",{key:p.name,class:W(["palace-cell",{"body-palace":p.isBodyPalace}]),onClick:b=>r(p)},[s("div",os,[s("span",rs,y(p.name),1),p.isBodyPalace?(I(),P("span",is,"身")):G("",!0)]),s("div",ls,y(p.heavenlyStem)+y(p.earthlyBranch),1),s("div",cs,[(I(!0),P(R,null,q(L(p.allStars||[]),b=>(I(),P("div",{key:b.name,class:W(l(b))},[N(y(b.name)+" ",1),b.mutagen?(I(),P("span",{key:0,class:W(["mutagen",o(b.mutagen)])},y(b.mutagen),3)):G("",!0)],2))),128))]),s("div",us,[p.changsheng12?(I(),P("div",ds,y(p.changsheng12),1)):G("",!0),p.boshi12?(I(),P("div",hs,y(p.boshi12),1)):G("",!0)]),p.ages&&p.ages.length>0?(I(),P("div",gs,y(p.ages.join("-"))+"岁 ",1)):G("",!0)],10,as))),128))])]),s("div",ms,[s("h3",null,y(x(e).person2.name||"第二人")+"的紫薇星盘",1),s("div",ps,[(I(!0),P(R,null,q(x(e).displayData2.palaces,p=>(I(),P("div",{key:p.name,class:W(["palace-cell",{"body-palace":p.isBodyPalace}]),onClick:b=>r(p)},[s("div",ys,[s("span",vs,y(p.name),1),p.isBodyPalace?(I(),P("span",bs,"身")):G("",!0)]),s("div",Ss,y(p.heavenlyStem)+y(p.earthlyBranch),1),s("div",_s,[(I(!0),P(R,null,q(L(p.allStars||[]),b=>(I(),P("div",{key:b.name,class:W(l(b))},[N(y(b.name)+" ",1),b.mutagen?(I(),P("span",{key:0,class:W(["mutagen",o(b.mutagen)])},y(b.mutagen),3)):G("",!0)],2))),128))]),s("div",$s,[p.changsheng12?(I(),P("div",Is,y(p.changsheng12),1)):G("",!0),p.boshi12?(I(),P("div",xs,y(p.boshi12),1)):G("",!0)]),p.ages&&p.ages.length>0?(I(),P("div",ks,y(p.ages.join("-"))+"岁 ",1)):G("",!0)],10,fs))),128))])]),s("div",Ps,[u[29]||(u[29]=s("h4",null,"合盘分析",-1)),s("div",ws,[(I(!0),P(R,null,q(F(),(p,b)=>(I(),P("div",{key:b,class:"compatibility-analysis-item"},[s("p",null,[s("strong",null,y(V(b))+"：",1),N(y(p),1)])]))),128))])])])):(I(),P("div",Es,[s("div",As,[(I(!0),P(R,null,q(t.value?.palaces||[],p=>(I(),P("div",{key:p.name,class:W(["palace-cell",{"body-palace":p.isBodyPalace}]),onClick:b=>r(p)},[s("div",Gs,[s("span",js,y(p.name),1),p.isBodyPalace?(I(),P("span",Cs,"身")):G("",!0)]),s("div",Ds,y(p.heavenlyStem)+y(p.earthlyBranch),1),s("div",Ls,[(I(!0),P(R,null,q(p.allStars||[],b=>(I(),P("div",{key:b.name,class:W(l(b))},[N(y(b.name)+" ",1),b.mutagen?(I(),P("span",{key:0,class:W(["mutagen",o(b.mutagen)])},y(b.mutagen),3)):G("",!0)],2))),128))]),s("div",Ms,[p.changsheng12?(I(),P("div",Ns,y(p.changsheng12),1)):G("",!0),p.boshi12?(I(),P("div",Ys,y(p.boshi12),1)):G("",!0),p.jiangqian12?(I(),P("div",Zs,y(p.jiangqian12),1)):G("",!0)]),p.ages&&p.ages.length>0?(I(),P("div",Bs,y(p.ages.join("-"))+"岁 ",1)):G("",!0),p.isEmpty?(I(),P("div",Os," 空宫 ")):G("",!0)],10,Ts))),128))])]))]),x(e).enableSecondPerson?G("",!0):(I(),P("div",Us,[s("div",Hs,[u[35]||(u[35]=s("h4",null,"命盘概述",-1)),s("div",Rs,[s("p",null,[u[31]||(u[31]=s("strong",null,"命主星：",-1)),N(y(h()),1)]),s("p",null,[u[32]||(u[32]=s("strong",null,"身主星：",-1)),N(y(c()),1)]),s("p",null,[u[33]||(u[33]=s("strong",null,"命格层次：",-1)),N(y(g()),1)]),s("p",null,[u[34]||(u[34]=s("strong",null,"格局特征：",-1)),N(y(d()),1)])])]),s("div",qs,[u[36]||(u[36]=s("h4",null,"主要星耀分析",-1)),s("div",Ws,[(I(!0),P(R,null,q(f(),p=>(I(),P("div",{key:p.palace,class:"star-analysis-text"},[s("p",null,[s("strong",null,y(p.palace)+"：",1),N(y(p.stars.join("、"))+"星坐守。"+y(p.description),1)])]))),128))])]),s("div",Vs,[u[37]||(u[37]=s("h4",null,"四化详解",-1)),s("div",Fs,[(I(!0),P(R,null,q($(),p=>(I(),P("div",{key:p.type,class:"mutagen-analysis-text"},[s("p",null,[s("strong",null,y(p.name)+"：",1),N(y(p.star)+"星在"+y(p.palace)+"。"+y(p.description),1)])]))),128))])]),s("div",Js,[u[42]||(u[42]=s("h4",null,"运势概况",-1)),s("div",Ks,[s("p",null,[u[38]||(u[38]=s("strong",null,"当前年龄：",-1)),N(y(t.value?.horoscope?.currentAge||0)+"岁",1)]),s("p",null,[u[39]||(u[39]=s("strong",null,"大运宫位：",-1)),N(y(m()),1)]),s("p",null,[u[40]||(u[40]=s("strong",null,"流年宫位：",-1)),N(y(v()),1)]),s("p",null,[u[41]||(u[41]=s("strong",null,"运势建议：",-1)),N(y(T()),1)])])])])),(I(),Ye(Be,{to:"body"},[n.value?(I(),P("div",{key:0,class:"palace-modal-overlay",onClick:i},[s("div",{class:"palace-modal",onClick:u[0]||(u[0]=Ze(()=>{},["stop"]))},[s("div",Qs,[s("h3",null,y(n.value.name)+"详情",1),s("button",{class:"close-button",onClick:i},"×")]),s("div",Xs,[s("div",zs,[s("p",null,[u[43]||(u[43]=s("strong",null,"宫位：",-1)),N(y(n.value.name),1)]),s("p",null,[u[44]||(u[44]=s("strong",null,"干支：",-1)),N(y(n.value.heavenlyStem)+y(n.value.earthlyBranch),1)]),n.value.isBodyPalace?(I(),P("p",ea,u[45]||(u[45]=[s("strong",null,"身宫",-1)]))):G("",!0),n.value.isEmpty?(I(),P("p",ta,u[46]||(u[46]=[s("strong",null,"空宫",-1)]))):G("",!0),n.value.ages&&n.value.ages.length>0?(I(),P("p",na,[u[47]||(u[47]=s("strong",null,"年龄：",-1)),N(y(n.value.ages.join("-"))+"岁 ",1)])):G("",!0)]),C(n.value).length>0?(I(),P("div",sa,[u[48]||(u[48]=s("h4",null,"星耀详情",-1)),Y(n.value,"major").length>0?(I(),P("div",aa,[s("h5",null,"主星 ("+y(Y(n.value,"major").length)+"颗)",1),s("div",oa,[(I(!0),P(R,null,q(Y(n.value,"major"),p=>(I(),P("div",{key:p.name,class:"star-detail"},[s("span",ra,y(p.name),1),p.brightness?(I(),P("span",ia,y(p.brightness),1)):G("",!0),p.mutagen?(I(),P("span",la,y(p.mutagen),1)):G("",!0)]))),128))])])):G("",!0),Y(n.value,"minor").length>0?(I(),P("div",ca,[s("h5",null,"辅星 ("+y(Y(n.value,"minor").length)+"颗)",1),s("div",ua,[(I(!0),P(R,null,q(Y(n.value,"minor"),p=>(I(),P("div",{key:p.name,class:"star-detail"},[s("span",da,y(p.name),1),p.brightness?(I(),P("span",ha,y(p.brightness),1)):G("",!0),p.mutagen?(I(),P("span",ga,y(p.mutagen),1)):G("",!0)]))),128))])])):G("",!0),Y(n.value,"adjective").length>0?(I(),P("div",ma,[s("h5",null,"杂耀 ("+y(Y(n.value,"adjective").length)+"颗)",1),s("div",pa,[(I(!0),P(R,null,q(Y(n.value,"adjective"),p=>(I(),P("div",{key:p.name,class:"star-detail"},[s("span",fa,y(p.name),1),p.brightness?(I(),P("span",ya,y(p.brightness),1)):G("",!0),p.mutagen?(I(),P("span",va,y(p.mutagen),1)):G("",!0)]))),128))])])):G("",!0)])):G("",!0),n.value?(I(),P("div",ba,[u[52]||(u[52]=s("h4",null,"宫位分析",-1)),s("div",Sa,[s("div",_a,[s("p",null,[s("strong",null,y(n.value.name)+"含义：",1),N(y(ae(n.value.name)),1)])]),s("div",$a,[s("p",null,[u[49]||(u[49]=s("strong",null,"星耀影响：",-1)),N(y(ie(n.value)),1)])]),s("div",Ia,[s("p",null,[u[50]||(u[50]=s("strong",null,"运势分析：",-1)),N(y(he(n.value)),1)])]),s("div",xa,[s("p",null,[u[51]||(u[51]=s("strong",null,"建议指导：",-1)),N(y(oe(n.value)),1)])])])])):G("",!0),s("div",ka,[u[58]||(u[58]=s("h4",null,"其他信息",-1)),n.value.changsheng12?(I(),P("p",Pa,[u[53]||(u[53]=s("strong",null,"长生十二神：",-1)),N(y(n.value.changsheng12),1)])):G("",!0),n.value.boshi12?(I(),P("p",wa,[u[54]||(u[54]=s("strong",null,"博士十二神：",-1)),N(y(n.value.boshi12),1)])):G("",!0),n.value.jiangqian12?(I(),P("p",Ea,[u[55]||(u[55]=s("strong",null,"将前十二神：",-1)),N(y(n.value.jiangqian12),1)])):G("",!0),n.value.suiqian12?(I(),P("p",Aa,[u[56]||(u[56]=s("strong",null,"岁前十二神：",-1)),N(y(n.value.suiqian12),1)])):G("",!0),n.value.decadal?(I(),P("p",Ta,[u[57]||(u[57]=s("strong",null,"大运：",-1)),N(y(n.value.decadal),1)])):G("",!0)])])])])):G("",!0)]))])):G("",!0)]))}},Te=me(Ga,[["__scopeId","data-v-0a28dbda"]]);const ja={key:0,class:"ai-chat-container"},Ca={class:"question-options"},Da={class:"question-buttons-container"},La={class:"question-buttons"},Ma=["onClick"],Na={key:0,class:"custom-question"},Ya={key:1,class:"error-message"},Za=["disabled"],Ba=["innerHTML"],Oa={key:0,class:"thinking-indicator"},Ua={key:1,class:"continue-explore"},Ha={key:0,class:"suggested-questions"},Ra={class:"suggestion-buttons"},qa=["onClick","disabled"],Wa={class:"follow-up-section"},Va={class:"follow-up-input"},Fa=["disabled"],Ja=["disabled"],Ka={class:"quick-actions"},Qa=["disabled"],Xa=["disabled"],za=["disabled"],eo=["disabled"],to={__name:"AIChat-zw",setup(a){const e=pe(),t=B(null),n=B("");new qe(t);const l=B(!1);B(null);const o=B(null),r=B(null),i=[{id:"ai-personality",text:"性格特质",type:"personality"},{id:"ai-career-fortune",text:"事业运势",type:"career"},{id:"ai-wealth-luck",text:"财运分析",type:"wealth"},{id:"ai-love-marriage",text:"感情婚姻",type:"love"},{id:"ai-health-body",text:"健康状况",type:"health"},{id:"ai-interpersonal",text:"人际关系",type:"interpersonal"},{id:"ai-study-exam",text:"学业考试",type:"study"},{id:"ai-family-children",text:"家庭子女",type:"family"},{id:"ai-travel-migration",text:"迁移出行",type:"travel"},{id:"ai-custom",text:"自定义问题",type:"custom"}],h=B([]);B(!1);const c=B(""),g=B(""),d=B(""),f=B(!1),_=se(()=>i),$=se(()=>f.value?d.value.trim().length>0:g.value!==""),k=se(()=>{if(!e.aiResponse)return"";const j=e.aiResponse.replace(/^---+$/gm,"");return Ve.parse(j)}),w=j=>{g.value=j.id,f.value=j.type==="custom",j.type!=="custom"&&(d.value="")},m=async()=>{let j="",E="custom";if(f.value)j=d.value.trim(),E="custom";else{const C=_.value.find(Y=>Y.id===g.value);C&&(j=C.text,E=C.type)}j&&(n.value=j,O(),await e.askAI(j,E))},v=async j=>{n.value=j,O(),await e.askAI(j,"custom",!0)},T=async()=>{if(!c.value.trim())return;const j=c.value.trim();c.value="",n.value=j,O(),await e.askAI(j,"custom",!0)},L=async()=>{const j=`请对我的${n.value||"紫薇斗数分析"}进行更详细深入的分析，包括具体的时间节点和注意事项`;n.value=j,await e.askAI(j,"custom")},F=async()=>{const j="根据我的紫薇斗数，分析我在未来一年的运势变化，包括每个月的重点关注事项";n.value=j,await e.askAI(j,"custom")},V=async()=>{const j="基于我的紫薇斗数分析，请给出具体的改善建议和行动指导";n.value=j,await e.askAI(j,"custom")},D=async()=>{if(!e.aiResponse){t.value&&t.value.addToast("暂无AI回答内容可复制","warning","",3e3);return}try{const j=new Date().toLocaleString("zh-CN");let E=`紫薇斗数分析结果
`;E+=`生成时间：${j}
`,E+=`${"=".repeat(30)}

`,E+=`问题：${n.value||"紫薇斗数分析"}

`,E+=`回答：
${e.aiResponse.replace(/<[^>]*>/g,"").replace(/&nbsp;/g," ")}

`,E+=`${"=".repeat(30)}
`,E+=`来源：紫薇排盘系统
`,await navigator.clipboard.writeText(E),t.value&&t.value.addToast("AI分析结果已复制到剪贴板","success","",3e3)}catch(j){console.error("复制失败:",j),t.value&&t.value.addToast("复制失败，请手动选择复制","error","",3e3)}},O=()=>{l.value=!0},K=()=>{window.scrollTo({top:document.body.scrollHeight,behavior:"smooth"})};return Se(()=>e.isAIThinking,(j,E)=>{E&&!j&&e.aiResponse&&e.aiResponse.trim()&&setTimeout(()=>{K()},500)}),je(()=>{}),Oe(()=>{r.value&&clearTimeout(r.value)}),(j,E)=>x(e).hasResults?(I(),P("div",ja,[s("div",Ca,[E[2]||(E[2]=s("h3",null,"AI 紫薇斗数分析",-1)),s("div",Da,[s("div",La,[(I(!0),P(R,null,q(_.value,C=>(I(),P("button",{key:C.id,class:W(["question-button",{selected:g.value===C.id}]),onClick:Y=>w(C)},y(C.text),11,Ma))),128))])]),f.value?(I(),P("div",Na,[J(s("input",{"onUpdate:modelValue":E[0]||(E[0]=C=>d.value=C),type:"text",placeholder:"请输入您的问题",onKeyup:$e(m,["enter"])},null,544),[[z,d.value]])])):G("",!0),x(e).aiError?(I(),P("div",Ya,y(x(e).aiError),1)):G("",!0),s("button",{class:W(["primary-button ai-button",{thinking:x(e).isAIThinking}]),disabled:!$.value||x(e).isAIThinking,onClick:m},y(x(e).isAIThinking?"AI 思考中...":"向 AI 提问"),11,Za)]),x(e).aiResponse||x(e).isAIThinking?(I(),P("div",{key:0,class:"ai-response",ref_key:"aiResponseRef",ref:o},[E[4]||(E[4]=s("h3",null,"AI 分析结果",-1)),s("div",{class:"response-content",innerHTML:k.value},null,8,Ba),x(e).isAIThinking?(I(),P("div",Oa,E[3]||(E[3]=[s("div",{class:"thinking-dots"},[s("span"),s("span"),s("span")],-1)]))):G("",!0)],512)):G("",!0),x(e).aiResponse&&!x(e).isAIThinking?(I(),P("div",Ua,[E[6]||(E[6]=s("h3",null,"继续探索",-1)),h.value.length>0?(I(),P("div",Ha,[E[5]||(E[5]=s("h4",null,"智能建议",-1)),s("div",Ra,[(I(!0),P(R,null,q(h.value,(C,Y)=>(I(),P("button",{key:Y,onClick:ae=>v(C),class:"suggested-question",disabled:x(e).isAIThinking},y(C),9,qa))),128))])])):G("",!0),s("div",Wa,[s("div",Va,[J(s("input",{"onUpdate:modelValue":E[1]||(E[1]=C=>c.value=C),type:"text",placeholder:"继续询问相关问题...",onKeypress:$e(T,["enter"]),disabled:x(e).isAIThinking},null,40,Fa),[[z,c.value]]),s("button",{onClick:T,disabled:!c.value.trim()||x(e).isAIThinking},y(x(e).isAIThinking?"发送中...":"发送"),9,Ja)])]),s("div",Ka,[s("button",{class:"action-btn",onClick:L,disabled:x(e).isAIThinking}," 📊 详细分析 ",8,Qa),s("button",{class:"action-btn",onClick:F,disabled:x(e).isAIThinking}," 📅 时间运势 ",8,Xa),s("button",{class:"action-btn",onClick:V,disabled:x(e).isAIThinking}," 💡 改善建议 ",8,za),s("button",{class:"action-btn",onClick:D,disabled:!x(e).aiResponse}," 📋 复制结果 ",8,eo)])])):G("",!0),re(We,{ref_key:"toastRef",ref:t},null,512)])):G("",!0)}},Ge=me(to,[["__scopeId","data-v-e243e002"]]);const no={class:"ziwei-view"},so={key:0,class:"welcome-section fade-in"},ao={key:1,class:"results-section fade-in"},oo={class:"desktop-layout"},ro={class:"left-panel"},io={class:"right-panel"},lo={class:"mobile-layout"},co={__name:"ZiWeiView",setup(a){const e=pe();return je(()=>{e.resetPageTitle(),e.restoreDataFromUrl(),console.log("紫薇斗数页面已加载")}),(t,n)=>(I(),P("div",no,[x(e).hasResults?G("",!0):(I(),P("div",so,n[0]||(n[0]=[Ue('<div class="welcome-content" data-v-4bb2029c><div class="welcome-icon" data-v-4bb2029c><svg viewBox="0 0 100 100" class="star-icon" data-v-4bb2029c><circle cx="50" cy="50" r="45" fill="none" stroke="url(#gradient)" stroke-width="2" data-v-4bb2029c></circle><circle cx="50" cy="50" r="3" fill="url(#gradient)" data-v-4bb2029c></circle><circle cx="50" cy="20" r="2" fill="url(#gradient)" data-v-4bb2029c></circle><circle cx="80" cy="50" r="2" fill="url(#gradient)" data-v-4bb2029c></circle><circle cx="50" cy="80" r="2" fill="url(#gradient)" data-v-4bb2029c></circle><circle cx="20" cy="50" r="2" fill="url(#gradient)" data-v-4bb2029c></circle><defs data-v-4bb2029c><linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%" data-v-4bb2029c><stop offset="0%" style="stop-color:#667eea;" data-v-4bb2029c></stop><stop offset="100%" style="stop-color:#764ba2;" data-v-4bb2029c></stop></linearGradient></defs></svg></div><h2 class="welcome-title" data-v-4bb2029c>探索您的紫薇命盘</h2><p class="welcome-description" data-v-4bb2029c> 紫薇斗数是中国古代天文学与命理学的结晶，通过分析您的出生时间， 为您揭示性格特质、运势走向和人生机遇。 </p><div class="features-grid" data-v-4bb2029c><div class="feature-item" data-v-4bb2029c><div class="feature-icon" data-v-4bb2029c>🌟</div><h4 data-v-4bb2029c>精准排盘</h4><p data-v-4bb2029c>基于传统算法，精确计算您的紫薇命盘</p></div><div class="feature-item" data-v-4bb2029c><div class="feature-icon" data-v-4bb2029c>🤖</div><h4 data-v-4bb2029c>AI智能分析</h4><p data-v-4bb2029c>结合现代AI技术，提供深度个性化解读</p></div><div class="feature-item" data-v-4bb2029c><div class="feature-icon" data-v-4bb2029c>📊</div><h4 data-v-4bb2029c>全面解析</h4><p data-v-4bb2029c>涵盖事业、感情、财运等各个人生层面</p></div></div></div>',1)]))),s("div",{class:W(["form-section",{"slide-up":!x(e).hasResults}])},[re(cn)],2),x(e).hasResults?(I(),P("div",ao,[s("div",oo,[s("div",ro,[re(Te)]),s("div",io,[re(Ge)])]),s("div",lo,[re(Te),re(Ge)])])):G("",!0)]))}},fo=me(co,[["__scopeId","data-v-4bb2029c"]]);export{fo as default};
