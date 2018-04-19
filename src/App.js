import React from 'react'
import { connect } from './react-redux'
import { add, remove, addAsync, addTwice } from './reducer'

@connect(state => ({ num: state }), { add, remove, addAsync, addTwice })
class App extends React.Component {
  render() {
    return (
      <div>
        <h1>数字：{this.props.num}</h1>
        <button onClick={this.props.add}>加1</button>
        <button onClick={this.props.remove}>减1</button>
        <button onClick={this.props.addAsync}>延迟2s加1</button>
        <button onClick={this.props.addTwice}>加两次</button>
      </div>
    )
  }
}

export default App
