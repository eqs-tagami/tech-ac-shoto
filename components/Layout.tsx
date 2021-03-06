import * as React from 'react';
import { css } from '@emotion/react';
import Link from 'next/link';
import { UrlObject } from 'url';

import { useSelector, useDispatch } from 'react-redux'
import { StoreState } from '@lib/createStore'
import { navigationSlice } from '@lib/slice/navigation'

import { styled, alpha, useTheme, Theme, Breakpoint, CSSObject } from '@mui/material/styles';
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
import Collapse from '@mui/material/Collapse';

import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
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
import ExpandLessIcon from '@mui/icons-material/ExpandLessRounded';
import ExpandMoreIcon from '@mui/icons-material/ExpandMoreRounded';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjectsRounded';
// import InboxIcon from '@mui/icons-material/MoveToInboxRounded';
// import MoreIcon from '@mui/icons-material/MoreVertRounded';
// import FolderIcon from '@mui/icons-material/FolderRounded';
// import RestoreIcon from '@mui/icons-material/RestoreRounded';
// import FavoriteIcon from '@mui/icons-material/FavoriteRounded';
// import ArchiveIcon from '@mui/icons-material/ArchiveRounded';
// import LocationOnIcon from '@mui/icons-material/LocationOnRounded';
// import LayersIcon from '@mui/icons-material/LayersRounded';

import FontAwesomeSvgIcon from '@components/FontAwesomeSvgIcon';
import { faAws } from '@fortawesome/free-brands-svg-icons';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';

import { getNodeText } from '@lib/util';

// ????????????????????????
const drawerWidth = 240;

const menuId = 'primary-search-account-menu';

export default function Layout(props:{
  children: React.ReactNode
  maxWidth?: Breakpoint | false
}) {
  const theme = useTheme();
  const scrollTrigger = useScrollTrigger();
  const dispatch = useDispatch();
  
  // ?????????????????????
  const open = useSelector((state:StoreState) => state.navigation.open);
  const handleDrawerOpen = () => {
    dispatch(navigationSlice.actions.setOpen(true));
  };
  const handleDrawerClose = () => {
    dispatch(navigationSlice.actions.setOpen(false));
    setOpenTmp(false);
  };

  // ????????????????????????
  const [smOpen, setSmOpen] = React.useState(false);
  const handleDrawerSmOpen = () => {
    setSmOpen(true);
  };
  const handleDrawerSmClose = () => {
    setSmOpen(false);
  };

  // ?????????????????????????????????
  const [openTmp, setOpenTmp] = React.useState(false);
  const handleDrawerOpenTmp = () => {
    setOpenTmp(true);
  };
  const handleDrawerCloseTmp = () => {
    setOpenTmp(false);
  };

  // ??????????????????????????????
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // ??????????????????????????????
  const [navigationValue, setNavigationValue] = React.useState('');
  const handleNavigationChange = (event: React.SyntheticEvent, newValue: string) => {
    setNavigationValue(newValue);
  };

  // ??????????????????????????????????????????????????????
  const subitemOpens = useSelector((state:StoreState) => state.navigation.subitemOpens);
  const handleSubitemOpenClick = (key:string) => () => {
    dispatch(navigationSlice.actions.setSubitemOpens(key));
  }

  // ???????????????????????????????????????
  const createNavigationList = (items:{
    href?: string | UrlObject
    text: React.ReactNode
    icon: React.ReactNode
    badge?: React.ReactNode
    subitems?: any
  }[]) => (
    <List sx={{'& a':{display:'block', color:'inherit', textDecoration:'none'}}}>
      {items.map((item, index) => (
        item.href?
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
          :
          <Box key={index}>
            <ListItem button onClick={handleSubitemOpenClick(getNodeText(item.text))}>
              <ListItemIcon>
                {item.badge
                  ? <Badge badgeContent={item.badge} color="warning">{item.icon}</Badge>
                  : item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
              {subitemOpens[getNodeText(item.text)] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </ListItem>
            {item.subitems && 
            <Collapse in={Boolean(subitemOpens[getNodeText(item.text)])} timeout="auto" unmountOnExit>
              {createNavigationList(item.subitems)}
            </Collapse>
            }
          </Box>
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
                placeholder="Search???"
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
        <MenuItem onClick={handleMenuClose}>??????????????????</MenuItem>
        <MenuItem onClick={handleMenuClose}>?????????????????????</MenuItem>
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
                  {text:'????????????',href:'/',icon:<HomeRoundedIcon />},
                  {text:'AWS',href:'/aws',icon:<FontAwesomeSvgIcon icon={faAws} />},
                  {text:'JS??????',icon:<FontAwesomeSvgIcon icon={faQuestion} />, badge:2, subitems:[
                    {text:'01:?????????2???',href:'/question/q001',icon:<EmojiObjectsIcon />},
                    {text:'02:??????????????????',href:'/question/q002',icon:<EmojiObjectsIcon />},
                  ]},
                  // {text:'?????????????????????',href:'/',icon:<DashboardIcon />}, 
                  {text:'??????',href:'/',icon:<ShoppingCartIcon />}, 
                  {text:'??????',href:'/',icon:<PeopleIcon />}, 
                  {text:'????????????',href:'/',icon:<BarChartIcon />},
                  {text:'??????',href:'/',icon:<LocalMallRoundedIcon />},
                ])}
                <Divider />
                {createNavigationList([
                  {text:'?????????',href:'/',icon:<MailIcon />,badge:0},
                  {text:'??????',href:'/',icon:<SettingsRoundedIcon />},
                ])}
                {value=='sp' && <>
                  <Divider />
                  {createNavigationList([
                    {text:'??????',href:'/',icon:<SearchIcon />,badge:0},
                    {text:'???????????????',href:'/',icon:<AccountCircle />},
                    {text:'??????????????????',href:'/',icon:<ArticleRoundedIcon />},
                    {text:'????????????',href:'/',icon:<ArticleRoundedIcon />},
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
                    title={open? "?????????????????????????????????" : "??????????????????????????????"} 
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
                  <a>??????????????????</a>
                </Link>
              </Box>
              <Box sx={{p:2, fontSize:'12px', color:'#666', '& a':{color:'inherit', textDecoration:'none'}}}>
                <Link href='/'>
                  <a>????????????</a>
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
          <BottomNavigationAction label="????????????" icon={<HomeRoundedIcon />} />
          <BottomNavigationAction label="AWS" icon={<FontAwesomeSvgIcon icon={faAws} />} />
          <BottomNavigationAction label="JS??????" icon={
            <Badge badgeContent={2} color="warning">
              <FontAwesomeSvgIcon icon={faQuestion} />
            </Badge>
          } />
          <BottomNavigationAction label="??????" icon={<PeopleIcon />} />
          <BottomNavigationAction label="????????????" icon={<BarChartIcon />} />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}
