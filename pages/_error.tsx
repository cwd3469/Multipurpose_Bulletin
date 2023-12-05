import CustomPage from '@components/404/CustomPage';

const MaintenancePage = () => {
  const info = {
    title: '서비스 점검안내',
    contents1: '- 서비스 안정화를 위해 서버 점검을 진행 중입니다.',
    contents2: '점검 상황에 따라 지연될 수 있는 점 양해 부탁드립니다.',
    InspectionData: 'YYYY. MM. DD 00:00 ~ 00:00',
    extensionData: 'YYYY. MM. DD 00:00 ~ 00:00',
  };
  return <CustomPage info={info} />;
};

export default MaintenancePage;
