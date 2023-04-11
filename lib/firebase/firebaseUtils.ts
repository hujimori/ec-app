import { collection, getDoc, getDocs } from 'firebase/firestore';
import { db } from './firebaseClient';
import { Product } from '../types/products';

export const getProducts = async (): Promise<Product[]> => {
  try {
    const productsRef = collection(db, 'products');
    const snapshot = await getDocs(productsRef);
    const products = snapshot.docs.map((doc) => ({
      id: doc.id,
    })) as Product[];
    return products;
  } catch (error) {
    throw new Error('Error getting products: ' + error);
  }
};
