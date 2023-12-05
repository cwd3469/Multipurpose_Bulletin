import { useRouter } from 'next/router';
import { useCallback, useContext, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import UserInfoContext from './contexts/UserInfoContext';
import { getCookie } from 'cookies-next';

const ReactQueryClientProvider = (props: {
  children: JSX.Element | JSX.Element[];
}) => {
  const { handleTokenInfo } = useContext(UserInfoContext);
  const refreshToken = useCallback(() => {
    const signin = getCookie('authorized');
    if (signin) {
      handleTokenInfo();
    }
  }, [handleTokenInfo]);

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            cacheTime: 1800000,
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            refetchInterval: 1800000,
            retry: 1,
          },
          mutations: {
            retry: 1,
            onSettled(data: any, error, variables, context) {
              refreshToken();
            },
            onSuccess(data: any, variables, context) {
              refreshToken();
            },
          },
        },
      }),
  );
  return (
    <QueryClientProvider client={queryClient}>
      {props.children}
    </QueryClientProvider>
  );
};

export default ReactQueryClientProvider;
