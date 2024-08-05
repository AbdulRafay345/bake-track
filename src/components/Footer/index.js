import React from 'react'

export default function Footer() {

    const year = new Date().getFullYear()

    return (
        <>
            <p className='text-center bg-primary text-white'>
                &copy;{year}. All Rights Reserved.
            </p>
        </>
    )
}
