import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

export const StyledColorPicker = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(1),
  padding: theme.spacing(1),
  '&:focus': {
    outline: 'none',
  },
}));

export const StyledLabel = styled('span')(({ theme }) => ({
  display: 'block',
  marginTop: theme.spacing(0.5),
  fontSize: theme.typography.caption.fontSize,
  color: theme.palette.text.secondary,
  textAlign: 'center',
}));

export const StyledColorWrapper = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
}));

export const ExpandLabel = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  fontWeight: 500,
  fontSize: '14px',
  color: '#666',
  textDecoration: 'underline',
}));
