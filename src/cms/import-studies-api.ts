import fs from 'fs';
import path from 'path';

// Helper function to generate slug from title
const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

// Helper function to determine category from study content
const determineCategory = (study: any): string => {
  const title = (study.core_information?.study_title || '').toLowerCase();
  const summary = (study.study_content?.summary || '').toLowerCase();
  const keywords = (study.study_content?.keywords || []).join(' ').toLowerCase();
  const combined = `${title} ${summary} ${keywords}`;

  if (combined.includes('rocd') || combined.includes('relationship ocd') || combined.includes('relationship obsessive')) {
    return 'rocd';
  } else if (combined.includes('perfectionism') || combined.includes('perfectionist')) {
    return 'perfectionism';
  } else if (combined.includes('anger') || combined.includes('aggression')) {
    return 'anger';
  } else if (combined.includes('theta') || combined.includes('brain') || combined.includes('oscillatory') || combined.includes('stimulation')) {
    return 'brain-stimulation';
  } else if (combined.includes('self-esteem') || combined.includes('self esteem') || combined.includes('ggse')) {
    return 'self-esteem';
  }

  return 'multi-domain';
};

// Helper to extract key metrics
const extractKeyMetrics = (study: any) => {
  // Extract participant count from sample_size
  const sampleSizeStr = String(study.study_details.sample_size || '');
  const sampleSizeMatch = sampleSizeStr.match(/(\d+)\s+(participants|individuals|students|couples|adults)/i);
  const participantCount = sampleSizeMatch ? parseInt(sampleSizeMatch[1]) : 0;

  // Extract effect size from statistical_significance
  const statsStr = String(study.study_content.statistical_significance || '');
  const effectSizeMatch = statsStr.match(/(d=[-\d.]+|ηp²=[\d.]+|η²=[\d.]+)/i);
  const effectSize = effectSizeMatch ? effectSizeMatch[0] : '';

  // Extract significance level
  const significanceMatch = statsStr.match(/p[<>=]\.?\d+/i);
  const significanceLevel = significanceMatch ? significanceMatch[0] : '';

  // Extract intervention duration
  const durationStr = String(study.study_details.duration || '');
  const durationMatch = durationStr.match(/(\d+\s*days?|\d+\s*weeks?)/i);
  const interventionDuration = durationMatch ? durationMatch[0] : durationStr;

  return {
    participantCount,
    effectSize,
    significanceLevel,
    interventionDuration,
  };
};

// Helper to create one-line summary from first key finding
const createOneLineSummary = (keyFindings: string[]): string => {
  if (!keyFindings || keyFindings.length === 0) return '';

  const firstFinding = keyFindings[0];
  // Truncate to 150 chars
  return firstFinding.length > 150
    ? firstFinding.substring(0, 147) + '...'
    : firstFinding;
};

const transformStudies = () => {
  try {
    // Read the studies data
    const studiesDataPath = path.resolve(process.cwd(), 'studies_data.json');
    const rawData = fs.readFileSync(studiesDataPath, 'utf-8');
    const studiesData = JSON.parse(rawData);

    console.log(`Transforming ${studiesData.length} studies for Payload CMS...`);

    const transformedStudies = studiesData.map((study: any) => {
      const category = determineCategory(study);
      const keyMetrics = extractKeyMetrics(study);
      const slug = generateSlug(study.core_information.study_title);

      return {
        title: study.core_information.study_title,
        slug: slug,
        category: category,
        publication: study.core_information.publication_name,
        publicationYear: study.core_information.publication_year,
        authors: study.core_information.authors.map((name: string) => ({ name })),
        doi: study.core_information.doi,
        affiliations: study.core_information.affiliations,

        keyMetrics: {
          participantCount: keyMetrics.participantCount,
          effectSize: keyMetrics.effectSize,
          significanceLevel: keyMetrics.significanceLevel,
          interventionDuration: keyMetrics.interventionDuration,
        },

        studyType: study.study_details.type,
        sampleSize: study.study_details.sample_size,
        methodology: study.study_details.methodology,
        targetPopulation: study.study_details.target_population,
        duration: study.study_details.duration,

        summary: study.study_content.summary || '',
        keyFindings: (study.study_content.key_findings || []).map((finding: string) => ({ finding })),
        results: study.study_content.results || '',
        statisticalSignificance: study.study_content.statistical_significance || '',

        keywords: (study.study_content.keywords || []).slice(0, 50).map((kw: string) => ({ keyword: kw })),

        isFeatured: [1, 10, 18, 20].includes(study.study_id), // Feature some notable studies
        isPublished: true,
        displayOrder: study.study_id,

        highlights: {
          oneLineSummary: createOneLineSummary(study.study_content.key_findings || []),
          mainOutcome: study.study_content.key_findings?.[0] || '',
        },
      };
    });

    // Write transformed data
    const outputPath = path.resolve(process.cwd(), 'studies_transformed.json');
    fs.writeFileSync(outputPath, JSON.stringify(transformedStudies, null, 2));

    console.log(`✓ Transformed studies written to: ${outputPath}`);
    console.log(`\nSummary by category:`);

    const categoryCounts = transformedStudies.reduce((acc: any, study: any) => {
      acc[study.category] = (acc[study.category] || 0) + 1;
      return acc;
    }, {});

    Object.entries(categoryCounts).forEach(([category, count]) => {
      console.log(`  - ${category}: ${count} studies`);
    });

    console.log(`\nFeatured studies: ${transformedStudies.filter((s: any) => s.isFeatured).length}`);
    console.log(`\nNext steps:`);
    console.log(`1. Start Payload CMS: npm run payload`);
    console.log(`2. Use the API or admin UI to import studies from studies_transformed.json`);
    console.log(`3. Or run: npm run seed:studies (requires Payload server to be running)`);
  } catch (error) {
    console.error('Error transforming studies:', error);
    process.exit(1);
  }
};

transformStudies();
