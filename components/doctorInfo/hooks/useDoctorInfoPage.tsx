import { DepartmentIntro } from '@components/baseMedicalExpenses/type';
import { forinArr } from '@utils/file';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { ErrorType } from 'types/login';
import { DoctorErrType, DoctorInfoType } from '../type';
import jsonInfo from '../json/originInfo.json';
import useAuth from '@hooks/useAuth';

const useDoctorInfoPage = (props: {
  data?: DoctorInfoType;
  mode: string;
  promiseFile?: string[];
}) => {
  const resetData = jsonInfo;
  const router = useRouter();
  const userInfo = useAuth();
  const hospitalLevel = userInfo.accountInfo && userInfo.accountInfo.hospitalLevel;
  const originInfo = props.data;
  const promiseFile = props.promiseFile;
  const errMsg: DoctorErrType = {
    tempPw: { msg: '', boo: false },
    userId: { msg: '', boo: false },
    name: { msg: '', boo: false },
    birthDate: { msg: '', boo: false },
    mobile: { msg: '', boo: false },
    gender: { msg: '', boo: false },
    licenseNumber: { msg: '', boo: false },
    medicalDepartment: { msg: '', boo: false },
    profileImageUlid: { msg: '', boo: false },
    primaryDepartmentCode: { msg: '', boo: false },
  };
  //TODO:진료과Department
  const [doctorInfo, setDoctorInfo] = useState<DoctorInfoType>(resetData);
  const [doctorErr, setDoctorErr] = useState<DoctorErrType>(errMsg);
  const [doactorDisable, setDoactorDisable] = useState<boolean>(true);
  const [modifyData, setModifyData] = useState<string[]>();

  /** data set 기능 (type : string)*/
  const setStateString = useCallback(
    (text: string, keyId: string) => {
      setDoctorInfo((state) => {
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

  /** data set 기능 (type : MedicalDepartment)*/
  const setStateDepartment = useCallback(
    (info: DepartmentIntro, medicalType: string) => {
      setDoctorInfo((state) => {
        const defaultValue =
          hospitalLevel === 1 ? state['medicalDepartment'] : resetData.medicalDepartment;
        return {
          ...state,
          ['medicalDepartment']: {
            ...defaultValue,
            [medicalType]: info,
          },
        };
      });
    },
    [hospitalLevel, resetData],
  );
  /**  data set 기능 (type : ErrorType)*/
  const setErrMsg = useCallback((err: ErrorType, keyId: string) => {
    setDoctorErr((errState) => {
      return { ...errState, [keyId]: err };
    });
  }, []);

  /**  의사 정보 등록 활성화*/
  const onVaildDisable = useCallback(() => {
    const reArr = forinArr(doctorInfo);
    const errArr: ErrorType[] = forinArr(doctorErr);
    if (
      JSON.stringify(doctorInfo.medicalDepartment) === JSON.stringify(resetData.medicalDepartment)
    ) {
      return setDoactorDisable(true);
    }

    for (let i = 0; i < reArr.length; i++) {
      const item = reArr[i];
      if (item === '') {
        setDoactorDisable(true);
        return;
      }
    }
    // 전체 유효성 통과
    for (let i = 0; i < errArr.length; i++) {
      const item = errArr[i];
      if (item.boo) {
        setDoactorDisable(true);
        return;
      }
    }
    setDoactorDisable(false);
    return;
  }, [doctorErr, doctorInfo, resetData]);

  /**  의사 정보 수정 활성화*/
  const onVaildModifyDisable = useCallback(() => {
    if (originInfo) {
      if (JSON.stringify(doctorInfo) === JSON.stringify(originInfo)) {
        setDoactorDisable(true);
      } else {
        onVaildDisable();
      }
    }
  }, [doctorInfo, onVaildDisable, originInfo]);

  /**의사관리 페이지로 돌아가기 */
  const onClickBackMgt = useCallback(() => {
    const storage = globalThis?.sessionStorage;
    if (storage.prevPath === storage.currentPath) {
      router.push('/hospital-admin/doctor-mgt', undefined, {
        shallow: true,
      });
      return;
    }
    if (storage.prevPath) {
      router.back();
      return;
    }
    router.push('/hospital-admin/doctor-mgt', undefined, {
      shallow: true,
    });
    return;
  }, [router]);

  const fileOn = useCallback(async () => {
    if (promiseFile) setModifyData(promiseFile);
  }, [promiseFile, setModifyData]);

  useEffect(() => {
    if (props.mode === 'register') {
      onVaildDisable();
    } else {
      onVaildModifyDisable();
    }
  }, [props.mode, onVaildDisable, onVaildModifyDisable]);

  useEffect(() => {
    if (originInfo) {
      setDoctorInfo(originInfo);
    }
  }, [originInfo]);

  useEffect(() => {
    fileOn();
  }, [fileOn]);

  return {
    doctorInfo,
    doctorErr,
    doactorDisable,
    modifyData,
    setStateBoolean,
    setStateString,
    setErrMsg,
    setStateDepartment,
    onClickBackMgt,
  };
};

export default useDoctorInfoPage;
