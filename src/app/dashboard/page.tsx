import { getXataClient } from '@/xata';
import React from 'react';
import FormFolder from './FormFolder';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const schema = z.object({
    name: z.string().min(5)   
})

export default async function DashboardPage() {
    const xataClient = getXataClient()
    const folders = await xataClient.db.folders.getMany()

    
    async function createForm(formData: FormData){
        'use server'
        const parsedForm = schema.parse({
            name: formData.get('name') 
        })

        const xataClient = getXataClient()
        await xataClient.db.folders.create(parsedForm)
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
