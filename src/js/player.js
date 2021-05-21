require("../css/player.less");
document.ready(function () {
    //获取dom
    let videoPlayerDom = document.querySelector('#videoPlayer');
    let nowDom = document.querySelector('.now');
    let allDom = document.querySelector('.all');
    let videoTitleDom = document.querySelector('.videoTitle');
    let lastBtn = document.querySelector('#last');
    let pauseBtn = document.querySelector('#pause');
    let nextBtn = document.querySelector('#next');
    let progressDom = document.querySelector('.progress');
    let arrowsBtn= document.querySelector('.arrows');
    let ObscurationDom=document.querySelector(".Obscuration");
    let playBtn=document.querySelector("#play");
    let stopBtn=document.querySelector("#stop");
    let messageImgDOm=document.querySelector("#messageImg");
    let messageTextDom=document.querySelector(".messageText");

    // 接口地址
    let baseUrl = ' http://139.9.177.51:8099';
    // 获取视频地址
    let videoList = JSON.parse(localStorage.getItem('videoList'));
    // 视频地址索引
    let videoIndex = 2;
    // 渲染
    function play() {
        // 视频
        videoPlayerDom.src = baseUrl + videoList[videoIndex].videoUrl;
        // 当前播放的
        nowDom.textContent = videoIndex + 1;
        // 视频总量
        allDom.textContent = videoList.length;
        // 视频标题
        videoTitleDom.textContent = videoList[videoIndex].title;
    };
    // 调用渲染
    play();

    //视频结束时播放下一个
    videoPlayerDom.addEventListener('ended', function (ev) {
        videoIndex++;
        // 判定临界点
        if (videoIndex < videoList.length) {
            // 渲染
            play();
        }
    })


    // 控制台
    // 上一个
    lastBtn.addEventListener("click", function (ev) {
        // 判定临界点
        if (videoIndex > 0) {
            videoIndex--;
            // 渲染
            play();
        };
    });
    // 下一个
    nextBtn.addEventListener("click", function (ev) {
        // 判定临界点
        if (videoIndex < videoList.length - 1) {
            videoIndex++;
            // 渲染
            play();
        };
    });
    // 暂停开始
    pauseBtn.addEventListener("click", function (ev) {
        // 判定
        if (this.className.indexOf('icon-zanting') > -1) {
            // 暂停
            videoPlayerDom.pause();
            // 删除类名
            this.classList.remove("icon-zanting");
            // 添加类名
            this.classList.add("icon-kaishi");
            // 打开蒙层
            ObscurationDom.style.display="block";
            // 渲染
            messageImgDOm.src=baseUrl+videoList[videoIndex].imgUrl;
            messageTextDom.textContent=videoList[videoIndex].title
        };

    });
    // 开始播放
    playBtn.addEventListener("click",function(ev){
        // 开始播放
        videoPlayerDom.play();
        // 关闭蒙层
        ObscurationDom.style.display="none";
         // 删除类名
         pauseBtn.classList.remove("icon-kaishi");
         // 添加类名
         pauseBtn.classList.add("icon-zanting");
    });
    // 停止播放
    stopBtn.addEventListener("click",function(ev){
        history.back();
    });
    // 进度条
    setInterval(function () {
        // 获取当前页面宽度
        let width = document.body.offsetWidth;
        // videoPlayerDom.currentTime=视频播放当前时间   
        // videoPlayerDom.duration=视频总时长
        // 变量宽度=视频播放当前时间/视频总时长*获取当前页面宽度
        let changeWidth = width * (videoPlayerDom.currentTime / videoPlayerDom.duration);
        // 赋值
        progressDom.style.width = changeWidth + "px";
    }, 30);
    // 返回上一页
    arrowsBtn.addEventListener("click", function (ev) {
        history.back();
    });
});