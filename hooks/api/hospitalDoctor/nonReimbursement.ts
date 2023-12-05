import { NoneReimburseDto, NoneReimburseModifyDto } from '@components/nonReimburse/type';
import instance from '@hooks/api/instance';
import AxiosContext from '@hooks/contexts/AxiosContext';
import { transQueryString } from '@utils/transtext';
import { getCookie } from 'cookies-next';
import { ParsedUrlQuery } from 'querystring';
import { useContext } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { NON_REIMBUTSEMENT, NON_REIMBUTSEMENT_DETAIL } from './queryKey';

//비급여 등록 API POST
export const apiPostNonReimbursement = (parms: NoneReimburseDto) => {
  const token = getCookie('accessToken');
  const accessToken = typeof token === 'string' ? token : '';

  return instance({
    method: 'post',
    url: `/hospital/api/v1/non-reimbursement`,
    headers: {
      Authorization: accessToken,
    },
    data: parms,
  });
};
//비급여 등록 API GET
export const apiGetNonReimbursement = (queryString: string) => {
  const token = getCookie('accessToken');
  const accessToken = typeof token === 'string' ? token : '';
  return instance({
    method: 'get',
    url: `/hospital/api/v1/non-reimbursement?size=10${queryString}`,
    headers: {
      Authorization: accessToken,
    },
  });
};
//비급여 등록 상세 API GET
export const apiGetNonReimbursementDeteil = (nonReimbursementItemUlid: string) => {
  const token = getCookie('accessToken');
  const accessToken = typeof token === 'string' ? token : '';

  return instance({
    method: 'get',
    url: `/hospital/api/v1/non-reimbursement/${nonReimbursementItemUlid}`,
    headers: {
      Authorization: accessToken,
    },
  });
};

//비급여 등록 상세 API PUT
export const apiPutNonReimbursementDeteil = (parms: NoneReimburseModifyDto) => {
  const token = getCookie('accessToken');
  const accessToken = typeof token === 'string' ? token : '';
  const data = {
    nameKo: parms.nameKo,
    amount: parms.amount,
  };
  return instance({
    method: 'put',
    url: `/hospital/api/v1/non-reimbursement/${parms.nonReimbursementItemUlid}`,
    headers: {
      Authorization: accessToken,
    },
    data: data,
  });
};

//비급여 등록 상세 API DELETE
export const apiDeleteNonReimbursementDeteil = (nonReimbursementItemUlid: string) => {
  const token = getCookie('accessToken');
  const accessToken = typeof token === 'string' ? token : '';

  return instance({
    method: 'delete',
    url: `/hospital/api/v1/non-reimbursement/${nonReimbursementItemUlid}`,
    headers: {
      Authorization: accessToken,
    },
  });
};

/** 관리자 국내 비급여 목록 GET react query custom Hook*/
export const useNonReimbursement = (query: ParsedUrlQuery) => {
  const active = useContext(AxiosContext);
  const queryString = transQueryString(query);
  return useQuery({
    queryKey: NON_REIMBUTSEMENT(query),
    queryFn: async () => {
      active.setProgressBarDisabledFn(true);
      const data = await apiGetNonReimbursement(queryString);
      return data;
    },
  });
};

/** 관리자 국내 비급여 상세 내용 GET  react query custom Hook*/
export const useNonReimbursementDetail = (parms: string) => {
  return useQuery({
    queryKey: NON_REIMBUTSEMENT_DETAIL(parms),
    queryFn: async () => {
      const data = await apiGetNonReimbursementDeteil(parms);
      return data;
    },
  });
};

/** 관리자 국내 비급여 등록 POST react query custom Hook*/
export const usePostNonReimbursement = (query: ParsedUrlQuery) => {
  const queryClient = useQueryClient();
  return useMutation((parms: NoneReimburseDto) => apiPostNonReimbursement(parms), {
    onError: (error, variable, context) => {
      console.log(error);
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(NON_REIMBUTSEMENT(query));
    },
  });
};

/** 관리자 국내 비급여 상세 내용 수정 PUT react query custom Hook*/
export const usePutNonReimbursement = (query: ParsedUrlQuery) => {
  const queryClient = useQueryClient();
  return useMutation((parms: NoneReimburseModifyDto) => apiPutNonReimbursementDeteil(parms), {
    onError: (error, variable, context) => {
      console.log(error);
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(NON_REIMBUTSEMENT(query));
    },
  });
};

/** 관리자 국내 비급여 상세 내용 삭제 DELETE react query custom Hook*/
export const useDeleteNonReimbursement = (query: ParsedUrlQuery) => {
  const queryClient = useQueryClient();
  return useMutation((parms: string) => apiDeleteNonReimbursementDeteil(parms), {
    onError: (error, variable, context) => {
      console.log(error);
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(NON_REIMBUTSEMENT(query));
    },
  });
};
