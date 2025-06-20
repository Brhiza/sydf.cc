window.BaziDefinitions = {
    // --- 基础概念 ---
    '天干': {
        title: '天干 (Tiān Gān)',
        definition: '指甲、乙、丙、丁、戊、己、庚、辛、壬、癸，共十个。它们代表了宇宙中无形的、动态的能量，象征着天时和外在表现。'
    },
    '地支': {
        title: '地支 (Dì Zhī)',
        definition: '指子、丑、寅、卯、辰、巳、午、未、申、酉、戌、亥，共十二个。它们代表了有形的、具体的力量，象征着地利、季节和内在根基。'
    },
    '藏干': {
        title: '藏干 (Cáng Gān)',
        definition: '每个地支中都包含一个或多个天干，这些被称为“藏干”或“人元”。它们代表了地支内部隐藏的、潜在的能量和人事关系。'
    },
    '空亡': {
        title: '空亡 (Kōng Wáng)',
        definition: '代表虚无、消失、不实、缘分薄。吉神逢空亡则吉不起，凶神逢空亡则凶不显。命带空亡，也可能在玄学、艺术方面有特殊天赋。'
    },

    // --- 十神 ---
    '比肩': {
        title: '比肩 (Bǐ Jiān)',
        definition: '与日主五行相同、阴阳也相同的天干。象征自我、自尊、独立和主见。<br><strong>正面：</strong>意志坚定，积极上进，有自知之明。<br><strong>负面：</strong>固执己见，自我中心，不善合作。<br><strong>身强：</strong>竞争者多，易与人纷争，不利合伙。<br><strong>身弱：</strong>得朋友、同事帮助，是扶持自己的力量。'
    },
    '劫财': {
        title: '劫财 (Jé Cái)',
        definition: '与日主五行相同、阴阳相反的天干。性质与比肩相似，但更为激烈，行动力强。<br><strong>正面：</strong>热情坦率，有行动力，善于社交。<br><strong>负面：</strong>冲动鲁莽，易因朋友破财，好投机。<br><strong>身强：</strong>易破财，与人多纷争，克父、克妻。<br><strong>身弱：</strong>可得朋友、手足帮助，增强自身力量。'
    },
    '食神': {
        title: '食神 (Shí Shén)',
        definition: '日主所生、且阴阳相同的天干。是福气、食禄、才华和悠闲的象征。<br><strong>正面：</strong>温和善良，有口福，有艺术才华，度量宽宏。<br><strong>负面：</strong>理想主义，依赖性强，有时会懒散。<br><strong>影响：</strong>食神为吉神，能生财，能制七杀，使人生平顺。食神过多则如伤官，耗泄日主过度。'
    },
    '伤官': {
        title: '伤官 (Shāng Guān)',
        definition: '日主所生、且阴阳相反的天干。代表智慧、才华、叛逆和口才。<br><strong>正面：</strong>聪明，富有创造力，学习能力强，有表现欲。<br><strong>负面：</strong>恃才傲物，不守规矩，易得罪人，感情不稳定。<br><strong>影响：</strong>伤官会克制正官，不利女命婚姻。但若身强有财，则“伤官生财”，富贵自来。'
    },
    '偏财': {
        title: '偏财 (Piān Cái)',
        definition: '日主所克的、且阴阳相同的天干。代表意外之财、父亲、情人（对男性而言）。<br><strong>正面：</strong>慷慨豪爽，人缘好，有商业头脑，善于抓住机会。<br><strong>负面：</strong>不重小节，好酒色，容易挥霍，理财能力差。<br><strong>影响：</strong>偏财旺者，多有机遇，但也易有金钱纠纷。'
    },
    '正财': {
        title: '正财 (Zhèng Cái)',
        definition: '日主所克的、且阴阳相反的天干。代表稳定的收入、妻子（对男性而言）。<br><strong>正面：</strong>勤劳踏实，守信重义，有家庭责任感，珍惜金钱。<br><strong>负面：</strong>安于现状，缺乏进取心，有时会显得吝啬。<br><strong>影响：</strong>财星是养命之源，身强财旺为富命。若身弱财多，则为“财多身弱”，反为贫穷。'
    },
    '七杀': {
        title: '七杀 (Qī Shā)',
        definition: '克日主的、且阴阳相同的天干。也称“偏官”。代表权威、压力、小人、灾病。<br><strong>正面：</strong>果断勇敢，有魄力，反应快，有领导才能。<br><strong>负面：</strong>性情刚烈，好斗争，易有冲突、压迫和挑战。<br><strong>身强：</strong>七杀为权，主贵，有威望，利于从事军警、司法等行业。<br><strong>身弱：</strong>七杀为鬼，易受欺压，多病多灾。'
    },
    '正官': {
        title: '正官 (Zhèng Guān)',
        definition: '克日主的、且阴阳相反的天干。代表官职、地位、法律、丈夫（对女性而言）。<br><strong>正面：</strong>正直自律，有责任感，品行端正，受人尊敬。<br><strong>负面：</strong>循规蹈矩，缺乏魄力，有时会胆小怕事。<br><strong>影响：</strong>正官为贵气之星，喜财印相生。若被伤官克制或官杀混杂，则格局降低。'
    },
    '偏印': {
        title: '偏印 (Piān Yìn)',
        definition: '生日主的、且阴阳相同的天干。也称“枭神”。代表偏门的学问、艺术、宗教、继母。<br><strong>正面：</strong>思维独特，直觉敏锐，有创造力，善于观察。<br><strong>负面：</strong>孤僻冷漠，不善交际，三心二意，多学少成。<br><strong>影响：</strong>偏印会克制食神（称“枭神夺食”），不利福气。但若从事特殊技艺、研究等行业，则能发挥其特长。'
    },
    '正印': {
        title: '正印 (Zhèng Yìn)',
        definition: '生日主的、且阴阳相反的天干。代表母亲、学业、文书、贵人、保护。<br><strong>正面：</strong>仁慈善良，有学问，有爱心，重视名誉。<br><strong>负面：</strong>依赖性强，缺乏主见，有时会好面子。<br><strong>影响：</strong>正印是命中的福气和保护神，能化解七杀的凶性。身弱者喜见印绶生身。'
    },

    // --- 十二长生 ---
    '长生': {
        title: '长生',
        definition: '像人出生于世，或降生阶段，是指万物萌发之际。主生发、创新，有欣欣向荣的气息。'
    },
    '沐浴': {
        title: '沐浴',
        definition: '为婴儿降生后洗浴以去除污垢，是指万物出生，承受大自然沐浴。此阶段也称“败地”或“桃花”，易有感情纠葛。'
    },
    '冠带': {
        title: '冠带',
        definition: '为万物渐荣秀，如人穿衣戴帽，显得光彩焕发。主喜庆，有进取心，利于求名。'
    },
    '临官': {
        title: '临官',
        definition: '如人长成强壮，可以出仕做官，或建功立业。此阶段精力充沛，事业有成。也称“建禄”。'
    },
    '帝旺': {
        title: '帝旺',
        definition: '象征万物成熟，如人气势如虹，运势达到顶峰。主旺盛、强大，但也应防盛极而衰。'
    },
    '衰': {
        title: '衰',
        definition: '指万物开始由盛转衰。主保守、退守，缺乏进取心，但也代表温和、不与人争。'
    },
    '病': {
        title: '病',
        definition: '如人患病，是指万物困顿。主健康不佳，做事缺乏活力，但也主有同情心。'
    },
    '死': {
        title: '死',
        definition: '如人气绝，是指万物死灭。主缺乏生气，为人固执，但做事坚定。'
    },
    '墓': {
        title: '墓',
        definition: '也称“库”，如人死后归入坟墓。主收藏、聚集，为人节俭，但有时也显吝啬。'
    },
    '绝': {
        title: '绝',
        definition: '如人形体绝灭化归为土。主变化、分离，人生多变动，但也代表绝处逢生。'
    },
    '胎': {
        title: '胎',
        definition: '如人受父母之气结聚成胎。主希望、孕育，有新的开始和发展的潜力。'
    },
    '养': {
        title: '养',
        definition: '如人养胎于母腹中。主平顺、承接，有稳定发展的趋势。'
    },

    // --- 纳音 ---
    '海中金': { title: '纳音：海中金', definition: '深藏于海，是未成形的金，需要火来锻炼，也需要土来承载。若无刑冲克害，主有智慧和才华，但需待时而发。' },
    '炉中火': { title: '纳音：炉中火', definition: '天地为炉，阴阳为炭，是正在燃烧的火。喜见木来生助，也喜金来锻炼。主为人热情，有创造力，但性情急躁。' },
    '大林木': { title: '纳音：大林木', definition: '生长在广阔森林中的木，枝干撼风，声势浩大。喜见水来滋养，也喜土来培根。主为人正直，有担当，能成栋梁之才。' },
    '路旁土': { title: '纳音：路旁土', definition: '道路两旁的平凡之土，能滋养万物。喜见雨露之水，也喜太阳之火。主为人踏实，有包容心，但格局不高。' },
    '剑锋金': { title: '纳音：剑锋金', definition: '经过磨砺的利剑之金，锋芒锐利，最为刚硬。喜见水来淬炼，也喜火来锻炼。主为人果断，有权威，但也易伤人。' },
    '山头火': { title: '纳音：山头火', definition: '山野燎原之火，能照亮天地。喜见木来生助，也喜风来助势。主为人光明磊落，有远大志向，但缺乏持久力。' },
    '涧下水': { title: '纳音：涧下水', definition: '山间流淌的溪水，清澈湍急，随势而动。喜见金来生源，也喜木来疏导。主为人聪明，灵活多变，但定性不足。' },
    '城头土': { title: '纳音：城头土', definition: '古代城墙之土，天京之土，最为稳固。喜见木来加固，也喜水来滋润。主为人守信，有责任感，能为人依靠。' },
    '白蜡金': { title: '纳音：白蜡金', definition: '金质初成，如同白蜡，尚待锻炼。喜见火来提炼，也喜水来淘洗。主为人单纯，有潜力，但需经历磨练方能成器。' },
    '杨柳木': { title: '纳音：杨柳木', definition: '柔韧的杨柳之木，随风而摆，适应性强。喜见水来滋养，不畏风吹雨打。主为人变通，善于交际，但意志不坚。' },
    '泉中水': { title: '纳音：泉中水', definition: '清澈的泉水，是活水之源，生生不息。喜见金来发源，也喜土来涵养。主为人纯洁，有智慧，能惠及他人。' },
    '屋上土': { title: '纳音：屋上土', definition: '屋顶上的瓦土，能遮风挡雨，为人庇护。喜见木来支撑，也喜火来烧制。主为人奉献，有保护欲，能造福一方。' },
    '霹雳火': { title: '纳音：霹雳火', definition: '雷电之火，电光火石，声势惊人。喜见水来相济，也喜风雷助威。主为人急躁，有才华，但易有突发之变。' },
    '松柏木': { title: '纳音：松柏木', definition: '四季常青的松柏，坚韧不拔，傲雪凌霜。喜见水来滋养，也喜土来培根。主为人正直，有毅力，能经受考验。' },
    '长流水': { title: '纳音：长流水', definition: '源远流长的江河之水，奔流不息。喜见金来发源，也喜土来归宿。主为人有恒心，有远见，能成大事。' },
    '沙中金': { title: '纳音：沙中金', definition: '混杂在泥沙中的金，需要淘尽泥沙，方能得见。喜见水来淘洗，也喜火来锻炼。主为人聪明，但需努力奋斗才能成功。' },
    '山下火': { title: '纳音：山下火', definition: '山脚下的微弱之火，火势微弱，需要扶助。喜见木来生助，也喜风来助燃。主为人温和，但缺乏激情和魄力。' },
    '平地木': { title: '纳音：平地木', definition: '平原上的树木，是人间之木，用途广泛。喜见水来滋养，也喜土来培根。主为人务实，有实用价值，能适应环境。' },
    '壁上土': { title: '纳音：壁上土', definition: '墙壁上的泥土，是人间墙壁，为人依靠。喜见木来支撑，也喜火来烧制。主为人稳重，能保护他人，但较为被动。' },
    '金箔金': { title: '纳音：金箔金', definition: '金质薄弱的金箔，需依附于他物，为人装饰。喜见木为依托，也喜水来增色。主为人虚荣，但有艺术品味。' },
    '覆灯火': { title: '纳音：覆灯火', definition: '灯火之光，能照亮一方，为人指引。喜见木为灯芯，也喜油来助燃。主为人有智慧，能教化他人，但力量有限。' },
    '天河水': { title: '纳音：天河水', definition: '天上的雨露之水，广布四方，滋润万物。喜见金来生源，也喜土来承载。主为人博爱，有奉献精神，但性情不定。' },
    '大驿土': { title: '纳音：大驿土', definition: '宽阔的道路之土，能承载万物，通达四方。喜见木来疏通，也喜水来滋润。主为人有度量，能承载重任，利于交通、运输。' },
    '石榴木': { title: '纳音：石榴木', definition: '果实累累的石榴树，内秀其中，成实之木。喜见水来滋养，也喜土来培根。主为人多才多艺，晚年能有成就。' },
    '钗钏金': { title: '纳音：钗钏金', definition: '精美的首饰之金，为人点缀，增添光彩。喜见火来锻炼，也喜水来洗涤。主为人爱美，有艺术气质，但较为柔弱。' },
    '桑柘木': { title: '纳音：桑柘木', definition: '桑树和柘树，是蚕桑之木，为人奉献。喜见水来滋养，也喜土来培根。主为人勤劳，有奉献精神，能造福于人。' },

    // --- 神煞 ---
    '天乙贵人': {
        title: '天乙贵人',
        definition: '命中最吉之神，若人遇之则荣，功名早达，官禄易进。遇事有人帮，临难有人解，是逢凶化吉之星。一生少病，人缘佳，易得社会地位。'
    },
    '太极贵人': {
        title: '太极贵人',
        definition: '人命逢之，主聪明好学，有钻劲，喜文史哲、宗教、神秘学等科目。为人正直，做事有始有终，有缘于易学。'
    },
    '天德贵人': {
        title: '天德贵人',
        definition: '主一生安逸，不犯官刑。是天地德秀之气，能逢凶化吉。女命逢之，多为贵妇。'
    },
    '月德贵人': {
        title: '月德贵人',
        definition: '其性如同天德贵人，安详巨福，福寿两全。人命带月德，心地善良，做事公道，一生无大险。'
    },
    '天德合': {
        title: '天德合',
        definition: '天德贵人的三合之辰，作用与天德贵人相似，能增强其福力。'
    },
    '月德合': {
        title: '月德合',
        definition: '月德贵人的三合之辰，作用与月德贵人相似，能增强其福力。'
    },
    '天赦日': {
        title: '天赦日',
        definition: '四时专气，生育万物，宥罪赦过。命逢天赦，若日主得旺，主一生健康安泰，即使有罪，也能获得赦免。'
    },
    '禄神': {
        title: '禄神',
        definition: '代表官禄、俸禄、食禄。命中带禄神，主其人聪明，在财运、事业上多得助，一生衣食无忧。但忌冲破，冲破则福气减半。'
    },
    '驿马': {
        title: '驿马',
        definition: '主奔波、走动、迁移、旅游、出差、搬家等。命带驿马，多有外出发展的机会。逢冲主动，逢合则静。'
    },
    '华盖': {
        title: '华盖',
        definition: '主孤高，有艺术、文学、玄学等方面的才华。命带华盖之人，聪慧、有灵性，但性情略显孤僻，与僧道有缘。'
    },
    '将星': {
        title: '将星',
        definition: '有组织领导能力，能服众，有权威。命带将星，多有掌权之机。若与吉神同柱，则增其权势；若与凶神同柱，则助其威风。'
    },
    '金舆': {
        title: '金舆',
        definition: '如车马之象，主富贵。命带金舆，多得配偶之助，一生安泰。男命逢之得贤妻，女命逢之得佳婿。'
    },
    '桃花': {
        title: '桃花',
        definition: '又名咸池，主风流、艺术、情缘。命带桃花，多有异性缘，也主聪明，有艺术细胞。若桃花与吉神同柱，则主容貌俊美；若与凶神同柱，则易因色惹祸。'
    },
    '红鸾': {
        title: '红鸾',
        definition: '主婚姻、喜庆之事。红鸾星动，多有婚嫁、恋爱或添丁之喜。是一颗吉星。'
    },
    '天喜': {
        title: '天喜',
        definition: '主喜庆、缘订、怀孕、生子等。与红鸾相对，多为喜事临门之兆，性质相似。'
    },
    '文昌贵人': {
        title: '文昌贵人',
        definition: '主聪明、文笔、学习、科甲。命带文昌，利于读书、考试和从事文职工作，有逢凶化吉之能。'
    },
    '学堂': {
        title: '学堂',
        definition: '主学习、模仿能力强，利于学业，文章振发，聪明伶俐。'
    },
    '词馆': {
        title: '词馆',
        definition: '主口才、表达能力，利于从事教育、演说、辩论等工作。与学堂类似，皆主文才。'
    },
    '魁罡': {
        title: '魁罡',
        definition: '性格刚烈，聪明果断，有领导才能，但命途多见波折。古语云“魁罡运，十有九凶”，但若日主身旺，运行身旺之乡，则主发福百端。'
    },
    '国印贵人': {
        title: '国印贵人',
        definition: '主人诚实可靠，严守清规，照章行事，办事公道。为人和悦，礼义仁慈，气质轩昂。有掌印之能，为官掌实权。'
    },
    '羊刃': {
        title: '羊刃',
        definition: '性情刚烈，易冲动，也代表权力、刀刃。身旺遇之为凶，易有血光之灾或手足伤残；身弱遇之则能帮身，反主权威。'
    },
    '孤辰': {
        title: '孤辰',
        definition: '主孤独，不利六亲。男命带孤辰，疏远父亲与妻子，性格孤僻。'
    },
    '寡宿': {
        title: '寡宿',
        definition: '主孤寡，不利六亲。女命带寡宿，疏远母亲与丈夫，性格孤僻。'
    },
    '亡神': {
        title: '亡神',
        definition: '主是非、官非、牢狱之灾。也指人的心计和谋略。命带亡神，为人深有城府，做事欠考虑。'
    },
    '劫煞': {
        title: '劫煞',
        definition: '主破财、灾祸。命带劫煞，性格刚烈，易有意外之灾。若与吉神同柱，则主有威严，善于谋略。'
    },
    '灾煞': {
        title: '灾煞',
        definition: '主血光、意外之灾。也称“白虎煞”。此煞在凶神中最具凶险，若逢克破，多主伤残。'
    },
    '阴差阳错': {
        title: '阴差阳错',
        definition: '主婚姻感情不顺，易与配偶家人不和，或有婚变之象。女子逢之，公姑寡合，妯娌不足，夫家冷退。男子逢之，主退外家，亦与妻家是非寡合。'
    },
    '孤鸾煞': {
        title: '孤鸾煞',
        definition: '主婚姻不顺，夫妻易分离。男克妻，女克夫。所谓“孤鸾犯日本无儿，一见官星得子奇”。'
    },
    '元辰': {
        title: '元辰',
        definition: '又名大耗，主耗散、不和。岁运逢之，如物当风，摇动不安，损财、生病、不和。'
    },
    '勾绞煞': {
        title: '勾绞煞',
        definition: '主牵连、羁绊、官非、口舌。命带此煞，多心事重重，易招惹是非。'
    },
    '飞刃': {
        title: '飞刃',
        definition: '与羊刃对冲之支，其凶性与羊刃相似，主意外伤害、手术、血光之灾。'
    },
    '血刃': {
        title: '血刃',
        definition: '主血光之灾，多应于意外、手术、车祸等。'
    },
    '天罗': {
        title: '天罗',
        definition: '主刑法、牢狱、疾病、困顿。男命逢之，做事多阻碍，命运不顺。'
    },
    '地网': {
        title: '地网',
        definition: '主刑法、牢狱、疾病、困顿。女命逢之，婚姻不顺，易有灾厄。'
    },
    '三奇贵人': {
        title: '三奇贵人',
        definition: '天上三奇甲戊庚，地下三奇乙丙丁，人中三奇壬癸辛。博学多能，带天乙贵人者，勋业超群。带天月二德者，凶灾不犯。'
    },
    '四废日': {
        title: '四废日',
        definition: '春庚申、辛酉，夏壬子、癸亥，秋甲寅、乙卯，冬丙午、丁巳。命遇四废，主身弱多病，做事无成，有始无终。'
    },
    '十恶大败': {
        title: '十恶大败',
        definition: '主不善持家，仓库金银化为尘。此日出生者，花钱如流水，不善理财。'
    },
    '红艳煞': {
        title: '红艳煞',
        definition: '主多情多欲，浪漫不贞。女命犯之，易有感情纠葛，或从事与艺术、演艺相关行业。'
    },
    '金神': {
        title: '金神',
        definition: '指出生于乙丑、己巳、癸酉三日。金神入火乡，富贵天下响。为人刚毅、有明断力。'
    },
    '天转': {
        title: '天转',
        definition: '专指春天的卯日乙时，主吉利。'
    },
    '地转': {
        title: '地转',
        definition: '专指秋天的酉日辛时，主官场得意。'
    },
    '丧门': {
        title: '丧门',
        definition: '主丧亡、哭泣之事。流年或大运逢之，需注意家人健康。'
    },
    '吊客': {
        title: '吊客',
        definition: '主吊丧、孝服之事。流年或大运逢之，需防亲友孝服。'
    },
    '披麻': {
        title: '披麻',
        definition: '主孝服、丧事。性质与丧门、吊客相似。'
    },
    '十灵日': {
        title: '十灵日',
        definition: '指甲戌、乙未、丙辰、丁丑、戊午、己酉、庚申、辛巳、壬寅、癸亥这十日。主聪明、灵慧、有文才。'
    },
    '六秀日': {
        title: '六秀日',
        definition: '指丙午、丁未、戊子、戊午、己丑、己未这六日。主其人秀气，聪明，有才艺。'
    },
    '八专': {
        title: '八专',
        definition: '指出生于甲寅、乙卯、己未、丁巳、庚申、辛酉、戊戌、癸丑这八日。主多情，易有淫欲之念。'
    },
    '九丑': {
        title: '九丑',
        definition: '指出生于戊子、戊午、壬子、壬午、乙卯、辛卯、乙酉、辛酉、己卯、己酉这九日。主妨害婚姻，感情多波折。'
    },
    '天厨贵人': {
        title: '天厨贵人',
        definition: '主有食禄，一生不愁吃穿。也代表有烹饪天赋。'
    },
    '福星贵人': {
        title: '福星贵人',
        definition: '主一生福禄无缺，格局配合得当，必然多福多寿，金玉满堂。'
    },
    '德秀贵人': {
        title: '德秀贵人',
        definition: '主禀性聪明，温厚和气。若无冲破克压，一生清贵。'
    },
    '童子煞': {
        title: '童子煞',
        definition: '传说为天界神仙转世，或庙里烧香拜佛的童子。命带此煞，多婚姻不顺，或有夭折之象。'
    },
    '天医': {
        title: '天医',
        definition: '主健康、医疗、奉献。命带天医，适合从事医疗、护理、心理咨询等行业，有救死扶伤之心。'
    },
    '流霞': {
        title: '流霞',
        definition: '主流血、灾伤。男命犯之，酒色败家。女命犯之，产后之厄。'
    }
};