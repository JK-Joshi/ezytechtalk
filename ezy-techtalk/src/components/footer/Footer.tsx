'use client';

import React from 'react';
import { Container, Box, Typography, Link as MuiLink, IconButton } from '@mui/material';
import NextLink from 'next/link';
import { Icon } from '@iconify/react'; // For social media icons

const usefulLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' }, // Example link
    { name: 'Blog', href: '/blog' },     // Example link
    { name: 'Contact', href: '/contact' }, // Example link
    { name: 'Privacy Policy', href: '/privacy' }, // Example link
    { name: 'Terms of Service', href: '/terms' } // Added new link
];

const socialMedia = [
    { name: 'Facebook', icon: 'ri:facebook-fill', href: 'https://facebook.com' },
    { name: 'Instagram', icon: 'ri:instagram-line', href: 'https://instagram.com' },
    { name: 'Twitter', icon: 'ri:twitter-x-line', href: 'https://twitter.com' },
    { name: 'YouTube', icon: 'ri:youtube-fill', href: 'https://youtube.com' },
];

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <Box
            component="footer"
            sx={{
                bgcolor: 'var(--color-bg)',
                color: 'var(--color-text)',
                borderTop: '1px solid var(--color-muted)',
                py: { xs: 4, md: 6 },
                mt: 'auto' // Pushes footer to bottom if main content is short
            }}
        >
            <Container maxWidth="lg">
                <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: { xs: 4, md: 0 } }}>
                    {/* Column 1: Website Purpose / About */}
                    <Box sx={{ width: { xs: '100%', md: '30%' }, mb: { xs: 3, md: 0} }}>
                        <Typography variant="h6" gutterBottom sx={{ fontFamily: 'Playfair Display', fontWeight: 'bold' }}>
                            World-Tech Tube
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'var(--color-muted)', lineHeight: 1.7 }}>
                            Your daily source for the latest in technology, web development, and programming. Stay updated with insightful articles, tutorials, and news. We aim to make complex tech topics easy and accessible for everyone.
                        </Typography>
                    </Box>

                    {/* Column 2: Useful Links */}
                    <Box sx={{ width: { xs: '100%', sm: '48%', md: '25%' }, mb: { xs: 3, md: 0} }}>
                        <Typography variant="h6" gutterBottom sx={{ fontFamily: 'Playfair Display', fontWeight: 'bold' }}>
                            Useful Links
                        </Typography>
                        <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
                            {usefulLinks.map((link) => (
                                <Box component="li" key={link.name} sx={{ mb: 1 }}>
                                    <MuiLink
                                        component={NextLink}
                                        href={link.href}
                                        underline="hover"
                                        sx={{ 
                                            color: 'var(--color-muted)',
                                            '&:hover': { color: 'var(--color-text)' },
                                            fontSize: '0.9rem'
                                        }}
                                    >
                                        {link.name}
                                    </MuiLink>
                                </Box>
                            ))}
                        </Box>
                    </Box>

                    {/* Column 3: Social Media */}
                    <Box sx={{ width: { xs: '100%', sm: '48%', md: '25%' }, mb: { xs: 3, md: 0} }}>
                        <Typography variant="h6" gutterBottom sx={{ fontFamily: 'Playfair Display', fontWeight: 'bold' }}>
                            Connect With Us
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
                            {socialMedia.map((social) => (
                                <IconButton
                                    key={social.name}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={social.name}
                                    sx={{ 
                                        color: 'var(--color-text)',
                                        '&:hover': { color: 'var(--color-muted)' }
                                    }}
                                >
                                    <Icon icon={social.icon} style={{ fontSize: '1.5rem' }} />
                                </IconButton>
                            ))}
                        </Box>
                    </Box>
                </Box>

                {/* Copyright Section */}
                <Box
                    sx={{
                        textAlign: 'center',
                        pt: 4,
                        mt: 4,
                        borderTop: '1px solid var(--color-muted)',
                        color: 'var(--color-muted)'
                    }}
                >
                    <Typography variant="caption">
                        &copy; {currentYear} World-Tech Tube. All Rights Reserved.
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer; 