// import { useNavigate } from 'react-router-dom'

interface Creator {
  name: string
  handle: string
  followers: string
  engagement: string
  stakingApy: string
  totalStaked: string
  stakersCount: string
  imageUrl?: string
}

interface CreatorsTableProps {
  creators: Creator[]
  onProfileClick: (creator: Creator) => void
}

// Helper function to format numbers with commas
const formatNumber = (num: string) => {
  return num.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

const CreatorsTable = ({ creators, onProfileClick }: CreatorsTableProps) => {
  return (
    <div className="bg-[#0A0A1B] rounded-b-2xl border border-t-0 border-white/5">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-white/5">
              <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-gray-400 w-[280px]">
                Creator
              </th>
              <th scope="col" className="px-6 py-4 text-right text-sm font-semibold text-gray-400 w-[120px]">
                Followers
              </th>
              <th scope="col" className="px-6 py-4 text-right text-sm font-semibold text-gray-400 w-[100px]">
                Engagement
              </th>
              <th scope="col" className="px-6 py-4 text-right text-sm font-semibold text-gray-400 w-[100px]">
                Staking APY
              </th>
              <th scope="col" className="px-6 py-4 text-right text-sm font-semibold text-gray-400 w-[140px]">
                Total Staked
              </th>
              <th scope="col" className="px-6 py-4 text-right text-sm font-semibold text-gray-400 w-[120px]">
                Stakers
              </th>
              <th scope="col" className="px-6 py-4 text-center text-sm font-semibold text-gray-400 w-[180px]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {creators.map((creator, index) => (
              <tr
                key={index}
                onClick={() => onProfileClick(creator)}
                className="hover:bg-white/[0.02] cursor-pointer transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                        {creator.name[0]}
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-white">{creator.name}</div>
                      <div className="text-sm text-gray-400">{creator.handle}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white text-right">
                  {formatNumber(creator.followers.replace(/[^\d]/g, ''))}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white text-right">
                  {creator.engagement}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <span className="text-sm text-green-400">{creator.stakingApy}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white text-right">
                  {formatNumber(creator.totalStaked.replace(/[^\d]/g, ''))} SOCIAL
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white text-right">
                  {formatNumber(creator.stakersCount.replace(/[^\d]/g, ''))}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex justify-center gap-2">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        onProfileClick(creator);
                      }}
                      className="px-3 py-1.5 text-gray-400 hover:text-white transition-colors text-sm font-medium"
                    >
                      View
                    </button>
                    <button 
                      onClick={(e) => e.stopPropagation()}
                      className="px-3 py-1.5 bg-purple-500/10 text-purple-400 rounded-lg hover:bg-purple-500/20 transition-all duration-300 text-sm font-medium group/btn relative overflow-hidden"
                    >
                      <span className="relative z-10">Stake</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-yellow-200/0 via-yellow-300/50 to-yellow-200/0 opacity-0 group-hover/btn:opacity-100 blur-xl transition-opacity duration-300" />
                      <div className="absolute inset-0 bg-gradient-to-r from-yellow-200/0 via-yellow-300/30 to-yellow-200/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CreatorsTable 