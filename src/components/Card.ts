import { ICard } from '../types/index';
import { Component } from '../components/base/components';
import { ProductItem } from '../types/index';
import { ensureElement, cloneTemplate } from '../utils/utils';``

export class Card extends Component<ProductItem> implements ICard {
	container: HTMLElement;
	title: HTMLHeadingElement;
	description?: HTMLParagraphElement;
	image?: HTMLImageElement;
	category: HTMLSpanElement;
	price: HTMLSpanElement;

	constructor(container: HTMLTemplateElement) {
		super(container);
		this.container = cloneTemplate(container);
		this.title = ensureElement<HTMLHeadingElement>(
			'.card__title',
			this.container
		);
		this.description = this.container.querySelector('.card__text');
		this.image = this.container.querySelector('.card__image');
		this.category = ensureElement<HTMLSpanElement>(
			'.card__category',
			this.container
		);
		this.price = ensureElement<HTMLSpanElement>('.card__price', this.container);
	}

	render(data: ProductItem): HTMLElement {
		this.setText(this.title, data.title);
		this.setText(this.category, data.category);
		this.setText(this.price, `${data.price} синапсов`);
		if (this.image) {
			this.image.src = data.image;
			this.image.alt = data.title;
		}
		if (this.description) {
			this.setText(this.description, data.description);
		}
		return this.container;
	}
}
