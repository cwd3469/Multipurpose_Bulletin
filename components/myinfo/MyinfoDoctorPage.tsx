import { ContentsBox } from '@components/setting/SettingTheme';
import { Box, Grid, Stack, Typography } from '@mui/material';
import Input from '@components/common/inputs/Input';
import { ContantsLayout } from '@components/common/layout/Layout';
import MyinfoSection from './modules/MyinfoSection';
import { formatTelNumber } from '@utils/formatNumber';
import { getDoctorMyInfo, useGetDoctorMyInfo } from '@hooks/api/user/mypage';
import { dehydrate, QueryClient } from 'react-query';
import { toJSON } from 'flatted';
import originInfo from '../doctorInfo/json/originInfo.json';
import { reDepartment } from '@utils/user';
import { DoctorInfoType } from '@components/doctorInfo/type';
import { forinArr } from '@utils/file';
import { SetIntroToggle } from '@components/hospitalIntro/modules/SetIntroTheme';
import Image from 'next/image';
import { DisabledBox } from './MyinfoTheme';
import { dateFormat } from '@utils/date';
import Footer from '@components/common/layout/Footer';

const MyinfoDoctorPage = () => {
  const { data, isError, isLoading } = useGetDoctorMyInfo();
  const json: DoctorInfoType = JSON.parse(JSON.stringify(originInfo));

  if (isLoading) {
    return (
      <ContantsLayout bg="#F8F8F8" containerColor="#F8F8F8" sx={{ padding: '40px 0' }}>
        isLoading...
      </ContantsLayout>
    );
  }

  if (data) {
    const res = data.data;
    const departmentObj = reDepartment(json.medicalDepartment, res.departmentCodes);
    const createdAt = dateFormat(res.createdAt);

    const departmentArr = forinArr(departmentObj);
    return (
      <ContantsLayout bg="#F8F8F8" containerColor="#F8F8F8" sx={{ padding: '40px 0' }}>
        <Stack gap="20px">
          <Typography variant="h5">내 정보</Typography>
          <Grid container gap="40px">
            <ContentsBox width="447px" gap="56px" sx={{ height: '752px' }}>
              <MyinfoSection title="아이디">
                <Input value={res.doctorAccountId} readOnly disabled />
              </MyinfoSection>
              <MyinfoSection title="담당자 이름">
                <Input value={res.nameKo} readOnly disabled />
              </MyinfoSection>
              <MyinfoSection title="담당자 휴대폰 번호">
                <Input value={formatTelNumber(res.mobileNum)} readOnly disabled />
              </MyinfoSection>
              <MyinfoSection title="의사 면허번호">
                <Input value={res.licenseNum} readOnly disabled />
              </MyinfoSection>
              <MyinfoSection title="계정 생성일">
                <Input value={createdAt.day} readOnly disabled />
              </MyinfoSection>
            </ContentsBox>
            <ContentsBox width="712px" sx={{ height: '752px', padding: '40px 30px 40px 40px' }}>
              <MyinfoSection title="진료과">
                <Grid container gap="12px">
                  {departmentArr.map((item, index) => {
                    return (
                      <SetIntroToggle
                        key={index}
                        value="check"
                        color="primary"
                        selected={item.active}
                        sx={{
                          gap: '12px',
                          padding: '7.5px 19px',
                          letterSpacing: '0',
                          cursor: 'auto',
                        }}
                      >
                        {item.koName}
                        {item.active ? (
                          <Image
                            src={'/assets/icons/checkIconActive.svg'}
                            alt="체크"
                            width={14}
                            height={10}
                          />
                        ) : (
                          <Image
                            src={'/assets/icons/checkIcon.svg'}
                            alt="체크"
                            width={14}
                            height={10}
                          />
                        )}{' '}
                      </SetIntroToggle>
                    );
                  })}
                </Grid>
              </MyinfoSection>
              <Box height="40px" />
              <MyinfoSection title="정보 변경 안내">
                <DisabledBox
                  sx={{
                    height: '48px',
                    padding: '13px 12px',
                    lineHeight: '22px',
                  }}
                >
                  정보 변경이 필요하시면 해당 -의 -관리자에게 직접 문의해 주세요
                </DisabledBox>
              </MyinfoSection>
              <Box height="115px" />
            </ContentsBox>
          </Grid>
        </Stack>
      </ContantsLayout>
    );
  }

  return <></>;
};

export async function getStaticProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery('/hospital/api/v1/doctor/my-info', getDoctorMyInfo);
  const obj = toJSON(dehydrate(queryClient));
  return {
    props: {
      dehydratedState: obj,
    },
  };
}

export default MyinfoDoctorPage;
