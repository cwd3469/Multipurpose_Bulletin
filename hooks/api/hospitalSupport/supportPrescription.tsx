import instance from '@hooks/api/instance';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  FilterDateType,
  FilterHistoryPagitionType,
  FilterSupportHistoryType,
} from 'types/table';
import { SUPPORTHISTORY, SUPPORT_PRESCRIPTION } from './queryKey';
import { MedicalModifyParams } from '../hospitalDoctor/prescription';
import { useCallback } from 'react';
import { useToastContext } from '@hooks/useToastContext';
import useCodeMsgBundle from '../useCodeMsgBundle';

/**처방전 ,진료비 조회
 * GET API
 */
export const apiSupportPrescription = (prams: { ulid: string }) => {
  const token = getCookie('accessToken');
  const accessToken = typeof token === 'string' ? token : '';

  return instance({
    method: 'get',
    url: `/telemedicine/api/v2/support/telemedicine-history/${prams.ulid}/prescription`,
    headers: {
      Authorization: accessToken,
    },
  });
};

/**처방전 ,진료비 입력
 * GET API
 */
export const apiSupportTreatPrescription = (parms: {
  ulid: string;
  formData: FormData;
}) => {
  const token = getCookie('accessToken');
  const accessToken = typeof token === 'string' ? token : '';
  return instance({
    method: 'post',
    url: `/telemedicine/api/v2/support/telemedicine-history/${parms.ulid}/prescription`,
    data: parms.formData,
    headers: {
      Authorization: accessToken,
      'Content-Type': 'multipart/form-data',
    },
  });
};

/**처방전 ,진료비 수정
 * GET API
 */
export const apiSupportTreatPrescriptionModufy = (parms: {
  ulid: string;
  formData: FormData;
}) => {
  const token = getCookie('accessToken');
  const accessToken = typeof token === 'string' ? token : '';
  return instance({
    method: 'put',
    url: `/telemedicine/api/v2/support/telemedicine-history/${parms.ulid}/prescription`,
    data: parms.formData,
    headers: {
      Authorization: accessToken,
      'Content-Type': 'multipart/form-data',
    },
  });
};

/**처방전 조회 Base64 다운로드
 * GET API
 */
export const apiSupportPrescriptionDownload = (prams: {
  registrationUlid: string;
  fileInfoUlid: string;
}) => {
  const token = getCookie('accessToken');
  const accessToken = typeof token === 'string' ? token : '';

  return instance({
    method: 'get',
    url: `/telemedicine/api/v2/support/telemedicine-history/${prams.registrationUlid}/prescription/${prams.fileInfoUlid}/encoded`,
    headers: {
      Authorization: accessToken,
    },
  });
};

/**처방전 조회
 * 리엑트 쿼리 훅
 */
export const useSupportPrescription = (ulid: string) => {
  return useQuery(SUPPORT_PRESCRIPTION(ulid), async () => {
    const data = await apiSupportPrescription({ ulid: ulid });
    return data;
  });
};

/**처방전 진료비 입력
 * 리엑트 쿼리 훅
 */
export const useSupportExpRegist = () => {
  const queryClient = useQueryClient();
  const toast = useToastContext();
  const msg = useCodeMsgBundle();
  const { mutate: mutateSupportExpRegist } = useMutation(
    (prams: { ulid: string; formData: FormData }) =>
      apiSupportTreatPrescription(prams),
  );

  const medicalExpRegist = useCallback(
    (params: MedicalModifyParams) => {
      const {
        formData,
        query,
        ulid,
        handleClose,
        onPaymentSuccess,
        onPaymentFailed,
      } = params;
      mutateSupportExpRegist(
        { ulid: ulid, formData: formData },
        {
          onError: (error, variable, context) => {
            toast?.on('진료비 청구가 실패하였습니다.', 'error');
          },
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries(SUPPORTHISTORY(query));
            if (data.data.code !== '0000') {
              onPaymentFailed();
              toast?.on(msg.errMsg(data.data.code), 'error');
            } else {
              handleClose();
              onPaymentSuccess();
              toast?.on('진료비 청구가 완료되었습니다.', 'success');
            }
          },
        },
      );
    },
    [msg, mutateSupportExpRegist, queryClient, toast],
  );

  return { medicalExpRegist };
};

/**처방전 진료비 수정
 * 리엑트 쿼리 훅
 */
export const useSupportMedicalModify = () => {
  const toast = useToastContext();
  const msg = useCodeMsgBundle();
  const queryClient = useQueryClient();

  const { mutate: mutateMedicalModify } = useMutation(
    (prams: { ulid: string; formData: FormData }) =>
      apiSupportTreatPrescriptionModufy(prams),
  );
  const medicalModify = useCallback(
    (params: MedicalModifyParams) => {
      const {
        formData,
        query,
        ulid,
        handleClose,
        onPaymentSuccess,
        onPaymentFailed,
      } = params;
      mutateMedicalModify(
        { ulid: ulid, formData: formData },
        {
          onError: (error, variable, context) => {
            toast?.on('진료비 청구가 실패하였습니다.', 'error');
            handleClose();
          },
          onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries(SUPPORTHISTORY(query));
            queryClient.invalidateQueries(SUPPORT_PRESCRIPTION(ulid));
            if (data.data.code !== '0000') {
              handleClose();
              toast?.on(msg.errMsg(data.data.code), 'error');
            } else {
              if (data.data.data.result) {
                toast?.on('진료비 청구가 완료되었습니다.', 'success');
                onPaymentSuccess();
              } else {
                onPaymentFailed();
              }
            }
          },
        },
      );
    },
    [msg, mutateMedicalModify, queryClient, toast],
  );
  return { medicalModify };
};
