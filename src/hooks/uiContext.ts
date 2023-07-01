import { createContext } from 'react'

import { emptyActions, Actions } from './emptyActions'

export type Ui = {
  loadingScreen: Actions
}

const ui = {
  loadingScreen: emptyActions,
}

export const UiContext = createContext<Ui>(ui)
