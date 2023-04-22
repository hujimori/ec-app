import { auth } from '@/lib/firebase/firebaseClient';
import { User, getAuth, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/router';
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';

export type UserType = User | null;

export interface AuthContextProps {
  user: UserType;
}

export interface AuthProps {
  children: ReactNode;
}

// コンテキストを作成
// AuthContextProps型のすべてのプロパティをオプションプロパティにする
const AuthContext = createContext<Partial<AuthContextProps>>({});

export const UseAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: AuthProps) => {
  const router = useRouter();
  const [user, setUser] = useState<UserType>(null);
  const isAvailableForViewing =
    router.pathname === '/login' || router.pathname === '/' || router.pathname === '/signup';
  const value = {
    user,
  };

  useEffect(() => {
    // onAuthStateChangedにauthと実行する関数を渡す
    // 認証状態が変わるたびにこの関数が呼び出される。
    const authStateChanged = onAuthStateChanged(auth, async (user: UserType) => {
      setUser(user);
    });

    return () => {
      authStateChanged;
    };
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
