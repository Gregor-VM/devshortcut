import './index.css'
import { hydrate } from 'preact'
import { App } from './app'

import { AppState, createAppState } from './state/appState';

hydrate(
    <AppState.Provider value={createAppState()}>
        <App />
    </AppState.Provider>, 
document.getElementById('app') as HTMLElement);
