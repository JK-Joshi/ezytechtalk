'use client'; // Required for hooks like useTheme and event handlers

import React from 'react';
import {
    Container, Typography, Box, Avatar, Card, CardMedia, CardContent, Chip, Link as MuiLink
} from "@mui/material";
import { Blog, blogsData } from '@/data/blogsData';
// import { useTheme } from '@/context/ThemeContext'; // Removed unused import
import NextLink from 'next/link'; // For navigation

// Helper function to format date (optional)
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  });
};

interface BlogCardProps {
  blog: Blog;
  type: 'latest' | 'trending' | 'category'; // To differentiate styling if needed
}

// Shared styles for blog cards to ensure consistency
const cardBaseSx = {
  mb: 2.5,
  bgcolor: 'var(--color-bg)',
  color: 'var(--color-text)',
  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  border: '1px solid var(--color-muted)',
  borderRadius: '8px',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  height: '100%' // Ensure cards in a row take same height if needed
};

const cardContentSx = {
  p: 2,
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column'
};

const BlogMeta: React.FC<{ author: Blog['author'], date: string }> = ({ author, date }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', mt: 'auto', pt: 1 }}> {/* mt:auto pushes to bottom */}
    {author.avatarUrl && <Avatar src={author.avatarUrl} alt={author.name} sx={{ width: 24, height: 24, mr: 1 }} />}
    <Typography variant="caption" color="var(--color-muted)">
      {author.name} &bull; {formatDate(date)}
    </Typography>
  </Box>
);

// Left Section Card (Original Column Layout)
export const SidebarBlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  return (
    <MuiLink 
        component={NextLink} 
        href={`/blog/${blog.id}`} 
        underline="none" 
        sx={{
            display: 'block', 
            mb: 2.5,
            '&:hover .MuiCardMedia-root': { // Target CardMedia on hover
                transform: 'scale(1.05)'
            }
        }}
    >
        <Card sx={{...cardBaseSx, mb: 0 /* Remove mb from card as Link will have it */}}>
            <CardMedia
                component="img"
                height="140" // Original height
                image={blog.image}
                alt={blog.title}
                sx={{ // Added sx for transition
                    transition: 'transform 0.3s ease-in-out'
                }}
            />
            <CardContent sx={cardContentSx}>
                <Typography gutterBottom variant="h6" component="h3" sx={{ fontFamily: 'Playfair Display', fontWeight: 'bold', color: 'var(--color-text)', lineHeight: 1.3, fontSize: '1rem', mb: 0.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {blog.title}
                </Typography>
                <Typography variant="body2" color="var(--color-muted)" sx={{ mb: 1, fontSize: '0.8rem', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {blog.description}
                </Typography>
                <BlogMeta author={blog.author} date={blog.date} />
            </CardContent>
        </Card>
    </MuiLink>
  );
};

// New Right Section Card (Row Layout)
export const RightSidebarBlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  return (
    <MuiLink 
        component={NextLink} 
        href={`/blog/${blog.id}`} 
        underline="none" 
        sx={{
            display: 'block', 
            mb: 2.5,
            '&:hover .MuiCardMedia-root': { // Target CardMedia on hover
                transform: 'scale(1.05)'
            }
        }}
    >
        <Card sx={{
            ...cardBaseSx, 
            flexDirection: 'row', 
            alignItems: 'center', 
            mb: 0
        }}>
            <CardMedia
                component="img"
                sx={{
                    width: 100, 
                    height: 80, 
                    objectFit: 'cover',
                    mr: 1.5, 
                    flexShrink: 0,
                    transition: 'transform 0.3s ease-in-out' // Added transition
                }}
                image={blog.image}
                alt={blog.title}
            />
            <CardContent sx={{
                ...cardContentSx,
                py: 1.5, 
                px: 2,
                flexGrow: 1 
            }}>
                {/* <Chip 
                    label={blog.category} 
                    size="small" 
                    sx={{ 
                        bgcolor: 'var(--color-text)', 
                        color: 'var(--color-bg)', 
                        mb: 0.5, // Adjusted margin for row layout
                        fontFamily: 'Playfair Display',
                        fontSize: '0.65rem', // Slightly smaller chip for sidebar
                        height: 'auto',
                        lineHeight: '1.2',
                        padding: '2px 6px',
                        alignSelf: 'flex-start' 
                    }} 
                /> */}
                <Typography gutterBottom variant="h6" component="h3" sx={{ fontFamily: 'Playfair Display', fontWeight: 'bold', color: 'var(--color-text)', lineHeight: 1.3, fontSize: '0.9rem', mb: 0.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {blog.title}
                </Typography>
                <Typography variant="body2" color="var(--color-muted)" sx={{ mb: 1, fontSize: '0.75rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {blog.description}
                </Typography>
                <BlogMeta author={blog.author} date={blog.date} />
            </CardContent>
        </Card>
    </MuiLink>
  );
};

// Center Section Card (Trending - can be multiple)
export const TrendingBlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  return (
    <MuiLink 
        component={NextLink} 
        href={`/blog/${blog.id}`} 
        underline="none" 
        sx={{
            display: 'block', 
            mb: 3,
            '&:hover .MuiCardMedia-root': { // Target CardMedia on hover
                transform: 'scale(1.05)'
            }
        }}
    >
        <Card sx={{ ...cardBaseSx, flexDirection: 'column', mb: 0 }}> {/* Always column direction */}
            <CardMedia
                component="img"
                sx={{ 
                    width: '100%', // Full width
                    height: 220, // Fixed height for consistency, adjust as needed
                    objectFit: 'cover',
                    transition: 'transform 0.3s ease-in-out' // Added transition
                }}
                image={blog.image}
                alt={blog.title}
            />
            <CardContent sx={{...cardContentSx, p: {xs: 2, sm: 2.5} /* flexBasis removed */ }}>
                <Chip label={blog.category} size="small" sx={{ bgcolor: 'var(--color-text)', color: 'var(--color-bg)', mb: 1.5, fontFamily: 'Playfair Display', alignSelf: 'flex-start' }} />
                <Typography variant="h5" component="h2" gutterBottom sx={{ fontFamily: 'Playfair Display', fontWeight: 'bold', color: 'var(--color-text)', lineHeight: 1.3, mb: 1 }}>
                {blog.title}
                </Typography>
                <Typography variant="body1" color="var(--color-muted)" paragraph sx={{ mb: 1.5, display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical', overflow: 'hidden'}}>
                {blog.description}
                </Typography>
                <BlogMeta author={blog.author} date={blog.date} />
            </CardContent>
        </Card>
    </MuiLink>
  );
};

export default function HomePageClient() { // Approximate height of your sticky header, adjust as needed

  // Filter blogs based on the new displayPlacement property
  const secondaryBlogs = blogsData
    .filter(b => b.displayPlacement === 'secondary')
    .sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3); // Keep a limit, e.g., 3 for secondary/left sidebar

  const primaryBlogs = blogsData
    .filter(b => b.displayPlacement === 'primary')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    // Potentially slice if you want to limit primary blogs, e.g. .slice(0, 5)

  const generalBlogs = blogsData
    .filter(b => b.displayPlacement === 'general')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5); // Keep a limit, e.g., 5 for general/right sidebar

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 2, md: 3 }, bgcolor: 'var(--color-bg)' }}>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: {md: 3} }}>
        
        {/* Left Section (20%) - Uses 'secondary' placement */}
        <Box 
            component="aside" 
            sx={{
                width: { xs: '100%', md: '20%' },
                pr: {md: 1.5},
                mb: {xs: 3, md: 0}
            }}
        >
          <Typography variant="h5" component="h2" sx={{ fontFamily: 'Playfair Display', fontWeight: 'bold', color: 'var(--color-text)', pb:1, mb:2, borderBottom: '2px solid var(--color-text)' }}>
            Featured Posts {/* Or another suitable title for secondary posts */}
          </Typography>
          {secondaryBlogs.length > 0 ? (
            secondaryBlogs.map(blog => <SidebarBlogCard key={blog.id} blog={blog} type="latest" />) // type prop might need review
          ) : (
            <Typography sx={{color: 'var(--color-muted)'}}>No featured posts.</Typography>
          )}
        </Box>

        {/* Center Section (50%) - Uses 'primary' placement */}
        <Box 
            component="main" 
            sx={{ 
                width: { xs: '100%', md: '50%' },
                overflowY: { md: 'auto' }, // Ensure this section scrolls independently if content overflows
                // No sticky height needed here, it will take the natural height of its content
                 mb: {xs: 3, md: 0}
            }}
        >
          {/* You might want a title like "Trending" or "All Posts" here */}
          {/* <Typography variant="h5" component="h2" sx={{ fontFamily: 'Playfair Display', fontWeight: 'bold', color: 'var(--color-text)', pb:1, mb:2, borderBottom: '2px solid var(--color-text)' }}>
            Trending Now
          </Typography> */} 
          {primaryBlogs.length > 0 ? (
            primaryBlogs.map(blog => <TrendingBlogCard key={blog.id} blog={blog} type="trending" />) // type prop might need review
          ) : (
            <Typography sx={{color: 'var(--color-muted)'}}>No primary posts available.</Typography>
          )}
        </Box>

        {/* Right Section (30%) - Uses 'general' placement */}
        <Box 
            component="aside" 
            sx={{
                width: { xs: '100%', md: '30%' },
                pl: {md: 1.5},
            }}
        >
          <Typography variant="h5" component="h2" sx={{ fontFamily: 'Playfair Display', fontWeight: 'bold', color: 'var(--color-text)', pb:1, mb:2, borderBottom: '2px solid var(--color-text)' }}>
            More Reads {/* Or another suitable title for general posts */}
          </Typography>
          {generalBlogs.length > 0 ? (
            generalBlogs.map(blog => <RightSidebarBlogCard key={blog.id} blog={blog} type="category" />) // type prop might need review
          ) : (
            <Typography sx={{color: 'var(--color-muted)'}}>No more posts found.</Typography>
          )}
        </Box>

      </Box>
    </Container>
  );
} 