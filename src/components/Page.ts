import { IActions, IPage } from '../types';
import { ensureElement } from '../utils/utils';
import { BasketModel } from './BasketModel';

export class Page implements IPage {
	counter: HTMLElement;
	catalog: HTMLElement;
	pageWrapper: HTMLElement;
	basketButton: HTMLButtonElement;
	basketModel: BasketModel

	constructor(actions: IActions) {
		this.counter = ensureElement('.header__basket-counter ');
		this.catalog = ensureElement('.gallery');
		this.pageWrapper = ensureElement('.page__wrapper');
		this.basketButton = ensureElement<HTMLButtonElement>('.header__basket');
		this.basketButton.addEventListener('click', actions.onClick);
	}

	updateCounter(): void {
		this.counter.textContent = this.basketModel.basketItems.length.toString()
	}

	setCatalog(items: HTMLElement[]): void {
		items.forEach((item) => {
			this.catalog.append(item);
		});
	}

	lockPage(): void {
		this.pageWrapper.classList.add('page__wrapper_locked');
	}

	unlockPage(): void {
		this.pageWrapper.classList.remove('page__wrapper_locked');
	}
}
