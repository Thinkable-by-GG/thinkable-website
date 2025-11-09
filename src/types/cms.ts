// CMS Type Definitions

export interface Media {
  id: string;
  alt: string;
  filename: string;
  mimeType: string;
  filesize: number;
  width?: number;
  height?: number;
  url: string;
  sizes?: {
    thumbnail?: MediaSize;
    card?: MediaSize;
    tablet?: MediaSize;
  };
}

export interface MediaSize {
  url: string;
  width: number;
  height: number;
  filename: string;
}

export interface Quiz {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: 'stress' | 'anxiety' | 'depression' | 'mindfulness' | 'general';
  thumbnail?: Media;
  questions: QuizQuestion[];
  resultRanges?: ResultRange[];
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface QuizQuestion {
  question: string;
  options: QuizOption[];
  explanation?: string;
}

export interface QuizOption {
  text: string;
  score?: number;
}

export interface ResultRange {
  minScore: number;
  maxScore: number;
  title: string;
  description: string;
}

export interface Assessment {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: 'stress' | 'anxiety' | 'depression' | 'sleep' | 'wellbeing';
  thumbnail?: Media;
  disclaimer: string;
  questions: AssessmentQuestion[];
  scoring: AssessmentScoring;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AssessmentQuestion {
  question: string;
  type: 'scale' | 'multiple' | 'boolean';
  minLabel?: string;
  maxLabel?: string;
  options?: AssessmentOption[];
}

export interface AssessmentOption {
  text: string;
  score: number;
}

export interface AssessmentScoring {
  maxScore: number;
  ranges: ScoringRange[];
}

export interface ScoringRange {
  minScore: number;
  maxScore: number;
  level: 'low' | 'moderate' | 'high';
  title: string;
  description: string;
  recommendations?: string;
}

export interface Video {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: 'meditation' | 'stress' | 'sleep' | 'mindfulness' | 'breathing' | 'educational';
  thumbnail: Media;
  videoFile: Media;
  duration: number;
  tags?: { tag: string }[];
  transcript?: string;
  relatedVideos?: Video[];
  isPublished: boolean;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}
