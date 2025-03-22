import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Students() {
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        console.error("No token found!");
        return;
      }

      try {
        const res = await axios.get("https://ishraaq.up.railway.app/api/students", {
          headers: { "Authorization": `Bearer ${token}` }
        });

        if (res.data && Array.isArray(res.data.students)) {
          setData(res.data.students);
        } else {
          console.error("Unexpected response structure:", res.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [token]);

  return (
    <div className='w-full p-6 rounded-lg space-y-6'>
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
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr key={index} className='border-b border-gray-300 hover:bg-gray-100 transition'>
                <td className='p-3'>{item.name || "غير متوفر"}</td>
                <td className='p-3'>{item.phone_number || "غير متوفر"}</td>
                <td className='p-3'>{item.birth_of_date || "غير متوفر"}</td>
                <td className='p-3'>{item.year_study || "غير متوفر"}</td>
                <td className='p-3'>{item.gender || "غير متوفر"}</td>
                <td className='p-3'>{item.address || "غير متوفر"}</td>
                <td className='p-3'>{item.email || "غير متوفر"}</td>
                <td className='p-3 flex gap-x-4 justify-center'>
                  <Link to={`/dashboard/students/edit/${item.id}`}>
                    <button className='text-blue-500 hover:text-blue-700 transition'>
                      <FaEdit className='text-lg' />
                    </button>
                  </Link>
                  <button className='text-red-500 hover:text-red-700 transition'>
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

