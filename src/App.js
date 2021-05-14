import React, {useState} from "react"
import Cart from "./Components/Cart/Cart"
import Header from "./Components/Layout/Header"
import Meals from "./Components/Meals/Meals"
import ContextProvider from "./Store/ContextProvider"


const App = () =>{
  const [showCart,setshowCart] = useState(false)

  const handleUpdate = () =>{
    setshowCart(true)
  }

  const handleHide = () =>{
    setshowCart(false)
  }

  return (
  <ContextProvider >
    {showCart  && <Cart onClose={handleHide} /> }
    <Header onUpdate={handleUpdate}/>
    <main >
      <Meals />
    </main>
  </ContextProvider>
  )
}

export default App