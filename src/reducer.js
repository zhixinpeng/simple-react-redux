const ADD = 'ADD'
const REMOVE = 'REMOVE'

// action
export function add() {
  return { type: ADD }
}

export function remove() {
  return { type: REMOVE }
}

export function addAsync() {
  return dispatch => {
    setTimeout(() => {
      dispatch(add())
    }, 2000)
  }
}

export function addTwice() {
  return [{ type: ADD }, addAsync()]
}

// reducer
export function counter(state = 0, action) {
  switch (action.type) {
    case ADD:
      return state + 1
    case REMOVE:
      return state - 1
    default:
      return 22
  }
}
