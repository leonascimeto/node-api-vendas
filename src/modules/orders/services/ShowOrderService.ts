import AppError from '@shared/errors/AppError';

//repositories
import { getCustomRepository } from 'typeorm';
import { OrderRepository } from '../typeorm/repositories/OrdersRepository';

//entities
import Order from '../typeorm/entities/Order';

interface IRequest {
  id: string;
}

class ShowOrderService {
  public async execute({ id }: IRequest): Promise<Order> {
    const ordersRepository = getCustomRepository(OrderRepository);

    const order = await ordersRepository.findById(id);
    if (!order) {
      throw new AppError('Order not found.');
    }

    return order;
  }
}

export default ShowOrderService;
