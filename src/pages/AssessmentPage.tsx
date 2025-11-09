import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Container,
  Title,
  Text,
  Button,
  Stack,
  Paper,
  Slider,
  Group,
  Alert,
  Progress,
  RingProgress,
  Center,
} from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';

interface AssessmentQuestion {
  id: string;
  question: string;
  min: number;
  max: number;
  minLabel: string;
  maxLabel: string;
}

export function AssessmentPage() {
  const { t } = useTranslation();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [currentValue, setCurrentValue] = useState(5);
  const [showResults, setShowResults] = useState(false);

  // Mock assessment data - will be replaced with CMS data
  const mockQuestions: AssessmentQuestion[] = [
    {
      id: '1',
      question: 'How would you rate your overall mood today?',
      min: 1,
      max: 10,
      minLabel: 'Very Low',
      maxLabel: 'Very High',
    },
    {
      id: '2',
      question: 'How stressed do you feel right now?',
      min: 1,
      max: 10,
      minLabel: 'Not at all',
      maxLabel: 'Extremely',
    },
    {
      id: '3',
      question: 'How would you rate your energy levels?',
      min: 1,
      max: 10,
      minLabel: 'Very Low',
      maxLabel: 'Very High',
    },
  ];

  const totalQuestions = mockQuestions.length;
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  const handleNext = () => {
    const newAnswers = [...answers, currentValue];
    setAnswers(newAnswers);

    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setCurrentValue(5);
    } else {
      setShowResults(true);
    }
  };

  const calculateScore = () => {
    const total = answers.reduce((sum, val) => sum + val, 0);
    return Math.round((total / (totalQuestions * 10)) * 100);
  };

  if (showResults) {
    const score = calculateScore();
    return (
      <Container size="sm" py="xl">
        <Paper shadow="sm" p="xl" radius="md">
          <Stack gap="xl" align="center">
            <Title order={2}>{t('assessment.results')}</Title>

            <RingProgress
              size={200}
              thickness={16}
              sections={[{ value: score, color: score > 70 ? 'green' : score > 40 ? 'yellow' : 'red' }]}
              label={
                <Center>
                  <Text size="xl" fw={700}>
                    {score}%
                  </Text>
                </Center>
              }
            />

            <Alert icon={<IconAlertCircle />} color="blue" w="100%">
              <Text size="sm">
                {t('assessment.disclaimer')}
              </Text>
            </Alert>

            <Button onClick={() => window.location.reload()} fullWidth>
              {t('quiz.retake')}
            </Button>
          </Stack>
        </Paper>
      </Container>
    );
  }

  return (
    <Container size="sm" py="xl">
      <Stack gap="xl">
        <div>
          <Title order={1} mb="md">
            {t('assessment.title')}
          </Title>
          <Text size="sm" c="dimmed" mb="md">
            {t('assessment.description')}
          </Text>
          <Progress value={progress} size="sm" mb="xs" />
          <Text size="sm" c="dimmed">
            {t('assessment.progress', { percent: Math.round(progress) })}
          </Text>
        </div>

        <Alert icon={<IconAlertCircle />} color="blue">
          <Text size="sm">{t('assessment.disclaimer')}</Text>
        </Alert>

        <Paper shadow="sm" p="xl" radius="md">
          <Stack gap="xl">
            <Title order={3}>{mockQuestions[currentQuestion].question}</Title>

            <div>
              <Slider
                value={currentValue}
                onChange={setCurrentValue}
                min={mockQuestions[currentQuestion].min}
                max={mockQuestions[currentQuestion].max}
                step={1}
                marks={[
                  { value: 1, label: mockQuestions[currentQuestion].minLabel },
                  { value: 10, label: mockQuestions[currentQuestion].maxLabel },
                ]}
                size="lg"
                mb="xl"
              />
              <Center>
                <Text size="xl" fw={700}>
                  {currentValue}
                </Text>
              </Center>
            </div>
          </Stack>
        </Paper>

        <Group justify="flex-end">
          <Button onClick={handleNext} size="lg">
            {currentQuestion === totalQuestions - 1 ? t('common.finish') : t('common.next')}
          </Button>
        </Group>
      </Stack>
    </Container>
  );
}
