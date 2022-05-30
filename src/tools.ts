/*
 * @Description:
 * @Author: luckymiaow
 * @Date: 2022-05-27 23:34:41
 * @LastEditors: luckymiaow
 */

import Guide, { PopoverPosition } from "../index";

export const GUIDE_POPOVER_NEXT_BTN = "guide-popover-next-btn";
export const GUIDE_ANTICON_SPIN = "guide-anticon-spin";
export const GUIDE_POPOVER_ITEM = "guide-popover-item";
export const GUIDE_POPOVER_TITLE = "guide-popover-title";
export const GUIDE_POPOVER_TIP = "guide-popover-tip";
export const GUIDE_POPOVER_DESCRIPTION = "guide-popover-description";
export const GUIDE_POPOVER_FOOTER = "guide-popover-footer";
export const GUIDE_POPOVER_CLOSE = "guide-popover-close";
export const GUIDE_POPOVER_NAVIGATION = "guide-popover-navigation";
export const GUIDE_POPOVER_PREV_BTN = "guide-popover-prev-btn";
export const GUIDE_GUIDE_AREA = "guidejs-guide-area";
export const GUIDE_ON_POINTER_EVENT = "on-pointer-events";
export const GUIDE_MASK = "guidejs-mask";

export type ElementTag = string | Array<string> | Element | Array<Element>;

export function getElement(dealEl: ElementTag): Element[] {
  const elements: Element[] = [];
  const t = (e: string | Element) => {
    if (typeof e === "string") {
      elements.push(...document.querySelectorAll(e));
    } else {
      elements.push(e);
    }
  };
  if (Array.isArray(dealEl)) {
    dealEl.forEach((e) => {
      t(e);
    });
  } else {
    t(dealEl);
  }
  return elements;
}

export function clear() {
  const t = document.querySelectorAll("." + GUIDE_GUIDE_AREA);
  t.forEach((e) => {
    e.className = e.className.replace(GUIDE_GUIDE_AREA, "");
    e.className = e.className.replace(GUIDE_ON_POINTER_EVENT, "");
  });
  const mask = document.getElementById(GUIDE_MASK);
  mask?.remove();

  const popover = document.getElementById(GUIDE_POPOVER_ITEM);
  popover?.remove();
}

export function getPopoverPosition(
  relativeEl: HTMLElement,
  type: PopoverPosition = "bottom-center",
  popover: HTMLElement
): { top: number; left: number } {
  const result = { top: 0, left: 0 };
  const prevDistance = 5;
  const elPosition = elOffset(relativeEl);
  const rect = relativeEl.getBoundingClientRect();
  const popoverRect = popover.getBoundingClientRect();
  const map: Record<PopoverPosition, () => void> = {
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

const elOffset = (ele: HTMLElement): { top: number; left: number } => {
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
  let docElement = ele.ownerDocument?.documentElement;

  return {
    top: result.top + window.pageYOffset - docElement.clientTop,
    left: result.left + window.pageXOffset - docElement.clientLeft,
  };
};

const loadingSvg =
  "M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z";
export const createLoadingSvg = (): Element => {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("class", GUIDE_ANTICON_SPIN);
  svg.setAttribute("id", GUIDE_ANTICON_SPIN);
  svg.setAttribute("width", "1em");
  svg.setAttribute("height", "1em");
  svg.setAttribute("viewBox", "0 0 1024 1024");
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", loadingSvg);
  svg.appendChild(path);
  return svg;
};

export function loading(id: string, loading: boolean = true) {
  const t = document.getElementById(id);
  if (!t) return;
  if (loading) {
    const children = t.children[0] ?? null;
    const text = t.textContent ?? "";
    t.textContent = "";
    t.insertBefore(createLoadingSvg(), children);
    t.appendChild(document.createTextNode(text));
  } else {
    const c = t.querySelectorAll(GUIDE_ANTICON_SPIN);
    c.forEach((e) => e.remove());
  }
}
