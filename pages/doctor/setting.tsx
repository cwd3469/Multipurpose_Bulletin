import SettingPage from '@components/setting/SettingPage';
import { DataType, DrSettingGetApiType } from '@components/setting/type';
import { useDoctorSetting } from '@hooks/api/hospitalDoctor/doctorSetting';
import { Gnb } from '@components/common/layout/gnb/Gnb';
import settingInfo from '@components/setting/jsons/settingInfo.json';
import { reActiveList } from '@utils/user';
import { ContantsLayout } from '@components/common/layout/Layout';

const SettingLoading = () => {
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

const Setting = () => {
  const { data, isError, isLoading } = useDoctorSetting();
  const setJson: DataType = JSON.parse(JSON.stringify(settingInfo));

  if (isLoading) {
    return <SettingLoading />;
  }

  if (data) {
    const code = data.data.code;
    if (code === '0000') {
      const res: DrSettingGetApiType = data.data.data;
      const depatmentArr = reActiveList(setJson.ability, res.specialists);

      return (
        <>
          <Gnb />
          <ContantsLayout
            bg="#F8F8F8"
            containerColor="#F8F8F8"
            sx={{ padding: '40px 0 0px' }}
          >
            <div>
              <SettingPage
                data={res}
                userUlid={res.doctorAccountUlid}
                abiltyList={depatmentArr}
              />
            </div>
          </ContantsLayout>
        </>
      );
    } else {
      return <SettingLoading />;
    }
  }

  return <SettingLoading />;
};

export default Setting;
