import { useTranslation } from 'react-i18next';
import { Container, Title, Text, Stack, Paper } from '@mantine/core';

export function AboutPage() {
  const { t } = useTranslation();

  return (
    <Container size="md" py="xl">
      <Stack gap="xl">
        <Title order={1}>{t('nav.about')}</Title>

        <Paper shadow="sm" p="xl" radius="md">
          <Stack gap="md">
            <Title order={2}>About Thinkable</Title>
            <Text>
              Thinkable is a comprehensive mental health platform designed to support your
              wellbeing journey through interactive tools, assessments, and educational content.
            </Text>
            <Text>
              Our mission is to make mental health resources accessible, engaging, and
              personalized for everyone.
            </Text>
          </Stack>
        </Paper>

        <Paper shadow="sm" p="xl" radius="md">
          <Stack gap="md">
            <Title order={3}>Features</Title>
            <Text>
              • Interactive quizzes to explore mental health topics
            </Text>
            <Text>
              • Self-assessments to understand your current state
            </Text>
            <Text>
              • Educational video content from experts
            </Text>
            <Text>
              • Multilingual support (English and Hebrew)
            </Text>
          </Stack>
        </Paper>
      </Stack>
    </Container>
  );
}
