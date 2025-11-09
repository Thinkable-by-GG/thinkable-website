import { Link } from 'react-router-dom';
import { Container, Title, Text, Button, Stack, Center } from '@mantine/core';

export function NotFoundPage() {
  return (
    <Container size="md" py="xl">
      <Center h={400}>
        <Stack gap="md" align="center">
          <Title order={1} size={100}>404</Title>
          <Title order={2}>Page Not Found</Title>
          <Text size="lg" c="dimmed" ta="center">
            The page you are looking for does not exist or has been moved.
          </Text>
          <Button component={Link} to="/" size="lg" mt="md">
            Go Home
          </Button>
        </Stack>
      </Center>
    </Container>
  );
}
