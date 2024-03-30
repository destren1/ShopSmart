import './scss/styles.scss';
import { API_URL, CDN_URL } from './utils/constants';
import { CatalogModel } from './components/CatalogModel';
import { WebLarekApi } from './components/WebLarekApi';
import { BasketModel } from './components/BasketModel';
import { Card } from './components/Card';
import { Page } from './components/Page';
import { ensureElement } from './utils/utils';

// Шаблоны
const catalogCardTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');

const webLarekApi = new WebLarekApi(CDN_URL, API_URL);
const catalogModel = new CatalogModel();
const basketModel = new BasketModel();
const page = new Page();

webLarekApi.getCardList().then((cards) => {
	catalogModel.addToCatalog(cards);
	const renderedCards = catalogModel.catalog.map((card) => {
		const catalogCard = new Card(catalogCardTemplate);
		return catalogCard.render(card);
	});
	page.setCatalog(renderedCards);
});
