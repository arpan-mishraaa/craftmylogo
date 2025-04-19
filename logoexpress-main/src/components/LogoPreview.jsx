import { UpdateStorageContext } from '@/context/UpdateStorageContext';
import axios from 'axios';
import html2canvas from 'html2canvas';
import { icons } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react'

const BASE_URL='https://craftMyLogo.com'

function LogoPreview({downloadIcon}) {

    const [storageValue,setStorageValue]=useState();
    const {updateStorage,setUpdateStorage}=useContext(UpdateStorageContext);

    useEffect(()=>{
        const storgeData=JSON.parse(localStorage.getItem('value'));
        setStorageValue(storgeData);
    },[updateStorage])

    useEffect(()=>{

        if(downloadIcon)
        {
            downloadPngLogo();
        }
    },[downloadIcon])

    /**
     * Used to download the Logo in png format
     */
    const downloadPngLogo=()=>{
         const downloadLogoDiv=document.getElementById('downloadLogoDiv');

         html2canvas(downloadLogoDiv,{
            backgroundColor:null
         }).then(canvas=>{
            const pngImage=canvas.toDataURL('image/png');
            const downloadLink=document.createElement('a');
            downloadLink.href=pngImage;
            downloadLink.download='Tubeguruji_Logo_Epxress.png';
            downloadLink.click();
         })

    }


    const Icon=({name,color,size,rotate})=>{
        const LucidIcon=icons[name];
        if(!LucidIcon)
        {
            return ;
        }
        return <LucidIcon color={color} size={size}
        style={{
            transform:`rotate(${rotate}deg)`
        }}
        />
    }
  return (
    <div className='flex items-center justify-center
      h-screen '>
        <div className='h-[500px] w-[500px]
        bg-gray-50 outline-dotted outline-gray-300'
        style={{
            padding:storageValue?.bgPadding
        }}
        >
            <div 
                id="downloadLogoDiv"
            className='h-full w-full flex items-center justify-center'
            style={{
                borderRadius:storageValue?.bgRounded,
                background:storageValue?.bgColor,
            }}
            >
               {storageValue?.icon?.includes('.png')?
                <img src={"/api/png/"+storageValue?.icon}
                style={{
                    height:storageValue?.iconSize,
                    width:storageValue?.iconSize,
                    transform:`rotate(${storageValue.iconRotate}deg)`
                }}
                />:  
                <Icon name={storageValue?.icon} 
                color={storageValue?.iconColor}
                size={storageValue?.iconSize}
                rotate={storageValue?.iconRotate}
                /> 
            }
               

               
            </div>
        </div>
    </div>
  )
}

export default LogoPreview