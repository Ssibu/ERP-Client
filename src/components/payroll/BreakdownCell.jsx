import React from 'react';

export const BreakdownCell = ({ title, details, total }) => {
    if (!details || details.length === 0) {
        return <span className="text-muted-foreground text-xs">N/A</span>;
    }

    return (
        <div className="text-xs font-mono space-y-1 p-2 border rounded-md">
            <p className="font-semibold text-center text-sm mb-2">{title}</p>
            {details.map(item => (
                <div key={item.name} className="flex justify-between items-center">
                    <span className="text-muted-foreground mr-2 truncate">{item.name}</span>
                    <span className="font-medium">₹{item.amount.toFixed(2)}</span>
                </div>
            ))}
            <div className="flex justify-between items-center border-t pt-1 mt-1 font-bold">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
            </div>
        </div>
    );
};