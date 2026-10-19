import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "../../HOMEWORK/store.js";
import { addItem, removeItem, clearCart, type Product } from "../../HOMEWORK/cartSlice.js";

const CartPage = () => {
    const { items, totalPrice } = useSelector((state: RootState) => state.cart);
    const dispatch = useDispatch<AppDispatch>();

    const sampleProducts: Product[] = [
        { id: 1, name: "Laptop", price: 12000 },
        { id: 2, name: "Keyboard", price: 2500 },
        { id: 3, name: "tablet PC", price: 3400 },
    ];

    return (
        <div className="max-w-5xl mx-auto px-4 py-10 font-sans text-gray-800">
            
            <section className="mb-16 bg-white border border-purple-100 rounded-3xl p-8 shadow-xl shadow-purple-900/5">
                <div className="mb-6 border-b border-purple-50 pb-4">
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">
                        Shopping <span className="text-purple-600">Cart</span>
                    </h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                    
                    <div className="bg-gradient-to-br from-purple-50/50 to-emerald-50/40 border border-purple-100 p-6 rounded-2xl shadow-inner">
                        
                        <div className="mb-4">
                            <span className="text-sm font-semibold text-gray-500">Total amount:</span>
                            <p className="text-2xl font-black text-emerald-600">{totalPrice} ₴</p>
                        </div>

                        <div>
                            <span className="text-sm font-semibold text-gray-500 mb-2 block">Items in the cart ({items.length}):</span>
                            {items.length === 0 ? (
                                <p className="text-sm text-gray-400 italic">Cart is empty</p>
                            ) : (
                                <ul className="space-y-2 max-h-60 overflow-y-auto pr-2">
                                    {items.map((item) => (
                                        <li key={item.id} className="flex items-center justify-between bg-white p-3 rounded-xl border border-purple-100 shadow-sm">
                                            <div>
                                                <p className="font-bold text-sm text-gray-800">{item.name}</p>
                                                <p className="text-xs text-purple-600 font-medium">{item.price} ₴</p>
                                            </div>
                                            <button 
                                                onClick={() => dispatch(removeItem(item.id))}
                                                className="bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold py-1.5 px-3 rounded-lg transition-colors"
                                            >
                                                Delete
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {items.length > 0 && (
                            <button 
                                onClick={() => dispatch(clearCart())}
                                className="w-full mt-6 bg-purple-900 hover:bg-purple-950 text-white font-bold py-2.5 px-4 rounded-xl transition-colors text-sm shadow-md shadow-purple-900/20"
                            >
                                Clear entire cart
                            </button>
                        )}
                    </div>

                    <div className="flex flex-col gap-4">
                        <span className="text-xs font-bold uppercase tracking-wider text-purple-600/70">Adding products</span>
                        <div className="grid grid-cols-1 gap-3">
                            {sampleProducts.map((prod) => (
                                <div key={prod.id} className="flex items-center justify-between bg-white border border-purple-100 p-4 rounded-2xl shadow-sm hover:border-purple-200 transition-all">
                                    <div>
                                        <h3 className="font-bold text-gray-800">{prod.name}</h3>
                                        <p className="text-sm text-emerald-600 font-semibold">{prod.price} ₴</p>
                                    </div>
                                    <button 
                                        onClick={() => dispatch(addItem(prod))}
                                        className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2.5 px-4 rounded-xl transition-colors shadow-md shadow-emerald-600/20"
                                    >
                                        + (add)
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </section>

        </div>
    );
};

export default CartPage;