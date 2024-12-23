export default function Staking() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-white">Staking</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-lg font-semibold mb-4 text-white">Available for Staking</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Balance</span>
              <span className="text-white font-medium">1,000 SOCIAL</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">APR</span>
              <span className="text-green-400 font-medium">12.5%</span>
            </div>
            <button className="btn-primary w-full">Stake Tokens</button>
          </div>
        </div>

        <div className="card">
          <h2 className="text-lg font-semibold mb-4 text-white">Currently Staked</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Staked Amount</span>
              <span className="text-white font-medium">500 SOCIAL</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Rewards Earned</span>
              <span className="text-green-400 font-medium">25 SOCIAL</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Lock Period</span>
              <span className="text-white font-medium">30 days</span>
            </div>
            <button className="btn-secondary w-full">Unstake Tokens</button>
          </div>
        </div>
      </div>
    </div>
  )
} 