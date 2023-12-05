import { Box, FormControl, MenuItem, Select, Stack } from '@mui/material';
import WConfirmModal from '@components/common/modal/WConfirmModal';
import ExpandMoreSharpIcon from '@mui/icons-material/ExpandMoreSharp';
import Input from '@components/common/inputs/Input';
import WSubTitle from '@components/common/typography/WSubTitle';
import { ReceptionRefusalView } from '../type';
import { useDebounceFn } from 'ahooks';

const ReceptionRefusalView = (props: ReceptionRefusalView) => {
  const {
    registration,
    modlaClose,
    onChangeRefusal,
    onSelectRefusal,
    refusalVaild,
    disabled,
    modalDisabled,
    err,
    value,
    refusalState,
    refusal,
    open,
  } = props;

  const onDebounceFnRegistration = useDebounceFn(registration, {
    wait: 300,
  });

  return (
    <WConfirmModal
      open={open}
      handleClose={modlaClose}
      disabled={modalDisabled}
      title="접수 거절 사유"
      subTitle="해당 환자의 진료를 거절하기 위해서는 아래의 사유를 선택해 주세요"
      activeOn
      handleEvent={onDebounceFnRegistration.run}
    >
      <Stack gap="40px" width="450px">
        <Stack gap="16px">
          <WSubTitle title="거절 사유" require />
          <FormControl fullWidth>
            <Select
              labelId="refusal-label"
              id="refusal-select"
              value={refusalState}
              onChange={onSelectRefusal}
              IconComponent={ExpandMoreSharpIcon}
              sx={{
                '& .MuiSelect-select': {
                  padding: '14px 2px 14px 14px',
                  paddingRight: '0px !important',
                },
              }}
            >
              {refusal.map((item, index) => {
                return (
                  <MenuItem key={index} value={item.id}>
                    {item.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Stack>
        {disabled ? (
          <Box height="200px" />
        ) : (
          <Stack gap="16px">
            <WSubTitle title="직접 입력" />
            <Input
              helper="환자에게 전달할 거절 사유를 입력해주세요."
              placeholder="거절 사유를 입력해 주세요."
              value={value}
              onChange={onChangeRefusal}
              error={err}
              focusOutEvent={() => refusalVaild(value)}
            />
            <Box height="52px" />
          </Stack>
        )}
      </Stack>
    </WConfirmModal>
  );
};
export default ReceptionRefusalView;
