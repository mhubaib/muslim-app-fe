import { createContext, useState, useContext, useEffect } from 'react';
import { loginUser, registerUser, logoutUser, verifyEmailUser } from '../api/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuidv4 } from 'uuid';
import * as Keychain from 'react-native-keychain';

const getPushToken = async (): Promise<string | null> => {
  // Implementasi untuk mendapatkan push token dari layanan notifikasi push Anda
  // Contoh: const fcmToken = await messaging().getToken();
  return null;
};

interface UserData {
  id: string;
  email: string;
  username: string;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
}

interface AuthContextType {
  userToken: string | null;
  user: UserData | null;
  isLoading: boolean;
  hasOnBoarded: boolean;
  error: string | null;
  completeOnBoarding: () => Promise<void>;
  login: (email: string, password: string) => Promise<boolean>;
  register: (username: string, email: string, password: string) => Promise<boolean>;
  verifyEmail: (email: string, otp: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserData | null>(null); 
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasOnBoarded, setHasOnBoarded] = useState<boolean>(false);
  const [deviceId, setDeviceId] = useState<string>('');
  const [error, setError] = useState<string | null>(null)

  const completeOnBoarding = async () => {
    try {
      await AsyncStorage.setItem('hasOnBoarded', 'true');
      setHasOnBoarded(true);
    } catch (e) {
      setError('Failed to complete onboarding: ' + e);
      console.error('Failed to complete onboarding', e);
    } finally {
      setError(null)
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        let storedDeviceId = await Keychain.getGenericPassword({ service: 'appDeviceId' });
        if (!storedDeviceId) {
          const newDeviceId: string = uuidv4();
          setDeviceId(newDeviceId);
          await Keychain.setGenericPassword('app_device_id', newDeviceId, { service: 'appDeviceId' });
        } else {
          setDeviceId(storedDeviceId.password);
        }

        const onBoarded = await AsyncStorage.getItem('hasOnBoarded');
        if (onBoarded === 'true') {
          setHasOnBoarded(true);
        }

        const token = await AsyncStorage.getItem('userToken');
        const userDataString = await AsyncStorage.getItem('userData');
        if (token) {
          setUserToken(token);
        }
        if (userDataString) {
          setUser(JSON.parse(userDataString));
        }

      } catch (error) {
        setError('Failed to initialize auth: ' + error);
        console.error("Failed to initialize auth:", error);
      } finally {
        setError(null)
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const push_token = await getPushToken();

      if (!deviceId) {
        setError('Device ID not loaded yet.');
        console.error('Device ID not loaded yet.');
        return false;
      }

      const response = await loginUser(email, password, deviceId, push_token);
      if (response && response.token && response.user) {
        setUserToken(response.token);
        setUser(response.user); 
        await AsyncStorage.setItem('userToken', response.token);
        await AsyncStorage.setItem('userData', JSON.stringify(response.user)); // Simpan user data
        return true;
      }
      return false;
    } catch (error) {
      setError('Login failed: ' + error);
      console.error('Login failed', error);
      return false;
    } finally {
      setError(null);
      setIsLoading(false);
    }
  };

  const register = async (username: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      const pushToken = await getPushToken();

      if (!deviceId) {
        setError('Device ID not loaded yet.');
        console.error('Device ID not loaded yet.');
        return false;
      }

      const response = await registerUser(username, email, password, deviceId, pushToken);
      if (response && response.status === 'success') {
        return true;
      }
      return false;
    } catch (error) {
      setError('Registration failed: ' + error);
      console.error('Registration failed', error);
      return false;
    } finally {
      setError(null);
      setIsLoading(false);
    }
  };

  const verifyEmail = async (email: string, otp: string) => {
    setIsLoading(true);
    try {
      const response = await verifyEmailUser(email, otp);
      if (response.status === 'success' && response.token && response.user) { // Asumsi response juga mengembalikan user
        setUserToken(response.token);
        setUser(response.user); 
        await AsyncStorage.setItem('userToken', response.token);
        await AsyncStorage.setItem('userData', JSON.stringify(response.user)); // Simpan user data
        return true;
      }
      return false;
    } catch (error) {
      setError('Email verification failed: ' + error);
      console.error('Email verification failed', error);
      return false;
    } finally {
      setError(null);
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      const access_token = userToken || '';
      await logoutUser(deviceId, access_token); 
      setUserToken(null);
      setUser(null); 
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('userData'); 
    } catch (error) {
      setError('Logout failed: ' + error)
      console.error('Logout failed', error);
    } finally {
      setError(null)
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ userToken, user, isLoading, login, register, verifyEmail, logout, hasOnBoarded, completeOnBoarding, error }}>
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
