import { useState } from 'react'

function App() {

  return (
    <>
    <main className='p-2 flex gap-1 h-screen'>
      <div className="bg-black h-full w-1/2 rounded-2xl relative">
        <div className="code"></div>
        <div className="text-black absolute bottom-0 right-0 mr-10 mb-10 px-5 py-2.5 bg-white rounded-2xl text-center cursor-pointer select-none">Review</div>
      </div>
      <div className="bg-gray-600 h-full w-1/2 rounded-2xl">

      </div>
    </main>
    </>
  )
}

export default App
