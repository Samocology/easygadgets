import { api } from '@/lib/api';

export const uploadService = {
  async uploadFile(file: File, type: 'image' | 'video' = 'image'): Promise<{ url: string }> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);

    return api.request('/upload', {
      method: 'POST',
      requiresAuth: true,
      body: formData,
      headers: {
        // Don't set Content-Type, let browser set it with boundary
      },
    });
  },

  async uploadMultipleFiles(files: File[], type: 'image' | 'video' = 'image'): Promise<{ urls: string[] }> {
    const formData = new FormData();
    files.forEach(file => {
      formData.append('files', file);
    });
    formData.append('type', type);

    return api.request('/upload/multiple', {
      method: 'POST',
      requiresAuth: true,
      body: formData,
      headers: {
        // Don't set Content-Type
      },
    });
  },
};
