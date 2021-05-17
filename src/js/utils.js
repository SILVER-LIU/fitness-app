/**
 * 工具函数
 * 
 */


const utils = {
    testTel: function (tel) {
        let regTel = /^1[3|4|5|6|7|8|9][0-9]{9}$/;
        return regTel.test(tel);
    },
    testPwd: function (pwd) {
        let regPwd = /^[a-zA-Z0-9_-]{4,16}$/;
        return regPwd.test(pwd);
    },
    toast: function (status, msg) {
        //创建div节点
        let toast = document.createElement('div');
        //设置节点的类名
        toast.className = 'toast';
        let html = `
            <i class="iconfont ${status} toastIcon"><i>
        <p class="toastText">${msg}</p>
    `
        //将toast的内容 添加到toast
        toast.innerHTML = html;
        //将toast 添加到body中
        document.querySelector('body').appendChild(toast);
        //删除节点
        setTimeout(function () {
            toast.remove()
        }, 2000)

    },
    /**
     * @addFooter  页面的底部导航
     * @page 当前页面
     */
    addFooter: function (page) {
        let footer = document.createElement('footer');
        footer.className = 'dpflex';
        let html = ` <a href="./home.html">
        <div class="${page==="home"?"iconItem active":"iconItem"}">
            <p><i class="iconfont icon-shouye-yuanshijituantubiao"></i></p>
            <p class="iconText">首页</p>
        </div>
    </a>
    <a href="./sports.html">
        <div class="${page==="sports"?"iconItem active":"iconItem"}">
            <p><i class="iconfont icon-ziyuan"></i></p>
            <p class="iconText">运动</p>
        </div>
    </a>
    <a href="./about.html">
        <div class="${page==="about"?"iconItem active":"iconItem"}">
            <p><i class="iconfont icon-wode"></i></p>
            <p class="iconText">我的</p>
        </div>
    </a>
        `
        footer.innerHTML = html;
        document.querySelector("body").appendChild(footer);
    },

};
// 挂载
window.utils = utils;