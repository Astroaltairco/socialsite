export default function Rewards() {
  return (
    <div className="space-y-8 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Rewards</h1>
          <p className="text-gray-400 mt-1">Track and claim your staking rewards</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-gray-400">Total Rewards</div>
            <div className="text-lg font-semibold text-white">0.00 SOCIAL</div>
          </div>
          <button className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors">
            Connect Wallet
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Rewards Overview */}
        <div className="col-span-2 space-y-6">
          <div className="bg-[#0A0A1B] rounded-2xl border border-white/5 p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Active Rewards</h2>
            <div className="text-gray-400 text-center py-8">
              No active rewards
            </div>
          </div>

          <div className="bg-[#0A0A1B] rounded-2xl border border-white/5 p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Rewards History</h2>
            <div className="text-gray-400 text-center py-8">
              No rewards history
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="space-y-6">
          <div className="bg-[#0A0A1B] rounded-2xl border border-white/5 p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Rewards Stats</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Total Earned</span>
                <span className="text-white font-medium">0.00 SOCIAL</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Active Rewards</span>
                <span className="text-white font-medium">0</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Average APY</span>
                <span className="text-white font-medium">0.00%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Best Performer</span>
                <span className="text-white font-medium">-</span>
              </div>
            </div>
          </div>

          <div className="bg-[#0A0A1B] rounded-2xl border border-white/5 p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Upcoming Rewards</h2>
            <div className="text-gray-400 text-center py-8">
              No upcoming rewards
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 