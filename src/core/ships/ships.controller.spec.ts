import { Test, TestingModule } from '@nestjs/testing';
import { ShipsController } from '@/core/ships/ships.controller';
import { ShipsService } from '@/core/ships/ships.service';
import { Ship } from '@/core/ships/entities/ship.entity';


describe('ShipsController', () => {
  let controller: ShipsController;

  const mockShip = new Ship();
  mockShip.id = 1;
  mockShip.shipName = 'Titanic';
  mockShip.shipType = 'Passenger ship';
  mockShip.buildYear = 1912;

  const mockShips = [mockShip];

  const mockUpdatedShip = { id: 1, shipName: 'Queen Mary', yearBuilt: 1936 };

  const mockShipsService = {
    findAll: jest.fn().mockResolvedValue(mockShips),
    findOne: jest.fn().mockResolvedValue(mockShip),
    create: jest.fn().mockResolvedValue(mockShip),
    update: jest.fn().mockResolvedValue(mockUpdatedShip),
    remove: jest.fn().mockResolvedValue(mockShip),
  };

  beforeEach(async () => {

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShipsController],
      providers: [
        {
          provide: ShipsService,
          useValue: mockShipsService,
        },
      ],
    }).compile();

    controller = module.get<ShipsController>(ShipsController);

  });

  describe('findAll', () => {
    it('should return an array of ships', async () => {
      const result = await controller.findAll();
      expect(result).toEqual(mockShips);
    });
  });

  describe('findOne', () => {
    it('should return a ship by ID', async () => {
      const result = await controller.findOne('1');
      expect(result).toEqual(mockShip);
    });
  });

  describe('create', () => {
    it('should create a ship', async () => {
      const newShip = {
        shipName: 'Titanic',
        shipType: 'Passenger ship',
        buildYear: 1912,
      };

      const createdShip = await controller.create(newShip);


      expect(createdShip).toBeDefined();
      expect(createdShip.id).toBeDefined();
      expect(createdShip.shipName).toBe(newShip.shipName);
      expect(createdShip.shipType).toBe(newShip.shipType);
      expect(createdShip.buildYear).toBe(newShip.buildYear);


    });
  });

  describe('update', () => {
    it('should update a ship by ID', async () => {

      const updatedShip = await controller.update('1', mockUpdatedShip);

      expect(mockShipsService.update).toHaveBeenCalledWith(mockShip.id, mockUpdatedShip);
      expect(updatedShip).toBeDefined();
      expect(updatedShip).toEqual(mockUpdatedShip);

    });
  });


  describe('delete', () => {
    it('should delete a ship by ID', async () => {

      const deletedShip = await controller.remove('1');

      expect(mockShipsService.remove).toHaveBeenCalledWith(mockShip.id);
      expect(deletedShip).toEqual(mockShip);

    });
  });
});
