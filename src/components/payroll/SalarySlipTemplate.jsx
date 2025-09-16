import React from 'react';

// A new, professional design for the payslip.
export const PayslipTemplate = React.forwardRef(({ slip }, ref) => {
    if (!slip) return null;

    const structureBreakdown = slip.structure_breakdown || { breakdown: [] };
    const earnings = structureBreakdown.breakdown?.filter(c => c.type === 'Earning') || [];
    const deductions = structureBreakdown.breakdown?.filter(c => c.type === 'Deduction') || [];

    // Simple colors to avoid PDF generation errors.
    const styles = {
        page: { backgroundColor: '#FFFFFF', color: '#000000', fontFamily: 'Arial, sans-serif', fontSize: '12px' },
        hr: { borderTop: '1px solid #dee2e6' },
        th: { textAlign: 'left', padding: '8px', borderBottom: '2px solid #dee2e6', fontWeight: 'bold' },
        td: { textAlign: 'left', padding: '8px', borderBottom: '1px solid #dee2e6' },
        tdRight: { textAlign: 'right', padding: '8px', borderBottom: '1px solid #dee2e6' },
    };

    return (
        <div ref={ref} className="p-10" style={{ ...styles.page, width: '210mm' }}>
            <header className="flex justify-between items-center pb-4">
                <div>
                    <h1 className="text-3xl font-bold">Your Company Name</h1>
                    <p className="text-sm">123 Corporate Lane, Business City, 12345</p>
                </div>
                <h2 className="text-2xl font-semibold">Payslip</h2>
            </header>

            <hr style={styles.hr} />

            <section className="grid grid-cols-2 gap-4 my-6 text-sm">
                <div>
                    <p><strong>Employee Name:</strong> {slip.employee_name}</p>
                    <p><strong>Employee ID:</strong> {slip.employee_id}</p>
                </div>
                <div className="text-right">
                    <p><strong>Pay Period:</strong> July 2025</p>
                    <p><strong>Pay Date:</strong> August 1, 2025</p>
                </div>
            </section>

            <section className="grid grid-cols-2 gap-12">
                {/* Earnings Column */}
                <div>
                    <table className="w-full" style={{ borderCollapse: 'collapse' }}>
                        <thead>
                            <tr>
                                <th style={styles.th}>Earnings</th>
                                <th style={{...styles.th, textAlign: 'right'}}>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {earnings.map(item => (
                                <tr key={item.name}>
                                    <td style={styles.td}>{item.name}</td>
                                    <td style={{...styles.tdRight}}>₹{item.amount.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                
                {/* Deductions Column */}
                <div>
                     <table className="w-full" style={{ borderCollapse: 'collapse' }}>
                        <thead>
                            <tr>
                                <th style={styles.th}>Deductions</th>
                                <th style={{...styles.th, textAlign: 'right'}}>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                             {deductions.map(item => (
                                <tr key={item.name}>
                                    <td style={styles.td}>{item.name}</td>
                                    <td style={{...styles.tdRight}}>₹{item.amount.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            <section className="grid grid-cols-2 gap-12 mt-4">
                 <div className="flex justify-between items-center p-2 font-bold" style={{...styles.td, borderBottom: 'none'}}>
                    <span>Gross Earnings</span>
                    <span>₹{slip.gross_earnings}</span>
                </div>
                <div className="flex justify-between items-center p-2 font-bold" style={{...styles.td, borderBottom: 'none'}}>
                    <span>Total Deductions</span>
                    <span>₹{slip.total_deductions}</span>
                </div>
            </section>

            <hr className="my-4" style={styles.hr} />
            
            <section className="flex justify-end">
                <div className="w-1/2 p-4 bg-gray-100">
                    <div className="flex justify-between font-bold text-lg">
                        <span>Net Salary</span>
                        <span>₹{slip.net_salary}</span>
                    </div>
                </div>
            </section>
            
            <footer className="text-center text-xs text-gray-500 mt-16">
                <p>This is a computer-generated payslip and does not require a signature.</p>
            </footer>
        </div>
    );
});