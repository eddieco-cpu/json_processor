import { Suspense } from 'react'

// Method 1: Direct async function component
async function ServerComponentFetch() {
  // Simple fetch with native fetch

  //
  //https://jsonplaceholder.typicode.com/
  const response = await fetch('https://jsonplaceholder.typicode.com/todos?1=666', {
    // Optional caching configuration
    cache: 'no-store', // for dynamic data
    // OR
    // cache: 'force-cache', // for static data
    
    // Optional revalidation
    // next: {
    //   revalidate: 60 // revalidate every 60 seconds
    // }
  })

  if (!response.ok) {
    throw new Error('Failed to fetch data')
  }

  const data = await response.json()

  return (
    <div className='p-2 my-2'>
      <ul>
        {data.map((item, i) => (
          <li key={item.id}>{i+1} -- {item.title}</li>
        ))}
      </ul>
    </div>
  )
}

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
      <ServerComponentFetch />
    </Suspense>
  )
}

// Main page or component
export default function Component() {
  return (
    <div>
      <h1>Server Component Data Fetching</h1>
      {/* <ServerComponentFetch />
      <hr /> */}
      <ServerComponentWithErrorHandling />
      <hr />
      <DataLoader />
    </div>
  )
}