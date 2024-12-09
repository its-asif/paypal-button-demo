import React, { useState } from 'react';

function App() {
  const [formData, setFormData] = useState({
    paypalAccount: '',
    transactionType: '_xclick',
    itemName: '',
    sku: '',
    price: '',
    currency: 'USD',
    quantity: 1,
    tax: false,
    taxRate: '',
    shippingPrice: '',
    redirectUrl: '',
    sandboxMode: true,
    openInNewTab: true,
    customMessage: '',
    errorMessage: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Generate the PayPal form dynamically
    const paypalForm = document.createElement('form');
    paypalForm.action = formData.sandboxMode
      ? 'https://www.sandbox.paypal.com/cgi-bin/webscr'
      : 'https://www.paypal.com/cgi-bin/webscr';
    paypalForm.method = 'post';
    paypalForm.target = formData.openInNewTab ? '_blank' : '_self';

    const fields = [
      { name: 'business', value: formData.paypalAccount },
      { name: 'cmd', value: formData.transactionType },
      { name: 'item_name', value: formData.itemName },
      { name: 'custom', value: formData.customMessage },
      { name: 'amount', value: formData.price },
      { name: 'currency_code', value: formData.currency },
      { name: 'quantity', value: formData.quantity },
      { name: 'return', value: formData.redirectUrl },
      { name: 'shipping', value: formData.shippingPrice },
    ];

    if (formData.tax) {
      fields.push({ name: 'tax_rate', value: formData.taxRate });
    }

    fields.forEach(({ name, value }) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = name;
      input.value = value;
      paypalForm.appendChild(input);
    });

    document.body.appendChild(paypalForm);
    paypalForm.submit();
    document.body.removeChild(paypalForm);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Pricing & Payment Settings</h2>
      <form onSubmit={handleSubmit}>
        {/* PayPal Account */}
        <div>
          <label>PayPal Account (Email):</label>
          <input
            type="email"
            name="paypalAccount"
            value={formData.paypalAccount}
            onChange={handleChange}
            required
          />
        </div>

        {/* Transaction Type */}
        <div>
          <label>Transaction Type:</label>
          <select
            name="transactionType"
            value={formData.transactionType}
            onChange={handleChange}
          >
            <option value="_xclick">Buy Now</option>
            <option value="_cart">Add to Cart</option>
          </select>
        </div>

        {/* Item Details */}
        <div>
          <label>Item Name:</label>
          <input
            type="text"
            name="itemName"
            value={formData.itemName}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>SKU:</label>
          <input
            type="text"
            name="sku"
            value={formData.sku}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Currency:</label>
          <input
            type="text"
            name="currency"
            value={formData.currency}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Quantity:</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            min="1"
          />
        </div>

        {/* Tax */}
        <div>
          <label>
            <input
              type="checkbox"
              name="tax"
              checked={formData.tax}
              onChange={handleChange}
            />
            Tax?
          </label>
          {formData.tax && (
            <input
              type="number"
              name="taxRate"
              placeholder="Tax Rate (%)"
              value={formData.taxRate}
              onChange={handleChange}
            />
          )}
        </div>

        {/* Shipping Price */}
        <div>
          <label>Shipping Price:</label>
          <input
            type="number"
            name="shippingPrice"
            value={formData.shippingPrice}
            onChange={handleChange}
          />
        </div>

        {/* Redirect URL */}
        <div>
          <label>Redirect URL after Payment:</label>
          <input
            type="url"
            name="redirectUrl"
            value={formData.redirectUrl}
            onChange={handleChange}
          />
        </div>

        {/* Additional Options */}
        <div>
          <label>
            <input
              type="checkbox"
              name="sandboxMode"
              checked={formData.sandboxMode}
              onChange={handleChange}
            />
            Sandbox Mode?
          </label>
        </div>

        <div>
          <label>
            <input
              type="checkbox"
              name="openInNewTab"
              checked={formData.openInNewTab}
              onChange={handleChange}
            />
            Open in New Tab?
          </label>
        </div>

        <div>
          <label>Custom Message:</label>
          <textarea
            name="customMessage"
            value={formData.customMessage}
            onChange={handleChange}
          ></textarea>
        </div>

        <div>
          <label>Error Message:</label>
          <textarea
            name="errorMessage"
            value={formData.errorMessage}
            onChange={handleChange}
          ></textarea>
        </div>

        <button type="submit" style={{ marginTop: '20px' }}>
          Generate PayPal Form & Pay
        </button>
      </form>
    </div>
  );
}

export default App;
