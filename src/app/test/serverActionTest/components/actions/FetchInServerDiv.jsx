import { Suspense } from 'react'
import { ClientDiv } from '../clientDiv'

// Method 2: Using async function with error handling
async function ServerComponentWithErrorHandling() {
  try {
    //
    //https://random-data-api.com/documentation
    const response = await fetch('https://random-data-api.com/api/v2/users?size=4', {
      cache: 'no-store'
    })

    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const data = await response.json()

    return (
      <div className='p-2 my-2'>
        <ul>
          {data.map((item, i) => (
            <li key={item.id}>{i+1} -- {item.username}</li>
          ))}
        </ul>
        <div  className="m-2 p-2 border" >
          <p className="m-2 p-2">client</p>
          <ClientDiv data={data} />     
        </div>
      </div>
    )
  } catch (error) {
    return <div  className='p-2 my-2'>
      <p>Error loading data: {error.message}</p>
    </div>
  }
}

// Method 3: Wrapper component with Suspense for loading states
function DataLoader() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ServerComponentWithErrorHandling />
    </Suspense>
  )
}

// Main page or component
export default function Component() {
  return (
    <div>
      <h1>server component fetched & send to client component</h1>
      <DataLoader />
    </div>
  )
}