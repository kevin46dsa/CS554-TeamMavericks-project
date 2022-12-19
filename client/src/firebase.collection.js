import { collection } from '@firebase/firestore';
import { db } from './firebase';

export const postCollection = collection(db, 'Posts');
export const userCollection = collection(db, 'users');
