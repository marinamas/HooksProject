import classes from './CheckOut.module.css';
import {useRef,useState} from "react"

const isEmpty = (value) => value.trim() !== "" 
const postLength = (code) => code.length === 6

const CheckOut = (props) => {
  const [formValid,setformValid] = useState({
    name : true,
    street: true,
    post:true,
    city:true
  })

  const confirmHandler = (event) => {
    event.preventDefault();
    const isNameValid = isEmpty(nameRef.current.value)
    const isStreetValid = isEmpty(streetRef.current.value)
    const isPostValid = postLength(postRef.current.value)
    const isCityValid = isEmpty(cityRef.current.value)

    setformValid(
      {name:isNameValid,
      street: isStreetValid,
      post: isPostValid,
      city: isCityValid}
    )
     if(isNameValid & isStreetValid & isPostValid & isCityValid )
     {
       props.onConfirm({
         name:nameRef.current.value,
         street : streetRef.current.value,
         post: postRef.current.value,
         city: cityRef.current.value
       })
     }
    
  };
    const nameRef  = useRef()
    const streetRef = useRef()
    const postRef =useRef()
    const cityRef =useRef()

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={`${classes.control} ${!formValid.name && classes.invalid}` }>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameRef}/>
        { !formValid.name && <p> Name cannot be empty! </p>}
      </div>
      <div className={`${classes.control} ${!formValid.street && classes.invalid}`}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={streetRef} />
        { !formValid.street && <p> Street cannot be empty! </p>}
      </div>
      <div className={`${classes.control} ${!formValid.post && classes.invalid}`}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={postRef}/>
      </div>
      { !formValid.post && <p> Post cannot be empty(should be 6 digits long) </p>} 
      <div className={`${classes.control} ${!formValid.city && classes.invalid}`}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityRef}/>
        { !formValid.city && <p> City cannot be empty! </p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit} >Confirm</button>
      </div>
    </form>
  );
};

export default CheckOut;
