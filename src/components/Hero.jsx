import React from 'react'
import Identicon from 'react-identicons'
import { setGlobalState, truncate, useGlobalState } from '../store'

const imgSrc = "https://images.squarespace-cdn.com/content/v1/5b79f57f3917ee60c0643e51/1623772963515-A1LILY2WIVU4LCKWHT1R/0_yA_YwvAHwqTmw7kD.jpeg"
const Hero = () => {
    const [connectedAccount] = useGlobalState('connectedAccount')
  return (
      <div className="flex flex-col md:flex-row w-4/5 justify-between items-center mx-auto py-10 ">
          <div className="md:w-3/6 w-full">
              <div>
              <h1 className="text-white text-5xl font-bold ">Buy and Sell <br /> Digital Arts, <br /> <span className="text-[#e32970]">NFT</span> Collections</h1>
                  <p className="text-gray-500 font-semibold text-sm mt-3 ">Mint and collect the hottest NFTs</p>
              </div>
              <div className="flex mt-5">
                  <button onClick={() => setGlobalState('modal', 'scale-100')} className='bg-[#e32970] hover:bg-[#bd255f] md:text-xs shadow-lg ring-2 ring-offset-4 ring-slate-500 hover:shadow-none cursor-pointer p-3 m-2 whitespace-nowrap rounded-full text-white'> Create NFT</button>
              </div>
              <div className="w-3/4 flex justify-between items-center mt-5">
                  <div className="text-white">
                      <p className="font-bold">123k</p>
                      <small className="text-gray-300">Users</small>
                  </div>
                  <div className="text-white">
                      <p className="font-bold">152k</p>
                      <small className="text-gray-300">Artworks</small>
                  </div>
                  <div className="text-white">
                      <p className="font-bold">200k</p>
                      <small className="text-gray-300">Artists</small>
                      </div>
              </div>
          </div>
          <div className="shadow-xl shadown-black md:w-2/5 w-full mt-10 md:mt-0 rounded-md overflow-hidden bg-gray-800">
              <img className="h-80 w-full object-cover"
                  src={imgSrc}
                  alt="Hero" 
              />
              <div className="flex justify-start items-center p-3">
                  <Identicon className="h-10 w-10 object-contain rounded-full mr-3 " string={connectedAccount} size={40} />
                  <div>
                      <p className="text-white text-center font-bold mt-2 overflow-hidden overflow-ellipsis whitespace-nowrap max-w-xs ">{connectedAccount ? truncate(connectedAccount, 4, 4, 11) : 'Connect Your Wallet'}</p>
                      <small className='text-pink-800 font-bold'>@you</small>
                  </div>
              </div>
          </div>
    </div>
  )
}

export default Hero