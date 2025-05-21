const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../index');

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

describe('Authentication Tests', () => {
    it('should return 401 for unauthenticated requests', async () => {
        const response = await request(app)
            .get('/api/protected-route')
            .expect(401);

        expect(response.body).toHaveProperty('error');
    });
}); 