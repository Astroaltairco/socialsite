type FeaturedCreatorProps = {
  name: string
  handle: string
  avatar: string
  followers: string
  engagement: string
  stakingApy: string
  totalStaked: string
  socials: {
    twitter?: string
    farcaster?: string
  }
}

export default function FeaturedCreatorCard({
  name,
  handle,
  avatar,
  followers,
  engagement,
  stakingApy,
  totalStaked,
  socials
}: FeaturedCreatorProps) {
  return (
    <div className="group relative bg-white/[0.02] rounded-2xl border border-white/5 p-6 hover:border-purple-500/20 transition-all duration-300">
      {/* Background Glow Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-pink-600/10 to-purple-600/10 rounded-2xl blur-xl" />
      </div>

      {/* Content */}
      <div className="relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-sm opacity-50 group-hover:opacity-75 group-hover:blur-md transition-all duration-300" />
              <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xl font-bold ring-2 ring-white/20 group-hover:ring-white/40 group-hover:scale-105 transition-all duration-300">
                {avatar}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white group-hover:text-purple-100 transition-colors duration-300">{name}</h3>
              <p className="text-gray-400 group-hover:text-purple-200/70 transition-colors duration-300">{handle}</p>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-2">
            {socials.twitter && (
              <a
                href={socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            )}
            {socials.farcaster && (
              <a
                href={socials.farcaster}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 12h18M3 6h18M3 18h18" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-gray-400 text-sm mb-1">Followers</p>
            <p className="text-white font-medium">{followers}</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm mb-1">Engagement</p>
            <p className="text-white font-medium">{engagement}</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm mb-1">Staking APY</p>
            <p className="text-green-400 font-medium">{stakingApy}</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm mb-1">Total Staked</p>
            <p className="text-white font-medium">{totalStaked}</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <button className="flex-1 px-3 py-2 text-gray-400 hover:text-white transition-colors text-sm font-medium">
            View
          </button>
          <button className="flex-1 px-3 py-2 bg-purple-500/10 text-purple-400 rounded-lg hover:bg-purple-500/20 transition-all duration-300 text-sm font-medium group/btn relative overflow-hidden">
            <span className="relative z-10">Stake</span>
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-200/0 via-yellow-300/50 to-yellow-200/0 opacity-0 group-hover/btn:opacity-100 blur-xl transition-opacity duration-300" />
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-200/0 via-yellow-300/30 to-yellow-200/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000" />
          </button>
        </div>
      </div>
    </div>
  )
} 