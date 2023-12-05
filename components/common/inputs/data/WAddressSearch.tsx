import { Address, useDaumPostcodePopup } from 'react-daum-postcode';
import Image from 'next/image';
import { Box, Button, Grid, styled } from '@mui/material';
import { useEffect, useState } from 'react';
import Input from '@components/common/inputs/Input';

type WAddressSearch = {
  setAddress: (address: string, postCode: string) => void;
  value?: string;
};

export const AddressBtn = styled(Button)(({ theme }) => ({
  width: '46px',
  height: '46px',
  minWidth: '46px',
  boxShadow: 'none',
  backgroundColor: theme.palette.primary.main,
  color: '#fff',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const WAddressSearch = (props: WAddressSearch) => {
  const { setAddress, value } = props;
  const open = useDaumPostcodePopup();
  const [hocAddress, sethocAddress] = useState<string>('');
  const handleComplete = (data: Address) => {
    let fullAddress = data.address;
    let postCode = data.zonecode;
    let extraAddress = '';
    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }
    setAddress(fullAddress, postCode);
    sethocAddress(fullAddress);
  };

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

  useEffect(() => {
    if (value) {
      sethocAddress(value);
    }
  }, [value]);

  return (
    <Grid container gap="8px">
      <AddressBtn onClick={handleClick} color="info">
        <Image
          src={'/assets/icons/searchLight.svg'}
          alt="주소검색"
          width="24px"
          height="24px"
        />
      </AddressBtn>
      <Box sx={{ width: 'calc(100% - 56px)' }}>
        <Input
          disabled
          name="hocAddress"
          placeholder="주소을 입력해주세요"
          readOnly
          value={hocAddress}
        />
      </Box>
    </Grid>
  );
};

export default WAddressSearch;
