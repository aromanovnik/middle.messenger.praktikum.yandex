import { Block, Router, Store } from 'core';
import './chat-list.component.css';
import { routerHoc, storeHoc } from 'hocs';
import { AppState } from 'store';
import { ChatModel } from 'models';
import { ScreensPath } from 'router';

export interface ChatListComponentProps {
  router: Router;
  store: Store<AppState>;
  chats: ChatModel[];
  links: Record<string, ScreensPath>;
}

export class ChatListComponent extends Block<ChatListComponentProps> {
  static override componentName = 'ChatListComponent';

  constructor(props: ChatListComponentProps) {
    super(props);
  }

  protected override render(): string {
    // language=hbs
    return `
        <div class="chat-list">

            <div class='chat-list__header'>
                <div class='chat-list__profile-link'>
                    {{{LinkComponent title='Профиль'
                                     to=links.profile}}}
                </div>

                <div class='chat-list__search'>
                    <form action='#'>
                        <input name='chat_search' type='text' placeholder='Поиск'>
                    </form>
                </div>
            </div>

            <nav class='chat-list__list'>
                {{#each chats}}
                    {{{ChatItemComponent chat=this}}}
                {{/each}}
            </nav>
        </div>
    `;
  }
}

export default routerHoc(storeHoc(ChatListComponent));
