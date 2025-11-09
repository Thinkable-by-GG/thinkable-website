import { useTranslation } from 'react-i18next';
import { Container, Group, Text, Anchor } from '@mantine/core';

const BUILD_VERSION = '20251107-1225';

export function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <Container size="xl" h="100%">
      <Group justify="space-between" h="100%" wrap="wrap">
        <Group gap="md">
          <Text size="sm" c="dimmed">
            {t('footer.rights', { year: currentYear })}
          </Text>
          <Text size="xs" c="dimmed" opacity={0.6}>
            v{BUILD_VERSION}
          </Text>
        </Group>
        <Group gap="md">
          <Anchor href="/privacy" size="sm" c="dimmed">
            {t('footer.privacy')}
          </Anchor>
          <Anchor href="/terms" size="sm" c="dimmed">
            {t('footer.terms')}
          </Anchor>
          <Anchor href="/contact" size="sm" c="dimmed">
            {t('footer.contact')}
          </Anchor>
        </Group>
      </Group>
    </Container>
  );
}
