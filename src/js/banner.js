// 导入本页css
require("../css/banner.less");
// 导入初始化样式
require("../css/reset.css");
// 导入公共样式
require("../css/common.css");
require("../css/normalize.css");
/* 
 * 跳转功能
 */
//获取dom
let skip = document.querySelector(".skip");
let countdown = document.querySelector(".countdown");
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