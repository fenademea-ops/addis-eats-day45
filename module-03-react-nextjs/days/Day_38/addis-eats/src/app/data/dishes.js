export const dishes = [
  { id: "doro-wot", name: "Doro Wot", category: "Classics", description: "Slow-cooked chicken stew with berbere, eggs, and fragrant spices.", price: 180, image: "/images/doro_wat.jpg" },
  { id: "misir-wot", name: "Misir Wot", category: "Vegetarian", description: "Velvety red lentils simmered with berbere and clarified butter.", price: 130, image: "/images/Beyaynetu.jpg" },
  { id: "kitfo", name: "Kitfo", category: "Classics", description: "Ethiopian-style seasoned beef served with ayib and greens.", price: 210, image: "/images/kitfo.jpg" },
  { id: "shiro", name: "Shiro", category: "Vegetarian", description: "Silky chickpea stew with garlic, ginger, and mild spices.", price: 140, image: "/images/Shiro_Tegabino.jpg" },
];

export function findDish(id) {
  return dishes.find((dish) => dish.id === id);
}
