import React from 'react'
import Button1 from '../Buttons/Button1'
import "../../styles/salesHeader.css"

const SalesHeader = () => {
  return (
    <div>
        <div className='headingBtns'>
          <div className='salesHeading'>
            <h3>Sales</h3>
          </div>
          <div className='flexBtns'>
            <div className="flexBtn1">
              <Button1 onC/>
            </div>
          </div>
        </div>
    </div>
  )
}

export default SalesHeader