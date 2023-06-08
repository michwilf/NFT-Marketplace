import React, { useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { setAlert, setGlobalState, useGlobalState, setLoadingMsg } from '../store'
import { create } from 'ipfs-http-client'
import { mintNFT } from '../Blockchain.services'

const imgSrc = "https://images.squarespace-cdn.com/content/v1/5b79f57f3917ee60c0643e51/1623772963515-A1LILY2WIVU4LCKWHT1R/0_yA_YwvAHwqTmw7kD.jpeg"

const auth = 'Basic ' + Buffer.from(
    '2QhwPO2wF32a8Vo2v54ksAtUJHZ' + ':' + '92ee0ecb21eccefb4527f798c7affb50'
).toString('base64')

const client = create({
    host: 'ipfs.infura.io',
    port: '5001',
    protocol: 'https',
    headers: {
        authorization: auth
    }
})

const CreateNFT = () => {
    const [modal] = useGlobalState('modal')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [fileUrl, setFileUrl] = useState('wep-p')
    const [imgBase64, setImgBase64] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(!title || !description || !price || !fileUrl) return 
        setGlobalState('modal', 'scale-0')
        setLoadingMsg('Uploading to IPFS...' )

try {
    const created = await client.add(fileUrl)
    setLoadingMsg('Uploaded, approve transaction now...' )

    const metadataURI = `https://ipfs.infura.io/ipfs/${created.path}`
    const nft = { title, description, metadataURI, price }
    await mintNFT(nft)

    resetForm()
    setAlert('Minting completed...')
    window.location.reload()
} catch (error) {
    console.log('Error uploading files: ', error)
}

        closeModal()
    }

    const changeImage = async (e) => {
        const reader = new FileReader()
        if (e.target.files[0]) reader.readAsDataURL(e.target.files[0])
        
        reader.onload = (readerEvent) => {
            const file = readerEvent.target.result
            setImgBase64(file)
            setFileUrl(e.target.files[0])
        }
    }

    const closeModal = () => {
        setGlobalState('modal', 'scale-0')
        resetForm()
    }

    const resetForm = () => {
        setTitle('')
        setDescription('')
        setPrice('')
        setFileUrl('')
        setImgBase64(null)
    }

  return (
      <div className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50 transform transition-transform duration-300 ${modal} `}>
          <div className="bg-[#151c25] shadow-xl shadow-[#e32970] rounded-xl w-11/12 md:w-2/5 h-7/12 p-6">
              <form className="flex flex-col" onSubmit={handleSubmit}>
                  <div className="flex justify-between items-center text-gray-400">
                      <p className="font-semibold">Add NFT</p>
                      <button onClick={closeModal} type="button" className="border-0 bg-transparent focus:outline-none">
                          <FaTimes />
                      </button>
                  </div>
                  <div className='flex justify-center items-center rounded-xl mt-5'>
                      <div className="shrink-0 rounded-xl overflow-hidden h-20 w-20">
                          <img src={imgBase64 || imgSrc} alt="NFT" className="w-full h-full object-cover cursor-pointer" />
                      </div>
                  </div>

                  <div className="flex justify-between items-center bg-gray-800 rounded-xl mt-5">
                      <label className="block">
                          <span className='sr-only'>Choose Profile Photo</span>
                          <input
                              type="file"
                              accept='image/png, image/gif, image/jpeg, image/jpg'
                              className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold hover:file:bg-[#1d2631] focus:outline-none cursor-pointer focus:ring-0 "
                              onChange={changeImage}
                                required
                               />
                      </label>
                  </div>
                  
                  <div className="flex justify-between items-center bg-gray-800 rounded-xl mt-5">
                          <input
                              type="text"
                              className="block w-full text-sm text-slate-500 focus:outline-none cursor-pointer focus:ring-0 bg-transparent border-0"
                              placeholder='Title'
                              name='title'
                              onChange={(e) => setTitle(e.target.value)}
                              value={title}
                              required />
                      </div>

                      <div className="flex justify-between items-center bg-gray-800 rounded-xl mt-5">
                          <input
                              type="text"
                              className="block w-full text-sm text-slate-500 focus:outline-none cursor-pointer focus:ring-0 bg-transparent border-0"
                              placeholder='Price (ETH)'
                          min={0.01}
                          step={0.01}
                          onChange={(e) => setPrice(e.target.value)}
                            value={price}
                              name='price'
                              required />
                      </div>

                      <div className="flex justify-between items-center bg-gray-800 rounded-xl mt-5">
                          <textarea
                              type="text"
                              className="block w-full text-sm text-slate-500 focus:outline-none cursor-pointer focus:ring-0 bg-transparent border-0 h-20 resize-none"
                              placeholder="Description"
                          min={0.01}
                          step={0.01}
                          name='description'
                          onChange={(e) => setDescription(e.target.value)}
                            value={description}
                              required > </textarea>
                  </div>
                  <button className="flex justify-center items-center w-full text-md p-2 my-5 text-white shadow-lg shadow-black text-sm bg-[#e32970] hover:bg-[#bd255f] rounded-full p-2">
          Mint Now
        </button>
              </form>
          </div>
    </div>
  )
}

export default CreateNFT