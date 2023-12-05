import {
  Box,
  Button,
  ButtonProps,
  Stack,
  styled,
  TextareaAutosize,
} from '@mui/material';

export const SymptomScrollBox = styled(Box)(({ theme }) => ({
  height: '184px',
  padding: '12px',
  border: '1px solid #EBECED',
  backgroundColor: '#fff',
  borderRadius: '6px',
  '& .symptom-scroll': {
    height: '112px',
    overflowY: 'scroll',
  },
}));

export const SymptomImage = styled(Box)(({ theme }) => ({
  width: '87px',
  height: '87px',
  overflow: 'hidden',
  borderRadius: '6px',
  backgroundColor: 'ButtonFace',
  position: 'relative',
}));

export const SymptomMeducalInterview = styled(Box)(({ theme }) => ({
  height: '154px',
  padding: '4px 4px 4px 16px',
  border: '1px solid #EBECED',
  backgroundColor: '#fff',
  borderRadius: '6px',
  overflowY: 'scroll',
}));

export const StateBox = styled(Stack)(({ theme }) => ({
  backgroundColor: '#eee',
  borderRadius: '5px',
  color: '#000',
  padding: '10px',
  gap: '10px',
  overflow: 'scroll',
  position: 'fixed',
  right: '100px',
  top: '200px',
  width: '300px',
  height: '300px',
  zIndex: '300',
}));

export const WaitingRoomTextarea = styled(TextareaAutosize)(({ theme }) => ({
  resize: 'none',
  border: '0px',
  fontSize: '14px',
  lineHeight: '1.4',
  width: '100%',
  outlineColor: '#fff',
  overflowY: 'scroll',
  '&:disabled': {
    backgroundColor: '#F8F8F8',
    color: '#CCC',
  },
}));

export const WatingRoomButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#F0FAFF',
  color: '#4AC6FF',
  padding: '13px',
  boxShadow: '0px 0px 0px',
  borderRadius: '6px',
  fontSize: '16px',
  borderColor: '#F0FAFF',
  lineHeight: '1',
  fontWeight: '500',
  letterSpacing: '0px',
  border: '1px solid #4AC6FF',
  '&.Mui-disabled': {
    backgroundColor: '#F8F8F8',
    borderColor: '#F8F8F8',
    color: '#ccc',
  },
}));

export const PatientInfoButton = styled(Button)(({ theme }) => ({
  padding: '8px',
  fontSize: '12px',
  minWidth: 'auto',
  letterSpacing: '-1px',
  borderRadius: '6px',
  border: '1px solid #ebeced',
  lineHeight: '1',
  color: '#606060',
}));

export const WatingRoomHeaderBtn = styled((props: ButtonProps) => (
  <Button variant="outlined" color="info" {...props} />
))(({ theme }) => ({
  width: '100px',
  fontSize: '1rem',
  fontWeight: '900',
  border: '1px solid #ebeced',
  padding: '0px',
  backgroundColor: '#fff',
  '&.is-treat': {
    backgroundColor: '#4ac6ff',
    color: '#fff',
  },
}));
