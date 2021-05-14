import React from  "react"

const CartContext = React.createContext({
    items :[],
    TotalAmount : 0,
    addItem : (item)=>{},
    removeItem : (id)=>{},
    reset: () => {}
})

export default CartContext