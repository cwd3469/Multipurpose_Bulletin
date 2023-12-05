import {
  BaseData,
  BaseDataType,
  FileUid,
  HospitalInfoData,
  HospitalIntroGetDto,
  WeekDataBundle,
  WeekendDto,
} from './type';
import useApiHospitalIntroSet from './hooks/useApiHospitalIntroSet';
import { useCallback, useEffect, useState } from 'react';
import { ContantsLayout } from '@components/common/layout/Layout';
import {
  LeftSection,
  RightSection,
  SaveButton,
  SenterSection,
  SigninBody,
} from './modules/SetIntroTheme';
import SetIntroBox from './modules/SetIntroBox';
import { Box, Grid, Stack } from '@mui/material';
import SetIntroWeekForm from './modules/SetIntroWeekForm';
import SetIntroImgPicker from './Inputs/SetIntroImgPicker';
import SetIntroImgMultiPicker from './Inputs/SetIntroImgMultiPicker';
import SetIntroDefaultData from './modules/SetIntroDefaultData';
import { mobileFormatOff } from '@utils/formatNumber';
import { useGetHospitalIntro } from '@hooks/api/hospitalAdmin/hospitalIntro';
import { useDebounceFn } from 'ahooks';

const HospitalIntroSetPage = () => {
  const { data } = useGetHospitalIntro();
  const [originData, setOriginData] = useState<HospitalIntroGetDto>();
  const [disabled, setDisabled] = useState<boolean>(true);
  const [weekList, setWeekList] = useState<WeekDataBundle>();
  const [baseList, setBaseList] = useState<BaseData>();
  const [logoUid, setLogoUid] = useState<FileUid>();
  const [imgsUid, setImgsUid] = useState<FileUid[]>([]);
  const [hospitalData, setDate] = useState<HospitalInfoData>();
  const [logoFileUrl, setLogoFileUrl] = useState<string[]>();
  const [fileUrlList, setFileUrlList] = useState<string[]>();

  const onChangeWeekList = (value: WeekendDto, keyId: string) => {
    setWeekList((prec) => {
      if (prec) return { ...prec, [keyId]: value };
    });
  };

  const onDeleteLogoUid = () => {
    setLogoUid(undefined);
    setLogoFileUrl(undefined);
  };

  const onDeleteimgUid = (srot: number) => {
    const reList = imgsUid.filter((item, index) => {
      return index !== srot;
    });
    setImgsUid(reList);
  };

  const onChangeBaseList = (value: BaseDataType, keyId: string) => {
    const state = baseList ? { ...baseList, [keyId]: value } : undefined;
    setBaseList(state);
  };

  const onUploadFileLogo = (uid: FileUid) => {
    setLogoUid(uid);
  };

  const onUploadFileimgList = (uidList: FileUid[]) => {
    const maxLength = 5;
    const reArr = [...imgsUid, ...uidList];
    const slice = reArr.slice(-5);
    if (reArr.length <= maxLength) {
      setImgsUid(reArr);
    } else {
      setImgsUid(slice);
    }
  };
  const onInfoReset = useCallback(() => {
    setWeekList(undefined);
    setBaseList(undefined);
    setLogoUid(undefined);
    setImgsUid([]);
    setDate(undefined);
    setLogoFileUrl([]);
    setFileUrlList([]);
  }, []);

  useEffect(() => {
    if (data) {
      const queryData = data.data.data;
      setOriginData(queryData);
      const res: HospitalIntroGetDto = queryData;
      const week: WeekDataBundle = {
        mon: res.mondayOperation,
        tue: res.tuesdayOperation,
        wed: res.wednesdayOperation,
        thu: res.thursdayOperation,
        fri: res.fridayOperation,
        set: res.saturdayOperation,
        sun: res.sundayOperation,
        holiday: res.holidayOperation,
      };
      const base: BaseData = {
        time: res.lunchTIme,
        phoneNumber: res.hospitalPhoneNum,
        addresData: {
          address: res.addressKo,
          zipCode: res.zipCode,
        },
        details: res.addressDetailKo,
        parking: res.canParking,
        introductions: res.introductions,
      };

      const logoUild = {
        fileUlid: res.logoImage.fileUlid,
        sort: 0,
      };

      const hospitalUlid = res.hospitalUlid;

      setWeekList(week);
      setBaseList(base);
      setLogoUid(logoUild);

      setDate({
        hospitalUlid: hospitalUlid,
      });
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      const queryData = data.data.data;
      const res: HospitalIntroGetDto = queryData;
      const originFileList = res.introductionsImages;
      if (res.logoImage.fileUrl) {
        setLogoFileUrl([res.logoImage.fileUrl]);
      } else {
        setLogoFileUrl([]);
      }
      if (originFileList.length) {
        const urlList = originFileList.map((item) => {
          return item.fileUrl;
        });
        const ulidList = originFileList.map((item) => {
          return { fileUlid: item.fileUlid, sort: item.sort };
        });
        setImgsUid(ulidList);
        setFileUrlList(urlList);
      } else {
        setImgsUid([]);
        setFileUrlList([]);
      }
    }
  }, [data]);

  useEffect(() => {
    if (originData) {
      if (baseList && logoUid && weekList && imgsUid) {
        if (baseList.introductions && logoUid.fileUlid && imgsUid.length) {
          //weekList
          if (JSON.stringify(originData.fridayOperation) !== JSON.stringify(weekList.fri)) {
            setDisabled(false);
            return;
          }
          if (JSON.stringify(originData.holidayOperation) !== JSON.stringify(weekList.holiday)) {
            setDisabled(false);
            return;
          }
          if (JSON.stringify(originData.mondayOperation) !== JSON.stringify(weekList.mon)) {
            setDisabled(false);
            return;
          }
          if (JSON.stringify(originData.saturdayOperation) !== JSON.stringify(weekList.set)) {
            setDisabled(false);
            return;
          }

          if (JSON.stringify(originData.sundayOperation) !== JSON.stringify(weekList.sun)) {
            setDisabled(false);
            return;
          }
          if (JSON.stringify(originData.thursdayOperation) !== JSON.stringify(weekList.thu)) {
            setDisabled(false);
            return;
          }
          if (JSON.stringify(originData.tuesdayOperation) !== JSON.stringify(weekList.tue)) {
            setDisabled(false);
            return;
          }
          if (JSON.stringify(originData.wednesdayOperation) !== JSON.stringify(weekList.wed)) {
            setDisabled(false);
            return;
          }
          //baseList
          if (JSON.stringify(originData.lunchTIme) !== JSON.stringify(baseList.time)) {
            setDisabled(false);
            return;
          }
          if (
            JSON.stringify(originData.hospitalPhoneNum) !==
            JSON.stringify(mobileFormatOff(baseList.phoneNumber))
          ) {
            setDisabled(false);
            return;
          }
          if (
            JSON.stringify(originData.addressKo) !== JSON.stringify(baseList.addresData.address)
          ) {
            setDisabled(false);
            return;
          }
          if (JSON.stringify(originData.zipCode) !== JSON.stringify(baseList.addresData.zipCode)) {
            setDisabled(false);
            return;
          }
          if (JSON.stringify(originData.addressDetailKo) !== JSON.stringify(baseList.details)) {
            setDisabled(false);
            return;
          }
          if (JSON.stringify(originData.canParking) !== JSON.stringify(baseList.parking)) {
            setDisabled(false);
            return;
          }
          if (JSON.stringify(originData.introductions) !== JSON.stringify(baseList.introductions)) {
            setDisabled(false);
            return;
          }
          //logoUid
          if (JSON.stringify(originData.logoImage.fileUlid) !== JSON.stringify(logoUid.fileUlid)) {
            setDisabled(false);
            return;
          }
          //imgsUid
          const map = originData.introductionsImages.map((item) => {
            return { fileUlid: item.fileUlid, sort: item.sort };
          });
          if (JSON.stringify(map) !== JSON.stringify(imgsUid)) {
            setDisabled(false);
            return;
          }
        }
      } else {
        setDisabled(true);
      }
      setDisabled(true);
      return;
    }
    setDisabled(true);
  }, [baseList, imgsUid, logoUid, originData, weekList]);

  const { onClickHospitalIntroSet } = useApiHospitalIntroSet({
    hospitalData,
    baseList,
    weekList,
    logoUid,
    imgsUid,
    onInfoReset,
  });

  const onDebounceFnHospitalSet = useDebounceFn(onClickHospitalIntroSet, {
    wait: 300,
  });

  useEffect(() => {
    return () => {
      setWeekList(undefined);
      setBaseList(undefined);
      setLogoUid(undefined);
      setImgsUid([]);
      setDate(undefined);
      setLogoFileUrl([]);
      setFileUrlList([]);
    };
  }, []);

  return (
    <ContantsLayout bg="#F8F8F8" containerColor="#F8F8F8" sx={{ paddingBottom: '0px' }}>
      <SigninBody>
        <LeftSection>
          {/* - 진료 시간를 입력해주세요. */}
          <SetIntroBox title="요일별 진료 시간" sx={{ gap: '14px' }}>
            {weekList ? (
              <Grid container gap="9px">
                <Stack width="auto">
                  <SetIntroWeekForm
                    week="mon"
                    name={'월요일'}
                    openTime={weekList.mon.openTime}
                    closeTime={weekList.mon.closeTime}
                    night={weekList.mon.hasNightOperation}
                    open={weekList.mon.hasOperation}
                    setWeekOnChange={onChangeWeekList}
                  />
                  <SetIntroWeekForm
                    week="tue"
                    name={'화요일'}
                    openTime={weekList.tue.openTime}
                    closeTime={weekList.tue.closeTime}
                    night={weekList.tue.hasNightOperation}
                    open={weekList.tue.hasOperation}
                    setWeekOnChange={onChangeWeekList}
                  />
                  <SetIntroWeekForm
                    week="wed"
                    name={'수요일'}
                    openTime={weekList.wed.openTime}
                    closeTime={weekList.wed.closeTime}
                    night={weekList.wed.hasNightOperation}
                    open={weekList.wed.hasOperation}
                    setWeekOnChange={onChangeWeekList}
                  />
                  <SetIntroWeekForm
                    week="thu"
                    name={'목요일'}
                    openTime={weekList.thu.openTime}
                    closeTime={weekList.thu.closeTime}
                    night={weekList.thu.hasNightOperation}
                    open={weekList.thu.hasOperation}
                    setWeekOnChange={onChangeWeekList}
                  />
                </Stack>
                <Stack width="auto">
                  <SetIntroWeekForm
                    week="fri"
                    name={'금요일'}
                    openTime={weekList.fri.openTime}
                    closeTime={weekList.fri.closeTime}
                    night={weekList.fri.hasNightOperation}
                    open={weekList.fri.hasOperation}
                    setWeekOnChange={onChangeWeekList}
                  />
                  <SetIntroWeekForm
                    week="set"
                    name={'토요일'}
                    openTime={weekList.set.openTime}
                    closeTime={weekList.set.closeTime}
                    night={weekList.set.hasNightOperation}
                    open={weekList.set.hasOperation}
                    setWeekOnChange={onChangeWeekList}
                  />
                  <SetIntroWeekForm
                    week="sun"
                    name={'일요일'}
                    openTime={weekList.sun.openTime}
                    closeTime={weekList.sun.closeTime}
                    night={weekList.sun.hasNightOperation}
                    open={weekList.sun.hasOperation}
                    setWeekOnChange={onChangeWeekList}
                  />
                  <SetIntroWeekForm
                    week="holiday"
                    name={'공휴일'}
                    openTime={weekList.holiday.openTime}
                    closeTime={weekList.holiday.closeTime}
                    night={weekList.holiday.hasNightOperation}
                    open={weekList.holiday.hasOperation}
                    setWeekOnChange={onChangeWeekList}
                  />
                </Stack>
              </Grid>
            ) : (
              <Box height="205px" width="100%" bgcolor="#f9f9f9" />
            )}
          </SetIntroBox>
          {/* - 이미지를 등록해 주세요. */}
          <Stack gap="10px">
            <SetIntroImgPicker
              onDeleteLogoUid={onDeleteLogoUid}
              modifyFile={logoFileUrl}
              onUploadFile={onUploadFileLogo}
            />
            <Box height="300px">
              <SetIntroImgMultiPicker
                onDeleteLogoUid={onDeleteimgUid}
                modifyFile={fileUrlList}
                onUploadFile={onUploadFileimgList}
              />
            </Box>
          </Stack>
        </LeftSection>
        <RightSection>
          <Stack>
            {/* - 기본 정보를 입력해주세요. */}
            {baseList ? (
              <SetIntroDefaultData baseData={baseList} setDefaultOnChange={onChangeBaseList} />
            ) : (
              <Box height="725px" width="100%" bgcolor="#f9f9f9" />
            )}
          </Stack>
        </RightSection>
      </SigninBody>

      <SenterSection>
        <SaveButton variant="contained" onClick={onDebounceFnHospitalSet.run} disabled={disabled}>
          수정
        </SaveButton>
      </SenterSection>
    </ContantsLayout>
  );
};

export default HospitalIntroSetPage;
