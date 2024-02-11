export interface PageState {
  activePage: string | null;
}

export const SET_ACTIVE_PAGE = "page/setActivePage";

interface SetActiveItemAction {
  type: typeof SET_ACTIVE_PAGE;
  payload: string | null;
}

export type ListActionTypes = SetActiveItemAction;
