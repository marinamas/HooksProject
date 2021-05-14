import React from 'react'
import AvailableItems from './AvailableItems'
import MealsSummary from './MealsSummary'

 function Meals(props) {
    return (
        <>
          <MealsSummary/>  
          <AvailableItems/>
        </>)
}

export default Meals