// 导入本页css
require("../css/home.less");
document.ready(function () {

    // swiper
    var mySwiper = new Swiper('.swiper-container', {
        // direction: 'vertical', // 垂直切换选项
        loop: true, // 循环模式选项
        autoplay: true, //等同于以下设置
        autoplay: {
            delay: 3000,
            stopOnLastSlide: false,
            disableOnInteraction: false,
        },
        // 如果需要分页器
        pagination: {
            el: '.swiper-pagination',
        },

    });
    
    // 插入公共底部
    utils.addFooter("home");
    // 打卡
    // 获取dom
    let rank = document.querySelector(".greadeText");
    let insigniaNum = document.querySelector(".insigniaNum");
    let punchIn = document.querySelector(".punchIn");
    let todayOpenBtn = document.querySelector(".todayOpenBtn");
    let TrainingCourseDom=document.querySelector(".TrainingCourse");
    let MovementDataDom=document.querySelector(".MovementData");
    let badgeDom=document.querySelector(".badge");

    // 获取用户数据
    let user = JSON.parse(localStorage.getItem("user"));
    // 渲染
    function homeData() {
        $http.get("/headPageInfo?userId=" + user.userId, function (res) {
            // 判断是否成功请求
            if (res.status === 0) {
                rank.textContent = res.data.rank;
                insigniaNum.textContent = res.data.insigniaNum;
                punchIn.textContent = res.data.punchIn;
                // 判断是否打卡
                if ("true" === res.data.isPunch) {
                    todayOpenBtn.style.display = 'none';
                } else {
                    todayOpenBtn.style.display = 'block';
                }
            } else {
                window.location.href = "../login.html";
            }
        });
    };
    homeData();
    // 跳转至运动数据
    TrainingCourseDom.addEventListener("click",function(ev){
        location.href="../sportsDetail.html";
    });
    //  跳转至课程训练
    MovementDataDom.addEventListener("click",function(ev){
        location.href="../sportsData.html";
    });
    // 打卡
    todayOpenBtn.addEventListener("click", function (ev) {
        $http.get('/clockIn?userId=' + user.userId, function (res) {
            //重新请求 页面数据 重新渲染
            if (res.status === 0) {
                utils.toast("icon-duigou", '打卡成功')
                homeData();
            }

        })
    });

});