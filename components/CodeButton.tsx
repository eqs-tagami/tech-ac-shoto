import React from 'react'
import { Theme } from '@mui/material/styles';
import { Button, ButtonProps } from '@mui/material';
import { SystemStyleObject } from '@mui/system';
import ContentCopyIcon from '@mui/icons-material/ContentCopyRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { getNodeText } from '@lib/util';

export default function CodeButton(props: ButtonProps & {
  copy?: boolean
}){
  const {
    copy,
    sx,
    endIcon,
    children,
    ...buttonProps
  } = props;

  const defaultEndIcon = endIcon? endIcon : copy? <ContentCopyIcon/> : undefined;
  const [check, setCheck] = React.useState<React.ReactNode>(false);

  const handleCopy = (text: string, result: boolean) => {
    if(result){
      setCheck(true);
      setTimeout(()=>{
        setCheck(false);
      },2000);
    }
  }

  const button = (
    <Button 
      variant="outlined"
      size="large"
      endIcon={check? <CheckRoundedIcon/> : defaultEndIcon}
      disableElevation
      sx={[
        {
          textTransform: 'initial',
          borderRadius: '10px',
          py: '14px',
          pl: '16px',
          pr: defaultEndIcon? '50px' : '16px',
          color: '#2D3843',
          borderColor: '#CDD2D7',
          backgroundColor: '#F3F6F9',
          fontFamily: 'Consolas,Menlo,Monaco,Andale Mono,Ubuntu Mono,monospace',
          fontWeight: 400,
          fontSize: 13,
          lineHeight: 1.5,
          letterSpacing: 0,
          display: 'inline-block',
          justifyContent: 'start',
          overflowX: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          maxWidth: '100%',
          position: 'relative',
          '& .MuiButton-endIcon': {
            display: 'inline-block',
            position: 'absolute',
            right: 0,
            marginRight: '10px',
            color: check? '#007FFF' : '#3E5060',
          },
          '&:hover': {
            borderColor: '#007FFF',
            backgroundColor: '#F0F7FF',
          },
          '&:hover .MuiButton-endIcon': {
            color: '#007FFF',
          }
        },
        sx as boolean | SystemStyleObject<Theme> | ((theme: Theme) => SystemStyleObject<Theme>)
      ]} {...buttonProps}>{children}</Button>
  )

  return copy?
    <CopyToClipboard text={getNodeText(children)}
        onCopy={handleCopy}>
      {button}
    </CopyToClipboard>
    : button;
}