    import React from "react";

    export default function EducationSection() {
    return (
    <section className="relative flex flex-col md:flex-row items-center bg-[#f0f7ed] py-24 px-6 md:px-20">
        <div className="relative w-full md:w-3/5 flex justify-end">
        {/* الصورة */}
        <img
            src="src/assets/imgs/Section.jpg"
            alt="فعاليات الجامعة"
            className="w-full h-[400px] rounded-lg object-cover"
        />
        {/* الكارد فوق جزء من الصورة */}
        <div className="bg-white shadow-xl p-6 md:p-10 rounded-lg md:w-[75%] absolute top-1/2 left-[-50%] transform -translate-y-1/2 z-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">فعاليات الخريجين العالمية</h2>
            <p className="text-gray-700 mb-4 text-base leading-relaxed">
            توفر جامعة كلغن تجربة تعليمية داعمة، بدءًا من تطوير خطة أكاديمية وحتى التخرج.
            يحصل طلاب جامعة كلغن على درجات البكالوريوس والماجستير في إدارة الأعمال، والتعليم، والعلوم الصحية، والتمريض.
            </p>
            <button className="bg-orange-500 text-white px-6 py-2 rounded-full text-base font-semibold hover:bg-orange-600 transition-all">
            اكتشف المزيد
            </button>
        </div>
        </div>
    </section>
    );
    }