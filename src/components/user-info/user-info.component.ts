import { Block, Router, Store } from 'core';

import './user-info.component.css';
import { routerHoc, storeHoc, userHoc } from 'hocs';
import { AppState } from 'store';
import { UserModel } from 'models';
import { ScreensPath } from 'router';
import { AuthService } from 'services';

export interface UserInfoComponentProps {
  router: Router;
  store: Store<AppState>;
  user: UserModel;
  goToEditUser: (event: MouseEvent) => void;
  goToChangePass: (event: MouseEvent) => void;
  logout: (event: MouseEvent) => void;
}

export class UserInfoComponent extends Block<UserInfoComponentProps> {
  static override componentName = 'UserInfoComponent';

  constructor(props: UserInfoComponentProps) {
    super(props);

    this.setProps({
      goToEditUser: this.goToEditUser.bind(this),
      goToChangePass: this.goToChangePass.bind(this),
      logout: this.logout.bind(this),
    });
  }

  goToEditUser(event: MouseEvent): void {
    event?.preventDefault();
    this.props.router.go(ScreensPath.Settings);
  }

  goToChangePass(event: MouseEvent): void {
    event?.preventDefault();
    this.props.router.go(ScreensPath.SettingsPass);
  }

  logout(event: MouseEvent): void {
    event?.preventDefault();
    this.props.store.dispatch(AuthService.logout);
  }

  protected override render(): string {
    // language=hbs
    return `
        <div class='user-info'>
            {{#if user}}

                {{{UserInfoHeadComponent isShowName=true
                                         avatar=user.avatar
                                         firstName=user.firstName}}}

                <div class='user-info__list user-page__list'>
                    <ul>
                        <li class='user-page__item-list'>
                            <span>Почта</span>
                            <span>{{user.email}}</span>
                        </li>
                        <li class='user-page__item-list'>
                            <span>Логин</span>
                            <span>{{user.login}}</span>
                        </li>
                        <li class='user-page__item-list'>
                            <span>Имя</span>
                            <span>{{user.firstName}}</span>
                        </li>
                        <li class='user-page__item-list'>
                            <span>Фамилия</span>
                            <span>{{user.secondName}}</span>
                        </li>
                        <li class='user-page__item-list'>
                            <span>Имя в чате</span>
                            <span>{{user.displayName}}</span>
                        </li>
                        <li class='user-page__item-list'>
                            <span>Телефон</span>
                            <span>{{user.phone}}</span>
                        </li>
                    </ul>

                    <ul>
                        <li class='user-page__item-list'>
                            {{{ButtonComponent title='Изменить данные'
                                               className='button_link user-page__item-list'
                                               onClick=goToEditUser}}}
                        </li>
                        <li class='user-page__item-list'>
                            {{{ButtonComponent title='Изменить пароль'
                                               className='button_link user-page__item-list'
                                               onClick=goToChangePass}}}
                        </li>
                        <li class='user-page__item-list'>
                            {{{ButtonComponent title='Выйти'
                                               className='button_link user-page__exit-link'
                                               onClick=logout}}}
                        </li>
                    </ul>
                </div>

            {{/if}}
        </div>
    `;
  }
}

export default userHoc(routerHoc(storeHoc(UserInfoComponent)));
