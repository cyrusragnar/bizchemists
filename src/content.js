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

/* The public profiles, listed so Google and the AI engines can confirm that the
   site, the pages and the company are one business. The Instagram address is the
   clean profile URL: the ?stkn= on a shared link is a session token, not the page. */
export const SOCIAL = [
  { label: 'Instagram', href: 'https://www.instagram.com/bizchemistsofficial' },
  { label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61578036346800' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/the-bizchemists/' },
]

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
      'Paid media planning and buying on Facebook, Instagram and Google',
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
        ['Influencer Collaborations', 'Partnered with 50+ K-Pop influencers to create buzz and authentic engagement.'],
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

/* BizThread AI, the team's sister business. Lifted from bizthreadai.com — keep these
   claims in step with that site, never ahead of it. */
export const BIZTHREAD = {
  url: 'https://bizthreadai.com',
  intro: 'Our sister business — a 24/7 AI sales agent for shops that sell in the DMs.',
  headline: 'Never lose a sale to a slow reply.',
  body: "Buyers message several shops at once, and the first reply usually wins the sale. BizThread answers every message on Messenger, Instagram and WhatsApp in seconds, in the buyer's own language, and takes the order right in the chat — even at 2 AM.",
  jobs: [
    { title: 'Replies in seconds', body: 'In Bangla, English or Banglish, day or night. It reads photos and voice notes too.' },
    { title: 'Takes the order', body: 'No forms, no links. It checks stock and confirms the order in the chat.' },
    { title: 'Flags fraud first', body: 'Suspicious orders are caught before the courier picks up.' },
    { title: 'Hands you the hard ones', body: 'Refunds, complaints and custom orders come to you. One click takes over any chat.' },
  ],
  offer: 'Free for 7 days. No card needed.',
  // Sample data, labelled as such on the page, the same way bizthreadai.com labels it.
  thread: {
    name: 'Nusrat A.',
    channel: 'Messenger',
    time: '2:14 AM',
    messages: [
      { from: 'buyer', text: 'দাম কত?', lang: 'bn' },
      { from: 'agent', text: 'Runner Low, off white. ৳4,290. Six left in size 42. Want me to hold one?' },
      { from: 'buyer', text: 'hae, 42 ta rakhen. cod hobe?' },
      { from: 'agent', text: 'Cash on delivery, yes. Inside Dhaka ৳60. Your order is in.' },
    ],
    order: 'Order 4127 · ৳4,290',
  },
}

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
    items: [
      ...NAV.map((n) => ({ label: n.label, href: n.href })),
      { label: 'All services', href: '/services/' },
      { label: 'All work', href: '/work/' },
      { label: 'Insights', href: '/insights/' },
      { label: 'Questions', href: '#faq' },
    ],
  },
  {
    heading: 'Services',
    items: [
      { label: 'Brand Strategy', href: '/services/brand-identity/' },
      { label: 'Video Production', href: '/services/video-production/' },
      { label: 'Web Development', href: '/services/web-design/' },
      { label: 'Social Media', href: '/services/social-media-marketing/' },
      { label: 'Digital Marketing', href: '/services/growth-marketing/' },
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
    q: 'Do you do video editing and video production?',
    a: 'Yes. Visual content creation is one of our seven service lines: product, food and lifestyle photography, short-form video and reels, motion graphics and animated cutdowns. We shoot, edit and export in platform-ready sizes, so one shoot leaves you with a content library rather than a single hero film.',
  },
  {
    q: 'Do you handle social media marketing and management?',
    a: 'Yes. Social media and content marketing is a service line of its own: content calendars, platform-native posts, community management and monthly reporting. We run Table 43 in Kuala Lumpur entirely from Bangladesh, where the account grew 180% in followers.',
  },
  {
    q: 'Is The BizChemists a digital marketing agency?',
    a: 'Yes, and a creative one. Alongside branding and content we run sales-driven marketing: funnel and offer design, Facebook and Instagram ads, Google Ads, landing pages, conversion testing and revenue attribution. Campaigns are reported on revenue rather than on impressions.',
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
        p: 'We partnered with the K-Pop influencers this audience already follows — more than fifty creators in all — so the first thing most fans heard about the concert came from someone they trusted rather than from an advert.',
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

/* ------------------------------------------------------- service pages */

/* A page per service line at /services/<slug>, keyed by the service title so the two
   cannot drift apart. The homepage sells seven lines in a sentence each; these pages
   are where someone searching for one of them in plain words lands. Proof names index
   into WORK, so a metric quoted here is the metric recorded there. */
export const SERVICE_PAGES = {
  "Brand Strategy & Identity Design": {
    slug: "brand-identity",
    h1: "Brand Strategy & Identity Design",
    metaTitle: "Branding Agency in Bangladesh | The BizChemists",
    metaDescription:
      "Brand strategy, logo and identity design from a Bangladesh agency. Positioning, art direction, voice and a brand book your team can actually use.",
    lede: "We work out what your brand stands for, who it is for, and how it should look and sound, then build the system that keeps it consistent everywhere it appears. You leave with positioning, an identity, a voice and a brand book your team can use without calling us.",
    sections: [
      {
        h: "Who this is for",
        p: "Labels launching into a crowded market, and businesses whose look has drifted: a logo from one designer, a feed from another, a website from a third, and no line connecting them. Both problems have the same answer, which is to decide what the brand is before deciding what it looks like. We are a Bangladesh agency and have built identities for a streetwear label here and a restaurant brand in Chittagong.",
      },
      {
        h: "How the work runs",
        p: "Four stages, in order. Discover: your market, your audience and the brands you are judged against. Strategize: positioning and the messaging that carries it. Create: logo, colour, type, art direction and voice. Elevate: the brand book, then the rollout across the places the brand actually appears.",
      },
      {
        h: "Why strategy comes first",
        p: "A branding agency that opens a design file before it can say who the brand is for is guessing. A logo cannot fix unclear positioning, it can only decorate it. Settling what you stand for and who you are speaking to comes first. It is also why these identities survive contact with a feed: the team that sets the rules is the team that produces the content and campaigns afterwards.",
      },
    ],
    proof: ["Disguise Official", "Pizza Gallery", "Accolade.clo"],
    faqs: [
      {
        q: "How much does branding cost in Bangladesh?",
        a: "We scope every project individually rather than publishing packages, because a logo refresh and a full brand build are very different pieces of work. Book a call, describe the business, and you will get a scope and a number. The call is free and needs no deck.",
      },
      {
        q: "Can you design just a logo?",
        a: "Yes, though we rarely recommend it on its own. A mark without positioning, colour, type and voice guidance tends to drift within months, because every new designer interprets it differently. If the budget only covers the logo, we will say so on the call.",
      },
      {
        q: "What do we receive at the end?",
        a: "Positioning and competitor mapping, the logo and its variants, colour and type systems, art direction, voice and messaging guidelines, and a brand book your team can apply without us.",
      },
    ],
    related: ["video-production", "social-media-marketing", "web-design"],
  },

  "Visual Content Creation": {
    slug: "video-production",
    h1: "Video Editing & Production",
    metaTitle: "Video Editing & Production Agency in Bangladesh | BizChemists",
    metaDescription:
      "Video production, editing, reels, motion graphics and photography for brands in Bangladesh and beyond, shot and cut for the platforms you post on.",
    lede: "Shoots planned around where the work will run, so you finish with a library sized and cut for every placement rather than one hero film and a problem. Product, food and lifestyle photography, short-form video and reels, motion graphics, and video editing finished in the sizes and lengths each platform wants.",
    sections: [
      {
        h: "Who this is for",
        p: "Brands that need a quarter of content rather than a single post: restaurants with a menu to sell, labels with a drop to launch, events with a date to fill. If your last shoot produced three usable frames and a folder nobody opens, this is the fix.",
      },
      {
        h: "Planned around the placement",
        p: "Where the work will run is decided before the camera comes out: which platform, which aspect ratio, which cut lengths, which captions. One shoot then yields the vertical cut, the square, the still and the motion version, instead of a landscape edit that has to be salvaged for every feed.",
      },
      {
        h: "Produced remotely when that makes sense",
        p: "Table 43, a restaurant in Kuala Lumpur, is produced entirely from Bangladesh, and grew 180% in followers with 320K+ monthly reach. Distance is a logistics problem rather than a creative one. We are a creative agency rather than an edit house, so the plan, the shoot and the edit sit with one team.",
      },
    ],
    proof: ["Table 43 Malaysia", "KOSTCON 2025", "Accolade.clo"],
    faqs: [
      {
        q: "Do you shoot outside Dhaka?",
        a: "Yes. Video production has run in Dhaka and Chittagong in Bangladesh and in Kuala Lumpur, Malaysia. Where travel does not make sense we produce remotely: the Table 43 content is made in Bangladesh for a restaurant in Malaysia.",
      },
      {
        q: "What does the video editing include?",
        a: "Cuts for each placement, captions and titles, colour and sound, motion graphics and animated cutdowns, and exports in the sizes each platform wants. Editing is planned alongside the shoot rather than bolted on afterwards, which is what lets one shoot produce a quarter of content.",
      },
      {
        q: "What do you deliver?",
        a: "Product, food and lifestyle photography, short-form video and reels, motion graphics and animated cutdowns, and platform-ready exports with captions. Formats and sizes are agreed before the shoot, so nothing needs re-cutting afterwards.",
      },
      {
        q: "How much content comes out of one shoot?",
        a: "Enough to last a quarter rather than a week: that is the planning target. The exact count depends on the brief, the number of products and the formats you need, and it is agreed before the shoot rather than discovered after it.",
      },
    ],
    related: ["social-media-marketing", "influencer-marketing", "brand-identity"],
  },

  "Website Design & Development": {
    slug: "web-design",
    h1: "Website Design & Development",
    metaTitle: "Website Design & Development | The BizChemists",
    metaDescription:
      "Fast, responsive websites designed and built to turn visitors into enquiries: structure, design system, performance, SEO basics and enquiry tracking.",
    lede: "Design and build in one place, structured around what you need visitors to do and measured on whether they do it. Information architecture, a design system, a responsive build, performance and accessibility, SEO basics, and analytics that show where enquiries come from.",
    sections: [
      {
        h: "Who this is for",
        p: "Businesses whose site is a brochure nobody reads, and businesses running an entire operation out of a DM inbox with no site at all. Also brands that look sharp offline and fall apart online. We build for clients in Dhaka and elsewhere in Bangladesh, and for Bangladeshi teams selling abroad.",
      },
      {
        h: "Built to ask for the enquiry",
        p: "Every page gets one job. A web design agency that hands over a site nobody enquires through has built a brochure. The route from arrival to enquiry is mapped first and the design follows it, which is usually the difference between a site that looks finished and a site that produces leads.",
      },
      {
        h: "Fast by default",
        p: "Performance is part of the build rather than a later fix. This site is our own work: it loads in about a second on desktop, ships without a CMS, and its markup can be read by search engines and AI crawlers without running any JavaScript.",
      },
    ],
    proof: [],
    faqs: [
      {
        q: "Is SEO included?",
        a: "The basics are: crawlable markup, clean structure, fast loading, descriptive titles and descriptions, a sitemap, and analytics with enquiry tracking. Ongoing content, keyword work and campaigns sit under growth marketing rather than inside the build.",
      },
      {
        q: "Do you redesign existing websites?",
        a: "Yes. We audit what the current site does, keep the parts that work, and rebuild the rest around the route to enquiry. A redesign that ignores the traffic and rankings a site already has usually costs more than it earns.",
      },
    ],
    related: ["brand-identity", "growth-marketing"],
  },

  "Influencer Marketing": {
    slug: "influencer-marketing",
    h1: "Influencer Marketing",
    metaTitle: "Influencer Marketing Agency in Bangladesh | BizChemists",
    metaDescription:
      "Creator partnerships matched to your audience rather than to follower counts: shortlisting, briefing, contracting, approvals and per-creator reporting.",
    lede: "We shortlist creators on audience overlap and engagement quality rather than follower counts, handle the brief and the deal, and report on what each partnership returned. You see which creator produced which result, not one combined reach figure.",
    sections: [
      {
        h: "Who this is for",
        p: "Events that have to fill a venue by a fixed date, and brands whose product sells better when somebody the audience already trusts is holding it.",
      },
      {
        h: "Chosen on overlap, not on reach",
        p: "A creator with 20,000 of the right followers beats one with 200,000 of the wrong ones. Audience overlap, engagement quality and previous brand work are checked before a name reaches your shortlist. An influencer marketing agency that shortlists on reach alone is selling you the easy number.",
      },
      {
        h: "Reported creator by creator",
        p: "Every partnership is measured on its own. That is what makes the next campaign cheaper: you keep the creators who delivered and drop the ones who did not.",
      },
    ],
    proof: ["KOSTCON 2025", "Dhaka Dreams Concert"],
    faqs: [
      {
        q: "How do you choose creators?",
        a: "On audience overlap with your buyers, on engagement quality rather than follower count, and on how their previous brand work performed. Shortlists are built per campaign, so a creator who suits a concert is not assumed to suit a restaurant.",
      },
      {
        q: "Do you handle the briefing and the deal?",
        a: "Yes: shortlisting and vetting, briefing, negotiation and contracting, then content review and approvals before anything goes live.",
      },
      {
        q: "How is the result measured?",
        a: "Against the number agreed up front, creator by creator: tickets sold, sales, or enquiries. KOSTCON 2025 is the clearest example, where the campaign reached 2.5M+ people and sold over 3,000 tickets.",
      },
    ],
    related: ["video-production", "growth-marketing", "social-media-marketing"],
  },

  "Sales Driven Marketing Strategy": {
    slug: "growth-marketing",
    h1: "Digital Marketing & Growth Strategy",
    metaTitle: "Digital Marketing Agency in Bangladesh | BizChemists",
    metaDescription:
      "Digital marketing measured on revenue rather than impressions: funnel and offer design, paid media, landing pages, conversion testing and attribution.",
    lede: "A plan tied to a number you care about, with the tracking in place before launch so you can see which spend produced which sale. Funnel and offer design, Facebook and Instagram ads, Google Ads, landing pages, conversion testing, and revenue attribution.",
    sections: [
      {
        h: "Who this is for",
        p: "Businesses already spending on ads without knowing what came back, and businesses about to start who would rather have the measurement working before the money goes out.",
      },
      {
        h: "Tracking before spend",
        p: "Most of what a digital marketing agency reports is decided before launch. Attribution added afterwards is guesswork. The tracking goes in first, so the report at the end answers the only question worth asking, which is what this produced.",
      },
      {
        h: "Budget changes the plan, not the discipline",
        p: "Disguise Official launched on $25 of ad spend and returned 120K+ views and 50+ sales. A larger budget buys reach and room to test. It does not buy a different method.",
      },
    ],
    proof: ["Disguise Official", "Dhaka Dreams Concert", "Pizza Gallery"],
    faqs: [
      {
        q: "What is the minimum ad budget?",
        a: "There is no fixed floor. Disguise Official launched on $25 of ad spend. What matters more than the number is whether the offer is right and the tracking works before the spend starts.",
      },
      {
        q: "Do you run Facebook ads and Google Ads?",
        a: "Both. Meta ads on Facebook and Instagram reach people who are not looking for you yet; Google Ads catch the ones already searching for what you sell. Which side gets the budget depends on your offer, and the split is agreed before anything is bought.",
      },
      {
        q: "What do you report on?",
        a: "Revenue attribution first: which spend produced which sale or enquiry. Reach and engagement are reported as context rather than as the headline.",
      },
    ],
    related: ["web-design", "social-media-marketing", "influencer-marketing"],
  },

  "Social Media & Content Marketing": {
    slug: "social-media-marketing",
    h1: "Social Media Marketing & Management",
    metaTitle: "Social Media Marketing Agency in Bangladesh | BizChemists",
    metaDescription:
      "Social media management and content marketing: channel strategy, monthly calendars, design, copy, scheduling, community management and reporting.",
    lede: "A posting rhythm you can sustain, built from formats that suit your team, with community management so the audience has a reason to stay. Channel strategy and content pillars, a monthly calendar, design, copy and scheduling, then reporting on what actually moved.",
    sections: [
      {
        h: "Who this is for",
        p: "Accounts that post when somebody remembers to, and accounts that have grown to the point where answering comments has quietly become a second job. We run accounts from Bangladesh for brands in Dhaka, Chittagong and Kuala Lumpur.",
      },
      {
        h: "A calendar you can keep",
        p: "Most social plans die because they demand a new idea every day. Pillars and repeatable formats come first, so the calendar is filled by a system rather than by inspiration. That is the difference between a social media marketing agency and somebody posting on your behalf.",
      },
      {
        h: "Run end to end, from anywhere",
        p: "Table 43 in Kuala Lumpur is run entirely from Bangladesh: 180% follower growth, 320K+ monthly reach and a 52% rise in engagement.",
      },
    ],
    proof: ["Table 43 Malaysia", "Pizza Gallery"],
    faqs: [
      {
        q: "Do you manage the account or only make the content?",
        a: "Both, if you want them. Design, copy and scheduling are the baseline. Community management, which means replying, moderating and routing real enquiries to you, is part of the same service line.",
      },
      {
        q: "Can you run an account for a business outside Bangladesh?",
        a: "Yes. Table 43 is a restaurant in Kuala Lumpur whose account is run from Bangladesh, and it grew 180% in followers with 320K+ monthly reach.",
      },
      {
        q: "How is it reported?",
        a: "Monthly, against the goal set at the start: reach, engagement and the enquiries the account produced. If a format stops working it gets replaced rather than repeated.",
      },
    ],
    related: ["video-production", "brand-identity", "growth-marketing"],
  },

  "Recruitment Support": {
    slug: "recruitment-support",
    h1: "Employer Branding & Recruitment Support",
    metaTitle: "Employer Branding & Recruitment Support | BizChemists",
    metaDescription:
      "Employer brand and hiring collateral that make a role attractive to the right candidates: careers messaging, role briefs, adverts and onboarding material.",
    lede: "Employer branding and hiring collateral that make the role attractive to the people you actually want, plus support through the funnel. Careers messaging, role briefs and adverts, candidate sourcing support, and interview and onboarding collateral.",
    sections: [
      {
        h: "Who this is for",
        p: "Growing teams competing for the same shortlist as larger employers, where the job itself is good but the advert does not say so. We work with employers in Dhaka and across Bangladesh.",
      },
      {
        h: "Marketing applied to hiring",
        p: "A role advert is a landing page and a candidate is an audience. We write and design them that way: clear about the work, honest about the expectations, and specific enough that the wrong applicants rule themselves out.",
      },
      {
        h: "What this is not",
        p: "We are not a recruitment agency. We do not place candidates and we do not charge placement fees. We make the role and the company legible to the right people, and support the process around it.",
      },
    ],
    proof: [],
    faqs: [
      {
        q: "Are you a recruitment agency?",
        a: "No. We are a marketing agency doing the marketing half of hiring: employer brand, careers messaging, role briefs, job adverts, sourcing support and onboarding collateral. Placing candidates and charging placement fees is a different business.",
      },
      {
        q: "What do you deliver?",
        a: "Employer brand and careers messaging, role briefs and job adverts, candidate sourcing support, and interview and onboarding collateral.",
      },
    ],
    related: ["brand-identity", "social-media-marketing"],
  },
}

/** Every service page, in the order the homepage lists the service lines. */
export const SERVICE_LIST = SERVICES.map((s) => ({ ...SERVICE_PAGES[s.title], service: s }))

export const servicePageOf = (slug) => SERVICE_LIST.find((p) => p.slug === slug)

/* ------------------------------------------------------------- section hubs */

/* /services/ and /work/ were 404s: the detail pages existed, the level above them did
   not. A hub gives each set one crawlable parent, one place to link from, and the
   middle step a breadcrumb needs. Both are generated from the lists above. */
export const HUBS = {
  services: {
    slug: "services",
    h1: "Marketing Services",
    metaTitle: "Marketing Services in Bangladesh | The BizChemists",
    metaDescription:
      "Seven service lines from one Bangladesh agency: branding, video production, web design, influencer, digital marketing, social media and employer branding.",
    lede: "Seven service lines, run by one team. Take one, or hand over the whole brand. Each page says what the work includes, who it is for, what it produced for other clients, and where it stops.",
    closing: "Not sure which line the work belongs to? Describe it on a call and we will tell you, including when the answer is that you do not need us.",
  },
  insights: {
    slug: "insights",
    h1: "Insights",
    metaTitle: "Marketing Insights from Bangladesh | The BizChemists",
    metaDescription:
      "What we learned running launches in Bangladesh and Malaysia: concerts, restaurants and labels, written from the projects rather than from theory.",
    lede: "Written from the work, not from a template. Every number in these pieces comes from a project on this site, and where we have nothing worth quoting we say so.",
    intro: [
      "There is no publishing schedule here and nothing written to fill one. A piece goes up when a project has taught us something worth a reader's time: what we tried, what the numbers did, and what we would not do again.",
      "All of it is written by the person who ran the campaigns rather than by someone summarising them afterwards, which is why the examples are specific and the gaps are admitted rather than filled in.",
    ],
    closing: "If one of these describes the thing you are about to launch, the call is free and we will tell you what we would do.",
  },
  work: {
    slug: "work",
    h1: "Selected Work",
    metaTitle: "Marketing Case Studies from Bangladesh | The BizChemists",
    metaDescription:
      "Six campaigns and the numbers they produced: 3,000+ concert tickets, 250% restaurant sales growth, 180% follower growth, and a label launched on $25 of ad spend.",
    lede: "Six projects, each listed with the result it produced rather than the adjective it deserved. Concerts, restaurants, fashion labels and remote content production, across Bangladesh and Malaysia.",
    closing: "Every case study says what the brief was, what we did, and what changed. Where a project has no numbers worth quoting, it says that too.",
  },
}

/* ----------------------------------------------------------------- insights */

/* Articles at /insights/<slug>. The rule for this section: every claim is either
   something we did on a named project, or it is not in here. Numbers are the same
   ones recorded in WORK, so a figure can never drift between a case study and a
   piece written about it. */
export const AUTHOR = {
  name: "Ibtehaz Kabir Zarif",
  role: "Founder, The BizChemists",
  bio: "Founder of The BizChemists, a creative marketing and branding agency in Bangladesh. He has led campaigns for concerts, restaurants and fashion labels across Bangladesh and Malaysia.",
}

export const INSIGHTS = [
  {
    slug: "how-to-launch-in-bangladesh",
    h1: "How to launch in Bangladesh",
    metaTitle: "How to Launch a Brand in Bangladesh | The BizChemists",
    metaDescription:
      "Six launches in Bangladesh and Malaysia and what moved each one: 3,000+ concert tickets, 250% restaurant sales, and a label launched on $25 of ad spend.",
    published: "2026-10-05",
    updated: "2026-10-05",
    dek: "Launches here fail for one of two reasons: nobody knew, or nobody believed. Across six projects — two concerts, two restaurants, two labels — the same three moves did the work. Borrow trust before buying attention, give the decision a real deadline, and make the content local even when you are not.",
    projectTable: true,
    sections: [
      {
        h: "The six projects, and what each produced",
        body: [
          "Every number here comes from a project page on this site, where the full story sits. They are results from specific campaigns, not industry averages and not projections. One of the six has no published numbers, and it is in the table anyway, because a launch without a metric is still a launch.",
        ],
      },
      {
        h: "Borrow trust before you buy attention",
        body: [
          "KOSTCON 2025 brought a K-Drama OST concert to Dhaka for an audience nobody had sold a concert to before. Rather than announce it, we partnered with the K-Pop influencers those fans already followed — more than fifty creators — so the first thing most of them heard about the concert came from someone they trusted rather than from an advert. The campaign reached 2.5M+ people and sold over 3,000 tickets.",
          "Pizza Gallery worked the same way at a smaller scale: Chittagong food influencers, not national ones. Whose audience it is matters more than how large it is. For a restaurant in Chittagong, a Chittagong food page beats a national page with ten times the followers, because only one of them can walk in on Friday.",
        ],
      },
      {
        h: "Give the decision a real deadline",
        body: [
          "Dhaka Dreams Concert came to us with sales stalled and two weeks to go, cancellation on the table. There was no time to build an audience, only to convert the one that already existed. Limited-time offers and countdowns gave the decision a deadline, Facebook and Instagram campaigns put it in front of music fans rather than everyone, flash pricing forced the moment, and early buyers became the social proof that moved the next wave. Ticket sales tripled and the venue reached 85% capacity.",
          "The honest caveat: that was a rescue, not a plan. Scarcity works when the deadline is real, because the date of a concert cannot be moved. Invent a deadline that does not exist and you teach people that your prices drop if they wait.",
        ],
      },
      {
        h: "Reveal, do not announce",
        body: [
          "A launch is a season, not a day. For KOSTCON every performing artist got their own reveal moment, with cinematic promotional films carrying the lineup across every platform on a planned schedule rather than one launch push. That gives an audience several reasons to come back and gives the algorithm several things to distribute, instead of one post that has to do all the work.",
        ],
      },
      {
        h: "Make it local, even when you are not",
        body: [
          "Table 43 is a restaurant in Kuala Lumpur whose account is run entirely from Bangladesh. The content still had to read as native to a Malaysian audience, so we moved the focus to Instagram where that audience actually is, directed the on-ground team with shot-by-shot briefs so the footage came back with the composition we had planned, cut it into reels and promos here, and ran the calendar so the account stayed consistent rather than sporadic. Followers grew 180%, monthly reach reached 320K+, and engagement rose 52%.",
          "The same discipline applies inside one country. Pizza Gallery's captions were written for a Chittagong audience rather than a generic Bangladeshi one, which is a smaller decision than it sounds and a visible one in the comments.",
        ],
      },
      {
        h: "Budget sets the ceiling, not the method",
        body: [
          "Disguise Official launched on $25 of advertising and returned 120K+ views and 50+ sales. That is not a recommendation to spend $25. It is evidence that the offer, the creative and the targeting do their work before the budget does, and that spending more on a campaign that has not proved any of the three only buys a faster answer.",
        ],
      },
      {
        h: "What this cannot tell you",
        body: [
          "Fees and project budgets are not published here, and neither is anything a client has not already agreed to see in public. Results depend on the product, the price, the timing and the market, and a pattern that worked across six projects is a starting point rather than a guarantee. What it does tell you is what we would try first, and in what order.",
        ],
      },
    ],
    faqs: [
      {
        q: "How long does it take to promote a concert in Bangladesh?",
        a: "Longer than two weeks, ideally. Dhaka Dreams was turned around in two, reaching 3X ticket sales and 85% capacity, but that was a rescue of an event already on sale. KOSTCON ran as a scheduled campaign with staged artist reveals, which is what you want when the date is still far enough away to build toward.",
      },
      {
        q: "Do influencer partnerships still work for launches in Bangladesh?",
        a: "Yes, when they are chosen on audience overlap rather than follower count. KOSTCON was built on more than fifty K-Pop creators its audience already followed, and Pizza Gallery on Chittagong food influencers rather than national ones. The question is whether their audience is your audience, not how many of them there are.",
      },
      {
        q: "How much ad budget does a launch need in Bangladesh?",
        a: "There is no floor worth quoting. Disguise Official launched on $25 of ad spend and returned 120K+ views and 50+ sales. Budget decides how fast you find out whether the offer works; it does not decide whether it works.",
      },
    ],
    services: ["influencer-marketing", "growth-marketing", "social-media-marketing", "video-production"],
    projects: ["KOSTCON 2025", "Dhaka Dreams Concert", "Table 43 Malaysia", "Disguise Official"],
    related: [
      "selling-concert-tickets-bangladesh",
      "two-weeks-to-fill-a-venue",
      "launching-a-label-on-a-small-budget",
      "marketing-a-restaurant-in-bangladesh",
      "running-social-media-remotely",
    ],
  },

  {
    slug: "selling-concert-tickets-bangladesh",
    h1: "Selling 3,000 tickets to a concert nobody had run before",
    metaTitle: "How to Sell Concert Tickets in Bangladesh | BizChemists",
    metaDescription:
      "KOSTCON 2025 brought K-Drama OST to Dhaka for an audience nobody had sold a concert to. 50+ creators, staged reveals, 2.5M+ reach and 3,000+ tickets sold.",
    published: "2026-10-05",
    updated: "2026-10-05",
    dek: "KOSTCON 2025 was a K-Drama OST concert in Dhaka for an audience no promoter had sold a concert to before. The campaign reached 2.5M+ people, drew 150K+ engagements and sold more than 3,000 tickets. This is the order we did it in, and why that order mattered.",
    sections: [
      {
        h: "A first-of-its-kind event has no proven demand",
        body: [
          "The fandom was real and large. What nobody knew was whether it would pay for a ticket, because it had never been asked. That is a different problem from a sold-out act returning to a city, and it cannot be solved by buying more reach: an audience that has never been asked to show up does not become convinced by an advert telling it to.",
          "So the first job was not awareness. It was credibility with people who already knew the music and had no reason yet to trust the event.",
        ],
      },
      {
        h: "Fifty creators before a single advert",
        body: [
          "We partnered with more than fifty K-Pop creators the audience already followed, so the first time most fans heard about KOSTCON it came from an account they had chosen to follow rather than from a brand paying to interrupt them.",
          "The reason to spread it across fifty rather than concentrate it in five is that a fandom is not one room. It is many small ones with their own voices, and a concert needs enough of them nodding at the same time for the thing to feel real rather than promoted.",
        ],
      },
      {
        h: "A lineup revealed, not announced",
        body: [
          "Every performing artist got a reveal moment of their own, carried by cinematic promotional films across platforms on a planned schedule rather than in one launch push.",
          "An announcement is a single day. A sequence of reveals gives the audience a reason to come back, gives each artist's fans their own moment to react to, and gives the platforms more than one thing to distribute. The same information, spread so it can compound.",
        ],
      },
      {
        h: "What it produced",
        body: [
          "2.5M+ total reach, 150K+ engagements, and more than 3,000 tickets sold. What is not published here is the budget, the fee or what we paid any creator, and those are the numbers that would tell you whether this is affordable for your event. Book a call and we will talk about them for your case.",
        ],
      },
    ],
    faqs: [
      {
        q: "How many influencers does a concert campaign need in Bangladesh?",
        a: "KOSTCON worked with more than fifty, chosen on audience overlap rather than follower count. The number follows from how many pockets of a fandom you need nodding at once, not from a target set in advance. A smaller, tighter audience needs fewer.",
      },
      {
        q: "Does this approach work for a local artist rather than an international one?",
        a: "The two moves underneath it are not specific to K-Pop: reach an audience through accounts it already trusts, and spread the announcement into a sequence. We can only speak for what we have run, and KOSTCON is the clearest example of both.",
      },
      {
        q: "How far ahead should ticket promotion start?",
        a: "Early enough to run reveals in sequence rather than all at once, which is the whole advantage. Dhaka Dreams Concert shows that two weeks can be survived, but that was a rescue of an event already on sale rather than a plan anyone would choose.",
      },
    ],
    services: ["influencer-marketing", "video-production", "growth-marketing"],
    projects: ["KOSTCON 2025"],
    related: ["how-to-launch-in-bangladesh", "two-weeks-to-fill-a-venue"],
  },

  {
    slug: "two-weeks-to-fill-a-venue",
    h1: "Two weeks to fill a venue",
    metaTitle: "Last-Minute Event Promotion in Bangladesh | BizChemists",
    metaDescription:
      "Dhaka Dreams had stalled ticket sales and two weeks to go, with cancellation on the table. Scarcity, targeting and social proof tripled sales to 85% capacity.",
    published: "2026-10-05",
    updated: "2026-10-05",
    dek: "Ticket sales had stalled, the date was two weeks away and cancelling was on the table. There was no time to build an audience, only to convert the one that already existed. Sales tripled and the venue reached 85% capacity.",
    sections: [
      {
        h: "Two weeks changes what the campaign can be",
        body: [
          "With months, you build an audience: content, creators, repetition, the slow work of becoming familiar. With two weeks, none of that has time to land. The only people who can still buy are the ones who already know the event exists and have not decided yet.",
          "So the campaign stopped trying to reach new people and went to work on the undecided.",
        ],
      },
      {
        h: "The deadline was already real",
        body: [
          "A concert date cannot move, which makes urgency honest. Limited-time offers and countdowns put that fixed deadline in front of people who had been treating the decision as open-ended.",
          "This is the part worth copying carefully. Scarcity works because the constraint is true. Invent one — a sale that keeps getting extended, a last chance that comes round monthly — and you teach an audience that waiting is rewarded, which makes the next campaign harder than this one.",
        ],
      },
      {
        h: "Aimed at music fans, not at everyone",
        body: [
          "Facebook and Instagram campaigns were targeted at music fans rather than a broad audience. On a short runway, waste is not just inefficient, it is fatal: there is no second week to correct a bad audience.",
        ],
      },
      {
        h: "Early buyers did the convincing",
        body: [
          "Flash pricing forced a decision, and the people who took it became the evidence for the next wave. Amplified early-buyer sentiment answers the question an undecided buyer is actually asking, which is not whether the event is good but whether anyone else is going.",
        ],
      },
      {
        h: "What it produced, and what it cost",
        body: [
          "Ticket sales tripled, the venue reached 85% capacity, and the concert happened. The honest framing is that this was a rescue, not a strategy. The tools that work at two weeks — discounting, urgency, pressure — are the ones you cannot use repeatedly without training your audience to wait for them. An event that starts its campaign early never has to spend them.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can a campaign still save an event two weeks out?",
        a: "It did here: 3X ticket sales and 85% capacity from a standing start of stalled sales. What made it possible was an audience that already knew about the event. If nobody has heard of it two weeks out, there is no one to convert and the answer changes.",
      },
      {
        q: "Do flash sales damage the brand?",
        a: "Used once, under a real deadline, they convert people who were already interested. Used routinely, they teach buyers that the price drops if they wait, which costs more over a year than the single campaign earned.",
      },
      {
        q: "What should an event do instead of a rescue?",
        a: "Start the campaign while reveals, creators and content still have room to compound. KOSTCON 2025 is the version of this with time on its side, and it sold more than 3,000 tickets without needing a discount to force the moment.",
      },
    ],
    services: ["growth-marketing", "social-media-marketing"],
    projects: ["Dhaka Dreams Concert"],
    related: ["how-to-launch-in-bangladesh", "selling-concert-tickets-bangladesh"],
  },

  {
    slug: "launching-a-label-on-a-small-budget",
    h1: "Launching a label on $25 of ad spend",
    metaTitle: "Launch a Clothing Brand in Bangladesh | The BizChemists",
    metaDescription:
      "Disguise Official launched on $25 of advertising and returned 120K+ views and 50+ sales. What $25 could not buy, and what had to be right before it was spent.",
    published: "2026-10-05",
    updated: "2026-10-05",
    dek: "Disguise Official is a streetwear label that launched on $25 of advertising and returned 120K+ views and 50+ sales. The budget is the least interesting part of that sentence. Everything that made it possible was decided before the money moved.",
    sections: [
      {
        h: "What $25 cannot buy",
        body: [
          "It cannot buy reach at scale, repetition, or room to test. It cannot rescue a product nobody wants or creative nobody stops for. A budget that small is not a campaign, it is a measuring instrument: it tells you quickly whether the offer and the creative are doing their jobs.",
          "Which means everything the budget cannot carry has to be carried by something else.",
        ],
      },
      {
        h: "Identity first, campaign second",
        body: [
          "We built a cohesive digital identity and ran campaigns from concept to delivery so the voice, the look and the positioning stayed consistent everywhere the label appeared. The aim was a foundation for long-term recognition rather than a launch spike.",
          "For a streetwear label this is not decoration. The thing being sold is partly the identity, and a buyer deciding whether to wear your name in public is reading consistency as evidence that you will still exist next season.",
        ],
      },
      {
        h: "Shoots directed, not improvised",
        body: [
          "Photoshoots and video production were directed from idea to final output, with the editing workflow supervised against brand standards and schedules, locations and resources coordinated so campaign assets landed on time.",
          "Improvised content is cheap to make and expensive to use: it arrives in the wrong shapes, in a different mood each time, and someone has to make it work later. Directed content costs more attention up front and less of everything afterwards.",
        ],
      },
      {
        h: "Calendars against a commercial goal, ads read closely",
        body: [
          "Content calendars were planned against the audience and the commercial goal rather than a posting habit, and Meta ads campaigns were read closely enough to keep improving engagement, reach and conversions, with the strategy tuned to seasonal trends rather than set once.",
        ],
      },
      {
        h: "What it produced",
        body: [
          "120K+ views and 50+ sales from $25 of spend. One label, one market, one launch — evidence that the offer and the creative carry a small budget further than a larger budget carries weak ones, not a formula that transfers to every product. A bigger budget would have bought a faster answer, not a different one.",
        ],
      },
    ],
    faqs: [
      {
        q: "How much should a new clothing brand in Bangladesh spend on ads?",
        a: "There is no floor worth quoting. Disguise Official launched on $25 and returned 120K+ views and 50+ sales. Spend enough to learn whether the offer works, then spend behind the version that did rather than the version you hoped for.",
      },
      {
        q: "Do I need a full brand identity before launching?",
        a: "You need enough of one that two posts in a row look like the same company. Logo, colour, type, voice and art direction are what make a small budget compound instead of starting over every time you post.",
      },
      {
        q: "Is streetwear different from other apparel to launch?",
        a: "The buyer is wearing your name in public, so consistency and identity are doing more of the selling than the product description is. That is why the identity work came before the advertising rather than after it.",
      },
    ],
    services: ["brand-identity", "growth-marketing", "video-production"],
    projects: ["Disguise Official"],
    related: ["how-to-launch-in-bangladesh", "marketing-a-restaurant-in-bangladesh"],
  },

  {
    slug: "marketing-a-restaurant-in-bangladesh",
    h1: "Rebuilding a restaurant's marketing from the identity up",
    metaTitle: "Restaurant Marketing in Bangladesh | The BizChemists",
    metaDescription:
      "Pizza Gallery had good pizza and low sales in Chittagong. A brand guideline, a local content operation and Chittagong food influencers moved sales 250%.",
    published: "2026-10-05",
    updated: "2026-10-05",
    dek: "Pizza Gallery opened in Chittagong with a simple idea: great pizza with a vibe of its own. The food delivered and the business did not. Sales were low, the social presence connected with nobody, and no identity held any of it together. Sales rose 250%, reach passed 500K and engagement reached 45%.",
    sections: [
      {
        h: "Good food is not a marketing plan",
        body: [
          "The product was never the problem, which is the most common version of this situation and the most frustrating one. People who had eaten there came back. People who had not were given no reason to start, because everything the restaurant published looked like it came from somewhere else.",
        ],
      },
      {
        h: "The guideline came before the posts",
        body: [
          "We joined as the business development and marketing partner and started with a brand guideline: a visual identity built on bold white, orange and red, and a tone of voice consistent enough to survive everything they published.",
          "Starting with the guideline rather than the content is the difference between a feed and a brand. Without it, every post is a new decision made by whoever is posting, and a year of that leaves a restaurant with no recognisable look at all.",
        ],
      },
      {
        h: "Shoot the room as it actually is",
        body: [
          "Our creative team visited regularly to shoot photo and video, capturing the food and the room as they are rather than as stock photography imagines them: story-driven reels, interactive formats, and captions written for a Chittagong audience rather than a generic one.",
          "A restaurant sells an evening, not a product. Footage of the actual room is the only thing that shows what the evening is like, and it is the part most places skip because a stock image is faster.",
        ],
      },
      {
        h: "Local influence, not national reach",
        body: [
          "We brought in Chittagong food influencers to put the restaurant in front of local food lovers and trendsetters. A national page with ten times the audience is worth less here, because almost none of that audience can walk in on a Friday evening.",
        ],
      },
      {
        h: "Managed daily, measured against engagement",
        body: [
          "Accounts were managed daily and optimised against engagement rather than posted into and left. Visibility rose, awareness rose, and sales — the number that actually decides whether any of it worked — rose 250%, with 500K+ social reach and a 45% engagement rate.",
        ],
      },
    ],
    faqs: [
      {
        q: "How often does a restaurant need new content?",
        a: "Often enough that the account is never stale, which in practice means a managed calendar and regular shoots rather than a burst when someone remembers. Pizza Gallery was managed daily with the creative team visiting regularly to refill the library.",
      },
      {
        q: "Do food influencers actually bring customers?",
        a: "Local ones can, because their audience is physically able to visit. Pizza Gallery used Chittagong food influencers for exactly that reason. Reach from a national audience looks better in a report and does less for a Friday evening.",
      },
      {
        q: "Should a restaurant fix its branding before its social media?",
        a: "Branding first, or the social media work has to be redone. Without a guideline every post is a fresh decision, and the inconsistency is visible to customers long before it is visible to the owner.",
      },
    ],
    services: ["brand-identity", "social-media-marketing", "video-production", "influencer-marketing"],
    projects: ["Pizza Gallery"],
    related: ["how-to-launch-in-bangladesh", "running-social-media-remotely"],
  },

  {
    slug: "running-social-media-remotely",
    h1: "Running a restaurant's social from another country",
    metaTitle: "Managing Social Media Remotely | The BizChemists",
    metaDescription:
      "Table 43 is in Kuala Lumpur and its account is run from Bangladesh. Shot-by-shot briefs, a platform switch and a kept calendar: 180% follower growth, 320K+ reach.",
    published: "2026-10-05",
    updated: "2026-10-05",
    dek: "Table 43 is a restaurant in Kuala Lumpur whose social media runs entirely from Bangladesh, and still has to read as native to a Malaysian audience. Followers grew 180%, monthly reach passed 320K and engagement rose 52%.",
    sections: [
      {
        h: "The constraint: nobody from the agency is ever in the room",
        body: [
          "Everything that usually makes restaurant content work — being there when the light is good, catching the dish as it leaves the pass, reading the room on a busy night — was unavailable. What remained was a local team who were in the room every day, and a plan that had to reach them clearly enough to be followed.",
        ],
      },
      {
        h: "Move to where the audience is",
        body: [
          "The first decision was a platform one: shift the focus to Instagram, where Malaysian audiences actually are. Running the account from abroad makes this easier to see, not harder, because there is no habit of posting where the restaurant has always posted.",
        ],
      },
      {
        h: "Direct the room you cannot stand in",
        body: [
          "We directed the on-ground team remotely with shot-by-shot briefs, so footage came back with the composition we had planned rather than whatever happened to be filmed.",
          "This is the transferable part. A brief that says take some photos of the food returns a folder nobody can use. A brief that specifies the shot, the angle, the light and the sequence returns raw material that cuts into what was planned. The skill being exported is the planning, not the camera work.",
        ],
      },
      {
        h: "Edit and design at distance",
        body: [
          "That raw footage was cut into polished reels and promos in Bangladesh, with posters and graphics designed to give the promotions a professional edge. Nothing about the editing requires being in the country where the food was cooked.",
        ],
      },
      {
        h: "Then keep the calendar",
        body: [
          "Scheduling, posting and optimisation ran on a calendar so the account stayed consistent rather than sporadic — the least glamorous part, and the one that decides whether the rest compounds. The result was 180% follower growth, 320K+ monthly reach, a 52% rise in engagement, and content that reads as professionally produced despite never having a producer in the room.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can an agency in another country run a local social media account?",
        a: "Yes, when someone on the ground can shoot to a brief. Table 43 in Kuala Lumpur is run from Bangladesh and grew 180% in followers with 320K+ monthly reach. What crosses the border is planning, editing and design. What cannot is the camera.",
      },
      {
        q: "What has to be true for remote content production to work?",
        a: "A local team willing to follow a shot list, briefs specific enough to be followed, and a calendar somebody owns. Without the first, no amount of planning produces usable footage.",
      },
      {
        q: "What does remote production give up?",
        a: "Spontaneity. Nobody abroad catches the unplanned moment on a busy Friday, so the content is what was planned rather than what happened. For a restaurant building a consistent presence that trade is usually worth it; for live events it would not be.",
      },
    ],
    services: ["social-media-marketing", "video-production"],
    projects: ["Table 43 Malaysia"],
    related: ["how-to-launch-in-bangladesh", "marketing-a-restaurant-in-bangladesh"],
  },
]

export const insightOf = (slug) => INSIGHTS.find((a) => a.slug === slug)
