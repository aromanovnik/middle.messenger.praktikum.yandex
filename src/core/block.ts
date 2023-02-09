// Jest encountered an unexpected token
import { nanoid } from 'nanoid';
// @ts-ignore
import Handlebars from 'handlebars';
import EventBus from './event-bus';
// import { guid } from '../helpers';

export interface BlockClass<P> extends Function {
  new (props: P): Block<P>;

  componentName?: string;
}

type Events = Values<typeof Block.EVENTS>;

export default class Block<P = any> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_PWU: 'flow:properties-will-update',
    FLOW_RENDER: 'flow:render',
    FLOW_CWU: 'flow:component-will-unmount',
  } as const;

  public id = nanoid(6);
  // public id = guid();

  protected _element?: Nullable<HTMLElement>;

  protected props: Readonly<P>;

  protected children: { [id: string]: Block } = {};

  eventBus: () => EventBus<Events>;

  /**
   * @deprecated Use this.props
   */
  protected state: any = {};

  protected refs: { [key: string]: Block } = {};

  public static componentName?: string;

  public constructor(properties?: P) {
    const eventBus = new EventBus<Events>();

    this.getStateFromProps(properties);

    // this.props = this._makePropsProxy(properties || ({} as P));
    this.props = properties || ({} as P);
    this.state = this._makePropsProxy(this.state);

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);

    eventBus.emit(Block.EVENTS.INIT, this.props);
  }

  /**
   * Хелпер, который проверяет, находится ли элемент в DOM дереве
   * И есть нет, триггерит событие COMPONENT_WILL_UNMOUNT
   */
  _checkInDom() {
    if (!this._element) {
      this.eventBus().emit(Block.EVENTS.FLOW_CWU, this.props);
      return;
    }

    const elementInDOM = document.body.contains(this._element);

    if (elementInDOM) {
      setTimeout(() => this._checkInDom(), 1000);
      return;
    }

    this.eventBus().emit(Block.EVENTS.FLOW_CWU, this.props);
  }

  _registerEvents(eventBus: EventBus<Events>) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_PWU, this._propertiesWillUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CWU, this._componentWillUnmount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _createResources() {
    this._element = this._createDocumentElement('div');
  }

  // @ts-ignore
  /**
   * @deprecated
   */
  protected getStateFromProps(properties: any): void {
    this.state = {};
  }

  init() {
    this._createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER, this.props);
  }

  _componentDidMount(properties: P) {
    this._checkInDom();
    this.componentDidMount(properties);
  }

  // @ts-ignore
  componentDidMount(properties: P) {}

  _componentWillUnmount() {
    this.eventBus().destroy();
    this.componentWillUnmount();
  }

  componentWillUnmount() {}

  _componentDidUpdate(oldProperties: P, newProperties: P) {
    const response = this.componentDidUpdate(oldProperties, newProperties);
    if (!response) {
      return;
    }
    this._render();
  }

  // @ts-ignore
  componentDidUpdate(oldProperties: P, newProperties: P) {
    // return JSON.stringify(oldProperties) !== JSON.stringify(newProperties);
    // return !isEqual(oldProperties, newProperties);
    return true;
  }

  _propertiesWillUpdate(oldProperties: P, newProperties: P) {
    this.propertiesWillUpdate(oldProperties, newProperties);
  }

  propertiesWillUpdate(oldProperties: P, newProperties: P) {}

  setProps = (nextPartialProps: Partial<P>): void => {
    if (!nextPartialProps) {
      return;
    }

    const prevProps = this.props;
    const nextProps = { ...prevProps, ...nextPartialProps };

    this.props = nextProps;
    this.eventBus().emit(Block.EVENTS.FLOW_PWU, prevProps, nextProps);

    this.eventBus().emit(Block.EVENTS.FLOW_CDU, prevProps, nextProps);
  };

  setState = (nextState: any) => {
    if (!nextState) {
      return;
    }

    Object.assign(this.state, nextState);
  };

  get element() {
    return this._element;
  }

  _render() {
    const fragment = this._compile();

    this._removeEvents();
    const newElement = fragment.firstElementChild!;

    this._element!.replaceWith(newElement);

    this._element = newElement as HTMLElement;
    this._addEvents();
  }

  protected render(): string {
    return '';
  }

  getContent(): HTMLElement {
    // Хак, чтобы вызвать CDM только после добавления в DOM
    if (this.element?.parentNode?.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
      setTimeout(() => {
        if (this.element?.parentNode?.nodeType !== Node.DOCUMENT_FRAGMENT_NODE) {
          this.eventBus().emit(Block.EVENTS.FLOW_CDM);
        }
      }, 100);
    }

    return this.element!;
  }

  _makePropsProxy(properties: any): any {
    // Можно и так передать this
    // Такой способ больше не применяется с приходом ES6+
    const self = this;

    return new Proxy(properties as unknown as object, {
      get(target: Record<string, unknown>, property: string) {
        const value = target[property];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target: Record<string, unknown>, property: string, value: unknown) {
        target[property] = value;

        // Запускаем обновление компоненты
        // Плохой cloneDeep, в след итерации нужно заставлять добавлять cloneDeep им самим
        self.eventBus().emit(Block.EVENTS.FLOW_CDU, { ...target }, target);
        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      },
    }) as unknown as P;
  }

  _createDocumentElement(tagName: string) {
    return document.createElement(tagName);
  }

  _removeEvents() {
    const { events } = this.props as any;

    if (!events || !this._element) {
      return;
    }

    for (const [event, listener] of Object.entries(events)) {
      this._element!.removeEventListener(event, listener);
    }
  }

  _addEvents() {
    const { events } = this.props as any;

    if (!events) {
      return;
    }

    for (const [event, listener] of Object.entries(events)) {
      this._element!.addEventListener(event, listener);
    }
  }

  _compile(): DocumentFragment {
    const fragment = document.createElement('template');

    /**
     * Рендерим шаблон
     */
    const template = Handlebars.compile(this.render());
    fragment.innerHTML = template({
      ...this.state,
      ...this.props,
      children: this.children,
      refs: this.refs,
    });

    /**
     * Заменяем заглушки на компоненты
     */
    for (const [id, component] of Object.entries(this.children)) {
      /**
       * Ищем заглушку по id
       */
      const stub = fragment.content.querySelector(`[data-id="${id}"]`);

      if (!stub) {
        continue;
      }

      const stubChilds = stub.childNodes.length > 0 ? stub.childNodes : [];

      /**
       * Заменяем заглушку на component._element
       */
      const content = component.getContent();
      stub.replaceWith(content);

      /**
       * Ищем элемент layout-а, куда вставлять детей
       */
      // const layoutContent = content.querySelector('[data-layout="1"]');
      // if (layoutContent && stubChilds.length > 0) {
      //   layoutContent.append(...stubChilds);
      // }
      const slotContent = content.querySelector('[data-slot="1"]') as HTMLDivElement;
      if (slotContent && stubChilds.length) {
        slotContent.append(...stubChilds);
        delete slotContent.dataset['slot'];
      }
    }

    /**
     * Возвращаем фрагмент
     */
    return fragment.content;
  }

  show() {
    this.getContent().style.display = 'block';
  }

  hide() {
    this.getContent().style.display = 'none';
  }
}
