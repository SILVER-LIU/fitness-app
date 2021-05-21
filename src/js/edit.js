// 导入样式
require("../css/edit.less");
document.ready(function () {
    let arrowsBtn = document.querySelector(".arrows");
    let userName = document.querySelector(".userName");
    let sexDom = document.querySelector("#sex");
    let sexVal = document.querySelector("#sexVal");
    let birthdayDom = document.querySelector("#birthday");
    let birthdayVal = document.querySelector("#birthdayVal");
    let provinceDom = document.querySelector("#province");
    let provinceVal = document.querySelector("#provinceVal");
    let cityDom = document.querySelector("#city");
    let cityVal = document.querySelector("#cityVal");
    let saveBtn = document.querySelector('.saveBtn');
    let sign = document.querySelector("#sign");
    let user = JSON.parse(localStorage.getItem("user"));
    let pid = "";

    let data = {
        nickname: user.nickname,
        gender: "男",
        birthday: user.birthday,
        province: "",
        city: "",

    }
    // 渲染
    // 城市数组（用于渲染）
    let addressArr = [];
    // 判断是否渲染（判断是否第一次修改）
    if (user.address) {
        // 判断城市数据的数据类型（字符串和数组两种）
        if (typeof user.address === "string") {
            addressArr = user.address.split(',');
        } else {
            addressArr = user.address;
        }
        sexVal.textContent = user.gender;
        birthdayVal.textContent = utils.dateFormat(new Date(user.birthday));
        provinceVal.textContent = addressArr[0];
        cityVal.textContent = addressArr[1];
        sign.textContent = user.sign;
        userName.value = user.nickname;
        data.province = addressArr[0];
        data.city = addressArr[1];
        pid = localStorage.getItem("pid");
    };






    // 点击返回
    arrowsBtn.addEventListener("click", function (ev) {
        window.location.href = "../about.html";
    });


    // 性别
    sexDom.addEventListener("click", function (ev) {
        // 
        weui.picker([{
            label: '男',
            value: 0
        }, {
            label: '女',
            value: 1
        }], {
            onConfirm: function (result) {
                // 渲染picker
                sexVal.textContent = result[0].label;
                //  保存数据
                data.gender = result[0].label;
            },
            title: '性别'
        });


    });
    // 生日(多列)
    birthdayDom.addEventListener("click", function (ev) {
        weui.datePicker({
            start: 1990,
            end: new Date().getFullYear(),
            onConfirm: function (result) {
                // 渲染picker
                birthdayVal.textContent = result[0].value + "-" + result[1].value + "-" + result[2].value;
                // 保存数据
                data.birthday = result[0].value + "-" + result[1].value + "-" + result[2].value;
            },
            title: '修改日期'
        });
    });
    // 省份
    provinceDom.addEventListener("click", function (ev) {
        // 请求接口
        $http.get("/address/province", function (res) {
            // 集合成数组
            let provinceData = res.data.map(function (item) {
                return {
                    label: item.name,
                    value: item.addressId
                }
            });

            // 渲染picker
            weui.picker(provinceData, {
                onConfirm: function (result) {
                    // 渲染picker
                    provinceVal.textContent = result[0].label;
                    //  保存数据
                    data.province = result[0].label;
                    // 修改pid
                    pid = result[0].value;
                    data.pid = result[0].value;
                    // 渲染市
                    $http.get("/address/city/" + pid, function (res) {
                        console.log(res);
                        cityVal.textContent = res.data[0].name;
                        data.city = res.data[0].name;
                    });
                },
                title: '省级'
            });

        });
    });
    // 城市
    cityDom.addEventListener("click", function (ev) {
        if (data.province === "") {
            utils.toast("icon-icon1", "请先选择省份");
            return;
        }
        $http.get("/address/city/" + pid, function (res) {
            // 集合成数组
            let cityData = res.data.map(function (item) {
                return {
                    label: item.name,
                    value: item.addressId
                }

            });
            // 渲染picker
            weui.picker(cityData, {
                onConfirm: function (result) {
                    // 渲染picker
                    cityVal.textContent = result[0].label;
                    //  保存数据
                    data.city = result[0].label;
                },
                title: '城市或区县'
            });
        })
    });
    // 提交按钮
    saveBtn.addEventListener('click', function (ev) {
        //保存数据
        let saveData = {
            userId: user.userId,
            nickname: userName.value,
            gender: data.gender,
            birthday: new Date(data.birthday).getTime(),
            address: [data.province, data.city],
            sign: sign.value
        }
        // 保存数据至本地


        if (saveData.nickname === user.nickname && saveData.gender === user.gender && saveData.birthday === (new Date(user.birthday).getTime()) && saveData.address[0] === addressArr[0] && saveData.address[1] === addressArr[1] && saveData.sign === user.sign) {
            utils.toast("icon-icon1", "未改变任何数据");
            return;
        }
        // 判断用户名是否为空
        if (saveData.nickname === "") {
            utils.toast("icon-icon1", "用户名不能为空");
            return;
        }
        // 判断城市省份是否选择
        if (saveData.address[0] === "") {
            utils.toast("icon-icon1", "请选择城市和省份");
            return;
        }
        localStorage.setItem("user", JSON.stringify(saveData));
        localStorage.setItem("pid", pid);
        // 请求数据上传
        $http.post("/users/userEdit", saveData, function (res) {
            utils.toast("icon-duigou", '修改成功');
        });;
    });

    // 事件委派关闭模态框
    let body = document.querySelector("body");
    body.addEventListener("click", function (event) {
        // 判定
        if (event.target.className === "toastText") {
            event.target.parentNode.parentNode.parentNode.remove();
        } else if (event.target.className === "iconfont icon-icon1 toastIcon") {
            event.target.parentNode.remove();
        } else if (event.target.className === "toast") {
            event.target.remove();
        }
    });








});