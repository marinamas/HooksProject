import React from "react"
import pic from "../../assests/meals.jpg"
import classes from "./Header.module.css"
import HeaderButton from "./HeaderButton"
const Header =(props) =>{

 return (
     <div>
     <header className ={classes.header}>
         <h1 style={{textAlign : "center"}}> ReactMeals </h1>
         <HeaderButton onUpdate={props.onUpdate}/>    
     </header>
     <div className={classes["main-image"]}>
         <img src= {pic} alt="Food Pic"/>
     </div>
     </div>
 )
}

export default Header