"use client"
import { getXataClient } from '@/xata'
import React, { useRef } from 'react'

export default function FormFolder({handleCreateFolder}:{handleCreateFolder:(formData:FormData) => void}) {
    const ref = useRef<HTMLFormElement>(null)

    return (
        <form 
            action={(formData)=>{
                handleCreateFolder(formData)
                ref.current?.reset()
            }}
            className='my-6' 
            ref={ref}
            >
            <div >
                <label 
                    htmlFor="name"
                    className='block'
                >
                    New name
                </label>
                <div className='flex'>
                    <input 
                        type="text" 
                        placeholder='My folder...'
                        name='name'
                        className='p-2 text-sm border border-black'
                    />
                    <button className='text-white bg-blue-400 p-1 px-3'>Submit</button>
                </div>
            </div>
        </form>
    )
}
