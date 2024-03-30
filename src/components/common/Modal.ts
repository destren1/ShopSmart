import { IModal } from '../../types';
import { ensureElement } from '../../utils/utils';

export abstract class Modal implements IModal {
	container: HTMLDivElement;
	closeButton: HTMLElement;

	constructor(container: HTMLDivElement) {
		this.container = container;
		this.closeButton = ensureElement('#modal__close', container);
	}

	show(): void {
		this.container.classList.add('modal_active');
	}
	close(): void {
		this.container.classList.remove('modal_active');
	}
}
