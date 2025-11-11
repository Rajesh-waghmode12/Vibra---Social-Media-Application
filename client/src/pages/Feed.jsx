import React from 'react'
import Loading from '../components/Loading.jsx'
import StoriesBar from '../components/StoriesBar.jsx'

const Feed = () => {

  const [loading , setLoading] = useState(true)

  
  
  return !loading  ? (
    <div>
      <div>
        <StoriesBar/>
      </div>
    </div>
  ) : <Loading/>
}

export default Feed
