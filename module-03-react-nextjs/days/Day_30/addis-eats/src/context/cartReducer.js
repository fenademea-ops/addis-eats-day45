export const initialCartState = { items: [] };

export function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingIndex = state.items.findIndex(
        (item) => item.id === action.dish.id
      );

      if (existingIndex > -1) {
        const updatedItems = [...state.items];
        updatedItems[existingIndex] = {
          ...updatedItems[existingIndex],
          quantity: updatedItems[existingIndex].quantity + 1,
        };
        return { ...state, items: updatedItems };
      }

      return {
        ...state,
        items: [...state.items, { ...action.dish, quantity: 1 }],
      };
    }

    case "REMOVE_ITEM": {
      const existingItem = state.items.find((item) => item.id === action.id);
      if (existingItem && existingItem.quantity > 1) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.id
              ? { ...item, quantity: item.quantity - 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.id),
      };
    }

    case "CLEAR_CART":
      return { ...state, items: [] };

    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}