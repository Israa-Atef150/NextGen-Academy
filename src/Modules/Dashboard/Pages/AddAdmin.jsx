import React, { useState } from 'react';
import {useData}from'../DataContext/DataContext '
import axios from 'axios';

export default function AddAdmin() {
    const { createAdmin } = useData();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createAdmin(formData);
            alert("✅ تمت إضافة المشرف بنجاح!");
        } catch (error) {
            alert("❌ فشل في إضافة المشرف");
        }
    };

    return (
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4 text-right">إضافة مشرف</h3>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 text-right"
                    placeholder="الاسم"
                    required
                />

                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 text-right"
                    placeholder="البريد الإلكتروني"
                    required
                />

                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 text-right"
                    placeholder="كلمة المرور"
                    required
                />

                <input
                    type="text"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 text-right"
                    placeholder="الدور (Admin)"
                    required
                />

                <button type="submit" className="bg-green-500 text-white p-2 rounded-lg w-full">
                    إضافة
                </button>
            </form>
        </div>
    );
}
