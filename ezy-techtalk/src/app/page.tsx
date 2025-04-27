import { Container, Typography, Button, Box } from "@mui/material";

export default function Home() {
  return (
    <Container 
      maxWidth="sm" 
      // Use theme variables for background/text if needed, though Container usually inherits
      sx={{ 
        mt: 8,
        // Example: Explicitly set text color if needed
        // color: 'var(--color-text)' 
      }}
    >
      <Typography variant="h3" gutterBottom sx={{ color: 'var(--color-text)' }}>
        Welcome to World-Tech Tube
      </Typography>
      <Box></Box>
      <Button 
        variant="contained" 
        sx={{
          bgcolor: 'var(--color-text)', // Use text color as background for contrast
          color: 'var(--color-bg)',     // Use background color as text for contrast
          '&:hover': {
            bgcolor: 'var(--color-muted)', // Example hover effect
            // Add other hover styles if needed
          }
        }}
      >
        Get Started
      </Button>
    </Container>
  );
}
