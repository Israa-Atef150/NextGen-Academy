import React from "react";

export default function CoreValues() {
  return (
    <section className="bg-[#f8fafc] py-12 px-6 md:px-20">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        {/* القسم الأول */}
        <div>
          <span className="text-orange-600 font-medium flex items-center">
             القيم الأساسية
          </span>
          <h2 className="text-4xl font-bold text-gray-900 mt-2">جولة خاصة في الحرم الجامعي</h2>
          <p className="text-gray-700 mt-4 leading-relaxed">
            نحن نقدم تجربة تعليمية فريدة من نوعها، حيث يمكن للطلاب استكشاف الحرم الجامعي والتعرف على مرافقنا الحديثة.
          </p>
          <p className="text-gray-700 mt-2 leading-relaxed">
            نسعى جاهدين لتوفير بيئة تعليمية متميزة تُمكّن الطلاب من تحقيق أقصى إمكاناتهم الأكاديمية والشخصية.
          </p>
        </div>
        <div>
          <img
            src="src/assets/imgs/InstituteSection1.jpg"
            alt="حفل التخرج"
            className="w-full h-[300px] md:h-[400px] object-cover rounded-lg shadow-md"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-center mt-12">
        <div>
          <img
            src="src/assets/imgs/InstituteSection4jpg.jpg"
            alt="قاعة المحاضرات"
            className="w-full h-[300px] md:h-[400px] object-cover rounded-lg shadow-md"
          />
        </div>
        <div>
          <span className="text-orange-600 font-medium flex items-center">
             القيم الأساسية
          </span>
          <h2 className="text-4xl font-bold text-gray-900 mt-2">حفل التخرج</h2>
          <p className="text-gray-700 mt-4 leading-relaxed">
            نحن نحتفل بإنجازات طلابنا في حفل التخرج السنوي، حيث يتوج مجهودهم وسعيهم نحو النجاح.
          </p>
          <p className="text-gray-700 mt-2 leading-relaxed">
            يتيح حفل التخرج للطلاب فرصة مشاركة فرحتهم مع عائلاتهم وأصدقائهم أثناء الانتقال إلى مرحلة جديدة من حياتهم المهنية والأكاديمية.
          </p>
        </div>
      </div>
    </section>
  );
}
