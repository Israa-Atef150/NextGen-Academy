import React from 'react';

export default function Register() {
  return (
    <section className="bg-gray-50 dark:bg-gray-900  flex items-center justify-center p-6" style={{height:"100%"}} dir="rtl">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white text-center">إنشاء حساب</h1>
        
        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-900 dark:text-white">الاسم</label>
            <input type="text" name="name" id="name" autoComplete="name" required
              className="w-full p-2.5 mt-1 border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500" 
              placeholder="أدخل اسمك" />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-900 dark:text-white">البريد الإلكتروني</label>
            <input type="email" name="email" id="email" autoComplete="email" required
              className="w-full p-2.5 mt-1 border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500" 
              placeholder="name@company.com" />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-900 dark:text-white">كلمة المرور</label>
            <input type="password" name="password" id="password" autoComplete="current-password" required
              className="w-full p-2.5 mt-1 border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500" 
              placeholder="••••••••" />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input id="remember" type="checkbox" className="w-4 h-4 border-gray-300 rounded focus:ring-blue-500" required />
              <label htmlFor="remember" className="ml-2 text-sm text-gray-500 dark:text-gray-300">تذكرني</label>
            </div>
            <a href="forgetpass" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">هل نسيت كلمة السر؟</a>
          </div>
          
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg focus:ring-4 focus:ring-blue-300">
            تسجيل دخول
          </button>
          
          <p className="text-sm text-center text-gray-500 dark:text-gray-400">
            ليس لديك حساب حتى الآن؟ <a href="#" className="font-medium text-blue-600 hover:underline dark:text-blue-500">إنشاء حساب</a>
          </p>
        </form>
      </div>
    </section>
  );
}
