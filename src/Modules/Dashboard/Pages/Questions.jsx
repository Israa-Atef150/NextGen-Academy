import React from 'react';
import { useData } from '../DataContext/DataContext '
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { ToastContainer } from "react-toastify";

export default function Questions() {
const { questions, error, handleDeletegetQuestions } = useData();

if (error) return <p className="text-center text-red-500">حدث خطأ: {error}</p>;

return (
<div className='w-full p-6 rounded-lg space-y-6'>
    <ToastContainer position="top-right" autoClose={3000} />
    <div className='flex justify-between items-center'>
        <h2 className='text-2xl font-semibold text-gray-800'>الاسئله</h2>
        <Link to={'/dashboard/Questions/AddQuestions'}>
            <button className='bg-orange-500 py-3 px-5 text-white rounded-xl'>
                اضافة الاسئله
            </button>
        </Link>
    </div>
    <div className="overflow-auto max-h-[780px] border rounded-lg" style={{ direction: 'ltr' }}>
        <table className='w-full border-collapse rounded-lg' style={{ direction: 'rtl' }}>
            <thead>
                <tr className='bg-orange-500 text-white'>
                    <th className='p-3'>معرف السؤال</th>
                    <th className='p-3'>محتوي سؤال</th>
                    <th className='p-3'>الاجابه الصحيحه</th>
                    <th className='p-3'>الاجابات</th>
                    <th className='p-3'>الإجراء</th>
                </tr>
            </thead>
            <tbody>
                {questions.length > 0 ? (
                    questions.map((question, index) => (
                        <tr key={index} className='border-b border-gray-300 hover:bg-gray-100 transition'>
                            <td className='p-3' style={{ textAlign: "center" }}>{question.id}</td>
                            <td className='p-3' style={{ textAlign: "center" }}>{question.content || 'غير متوفر'}</td>
                            <td className='p-3' style={{ textAlign: "center" }}>{question.correct_answer.content || 'غير متوفر'}</td>
                            <td className='p-3' style={{ textAlign: "center" }}>
                                {question.answers?.length > 0 ? (
                                    <ul className="list-disc list-inside">
                                        {question.answers.map((answer) => (
                                            <li key={answer.id} className="text-gray-700">
                                                {answer.content}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <span className="text-gray-500">لا توجد إجابات</span>
                                )}
                            </td>
                            <td className='p-3 flex gap-x-4 justify-center' style={{ alignItems: "baseline" }}>
                                <Link to={'/dashboard/Questions/AddQuestions'} state={question}>
                                    <button className='text-blue-500 hover:text-blue-700 transition'>
                                        <FaEdit className='text-lg' />
                                    </button>
                                </Link>
                                <button
                                    className='text-red-500 hover:text-red-700 transition'
                                    onClick={() => question.id && handleDeletegetQuestions(question.id)}
                                >
                                    <FaTrash className='text-lg' />
                                </button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="5" className="text-center p-4 text-gray-500">
                            لا توجد امتحانات حالياً.
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    </div>
</div>
);
}
