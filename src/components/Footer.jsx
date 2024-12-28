import React from 'react'

function Footer() {
    return (
        <div>
            <footer className="bg-slate-900">
                <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
                    <div className="sm:flex sm:items-center sm:justify-between">
                        <div className="flex justify-center sm:justify-start gap-6 items-center">
                            <img src="/logo.png" width={50} height={10} />
                            <h2 className='font-semibold text-xl text-gray-100'>WheelDeal</h2>
                        </div>

                        <p className="mt-4 text-center text-sm text-gray-500 lg:mt-0 lg:text-right dark:text-gray-300">
                            Copyright &copy; 2025. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Footer