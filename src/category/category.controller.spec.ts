import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';

describe('CategoryController', () => {
  let controller: CategoryController;
  let service: CategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [
        {
          provide: CategoryService,
          useValue: {
            create: jest.fn(),
            findById: jest.fn(),
            findAll: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<CategoryController>(CategoryController);
    service = module.get<CategoryService>(CategoryService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a category', async () => {
    const createData = { name: 'Test Category' };
    const result = { id: 1, name: 'Test Category', createdAt: new Date('123'), updatedAt: new Date('123') };
    jest.spyOn(service, 'create').mockResolvedValue(result);

    const category = await controller.create(createData);

    expect(service.create).toHaveBeenCalledWith(createData.name);
    expect(category).toEqual(result);
  });

  it('should get a category by id', async () => {
    const result = { id: 1, name: 'Test Category', createdAt: new Date('123'), updatedAt: new Date('123') };
    jest.spyOn(service, 'findById').mockResolvedValue(result);

    const category = await controller.findById("1");

    expect(service.findById).toHaveBeenCalledWith(1);
    expect(category).toEqual(result);
  });

  it('should get all categories', async () => {
    const result = [{ id: 1, name: 'Test Category', createdAt: new Date('123'), updatedAt: new Date('123') }];
    jest.spyOn(service, 'findAll').mockResolvedValue(result);

    const categories = await controller.findAll();

    expect(service.findAll).toHaveBeenCalled();
    expect(categories).toEqual(result);
  });

  it('should update a category', async () => {
    const updateData = { name: 'Updated Category' };
    const result = { id: 1, name: 'Test Category', createdAt: new Date('123'), updatedAt: new Date('123') };
    jest.spyOn(service, 'update').mockResolvedValue(result);

    const updatedCategory = await controller.update("1", updateData);

    expect(service.update).toHaveBeenCalledWith(1, updateData.name);
    expect(updatedCategory).toEqual(result);
  });

  it('should throw an error when creating a category with an existing name', async () => {
    const createData = { name: 'Test Category' };
    jest.spyOn(service, 'create').mockRejectedValue(new BadRequestException('Category already exists'));

    try {
      await controller.create(createData);
    } catch (e) {
      expect(e.response.message).toEqual('Category already exists');
    }
  });
});
