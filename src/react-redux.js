import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from './redux'

// 暴露一个Provider，利用context生成全局store
export class Provider extends React.Component {
  static childContextTypes = {
    store: PropTypes.object
  }

  getChildContext() {
    return { store: this.store }
  }

  constructor(props, context) {
    super(props, context)
    this.store = props.store
  }

  render() {
    return this.props.children
  }
}

// 暴露一个connect方法供子组件调用state及dispatch等方法
export const connect = (
  mapStateToProps = state => state,
  mapDispatchToProps = {}
) => WrapComponent => {
  return class ConnectComponent extends React.Component {
    static contextTypes = {
      store: PropTypes.object
    }

    constructor(props, context) {
      super(props, context)
      this.state = {
        props: {}
      }
    }

    componentDidMount() {
      const { store } = this.context
      store.subscribe(() => this.update())
      this.update()
    }

    update() {
      const { store } = this.context
      const stateProps = mapStateToProps(store.getState())
      const dispatchProps = bindActionCreators(
        mapDispatchToProps,
        store.dispatch
      )
      this.setState({
        props: {
          ...this.state.props,
          ...stateProps,
          ...dispatchProps
        }
      })
    }

    render() {
      return <WrapComponent {...this.state.props} />
    }
  }
}
