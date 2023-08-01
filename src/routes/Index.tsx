import { useFutureverse } from '@futureverse/react'
import { Link } from 'react-router-dom'
import { useSignInHandler } from '../hooks'

function Index() {
  useSignInHandler()

  const { logout, userSession } = useFutureverse()

  return (
    <div>
      Index Route
      {userSession != null && (
        <div>
          <button
            onClick={() => {
              logout()
            }}
          >
            Log Out
          </button>
          <div>
            <Link to='/home'>Go to Home Page</Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default Index
