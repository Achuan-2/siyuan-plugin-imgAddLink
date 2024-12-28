import {
    Plugin,
    showMessage,
    confirm,
    Dialog,
    Menu,
    openTab,
    adaptHotkey,
    getFrontend,
    getBackend,
    IModel,
    Setting,
    fetchPost,
    Protyle,
    openWindow,
    IOperation,
    Constants,
    openMobileFileById,
    lockScreen,
    ICard,
    ICardData
} from "siyuan";


export default class PluginSample extends Plugin {

    private customTab: () => IModel;
    private isMobile: boolean;

    onload() {
        this.eventBus.on("loaded-protyle-static", this.imgAddLink);
        this.eventBus.on("loaded-protyle-dynamic", this.imgAddLink);
        this.eventBus.on("ws-main", this.imgAddLink);
    }

    onLayoutReady() {
    }

    onunload() {
    }

    uninstall() {
        console.log("uninstall");
    }
    imgAddLink() {
        const imgSpans = document.querySelectorAll('.protyle-wysiwyg span.img');

        imgSpans.forEach(imgSpan => {
            const nextSibling = imgSpan.nextElementSibling;

            if (nextSibling && nextSibling.dataset.type === 'a') {
                // Use CSS class instead of inline style
                nextSibling.classList.add('hide-link');

                // 找到 span.img 的第二个 span
                const innerSpans = imgSpan.querySelectorAll('span');
                if (innerSpans.length > 1) {
                    // 检查是否已经存在 img__net 元素
                    const existingImgNet = innerSpans[1].querySelector('.img__link');
                    if (!existingImgNet) {
                        // 创建新的 span.img__link 节点
                        const imgNetSpan = document.createElement('span');
                        imgNetSpan.className = 'img__link';
                        // 使用 innerHTML 添加 SVG
                        imgNetSpan.innerHTML = `
                        <svg>
                            <use xlink:href="#iconLink"></use>
                        </svg>
                    `;

                        // 设置 imgNetSpan 的点击事件，跳转到 span.a 的链接
                        imgNetSpan.addEventListener('click', function () {
                            window.open(nextSibling.dataset.href, '_blank');
                        });

                        // 添加 imgNetSpan 到第二个 span
                        innerSpans[1].appendChild(imgNetSpan);
                    }
                }
            }
        });
    }


}
