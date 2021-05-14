import React , {useEffect,useState} from "react"
import Card from "../UI/Card";
import Mealitem from "./MealItem";
import classes from "./AvailableItems.module.css"

  const AvailableItems = () => {
      const [meals, setMeals] = useState([])
      const [isLoading , setLoading] = useState(true)
      const [error,setError] = useState(null)
  
      useEffect(()=>{
        const fetchData = async() => {
            const data =  await fetch("https://react-app-a674a-default-rtdb.firebaseio.com/meals.json")
            if(!data.ok) { throw new Error("SDFGHF")}
            const jsonData = await data.json()
            let avalItems = []
            for(let key  in  jsonData)
            {
              avalItems.push({
                id: key,
                name: jsonData[key].name,
                description : jsonData[key].description,
                price: jsonData[key].price
              })
            }
             setMeals(avalItems)
             setLoading(false)
        }
        fetchData().catch(error => { setLoading(false)
          setError(error.message)})
      },[])

       if(isLoading){
        return (<section className={classes.loading}>
           <p> Loading..</p>
        </section>)
       }

       if(error){
        return (<section className={classes.loading}>
           <p> Erro..</p>
        </section>)
       }
      const avameals = meals.map((item ) => <Mealitem key={item.id}  id={item.id} name ={item.name}  desc={item.description} price={item.price} />  )
      return (
        <div className={classes.meals}>
        <Card>
       <ul>{avameals} </ul> 
         </Card>
         </div>
      )
  }

  export default AvailableItems