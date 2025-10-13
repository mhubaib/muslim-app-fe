import { createContext, useState, useContext, useEffect } from 'react';
import { loginUser, registerUser, logoutUser, verifyEmailUser } from '../api/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceInfo from 'react-native-device-info';

const getPushToken = async (): Promise<string | null> => {
  // Implementasi untuk mendapatkan push token dari layanan notifikasi push Anda
  // Contoh: const fcmToken = await messaging().getToken();
  return null; 
};

interface AuthContextType {
  userToken: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (username: string, email: string, password: string) => Promise<boolean>;
  verifyEmail: (email: string, otp: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUserToken = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (token) {
          setUserToken(token);
        }
      } catch (e) {
        console.error('Failed to load user token', e);
      } finally {
        setIsLoading(false);
      }
    };
    loadUserToken();
    return () => {
      setUserToken(null);
    }
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const device_id = await DeviceInfo.getUniqueId();
      const push_token = await getPushToken();

      const response = await loginUser(email, password, device_id, push_token);
      if (response && response.token) {
        setUserToken(response.token);
        await AsyncStorage.setItem('userToken', response.token);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login failed', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (username: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      const deviceId = await DeviceInfo.getUniqueId();
      const pushToken = await getPushToken();

      const response = await registerUser(username, email, password, deviceId, pushToken);
      if (response && response.status === 'success') {
        // Setelah register, pengguna mungkin perlu memverifikasi email, jadi token belum tentu langsung ada
        return true;
      }
      return false;
    } catch (error) {
      console.error('Registration failed', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const verifyEmail = async (email: string, otp: string) => {
    setIsLoading(true)
    try {
      const response = await verifyEmailUser(email, otp);
      if (response.status === 'success' && response.data && response.data.token) {
        setUserToken(response.data.token);
        await AsyncStorage.setItem('userToken', response.data.token);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Email verification failed', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  }

  const logout = async () => {
    setIsLoading(true);
    try {
      const device_id = await DeviceInfo.getUniqueId();
      const access_token = userToken || '';
      await logoutUser(device_id, access_token);
      setUserToken(null);
      await AsyncStorage.removeItem('userToken');
    } catch (error) {
      console.error('Logout failed', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ userToken, isLoading, login, register, verifyEmail, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};