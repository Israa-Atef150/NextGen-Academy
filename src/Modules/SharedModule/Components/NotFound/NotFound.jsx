import React from 'react'
import Notfound from '../../../../assets/imgs/404.png'
import './NotFound.css'
export default function NotFound() {
  return (
    <div className='Notfound'>
      <div className="cover">
      <img src={Notfound} alt=""/>
      </div>
    </div>
  )
}
