本项目利用 Redux 的思想实现了一个精简版的 redux 与 react-redux

redux 包含`createStore`、`applyMiddleware`方法

react-redux 包含`connect`、`Provider`方法

`connect`包含两个参数`mapStateToProps`与`mapDispatchToProps`

`applyMiddleware`支持常见的异步中间件`thunk`，另外自定义了一个`arrayThunk`用来支持数组形式的`action`
