export type Language = 'si' | 'en';

export type PromptCategory =
  | 'all'
  | 'business'
  | 'education'
  | 'content'
  | 'image'
  | 'career'
  | 'daily';

export type AiTool = 'All AI tools' | 'ChatGPT' | 'Claude' | 'Gemini' | 'Midjourney';

export type CardTheme = 'sage' | 'forest' | 'paper';

export interface PromptItem {
  id: string;
  category: Exclude<PromptCategory, 'all'>;
  tool: Exclude<AiTool, 'All AI tools'>;
  theme: CardTheme;
  previewLabel: string;
  previewQuoteSi: string;
  previewQuoteEn: string;
  titleSi: string;
  titleEn: string;
  descriptionSi: string;
  descriptionEn: string;
  promptSi: string;
  promptEn: string;
  variables: string[];
  tags: string[];
  isCustom?: boolean;
}

export interface PromptCollection {
  id: string;
  titleSi: string;
  titleEn: string;
  descriptionSi: string;
  descriptionEn: string;
  promptIds: string[];
  accent: CardTheme;
}

export const INITIAL_PROMPTS: PromptItem[] = [
  {
    id: 'fb-business-post',
    category: 'business',
    tool: 'ChatGPT',
    theme: 'sage',
    previewLabel: 'SOCIAL COPY',
    previewQuoteSi: 'පාරිභෝගිකයා ආකර්ෂණය වන Facebook post එකක්',
    previewQuoteEn: 'High-converting Facebook post for local shops',
    titleSi: 'පුංචි ව්‍යාපාරයට Facebook Post එකක්',
    titleEn: 'Facebook Post for Small Business',
    descriptionSi:
      'ඔබේ නිෂ්පාදනය හෝ සේවාව ශ්‍රී ලාංකික පාරිභෝගිකයන්ට සිත්ගන්නාසුලු සිංහලෙන් හඳුන්වා දෙන්න.',
    descriptionEn:
      'Introduce your product or service to Sri Lankan customers in natural, engaging copy with a clear call to action.',
    promptSi: `මගේ "[ව්‍යාපාරයේ නම]" ව්‍යාපාරයේ "[නිෂ්පාදනය / සේවාව]" සඳහා Facebook post එකක් ලියා දෙන්න.

ඉලක්කගත පාරිභෝගිකයන්: [උදා: කොළඹ අවට තරුණ වෘත්තිකයන්]
ප්‍රධාන වාසිය: [උදා: දැරිය හැකි මිල සහ ඉක්මන් delivery]
භාෂා ශෛලිය: සුහදශීලී, විශ්වාසවන්ත සිංහල (අවශ්‍ය ඉංග්‍රීසි වචන සමඟ)

අවශ්‍ය දේ:
1. අවධානය දිනාගන්නා පළමු පේළිය (Hook)
2. ප්‍රධාන වාසි 3ක් කෙටියෙන්
3. Inbox / WhatsApp හරහා ඇණවුම් කිරීමට පැහැදිලි Call to Action එකක්`,
    promptEn: `Write an engaging Facebook post for my business "[Business Name]" promoting "[Product / Service]".

Target Audience: [e.g. Young professionals around Colombo]
Key Advantage: [e.g. Affordable price with same-day delivery]
Tone: Warm, trustworthy, and natural Sri Lankan conversational style

Include:
1. An attention-grabbing opening hook
2. 3 concise bullet benefits
3. A clear call-to-action to message via Inbox or WhatsApp`,
    variables: ['ව්‍යාපාරයේ නම', 'නිෂ්පාදනය / සේවාව', 'ඉලක්කගත පාරිභෝගිකයන්'],
    tags: ['Facebook post', 'Marketing', 'Small Business'],
  },
  {
    id: 'product-photo-studio',
    category: 'image',
    tool: 'Midjourney',
    theme: 'forest',
    previewLabel: 'PRODUCT VISUAL',
    previewQuoteSi: 'Studio මට්ටමේ Product Photo prompt එක',
    previewQuoteEn: 'Minimalist studio product photography prompt',
    titleSi: 'ආකර්ෂණීය Product Photo නිර්මාණය',
    titleEn: 'Studio Product Photo Prompt',
    descriptionSi:
      'Ceylon tea, spices, හෝ handmade භාණ්ඩ සඳහා ස්වභාවික ආලෝකය සහිත studio ඡායාරූප prompt එකක්.',
    descriptionEn:
      'Generate studio-grade commercial photography prompts for Ceylon tea, crafts, skincare, or packaged goods.',
    promptSi: `Commercial studio product photography of [නිෂ්පාදනය — උදා: handmade Ceylon cinnamon jar with kraft label], placed on warm natural travertine stone surface, soft morning sunlight casting gentle tropical leaf shadows, shallow depth of field, clean minimalist editorial composition, 85mm lens, photorealistic, high detail --ar 4:5`,
    promptEn: `Commercial studio product photography of [Product — e.g. handmade Ceylon cinnamon jar with kraft label], placed on a warm natural travertine stone surface, soft morning sunlight casting gentle tropical leaf shadows, shallow depth of field, clean minimalist editorial composition, 85mm lens, photorealistic, high detail --ar 4:5`,
    variables: ['නිෂ්පාදනය'],
    tags: ['Product photo', 'E-commerce', 'Midjourney'],
  },
  {
    id: 'cv-ats-optimizer',
    category: 'career',
    tool: 'Claude',
    theme: 'paper',
    previewLabel: 'THE "NOW" RESUME',
    previewQuoteSi: 'මගේ CV එක වෘත්තීය මට්ටමට සකසා ගැනීම',
    previewQuoteEn: 'Upgrade my CV for modern hiring teams',
    titleSi: 'මගේ CV එක වෘත්තීයව වැඩිදියුණු කරගන්න',
    titleEn: 'Professional CV & Summary Upgrade',
    descriptionSi:
      'ඔබේ අත්දැකීම් හා කුසලතා සැලකිල්ලට ගෙන රැකියා ආයතන කැමති ආකාරයට CV එක සකසා ගන්න.',
    descriptionEn:
      'Rewrite your CV bullet points and career summary to highlight measurable outcomes and pass ATS screening.',
    promptSi: `පහත සඳහන් මගේ තොරතුරු ඇසුරින් "[අපේක්ෂිත රැකියා තනතුර]" තනතුර සඳහා ගැලපෙන වෘත්තීය CV Summary එකක් සහ Work Experience bullet points 4ක් සකසා දෙන්න.

මගේ අත්දැකීම්: [ඔබ කළ වැඩ කෙටියෙන් ලියන්න]
ප්‍රධාන කුසලතා: [Skills ලියන්න]

නීති:
- සරල, පැහැදිලි, වෘත්තීය ඉංග්‍රීසි භාෂාවෙන් ලියන්න
- කළ කාර්යයන් වෙනුවට ලැබූ ප්‍රතිඵල (impact) මතු කරන්න
- අතිශයෝක්ති වචන වෙනුවට සැබෑ ක්‍රියාපද (Action verbs) භාවිතා කරන්න`,
    promptEn: `Using my background below, craft a sharp professional CV summary and 4 impact-driven bullet points tailored for a "[Target Job Title]" role.

My Experience: [Briefly describe your previous work]
Key Skills: [List your core skills]

Guidelines:
- Keep language crisp, clear, and ATS-friendly
- Emphasize measurable outcomes over generic duties
- Start every bullet with a strong action verb`,
    variables: ['අපේක්ෂිත රැකියා තනතුර', 'මගේ අත්දැකීම්', 'ප්‍රධාන කුසලතා'],
    tags: ['මගේ CV එක', 'Career', 'Resume'],
  },
  {
    id: 'study-concept-explainer',
    category: 'education',
    tool: 'Gemini',
    theme: 'sage',
    previewLabel: 'STUDY GUIDE',
    previewQuoteSi: 'අමාරු පාඩමක් සරල උදාහරණ වලින් තේරුම් ගමු',
    previewQuoteEn: 'Break down tough lessons with clear examples',
    titleSi: 'සංකීර්ණ පාඩමක් සරලව තේරුම් ගැනීම',
    titleEn: 'Simple Concept Explainer for Students',
    descriptionSi:
      'A/L, O/L හෝ විශ්වවිද්‍යාල විෂය කරුණු එදිනෙදා ජීවිතයේ උදාහරණ සමඟ පැහැදිලිව ඉගෙන ගන්න.',
    descriptionEn:
      'Understand complex school or university topics in simple Sinhala using everyday Sri Lankan analogies and quick quiz checks.',
    promptSi: `මට "[විෂය / පාඩම — උදා: ප්‍රභාසංශ්ලේෂණය හෝ Compound Interest]" යන මාතෘකාව [වයස / ශ්‍රේණිය — උදා: උසස් පෙළ සිසුවෙකුට] තේරෙන ආකාරයට සරල සිංහලෙන් පැහැදිලි කර දෙන්න.

කරුණාකර මේ ආකෘතිය අනුගමනය කරන්න:
1. පේළි 2ක සරල හැඳින්වීමක්
2. එදිනෙදා ජීවිතයෙන් උදාහරණයක්
3. මතක තබා ගැනීමට ප්‍රධාන කරුණු 3ක්
4. මගේ අවබෝධය පරීක්ෂා කිරීමට කෙටි ප්‍රශ්න 2ක්`,
    promptEn: `Explain "[Topic — e.g. Photosynthesis or Compound Interest]" clearly for a [Grade / Level — e.g. A/L student] using relatable everyday analogies.

Please structure the explanation as:
1. A 2-sentence plain summary
2. One relatable real-life analogy
3. 3 key takeaways to remember for exams
4. 2 quick self-check questions`,
    variables: ['විෂය / පාඩම', 'වයස / ශ්‍රේණිය'],
    tags: ['Education', 'Study', 'Exams'],
  },
  {
    id: 'youtube-tiktok-script',
    category: 'content',
    tool: 'ChatGPT',
    theme: 'forest',
    previewLabel: 'SHORT VIDEO SCRIPT',
    previewQuoteSi: 'තත්පර 45ක ආකර්ෂණීය Reels / TikTok පිටපතක්',
    previewQuoteEn: '45-second Reels & TikTok video script blueprint',
    titleSi: 'තත්පර 45 Reels / TikTok Video Script',
    titleEn: '45-Second Reels & TikTok Script',
    descriptionSi:
      'පළමු තත්පර 3න් ප්‍රේක්ෂකයා රඳවා ගන්නා, කතා කරන ශෛලියෙන් ලියූ කෙටි වීඩියෝ පිටපතක්.',
    descriptionEn:
      'Write a natural spoken-word 45-second script with a strong 3-second hook, pacing cues, and visual scene notes.',
    promptSi: `"[මාතෘකාව]" ගැන තත්පර 45ක TikTok / Instagram Reel වීඩියෝවක් සඳහා කතා කරන ශෛලියෙන් script එකක් ලියන්න.

ඉලක්කගත ප්‍රේක්ෂකයන්: [උදා: ශ්‍රී ලංකාවේ තරුණ නිර්මාණකරුවන්]
වීඩියෝ ශෛලිය: [උදා: මිත්‍රශීලී, වේගවත්, ප්‍රායෝගික]

කොටස්:
- [0:00-0:04] Hook (ප්‍රේක්ෂකයා නතර කරන ප්‍රශ්නයක් හෝ කරුණක්)
- [0:05-0:35] ප්‍රධාන කරුණු 3 (Visual සටහන් සමඟ)
- [0:36-0:45] අවසානය හා Follow / Comment කිරීමට ආරාධනය`,
    promptEn: `Write a natural, spoken-style 45-second TikTok / Instagram Reel script on "[Topic]".

Target Audience: [e.g. Young creators in Sri Lanka]
Vibe: [e.g. Friendly, crisp, practical]

Structure:
- [0:00-0:04] Hook that stops the scroll
- [0:05-0:35] 3 concise core insights with quick visual cues
- [0:36-0:45] Smooth wrap-up and engagement prompt`,
    variables: ['මාතෘකාව', 'ඉලක්කගත ප්‍රේක්ෂකයන්'],
    tags: ['Content', 'Reels', 'TikTok'],
  },
  {
    id: 'polite-client-whatsapp',
    category: 'daily',
    tool: 'Gemini',
    theme: 'paper',
    previewLabel: 'CLIENT REPLY',
    previewQuoteSi: 'වෘත්තීය හා සුහදශීලී WhatsApp / Email පිළිතුරක්',
    previewQuoteEn: 'Polite & clear client reply template',
    titleSi: 'පාරිභෝගිකයෙකුට සුහද WhatsApp පිළිතුරක්',
    titleEn: 'Polite Client WhatsApp / Email Reply',
    descriptionSi:
      'මිල ගණන් දැනුම් දීමට, ප්‍රමාදයක් ගැන කීමට හෝ නව ඇණවුමක් තහවුරු කිරීමට පැහැදිලි පණිවිඩයක්.',
    descriptionEn:
      'Draft warm, respectful client replies in Sinhala or English for quotes, order confirmations, or polite follow-ups.',
    promptSi: `පහත අවස්ථාව සඳහා පාරිභෝගිකයෙකුට යැවීමට සුහදශීලී, ගෞරවනීය සහ කෙටි WhatsApp පණිවිඩයක් (සිංහලෙන් සහ ඉංග්‍රීසියෙන්) ලියා දෙන්න.

අවස්ථාව: [උදා: ඇණවුම දින 2ක් ප්‍රමාද වන බව දැනුම් දීම / මිල ගණන් ඉදිරිපත් කිරීම]
පාරිභෝගිකයාගේ නම: [නම]
විශේෂ විස්තර: [අමතර කරුණු ඇතුළත් කරන්න]`,
    promptEn: `Write a warm, respectful, and concise WhatsApp reply (provide both Sinhala and English versions) for the situation below.

Situation: [e.g. Polite 2-day delivery update / Sending a quotation]
Client Name: [Name]
Key Details: [Any extra context]`,
    variables: ['අවස්ථාව', 'පාරිභෝගිකයාගේ නම'],
    tags: ['Daily', 'WhatsApp', 'Business'],
  },
];

export const COLLECTIONS: PromptCollection[] = [
  {
    id: 'col-sme',
    titleSi: 'කුඩා ව්‍යාපාර ආරම්භක කට්ටලය',
    titleEn: 'Small Business Starter Pack',
    descriptionSi:
      'Facebook post, product ඡායාරූප සහ පාරිභෝගික WhatsApp පිළිතුරු සඳහා අත්‍යවශ්‍ය prompts.',
    descriptionEn:
      'Essential prompts for social posts, studio product visuals, and friendly customer messaging.',
    promptIds: ['fb-business-post', 'product-photo-studio', 'polite-client-whatsapp'],
    accent: 'sage',
  },
  {
    id: 'col-growth',
    titleSi: 'අධ්‍යාපන හා වෘත්තීය දියුණුව',
    titleEn: 'Learning & Career Growth',
    descriptionSi:
      'පාඩම් පහසුවෙන් ඉගෙන ගැනීමටත්, ඔබේ CV එක ඉහළ මට්ටමට ගැනීමටත් තෝරාගත් prompts.',
    descriptionEn:
      'Curated prompts to master difficult subjects faster and upgrade your resume for hiring teams.',
    promptIds: ['study-concept-explainer', 'cv-ats-optimizer'],
    accent: 'paper',
  },
  {
    id: 'col-creator',
    titleSi: 'Content නිර්මාණකරුවන්ගේ එකතුව',
    titleEn: 'Content Creator Studio',
    descriptionSi:
      'කෙටි වීඩියෝ පිටපත් සහ ආකර්ෂණීය product දර්ශන ඉක්මනින් සැලසුම් කරන්න.',
    descriptionEn:
      'Plan high-retention short video scripts and crisp studio photography in minutes.',
    promptIds: ['youtube-tiktok-script', 'product-photo-studio', 'fb-business-post'],
    accent: 'forest',
  },
];

export const UI_COPY = {
  si: {
    brand: 'helaprompt.',
    sidebarWorkspaceTitle: 'ඔබේ නිර්මාණ අවකාශය',
    navExplore: 'ගවේෂණය කරන්න',
    navCollections: 'එකතු',
    navSaved: 'සුරැකි prompts',
    sidebarCategoriesTitle: 'ඔබට අවශ්‍ය දේ',
    catBusiness: 'ව්‍යාපාර',
    catEducation: 'අධ්‍යාපනය',
    catContent: 'Content නිර්මාණ',
    catImage: 'රූප නිර්මාණ',
    catCareer: 'වෘත්තීය ජීවිතය',
    catDaily: 'එදිනෙදා වැඩ',
    newToAiTitle: 'AI වලට අලුත් ද?',
    newToAiBody: 'පළමු prompt එකෙන්ම පටන් ගමු.',
    newToAiCta: 'භාවිතා කරන හැටි →',
    madeFor: 'Made for Sri Lanka',
    breadcrumbRoot: 'Workspace',
    breadcrumbExplore: 'Explore',
    breadcrumbCollections: 'Collections',
    breadcrumbSaved: 'Saved prompts',
    addPromptBtn: '+ Prompt එකක් එකතු කරන්න',
    heroKicker: 'අපේ වැඩවලට. අපේ භාෂාවෙන්.',
    heroTitleStart: 'අදහස ඔබේ.',
    heroTitleMid: 'හරිම prompt එක ',
    heroTitleAccent: 'මෙතැන.',
    heroSubtitle:
      'ව්‍යාපාරයට, ඉගෙනීමට, නිර්මාණයට — ඔබට ගැලපෙන AI prompt එක සොයන්න. ඔබේම කරගන්න.',
    heroCta: 'අපි පටන් ගමු',
    ideaStarterTag: '+ THE IDEA STARTER',
    ideaStarterQuote: 'මගේ පුංචි ව්‍යාපාරයට ලොකු අදහසක් දෙන්න.',
    ideaStarterLang: 'සිංහල + English ↵',
    searchPlaceholder: 'අද ඔබට කරන්න ඕනේ මොකක්ද?',
    searchLabel: 'සොයන්න:',
    quickSearches: [
      { label: 'Facebook post', query: 'Facebook post' },
      { label: 'මගේ CV එක', query: 'මගේ CV එක' },
      { label: 'Product photo', query: 'Product photo' },
    ],
    libraryKicker: 'A LITTLE INSPIRATION GOES A LONG WAY',
    libraryTitle: 'ඔබේ ඊළඟ අදහස මෙතැනින්',
    promptsCountSuffix: 'prompts ඔබ වෙනුවෙන්',
    tabs: [
      { id: 'all', label: 'සියල්ල', hasStar: true },
      { id: 'business', label: 'ව්‍යාපාර' },
      { id: 'education', label: 'අධ්‍යාපනය' },
      { id: 'content', label: 'Content' },
      { id: 'image', label: 'රූප' },
      { id: 'career', label: 'වෘත්තීය' },
    ],
    allTools: 'All AI tools',
    copyBtn: 'Copy prompt',
    copiedBtn: 'Copied!',
    customizeBtn: 'භාවිතා කරන්න',
    emptyTitle: 'ගැලපෙන prompt හමු නොවීය',
    emptyDesc: 'වෙනත් වචනයකින් සොයන්න හෝ පෙරහන් ඉවත් කරන්න.',
    emptyReset: 'සියල්ල පෙන්වන්න',
    savedEmptyTitle: 'තවම prompts සුරැකී නැත',
    savedEmptyDesc: 'ඔබ කැමති prompt කාඩ්පත්වල හදවත (♡) ඔබා මෙහි සුරකින්න.',
    collectionsHeading: 'තෝරාගත් Prompt එකතු',
    collectionsSub: 'ඔබේ කාර්යය අනුව පෙළගැස්වූ ප්‍රායෝගික prompt කට්ටල.',
    viewPromptsInCol: 'Prompts බලන්න',
  },
  en: {
    brand: 'helaprompt.',
    sidebarWorkspaceTitle: 'Your Creative Space',
    navExplore: 'Explore',
    navCollections: 'Collections',
    navSaved: 'Saved prompts',
    sidebarCategoriesTitle: 'What You Need',
    catBusiness: 'Business',
    catEducation: 'Education',
    catContent: 'Content Creation',
    catImage: 'Image Generation',
    catCareer: 'Career & CV',
    catDaily: 'Daily Tasks',
    newToAiTitle: 'New to AI?',
    newToAiBody: 'Start right with your very first prompt.',
    newToAiCta: 'How to use →',
    madeFor: 'Made for Sri Lanka',
    breadcrumbRoot: 'Workspace',
    breadcrumbExplore: 'Explore',
    breadcrumbCollections: 'Collections',
    breadcrumbSaved: 'Saved prompts',
    addPromptBtn: '+ Add a Prompt',
    heroKicker: 'For our work. In our language.',
    heroTitleStart: 'The idea is yours.',
    heroTitleMid: 'The right prompt is ',
    heroTitleAccent: 'right here.',
    heroSubtitle:
      'For business, learning, or creating — find the AI prompt tailored to you, customize it, and make it yours.',
    heroCta: "Let's begin",
    ideaStarterTag: '+ THE IDEA STARTER',
    ideaStarterQuote: 'Give my small business a big, clear idea.',
    ideaStarterLang: 'සිංහල + English ↵',
    searchPlaceholder: 'What would you like to get done today?',
    searchLabel: 'Try:',
    quickSearches: [
      { label: 'Facebook post', query: 'Facebook post' },
      { label: 'My CV', query: 'CV' },
      { label: 'Product photo', query: 'Product photo' },
    ],
    libraryKicker: 'A LITTLE INSPIRATION GOES A LONG WAY',
    libraryTitle: 'Your next idea starts here',
    promptsCountSuffix: 'prompts for you',
    tabs: [
      { id: 'all', label: 'All', hasStar: true },
      { id: 'business', label: 'Business' },
      { id: 'education', label: 'Education' },
      { id: 'content', label: 'Content' },
      { id: 'image', label: 'Images' },
      { id: 'career', label: 'Career' },
    ],
    allTools: 'All AI tools',
    copyBtn: 'Copy prompt',
    copiedBtn: 'Copied!',
    customizeBtn: 'Customize',
    emptyTitle: 'No matching prompts found',
    emptyDesc: 'Try a different keyword or reset the active filters.',
    emptyReset: 'Show all prompts',
    savedEmptyTitle: 'No saved prompts yet',
    savedEmptyDesc: 'Tap the heart icon on any prompt card to keep it handy here.',
    collectionsHeading: 'Curated Prompt Collections',
    collectionsSub: 'Practical prompt packs organized around your daily goals.',
    viewPromptsInCol: 'Browse prompts',
  },
} as const;

export function getCategoryLabel(cat: PromptCategory, lang: Language): string {
  const t = UI_COPY[lang];
  switch (cat) {
    case 'business':
      return t.catBusiness;
    case 'education':
      return t.catEducation;
    case 'content':
      return t.catContent;
    case 'image':
      return t.catImage;
    case 'career':
      return t.catCareer;
    case 'daily':
      return t.catDaily;
    default:
      return lang === 'si' ? 'සියල්ල' : 'All';
  }
}
