import { usePutHospitalIntro } from '@hooks/api/hospitalAdmin/hospitalIntro';
import { useToastContext } from '@hooks/useToastContext';
import { mobileFormatOff } from '@utils/formatNumber';
import { useContext } from 'react';
import { HospitalInfoContext } from '../contexts/HospitalInfoContext';
import { HospitalInfoMultiContext } from '../contexts/HospitalInfoMultiContext';
import { BaseData, FileUid, HospitalInfoData, WeekDataBundle } from '../type';
import { HospitalIntroDto } from '../type';

interface UseApiHospitalIntroSet {
  hospitalData?: HospitalInfoData;
  baseList?: BaseData;
  weekList?: WeekDataBundle;
  logoUid?: FileUid;
  imgsUid: FileUid[];
  onInfoReset: () => void;
}

const useApiHospitalIntroSet = (props: UseApiHospitalIntroSet) => {
  const { hospitalData, weekList, baseList, logoUid, imgsUid, onInfoReset } = props;
  const { imageSrc, setImageSrc } = useContext(HospitalInfoContext);
  const { imageSrc: multi, setImageSrc: setMulti } = useContext(HospitalInfoMultiContext);
  const { mutate: putHospitalIntroMutate } = usePutHospitalIntro();
  const toast = useToastContext();

  const onClickHospitalIntroSet = () => {
    if (weekList && baseList && logoUid && imgsUid.length && hospitalData) {
      let reImgsUid: FileUid[] = imgsUid.map((item, index) => {
        return { ...item, sort: index };
      });
      const mobileNumber = mobileFormatOff(baseList.phoneNumber);
      const req: HospitalIntroDto = {
        hospitalUlid: hospitalData.hospitalUlid,
        introductions: baseList.introductions,
        hospitalPhoneNum: mobileNumber,
        addressKo: baseList.addresData.address,
        addressDetailKo: baseList.details,
        zipCode: baseList.addresData.zipCode,
        canParking: baseList.parking,
        mondayOperation: weekList.mon,
        tuesdayOperation: weekList.tue,
        wednesdayOperation: weekList.wed,
        thursdayOperation: weekList.thu,
        fridayOperation: weekList.fri,
        saturdayOperation: weekList.set,
        sundayOperation: weekList.sun,
        holidayOperation: weekList.holiday,
        lunchTIme: baseList.time,
        logoImage: logoUid,
        introductionsImages: reImgsUid,
      };
      putHospitalIntroMutate(req, {
        onSuccess: (res) => {
          if (res.data.status === 'SUCCESS') {
            toast?.on('정보 수정이 성공하였습니다.', 'success');
            onInfoReset();
            if (setMulti && setImageSrc) {
              setImageSrc([]);
              setMulti([]);
            }
          } else {
            toast?.on(
              '정보 수정이 실패하였습니다 \n - 소개 입력 내용을 다시 한번 확인해 주세요.',
              'error',
            );
          }
        },
      });
    } else {
      toast?.on('전부 입력하지 않았습니다. \n 다시 한번 확인해주세요.', 'error');
    }
  };

  return { onClickHospitalIntroSet };
};

export default useApiHospitalIntroSet;
