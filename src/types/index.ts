export type productItem = {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number;
};

export interface IWebLarekApi {
	getCardList(): productItem[];
	getCardById(id: string): productItem;
}

export interface IBasketModel {
	basket: productItem[];
	addToBasket(item: productItem): void;
	removeFromBasket(item: productItem): void;
	clearBasket(): void;
}

export interface ICatalogModel {
	catalog: productItem[];
	addToCatalog(items: productItem[]): void;
}

export interface ICard {
	template: HTMLElement;
	Title: string;
	Description?: string;
	Image?: string;
	Category: string;
	Price: number;
	Button?: string;
	Index?: number;
	SetTitle(value: string): void;
	SetImage(value: string): void;
	SetPrice(value: number): void;
	SetDescription(value: string): void;
	SetCategory(value: string): void;
	SetButton(value: string): void;
	SetIndex(value: number): void;
}

export interface IModal {
	closeButton: HTMLElement;
	show(): void;
	close(): void;
}

export interface IContentModal {
	template: HTMLElement;
}

export interface IBasket {
	cardInstance: Card;
	template: HTMLElement;
	totalCost: string;
	counterTotalCost(): string;
}

export interface IForm {
	validate(): void;
	sumbit(): void;
}

export interface IContactForm {
	template: HTMLElement;
	setPhone(value: string): void;
	setEmail(value: string): void;
}

export interface IDeliveryForm {
	template: HTMLElement;
	buttonCard: HTMLButtonElement;
	buttonCash: HTMLButtonElement;
	toggleButton(): void;
	setAddress(value: string): void;
}

export interface ISuccess {
	template: HTMLElement;
	totalCost: string;
	buttonNext: HTMLButtonElement;
	close(): void;
	counterTotalCost(): string;
}

export interface IPage {
	counter: HTMLElement;
	catalog: HTMLElement;
	updateCounter(value: number): void;
	setCatalog(items: productItem[]): void;
}
