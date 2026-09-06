import Header from './Header';
import Dish from './Dish';


const menuData = [
  { id: 1, name: 'Doro Wat', price: 350 },
  { id: 2, name: 'Shiro Tegabino', price: 180 },
  { id: 3, name: 'Special Kitfo', price: 420 },
  { id: 4, name: 'Beyaynetu', price: 220 }
];

export default function App() {
  return (
    <main style={{ maxWidth: '500px', margin: '0 auto', padding: '0 20px' }}>
      <Header />
      <h2>Menu</h2>
      {menuData.map((dish) => (
        <Dish key={dish.id} name={dish.name} price={dish.price} />
      ))}
    </main>
  );
}