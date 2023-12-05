import useDoctorInfoData from './hooks/useDoctorInfoData';
import useDoctorInfoPage from './hooks/useDoctorInfoPage';
import DoctorInfoPageView from './views/DoctorInfoPageView';

const DoctorInfoPage = () => {
  const {
    doctorInfo,
    doctorErr,
    doactorDisable,
    setStateBoolean,
    setStateString,
    setErrMsg,
    setStateDepartment,
    onClickBackMgt,
  } = useDoctorInfoPage({
    mode: 'register',
  });

  const { onClickDoctorInfo } = useDoctorInfoData({
    doctorInfo,
  });
  return (
    <DoctorInfoPageView
      doctorInfo={doctorInfo}
      doctorErr={doctorErr}
      doactorDisable={doactorDisable}
      setStateBoolean={setStateBoolean}
      setStateString={setStateString}
      setErrMsg={setErrMsg}
      setStateDepartment={setStateDepartment}
      onClickBackMgt={onClickBackMgt}
      onClickDoctorInfo={onClickDoctorInfo}
    />
  );
};

export default DoctorInfoPage;
