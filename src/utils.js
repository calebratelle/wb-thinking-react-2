// Generate a unique ID.
// IDs are auto-incremented, starting at 0 (just like auto-incrementing database keys).
function* getId() {
  let id = 0;
  while (true) {
    id += 1;
    yield id;
  }
}

// Format a number as USD.
function formatCurrency(number) {
  return new Intl.NumberFormat('us-EN', { style: 'currency', currency: 'USD' }).format(number);
}

export { formatCurrency, getId };
