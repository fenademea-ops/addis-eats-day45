export default function Dish({ name, price }) {
  return (
    <div style={{
      border: '1px solid #ddd',
      padding: '12px 16px',
      borderRadius: '8px',
      marginBottom: '10px'
    }}>
      <h3 style={{ margin: '0 0 4px 0' }}>{name}</h3>
      <p style={{ margin: 0, color: '#2e7d32', fontWeight: 'bold' }}>{price} ETB</p>
    </div>
  );
}