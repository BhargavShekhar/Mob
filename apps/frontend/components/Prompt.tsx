import React, { useState } from 'react'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { useAuth } from '@clerk/nextjs'
import axios from 'axios';
import { BACKEND_URL } from '@/config';

function Prompt() {
    const { getToken } = useAuth();
    const [prompt, setPrompt] = useState("");

    const handleClick = async () => {
        const token = await getToken();
        axios.post(`${BACKEND_URL}/project`, {
            prompt
        }, {
            headers: { "Authorization": `Bearer ${token}` }
        })
    }

    return (
        <div className='flex flex-col justify-center items-center gap-2 px-4 text-black'>
            <Textarea
                className='text-white'
                onChange={(e) => setPrompt(e.target.value)}
                placeholder='Create your mobile application...'
            />
            <Button variant={'outline'} onClick={handleClick}>Send</Button>
        </div>
    )
}

export default Prompt
