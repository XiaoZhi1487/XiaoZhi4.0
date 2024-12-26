let currentIndex = 0;
const items = document.querySelectorAll('.carousel-item');
const totalItems = items.length;

function showSlide(index) {
    if (index < 0) {
        currentIndex = totalItems - 1;
    } else if (index >= totalItems) {
        currentIndex = 0;
    } else {
        currentIndex = index;
    }

    const offset = -currentIndex * 100;
    document.querySelector('.carousel-inner').style.transform = `translateX(${offset}%)`;
}

function nextSlide() {
    showSlide(currentIndex + 1);
}

function prevSlide() {
    showSlide(currentIndex - 1);
}

// 自动播放功能
function startAutoPlay(interval) {
    setInterval(nextSlide, interval);
}

// 设置自动播放间隔时间为5秒（5000毫秒）
startAutoPlay(4500);


document.addEventListener('DOMContentLoaded', function() {
    const carouselItems = document.querySelectorAll('.carousel-item img');
    const videoImage = document.querySelector('.video');

    carouselItems.forEach(item => {
        item.addEventListener('click', function() {
            videoImage.src = this.src;
            videoImage.alt = this.alt;
        });
    });
});

// 搜索功能
function search() {
    document.getElementById('searchForm').submit();
}

// document.addEventListener('DOMContentLoaded', function() {
//     document.querySelector('.switch-button').addEventListener('click', switchStyle);
// });

function switchStyle() {
    const linkElement = document.querySelector('link[href="css/newai.css"]');
    // 输出
    console.log(linkElement);
    if (linkElement) {
        const currentHref = linkElement.getAttribute('href');
        // const newHref = currentHref === 'css/主机版.css' ? 'css/newai.css' : 'css/主机版.css';
        linkElement.setAttribute('href', 'css/o.css');
    }else{
        const linkElement = document.querySelector('link[href="css/o.css"]');
        linkElement.setAttribute('href', 'css/newai.css');

    }
}