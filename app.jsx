/*
import { useState } from 'react'

import './App.css'

function App() {
  
  const [count,setCount] = useState(0);

  return (
    <div>
      <Count count={count} setCount={setCount} />
    </div>
   
  )
}

function Count({count , setCount}) {
  return <div>
    <CountRenderer count={count} />
    <Buttons count={count} setCount={setCount} />
  </div>
}

function CountRenderer(count){
  return <div>
    {count}
  </div>
}

function Buttons({count , setCount}) {
  return <div>
    <button onClick={() => {
      setCount(count + 1);
    }}>Increase</button>

    <button onClick={() => {
      setCount(count-1);
    }}>Decrease</button>
  </div>
}

export default App
*/

//Currently on the above code , see that we have defined the state variable above and on the bottom , that is on the components we are drilling the props to the child components even though it is not required that is what prop drilling is ,, we solve it via context api that is teleporting the props directly from the app parent to the buttons component and the cloud renderer component and we can see the count component which has the two child components countRenderer and the buttons dosent require the props count and set count but we have to pass it without context api .. so we will avoid prop drilling on the above case using context api

//with context-api

import { useContext, useState } from 'react'

import './App.css'
import { CountContext } from './context';

function App() {
  
  const [count,setCount] = useState(0);

//wrap anyone who wants to use the teleported value that is the context api inside a provider 
//we just wrap all the components that want to use the teleported value inside this provider of the telported value as we can see below >> 

  return (
    <div>
      <CountRenderer.Provider value={count}>
       <Count setCount={setCount} />
      </CountRenderer.Provider>
    </div>
   
  )
}

function Count({setCount}) {
  return <div>
    <CountRenderer  />
    <Buttons  setCount={setCount} />
  </div>
}

function CountRenderer(){
  const count = useContext(CountContext); //context for which we want the value here it is the count context 
  return <div>
    {count}
  </div>
}

function Buttons({setCount}) {
  const count = useContext(CountContext);
  return <div>
    <button onClick={() => {
      setCount(count + 1);
    }}>Increase</button>

    <button onClick={() => {
      setCount(count-1);
    }}>Decrease</button>
  </div>
}

export default App
