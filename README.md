# DevToolbox

A collection of free online developer tools that run entirely in your browser. Fast, free, and privacy-focused.

## 🚀 Features

- **JSON Formatter** - Format, validate, and minify JSON data
- **Base64 Encoder/Decoder** - Encode and decode Base64 strings
- **Hash Generator** - Generate MD5, SHA-1, SHA-256, and SHA-512 hashes
- More tools coming soon!

## 🔒 Privacy First

All tools run entirely in your browser using JavaScript. No data is sent to servers, ensuring complete privacy and security.

## 🛠️ Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful UI components
- **Cloudflare Pages** - Fast global deployment

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start
```

## 🏗️ Project Structure

```
src/
├── app/
│   ├── tools/          # Individual tool pages
│   ├── about/          # About page
│   ├── privacy/        # Privacy policy
│   ├── terms/          # Terms of service
│   └── page.tsx        # Home page
├── components/         # Reusable components
└── lib/               # Utility functions
```

## 🚀 Deployment

The site is configured for deployment on Cloudflare Pages:

1. Connect your GitHub repository to Cloudflare Pages
2. Set build command: `npm run build`
3. Set output directory: `out`
4. Deploy!

## 📝 License

MIT License - feel free to use this project for your own purposes.

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues and pull requests.

## 📧 Contact

For questions or feedback, please visit our [About page](/about).