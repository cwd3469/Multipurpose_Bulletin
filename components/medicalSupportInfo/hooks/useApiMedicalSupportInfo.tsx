import {
  apiDeteteMedicalSupport,
  apiModifyMedicalSupport,
  apiPostProfileMedicalSupport,
  SUPPORTLIST,
} from '@hooks/api/hospitalAdmin/supportMgt';
import useCodeMsgBundle from '@hooks/api/useCodeMsgBundle';
import { useToastContext } from '@hooks/useToastContext';
import { birthDateFormatOff, mobileFormatOff } from '@utils/formatNumber';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { DataPagition } from 'types/table';
import {
  MedicalSupportInfoDto,
  MedicalSupportInfoModify,
  MedicalSupportInfoType,
} from '../type';

const useApiMedicalSupportInfo = (props: {
  data: MedicalSupportInfoType;
  filter: DataPagition;
  ulid?: string;
}) => {
  const { data, filter, ulid } = props;
  const [info, setInfo] = useState<MedicalSupportInfoDto>();
  const [modifyInfo, setModifyInfo] = useState<MedicalSupportInfoModify>();
  const [userId, setUserId] = useState<string>();
  const toast = useToastContext();
  const msg = useCodeMsgBundle();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate: mutateMedicalSupport } = useMutation(
    apiPostProfileMedicalSupport,
    {
      onError: (error, variable, context) => {
        toast?.on(
          '진료 지원 등록이 실패하였습니다 \n 잠시후, 다시 시도해 주세요.',
          'error',
        );
      },
      onSuccess: (data, variables, context) => {
        queryClient.invalidateQueries(SUPPORTLIST(router.query));
        if (data.data.code !== '0000') {
          toast?.on(msg.errMsg(data.data.code), 'error');
        } else {
          router.push('/hospital-admin/medical-support-mgt', undefined, {
            shallow: true,
          });
          toast?.on('진료 지원 등록이 성공하였습니다', 'success');
        }
      },
    },
  );

  const { mutate: mutateModifyMedicalSupport } = useMutation(
    apiModifyMedicalSupport,
    {
      onError: (error, variable, context) => {
        toast?.on(
          '진료 지원 수정이 실패하였습니다 \n 잠시후, 다시 시도해 주세요.',
          'error',
        );
      },
      onSuccess: (data, variables, context) => {
        queryClient.invalidateQueries(SUPPORTLIST(router.query));
        if (data.data.code !== '0000') {
          toast?.on(msg.errMsg(data.data.code), 'error');
        } else {
          router.push('/hospital-admin/medical-support-mgt', undefined, {
            shallow: true,
          });
          toast?.on('진료 지원 수정이 성공하였습니다', 'success');
        }
      },
    },
  );

  const { mutate: mutateDeteteMedicalSupport } = useMutation(
    apiDeteteMedicalSupport,
    {
      onError: (error, variable, context) => {
        toast?.on(
          '계정 삭제를 실패하였습니다 \n 잠시후, 다시 시도해 주세요.',
          'error',
        );
      },
      onSuccess: (data, variables, context) => {
        queryClient.invalidateQueries(SUPPORTLIST(router.query));
        if (data.data.code !== '0000') {
          toast?.on(msg.errMsg(data.data.code), 'error');
        } else {
          router.push('/hospital-admin/medical-support-mgt', undefined, {
            shallow: true,
          });
          toast?.on('계정 삭제를 성공하였습니다', 'success');
        }
      },
    },
  );

  /**진료 지원 등록 */
  const onClickDoctorInfo = useCallback(() => {
    if (info) {
      mutateMedicalSupport(info);
    }
  }, [info, mutateMedicalSupport]);

  /**진료 지원 수정 */
  const onClickDoctorInfoModify = useCallback(() => {
    if (modifyInfo) {
      if (userId) {
        const dto = {
          info: modifyInfo,
          ulid: userId,
        };
        mutateModifyMedicalSupport(dto);
      }
    }
  }, [modifyInfo, mutateModifyMedicalSupport, userId]);

  /**  진료 지원 정보 삭제 기능*/
  const onClickDoctorInfoDelete = useCallback(() => {
    if (userId) {
      mutateDeteteMedicalSupport(userId);
    }
  }, [mutateDeteteMedicalSupport, userId]);

  useEffect(() => {
    const dto: MedicalSupportInfoDto = {
      medicalSupportAccountId: data.userId,
      password: data.tempPw,
      mobileNum: mobileFormatOff(data.mobile),
      nameKo: data.name,
      birthday: birthDateFormatOff(data.birthDate),
      gender: data.gender,
    };

    const modify: MedicalSupportInfoModify = {
      medicalSupportAccountId: data.userId,
      mobileNum: mobileFormatOff(data.mobile),
      nameKo: data.name,
      birthday: birthDateFormatOff(data.birthDate),
      gender: data.gender,
      accountNonLocked: data.active,
    };

    setInfo(dto);
    setModifyInfo(modify);
  }, [data]);

  useEffect(() => {
    if (ulid) setUserId(ulid);
  }, [ulid]);

  return {
    onClickDoctorInfo,
    onClickDoctorInfoModify,
    onClickDoctorInfoDelete,
  };
};

export default useApiMedicalSupportInfo;
