$(document).ready(function () {
    // 获取本地存储的数据
    const localData = getData();
    // 加载数据到页面
    load(localData);

    // 从localStorage获取数据
    function getData() {
        return JSON.parse(localStorage.getItem("catList")) || [];
    }
    const storedData = getData();
    console.log(storedData);

    // 将数据保存到localStorage
    function setData(data) {
        return localStorage.setItem("catList", JSON.stringify(data));
    }

    // 添加新数据的功能
    function addData(newData) {
        var local = getData();
        local.push(newData); // 确保newData是一个对象，并且有相应的属性
        setData(local);
        load(local); // 重新加载最新的数据到页面
    }

    // 删除数据的功能
    function deleteData(index) {
        var local = getData();
        local.splice(index, 1); // 删除指定索引的数据
        setData(local);
        load(local); // 重新加载最新的数据到页面
    }

    // 渲染数据到页面的功能
    function load(data) {
        var $display = $('#catListDisplay');
        $display.empty(); // 清空当前的内容

        data.forEach(function (item, index) {
            var $div = $('<div>');
            // var $nameSpan = $('<span>').text('网站名称: ' + item.title);
            var $nameSpan = $('<span class="wz_title">').text(item.title);
            var $ageSpan = $('<span>').text('网址: ' + item.href);
            var $colorSpan = $('<span>').text('图片路径: ' + item.img);
            var $editBtn = $('<button class="edit-btn">修改</button>').click(function () {
                $editBtn.hide();
                $deleteBtn.hide();
                $nameSpan.hide();
                $ageSpan.hide();
                $colorSpan.hide();
                var $nameInput = $('<input class="inp" type="text" value="' + item.title + '" placeholder="网站名称: ' + item.title + '">').show();
                var $ageInput = $('<input class="inp" type="text" value="' + item.href + '" placeholder="网址: ' + item.href + '">').show();
                var $colorInput = $('<input class="inp" type="text" value="' + item.img + '" placeholder="图片路径: ' + item.img + '">').show();
                var $confirmEditBtn = $('<button class="qd_btn">确定</button>').click(function () {
                    item.title = $nameInput.val();
                    item.href = $ageInput.val();
                    item.img = $colorInput.val();
                    $nameSpan.show().text('网站名称: ' + item.title);
                    $ageSpan.show().text('网址: ' + item.href);
                    $colorSpan.show().text('图片路径: ' + item.img);
                    $nameInput.hide();
                    $ageInput.hide();
                    $colorInput.hide();
                    $confirmEditBtn.hide();
                    $editBtn.show();
                    $deleteBtn.show();
                    setData(data);
                    // load(local); // 重新加载最新的数据到页面
                    $("#success-alert").fadeIn(300).delay(1000).fadeOut(300);
                });
                $div.append($nameInput, $ageInput, $colorInput, $confirmEditBtn);
                $display.append($div);
            });
            var $deleteBtn = $('<button class="delete-btn">删除</button>').click(function () {
                if (confirm('你确定要删除这条数据吗？')) {
                    deleteData(index);
                    $("#success-alert").fadeIn(300).delay(1000).fadeOut(300);
                }
            });
            $div.append($nameSpan, $ageSpan, $colorSpan, $editBtn, $deleteBtn);
            $display.append($div);
        });
    }

    // 添加新数据的按钮事件
    $('#addDataButton').click(function () {
        var newName = $('#catName').val();
        var newAge = $('#catAge').val();
        var newColor = $('#catColor').val();
        // newAge为空则跳过
        if (newAge === '') {
            $('#error-code').text("错误代码：网址不能为空");
            $("#error-alert").fadeIn(300).delay(1000).fadeOut(300);
            return;
        }

        var newData = {
            title: newName,
            href: newAge,
            img: newColor
        };

        addData(newData);

        // 清空输入框
        $('#catName').val('');
        $('#catAge').val('');
        $('#catColor').val('');
        $("#success-alert").fadeIn(300).delay(1000).fadeOut(300);
    });

    // 添加复制数据到剪贴板的功能
    function copyDataToClipboard() {
        const data = getData();
        const textToCopy = JSON.stringify(data, null, 2); // 格式化JSON数据
        navigator.clipboard.writeText(textToCopy).then(function () {
            $("#success-alert").fadeIn(300).delay(1000).fadeOut(300);
            console.log('复制成功');
        }).catch(function (err) {
            alert('复制失败', err);
            console.log('复制失败', err);
        });
    }

    // 给复制按钮绑定点击事件
    $('#copyDataButton').click(function () {
        copyDataToClipboard();
    });

    // 添加替换数据的按钮事件
    $('#replaceDataButton').click(function () {
        var jsonData = $('#jsonData').val();
        try {
            var parsedData = JSON.parse(jsonData);
            if (Array.isArray(parsedData)) {
                replaceData(parsedData);
                $("#success-alert").fadeIn(300).delay(1000).fadeOut(300);
            } else {
                // alert('输入的内容不是有效的JSON数组');
                $(".error-code").text("错误代码：" + "输入的内容不是有效的JSON数组");
                $("#error-alert").fadeIn(500);
            }
        } catch (e) {
            // alert('输入的内容不是有效的JSON');
            $(".error-code").text("错误代码：" + "输入的内容不是有效的JSON数组");
            $("#error-alert").fadeIn(500);
        }
    });

    // 添加替换数据的功能
    function replaceData(newData) {
        if (confirm('确定要替换数据吗？')) {
            setData(newData);
            load(newData);
            $("#success-alert").fadeIn(300).delay(1000).fadeOut(300);
        }
    };

    // 将数据存储到本地存储
    function storeDataToLocal(data) {
        localStorage.setItem('catList', JSON.stringify(data));
    }
    //网站列表
    const data = [
        {
            "href": "https://www.bilibili.com/",
            "img": "img/bilibili.png",
            "title": "bilibili"
        },
        {
            "href": "https://chatglm.cn/main/alltoolsdetail",
            "img": "img/智谱清言.png",
            "title": "智谱清言"
        },
        {
            "href": "https://ps.gaoding.com/#/",
            "img": "img/ps.png",
            "title": "ps网页版"
        },
        {
            "href": "https://www.jetbrains.com/zh-cn/ides/#choose-your-ide",
            "img": "img/ij.png",
            "title": "JetBrains"
        },
        {
            "href": "https://yiyan.baidu.com/",
            "img": "img/文心一言.png",
            "title": "文心一言"
        },
        {
            "href": "https://mubu.com/",
            "img": "img/幕布.png",
            "title": "幕布"
        },
        {
            "href": "https://simpfun.cn/",
            "img": "img/简幻欢.png",
            "title": "简幻欢"
        },
        {
            "href": "https://www.taptap.cn/moment/453706435335818278",
            "img": "img/简幻欢.png",
            "title": "灾厄服务器"
        },
        {
            "href": "https://sfe.zxpweb.link/docs/main",
            "img": "img/简幻欢.png",
            "title": "Simpfun维基"
        },
        {
            "href": "https://www.w3school.com.cn/jquery/index.asp",
            "img": "img/jq.png",
            "title": "jQuery"
        },
        {
            "href": "https://mooc2-ans.chaoxing.com/mooc2-ans/mycourse/stu?courseid=235230580&clazzid=78267280&cpi=262628285&enc=3a0ff53280ecdc30fdd668849e2204d0&t=1718269083438&pageHeader=8&v=0",
            "img": "img/大数据.png",
            "title": "大数据"
        },
        {
            "href": "https://space.bilibili.com/1932421629/favlist?fid=3207218729&ftype=create",
            "img": "img/bilibili.png",
            "title": "php+mysql"
        },
        {
            "href": "https://space.bilibili.com/488661431/channel/collectiondetail?sid=1866894",
            "img": "img/bilibili.png",
            "title": "CSS效果"
        },
        {
            "href": "https://www.ra2web.com/",
            "img": "img/红警.png",
            "title": "红警"
        },
        {
            "title": "VUE",
            "href": "https://cn.vuejs.org/guide/introduction.html",
            "img": "img/vue.png"
        },
        {
            "title": "菜鸟教程",
            "href": "https://www.runoob.com/",
            "img": "img/菜鸟.png"
        },
        {
            "title": "聚神辅导航",
            "href": "https://www.jspoo.com/bookmark/",
            "img": "img/聚神辅.png"
        },
        {
            "title": "阿里巴巴mapreduce",
            "href": "https://edu.aliyun.com/course/312697/",
            "img": ""
        },
        {
            "title": "百度",
            "href": "https://baidu.com",
            "img": ""
        },
        {
            "title": "图片画质增强",
            "href": "https://www.iloveimg.com/zh-cn/upscale-image",
            "img": "img/iloveimg.svg"
        },
        {
            "title": "图片去水印",
            "href": "https://zh-cn.aiseesoft.com/watermark-remover-online/#",
            "img": "img/aiseesoft-logo.svg"
        }
    ]
    $('#zhantieappend').click(function () {
        if (confirm('确定要导入默认数据吗？')) {
            storeDataToLocal(data);
            $("#success-alert").fadeIn(300).delay(1000).fadeOut(300);
        }
    });

    $("#error-alert").click(function () {
        $(this).fadeOut(500);
    });
});