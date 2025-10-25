'use client';
import {createContext, useContext, type ReactNode} from 'react';
import type {FirebaseApp} from 'firebase/app';
import type {Auth} from 'firebase/auth';
import type {Firestore} from 'firebase/firestore';

// Define the context shape
interface FirebaseContextType {
  firebaseApp: FirebaseApp | null;
  auth: Auth | null;
  firestore: Firestore | null;
}

// Create the context
const FirebaseContext = createContext<FirebaseContextType | null>(null);

// Custom hook to use the Firebase context
export function useFirebase() {
  const context = useContext(FirebaseContext);
  if (context === undefined) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  return context;
}

export function useFirebaseApp() {
  return useFirebase()?.firebaseApp;
}

export function useAuth() {
  return useFirebase()?.auth;
}

export function useFirestore() {
  return useFirebase()?.firestore;
}

// Provider component
export function FirebaseProvider({
  children,
  value,
}: {
  children: ReactNode;
  value: FirebaseContextType;
}) {
  return (
    <FirebaseContext.Provider value={value}>
      {children}
    </FirebaseContext.Provider>
  );
}
