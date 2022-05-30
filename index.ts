/*
 * @Description:
 * @Author: luckymiaow
 * @Date: 2022-05-27 16:56:15
 * @LastEditors: luckymiaow
 */

import {
  getElement,
  ElementTag,
  getPopoverPosition,
  clear,
  createLoadingSvg,
  GUIDE_POPOVER_NEXT_BTN,
  loading,
  GUIDE_POPOVER_ITEM,
  GUIDE_POPOVER_TITLE,
  GUIDE_POPOVER_TIP,
  GUIDE_POPOVER_DESCRIPTION,
  GUIDE_POPOVER_FOOTER,
  GUIDE_POPOVER_CLOSE,
  GUIDE_POPOVER_NAVIGATION,
  GUIDE_POPOVER_PREV_BTN,
  GUIDE_MASK,
  GUIDE_GUIDE_AREA,
} from "./src/tools";

export default class Guide {
  public constructor(config?: Partial<GuideOptions>) {
    Object.assign(this, config);
  }

  /**提示区域是否可编辑 */
  pointerEvent?: boolean = true;

  /**点击外部关闭 */
  private allowClose: boolean = true;

  /**完成按钮标题 */
  private doneBtnText: string = "完成";

  /**关闭按钮标题 */
  private closeBtnText: string = "关闭";

  /**引导对话的背景色 */
  private stageBackground: string = "#fff";

  /**下一步按钮标题 */
  private nextBtnText: string = "下一步";

  /**上一步按钮标题 */
  private prevBtnText: string = "上一步";

  private steps: Array<Step>;

  private currentStepIndex: number = 0;

  get currentStep(): Step {
    return this.steps[this.currentStepIndex];
  }

  stepDefinition = (steps: Array<Step>) => {
    this.steps = steps;
  };

  start = (index?: number) => {
    if (index == undefined) index = 0;
    this.currentStepIndex = index;
    clear();
    const el = getElement(this.currentStep.element);
    if (el.length) {
      this.createMask();
      this.createGuideArea(el);
      this.createPopoverItem(el);
    } else {
      throw new Error("找不到节点");
    }
  };

  private createMask = () => {
    if (document.querySelectorAll(`#${GUIDE_MASK}`).length == 0) {
      const el = document.createElement("div");
      el.className = GUIDE_MASK;
      el.id = GUIDE_MASK;
      if (this.allowClose === true) el.onclick = this.closeStep;
      document.body.appendChild(el);
    }
  };

  private createGuideArea = (el: Element[]) => {
    let pointerEvent = " ";
    if (this.pointerEvent === false && this.currentStep.pointerEvent != true) {
      pointerEvent = pointerEvent + "on-pointer-events";
    }
    el.forEach((e) => {
      e.className = e.className + " " + GUIDE_GUIDE_AREA + pointerEvent;
    });
  };

  private createPopoverItem(el: Element[]) {
    const item = document.createElement("div");
    item.className = GUIDE_POPOVER_ITEM;
    item.id = GUIDE_POPOVER_ITEM;
    const relativeEl = el[this.currentStep.elementIndex ?? 0] as HTMLElement;
    item.appendChild(this.createPopover.tip());
    item.appendChild(this.createPopover.title());
    item.appendChild(this.createPopover.description());
    item.appendChild(this.createPopover.footer());
    item.style.visibility = "hidden";
    document.body.appendChild(item);
    const temp = document.getElementById(item.id);
    if (temp) {
      const { top, left } = getPopoverPosition(
        relativeEl,
        this.currentStep.popover.position,
        temp
      );
      temp.style.setProperty("top", top + "px");
      temp.style.setProperty("left", left + "px");
      temp.style.removeProperty("visibility");
    }
  }

  private createPopover = {
    title: (): Element => {
      const title = document.createElement("div");
      title.className = GUIDE_POPOVER_TITLE;
      title.insertAdjacentHTML("afterbegin", this.currentStep.popover.title);
      return title;
    },
    tip: (): Element => {
      const tip = document.createElement("div");
      let className = [GUIDE_POPOVER_TIP];
      const map: Record<PopoverPosition, string[]> = {
        "bottom-center": ["bottom", "x-center"],
        "top-center": ["x-center", "top"],
        "left-center": ["y-center", "left"],
        "right-center": ["y-center", "right"],
      };
      className.push(
        ...map[this.currentStep.popover.position ?? "bottom-center"]
      );
      tip.className = className.join(" ");
      return tip;
    },
    description: (): Element => {
      const description = document.createElement("div");
      description.className = GUIDE_POPOVER_DESCRIPTION;
      description.insertAdjacentHTML(
        "afterbegin",
        this.currentStep.popover.description
      );
      return description;
    },
    footer: (): Element => {
      const footer = document.createElement("div");
      footer.className = GUIDE_POPOVER_FOOTER;
      footer.appendChild(this.createPopover.footerNavigation());
      if (this.steps.length > 1 || this.currentStep.popover.closeBtnText)
        footer.appendChild(this.createPopover.footerClose());
      return footer;
    },
    footerClose: (): Element => {
      const close = document.createElement("button");
      close.className = GUIDE_POPOVER_CLOSE;
      close.textContent =
        this.currentStep.popover.closeBtnText ?? this.closeBtnText;
      close.onclick = this.closeStep;
      return close;
    },
    footerNavigation: (): Element => {
      const navigation = document.createElement("div");
      navigation.className = GUIDE_POPOVER_NAVIGATION;

      if (this.currentStepIndex > 0) {
        const prevBtn = document.createElement("button");
        prevBtn.className = GUIDE_POPOVER_PREV_BTN;
        prevBtn.id = GUIDE_POPOVER_PREV_BTN;
        prevBtn.textContent =
          this.currentStep.popover.prevBtnText ?? this.prevBtnText;
        prevBtn.onclick = this.prevStep;

        navigation.appendChild(prevBtn);
      }

      const nextBtn = document.createElement("button");
      nextBtn.className = GUIDE_POPOVER_NEXT_BTN;
      nextBtn.id = GUIDE_POPOVER_NEXT_BTN;
      nextBtn.textContent =
        this.currentStep.popover.nextBtnText ?? this.nextBtnText;
      if (this.currentStepIndex < this.steps.length - 1) {
        nextBtn.onclick = this.nextStep;
        navigation.appendChild(nextBtn);
      } else if (this.currentStep.popover.nextBtnText) {
        nextBtn.onclick = this.closeStep;
        navigation.appendChild(nextBtn);
      }

      return navigation;
    },
  };

  private nextStep = () => {
    loading(GUIDE_POPOVER_NEXT_BTN);
    if (this.currentStep.popover.onNext) {
      this.currentStep.popover.onNext().then(() => {
        loading(GUIDE_POPOVER_NEXT_BTN, false);
        this.start(this.currentStepIndex + 1);
      });
    } else {
      loading(GUIDE_POPOVER_NEXT_BTN, false);
      this.start(this.currentStepIndex + 1);
    }
  };

  private prevStep = () => {
    loading(GUIDE_POPOVER_PREV_BTN);
    if (this.currentStep.popover.onPrev) {
      this.currentStep.popover.onPrev().then(() => {
        loading(GUIDE_POPOVER_PREV_BTN, false);
        this.start(this.currentStepIndex - 1);
      });
    } else {
      loading(GUIDE_POPOVER_PREV_BTN, false);
      this.start(this.currentStepIndex - 1);
    }
  };
  private closeStep = () => {
    clear();
  };
}

export class Step {
  /**需要被高亮的查询选择器字符或 */
  element: ElementTag;
  /**如果为空将不会显示弹窗 */
  popover: Popover;
  /**弹窗内容相对于哪个 element 显示，默认第一个*/
  elementIndex?: number;
  /**提示区域是否可编辑 */
  pointerEvent?: boolean;
}

export type PopoverPosition =
  | "bottom-center"
  | "top-center"
  | "left-center"
  | "right-center";

export class Popover {
  /**除了Driver选项中的通用类名称之外，还可以指定包裹当前指定步骤弹窗的类名 */
  className?: string;
  /**弹窗的标题  */
  title: string;
  /**弹窗的主体内容 */
  description: string;
  /**是否在底部显示控制按钮 */
  showButtons?: boolean;
  /**关闭按钮的文本 */
  closeBtnText?: string;
  /**当前步骤的下一步按钮文本 */
  nextBtnText?: string;
  /**当前步骤的上一步按钮文本 */
  prevBtnText?: string;
  /** 提示窗位置*/
  position?: PopoverPosition;

  onNext?: () => Promise<void>;

  onPrev?: () => Promise<void>;
}

export class GuideOptions {
  /**禁止点击外部关闭 */
  allowClose: boolean = true;

  /**完成按钮标题 */
  doneBtnText: string = "完成";

  /**关闭按钮标题 */
  closeBtnText: string = "跳过引导";

  /**引导对话的背景色 */
  stageBackground: string = "#fff";

  /**下一步按钮标题 */
  nextBtnText: string = "下一步";

  /**上一步按钮标题 */
  prevBtnText: string = "上一步";

  /**提示区域是否可编辑 */
  pointerEvent?: boolean;

  steps: Array<Step>;

  currentStepIndex: number;
}
