'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Container, Typography, CircularProgress, Box } from '@mui/material';
import { blogsData, Blog } from '@/data/blogsData'; // Adjust path as necessary
import { TrendingBlogCard } from '@/app/HomePageClient'; // Changed to named import
// If TrendingBlogCard is not directly exportable, or you need a specific path, adjust this.
// You might need to create a specific export from HomePageClient.tsx or move TrendingBlogCard to its own file.

const SearchResultsDisplay = () => {
    const searchParams = useSearchParams();
    const query = searchParams.get('q');
    const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (query !== null) {
            setLoading(true);
            const decodedQuery = decodeURIComponent(query).toLowerCase();
            const results = blogsData.filter(blog =>
                blog.title.toLowerCase().includes(decodedQuery) ||
                blog.description.toLowerCase().includes(decodedQuery) ||
                (blog.blogContent && typeof blog.blogContent === 'string' && blog.blogContent.toLowerCase().includes(decodedQuery))
            );
            setFilteredBlogs(results);
            setLoading(false);
        } else if (query === null) {
            setFilteredBlogs([]);
            setLoading(false);
        }
    }, [query]);

    if (loading) {
        return (
            <Container maxWidth="lg" sx={{ py: 4, display: 'flex', justifyContent: 'center' }}>
                <CircularProgress />
            </Container>
        );
    }

    if (query === null || query.trim() === '') {
        return (
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Typography variant="h5" component="h1" gutterBottom sx={{ color: 'var(--color-text)', textAlign: 'center' }}>
                    Please enter a search term to begin.
                </Typography>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'var(--color-text)', mb: 3 }}>
                Search Results for: &quot;{decodeURIComponent(query)}&quot;
            </Typography>
            {filteredBlogs.length > 0 ? (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', mx: -1.5 }}>
                    {filteredBlogs.map(blog => (
                        <Box 
                          key={blog.id} 
                          sx={{ 
                            flexGrow: 0,
                            flexShrink: 0,
                            flexBasis: { xs: '100%', sm: '50%', md: '33.3333%' }, 
                            maxWidth: { xs: '100%', sm: '50%', md: '33.3333%' }, 
                            p: 1.5 
                          }}
                        >
                            <TrendingBlogCard blog={blog} type="category" />
                        </Box>
                    ))}
                </Box>
            ) : (
                <Typography variant="body1" sx={{ color: 'var(--color-text)', textAlign: 'center' }}>
                    No blogs found matching your search criteria for &quot;{decodeURIComponent(query)}&quot;.
                </Typography>
            )}
        </Container>
    );
};

const SearchPage = () => {
    return (
        <Suspense fallback={<Container maxWidth="lg" sx={{ py: 4, display: 'flex', justifyContent: 'center' }}><CircularProgress /></Container>}>
            <SearchResultsDisplay />
        </Suspense>
    );
};

export default SearchPage; 