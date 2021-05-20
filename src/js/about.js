// 导入样式
require("../css/about.less");
document.ready(function () {

    // 1.渲染底部
    utils.addFooter("about");

    let portraitDom = document.querySelector(".Portrait");
    let userNameDom = document.querySelector(".userName");
    let signatureDom = document.querySelector(".signature");
    let header = document.querySelector("header");
    let sportTimeDom = document.querySelector(".sportTime");
    let calorieDom = document.querySelector(".calorie");
    let headPortraitDom = document.querySelector(".headPortrait");
    let fileBtn = document.querySelector("#fileBtn");
    // 数据接口
    let BASE_URL = 'http://139.9.177.51:8099';


    // 2.1渲染数据1（有弊端，更改后不能渲染）
    let user = JSON.parse(localStorage.getItem("user"));
    // // 头像
    // if(user.imgurl){
    //     portraitDom.src=user.imgurl;
    // };
    // // 个性签名
    // if(user.sign){
    //     signatureDom = user.sign;
    // };
    //// 用户名
    //userNameDom.textContent = user.nickname;


    // 2.2数据渲染2（调用函数是就意味着重新渲染一次页面）
    function getUserData() {
        $http.get("/users/accountinfo?userId=" + user.userId, function (res) {
            // 数据保存至本地
            localStorage.setItem("user", JSON.stringify(res.data));
            // 头像
            if (user.imgurl) {
                portraitDom.src = user.imgurl;
            };
            // 个性签名
            if (user.sign) {
                signatureDom = user.sign;
            };
            // 用户名
            userNameDom.textContent = user.nickname;
        });

    };
    // 调用数据渲染2（进入页面时的渲染）
    getUserData();



    // 3.渲染运动数据
    $http.get("/users/mysportsBadge?userId=" + user.userId, function (res) {
        // 卡路里
        sportTimeDom.textContent = res.data.sports.coursetims;
        // 运动时间
        calorieDom.textContent = res.data.sports.calorie;

    });


    // 4.切换至修改数据
    header.addEventListener("click", function (ev) {
        window.location.href = "../edit.html";
    });






    // 5.更换头像
    headPortraitDom.addEventListener("click", function (ev) {
        // 阻止冒泡
        ev.stopPropagation();
        // 点击时触发fileBtn（上传头像）的click事件就能触发change事件
        fileBtn.click();
    });

    // 头像数据上传至后端函数（）
    function upData(url) {
        let data = {
            userId: user.userId,
            imgurl: url
        };
        // 上传至后端并重新渲染保存至本地
        $http.post("/users/userEdit", data, function (res) {
            if (res.status == 0) {
                utils.toast(1, '修改头像成功');
            };
            // 调用渲染函数保存至本地（更改头像需再次渲染，保存至本地是因为如果刷新页面渲染的是以前的图）
            getUserData();
        });
    };

    // 上传文件(input,用change事件)
    fileBtn.addEventListener("change", function (ev) {
        // 获取上传头像的信息
        let file = this.files[0];
        // 请求数据
        ev.stopPropagation()
        $updateFile("/users/upload", "imgurl", file, function (res) {
            portraitDom.src = BASE_URL + res.data;
            user.imgurl = BASE_URL + res.data;
            // 调用渲染函数重新渲染
            upData(user.imgurl);

        });
    });


    // 退出登录
    // 获取dom
    let logoutBtn = document.querySelector(".logout");
    logoutBtn.addEventListener("click", function (ev) {
        //删除localStorage user
        localStorage.removeItem('user');
        //跳转到登录页
        window.location.href = '../login.html';
    });
});