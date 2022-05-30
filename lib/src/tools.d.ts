import { PopoverPosition } from "../index";
export declare const GUIDE_POPOVER_NEXT_BTN = "guide-popover-next-btn";
export declare const GUIDE_ANTICON_SPIN = "guide-anticon-spin";
export declare const GUIDE_POPOVER_ITEM = "guide-popover-item";
export declare const GUIDE_POPOVER_TITLE = "guide-popover-title";
export declare const GUIDE_POPOVER_TIP = "guide-popover-tip";
export declare const GUIDE_POPOVER_DESCRIPTION = "guide-popover-description";
export declare const GUIDE_POPOVER_FOOTER = "guide-popover-footer";
export declare const GUIDE_POPOVER_CLOSE = "guide-popover-close";
export declare const GUIDE_POPOVER_NAVIGATION = "guide-popover-navigation";
export declare const GUIDE_POPOVER_PREV_BTN = "guide-popover-prev-btn";
export declare const GUIDE_GUIDE_AREA = "guidejs-guide-area";
export declare const GUIDE_ON_POINTER_EVENT = "on-pointer-events";
export declare const GUIDE_MASK = "guidejs-mask";
export declare type ElementTag = string | Array<string> | Element | Array<Element>;
export declare function getElement(dealEl: ElementTag): Element[];
export declare function clear(): void;
export declare function getPopoverPosition(relativeEl: HTMLElement, type: PopoverPosition | undefined, popover: HTMLElement): {
    top: number;
    left: number;
};
export declare const createLoadingSvg: () => Element;
export declare function loading(id: string, loading?: boolean): void;
