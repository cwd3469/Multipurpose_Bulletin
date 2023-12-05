import CustomPage from '@components/404/CustomPage';

export interface CustomInfo {
  title?: string;
  contents1?: string;
  contents2?: string;
  InspectionData?: string;
  extensionData?: string;
}

const Custom404 = () => {
  const info = {
    title: '페이지를 찾을 수 없습니다.',
    contents1: '입력하신 주소가 정확한지 다시 한번 확인해 주시기 바랍니다.',
  };
  return <CustomPage info={info} />;
};

export default Custom404;
