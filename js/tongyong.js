// import { getDataFromLocal , loadWebsite } from './page2';

$(document).ready(function () {
    // 定义要添加的 footer 内容
    const footerContent = `
    <footer class="page-footer">
        <p>版权所有 &copy; 2024 XiaoZhi</p>
        <p>联系方式: <a href="https://message.bilibili.com/?spm_id_from=333.1387.0.0#/whisper/mid1932421629">我是小稚鸭&bilibili</a></p>
    </footer>
`;

    // 将 footer 内容添加到所有 class 为 container 的元素中
    $('.container').append(footerContent);


    // 获取.touxiang
    var touxiang = $('.touxiang');
    // 修改头像的src为qq地址
    touxiang.attr('src', 'https://q2.qlogo.cn/headimg_dl?dst_uin=2029634120@qq.com&spec=640');


    var content = $('.btandnr');
    content.css('transform', 'translateX(0)'); // 将位置恢复到正常位置

    // 音乐文件路径数组
    var musicList = [
        'music/洛少爷 - 玫瑰少年.ogg',
        'music/洛少爷 - 人是_.ogg',
        'music/洛少爷 - 悬溺.ogg'
    ];
    var currentMusicIndex = 0;
    // 音乐
    // var audioElement = $('<audio>', {
    //     controls: 'controls',
    //     // loop: true,
    //     muted: true,
    // }).css('display', 'none').prependTo('body').on('ended', function() {
    //     currentMusicIndex = (currentMusicIndex + 1) % musicList.length; // 计算下一首歌曲的索引
    //     audioElement.find('source').attr('src', musicList[currentMusicIndex]); // 更新source元素的src属性
    //     audioElement[0].load(); // 加载新的音频文件
    //     audioElement[0].play(); // 播放新的音频文件
    // });

    // // 为audio元素添加source子元素
    // $.each(musicList, function(index, musicSrc) {
    //     $('<source>').attr('src', musicSrc).appendTo(audioElement);
    // });

    // 点击头像隐藏/显示主体
    $('.touxiang').click(function () {
        var isVisible = $('#zhu').is(':visible');
        var zhu = $('#zhu');
        var tx = $('#touxiang');
        if (tx.is(':animated')) { return; }
        if (isVisible) {
            zhu.animate({ opacity: 0 }, 500, function () {
                zhu.hide();
                tx.show();
                tx.animate({ opacity: 1 }, 500);
                // 音乐
                // currentMusicIndex = (currentMusicIndex + 1) % musicList.length;
                // audioElement.empty(); // 清空当前的source元素
                // $('<source>').attr('src', musicList[currentMusicIndex]).appendTo(audioElement);
                // audioElement[0].load(); // 加载新的音频文件
                // audioElement[0].play(); // 播放新的音频文件
                $('.video').css('filter', 'blur(0px)');
            });
        } else {
            tx.animate({ opacity: 0 }, 500, function () {
                tx.hide();
                zhu.show();
                zhu.animate({ opacity: 1 }, 500);
                $('.video').css('filter', 'blur(10px)');

                // audioElement[0].pause();
            });
        }
    })

    // 导航点击事件
    $(document).ready(function () {
        $('#page1, #page2, #page3, #page4, #page5, #page6').click(function () {
            var target = $(this).attr('id').replace('page', 'p'); // 从id中提取目标并替换
            // target控制台输出
            console.log($(this).attr('id'));
            $('#' + target).show().siblings().hide(); // 显示对应的内容，并隐藏其他所有内容
            $('.cebianlan').show();

            document.title = 'XiaoZhi的小站 - ' + this.text;


        });
    });

    $('#kuake').click(function () {
        // 在当前页面打开
        window.location.href = 'https://pan.quark.cn/s/e01b97096ab7#/list/share/7f5d50753f6a4d5fa83e54b2c567b0f3-%E8%B5%84%E6%BA%90%E4%B8%8B%E8%BD%BD';
        // window.open('https://pan.quark.cn/s/e01b97096ab7#/list/share/7f5d50753f6a4d5fa83e54b2c567b0f3-%E8%B5%84%E6%BA%90%E4%B8%8B%E8%BD%BD') 
    });
    $('#bilibili').click(function () {
        window.location.href = 'https://space.bilibili.com/1932421629?spm_id_from=333.1007.0.0';
        // window.open('https://space.bilibili.com/1932421629?spm_id_from=333.1007.0.0') 

    });
});


