import { ElementTag } from "./src/tools";
export default class Guide {
    constructor(config?: Partial<GuideOptions>);
    /**提示区域是否可编辑 */
    pointerEvent?: boolean;
    /**点击外部关闭 */
    private allowClose;
    /**完成按钮标题 */
    private doneBtnText;
    /**关闭按钮标题 */
    private closeBtnText;
    /**引导对话的背景色 */
    private stageBackground;
    /**下一步按钮标题 */
    private nextBtnText;
    /**上一步按钮标题 */
    private prevBtnText;
    private steps;
    private currentStepIndex;
    get currentStep(): Step;
    stepDefinition: (steps: Array<Step>) => void;
    start: (index?: number | undefined) => void;
    private createMask;
    private createGuideArea;
    private createPopoverItem;
    private createPopover;
    private nextStep;
    private prevStep;
    private closeStep;
}
export declare class Step {
    /**需要被高亮的查询选择器字符或 */
    element: ElementTag;
    /**如果为空将不会显示弹窗 */
    popover: Popover;
    /**弹窗内容相对于哪个 element 显示，默认第一个*/
    elementIndex?: number;
    /**提示区域是否可编辑 */
    pointerEvent?: boolean;
}
export declare type PopoverPosition = "bottom-center" | "top-center" | "left-center" | "right-center";
export declare class Popover {
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
export declare class GuideOptions {
    /**禁止点击外部关闭 */
    allowClose: boolean;
    /**完成按钮标题 */
    doneBtnText: string;
    /**关闭按钮标题 */
    closeBtnText: string;
    /**引导对话的背景色 */
    stageBackground: string;
    /**下一步按钮标题 */
    nextBtnText: string;
    /**上一步按钮标题 */
    prevBtnText: string;
    /**提示区域是否可编辑 */
    pointerEvent?: boolean;
    steps: Array<Step>;
    currentStepIndex: number;
}
