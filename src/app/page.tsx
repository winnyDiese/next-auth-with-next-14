import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

export default function Home() {
  const {userId} = auth()
  if(userId) {
    redirect("/dashbord")
  }

  return (
    <main className="">
      
      <h1>Next.js Auth Tutoriel</h1>

    </main>
  )
}
