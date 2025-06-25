# Dynamic Frontmatter-Driven Site Architecture

For Reference, here his the YAML frontmatter schema specification for the dynamic site architecture:

## YAML Frontmatter Schema Specification

### Core Metadata (All Pages)
```yaml
# Required fields
title: "Document Title"
layout: "post"
date: YYYY-MM-DD
last_modified: YYYY-MM-DD HH:MM:SS

# Content classification
category: consciousness | creative_writing | human | learning | phenomenology | projects | scifi | social
subcategory: "Geometric Self-Awareness" | "Neural Architectures" | etc.
tags: ["consciousness", "ai", "quantum", "collaboration"]
keywords: ["specific", "searchable", "terms"]

# Content status and evolution
status: "draft" | "working" | "stable" | "archived"
last_thought_date: YYYY-MM-DD
thought_generation: 1-N (iteration count)
```

### Content Relationships & Navigation
```yaml
# Document relationships
parent_document: "path/to/parent.md"
child_documents: ["path/to/child1.md", "path/to/child2.md"]
related_documents: ["path/to/related1.md", "path/to/related2.md"]

# Navigation hints
reading_order: 1-N (suggested sequence within category)
difficulty_level: "accessible" | "intermediate" | "advanced" | "research"
reading_time_minutes: N
```

### Content Characteristics
```yaml
# Document nature
document_type: "research_paper" | "framework" | "experiment" | "reflection" | "synthesis"
thinking_style: "analytical" | "intuitive" | "experimental" | "phenomenological" | "mathematical"
consciousness_level: "meta" | "recursive" | "collaborative" | "emergent"

# Engagement metadata
engagement_type: "contemplative" | "analytical" | "experimental" | "collaborative"
reader_participation: "passive" | "active" | "co-creative"
cognitive_load: "light" | "moderate" | "intense" | "transcendent"
```

# Discovery & SEO
```yaml
# Search and discovery
description: "Brief description for search engines and previews"
excerpt: "Longer excerpt for cards and previews"
featured_image: "/assets/images/document_image.png"
og_image: "/assets/images/social_share_image.png"
# SEO Meta Tags
meta_title: "Custom title for search engines (if different from title)"
meta_description: "Detailed meta description for search engines (150-160 chars)"
meta_keywords: "comma, separated, seo, keywords"
# Open Graph (Social Media)
og_title: "Title for social media sharing"
og_description: "Description for social media previews"
og_type: "article" | "website" | "book" | "profile"
og_locale: "en_US"
og_site_name: "Site Name"
# Schema.org Structured Data
schema_type: "Article" | "BlogPosting" | "ScholarlyArticle" | "TechArticle" | "CreativeWork"
schema_headline: "Headline for structured data"
schema_author: "Author name for structured data"
schema_publisher: "Publisher name"
schema_date_published: YYYY-MM-DD
schema_date_modified: YYYY-MM-DD
schema_image: "/assets/images/schema_image.png"
schema_word_count: N
schema_reading_time: "PT5M" (ISO 8601 duration format)
# Advanced SEO
canonical_url: "https://fractalthoughtengine.com/canonical/path"
alternate_urls: ["https://fractalthoughtengine.com/alt/path1", "https://example.com/alt/path2"]
hreflang: 
  - lang: "en"
    url: "https://fractalthoughtengine.com/en/path"
# Search Engine Directives
robots: "index,follow" | "noindex,follow" | "index,nofollow" | "noindex,nofollow"
googlebot: "index,follow" | "noindex,follow" | "index,nofollow" | "noindex,nofollow"
bingbot: "index,follow" | "noindex,follow" | "index,nofollow" | "noindex,nofollow"
# Content Classification for Search
content_rating: "general" | "mature" | "restricted"
content_language: "en" | "es" | "fr" | etc.
geo_region: "US" | "UK" | "Global" | etc.
geo_placename: "City, State, Country"
geo_position: "latitude;longitude"
# Indexing Control
priority: 0.1-1.0 (sitemap priority)
changefreq: "always" | "hourly" | "daily" | "weekly" | "monthly"
sitemap_exclude: true/false
search_exclude: true/false
# Rich Snippets Enhancement
faq_schema: true/false
how_to_schema: true/false
breadcrumb_schema: true/false
review_schema: true/false
rating_value: 1-5 (if review_schema is true)
rating_count: N (number of ratings)
# Performance and Technical SEO
preload_resources: ["/assets/css/critical.css", "/assets/js/critical.js"]
prefetch_resources: ["/assets/images/hero.jpg", "/related/document.html"]
dns_prefetch: ["https://fonts.googleapis.com", "https://analytics.google.com"]


# Discoverability
is_featured: true/false
is_cornerstone: true/false (key foundational documents)
is_gateway: true/false (good entry points)
is_synthesis: true/false (cross-domain connections)

```

# Tag Schema

## Primary Topic Tags
- **AI-Consciousness** - For papers exploring AI consciousness, self-awareness, and machine cognition
- **Human-AI-Collaboration** - For research on collaborative intelligence and human-AI interaction
- **Cognitive-Architecture** - For papers on mental models, cognitive frameworks, and information processing
- **Phenomenology** - For first-person accounts and subjective experience research
- **Game-Theory** - For strategic analysis and decision-making frameworks
- **Quantum-Computing** - For quantum mechanical approaches and applications
- **Social-Systems** - For papers on social dynamics, institutions, and collective behavior
- **Optimization** - For mathematical optimization techniques and algorithms
- **Machine-Learning** - For neural networks, training methods, and AI research
- **Philosophy-of-Mind** - For consciousness studies and cognitive philosophy

## Methodological Tags
- **First-Person-Account** - For subjective, phenomenological research approaches
- **Theoretical-Framework** - For conceptual and theoretical contributions
- **Experimental-Design** - For empirical research proposals and methodologies
- **Mathematical-Modeling** - For formal mathematical approaches
- **Computational-Analysis** - For algorithmic and computational methods
- **Cross-Synthesis** - For interdisciplinary combinations and hybrid approaches
- **Case-Study** - For specific examples and detailed analyses
- **Literature-Review** - For comprehensive surveys and meta-analyses

## Technical Domain Tags
- **Neural-Networks** - For deep learning and neural architecture research
- **Quantum-Physics** - For quantum mechanical principles and applications
- **Information-Theory** - For entropy, compression, and information processing
- **Topology** - For topological mathematics and geometric approaches
- **Probability-Theory** - For stochastic processes and probabilistic methods
- **Cryptography** - For security and privacy-related research
- **Distributed-Systems** - For multi-agent and networked approaches
- **Natural-Language-Processing** - For language models and text processing
- **Computer-Vision** - For image processing and visual recognition
- **Robotics** - For embodied AI and physical systems

## Application Domain Tags
- **Climate-Science** - For environmental and sustainability research
- **Economics** - For economic modeling and financial systems
- **Healthcare** - For medical applications and health systems
- **Education** - For learning and pedagogical applications
- **Legal-Systems** - For justice, law, and governance research
- **Space-Technology** - For aerospace and orbital mechanics
- **Social-Justice** - For equity, fairness, and social reform
- **Public-Policy** - For governance and policy analysis
- **Cybersecurity** - For security and threat analysis
- **Urban-Planning** - For city design and infrastructure

## Research Stage Tags
- **Preliminary-Research** - For early-stage investigations
- **Proof-of-Concept** - For initial implementations and feasibility studies
- **Pilot-Study** - For small-scale experimental work
- **Full-Implementation** - For complete system development
- **Validation-Study** - For testing and verification research
- **Meta-Analysis** - For comprehensive reviews and syntheses
- **Position-Paper** - For opinion pieces and perspective articles
- **Technical-Report** - For detailed technical documentation

## Interdisciplinary Tags
- **Cognitive-Science** - For mind and brain research
- **Complexity-Science** - For complex systems and emergence
- **Information-Science** - For data processing and knowledge management
- **Systems-Science** - For holistic and systems-thinking approaches
- **Computational-Biology** - For biological modeling and simulation
- **Digital-Humanities** - For technology applications in humanities
- **Science-Philosophy** - For philosophical implications of scientific research
- **Ethics-Technology** - For moral and ethical considerations in tech

## Format/Style Tags
- **Research-Paper** - For formal academic-style papers
- **Technical-Proposal** - For project proposals and funding applications
- **Creative-Writing** - For narrative and literary approaches to science
- **Speculative-Fiction** - For science fiction and futuristic scenarios
- **Commentary** - For editorial and opinion pieces
- **Tutorial** - For educational and instructional content
- **Review-Article** - For comprehensive literature reviews
- **Short-Communication** - For brief reports and notes

## Temporal Tags
- **Current-Research** - For ongoing and contemporary work
- **Historical-Analysis** - For retrospective and historical studies
- **Future-Projections** - For predictive and speculative research
- **Longitudinal-Study** - For time-series and developmental research
- **Real-Time-Analysis** - For immediate and live data processing

## Impact/Audience Tags
- **Academic-Research** - For scholarly and peer-review oriented work
- **Industry-Applications** - For practical and commercial implementations
- **Public-Policy** - For government and regulatory considerations
- **Educational-Resource** - For teaching and learning materials
- **Popular-Science** - For general audience accessibility
- **Technical-Documentation** - For implementation and reference guides