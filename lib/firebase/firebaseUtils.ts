import { collection, collectionGroup, getDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from './firebaseClient';
import { Price, Product } from '../types/products';

export const getProducts = async (): Promise<Product[]> => {
  try {
    const productsRef = collection(db, 'products');
    const snapshot = await getDocs(productsRef);
    const products = (await Promise.all(
      snapshot.docs.map(async (doc) => {
        const data = doc.data();
        const pricesRef = collection(db, 'products', doc.id, 'prices');
        const pricesSnapshot = await getDocs(query(pricesRef, where('active', '==', true)));
        const prices = pricesSnapshot.docs;

        return {
          id: doc.id,
          name: data.name,
          description: data.description,
          price: prices.length > 0 ? (prices[0].data() as Price) : null,
        };
      }),
    )) as Product[];
    console.log(products);
    return products;
  } catch (error) {
    throw new Error('Error getting products: ' + error);
  }
};
