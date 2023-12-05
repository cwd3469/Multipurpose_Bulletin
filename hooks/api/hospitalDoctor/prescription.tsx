import instance from '@hooks/api/instance';
import { getCookie } from 'cookies-next';
import { ParsedUrlQuery } from 'querystring';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  apiDoctorOfficeTreatClose,
  apiTreatPrescription,
} from './doctorOffice';
import { HISTORY, PRESCRIPTION } from './queryKey';
import { useToastContext } from '@hooks/useToastContext';
import useCodeMsgBundle from '../useCodeMsgBundle';
import { useCallback } from 'react';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';

/**처방전 ,진료비 조회
 * GET API
 */
export const apiPrescription = (prams: { ulid: string }) => {
  const token = getCookie('accessToken');
  const accessToken = typeof token === 'string' ? token : '';

  return instance({
    method: 'get',
    url: `/telemedicine/api/v1/doctor/telemedicine-treatment/${prams.ulid}/prescription`,
    headers: {
      Authorization: accessToken,
    },
  });
};

/**처방전 ,진료비 수정
 * GET API
 */

export const apiTreatPrescriptionModufy = (parms: {
  ulid: string;
  formData: FormData;
}) => {
  const token = getCookie('accessToken');
  const accessToken = typeof token === 'string' ? token : '';
  return instance({
    method: 'put',
    url: `/telemedicine/api/v1/doctor/telemedicine-treatment/${parms.ulid}/prescription`,
    data: parms.formData,
    headers: {
      Authorization: accessToken,
      'Content-Type': 'multipart/form-data',
    },
  });
};

/**처방전 다운로드
 * GET API
 */
export const apiPrescriptionDownload = (prams: {
  registrationUlid: string;
  fileInfoUlid: string;
}) => {
  const token = getCookie('accessToken');
  const accessToken = typeof token === 'string' ? token : '';

  return instance({
    method: 'get',
    url: `/telemedicine/api/v1/doctor/telemedicine-treatment/${prams.registrationUlid}/prescription/${prams.fileInfoUlid}`,
    headers: {
      Authorization: accessToken,
    },
  });
};
/**처방전 파일 조회 Base64
 * GET API
 */
export const apiPrescriptionFileBase = (prams: {
  registrationUlid: string;
  fileInfoUlid: string;
}) => {
  const token = getCookie('accessToken');
  const accessToken = typeof token === 'string' ? token : '';

  return instance({
    method: 'get',
    url: `/telemedicine/api/v1/doctor/telemedicine-treatment/${prams.registrationUlid}/prescription/${prams.fileInfoUlid}/encoded`,
    headers: {
      Authorization: accessToken,
    },
  });
};

/**처방전 조회
 * 리엑트 쿼리 훅
 */
export const usePrescription = (ulid: string) => {
  return useQuery(PRESCRIPTION(ulid), async () => {
    const data = await apiPrescription({ ulid: ulid });
    return data;
  });
};

export interface MedicalModifyParams {
  handleClose: () => void;
  query: ParsedUrlQuery;
  ulid: string;
  onPaymentSuccess: () => void;
  onPaymentFailed: () => void;
  formData: FormData;
}
export interface MedicalEndTreatParams extends MedicalModifyParams {
  setState: () => void;
  leaveVideo?: () => void;
}

/**처방전 진료비 입력
 * 리엑트 쿼리 훅
 */
export const useMedicalExpRegist = () => {
  const toast = useToastContext();
  const msg = useCodeMsgBundle();
  const queryClient = useQueryClient();
  const router = useRouter();
  const { mutate: mutateExpRegist } = useMutation(
    (prams: { ulid: string; formData: FormData }) =>
      apiTreatPrescription(prams),
  );
  const { mutate: mutateDoctorOfficeTreatClose } = useMutation((ulid: string) =>
    apiDoctorOfficeTreatClose(ulid),
  );
  const backUrl = useCallback(() => {
    router.replace('/doctor/telemedicine/queueing');
  }, [router]);
  // 진료비 등록
  const onMedicalExpRegister = useCallback(
    (params: MedicalModifyParams) => {
      const {
        formData,
        query,
        ulid,
        handleClose,
        onPaymentSuccess,
        onPaymentFailed,
      } = params;
      mutateExpRegist(
        { ulid: ulid, formData: formData },
        {
          onError: (error, variable, context) => {
            toast?.on('진료비 청구가 실패하였습니다.', 'error');
          },
          onSuccess: (data, variables, context) => {
            if (data.data.code !== '0000') {
              toast?.on(msg.errMsg(data.data.code), 'error');
            } else {
              if (data.data.data.result) {
                toast?.on('진료비 청구가 완료되었습니다.', 'success');
                onPaymentSuccess();
              } else {
                onPaymentFailed();
              }
            }
            queryClient.invalidateQueries(HISTORY(query));
          },
        },
      );
    },
    [msg, mutateExpRegist, queryClient, toast],
  );
  // 진료 종료 후 진료비 등록
  const onClickTreatEnd = useCallback(
    (params: MedicalEndTreatParams) => {
      const { ulid, leaveVideo } = params;
      mutateDoctorOfficeTreatClose(ulid, {
        onSuccess(data, variables, context) {
          if (data.data.code !== '0000') {
            toast?.on(msg.errMsg(data.data.code), 'error');
            backUrl();
          } else {
            onMedicalExpRegister({
              ...params,
              onPaymentSuccess() {
                params.onPaymentSuccess();
                backUrl();
              },
            });
          }
        },
        onError(error, variables, context) {
          toast?.on(
            '진료 종료에 실패하였습니다.\n 잠시 후 다시 시도해주세요.',
            'error',
          );
        },
      });
      if (leaveVideo) leaveVideo();
    },
    [backUrl, msg, mutateDoctorOfficeTreatClose, onMedicalExpRegister, toast],
  );
  //  진료비 종료
  const onClickRegisterLater = (params: {
    ulid: string;
    handleClose: () => void;
    leaveVideo?: () => void;
  }) => {
    const { ulid, handleClose, leaveVideo } = params;
    mutateDoctorOfficeTreatClose(ulid, {
      onSuccess(data, variables, context) {
        if (data.data.code !== '0000') {
          toast?.on(msg.errMsg(data.data.code), 'error');
          backUrl();
        } else {
          backUrl();
          handleClose();
        }
      },
      onError(error, variables, context) {
        toast?.on(
          '진료 종료에 실패하였습니다.\n 잠시 후 다시 시도해주세요.',
          'error',
        );
      },
    });
    if (leaveVideo) {
      leaveVideo();
    }
  };
  return {
    onMedicalExpRegister,
    onClickTreatEnd,
    onClickRegisterLater,
    backUrl,
  };
};

/**처방전 진료비 수정
 * 리엑트 쿼리 훅
 */

export const useMedicalModify = () => {
  const toast = useToastContext();
  const msg = useCodeMsgBundle();
  const queryClient = useQueryClient();
  const { mutate: mutateMedicalModify } = useMutation(
    (prams: { ulid: string; formData: FormData }) =>
      apiTreatPrescriptionModufy(prams),
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
            queryClient.invalidateQueries(HISTORY(query));
            queryClient.invalidateQueries(PRESCRIPTION(ulid));
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
