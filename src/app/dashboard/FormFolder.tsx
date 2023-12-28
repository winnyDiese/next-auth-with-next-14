
import { getXataClient } from '@/xata'
import { z } from 'zod'
import React from 'react'
import { revalidatePath } from 'next/cache'

const schema = z.object({
    name: z.string().min(5)   
})

export default function FormFolder() {

    async function createForm(formData: FormData){
        'use server'
        const parsedForm = schema.parse({
            name: formData.get('name') 
        })

        const xataClient = getXataClient()
        await xataClient.db.folders.create(parsedForm)
        revalidatePath('/')
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
