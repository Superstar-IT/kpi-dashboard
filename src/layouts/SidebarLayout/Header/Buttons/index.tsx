import { Box } from '@mui/material';
import SwitchTheme from './SwitchTheme';

function HeaderButtons() {
  return (
    <Box sx={{ mr: 1 }}>
      <SwitchTheme />
    </Box>
  );
}

export default HeaderButtons;
