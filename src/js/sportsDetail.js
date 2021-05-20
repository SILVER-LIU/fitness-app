// 
require("../css/sportsDetail.less");


document.ready(function () {
    let imgDom = document.querySelector('.img');
    let startBtn = document.querySelector('.startBtn');
    let backBtn=document.querySelector(".arrows");
    let playIconBtn=document.querySelector(".playIcon");
    let baseUrl = ' http://139.9.177.51:8099';
    // 获取url上的id 
    let str = location.search;
    let obj = utils.stringToObj(str);
    // 通过课程id请求课程详细信息
    $http.get('/sports/courseDetail?id=' + obj.id, function (res) {
        // 渲染页面
        let videoList = res.data.fragments;
        // 视频地址存储本地
        localStorage.setItem('videoList', JSON.stringify(videoList));
        // 拼接图片地址
        imgDom.src = baseUrl + res.data.imgurl;
    })


    // 跳转播放页
    startBtn.addEventListener('click', function (ev) {
        location.href = "./player.html";
    });
    // 跳转播放页
    playIconBtn.addEventListener('click', function (ev) {
        location.href = "./player.html";
    });
    // 返回
    backBtn.addEventListener('click', function (ev) {
        location.href = "./sports.html";
    });

});