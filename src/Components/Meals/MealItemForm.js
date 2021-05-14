import React,{useState, useRef} from 'react'
import Input from '../UI/Input'
import classes from "./MealItemForm.module.css"


function MealitemForm(props) {
    const amountRef = useRef()
    const [show,setShow] = useState(false)
    const handleSubmit = (event) =>
    {
        event.preventDefault()
        const amountData = amountRef.current.value
        const amount = +amountData
        if(amount.trim === 0 || amount< 1 || amount > 5)
        {
           setShow(true)
           return
        }
        setShow(false)
        props.addItemToCart(amount)
    }
    return (
        <>
          <form className={classes.form} onSubmit={handleSubmit}> 
            <Input 
            label = "Amount" 
                input={{
                id : props.id,
                type : "number",
                min : "1",
                max: "10",
                step :"1",
                defaultValue:"1",
                ref :amountRef
            }} 
            />
            <button className={classes.button} >+ Add</button>
            {show && <p> Please enter a valid amount </p>}
        </form>
        </>
    )
}

export default MealitemForm