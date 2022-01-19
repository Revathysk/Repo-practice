import { useState } from 'react'
import axios from 'axios'
import Nasadata from './components/Nasadata'
import './App.css'

// function declaration
function App() {

  // Functional components are considered stateless
  // Class components are considered stateful

  // Write your state towards the very top of your component
  // 1.) import useState at the top of your code
  // 2.) First argument = the name of your state
  // 3.) Second arg = your method to update your state
  // const [state, setState] = useState(initialState)
  const [like, setLike] = useState('unliked')
  const [userInput, setUserInput] = useState('')
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  // In functional components, we no longer have to use the keyword 'this'

  const toggle = () => {
    console.log('toggling')
    // :(
    // setData('liked') ? setData('unliked') : setData('liked')
    
    // ternary
    // data === 'unliked' ? setData('liked') : setData('unliked')

    // reg if/else
    if(like === 'unliked') {
      setLike('liked')
    } else {
      setLike('unliked')
    }
  }

  const handleChange = (e) => {
    setUserInput(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()
    console.log("Submit function")
    axios.get(`https://images-api.nasa.gov/search?q=${userInput}`)    
    .then(response => setData(response.data.collection.items))
  }


  return (
    <div className="App">
      <h1>NASAGRAM</h1>
      {console.log('state', data)}
      {/* CONTROLLED FORM - meaning handle our change via state */}
      <form onSubmit={handleSubmit}>
        <label htmlFor='userInput'>Search: </label>
        <input
          type='text'
          id='userInput'
          name='userInput'
          onChange={handleChange}
          value={userInput}
        />
        <input type="submit" value='submit' />
      </form>

      {/* <button onClick={toggle}>{like}</button> */}

      {
        loading
          ?
          <img src="https://c.tenor.com/tEBoZu1ISJ8AAAAC/spinning-loading.gif" alt="" />
          :
          <div id='nasa-container'>
            {
              data.map((item) => {
                return (
                  <Nasadata item={item} />
                )
              })
            }
          </div>
      }
    </div>
  );
}


export default App