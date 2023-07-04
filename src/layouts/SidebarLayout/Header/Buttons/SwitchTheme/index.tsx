import { useState, useContext, useRef } from 'react';
import {
  Button,
  List,
  ListItem,
  Tooltip,
  Popover,
  ButtonProps
} from '@mui/material';
import { styled } from '@mui/material/styles';

import { ThemeContext } from '@/theme/ThemeProvider';
import { PureLightTheme } from '@/theme/schemes/PureLightTheme';
import { GreyGooseTheme } from '@/theme/schemes/GreyGooseTheme';
import { PurpleFlowTheme } from '@/theme/schemes/PurpleFlowTheme';

const themes: string[] = [
  'PureLightTheme',
  'GreyGooseTheme',
  'PurpleFlowTheme'
];

const themeColors: { [theme: string]: string } = {
  PureLightTheme: PureLightTheme.colors.primary.main,
  GreyGooseTheme: GreyGooseTheme.colors.primary.main,
  PurpleFlowTheme: PurpleFlowTheme.colors.primary.main
};

const ThemeButton = styled(Button)<ButtonProps>(() => ({
  width: 40,
  height: 40,
  borderRadius: '50%',
  minWidth: 40
}));

function SwitchTheme() {
  const { setThemeName } = useContext(ThemeContext);
  const ref = useRef<any>(null);

  const [isOpen, setOpen] = useState<boolean>(false);

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const switchTheme = (themeName: string) => {
    setThemeName(themeName);
    handleClose();
  };

  return (
    <>
      <Tooltip arrow title="Notifications">
        <ThemeButton
          ref={ref}
          onClick={handleOpen}
          variant="contained"
          size="medium"
        />
      </Tooltip>
      <Popover
        anchorEl={ref.current}
        onClose={handleClose}
        open={isOpen}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        <List sx={{ p: 0 }}>
          {themes.map((theme) => (
            <ListItem
              key={theme}
              sx={{ p: 1, display: { xs: 'block', sm: 'flex' } }}
            >
              <ThemeButton
                variant="contained"
                size="medium"
                style={{
                  color: themeColors[theme],
                  backgroundColor: themeColors[theme]
                }}
                onClick={() => switchTheme(theme)}
              />
            </ListItem>
          ))}
        </List>
      </Popover>
    </>
  );
}

export default SwitchTheme;
