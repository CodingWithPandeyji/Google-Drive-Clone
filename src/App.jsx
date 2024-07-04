import React from 'react'
import "./index.css"
import Header from './Header'
import Sidebar from './Sidebar'
import Content from './Content'
function App() {
  return (
    <>
    <Header/>
    <div className=' flex'>
      <Sidebar/>
      <Content/>
    </div>
    </>
   
  )
}

export default App