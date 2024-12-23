import { type FC } from 'react'

const SocialStaking: FC = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Social Staking</h1>
      <div className="grid gap-6">
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Welcome to Social Staking</h2>
          <p className="text-gray-400">
            This is where you'll be able to stake your tokens and earn rewards.
          </p>
        </div>
      </div>
    </div>
  )
}

export default SocialStaking
