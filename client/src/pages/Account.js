import React, { useEffect, useState } from 'react'
//import axios from 'axios'
import icon from '../assets/icon.png'
import './Account.css';

const Account = () => {
  const [programs, setPrograms]=useState([ ])
  useEffect(()=> {
    // const fetchUserPrograms = async ()=>{
    //     try{
    //         const res = await axios.get('http://localhost:3000/programs')
    //         setPrograms(res.data.message)
    //         console.log(res)
    //     }catch(err){
    //         console.log(err)
    //     }
    // }


    const fetchUserPrograms = async (accessToken)=>{
      try{
          const res = fetch('http://localhost:3000/programs', {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${accessToken}`,
          },
        }).then((res) => setPrograms(res.data.message))
          console.log(res)
      }catch(err){
          console.log(err)
      }
    }

    // async function whoAmI(accessToken) {
    //   return fetch('http://localhost:3000/api/whoami', {
    //       method: 'GET',
    //       headers: {
    //           Authorization: `Bearer ${accessToken}`,
    //       },
    //   }).then((res) => res.json())
    // }


    fetchUserPrograms()
  },[])
    return (
    <div>
      <h1>Profile</h1>
      <img src={icon} alt="profile_icon" />
      <p>Username</p>
      <p className='goals_title'>My goals</p>
      <div className='info'>
        <div className='day_choice'>
          <div className='day_icon'></div>
          <div className='toggle'>
            <input type="checkbox" id="switch" class="switch" />
            <label for="switch" class="slider"></label>
          </div>
        </div>
        <div className='prog_inputs'>
          <div className='meal1'>
            <p className='repas1'>Ici on prendra le nom du repas depuis la db</p>
            <input type='number' className='protein_input'></input>
            <input type='number' className='carbs_input'></input>
            <input type='number' className='fat_input'></input>
            <p>grammes</p>
          </div>
          <div className='meal2'></div>
          <div className='meal3'></div>
          <div className='meal4'></div>
          <div className='meal5'></div>
        </div>
        <div className='save_button'>
          <button type="submit" class="save-button">Save</button>
        </div>
      </div>
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