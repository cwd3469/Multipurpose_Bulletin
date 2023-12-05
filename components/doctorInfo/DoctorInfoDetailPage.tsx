import DoctorInfoDetailView from './views/DoctorInfoDetailView';
import { DoctorInfoType } from './type';
import originInfo from './json/originInfo.json';
import { DepartmentIntro, MedicalDepartment } from '@components/baseMedicalExpenses/type';
import { convertURLtoFile, forinArr } from '@utils/file';
import { useQuery } from 'react-query';
import useDoctorInfoDetail from './hooks/useDoctorInfoDetail';
import WErrorPage from '@components/common/modal/WErrorPage';
import { useRouter } from 'next/router';
import useCodeMsgBundle from '@hooks/api/useCodeMsgBundle';

type DoctorInfoDetailPage = {
  userId: string;
};

const DoctorInfoDetailPage = (props: DoctorInfoDetailPage) => {
  const router = useRouter();
  const msg = useCodeMsgBundle();
  const { doctorInfo, code, isLoading, isError, isSuccess } = useDoctorInfoDetail(props);

  const reDepartment = (obj: MedicalDepartment, arr: string[]) => {
    let re = obj;
    const deArr: DepartmentIntro[] = forinArr(obj);
    for (let i = 0; i < deArr.length; i++) {
      const item = deArr[i];
      for (let k = 0; k < arr.length; k++) {
        const element = arr[k];
        if (item.id === element) {
          re[item.enName].active = true;
        }
      }
    }
    return re;
  };

  if (isError) {
    return (
      <WErrorPage
        isError={isError}
        errMsg={`의사 조회에 실패 하였습니다. \n 잠시후 다시 시도 해 보세요.`}
        mode="modal"
        back={() => {
          router.push('/hospital-admin/doctor-mgt', undefined, {
            shallow: true,
          });
        }}
      />
    );
  }

  if (isSuccess) {
    if (code === '0000') {
      const json: DoctorInfoType = JSON.parse(JSON.stringify(originInfo));

      const info: DoctorInfoType = {
        userId: doctorInfo.doctorAccountId,
        tempPw: 'Null',
        name: doctorInfo.nameKo,
        birthDate: doctorInfo.birthday,
        mobile: doctorInfo.mobileNum,
        gender: String(doctorInfo.gender),
        licenseNumber: doctorInfo.licenseNum,
        active: doctorInfo.accountNonLocked,
        medicalDepartment: reDepartment(json.medicalDepartment, doctorInfo.departmentCodes),
        profileImageUlid: doctorInfo.doctorProfileImageUlid,
        primaryDepartmentCode: doctorInfo.primaryDepartmentCode,
      };
      const modifyData = [doctorInfo.doctorProfileImageUrl];

      return (
        <DoctorInfoDetailView
          reData={info}
          doctorProfileUlid={props.userId}
          modifyData={modifyData}
        />
      );
    } else {
      return (
        <WErrorPage
          isError={true}
          errMsg={`${msg.errMsg(code)}`}
          mode="modal"
          back={() => {
            router.push('/hospital-admin/doctor-mgt', undefined, {
              shallow: true,
            });
          }}
        />
      );
    }
  }
  return <></>;
};

export default DoctorInfoDetailPage;
