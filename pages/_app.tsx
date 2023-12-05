import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import Script from 'next/script';
import { ThemeProvider } from '@mui/material';
import { Global } from '@emotion/react';
import { Hydrate } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import reset from '@styles/reset';
import globals from '@styles/globals';
import { theme } from '@styles/theme';
import Head from 'next/head';
import { ToastContextProvider } from '@hooks/useToastContext';
import { LicenseInfo } from '@mui/x-license-pro';
import { UserInfoProvider } from '@hooks/contexts/UserInfoContext';
import { useRouter } from 'next/router';
import * as gtag from '@utils/gtag';
import { AxiosProvider } from '@hooks/contexts/AxiosContext';
import { GeneralProgresBarProvider } from '@hooks/contexts/GeneralProgresBarContext';
import ReactQueryClientProvider from '@hooks/ReactQueryClientProvider';

LicenseInfo.setLicenseKey(`${process.env.NEXT_PUBLIC_MUI_PRO_KEY}`);

function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  useEffect(() => storePathValues, [router.asPath]);

  function storePathValues() {
    const storage = globalThis?.sessionStorage;

    if (!storage) return;
    const prevPath = storage.getItem('currentPath');
    if (prevPath) {
      storage.setItem('prevPath', prevPath);
    }
    storage.setItem('currentPath', globalThis.location.pathname);
  }

  useEffect(() => {
    const handleRouteChange = (url: URL) => {
      gtag.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    router.events.on('hashChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
      router.events.off('hashChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
 window.dataLayer = window.dataLayer || [];
 function gtag(){dataLayer.push(arguments);}
 gtag('js', new Date());
 gtag('config', '${gtag.GA_TRACKING_ID}', {
   page_path: window.location.pathname,
 });
`,
        }}
      />
      <ToastContextProvider>
        <UserInfoProvider>
          <GeneralProgresBarProvider>
            <ReactQueryClientProvider>
              <Hydrate state={pageProps.dehydratedProps}>
                <ReactQueryDevtools initialIsOpen={true} />
                <Global styles={reset} />
                <Global styles={globals} />
                <AxiosProvider>
                  <ThemeProvider theme={theme}>
                    <Head>
                      <meta charSet="utf-8" />
                      <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no"
                      />
                      <meta name="description" content="wau" />
                      <meta name="keywords" content="- - 서비스" />
                      <meta name="description" content="- - 서비스" />
                      <title>- - 앱</title>
                    </Head>
                    <Component {...pageProps} />
                  </ThemeProvider>
                </AxiosProvider>
              </Hydrate>
            </ReactQueryClientProvider>
          </GeneralProgresBarProvider>
        </UserInfoProvider>
      </ToastContextProvider>
    </>
  );
}

export default App;
