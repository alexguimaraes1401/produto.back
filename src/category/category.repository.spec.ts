import { PrismaServiceMock } from '../mocks/prisma.service.mock';
import { PrismaService } from '../prisma/prisma.service';
import { CategoryRepository } from './category.repository';
import { Test, TestingModule } from '@nestjs/testing';

describe('CategoryRepository', () => {
  let repository: CategoryRepository;
  let prisma: PrismaServiceMock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryRepository,
        { provide: PrismaService, useClass: PrismaServiceMock },
      ],
    }).compile();

    repository = module.get<CategoryRepository>(CategoryRepository);
    prisma = module.get<PrismaServiceMock>(PrismaService);
  });

  it('deve ser definido', () => {
    expect(repository).toBeDefined();
  });

  it('deve criar uma categoria', async () => {
    const createData = { name: 'Test Category' };
    const category = await repository.create(createData.name);

    expect(prisma.category.create).toHaveBeenCalledWith({
      data: createData,
    });
    expect(category).toEqual({ id: 1, name: 'Test Category' });
  });

  it('deve buscar uma categoria pelo Id', async () => {
    const category = await repository.findById(1);
    expect(prisma.category.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    expect(category).toEqual({ id: 1, name: 'Test Category' });
  });

  it('deve alterar uma categoria', async () => {
    const updateData = { name: 'Updated Category' };
    const updatedCategory = await repository.update(1, updateData.name);

    expect(prisma.category.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: updateData,
    });
    expect(updatedCategory).toEqual({ id: 1, name: 'Updated Category' });
  });

  it('deve remover uma categoria', async () => {
    await repository.delete(1);
    expect(prisma.category.delete).toHaveBeenCalledWith({
      where: { id: 1 },
    });
  });
});
