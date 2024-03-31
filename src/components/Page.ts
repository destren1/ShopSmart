import { IPage } from '../types';
import { ensureElement } from '../utils/utils';

export class Page implements IPage {
	counter: HTMLElement;
	catalog: HTMLElement;

	constructor() {
		this.counter = ensureElement('.header__basket-counter ');
		this.catalog = ensureElement('.gallery');
	}

	updateCounter(): void {
		let currentValue: number = parseInt(this.counter.textContent);
		currentValue++;
		this.counter.textContent = currentValue.toString();
		console.log(this.counter);
	}

	setCatalog(items: HTMLElement[]): void {
		items.forEach((item) => {
			this.catalog.append(item);
		});
	}
}
