import { Block } from 'core';

import './user-info-head.component.css';
import { storeHoc, StoreHocProps } from 'hocs';
import { UserService } from 'services';

export type UserInfoHeadComponentProps = StoreHocProps & {
  avatar?: string;
  firstName?: string;
  isShowName?: boolean;
  onChangeAvatar: (event: InputEvent) => void;
};

export class UserInfoHeadComponent extends Block<UserInfoHeadComponentProps> {
  static override componentName = 'UserInfoHeadComponent';

  constructor(props: UserInfoHeadComponentProps) {
    super(props);

    this.setProps({
      onChangeAvatar: (event: InputEvent) => this.onChangeAvatar(event),
    });
  }

  onChangeAvatar(event: InputEvent): void {
    const target = event.target as HTMLInputElement;
    if (!target || !target.files?.length) {
      return;
    }

    const form = this.element?.querySelector('#avatarForm') as HTMLFormElement;
    if (!form) {
      return;
    }

    // const formData = new FormData(form);
    const formData = new FormData();
    formData.append(target.name, target.files[0]);
    this.props.store.dispatch(UserService.changeAvatar, formData);
  }

  protected override render(): string {
    // language=hbs
    return `
        <div class='user-info-head'>
            <div class='user-info-head__avatar'>
                {{#if isShowName}}
                    <div class='user-info-head__change-avatar'>
                        <form id='avatarForm'>
                            <span>Поменять аватар</span>
                            {{{InputFieldComponent ref='inputAvatar'
                                                   type='file'
                                                   name='avatar'
                                                   onChange=onChangeAvatar
                            }}}
                        </form>
                    </div>
                    {{{InputErrorComponent error=avatarFormError}}}
                {{/if}}
                {{#if avatar}}
                    <img src='{{avatar}}' alt='Avatar' />
                {{/if}}
            </div>

            {{#if isShowName}}
                <h2 class='user-info-head__user-name'>{{firstName}}</h2>
            {{/if}}
        </div>
    `;
  }
}

export default storeHoc(UserInfoHeadComponent, (store) => ({
  avatarFormError: store.avatarFormError,
}));
