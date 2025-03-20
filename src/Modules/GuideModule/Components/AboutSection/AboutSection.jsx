import React from "react";

const AboutSection = () => {
  return (
    <section className="py-20 " >
      <div className=" mx-auto px-6 lg:px-12">
        <div className="flex flex-col-reverse md:flex-row-reverse items-center text-right gap-10">
          <div className="md:w-1/2">
            <h6 className="text-orange-600 text-xl font-semibold uppercase mb-3">لمحة عنا</h6>
            <h2 className="text-5xl font-bold text-gray-900 leading-snug mb-6">التعليم بطرق حديثة ومبتكرة</h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              نؤمن بأن التعلم هو رحلة ممتعة تبدأ بالإبداع والابتكار. لذلك، نقدم تجربة تعليمية
              متطورة تعتمد على أحدث الأساليب والتقنيات لمساعدة الطلاب على تحقيق أقصى استفادة.
            </p>
            <button className="bg-orange-600 text-white font-semibold py-3 px-8 text-lg transition duration-300 rounded-lg hover:bg-orange-700 shadow-lg">
              اكتشف المزيد
            </button>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img
              src="src/assets/imgs/about1.jpg"
              alt="التعليم الحديث"
              className="w-full max-w-md md:max-w-lg rounded-xl shadow-xl object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
