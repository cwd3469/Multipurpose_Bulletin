import useMedicalSupportInfo from './hooks/useMedicalSupportInfo';
import useApiMedicalSupportInfo from './hooks/useApiMedicalSupportInfo';
import MedicalSupportInfoPageView from './views/MedicalSupportInfoPageView';
import { useContext } from 'react';
import { MedicalSupportContext } from '@components/medicalSupportMgt/contexts/MedicalSupportContext';

const MedicalSupportInfoPage = () => {
  const { filter } = useContext(MedicalSupportContext);
  const supportInfo = useMedicalSupportInfo({});
  const api = useApiMedicalSupportInfo({
    data: supportInfo.supportInfo,
    filter: filter,
  });

  return (
    <MedicalSupportInfoPageView {...supportInfo} {...api} mode="register" />
  );
};

export default MedicalSupportInfoPage;
