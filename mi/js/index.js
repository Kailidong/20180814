//轮播图
(function () {
    let $swiper = $("#s_banner2Swiper");
    let $imgs = $("#s_banner2Swiper img");
    let $imgLength = $imgs.length;
    let outer = $("#s_banner_2Right")[0];
    $imgs.eq(0).fadeIn().siblings().fadeOut();
    $("#s_banner2Focus li").eq(0).addClass("select").siblings().removeClass("select");
    outer.timer = setInterval(autoMove,4000);
    outer.step = 0;
    function autoMove(n) {
        outer.step++;
        typeof n!=="undefined"?outer.step = n:null;
        outer.step===4?outer.step = 0:null;
        $imgs.eq(outer.step).fadeIn().siblings().fadeOut();
        $("#s_banner2Focus li").eq(outer.step).addClass("select").siblings().removeClass("select");
    }
    $swiper.hover(function () {
        clearInterval(outer.timer);
    },function () {
        outer.timer = setInterval(autoMove,4000);
    });
    $("#s_banner2Focus li").hover(function () {
        $(this).addClass("select").siblings().removeClass("select");
        $("#s_banner2Focus li").eq(outer.step).addClass("select");
    },function () {
        $(this).removeClass("select")
    });
    $("#s_banner2Focus li").click(function () {
        autoMove($(this).index());
    });
    $("#s_banner2After").click(function () {
        autoMove();
    });
    $("#s_banner2Before").click(function () {
        outer.step -= 2;
        if(outer.step<-1){
            outer.step = $imgLength-2;
        }
        autoMove();
    });
})();
(function () {
    /*<!--------------封装请求方法------------>*/
    function requestData(url) {
        let data;
        let xhr = new XMLHttpRequest();
        xhr.open("get",url,false);
        xhr.onreadystatechange = function () {
            if(xhr.readyState===4&&xhr.status===200){
                data = JSON.parse(xhr.responseText);
            }
        };
        xhr.send();
        return data;
    }
    /*<---------------封装请求方法------------>*/


    /*<!-------------banner侧导航部分------------>*/
    //1、获取元素
    let s_ul = document.getElementById("s_banner_2Left_ul");
    let liList = s_ul.getElementsByClassName("s_banner_2Left_li");
    //2、请求、绑定导航部分数据
    let allData = requestData("json/banner.json");
    function bind(data) {
        var str = ``;
        for (var i = 0; i < data.length; i++) {
            var cur = data[i];
            str +=  `<li class="s_banner_2Left_li">
                        <a href="javascript:;">
                            ${cur.title}<i class="iconfont"></i>
                        </a>
                        <div class="s_banner_2Left_div">
                        </div>
                    </li>`;
        }
        s_ul.innerHTML = str;
    }
    bind(allData);
    //3、存储json数据的路径
    let ary = ["banner_Phone","banner_View","banner_Picture","banner_elec",
        "banner_GoOut","banner_Inter","banner_Power","banner_Child","banner_headset",
        "banner_lift"];
    //4、请求、绑定导航列表具体内容数据
    for (var i = 0; i < liList.length; i++) {
        let curDiv = liList[i].children[1];
        curDiv.data = requestData("json/"+ary[i]+".json");
        console.log(curDiv.data);
        let data = curDiv.data
        let numUL = Math.ceil(data.length / 6);
        let widDiv = 248 * numUL;
        curDiv.style.width = widDiv + "px";
        bindData(curDiv, numUL, curDiv.data);
    }
    //5、封装绑定每个导航列表具体内容方法
    function bindData(curEle,numUL,data) {
        for (let i = 0; i < numUL; i++) {
            let newul = document.createElement("ul");
            curEle.appendChild(newul);
        }
        let ulList = curEle.getElementsByTagName("ul");
        for (let i = 0; i < numUL; i++) {
            var str = ``;
            for (let j = 6*i; j < 6*(i+1); j++) {
                var cur = data[j];
                str +=  `<li>
                            <a href="javascript:;">
                                <img src=${cur.img} alt="">
                                <span>${cur.name}</span>
                            </a>
                        </li>`;
                if(j>=data.length-1){
                    break;
                }
            }
            ulList[i].innerHTML = str;
        }
    }
    /*<----------------banner侧导航部分-------------->*/


    /*<!---------------banner搜索导航部分------------>*/
    //1、获取元素
    let s_searchData = requestData("json/banner1_search.json");
    let s_searchList = document.getElementById("s_banner1Search_list");
    let s_searchListUL = s_searchList.getElementsByTagName("ul")[0];
    //2、绑定数据
    function s_searchBind() {
        let str = ``;
        for (var i = 0; i < s_searchData.length; i++) {
            let cur = s_searchData[i];
            str += `<li>
                         <a href="javascript:;">
                             ${cur.name}
                              <span>${cur.num}</span>
                         </a>
                     </li>`;
        }
        s_searchListUL.innerHTML = str;
    }
    s_searchBind();
    //3、触发事件
    let s_searchInput1 = document.getElementsByClassName("s_search_input1")[0];
    let s_searchInput2 = document.getElementsByClassName("s_search_input2")[0];
    s_searchInput1.onmouseover = function(){
        s_searchInput1.style.border = "1px solid #c9c9c9";
        s_searchInput2.style.border = "1px solid #c9c9c9";
    };
    s_searchInput1.onmouseout = function(){
        s_searchInput1.style.border = "";
        s_searchInput2.style.border = "";
    };
    s_searchInput1.onfocus = function () {
        s_searchList.style.display = "block";
    };
    s_searchInput1.onblur = function () {
        s_searchList.style.display = "none";
    };
    /*<!---------------banner搜索导航部分------------>*/


    /*<!-------------banner水平导航部分------------>*/
    //1、获取元素
    let aryNav = ["nav_miPho","nav_redmi","nav_view","nav_pic",
        "nav_box","nav_new","nav_luyouqi","nav_inter"];
    let s_navUL = document.getElementById("s_banner_nav");
    let s_navLiList = s_navUL.getElementsByClassName("binddata");
    //2、绑定导航栏数据
    function s_navBindCon() {
        let str = ``;
        for (var i = 0; i < s_navLiList.length; i++) {
            let newDiv = document.createElement("div");
            newDiv.className = "s_banner1Nav_Div";
            str = `<div class="content"><ul></ul></div>`;
            newDiv.innerHTML = str;
            s_navLiList[i].appendChild(newDiv);
        }
    }
    s_navBindCon();
    //3、请求、绑定导航列表具体内容
    for (var i = 0; i < s_navLiList.length; i++){
        let cur = s_navLiList[i];
        cur.data = requestData("json/"+aryNav[i]+".json");
        let ele = s_navLiList[i].children[1].children[0].children[0];
        s_navBindData(ele,cur.data);
    }
    //4、封装绑定导航列表具体内容方法
    function s_navBindData(curEle,data) {
        let str = ``;
        for (var i = 0; i < data.length; i++) {
            let cur = data[i];
            str += `<li>
                       <div class="s_banner1Con_img">
                           <a href="javascript">
                               <img src=${cur.img} alt="">
                           </a>
                       </div>
                       <div class="s_banner1Con_name">
                           <a href="javascript">${cur.name}</a>
                       </div>
                       <p class="s_banner1Con_p">${cur.price}</p>
                       <div class="s_banner1Con_flag">${cur.flag}</div>
                    </li>`;
        }
        curEle.innerHTML = str;
    }
    //5、处理数据中特殊样式
    let s_navFlagList = s_navUL.getElementsByClassName("s_banner1Con_flag");
    for (let i = 0; i < s_navFlagList.length; i++) {
        let curFl = s_navFlagList[i];
        if(curFl.innerHTML==""){
            curFl.style.border = "none";
        }
    }
    /*<---------------banner水平导航部分------------>*/
})();
//魏振东
~function () {
    var w_list =document.getElementById('w1_select'),
        w_row=document.getElementById('w1_row'),
        w1_li=[...w_list.children],
        w1_uldiv=w_row.children,
        w1_div=[...[].slice.call(w1_uldiv,1)];

    for (let i = 0; i < w1_li.length; i++) {
        w1_li[i].onmouseenter=function () {
            for (var j = 0; j < w1_li.length; j++) {
                w1_div[j].className='';
            }
            w1_div[i].className='choose';
        }
    }
}();

~function () {
    let before = document.getElementById('w2_before'),
        after = document.getElementById('w2_after'),
        list = document.getElementById('w2_list'),
        listlen = list.children.length;
    list.step = 0;

    function afterGo() {
        clearInterval(list.timer);
        let begin = list.W || 0;
        list.step += 5;
        list.W = -list.children[list.step].offsetLeft;
        let target = list.W;
        before.onclick = beforeGo;
        before.classList.remove('w2_disabble');
        if (list.step >= listlen - 5) {
            list.step = listlen - 5;
            this.classList.add('w2_disabble');
            this.onclick = null;
        }
        move(list, begin, target, 300)
    }

    function beforeGo() {
        clearInterval(list.timer);
        let begin = list.W || 0;
        list.step -= 5;
        list.W = -list.children[list.step].offsetLeft;
        let target = list.W;
        after.onclick = afterGo;
        after.classList.remove('w2_disabble');
        if (list.step <= 0) {
            list.step = 0;
            this.classList.add('w2_disabble');
            this.onclick = null;
        }
        move(list, begin, target, 300)
    }

    function lineal(t, b, c, d) {
        return t / d * c + b
    }

    function move(curEle, begin, target, duration) {
        let interval = 0, change = target - begin;
        curEle.timer = setInterval(function () {
            if (interval >= duration) {
                clearInterval(curEle.timer);
                curEle.style.left = target + 'px';
                return
            }
            curEle.style.left = lineal(interval, begin, change, duration) + 'px';
            interval += 17;
        }, 17)
    }

    after.onclick = afterGo;
    before.onclick = beforeGo;
}();
// 郭亚飞
(function () {
    function option(a,b) {
        let show = document.getElementById(a);
        let oli = show.getElementsByTagName("li");
        //let GYF = document.getElementById(b);
        let list = document.getElementById(b);
        let oul = list.getElementsByClassName("right");
        for (var i = 0; i < oli.length; i++) {
            var cur = oli[i];
            cur.i = i;
            cur.onmouseover = function () {
                for (var j = 0; j < oli.length; j++) {
                    oli[j].classList.remove("select");
                    oul[j].classList.remove("select");
                }
                this.classList.add("select");
                oul[this.i].classList.add("select");
            }


        }

    }
    option("show","list")
    option("show1","list1")
    option("show2","list2")

})();
// 董凯凯
let dkkSpace=function () {
    //设定动画效果
    let [chd_one,chd_two,chd_thrid,chd_four]=[document.getElementById("d_contenter-chd-one"),document.getElementById("d_contenter-chd-two"),document.getElementById("d_contenter-chd-thrid"),document.getElementById("d_contenter-chd-four")];
    function swriper(ele) {
        let left=ele.getElementsByClassName("swiperLeft")[0];
        let right=ele.getElementsByClassName("swiperRight")[0];
        let list=ele.getElementsByClassName("swiperList")[0];
        let uls=ele.getElementsByClassName("swiperSpan");
        let listLen=uls.length;
        list.step=0;
        list.style.left="0px";
        function move(n) {
            left.classList.remove("d_disable");
            right.classList.remove("d_disable");
            if(this===left){list.step--}else if(this===right){list.step++}
            typeof n==="number"?list.step=n:null;
            if(list.step===0){
                left.classList.add("d_disable");
                left.onclick=null;
            }else if(list.step===listLen-1){
                right.classList.add("d_disable");
                right.onclick=null;
            }else{
                left.onclick=move;
                right.onclick=move;
            }
            list.style.left=-296*list.step+"px";
            for (let i = 0; i < uls.length; i++) {
                uls[i].classList.remove("selset")
            }
            uls[list.step].classList.add("selset")

        }
        right.onclick=move;
        for (let i = 0; i < uls.length; i++) {
            uls[i].parentNode.onclick=function(){move(i);}
        }
    }
    swriper(chd_one);
    swriper(chd_two);
    swriper(chd_thrid);
    swriper(chd_four);
    //回到顶部部分
    function win(type,val) {
        if(typeof val==="undefined"){
            return document.documentElement[type]||document.body[type];
        }
        document.documentElement[type]=val;
        document.body[type]=val
    }
    let winH=win("clientHeight");
    let back=document.getElementById("backToTop");
    window.addEventListener("scroll",blockbut,false);
    function blockbut() {
        let scT = win("scrollTop");
        console.log(scT, winH);
        scT > winH ? back.style.display = "block" : back.style.display = "none";
    }
    back.addEventListener("click",backTop,false);
    function backTop(e){
        e=e||window.event;
        e.stopPropagation?e.stopPropagation():e.cancelable=true;
        win("scrollTop",0)
    }
    return {
        init:function () {

        }
    }
}();
//高明月
(function () {
    let option=document.getElementById('option');
    let tele=document.getElementsByClassName('tele');
    let opchild=option.children;
    for(let i=0;i<opchild.length;i++){
        let cur= opchild[i];
        cur.addEventListener('mouseenter',function () {
            for(let j=0;j<opchild.length;j++){
                opchild[j].classList.remove('one');
                tele[j].classList.remove('select')
            }
            tele[i].classList.add('select');
            opchild[i].classList.add('one')
        });

    }
})();

(function () {
    //倒计时
    let seckill=document.getElementById("seckill");
    let timeContent=seckill.getElementsByClassName("timers")[0];
    let ary=["00:00","04:00","08:00","12:00","16:00","20:00","00:00"];
    let aryStep=0;
    let mainitem=seckill.getElementsByClassName("mainitem")[0];
    let targrtTime=getTaget();//打开页面设定倒计时目标
    seckill.timer=setInterval(setTime,1000);
    function getTaget() {
        let news=new Date();
        let A=news.getFullYear();
        let B=news.getMonth();
        let C=news.getDate();
        let D=news.getHours();
        aryStep=Math.ceil(D/4);
        mainitem.innerHTML=ary[aryStep]+"场";
        D=Math.ceil(D/4)*4;
        let timeStr=`${A}-${B+1}-${C} ${D}:00:00`;
        return new Date(timeStr);
    }
    function addZeao(a) {
        a<10?a="0"+a:null;
        return a
    }
    function setTime() {
        let dfVal=targrtTime-new Date();
        let Hours=Math.floor(dfVal/1000/60/60);
        let Minutes=Math.floor((dfVal-Hours*3600*1000)/(1000*60));
        let Seconds=Math.floor((dfVal-Hours*3600*1000-Minutes*60*1000)/1000);
        if(Hours+Minutes+Seconds<=0){
            aryStep++;  //防止页面不刷新 出现倒计时为0情况
            aryStep===6?aryStep=0:null;
            mainitem.innerHTML=ary[aryStep]+"场";
            targrtTime=parseFloat(new Date()-0)+4*60*60*1000;
        }
        timeContent.innerHTML=`<div class="timecontent">${addZeao(Hours)}</div>
                <div>:</div>
                <div class="timecontent">${addZeao(Minutes)}</div>
                <div>:</div>
                <div class="timecontent">${addZeao(Seconds)}</div>`
    }
    setTime();
    let fast=document.getElementById("xm_fast");
    let before=fast.getElementsByClassName("f_before")[0];
    let after=fast.getElementsByClassName("f_after")[0];
    let ulist=fast.getElementsByClassName("u-list")[0];
    let olist=ulist.children;
    let step=0,len=olist.length;
    ulist.style.left="0px"
    function beforeGo() {
        after.classList.remove("f_disabble")
        after.onclick = afterGo;
        step-=4;
        if(step<=0){
            step=0;
            this.onclick=null;
            this.classList.add("f_disabble")
        }
        let w=-olist[step].offsetLeft;
        ulist.style.left=w+"px";
    }
    function afterGo() {
        before.classList.remove("f_disabble")
        before.onclick = beforeGo;
        step+=4;
        if(step>=len-4){
            step=len-4
            this.onclick=null;
            this.classList.add("f_disabble")
        }
        let w=-olist[step].offsetLeft;
        ulist.style.left=w+"px";
    }

    after.onclick = afterGo;

})();