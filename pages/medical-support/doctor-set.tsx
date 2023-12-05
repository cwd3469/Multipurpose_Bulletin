import { DataType, DrSettingGetApiType } from '@components/setting/type';
import { Gnb } from '@components/common/layout/gnb/Gnb';
import settingInfo from '@components/setting/jsons/settingInfo.json';
import { useSupportDoctorTreatProfile } from '@hooks/api/hospitalSupport/supportDoctorTreat';
import { useRouter } from 'next/router';
import { reActiveList } from '@utils/user';
import SupportSettingPage from '@components/supportDoctorSet/SupportSettingPage';
import { SupportTreatFilterProvider } from '@components/supportTreatmentSet/contexts/SupportTreatFilterContext';
import { ContantsLayout } from '@components/common/layout/Layout';

const DoctorSet = () => {
  const router = useRouter();
  const doctorId = router.query.doctorId as string;

  if (doctorId) {
    return (
      <SupportTreatFilterProvider>
        <div>
          <Gnb />
          <DoctorSetTemplete doctorId={doctorId} />;
        </div>
      </SupportTreatFilterProvider>
    );
  }

  return <></>;
};

const DoctorSetTempleteLoding = () => {
  return (
    <ContantsLayout
      bg="#F8F8F8"
      containerColor="#F8F8F8"
      sx={{ padding: '40px 0 0px' }}
    >
      {' '}
      <div>isLoading....</div>{' '}
    </ContantsLayout>
  );
};

const DoctorSetTemplete = (props: { doctorId: string }) => {
  const setJson: DataType = JSON.parse(JSON.stringify(settingInfo));
  const { data, isError, isLoading } = useSupportDoctorTreatProfile({
    ulid: props.doctorId,
  });

  if (isLoading) {
    return <DoctorSetTempleteLoding />;
  }

  if (data) {
    const code = data.data.code;
    if (code === '0000') {
      const res: DrSettingGetApiType = data.data.data;
      const depatmentArr = reActiveList(setJson.ability, res.specialists);
      return (
        <ContantsLayout
          bg="#F8F8F8"
          containerColor="#F8F8F8"
          sx={{ padding: '40px 0 0px' }}
        >
          <SupportSettingPage
            data={res}
            userUlid={res.doctorAccountUlid}
            abiltyList={depatmentArr}
          />
        </ContantsLayout>
      );
    } else {
      return <DoctorSetTempleteLoding />;
    }
  }
  return <DoctorSetTempleteLoding />;
};

export default DoctorSet;
