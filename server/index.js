import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcryptjs';
import dns from 'dns';
import jwt from 'jsonwebtoken';
import { MongoClient, ObjectId } from 'mongodb';

dotenv.config();

dns.setServers(['8.8.8.8', '8.8.4.4']);

const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB || 'connectzone';
const MONGODB_COLLECTION = process.env.MONGODB_COLLECTION || 'providers';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const JWT_SECRET = process.env.JWT_SECRET;
const ADMIN_TOKEN_EXPIRY = process.env.ADMIN_TOKEN_EXPIRY || '1h';

if (!MONGODB_URI || !ADMIN_PASSWORD || !JWT_SECRET) {
  console.error('Missing required environment variables: MONGODB_URI, ADMIN_PASSWORD, and JWT_SECRET');
  process.exit(1);
}

const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 10);

const client = new MongoClient(MONGODB_URI, { serverSelectionTimeoutMS: 10000 });

try {
  await client.connect();
} catch (error) {
  console.error('MongoDB connection failed. Vérifiez MONGODB_URI, utilisateur/mot de passe Atlas, et DNS.');
  console.error(error);
  process.exit(1);
}

const db = client.db(MONGODB_DB);
const providersCollection = db.collection(MONGODB_COLLECTION);

const app = express();
app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:5173', credentials: true }));
app.use(cookieParser());
app.use(express.json({ limit: '15mb' }));

const normalizeProvider = (doc) => {
  if (!doc) return null;
  const { _id, ...rest } = doc;
  return { id: _id.toString(), ...rest };
};

const parseProviderPayload = (payload) => {
  const provider = { ...payload };

  if (typeof provider.isCertified === 'string') provider.isCertified = provider.isCertified === 'true';
  if (typeof provider.isFeatured === 'string') provider.isFeatured = provider.isFeatured === 'true';
  if (typeof provider.isPopular === 'string') provider.isPopular = provider.isPopular === 'true';
  if (typeof provider.isPublished === 'string') provider.isPublished = provider.isPublished === 'true';
  if (typeof provider.rating === 'string') provider.rating = Number(provider.rating);
  if (typeof provider.reviewCount === 'string') provider.reviewCount = Number(provider.reviewCount);

  if (typeof provider.services === 'string') {
    try {
      provider.services = JSON.parse(provider.services);
    } catch {
      provider.services = [];
    }
  }

  if (typeof provider.reviews === 'string') {
    try {
      provider.reviews = JSON.parse(provider.reviews);
    } catch {
      provider.reviews = [];
    }
  }

  return provider;
};

const authenticate = (req, res, next) => {
  const token = req.cookies?.adminToken;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    jwt.verify(token, JWT_SECRET);
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
};

app.post('/api/admin/login', async (req, res) => {
  const { password } = req.body;

  if (!password || !(await bcrypt.compare(password, passwordHash))) {
    return res.status(401).json({ error: 'Mot de passe incorrect' });
  }

  const token = jwt.sign({ role: 'admin' }, JWT_SECRET, {
    expiresIn: ADMIN_TOKEN_EXPIRY,
  });

  const cookieOptions = {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 1000 * 60 * 60, // 1h by default
  };

  res.cookie('adminToken', token, cookieOptions);
  res.json({ ok: true });
});

app.post('/api/admin/logout', (req, res) => {
  res.clearCookie('adminToken');
  res.json({ ok: true });
});

app.post('/api/admin/verify', authenticate, (req, res) => {
  res.json({ ok: true });
});

app.get('/api/providers', async (req, res) => {
  const providers = await providersCollection.find({}).toArray();
  res.json(providers.map(normalizeProvider));
});

app.get('/api/providers/:id', async (req, res) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'ID invalide' });
  }

  const provider = await providersCollection.findOne({ _id: new ObjectId(id) });

  if (!provider) {
    return res.status(404).json({ error: 'Prestataire introuvable' });
  }

  res.json(normalizeProvider(provider));
});

app.post('/api/providers', authenticate, async (req, res) => {
  const provider = parseProviderPayload({ ...req.body });
  delete provider.id;

  const result = await providersCollection.insertOne(provider);
  res.json(normalizeProvider({ _id: result.insertedId, ...provider }));
});

app.put('/api/providers/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  const provider = parseProviderPayload({ ...req.body });
  delete provider.id;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'ID invalide' });
  }

  const result = await providersCollection.findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: provider },
    { returnDocument: 'after' }
  );

  if (!result.value) {
    return res.status(404).json({ error: 'Prestataire introuvable' });
  }

  res.json(normalizeProvider(result.value));
});

app.delete('/api/providers/:id', authenticate, async (req, res) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'ID invalide' });
  }

  const result = await providersCollection.deleteOne({ _id: new ObjectId(id) });

  if (result.deletedCount === 0) {
    return res.status(404).json({ error: 'Prestataire introuvable' });
  }

  res.json({ ok: true });
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.join(__dirname, '..', 'dist');

app.use(express.static(distPath));
app.get('*', (req, res) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ error: 'Not found' });
  }
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});