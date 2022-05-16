/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import { history } from 'loan-utils';

class Transtion extends Component {
  componentDidMount() {
    history.replace('credit-items-scene')
  }

  render() {
  return <div/>
  }
}

export default Transtion
