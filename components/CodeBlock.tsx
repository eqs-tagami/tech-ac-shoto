import React from 'react'
import { useTheme, Theme } from '@mui/material/styles';
import { Box, BoxProps } from '@mui/material';
import { SystemStyleObject } from '@mui/system';
import ContentCopyIcon from '@mui/icons-material/ContentCopyRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { getNodeText } from '@lib/util';
import { Prism as SyntaxHighlighter, SyntaxHighlighterProps } from 'react-syntax-highlighter';
import IconButton from '@mui/material/IconButton';

// https://k8shiro.github.io/ReactCompareCodeHighlighter/
import { a11yDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
// import { monokaiSublime } from "react-syntax-highlighter/dist/cjs/styles/hljs";


export default function CodeBlock(props: BoxProps & {
  language?: string
  fileName?: string
  copy?: boolean
  copyIcon?: React.ReactNode
  SyntaxHighlighterProps?: SyntaxHighlighterProps
}){
  const theme = useTheme();
  const {
    copy,
    copyIcon,
    sx,
    children,
    ...boxProps
  } = props;

  const defaultEndIcon = copyIcon? copyIcon : copy? <ContentCopyIcon/> : undefined;
  const [check, setCheck] = React.useState<React.ReactNode>(false);

  const markdown = getNodeText(children).trim();

  const handleCopy = (text: string, result: boolean) => {
    if(result){
      setCheck(true);
      setTimeout(()=>{
        setCheck(false);
      },2000);
    }
  }

  return  (
    <Box 
      sx={[
        {
          borderRadius: '10px',
          overflow: 'hidden',
          my: 1,
          position: 'relative',
          '& > pre': {
            m: '0 !important',
          },
          '&:hover .MuiButtonBase-root': {
            visibility: 'visible',
            opacity: 1,
          }
        },
        sx as boolean | SystemStyleObject<Theme> | ((theme: Theme) => SystemStyleObject<Theme>)
      ]} {...boxProps}>
        {copy && <>
          <CopyToClipboard text={markdown} onCopy={handleCopy}>
            <IconButton
              sx={{
                position: 'absolute',
                top: 4,
                right: 4,
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
              {check? <CheckRoundedIcon/> : defaultEndIcon}
            </IconButton>
          </CopyToClipboard>
        </>}
        <SyntaxHighlighter
          style={a11yDark}
          language={props.language}
          children={markdown}
          {...props.SyntaxHighlighterProps}
        />
      </Box>
  )
}