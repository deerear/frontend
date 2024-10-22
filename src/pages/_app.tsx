import '../app/globals.css';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { config } from '@fortawesome/fontawesome-svg-core';
import type { Page } from '~/shared/types';
config.autoAddCss = false;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2, // 실패 시 재시도 횟수
      refetchOnWindowFocus: false, // 창이 포커스를 얻을 때 리패칭할지 여부
      staleTime: 5 * 60 * 1000 // 데이터가 신선한 상태로 간주되는 시간 (5분)
    }
  }
});

export default function App({ Component, pageProps }: AppProps & { Component: Page }) {
  return (
    <QueryClientProvider client={queryClient}>
      <div className='container'>
        {Component.layout ? Component.layout(<Component {...pageProps} />) : <Component {...pageProps} />}
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
