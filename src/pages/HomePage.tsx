import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
  Container,
  Title,
  Text,
  Button,
  Box,
  Card,
  Stack,
  Group,
  rem,
  BackgroundImage,
  Overlay,
  useMantineTheme,
  Paper,
  Loader,
  Image,
  Badge,
  TextInput,
  ActionIcon,
  Pill,
  Transition,
} from '@mantine/core';
import { IconArrowRight, IconExternalLink, IconSearch, IconSparkles, IconX } from '@tabler/icons-react';
import { useDebouncedValue } from '@mantine/hooks';
import { Carousel } from '@mantine/carousel';
import '@mantine/carousel/styles.css';

interface Media {
  url: string;
  alt?: string;
}

interface Condition {
  id: string;
  title: string;
  description: string;
  featuredImage?: Media;
}

interface Study {
  id: string;
  title: string;
  slug: string;
  category: string;
  publication: string;
  publicationYear: number;
  authors: { name: string }[];
  doi: string;
  keyMetrics: {
    participantCount: number;
    effectSize?: string;
    significanceLevel?: string;
    interventionDuration?: string;
  };
  studyType: string;
  summary: string | any;
  keywords?: { keyword: string }[];
  isFeatured?: boolean;
  isPublished?: boolean;
  thumbnail?: Media | string;
  highlights?: {
    oneLineSummary?: string;
    mainOutcome?: string;
  };
}

interface HomepageData {
  hero: {
    title: string;
    description: string;
    backgroundImage: Media | string;
    ctaPrimary: { text: string; link: string };
    ctaSecondary: { text: string; link: string };
  };
  conditionsSection: {
    title: string;
    description: string;
    featuredConditions: Condition[];
  };
  studiesSection: {
    title: string;
    description: string;
    featuredStudies: Study[];
  };
  bottomCta: {
    title: string;
    description: string;
    buttonText: string;
    buttonLink: string;
  };
}

// Default content as fallback
const defaultData: HomepageData = {
  hero: {
    title: 'Transform Your Mental Health Journey',
    description:
      'Evidence-based tools and personalized support for managing chronic conditions, improving wellbeing, and building resilience. Your path to better mental health starts here.',
    backgroundImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1600&h=600&fit=crop',
    ctaPrimary: { text: 'Get Started', link: '/assessment' },
    ctaSecondary: { text: 'Learn More', link: '/about' },
  },
  conditionsSection: {
    title: 'Conditions We Support',
    description:
      'Our platform provides specialized support for various chronic conditions, combining evidence-based techniques with personalized care.',
    featuredConditions: [],
  },
  studiesSection: {
    title: 'Evidence-Based Research',
    description:
      'Our approach is grounded in rigorous scientific research, including randomized controlled trials and peer-reviewed studies.',
    featuredStudies: [],
  },
  bottomCta: {
    title: 'Ready to Start Your Journey?',
    description:
      'Take our free self-assessment to get personalized recommendations and discover the tools that work best for you.',
    buttonText: 'Take Assessment',
    buttonLink: '/assessment',
  },
};

const CATEGORY_COLORS: Record<string, string> = {
  'self-esteem': 'blue',
  'rocd': 'pink',
  'anger': 'red',
  'perfectionism': 'violet',
  'brain-stimulation': 'grape',
  'multi-domain': 'teal',
};

const CATEGORY_LABELS: Record<string, string> = {
  'self-esteem': 'Self-Esteem',
  'rocd': 'Relationship OCD',
  'anger': 'Anger Management',
  'perfectionism': 'Perfectionism',
  'brain-stimulation': 'Brain Stimulation',
  'multi-domain': 'Multi-Domain',
};

export function HomePage() {
  const theme = useMantineTheme();
  const [data, setData] = useState<HomepageData>(defaultData);
  const [loading, setLoading] = useState(true);

  // Studies state
  const [allStudies, setAllStudies] = useState<Study[]>([]);
  const [studiesLoading, setStudiesLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch] = useDebouncedValue(searchQuery, 300);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    fetch('https://thinkable.app/api/globals/homepage?depth=2')
      .then((res) => res.json())
      .then((cmsData) => {
        // Process conditions - handle both ID references and populated objects
        const conditions = Array.isArray(cmsData.conditionsSection?.featuredConditions)
          ? cmsData.conditionsSection.featuredConditions
              .filter((c: any) => c && typeof c === 'object' && c.id)
              .map((c: any) => ({
                id: c.id,
                title: c.title || '',
                description: c.description || '',
                featuredImage: c.featuredImage,
              }))
          : [];

        // Process studies - handle both ID references and populated objects
        const studies = Array.isArray(cmsData.studiesSection?.featuredStudies)
          ? cmsData.studiesSection.featuredStudies
              .filter((s: any) => s && typeof s === 'object' && s.id)
              .map((s: any) => ({
                id: s.id,
                title: s.title || '',
                description: s.description || '',
                studyType: s.studyType || 'rct',
                publicationDate: s.publicationDate,
                featuredImage: s.featuredImage,
                journal: s.journal,
                publicationLink: s.publicationLink,
              }))
          : [];

        const mergedData: HomepageData = {
          hero: {
            title: cmsData.hero?.title || defaultData.hero.title,
            description: cmsData.hero?.description || defaultData.hero.description,
            backgroundImage: cmsData.hero?.backgroundImage || defaultData.hero.backgroundImage,
            ctaPrimary: {
              text: cmsData.hero?.ctaPrimary?.text || defaultData.hero.ctaPrimary.text,
              link: cmsData.hero?.ctaPrimary?.link || defaultData.hero.ctaPrimary.link,
            },
            ctaSecondary: {
              text: cmsData.hero?.ctaSecondary?.text || defaultData.hero.ctaSecondary.text,
              link: cmsData.hero?.ctaSecondary?.link || defaultData.hero.ctaSecondary.link,
            },
          },
          conditionsSection: {
            title: cmsData.conditionsSection?.title || defaultData.conditionsSection.title,
            description: cmsData.conditionsSection?.description || defaultData.conditionsSection.description,
            featuredConditions: conditions,
          },
          studiesSection: {
            title: cmsData.studiesSection?.title || defaultData.studiesSection.title,
            description: cmsData.studiesSection?.description || defaultData.studiesSection.description,
            featuredStudies: studies,
          },
          bottomCta: {
            title: cmsData.bottomCta?.title || defaultData.bottomCta.title,
            description: cmsData.bottomCta?.description || defaultData.bottomCta.description,
            buttonText: cmsData.bottomCta?.buttonText || defaultData.bottomCta.buttonText,
            buttonLink: cmsData.bottomCta?.buttonLink || defaultData.bottomCta.buttonLink,
          },
        };
        setData(mergedData);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Failed to fetch homepage data:', error);
        setData(defaultData);
        setLoading(false);
      });
  }, []);

  // Fetch all studies
  useEffect(() => {
    fetch('https://thinkable.app/api/studies?where[isPublished][equals]=true&limit=100&sort=-publicationYear')
      .then((res) => res.json())
      .then((response) => {
        if (response.docs) {
          setAllStudies(response.docs);
        }
        setStudiesLoading(false);
      })
      .catch((error) => {
        console.error('Failed to fetch studies:', error);
        setStudiesLoading(false);
      });
  }, []);

  // Filter studies based on search and category
  const filteredStudies = allStudies.filter((study) => {
    // Category filter
    if (selectedCategory && study.category !== selectedCategory) {
      return false;
    }

    // Search filter
    if (debouncedSearch) {
      const query = debouncedSearch.toLowerCase();
      const matchesTitle = study.title.toLowerCase().includes(query);
      const matchesAuthors = study.authors?.some((a) => a.name.toLowerCase().includes(query));
      const matchesKeywords = study.keywords?.some((k) => k.keyword.toLowerCase().includes(query));
      const matchesCategory = CATEGORY_LABELS[study.category]?.toLowerCase().includes(query);

      return matchesTitle || matchesAuthors || matchesKeywords || matchesCategory;
    }

    return true;
  });

  // Get unique categories from all studies
  const availableCategories = Array.from(new Set(allStudies.map((s) => s.category)));

  if (loading) {
    return (
      <Container size="lg" py="xl">
        <Stack align="center" justify="center" h={400}>
          <Loader size="xl" />
        </Stack>
      </Container>
    );
  }

  // Handle background image - could be a URL, Media object, or Media ID
  const backgroundImageUrl = (() => {
    if (typeof data.hero.backgroundImage === 'string') {
      // Check if it's a URL or an ID
      if (data.hero.backgroundImage.startsWith('http')) {
        return data.hero.backgroundImage;
      }
      // It's an ID - use the known media file
      // TODO: Fetch media metadata from API to get the actual filename
      return 'https://thinkable.app/media/thinkable-city-walk-blur.jpg';
    }
    // It's a Media object with url property
    if (data.hero.backgroundImage && typeof data.hero.backgroundImage === 'object' && 'url' in data.hero.backgroundImage) {
      return data.hero.backgroundImage.url;
    }
    // Fallback to default
    return defaultData.hero.backgroundImage as string;
  })();

  return (
    <Box>
      {/* Hero Section - Full Bleed */}
      <Box pos="relative" mb={rem(80)}>
        <BackgroundImage
          src={backgroundImageUrl}
          radius={0}
          h={{ base: rem(500), sm: rem(600), md: rem(700) }}
        >
          <Overlay color="#000" opacity={0.5} zIndex={1} />
          <Box h="100%" pos="relative" style={{ zIndex: 2 }}>
            <Container size="lg" h="100%">
              <Stack
                justify="center"
                h="100%"
                gap="xl"
                maw={700}
                py={{ base: 'xl', sm: rem(80) }}
              >
                <Title
                  order={1}
                  fw={700}
                  c="white"
                  style={{
                    lineHeight: 1.2,
                    fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                  }}
                >
                  {data.hero.title}
                </Title>
                <Text size="xl" c="white" opacity={0.95}>
                  {data.hero.description}
                </Text>
                <Group gap="md">
                  <Button
                    component={Link}
                    to={data.hero.ctaPrimary.link}
                    size="lg"
                    variant="gradient"
                    gradient={{ from: 'blue', to: 'cyan' }}
                    rightSection={<IconArrowRight size={20} />}
                    styles={{
                      root: {
                        paddingLeft: rem(30),
                        paddingRight: rem(30),
                      },
                    }}
                  >
                    {data.hero.ctaPrimary.text}
                  </Button>
                  <Button
                    component={Link}
                    to={data.hero.ctaSecondary.link}
                    size="lg"
                    variant="white"
                    styles={{
                      root: {
                        paddingLeft: rem(30),
                        paddingRight: rem(30),
                      },
                    }}
                  >
                    {data.hero.ctaSecondary.text}
                  </Button>
                </Group>
              </Stack>
            </Container>
          </Box>
        </BackgroundImage>
      </Box>

      {/* Conditions Section */}
      {data.conditionsSection.featuredConditions.length > 0 && (
        <Container size="lg" py="xl" mb={rem(60)}>
          <Stack gap="xl" align="center" ta="center" mb={rem(50)}>
            <Title order={2} size={rem(40)} fw={700}>
              {data.conditionsSection.title}
            </Title>
            <Text size="lg" c="dimmed" maw={700}>
              {data.conditionsSection.description}
            </Text>
          </Stack>

          <Carousel
            slideSize={{ base: '100%', sm: '50%', md: '33.333333%' }}
            slideGap={{ base: 'xs', sm: 'md' }}
            align="start"
            slidesToScroll={1}
            withControls
            loop
            styles={{
              control: {
                '&[data-inactive]': {
                  opacity: 0,
                  cursor: 'default',
                },
                backgroundColor: 'white',
                border: `1px solid ${theme.colors.gray[3]}`,
                '&:hover': {
                  backgroundColor: theme.colors.gray[0],
                },
              },
            }}
          >
            {data.conditionsSection.featuredConditions.map((condition) => {
              // Handle both string IDs and media objects
              const imageUrl = condition.featuredImage && typeof condition.featuredImage === 'object'
                ? condition.featuredImage.url
                : typeof condition.featuredImage === 'string'
                ? `https://thinkable.app/media/condition-${condition.title.toLowerCase()}.jpg`
                : null;

              return (
                <Carousel.Slide key={condition.id}>
                  <Paper
                    shadow="sm"
                    radius="md"
                    p={0}
                    withBorder
                    h="100%"
                    style={{
                      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                      cursor: 'pointer',
                      overflow: 'hidden',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-4px)';
                      e.currentTarget.style.boxShadow = theme.shadows.md;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = theme.shadows.sm;
                    }}
                  >
                    <Stack gap={0} h="100%">
                      {imageUrl && (
                        <Image
                          src={imageUrl}
                          alt={condition.featuredImage && typeof condition.featuredImage === 'object' ? condition.featuredImage.alt : condition.title}
                          h={rem(200)}
                          w="100%"
                          fit="cover"
                          fallbackSrc="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop"
                        />
                      )}
                      <Box p="lg">
                        <Title order={3} size="h4" mb="xs">
                          {condition.title}
                        </Title>
                        <Text size="sm" c="dimmed">
                          {condition.description}
                        </Text>
                      </Box>
                    </Stack>
                  </Paper>
                </Carousel.Slide>
              );
            })}
          </Carousel>
        </Container>
      )}

      {/* Studies Discovery Section - Apple-inspired */}
      <Box bg="gray.0" py={rem(80)} mb={rem(60)}>
        <Container size="xl">
          {/* Header */}
          <Stack gap="xl" align="center" ta="center" mb={rem(50)}>
            <Group gap="xs">
              <IconSparkles size={32} style={{ color: theme.colors.blue[6] }} />
              <Title order={2} size={rem(48)} fw={700}>
                Discover the Research
              </Title>
            </Group>
            <Text size="xl" c="dimmed" maw={700}>
              Explore peer-reviewed studies showcasing evidence-based interventions across mental health domains
            </Text>
          </Stack>

          {/* Search Bar */}
          <Box mb={rem(40)}>
            <TextInput
              size="lg"
              radius="xl"
              placeholder="Search by keyword, author, or topic..."
              leftSection={<IconSearch size={20} />}
              rightSection={
                searchQuery && (
                  <ActionIcon
                    variant="subtle"
                    color="gray"
                    onClick={() => setSearchQuery('')}
                    style={{ cursor: 'pointer' }}
                  >
                    <IconX size={16} />
                  </ActionIcon>
                )
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.currentTarget.value)}
              styles={{
                input: {
                  backgroundColor: 'white',
                  border: '2px solid transparent',
                  transition: 'all 0.2s ease',
                  '&:focus': {
                    borderColor: theme.colors.blue[5],
                    boxShadow: `0 0 0 3px ${theme.colors.blue[1]}`,
                  },
                },
              }}
            />
          </Box>

          {/* Category Filters */}
          <Group justify="center" gap="sm" mb={rem(40)}>
            <Pill
              size="lg"
              style={{
                cursor: 'pointer',
                backgroundColor: !selectedCategory ? theme.colors.blue[6] : 'white',
                color: !selectedCategory ? 'white' : theme.colors.gray[7],
                border: `2px solid ${!selectedCategory ? theme.colors.blue[6] : theme.colors.gray[3]}`,
                fontWeight: 600,
                transition: 'all 0.2s ease',
              }}
              onClick={() => setSelectedCategory(null)}
            >
              All Studies
            </Pill>
            {availableCategories.map((category) => (
              <Pill
                key={category}
                size="lg"
                style={{
                  cursor: 'pointer',
                  backgroundColor: selectedCategory === category ? CATEGORY_COLORS[category] : 'white',
                  color: selectedCategory === category ? 'white' : theme.colors.gray[7],
                  border: `2px solid ${selectedCategory === category ? CATEGORY_COLORS[category] : theme.colors.gray[3]}`,
                  fontWeight: 600,
                  transition: 'all 0.2s ease',
                }}
                onClick={() => setSelectedCategory(category)}
              >
                {CATEGORY_LABELS[category] || category}
              </Pill>
            ))}
          </Group>

          {/* Results Count */}
          <Text size="sm" c="dimmed" ta="center" mb={rem(30)}>
            {studiesLoading ? 'Loading studies...' : `${filteredStudies.length} ${filteredStudies.length === 1 ? 'study' : 'studies'} found`}
          </Text>

          {/* Studies Grid - Apple-like Cards */}
          <Box
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
              gap: rem(24),
            }}
          >
            {filteredStudies.map((study, index) => (
              <Transition
                key={study.id}
                mounted={true}
                transition="fade-up"
                duration={400}
                timingFunction="ease-out"
              >
                {(styles) => (
                  <Paper
                    component="a"
                    href={study.doi}
                    target="_blank"
                    rel="noopener noreferrer"
                    shadow="sm"
                    radius="xl"
                    p={0}
                    h={rem(420)}
                    withBorder
                    style={{
                      ...styles,
                      position: 'relative',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease, border-color 0.3s ease',
                      background: 'white',
                      textDecoration: 'none',
                      animationDelay: `${index * 50}ms`,
                      borderWidth: '1px',
                      borderColor: theme.colors.gray[2],
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-8px)';
                      e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.08)';
                      e.currentTarget.style.borderColor = theme.colors[CATEGORY_COLORS[study.category] || 'blue'][3];
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = theme.shadows.sm;
                      e.currentTarget.style.borderColor = theme.colors.gray[2];
                    }}
                  >
                    {/* Content - Bottom aligned */}
                    <Stack
                      gap="md"
                      justify="flex-end"
                      h="100%"
                      p="xl"
                      style={{
                        position: 'relative',
                        zIndex: 1,
                      }}
                    >
                      {/* Category Badge */}
                      <Box>
                        <Badge
                          size="lg"
                          variant="light"
                          color={CATEGORY_COLORS[study.category]}
                          style={{
                            fontWeight: 600,
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px',
                          }}
                        >
                          {CATEGORY_LABELS[study.category] || study.category}
                        </Badge>
                      </Box>

                      {/* Title */}
                      <Title
                        order={3}
                        size="h3"
                        c="dark"
                        lineClamp={3}
                        style={{
                          lineHeight: 1.3,
                        }}
                      >
                        {study.title}
                      </Title>

                      {/* Highlights */}
                      {study.highlights?.oneLineSummary && (
                        <Text
                          size="md"
                          c="dimmed"
                          lineClamp={2}
                        >
                          {study.highlights.oneLineSummary}
                        </Text>
                      )}

                      {/* Metrics */}
                      <Group gap="xl" mt="xs">
                        {study.keyMetrics.participantCount && (
                          <Box>
                            <Text size="xs" c="dimmed" fw={600} tt="uppercase" mb={4}>
                              Participants
                            </Text>
                            <Text size="xl" fw={700} c={CATEGORY_COLORS[study.category]}>
                              {study.keyMetrics.participantCount}
                            </Text>
                          </Box>
                        )}
                        {study.keyMetrics.effectSize && (
                          <Box>
                            <Text size="xs" c="dimmed" fw={600} tt="uppercase" mb={4}>
                              Effect Size
                            </Text>
                            <Text size="xl" fw={700} c={CATEGORY_COLORS[study.category]}>
                              {study.keyMetrics.effectSize}
                            </Text>
                          </Box>
                        )}
                      </Group>

                      {/* Authors & Year */}
                      <Text size="sm" c="dimmed" mt="xs">
                        {study.authors?.slice(0, 2).map((a) => a.name).join(', ')}
                        {(study.authors?.length ?? 0) > 2 && ' et al.'} • {study.publicationYear}
                      </Text>
                    </Stack>

                    {/* External Link Icon */}
                    <Box
                      style={{
                        position: 'absolute',
                        top: rem(20),
                        right: rem(20),
                        zIndex: 2,
                      }}
                    >
                      <IconExternalLink size={24} color={theme.colors.gray[5]} />
                    </Box>
                  </Paper>
                )}
              </Transition>
            ))}
          </Box>

          {/* No Results State */}
          {!studiesLoading && filteredStudies.length === 0 && (
            <Stack align="center" gap="md" py={rem(60)}>
              <Text size="xl" c="dimmed" fw={500}>
                No studies found
              </Text>
              <Text size="md" c="dimmed">
                Try adjusting your search or filters
              </Text>
              <Button
                variant="light"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory(null);
                }}
              >
                Clear filters
              </Button>
            </Stack>
          )}

          {/* Future AI Chat Placeholder - Reserved Space */}
          <Box mt={rem(80)} ta="center">
            <Stack align="center" gap="md">
              <Text size="lg" c="dimmed" fw={500}>
                Want to explore these studies deeper?
              </Text>
              <Text size="sm" c="dimmed" maw={600}>
                AI-powered research assistant coming soon to help you understand and discuss these publications
              </Text>
            </Stack>
          </Box>
        </Container>
      </Box>

      {/* CTA Section */}
      <Container size="lg" py="xl">
        <Card
          shadow="md"
          radius="lg"
          p="xl"
          style={{
            background: `linear-gradient(135deg, ${theme.colors.blue[6]} 0%, ${theme.colors.cyan[6]} 100%)`,
          }}
        >
          <Stack gap="lg" align="center" ta="center">
            <Title order={2} size={rem(32)} c="white">
              {data.bottomCta.title}
            </Title>
            <Text size="lg" c="white" opacity={0.95} maw={600}>
              {data.bottomCta.description}
            </Text>
            <Button
              component={Link}
              to={data.bottomCta.buttonLink}
              size="lg"
              variant="white"
              color="blue"
              rightSection={<IconArrowRight size={20} />}
              styles={{
                root: {
                  paddingLeft: rem(30),
                  paddingRight: rem(30),
                },
              }}
            >
              {data.bottomCta.buttonText}
            </Button>
          </Stack>
        </Card>
      </Container>
    </Box>
  );
}
