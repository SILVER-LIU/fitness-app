// 导入本页css
require("../css/banner.less");
/* 
 * 跳转功能
 */
//获取dom
let skip = document.querySelector(".skip");
let countdown = document.querySelector(".countdown");
let user={};
user=JSON.parse(localStorage.getItem("user"));
// 监听事件
skip.addEventListener("click", function (event) {
    window.location.href = "http://localhost:8080/login.html"
});
let num=5;
let timeId = setInterval(function () {
    num--;
    countdown.innerHTML=num;
    //判定
    if (num == 0) {
        window.location.href = "http://localhost:8080/login.html"
        //清除定时器
        clearTimeout(timeId)
    }
}, 1000);