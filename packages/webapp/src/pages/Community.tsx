export default function Community() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-white">Community</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="card">
          <h2 className="text-lg font-semibold mb-4 text-white">Active Members</h2>
          <div className="text-3xl font-bold text-white mb-2">12.5K</div>
          <div className="text-green-400 text-sm">+15% this month</div>
        </div>

        <div className="card">
          <h2 className="text-lg font-semibold mb-4 text-white">Token Holders</h2>
          <div className="text-3xl font-bold text-white mb-2">8.2K</div>
          <div className="text-green-400 text-sm">+10% this month</div>
        </div>

        <div className="card">
          <h2 className="text-lg font-semibold mb-4 text-white">Governance Proposals</h2>
          <div className="text-3xl font-bold text-white mb-2">24</div>
          <div className="text-gray-400 text-sm">Active proposals</div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4 text-white">Recent Activity</h2>
        <div className="card">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 hover:bg-gray-800 rounded-lg transition-colors">
              <div>
                <div className="text-white font-medium">New Governance Proposal</div>
                <div className="text-gray-400 text-sm">Proposal to increase staking rewards</div>
              </div>
              <div className="text-gray-400 text-sm">2 hours ago</div>
            </div>
            <div className="flex items-center justify-between p-4 hover:bg-gray-800 rounded-lg transition-colors">
              <div>
                <div className="text-white font-medium">Community Call</div>
                <div className="text-gray-400 text-sm">Monthly community update</div>
              </div>
              <div className="text-gray-400 text-sm">1 day ago</div>
            </div>
            <div className="flex items-center justify-between p-4 hover:bg-gray-800 rounded-lg transition-colors">
              <div>
                <div className="text-white font-medium">New Partnership</div>
                <div className="text-gray-400 text-sm">Partnership announcement with DeFi protocol</div>
              </div>
              <div className="text-gray-400 text-sm">2 days ago</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 