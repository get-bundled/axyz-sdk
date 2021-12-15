import axios, { AxiosInstance } from 'axios';
import config from './config';

export interface ConnectResponse {
  id: string;
}

export interface ConnectResult {
  id?: string;
  error?: string;
}

const CreateConnect = (api: AxiosInstance) => {
  const connect = async (username: string, password: string): Promise<ConnectResult> => {
    if (!username) {
      throw new Error('Username is required');
    }
    if (!password) {
      throw new Error('Password is required');
    }

    try {
      const response = await api.post<ConnectResponse>('/api/connect', undefined, {
        auth: { username, password },
      });

      const { id } = response.data;

      config.bundledUserId = id;

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
