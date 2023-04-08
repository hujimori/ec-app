import Link from 'next/link';

// 仮の商品データ
const products = [
  { id: 1, name: '商品1', description: '商品1の説明', price: 1000 },
  { id: 2, name: '商品2', description: '商品2の説明', price: 2000 },
];

const ProductList = () => {
  <div>
    <h1>商品リスト</h1>
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <link href={`/products/${product.id}`}>
            <a>{product.name}</a>
          </link>
        </li>
      ))}
    </ul>
  </div>;
};

export default ProductList;
