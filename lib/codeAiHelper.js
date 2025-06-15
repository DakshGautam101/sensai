import { GoogleGenAI } from '@google/genai';
import dedent from 'dedent';

const CODE_GEN_PROMPT = dedent(`
Generate a very basic React application in a single file called App.js. Do not use routing, do not import or reference any other files or components. All logic, components, and styles should be contained within App.js. The file must export a valid React component as the default export, e.g. export default function App() { ... }. Return only the App.js file in the response.You can use tailwindcss for styling.
`);


export async function generateCodeResponseStream(userInput) {
  if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
    throw new Error('Gemini API key is not configured');
  }

  const ai = new GoogleGenAI({
    apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
  });

  const codeConfig = {
    responseMimeType: 'application/json',
  };

  const model = 'gemini-2.0-flash-exp';
  const contents = [
    {
      role: 'user',
      parts: [{ text: `${CODE_GEN_PROMPT}\n\nUser: ${userInput}` }],
    },
  ];

  try {
    const response = await ai.models.generateContent({
      model,
      config: codeConfig,
      contents,
    });

    console.log("Full Gemini response:", JSON.stringify(response, null, 2));

    const result = response.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!result) {
      console.warn('No text returned by Gemini');
      throw new Error('Gemini returned an empty response');
    }

    console.log('Raw Gemini text:', result);

    try {
      const parsedResult = JSON.parse(result);
      if (parsedResult.files) {
        const normalizedFiles = {};
        for (const [path, fileObj] of Object.entries(parsedResult.files)) {
          const normPath = normalizeAIFilePath(path);
          normalizedFiles[normPath] = fileObj;
        }
        parsedResult.files = normalizedFiles;
      }
      return parsedResult;
    } catch (parseError) {
      console.error('JSON parse error:', parseError, '\nRaw text:', result);
      throw new Error('Invalid response format from Gemini');
    }
  } catch (error) {
    console.error('Error in generateCodeResponseStream:', error?.response?.data || error);
    throw error;
  }
}

function normalizeAIFilePath(path) {
  // Always use /src/ for React files
  if (path === '/App.js' || path === 'App.js') return '/App.js';
  if (path === '/src/App.js') return '/App.js';
  if (path === '/index.js' || path === 'index.js') return '/src/index.js';
  if (path.startsWith('/components/')) return '/src' + path;
  if (path.startsWith('components/')) return '/src/' + path;
  if (path.startsWith('/pages/')) return '/src' + path;
  if (path.startsWith('pages/')) return '/src/' + path;
  if (path.startsWith('/styles/')) return '/src' + path;
  if (path.startsWith('styles/')) return '/src/' + path;
  // Only allow root-level config and public files
  if (path === '/public/index.html' || path === '/tailwind.config.js' || path === '/postcss.config.js' || path === '/package.json') return path;
  // Fallback: put any other .js file in /src/
  if (path.endsWith('.js') && !path.startsWith('/src/')) return '/src/' + path.replace(/^\//, '');
  return path;
}
