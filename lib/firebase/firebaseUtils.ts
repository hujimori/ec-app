import { addDoc, collection, collectionGroup, getDoc, getDocs, onSnapshot, query, where } from 'firebase/firestore';
import { db } from './firebaseClient';
import { Price, Product } from '../types/products';
import { UseAuthContext } from '@/contexts/AuthContext';

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
          price: {
            id: prices.length > 0 ? prices[0].id : null,
            ...prices[0].data(),
          },
        };
      }),
    )) as Product[];
    console.log(products);
    return products;
  } catch (error) {
    throw new Error('Error getting products: ' + error);
  }
};
// const uc = UseAuthContext();

export const buyProducts = async (checkoutSession, uid) => {
  const customersCollection = await collection(db, 'customers', uid, 'checkout_sessions');

  // console.log(customersCollection);
  console.log(checkoutSession);

  const docRef = await addDoc(customersCollection, checkoutSession);

  onSnapshot(docRef, (snap) => {
    const data = snap.data();

    if (data) {
      const { error, url } = data;
      if (error) {
        alert(`An error  occuerd: ${error.message}`);
        document.querySelectorAll('button').forEach((b) => (b.disabled = false));
      }
      if (url) {
        window.location.assign(url);
      }
    } else {
      console.warn('No data available in the snapshot.');
    }
  });
};

// export const checkoutSession = async (checkoutSession) => {
//   try {
//     const uid = "";
//     collection(db,'customers', uid,checkout_sessions
//   } catch (error) {}
// };
