// 导入运动页less
require("../css/sports.less");
document.ready(function () {
    // 渲染底部
    utils.addFooter("sports");


    let newImgDom = document.querySelector('#newImg');
    let newTitleDom = document.querySelector('.newTitle');
    let newTextDom = document.querySelector('.newText');
    let courseListDom = document.querySelector('#courseList');
    let newItemDom = document.querySelector('#newCourse');
    let baseUrl = ' http://139.9.177.51:8099';
    let user = JSON.parse(localStorage.getItem("user"));

    // 获取数据
    $http.get('/sports/courseList?id=' + user.userId, function(res) {
        //处理数据渲染页面
        let dataArr = res.data;
        //获取最新课程
        console.log(dataArr);
        let newData = dataArr.find(function(item) {
                return item.latest === 1
            });
            let newhtml = `
            <a href="./sportsDetail.html?id=${newData.courseId}">
                <div class="playerBox">
                     <img src="${baseUrl+newData.imgurl}" id="newImg" alt="">
                 </div>
                 <div class="content">
                    <h3 class="newTitle c0">
                         ${newData.name}
                    </h3>
                    <p class="newText mt8 f14 c8a">
                         ${newData.desc}
                     </div>
                 </div>
            </a>
         `;
     newItemDom.innerHTML = newhtml;

     //渲染 课程列表

     let html = '';
     dataArr.forEach(function(item) {
         html += `
           <a href="./sportsDetail.html?id=${item.courseId}">
           <div class="item rel">
                <div class="contenTintroduce  abs">
                     <p class="courseListTitle f22 cf"> ${item.name}</p>
                     <p class="courseText mt8 cf"> ${item.desc}</p>
                </div>
                     <img src="${baseUrl+item.imgurl}" alt="">
             </div>
           </a>
         `
     })
     courseListDom.innerHTML = html;
    });
});