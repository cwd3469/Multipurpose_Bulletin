import {
  SaveBackButton,
  SaveButton,
} from '@components/hospitalIntro/modules/SetIntroTheme';
import { ContentsBox } from '@components/setting/SettingTheme';
import { Grid, Stack, Typography } from '@mui/material';
import { ContantsLayout } from '@components/common/layout/Layout';
interface ViewLayoutProps {
  title: string;
  mode: 'modify' | 'register';
  disabled?: boolean;
  layoutEvent?: () => void;
  cancelEvent?: () => void;
  deleteEvent?: () => void;
  children?: JSX.Element | JSX.Element[];
  sideContents?: JSX.Element | JSX.Element[];
}

const ViewLayout = (props: ViewLayoutProps) => {
  const {
    title,
    disabled,
    mode,
    layoutEvent,
    cancelEvent,
    deleteEvent,
    children,
    sideContents,
  } = props;
  return (
    <ContantsLayout
      bg="#F8F8F8"
      containerColor="#F8F8F8"
      sx={{ padding: '40px 0' }}
    >
      <Stack gap="20px">
        <Grid
          container
          alignItems="center"
          sx={{ justifyContent: 'space-between' }}
        >
          <Typography variant="h5">{title}</Typography>
          {sideContents}
        </Grid>
        <ContentsBox
          width="100%"
          sx={{ height: '630px', padding: '40px 30px' }}
        >
          {children}
        </ContentsBox>

        <Grid
          container
          justifyContent={'center'}
          width="100%"
          paddingTop="4px"
          gap="40px"
        >
          {cancelEvent ? (
            <SaveBackButton variant="contained" onClick={cancelEvent}>
              취소
            </SaveBackButton>
          ) : (
            ''
          )}
          {layoutEvent ? (
            <SaveButton
              variant="contained"
              onClick={layoutEvent}
              disabled={disabled}
            >
              {mode === 'register' ? '등록' : '수정'}
            </SaveButton>
          ) : (
            ''
          )}
          {deleteEvent ? (
            <SaveButton variant="contained" onClick={deleteEvent}>
              삭제
            </SaveButton>
          ) : (
            ''
          )}
        </Grid>
      </Stack>
    </ContantsLayout>
  );
};

export default ViewLayout;
