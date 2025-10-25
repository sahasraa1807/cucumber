const corsOptions = {
  origin: [
    'http://localhost:3000',
    'https://cucumber-ecommerce.netlify.app',
    'https://*.netlify.app'
  ],
  credentials: true
};

app.use(cors(corsOptions));
