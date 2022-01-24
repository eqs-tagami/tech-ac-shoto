import React from 'react'
import { useTheme, Theme } from '@mui/material/styles';
import { Alert, AlertProps } from '@mui/material';
import { SystemStyleObject } from '@mui/system';
import ContentCopyIcon from '@mui/icons-material/ContentCopyRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import { CopyToClipboard } from 'react-copy-to-clipboard';
// import { getNodeText } from '@lib/util';
import IconButton from '@mui/material/IconButton';

export default function ResultBox(props: AlertProps & {
  notinput?: boolean
}){
  const theme = useTheme();
  const {
    sx,
    children,
    ...alertProps
  } = props;

  const [check, setCheck] = React.useState<React.ReactNode>(false);
  const result = props.notinput? "入力フォームに数値が入力されていません" : children;
  const severity = props.notinput? "warning" : children==null? "error" : "success";

  const handleCopy = (text: string, result: boolean) => {
    if(result){
      setCheck(true);
      setTimeout(()=>{
        setCheck(false);
      },2000);
    }
  }

  return  (
    <Alert 
      icon={false}
      severity={severity}
      sx={[
        {
          fontSize: '16px',
          borderRadius: '8px',
          minHeight: '50px',
          position: 'relative',
          '&:hover .MuiButtonBase-root': {
            visibility: 'visible',
            opacity: 1,
          }
        },
        sx as boolean | SystemStyleObject<Theme> | ((theme: Theme) => SystemStyleObject<Theme>)
      ]} {...alertProps}>
          <CopyToClipboard text={String(result)} onCopy={handleCopy}>
            <IconButton
              sx={{
                position: 'absolute',
                top: 2,
                right: 2,
                color: check? '#3F9DFF' : `#C3CBD3`,
                visibility: check? 'visible' : 'hidden',
                opacity: check? 1 : 0,
                transition: theme.transitions.create(['opacity'], {
                  easing: theme.transitions.easing.sharp,
                  duration: theme.transitions.duration.leavingScreen,
                }),
                '&:hover':{
                  color: '#3F9DFF',
                },
              }}
              size="large"
              color="inherit">
              {check? <CheckRoundedIcon/> : <ContentCopyIcon/>}
            </IconButton>
          </CopyToClipboard>
        {String(result)}
      </Alert>
  )
}