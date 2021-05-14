import React,{useContext,useEffect,useState} from "react"
import CartContext from "../../Store/cartContext"
import CartIcon from "./CartIcon"
import classes from "./HeaderButton.module.css"

const HeaderButton =(props) =>{
    const cartCtx = useContext(CartContext)
    const [showbump ,setBump] =useState(false)
    const numberOfCartItems = cartCtx.items.reduce((acc,current)=>{
        return acc + current.amount
    },0)
    const {items} = cartCtx
    const btnstyle =  `${classes.button} ${showbump ? classes.bump : "" }`
    useEffect(()=>{
        if(items.length===0){
            return;
        }
        setBump(true)
        const time = setTimeout(()=>{
                setBump(false)
            },300)
        return ()=>{
            clearTimeout(time)
        }
    },[items])
    return(
        <button className= {btnstyle}  onClick = {()=>{props.onUpdate()}} >
            <span className={classes.icon}> <CartIcon/> </span>
            <span > Your Cart </span>
            <span className= {classes.badge}> {numberOfCartItems}</span>
        </button>
    )
}

export default HeaderButton