document.addEventListener("contextmenu", (e) => {
    // 检查右键点击的目标元素是否具有类名 .card
    if (e.target.closest('.card')) {
        e.preventDefault();
        showMenu(e);
    }
});

document.addEventListener("click", hideMenu);

const ContextMenu = (function () {
    let instance;

    function createMenu(options) {
        const ul = document.createElement("ul");
        ul.classList.add("custom-context-menu");

        if (options.menus && options.menus.length > 0) {
            options.menus.forEach(menu => {
                const li = document.createElement("li");
                li.textContent = menu.name;
                li.addEventListener("click", menu.onClick);
                ul.appendChild(li);
            });
        }

        document.body.appendChild(ul);
        return ul;
    }

    return {
        getInstance: function (options) {
            if (!instance) {
                instance = createMenu(options);
            }
            return instance;
        },
    };
})();

const menuSingleton = ContextMenu.getInstance({
    menus: [
        {
            name: "custom menu 1",
            onClick: function (e) {
                console.log("编辑（）");
            },
        },
        {
            name: "custom menu 2",
            onClick: function (e) {
                console.log("menu2 clicked");
            },
        },
        {
            name: "custom menu 3",
            onClick: function (e) {
                console.log("menu3 clicked");
            },
        },
    ],
});

function showMenu(e) {
    const menus = menuSingleton;
    menus.style.top = `${e.clientY}px`;
    menus.style.left = `${e.clientX}px`;
    menus.style.display = "block";
}

function hideMenu() {
    const menus = menuSingleton;
    menus.style.display = "none";
}