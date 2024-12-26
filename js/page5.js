$(document).ready(function () {
    // 页面加载完成后，加载文章列表，并为页面5添加点击事件监听器
    loadArticles();
    $('#page5').on('click', loadArticlesManagement);
});

function loadArticlesManagement() {
    // 从 localStorage 中获取文章列表，如果没有则使用空数组
    const articles = JSON.parse(localStorage.getItem('articles')) || [];
    // 获取文章列表管理容器元素
    const articleListManagement = $('#article-list-management');
    // 清空文章列表管理容器
    articleListManagement.empty();

    // 遍历文章列表，为每篇文章创建一个 div 元素
    articles.forEach((article, index) => {
        const articleElement = $('<div>').addClass('article-item-management');
        // 设置 data-index 属性，存储文章的索引
        articleElement.attr('data-index', index);

        // 设置文章元素的 HTML 内容，包含创建日期
        articleElement.html(`
            <h3>${article.title}</h3>
            <p class="article-date">${new Date(article.createdAt).toLocaleDateString()}</p>
            <hr>
            <button onclick="editArticle(${index})">编辑</button>
            <button onclick="deleteArticle(${index})">删除</button>
        `);

        // 将文章元素添加到文章列表管理容器中
        articleListManagement.append(articleElement);
    });
}

function editArticle(index) {
    // 从 localStorage 中获取文章列表，如果没有则使用空数组
    const articles = JSON.parse(localStorage.getItem('articles')) || [];
    // 获取指定索引的文章
    const article = articles[index];

    // 使用 prompt 弹窗获取新的标题和内容
    const newTitle = prompt('请输入新的标题:', article.title);
    const newContent = prompt('请输入新的内容:', article.content);

    // 检查新的标题和内容是否都不为空
    if (newTitle && newContent) {
        // 更新文章的标题和内容
        article.title = newTitle;
        article.content = newContent;
        // 将更新后的文章列表保存回 localStorage
        localStorage.setItem('articles', JSON.stringify(articles));
        // 重新加载文章管理列表
        loadArticlesManagement();
        // 重新加载文章列表
        loadArticles();
    }
    loadArticlesManagement();
}

function createArticle() {
    // 获取文章标题和内容
    const title = $('#article-title').val();
    const content = $('#article-content').val();

    // 检查标题和内容是否都不为空
    if (title && content) {
        // 从 localStorage 中获取文章列表，如果没有则使用空数组
        const articles = JSON.parse(localStorage.getItem('articles')) || [];
        // 获取当前日期和时间
        const createdAt = new Date().toISOString();
        // 将新文章添加到文章列表中
        articles.push({ title, content, comments: [], createdAt });
        // 将更新后的文章列表保存回 localStorage
        localStorage.setItem('articles', JSON.stringify(articles));
        // 清空文章标题和内容输入框
        $('#article-title').val('');
        $('#article-content').val('');
        // 重新加载文章管理列表
        loadArticlesManagement();
        // 重新加载文章列表
        loadArticles();
    }
}

function deleteArticle(index) {
    // 从 localStorage 中获取文章列表，如果没有则使用空数组
    const articles = JSON.parse(localStorage.getItem('articles')) || [];
    // 从文章列表中删除指定索引的文章
    articles.splice(index, 1);
    // 将更新后的文章列表保存回 localStorage
    localStorage.setItem('articles', JSON.stringify(articles));
    // 重新加载文章列表
    loadArticles();
    loadArticlesManagement();
}