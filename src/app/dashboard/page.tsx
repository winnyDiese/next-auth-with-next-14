import { getXataClient } from '@/xata';
import React from 'react';
import FormFolder from './FormFolder';

export default async function DashboardPage() {
    const xataClient = getXataClient()
    const folders = await xataClient.db.folders.getMany()
    return <div>
        <h1>Dashboard page</h1>

        <FormFolder />

        {folders.map(folder=> (
            <p key={folder.id}>{folder.name}</p>
        ))}
    </div>
}
