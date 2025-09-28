# 🌾 AgroVision - Smart Farming Platform

<div align="center">
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge&logo=shadcnui&logoColor=white" alt="shadcn/ui" />
</div>

<div align="center">
  <h3>🚀 Revolutionize your farming with AI-driven insights, real-time monitoring, and smart recommendations for maximum yield and sustainability.</h3>
</div>

---

## 📋 Table of Contents

- [🌟 Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [🚀 Quick Start](#-quick-start)
- [📁 Project Structure](#-project-structure)
- [🎯 Key Components](#-key-components)
- [📱 Screenshots](#-screenshots)
- [🔧 Configuration](#-configuration)
- [📚 API Documentation](#-api-documentation)
- [🧪 Testing](#-testing)
- [🚀 Deployment](#-deployment)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## 🌟 Features

### 🌤️ **Smart Weather Forecasting**
- Real-time weather data integration
- 7-day weather predictions
- Weather-based farming recommendations
- Severe weather alerts and notifications

### 🗺️ **Interactive Farm Mapping**
- Live GPS location tracking
- Satellite and map view toggle
- Interactive farm markers with detailed sensor data
- Real-time soil moisture and temperature monitoring
- Crop field status tracking

### 🛒 **Agricultural Marketplace**
- Integrated shopping platform for farming supplies
- Smart product recommendations
- Price comparison and deals
- Direct supplier connections

### 🌱 **Soil & Crop Intelligence**
- AI-powered soil analysis
- Crop recommendation system
- Growth stage monitoring
- Yield prediction analytics

### 📸 **Plant Disease Detection**
- AI-powered plant classification
- Disease identification using computer vision
- Treatment recommendations
- Preventive care suggestions

### 📅 **Farmer's Smart Calendar**
- Season-based crop recommendations
- Regional farming adaptations (North, South, East, West India)
- Monthly farming task schedules
- Watering schedules with smart recommendations
- Weather alerts and farming tips
- Interactive crop growth stage tracking

### 🤖 **AI Chat Assistant**
- 24/7 farming support and guidance
- Personalized recommendations
- Problem-solving assistance
- Best practices sharing

### 📊 **Analytics Dashboard**
- Farm performance metrics
- Yield tracking and analysis
- Resource usage optimization
- ROI calculations

---

## 🛠️ Tech Stack

### **Frontend**
- **React 18** - Modern UI library with hooks
- **TypeScript** - Type-safe JavaScript
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful, accessible UI components

### **UI/UX Libraries**
- **Radix UI** - Headless UI components
- **Lucide React** - Beautiful icons
- **Framer Motion** - Smooth animations
- **React Query** - Server state management

### **Development Tools**
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Node.js** - Runtime environment
- **Git** - Version control

### **APIs & Services**
- **Weather API** - Real-time weather data
- **Google Maps** - Location services
- **Plant Disease Detection API** - AI-powered image recognition
- **Soil Analysis API** - Smart farming insights

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/SHASHWAT0202/agrovision-growsmart-main.git
   cd agrovision-growsmart-main
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Configure your `.env` file:
   ```env
   VITE_API_BASE_URL=your_api_base_url
   VITE_GOOGLE_MAPS_API_KEY=your_google_maps_key
   VITE_WEATHER_API_KEY=your_weather_api_key
   ```

4. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:8080`

### Build for Production

```bash
npm run build
# or
yarn build
```

---

## 📁 Project Structure

```
agrovision-growsmart-main/
├── 📁 public/                    # Static assets
│   ├── 🖼️ *.svg                 # Icons and illustrations
│   ├── 🤖 robots.txt            # SEO configuration
│   └── 📄 index.html            # HTML template
├── 📁 src/                      # Source code
│   ├── 📁 components/           # React components
│   │   ├── 🎨 ui/              # Reusable UI components
│   │   ├── 🌤️ WeatherForecast.tsx
│   │   ├── 🗺️ GoogleMapsFixed.tsx
│   │   ├── 🛒 ShopSection.tsx
│   │   ├── 🌱 SoilCropSection.tsx
│   │   ├── 📸 PlantClassification.tsx
│   │   ├── 📅 FarmerCalendar.tsx
│   │   ├── 🤖 AIChat.tsx
│   │   └── ⚡ ... more components
│   ├── 📁 pages/               # Page components
│   │   ├── 🏠 Index.tsx        # Main landing page
│   │   └── 🚫 NotFound.tsx     # 404 page
│   ├── 📁 hooks/               # Custom React hooks
│   ├── 📁 lib/                 # Utility functions
│   ├── 📁 config/              # Configuration files
│   ├── 📁 data/                # Static data and types
│   ├── 📁 assets/              # Images and media
│   ├── 🎨 index.css            # Global styles
│   └── ⚡ main.tsx             # App entry point
├── 📄 package.json             # Dependencies and scripts
├── ⚙️ vite.config.ts           # Vite configuration
├── 🎨 tailwind.config.ts       # Tailwind CSS config
├── 📝 tsconfig.json            # TypeScript config
└── 📖 README.md                # Documentation
```

---

## 🎯 Key Components

### 🏠 **HeroSection**
- Engaging landing page with call-to-action buttons
- Animated statistics and performance metrics
- Responsive design with beautiful gradients

### 🌤️ **WeatherForecast**
- Real-time weather data display
- 7-day forecast with detailed information
- Weather-based farming recommendations

### 🗺️ **GoogleMapsFixed**
- Interactive farm mapping system
- GPS location tracking
- Satellite/map view toggle
- Real-time sensor data visualization

### 📅 **FarmerCalendar**
- Seasonal farming recommendations
- Regional adaptations for different climates
- Monthly task scheduling
- Interactive crop information modals

### 🤖 **AIChat**
- Intelligent farming assistant
- Real-time problem solving
- Personalized recommendations

---

## 📱 Screenshots

### 🏠 **Landing Page**
Beautiful hero section with call-to-action buttons and farm statistics.

### 🌤️ **Weather Dashboard**
Real-time weather monitoring with forecasting capabilities.

### 🗺️ **Interactive Farm Map**
Live GPS tracking with sensor data visualization.

### 📅 **Smart Farmer Calendar**
Season-based recommendations with regional adaptations.

### 🛒 **Agricultural Marketplace**
Integrated shopping platform for farming supplies.

---

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# API Configuration
VITE_API_BASE_URL=https://your-api-domain.com
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
VITE_WEATHER_API_KEY=your_weather_api_key

# Feature Flags
VITE_ENABLE_AI_CHAT=true
VITE_ENABLE_PLANT_DETECTION=true
VITE_ENABLE_SOIL_ANALYSIS=true
```

### Customization

#### Colors & Themes
Customize your color palette in `src/index.css`:

```css
:root {
  --primary: 142 76% 36%;        /* Agricultural Green */
  --secondary: 200 85% 60%;      /* Sky Blue */
  --accent: 35 85% 65%;          /* Earth Tone */
}
```

#### Component Configuration
Modify component behavior in `src/config/api.ts`:

```typescript
export const API_CONFIG = {
  BASE_URL: process.env.VITE_API_BASE_URL,
  ENDPOINTS: {
    WEATHER: '/api/weather',
    SOIL: '/api/soil-analysis',
    PLANTS: '/api/plant-detection'
  }
};
```

---

## 📚 API Documentation

### Weather API
```typescript
GET /api/weather
Parameters:
  - lat: number (latitude)
  - lng: number (longitude)
  - days: number (forecast days)
```

### Soil Analysis API
```typescript
POST /api/soil-analysis
Body:
  - image: File (soil image)
  - location: { lat: number, lng: number }
```

### Plant Detection API
```typescript
POST /api/plant-detection
Body:
  - image: File (plant image)
  - confidence: number (0-1)
```

---

## 🧪 Testing

### Running Tests
```bash
npm run test
# or
yarn test
```

### Test Coverage
```bash
npm run test:coverage
# or
yarn test:coverage
```

### E2E Tests
```bash
npm run test:e2e
# or
yarn test:e2e
```

---

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Configure environment variables
4. Deploy!

### Netlify
1. Build the project: `npm run build`
2. Upload the `dist` folder to Netlify
3. Configure environment variables
4. Deploy!

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 8080
CMD ["npm", "run", "preview"]
```

### Manual Deployment
```bash
npm run build
# Upload dist/ folder to your hosting provider
```

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Development Guidelines
- Follow TypeScript best practices
- Use conventional commit messages
- Add tests for new features
- Update documentation as needed
- Ensure mobile responsiveness

### Code Style
- Use ESLint and Prettier for formatting
- Follow React best practices
- Use meaningful component and variable names
- Add JSDoc comments for complex functions

---

## 📊 Performance

### Lighthouse Scores
- **Performance**: 95+
- **Accessibility**: 100
- **Best Practices**: 100
- **SEO**: 95+

### Optimization Features
- **Code Splitting** - Lazy loading of components
- **Image Optimization** - WebP format with fallbacks
- **Bundle Analysis** - Tree-shaking and dead code elimination
- **Caching Strategy** - Service worker implementation

---

## 🔐 Security

### Security Features
- **HTTPS Enforcement** - All API calls use HTTPS
- **Environment Variables** - Sensitive data protection
- **Input Validation** - XSS and injection prevention
- **CORS Configuration** - Proper cross-origin setup

---

## 📈 Analytics

Track your application performance with:
- **Google Analytics** integration
- **User behavior tracking**
- **Error monitoring** with Sentry
- **Performance metrics** collection

---

## 🌐 Browser Support

- **Chrome** 88+
- **Firefox** 85+
- **Safari** 14+
- **Edge** 88+
- **Mobile browsers** (iOS Safari, Chrome Mobile)

---

## 🆘 Troubleshooting

### Common Issues

#### Development Server Won't Start
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### Environment Variables Not Working
- Ensure variables start with `VITE_`
- Restart development server after changes
- Check `.env` file is in root directory

#### Map Not Loading
- Verify Google Maps API key is valid
- Check API key has proper permissions
- Ensure billing is enabled for Maps API

---

## 📞 Support

Need help? We're here for you!

- **📧 Email**: support@agrovision.com
- **💬 Discord**: [Join our community](https://discord.gg/agrovision)
- **🐛 Issues**: [GitHub Issues](https://github.com/SHASHWAT0202/agrovision-growsmart-main/issues)
- **📚 Docs**: [Full Documentation](https://docs.agrovision.com)

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **React Team** - For the amazing React framework
- **Vercel** - For the hosting platform
- **shadcn** - For the beautiful UI components
- **Tailwind CSS** - For the utility-first CSS framework
- **All Contributors** - For making this project better

---

## 🚀 What's Next?

### Upcoming Features
- 🤖 **Advanced AI Integration** - More intelligent farming recommendations
- 📱 **Mobile App** - React Native mobile application
- 🌐 **Multi-language Support** - International farmer support
- 📊 **Advanced Analytics** - Deeper insights and reporting
- 🔗 **IoT Integration** - Direct sensor connectivity
- 🌍 **Satellite Imagery** - Advanced crop monitoring

---

<div align="center">
  <h2>🌾 Happy Farming! 🚜</h2>
  <p>Built with ❤️ for farmers worldwide by the AgroVision team</p>
  
  <a href="https://github.com/SHASHWAT0202/agrovision-growsmart-main">⭐ Star this repository</a> •
  <a href="https://github.com/SHASHWAT0202/agrovision-growsmart-main/fork">🍴 Fork this project</a> •
  <a href="https://github.com/SHASHWAT0202/agrovision-growsmart-main/issues">🐛 Report a bug</a>
</div>