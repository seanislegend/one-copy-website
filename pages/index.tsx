import React from 'react';
import EmailRegistration from '@/components/EmailRegistration';
import copy from '@/locales/en.json';

const IndexPage: React.FC = () => (
    <main className="flex items-center mt-12 mb-4 sm:my-0 sm:min-h-screen w-full">
        <div className="md:max-w-2xl md:mx-auto p-4 sm:p-8 lg:p-12 lg:col-span-6 lg:text-left animate-fadeInUp delay-500">
            <span className="text-sm font-semibold uppercase tracking-wide text-gray-500 sm:text-base lg:text-sm xl:text-base">
                {copy.home.intro.label}
            </span>
            <h2 className="mt-1 text-4xl tracking-tight leading-10 font-extrabold text-gray-900 sm:leading-none sm:text-6xl lg:text-5xl xl:text-6xl">
                {copy.home.intro.title[0]} <br className="hidden lg:inline xl:hidden" />
                <span className="bg-gradient-to-r from-teal-500 to-green-500 clip-text">
                    {copy.home.intro.title[1]}
                </span>
            </h2>

            <p className="mt-3 text-base text-gray-600 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                {copy.home.intro.text}
            </p>

            <EmailRegistration />
        </div>
    </main>
);

export default IndexPage;
