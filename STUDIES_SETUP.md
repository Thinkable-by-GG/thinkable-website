# Studies Section Setup Guide

This guide explains how to work with the peer-reviewed research studies in the Thinkable website.

## Overview

The studies section contains 20 peer-reviewed RCT (Randomized Controlled Trial) studies about the GGtude platform, spanning:
- **Self-Esteem** (1 study)
- **Relationship OCD - ROCD** (3 studies)
- **Anger Management** (1 study)
- **Perfectionism** (7 studies)
- **Multi-Domain** (8 studies)

## File Structure

```
/Users/gurilany/dev/thinkable-website/
├── studies_data.json                    # Original extracted data (20 studies)
├── studies_transformed.json             # CMS-ready transformed data
├── src/cms/
│   ├── collections/Studies.ts           # Payload CMS collection definition
│   ├── payload.config.ts                # Payload configuration (includes Studies)
│   ├── seed-studies.ts                  # Seed script for populating CMS
│   └── import-studies-api.ts            # Transformation script
└── STUDIES_SETUP.md                     # This file
```

## Data Structure

### Original Data (`studies_data.json`)
Each study contains:
- `study_id`: Unique identifier (1-20)
- `core_information`: Publication details, authors, DOI, affiliations
- `study_details`: Type, sample size, methodology, duration, demographics
- `study_content`: Summary, key findings, results, statistical significance, keywords

### Transformed Data (`studies_transformed.json`)
CMS-optimized structure with:
- **Core fields**: title, slug, category, publication, year, authors, DOI
- **Key metrics**: participantCount, effectSize, significanceLevel, interventionDuration
- **Study details**: studyType, sampleSize, methodology, targetPopulation, duration
- **Results**: summary, keyFindings[], results, statisticalSignificance
- **UI fields**: highlights (oneLineSummary, mainOutcome), isFeatured, displayOrder

## Scripts

### 1. Transform Studies Data
Converts raw JSON to CMS-ready format:

```bash
npm run transform:studies
```

This generates `studies_transformed.json` with:
- Automatic category detection
- Extracted key metrics
- Generated slugs
- One-line summaries for cards

### 2. Seed CMS Database
Populates Payload CMS with studies (requires Payload server running):

```bash
npm run seed:studies
```

## Payload CMS Collection

### Studies Collection Fields

#### Core Information
- `title` (text, required): Study title
- `slug` (text, required, unique): URL-friendly identifier
- `category` (select, required): self-esteem | rocd | anger | perfectionism | brain-stimulation | multi-domain
- `publication` (text, required): Journal name
- `publicationYear` (number, required): 2000-2030
- `authors[]` (array, required): List of author names
- `doi` (text, required): DOI URL
- `affiliations` (textarea, required): Research institutions

#### Key Metrics (Group)
- `participantCount` (number): Total participants
- `effectSize` (text): e.g., "d=0.85" or "ηp²=0.13"
- `significanceLevel` (text): e.g., "p<.001"
- `interventionDuration` (text): e.g., "14 days"

#### Study Details
- `studyType` (text, required): e.g., "Randomized Controlled Trial"
- `sampleSize` (textarea, required): Detailed sample information
- `methodology` (richText, required): Study methodology
- `targetPopulation` (textarea, required): Target population description
- `duration` (text, required): Study duration with follow-ups

#### Results & Findings
- `summary` (richText, required): Executive summary
- `keyFindings[]` (array, required): List of key findings
- `results` (richText, required): Detailed results
- `statisticalSignificance` (textarea, required): Statistical details

#### Keywords & Search
- `keywords[]` (array): Research keywords

#### Publishing & Display
- `isFeatured` (checkbox): Feature prominently
- `isPublished` (checkbox, default: true): Visibility
- `displayOrder` (number): Display order
- `thumbnail` (upload): Study thumbnail/infographic

#### UI Highlights (Group)
- `oneLineSummary` (text, max 150): Short summary for cards
- `mainOutcome` (text): Primary outcome in simple terms

## Category Detection Logic

Categories are automatically detected from study title, summary, and keywords:

1. **ROCD**: Contains "rocd", "relationship ocd", or "relationship obsessive"
2. **Perfectionism**: Contains "perfectionism" or "perfectionist"
3. **Anger**: Contains "anger" or "aggression"
4. **Brain Stimulation**: Contains "theta", "brain", "oscillatory", or "stimulation"
5. **Self-Esteem**: Contains "self-esteem", "self esteem", or "ggse"
6. **Multi-Domain**: Default for studies not matching above

## Featured Studies

Studies automatically marked as featured (IDs: 1, 10, 18, 20):
- Study #1: Body Image/Self-Esteem (Cerea et al., 2022)
- Study #10: ROCD (Doron et al., 2020) - First RCT
- Study #18: Perfectionism (Abramovitch et al., 2023) - Large effect size
- Study #20: Couples ROCD (Gorelik et al., 2023) - Novel resilience paradigm

## Key Metrics Extraction

### Participant Count
Extracted from `sample_size` using regex: `(\d+)\s+(participants|individuals|students|couples|adults)`

### Effect Size
Extracted from `statistical_significance` using regex: `(d=[-\d.]+|ηp²=[\d.]+|η²=[\d.]+)`
Examples:
- Cohen's d: "d=0.85", "d=-1.19"
- Partial eta-squared: "ηp²=0.13"

### Significance Level
Extracted from `statistical_significance` using regex: `p[<>=]\.?\d+`
Examples: "p<.001", "p=.023"

### Intervention Duration
Extracted from `duration` using regex: `(\d+\s*days?|\d+\s*weeks?)`
Examples: "14 days", "15 days", "3 weeks"

## Usage Examples

### Access CMS Admin
```bash
npm run payload
```
Visit: `http://localhost:3001/admin/collections/studies`

### Query Studies via API
```javascript
// Get all published studies
fetch('/api/studies?where[isPublished][equals]=true')

// Get featured studies
fetch('/api/studies?where[isFeatured][equals]=true')

// Get studies by category
fetch('/api/studies?where[category][equals]=rocd')

// Get studies sorted by year
fetch('/api/studies?sort=-publicationYear')
```

### Display on Frontend
```tsx
import { useState, useEffect } from 'react';

function StudiesPage() {
  const [studies, setStudies] = useState([]);

  useEffect(() => {
    fetch('/api/studies?where[isPublished][equals]=true&sort=displayOrder')
      .then(res => res.json())
      .then(data => setStudies(data.docs));
  }, []);

  return (
    <div>
      {studies.map(study => (
        <StudyCard key={study.id} study={study} />
      ))}
    </div>
  );
}

function StudyCard({ study }) {
  return (
    <div className="study-card">
      <h3>{study.title}</h3>
      <p>{study.highlights.oneLineSummary}</p>
      <div className="metrics">
        <span>{study.keyMetrics.participantCount} participants</span>
        <span>{study.keyMetrics.effectSize}</span>
        <span>{study.keyMetrics.significanceLevel}</span>
      </div>
      <span className="category">{study.category}</span>
      <a href={study.doi} target="_blank">Read Paper</a>
    </div>
  );
}
```

## Study Statistics

### By Publication Year
- 2015: 1 study
- 2018: 2 studies
- 2020: 4 studies
- 2021: 3 studies
- 2022: 4 studies
- 2023: 5 studies
- 2025: 1 study

### By Category
- Self-Esteem: 1 study
- ROCD: 3 studies
- Anger: 1 study
- Perfectionism: 7 studies
- Multi-Domain: 8 studies

### Notable Findings
- **Largest Effect Size**: Study #18 (Perfectionism) - d=-1.19
- **Largest Sample**: Study #11 (Obsessive Beliefs) - 230 participants
- **Longest Follow-up**: Study #19 (Self-Esteem + Brain Stimulation) - 6 months
- **First Couples Study**: Study #20 (Couples ROCD) - Novel dyadic intervention

## Troubleshooting

### Transform Script Errors
- Ensure `studies_data.json` is in the root directory
- Check data structure matches expected format
- Run with debugging: `node --inspect src/cms/import-studies-api.ts`

### CMS Connection Issues
- Verify MongoDB is running
- Check `MONGODB_URI` in environment variables
- Ensure Payload server is started: `npm run payload`

### Missing Data
- Some studies may have incomplete fields (handled gracefully with `|| ''`)
- Category defaults to "multi-domain" if detection fails
- Key metrics extraction is best-effort (may be empty if not found)

## Next Steps

1. **Frontend Display**: Create study listing and detail pages
2. **Search & Filter**: Implement category and keyword filtering
3. **Featured Section**: Showcase featured studies on homepage
4. **Study Details**: Create individual study detail pages with full information
5. **Related Studies**: Link related studies based on category or keywords
6. **Export**: Add PDF export functionality for study summaries
7. **Analytics**: Track which studies are most viewed

## Support

For questions or issues:
- Check Payload CMS documentation: https://payloadcms.com/docs
- Review transformation script: `src/cms/import-studies-api.ts`
- Examine collection definition: `src/cms/collections/Studies.ts`
