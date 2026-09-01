/* Every string on the site, lifted from bizchemists.vercel.app.
   First-person copy on the source site ("I combine data...") is normalised to "we"
   for one consistent agency voice. */

export const CONTACT = {
  email: 'bizchemistsfounder@gmail.com',
  phone: '+880 1869 303518',
  phoneHref: 'tel:+8801869303518',
}
export const MAILTO = `mailto:${CONTACT.email}`
// the two contact CTAs must not be the same action wearing two labels
export const MAILTO_CALL =
  `mailto:${CONTACT.email}` +
  '?subject=Discovery%20call%20request' +
  '&body=Hi%20BizChemists%2C%20I%27d%20like%20to%20book%20a%20free%20discovery%20call.%0A%0ABrand%3A%0AGoal%3A%0APreferred%20time%3A'

export const NAV = [
  { label: 'Story', href: '#story' },
  { label: 'Services', href: '#expertise' },
  { label: 'Process', href: '#process' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Contact', href: '#contact' },
]

export const STATS = [
  { value: '50', label: 'Projects\nDelivered' },
  { value: '20', label: 'Global\nClients' },
  { value: '7', label: 'Service\nLines' },
]

export const CAPABILITIES = [
  'Gen Z Focused',
  'Branding Agency',
  'Creative Marketing',
  'Youth-Led',
  'Versatile Team',
  'Results-Driven',
  'Born In Bangladesh',
  'Global Reach',
]

export const STORY = {
  statement: ['We Transform', 'Businesses Into', 'Unforgettable Brands'],
  body: [
    'We are The BizChemists — a creative marketing and branding agency born in Bangladesh, working with clients worldwide. We are a marketing agency led by youths, and that is deliberate: we grew up inside the platforms we now build brands for.',
    "Being a Gen Z focused marketing agency means we know which trend is worth your budget and which one is dead by Thursday. Launching a label, filling a venue, scaling a product — we're your branding lab.",
  ],
  vision: {
    title: 'Vision',
    body: 'To become the creative and branding partner that ambitious businesses call first — in Bangladesh and beyond. Every brand should be able to reach work of this standard, whether it is a five-person label or a national rollout.',
  },
  mission: {
    title: 'Mission',
    body: 'To turn businesses into brands people remember, using strategy, design and content that each carry their weight. We commit to measurable growth, honest reporting, and work our clients are glad to put their name on.',
  },
}

export const COMMITMENTS = [
  {
    title: 'Strategic First',
    body: 'We work out the strategy before we design a thing. Data, market and audience — then the creative that answers them.',
  },
  {
    title: 'Young By Design',
    body: 'A marketing agency led by youths reads a feed as a native, not a visitor. That is why our work lands with the people who decide what is worth watching.',
  },
  {
    title: 'Versatile By Default',
    body: 'Seven service lines under one roof. Brief us once, instead of briefing a branding agency, a video crew and a media buyer who have never met.',
  },
  {
    title: 'Measurable Results',
    body: 'Beautiful design is the start, not the deliverable. We report on what it moved.',
  },
]

export const SERVICES = [
  {
    title: 'Brand Strategy & Identity Design',
    short: 'Branding',
    body: 'A name, a look and a voice your market recognises on sight.',
    summary: 'We work out what your brand stands for, who it is for and how it should look and sound — then build the system that keeps it consistent everywhere it appears.',
    includes: [
      'Positioning and competitor mapping',
      'Logo, colour, type and art direction',
      'Voice and messaging guidelines',
      'A brand book your team can actually use',
    ],
    outcome: 'One identity your market recognises before it reads the name.',
  },
  {
    title: 'Visual Content Creation',
    short: 'Content',
    body: 'Photography, video and motion built for the platforms you actually post on.',
    summary: 'Shoots planned around where the work will run, so you finish with a library sized and cut for every placement rather than one hero image and a problem.',
    includes: [
      'Product, food and lifestyle photography',
      'Short-form video and reels',
      'Motion graphics and animated cutdowns',
      'Platform-ready exports and captions',
    ],
    outcome: 'A content library that lasts a quarter, not a week.',
  },
  {
    title: 'Website Design & Development',
    short: 'Web',
    body: 'Fast, responsive sites built to turn visitors into enquiries.',
    summary: 'Design and build in one place — structured around what you need visitors to do, and measured on whether they do it.',
    includes: [
      'Information architecture and wireframes',
      'Design system and responsive build',
      'Performance, accessibility and SEO basics',
      'Analytics and enquiry tracking',
    ],
    outcome: 'A site that loads fast and asks for the enquiry.',
  },
  {
    title: 'Influencer Marketing',
    short: 'Influence',
    body: 'Creator partnerships matched to your audience, not to follower counts.',
    summary: 'We shortlist creators on audience overlap and engagement quality, handle the brief and the deal, and report on what the partnership actually returned.',
    includes: [
      'Creator shortlisting and vetting',
      'Briefing, negotiation and contracting',
      'Content review and approvals',
      'Performance reporting per creator',
    ],
    outcome: 'Partnerships judged on results, not on reach.',
  },
  {
    title: 'Sales Driven Marketing Strategy',
    short: 'Growth',
    body: 'Campaigns measured on revenue, not impressions.',
    summary: 'A plan tied to a number you care about, with the tracking in place before launch so you can see which spend produced which sale.',
    includes: [
      'Funnel and offer design',
      'Paid media planning and buying',
      'Landing pages and conversion testing',
      'Revenue attribution and reporting',
    ],
    outcome: 'Spend you can trace to a sale.',
  },
  {
    title: 'Social Media & Content Marketing',
    short: 'Social',
    body: 'A posting rhythm that builds an audience instead of chasing one.',
    summary: 'A calendar you can sustain, built from formats that suit your team, with community management so the audience has a reason to stay.',
    includes: [
      'Channel strategy and content pillars',
      'Monthly content calendar',
      'Design, copy and scheduling',
      'Community management and reporting',
    ],
    outcome: 'An audience that grows without a new idea every day.',
  },
  {
    title: 'Recruitment Support',
    short: 'Hiring',
    body: 'Hiring support to bring the right people in as you scale.',
    summary: 'Employer branding and hiring collateral that make the role attractive to the people you actually want, plus support through the funnel.',
    includes: [
      'Employer brand and careers messaging',
      'Role briefs and job adverts',
      'Candidate sourcing support',
      'Interview and onboarding collateral',
    ],
    outcome: 'Roles filled by people who wanted this job.',
  },
]

/* Ordered — the numbering is the information here. */
export const PROCESS = [
  {
    step: '01',
    title: 'Discover',
    body: 'We dive deep into your brand, market, and audience to understand your unique challenges and opportunities.',
  },
  {
    step: '02',
    title: 'Strategize',
    body: 'We formulate a data-driven strategy tailored to your goals, combining creativity with market insights.',
  },
  {
    step: '03',
    title: 'Create',
    body: 'Our team brings the strategy to life with stunning designs, compelling content, and powerful campaigns.',
  },
  {
    step: '04',
    title: 'Elevate',
    body: 'We launch, measure, optimise, and scale your brand to new heights with continuous improvement.',
  },
]

export const WORK = [
  {
    client: 'KOSTCON 2025',
    result: 'Global K-Drama OST Concert',
    image: '/work/kostcon.jpg',
    w: 2048,
    h: 1944,
    alt: 'KOSTCON 2025 concert poster: six Korean OST artists in colour-blocked panels under the line "Feel the music, live the drama, share the love".',
    overview: { label: 'Overview', body: 'A landmark international K-Drama OST concert bringing Korean culture to Bangladesh. We orchestrated a comprehensive marketing campaign that attracted thousands of K-Drama fans.' },
    approach: {
      label: 'Our Approach',
      items: [
        ['Influencer Collaborations', 'Partnered with top K-Pop influencers to create buzz and authentic engagement.'],
        ['Content Planning', 'Developed a multi-platform content strategy across social media.'],
        ['Cinematic Reels', 'Produced high-quality promotional videos showcasing the artist lineup.'],
        ['Artist Lineup Highlights', 'Created stunning reveal campaigns for each performing artist.'],
      ],
    },
    metrics: [['2.5M+', 'Total Reach'], ['150K+', 'Engagement'], ['3000+', 'Tickets Sold']],
  },
  {
    client: 'Pizza Gallery',
    result: 'Strategic Branding & Social Growth',
    image: '/work/pizza-gallery.jpg',
    w: 976,
    h: 1006,
    alt: 'Pizza Gallery brand campaign artwork.',
    overview: { label: 'The Challenge', body: 'Pizza Gallery in Chittagong needed a complete brand refresh and social media presence to compete with established chains and drive foot traffic.' },
    approach: {
      label: 'Our Solution',
      items: [
        ['Strategic Branding', 'Developed a fresh, appetising visual identity.'],
        ['Social Media Overhaul', 'Created a consistent, mouth-watering content strategy.'],
        ['Influencer Marketing', 'Collaborated with local food influencers for authentic reviews.'],
        ['Before/After Visuals', 'Showcased the transformation with compelling photography.'],
      ],
    },
    metrics: [['250%', 'Sales Increase'], ['500K+', 'Social Reach'], ['45%', 'Engagement Rate']],
  },
  {
    client: 'Dhaka Dreams Concert',
    result: '3X Ticket Sales Boost',
    image: '/work/dhaka-dreams.jpg',
    w: 1440,
    h: 1440,
    alt: 'Dhaka Dreams Concert campaign artwork.',
    overview: { label: 'The Challenge', body: 'Low initial ticket sales with just weeks before the concert. Needed urgent intervention to avoid event cancellation.' },
    approach: {
      label: 'Our Strategy',
      items: [
        ['Scarcity-Focused Campaigns', 'Created FOMO with limited-time offers and countdown timers.'],
        ['Targeted Ad Campaigns', 'Precision Facebook and Instagram ads to music lovers.'],
        ['Flash Sales', 'Strategic promotional pricing to drive immediate action.'],
        ['Social Proof', 'Amplified positive sentiment and early buyer testimonials.'],
      ],
    },
    metrics: [['3X', 'Ticket Sales Growth'], ['85%', 'Capacity Reached'], ['2 Weeks', 'Turnaround Time']],
  },
  {
    client: 'Accolade.clo',
    result: 'Fashion Campaign & Design',
    image: '/work/accolade.jpg',
    w: 1938,
    h: 1938,
    alt: 'Accolade.clo fashion campaign artwork.',
    overview: { label: 'Project Overview', body: 'Complete creative direction for an emerging apparel brand, establishing their visual identity and market position.' },
    approach: {
      label: 'Deliverables',
      items: [
        ['Apparel Design', 'Created unique, trend-forward clothing designs.'],
        ['Creative Direction', 'Established a cohesive brand aesthetic across all touchpoints.'],
        ['Fashion Campaign Visuals', 'Produced editorial-quality lookbook and campaign photography.'],
        ['Brand Guidelines', 'Comprehensive style guide for future consistency.'],
      ],
    },
    impact: 'Successfully launched the brand with a strong, recognisable identity that resonated with the target demographic and established market credibility.',
  },
  {
    client: 'Table 43 Malaysia',
    result: 'Remote Content Production',
    image: '/work/table-43.jpg',
    w: 1075,
    h: 1344,
    alt: 'Table 43 Malaysia content production still.',
    overview: { label: 'The Challenge', body: 'Managing social media for a Malaysian restaurant remotely from Bangladesh while maintaining authenticity and engagement.' },
    approach: {
      label: 'Our Approach',
      items: [
        ['Remote Content Production', 'Coordinated with the local team for authentic content.'],
        ['Social Media Strategy', 'Developed a culturally relevant content calendar.'],
        ['Professional Dashboard', 'Implemented analytics tracking for measurable growth.'],
        ['Community Management', 'Engaged with the audience to build a loyal following.'],
      ],
    },
    metrics: [['180%', 'Follower Growth'], ['320K+', 'Monthly Reach'], ['52%', 'Engagement Increase']],
  },
  {
    client: 'Disguise Official',
    result: 'Fashion & Apparel Branding',
    image: '/work/disguise.jpg',
    w: 1080,
    h: 1080,
    alt: 'Disguise Official apparel branding artwork.',
    overview: { label: 'Project Overview', body: 'Complete brand strategy and creative direction for an emerging fashion and apparel brand, establishing their market presence and visual identity.' },
    approach: {
      label: 'Deliverables',
      items: [
        ['Brand Strategy', 'Developed comprehensive brand positioning and market differentiation.'],
        ['Visual Identity', 'Created a cohesive brand aesthetic across all touchpoints.'],
        ['Fashion Campaign', 'Produced high-quality promotional content and lookbooks.'],
        ['Social Media Strategy', 'Established a strong digital presence and engagement.'],
        ['Content Creation', 'Designed compelling visuals that resonate with the target audience.'],
      ],
    },
    /* From the client deck: the Meta Ads line is the sharpest number we have on this
       project, and it reads better than any adjective in the impact paragraph. */
    metrics: [['$25', 'Ad Spend'], ['120K+', 'Views'], ['50+', 'Sales']],
    impact: 'Successfully launched the brand with a distinctive identity that captured attention in the competitive fashion market, building a loyal customer base and strong brand recognition.',
  },
]

export const VALUES = [
  {
    title: 'Connection',
    body: 'We build authentic relationships with clients, understanding their vision and becoming true partners in their success.',
  },
  {
    title: 'Collaboration',
    body: 'Great work happens when minds meet. We collaborate internally and with clients to achieve extraordinary results.',
  },
  {
    title: 'Community',
    body: 'We believe in giving back and building brands that make a positive impact in their communities and beyond.',
  },
]

export const FOOTER_LINKS = [
  {
    heading: 'Quick Links',
    items: [...NAV.map((n) => ({ label: n.label, href: n.href })), { label: 'Questions', href: '#faq' }],
  },
  {
    heading: 'Services',
    items: [
      { label: 'Brand Strategy', href: '#expertise' },
      { label: 'Content Creation', href: '#expertise' },
      { label: 'Web Development', href: '#expertise' },
      { label: 'Social Media', href: '#expertise' },
    ],
  },
]

/* Answer-first blocks, each self-contained and ~40-60 words, so an AI engine can
   lift one without the surrounding page. Mirrored as FAQPage JSON-LD in index.html —
   edit both together. */
export const FAQ = [
  {
    q: 'What does The BizChemists do?',
    a: 'The BizChemists is a creative marketing and branding agency based in Bangladesh, working with clients worldwide. We build brand identities, produce content, design and build websites, and run growth campaigns — seven service lines in total, for concerts, restaurants, fashion labels and consumer brands.',
  },
  {
    q: 'Is The BizChemists a Gen Z focused marketing agency?',
    a: 'Yes, in both directions. We are a Gen Z focused marketing agency by audience, building campaigns for the people who decide what is worth watching, and by team, because ours grew up inside those platforms. That is why our concert and restaurant work moves tickets and covers rather than impressions.',
  },
  {
    q: 'Who leads The BizChemists?',
    a: 'Founder Ibtehaz Kabir Zarif leads the agency. The BizChemists is a marketing agency led by youths by design rather than by accident: a young team reads a feed as a native, not a visitor, and knows which trend deserves a client budget and which one is dead by Thursday.',
  },
  {
    q: 'What makes The BizChemists one of the best marketing agencies in Bangladesh?',
    a: 'We would rather be judged on the work than on the claim. Strategy, design, content and paid media run in one place, so nothing is lost in the handover between agencies, and every campaign is reported on revenue rather than reach. Fifty-plus projects, twenty-plus global clients.',
  },
  {
    q: 'What services does The BizChemists offer?',
    a: 'Seven: brand strategy and identity design, visual content creation, website design and development, influencer marketing, sales-driven marketing strategy, social media and content marketing, and recruitment support. A versatile marketing agency means you brief once — take one service, or hand over the whole brand.',
  },
  {
    q: 'Where is The BizChemists based, and do you work internationally?',
    a: 'We are based in Bangladesh and work with clients globally. Recent projects span Dhaka and Chittagong in Bangladesh and Kuala Lumpur in Malaysia — including social media management for Table 43, a Malaysian restaurant, run entirely from Bangladesh.',
  },
  {
    q: 'What results has The BizChemists delivered?',
    a: 'Dhaka Dreams Concert: 3x ticket sales growth, 85% capacity, two-week turnaround. Pizza Gallery: 250% sales increase, 500K social reach. KOSTCON 2025: 2.5M reach, 3,000+ tickets sold. Table 43 Malaysia: 180% follower growth. Accolade.clo and Disguise Official both launched into a crowded fashion market.',
  },
  {
    q: 'How much does The BizChemists charge?',
    a: 'We scope every project individually rather than publishing fixed packages, because a single-service brief and a full brand build are very different pieces of work. Book a call and we will give you a scope and a number.',
  },
  {
    q: 'How do you run a project?',
    a: 'Four stages, in order: Discover, where we study your brand, market and audience; Strategize, where we set a data-driven plan; Create, where designs, content and campaigns are produced; and Elevate, where we launch, measure and scale.',
  },
]

/* ------------------------------------------------------- case study pages */

/* The deeper narrative behind each project, taken from the client decks. WORK above
   feeds the carousel and the quick panel; these feed the dedicated pages at
   /work/<slug>. Keyed by client name so the two cannot drift apart.
   The Dhaka Dreams deck is image-only — there is no text in it to lift — so that
   page runs on the overview and metrics already recorded in WORK. */
export const STUDIES = {
  'KOSTCON 2025': {
    slug: 'kostcon-2025',
    industry: 'Live events · Dhaka, Bangladesh',
    role: 'Campaign lead — influencer, content and ticket sales',
    scope: 'Influencer partnerships, multi-platform content strategy, cinematic promotional video, artist reveal campaigns',
    sections: [
      {
        h: 'Bringing Korean culture to Dhaka',
        p: 'A landmark international K-Drama OST concert, and an audience nobody had sold one to before. The job was to reach K-Drama fans across the country and turn that fandom into tickets.',
      },
      {
        h: 'Built on the people the audience already trusts',
        p: 'We partnered with the K-Pop influencers this audience already follows, so the first thing most fans heard about the concert came from someone they trusted rather than from an advert.',
      },
      {
        h: 'A lineup revealed, not announced',
        p: 'Each performing artist got their own reveal moment, and cinematic promotional films carried the lineup across every platform on a planned schedule instead of one launch push.',
      },
    ],
  },

  'Pizza Gallery': {
    slug: 'pizza-gallery',
    industry: 'Restaurant · Chittagong, Bangladesh',
    role: 'Strategic branding and full-service marketing partner',
    scope: 'Brand identity, creative direction, content production, influencer marketing, full social media management',
    sections: [
      {
        h: 'A passionate start in Chittagong',
        p: 'Pizza Gallery opened in the heart of Chittagong with a simple dream — great pizza with a vibe of its own. The food delivered. The business did not. Sales were low, the social presence was not connecting with anyone, the visuals had no appeal, and there was no clear identity holding any of it together.',
      },
      {
        h: 'Building a stronger brand foundation',
        p: 'We joined as their official business development and marketing partner, and started with a brand guideline: a visual identity built on bold white, orange and red, and a tone of voice consistent enough to survive everything they published.',
      },
      {
        h: 'Content that connects',
        p: 'With the strategy settled we produced posters, high-quality video and social campaigns. Our creative team visited regularly to shoot photo and video, capturing the food and the room as they actually are — story-driven reels, interactive formats, and captions written for a Chittagong audience rather than a generic one.',
      },
      {
        h: 'Influence, visibility and real results',
        p: 'We brought in Chittagong food influencers to put the restaurant in front of local food lovers and trendsetters, managed the accounts daily, and kept optimising against engagement. Online visibility rose, brand awareness rose, and — the number that actually matters — so did sales.',
      },
    ],
  },

  'Accolade.clo': {
    slug: 'accolade',
    industry: 'Fashion & apparel · Bangladesh',
    role: 'Creative direction and brand build',
    scope: 'Apparel design, visual branding and graphics, product shoots, promotional video editing, campaign creative direction',
    sections: [
      {
        h: 'The challenge',
        p: 'A new clothing brand out of Bangladesh needed a visual identity strong enough to stand out in a crowded market, and specific enough to mean something to young, fashion-conscious buyers.',
      },
      {
        h: 'Our role',
        p: 'From day one we delivered apparel designs that carry their identity, full-scale shoots and edits that bring the brand to life, and campaigns built to drive recognition and sales.',
      },
      {
        h: 'Why it matters',
        p: 'This one shows what happens when the design and the media production sit with the same team: a startup turns into a label people recognise.',
      },
    ],
  },

  'Table 43 Malaysia': {
    slug: 'table-43',
    industry: 'Restaurant · Kuala Lumpur, Malaysia',
    role: 'Strategic branding and marketing partner',
    scope: 'Brand identity, creative direction, content production, full social media management',
    sections: [
      {
        h: 'The goal',
        p: 'A restaurant brand based abroad needed to grow its online presence and engagement. The catch: every part of it had to run remotely from Bangladesh, while the content still had to look native to a Malaysian audience.',
      },
      {
        h: 'The strategy',
        p: 'Five moves, in order. Shift the focus to Instagram, where Malaysian audiences actually are. Direct the on-ground team remotely with shot-by-shot briefs, so footage came back with the vibe we had planned. Cut that raw footage into polished reels and promos. Design posters and graphics that gave the promotions a professional edge. Then run the calendar — scheduling, posting and optimisation — so the account stayed consistent rather than sporadic.',
      },
      {
        h: 'What changed',
        p: 'A consistent brand presence on Instagram, content that reads as professionally produced despite never having a producer in the room, and engagement from the local audience the restaurant actually needed to reach.',
      },
    ],
  },

  'Disguise Official': {
    slug: 'disguise',
    industry: 'Streetwear · Bangladesh',
    role: 'Brand development and creative direction',
    scope: 'Apparel design, visual branding and graphics, product photoshoots, promotional video editing, campaign creative direction',
    sections: [
      {
        h: 'Brand development',
        p: 'We ran brand-building for an emerging streetwear label — a cohesive digital identity, and campaigns taken from concept to delivery so the voice, the look and the positioning stayed consistent everywhere they appeared. The aim was a foundation for long-term recognition, not a launch spike.',
      },
      {
        h: 'Creative direction',
        p: 'We directed photoshoots and video production from idea to final output, supervised the editing workflow against brand standards, and coordinated schedules, locations and resources so campaign assets landed on time.',
      },
      {
        h: 'Content and ads strategy',
        p: 'Content calendars planned against the audience and the commercial goal, and Meta Ads campaigns read closely enough to keep improving engagement, reach and conversions — with the strategy tuned to seasonal trends rather than set once.',
      },
    ],
  },

  'Dhaka Dreams Concert': {
    slug: 'dhaka-dreams',
    industry: 'Live events · Dhaka, Bangladesh',
    role: 'Emergency ticket sales campaign',
    scope: 'Scarcity campaigns, paid social, flash sales, social proof',
    sections: [
      {
        h: 'Two weeks to save a concert',
        p: 'Ticket sales had stalled with weeks to go and cancellation was on the table. There was no time to build an audience — only to convert the one that already existed.',
      },
      {
        h: 'Scarcity, precisely targeted',
        p: 'Limited-time offers and countdowns gave the decision a deadline. Facebook and Instagram campaigns put it in front of music fans rather than everyone. Flash pricing forced the moment. Early buyers became the social proof that moved the next wave.',
      },
    ],
  },
}

export const studyOf = (client) => STUDIES[client]
export const slugOf = (client) => STUDIES[client]?.slug
