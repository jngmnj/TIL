'use client'
import { User } from '@prisma/client';
import React, { useState } from 'react'

interface ChatClientProps {
    currentUser?: User | null;
}
const  ChatClient = ({currentUser}: ChatClientProps) => {
    const [receiver, setReceiver] =  useState({
        receiverId: "",
        receiverName: "",
        receiverImage: "",
    });
    const [layout, setLayout] = useState(false);
  return (
    <main>
        <div className='grid grid-cols-[1fr] md:grid-cols-[300px_1fr]' >
            {/* md보다 클때는 둘다 보여야함 */}
            {/* md보다 작고  layout이 true일때는 contact안보임 */}
            <section className={`md:flex ${layout && 'hidden'}`}>
                Contact Component
            </section>
            <section className={`md:flex ${!layout && 'hidden'}`}>
                Chat Component
            </section>
        </div>
        
    </main>
  )
}

export default  ChatClient
