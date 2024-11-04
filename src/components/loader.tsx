import Image from 'next/image'
import React from 'react'
import logo from '../assets/total-secure.png'

export default function Loader() {
  return (
    <div className="flex h-[500px] w-full flex-1 items-center justify-center">
      <Image
        src={logo}
        alt="Loading"
        height={50}
        width={50}
        className="animate-pulse duration-100"
      />
    </div>
  )
}

export const PageLoader = () => (
  <div
    className="flex flex-1 items-center justify-center"
    style={{ width: '100%', height: `calc(100vh - 200px)` }}
  >
    <Image
      src={logo}
      alt="Loading"
      height={50}
      width={50}
      className="animate-pulse duration-100"
    />
  </div>
)
