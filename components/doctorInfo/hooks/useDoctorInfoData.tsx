import router from 'next/router';
import { useCallback } from 'react';
import { useToastContext } from '@hooks/useToastContext';
import { forinArr } from '@utils/file';
import { birthDateFormatOff, mobileFormatOff } from '@utils/formatNumber';
import { DoctorInfoType, DtoGetDoctorDetail, DtoPutDoctorDetail } from '../type';
import { DtoPostDoctorRegister } from '@components/doctorMgt/type';
import {
  usePutPofileDoctorDetail,
  usePostProfileDoctor,
  useDeletePofileDoctor,
} from '@hooks/api/hospitalAdmin/doctorMgt';
import { MedicalDepartment } from '@components/baseMedicalExpenses/type';
import useCodeMsgBundle from '@hooks/api/useCodeMsgBundle';

interface UseDoctorInfoData {
  doctorInfo?: DoctorInfoType;
  doctorProfileUlid?: string;
}

const useDoctorInfoData = (props: UseDoctorInfoData) => {
  const { doctorInfo, doctorProfileUlid } = props;
  const { mutate: postProfileDoctor } = usePostProfileDoctor();
  const { mutate: putProfileDoctor } = usePutPofileDoctorDetail();
  const { mutate: deletePofileDoctor } = useDeletePofileDoctor();
  const toast = useToastContext();
  const msg = useCodeMsgBundle();

  const arrDepartment = useCallback((obj: MedicalDepartment) => {
    const arr: string[] = forinArr(obj)
      .filter((item, index) => item.active ?? item)
      .map((item, index) => item.id);

    return arr;
  }, []);

  /**  의사 정보 등록 기능*/
  const onClickDoctorInfo = useCallback(() => {
    if (doctorInfo) {
      const dto: DtoPostDoctorRegister = {
        doctorAccountId: doctorInfo.userId,
        password: doctorInfo.tempPw,
        mobileNum: mobileFormatOff(doctorInfo.mobile),
        nameKo: doctorInfo.name,
        birthday: birthDateFormatOff(doctorInfo.birthDate),
        licenseNum: doctorInfo.licenseNumber,
        gender: doctorInfo.gender,
        departmentCodes: arrDepartment(doctorInfo.medicalDepartment),
        doctorProfileImageUlid: doctorInfo.profileImageUlid,
        primaryDepartmentCode: doctorInfo.primaryDepartmentCode,
      };

      postProfileDoctor(dto, {
        onSuccess: (res) => {
          if (res.data.status === 'SUCCESS') {
            router.push('/hospital-admin/doctor-mgt', undefined, {
              shallow: true,
            });
            toast?.on('의사 등록이 성공하였습니다', 'success');
          }
          if (res.data.status === 'FAIL') {
            toast?.on(msg.errMsg(res.data.code), 'error');
          }
        },
        onError: (err) => {
          toast?.on('의사 등록이 실패하였습니다 \n 잠시후, 다시 시도해 주세요.', 'error');
        },
      });
    }
  }, [arrDepartment, doctorInfo, msg, postProfileDoctor, toast]);

  /**  의사 정보 수정 기능*/
  const onClickDoctorInfoModify = useCallback(() => {
    if (doctorInfo && doctorProfileUlid) {
      const modifyData: DtoGetDoctorDetail = {
        doctorAccountId: doctorInfo.userId,
        mobileNum: mobileFormatOff(doctorInfo.mobile),
        nameKo: doctorInfo.name,
        birthday: birthDateFormatOff(doctorInfo.birthDate),
        licenseNum: doctorInfo.licenseNumber,
        gender: Number(doctorInfo.gender),
        accountNonLocked: doctorInfo.active,
        departmentCodes: arrDepartment(doctorInfo.medicalDepartment),
        doctorProfileImageUlid: doctorInfo.profileImageUlid,
        primaryDepartmentCode: doctorInfo.primaryDepartmentCode,
      };
      const dto: DtoPutDoctorDetail = {
        modifyData: modifyData,
        doctorProfileUlid: doctorProfileUlid,
      };

      putProfileDoctor(dto, {
        onSuccess: (res) => {
          if (res.data.status === 'SUCCESS') {
            router.push('/hospital-admin/doctor-mgt', undefined, {
              shallow: true,
            });
            toast?.on('의사 수정이 성공하였습니다', 'success');
          }
          if (res.data.status === 'FAIL') {
            toast?.on(msg.errMsg(res.data.code), 'error');
          }
        },
        onError: (err) => {
          toast?.on('의사 수정이 실패하였습니다 \n 잠시후, 다시 시도해 주세요.', 'error');
        },
      });
    }
  }, [arrDepartment, doctorInfo, doctorProfileUlid, msg, putProfileDoctor, toast]);

  /**  의사 정보 삭제 기능*/
  const onClickDoctorInfoDelete = useCallback(() => {
    if (doctorProfileUlid) {
      deletePofileDoctor(doctorProfileUlid, {
        onSuccess: (res) => {
          if (res.data.status === 'SUCCESS') {
            router.push('/hospital-admin/doctor-mgt', undefined, {
              shallow: true,
            });
            toast?.on('계정 삭제를 성공하였습니다', 'success');
          }
          if (res.data.status === 'FAIL') {
            toast?.on(msg.errMsg(res.data.code), 'error');
          }
        },
        onError: (err) => {
          toast?.on('계정 삭제를 실패하였습니다 \n 잠시후, 다시 시도해 주세요.', 'error');
        },
      });
    }
  }, [deletePofileDoctor, doctorProfileUlid, msg, toast]);

  return {
    onClickDoctorInfo,
    onClickDoctorInfoDelete,
    onClickDoctorInfoModify,
  };
};

export default useDoctorInfoData;
