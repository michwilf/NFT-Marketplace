import React, { useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { setGlobalState, useGlobalState, truncate, setAlert } from '../store'
import Identicon from 'react-identicons'
import { buyNFT } from '../Blockchain.services'

const imgSrc = "https://images.squarespace-cdn.com/content/v1/5b79f57f3917ee60c0643e51/1623772963515-A1LILY2WIVU4LCKWHT1R/0_yA_YwvAHwqTmw7kD.jpeg"

const ShowNFT = () => {
    const [showModal] = useGlobalState('showModal')
    const [connectedAccount] = useGlobalState('connectedAccount')
    const [nft] = useGlobalState('nft')

    const handleNFTPurchase = async () => {
        setGlobalState('showModal', 'scale-0')
        setGlobalState('loading', {
          show: true,
          msg: 'Initializing NFT transfer...',
        })
     
        try {
          await buyNFT(nft)
          setAlert('Transfer completed...', 'green')
          window.location.reload()
        } catch (error) {
          console.log('Error transfering NFT: ', error)
          setAlert('Purchase failed...', 'red')
        }
      }
     


    const closeModal = () => {
        setGlobalState('showModal', 'scale-0')

    }

    const onChangePrice = () => {
        setGlobalState('nft', nft)
        setGlobalState('showModal', 'scale-0')
        setGlobalState('updateModal', 'scale-100')
    }



  return (
      <div className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50 transform transition-transform duration-300 ${showModal} `}>
          <div className="bg-[#151c25] shadow-xl shadow-[#e32970] rounded-xl w-11/12 md:w-2/5 h-7/12 p-6">
              <div className="flex flex-col">
                  <div className="flex justify-between items-center text-gray-400">
                      <p className="font-semibold">Add NFT</p>
                      <button onClick={closeModal} type="button" className="border-0 bg-transparent focus:outline-none">
                          <FaTimes />
                      </button>
                  </div>
                  <div className="flex justify-center items-center rounded-xl mt-2">
                      <div className="shrink-0 h-40 w-40 rounded-xl overflow-hidden">
                          <img src={nft?.metadataURI} alt={nft?.title} className="w-full h-full object-cover cursor-pointer" />
                      </div>
                  </div>
                  <div className="flex flex-col justify-start rounded-xl mt-5">
                      <h4 className="text-white font-semibold">{nft?.title}</h4>
                      <p className="text-gray-400 text-xs my-1">
                          {nft?.description}
                      </p>
                      <div className="flex justify-between items-center mt-3 text-white">
                          <div className="flex justify-start items-center">
                              <Identicon className="h-10 w-10 object-contain rounded-full mr-3 " string={nft?.owner} size={50} />
                              <div className="flex flex-col justify-center items-start">
                                  <small className="text-white font-bold">@Owner</small>
                                  <small className="text-pink-800 font-semibold">{nft?.owner ? truncate(nft.owner, 4, 4, 11) : '...'}</small>
                              </div>
                          </div>

                          <div className='flex flex-col items-end text-white'>
                              <small className="text-sm font-bold">Current Price</small>
                              <p>{nft?.cost}</p>
                          </div>
                      </div>
                  </div>
                  <div className="flex justify-between items-center space-x-2">
           {connectedAccount == nft?.owner ? (
             <button
               className="flex flex-row justify-center items-center
               w-full text-[#e32970] text-md border-[#e32970]
               py-2 px-5 rounded-full bg-transparent
               drop-shadow-xl border hover:bg-[#bd255f]
               hover:bg-transparent hover:text-white
               hover:border hover:border-[#bd255f]
               focus:outline-none focus:ring mt-5"
               onClick={onChangePrice}
             >
               Change Price
             </button>
           ) : (
             <button
               className="flex flex-row justify-center items-center
               w-full text-white text-md bg-[#e32970]
               hover:bg-[#bd255f] py-2 px-5 rounded-full
               drop-shadow-xl border border-transparent
               hover:bg-transparent hover:text-[#e32970]
               hover:border hover:border-[#bd255f]
               focus:outline-none focus:ring mt-5"
               onClick={handleNFTPurchase}
             >
               Purchase Now
             </button>
           )}
         </div>
              </div>
          </div>
    </div>
  )
}

export default ShowNFT