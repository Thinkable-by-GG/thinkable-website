import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Container,
  Title,
  Text,
  SimpleGrid,
  Card,
  Image,
  Badge,
  Group,
  Stack,
  Modal,
  AspectRatio,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPlayerPlay, IconClock } from '@tabler/icons-react';

interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: number;
  category: string;
  videoUrl: string;
}

export function VideoLibraryPage() {
  const { t } = useTranslation();
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  // Mock video data - will be replaced with CMS data
  const mockVideos: Video[] = [
    {
      id: '1',
      title: 'Introduction to Mindfulness',
      description: 'Learn the basics of mindfulness meditation',
      thumbnail: 'https://placehold.co/600x400/667eea/ffffff?text=Mindfulness',
      duration: 12,
      category: 'Meditation',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    },
    {
      id: '2',
      title: 'Managing Stress',
      description: 'Practical techniques for stress management',
      thumbnail: 'https://placehold.co/600x400/f093fb/ffffff?text=Stress',
      duration: 15,
      category: 'Stress Management',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    },
    {
      id: '3',
      title: 'Better Sleep Habits',
      description: 'Improve your sleep quality with these tips',
      thumbnail: 'https://placehold.co/600x400/4facfe/ffffff?text=Sleep',
      duration: 10,
      category: 'Sleep',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    },
  ];

  const handleVideoClick = (video: Video) => {
    setSelectedVideo(video);
    open();
  };

  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        <div>
          <Title order={1} mb="md">
            {t('video.title')}
          </Title>
          <Text size="lg" c="dimmed">
            {t('video.description')}
          </Text>
        </div>

        <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
          {mockVideos.map((video) => (
            <Card
              key={video.id}
              shadow="sm"
              padding="lg"
              radius="md"
              withBorder
              style={{ cursor: 'pointer' }}
              onClick={() => handleVideoClick(video)}
            >
              <Card.Section>
                <Image
                  src={video.thumbnail}
                  height={200}
                  alt={video.title}
                  fallbackSrc="https://placehold.co/600x400/cccccc/ffffff?text=Video"
                />
              </Card.Section>

              <Stack gap="xs" mt="md">
                <Group justify="space-between">
                  <Badge color="blue" variant="light">
                    {video.category}
                  </Badge>
                  <Group gap="xs">
                    <IconClock size={16} />
                    <Text size="sm" c="dimmed">
                      {t('video.duration', { minutes: video.duration })}
                    </Text>
                  </Group>
                </Group>

                <Title order={3} lineClamp={2}>
                  {video.title}
                </Title>

                <Text size="sm" c="dimmed" lineClamp={2}>
                  {video.description}
                </Text>

                <Group gap="xs" mt="xs">
                  <IconPlayerPlay size={16} />
                  <Text size="sm" fw={500}>
                    {t('video.watchNow')}
                  </Text>
                </Group>
              </Stack>
            </Card>
          ))}
        </SimpleGrid>
      </Stack>

      {/* Video Player Modal */}
      <Modal
        opened={opened}
        onClose={close}
        title={selectedVideo?.title}
        size="xl"
        centered
      >
        {selectedVideo && (
          <Stack gap="md">
            <AspectRatio ratio={16 / 9}>
              <iframe
                src={selectedVideo.videoUrl}
                title={selectedVideo.title}
                style={{ border: 0 }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </AspectRatio>
            <div>
              <Badge color="blue" variant="light" mb="xs">
                {selectedVideo.category}
              </Badge>
              <Text size="sm">{selectedVideo.description}</Text>
            </div>
          </Stack>
        )}
      </Modal>
    </Container>
  );
}
