import EventBus from './event-bus';

export enum BaseActionsStore {
  CHANGED = 'changed',
}

export type Dispatch<State> = (
  nextStateOrAction: Partial<State> | Action<State>,
  payload?: any,
) => void;

export type Action<State> = (dispatch: Dispatch<State>, state: State, payload: any) => void;

export class Store<State extends Record<string, any>> extends EventBus {
  private state: State = {} as State;

  constructor(defaultState: State) {
    super();
    this.set(defaultState);
  }

  public getState() {
    return this.state;
  }

  public set(nextState: Partial<State>) {
    const prevState = { ...this.state };

    this.state = { ...this.state, ...nextState };

    this.emit(BaseActionsStore.CHANGED, prevState, nextState);
  }

  dispatch(nextStateOrAction: Partial<State> | Action<State>, payload?: any) {
    if (typeof nextStateOrAction === 'function') {
      nextStateOrAction(this.dispatch.bind(this), this.state, payload);
    } else {
      const nextState = { ...this.state, ...nextStateOrAction };

      // Думать
      // if (isEqual(this.state, nextState)) {
      //   return;
      // }

      this.set(nextState);
    }
  }
}
