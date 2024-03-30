import { IPage } from "../types";
import { ensureElement } from "../utils/utils";

export class Page implements IPage {
	counter: HTMLElement;
	catalog: HTMLElement;

	constructor() {
		this.counter = ensureElement('.header__basket-counter ')
		this.catalog = ensureElement('.gallery')
	}

	updateCounter(value: number): void {}
	setCatalog(items:HTMLElement[]): void {
		items.forEach(item=>{
			this.catalog.append(item)
		})
	}
}