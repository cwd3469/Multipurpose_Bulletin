import { ContentsBox } from '@components/setting/SettingTheme';
import { Box, Grid, Stack, Typography } from '@mui/material';
import Input from '@components/common/inputs/Input';
import { ContantsLayout } from '@components/common/layout/Layout';
import MyinfoSection from './modules/MyinfoSection';
import { formatTelNumber } from '@utils/formatNumber';
import { getAdminMyInfo, useGetAdminMyInfo } from '@hooks/api/user/mypage';
import { dehydrate, QueryClient } from 'react-query';
import { toJSON } from 'flatted';
import MyinfoGuide from './modules/MyinfoGuide';
import Footer from '@components/common/layout/Footer';
import { useEffect, useState } from 'react';

interface MyinfoAdminPageDto {
  hospitalCode: string;
  adminAccountId: string;
  adminNameKo: string;
  adminMobileNum: string;
  hospitalNameKo: string;
}

const MyinfoAdminPage = () => {
  const { data, isError, isLoading } = useGetAdminMyInfo();
  const [res, setRes] = useState<MyinfoAdminPageDto>({
    hospitalCode: '',
    adminAccountId: '',
    adminNameKo: '',
    adminMobileNum: '',
    hospitalNameKo: '',
  });

  useEffect(() => {
    if (data) {
      setRes(data.data);
    }
  }, [data]);

  if (isLoading) {
    return <ContantsLayout>isLoading...</ContantsLayout>;
  }

  return (
    <ContantsLayout bg="#F8F8F8" containerColor="#F8F8F8" sx={{ padding: '40px 0' }}>
      <Stack gap="20px">
        <Typography variant="h5">내 정보</Typography>
        <Grid container gap="40px">
          <ContentsBox width="447px" gap="40px" sx={{ height: '630px' }}>
            <MyinfoSection title="아이디">
              <Input value={res.adminAccountId} readOnly disabled />
            </MyinfoSection>
            <MyinfoSection title="담당자 이름">
              <Input value={res.adminNameKo} readOnly disabled />
            </MyinfoSection>
            <MyinfoSection title="담당자 휴대폰 번호">
              <Input value={formatTelNumber(res.adminMobileNum)} readOnly disabled />
            </MyinfoSection>
            <MyinfoGuide />
          </ContentsBox>
          <ContentsBox width="712px" gap="64px" sx={{ height: '630px' }}>
            <Stack width="392px" gap="40px">
              <MyinfoSection title="-명">
                <Input value={res.hospitalNameKo} readOnly disabled />
              </MyinfoSection>
              <MyinfoSection title="요양기관 번호">
                <Input value={res.hospitalCode} readOnly disabled />
              </MyinfoSection>
            </Stack>
          </ContentsBox>
        </Grid>
      </Stack>
    </ContantsLayout>
  );
};

export async function getStaticProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery('/hospital/api/v1/admin/my-info', getAdminMyInfo);
  const obj = toJSON(dehydrate(queryClient));
  return {
    props: {
      dehydratedState: obj,
    },
  };
}

export default MyinfoAdminPage;
