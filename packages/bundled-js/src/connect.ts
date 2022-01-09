import axios, { AxiosInstance } from 'axios';

export interface ConnectResponse {
  id: string;
  publicKey: string;
}

export interface ConnectResult {
  id?: string;
  error?: string;
}

const CreateConnect = (
  api: AxiosInstance,
  setBundledUserId: (id: string, publicKey: string) => void
) => {
  const connect = async (username: string, password: string): Promise<ConnectResult> => {
    if (!username) {
      return { error: 'Username is required' };
    }
    if (!password) {
      return { error: 'Password is required' };
    }

    try {
      const response = await api.post<ConnectResponse>('/api/connect', undefined, {
        auth: { username, password },
      });

      const { id, publicKey } = response.data;

      setBundledUserId(id, publicKey);

      return {
        id,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return { error: error.response?.data.message || 'Connection failed.' };
      }
      return { error: 'Connection failed.' };
    }
  };
  return connect;
};

export default CreateConnect;
