'use client';

import React from 'react';
import { Container, Typography, Box, CircularProgress, Alert } from "@mui/material";
import { useParams } from 'next/navigation';
import { Blog, blogsData } from '@/data/blogsData';
import { TrendingBlogCard } from '@/app/HomePageClient'; // Assuming TrendingBlogCard is exported from HomePageClient or a shared components file=

// Helper function to format category name from slug (optional, if needed for display)
const formatCategoryName = (slug: string): string => {
  return slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

export default function CategoryPage() {
  const params = useParams();
  const categorySlug = params?.categoryName as string;

  const [filteredBlogs, setFilteredBlogs] = React.useState<Blog[] | undefined>(undefined); // undefined for loading
  const [categoryDisplayName, setCategoryDisplayName] = React.useState<string>('');

  React.useEffect(() => {
    if (categorySlug) {
      const displayName = formatCategoryName(categorySlug);
      setCategoryDisplayName(displayName);

      // Find the category in blogsData that matches the slug
      // This assumes categories in blogsData are like "Technology", "Programming", etc.
      // and slugs are "technology", "programming"
      const foundBlogs = blogsData.filter(
        b => b.category.toLowerCase().replace(/\s+/g, '-') === categorySlug
      );
      setFilteredBlogs(foundBlogs);
    }
  }, [categorySlug]);

  if (filteredBlogs === undefined) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 200px)' }}>
        <CircularProgress sx={{ color: 'var(--color-text)' }} />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 2, md: 4 } }}>
      <Box sx={{ mb: 3, pb: 1, borderBottom: '2px solid var(--color-text)' }}>
        <Typography variant="h4" component="h1" sx={{ fontFamily: 'Playfair Display', fontWeight: 'bold', color: 'var(--color-text)' }}>
          {categoryDisplayName}
        </Typography>
      </Box>

      {filteredBlogs.length === 0 ? (
        <Alert severity="info">No posts found in the &quot;{categoryDisplayName}&quot; category.</Alert>
      ) : (
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
              <TrendingBlogCard blog={blog} type="trending" /> 
            </Box>
          ))}
        </Box>
      )}
    </Container>
  );
} 