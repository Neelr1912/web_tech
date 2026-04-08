/**
 * Generates and downloads a PDF-style invoice using the browser's print dialog.
 * No external library required — uses a hidden iframe with styled HTML.
 */
export const generateInvoice = (order) => {
  const {
    id,
    orderDate,
    items,
    total,
    shippingAddress,
    customerName,
    status,
  } = order;

  const addr = shippingAddress || {};
  const name = customerName || addr.fullName || 'Customer';
  const date = new Date(orderDate).toLocaleDateString('en-IN', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  const itemRows = items
    .map(
      (item, i) => `
      <tr>
        <td>${i + 1}</td>
        <td>${item.name}</td>
        <td style="text-align:center">${item.quantity}</td>
        <td style="text-align:right">₹${item.price.toLocaleString('en-IN')}</td>
        <td style="text-align:right">₹${(item.price * item.quantity).toLocaleString('en-IN')}</td>
      </tr>`
    )
    .join('');

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8"/>
  <title>Invoice #${id}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: Arial, sans-serif; font-size: 14px; color: #212121; padding: 40px; }
    .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 32px; }
    .company-name { font-size: 28px; font-weight: 700; color: #7CB342; }
    .company-sub { font-size: 13px; color: #757575; margin-top: 4px; }
    .invoice-title { font-size: 22px; font-weight: 700; color: #558B2F; text-align: right; }
    .invoice-meta { text-align: right; font-size: 13px; color: #616161; margin-top: 6px; }
    .divider { border: none; border-top: 2px solid #AED581; margin: 20px 0; }
    .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 28px; }
    .info-box h4 { font-size: 12px; text-transform: uppercase; color: #757575; letter-spacing: 1px; margin-bottom: 8px; }
    .info-box p { font-size: 14px; line-height: 1.7; }
    table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
    thead tr { background-color: #7CB342; color: #fff; }
    thead th { padding: 10px 12px; text-align: left; font-size: 13px; }
    tbody tr:nth-child(even) { background-color: #F5F5F5; }
    tbody td { padding: 10px 12px; border-bottom: 1px solid #E0E0E0; }
    .totals { margin-left: auto; width: 280px; }
    .totals-row { display: flex; justify-content: space-between; padding: 8px 0; font-size: 14px; color: #616161; }
    .totals-grand { display: flex; justify-content: space-between; padding: 12px 0; font-size: 18px; font-weight: 700; color: #212121; border-top: 2px solid #AED581; margin-top: 4px; }
    .footer { margin-top: 48px; text-align: center; font-size: 12px; color: #9E9E9E; }
    .status-badge { display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; background-color: #E8F5E9; color: #4CAF50; }
    @media print { body { padding: 20px; } }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <div class="company-name">⚡ AgriLectro Mart</div>
      <div class="company-sub">Agricultural Electronic Products</div>
      <div class="company-sub">support@agrilectro.com | +91 1234567890</div>
    </div>
    <div>
      <div class="invoice-title">INVOICE</div>
      <div class="invoice-meta">Invoice No: #${id}</div>
      <div class="invoice-meta">Date: ${date}</div>
      <div class="invoice-meta" style="margin-top:6px">
        <span class="status-badge">${status}</span>
      </div>
    </div>
  </div>

  <hr class="divider"/>

  <div class="info-grid">
    <div class="info-box">
      <h4>Bill To</h4>
      <p><strong>${name}</strong></p>
      <p>${addr.email || ''}</p>
      <p>${addr.phone || ''}</p>
      <p>${addr.address || ''}</p>
      <p>${[addr.city, addr.state, addr.pincode].filter(Boolean).join(', ')}</p>
    </div>
    <div class="info-box">
      <h4>Order Details</h4>
      <p>Order ID: <strong>#${id}</strong></p>
      <p>Order Date: ${date}</p>
      <p>Payment: ${addr.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Payment'}</p>
    </div>
  </div>

  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>Product</th>
        <th style="text-align:center">Qty</th>
        <th style="text-align:right">Unit Price</th>
        <th style="text-align:right">Amount</th>
      </tr>
    </thead>
    <tbody>
      ${itemRows}
    </tbody>
  </table>

  <div class="totals">
    <div class="totals-row"><span>Subtotal</span><span>₹${total.toLocaleString('en-IN')}</span></div>
    <div class="totals-row"><span>Shipping</span><span>Free</span></div>
    <div class="totals-grand"><span>Total</span><span>₹${total.toLocaleString('en-IN')}</span></div>
  </div>

  <div class="footer">
    <p>Thank you for shopping with AgriLectro Mart!</p>
    <p>For support, contact support@agrilectro.com</p>
  </div>
</body>
</html>`;

  // Open in new window and trigger print/save as PDF
  const win = window.open('', '_blank', 'width=900,height=700');
  win.document.write(html);
  win.document.close();
  win.focus();
  setTimeout(() => {
    win.print();
  }, 500);
};
