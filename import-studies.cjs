const payload = require('payload');
const fs = require('fs');
const path = require('path');

const importStudies = async () => {
  try {
    await payload.init({
      secret: process.env.PAYLOAD_SECRET || 'thinkable-secret',
      local: true,
    });

    console.log('Payload initialized');

    const studiesData = JSON.parse(
      fs.readFileSync(path.join(__dirname, 'studies_data.json'), 'utf-8')
    );

    console.log('Found ' + studiesData.length + ' studies');

    let success = 0;
    let failed = 0;

    for (const study of studiesData) {
      try {
        const keyFindings = study.study_content.key_findings || [];
        const keywords = study.study_content.keywords || [];

        const doc = await payload.create({
          collection: 'studies',
          data: {
            title: study.core_information.study_title,
            slug: study.core_information.study_title
              .toLowerCase()
              .replace(/[^\w\s-]/g, '')
              .replace(/\s+/g, '-'),
            category: determineCat(study),
            publication: study.core_information.publication_name,
            publicationYear: study.core_information.publication_year,
            authors: study.core_information.authors.map(name => ({ name: name })),
            doi: study.core_information.doi,
            affiliations: study.core_information.affiliations,
            keyMetrics: extractMetrics(study),
            studyType: study.study_details.type || study.study_details.study_type || 'Randomized Controlled Trial',
            sampleSize: String(study.study_details.sample_size || ''),
            methodology: study.study_details.methodology || '',
            targetPopulation: study.study_details.target_population || '',
            duration: study.study_details.duration || '',
            summary: study.study_content.summary || '',
            keyFindings: keyFindings.map(f => ({ finding: f })),
            results: study.study_content.results || '',
            statisticalSignificance: study.study_content.statistical_significance || '',
            keywords: keywords.slice(0, 50).map(kw => ({ keyword: kw })),
            isFeatured: [1, 10, 18, 20].includes(study.study_id),
            isPublished: true,
            displayOrder: study.study_id,
            highlights: {
              oneLineSummary: (keyFindings[0] || '').substring(0, 150),
              mainOutcome: keyFindings[0] || '',
            },
          },
        });

        console.log('✓ #' + study.study_id + ': ' + study.core_information.study_title.substring(0, 50) + '...');
        success++;
      } catch (error) {
        console.error('✗ #' + study.study_id + ': ' + error.message);
        if (error.data) {
          console.error('  Validation errors:', JSON.stringify(error.data));
        }
        failed++;
      }
    }

    console.log('\nDone: ' + success + ' success, ' + failed + ' failed');
    process.exit(0);
  } catch (error) {
    console.error('Fatal:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
};

function determineCat(study) {
  const title = (study.core_information.study_title || '').toLowerCase();
  const summary = (study.study_content.summary || '').toLowerCase();
  const keywords = (study.study_content.keywords || []).join(' ').toLowerCase();
  const combined = title + ' ' + summary + ' ' + keywords;

  if (combined.includes('rocd') || combined.includes('relationship ocd')) return 'rocd';
  if (combined.includes('perfectionism')) return 'perfectionism';
  if (combined.includes('anger')) return 'anger';
  if (combined.includes('theta') || combined.includes('brain') || combined.includes('stimulation')) return 'brain-stimulation';
  if (combined.includes('self-esteem') || combined.includes('ggse')) return 'self-esteem';
  return 'multi-domain';
}

function extractMetrics(study) {
  const sampleStr = String(study.study_details.sample_size || '');
  const statsStr = String(study.study_content.statistical_significance || '');
  const durStr = String(study.study_details.duration || '');

  const pMatch = sampleStr.match(/(\d+)\s+(participants|individuals|students|couples|adults)/i);
  const eMatch = statsStr.match(/(d=[-\d.]+|ηp²=[\d.]+|η²=[\d.]+)/i);
  const sMatch = statsStr.match(/p[<>=]\.?\d+/i);
  const dMatch = durStr.match(/(\d+\s*days?|\d+\s*weeks?)/i);

  return {
    participantCount: pMatch ? parseInt(pMatch[1]) : 0,
    effectSize: eMatch ? eMatch[0] : '',
    significanceLevel: sMatch ? sMatch[0] : '',
    interventionDuration: dMatch ? dMatch[0] : durStr.substring(0, 50),
  };
}

importStudies();
