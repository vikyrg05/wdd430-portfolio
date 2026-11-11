// Defines the structure of each cart item
interface CartItem {
    name?: string;
    price: number;
    qty: number;
}

// Defines the structure of the cart summary
interface CartSummary {
    subtotal: number;
    tax: number;
    total: number;
}

// Calculates the cart subtotal, tax, and total
export function formatCartTotal(
    items: CartItem[],
    taxRate: number
): CartSummary {
    const subtotal = items.reduce(
        (sum, item) => sum + item.price * item.qty,
        0
    );

    const tax = subtotal * taxRate;

    return {
        subtotal,
        tax,
        total: subtotal + tax
    };
}