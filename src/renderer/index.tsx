import React, { StrictMode } from 'react'
import { render } from 'react-dom'
import { HashRouter, Route } from 'react-router-dom'
import { Provider } from 'react-redux'

import Main from './pages/main'
import store from './store'
import Detail from './pages/detail'

render(
    <StrictMode>
        <Provider store={store}>
            <HashRouter>
                <Route path="/" exact component={Main}></Route>
                <Route path="/detail" component={Detail}></Route>
            </HashRouter>
        </Provider>
    </StrictMode>,
    document.getElementById("root")
)