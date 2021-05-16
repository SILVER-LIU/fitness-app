// 导入css
require("../css/login.less");

/* 
 *跳转注册
 */
// 获取dom
let registerBtn = document.querySelector("#register .font");
// 事件监听
registerBtn.addEventListener("click", function (event) {
    window.location.href = "http://localhost:8080/register.html"
});
/* 
 *验证
 */
// 获取dom
let userInput = document.querySelector("#user");
let PwdInput = document.querySelector("#Pwd");
let subBtn = document.querySelector(".subBtn");

// 点击一个input时触发计时器判断是否输入完全提交按钮并变颜色
form.addEventListener("click", function (event) {
    if (event.target.nodeName === "INPUT") {
        let timeId = setInterval(function () {
            if (userInput.value && PwdInput.value) {
                subBtn.style.background = "rgba(99, 255, 167, 1)";
                // 清除定时器
                clearInterval(timeId);
                subBtn.disabled = false;
            } else {
                subBtn.style.background = "rgba(99, 255, 167, .5)";
                subBtn.disabled = true;
            };
        }, 1000)
    };
});
// 登录验证
subBtn.addEventListener("click", function (ev) {
    let data = {
        account: userInput.value,
        password: PwdInput.value
    }
    // 判断是否为空
    if (userInput.value === "" && PwdInput.value === "") {
        utils.toast("icon-icon1", '请输入账号或密码');
        return;
    };
    // 接口
    $http.post("/users/login", data, function (rel) {

        // 判断是否输入正确
        if (rel.status == 0 && rel.msg === "OK") {
            utils.toast("icon-duigou", '登录成功');
            // 存储本地
            let user = rel.data.user;
            localStorage.setItem('user', JSON.stringify(user));
            // 2s跳转
            setTimeout(function () {
                location.href = "../home.html"
            }, 500);
        } else {
            // 提示账号或密码错误
            utils.toast("icon-icon1", '账号或密码错误');
        }
    })

});
// 事件委派关闭模态框
let body = document.querySelector("body");
body.addEventListener("click", function (event) {
    // 判定
    if (event.target.className === "toastText") {
        event.target.parentNode.parentNode.parentNode.remove();
    } else if (event.target.className === "iconfont icon-icon1 toastIcon") {
        event.target.parentNode.remove();
    } else if (event.target.className === "toast") {
        event.target.remove();
    }
});