
import App from '@/clients/components/dashboard/Index'
import React from 'react'
import ChatBot from '@/clients/components/ChatApp/ChatBot'

const page = () => {
  return (
    <div>
      <App/>
      <ChatBot />
    </div>
  )
}

export default page