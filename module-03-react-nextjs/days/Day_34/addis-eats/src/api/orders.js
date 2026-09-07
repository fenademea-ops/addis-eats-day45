export async function placeOrder(order) {
  await new Promise((resolve) => setTimeout(resolve, 500));

  if (order.phone.endsWith("0000")) {
    const error = new Error("Please correct the highlighted delivery details.");
    error.status = 422;
    error.fieldErrors = {
      phone: "This TeleBirr number cannot receive orders.",
    };
    throw error;
  }

  const savedOrders = JSON.parse(localStorage.getItem("addis-eats-orders") || "[]");
  const savedOrder = { ...order, id: crypto.randomUUID(), createdAt: new Date().toISOString() };
  localStorage.setItem("addis-eats-orders", JSON.stringify([...savedOrders, savedOrder]));

  return savedOrder;
}
