'use client';
import {FirebaseProvider} from './provider';
import {initializeFirebase} from './index';

export function FirebaseClientProvider({children}: {children: React.ReactNode}) {
  const {firebaseApp, auth, firestore} = initializeFirebase();

  return (
    <FirebaseProvider value={{firebaseApp, auth, firestore}}>
      {children}
    </FirebaseProvider>
  );
}
