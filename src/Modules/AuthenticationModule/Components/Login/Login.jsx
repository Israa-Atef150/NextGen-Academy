import React from 'react';
import './Login.css';

export default function Login() {
  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900 background">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto  lg:py-0 text-right" dir="rtl">
        <a href="#" className="flex items-center gap-x-2 mb-6 text-2xl font-semibold text-gray-900 dark:text-white flex-row-reverse">
</a>

        <div className="w-full bg-gray-900 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-900 dark:border-gray-700">

            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                تسجيل الدخول إلى حسابك
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">البريد الإلكتروني</label>
                  <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
                </div>
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">كلمة المرور</label>
                  <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>
                <div className="flex items-center justify-between flex-row-reverse">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required />
                    </div>
                    <div className="mr-3 text-sm">
                      <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">تذكرني</label>
                    </div>
                  </div>
                  <a href="forgetpass" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">
                    هل نسيت كلمة السر؟
                  </a>
                </div>
                <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                  تسجيل دخول
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  ليس لديك حساب حتى الآن؟ <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">إنشاء حساب</a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
