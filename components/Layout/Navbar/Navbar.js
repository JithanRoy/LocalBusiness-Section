import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Image from 'next/image';
import logo from '../../../public/assets/logo.png';
import Link from 'next/link';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import InfoIcon from '@mui/icons-material/Info';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import Search from '@mui/icons-material/Search';
import LoginIcon from '@mui/icons-material/Login';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

function Navbar(props) {
  const data = props.colour;
  const router = useRouter();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [auth, setAuth] = React.useState(false);

  const token = Cookies.get('token');
  React.useEffect(() => {
    if (token) {
      setAuth(true);
    } else {
      router.push('/auth/login');
    }
  }, []);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logout = () => {
    setAuth(false);
    Cookies.remove('token');
    localStorage.removeItem('userId');
    router.push('/home');
  };

  // drawer funtionality

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ul className="flex flex-col items-center">
          <button
            className={`headline7 menu-link link-hover my-3 w-3/4  flex items-center ${
              router.pathname === '/home' ? 'nav-active' : ''
            }`}
          >
            <span className="mr-4">
              <Search />
            </span>
            <Link href="/home">Start Searching</Link>
          </button>

          <button
            className={`headline7 menu-link link-hover w-3/4 my-3  flex items-center ${
              router.pathname === '/about' ? 'nav-active' : ''
            }`}
          >
            <span className="mr-4">
              {' '}
              <InfoIcon />
            </span>

            <Link href="/about">About</Link>
          </button>
          <button
            className={`headline7 menu-link link-hover w-3/4 my-3  flex items-center ${
              router.pathname === '/contact' ? 'nav-active' : ''
            }`}
          >
            <span className="mr-4">
              {' '}
              <ContactMailIcon />
            </span>

            <Link href="/contact">Contact</Link>
          </button>
          {!auth ? (
            <button
              className={`headline7 menu-link link-hover w-3/4 my-3  flex items-center ${
                router.pathname === '/auth/login' ? 'nav-active' : ''
              }`}
            >
              <span className="mr-4">
                {' '}
                <LoginIcon />
              </span>

              <Link href="/auth/login">Login</Link>
            </button>
          ) : (
            <button
              className={`headline7 menu-link link-hover w-3/4 my-3  flex items-center ${
                router.pathname === '/profile' ? 'nav-active' : ''
              }`}
            >
              <span className="mr-4">
                {' '}
                <AccountCircleIcon />
              </span>

              <Link href="/profile">My Profile</Link>
            </button>
          )}
        </ul>
      </List>
    </Box>
  );

  return (
    <div className="header" style={{ backgroundColor: data }}>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Image src={logo} width="120" height="50" alt="logo" />

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <button
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={toggleDrawer('right', true)}
              >
                <MenuIcon style={{ color: 'black' }} />
              </button>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                <MenuItem onClick={handleCloseNavMenu}></MenuItem>
              </Menu>
            </Box>
            {/* <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography> */}
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <ul className="hidden lg:flex ">
                <Link href="/home">
                  <button
                    className={`headline7 menu-link link-hover ${
                      router.pathname === '/home' ? 'nav-text-active' : ''
                    }`}
                  >
                    Start Search
                  </button>
                </Link>
                <Link href="/about">
                  <button
                    className={`headline7 menu-link link-hover  ${
                      router.pathname === '/about' ? 'nav-text-active' : ''
                    }`}
                  >
                    About
                  </button>
                </Link>
                <Link href="/contact">
                  <button
                    className={`headline7 menu-link link-hover ${
                      router.pathname === '/contact' ? 'nav-text-active' : ''
                    }`}
                  >
                    Contact
                  </button>
                </Link>
                {!auth && (
                  <Link href="/auth/login">
                    <button
                      className={`headline7 menu-link login-nav  ${
                        router.pathname === '/auth/login' ? 'nav-active' : ''
                      }`}
                    >
                      Login
                    </button>
                  </Link>
                )}
              </ul>
            </Box>
            {auth && (
              <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
                <Tooltip title="Open settings">
                  <button onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/2.jpg"
                    />
                  </button>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={handleCloseUserMenu}>
                    <div className="flex flex-col">
                      <Link href="/profile">My Profile</Link>
                      <button className="mt-2" onClick={logout}>
                        Logout
                      </button>
                    </div>
                  </MenuItem>
                </Menu>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <Drawer
        anchor={'right'}
        open={state['right']}
        onClose={toggleDrawer('right', false)}
      >
        {list('right')}
      </Drawer>
    </div>
  );
}

export default Navbar;
