import { useFutureverse } from '@futureverse/react'
import { useAccount, useBalance } from 'wagmi'

function Home() {
  const { login, logout, userSession, CONSTANTS } = useFutureverse()
  const account = useAccount()
  const ethBalance = useBalance({
    address: account.address,
  })
  const xrpBalanceOnTrn = useBalance({
    address: account.address,
    chainId: CONSTANTS.CHAINS.TRN.id,
  })

  return (
    <div>
      Home Route
      {userSession == null ? (
        <button
          onClick={() => {
            login()
          }}
        >
          Log In
        </button>
      ) : (
        <div>
          <p>User EOA: {userSession.eoa}</p>
          <p>User Chain ID: {userSession.chainId}</p>
          <p>User Balance: {ethBalance.data?.formatted ?? 'loading'} ETH</p>
          <p>
            User Balance: {xrpBalanceOnTrn.data?.formatted ?? 'loading'} ETH
          </p>
          <button
            onClick={() => {
              logout()
            }}
          >
            Log Out
          </button>
        </div>
      )}
    </div>
  )
}

export default Home
