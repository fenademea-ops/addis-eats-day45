import deliveryEstimate from "../utils/deliveryEstimate.js";

function DeliveryEstimate({ area }) {
  return <p className="page-copy">Estimated delivery: {deliveryEstimate(area)}</p>;
}

export default DeliveryEstimate;