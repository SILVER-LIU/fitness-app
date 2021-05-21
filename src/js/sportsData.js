//导入css
require("../css/sportsData.less");
// 引入ecarts
const echarts = require('echarts');

//柱状图
// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('charts'));

// 指定图表的配置项和数据
var option = {
    title: {
        text: '近七天运动时长'
    },
    tooltip: {},
    legend: {
        data: ['时长']
    },
    xAxis: {
        data: ["11-5", "11-6", "11-7", "11-8", "11-9", "11-10"]
    },
    yAxis: {},
    series: [{
        name: '时长',
        type: 'bar',
        data: [5, 20, 70, 100, 10, 20]
    }]
};
// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);

var chartsBing = echarts.init(document.getElementById('charts-bing'));
var optionBing = {
    title: {
        text: '运动分类',
        left: 'center'
    },
    tooltip: {
        trigger: 'item'
    },
    legend: {
        orient: 'vertical',
        left: 'left',
    },
    series: [{
        name: '运动分类',
        type: 'pie',
        radius: '50%',
        data: [{
                value: 25,
                name: '跑步'
            },
            {
                value: 35,
                name: '骑行'
            },
            {
                value: 40,
                name: '训练'
            },
        ],
        emphasis: {
            itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
        }
    }]
};
chartsBing.setOption(optionBing);
// 获取dom
let backBtn = document.querySelector(".arrows");
let sportTimeDom = document.querySelector(".sportTime");
let calorieDom = document.querySelector(".calorie");
let PortraitDom = document.querySelector("#Portrait");

// 数据
let user = JSON.parse(localStorage.getItem("user"));


// 返回
backBtn.addEventListener("click", function (ev) {
    history.back();
});
// 渲染
// 3.渲染运动数据
$http.get("/users/mysportsBadge?userId=" + user.userId, function (res) {
    // 卡路里
    sportTimeDom.textContent = res.data.sports.coursetims;
    // 运动时间
    calorieDom.textContent = res.data.sports.calorie;
    // 头像
    PortraitDom.src = user.imgurl;
   
});