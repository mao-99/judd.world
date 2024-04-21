import { useState, useEffect } from 'react'
import { getData } from './backend/databasePopulator'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  useEffect(() =>{
    getData();
  }, [])

  return (
    <>
    </>
  )
}

export default App
