'use client';

import React from 'react';
import { Container, Typography, Box, Paper, Avatar, Divider, CircularProgress, Alert, Card, CardMedia, CardContent, Link as MuiLink } from "@mui/material";
import { useParams } from 'next/navigation'; // To get the [id] from URL
import { Blog, blogsData } from '@/data/blogsData'; // Import blog data and types
import NextLink from 'next/link';
import NextImage from 'next/image'; // Import NextImage

// Helper function to format date (copied from HomePageClient)
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  });
};

// Left Section Item (Example: using current blog's details)
const LeftSectionContent: React.FC<{ blog: Blog }> = ({ blog }) => {
    return (
        <Card sx={{
            bgcolor: 'var(--color-bg)', 
            color: 'var(--color-text)', 
            boxShadow: 'none', 
            border: '1px solid var(--color-muted)', 
            borderRadius: '8px', 
            overflow: 'hidden',
            transition: 'box-shadow 0.3s ease-in-out',
            '&:hover': {
                boxShadow: '0 4px 12px rgba(0,0,0,0.12)'
            },
            '&:hover .MuiCardMedia-root': {
                transform: 'scale(1.05)'
            }
        }}>
            <CardMedia
                component="img"
                height="180"
                image={blog.image} 
                alt={blog.title}
                sx={{
                    transition: 'transform 0.3s ease-in-out'
                }}
            />
            <CardContent sx={{ p: 2 }}>
                <Typography variant="h6" component="h3" sx={{ fontFamily: 'Playfair Display', fontWeight: 'bold', fontSize: '1.1rem', mb: 1, color: 'var(--color-text)' }}>
                    {blog.title} {/* Reusing title or could be "Summary" */}
                </Typography>
                <Typography variant="body2" color="var(--color-muted)" sx={{ fontSize: '0.85rem', mb: 1.5, display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical', overflow: 'hidden'}}>
                    {blog.description} {/* Reusing description */}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    {blog.author.avatarUrl && <Avatar src={blog.author.avatarUrl} alt={blog.author.name} sx={{ width: 24, height: 24, mr: 1 }} />}
                    <Typography variant="caption" color="var(--color-muted)">
                        {blog.author.name} &bull; {formatDate(blog.date)}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
};

// Right Section Item (Example: using current blog's details or could be related post)
const RightSectionItem: React.FC<{ blog: Blog }> = ({ blog }) => {
    return (
        <MuiLink 
            component={NextLink} 
            href={`/blog/${blog.id}`} 
            underline="none" 
            sx={{
                display: 'block', 
                mb: 2,
                transition: 'box-shadow 0.3s ease-in-out',
                '&:hover .MuiPaper-root': {
                     boxShadow: '0 4px 12px rgba(0,0,0,0.12)'
                },
                '&:hover .MuiCardMedia-root': {
                    transform: 'scale(1.05)'
                }
            }}
        >
            <Paper 
                elevation={0} 
                sx={{ 
                    display: 'flex', 
                    flexDirection: 'row', 
                    gap: 1.5, 
                    p: 1.5, 
                    bgcolor: 'var(--color-bg)', 
                    color: 'var(--color-text)', 
                    borderRadius: '8px', 
                    border: '1px solid var(--color-muted)', 
                    alignItems: 'center', 
                    overflow: 'hidden',
                    transition: 'box-shadow 0.3s ease-in-out'
                }}
            >
                <CardMedia
                    component="img"
                    sx={{ 
                        width: 70, 
                        height: 70, 
                        borderRadius: '4px', 
                        objectFit: 'cover',
                        transition: 'transform 0.3s ease-in-out'
                    }}
                    image={blog.image}
                    alt={blog.title}
                />
                <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
                    <Typography variant="subtitle2" component="h4" sx={{ fontWeight: 'bold', color: 'var(--color-text)', fontSize: '0.9rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: 1.3 }}>
                        {blog.title} {/* Example: current blog title or related post title */}
                    </Typography>
                    <Typography variant="caption" color="var(--color-muted)" sx={{ fontSize: '0.75rem', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden', my: 0.5}}>
                        {blog.description} {/* Example: current blog description */}
                    </Typography>
                    <Typography variant="caption" color="var(--color-muted)" sx={{ fontSize: '0.7rem'}}>
                        {blog.author.name} &bull; {formatDate(blog.date).split(',')[0]}
                    </Typography>
                </Box>
            </Paper>
        </MuiLink>
    );
};

export default function BlogPostPage() {
  const params = useParams();
  const blogId = params?.id as string; // Get blog ID from URL parameters
  const headerHeight = 80; // ADJUST THIS to your actual header height for sticky positioning

  const [blog, setBlog] = React.useState<Blog | null | undefined>(undefined); // undefined for loading state

  React.useEffect(() => {
    if (blogId) {
      const foundBlog = blogsData.find(b => b.id === blogId);
      setBlog(foundBlog || null); // Set to null if not found, or the blog itself
    }
  }, [blogId]);

  if (blog === undefined) { // Loading state
    return (
      <Container maxWidth="lg" sx={{ py: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 200px)' }}>
        <CircularProgress sx={{ color: 'var(--color-text)'}} />
      </Container>
    );
  }

  if (!blog) { // Blog not found
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error">Blog post not found.</Alert>
      </Container>
    );
  }

  // Basic styling for blog content (ideally, use a markdown renderer that can be styled)
  const blogContentHtml = { __html: blog.blogContent };

  // Example: For right sidebar, you might fetch truly related posts. Here, we just take a few other posts.
  const relatedPostsForRightSidebar = blogsData.filter(b => b.id !== blog.id && b.category === blog.category).slice(0, 3);
  if (relatedPostsForRightSidebar.length === 0) {
      relatedPostsForRightSidebar.push(...blogsData.filter(b => b.id !== blog.id).slice(0, 3 - relatedPostsForRightSidebar.length));
  }

  return (
    <Container maxWidth="xl" sx={{ py: {xs: 2, md: 3}, bgcolor: 'var(--color-bg)', color: 'var(--color-text)' }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: {md: 3} }}>
            
            {/* Left Section (20%) - Example: Sticky, contains info from current blog or related */}
            <Box 
                component="aside" 
                sx={{
                    width: { xs: '100%', md: '20%' },
                    position: { md: 'sticky' }, 
                    top: { md: headerHeight }, 
                    height: { md: `calc(100vh - ${headerHeight}px)` }, 
                    overflowY: { md: 'auto' },
                    pr: {md: 1.5},
                    mb: {xs: 3, md: 0}
                }}
            >
                <Typography variant="h6" sx={{ fontFamily: 'Playfair Display', fontWeight: 'bold', color: 'var(--color-text)', pb:1, mb:2, borderBottom: '1px solid var(--color-muted)' }}>
                    Summary {/* Or "Related Info" */}
                </Typography>
                <LeftSectionContent blog={blog} />
                 {/* You could add more items here, like a list of categories, tags etc. */}
            </Box>

            {/* Center Section (60%) - Main Blog Content */}
            <Box 
                component="main" 
                sx={{ 
                    width: { xs: '100%', md: '60%' },
                    // overflowY: { md: 'auto' }, // Center usually scrolls with page
                     mb: {xs: 3, md: 0}
                }}
            >
                <Paper elevation={0} sx={{ p: {xs: 2, md: 3}, bgcolor: 'var(--color-bg)', borderRadius: '8px', border: '1px solid var(--color-muted)' }}>
                    {/* Big Image */}
                    {blog.image && (
                        <Box sx={{
                            mb: 3, 
                            borderRadius: '8px', 
                            overflow: 'hidden', // Keep this to clip the NextImage
                            position: 'relative', // Needed for layout="fill"
                            width: '100%', // Ensure the box takes full width
                            height: { xs: '300px', sm: '400px', md: '500px' }, // Responsive height
                            transition: 'box-shadow 0.3s ease-in-out',
                            '&:hover': {
                                boxShadow: '0 4px 12px rgba(0,0,0,0.12)'
                            },
                            '&:hover img': { // Target the img rendered by NextImage
                                transform: 'scale(1.05)'
                            }
                        }}>
                            <NextImage 
                                src={blog.image} 
                                alt={blog.title} 
                                layout="fill"
                                objectFit="cover" // Similar to style objectFit: 'cover'
                                style={{
                                    transition: 'transform 0.3s ease-in-out' // Style for NextImage
                                }}
                            />
                        </Box>
                    )}
                    {/* Title */}
                    <Typography variant="h3" component="h1" gutterBottom sx={{ fontFamily: 'Playfair Display', fontWeight: 'bold', lineHeight: 1.25, color: 'var(--color-text)', mb:1 }}>
                        {blog.title}
                    </Typography>
                    {/* Description (Short Summary) */}
                    <Typography variant="subtitle1" color="var(--color-muted)" paragraph sx={{ mb: 2, fontSize: '1.1rem'}}>
                        {blog.description}
                    </Typography>
                    {/* Author and Date */}
                    <Box sx={{ display: 'flex', alignItems: 'center', my: 2.5 }}>
                        {blog.author.avatarUrl && <Avatar src={blog.author.avatarUrl} alt={blog.author.name} sx={{ width: 40, height: 40, mr: 1.5 }} />}
                        <Box>
                            <Typography variant="subtitle1" sx={{ color: 'var(--color-text)', fontWeight: '500' }}>
                                {blog.author.name}
                            </Typography>
                            <Typography variant="caption" color="var(--color-muted)">
                                Published on {formatDate(blog.date)} &bull; In <MuiLink component={NextLink} href={`/category/${blog.category.toLowerCase()}`} sx={{color: 'var(--color-muted)'}}>{blog.category}</MuiLink>
                            </Typography>
                        </Box>
                    </Box>

                    <Divider sx={{ my: 3, borderColor: 'var(--color-muted)' }} />
                    
                    {/* Full Blog Content */}
                    <Box 
                        className="blog-post-content" 
                        sx={{ 
                            mt: 2, 
                            color: 'var(--color-text)',
                            fontFamily: 'Georgia, serif', 
                            lineHeight: 1.8,
                            fontSize: '1.1rem',
                            '& h2, & h3, & h4': {
                                fontFamily: 'Playfair Display', 
                                color: 'var(--color-text)',
                                mt: 3, mb: 1.5
                            },
                            '& h2': { fontSize: '1.8rem' },
                            '& h3': { fontSize: '1.5rem' },
                            '& h4': { fontSize: '1.3rem' },
                            '& p': { mb: 2 },
                            '& a': { color: 'var(--color-text)', textDecoration: 'underline', ':hover': { color: 'var(--color-muted)'} },
                            '& img': { maxWidth: '100%', height: 'auto', borderRadius: '4px', my: 2 },
                            '& ul, & ol': { pl: 3, mb: 2 },
                            '& li': { mb: 0.5 },
                            '& blockquote': { borderLeft: '3px solid var(--color-text)', pl: 2, ml: 0, my: 2, fontStyle: 'italic', color: 'var(--color-muted)'}
                        }}
                        dangerouslySetInnerHTML={blogContentHtml} 
                    />
                </Paper>
            </Box>

            {/* Right Section (20%) - Example: Sticky, related posts or categories */}
            <Box 
                component="aside" 
                sx={{
                    width: { xs: '100%', md: '20%' },
                    position: { md: 'sticky' }, 
                    top: { md: headerHeight }, 
                    height: { md: `calc(100vh - ${headerHeight}px)` }, 
                    overflowY: { md: 'auto' },
                    pl: {md: 1.5},
                }}
            >
                <Typography variant="h6" sx={{ fontFamily: 'Playfair Display', fontWeight: 'bold', color: 'var(--color-text)', pb:1, mb:2, borderBottom: '1px solid var(--color-muted)' }}>
                    Related Posts {/* Or "Categories" */}
                </Typography>
                 {relatedPostsForRightSidebar.length > 0 ? (
                    relatedPostsForRightSidebar.map(relatedBlog => <RightSectionItem key={relatedBlog.id} blog={relatedBlog} />)
                ) : (
                    <Typography sx={{color: 'var(--color-muted)', fontSize: '0.9rem'}}>No related posts found.</Typography>
                )}
            </Box>

        </Box>
    </Container>
  );
} 