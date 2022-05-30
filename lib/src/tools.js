"use strict";
/*
 * @Description:
 * @Author: luckymiaow
 * @Date: 2022-05-27 23:34:41
 * @LastEditors: luckymiaow
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.loading = exports.createLoadingSvg = exports.getPopoverPosition = exports.clear = exports.getElement = exports.GUIDE_MASK = exports.GUIDE_GUIDE_AREA = exports.GUIDE_POPOVER_PREV_BTN = exports.GUIDE_POPOVER_NAVIGATION = exports.GUIDE_POPOVER_CLOSE = exports.GUIDE_POPOVER_FOOTER = exports.GUIDE_POPOVER_DESCRIPTION = exports.GUIDE_POPOVER_TIP = exports.GUIDE_POPOVER_TITLE = exports.GUIDE_POPOVER_ITEM = exports.GUIDE_ANTICON_SPIN = exports.GUIDE_POPOVER_NEXT_BTN = void 0;
exports.GUIDE_POPOVER_NEXT_BTN = "guide-popover-next-btn";
exports.GUIDE_ANTICON_SPIN = "guide-anticon-spin";
exports.GUIDE_POPOVER_ITEM = "guide-popover-item";
exports.GUIDE_POPOVER_TITLE = "guide-popover-title";
exports.GUIDE_POPOVER_TIP = "guide-popover-tip";
exports.GUIDE_POPOVER_DESCRIPTION = "guide-popover-description";
exports.GUIDE_POPOVER_FOOTER = "guide-popover-footer";
exports.GUIDE_POPOVER_CLOSE = "guide-popover-close";
exports.GUIDE_POPOVER_NAVIGATION = "guide-popover-navigation";
exports.GUIDE_POPOVER_PREV_BTN = "guide-popover-prev-btn";
exports.GUIDE_GUIDE_AREA = "guidejs-guide-area";
exports.GUIDE_MASK = "guidejs-mask";
function getElement(dealEl) {
    const elements = [];
    const t = (e) => {
        if (typeof e === "string") {
            elements.push(...document.querySelectorAll(e));
        }
        else {
            elements.push(e);
        }
    };
    if (Array.isArray(dealEl)) {
        dealEl.forEach((e) => {
            t(e);
        });
    }
    else {
        t(dealEl);
    }
    return elements;
}
exports.getElement = getElement;
function clear() {
    const t = document.querySelectorAll("." + exports.GUIDE_GUIDE_AREA);
    t.forEach((e) => {
        e.className = e.className.replace(exports.GUIDE_GUIDE_AREA, "");
    });
    const mask = document.getElementById(exports.GUIDE_MASK);
    mask === null || mask === void 0 ? void 0 : mask.remove();
    const popover = document.getElementById(exports.GUIDE_POPOVER_ITEM);
    popover === null || popover === void 0 ? void 0 : popover.remove();
}
exports.clear = clear;
function getPopoverPosition(relativeEl, type = "bottom-center", popover) {
    const result = { top: 0, left: 0 };
    const prevDistance = 5;
    const elPosition = elOffset(relativeEl);
    const rect = relativeEl.getBoundingClientRect();
    const popoverRect = popover.getBoundingClientRect();
    const map = {
        "bottom-center": () => {
            result.left = elPosition.left + rect.width / 2 - popoverRect.width / 2;
            result.top = elPosition.top + rect.height + prevDistance;
        },
        "top-center": () => {
            result.left = elPosition.left + rect.width / 2 - popoverRect.width / 2;
            result.top = elPosition.top - popoverRect.height - prevDistance;
        },
        "left-center": () => {
            result.left = elPosition.left - popoverRect.width - prevDistance;
            result.top = elPosition.top + rect.height / 2 - popoverRect.height / 2;
        },
        "right-center": () => {
            result.left = elPosition.left + rect.width + prevDistance;
            result.top = elPosition.top + rect.height / 2 - popoverRect.height / 2;
        },
    };
    map[type]();
    return result;
}
exports.getPopoverPosition = getPopoverPosition;
const elOffset = (ele) => {
    var _a;
    let result = {
        left: 0,
        top: 0,
    };
    if (!ele.getClientRects().length) {
        return result;
    }
    if (window.getComputedStyle(ele)["display"] === "none") {
        return result;
    }
    result = ele.getBoundingClientRect();
    let docElement = (_a = ele.ownerDocument) === null || _a === void 0 ? void 0 : _a.documentElement;
    return {
        top: result.top + window.pageYOffset - docElement.clientTop,
        left: result.left + window.pageXOffset - docElement.clientLeft,
    };
};
const loadingSvg = "M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z";
const createLoadingSvg = () => {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", exports.GUIDE_ANTICON_SPIN);
    svg.setAttribute("id", exports.GUIDE_ANTICON_SPIN);
    svg.setAttribute("width", "1em");
    svg.setAttribute("height", "1em");
    svg.setAttribute("viewBox", "0 0 1024 1024");
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", loadingSvg);
    svg.appendChild(path);
    return svg;
};
exports.createLoadingSvg = createLoadingSvg;
function loading(id, loading = true) {
    var _a, _b;
    const t = document.getElementById(id);
    if (!t)
        return;
    if (loading) {
        const children = (_a = t.children[0]) !== null && _a !== void 0 ? _a : null;
        const text = (_b = t.textContent) !== null && _b !== void 0 ? _b : "";
        t.textContent = "";
        t.insertBefore((0, exports.createLoadingSvg)(), children);
        t.appendChild(document.createTextNode(text));
    }
    else {
        const c = t.querySelectorAll(exports.GUIDE_ANTICON_SPIN);
        c.forEach((e) => e.remove());
    }
}
exports.loading = loading;
//# sourceMappingURL=tools.js.map