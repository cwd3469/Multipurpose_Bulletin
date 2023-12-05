/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosResponse } from 'axios';
import React from 'react';
import { useEffect } from 'react';
interface LoadingErrorProps {
  isLoading: boolean;
  isError: boolean;
  isWarning: boolean;
  data?: AxiosResponse<any, any>;
}

interface LoadingErrorFallbackProps extends LoadingErrorProps {
  skeleton?: JSX.Element | JSX.Element | string;
  contexts: (
    info: AxiosResponse<any, any>,
  ) => JSX.Element | JSX.Element | string;
}

const LoadingErrorFallback = (props: LoadingErrorFallbackProps) => {
  const { data, isError, isLoading, isWarning, skeleton, contexts } = props;

  if (isLoading) {
    return <>{skeleton ? skeleton : <>isLoading...</>}</>;
  }
  if (isError) {
    return <>{skeleton ? skeleton : <>isError...</>}</>;
  }
  if (isWarning) {
    return <>{skeleton ? skeleton : <>isWarning...</>}</>;
  }
  if (data) {
    if (data.data.code === '0000') {
      return <>{contexts(data)}</>;
    }
    return <>{skeleton ? skeleton : <>isWarning...</>}</>;
  }
  return <>{skeleton ? skeleton : <></>}</>;
};

export const loadingErrorFallbackList = (props: LoadingErrorProps) => {
  const { data, isError, isLoading, isWarning } = props;
  const def = {
    //조제 요청
    contents: [],
    totalPages: 0,
    totalElements: 0,
    // 조제 진행
    totalInPrepareCount: 0,
    totalOutstandingCount: 0,
    // 조제 내역
    totalDeliveryPrepareCount: 0,
    totalMedicineCompleteCount: 0,
    totalMedicineCost: 0,
  };
  const info = isLoading
    ? def
    : isError
    ? def
    : isWarning
    ? def
    : data
    ? data.data.code === '0000'
      ? {
          //조제 요청
          contents: data.data.data.page.content,
          totalPages: data.data.data.page.totalPages,
          totalElements: data.data.data.page.totalElements,
          // 조제 진행
          totalInPrepareCount: data.data.data.totalInPrepareCount,
          totalOutstandingCount: data.data.data.totalOutstandingCount,
          // 조제 내역
          totalDeliveryPrepareCount: data.data.data.totalDeliveryPrepareCount,
          totalMedicineCompleteCount: data.data.data.totalMedicineCompleteCount,
          totalMedicineCost: data.data.data.totalMedicineCost,
        }
      : def
    : def;
  return info;
};

export default React.memo(LoadingErrorFallback);
