import React, { createContext, useState, useContext, useEffect } from 'react';
import { products as initialProducts } from '../data/products';

const InventoryContext = createContext();

export const useInventory = () => {
  const context = useContext(InventoryContext);
  if (!context) throw new Error('useInventory must be used within InventoryProvider');
  return context;
};

export const InventoryProvider = ({ children }) => {
  const [inventory, setInventory] = useState(() => {
    const saved = localStorage.getItem('inventory');
    if (saved) return JSON.parse(saved);
    // seed from products data
    const seed = {};
    initialProducts.forEach(p => { seed[p.id] = p.stock; });
    return seed;
  });

  const saveInventory = (updated) => {
    setInventory(updated);
    localStorage.setItem('inventory', JSON.stringify(updated));
  };

  // Called when admin adds stock (company order)
  const increaseStock = (productId, amount) => {
    const qty = Math.max(0, parseInt(amount) || 0);
    if (qty === 0) return;
    const updated = { ...inventory, [productId]: (inventory[productId] || 0) + qty };
    saveInventory(updated);
  };

  // Called when admin manually sets stock
  const setStock = (productId, amount) => {
    const qty = Math.max(0, parseInt(amount) || 0);
    const updated = { ...inventory, [productId]: qty };
    saveInventory(updated);
  };

  // Called when customer purchases (checkout)
  const decreaseStock = (productId, qty) => {
    const current = inventory[productId] || 0;
    const updated = { ...inventory, [productId]: Math.max(0, current - qty) };
    saveInventory(updated);
  };

  const getStock = (productId) => inventory[productId] ?? 0;

  return (
    <InventoryContext.Provider value={{ inventory, increaseStock, decreaseStock, setStock, getStock }}>
      {children}
    </InventoryContext.Provider>
  );
};
