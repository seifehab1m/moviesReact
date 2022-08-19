import React, { Component } from 'react'

export default class Label extends Component {
    state={
        color:"red"
    }
  render() {
    return (
      <div style={{color:this.state.color}}>label</div>
    )
  }
}
