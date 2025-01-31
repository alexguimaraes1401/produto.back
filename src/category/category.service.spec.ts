import { CategoryService } from './category.service';
import { CategoryRepository } from './category.repository';
import { Test, TestingModule } from '@nestjs/testing';

describe('CategoryService', () => {
  let service: CategoryService;
  let repository: CategoryRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        {
          provide: CategoryRepository,
          useValue: {
            create: jest.fn(),
            findById: jest.fn(),
            findByName: jest.fn(),
            findAll: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
    repository = module.get<CategoryRepository>(CategoryRepository);
  });

  it('deve ser definido', () => {
    expect(service).toBeDefined();
  });

  it('deve criar uma categoria', async () => {
    const createData = { name: 'test category' };
    const result = { id: 1, name: 'Test Category', createdAt: new Date('123'), updatedAt: new Date('123') };
    jest.spyOn(repository, 'findByName').mockResolvedValue(null);
    jest.spyOn(repository, 'create').mockResolvedValue(result);

    const category = await service.create(createData.name);

    expect(repository.create).toHaveBeenCalledWith(createData.name);
    expect(category).toEqual(result);
  });

  it('deve buscar uma categoria', async () => {
    const result = { id: 1, name: 'Test Category', createdAt: new Date('123'), updatedAt: new Date('123') };
    jest.spyOn(repository, 'findById').mockResolvedValue(result);

    const category = await service.findById(1);

    expect(repository.findById).toHaveBeenCalledWith(1);
    expect(category).toEqual(result);
  });

  it('deve alterar uma categoria', async () => {
    const updateData = { name: 'UPDATED CATEGORY' };
    const result = { id: 1, name: 'Test Category', createdAt: new Date('123'), updatedAt: new Date('123') };
    jest.spyOn(repository, 'findById').mockResolvedValue(result);
    jest.spyOn(repository, 'update').mockResolvedValue(result);

    const updatedCategory = await service.update(1, updateData.name);

    expect(repository.update).toHaveBeenCalledWith(1, updateData.name);
    expect(updatedCategory).toEqual(result);
  });

  it('deve remover uma categoria', async () => {
    const result = { id: 1, name: 'Test Category', createdAt: new Date('123'), updatedAt: new Date('123') };
    jest.spyOn(repository, 'findById').mockResolvedValue(result);
    jest.spyOn(repository, 'delete').mockResolvedValue(result);

    await service.delete(1);

    expect(repository.delete).toHaveBeenCalledWith(1);
  });
});
