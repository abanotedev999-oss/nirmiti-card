// ✏️ Edit everything about Nirmiti in this one file.
export const PROFILE = {
  name: 'Nirmiti Dangre',
  initial: 'N',
  photo: 'nirmiti.jpg',            // file inside the /public folder
  phone: '+917888196020',
  phoneLabel: '+91 78881 96020',
  email: 'nirmitidangre01@gmail.com',
  instagram: 'nivista.14',
  bloodGroup: 'B+',
  area: 'Badlapur West, Maharashtra',
  areaShort: 'Badlapur West',
  zodiac: 'Scorpio',
  aboutText:
    '“Hi, I’m Nirmiti. Thank you for taking a moment to help me. Please call my family they’ll take care of the rest.”',
  primaryContact: { name: 'Mom', phone: '+919921117090' },
};

export interface Contact {
  initial: string;
  name: string;
  label: string;
  phone: string; // international format, digits only after +
}

export const CONTACTS: Contact[] = [
  { initial: 'M', name: 'Mom', label: '+91 99211 17090', phone: '+919921117090' },
  { initial: 'B', name: 'Brother', label: '+91 84509 92730', phone: '+918450992730' },
  { initial: 'N', name: 'Nirmiti', label: '+91 78881 96020', phone: '+917888196020' },
];

export const QUICK_DIAL = [
  { number: '108', label: 'AMBULANCE', style: 'red' },
  { number: '112', label: 'EMERGENCY', style: 'red' },
  { number: '100', label: 'POLICE', style: 'white' },
];

export type Lang = 'en' | 'mr';

export const TEXT: Record<Lang, { title: string; steps: { title: string; desc: string }[] }> = {
  en: {
    title: 'HOW YOU CAN HELP',
    steps: [
      { title: 'Stay calm and check on her', desc: "Is she awake and breathing? Don't move her if she may be injured." },
      { title: 'Serious? Call an ambulance first', desc: 'Dial 108 for an ambulance or 112 for any emergency.' },
      { title: 'Then call her family', desc: 'Tap Mom or her brother below and tell them where she is.' },
    ],
  },
  mr: {
    title: 'तुम्ही कशी मदत करू शकता',
    steps: [
      { title: 'शांत राहा आणि तिची तपासणी करा', desc: 'ती शुद्धीत आहे का आणि श्वास घेत आहे का ते पाहा. दुखापत झाली असल्यास तिला हलवू नका.' },
      { title: 'गंभीर असल्यास आधी रुग्णवाहिका बोलवा', desc: 'रुग्णवाहिकेसाठी 108 किंवा कोणत्याही आणीबाणीसाठी 112 वर कॉल करा.' },
      { title: 'मग तिच्या कुटुंबाला कॉल करा', desc: 'खालील आई किंवा भावावर टॅप करा आणि ती कुठे आहे ते सांगा.' },
    ],
  },
};