import { IActions, IContentModal } from '../types';
import { ensureElement } from '../utils/utils';
import { Page } from './Page';
import { Modal } from './common/Modal';

export class ContentModal extends Modal implements IContentModal {
	content: HTMLElement;
	modalContent: HTMLElement;
	button: HTMLButtonElement;
	page: Page;

	constructor(modalContainer: HTMLElement, page: Page, actions?: IActions) {
		super(modalContainer, actions);
		this.modalContent = ensureElement('.modal__content', modalContainer);
		this.page = page;
	}

	show(): void {
		this.modalContent.append(this.content);
		super.show();
		this.page.lockPage();
	}

	close(): void {
		super.close();
		this.page.unlockPage();
		this.clearModalContent();
	}

	setContent(content: HTMLElement): void {
		this.content = content;
	}

	setButton(button: HTMLButtonElement, actions: IActions): void {
		this.button = button;
		this.button.addEventListener('click', actions.onClick);
	}

	clearModalContent(): void {
		if (this.content && this.modalContent.contains(this.content)) {
			this.modalContent.removeChild(this.content);
		}
		this.content = null;
	}
}
