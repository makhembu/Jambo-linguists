
import React from 'react';
import { FileText, Plus, Trash2 } from 'lucide-react';

export interface LineItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
  date: string;
}

interface LineItemsSectionProps {
  items: LineItem[];
  setItems: React.Dispatch<React.SetStateAction<LineItem[]>>;
}

export const LineItemsSection = ({ items, setItems }: LineItemsSectionProps) => {
  
  const handleItemChange = (id: string, field: keyof LineItem, value: string | number) => {
      setItems(prev => prev.map(item => {
          if (item.id !== id) return item;
          const updates: any = { [field]: value };
          if (field === 'quantity' || field === 'rate') {
              const qty = field === 'quantity' ? Number(value) : item.quantity;
              const rate = field === 'rate' ? Number(value) : item.rate;
              updates.amount = qty * rate;
          }
          return { ...item, ...updates };
      }));
  };

  const addItem = () => {
      setItems(prev => [...prev, { id: Date.now().toString(), description: '', quantity: 1, rate: 0, amount: 0, date: new Date().toISOString().split('T')[0] }]);
  };

  const removeItem = (id: string) => {
      if (items.length > 1) {
          setItems(prev => prev.filter(i => i.id !== id));
      }
  };

  return (
    <div className="bg-white dark:bg-[#13111c] p-5 rounded-xl border border-gray-200 dark:border-white/10 shadow-sm">
        <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <FileText size={16} className="text-jambo-600" /> Items
            </h3>
            <button onClick={addItem} className="text-xs font-bold text-jambo-600 hover:text-jambo-700 flex items-center gap-1">
                <Plus size={14} /> Add Item
            </button>
        </div>
        
        <div className="space-y-3">
            {/* Header Row */}
            <div className="grid grid-cols-12 gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 px-2">
                <div className="col-span-4">Description</div>
                <div className="col-span-2">Date</div>
                <div className="col-span-2">Qty</div>
                <div className="col-span-2">Rate</div>
                <div className="col-span-2 text-right">Amount</div>
            </div>

            {items.map((item) => (
                <div key={item.id} className="grid grid-cols-12 gap-2 items-center group">
                    <div className="col-span-4 flex items-center gap-2">
                        <button onClick={() => removeItem(item.id)} className="text-gray-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
                            <Trash2 size={14} />
                        </button>
                        <input 
                            className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-md px-2 py-1.5 text-sm dark:text-white"
                            value={item.description}
                            onChange={(e) => handleItemChange(item.id, 'description', e.target.value)}
                            placeholder="Service Description"
                        />
                    </div>
                    <div className="col-span-2">
                        <input 
                            type="date"
                            className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-md px-2 py-1.5 text-xs sm:text-sm dark:text-white"
                            value={item.date}
                            onChange={(e) => handleItemChange(item.id, 'date', e.target.value)}
                        />
                    </div>
                    <div className="col-span-2">
                        <input 
                            type="number"
                            className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-md px-2 py-1.5 text-sm dark:text-white text-center"
                            value={item.quantity}
                            onChange={(e) => handleItemChange(item.id, 'quantity', e.target.value)}
                        />
                    </div>
                    <div className="col-span-2">
                        <input 
                            type="number"
                            className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-md px-2 py-1.5 text-sm dark:text-white text-right"
                            value={item.rate}
                            onChange={(e) => handleItemChange(item.id, 'rate', e.target.value)}
                        />
                    </div>
                    <div className="col-span-2 text-right font-mono text-sm font-bold text-gray-700 dark:text-gray-300">
                        £{item.amount.toFixed(2)}
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
};
