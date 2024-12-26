$(document).ready(function () {
    // 页面加载完成后，加载文章列表并隐藏文章查看区域
    loadArticles();
    $("#article-view").hide();
});

function loadArticles() {
    // 从 localStorage 中获取文章列表，如果没有则使用空数组
    const articles = JSON.parse(localStorage.getItem('articles')) || [];
    // 获取文章列表容器元素
    const articleList = $('#article-list');
    // 清空文章列表容器
    articleList.empty();

    // 遍历文章列表，为每篇文章创建一个 div 元素
    articles.forEach((article, index) => {
        const articleElement = $('<div>').addClass('article-item');
        // 设置 onclick 事件，调用 viewArticle 函数并传递文章索引
        articleElement.attr('onclick', `viewArticle(${index})`);

        // 设置文章元素的 HTML 内容，包含创建日期
        articleElement.html(`
            <h3>${article.title}</h3>
            <p class="article-date">${new Date(article.createdAt).toLocaleDateString()}</p>
        `);

        // 将文章元素添加到文章列表容器中
        articleList.append(articleElement);
    });
}

function viewArticle(index) {
    // 从 localStorage 中获取文章列表，如果没有则使用空数组
    const articles = JSON.parse(localStorage.getItem('articles')) || [];
    // 获取指定索引的文章
    const article = articles[index];
    // 设置文章标题
    $('#view-title').text(article.title);
    // 设置文章内容（这里使用原生 JavaScript 来设置 innerText）
    document.getElementById('view-content').innerText = article.content;
    // 加载文章的评论
    loadComments(article.comments);
    // 显示文章查看区域
    $("#article-view").show();
}

function addComment() {
    // 获取评论内容
    const comment = $('#comment-input').val();
    // 从 localStorage 中获取文章列表，如果没有则使用空数组
    const articles = JSON.parse(localStorage.getItem('articles')) || [];
    // 获取当前查看的文章标题
    const articleIndex = $('#view-title').text();
    // 找到与标题匹配的文章
    const article = articles.find(a => a.title === articleIndex);

    // 检查文章和评论内容是否都不为空
    if (article && comment) {
        // 将评论添加到文章的评论列表中
        article.comments.push(comment);
        // 将更新后的文章列表保存回 localStorage
        localStorage.setItem('articles', JSON.stringify(articles));
        // 清空评论输入框
        $('#comment-input').val('');
        // 重新加载评论列表
        loadComments(article.comments);
    }
}

function loadComments(comments) {
    // 获取评论列表容器元素
    const commentsList = $('#comments-list');
    // 清空评论列表容器
    commentsList.empty();
    // 遍历评论列表，为每个评论创建一个 li 元素
    comments.forEach(comment => {
        const commentElement = $('<li>').text(comment);
        // 将评论元素添加到评论列表容器中
        commentsList.append(commentElement);
    });
}