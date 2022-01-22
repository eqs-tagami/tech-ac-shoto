import * as React from 'react';
import { styled, alpha, useTheme, Theme, Breakpoint, CSSObject } from '@mui/material/styles';
import { css } from '@emotion/react';
import Link from 'next/link';
import { UrlObject } from 'url';
import { SystemStyleObject } from '@mui/system';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
// import MuiDrawer from '@mui/material/Drawer';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Slide from '@mui/material/Slide';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Zoom from '@mui/material/Zoom';
import Tooltip from '@mui/material/Tooltip';
import Container from '@mui/material/Container';

import MenuIcon from '@mui/icons-material/MenuRounded';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightIcon from '@mui/icons-material/ChevronRightRounded';
import MailIcon from '@mui/icons-material/MailRounded';
import SearchIcon from '@mui/icons-material/SearchRounded';
import AccountCircle from '@mui/icons-material/AccountCircleRounded';
import NotificationsIcon from '@mui/icons-material/NotificationsRounded';
import DashboardIcon from '@mui/icons-material/DashboardRounded';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCartRounded';
import PeopleIcon from '@mui/icons-material/PeopleRounded';
import BarChartIcon from '@mui/icons-material/BarChartRounded';
import LocalMallRoundedIcon from '@mui/icons-material/LocalMallRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
// import InboxIcon from '@mui/icons-material/MoveToInboxRounded';
// import MoreIcon from '@mui/icons-material/MoreVertRounded';
// import FolderIcon from '@mui/icons-material/FolderRounded';
// import RestoreIcon from '@mui/icons-material/RestoreRounded';
// import FavoriteIcon from '@mui/icons-material/FavoriteRounded';
// import ArchiveIcon from '@mui/icons-material/ArchiveRounded';
// import LocationOnIcon from '@mui/icons-material/LocationOnRounded';
// import LayersIcon from '@mui/icons-material/LayersRounded';

// サイドバーの横幅
const drawerWidth = 240;

const menuId = 'primary-search-account-menu';

export default function Layout(props:{
  children: React.ReactNode
  maxWidth?: Breakpoint | false
}) {
  const theme = useTheme();
  const scrollTrigger = useScrollTrigger();

  // ドロワーの開閉
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
    setOpenTmp(false);
  };

  // スマホ用ドロワー
  const [smOpen, setSmOpen] = React.useState(false);
  const handleDrawerSmOpen = () => {
    setSmOpen(true);
  };
  const handleDrawerSmClose = () => {
    setSmOpen(false);
  };

  // 一時的なドロワーの開閉
  const [openTmp, setOpenTmp] = React.useState(false);
  const handleDrawerOpenTmp = () => {
    setOpenTmp(true);
  };
  const handleDrawerCloseTmp = () => {
    setOpenTmp(false);
  };

  // ポップアップメニュー
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // ボトムナビゲーション
  const [navigationValue, setNavigationValue] = React.useState('recents');
  const handleNavigationChange = (event: React.SyntheticEvent, newValue: string) => {
    setNavigationValue(newValue);
  };

  // ナビゲーションのリスト作成
  const createNavigationList = (items:{
    href: string | UrlObject
    text: React.ReactNode
    icon: React.ReactNode
    badge?: React.ReactNode
  }[]) => (
    <List sx={{'& a':{display:'block', color:'inherit', textDecoration:'none'}}}>
      {items.map((item, index) => (
        <Link href={item.href} key={index}>
          <a>
            <ListItem button>
              <ListItemIcon>
                {item.badge
                  ? <Badge badgeContent={item.badge} color="warning">{item.icon}</Badge>
                  : item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          </a>
        </Link>
      ))}
    </List>
  )

  return (
    <Box sx={{
      display:'flex',
      pb: { xs: 7, sm: 0 },
      height:'100%'
    }}>
      <CssBaseline />
      <Slide appear={false} direction="down" in={!scrollTrigger}>
        <AppBar position="fixed" sx={{
          zIndex: theme.zIndex.drawer + 1,
          transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          background: `rgba(255,255,255,0.7)`,
          backdropFilter: `blur(20px)`,
          color: `#2D3843`,
          [theme.breakpoints.up('sm')]: {
            transform: 'none !important',
            visibility: 'visible !important',
          },
        }}>
          <Toolbar>
            <Box sx={{'& a':{display:'block', color:'inherit', textDecoration:'none'}}}>
              <Link href='/'>
                <a>
                  <Stack direction="row" alignItems="center">
                    <Box>
                      <img src="/icon.svg" alt="D" css={css({
                        height: '28px',
                        marginRight: '8px',
                      })} />
                    </Box>
                    <Typography variant="h6" noWrap component="div">
                      Daichi Next
                    </Typography>
                  </Stack>
                </a>
              </Link>
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <Box component="div" sx={{
              display: { xs: 'none', md: 'block' },
              position: 'relative',
              borderRadius: theme.shape.borderRadius,
              border: `1px solid rgb(224, 227, 231)`,
              backgroundColor: `rgba(235, 238, 241, .5)`,
              '&:hover': {
                backgroundColor: `rgba(235, 238, 241, .7)`,
              },
              marginRight: theme.spacing(2),
              marginLeft: 0,
              width: '100%',
              [theme.breakpoints.up('sm')]: {
                marginLeft: theme.spacing(3),
                width: 'auto',
              },
            }}>
              <Box component="div" sx={{
                padding: theme.spacing(0, 2),
                height: '100%',
                position: 'absolute',
                pointerEvents: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: `#007FFF`,
              }}>
                <SearchIcon />
              </Box>
              <InputBase
                placeholder="Search…"
                inputProps={{'aria-label':'search'}}
                sx={{
                  color: 'inherit',
                  '& .MuiInputBase-input': {
                    padding: theme.spacing(1, 1, 1, 0),
                    // vertical padding + font size from searchIcon
                    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
                    transition: theme.transitions.create('width'),
                    width: '100%',
                    [theme.breakpoints.up('md')]: {
                      width: '20ch',
                    },
                  },
                }}
              />
            </Box>
            <Stack direction="row">
              <IconButton
                sx={{ display: { xs: 'none', sm: 'flex', md: 'none' }, color: `#007FFF`}}
                size="large"
                color="inherit">
                <SearchIcon />
              </IconButton>
              <Box sx={{'& a':{display:'block', color:'inherit', textDecoration:'none'}}}>
                <Link href='/'>
                  <a>
                    <IconButton
                      sx={{ color: `#007FFF` }}
                      size="large"
                      aria-label="show 17 new notifications"
                      color="inherit">
                      <Badge badgeContent={17} color="warning">
                        <NotificationsIcon />
                      </Badge>
                    </IconButton>
                  </a>
                </Link>
              </Box>
              <IconButton
                sx={{ display: { xs: 'none', sm: 'flex' }, color: `#007FFF`}}
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit">
                <AccountCircle />
              </IconButton>
              <IconButton
                sx={{ display: { xs: 'flex', sm: 'none' } }}
                size="large"
                aria-label="show more"
                onClick={smOpen? handleDrawerSmClose : handleDrawerSmOpen}
                color="inherit">
                {/* <MoreIcon /> */}
                <MenuIcon />
              </IconButton>
            </Stack>
          </Toolbar>
        </AppBar>
      </Slide>
      <Menu
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        id={menuId}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>プロファイル</MenuItem>
        <MenuItem onClick={handleMenuClose}>アカウント情報</MenuItem>
      </Menu>
      {['sp','pc'].map(value=>
        <Drawer 
          key={value}
          variant={value=='sp'?"temporary":"permanent"}
          sx={value=='sp'? 
            {
              display: { xs: 'block', sm: 'none' },
              zIndex: theme.zIndex.drawer + 2,
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
              },
            } : {
              display: { xs: 'none', sm: 'block' },
              width: drawerWidth,
              flexShrink: 0,
              whiteSpace: 'nowrap',
              boxSizing: 'border-box',
              ...(()=>{
                const mixin:SystemStyleObject<Theme> = open || openTmp? {
                  width: drawerWidth,
                  transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.enteringScreen,
                  }),
                  overflowX: 'hidden',
                } : {
                  width: `calc(${theme.spacing(7)} + 1px)`,
                  transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                  }),
                  overflowX: 'hidden',
                };
                return {
                  ...mixin,
                  ...(!open && {
                    position: 'absolute',
                  }),
                  '& .MuiDrawer-paper': mixin,
                }
              })(),
            }
          }
          {...(()=>(value=='sp' && {
            ModalProps:{
              keepMounted: true, // Better open performance on mobile.
            },
            open:smOpen,
            onClose:handleDrawerSmClose,
          }))()}>
          <Stack direction="column" sx={{height: '100%'}}>
            <Box>
              <Toolbar sx={{justifyContent: 'flex-end'}}>
                {value=='sp' && 
                  <IconButton onClick={handleDrawerSmClose}>
                    <CloseRoundedIcon />
                  </IconButton>
                }
              </Toolbar>
              {value=='sp' && <Divider />}
            </Box>
            <Stack direction="column" sx={{
              flexGrow: 1,
              overflowX:'hidden',
              overflowY: 'auto'}}>
              <Box 
                {...(()=>(value!='sp' && {
                  onMouseEnter:handleDrawerOpenTmp,
                  onMouseLeave:handleDrawerCloseTmp,
                }))()}>
                {createNavigationList([
                  {text:'ダッシュボード',href:'/',icon:<DashboardIcon />}, 
                  {text:'注文',href:'/',icon:<ShoppingCartIcon />,badge:3}, 
                  {text:'顧客',href:'/',icon:<PeopleIcon />}, 
                  {text:'レポート',href:'/',icon:<BarChartIcon />},
                  {text:'商品',href:'/',icon:<LocalMallRoundedIcon />},
                ])}
                <Divider />
                {createNavigationList([
                  {text:'メール',href:'/',icon:<MailIcon />,badge:0},
                  {text:'設定',href:'/',icon:<SettingsRoundedIcon />},
                ])}
                {value=='sp' && <>
                  <Divider />
                  {createNavigationList([
                    {text:'検索',href:'/',icon:<SearchIcon />,badge:0},
                    {text:'アカウント',href:'/',icon:<AccountCircle />},
                    {text:'プライバシー',href:'/',icon:<ArticleRoundedIcon />},
                    {text:'利用規約',href:'/',icon:<ArticleRoundedIcon />},
                  ])}
                </>}
              </Box>
              {value=='sp' && <>
                <Box sx={{ flexGrow: 1 }} />
                <Divider />
                <List>
                  <ListItem>
                    <Box className="copyright" sx={{fontSize:'12px', color:'#666'}}>
                      &copy; {new Date().getFullYear()} DAICHI GROUP
                    </Box>
                  </ListItem>
                </List>
              </>}
            </Stack>
            {value!='sp' && <>
              <Box sx={{maxWidth: '100% !important'}}>
                <Divider />
                <List>
                  <Tooltip 
                    title={open? "サイドバーを折りたたむ" : "サイドバーを展開する"} 
                    placement="right" 
                    TransitionComponent={Zoom} 
                    arrow>
                    <ListItem button 
                      onClick={open? handleDrawerClose : handleDrawerOpen}
                      sx={{
                        justifyContent: 'flex-end',
                        color: `rgba(0, 0, 0, 0.54)`,
                      }}>
                      {open? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </ListItem>
                  </Tooltip>
                </List>
              </Box>
            </>}
          </Stack>
        </Drawer>
      )}
      <Box component="main" sx={{ 
        flexGrow: 1,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          ...(open ? {
            width: `calc(100% - ${drawerWidth}px)`,
          } : {
            width: `calc(100% - ${theme.spacing(7)} - 1px)`,
            ml: `calc(${theme.spacing(7)} + 1px)`,
          }),
        }
      }}>
        <Stack direction="column" sx={{height: '100%'}}>
          <Box>
            <Toolbar />
          </Box>
          <Box sx={{
            py: 3,
            flexGrow: 1,
            [theme.breakpoints.down('sm')]: {
              pb: 10,
            }
          }}>
            <Container maxWidth={props.maxWidth}>
              {props.children}
            </Container>
          </Box>
          <Box sx={{
            display: { xs: 'none', sm: 'block' },
            px: 2,
          }}>
            <Divider />
            <Stack id="footer" direction="row" alignItems="center" sx={{height:theme.spacing(7)}}>
              <Box className="copyright" sx={{p:2, fontSize:'12px', color:'#666'}}>
                Copyright &copy; {new Date().getFullYear()} DAICHI GROUP
              </Box>
              <Box sx={{ flexGrow: 1 }} />
              <Box sx={{p:2, fontSize:'12px', color:'#666', '& a':{color:'inherit', textDecoration:'none'}}}>
                <Link href='/'>
                  <a>プライバシー</a>
                </Link>
              </Box>
              <Box sx={{p:2, fontSize:'12px', color:'#666', '& a':{color:'inherit', textDecoration:'none'}}}>
                <Link href='/'>
                  <a>利用規約</a>
                </Link>
              </Box>
            </Stack>
          </Box>
        </Stack>
      </Box>
      <Paper sx={{ 
        display: { xs: 'block', sm: 'none' },
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: `rgba(255,255,255,0.7)`,
        backdropFilter: `blur(20px)`,
      }} elevation={3}>
        <BottomNavigation
          showLabels
          value={navigationValue}
          onChange={handleNavigationChange}
          sx={{
            backgroundColor: `transparent`,
            '& .MuiBottomNavigationAction-root': {
              minWidth: '64px',
            },
          }}
        >
          <BottomNavigationAction label="ボード" icon={<DashboardIcon />} />
          <BottomNavigationAction label="注文" icon={
            <Badge badgeContent={3} color="warning"><ShoppingCartIcon /></Badge>
          } />
          <BottomNavigationAction label="顧客" icon={<PeopleIcon />} />
          <BottomNavigationAction label="レポート" icon={<BarChartIcon />} />
          <BottomNavigationAction label="商品" icon={<LocalMallRoundedIcon />} />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}
