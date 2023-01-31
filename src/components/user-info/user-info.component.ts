import { Block } from 'core';

import './user-info.component.css';
import { routerHoc, RouterHocProps, storeHoc, StoreHocProps, userHoc, UserHocProps } from 'hocs';
import { AuthService } from 'services';

export type UserInfoComponentProps = RouterHocProps &
  UserHocProps &
  StoreHocProps & {
    logout: (event: MouseEvent) => void;
  };

export class UserInfoComponent extends Block<UserInfoComponentProps> {
  static override componentName = 'UserInfoComponent';

  constructor(props: UserInfoComponentProps) {
    super(props);

    this.setProps({
      logout: this.logout.bind(this),
    });
  }

  logout(): void {
    this.props.store.dispatch(AuthService.logout);
  }

  protected override render(): string {
    // language=hbs
    return `
        <div class='user-info'>
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
                        {{{LinkComponent title='Изменить данные'
                                         to=links.Settings}}}
                    </li>
                    <li class='user-page__item-list'>
                        {{{LinkComponent title='Изменить пароль'
                                         to=links.SettingsPass}}}
                    </li>
                    <li class='user-page__item-list'>
                        {{{LinkComponent title='Выйти'
                                         onClick=logout}}}
                    </li>
                </ul>
            </div>
        </div>
    `;
  }
}

export default userHoc(
  routerHoc(
    storeHoc(UserInfoComponent, (state) => ({
      user: state.user,
    })),
  ),
);
