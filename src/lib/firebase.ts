/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  onAuthStateChanged, 
  User 
} from 'firebase/auth';
import { 
  getFirestore, 
  collection, 
  doc, 
  setDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy, 
  onSnapshot 
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Authentication & OAuth Setup
export const googleProvider = new GoogleAuthProvider();
// Google Calendar scope requested by user
googleProvider.addScope('https://www.googleapis.com/auth/calendar');

let isSigningIn = false;
let cachedAccessToken: string | null = null;

// Error Handling Structures
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
    },
    operationType,
    path
  };
  console.error('Firestore Error Details:', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Memory token cache methods
export const initAuth = (
  onAuthSuccess?: (user: User, token: string) => void,
  onAuthFailure?: () => void
) => {
  return onAuthStateChanged(auth, async (user: User | null) => {
    if (user) {
      if (cachedAccessToken) {
        if (onAuthSuccess) onAuthSuccess(user, cachedAccessToken);
      } else if (!isSigningIn) {
        cachedAccessToken = null;
        if (onAuthFailure) onAuthFailure();
      }
    } else {
      cachedAccessToken = null;
      if (onAuthFailure) onAuthFailure();
    }
  });
};

export const googleSignIn = async (): Promise<{ user: User; accessToken: string } | null> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, googleProvider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) {
      throw new Error('Failed to get Google OAuth access token from login.');
    }

    cachedAccessToken = credential.accessToken;
    return { user: result.user, accessToken: cachedAccessToken };
  } catch (error: unknown) {
    console.error('Google Sign-In Error:', error);
    throw error;
  } finally {
    isSigningIn = false;
  }
};

export const getAccessToken = async (): Promise<string | null> => {
  return cachedAccessToken;
};

export const logout = async () => {
  await auth.signOut();
  cachedAccessToken = null;
};

// Firestore Lead Management Helpers
export interface LeadDoc {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: string;
  status: 'HIGH_QUEUE_PRIORITY' | 'IN_PROGRESS' | 'ACCEPTED' | 'ARCHIVED';
  scheduledTime?: string;
  calendarEventId?: string;
  ownerId?: string;
}

// 1. Save (Create) Lead
export const createLead = async (lead: Omit<LeadDoc, 'id' | 'timestamp' | 'status'>): Promise<LeadDoc> => {
  const leadId = `LEAD-${Math.random().toString(36).substring(2, 11).toUpperCase()}`;
  const path = `leads/${leadId}`;
  
  const newLead: LeadDoc = {
    ...lead,
    id: leadId,
    timestamp: new Date().toISOString(),
    status: 'HIGH_QUEUE_PRIORITY',
    ownerId: auth.currentUser?.uid || 'anonymous'
  };

  try {
    const docRef = doc(db, 'leads', leadId);
    await setDoc(docRef, newLead);
    return newLead;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
    throw error;
  }
};

// 2. Fetch Leads (realtime listener)
export const subscribeLeads = (
  onLeadsUpdate: (leads: LeadDoc[]) => void,
  onError: (error: Error) => void
) => {
  const path = 'leads';
  const leadsQuery = query(collection(db, 'leads'), orderBy('timestamp', 'desc'));
  
  return onSnapshot(leadsQuery, (snapshot) => {
    const leadsList: LeadDoc[] = [];
    snapshot.forEach((doc) => {
      leadsList.push(doc.data() as LeadDoc);
    });
    onLeadsUpdate(leadsList);
  }, (error) => {
    handleFirestoreError(error, OperationType.LIST, path);
    onError(error as Error);
  });
};

// 3. Update Lead Status or Calendar fields
export const updateLead = async (leadId: string, updates: Partial<Omit<LeadDoc, 'id'>>): Promise<void> => {
  const path = `leads/${leadId}`;
  try {
    const docRef = doc(db, 'leads', leadId);
    await updateDoc(docRef, updates);
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
    throw error;
  }
};

// 4. Delete Lead
export const deleteLead = async (leadId: string): Promise<void> => {
  const path = `leads/${leadId}`;
  try {
    const docRef = doc(db, 'leads', leadId);
    await deleteDoc(docRef);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
    throw error;
  }
};
