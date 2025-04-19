import React from 'react'
import { Button } from './ui/button'
import { Download } from 'lucide-react'

function Header({DownloadIcon}) {
  return (
    <div className='px-6  shadow-sm border flex justify-between items-center'>
        <img src='/logo.png' className='h-[70px] '/>
        <Button className="flex gap-2 items-center" onClick={()=>DownloadIcon(Date.now())}>
           <Download className='h-4 w-4'/> Download</Button>
    </div>
  )
}

export default Header