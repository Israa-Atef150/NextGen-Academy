import React from 'react'

export default function LearningPath() {
  return (
    <section className="mt-16 flex flex-col md:flex-row items-center justify-center gap-10 px-6 md:px-16 py-12">
      {/* الصور مع اختلاف المستوى */}
      <div className="relative flex gap-6">
        <img
          src="src/assets/imgs/learn1.jpg"
          alt="طالب مبتسم"
          className="w-72 h-96 object-cover rounded-lg shadow-lg relative top-10"
        />
        <img
          src="src/assets/imgs/learn2.jpg"
          alt="طالبة في المكتبة"
          className="w-72 h-96 object-cover rounded-lg shadow-lg relative -top-10"
        />
      </div>

      {/* النص */}
      <div className="text-right max-w-lg">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          تعلم وطور مهاراتك
        </h2>
        <p className="text-gray-600 text-lg mb-4">
          استثمر في مستقبلك من خلال التعلم المستمر وتطوير مهاراتك الشخصية
          والمهنية. نوفر لك بيئة تعليمية متكاملة لمساعدتك على تحقيق طموحاتك.
        </p>
        <a
          href="#"
          className="text-white font-semibold bg-orange-500 hover:bg-orange-600 transition duration-300 px-5 py-2 rounded-md inline-block"
        >
          اكتشف المزيد →
        </a>
      </div>
    </section>
  )
}
