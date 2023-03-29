import React, { Component } from 'react'
import loding from '../Loding.gif'
export default class Loding extends Component {
  render() {
    return (
      <div className='text-center'>
        <img  style={{width:"50px"}}src={loding} alt="" />
      </div>
    )
  }
}
