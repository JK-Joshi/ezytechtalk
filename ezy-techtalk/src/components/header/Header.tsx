'use client';

//React Imports
import React, { useState } from 'react'
//Material UI Imports
import {
    Box, Container, Divider, InputAdornment, TextField, Typography,
    Drawer, IconButton, List, ListItem, ListItemButton, ListItemText,
    useMediaQuery, useTheme as useMuiTheme,
    Collapse
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';

//Custom Components
import ThemeToggleButton from '../ThemeToggleButton';

//Third Party Imports
import { Icon } from "@iconify/react";
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';

//Context Imports
import { useTheme } from '@/context/ThemeContext';

type MenuItems = string[]

const menuItems: MenuItems = ["Home", "Technology", "Programming", "Automobiles", "AI"];

const Header = () => {
    const { theme } = useTheme();
    const muiTheme = useMuiTheme();
    const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));
    const router = useRouter();

    const [drawerOpen, setDrawerOpen] = useState(false);
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }
        setDrawerOpen(open);
    };

    const handleSearchToggle = () => {
        setIsSearchVisible(!isSearchVisible);
        if (isSearchVisible) {
            setSearchQuery('');
        }
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchSubmit = () => {
        if (searchQuery.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    const socialMediaIcons = (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box component={Icon} icon={'ri:facebook-fill'} sx={{ fontSize: '1.2rem', color: 'var(--color-text)' }} />
            <Box component={Icon} icon={'ri:instagram-line'} sx={{ fontSize: '1.2rem', color: 'var(--color-text)' }} />
            <Box component={Icon} icon={'ri:twitter-x-line'} sx={{ fontSize: '1.2rem', color: 'var(--color-text)' }} />
            <Box component={Icon} icon={'ri:youtube-fill'} sx={{ fontSize: '1.2rem', color: 'var(--color-text)' }} />
        </Box>
    );

    const socialMediaLinksDesktop = (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', gap: 1.5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Box component={Icon} icon={'ri:facebook-fill'} sx={{ fontSize: '1.2rem', color: 'var(--color-text)' }} />
                <Typography sx={{ color: 'var(--color-muted)', fontSize: '0.8rem' }}> 3.3K </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Box component={Icon} icon={'ri:instagram-line'} sx={{ fontSize: '1.2rem', color: 'var(--color-text)' }} />
                <Typography sx={{ color: 'var(--color-muted)', fontSize: '0.8rem' }}> 5.7K </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Box component={Icon} icon={'ri:twitter-x-line'} sx={{ fontSize: '1.2rem', color: 'var(--color-text)' }} />
                <Typography sx={{ color: 'var(--color-muted)', fontSize: '0.8rem' }}> 3.4K </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Box component={Icon} icon={'ri:youtube-fill'} sx={{ fontSize: '1.2rem', color: 'var(--color-text)' }} />
                <Typography sx={{ color: 'var(--color-muted)', fontSize: '0.8rem' }}> 3.9K </Typography>
            </Box>
        </Box>
    );

    const menuNavigation = (
        <List sx={{ width: '100%', pt: 0 }}>
            {menuItems?.map((item, index) => {
                const href = item === "Home" ? "/" : `/category/${item.toLowerCase().replace(/\s+/g, '-')}`;
                return (
                    <ListItem key={item + index} disablePadding>
                        <NextLink href={href} passHref legacyBehavior>
                            <ListItemButton component="a" sx={{ textAlign: 'center', py: 1.5 }}>
                                <ListItemText
                                    primary={item}
                                    sx={{
                                        color: 'var(--color-text)',
                                        '.MuiTypography-root': { fontFamily: 'Playfair Display' }
                                    }}
                                />
                            </ListItemButton>
                        </NextLink>
                    </ListItem>
                );
            })}
        </List>
    );

    const searchInput = (
        <TextField
            sx={{
                width: { xs: '100%', md: 'auto' },
                '& .MuiOutlinedInput-root': {
                    borderRadius: '50px',
                    height: '2.5rem',
                    backgroundColor: 'var(--color-bg)',
                    color: 'var(--color-text)',
                    transition: 'background-color 0.3s, border-color 0.3s',
                    '& fieldset': {
                        borderColor: 'var(--color-muted)',
                    },
                    '&:hover fieldset': {
                        borderColor: 'var(--color-text)',
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: 'var(--color-text)',
                    },
                    '& input::placeholder': {
                        color: 'var(--color-muted)',
                        opacity: 1,
                    },
                    '& input': {
                        color: 'var(--color-text)',
                    }
                },
            }}
            variant="outlined"
            placeholder="Search..."
            autoFocus={isMobile && isSearchVisible}
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyPress={(event) => {
                if (event.key === 'Enter') {
                    handleSearchSubmit();
                }
            }}
            InputProps={{
                startAdornment: isMobile && isSearchVisible ? (
                    <InputAdornment position="start">
                        <IconButton onClick={handleSearchToggle} size="small" sx={{ color: 'var(--color-muted)' }} aria-label="hide search input">
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </InputAdornment>
                ) : null,
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton onClick={handleSearchSubmit} size="small" sx={{ color: 'var(--color-muted)', mr: 0.5 }} aria-label="submit search">
                            <SearchIcon sx={{ fontSize: '1.2rem' }} />
                        </IconButton>
                    </InputAdornment>
                ),
            }}
        />
    );

    const searchAndThemeToggleDesktop = (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: { xs: 1, md: 2 } }}>
            {searchInput}
            <ThemeToggleButton />
        </Box>
    );

    const drawerContent = (
        <Box
            sx={{
                width: 250,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                bgcolor: 'var(--color-bg)',
                color: 'var(--color-text)'
            }}
            role="presentation"
        >
            <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6" sx={{ fontFamily: 'Playfair Display' }}>Menu</Typography>
                <IconButton onClick={toggleDrawer(false)} sx={{ color: 'var(--color-text)' }}>
                    <CloseIcon />
                </IconButton>
            </Box>
            <Divider sx={{ borderColor: 'var(--color-muted)' }} />
            <Box onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
                {menuNavigation}
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <Divider sx={{ borderColor: 'var(--color-muted)', mb: 1 }} />
            <Box sx={{ p: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {socialMediaIcons}
            </Box>
        </Box>
    );

    return (
        <Container maxWidth='lg' sx={{ fontFamily: 'Playfair Display', py: { xs: 2, md: 4 } }}>
            <Box sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                <Box sx={{ flex: { xs: 'none', md: 1 }, display: 'flex', justifyContent: 'flex-start' }}>
                    {isMobile ? (
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={toggleDrawer(true)}
                            sx={{ color: 'var(--color-text)' }}
                        >
                            <MenuIcon />
                        </IconButton>
                    ) : (
                        socialMediaLinksDesktop
                    )}
                </Box>

                <Box sx={{
                    flex: { xs: 1, md: 'none' },
                    display: 'flex',
                    justifyContent: 'center',
                    px: { xs: 1, md: 2 },
                    overflow: 'hidden'
                }}>
                    <Box
                        component={'img'}
                        src={theme === 'light' ? "/Assets/Logo/Logo-black.png" : "/Assets/Logo/Logo-white.png"}
                        alt="Logo"
                        sx={{ width: { xs: '8rem', sm: '10rem', md: '15rem' }, objectFit: 'contain' }}
                    />
                </Box>

                <Box sx={{ flex: { xs: 'none', md: 1 }, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 0.5 }}>
                    {isMobile ? (
                        <>
                            <IconButton
                                onClick={handleSearchToggle}
                                sx={{ color: 'var(--color-text)' }}
                                aria-label="toggle search input"
                            >
                                {isSearchVisible ? <CloseIcon /> : <SearchIcon />}
                            </IconButton>
                            <ThemeToggleButton />
                        </>
                    ) : (
                        searchAndThemeToggleDesktop
                    )}
                </Box>
            </Box>

            {isMobile && (
                <Collapse in={isSearchVisible} timeout="auto" unmountOnExit>
                    <Box sx={{ pt: 2, pb: 1 }}>
                        {searchInput}
                    </Box>
                </Collapse>
            )}

            <Divider sx={{ display: { xs: 'none', md: 'block' }, my: 3, width: '100%', borderColor: 'var(--color-muted)' }} />

            <Box sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'center', alignItems: 'center', gap: '1.5rem', width: '100%' }}>
                {menuItems?.map((item, index) => {
                    const href = item === "Home" ? "/" : `/category/${item.toLowerCase().replace(/\s+/g, '-')}`;
                    return (
                        <NextLink key={item + index} href={href} passHref legacyBehavior>
                            <Typography
                                component="a"
                                sx={{
                                    position: 'relative',
                                    color: 'var(--color-text)',
                                    cursor: 'pointer',
                                    fontFamily: 'Playfair Display',
                                    textDecoration: 'none',
                                    pb: 0.5,
                                    '&:hover::after': {
                                        content: '""',
                                        position: 'absolute',
                                        width: '100%',
                                        height: '2px',
                                        bottom: 0,
                                        left: '50%',
                                        transform: 'translateX(-50%)',
                                        backgroundColor: 'var(--color-text)',
                                        transition: 'width 0.3s ease-in-out',
                                    },
                                    '&::after': {
                                        content: '""',
                                        position: 'absolute',
                                        width: '0%',
                                        height: '2px',
                                        bottom: 0,
                                        left: '50%',
                                        transform: 'translateX(-50%)',
                                        backgroundColor: 'var(--color-text)',
                                        transition: 'width 0.3s ease-in-out',
                                    }
                                }}
                            >
                                {item}
                            </Typography>
                        </NextLink>
                    );
                })}
            </Box>

            <Divider sx={{ display: { xs: 'none', md: 'block' }, mt: 3, width: '100%', borderColor: 'var(--color-text)', borderBottomWidth: 'medium' }} />

            <Drawer
                anchor='left'
                open={drawerOpen}
                onClose={toggleDrawer(false)}
                PaperProps={{
                    sx: { bgcolor: 'var(--color-bg)', color: 'var(--color-text)' }
                }}
            >
                {drawerContent}
            </Drawer>
        </Container>
    )
}

export default Header
