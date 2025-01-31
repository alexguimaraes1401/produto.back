export class PrismaServiceMock {
    category = {
      create: jest.fn().mockResolvedValue({ id: 1, name: 'Test Category' }),
      findUnique: jest.fn().mockResolvedValue({ id: 1, name: 'Test Category' }),
      update: jest.fn().mockResolvedValue({ id: 1, name: 'Updated Category' }),
      delete: jest.fn().mockResolvedValue(undefined),
    };
  }
  