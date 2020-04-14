// @ts-ignore
import Tag from "./Tag";
import Article from "./Article";
import User, {LoginFormUser} from "./User";

export const LOAD_TAGS = "LOAD_TAGS";
export const LOAD_TAG_IN_FORM = "LOAD_TAG_IN_FORM";
export const SUBMIT_TAG_FORM = "SUBMIT_TAG_FORM";
export const CHANGE_TAG_IN_FORM = "CHANGE_TAG_IN_FORM";
export const FAIL_SUBMIT_TAG_FORM = "FAIL_SUBMIT_TAG_FORM";
export const SUCCESS_SUBMIT_TAG_FORM = "SUCCESS_SUBMIT_TAG_FORM";

export const OPEN_TAG_MODAL = "OPEN_TAG_MODAL";
export const CLOSE_TAG_MODAL = "CLOSE_TAG_MODAL";

export const CREATE_NEW_TAG = "CREATE_NEW_TAG";

export const LOAD_ARTICLES = "LOAD_ARTICLES";
export const LOAD_ARTICLE_IN_FORM = "LOAD_ARTICLE_IN_FORM";
export const SUBMIT_ARTICLE_FORM = "SUBMIT_ARTICLE_FORM";
export const CHANGE_ARTICLE_IN_FORM = "CHANGE_ARTICLE_IN_FORM";
export const FAIL_SUBMIT_ARTICLE_FORM = "FAIL_SUBMIT_ARTICLE_FORM";
export const SUCCESS_SUBMIT_ARTICLE_FORM = "SUCCESS_SUBMIT_ARTICLE_FORM";
export const CLEAR_ARTICLE = "CLEAR_ARTICLE";

export const LOAD_CURRENT_USER = "LOAD_CURRENT_USER";
export const LOAD_USERS = "LOAD_USERS";
export const LOAD_USER_IN_FORM = "LOAD_USER_IN_FORM";
export const SUBMIT_USER_FORM = "SUBMIT_USER_FORM";
export const CHANGE_USER_IN_FORM = "CHANGE_USER_IN_FORM";
export const FAIL_SUBMIT_USER_FORM = "FAIL_SUBMIT_USER_FORM";
export const SUCCESS_SUBMIT_USER_FORM = "SUCCESS_SUBMIT_USER_FORM";

export const OPEN_USER_MODAL = "OPEN_USER_MODAL";
export const CLOSE_USER_MODAL = "CLOSE_USER_MODAL";

export const CREATE_NEW_USER = "CREATE_NEW_USER";
export const LOGIN_USER = "LOGIN_USER";
export const UPDATE_LOGIN_FORM = "UPDATE_LOGIN_FORM";

export interface LoadTags {
    type: typeof LOAD_TAGS,
    tags: Array<Tag>
}

export interface LoadTagInForm {
    type: typeof LOAD_TAG_IN_FORM,
    tag: Tag
}

export interface ChangeTagInForm {
    type: typeof CHANGE_TAG_IN_FORM,
    tag: Tag
}

export interface SubmitTagForm {
    type: typeof SUBMIT_TAG_FORM
}

export interface FailSubmitTagForm {
    type: typeof FAIL_SUBMIT_TAG_FORM
}

export interface SuccessSubmitTagForm {
    type: typeof SUCCESS_SUBMIT_TAG_FORM
}

export interface CreateNewTag {
    type: typeof CREATE_NEW_TAG
}

export interface OpenTagModal {
    type: typeof OPEN_TAG_MODAL
}

export interface CloseTagModal {
    type: typeof CLOSE_TAG_MODAL
}

export interface LoadArticles {
    type: typeof LOAD_ARTICLES,
    articles: Array<Article>,
    numberOfPages: number,
    pageNumber: number
}

export interface LoadArticleInForm {
    type: typeof LOAD_ARTICLE_IN_FORM,
    article: Article
}

export interface ChangeArticleInForm {
    type: typeof CHANGE_ARTICLE_IN_FORM,
    article: Article
}

export interface SubmitArticleForm {
    type: typeof SUBMIT_ARTICLE_FORM
}

export interface FailSubmitArticleForm {
    type: typeof FAIL_SUBMIT_ARTICLE_FORM
}

export interface SuccessSubmitArticleForm {
    type: typeof SUCCESS_SUBMIT_ARTICLE_FORM
}

export interface DeleteArticle {
    type: typeof CLEAR_ARTICLE
}

export const UP = "UP";
export const DOWN = "DOWN";

export interface LoadCurrentUser {
    type: typeof LOAD_CURRENT_USER,
    user: User
}

export interface LoadUsers {
    type: typeof LOAD_USERS,
    users: Array<User>
}

export interface LoadUserInForm {
    type: typeof LOAD_USER_IN_FORM,
    user: User
}

export interface ChangeUserInForm {
    type: typeof CHANGE_USER_IN_FORM,
    user: User
}

export interface SubmitUserForm {
    type: typeof SUBMIT_USER_FORM
}

export interface FailSubmitUserForm {
    type: typeof FAIL_SUBMIT_USER_FORM
}

export interface SuccessSubmitUserForm {
    type: typeof SUCCESS_SUBMIT_USER_FORM
}

export interface CreateNewUser {
    type: typeof CREATE_NEW_USER
}

export interface OpenUserModal {
    type: typeof OPEN_USER_MODAL
}

export interface CloseUserModal {
    type: typeof CLOSE_USER_MODAL
}

export interface LoginUser {
    type: typeof LOGIN_USER,
    user: User
}

export interface UpdateLoginForm {
    type: typeof UPDATE_LOGIN_FORM,
    user: LoginFormUser
}

export type ArticleTypes =
    LoadArticles
    | LoadArticleInForm
    | ChangeArticleInForm
    | SubmitArticleForm
    | SuccessSubmitArticleForm
    | FailSubmitArticleForm
    | DeleteArticle

export type TagTypes =
    LoadTags
    | LoadTagInForm
    | ChangeTagInForm
    | SubmitTagForm
    | SuccessSubmitTagForm
    | FailSubmitTagForm
    | OpenTagModal
    | CloseTagModal
    | CreateNewTag

export type UserTypes =
    LoadUsers
    | LoadUserInForm
    | ChangeUserInForm
    | SubmitUserForm
    | SuccessSubmitUserForm
    | FailSubmitUserForm
    | OpenUserModal
    | CloseUserModal
    | CreateNewUser
    | LoadCurrentUser
    | LoginUser
    | UpdateLoginForm
