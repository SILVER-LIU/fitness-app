// 导入本页css
require("../css/banner.less");
document.ready(function () {

    /* 
     * 跳转功能
     */
    //获取dom
    let skip = document.querySelector(".skip");
    let countdown = document.querySelector(".countdown");
    let user = {};
    user = JSON.parse(localStorage.getItem("user"));
    console.log(user);
    // 监听事件
    skip.addEventListener("click", function (event) {
        // 判定是否存储本地数据是跳转首页，没有跳转登录页
        if (user) {
            window.location.href = "../home.html"
        } else {
            window.location.href = "http://localhost:8080/login.html"
        }

    });
    let num = 5;
    let timeId = setInterval(function () {
        num--;
        countdown.innerHTML = num;
        //判定
        if (num == 0) {
            // 判定是否存储本地数据是跳转首页，没有跳转登录页
            if (user) {
                window.location.href = "../home.html"
            } else {
                window.location.href = "../login.html"
            }

            //清除定时器
            clearTimeout(timeId)
        }
    }, 1000);
});