import React, { Component } from 'react'

export default class Route extends Component {
  state = {
    hash: ''
  }
  componentDidMount() {
    let hash = window.location.hash.split('#')[1]
    this.setState({ hash })
    // console.log(hash)
    window.addEventListener('hashchange', () => {
      console.log('浏览器的hash值发生改变')
      let hash = window.location.hash.split('#')[1]
      this.setState({ hash })
    })
  }
  render() {
    let Comp = this.props.component
    let path = this.props.path
    return (
      <>
        {
          this.state.hash == path ?
            <Comp /> : ''
        }
      </>
    )
  }
}
