import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Container,
  Title,
  Text,
  Button,
  Stack,
  Paper,
  Radio,
  Group,
  Progress,
  Alert,
} from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer?: number;
}

export function QuizPage() {
  const { t } = useTranslation();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [answers, setAnswers] = useState<number[]>([]);

  // Mock quiz data - will be replaced with CMS data
  const mockQuestions: QuizQuestion[] = [
    {
      id: '1',
      question: 'How often do you practice mindfulness or meditation?',
      options: ['Daily', 'Weekly', 'Rarely', 'Never'],
    },
    {
      id: '2',
      question: 'How would you rate your sleep quality?',
      options: ['Excellent', 'Good', 'Fair', 'Poor'],
    },
    {
      id: '3',
      question: 'Do you engage in regular physical activity?',
      options: ['Yes, regularly', 'Sometimes', 'Rarely', 'No'],
    },
  ];

  const totalQuestions = mockQuestions.length;
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  const handleNext = () => {
    if (selectedAnswer !== null) {
      setAnswers([...answers, parseInt(selectedAnswer)]);
      setSelectedAnswer(null);

      if (currentQuestion < totalQuestions - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setShowResults(true);
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(null);
    }
  };

  const handleRetake = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResults(false);
    setAnswers([]);
  };

  if (showResults) {
    return (
      <Container size="sm" py="xl">
        <Paper shadow="sm" p="xl" radius="md">
          <Stack gap="md">
            <Title order={2}>{t('quiz.results')}</Title>
            <Alert icon={<IconInfoCircle />} color="blue">
              <Text>
                Thank you for completing the quiz! Your responses have been recorded.
              </Text>
            </Alert>
            <Group justify="center" mt="xl">
              <Button onClick={handleRetake}>{t('quiz.retake')}</Button>
            </Group>
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
            {t('quiz.title')}
          </Title>
          <Progress value={progress} size="sm" mb="xs" />
          <Text size="sm" c="dimmed">
            {t('quiz.question', { current: currentQuestion + 1, total: totalQuestions })}
          </Text>
        </div>

        <Paper shadow="sm" p="xl" radius="md">
          <Stack gap="lg">
            <Title order={3}>{mockQuestions[currentQuestion].question}</Title>

            <Radio.Group value={selectedAnswer} onChange={setSelectedAnswer}>
              <Stack gap="sm">
                {mockQuestions[currentQuestion].options.map((option, index) => (
                  <Radio
                    key={index}
                    value={index.toString()}
                    label={option}
                    size="md"
                  />
                ))}
              </Stack>
            </Radio.Group>
          </Stack>
        </Paper>

        <Group justify="space-between">
          <Button
            variant="subtle"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
          >
            {t('common.previous')}
          </Button>
          <Button
            onClick={handleNext}
            disabled={selectedAnswer === null}
          >
            {currentQuestion === totalQuestions - 1 ? t('common.finish') : t('common.next')}
          </Button>
        </Group>
      </Stack>
    </Container>
  );
}
