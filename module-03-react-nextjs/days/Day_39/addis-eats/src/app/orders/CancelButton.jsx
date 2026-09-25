import { cancelOrder } from "../actions";

export default function CancelButton({ orderId }) {
  return (
    <form action={cancelOrder.bind(null, orderId)}>
      <button className="button danger-button" type="submit">Cancel order</button>
    </form>
  );
}
