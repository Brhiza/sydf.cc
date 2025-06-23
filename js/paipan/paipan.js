"use strict";
 /**
  * @author hkargc@gmail.com
  * @link https://github.com/hkargc/paipan
  * 本日历及排盘类完全源于以下项目,本人仅作为代码搬运工,感谢项目作者的无私分享
  * 日历部分由bieyu.com搬运而来,其详细阐述了的历法转换原理及星体天文算法等,并提供了JS源码及部分PHP源码,项目地址: http://www.bieyu.com/
  * 农历校正及古代农历算法完全来自寿星万年历,感谢福建莆田第十中学许剑伟老师,项目地址: http://www.nongli.net/sxwnl/
  */
 function paipan() {

this.getDecade = function(gan, zhi) {
 	  const ganIndex = window.calendar.ctg.indexOf(gan);
 	  const zhiIndex = window.calendar.cdz.indexOf(zhi);
 	  // 计算当前干支在六十甲子中的索引
 	  const gzIndex = this.GZ(ganIndex, zhiIndex);
 	  // 每旬10个，找到旬首的索引
 	  const decadeStartIndex = Math.floor(gzIndex / 10) * 10;
 	  // 返回旬首的干支
 	  return window.calendar.gz[decadeStartIndex];
};
      /**
       * 四柱計算,根据window.calendar.zwz决定是否分早子时晚子时,传公历
       * @param int yy(-1000-3000)
       * @param int mm(1-12)
       * @param int dd(1-31)
       * @param int hh(0-23)
       * @param int mt(0-59),分钟,在跨节的时辰上会需要,有的排盘忽略跨节
       * @param int ss(0-59),秒数
       * @return false/array(天干, 地支, 附加资料)
       */
      this.GetGZ = function(yy, mm, dd, hh, mt, ss) {
          var yy = window.calendar.floatval(yy);
          var mm = window.calendar.floatval(mm);
          var dd = window.calendar.floatval(dd);
          var hh = window.calendar.floatval(hh);
          var mt = (mt === undefined) ? 0 : window.calendar.floatval(mt);
          var ss = (ss === undefined) ? 0 : window.calendar.floatval(ss);
  
          if (mt + ss == 0) { //避免整点模糊
              ss = 10;
          }
  
          if (window.calendar.ValidDate(yy, mm, dd) === false) {
              return false;
          }
  
          var spcjd = window.calendar.Jdays(yy, mm, dd, hh, mt, ss);
          if (spcjd === false) {
              return false;
          }
  		
  		var jr = [];
  		for(var ty = yy; ; ty--){ //公历年的立春在前一年春分开始的数组中
  			var dj = window.calendar.GetAdjustedJQ(ty, false);
  			jr = dj.concat(jr); //往前插入
  			if(spcjd >= dj[21]){ //dj[21]為立春,約在2月5日前後,若小於dj[21],則屬於前一個節氣年
  				ty++;
  				break;
  			}
  		}
  
          var tg = [];
          var dz = [];
          var ygz = ((ty + 4712 + 24) % 60 + 60) % 60;
          tg[0] = ygz % 10; //年干
          dz[0] = ygz % 12; //年支
          for (var j = 0; ; j++) {
              if (spcjd < jr[21 + 2*j]) {
                  var tm = j - 1;
                  break;
              } //已超過指定時刻,故應取前一個節氣
          }
  
          var tmm = ((ty + 4712) * 12 + tm + 60) % 60;
          var mgz = (tmm + 50) % 60;
          tg[1] = mgz % 10; //月干
          dz[1] = mgz % 12; //月支
          //計算日柱之干支 
          var jda = spcjd + 0.5; //加0.5是將起始點從正午改為從0點開始
          var thes = ((jda - Math.floor(jda)) * 86400) + 3600; //將jd的小數部份化為秒,並加上起始點前移的一小時(3600秒),取其整數值
          var dayjd = Math.floor(jda) + thes / 86400; //將秒數化為日數,加回到jd的整數部份
          var dgz = (Math.floor(dayjd + 49) % 60 + 60) % 60;
          tg[2] = dgz % 10; //日干
          dz[2] = dgz % 12; //日支
          if (window.calendar.zwz && (hh >= 23)) { //区分早晚子时,日柱前移一柱
              tg[2] = (tg[2] + 10 - 1) % 10;
              dz[2] = (dz[2] + 12 - 1) % 12;
          }
          //計算時柱之干支
          var dh = dayjd * 12;
          var hgz = (Math.floor(dh + 48) % 60 + 60) % 60;
          tg[3] = hgz % 10; //時干
          dz[3] = hgz % 12; //時支
  		
  		var ob = {
  			ty: ty,
  			jr: jr
  		};
          return [tg, dz, ob];
      };
      /**
       * 根据年干支计算所有合法的月干支
       * @param int ygz(0-59) 年柱干支代码
       * @return array 月柱干支代码列表
       */
      this.MGZ = function(ygz) {
  		var ygz = window.calendar.intval(ygz);
  		
          var mgz = [];
  
          var nv = 2 + 12 * (ygz % 10);
          for (var i = 0; i <= 11; i++) {
              var pv = (i + nv) % 60;
              mgz[pv] = window.calendar.gz[pv];
          }
          return mgz;
      };
      /**
       * 根据日干支计算所有合法的时干支
       * @param int dgz(0-59) 日柱干支代码
       * @return array 时柱干支代码列表
       */
      this.HGZ = function(dgz) {
  		var dgz = window.calendar.intval(dgz);
  		
          var hgz = [];
  
          var nv = 12 * (dgz % 10);
          for (var i = 0; i <= (window.calendar.zwz?12:11); i++) { //考虑晚子时
              var pv = (i + nv) % 60;
              hgz[pv] = window.calendar.gz[pv] + (i == 12 ? '+' : ''); //+号在查找方法中要用到
          }
          return hgz;
      };
      /**
       * 根据一柱天干地支代码计算该柱的六十甲子代码
       * @param int tg(0-9) 天干代码
       * @param int dz(0-11) 地支代码
       * @return false/int 干支代码
       */
      this.GZ = function(tg, dz) {
          var tg = window.calendar.intval(tg);
          var dz = window.calendar.intval(dz);
  
          if (tg < 0 || tg > 9) {
              return false;
          }
  
          if (dz < 0 || dz > 11) {
              return false;
          }
  
          if ((tg % 2) != (dz % 2)) { //偶数对偶数,奇数对奇数才能组成一柱
              return false;
          }
          return ((10 + tg - dz) % 10) / 2 * 12 + dz;
      };
      /**
       * 根据八字干支查找对应的公历日期(GanZhi To GongLi)
       * @param int ygz(0-59) 对应的是this.gz
       * @param int mgz(0-59)
       * @param int dgz(0-59)
       * @param int hgz(0-59)
       * @param int yeai(-1000-3000) 起始年 year initial
       * @param int mx 查找多少个甲子
       */
      this.gz2gl = function(ygz, mgz, dgz, hgz, yeai, mx) {
          var ygz = window.calendar.intval(ygz);
          var mgz = window.calendar.intval(mgz);
          var dgz = window.calendar.intval(dgz);
          var hgz = window.calendar.intval(hgz);
          var yeai = window.calendar.intval(yeai);
          var mx = window.calendar.intval(mx);
  
          if (ygz < 0 || ygz >= 60) { //年干支非六十甲子
              return false;
          }
          if (mgz < 0 || mgz >= 60) { //月干支非六十甲子
              return false;
          }
          if (dgz < 0 || dgz >= 60) { //日干支非六十甲子
              return false;
          }
          if (hgz < 0 || hgz >= 60) { //时干支非六十甲子
              return false;
          }
  
          if (!(mgz in this.MGZ(ygz))) { //对应的月干支不存在
              return false;
          }
          if (!(hgz in this.HGZ(dgz))) { //对应的时干支不存在
              return false;
          }
  		var hgzs = this.HGZ(dgz); //该日下所有时柱
  		if(window.calendar.zwz && (hgzs[hgz].substr(-1) == '+')){ //晚子时,日柱后挪一天
  			dgz = (dgz + 1) % 60;
  		}
          var yeaf = yeai + mx * 60;
  
          var ifs = []; //initial-final 返回一个含起止时间的数组
  
          for (var m = 0; m <= mx - 1; m++) {
              var yea = yeai + m * 60;
  
              //將年月干支對應到指定年的節氣月起始時刻
              var syc = (yea + 56) % 60; //已知公元0年为庚申年,庚申的六十甲子代码为56,这里求得yea的六十甲子代码syc
              var asyc = (ygz + 60 - syc) % 60; //年干支代码相对yea干支代码偏移了多少
              var iy = yea + asyc; //加上偏移即得一个ygz年
  
              var mgzo = (mgz + 60 - 2) % 12; //已知干支代碼,要求干支名,只需將干支代碼除以10,所得的餘數即為天干的代碼;將干支代碼除以12,所得的餘數即為地支的代碼.这里求得mgz在第几个月
  
  			var jdpjq = [];
  			for(var ty = iy - 1; ty <= iy; ty++){ //前一年春分开始的节气
  				var dj = window.calendar.GetAdjustedJQ(ty, false);
  				jdpjq = jdpjq.concat(dj);
  			}
              var ijd = jdpjq[21 + 2*mgzo]; //節氣月頭JD initial jd 21立春
              var fjd = jdpjq[21 + 2*mgzo + 2]; //節氣月尾JD final jd
  
              var sdc = (Math.floor(ijd) + 49) % 60; //節氣月頭的日干支代碼,儒略日历时间0日为癸丑日,六十甲子代码为49
              var asdc = (dgz + 60 - sdc) % 60; //生日相對於節氣月頭的日數
              var idd = Math.floor(ijd + asdc); //生日JD值(未加上時辰)
              var ihh = hgz % 12; //時辰代碼
              var id = idd + (ihh * 2 - 13) / 24;
              var fd = idd + (ihh * 2 - 11) / 24;
  
              if (fd < ijd || id > fjd) { //此八字在此60年中不存在
  
              } else {
                  if (id > ijd && fd < fjd) { //没有跨节
                      var ids = id;
                      var fds = fd;
                  }
                  if (id < ijd && fd > ijd) { //同一个时辰跨越了节:在節氣月頭,只包含時辰後段
                      var ids = ijd;
                      var fds = fd;
                  }
                  if (id < fjd && fd > fjd) { //同一个时辰跨越了节:在節氣月尾,只包含時辰前段
                      var ids = id;
                      var fds = fjd;
                  }
                  ifs.push([window.calendar.Jtime(ids), window.calendar.Jtime(fds)]); //儒略日历时间转成公历时间.如果开启早晚子并且是子时这里有点瑕疵,但考虑到跨节这里有点复杂
              }
          }
          return ifs;
      };
      /**
       * 根据公历年月日计算命盘信息 fate:命运 map:图示
       * @param int xb 性别0男1女
       * @param int yy 年份(-1000-3000).确保传的是this.J对应的时间
       * @param int mm 月份(1-12)
       * @param int dd 日期(1-31)
       * @param int hh 时间(0-23)
       * @param int mt 分钟(0-59),在跨节的时辰上会需要,有的排盘忽略了跨节,不需要考虑跨节则请把时间置为对应时辰的初始值
       * @param int ss 秒数(0-59),在跨节的时辰上会需要,有的排盘忽略了跨节
  	 * @param float J 所在经度(角度表示)用于计算真太阳时,不传则用标准时间排盘
  	 * @param float W 所在纬度(角度表示)不传则默认北纬35度
       * @return false/array
       */
      this.fatemaps = function(xb, yy, mm, dd, hh, mt, ss, J, W) {
          var xb = window.calendar.intval(xb) ? 1 : 0; //确保准确
          var yy = window.calendar.intval(yy);
          var mm = window.calendar.intval(mm);
          var dd = window.calendar.intval(dd);
          var hh = window.calendar.intval(hh);
          var mt = (mt === undefined) ? 0 : window.calendar.intval(mt);
          var ss = (ss === undefined) ? 0 : window.calendar.intval(ss);
  
          var spcjd = window.calendar.Jdays(yy, mm, dd, hh, mt, ss); //special jd,这里依然是标准时间,即this.J处的平太阳时
          if (spcjd === false) {
              return false;
          }
  		
  		var rt = {}; //要返回的对象 return
  		
  		if(J !== undefined){ //有传参,需要转地方真太阳时
  			rt['pty'] = spcjd - (window.calendar.J - window.calendar.floatval(J)) * 4 / 60 / 24; //计算地方平太阳时,每经度时差4分钟
  			rt['pty'] = window.calendar.Jtime(rt['pty']); //地方平太阳时
  
  			spcjd = window.calendar.zty(spcjd, J, W); //采用真太阳时排盘,这里有点疑问: 对应的廿四节气的计算是否也要转为真太阳时呢?
  			rt['zty'] = window.calendar.Jtime(spcjd); //地方真太阳时
  		}
  		
          var [yy, mm, dd, hh, mt, ss] = window.calendar.Jtime(spcjd); //假设hh传了>24的数字,此处修正
  
          var nwx = [0, 0, 0, 0, 0]; //五行数量 number of WuXing 这里不计算藏干里的
          var nyy = [0, 0]; //阴阳数量 number of YinYang 这里不计算藏干里的
  
          var szs = [1, 6, 10, 9, 10, 9, 7, 0, 4, 3]; //日干對地支爲"子"者所對應的運程代碼
  
          var gdz_res = this.GetGZ(yy, mm, dd, hh, mt, ss);
          if (!gdz_res) {
              return false; // Return early if GZ calculation fails
          }
          var [tg, dz, ob] = gdz_res;
  
          //計算年月日時辰等四柱干支的陰陽屬性和個數及五行屬性和個數
          var yytg = []; //YinYang TianGan
          var yydz = []; //YinYang DiZhi
          var ewxtg = []; //各天干对应的五行
          var ewxdz = []; //各地支对应的五行
          for (var k = 0; k <= 3; k++) { //yytg:八字各柱天干之陰陽屬性,yydz:八字各柱地支之陰陽屬性,nyy[0]為陽之總數,nyy[1]為陰之總數
              yytg[k] = tg[k] % 2;
              nyy[yytg[k]] = nyy[yytg[k]] + 1; //求天干的陰陽並計算陰陽總數
  
              yydz[k] = dz[k] % 2;
              nyy[yydz[k]] = nyy[yydz[k]] + 1; //求地支的陰陽並計算陰陽總數
  
              ewxtg[k] = window.calendar.wxtg[tg[k]];
              nwx[ewxtg[k]] = nwx[ewxtg[k]] + 1; //wxtg為天干之五行屬性
  
              ewxdz[k] = window.calendar.wxdz[dz[k]];
              nwx[ewxdz[k]] = nwx[ewxdz[k]] + 1; //wxdz為地支之五行屬性
          }
  
          rt['nyy'] = nyy; //阴阳数量
          rt['nwx'] = nwx; //五行数量
  
          rt['yytg'] = yytg; //各天干对应的阴阳
          rt['yydz'] = yydz; //各地支对应的阴阳
  
          rt['ewxtg'] = ewxtg; //各天干对应的五行
          rt['ewxdz'] = ewxdz; //各地支对应的五行
  
          //日主與地支藏干決定十神
          var bzcg = []; //各地支的藏干
          var wxcg = []; //各地支的藏干对应的五行
          var yycg = []; //各地支的藏干对应的阴阳
          var bctg = []; //各地支的藏干对应的文字
          for (var i = 0; i <= 3; i++) { //0,1,2,3等四個
              wxcg[i] = [];
              yycg[i] = [];
              for (var j = 0; j <= 2; j++) { //0,1,2等三個
                  var nzcg = window.calendar.zcg[dz[i]][j]; //取得藏干表中的藏干代碼,zcg為一 4X3 之array the number of 支藏干
                  if (nzcg >= 0) { //若存在則取出(若為-1,則代表空白)
                      bctg[3 * i + j] = window.calendar.ctg[nzcg]; //暫存其干支文字
                      bzcg[3 * i + j] = window.calendar.ssq[window.calendar.dgs[nzcg][tg[2]]]; //暫存其所對應之十神文字
  
                      wxcg[i][j] = window.calendar.wxtg[nzcg]; //其五行屬性
                      yycg[i][j] = nzcg % 2; //其陰陽屬性
                  } else {
                      bctg[3 * i + j] = ""; //若nzcg為-1,則代表空白,設定藏干文字變數為空白
                      bzcg[3 * i + j] = ""; //若nzcg為-1,則代表空白,設定十神文字變數為空白
                  }
              }
          }
          rt['bctg'] = bctg;
          rt['bzcg'] = bzcg;
          rt['wxcg'] = wxcg;
          rt['yycg'] = yycg;
  
          //求算起運時刻
          for (var i = 0; ; i++) { //先找到指定時刻前後的節氣月首
              if (spcjd < ob.jr[21 + 2*i]) {
                  var ord = i - 1;
                  break;
              } //ord即為指定時刻所在的節氣月首JD值
          }
  		
  		var ta = window.calendar.pdy ? window.calendar.ty : 360; //一個廻歸年的天數
  		
          var xf = spcjd - ob.jr[21 + 2*ord]; //xf代表節氣月的前段長,單位為日,以指定時刻為分界點
          var yf = ob.jr[21 + 2*ord + 2] - spcjd; //yf代表節氣月的後段長
          if (((xb == 0) && (yytg[0] == 0)) || ((xb == 1) && (yytg[0] == 1))) {
  			if(window.calendar.pdy){
  				var zf = ta * 10 * (yf / (yf + xf)); //zf為指定日開始到起運日之間的總日數(精確法)
  			}else{
  				var zf = ta * 10 * (yf / 30); //zf為指定日開始到起運日之間的總日數(粗略法）三天折合一年,一天折合四个月,一个时辰折合十天,一个小时折合五天,反推得到一年按360天算,一个月按30天算
  			}
              var forward = 0; //陽年男或陰年女,其大運是順推的
          } else {
  			if(window.calendar.pdy){
  				var zf = ta * 10 * (xf / (yf + xf)); //陰年男或陽年女,其大運是逆推的
  			}else{
  				var zf = ta * 10 * (xf / 30); //(粗略法)
  			}
              var forward = 1;
          }
  		var y = window.calendar.intval(zf / ta);
  		var m = window.calendar.intval(zf % ta / (ta / 12));
  		var d = window.calendar.intval(zf % ta % (ta / 12));
  		
          rt['qyy_desc'] = "出生后" + y + "年" + m + "个月" + d + "天起运"; //与十三行八字一致
  		
          var qyt = spcjd + zf; //转按回归年算
          var jt = window.calendar.Jtime(qyt); //將起運時刻的JD值轉換為年月日時分秒
          var qyy = jt[0]; //起運年(公历)
  
          rt['qyy'] = qyy; //起運年
  
          //求算起運年(指節氣年,农历)
          var qjr = window.calendar.GetAdjustedJQ(qyy - 1, false); //立春在上一年的以春分开始的数组中
          if (qyt >= qjr[21]) { //qjr[21]為立春,約在2月5日前後,
              var jqyy = qyy;
          } else {
              var jqyy = qyy - 1; //若小於jr[21],則屬於前一個節氣年
          }
  
          //求算起運年及其後第五年的年干支及起運歲
          var jtd = ((jqyy + 4712 + 24) % 10 + 10) % 10;
          jtd = window.calendar.ctg[((jqyy + 4712 + 24) % 10 + 10) % 10] + "、" + window.calendar.ctg[((jqyy + 4712 + 24 + 5) % 10 + 10) % 10];
          rt['qyy_desc2'] = "每逢 " + jtd + " 年" + jt[1] + "月" + jt[2] + "日" + jt[3] + "时交脱大运"; //顯示每十年為一階段之起運時刻,分兩個五年以年天干和陽曆日期表示
          var qage = jqyy - ob.ty; //起運年減去出生年再加一即為起運之歲數,從懷胎算起,出生即算一歲
  
          rt['dy'] = []; //大运
  
          //下面的回圈計算起迄歲,大運干支(及其對應的十神),衰旺吉凶
          var zqage = []; //起始歲數
          var zboz = []; //末端歲數
          var zfman = []; //大運月干代码
          var zfmbn = []; //大運月支代码
          var zfma = []; //大運月干文字
          var zfmb = []; //大運月支文字
          var nzs = []; //大运对应的十二长生
          var mgz = ((10 + tg[1] - dz[1]) % 10) / 2 * 12 + dz[1]; //这里是根据天干地支代码计算月柱的六十甲子代码
          for (var k = 0; k <= 11; k++) { // 求各階段的起迄歲數及該階段的大運, 增加到12个大运
              if (rt['dy'][k] === undefined) {
                  rt['dy'][k] = [];
              }
              //求起迄歲
              rt['dy'][k]['zqage'] = zqage[k] = qage + 1 + k * 10; //求各階段的起始歲數
              rt['dy'][k]['zboz'] = zboz[k] = qage + 1 + k * 10 + 9; //求各階段的末端歲數
  
              //求起讫年
              rt['dy'][k]['syear'] = qyy + k * 10;
              rt['dy'][k]['eyear'] = qyy + k * 10 + 9;
  
              //排大運
              //求大運的數值表示值,以出生月份的次月干支開始順排或以出生月份的前一個月干支開始逆排
              //大運月干
              rt['dy'][k]['zfman'] = zfman[k] = (mgz + 60 + Math.pow(-1, forward) * (k + 1)) % 10; //加60是為保證在Mod之前必為正數
              //大運月支
              rt['dy'][k]['zfmbn'] = zfmbn[k] = (mgz + 60 + Math.pow(-1, forward) * (k + 1)) % 12; //加60是為保證在Mod之前必為正數
  
              rt['dy'][k]['zfma'] = zfma[k] = window.calendar.ctg[zfman[k]];
              rt['dy'][k]['zfmb'] = zfmb[k] = window.calendar.cdz[zfmbn[k]];
  
              //算衰旺吉凶ncs
              //szs(tg(2))爲日干對大運地支爲"子"者所對應之運程代碼
              //tg(2)爲生日天干(以整數0~11表示)之代碼
              //(-1)^tg(2)表示若日干爲陽則取加號,若日干爲陰則取减號
              //第一個大運之地支數值爲zfmbn(0)
              //下式中szs(tg(2)) + (-1) ^ tg(2) * (zfmbn(0))為決定起始運勢,(-1) ^ forward * (-1) ^ tg(2) 為決定順推或逆推,可合併簡化為次一式
              rt['dy'][k]['nzs'] = nzs[k] = (24 + szs[tg[2]] + Math.pow(-1, tg[2]) * (zfmbn[0] + Math.pow(-1, forward) * k)) % 12;
              rt['dy'][k]['nzsc'] = window.calendar.czs[nzs[k]];
              //此處加24是爲了使Mod之前總值不爲負值
          }
  
          //求流年的數值表示值及對應的文字
          var lyean = []; //流年天干
          var lyebn = []; //流年地支
          var lye = []; //流年所對應的干支文字
          for (var j = 0; j <= 119; j++) { // 增加到120年
              var k = window.calendar.intval(j / 10); //大运
              var i = j % 10; //流年
              if (rt['dy'][k]['ly'] === undefined) { //大运对应的流年
                  rt['dy'][k]['ly'] = [];
              }
              if (rt['dy'][k]['ly'][i] === undefined) {
                  rt['dy'][k]['ly'][i] = [];
              }
              //lyean[j]=(ygz + j + qage) % 10;
              rt['dy'][k]['ly'][i]['age'] = j + qage + 1; //年龄(虚岁)
              rt['dy'][k]['ly'][i]['year'] = j + qage + ob.ty; //流年(农历)
              rt['dy'][k]['ly'][i]['lyean'] = lyean[j] = (tg[0] + j + qage) % 10; //流年天干
              rt['dy'][k]['ly'][i]['lyebn'] = lyebn[j] = (dz[0] + j + qage) % 12; //流年地支
              rt['dy'][k]['ly'][i]['lye'] = lye[j] = window.calendar.ctg[lyean[j]] + window.calendar.cdz[lyebn[j]]; //取流年所對應的干支文字
          }
  
  		var xz = window.calendar.GetXZ(yy, mm, dd, hh, mt, ss);
  
          rt['mz'] = window.calendar.mz[xb]; //命造乾坤
          rt['xb'] = window.calendar.xb[xb]; //性别0男1女
          rt['gl'] = [yy, mm, dd]; //公历生日
          rt['nl'] = window.calendar.Solar2Lunar(yy, mm, dd); //农历生日
          rt['tg'] = tg; //八字天干数组
          rt['dz'] = dz; //八字地支数组
          rt['sz'] = []; //四柱字符
          rt['ctg'] = []; //天干字符
          rt['cdz'] = []; //地支字符
          for (var i = 0; i <= 3; i++) {
              rt['sz'][i] = window.calendar.ctg[tg[i]] + window.calendar.cdz[dz[i]];
              rt['ctg'][i] = window.calendar.ctg[tg[i]];
              rt['cdz'][i] = window.calendar.cdz[dz[i]];
          }
          rt['sx'] = window.calendar.csx[dz[0]]; //生肖,與年地支對應
          rt['xz'] = window.calendar.cxz[xz]; //星座
          rt['cyy'] = window.calendar.cyy[yytg[2]]; //日干阴阳
  

// 十二长生 (星运)
const getPillarLifeStages = (riGan, baziDz) => {
    const riGanIdx = window.calendar.ctg.indexOf(riGan);
    const szs = [1, 6, 10, 9, 10, 9, 7, 0, 4, 3]; //日干对地支为"子"者所对应的运程代码
    return baziDz.map(zhi => {
        const zhiIdx = window.calendar.cdz.indexOf(zhi);
        const stageIdx = (24 + szs[riGanIdx] + Math.pow(-1, riGanIdx) * zhiIdx) % 12;
        return window.calendar.czs[stageIdx];
    });
};
rt['pillarLifeStages'] = getPillarLifeStages(rt['ctg'][2], rt['cdz']);
rt['baziYear'] = ob.ty; // 添加八字所在的节气年，用于精确计算流年

// 命宫
// 地支寅月为2, 卯月为3...丑月为1; 时支子为0, 丑为1...亥为11
const mingGongZhiIndex = (3 - dz[1] - dz[3] + 24) % 12;
const yearGanIndex = tg[0];
const tigerMonthGan = [2, 4, 6, 8, 0]; // 丙, 戊, 庚, 壬, 甲 for 甲己, 乙庚, 丙辛, 丁壬, 戊癸
const monthGanStart = tigerMonthGan[Math.floor(yearGanIndex / 2)];
// 月干以寅(2)为始，所以要减去2
const mingGongGanIndex = (monthGanStart + mingGongZhiIndex - 2 + 12) % 10;
rt['mingGong'] = window.calendar.ctg[mingGongGanIndex] + window.calendar.cdz[mingGongZhiIndex];

// 格局和旺衰
rt['pattern'] = this.getBaziPattern(tg, dz);
rt['strength'] = this.getStrengthInfo(tg, dz);

          // --- 流月、流日计算 ---
          rt['dy'].forEach(dayun => {
              dayun.liuNian = [];
              for (let i = 0; i < 10; i++) {
                  const year = dayun.syear + i;
                  if (year > dayun.eyear) continue;

                  const age = year - ob.ty;
                  const lnGanIndex = (rt.tg[0] + age) % 10;
                  const lnZhiIndex = (rt.dz[0] + age) % 12;
                  const yearGZ = window.calendar.ctg[lnGanIndex] + window.calendar.cdz[lnZhiIndex];
                  
                  const liuNianData = {
                      year: year,
                      age: age + 1,
                      ganZhi: yearGZ,
                      liuYue: []
                  };

                  // 计算流月
                  const currentYearGanIndex = window.calendar.ctg.indexOf(yearGZ[0]);
                  const tigerMonthGan = [2, 4, 6, 8, 0]; // 丙, 戊, 庚, 壬, 甲
                  const monthGanStart = tigerMonthGan[Math.floor(currentYearGanIndex / 2)];

                  for (let m = 0; m < 12; m++) {
                      const monthGan = window.calendar.ctg[(monthGanStart + m) % 10];
                      const monthZhi = window.calendar.cdz[(m + 2) % 12];
                      liuNianData.liuYue.push({
                          month: m + 1,
                          ganZhi: monthGan + monthZhi
                      });
                  }
                  dayun.liuNian.push(liuNianData);
              }
          });

          return rt;
      };

this.getStrengthInfo = function(tg, dz) {
    const riGan = tg[2];
    const riGanWuXing = window.calendar.wxtg[riGan];
    const yueZhi = dz[1];
    
    let score = 0;
    const analysis = [];

    // 1. 得令 (De Ling) - 40%
    const yueZhiWuXing = window.calendar.wxdz[yueZhi];
    if (yueZhiWuXing === riGanWuXing) {
        score += 40;
        analysis.push('得令');
    } else if (window.calendar.wuxingSheng[yueZhiWuXing] === riGanWuXing) {
        score += 20;
        analysis.push('得令');
    }

    // 2. 得地 (De Di) - 30% (日支 15%, 年时支 15%)
    const deDiZhis = [];
    // 日支
    const riZhi = dz[2];
    const riZhiWuXing = window.calendar.wxdz[riZhi];
    if (riZhiWuXing === riGanWuXing || window.calendar.wuxingSheng[riZhiWuXing] === riGanWuXing) {
        score += 15;
        deDiZhis.push(window.calendar.cdz[riZhi]);
    }
    // 年时支
    [dz[0], dz[3]].forEach(zhi => {
        const zhiWuXing = window.calendar.wxdz[zhi];
        if (zhiWuXing === riGanWuXing || window.calendar.wuxingSheng[zhiWuXing] === riGanWuXing) {
            score += 7.5;
            deDiZhis.push(window.calendar.cdz[zhi]);
        }
    });
    if (deDiZhis.length > 0) {
        analysis.push(`得地于(${deDiZhis.join(',')})`);
    }

    // 3. 得助 (De Zhu) - 30%
    const deZhuGans = [];
    [tg[0], tg[1], tg[3]].forEach(gan => {
        const ganWuXing = window.calendar.wxtg[gan];
        if (ganWuXing === riGanWuXing || window.calendar.wuxingSheng[ganWuXing] === riGanWuXing) {
            score += 10;
            deZhuGans.push(window.calendar.ctg[gan]);
        }
    });
    if (deZhuGans.length > 0) {
        analysis.push(`得助于(${deZhuGans.join(',')})`);
    }

    let result;
    if (score >= 55) result = '身强';
    else if (score >= 45) result = '中和';
    else result = '身弱';

    return {
        score: Math.round(score),
        analysis: result,
        details: analysis.join(', ')
    };
};

this.getBaziPattern = function(tg, dz) {
    const riGan = tg[2];
    const yueZhi = dz[1];
    const yueCangGan = window.calendar.zcg[yueZhi].filter(g => g !== -1);
    
    // 检查月令藏干是否透出
    const touGan = [tg[0], tg[1], tg[3]].find(g => yueCangGan.includes(g));

    let patternGan;
    if (touGan !== undefined) {
        patternGan = touGan;
    } else {
        // 无透干，取月令主气为格
        patternGan = yueCangGan[0];
    }

    const patternTenGod = window.calendar.ssq[window.calendar.dgs[patternGan][riGan]];
    
    // 处理特殊情况，如日主本身的比肩劫财不立格
    if (['比肩', '劫财'].includes(patternTenGod)) {
        // 如果是建禄月刃格，但有官杀透出，则取官杀为格
        const guanSha = [tg[0], tg[1], tg[3]].find(g => {
            const tenGod = window.calendar.ssq[window.calendar.dgs[g][riGan]];
            return tenGod === '正官' || tenGod === '七杀';
        });
        if (guanSha) {
            return window.calendar.ssq[window.calendar.dgs[guanSha][riGan]] + '格';
        }
        return '建禄格'; // 或月刃格，这里简化
    }

    return patternTenGod + '格';
};

 this.queryShenSha = function(pillarGZ, baziArray, isMan, pillarIndex) {
     const gan = pillarGZ[0];
     const zhi = pillarGZ[1];
     const cdz = window.calendar.cdz;
     const ctg = window.calendar.ctg;
 
     const nianGZ = baziArray[0];
     const yueGZ = baziArray[1];
     const riGZ = baziArray[2];
     const shiGZ = baziArray[3];
 
     const nianGan = nianGZ[0];
     const nianZhi = nianGZ[1];
     const yueZhi = yueGZ[1];
     const riGan = riGZ[0];
     const riZhi = riGZ[1];
     const shiZhi = shiGZ[1];
 
 
     const results = [];
     const isYangNian = ['甲', '丙', '戊', '庚', '壬'].includes(nianGan);
     const isYangRi = ['甲', '丙', '戊', '庚', '壬'].includes(riGan);
 
     // Helper for indexing
     const zhiIdx = (z) => cdz.indexOf(z);
     const ganIdx = (g) => ctg.indexOf(g);
 
     // --- Define all ShenSha rules here ---
     const rules = {
         '天乙贵人': () => {
             const map = { '甲': ['丑', '未'], '戊': ['丑', '未'], '庚': ['丑', '未'], '乙': ['子', '申'], '己': ['子', '申'], '丙': ['亥', '酉'], '丁': ['亥', '酉'], '壬': ['卯', '巳'], '癸': ['卯', '巳'], '辛': ['寅', '午'] };
             if ((map[nianGan] && map[nianGan].includes(zhi)) || (map[riGan] && map[riGan].includes(zhi))) return true;
             return false;
         },
         '天德贵人': () => {
             const map = { '寅': '丁', '卯': '申', '辰': '壬', '巳': '辛', '午': '亥', '未': '甲', '申': '癸', '酉': '寅', '戌': '丙', '亥': '乙', '子': '巳', '丑': '庚' };
             return map[yueZhi] === gan || map[yueZhi] === zhi;
         },
         '月德贵人': () => {
             // 寅午戌月在丙，申子辰月在壬，亥卯未月在甲，巳酉丑月在庚。
             const map = {
                 '寅': '丙', '午': '丙', '戌': '丙',
                 '申': '壬', '子': '壬', '辰': '壬',
                 '亥': '甲', '卯': '甲', '未': '甲',
                 '巳': '庚', '酉': '庚', '丑': '庚'
             };
             return map[yueZhi] === gan;
         },
         '天德合': () => {
             const map = { '寅': '壬', '卯': '乙', '辰': '丁', '巳': '丙', '午': '丁', '未': '己', '申': '戊', '酉': '己', '戌': '辛', '亥': '庚', '子': '壬', '丑': '乙' };
             return map[yueZhi] === gan;
         },
         '月德合': () => {
             const map = { '寅': '辛', '午': '辛', '戌': '辛', '申': '丁', '子': '丁', '辰': '丁', '亥': '己', '卯': '己', '未': '己', '巳': '乙', '酉': '乙', '丑': '乙' };
             return map[yueZhi] === gan;
         },
         '天赦日': () => {
             const map = { '寅': '戊寅', '卯': '甲午', '辰': '戊寅', '巳': '甲午', '午': '戊寅', '未': '甲午', '申': '戊申', '酉': '甲子', '戌': '戊申', '亥': '甲子', '子': '戊申', '丑': '甲子' };
             return map[yueZhi] === riGZ;
         },
         '禄神': () => {
             const map = { '甲': '寅', '乙': '卯', '丙': '巳', '戊': '巳', '丁': '午', '己': '午', '庚': '申', '辛': '酉', '壬': '亥', '癸': '子' };
             return map[riGan] === zhi;
         },
         '驿马': () => {
             const map = { '申': '寅', '子': '寅', '辰': '寅', '亥': '巳', '卯': '巳', '未': '巳', '寅': '申', '午': '申', '戌': '申', '巳': '亥', '酉': '亥', '丑': '亥' };
             return map[nianZhi] === zhi || map[riZhi] === zhi;
         },
         '太极贵人': () => {
             const map = { '甲': ['子', '午'], '乙': ['子', '午'], '丙': ['卯', '酉'], '丁': ['卯', '酉'], '戊': ['辰', '戌', '丑', '未'], '己': ['辰', '戌', '丑', '未'], '庚': ['寅', '亥'], '辛': ['寅', '亥'], '壬': ['申', '巳'], '癸': ['申', '巳'] };
             return (map[nianGan] && map[nianGan].includes(zhi)) || (map[riGan] && map[riGan].includes(zhi));
         },
         '将星': () => {
             const map = { '申': '子', '子': '子', '辰': '子', '亥': '卯', '卯': '卯', '未': '卯', '寅': '午', '午': '午', '戌': '午', '巳': '酉', '酉': '酉', '丑': '酉' };
             return map[nianZhi] === zhi || map[riZhi] === zhi;
         },
         '学堂': () => {
             const map = { '甲': '亥', '乙': '午', '丙': '寅', '丁': '酉', '戊': '寅', '己': '酉', '庚': '巳', '辛': '子', '壬': '申', '癸': '卯' };
             return map[nianGan] === zhi;
         },
         '词馆': () => {
             const map = { '甲': '寅', '乙': '卯', '丙': '巳', '丁': '午', '戊': '申', '己': '酉', '庚': '亥', '辛': '子', '壬': '亥', '癸': '子' };
             return map[nianGan] === zhi;
         },
         '国印贵人': () => {
             const map = { '甲': '戌', '乙': '亥', '丙': '丑', '丁': '寅', '戊': '丑', '己': '寅', '庚': '辰', '辛': '巳', '壬': '未', '癸': '申' };
             return map[nianGan] === zhi || map[riGan] === zhi;
         },
         '三奇贵人': () => {
             if (pillarIndex !== 4) return false; // 只在最后一柱计算一次
             const gans = baziArray.map(p => p[0]);
             const sanQi = [['甲', '戊', '庚'], ['乙', '丙', '丁'], ['壬', '癸', '辛']];
             return sanQi.some(qi => qi.every(q => gans.includes(q)));
         },
         '文昌贵人': () => {
            const map = { '甲': '巳', '乙': '午', '丙': '申', '戊': '申', '丁': '酉', '己': '酉', '庚': '亥', '辛': '子', '壬': '寅', '癸': '卯' };
            return map[nianGan] === zhi || map[riGan] === zhi;
        },
         '华盖': () => {
             const map = { '申': '辰', '子': '辰', '辰': '辰', '亥': '未', '卯': '未', '未': '未', '寅': '戌', '午': '戌', '戌': '戌', '巳': '丑', '酉': '丑', '丑': '丑' };
             return map[nianZhi] === zhi || map[riZhi] === zhi;
         },
         '天医': () => {
             // 正月生见丑，二月生见寅，为前一位
             const targetIdx = (zhiIdx(yueZhi) - 1 + 12) % 12;
             return cdz[targetIdx] === zhi;
         },
         '金舆': () => {
             const map = { '甲': '辰', '乙': '巳', '丙': '未', '丁': '申', '戊': '未', '己': '申', '庚': '戌', '辛': '亥', '壬': '丑', '癸': '寅' };
             return map[riGan] === zhi;
         },
         '灾煞': () => {
             const map = { '申': '午', '子': '午', '辰': '午', '亥': '酉', '卯': '酉', '未': '酉', '寅': '子', '午': '子', '戌': '子', '巳': '卯', '酉': '卯', '丑': '卯' };
             return map[nianZhi] === zhi;
         },
         '劫煞': () => {
             const map = { '申': '巳', '子': '巳', '辰': '巳', '亥': '申', '卯': '申', '未': '申', '寅': '亥', '午': '亥', '戌': '亥', '巳': '寅', '酉': '寅', '丑': '寅' };
             return map[nianZhi] === zhi;
         },
         '亡神': () => {
             const map = { '申': '亥', '子': '亥', '辰': '亥', '亥': '寅', '卯': '寅', '未': '寅', '寅': '巳', '午': '巳', '戌': '巳', '巳': '申', '酉': '申', '丑': '申' };
             return map[nianZhi] === zhi || map[riZhi] === zhi;
         },
         '飞刃': () => {
             const map = { '甲': '酉', '乙': '戌', '丙': '子', '戊': '子', '丁': '丑', '己': '丑', '庚': '卯', '辛': '辰', '壬': '午', '癸': '未' };
             return map[riGan] === zhi;
         },
         '血刃': () => {
             // 以月支的前一位为血刃。例如寅月在丑，卯月在寅。
             const targetIdx = (zhiIdx(yueZhi) - 1 + 12) % 12;
             return cdz[targetIdx] === zhi;
         },
         '四废日': () => {
             if (pillarIndex !== 3) return false;
             const map = { '春': ['庚申', '辛酉'], '夏': ['壬子', '癸亥'], '秋': ['甲寅', '乙卯'], '冬': ['丙午', '丁巳'] };
             const season = { '寅': '春', '卯': '春', '辰': '春', '巳': '夏', '午': '夏', '未': '夏', '申': '秋', '酉': '秋', '戌': '秋', '亥': '冬', '子': '冬', '丑': '冬' };
             return map[season[yueZhi]] && map[season[yueZhi]].includes(riGZ);
         },
         '天罗': () => {
             if (zhi === '戌' || zhi === '亥') {
                 if (baziArray.some(p => p[1] === '辰' || p[1] === '巳')) return true;
             }
             return false;
         },
         '地网': () => {
             if (zhi === '辰' || zhi === '巳') {
                 if (baziArray.some(p => p[1] === '戌' || p[1] === '亥')) return true;
             }
             return false;
         },
         '桃花': () => {
             const map = { '申': '酉', '子': '酉', '辰': '酉', '亥': '子', '卯': '子', '未': '子', '寅': '卯', '午': '卯', '戌': '卯', '巳': '午', '酉': '午', '丑': '午' };
             return map[nianZhi] === zhi || map[riZhi] === zhi;
         },
         '孤辰': () => {
             const map = { '亥': '寅', '子': '寅', '丑': '寅', '寅': '巳', '卯': '巳', '辰': '巳', '巳': '申', '午': '申', '未': '申', '申': '亥', '酉': '亥', '戌': '亥' };
             return map[nianZhi] === zhi;
         },
         '寡宿': () => {
             const map = { '亥': '戌', '子': '戌', '丑': '戌', '寅': '丑', '卯': '丑', '辰': '丑', '巳': '辰', '午': '辰', '未': '辰', '申': '未', '酉': '未', '戌': '未' };
             return map[nianZhi] === zhi;
         },
         '阴差阳错': () => pillarIndex === 3 && ['丙子', '丁丑', '戊寅', '辛卯', '壬辰', '癸巳', '丙午', '丁未', '戊申', '辛酉', '壬戌', '癸亥'].includes(riGZ),
         '魁罡': () => pillarIndex === 3 && ['庚辰', '壬辰', '戊戌', '庚戌'].includes(riGZ),
         '孤鸾煞': () => pillarIndex === 3 && ['乙巳', '丁巳', '辛亥', '戊申', '壬子', '戊午', '丙午', '甲寅'].includes(riGZ),
         '红鸾': () => {
             const map = {'子':'卯', '丑':'寅', '寅':'丑', '卯':'子', '辰':'亥', '巳':'戌', '午':'酉', '未':'申', '申':'未', '酉':'午', '戌':'巳', '亥':'辰'};
             return map[nianZhi] === zhi;
         },
         '天喜': () => {
             const hongLuanMap = {'子':'卯', '丑':'寅', '寅':'丑', '卯':'子', '辰':'亥', '巳':'戌', '午':'酉', '未':'申', '申':'未', '酉':'午', '戌':'巳', '亥':'辰'};
             const hongLuanZhi = hongLuanMap[nianZhi];
             const clashMap = { '子': '午', '丑': '未', '寅': '申', '卯': '酉', '辰': '戌', '巳': '亥', '午':'子', '未':'丑', '申':'寅', '酉':'卯', '戌':'辰', '亥':'巳' };
             const tianXiZhi = clashMap[hongLuanZhi];
             return tianXiZhi === zhi;
         },
         '勾绞煞': () => {
             const gouMap = { '子':'卯', '丑':'辰', '寅':'巳', '卯':'午', '辰':'未', '巳':'申', '午':'酉', '未':'戌', '申':'亥', '酉':'子', '戌':'丑', '亥':'寅' };
             const jiaoMap = { '子':'酉', '丑':'戌', '寅':'亥', '卯':'子', '辰':'丑', '巳':'寅', '午':'卯', '未':'辰', '申':'巳', '酉':'午', '戌':'未', '亥':'申' };
             if (gouMap[nianZhi] === zhi || jiaoMap[nianZhi] === zhi) {
                 return '勾绞煞';
             }
             return false;
         },
         '红艳煞': () => {
             const map = { '甲': '午', '乙': '申', '丙': '寅', '丁': '未', '戊': '辰', '己': '辰', '庚': '戌', '辛': '酉', '壬': '子', '癸': '申' };
             return map[riGan] === zhi;
         },
         '元辰': () => {
             let targetIdx;
             if ((isYangNian && isMan) || (!isYangNian && !isMan)) { // 阳男阴女
                 targetIdx = (zhiIdx(nianZhi) + 7) % 12;
             } else { // 阴男阳女
                 targetIdx = (zhiIdx(nianZhi) - 7 + 12) % 12;
             }
             return cdz[targetIdx] === zhi;
         },
         '金神': () => (pillarIndex === 3 || pillarIndex === 4) && ['乙丑', '己巳', '癸酉'].includes(pillarGZ),
         '天转': () => pillarIndex === 3 && yueZhi === '卯' && riGan === '乙',
         '地转': () => pillarIndex === 3 && yueZhi === '酉' && riGan === '辛',
         '丧门': () => {
             const targetIdx = (zhiIdx(nianZhi) + 2) % 12;
             return cdz[targetIdx] === zhi;
         },
         '吊客': () => {
             const targetIdx = (zhiIdx(nianZhi) - 2 + 12) % 12;
             return cdz[targetIdx] === zhi;
         },
         '披麻': () => {
             const targetIdx = (zhiIdx(nianZhi) - 1 + 12) % 12;
             return cdz[targetIdx] === zhi;
         },
         '十灵日': () => pillarIndex === 3 && ['癸亥', '壬寅', '辛巳', '庚申', '己酉', '戊午', '丁丑', '丙辰', '乙未', '甲戌'].includes(riGZ),
         '六秀日': () => pillarIndex === 3 && ['丙午', '丁未', '戊子', '戊午', '己丑', '己未'].includes(riGZ),
         '八专': () => pillarIndex === 3 && ['甲寅', '乙卯', '己未', '丁巳', '庚申', '辛酉', '戊戌', '癸丑'].includes(riGZ),
         '九丑': () => pillarIndex === 3 && ['戊子', '戊午', '壬子', '壬午', '乙卯', '辛卯', '乙酉', '辛酉', '己卯', '己酉'].includes(riGZ),
         '天厨贵人': () => {
             const shiShenGanMap = { '甲':'丙', '乙':'丁', '丙':'戊', '丁':'己', '戊':'庚', '己':'辛', '庚':'壬', '辛':'癸', '壬':'甲', '癸':'乙' };
             const luZhiMap = { '甲': '寅', '乙': '卯', '丙': '巳', '戊': '巳', '丁': '午', '己': '午', '庚': '申', '辛': '酉', '壬': '亥', '癸': '子' };
             const shiShenGan = shiShenGanMap[riGan];
             const tianChuZhi = luZhiMap[shiShenGan];
             return tianChuZhi === zhi;
         },
         '福星贵人': () => {
             const map = { '甲': ['寅', '子'], '丙': ['寅', '子'], '戊': ['申'], '己': ['未'], '丁': ['亥'], '乙': ['丑', '卯'], '癸': ['丑', '卯'], '庚': ['午'], '辛': ['巳'], '壬': ['辰'] };
             return map[riGan] && map[riGan].includes(zhi);
         },
         '德秀贵人': () => {
             const yueGroup = {
                 '寅': '寅午戌', '午': '寅午戌', '戌': '寅午戌', '申': '申子辰', '子': '申子辰', '辰': '申子辰',
                 '巳': '巳酉丑', '酉': '巳酉丑', '丑': '巳酉丑', '亥': '亥卯未', '卯': '亥卯未', '未': '亥卯未'
             };
             const ruleMap = {
                 '寅午戌': ['丙', '丁', '戊', '癸'], '申子辰': ['壬', '癸', '甲', '乙', '庚'],
                 '巳酉丑': ['庚', '辛', '丙', '丁', '己'], '亥卯未': ['甲', '乙', '壬', '癸', '辛']
             };
             const group = yueGroup[yueZhi];
             return group && ruleMap[group].includes(gan);
         },
         '羊刃': () => {
             // 帝旺, 阳干取之
             const map = { '甲': '卯', '丙': '午', '戊': '午', '庚': '酉', '壬': '子' };
             return map[riGan] === zhi;
         },
         '流霞': () => {
             const map = { '甲': '酉', '乙': '戌', '丙': '未', '丁': '申', '戊': '巳', '己': '午', '庚': '辰', '辛': '卯', '壬': '亥', '癸': '寅' };
             return map[riGan] === zhi;
         },
         '童子煞': () => {
             if (pillarIndex < 2) return false; // 只在日柱和时柱检查
             const springAutumn = ['寅', '卯', '辰', '申', '酉', '戌'];
             const winterSummer = ['巳', '午', '未', '亥', '子', '丑'];
             if (springAutumn.includes(yueZhi)) {
                 return zhi === '寅' || zhi === '子';
             }
             if (winterSummer.includes(yueZhi)) {
                 return zhi === '卯' || zhi === '未' || zhi === '辰';
             }
             return false;
         }
     };
 
     for (const name in rules) {
         const result = rules[name]();
         if (result) {
             if (typeof result === 'string') {
                 results.push(result);
             } else {
                 results.push(name);
             }
         }
     }
 
     return [...new Set(results)];
  };
 
  this.getWuxingStatus = function(yueZhi) {
     const yueZhiIndex = window.calendar.cdz.indexOf(yueZhi);
     const wuxingNames = ['水', '木', '火', '土', '金'];
     const statusNames = ['旺', '相', '休', '囚', '死'];
     let statusResult = {};
 
     // 旺相休囚死规律:
     // 我生者相，生我者休，克我者囚，我克者死
     // 春(木): 木旺, 火相, 水休, 金囚, 土死 (木生火，水生木，金克木，木克土)
     // 夏(火): 火旺, 土相, 木休, 水囚, 金死 (火生土，木生火，水克火，火克金)
     // 秋(金): 金旺, 水相, 土休, 火囚, 木死 (金生水，土生金，火克金，金克木)
     // 冬(水): 水旺, 木相, 金休, 土囚, 火死 (水生木，金生水，土克水，水克火)
     // 辰戌丑未四季月(土): 土旺, 金相, 火休, 木囚, 水死 (土生金，火生土，木克土，土克水)
 
     const seasonStatusMap = {
         // 春 (寅卯辰)
         2: { '木': '旺', '火': '相', '水': '休', '金': '囚', '土': '死' },
         3: { '木': '旺', '火': '相', '水': '休', '金': '囚', '土': '死' },
         // 夏 (巳午未)
         5: { '火': '旺', '土': '相', '木': '休', '水': '囚', '金': '死' },
         6: { '火': '旺', '土': '相', '木': '休', '水': '囚', '金': '死' },
         // 秋 (申酉戌)
         8: { '金': '旺', '水': '相', '土': '休', '火': '囚', '木': '死' },
         9: { '金': '旺', '水': '相', '土': '休', '火': '囚', '木': '死' },
         // 冬 (亥子丑)
         11: { '水': '旺', '木': '相', '金': '休', '土': '囚', '火': '死' },
         0: { '水': '旺', '木': '相', '金': '休', '土': '囚', '火': '死' },
         // 四季 (辰戌丑未)
         4: { '土': '旺', '金': '相', '火': '休', '木': '囚', '水': '死' },
         7: { '土': '旺', '金': '相', '火': '休', '木': '囚', '水': '死' },
         10: { '土': '旺', '金': '相', '火': '休', '木': '囚', '水': '死' },
         1: { '土': '旺', '金': '相', '火': '休', '木': '囚', '水': '死' },
     };
     
     const season = seasonStatusMap[yueZhiIndex];
     if (season) {
         return `木${season['木']}，火${season['火']}，土${season['土']}，金${season['金']}，水${season['水']}`;
     }
     return '无法确定五行状态';
 };
 
 this.getRelationships = function(baziSz) {
     const ctg = baziSz.map(p => p[0]);
     const cdz = baziSz.map(p => p[1]);
     const relationships = {
         tianGanHe: [],
         tianGanKe: [],
         diZhiSanHui: [],
         diZhiSanHe: [],
        diZhiLiuHe: [],
        diZhiChong: [],
        diZhiXing: [],
        diZhiHai: [],
        diZhiPo: []
    };

    // --- 天干五合 ---
    const tgHeMap = { '甲': '己', '乙': '庚', '丙': '辛', '丁': '壬', '戊': '癸' };
    const heHuaMap = { '甲己': '土', '乙庚': '金', '丙辛': '水', '丁壬': '木', '戊癸': '火' };
    const checkedTgPairs = new Set();
    for (let i = 0; i < 4; i++) {
        for (let j = i + 1; j < 4; j++) {
            const pairKey = [ctg[i], ctg[j]].sort().join('');
            if (checkedTgPairs.has(pairKey)) continue;
            if (tgHeMap[ctg[i]] === ctg[j] || tgHeMap[ctg[j]] === ctg[i]) {
                relationships.tianGanHe.push({ gans: [ctg[i], ctg[j]], he: heHuaMap[pairKey] });
            }
            checkedTgPairs.add(pairKey);
        }
    }

    // --- 天干相克 ---
    const checkedTgKePairs = new Set();
    for (let i = 0; i < 4; i++) {
        for (let j = i + 1; j < 4; j++) {
            const pairKey = [ctg[i], ctg[j]].sort().join('');
            if (checkedTgKePairs.has(pairKey)) continue;

            const gan1Wuxing = window.calendar.wxtg[window.calendar.ctg.indexOf(ctg[i])];
            const gan2Wuxing = window.calendar.wxtg[window.calendar.ctg.indexOf(ctg[j])];

            if (window.calendar.wuxingKe[gan1Wuxing] === gan2Wuxing) {
                relationships.tianGanKe.push({ gans: [ctg[i], ctg[j]] });
                checkedTgKePairs.add(pairKey);
            } else if (window.calendar.wuxingKe[gan2Wuxing] === gan1Wuxing) {
                relationships.tianGanKe.push({ gans: [ctg[j], ctg[i]] });
                checkedTgKePairs.add(pairKey);
            }
        }
    }

    // --- 地支关系 ---
    const uniqueZhi = [...new Set(cdz)];

    // 三会
    const sanHuiMap = {
        '木': ['寅', '卯', '辰'], '火': ['巳', '午', '未'],
        '金': ['申', '酉', '戌'], '水': ['亥', '子', '丑']
    };
    for (const [type, members] of Object.entries(sanHuiMap)) {
        if (members.every(m => uniqueZhi.includes(m))) {
            relationships.diZhiSanHui.push({ type: `${type}方`, members });
        }
    }

    // 三合
    const sanHeMap = {
        '水': ['申', '子', '辰'], '木': ['亥', '卯', '未'],
        '火': ['寅', '午', '戌'], '金': ['巳', '酉', '丑']
    };
    for (const [type, members] of Object.entries(sanHeMap)) {
        const foundMembers = members.filter(m => uniqueZhi.includes(m));
        if (foundMembers.length === 3) {
            relationships.diZhiSanHe.push({ type: `${type}局`, members: foundMembers });
        } else if (foundMembers.length === 2) {
            const zhongShen = members[1];
            if (foundMembers.includes(zhongShen)) {
                 relationships.diZhiSanHe.push({ type: `${type}半合`, members: foundMembers });
            }
        }
    }
    
    const checkedDzPairs = new Set();
    for (let i = 0; i < 4; i++) {
        for (let j = i + 1; j < 4; j++) {
            const zhi1 = cdz[i];
            const zhi2 = cdz[j];
            const pairKey = [zhi1, zhi2].sort().join('');
            if (checkedDzPairs.has(pairKey)) continue;

            const liuHeMap = {'子':'丑','寅':'亥','卯':'戌','辰':'酉','巳':'申','午':'未'};
            if (liuHeMap[zhi1] === zhi2 || liuHeMap[zhi2] === zhi1) {
                relationships.diZhiLiuHe.push({ zhis: [zhi1, zhi2] });
            }
            const chongMap = {'子':'午','丑':'未','寅':'申','卯':'酉','辰':'戌','巳':'亥'};
            if (chongMap[zhi1] === zhi2 || chongMap[zhi2] === zhi1) {
                relationships.diZhiChong.push({ zhis: [zhi1, zhi2] });
            }
            const haiMap = {'子':'未','丑':'午','寅':'巳','卯':'辰','申':'亥','酉':'戌'};
            if (haiMap[zhi1] === zhi2 || haiMap[zhi2] === zhi1) {
                relationships.diZhiHai.push({ zhis: [zhi1, zhi2] });
            }
            const poMap = {'子':'酉','卯':'午','辰':'丑','未':'戌','寅':'亥','巳':'申'};
             if (poMap[zhi1] === zhi2 || poMap[zhi2] === zhi1) {
                relationships.diZhiPo.push({ zhis: [zhi1, zhi2] });
            }
            checkedDzPairs.add(pairKey);
        }
    }

    // 相刑
    const xingMap = {
        '无恩之刑': ['寅', '巳', '申'],
        '恃势之刑': ['丑', '戌', '未'],
    };
    for (const [type, members] of Object.entries(xingMap)) {
        const found = members.filter(m => uniqueZhi.includes(m));
        if (found.length >= 2) {
            relationships.diZhiXing.push({ type, members: found });
        }
    }
    if (uniqueZhi.includes('子') && uniqueZhi.includes('卯')) {
        relationships.diZhiXing.push({ type: '无礼之刑', members: ['子', '卯'] });
    }
    ['辰', '午', '酉', '亥'].forEach(z => {
        if (cdz.filter(item => item === z).length >= 2) {
            relationships.diZhiXing.push({ type: '自刑', members: [z, z] });
        }
    });

    // Filter out empty relationship arrays
    for (const key in relationships) {
        if (relationships[key].length === 0) {
            delete relationships[key];
        }
    }

    return relationships;
};
 }
 window.p = new paipan();