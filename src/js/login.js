// 导入css
require("../css/login.less");
// 导入初始化样式
require("../css/reset.css");
// 导入公共样式
require("../css/common.css");
require("../css/normalize.css");
/* 
 *跳转注册
 */
// 获取dom
let registerBtn=document.querySelector("#register");
// 事件监听
registerBtn.addEventListener("click",function(event){
    window.location.href="http://localhost:8080/register.html"
});
/* 
 *验证
 */
// 获取dom