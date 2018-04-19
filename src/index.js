import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { counter } from './reducer'
import { createStore, applyMiddleware } from './redux'
import { Provider } from './react-redux'
import thunk from './thunk'
import arrayThunk from './thunk-array'

const store = createStore(counter, applyMiddleware(thunk, arrayThunk))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
