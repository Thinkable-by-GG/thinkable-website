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
  TextInput,
  Box,
  Loader,
  Center,
  Paper,
  Divider,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconSearch,
  IconExternalLink,
  IconUsers,
  IconCalendar,
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

export function ResearchPage() {
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedStudy, setSelectedStudy] = useState<Study | null>(null);
  const [studies, setStudies] = useState<Study[]>([]);
  const [filteredStudies, setFilteredStudies] = useState<Study[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch studies from API
  useEffect(() => {
    fetch('https://thinkable.app/api/studies?limit=100&sort=displayOrder')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (data.docs && Array.isArray(data.docs)) {
          setStudies(data.docs);
          setFilteredStudies(data.docs);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching studies:', error);
        setError('Failed to load studies. Please try again later.');
        setLoading(false);
      });
  }, []);

  // Filter studies based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredStudies(studies);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = studies.filter((study) => {
      // Search in title
      if (study.title.toLowerCase().includes(query)) return true;

      // Search in authors
      if (study.authors.some((author) => author.name.toLowerCase().includes(query))) return true;

      // Search in keywords
      if (study.keywords.some((kw) => kw.keyword.toLowerCase().includes(query))) return true;

      // Search in summary
      if (study.summary && study.summary.toLowerCase().includes(query)) return true;

      // Search in category
      if (CATEGORY_LABELS[study.category]?.toLowerCase().includes(query)) return true;

      // Search in publication
      if (study.publication.toLowerCase().includes(query)) return true;

      return false;
    });

    setFilteredStudies(filtered);
  }, [searchQuery, studies]);

  const handleStudyClick = (study: Study) => {
    setSelectedStudy(study);
    open();
  };

  const featuredStudies = studies.filter((s) => s.isFeatured);

  if (loading) {
    return (
      <Container size="xl" py="xl">
        <Center h={400}>
          <Stack align="center" gap="md">
            <Loader size="xl" />
            <Text c="dimmed">Loading research studies...</Text>
          </Stack>
        </Center>
      </Container>
    );
  }

  if (error) {
    return (
      <Container size="xl" py="xl">
        <Center h={400}>
          <Stack align="center" gap="md">
            <Text c="red" size="lg">
              {error}
            </Text>
          </Stack>
        </Center>
      </Container>
    );
  }

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
            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg" mb="xl">
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
                      {study.highlights.oneLineSummary || study.summary}
                    </Text>

                    <Group gap="md" wrap="wrap">
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
                    </Group>
                  </Stack>
                </Card>
              ))}
            </SimpleGrid>
          </Box>
        )}

        <Divider />

        {/* Search */}
        <TextInput
          placeholder="Search by title, author, keyword, category, or publication..."
          leftSection={<IconSearch size={16} />}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.currentTarget.value)}
          size="md"
        />

        {/* Studies Grid */}
        <div>
          <Text size="sm" c="dimmed" mb="md">
            Showing {filteredStudies.length} {filteredStudies.length === 1 ? 'study' : 'studies'}
            {searchQuery && ` matching "${searchQuery}"`}
          </Text>

          {filteredStudies.length === 0 ? (
            <Paper p="xl" radius="md" withBorder>
              <Stack align="center" gap="md">
                <Text size="lg" c="dimmed">
                  No studies found matching your search.
                </Text>
                <Button variant="light" onClick={() => setSearchQuery('')}>
                  Clear search
                </Button>
              </Stack>
            </Paper>
          ) : (
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
                    <Badge color={CATEGORY_COLORS[study.category] || 'gray'} variant="light">
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
                      <Text size="xs">n={study.keyMetrics.participantCount}</Text>
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
          )}
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
            {selectedStudy.summary && (
              <Box>
                <Title order={4} size="h5" mb="sm">
                  Summary
                </Title>
                <Text size="sm">{selectedStudy.summary}</Text>
              </Box>
            )}

            {/* Key Findings */}
            {selectedStudy.keyFindings.length > 0 && (
              <Box>
                <Title order={4} size="h5" mb="sm">
                  Key Findings
                </Title>
                <Stack gap="xs">
                  {selectedStudy.keyFindings.map((finding, idx) => (
                    <Text key={idx} size="sm">
                      • {finding.finding}
                    </Text>
                  ))}
                </Stack>
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
                {selectedStudy.sampleSize && (
                  <div>
                    <Text size="xs" c="dimmed" fw={700}>
                      Sample:
                    </Text>
                    <Text size="sm">{selectedStudy.sampleSize}</Text>
                  </div>
                )}
                {selectedStudy.targetPopulation && (
                  <div>
                    <Text size="xs" c="dimmed" fw={700}>
                      Target Population:
                    </Text>
                    <Text size="sm">{selectedStudy.targetPopulation}</Text>
                  </div>
                )}
              </Stack>
            </Box>

            {/* Keywords */}
            {selectedStudy.keywords.length > 0 && (
              <Box>
                <Title order={4} size="h5" mb="sm">
                  Keywords
                </Title>
                <Group gap="xs">
                  {selectedStudy.keywords.slice(0, 15).map((kw, idx) => (
                    <Badge key={idx} variant="dot" size="sm">
                      {kw.keyword}
                    </Badge>
                  ))}
                  {selectedStudy.keywords.length > 15 && (
                    <Badge variant="dot" size="sm">
                      +{selectedStudy.keywords.length - 15} more
                    </Badge>
                  )}
                </Group>
              </Box>
            )}

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
