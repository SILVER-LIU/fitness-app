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
        } else if (this.className.indexOf('icon-kaishi') > -1) {
            // 开始
            videoPlayerDom.play();
            // 删除类名
            this.classList.remove("icon-kaishi");
            // 添加类名
            this.classList.add("icon-zanting");
        }

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