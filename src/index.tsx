import * as fvSdk from '@futureverse/experience-sdk'
import {
  FutureverseAuthClient,
  FutureverseProvider,
  UserState,
} from '@futureverse/react'
import * as React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './index.css'
import reportWebVitals from './reportWebVitals'
import Home from './routes/Home'
import Index from './routes/Index'

// In your app, keep this as an environment variable
const clientId = process.env.REACT_APP_CLIENT_ID
const walletConnectProjectId = process.env.REACT_APP_WALLET_CONNECT_PROJECT_ID

if (clientId == null || walletConnectProjectId == null) {
  throw new Error(
    'Invariant violation: clientId or walletConnectProjectId are not defined!'
  )
}

const authClient = (() => {
  const client = new FutureverseAuthClient({
    clientId,
    environment:
      process.env.NODE_ENV === 'production'
        ? fvSdk.ENVIRONMENTS.production
        : fvSdk.ENVIRONMENTS.staging,
    redirectUri: 'http://localhost:3000/home',
  })
  client.addUserStateListener((userState) => {
    if (userState === UserState.SignedOut) {
      sessionStorage.setItem('fvAuthSilentLogin', 'disabled')
    }
  })
  return client
})()

const router = createBrowserRouter([
  {
    path: '/',
    element: <Index />,
  },
  {
    path: 'home',
    element: <Home />,
  },
])

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <FutureverseProvider
      stage='development'
      authClient={authClient}
      Web3Provider='wagmi'
      walletConnectProjectId={walletConnectProjectId}
    >
      <RouterProvider router={router} />
    </FutureverseProvider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
