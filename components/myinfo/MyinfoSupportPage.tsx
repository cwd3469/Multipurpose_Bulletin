import { ContentsBox } from '@components/setting/SettingTheme';
import { Grid, Stack, Typography } from '@mui/material';
import Input from '@components/common/inputs/Input';
import { ContantsLayout } from '@components/common/layout/Layout';
import MyinfoSection from './modules/MyinfoSection';
import { formatTelNumber } from '@utils/formatNumber';
import { getSupportMyInfo, useGetSupportMyInfo } from '@hooks/api/user/mypage';
import { dehydrate, QueryClient } from 'react-query';
import { toJSON } from 'flatted';
import { DisabledBox } from './MyinfoTheme';
import { dateFormat } from '@utils/date';
import Footer from '@components/common/layout/Footer';
import { useEffect, useState } from 'react';
import { useToastContext } from '@hooks/useToastContext';
import useCodeMsgBundle from '@hooks/api/useCodeMsgBundle';
import dayjs from 'dayjs';

interface MyinfoSupportPageType {
  supportAccountCreatedAt: string;
  supportAccountId: string;
  supportMobileNum: string;
  supportNameKo: string;
}

const MyinfoSupportPage = () => {
  const { data, isError, isLoading } = useGetSupportMyInfo();
  const toast = useToastContext();
  const msg = useCodeMsgBundle();
  const [res, setRes] = useState<MyinfoSupportPageType>();

  useEffect(() => {
    if (data) {
      if (data.data.code !== '0000') {
        toast?.on(msg.errMsg(data.data.code), 'error');
      } else {
        setRes(data.data.data);
      }
    }
  }, [data, msg, toast]);

  if (isLoading) {
    return (
      <ContantsLayout bg="#F8F8F8" containerColor="#F8F8F8" sx={{ padding: '40px 0' }}>
        isLoading...
      </ContantsLayout>
    );
  }

  if (res) {
    const createdAt = dayjs(res.supportAccountCreatedAt).format('YYYY. MM. DD');
    const mobile = formatTelNumber(res.supportMobileNum);
    return (
      <ContantsLayout bg="#F8F8F8" containerColor="#F8F8F8" sx={{ padding: '40px 0' }}>
        <Stack gap="20px">
          <Typography variant="h5">내 정보</Typography>
          <ContentsBox width="100%" gap="56px" sx={{ height: '752px' }}>
            <Grid container gap="177px">
              <Stack width="370px" gap="56px">
                <MyinfoSection title="이름">
                  <Input value={res.supportNameKo} readOnly disabled />
                </MyinfoSection>
                <MyinfoSection title="아이디">
                  <Input value={res.supportAccountId} readOnly disabled />
                </MyinfoSection>
              </Stack>
              <Stack width="370px" gap="56px">
                <MyinfoSection title="휴대폰 번호">
                  <Input value={mobile} readOnly disabled />
                </MyinfoSection>
                <MyinfoSection title="계정 생성일">
                  <Input value={createdAt} readOnly disabled />
                </MyinfoSection>
              </Stack>
            </Grid>
            <MyinfoSection title="정보 변경 안내">
              <DisabledBox
                sx={{
                  width: '924px',
                  height: '48px',
                  padding: '13px 12px',
                  lineHeight: '22px',
                }}
              >
                정보 변경이 필요하시면 해당 -의 -관리자에게 직접 문의해 주세요
              </DisabledBox>
            </MyinfoSection>
          </ContentsBox>
        </Stack>
      </ContantsLayout>
    );
  }

  return <></>;
};

export async function getStaticProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery('/hospital/api/v2/support/my-info', getSupportMyInfo);
  const obj = toJSON(dehydrate(queryClient));
  return {
    props: {
      dehydratedState: obj,
    },
  };
}

export default MyinfoSupportPage;
