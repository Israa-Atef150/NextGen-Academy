import React from 'react';

export default function From() {
    return (
        <div className="max-w-lg p-8 bg-gray-100 rounded-xl shadow-md" style={{height:"100%",width:"50%"}}>
            <h3 className="text-orange-600 font-semibold text-center">تواصل معنا</h3>
            <h2 className="text-2xl font-bold text-center mb-6">هل لديك أي استفسار؟</h2>
            <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        placeholder="الاسم"
                        className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                        required
                    />
                    <input
                        type="email"
                        placeholder="البريد الإلكتروني"
                        className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                        required
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="tel"
                        placeholder="رقم الهاتف"
                        className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                        required
                        style={{direction:"rtl"}}
                    />
                    <input
                        type="text"
                        placeholder="الموضوع"
                        className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                        required
                    />
                </div>
                <textarea
                    placeholder="اكتب رسالتك هنا..."
                    className="w-full p-3 border rounded-md h-32 resize-none focus:outline-none focus:ring-2 focus:ring-orange-400"
                    required        
                ></textarea>
                <button
                    type="submit"
                    className="w-full bg-orange-600 text-white py-3 rounded-md hover:bg-orange-700 transition"
                >
                    إرسال الآن
                </button>
            </form>
        </div>
    );
}
