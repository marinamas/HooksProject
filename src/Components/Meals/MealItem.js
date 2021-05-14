import React, {useContext} from 'react'
import CartContext from '../../Store/cartContext'
import classes from "./MealItem.module.css"
import MealitemForm from './MealItemForm'

function Mealitem(props) {
    const contextValue =  useContext(CartContext)
    const price = `$${props.price.toFixed(2)}`

    const addItemToCart = (amount) => {
        contextValue.addItem ({
            id :  props.id,
            name :props.name,
            price: props.price,
            amount: amount
        })
    }
    return (
        <li className={classes.meal}>
            <div >
                <h3>{props.name} </h3>
                <div className={classes.description}> {props.desc}</div>
                <div className={classes.price}> {price} </div>
            </div>
            <div>
                <MealitemForm id={props.id} addItemToCart={addItemToCart}/>
            </div>
         </li>     
    )
}

export default Mealitem