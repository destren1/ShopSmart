# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/styles/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

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

Класс EventEmitter реализует паттерн "Наблюдатель" и обеспечивает механизм подписки на события, отписки от событий и уведомления подписчиков о наступлении событий. 
Он предоставляет следующие методы:

- on<T extends object>(eventName: EventName, callback: (event: T) => void): Подписывает указанную функцию callback на событие с именем eventName.

- off(eventName: EventName, callback: Subscriber): Отписывает указанную функцию callback от события с именем eventName.

- emit<T extends object>(eventName: string, data?: T): Уведомляет всех подписчиков о наступлении события с именем eventName, передавая им данные eventData, если они предоставлены.

- onAll(callback: (event: EmitterEvent) => void): Подписывает указанную функцию callback на все события.

- offAll(): Отписывает все функции от всех событий.

- trigger<T extends object>(eventName: string, context?: Partial<T>): Генерирует событие с именем eventName и передает ему данные eventData.

### Класс Component

Класс Component предоставляет удобный инструментарий для работы с DOM-элементами. Он включает в себя следующие методы:

toggleClass(element: HTMLElement, className: string): Переключает класс className у указанного DOM-элемента element.

setText(element: HTMLElement, text: string): Устанавливает текстовое содержимое text для указанного DOM-элемента element.

setDisabled(element: HTMLElement, disabled: boolean): Устанавливает состояние блокировки (disabled) для указанного DOM-элемента element.

setHidden(element: HTMLElement): Скрывает указанный DOM-элемент element.

setVisible(element: HTMLElement): Показывает указанный DOM-элемент element.

setImage(element: HTMLImageElement, src: string, alt: string): Устанавливает изображение с источником src и альтернативным текстом alt для указанного элемента <img>.

render(container: HTMLElement): HTMLElement: Рендерит элемент в указанный контейнер container и возвращает сам элемент.

### Класс Model

Класс Model является абстрактным и предоставляет базовый функционал для всех моделей данных. Он содержит следующий метод:

emitChanges(): Сообщает всем заинтересованным сторонам о том, что модель была изменена.

## Класс Api
Реализован на основе типов:

type ApiListResponse<Type> = {
    total: number,
    items: Type[]
};

type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

Класс Api отвечает за взаимодействие с сервером посредством отправки HTTP-запросов. Он предоставляет следующие методы:

protected handleResponse(response: Response): Promise<object>: Отвечает за обработку ответа от сервера после выполнения HTTP-запроса. Он принимает объект Response, представляющий ответ сервера, и возвращает Promise, разрешающийся объектом, представляющим обработанные данные ответа.

get(url: string): Promise<any>: Выполняет GET запрос по указанному url и возвращает Promise с результатом запроса.

post(uri: string, data: object, method: ApiPostMethods = 'POST'): Выполняет POST запрос по указанному url с переданными данными data и возвращает Promise с результатом запроса.