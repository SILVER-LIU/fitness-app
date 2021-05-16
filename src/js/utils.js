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
};
// 挂载
window.utils = utils;