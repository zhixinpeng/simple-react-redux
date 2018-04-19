// 包含getState、subscribe、dispatch三种方法的createStore
export function createStore(reducer, enhancer) {
  if (enhancer) {
    return enhancer(createStore)(reducer)
  }

  let currentState = {}
  let currentListeners = []

  function getState() {
    return currentState
  }

  function subscribe(listener) {
    currentListeners.push(listener)
  }

  function dispatch(action) {
    currentState = reducer(currentState, action)
    currentListeners.forEach(v => v())
    return action
  }

  dispatch({ type: '@@@Angus' })
  return { getState, subscribe, dispatch }
}

// actionCreators
export function bindActionCreators(creators, dispatch) {
  return Object.keys(creators).reduce((ret, item) => {
    ret[item] = bindActionCreator(creators[item], dispatch)
    return ret
  }, {})
}

// actionCreator
function bindActionCreator(creator, dispatch) {
  return (...args) => dispatch(creator(...args))
}

// 中间件
export function applyMiddleware(...middlewares) {
  return createStore => (...args) => {
    const store = createStore(...args)
    let dispatch = store.dispatch

    const midApi = {
      getState: store.getState,
      dispatch: (...args) => dispatch(...args)
    }

    const middlewareChain = middlewares.map(middleware => middleware(midApi))
    dispatch = compose(...middlewareChain)(store.dispatch)
    return {
      ...store,
      dispatch
    }
  }
}

export function compose(...func) {
  if (func.length === 0) {
    return arg => arg
  }
  if (func.length === 1) {
    return func[0]
  }
  return func.reduce((ret, item) => (...args) => ret(item(...args)))
}
