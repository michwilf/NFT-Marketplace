import React from 'react'
import timelessLogo from '../assets/timeless.png'
import { connectWallet } from '../Blockchain.services'
import { truncate, useGlobalState } from '../store'

const Header = () => {
  const [connectedAccount] = useGlobalState('connectedAccount')
    return (
      <div className="w-4/5 flex justify-between md:justify-center items-center py-4 mx-auto">
      <div className="md:flex-[0.5] flex-initial justify-center items-center">
          <img className="w-32 cursor-pointer" src={timelessLogo} alt="Timeless Logo" />
            </div>
            <ul className='md:flex-[0.5] md:flex hidden justify-between items-center'>
                <li className="inline-block md:ml-6 mr-4 cursor-pointer"> <a href="#" className="text-white hover:text-gray-300">Market</a> </li>
                <li className="inline-block md:ml-6 mr-4 cursor-pointer"> <a href="#" className="text-white hover:text-gray-300">Artists</a> </li>
                <li className="inline-block md:ml-6 mr-4 cursor-pointer"> <a href="#" className="text-white hover:text-gray-300">Features</a> </li>
                <li className="inline-block md:ml-6 mr-4 cursor-pointer"> <a href="#" className="text-white hover:text-gray-300">Community</a> </li>
                
            </ul>

        {connectedAccount ? (
          <button onClick={connectWallet} className='bg-[#e32970] hover:bg-[#bd255f] md:text-xs shadow-lg ring-2 ring-offset-4 ring-slate-500 hover:shadow-none cursor-pointer p-3 m-8 whitespace-nowrap rounded-full text-white'>
                {truncate(connectedAccount, 4, 4, 11)}
            </button>
        ): (
            <button onClick={connectWallet} className='bg-[#e32970] hover:bg-[#bd255f] md:text-xs shadow-lg ring-2 ring-offset-4 ring-slate-500 hover:shadow-none cursor-pointer p-3 m-8 whitespace-nowrap rounded-full text-white'>
                Connect Wallet
            </button>
            )}
            </div>
  )
}

export default Header