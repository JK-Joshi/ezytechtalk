'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Box, Container, Typography, CircularProgress, Grid } from '@mui/material';
import { blogsData, Blog } from '@/data/blogsData'; // Adjust path as necessary
import { TrendingBlogCard } from '@/app/HomePageClient'; // Changed to named import
// If TrendingBlogCard is not directly exportable, or you need a specific path, adjust this.
// You might need to create a specific export from HomePageClient.tsx or move TrendingBlogCard to its own file.

const SearchResultsPage = () => {
    const searchParams = useSearchParams();
    const query = searchParams.get('q');
    const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (query) {
            setLoading(true);
            const decodedQuery = decodeURIComponent(query).toLowerCase();
            const results = blogsData.filter(blog =>
                blog.title.toLowerCase().includes(decodedQuery) ||
                blog.description.toLowerCase().includes(decodedQuery) ||
                (blog.blogContent && typeof blog.blogContent === 'string' && blog.blogContent.toLowerCase().includes(decodedQuery))
            );
            setFilteredBlogs(results);
            setLoading(false);
        } else {
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

    if (!query) {
        return (
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Typography variant="h5" component="h1" gutterBottom sx={{ color: 'var(--color-text)', textAlign: 'center' }}>
                    Please enter a search term.
                </Typography>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'var(--color-text)', mb: 3 }}>
                Search Results for: "{decodeURIComponent(query)}"
            </Typography>
            {filteredBlogs.length > 0 ? (
                <Grid container spacing={3}>
                    {filteredBlogs.map(blog => (
                        <Grid component="div" item xs={12} sm={6} md={4} key={blog.id}>
                            <TrendingBlogCard blog={blog} type="category" />
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Typography variant="body1" sx={{ color: 'var(--color-text)', textAlign: 'center' }}>
                    No blogs found matching your search criteria.
                </Typography>
            )}
        </Container>
    );
};

export default SearchResultsPage; 