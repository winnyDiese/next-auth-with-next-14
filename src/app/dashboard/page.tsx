import { getXataClient } from '@/xata';
import React from 'react';
import FormFolder from './FormFolder';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

const schema = z.object({
    name: z.string().min(5)   
})

export default async function DashboardPage() {
    const {userId} = auth()
    const xataClient = getXataClient()

    if(!userId) redirect('/')

    const folders = await xataClient.db.folders.filter({
        userId
    }).getMany()

    
    async function createForm(formData: FormData){
        'use server'
        const parsedForm = schema.parse({
            name: formData.get('name') 
        })

        const newRecord = {...parsedForm, userId}
        if(!userId) return

        const xataClient = getXataClient()
        await xataClient.db.folders.create(newRecord)
        revalidatePath('/')
    }

    return <div>
        <h1>Dashboard page</h1>

        <FormFolder handleCreateFolder={createForm} />

        {folders.map(folder=> (
            <p key={folder.id}>{folder.name}</p>
        ))}
    </div>
}
