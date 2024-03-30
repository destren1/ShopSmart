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



// Шаблоны
const catalogCardTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const previewCardTemplate = ensureElement<HTMLTemplateElement>('#card-preview');


const modal = ensureElement<HTMLDivElement>('#modal-container')

const webLarekApi = new WebLarekApi(CDN_URL, API_URL);
const catalogModel = new CatalogModel();
const basketModel = new BasketModel();
const page = new Page();
const eventEmitter = new EventEmitter();

eventEmitter.on('Card:open',()=>{
	const contentModal = new ContentModal(modal)
	contentModal.show()
})

webLarekApi.getCardList().then((cards) => {
	catalogModel.addToCatalog(cards);
	const renderedCards = catalogModel.catalog.map((card) => {
		const catalogCard = new Card(catalogCardTemplate, {onClick: () => eventEmitter.emit('Card:open', card)});
		return catalogCard.render(card);
	});
	page.setCatalog(renderedCards);
});
