import React from 'react'
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import { Button } from './ui/button'

function Appbar() {
  return (
    <div className='w-full flex justify-between p-6'>
      <h1 className='text-xl font-semibold'>Mob</h1>
      <div>
        <SignedOut>
          <div className='flex gap-4'>
            <SignInButton />
            <SignUpButton>
              <Button variant={'secondary'}>Sign up</Button>
            </SignUpButton>
          </div>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  )
}

export default Appbar
