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


    // 渲染
    console.log(user);
    let addressArr = [];
    if (user.address) {
        addressArr = user.address.split(',');
        sexVal.textContent = user.gender;
        birthdayVal.textContent = utils.dateFormat(new Date(user.birthday));
        provinceVal.textContent = addressArr[0];
        cityVal.textContent = addressArr[1];
        sign.textContent = user.sign;
        userName.value = user.nickname;
    };






    // 点击返回
    arrowsBtn.addEventListener("click", function (ev) {
        window.location.href = "../about.html";
    });
    let data = {
        nickname: "",
        gender: "男",
        birthday: user.birthday,
        province: "",
        city: ""

    }

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
    // 城市
    let pid = "";
    provinceDom.addEventListener("click", function (ev) {
        // 请求接口
        $http.get("/address/province", function (res) {
            // 修改
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
    // 
    cityDom.addEventListener("click", function (ev) {
        if(data.province===""){
            utils.toast("icon-icon1", "请先选择省份");
            return;
        }
        $http.get("/address/city/" + pid, function (res) {
            // 
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

    //保存数据

    console.log(userName.value);
    saveBtn.addEventListener('click', function (ev) {
        let saveData = {
            userId: user.userId,
            nickname: userName.value,
            gender: data.gender,
            birthday: new Date(data.birthday).getTime(),
            address: [data.province, data.city],
            sign: sign.value
        }
        localStorage.setItem("user", JSON.stringify(saveData));
        console.log(saveData);
        if (saveData.nickname === "") {
            utils.toast("icon-icon1", "用户名不能为空");
            return;
        }
        if (saveData.address[0] === "") {
            utils.toast("icon-icon1", "请选择城市和省份");
            return;
        }

        $http.post("/users/userEdit", saveData, function (res) {
            utils.toast("icon-duigou", '修改成功');
            console.log(res);
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