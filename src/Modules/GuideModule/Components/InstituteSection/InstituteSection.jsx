export default function InstituteSection() {
  return (
    <div id="instituteSection" className=" py-10 px-5 md:px-20" style={{background:"#f7f7f7"}}>
      {/* العنوان الرئيسي */}
      <h1 className="text-4xl font-bold text-orange-500 text-center mb-6">معهدنا</h1>
      
      {/* قسم نبذة عن المعهد */}
      <div className="bg-white shadow-lg rounded-xl p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">نبذة عن المعهد</h2>
        <p className="text-base text-gray-600 leading-relaxed">
          معهدنا يقدم بيئة تعليمية متميزة تجمع بين المعرفة والتكنولوجيا الحديثة، مما يساعد الطلاب على تطوير مهاراتهم وتحقيق أهدافهم الأكاديمية والمهنية.
        </p>
      </div>
      
      {/* فيديو + نص */}
      <div className="grid md:grid-cols-2 gap-6 items-center">
        <div className="w-full h-96 rounded-lg shadow-lg overflow-hidden">
          <iframe 
            className="w-full h-full"
            src="https://www.youtube.com/embed/fTsOVqkJYTw"
            title="Institute Video"
            allowFullScreen
          ></iframe>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">تعرف على معهدنا</h3>
          <p className="text-base text-gray-600 leading-relaxed">
            اكتشف المزيد عن برامجنا التعليمية، البنية التحتية الحديثة، والمرافق المتميزة التي نوفرها لطلابنا لضمان بيئة تعليمية مثالية.
          </p>
        </div>
      </div>
      
      {/* صور المعهد */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8">
        <img className="w-full rounded-lg shadow-md" src="../src/assets/imgs/InstituteSection1.jpg" alt="Institute 1" />
        <img className="w-full rounded-lg shadow-md" src="../src/assets/imgs/InstituteSection2.jpg" alt="Institute 2" />
        <img className="w-full rounded-lg shadow-md" src="../src/assets/imgs/InstituteSection4jpg.jpg" alt="Institute 3" />
      </div>
      
      {/* معلومات إضافية */}
      <div className="text-white rounded-xl p-6 mt-10 shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl" style={{background:"#ffff"}}>
        <h3 className="text-xl font-semibold mb-4" style={{color:"black"}}>لماذا تختار معهدنا؟</h3>
        <ul className="list-disc pr-5" style={{color:"#4b5563"}}>
          <li className="mb-2">تخريج الكوادر العلمية القادرة على تصميم وبرمجة وصيانة وتشغيل نظم الحاسبات والمعلومات.</li>
          <li className="mb-2">لمساهمة في استيعاب وتطوير تكنولوجيا العصر.</li>
          <li className="mb-2">الإسهام في تنمية المجتمع وتطوير أساليب الخدمات والإنتاج.</li>
          <li className="mb-2">المساهمة في تطبيق الأسلوب العلمي لتطبيقات نظم الحاسب في المجالات المختلفة.</li>
          <li className="mb-2">العمل على تزويد المجتمع بالمتخصصين في نظم المعلومات وعلوم الحاسب.</li>
        </ul>
      </div>
    </div>
  );
}
