import './scss/styles.scss';
import { API_URL, CDN_URL } from './utils/constants';
import { CatalogModel } from './components/CatalogModel';
import { WebLarekApi } from './components/WebLarekApi';
import { BasketModel } from './components/BasketModel';
import { Card } from './components/Card';
import { Page } from './components/Page';
import { cloneTemplate, ensureElement } from './utils/utils';
import { EventEmitter } from './components/base/events';
import { ContentModal } from './components/ContentModal';
import { ProductItem } from './types';

// Шаблоны и константы
const catalogCardTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const previewCardTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');

const modal = ensureElement<HTMLDivElement>('#modal-container');

// Экземпляры классов
const webLarekApi = new WebLarekApi(CDN_URL, API_URL);
const catalogModel = new CatalogModel();
const basketModel = new BasketModel();
const page = new Page({
	onClick: () => {
		eventEmitter.emit('Basket:open');
	},
});
const eventEmitter = new EventEmitter();
const contentModal = new ContentModal(modal, {
	onClick: () => eventEmitter.emit('Modal:close'),
});

// Действие при нажатии на корзину
eventEmitter.on('Basket:open', () => {
	contentModal.show();
});

//Действие при закрытии модального окна
eventEmitter.on('Modal:close', () => {
	contentModal.close();
	page.unlockPage();
});

// Действие при нажатии на кнопку "В корзину"
eventEmitter.on('Basket:addItem', (card: ProductItem) => {
	basketModel.addToBasket(card);
	page.updateCounter();
	contentModal.close();
});

// Действие при открытии карточки
eventEmitter.on('Card:open', (card: ProductItem) => {
	const previewCard = new Card(previewCardTemplate);
	contentModal.clearModalContent();
	const renderedPreviewCard = previewCard.render(card);
	contentModal.setContent(renderedPreviewCard);

	const buttonAddToBasket = ensureElement<HTMLButtonElement>(
		'.card__button',
		renderedPreviewCard
	);
	contentModal.setButton(buttonAddToBasket, {
		onClick: () => eventEmitter.emit('Basket:addItem', card),
	});

	contentModal.show();
	page.lockPage();
});

// Отображение всех карточек на странице
webLarekApi.getCardList().then((cards) => {
	catalogModel.addToCatalog(cards);

	const renderedCards = catalogModel.catalog.map((card) => {
		const catalogCard = new Card(catalogCardTemplate, {
			onClick: () => eventEmitter.emit('Card:open', card),
		});
		return catalogCard.render(card);
	});
	page.setCatalog(renderedCards);
});
