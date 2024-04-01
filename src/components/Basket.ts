import { IBasket } from '../types';
import { cloneTemplate } from '../utils/utils';
import { Card } from './Card';

export class Basket implements IBasket {
	cardInstance: Card;
	basket: HTMLElement;
	cardBasket: HTMLElement;
	totalCost: HTMLElement;

	constructor(
		basketTemplate: HTMLTemplateElement,
		cardBasketTemplate: HTMLTemplateElement,
		card: Card
	) {
		this.basket = cloneTemplate(basketTemplate);
		this.cardBasket = cloneTemplate(cardBasketTemplate);
		this.cardInstance = card;
		this.totalCost = this.cardBasket.querySelector('.basket__price')
	}

	counterTotalCost(): void {
		let totalCost = 0
		const cardPrices = this.cardBasket.querySelectorAll('.card__price')

		cardPrices.forEach((item)=>{
			let cardPrice = parseInt(item.textContent)
			totalCost += cardPrice
		})

		this.totalCost.textContent = totalCost.toString()
	}
}
