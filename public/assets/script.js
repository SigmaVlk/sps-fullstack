async function loadParts() {
  const res = await fetch('/api/parts');
  const parts = await res.json();

  const partsList = document.getElementById('parts-list');
  const orderPart = document.getElementById('order-part');
  partsList.innerHTML = '';
  orderPart.innerHTML = '';

  parts.forEach(p => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${p.name} (${p.part_number})
      <button onclick="editPart(${p.id}, '${p.name}', '${p.part_number}')">✏️</button>
      <button onclick="deletePart(${p.id})">❌</button>
    `;
    partsList.appendChild(li);
    orderPart.innerHTML += `<option value="${p.id}">${p.name}</option>`;
  });
}

async function loadSuppliers() {
  const res = await fetch('/api/suppliers');
  const suppliers = await res.json();

  const suppliersList = document.getElementById('suppliers-list');
  const orderSupplier = document.getElementById('order-supplier');
  suppliersList.innerHTML = '';
  orderSupplier.innerHTML = '';

  suppliers.forEach(s => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${s.name} (${s.contact})
      <button onclick="editSupplier(${s.id}, '${s.name}', '${s.contact}')">✏️</button>
      <button onclick="deleteSupplier(${s.id})">❌</button>
    `;
    suppliersList.appendChild(li);
    orderSupplier.innerHTML += `<option value="${s.id}">${s.name}</option>`;
  });
}

async function loadOrders() {
  const res = await fetch('/api/orders');
  const orders = await res.json();

  const ordersList = document.getElementById('orders-list');
  ordersList.innerHTML = '';
  orders.forEach(o => {
    ordersList.innerHTML += `<li>${o.order_date}: ${o.part_name} od ${o.supplier_name}</li>`;
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const partForm = document.getElementById('part-form');
  const supplierForm = document.getElementById('supplier-form');
  const orderForm = document.getElementById('order-form');

  partForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('part-name').value;
    const part_number = document.getElementById('part-number').value;

    await fetch('/api/parts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, part_number })
    });

    partForm.reset();
    loadParts();
  });

  supplierForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('supplier-name').value;
    const contact = document.getElementById('supplier-contact').value;

    await fetch('/api/suppliers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, contact })
    });

    supplierForm.reset();
    loadSuppliers();
  });

  orderForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const part_id = document.getElementById('order-part').value;
    const supplier_id = document.getElementById('order-supplier').value;
    const order_date = document.getElementById('order-date').value;

    await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ part_id, supplier_id, order_date })
    });

    orderForm.reset();
    loadOrders();
  });

  loadParts();
  loadSuppliers();
  loadOrders();
});


window.editPart = (id, currentName, currentNumber) => {
  const name = prompt('Nový název dílu:', currentName);
  const part_number = prompt('Nové katalogové číslo:', currentNumber);
  if (!name || !part_number) return;

  fetch(`/api/parts/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, part_number })
  }).then(loadParts);
};

window.deletePart = (id) => {
  if (!confirm('Opravdu chcete díl smazat?')) return;

  fetch(`/api/parts/${id}`, {
    method: 'DELETE'
  }).then(loadParts);
};

window.editSupplier = (id, currentName, currentContact) => {
  const name = prompt('Nový název dodavatele:', currentName);
  const contact = prompt('Nový kontakt:', currentContact);
  if (!name) return;

  fetch(`/api/suppliers/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, contact })
  }).then(() => {
    loadSuppliers();
    loadOrders();
  });
};

window.deleteSupplier = (id) => {
  if (!confirm('Opravdu chcete dodavatele smazat?')) return;

  fetch(`/api/suppliers/${id}`, {
    method: 'DELETE'
  }).then(() => {
    loadSuppliers();
    loadOrders();
  });
};
