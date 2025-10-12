import { styled } from '@mui/material/styles';

export const StyledDummyComp = styled('div')(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    // Add your styles here
}));
