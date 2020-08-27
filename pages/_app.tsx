import React, {useEffect} from 'react';
import {AppProps} from 'next/app';
import Head from 'next/head';
import {DefaultSeo} from 'next-seo';
import ReactGA from 'react-ga';
import copy from '@/locales/en.json';
import '@/styles/global.css';

const CustomApp: React.FC<AppProps> = ({Component, pageProps}: AppProps) => {
    useEffect(() => {
        ReactGA.initialize(process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID);
        ReactGA.pageview(window.location.pathname + window.location.search);
    }, []);

    return (
        <>
            <Head>
                <meta content="width=device-width, initial-scale=1" name="viewport" />
            </Head>
            <DefaultSeo {...copy.seo} />
            <Component {...pageProps} />
        </>
    );
};

export default CustomApp;
