import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Group,
  Button,
  Burger,
  Drawer,
  Stack,
  Container,
  Menu,
  ActionIcon,
  rem,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconWorld, IconCheck } from '@tabler/icons-react';

export function Header() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const navLinks = [
    { to: '/', label: t('nav.home') },
    { to: '/quiz', label: t('nav.quizzes') },
    { to: '/assessment', label: t('nav.assessments') },
    { to: '/videos', label: t('nav.videos') },
    { to: '/about', label: t('nav.about') },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <Container size="xl" h="100%">
      <Group justify="space-between" h="100%">
        {/* Logo */}
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <h2 style={{ margin: 0 }}>Thinkable</h2>
        </Link>

        {/* Desktop Navigation */}
        <Group gap="sm" visibleFrom="sm">
          {navLinks.map((link) => (
            <Button
              key={link.to}
              component={Link}
              to={link.to}
              variant={isActive(link.to) ? 'filled' : 'subtle'}
              size="sm"
            >
              {link.label}
            </Button>
          ))}
        </Group>

        {/* Language Switcher */}
        <Group gap="xs">
          <Menu shadow="md" width={150}>
            <Menu.Target>
              <ActionIcon variant="default" size="lg" aria-label="Change language">
                <IconWorld style={{ width: rem(20), height: rem(20) }} />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item
                leftSection={i18n.language === 'en' ? <IconCheck size={16} /> : null}
                onClick={() => changeLanguage('en')}
              >
                English
              </Menu.Item>
              <Menu.Item
                leftSection={i18n.language === 'he' ? <IconCheck size={16} /> : null}
                onClick={() => changeLanguage('he')}
              >
                עברית
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>

          {/* Mobile Burger */}
          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            hiddenFrom="sm"
            aria-label="Toggle navigation"
          />
        </Group>
      </Group>

      {/* Mobile Drawer */}
      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <Stack>
          {navLinks.map((link) => (
            <Button
              key={link.to}
              component={Link}
              to={link.to}
              variant={isActive(link.to) ? 'filled' : 'subtle'}
              size="lg"
              onClick={closeDrawer}
              fullWidth
            >
              {link.label}
            </Button>
          ))}
        </Stack>
      </Drawer>
    </Container>
  );
}
