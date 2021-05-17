// 导入样式
require("../css/about.less");
document.ready(function () {

    // 渲染底部
    utils.addFooter("about");
    // 退出登录
    // 获取dom
    let logoutBtn=document.querySelector(".logout");
    logoutBtn.addEventListener("click",function(ev){
        //删除localStorage user
        localStorage.removeItem('user');
        //跳转到登录页
        window.location.href = '../login.html';
    });
});