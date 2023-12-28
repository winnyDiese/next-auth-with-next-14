import { getXataClient } from '@/xata'
import React from 'react'

export default function FormFolder() {

    async function createForm(formData: FormData){
        'use server'
        const name = formData.get('name')

        if(!name) return
        const xataClient = getXataClient()
        xataClient.db.folders.create({name})
    }

  return (
    <form action={createForm} className='my-6'>
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
