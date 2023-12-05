import useMedicalSupportInfo from './hooks/useMedicalSupportInfo';
import useApiMedicalSupportInfo from './hooks/useApiMedicalSupportInfo';
import MedicalSupportInfoPageView from './views/MedicalSupportInfoPageView';
import useQueryMedicalSupportDetail from './hooks/useQueryMedicalSupportDetail';
import { useContext } from 'react';
import { MedicalSupportContext } from '@components/medicalSupportMgt/contexts/MedicalSupportContext';

const MedicalSupportInfoDetailPage = (props: { userId: string }) => {
  const { filter } = useContext(MedicalSupportContext);
  const { supportInfo: info } = useQueryMedicalSupportDetail({
    ulid: props.userId,
  });
  const supportInfo = useMedicalSupportInfo({ modifyData: info });
  const api = useApiMedicalSupportInfo({
    data: supportInfo.supportInfo,
    filter: filter,
    ulid: props.userId,
  });

  return (
    <MedicalSupportInfoPageView {...supportInfo} {...api} mode="modoify" />
  );
};

export default MedicalSupportInfoDetailPage;
