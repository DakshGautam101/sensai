// lookups.js
import dedent from "dedent";

export const lookups = {
  SUGGESTIONS: [
    'Create TODO App in React',
    'Create Budget Track App',
    'Create Gym Management Portal Dashboard',
    'Create VITE App',
    'Create Login Signup Screen'
  ],

  SIGNIN_HEADING: 'Continue with new SENSAI version2.0',

  SIGNIN_SUBHEADING: 'Sign in to your account to continue using SENSAI Creative.',

  SIGN_IN_AGREEMENT_TEXT: 'By signing in, you agree to our Terms of Service and Privacy Policy',

  DEMO: {
    projectTitle: 'React ToDo App',
    projectDescription: dedent`
      A simple React ToDo app that allows users to add, edit, and delete tasks.
      Built using React and Tailwind CSS.
    `,
    generatedFiles: [
      'src/App.js',
      'src/components/TodoList.js',
      'src/components/TodoItem.js',
      'src/components/AddTodo.js',
    ],
    files: {
      'src/App.js': '',
      'src/components/TodoList.js': '',
      'src/components/TodoItem.js': '',
      'src/components/AddTodo.js': ''
    }
  },
  DEFAULT_FILES: {
    '/public/index.html': {
      code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
  <div id="root"></div>
</body>
</html>`
    },
    '/src/App.js': { code: '' },
    '/src/index.js': { code: '' },
    '/src/styles/index.css': { code: '@tailwind base;\n@tailwind components;\n@tailwind utilities;' },
    '/src/components/TodoList.js': { code: '' },
    '/src/components/TodoItem.js': { code: '' },
    '/src/components/AddTodo.js': { code: '' },
    '/src/pages/Home.js': { code: '' },
    '/tailwind.config.js': {
      code: `
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
}
      `
    },
    '/postcss.config.js': {
      code: `
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
      `
    }
  },
  DEPENDENCIES:{
  "postcss": "^8",
  "tailwindcss": "^3.4.1",
  autoprefixer: "^10.0.0",
  "uuid4": "^2.0.3",
  "tailwind-merge": "^2.4.0",
  "tailwindcss-animate": "^1.0.7",
  "lucide-react": "latest",
  "react-router-dom": "latest",
  "firebase": "^11.1.0",
  "@google/generative-ai": "^0.21.0"
}


};
