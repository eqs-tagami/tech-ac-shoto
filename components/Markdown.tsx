import React from 'react'
import { Theme } from '@mui/material/styles';
import { Box, BoxProps } from '@mui/material';
import { SystemStyleObject } from '@mui/system';
import { getNodeText } from '@lib/util';

import ReactMarkdown from 'react-markdown';
import { CodeComponent } from 'react-markdown/lib/ast-to-react';
import { SyntaxHighlighterProps } from 'react-syntax-highlighter';
import CodeBlock from "@components/CodeBlock";


export default function Markdown(props: BoxProps & {
  copy?: boolean
  copyIcon?: React.ReactNode
  SyntaxHighlighterProps?: SyntaxHighlighterProps
}){
  const {
    copy,
    copyIcon,
    SyntaxHighlighterProps,
    sx,
    children,
    ...boxProps
  } = props;

  // 参考：https://goodlife.tech/posts/react-markdown-code-highlight.html
  const CodeBlockStyle: CodeComponent = ({ inline, className, children }) => {
    if (inline) {
      return <code className={className}>{children}</code>;
    }
    const match = /language-(\w+)(:.+)/.exec(className || '');
    const lang = match && match[1] ? match[1] : '';
    const name = match && match[2] ? match[2].slice(1) : '';
    return (
      <CodeBlock
        language={lang}
        fileName={name}
        copy={copy}
        copyIcon={copyIcon}
        SyntaxHighlighterProps={SyntaxHighlighterProps}
        children={children}
      />
    );
  }

  return (
    <Box 
      sx={[
        // {
        // },
        sx as boolean | SystemStyleObject<Theme> | ((theme: Theme) => SystemStyleObject<Theme>)
      ]} {...boxProps}>
        <ReactMarkdown components={{
          code: CodeBlockStyle,
        }}>
          {getNodeText(children).trim()}
        </ReactMarkdown>
      </Box>
  )
}