/**
 *
 * @export
 * @interface BadRequestError
 */
export interface BadRequestError {
  /**
   * Error message
   * @type {string}
   * @memberof BadRequestError
   */
  reason: string;
}

/**
 *
 * @export
 * @interface ChangePasswordRequest
 */
export interface ChangePasswordRequest {
  /**
   * Old password
   * @type {string}
   * @memberof ChangePasswordRequest
   */
  oldPassword: string;
  /**
   * New password
   * @type {string}
   * @memberof ChangePasswordRequest
   */
  newPassword: string;
}

/**
 *
 * @export
 * @interface ChartSchema
 */
export type ChartSchema = Array<ChartSchemaInner>;

/**
 *
 * @export
 * @interface ChartSchemaInner
 */
export interface ChartSchemaInner {
  /**
   * X axis (datetime)
   * @type {Date}
   * @memberof ChartSchemaInner
   */
  x?: Date;
  /**
   *
   * @type {number}
   * @memberof ChartSchemaInner
   */
  y1?: number;
  /**
   *
   * @type {number}
   * @memberof ChartSchemaInner
   */
  y2?: number;
}

/**
 *
 * @export
 * @interface ChatArchiveRequest
 */
export interface ChatArchiveRequest {
  /**
   * Chat id
   * @type {number}
   * @memberof ChatArchiveRequest
   */
  chatId: number;
}

/**
 *
 * @export
 * @interface ChatArchiveResponse
 */
export interface ChatArchiveResponse {
  /**
   * User id
   * @type {number}
   * @memberof ChatArchiveResponse
   */
  userId: number;
  /**
   *
   * @type {ChatsResponse}
   * @memberof ChatArchiveResponse
   */
  result: ChatsResponse;
}

/**
 *
 * @export
 * @interface ChatDeleteRequest
 */
export interface ChatDeleteRequest {
  /**
   * Chat id
   * @type {number}
   * @memberof ChatDeleteRequest
   */
  chatId: number;
}

/**
 *
 * @export
 * @interface ChatDeleteResponse
 */
export interface ChatDeleteResponse {
  /**
   * User id
   * @type {number}
   * @memberof ChatDeleteResponse
   */
  userId: number;
  /**
   *
   * @type {ChatsResponse}
   * @memberof ChatDeleteResponse
   */
  result: ChatsResponse;
}

/**
 *
 * @export
 * @interface ChatMessage
 */
export interface ChatMessage {
  /**
   * Message id
   * @type {number}
   * @memberof ChatMessage
   */
  id: number;
  /**
   * User id
   * @type {number}
   * @memberof ChatMessage
   */
  userId: number;
  /**
   * Chat id
   * @type {number}
   * @memberof ChatMessage
   */
  chatId: number;
  /**
   * Message sent time
   * @type {Date}
   * @memberof ChatMessage
   */
  time: Date;
  /**
   * Message type
   * @type {string}
   * @memberof ChatMessage
   */
  type: ChatMessage.TypeEnum;
  /**
   * Message content (message text for messages and resourceId for files)
   * @type {string}
   * @memberof ChatMessage
   */
  content: string;
  /**
   * File
   * @type {Resource}
   * @memberof ChatMessage
   */
  file?: Resource;
}

/**
 * @export
 * @namespace ChatMessage
 */
// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace ChatMessage {
  /**
   * @export
   * @enum {string}
   */
  export enum TypeEnum {
    Message = <any>'message',
    File = <any>'file',
  }
}

/**
 *
 * @export
 * @interface ChatUserResponse
 */
export interface ChatUserResponse {
  /**
   * User id
   * @type {number}
   * @memberof ChatUserResponse
   */
  id: number;
  /**
   * First name
   * @type {string}
   * @memberof ChatUserResponse
   */
  first_name: string;
  /**
   * Second name
   * @type {string}
   * @memberof ChatUserResponse
   */
  second_name: string;
  /**
   * Display name
   * @type {string}
   * @memberof ChatUserResponse
   */
  display_name: string;
  /**
   * User login - unique
   * @type {string}
   * @memberof ChatUserResponse
   */
  login: string;
  /**
   * Email
   * @type {string}
   * @memberof ChatUserResponse
   */
  email: string;
  /**
   * Phone
   * @type {string}
   * @memberof ChatUserResponse
   */
  phone: string;
  /**
   * Avatar
   * @type {string}
   * @memberof ChatUserResponse
   */
  avatar: string;
  /**
   * User role
   * @type {string}
   * @memberof ChatUserResponse
   */
  role: ChatUserResponse.RoleEnum;
}

/**
 * @export
 * @namespace ChatUserResponse
 */
// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace ChatUserResponse {
  /**
   * @export
   * @enum {string}
   */
  export enum RoleEnum {
    Admin = <any>'admin',
    Regular = <any>'regular',
  }
}

/**
 *
 * @export
 * @interface ChatsMessagesTokenResponse
 */
export interface ChatsMessagesTokenResponse {
  /**
   * Token for web socket server
   * @type {string}
   * @memberof ChatsMessagesTokenResponse
   */
  token: string;
}

/**
 *
 * @export
 * @interface ChatsResponse
 */
export interface ChatsResponse {
  /**
   * Chat id
   * @type {number}
   * @memberof ChatsResponse
   */
  id: number;
  /**
   * Chat title
   * @type {string}
   * @memberof ChatsResponse
   */
  title: string;
  /**
   * Chat avatar
   * @type {string}
   * @memberof ChatsResponse
   */
  avatar: string;
  /**
   * Number of unread messages in chat for current user
   * @type {number}
   * @memberof ChatsResponse
   */
  unreadCount: number;
  /**
   *
   * @type {ChatsResponseLastMessage}
   * @memberof ChatsResponse
   */
  lastMessage: ChatsResponseLastMessage;
}

/**
 *
 * @export
 * @interface ChatsResponseLastMessage
 */
export interface ChatsResponseLastMessage {
  /**
   * Message user (sender)
   * @type {UserResponse}
   * @memberof ChatsResponseLastMessage
   */
  user?: UserResponse;
  /**
   * Message timestamp
   * @type {string}
   * @memberof ChatsResponseLastMessage
   */
  time?: string;
  /**
   * Message content
   * @type {string}
   * @memberof ChatsResponseLastMessage
   */
  content?: string;
}

/**
 *
 * @export
 * @interface CreateChatRequest
 */
export interface CreateChatRequest {
  /**
   * Chat title
   * @type {string}
   * @memberof CreateChatRequest
   */
  title: string;
}

/**
 *
 * @export
 * @interface FindUserRequest
 */
export interface FindUserRequest {
  /**
   * User login (beginning of login)
   * @type {string}
   * @memberof FindUserRequest
   */
  login: string;
}

/**
 *
 * @export
 * @interface LeaderboardNewLeaderRequest
 */
export interface LeaderboardNewLeaderRequest {
  /**
   * Leaderboard data object, any type
   * @type {any}
   * @memberof LeaderboardNewLeaderRequest
   */
  data: any;
  /**
   * Which field is used to sort (if new value of the field more than old, data is stored)
   * @type {string}
   * @memberof LeaderboardNewLeaderRequest
   */
  ratingFieldName: string;
  /**
   * Your team name. Used to make unique leaderboard for each project.
   * @type {string}
   * @memberof LeaderboardNewLeaderRequest
   */
  teamName?: string;
}

/**
 *
 * @export
 * @interface LeaderboardRequest
 */
export interface LeaderboardRequest {
  /**
   * Which field is used to sort
   * @type {string}
   * @memberof LeaderboardRequest
   */
  ratingFieldName: string;
  /**
   * Used to paginate between pages. If limit is 10, then for the 1st page - cursor=0, for the 2nd page - cursor=10.
   * @type {number}
   * @memberof LeaderboardRequest
   */
  cursor: number;
  /**
   * Maximum amount of leaders to return
   * @type {number}
   * @memberof LeaderboardRequest
   */
  limit: number;
}

/**
 *
 * @export
 * @interface LiveChartRequest
 */
export interface LiveChartRequest {
  /**
   * Works as a cursor (initial value should be zero, all the next values are taken from the backend response)
   * @type {number}
   * @memberof LiveChartRequest
   */
  next: number;
}

/**
 *
 * @export
 * @interface LiveChartResponse
 */
export interface LiveChartResponse {
  /**
   * Used as a cursor (pass this value to the next request)
   * @type {number}
   * @memberof LiveChartResponse
   */
  next?: number;
  /**
   * Chart points
   * @type {ChartSchema}
   * @memberof LiveChartResponse
   */
  data?: ChartSchema;
}

/**
 *
 * @export
 * @interface LiveVideoInfoRequest
 */
export interface LiveVideoInfoRequest {
  /**
   * Works as a cursor (iterate + 1 each request)
   * @type {number}
   * @memberof LiveVideoInfoRequest
   */
  iteration: number;
}

/**
 *
 * @export
 * @interface OauthSignInRequest
 */
export interface OauthSignInRequest {
  /**
   * User code from Yandex
   * @type {string}
   * @memberof OauthSignInRequest
   */
  code: string;
  /**
   * Redirect uri that you are using for oauth
   * @type {string}
   * @memberof OauthSignInRequest
   */
  redirectUri: string;
}

/**
 *
 * @export
 * @interface Resource
 */
export interface Resource {
  /**
   * Message id
   * @type {number}
   * @memberof Resource
   */
  id: number;
  /**
   * User id
   * @type {number}
   * @memberof Resource
   */
  userId: number;
  /**
   * Server relative file path
   * @type {string}
   * @memberof Resource
   */
  path: string;
  /**
   * Initial file name
   * @type {string}
   * @memberof Resource
   */
  filename: string;
  /**
   * File content type (e.g \"image/jpeg\" for .jpg images)
   * @type {string}
   * @memberof Resource
   */
  contentType: string;
  /**
   * File size in bytes
   * @type {number}
   * @memberof Resource
   */
  contentSize: number;
  /**
   * Resource uploading time
   * @type {Date}
   * @memberof Resource
   */
  uploadDate: Date;
}

/**
 *
 * @export
 * @interface ServiceId
 */
export interface ServiceId {
  /**
   * Service id
   * @type {string}
   * @memberof ServiceId
   */
  serviceId: string;
}

/**
 *
 * @export
 * @interface SignInRequest
 */
export interface SignInRequest {
  /**
   * User login
   * @type {string}
   * @memberof SignInRequest
   */
  login: string;
  /**
   * Password
   * @type {string}
   * @memberof SignInRequest
   */
  password: string;
}

/**
 *
 * @export
 * @interface SignUpRequest
 */
export interface SignUpRequest {
  /**
   * First name
   * @type {string}
   * @memberof SignUpRequest
   */
  first_name: string;
  /**
   * Second name
   * @type {string}
   * @memberof SignUpRequest
   */
  second_name: string;
  /**
   * User login - unique
   * @type {string}
   * @memberof SignUpRequest
   */
  login: string;
  /**
   * Email /^\\S+@\\S+$/
   * @type {string}
   * @memberof SignUpRequest
   */
  email: string;
  /**
   * Password
   * @type {string}
   * @memberof SignUpRequest
   */
  password: string;
  /**
   * Phone /^((8|\\+7)[\\- ]?)?(\\(?\\d{3}\\)?[\\- ]?)?[\\d\\- ]{7,10}$/
   * @type {string}
   * @memberof SignUpRequest
   */
  phone: string;
}

/**
 *
 * @export
 * @interface SignUpResponse
 */
export interface SignUpResponse {
  /**
   * Created User ID
   * @type {number}
   * @memberof SignUpResponse
   */
  id: number;
}

/**
 *
 * @export
 * @interface StaticChartRequest
 */
export interface StaticChartRequest {
  /**
   * Number of points in chart (10 / 100 / 1000)
   * @type {string}
   * @memberof StaticChartRequest
   */
  chartSize: StaticChartRequest.ChartSizeEnum;
}

/**
 * @export
 * @namespace StaticChartRequest
 */
// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace StaticChartRequest {
  /**
   * @export
   * @enum {string}
   */
  export enum ChartSizeEnum {
    Small = <any>'small',
    Medium = <any>'medium',
    Large = <any>'large',
  }
}

/**
 *
 * @export
 * @interface StaticChartResponse
 */
export interface StaticChartResponse {
  /**
   * Chart points
   * @type {ChartSchema}
   * @memberof StaticChartResponse
   */
  data?: ChartSchema;
}

/**
 *
 * @export
 * @interface Sticker
 */
export interface Sticker {
  /**
   * Sticker id (send to chat with WS)
   * @type {number}
   * @memberof Sticker
   */
  id?: number;
  /**
   * Url for sticker resource(image)
   * @type {string}
   * @memberof Sticker
   */
  path?: string;
}

/**
 *
 * @export
 * @interface StickerPack
 */
export interface StickerPack {
  /**
   * Sticker pack title
   * @type {string}
   * @memberof StickerPack
   */
  title?: string;
  /**
   * User id that created this pack
   * @type {number}
   * @memberof StickerPack
   */
  userId?: number;
  /**
   *
   * @type {Array<string>}
   * @memberof StickerPack
   */
  stickers?: Array<string>;
}

/**
 *
 * @export
 * @interface StickerPacksResponse
 */
export interface StickerPacksResponse {
  /**
   * StickerPacks
   * @type {Array<StickerPack>}
   * @memberof StickerPacksResponse
   */
  data?: Array<StickerPack>;
}

/**
 *
 * @export
 * @interface StickersResponse
 */
export interface StickersResponse {
  /**
   * Stickers
   * @type {Array<Sticker>}
   * @memberof StickersResponse
   */
  data?: Array<Sticker>;
}

/**
 *
 * @export
 * @interface UnreadCountResponse
 */
export interface UnreadCountResponse {
  /**
   * New messages count
   * @type {number}
   * @memberof UnreadCountResponse
   */
  unreadCount: number;
}

/**
 *
 * @export
 * @interface UserRequest
 */
export interface UserRequest {
  /**
   * First name
   * @type {string}
   * @memberof UserRequest
   */
  first_name: string;
  /**
   * Second name
   * @type {string}
   * @memberof UserRequest
   */
  second_name: string;
  /**
   * Display Name
   * @type {string}
   * @memberof UserRequest
   */
  display_name: string;
  /**
   * User login - unique
   * @type {string}
   * @memberof UserRequest
   */
  login: string;
  /**
   * Email
   * @type {string}
   * @memberof UserRequest
   */
  email: string;
  /**
   * Phone
   * @type {string}
   * @memberof UserRequest
   */
  phone: string;
}

/**
 *
 * @export
 * @interface UserResponse
 */
export interface UserResponse {
  /**
   * User id
   * @type {number}
   * @memberof UserResponse
   */
  id: number;
  /**
   * First name
   * @type {string}
   * @memberof UserResponse
   */
  first_name: string;
  /**
   * Second name
   * @type {string}
   * @memberof UserResponse
   */
  second_name: string;
  /**
   * Display name
   * @type {string}
   * @memberof UserResponse
   */
  display_name: string;
  /**
   * User login - unique
   * @type {string}
   * @memberof UserResponse
   */
  login: string;
  /**
   * Email
   * @type {string}
   * @memberof UserResponse
   */
  email: string;
  /**
   * Phone
   * @type {string}
   * @memberof UserResponse
   */
  phone: string;
  /**
   * Avatar
   * @type {string}
   * @memberof UserResponse
   */
  avatar: string;
}

/**
 *
 * @export
 * @interface UserUpdateRequest
 */
export interface UserUpdateRequest {
  /**
   * First name
   * @type {string}
   * @memberof UserUpdateRequest
   */
  first_name: string;
  /**
   * Second name
   * @type {string}
   * @memberof UserUpdateRequest
   */
  second_name: string;
  /**
   * Display Name
   * @type {string}
   * @memberof UserUpdateRequest
   */
  display_name: string;
  /**
   * User login - unique
   * @type {string}
   * @memberof UserUpdateRequest
   */
  login: string;
  /**
   * Email
   * @type {string}
   * @memberof UserUpdateRequest
   */
  email: string;
  /**
   * Phone
   * @type {string}
   * @memberof UserUpdateRequest
   */
  phone: string;
}

/**
 *
 * @export
 * @interface UsersRequest
 */
export interface UsersRequest {
  /**
   *
   * @type {Array<number>}
   * @memberof UsersRequest
   */
  users: Array<number>;
  /**
   * Chat id
   * @type {number}
   * @memberof UsersRequest
   */
  chatId: number;
}

/**
 *
 * @export
 * @interface VideoInfoResponse
 */
export interface VideoInfoResponse {
  /**
   * Video size in bytes
   * @type {number}
   * @memberof VideoInfoResponse
   */
  size: number;
}
