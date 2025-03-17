import React from 'react'

export default function AddEmployees() {
    return (
        <div>
        <h3>أضافه تصنيف</h3>
        <form className='space-y-4 md:space-y-6'>
            <div>
            <label
                htmlFor='email'
                className='block mb-2 text-sm font-medium  dark:text-white'
            >
                البريد الإلكتروني
            </label>
            <input
                type='email'
                id='email'
                className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
                placeholder='اضافه الاسم'
                required
            />
            </div>
        </form>
        </div>
    )
}
