import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Account = () => {
  const [programs, setPrograms]=useState([ ])
  useEffect(()=> {
    const fetchUserPrograms = async ()=>{
        try{
            const res = await axios.get('http://localhost:3000/programs')
            setPrograms(res.data.message)
            console.log(res)
        }catch(err){
            console.log(err)
        }
    }
    fetchUserPrograms()
  },[])
    return (
    <div>
      <h1>My account</h1>
  <div className='programs'> 
{programs.map(program => (
  <div className='program'> 
  <h2> {program.name} </h2>
  <p> {program.description}</p>
  <p> {program.goals}</p>
    </div>
))} </div>
  </div>
  )
}

export default Account