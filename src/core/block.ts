import { nanoid } from 'nanoid';
import Handlebars from 'handlebars';
import EventBus from './event-bus';

interface BlockMeta<P = any> {
  props: P;
}

type Events = Values<typeof Block.EVENTS>;

export default class Block<P = any> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  } as const;

  public id = nanoid(6);

  private readonly _meta: BlockMeta;

  protected _element?: Nullable<HTMLElement>;

  protected readonly props: P;

  protected children: { [id: string]: Block } = {};

  eventBus: () => EventBus<Events>;

  protected state: any = {};

  protected refs: { [key: string]: Block } = {};

  public static componentName?: string;

  public constructor(properties?: P) {
    const eventBus = new EventBus<Events>();

    this._meta = {
      props: properties,
    };

    this.getStateFromProps(properties);

    this.props = this._makePropsProxy(properties || ({} as P));
    this.state = this._makePropsProxy(this.state);

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);

    eventBus.emit(Block.EVENTS.INIT, this.props);
  }

  _registerEvents(eventBus: EventBus<Events>) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _createResources() {
    this._element = this._createDocumentElement('div');
  }

  protected getStateFromProps(properties: any): void {
    this.state = {};
  }

  init() {
    this._createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER, this.props);
  }

  _componentDidMount(properties: P) {
    this.componentDidMount(properties);
  }

  componentDidMount(properties: P) {}

  _componentDidUpdate(oldProperties: P, newProperties: P) {
    const response = this.componentDidUpdate(oldProperties, newProperties);
    if (!response) {
      return;
    }
    this._render();
  }

  componentDidUpdate(oldProperties: P, newProperties: P) {
    return true;
  }

  setProps = (nextProperties: P) => {
    if (!nextProperties) {
      return;
    }

    Object.assign(this.props, nextProperties);
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
    // ??????, ?????????? ?????????????? CDM ???????????? ?????????? ???????????????????? ?? DOM
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
    // ?????????? ?? ?????? ???????????????? this
    // ?????????? ???????????? ???????????? ???? ?????????????????????? ?? ???????????????? ES6+
    const self = this;

    return new Proxy(properties as unknown as object, {
      get(target: Record<string, unknown>, property: string) {
        const value = target[property];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target: Record<string, unknown>, property: string, value: unknown) {
        target[property] = value;

        // ?????????????????? ???????????????????? ????????????????????
        // ???????????? cloneDeep, ?? ???????? ???????????????? ?????????? ???????????????????? ?????????????????? cloneDeep ???? ??????????
        self.eventBus().emit(Block.EVENTS.FLOW_CDU, { ...target }, target);
        return true;
      },
      deleteProperty() {
        throw new Error('?????? ??????????????');
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
     * ???????????????? ????????????
     */
    const template = Handlebars.compile(this.render());
    fragment.innerHTML = template({
      ...this.state,
      ...this.props,
      children: this.children,
      refs: this.refs,
    });

    /**
     * ???????????????? ???????????????? ???? ????????????????????
     */
    for (const [id, component] of Object.entries(this.children)) {
      /**
       * ???????? ???????????????? ???? id
       */
      const stub = fragment.content.querySelector(`[data-id="${id}"]`);

      if (!stub) {
        continue;
      }

      const stubChilds = stub.childNodes.length > 0 ? stub.childNodes : [];

      /**
       * ???????????????? ???????????????? ???? component._element
       */
      const content = component.getContent();
      stub.replaceWith(content);

      /**
       * ???????? ?????????????? layout-??, ???????? ?????????????????? ??????????
       */
      const layoutContent = content.querySelector('[data-layout="1"]');

      if (layoutContent && stubChilds.length > 0) {
        layoutContent.append(...stubChilds);
      }
    }

    /**
     * ???????????????????? ????????????????
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
