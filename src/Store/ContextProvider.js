import React, {useReducer} from 'react'
import CartContext from "./cartContext.js"

const defaultState ={
    items :[],
    TotalAmount : 0
}

const cartReducer = (state, action)=>{
    switch(action.type){
     case("ADD") : 
    const exisitngIndex = state.items.findIndex((item)=> item.id === action.item.id )
    const existingItem =  state.items[exisitngIndex]
    let updateItems
    if(existingItem){
       let updateItem = {
            ...existingItem,
            amount : existingItem.amount + action.item.amount
        }
        updateItems = [...state.items]
        updateItems[exisitngIndex] = updateItem
        
    }
       else {
           updateItems = state.items.concat(action.item)
       }
     return {
          items : updateItems,
        TotalAmount : state.TotalAmount + action.item.amount * action.item.price
     }
     case ("REMOVE") : 
        const toBeRemovedIndex = state.items.findIndex((item)=> item.id === action.id)
        const removedItem =  state.items[toBeRemovedIndex]
        const UpdateAmount = state.TotalAmount - removedItem.price
        let UpdateItems
        if (removedItem.amount === 1)
        {
            UpdateItems = state.items.filter(item => item.id !== action.id)
        }
        else{
            let updateItem  = {
                ...removedItem,
                amount: removedItem.amount-1
            }
            UpdateItems = [...state.items]
            UpdateItems[toBeRemovedIndex] = updateItem
        }
        return {
            items : UpdateItems,
            TotalAmount : UpdateAmount
        }
        case ("RESET") : return  defaultState
     default : return defaultState
 }
} 

 function ContextProvider(props) {
     const [newState,dispatch] = useReducer(cartReducer, defaultState )

     const addCartItem =(item) =>{
       dispatch({type :"ADD" , item:item})
     }
     const removeCartItem =(id) =>{
        dispatch({type:"REMOVE", id:id})
    }

    const clearCart =() => {
        dispatch({type:"RESET"})
    }
     const contextValue = {
         items :newState.items,
         TotalAmount : newState.TotalAmount,
         addItem : addCartItem ,
         removeItem : removeCartItem,
         reset:clearCart
     }
    return (
        <CartContext.Provider value={contextValue}>
            {props.children}
        </CartContext.Provider>
    )
}

export default ContextProvider