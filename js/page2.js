// html加载完后加载
$(document).ready(function () {

  // 从本地存储获取数据
  function getDataFromLocal() {
    return JSON.parse(localStorage.getItem('catList')) || [];
  }
  // 调用函数获取数据
  const storedData = getDataFromLocal();
  // console.log(storedData);

  // 加载网站
  storedData.forEach((item, index) => {
    setTimeout(function () {
      // 当item.img为空，获取item.href的 favicon 图片
      // if (!item.img) {
      //   // 获取item.href的 favicon 图片
      //   $.get(item.href, function (data) {
      //     // console.log(data);
      //     // 获取favicon图片地址
      //     var favicon = $(data).find('link[rel="shortcut icon"]').attr('href');
      //     // console.log(favicon);
      //     // 如果获取不到favicon图片地址，则使用默认图片
      //   })
      // }

      // var imgSrc = item.img ? item.img : 'img/暂无.png';
      try {
        // 获取favicon图片地址
        var faviconUrl = new URL('/favicon.ico', item.href).href;
      } catch (error) {
        // 如果获取不到favicon图片地址，则使用默认图片
        var faviconUrl = 'img/暂无.png';
      }

      // var imgSrc = item.img ? item.img : faviconUrl;
      var imgSrc = item.img ? item.img : 'img/暂无图片.png';

      // var imgSrc = faviconUrl;
      $('.container_h').append(`
        <div class="card">
            <a href="${item.href}" target="_blank">
                <div class="card-image">
                    <img src="${imgSrc}" alt="${item.title}">
                </div>
                <div class="card-content">
                    <h2 class="card-title">${item.title}</h2>
                </div>
            </a>
        </div>
      `);
    }, 1000);
  });


  // 加载网站
  function loadWebsite(data) {
    $('.container_h').empty(); // 清空容器内容
    data.forEach((item, index) => {
      var imgSrc = item.img ? item.img : 'img/暂无图片.png';
      $('.container_h').append(`
        <div class="card">
            <a href="${item.href}" target="_blank">
                <div class="card-image">
                    <img src="${imgSrc}" alt="${item.title}">
                </div>
                <div class="card-content">
                    <h2 class="card-title">${item.title}</h2>
                </div>
            </a>
        </div>
      `);
    });
  }

  // 刷新按钮点击事件
  $('#refresh-btn ,#page2').click(function () {
    const newData = getDataFromLocal();
    loadWebsite(newData);

    // $("#success-alert").fadeIn(300).delay(1000).fadeOut(300);
  });
});