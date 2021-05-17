// 导入css
require("../css/register.less");
document.ready(function () {

    /* 
     *跳转注册
     */
    // 获取dom
    let loginBtn = document.querySelector("#login .font");
    // 事件监听
    loginBtn.addEventListener("click", function (event) {
        window.location.href = "http://localhost:8080/login.html"
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
    let body = document.querySelector("body");
    let form = document.querySelector("#form");
    ///验证码
    let yzmStr = "";
    let captcha1 = new CaptchaMini({
        lineNum: 6,
    });
    captcha1.draw(document.querySelector('#captcha'), function (res) {
        yzmStr = res.toLowerCase();
        return yzmStr;
    });
    // 点击一个input时触发计时器判断是否输入完全提交按钮并变颜色
    form.addEventListener("click", function (event) {
        if (event.target.nodeName === "INPUT") {
            let timeId = setInterval(function () {
                if (telIput.value && pwdIput.value && rePwdIput.value && verificationIput.value) {
                    subBtn.style.background = "rgba(99, 255, 167, 1)";
                    subBtn.disabled = false;
                    // 清除定时器
                    clearInterval(timeId);
                } else {
                    subBtn.style.background = "rgba(99, 255, 167, .5)";
                    subBtn.disabled = true;

                };
            }, 500)
        }

    });

    // 注册验证
    subBtn.addEventListener("click", function () {
        if (!(utils.testTel(telIput.value))) {
            utils.toast("icon-icon1", '请输入正确的手机号');
            telIput.style.border = "1px solid #F55";
            return;
        } else {
            telIput.style.border = "1px solid #000";
        };
        // 判断验证码
        if (verificationIput.value.toLowerCase() != yzmStr) {
            utils.toast("icon-icon1", '验证码输入错误');
            verificationIput.style.border = "1px solid #F55";
            return;
        } else {
            verificationIput.style.border = "1px solid #000";
        };

        if (!(utils.testPwd(pwdIput.value))) {
            utils.toast("icon-icon1", '密码格式不对');
            pwdIput.style.border = "1px solid #F55";
            return;
        } else {
            pwdIput.style.border = "1px solid #000";
        };
        if (rePwdIput.value !== pwdIput.value) {
            utils.toast("icon-icon1", '两次密码输入不一致');
            rePwdIput.style.border = "1px solid #F55";
            pwdIput.style.border = "1px solid #F55";
            return;
        } else {
            rePwdIput.style.border = "1px solid #000";
        };
        // 接口
        let data = {
            account: telIput.value,
            password: pwdIput.value
        }
        $http.post("/users/add", data, function (rel) {
            // 判定
            if (rel.status == 0 && rel.msg === "OK") {
                // 注册成功
                utils.toast("icon-duigou", '注册成功，跳转至首页');
                // 请求登录接口
                $http.post("/users/login", data, function (res) {
                    // 判断是否输入正确
                    if (res.status == 0 && res.msg === "OK") {
                        // 存储本地
                        let user = res.data.user;
                        localStorage.setItem('user', JSON.stringify(user));
                        // 2s跳转
                        setTimeout(function () {
                            location.href = "../home.html"
                        }, 2000);
                    };
                });
            } else if (rel.msg === "用户已存在") {
                // 注册失败用户已存在
                utils.toast("icon-icon1", '用户已存在');
            };

        });

    });
    // 事件委派关闭模态框
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
});