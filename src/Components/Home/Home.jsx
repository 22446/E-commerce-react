import React from 'react'
import {SimpleSlider} from '../SimpleSlider/SimpleSlider';
import Categoryslider  from '../Categoryslider/Categoryslider';
import Product from '../Product/Product';
export default function Home() {
 
  return (
    <div>
      <div className="overflow-hidden">
      <SimpleSlider/>
      </div>
      <div className='overflow-hidden'>
        <h2>Categories</h2>
      <Categoryslider/>
      </div>

      <div>
        <Product/>
      </div>
    </div>
  )
}
