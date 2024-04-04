# Проектная работа "Веб-ларек"

**Стек:** HTML, SCSS, TS, Webpack

**Паттерн программирования:** упрощённая версия архитектурного паттерна MVP

**Структура проекта:**

- `src/` — исходные файлы проекта
- `src/components/` — папка с JS компонентами
- `src/components/base/` — папка с базовым кодом

**Важные файлы:**

- `src/pages/index.html` — HTML-файл главной страницы
- `src/types/index.ts` — файл с типами
- `src/index.ts` — точка входа приложения
- `src/styles/styles.scss` — корневой файл стилей
- `src/utils/constants.ts` — файл с константами
- `src/utils/utils.ts` — файл с утилитами

## Установка и запуск

Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```

## Сборка

```
npm run build
```

или

```
yarn build
```

## Базовый код

### Класс EventEmitter

Класс EventEmitter реализует паттерн "Наблюдатель" и обеспечивает механизм подписки на события, отписки от событий и уведомления подписчиков о наступлении событий.

Реализован на основе интерфейса:

```
interface IEvents {
  on<T extends object>(event: EventName, callback: (data: T) => void): void;
  emit<T extends object>(event: string, data?: T): void;
  trigger<T extends object>(event: string, context?: Partial<T>): (data: T) => void;
}
```

И типов:

```
type EventName = string | RegExp;
type Subscriber = Function;
type EmitterEvent = {
  eventName: string,
  data: unknown
};
```

**Предоставляет методы:**

- `on<T extends object>(eventName: EventName, callback: (event: T) => void)` - Подписывает указанную функцию callback на событие с именем eventName.

- `off(eventName: EventName, callback: Subscriber)` - Отписывает указанную функцию callback от события с именем eventName.

- `emit<T extends object>(eventName: string, data?: T)` - Уведомляет всех подписчиков о наступлении события с именем eventName, передавая им данные eventData, если они предоставлены.

- `onAll(callback: (event: EmitterEvent) => void)` - Подписывает указанную функцию callback на все события.

- `offAll()` - Отписывает все функции от всех событий.

- `trigger<T extends object>(eventName: string, context?: Partial<T>)` - Генерирует событие с именем eventName и передает ему данные eventData.

### Класс Component

Класс Component предоставляет удобный инструментарий для работы с DOM-элементами. 

**Предоставляет методы:**

- `toggleClass(element: HTMLElement, className: string, force?: boolean)` - Переключает класс className у указанного DOM-элемента element.

- `protected setText(element: HTMLElement, value: unknown)` - Устанавливает текстовое содержимое text для указанного DOM-элемента element.

- `setDisabled(element: HTMLElement, state: boolean)` - Устанавливает состояние блокировки (disabled) для указанного DOM-элемента element.

- `protected setHidden(element: HTMLElement)` - Скрывает указанный DOM-элемент element.

- `protected setVisible(element: HTMLElement)` - Показывает указанный DOM-элемент element.

- `protected setImage(element: HTMLImageElement, src: string, alt?: string)` - Устанавливает изображение с источником src и альтернативным текстом alt для указанного элемента <img>.

- `render(data?: Partial<T>)` - HTMLElement: Рендерит элемент в указанный контейнер container и возвращает сам элемент.

## Класс Api

Класс Api отвечает за взаимодействие с сервером посредством отправки HTTP-запросов.

Реализован на основе типов:

```
type ApiListResponse<Type> = {
  total: number,
  items: Type[]
};
```

```
type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';
```

**Предоставляет методы:**

- `protected handleResponse(response: Response): Promise<object>` - Отвечает за обработку ответа от сервера после выполнения HTTP-запроса. Он принимает объект Response, представляющий ответ сервера, и возвращает Promise, разрешающийся объектом, представляющим обработанные данные ответа.

- `get(url: string): Promise<any>` - Выполняет GET запрос по указанному url и возвращает Promise с результатом запроса.

- `post(uri: string, data: object, method: ApiPostMethods = 'POST')` - Выполняет POST запрос по указанному url с переданными данными data и возвращает Promise с результатом запроса.

## Модели данных(Model)

_Архитектурный слой необходимый для хранения и изменения данных._

### Класс WebLarekApi:

Наследуется от Класса Api.
WebLarekApi предназначен для получения данных карточек с сервера и отправки данных на сервер.

Реализуется на основе интерфейса IWebLarekApi и типа ProductItem, который представляет структуру данных карточки:

```
interface IWebLarekApi {
	cdn: string;
	getCardList(): Promise<ProductItem[]>
	orderPurchase(order: ApiListResponse<string>): void
}
```

```
type ProductItem = {
	id: string
  description: string
  image: string
  title: string
  category: string
	price: number
}
```

**Предоставляет поля и методы:**

Поля:

- `cdn: string` - используется для формирования полного пути к изображениям при их отображении в приложении.

  Методы:

- `getCardList(): ProductItem[]` - Получает массив данных карточек с сервера и возвращает его. Каждый элемент массива представляет объект с данными карточки товара.
- `orderPurchase(order: ApiListResponse<string>): void` - отправляет put-запрос на сервер с заказом.

### Класс BasketModel:

BasketModel отвечает за хранение данных корзины и предоставляет методы для работы с ней.

Реализован на основе интерфейса и типа ProductItem:

```
interface IBasketModel {
	basket: ProductItem[]
	addToBasket(item: ProductItem): void
	removeFromBasket(item: ProductItem): void
	clearBasket(): void
}
```

**Предоставляет поля и методы:**

Поля:

- `basket: ProductItem[]` - Поле для хранения элементов корзины. Это массив объектов ProductItem, каждый из которых представляет товар в корзине.

Методы:

- `addToBasket(item: ProductItem): void` - Добавляет указанный товар item в корзину.

- `removeFromBasket(id: string): void` - Удаляет указанный товар item из корзины.

- `clearBasket(): void` - Очищает корзину от всех товаров.

#### Класс CatalogModel:

CatalogModel отвечает за хранение данных каталога товаров и предоставляет методы для управления этими данными.

Реализован на основе интерфейса и типа ProductItem:

```
interface ICatalogModel {
	catalog: ProductItem[]
	addToCatalog(items: ProductItem[]): void
}
```

**Предоставляет поля и методы:**

Поля:

- `catalog: ProductItem[]` - Поле для хранения элементов каталога. Это массив объектов ProductItem, представляющих товары в каталоге.

Методы:

- `addToCatalog(items: ProductItem[]): void` - Добавляет указанные товары items в каталог.

## Компоненты отображения(View)

_Архитектурный слой необходимый для отображения данных на странице._

### Класс Card

Card представляет собой класс для создания карточек товаров на основе предоставленного шаблона (template) и предоставляет методы для установки значений в карточку.

Наследуется от класса Component:
CardModal наследует функциональность от класса Component, что позволяет ему использовать методы для работы с DOM-элементами.

Реализуется на основе интерфейсов:

```
interface ICard {
	container: HTMLTemplateElement
	title: HTMLHeadingElement
	description?: HTMLParagraphElement
	image?: HTMLImageElement
	category: HTMLSpanElement
	price: HTMLSpanElement
	button?: HTMLButtonElement
	actions: IActions
	render(data: ProductItem): HTMLElement
}
```

```
interface IActions {
	onClick(evt:MouseEvent): void;
}
```

**Предоставляет поля и методы:**

Поля:

- `container: HTMLElement` - Шаблон карточки.
- `title: HTMLHeadingElement` - Заголовок карточки.
- `description?: HTMLParagraphElement` - Описание карточки (необязательное).
- `image?: HTMLImageElement` - URL изображения для карточки (необязательное).
- `category: HTMLSpanElement` - Категория карточки.
- `price: HTMLSpanElement` - Цена карточки.
- `button?: HTMLButtonElement` - Кнопка у карточки (необязательное).
- `actions: IActions` - Колбэк при клике.

Методы:

- `render(data: ProductItem): HTMLElement` - вовзращает готовую карточку.

### Класс Modal:

Modal представляет собой класс абстрактный модального окна, который предоставляет методы для его открытия и закрытия.

Реализуется на основе интерфейсов:

```
interface IModal {
	container: HTMLElement;
	closeButton: HTMLElement
	actions: IActions
	show(): void
	close(): void
}
```

```
interface IActions {
	onClick(evt:MouseEvent): void;
}
```

**Предоставляет поля и методы:**

Поля:

- `container: HTMLDivElement` - контейнер с модальным окном.
- `closeButton: HTMLElement` - кнопка для закрытия модального окна.
- `actions: IActions` - Колбэк при клике.

Методы:

- `show(): void` - служит для открытия модального окна.

- `close(): void` - служит для закрытия модального окна.

### Класс ContentModal

ContentModal отображает модальное окно, заполненное предоставленным шаблоном.

Наследуется от класса Modal:
ContentModal наследует функциональность от класса Modal, что позволяет использовать методы открытия и закрытия.

Реализуется на основе интерфейса:

```
interface IContentModal {
	content: HTMLElement;
	modalContent: HTMLElement;
	button: HTMLButtonElement;
	show: void;
	setContent(content: HTMLElement): void
	setButton(button: HTMLButtonElement, actions: IActions): void
	clearModalContent(): void
}
```

**Предоставляет поля и методы:**

Поля:

- `container: HTMLDivElement` - контент для вставки в модальное окно.
- `modalContent: HTMLElement` - модальное окно.
- `button: HTMLButtonElement` - кнопка.

Методы:

- `show(): void` - расширяет метод show() родителя.
- `setContent(content: HTMLElement): void` - устанавливает контент для вставки в модальное окно.
- `clearModalContent(): void` - очищает контент в модальном окне.
- `setButton(button: HTMLButtonElement, actions: IActions): void` - установка кнопки в поле button.

### Класс Basket

Basket представляет собой класс, который принимает шаблон (template) модального окна корзиной и предоставляет методы для работы с ней.

Наследуется от класса Component:
ContentModal наследует функциональность от класса Component, что позволяет ему использовать методы для работы с DOM-элементами.

Реализуется на основе интерфейса:

```
interface IBasket {
	basket: HTMLElement;
	basketPrice: HTMLElement;
	cardBasketTemplate: HTMLTemplateElement;
	cardsBasket: HTMLElement[];
	basketList: HTMLElement;
	basketModel: BasketModel;
	basketButton: HTMLElement;
	eventEmitter: EventEmitter;
	counterTotalCost(basketCard:HTMLElement): void;
	updateBasket(): void;
	setCards(): void;
	changeButtonActivity(): void;
}
```

**Предоставляет поля и методы:**

Поля:

- `basket: HTMLElement` - корзина.
- `basketPrice: HTMLElement` - общая стоимость корзины.
- `cardBasketTemplate: HTMLTemplateElement` - шаблон корзины.
- `cardsBasket: HTMLElement[]` - массив готовых карточек корзины.
- `basketList: HTMLElement` - список для карточек.
- `basketModel: BasketModel` - экземпляр класса BasketModel.
- `basketButton: HTMLElement` - кнопка "Оформить".
- `eventEmitter: EventEmitter` - экземпляр класса EventEmitter.

Методы:

- `counterTotalCost(cardPrice: number): void` - метод для расчета общей стоимости корзины.
- `setCards(): void` - устанавливает карточки в корзину.
- `updateBasket(): void` - обновляет содержимое корзины.
- `changeButtonActivity(): void` - меняет активность кнопки на основании содержимого.

### Класс ContactForm

ContactForm представляет собой класс, который принимает шаблон модального окна в качестве аргумента конструктора. Этот шаблон содержит формы для ввода контактной информации, такой как телефон и адрес электронной почты

Реализуется на основе интерфейса:

```
interface IContactForm {
	contactFormContent: HTMLElement;
	inputEmail: HTMLInputElement;
	inputPhone: HTMLInputElement;
	buttonPay: HTMLButtonElement;
	toggleButtonActivity(): void;
}
```

**Предоставляет поля и методы:**

Поля:

- `contactFormContent: HTMLElement` - контент из шаблона contactFormTemplate;
- `inputEmail: HTMLInputElement` - поле ввода почты.
- `inputPhone: HTMLInputElement` - поле ввода номера телефона.
- `buttonPay: HTMLButtonElement` - кнопка "Оплатить".

Методы:

- `toggleButtonActivity(): void` - переключает активность кнопки "Оплатить" в зависимости от условий.

### Класс DeliveryForm

DeliveryForm представляет собой класс, который принимает шаблон (template) модального окна с формой для указания адреса доставки, кнопки для выбора формы оплаты (карта или наличные) и предоставляет методы для работы с ними.

Реализуется на основе интерфейса:

```
interface IDeliveryForm {
	deliveryFormContent: HTMLElement;
	inputAddress: HTMLInputElement;
	buttonCard: HTMLButtonElement;
	buttonCash: HTMLButtonElement;
	buttonNext: HTMLButtonElement;
	toggleButtonActivity(): void;
}
```

**Предоставляет поля и методы:**

Поля:

- `deliveryFormContent: HTMLElement` - контент из шаблона deliveryFormTemplate.
- `inputAddress: HTMLInputElement` - поле ввода, содержащее адрес.
- `buttonCard: HTMLButtonElement` - кнопка "Оплата картой"
- `buttonCash: HTMLButtonElement` - кнопка "Оплата за наличные"
- `buttonNext: HTMLButtonElement` - кнопка "Далее"

Методы:

- `toggleButtonActivity(): void` - переключает активность кнопки "Далее" в зависимости от условий.

### Класс Success

Success представляет собой класс, который принимает шаблон (template) модального окна с отображающего информацию об успешном завершении покупки.

Реализуется на основе интерфейса:

```
interface ISuccess {
	successContent: HTMLElement;
	button: HTMLButtonElement;
	orderSuccessDescription: HTMLParagraphElement;
	setOrderDescription(sum:HTMLElement): void;
}
```

**Предоставляет поля и методы:**

Поля:

- `successContent: HTMLElement` - контент из шаблона SuccessTemplate;
- `button: HTMLButtonElement` - кнопка "За новыми покупками!"
- `orderSuccessDescription: HTMLParagraphElement` - общая стоимость корзины.

Методы:

- `setOrderDescription(sum:HTMLElement): void` - устанавливает суммарную стоимость товаров.

### Класс Page

Page представляет собой класс для отображения страницы с карточками и счётчика корзины.

Реализуется на основе интерфейса IPage:

```
interface IPage {
	counter: HTMLElement
	catalog: HTMLElement
	pageWrapper: HTMLElement
	basketButton: HTMLButtonElement;
	updateCounter(value: number): void
	setCatalog(items: HTMLElement[]): void
	lockPage(): void
	unlockPage(): void
}
```

**Предоставляет поля и методы:**

Поля:

- `counter: HTMLElement` - элемент HTML для отображения счётчика корзины.
- `catalog: HTMLElement` - массив со всеми карточками.
- `pageWrapper: HTMLElement` - оболочка контента страницы.
- `basketButton: HTMLButtonElement` - кнопка открытия корзины.

Методы:

- `updateCounter(value: number): void` - представляет метод для обновления счётчика корзины.
- `setCatalog(items: HTMLElement[]): void` - устанавливает содержимое поля catalog.
- `lockPage(): void` - блокировка прокрутки страницы.
- `unlockPage(): void` - разблокировка прокрутки страницы.

## Компоненты представления(Presenter)

*Архитектурный слой необходимый для связывания слоя Model и слоя View.*

Презентером выступает основной файл index.ts, который регулирует взаимодействие между отображением и данными путем подписки на события через брокер событий (экземпляр класса EventEmitter).

### Список событий:

- `'Card:open'` - Открытие карточки товара.
- `'Modal:close'` - Закрытие модального окна.
- `'Basket:addItem'` - Добавление товара в корзину.
- `'Basket:open'` - Открытие корзины.
- `'Card:delete'` - Удаление товара из корзины.
- `'DeliveryForm:open'` - Открытие формы доставки.
- `'Button-card:active'` - Активация кнопки оплаты картой.
- `'Button-cash:active'` - Активация кнопки оплаты наличными.
- `'Input:change'` - Изменение поля ввода доставки.
- `'ContactForm:open'` - Открытие формы контактов.
- `'Input:triggered'` - Изменение поля ввода почты или телефона.
- `'Success:open'` - Открытие сообщения об успешной покупке.
- `'Success:close'` - Закрытие сообщения об успешной покупке.
