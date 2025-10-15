# Wanderlust Bites - Travel Food Blog

![App Preview](https://imgix.cosmicjs.com/1f1dba20-a9fc-11f0-8dcc-651091f6a7c0-photo-1569718212165-3a8278d5f624-1760556075223.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A modern, responsive travel food blog built with Next.js 15 and Cosmic CMS. Discover culinary adventures from around the world through beautifully crafted stories, stunning photography, and expert food journalism.

## ✨ Features

- **Dynamic Blog Posts** - Rich markdown content with featured images and full typography support
- **Category Filtering** - Browse posts by Street Food, Fine Dining, or Local Cuisine
- **Author Profiles** - Dedicated pages showcasing each author's bio, photo, and articles
- **Responsive Design** - Mobile-first approach with smooth transitions and hover effects
- **Image Optimization** - Fast-loading, high-quality images using imgix parameters
- **SEO-Optimized** - Proper meta tags and semantic HTML structure
- **Type-Safe** - Full TypeScript implementation with comprehensive type definitions

## Clone this Project

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](http://localhost:3040/projects/new?clone_bucket=68eff3e077ad05af8f683931&clone_repository=68eff58077ad05af8f68394c)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> Create a content model for a travel food blog with posts, authors, and categories

### Code Generation Prompt

> Based on the content model I created for "Create a content model for a travel food blog with posts, authors, and categories", now build a complete web application that showcases this content. Include a modern, responsive design with proper navigation, content display, and user-friendly interface.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## 🛠 Technologies

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Cosmic CMS** - Headless CMS for content management
- **React Markdown** - Markdown rendering with syntax highlighting
- **Bun** - Fast JavaScript runtime and package manager

## 🚀 Getting Started

### Prerequisites

- Bun installed on your system
- A Cosmic account with your bucket credentials

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd wanderlust-bites
```

2. Install dependencies:
```bash
bun install
```

3. Set up environment variables:

Create a `.env.local` file in the root directory:

```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
```

4. Run the development server:
```bash
bun run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📚 Cosmic SDK Examples

### Fetching All Posts

```typescript
import { cosmic } from '@/lib/cosmic'

const response = await cosmic.objects
  .find({ type: 'posts' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

const posts = response.objects
```

### Fetching Posts by Category

```typescript
const response = await cosmic.objects
  .find({ 
    type: 'posts',
    'metadata.categories': categoryId 
  })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

const categoryPosts = response.objects
```

### Fetching a Single Post

```typescript
const response = await cosmic.objects
  .findOne({ 
    type: 'posts',
    slug: 'post-slug'
  })
  .depth(1)

const post = response.object
```

## 🌐 Cosmic CMS Integration

This application uses Cosmic CMS to manage all content:

- **Posts** - Blog articles with title, content (markdown), featured images, authors, and categories
- **Authors** - Food journalists and bloggers with names, bios, and profile photos
- **Categories** - Content classification (Street Food, Fine Dining, Local Cuisine)

The integration uses the Cosmic SDK v1.5+ with proper depth parameters to fetch nested relationships efficiently.

## 🚀 Deployment

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables:
   - `COSMIC_BUCKET_SLUG`
   - `COSMIC_READ_KEY`
4. Deploy!

### Environment Variables for Production

Make sure to set these environment variables in your hosting platform:

- `COSMIC_BUCKET_SLUG` - Your Cosmic bucket slug
- `COSMIC_READ_KEY` - Your Cosmic read key

## 📝 Type Checking

Run TypeScript type checking before deployment:

```bash
bun run type-check
```

The `prebuild` script automatically runs type checking before every build to prevent deployment failures.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

<!-- README_END -->