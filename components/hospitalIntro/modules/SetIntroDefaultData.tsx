import { Box, Stack } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import Input from '@components/common/inputs/Input';
import useValidation from '@hooks/useValidation';
import { ErrorType } from 'types/signin';
import WAddressSearch from '@components/common/inputs/data/WAddressSearch';
import { AddresData, BaseData, BaseDataType, LunchTIme } from '../type';
import WTwoTab from '@components/common/buttons/WTwoTab';
import { phoneFormat } from '@utils/formatNumber';
import WMaxTextarea from '@components/common/inputs/textarea/WMaxTextarea';
import SetIntroBox from './SetIntroBox';
import SetIntroLunchTimePicker from '../Inputs/SetIntroLunchTimePicker';

interface SetIntroDefaultData {
  baseData: BaseData;
  setDefaultOnChange: (value: BaseDataType, keyId: string) => void;
}

const SetIntroDefaultData = (props: SetIntroDefaultData) => {
  const { baseData, setDefaultOnChange } = props;
  const vaild = useValidation();
  const [start, setStart] = useState<string>('1100');
  const [end, setEnd] = useState<string>('1500');
  const [phone, setPhone] = useState<string>('');
  const [park, setPark] = useState<boolean>(false);
  const [addressState, setAddress] = useState<AddresData>({
    address: '',
    zipCode: '',
  });
  const [detailAddress, setDetailAddress] = useState<string>('');
  const [introductions, setIntroductions] = useState<string>('');
  const [phError, setPhError] = useState<ErrorType>({ msg: '', boo: false });
  const formChanger = phoneFormat(phone);

  useEffect(() => {
    setStart(
      Number(baseData.time.startTime) < 1100 || Number(baseData.time.startTime) > 1500
        ? '1100'
        : baseData.time.startTime,
    );
    setEnd(
      Number(baseData.time.endTime) > 1500 || Number(baseData.time.endTime) < 1100
        ? '1500'
        : baseData.time.endTime,
    );
    setPhone(baseData.phoneNumber);
    setPark(baseData.parking);
    setAddress(baseData.addresData);
    setDetailAddress(baseData.details);
    setIntroductions(baseData.introductions);
  }, [
    baseData,
    baseData.addresData,
    baseData.details,
    baseData.introductions,
    baseData.parking,
    baseData.phoneNumber,
    baseData.time.endTime,
    baseData.time.startTime,
  ]);

  useEffect(() => {
    return () => {
      setStart('1100');
      setEnd('1500');
      setPhone('');
      setPark(false);
      setAddress({
        address: '',
        zipCode: '',
      });
      setDetailAddress('');
      setIntroductions('');
    };
  }, []);

  const startDateOnChange = (date: string) => {
    const ogj: LunchTIme = { startTime: date, endTime: end };
    setDefaultOnChange(ogj, 'time');
    setStart(date);
  };
  const endDateOnChange = (date: string) => {
    const ogj: LunchTIme = { startTime: start, endTime: date };
    setDefaultOnChange(ogj, 'time');
    setEnd(date);
  };

  const phonrOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const txt = e.target.value;
      if (txt.length !== 0 && !vaild.regExNumberOnly.test(txt)) {
        setPhError({
          msg: '숫자만 입력 가능합니다.',
          boo: true,
        });
        return;
      }
      if (txt.length <= 13) {
        const phoneNum = phoneFormat(txt);
        setDefaultOnChange(phoneNum, 'phoneNumber');
        setPhone(phoneNum);
        setPhError({
          msg: '',
          boo: false,
        });
      }
    },
    [setDefaultOnChange, vaild.regExNumberOnly],
  );

  const addressOnChange = useCallback(
    async (address: string, postCode: string) => {
      const data = { address: address, zipCode: postCode };
      setDefaultOnChange(data, 'addresData');
      setAddress(data);
    },
    [setDefaultOnChange],
  );

  const parkOnChange = useCallback(
    (boo: boolean) => {
      setPark(boo);
      setDefaultOnChange(boo, 'parking');
    },
    [setDefaultOnChange],
  );

  const detailOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.value.length <= 30) {
        setDetailAddress(e.target.value);
        setDefaultOnChange(e.target.value, 'details');
      }
    },
    [setDefaultOnChange],
  );

  const introOnChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setIntroductions(e.target.value);
      setDefaultOnChange(e.target.value, 'introductions');
    },
    [setDefaultOnChange],
  );

  return (
    <Stack gap="12px">
      <SetIntroBox title="- 점심 시간(공통)">
        <SetIntroLunchTimePicker
          startDateOnChange={startDateOnChange}
          endDateOnChange={endDateOnChange}
          startTime={start}
          endTime={end}
        />
      </SetIntroBox>
      <Box height="10px" />
      <SetIntroBox title="- 대표 전화번호">
        <Input
          error={phError}
          value={formChanger}
          onChange={phonrOnChange}
          placeholder="- 대표 전화번호를 입력 하세요."
          readOnly
          disabled
        />
      </SetIntroBox>
      <SetIntroBox title=" - 주소">
        <WAddressSearch setAddress={addressOnChange} value={addressState.address} />
        <Box height="10px" />
        <Input
          name="hocAddress"
          placeholder="상세 주소을 입력해주세요"
          onChange={detailOnChange}
          value={detailAddress}
        />
      </SetIntroBox>
      <Box height={'10px'} />
      <SetIntroBox title="주차 가능 여부">
        <WTwoTab
          tab={park}
          setTab={parkOnChange}
          labelName={{ first: '주차 가능', second: '주차 불가능' }}
          sx={{
            justifyContent: 'space-between',
            '& .MuiTypography-root': {
              color: '#999',
            },
            '& .MuiFormGroup-root': {
              gap: '40px',
            },
            '& .Mui-checked': {
              '& .MuiSvgIcon-root': {
                color: '#4ac6ff',
              },
            },
            '& .MuiSvgIcon-root': {
              color: '#e7e6e7',
              fontSize: 24,
            },
          }}
        />
      </SetIntroBox>
      <Box height={'10px'} />
      <SetIntroBox title="- 소개">
        <WMaxTextarea
          value={introductions}
          onChange={introOnChange}
          placeholder="- 소개에 대한 설명을 입력하세요."
          maxLength={500}
          sx={{
            '& .W-Textarea': {
              height: '172px !important',
              overflowY: 'scroll !important',
              border: '1px solid #ebeced',
              outlineColor: '#ebeced',
              padding: '3px 3px 3px 13px',
              width: '100%',
              borderRadius: '6px',
              boxSizing: 'border-box',
              marginBottom: '8px',
            },
            '& .WMaxTextarea-Box': {
              borderColor: '#fff',
              padding: '0px',
            },
          }}
        />
      </SetIntroBox>
    </Stack>
  );
};

export default SetIntroDefaultData;
