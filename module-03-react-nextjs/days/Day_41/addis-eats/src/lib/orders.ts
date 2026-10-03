export type Order = {
  id: string;
  status: string;
  total: number;
};

const orders: Record<string, Order> = {
  "1": {
    id: "1",
    status: "Preparing",
    total: 450,
  },
  "2": {
    id: "2",
    status: "Out for delivery",
    total: 650,
  },
  "3": {
    id: "3",
    status: "Delivered",
    total: 850,
  },
};

export function getOrder(id: string): Order | undefined {
  return orders[id];
}
