import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import {useData} from'../DataContext/DataContext '
import { ToastContainer } from "react-toastify";
export default function Students() {

   const { students, loading, error,handleDeleteStudent} = useData(); // جلب البيانات من الـ context
  
      useEffect(() => {
      console.log("📢 بيانات الأطباء:", students);
      }, [students]);
      if (error) return <p className="text-center text-red-500">حدث خطأ: {error}</p>;
      if (!Array.isArray(students)) {
      return <p className="text-center text-red-500">البيانات غير صحيحة</p>;
      }
  




  return (
    <div className='w-full p-6 rounded-lg space-y-6'>
      <ToastContainer position="top-right" autoClose={3000}  />
      <div className='flex justify-between items-center'>
        <h2 className='text-2xl font-semibold text-gray-800'>الطلاب</h2>
        <Link to="/dashboard/students/AddStudents">  
          <button className='bg-orange-500 py-3 px-5 text-white rounded-xl'>
            إضافة الطلاب
          </button>
        </Link>
      </div>

      <table className='w-full border-collapse rounded-lg'>
        <thead>
          <tr className='bg-orange-500 text-white'>
            <th className='p-3 text-right'>الاسم</th>
            <th className='p-3 text-right'>رقم الهاتف</th>
            <th className='p-3 text-right'>تاريخ الميلاد</th>
            <th className='p-3 text-right'>السنة الدراسية</th>
            <th className='p-3 text-right'>النوع</th>
            <th className='p-3 text-right'>العنوان</th>
            <th className='p-3 text-right'>الإيميل</th>
            <th className='p-3'>الإجراء</th>
          </tr>
        </thead>
        <tbody>
          {students.length > 0 ? (
            students.map((student, index) => (
              <tr key={index} className='border-b border-gray-300 hover:bg-gray-100 transition'>
                <td className='p-3'>{student.name || "غير متوفر"}</td>
                <td className='p-3'>{student.phone_number || "غير متوفر"}</td>
                <td className='p-3'>{student.birth_of_date || "غير متوفر"}</td>
                <td className='p-3'>{student.year_study || "غير متوفر"}</td>
                <td className='p-3'>{student.gender || "غير متوفر"}</td>
                <td className='p-3'>{student.address || "غير متوفر"}</td>
                <td className='p-3'>{student.email || "غير متوفر"}</td>
                <td className='p-3 flex gap-x-4 justify-center' style={{alignItems:"baseline"}}>
                <Link to="/dashboard/students/AddStudents" state={{ student }} >
                  <button className="text-blue-500 hover:text-blue-700 transition">
                  <FaEdit className="text-lg" />
                  </button>
                </Link>

            <button
            className='text-red-500 hover:text-red-700 transition'
            onClick={() => {
              console.log("Student ID:", student.id); // فحص الـ ID قبل الإرسال
              handleDeleteStudent(student.id);
            }}
            
            >
              <FaTrash className='text-lg' />
            </button>

                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center p-4">لا يوجد طلاب متاحين</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}