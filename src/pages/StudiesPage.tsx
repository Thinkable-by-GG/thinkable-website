import { useState, useEffect } from 'react';
import {
  Container,
  Title,
  Text,
  SimpleGrid,
  Card,
  Badge,
  Group,
  Stack,
  Modal,
  Button,
  Select,
  TextInput,
  Divider,
  List,
  ThemeIcon,
  Box,
  Flex,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconSearch,
  IconExternalLink,
  IconUsers,
  IconCalendar,
  IconCheck,
  IconTrendingUp,
} from '@tabler/icons-react';

interface Study {
  id: string;
  title: string;
  slug: string;
  category: string;
  publication: string;
  publicationYear: number;
  authors: { name: string }[];
  doi: string;
  affiliations: string;
  keyMetrics: {
    participantCount: number;
    effectSize: string;
    significanceLevel: string;
    interventionDuration: string;
  };
  studyType: string;
  sampleSize: string;
  methodology: string;
  targetPopulation: string;
  duration: string;
  summary: string;
  keyFindings: { finding: string }[];
  results: string;
  statisticalSignificance: string;
  keywords: { keyword: string }[];
  isFeatured: boolean;
  isPublished: boolean;
  displayOrder: number;
  highlights: {
    oneLineSummary: string;
    mainOutcome: string;
  };
}

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

export function StudiesPage() {
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedStudy, setSelectedStudy] = useState<Study | null>(null);
  const [studies, setStudies] = useState<Study[]>([]);
  const [filteredStudies, setFilteredStudies] = useState<Study[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data - replace with actual CMS API call
  useEffect(() => {
    // TODO: Replace with actual API call
    // fetch('/api/studies?where[isPublished][equals]=true&sort=displayOrder')
    //   .then(res => res.json())
    //   .then(data => {
    //     setStudies(data.docs);
    //     setFilteredStudies(data.docs);
    //     setLoading(false);
    //   });

    // For now, using mock data
    const mockStudies: Study[] = [
      {
        id: '1',
        title: 'A randomized clinical trial of a gamified app for the treatment of perfectionism',
        slug: 'gamified-app-perfectionism-treatment',
        category: 'perfectionism',
        publication: 'British Journal of Clinical Psychology',
        publicationYear: 2023,
        authors: [
          { name: 'Amitai Abramovitch' },
          { name: 'Akuekegbe Uwadiale' },
          { name: 'Anthony Robinson' },
        ],
        doi: 'https://doi.org/10.1111/bjc.12416',
        affiliations: 'Texas State University',
        keyMetrics: {
          participantCount: 70,
          effectSize: 'd=-1.19',
          significanceLevel: 'p<.001',
          interventionDuration: '14 days',
        },
        studyType: 'Randomized Controlled Trial',
        sampleSize: '70 college students (35 app, 35 waitlist)',
        methodology: 'RCT with 1:1 randomization',
        targetPopulation: 'College students with elevated perfectionism',
        duration: '14 days intervention + 1-month follow-up',
        summary: 'This RCT evaluated the efficacy of a gamified mobile app for treating perfectionism.',
        keyFindings: [
          { finding: 'Large between-group effect on primary outcome (d=-1.19)' },
          { finding: 'Significant improvements in functional impairment across 14 life domains' },
          { finding: '30% showed reliable clinical change' },
        ],
        results: 'Significant improvements in perfectionism and functional outcomes.',
        statisticalSignificance: 'F(1,58)=14.89, p<.001, d=-1.19',
        keywords: [{ keyword: 'perfectionism' }, { keyword: 'mobile app' }],
        isFeatured: true,
        isPublished: true,
        displayOrder: 1,
        highlights: {
          oneLineSummary: 'Gamified app shows large effect in reducing perfectionism',
          mainOutcome: 'Large between-group effect on primary outcome (d=-1.19)',
        },
      },
    ];

    setStudies(mockStudies);
    setFilteredStudies(mockStudies);
  }, []);

  // Filter studies based on category and search query
  useEffect(() => {
    let filtered = studies;

    if (categoryFilter) {
      filtered = filtered.filter((study) => study.category === categoryFilter);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (study) =>
          study.title.toLowerCase().includes(query) ||
          study.summary.toLowerCase().includes(query) ||
          study.authors.some((author) => author.name.toLowerCase().includes(query))
      );
    }

    setFilteredStudies(filtered);
  }, [categoryFilter, searchQuery, studies]);

  const handleStudyClick = (study: Study) => {
    setSelectedStudy(study);
    open();
  };

  const categoryOptions = [
    { value: '', label: 'All Categories' },
    ...Object.entries(CATEGORY_LABELS).map(([value, label]) => ({
      value,
      label,
    })),
  ];

  const featuredStudies = studies.filter((s) => s.isFeatured);

  return (
    <Container size="xl" py="xl">
      <Stack gap="xl">
        {/* Header Section */}
        <div>
          <Title order={1} mb="md">
            Peer-Reviewed Research
          </Title>
          <Text size="lg" c="dimmed" mb="xl">
            Explore our collection of {studies.length} peer-reviewed studies demonstrating the
            effectiveness of evidence-based interventions across multiple domains.
          </Text>
        </div>

        {/* Featured Studies */}
        {featuredStudies.length > 0 && (
          <Box>
            <Title order={2} size="h3" mb="md">
              Featured Studies
            </Title>
            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
              {featuredStudies.map((study) => (
                <Card
                  key={study.id}
                  shadow="md"
                  padding="lg"
                  radius="md"
                  withBorder
                  style={{
                    cursor: 'pointer',
                    borderColor: 'var(--mantine-color-blue-3)',
                    borderWidth: 2,
                  }}
                  onClick={() => handleStudyClick(study)}
                >
                  <Stack gap="md">
                    <Group justify="space-between">
                      <Badge
                        color={CATEGORY_COLORS[study.category] || 'gray'}
                        variant="light"
                        size="lg"
                      >
                        {CATEGORY_LABELS[study.category] || study.category}
                      </Badge>
                      <Badge color="yellow" variant="filled" size="sm">
                        Featured
                      </Badge>
                    </Group>

                    <Title order={3} size="h4" lineClamp={2}>
                      {study.title}
                    </Title>

                    <Text size="sm" c="dimmed" lineClamp={2}>
                      {study.highlights.oneLineSummary}
                    </Text>

                    <Flex gap="md" wrap="wrap">
                      <Group gap="xs">
                        <IconUsers size={16} />
                        <Text size="xs" fw={500}>
                          {study.keyMetrics.participantCount} participants
                        </Text>
                      </Group>
                      {study.keyMetrics.effectSize && (
                        <Group gap="xs">
                          <IconTrendingUp size={16} />
                          <Text size="xs" fw={500}>
                            {study.keyMetrics.effectSize}
                          </Text>
                        </Group>
                      )}
                      <Group gap="xs">
                        <IconCalendar size={16} />
                        <Text size="xs" c="dimmed">
                          {study.publicationYear}
                        </Text>
                      </Group>
                    </Flex>
                  </Stack>
                </Card>
              ))}
            </SimpleGrid>
          </Box>
        )}

        <Divider />

        {/* Filters */}
        <Group grow>
          <TextInput
            placeholder="Search studies by title, author, or keyword..."
            leftSection={<IconSearch size={16} />}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.currentTarget.value)}
          />
          <Select
            placeholder="Filter by category"
            data={categoryOptions}
            value={categoryFilter}
            onChange={(value) => setCategoryFilter(value)}
            clearable
          />
        </Group>

        {/* Studies Grid */}
        <div>
          <Text size="sm" c="dimmed" mb="md">
            Showing {filteredStudies.length} {filteredStudies.length === 1 ? 'study' : 'studies'}
          </Text>

          <SimpleGrid cols={{ base: 1, md: 2, lg: 3 }} spacing="lg">
            {filteredStudies.map((study) => (
              <Card
                key={study.id}
                shadow="sm"
                padding="lg"
                radius="md"
                withBorder
                style={{ cursor: 'pointer', height: '100%' }}
                onClick={() => handleStudyClick(study)}
              >
                <Stack gap="md" style={{ height: '100%' }}>
                  <Badge
                    color={CATEGORY_COLORS[study.category] || 'gray'}
                    variant="light"
                  >
                    {CATEGORY_LABELS[study.category] || study.category}
                  </Badge>

                  <Title order={4} lineClamp={3}>
                    {study.title}
                  </Title>

                  <Text size="sm" c="dimmed">
                    {study.authors.slice(0, 2).map((a) => a.name).join(', ')}
                    {study.authors.length > 2 && ' et al.'}
                  </Text>

                  <Text size="sm" fw={500}>
                    {study.publication} ({study.publicationYear})
                  </Text>

                  <Group gap="xs" mt="auto">
                    <IconUsers size={14} />
                    <Text size="xs">
                      n={study.keyMetrics.participantCount}
                    </Text>
                    {study.keyMetrics.effectSize && (
                      <>
                        <Text size="xs" c="dimmed">
                          •
                        </Text>
                        <Text size="xs" fw={500}>
                          {study.keyMetrics.effectSize}
                        </Text>
                      </>
                    )}
                  </Group>

                  <Button
                    variant="light"
                    size="sm"
                    rightSection={<IconExternalLink size={14} />}
                  >
                    View Details
                  </Button>
                </Stack>
              </Card>
            ))}
          </SimpleGrid>
        </div>
      </Stack>

      {/* Study Detail Modal */}
      <Modal
        opened={opened}
        onClose={close}
        title={
          <Group gap="xs">
            <Badge
              color={CATEGORY_COLORS[selectedStudy?.category || 'gray'] || 'gray'}
              variant="light"
            >
              {CATEGORY_LABELS[selectedStudy?.category || ''] || selectedStudy?.category}
            </Badge>
            {selectedStudy?.isFeatured && (
              <Badge color="yellow" variant="filled" size="sm">
                Featured
              </Badge>
            )}
          </Group>
        }
        size="xl"
        centered
      >
        {selectedStudy && (
          <Stack gap="lg">
            <div>
              <Title order={3} mb="xs">
                {selectedStudy.title}
              </Title>
              <Text size="sm" c="dimmed">
                {selectedStudy.authors.map((a) => a.name).join(', ')}
              </Text>
              <Text size="sm" fw={500} mt="xs">
                {selectedStudy.publication} ({selectedStudy.publicationYear})
              </Text>
            </div>

            <Divider />

            {/* Key Metrics */}
            <Box>
              <Title order={4} size="h5" mb="sm">
                Key Metrics
              </Title>
              <SimpleGrid cols={2} spacing="md">
                <div>
                  <Text size="xs" c="dimmed" tt="uppercase" fw={700}>
                    Participants
                  </Text>
                  <Text size="lg" fw={700}>
                    {selectedStudy.keyMetrics.participantCount}
                  </Text>
                </div>
                {selectedStudy.keyMetrics.effectSize && (
                  <div>
                    <Text size="xs" c="dimmed" tt="uppercase" fw={700}>
                      Effect Size
                    </Text>
                    <Text size="lg" fw={700}>
                      {selectedStudy.keyMetrics.effectSize}
                    </Text>
                  </div>
                )}
                {selectedStudy.keyMetrics.significanceLevel && (
                  <div>
                    <Text size="xs" c="dimmed" tt="uppercase" fw={700}>
                      Significance
                    </Text>
                    <Text size="lg" fw={700}>
                      {selectedStudy.keyMetrics.significanceLevel}
                    </Text>
                  </div>
                )}
                {selectedStudy.keyMetrics.interventionDuration && (
                  <div>
                    <Text size="xs" c="dimmed" tt="uppercase" fw={700}>
                      Duration
                    </Text>
                    <Text size="lg" fw={700}>
                      {selectedStudy.keyMetrics.interventionDuration}
                    </Text>
                  </div>
                )}
              </SimpleGrid>
            </Box>

            <Divider />

            {/* Summary */}
            <Box>
              <Title order={4} size="h5" mb="sm">
                Summary
              </Title>
              <Text size="sm">{selectedStudy.summary}</Text>
            </Box>

            {/* Key Findings */}
            {selectedStudy.keyFindings.length > 0 && (
              <Box>
                <Title order={4} size="h5" mb="sm">
                  Key Findings
                </Title>
                <List
                  spacing="xs"
                  size="sm"
                  icon={
                    <ThemeIcon color="teal" size={20} radius="xl">
                      <IconCheck size={12} />
                    </ThemeIcon>
                  }
                >
                  {selectedStudy.keyFindings.map((finding, idx) => (
                    <List.Item key={idx}>{finding.finding}</List.Item>
                  ))}
                </List>
              </Box>
            )}

            {/* Study Details */}
            <Box>
              <Title order={4} size="h5" mb="sm">
                Study Details
              </Title>
              <Stack gap="xs">
                <div>
                  <Text size="xs" c="dimmed" fw={700}>
                    Type:
                  </Text>
                  <Text size="sm">{selectedStudy.studyType}</Text>
                </div>
                <div>
                  <Text size="xs" c="dimmed" fw={700}>
                    Sample:
                  </Text>
                  <Text size="sm">{selectedStudy.sampleSize}</Text>
                </div>
                <div>
                  <Text size="xs" c="dimmed" fw={700}>
                    Target Population:
                  </Text>
                  <Text size="sm">{selectedStudy.targetPopulation}</Text>
                </div>
              </Stack>
            </Box>

            <Divider />

            {/* Links */}
            <Group>
              <Button
                component="a"
                href={selectedStudy.doi}
                target="_blank"
                rel="noopener noreferrer"
                rightSection={<IconExternalLink size={14} />}
              >
                Read Full Paper
              </Button>
            </Group>
          </Stack>
        )}
      </Modal>
    </Container>
  );
}
