import WSelectMedicalDepartment from '@components/common/select/modules/WSelectMedicalDepartment';
import { DepartmentProps, DoctorInfoProps } from '../type';
import { ContentsSection } from '@components/setting/SettingTheme';
import WSubTitle from '@components/common/typography/WSubTitle';
import { WTextError } from '@components/common/typography/WCommonText';
import { useEffect } from 'react';

type DoctorRepresentDepartmentProps = DoctorInfoProps & {
  disabled?: boolean;
};

const DoctorRepresentDepartment = (props: DoctorRepresentDepartmentProps) => {
  const { state, setState, err, setErr, keyId, disabled } = props;

  useEffect(() => {
    if (state === 'DEFULT') {
      setErr({ msg: '진료과를 1개 이상 선택해 주세요.', boo: true }, keyId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return (
    <ContentsSection>
      <WSubTitle title={'대표 진료과'} titleSx={{ lineHeight: '24px' }} />
      <WSelectMedicalDepartment
        value={state}
        callBack={(id: string) => setState(id, keyId)}
        sx={{
          width: '250px',
          height: '50px',
        }}
        disabled={disabled}
      />
      <WTextError color={'#FC5935'} sx={{ paddingTop: '4px', height: '16px' }}>
        {err.boo ? err.msg : ''}
      </WTextError>
    </ContentsSection>
  );
};

export default DoctorRepresentDepartment;
