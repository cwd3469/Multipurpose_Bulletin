import { useToastContext } from '@hooks/useToastContext';
import { forinArr } from '@utils/file';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { ErrorType } from 'types/login';
import {
  MedicalSupportErrorType,
  MedicalSupportInfoType,
  MedicalSupportInfoDtoGet,
} from '../type';

interface UseMedicalSupportInfoType {
  modifyData?: MedicalSupportInfoDtoGet;
}

const useMedicalSupportInfo = (props: UseMedicalSupportInfoType) => {
  const { modifyData } = props;
  const router = useRouter();
  const { userId } = router.query;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const originInfo: MedicalSupportInfoType = {
    tempPw: '',
    userId: '',
    name: '',
    birthDate: '',
    mobile: '',
    gender: '1',
    active: true,
  };
  const errMsg: MedicalSupportErrorType = {
    userId: { msg: '', boo: false },
    tempPw: { msg: '', boo: false },
    name: { msg: '', boo: false },
    birthDate: { msg: '', boo: false },
    mobile: { msg: '', boo: false },
    gender: { msg: '', boo: false },
  };
  const [supportInfo, setDoctorInfo] =
    useState<MedicalSupportInfoType>(originInfo);
  const [modifyInfo, setModifyInfo] = useState<MedicalSupportInfoType>();
  const [supportErr, setSupportErr] = useState<MedicalSupportErrorType>(errMsg);
  const [supportDisable, setSupportDisable] = useState<boolean>(true);

  /** data set 기능 (type : string)*/
  const setStateString = useCallback(
    (text: string, keyId: string) => {
      setDoctorInfo((state: MedicalSupportInfoType) => {
        return { ...state, [keyId]: text };
      });
    },
    [setDoctorInfo],
  );
  /** data set 기능 (type : boolean)*/
  const setStateBoolean = useCallback(
    (boo: boolean, keyId: string) => {
      setDoctorInfo((state) => {
        return { ...state, [keyId]: !boo };
      });
    },
    [setDoctorInfo],
  );
  /**  data set 기능 (type : ErrorType)*/
  const setErrMsg = useCallback((err: ErrorType, keyId: string) => {
    setSupportErr((errState) => {
      return { ...errState, [keyId]: err };
    });
  }, []);

  /** err , info 확인 */
  const onDisable = useCallback(() => {
    const errArr = forinArr(supportErr);
    const supportArr = forinArr(supportInfo);
    for (let i = 0; i < supportArr.length; i++) {
      const item = supportArr[i];
      // console.log(item);
      if (typeof item === 'string') {
        if (!item) {
          setSupportDisable(true);
          return;
        }
      }
    }
    for (let i = 0; i < errArr.length; i++) {
      const item = errArr[i];
      if (item.boo) {
        setSupportDisable(true);
        return;
      }
    }
    setSupportDisable(false);
    return;
  }, [supportErr, supportInfo]);

  /**  진료 지원 정보 등록 활성화*/
  const onVaildDisable = useCallback(() => {
    if (JSON.stringify(supportInfo) === JSON.stringify(originInfo)) {
      setSupportDisable(true);
    } else {
      onDisable();
    }
  }, [onDisable, originInfo, supportInfo]);

  /**  진료 지원 정보 수정 활성화*/
  const onVaildDisableModify = useCallback(() => {
    if (modifyInfo) {
      if (JSON.stringify(supportInfo) === JSON.stringify(modifyInfo)) {
        setSupportDisable(true);
      } else {
        onDisable();
      }
    }
  }, [modifyInfo, onDisable, supportInfo]);

  /**진료 지원 관리 페이지로 돌아가기 */
  const onClickBackMgt = useCallback(() => {
    const storage = globalThis?.sessionStorage;
    if (storage.prevPath === storage.currentPath) {
      router.push('/hospital-admin/medical-support-mgt', undefined, {
        shallow: true,
      });
      return;
    }
    if (storage.prevPath) {
      router.back();
      return;
    }
    router.push('/hospital-admin/medical-support-mgt', undefined, {
      shallow: true,
    });
    return;
  }, [router]);

  useEffect(() => {
    if (modifyData) {
      const originInfo: MedicalSupportInfoType = {
        tempPw: 'null',
        userId: modifyData.medicalSupportAccountId,
        name: modifyData.nameKo,
        birthDate: modifyData.birthday,
        mobile: modifyData.mobileNum,
        gender: modifyData.gender,
        active: modifyData.accountNonLocked,
      };
      setModifyInfo(originInfo);
      setDoctorInfo(originInfo);
    }
  }, [modifyData]);

  useEffect(() => {
    if (modifyData) {
      onVaildDisableModify();
    } else {
      onVaildDisable();
    }
  }, [onVaildDisable, modifyData, onVaildDisableModify]);

  useEffect(() => {
    return () => {
      setDoctorInfo(originInfo);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    supportInfo,
    supportErr,
    supportDisable,
    setStateBoolean,
    setStateString,
    setErrMsg,
    onClickBackMgt,
  };
};

export default useMedicalSupportInfo;
