import './scss/styles.scss';
import { API_URL, CDN_URL } from './utils/constants';
import { CatalogModel } from './components/CatalogModel';
import { WebLarekApi } from './components/WebLarekApi';
import { BasketModel } from './components/BasketModel';

const webLarekApi = new WebLarekApi(CDN_URL, API_URL);
const catalogModel = new CatalogModel();
const basketModel = new BasketModel();

webLarekApi.getCardList().then((cards) => {
	catalogModel.addToCatalog(cards);
});

console.log(catalogModel.catalog)
