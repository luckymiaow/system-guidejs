"use strict";
/*
 * @Description:
 * @Author: luckymiaow
 * @Date: 2022-05-27 16:56:15
 * @LastEditors: luckymiaow
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuideOptions = exports.Popover = exports.Step = void 0;
const tools_1 = require("./src/tools");
class Guide {
    constructor(config) {
        /**提示区域是否可编辑 */
        this.pointerEvent = true;
        /**点击外部关闭 */
        this.allowClose = true;
        /**完成按钮标题 */
        this.doneBtnText = "完成";
        /**关闭按钮标题 */
        this.closeBtnText = "关闭";
        /**引导对话的背景色 */
        this.stageBackground = "#fff";
        /**下一步按钮标题 */
        this.nextBtnText = "下一步";
        /**上一步按钮标题 */
        this.prevBtnText = "上一步";
        this.currentStepIndex = 0;
        this.stepDefinition = (steps) => {
            this.steps = steps;
        };
        this.start = (index) => {
            if (index == undefined)
                index = 0;
            this.currentStepIndex = index;
            (0, tools_1.clear)();
            const el = (0, tools_1.getElement)(this.currentStep.element);
            if (el.length) {
                this.createMask();
                this.createGuideArea(el);
                this.createPopoverItem(el);
            }
            else {
                throw new Error("找不到节点");
            }
        };
        this.createMask = () => {
            if (document.querySelectorAll(`#${tools_1.GUIDE_MASK}`).length == 0) {
                const el = document.createElement("div");
                el.className = tools_1.GUIDE_MASK;
                el.id = tools_1.GUIDE_MASK;
                if (this.allowClose === true)
                    el.onclick = this.closeStep;
                document.body.appendChild(el);
            }
        };
        this.createGuideArea = (el) => {
            let pointerEvent = " ";
            if (this.pointerEvent === false && this.currentStep.pointerEvent != true) {
                pointerEvent = pointerEvent + "on-pointer-events";
            }
            el.forEach((e) => {
                e.className = e.className + " " + tools_1.GUIDE_GUIDE_AREA + pointerEvent;
            });
        };
        this.createPopover = {
            title: () => {
                const title = document.createElement("div");
                title.className = tools_1.GUIDE_POPOVER_TITLE;
                title.insertAdjacentHTML("afterbegin", this.currentStep.popover.title);
                return title;
            },
            tip: () => {
                var _a;
                const tip = document.createElement("div");
                let className = [tools_1.GUIDE_POPOVER_TIP];
                const map = {
                    "bottom-center": ["bottom", "x-center"],
                    "top-center": ["x-center", "top"],
                    "left-center": ["y-center", "left"],
                    "right-center": ["y-center", "right"],
                };
                className.push(...map[(_a = this.currentStep.popover.position) !== null && _a !== void 0 ? _a : "bottom-center"]);
                tip.className = className.join(" ");
                return tip;
            },
            description: () => {
                const description = document.createElement("div");
                description.className = tools_1.GUIDE_POPOVER_DESCRIPTION;
                description.insertAdjacentHTML("afterbegin", this.currentStep.popover.description);
                return description;
            },
            footer: () => {
                const footer = document.createElement("div");
                footer.className = tools_1.GUIDE_POPOVER_FOOTER;
                footer.appendChild(this.createPopover.footerNavigation());
                if (this.steps.length > 1 || this.currentStep.popover.closeBtnText)
                    footer.appendChild(this.createPopover.footerClose());
                return footer;
            },
            footerClose: () => {
                var _a;
                const close = document.createElement("button");
                close.className = tools_1.GUIDE_POPOVER_CLOSE;
                close.textContent =
                    (_a = this.currentStep.popover.closeBtnText) !== null && _a !== void 0 ? _a : this.closeBtnText;
                close.onclick = this.closeStep;
                return close;
            },
            footerNavigation: () => {
                var _a, _b;
                const navigation = document.createElement("div");
                navigation.className = tools_1.GUIDE_POPOVER_NAVIGATION;
                if (this.currentStepIndex > 0) {
                    const prevBtn = document.createElement("button");
                    prevBtn.className = tools_1.GUIDE_POPOVER_PREV_BTN;
                    prevBtn.id = tools_1.GUIDE_POPOVER_PREV_BTN;
                    prevBtn.textContent =
                        (_a = this.currentStep.popover.prevBtnText) !== null && _a !== void 0 ? _a : this.prevBtnText;
                    prevBtn.onclick = this.prevStep;
                    navigation.appendChild(prevBtn);
                }
                const nextBtn = document.createElement("button");
                nextBtn.className = tools_1.GUIDE_POPOVER_NEXT_BTN;
                nextBtn.id = tools_1.GUIDE_POPOVER_NEXT_BTN;
                nextBtn.textContent =
                    (_b = this.currentStep.popover.nextBtnText) !== null && _b !== void 0 ? _b : this.nextBtnText;
                if (this.currentStepIndex < this.steps.length - 1) {
                    nextBtn.onclick = this.nextStep;
                    navigation.appendChild(nextBtn);
                }
                else if (this.currentStep.popover.nextBtnText) {
                    nextBtn.onclick = this.closeStep;
                    navigation.appendChild(nextBtn);
                }
                return navigation;
            },
        };
        this.nextStep = () => {
            (0, tools_1.loading)(tools_1.GUIDE_POPOVER_NEXT_BTN);
            if (this.currentStep.popover.onNext) {
                this.currentStep.popover.onNext().then(() => {
                    (0, tools_1.loading)(tools_1.GUIDE_POPOVER_NEXT_BTN, false);
                    this.start(this.currentStepIndex + 1);
                });
            }
            else {
                (0, tools_1.loading)(tools_1.GUIDE_POPOVER_NEXT_BTN, false);
                this.start(this.currentStepIndex + 1);
            }
        };
        this.prevStep = () => {
            (0, tools_1.loading)(tools_1.GUIDE_POPOVER_PREV_BTN);
            if (this.currentStep.popover.onPrev) {
                this.currentStep.popover.onPrev().then(() => {
                    (0, tools_1.loading)(tools_1.GUIDE_POPOVER_PREV_BTN, false);
                    this.start(this.currentStepIndex - 1);
                });
            }
            else {
                (0, tools_1.loading)(tools_1.GUIDE_POPOVER_PREV_BTN, false);
                this.start(this.currentStepIndex - 1);
            }
        };
        this.closeStep = () => {
            (0, tools_1.clear)();
        };
        Object.assign(this, config);
    }
    get currentStep() {
        return this.steps[this.currentStepIndex];
    }
    createPopoverItem(el) {
        var _a;
        const item = document.createElement("div");
        item.className = tools_1.GUIDE_POPOVER_ITEM;
        item.id = tools_1.GUIDE_POPOVER_ITEM;
        const relativeEl = el[(_a = this.currentStep.elementIndex) !== null && _a !== void 0 ? _a : 0];
        item.appendChild(this.createPopover.tip());
        item.appendChild(this.createPopover.title());
        item.appendChild(this.createPopover.description());
        item.appendChild(this.createPopover.footer());
        item.style.visibility = "hidden";
        document.body.appendChild(item);
        const temp = document.getElementById(item.id);
        if (temp) {
            const { top, left } = (0, tools_1.getPopoverPosition)(relativeEl, this.currentStep.popover.position, temp);
            temp.style.setProperty("top", top + "px");
            temp.style.setProperty("left", left + "px");
            temp.style.removeProperty("visibility");
        }
    }
}
exports.default = Guide;
class Step {
}
exports.Step = Step;
class Popover {
}
exports.Popover = Popover;
class GuideOptions {
    constructor() {
        /**禁止点击外部关闭 */
        this.allowClose = true;
        /**完成按钮标题 */
        this.doneBtnText = "完成";
        /**关闭按钮标题 */
        this.closeBtnText = "跳过引导";
        /**引导对话的背景色 */
        this.stageBackground = "#fff";
        /**下一步按钮标题 */
        this.nextBtnText = "下一步";
        /**上一步按钮标题 */
        this.prevBtnText = "上一步";
    }
}
exports.GuideOptions = GuideOptions;
//# sourceMappingURL=index.js.map