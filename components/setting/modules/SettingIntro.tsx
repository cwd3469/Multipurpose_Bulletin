import { Dispatch, SetStateAction, useCallback } from 'react';
import { ContentsSection } from '../SettingTheme';
import { Box, Grid } from '@mui/material';
import WSubTitle from '@components/common/typography/WSubTitle';
import WMaxTextarea from '@components/common/inputs/textarea/WMaxTextarea';

interface SettingIntro {
  state: string;
  setState: Dispatch<SetStateAction<string>>;
}

const SettingIntro = ({ state, setState }: SettingIntro) => {
  const introOnChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const { value } = e.target;
      setState(value);
    },
    [setState],
  );

  return (
    <ContentsSection>
      <WSubTitle title={'의사 소개'} titleSx={{ lineHeight: '24px' }} />
      <Grid container className="body" sx={{ width: '100%' }}>
        <Box width="100%">
          <WMaxTextarea
            value={state}
            onChange={introOnChange}
            placeholder="의사 소개에 대한 설명을 입력하세요."
            maxLength={300}
            sx={{
              '& .W-Textarea': {
                height: '116px !important',
                fontSize: '14px',
                lineHeight: '1.2',
                overflowY: 'scroll !important',
              },
              '& .WMaxTextarea-Box': {
                padding: '8px 12px 12px',
              },
            }}
          />
        </Box>
      </Grid>
    </ContentsSection>
  );
};

export default SettingIntro;
