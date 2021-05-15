// 导入css
require("../css/register.less");
// 导入初始化样式
require("../css/reset.css");
// 导入公共样式
require("../css/common.css");
require("../css/normalize.css");
/* 
 *跳转注册
 */
// 获取dom
let loginBtn=document.querySelector("#login");
// 事件监听
loginBtn.addEventListener("click",function(event){
    window.location.href="http://localhost:8080/login.html"
});


/* 
 *验证
 */
// 获取dom
let telIput = document.querySelector("#tel");
let pwdIput = document.querySelector("#pwd");
let rePwdIput = document.querySelector("#rePwd");
let verificationIput = document.querySelector("#verification");
let subBtn = document.querySelector(".subBtn");
let telState = false;
let pwdState = false;
let rePwdState = false;
// 事件监听
// 电话事件监听
telIput.addEventListener("blur", function () {
    // 定义正则
    let reg = /^1[3|4|5|6|7|8|9][0-9]{9}$/;
    // 获取用户输入值
    if (!(reg.test(telIput.value))) {
        document.querySelector("#tel+p").style.opacity = "1";
        this.style.border = "1px solid #F55";
        this.style.background = "rgba(255, 255, 255, .5)";
        telState = false;
    } else {
        document.querySelector("#tel+p").style.opacity = "0";
        this.style.border = "1px solid #000";
        telState = true;
    };
    // 调用判断是否输入完全函数
    checkform();
});
// 密码事件监听
pwdIput.addEventListener("blur", function () {
    // 定义正则
    let reg = /^[a-zA-Z0-9_-]{4,16}$/;
    // 获取用户输入值
    if (!(reg.test(pwdIput.value))) {
        document.querySelector("#pwd+p").style.opacity = "1";
        this.style.border = "1px solid #F55";
        pwdState = false;
    } else {
        document.querySelector("#pwd+p").style.opacity = "0";
        this.style.border = "1px solid #000";
        pwdState = true;
    };
    // 调用判断是否输入完全函数
    checkform();
});
// 再次密码事件监听
rePwdIput.addEventListener("blur", function () {
    // 判定是否与第一次相等
    if (rePwdIput.value === pwdIput.value) {
        document.querySelector("#rePwd+p").style.opacity = "0";
        this.style.border = "1px solid #000";
        rePwdState = true;
    } else {
        document.querySelector("#rePwd+p").style.opacity = "1";
        this.style.border = "1px solid #F55";
        rePwdState = false;

    };
    // 调用判断是否输入完全函数
    checkform();
});
 // 封装一个函数判断是否输入完全
 function checkform() {
    if (pwdState && rePwdState && telState) {
        // subBtn.disabled = true;
        subBtn.style.background = "rgba(99, 255, 167, 1)";
    } else {
        // subBtn.disabled = false;
        subBtn.style.background = "rgba(99, 255, 167, .5)";
    };
};