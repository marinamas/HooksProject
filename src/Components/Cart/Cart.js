import React, {useContext,useState}from 'react'
import CartContext from '../../Store/cartContext'
import Modal from '../UI/Modal'
import classes from "./Cart.module.css"
import CartItem from './CartItem'
import CheckOut from './CheckOut'

const Cart = (props)=>{
    const [showCheck,setCheck] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);

    const contextData =  useContext(CartContext)
    const showOrder = contextData.items.length > 0
    const TotalPrice = `$${contextData.TotalAmount.toFixed(2)}`
    
    const handleRemove =(id) =>{
        contextData.removeItem(id)
    }
    const handleAdd =(item) =>{
       contextData.addItem(item)
    }

    const handleOrder =()=>{
        setCheck(true)
    }
        const handleConfirm = async(UserData) =>{
        setIsSubmitting(true)
        await fetch("https://react-app-a674a-default-rtdb.firebaseio.com/orders.json",{
        method: "POST",
        body: JSON.stringify({
            userDetails: UserData,
            orderDetails : contextData.items
        }),
        headers: {"content-type" : "application/JSON"}
        })
        setIsSubmitting(false)
        setDidSubmit(true)
        contextData.reset()
    }

    const isSubmittingData = <p>Sending Data to Server.... </p>
    const success = <p>Order Placed</p>

    const cartitems = contextData.items.map( content =>
        <CartItem
         key={content.id} 
         name={content.name} 
         price={content.price} 
         amount={content.amount}
         onRemove={ () =>handleRemove(content.id)}
         onAdd={() => handleAdd(content) }/>)

    const cartButton = 
            <div className={classes.actions}>
            <button className= {classes["button--alt"]} onClick={props.onClose}>Close </button>
            {showOrder && <button className={classes.button} onClick={handleOrder}>Order</button>} 
            </div> 
  
   const modalData = 
        <>
           <ul  className={classes["cart-items"]}> {cartitems} </ul>
            <div className={classes.total}>
                <span>Total Amount :</span>
                <span>{TotalPrice}</span>
            </div>
            {showCheck &&  showOrder && <CheckOut onCancel={props.onClose} onConfirm={handleConfirm} />}
            <div className={classes.actions}>
            {!showCheck &&  cartButton}   
            </div> 
         </>   
       
    return (
        <Modal onClose={props.onClose}>
           {!isSubmitting && !didSubmit && modalData}
           {isSubmitting && isSubmittingData}
           {!isSubmitting && didSubmit && success}
           {didSubmit  &&  <div className={classes.actions}>
            <button className= {classes["button--alt"]} onClick={props.onClose}>Close </button> </div> }
            
        </Modal>
 )
}
export default Cart