import next from 'next'
import React from 'react'

const getData = async({url}:{url:string}) => {
  const res = await fetch(`https://ikpfkhvdwjrblaiyniru.supabase.co:443/${url}` ,
    {
      next:{
        revalidate:3600
      }
    }
  )
  const data = await res.json()
 
  
  
  return data
}

export default getData
