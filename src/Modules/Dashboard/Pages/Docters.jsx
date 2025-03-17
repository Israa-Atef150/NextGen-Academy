    import React from 'react'
    import { FaEdit, FaTrash } from 'react-icons/fa'
    import { Link } from 'react-router-dom'
    export default function Docters() {
    const data = [
        {
            song: 'The Sliding Mr. Bones (Next Stop, Pottersville)',
            artist: 'Malcolm Lockyer',
            year: '1961',
        },
        { song: 'Witchy Woman', artist: 'The Eagles', year: '1972' },
        { song: 'Shining Star', artist: 'Earth, Wind, and Fire', year: '1975' },
        ]
    return (
    <div className=' w-full p-6  rounded-lg space-y-6'>
            <div className='flex justify-between items-center'>
                <h2 className='text-2xl font-semibold text-gray-800 '>الأساتذة</h2>
                        <Link to={'/dashboard/Docters/AddDocters'}>
                        <button className='bg-orange-500 py-3 px-5 text-white rounded-xl'>
                            اضافة الأساتذة
                        </button>
                        </Link>
            </div>
            <table className='w-full border-collapse rounded-lg '>
                <thead>
                <tr className='bg-orange-500 text-white'>
                    <th className='p-3 text-right'>الأغنية</th>
                    <th className='p-3 text-right'>الفنان</th>
                    <th className='p-3 text-right'>السنة</th>
                    <th className='p-3 '>الإجراء</th>
                </tr>
                </thead>
                <tbody>
                {data.map((item, index) => (
                    <tr
                    key={index}
                    className='border-b border-gray-300 hover:bg-gray-100 transition'
                    >
                    <td className='p-3'>{item.song}</td>
                    <td className='p-3'>{item.artist}</td>
                    <td className='p-3'>{item.year}</td>
                    <td className='p-3 flex gap-x-4 justify-center'>
                        <button className='text-blue-500 hover:text-blue-700 transition'>
                        <FaEdit className='text-lg' />
                        </button>
                        <button className='text-red-500 hover:text-red-700 transition'>
                        <FaTrash className='text-lg' />
                        </button>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        )
    }
