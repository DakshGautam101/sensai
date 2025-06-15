# Dev-AI: AI-Powered Code Generation Platform

Dev-AI is a modern web application that leverages artificial intelligence to help developers generate, manage, and export code efficiently. Built with Next.js and featuring a beautiful dark-themed UI, it provides an intuitive interface for AI-assisted code generation.

![Dev-AI Preview](/screenshot.png)

## Features

- 🤖 AI-powered code generation
- 💻 Real-time code preview
- 📦 Code export and download functionality
- 🔒 User authentication and workspace management
- 🎨 Modern, responsive dark-themed UI
- 📱 Mobile-friendly interface
- 🔄 Real-time updates with Convex backend

## Tech Stack

- **Frontend:**
  - Next.js 14
  - React
  - Tailwind CSS
  - Lucide Icons
  - React Markdown

- **Backend:**
  - Convex
  - API Routes

- **Authentication:**
  - Custom authentication system

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn
- Git

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/DakshGautam101/dev-ai.git
   cd dev-ai
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add your environment variables:
   ```
   NEXT_PUBLIC_CONVEX_URL=your_convex_url
   ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. **Code Generation:**
   - Navigate to the main interface
   - Enter your requirements in the prompt
   - Let AI generate the code for you

2. **Code Export:**
   - Open the preview tab
   - Click "Open Sandbox"
   - Copy the unique URL
   - Sign in to download your code

## Project Structure

```
dev-ai/
├── app/              # Next.js app directory
├── components/       # React components
├── context/         # React context providers
├── convex/          # Convex backend functions
├── hooks/           # Custom React hooks
├── lib/             # Utility functions
├── public/          # Static assets
└── configs/         # Configuration files
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Contact

- **Email:** [Crushgaming990@gmail.com](mailto:Crushgaming990@gmail.com)
- **GitHub:** [DakshGautam101](https://github.com/DakshGautam101)
- **LinkedIn:** [Daksh Gautam](https://www.linkedin.com/in/daksh-gautam-03abb732b/)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Next.js team for the amazing framework
- Convex for the backend infrastructure
- All contributors and users of the project
