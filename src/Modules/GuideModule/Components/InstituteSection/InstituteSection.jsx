export default function InstituteSection() {
    return (
      <div className="bg-[#ff7f00] bg-opacity-10 py-10 px-5 md:px-20 text-right" id="InstituteSection">
        {/* العنوان الرئيسي */}
        <h1 className="text-4xl font-bold text-center text-[#ff7f00] mb-6">معهدنا</h1>
        
        {/* قسم نبذة عن المعهد */}
        <div className="bg-white shadow-lg rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">نبذة عن المعهد</h2>
          <p className="text-gray-600 leading-relaxed">
            معهدنا يقدم بيئة تعليمية متميزة تجمع بين المعرفة والتكنولوجيا الحديثة، مما يساعد الطلاب على تطوير مهاراتهم وتحقيق أهدافهم الأكاديمية والمهنية.
          </p>
        </div>
        
        {/* فيديو + نص */}
        <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
          <div className="w-full md:w-1/2">
          <iframe 
  className="w-full h-64 rounded-xl shadow-md"
  src="https://www.youtube.com/embed/fTsOVqkJYTw"
  title="Institute Video"
  allowFullScreen
>
    
</iframe>

          </div>
          <div className="w-full md:w-1/2 text-gray-800">
            <h3 className="text-2xl font-semibold mb-3">تعرف على معهدنا</h3>
            <p className="leading-relaxed">
              اكتشف المزيد عن برامجنا التعليمية، البنية التحتية الحديثة، والمرافق المتميزة التي نوفرها لطلابنا لضمان بيئة تعليمية مثالية.
            </p>
          </div>
        </div>
        
        {/* صور المعهد */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <img src="../src/assets/imgs/InstituteSection1.jpg" alt="Institute 1" className="rounded-xl shadow-md" />
          <img src="../src/assets/imgs/InstituteSection2.jpg" alt="Institute 2" className="rounded-xl shadow-md" />
          <img src="../src/assets/imgs/InstituteSection4jpg.jpg" alt="Institute 3" className="rounded-xl shadow-md" />
        </div>
        
        {/* معلومات إضافية */}
        <div className="bg-[#ff7f00] text-white rounded-2xl p-6 md:p-10">
          <h3 className="text-xl font-semibold mb-3">لماذا تختار معهدنا؟</h3>
          <ul className="list-disc list-inside pr-5 space-y-2 text-right" dir="rtl">
            <li>كادر تدريسي متميز</li>
            <li>مناهج حديثة ومتطورة</li>
            <li>برامج تدريبية مهنية</li>
            <li>فرص عمل بعد التخرج</li>
          </ul>
        </div>
      </div>
    );
}
