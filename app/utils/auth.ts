// Device Authentication Utility
// Generates and manages unique device IDs for chat history

export const generateDeviceId = (): string => {
  // Generate a UUID v4
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

export const getDeviceId = (): string => {
  if (typeof window === 'undefined') {
    // Server-side rendering - return a placeholder
    return 'server-side';
  }

  let deviceId = localStorage.getItem('unibot_device_id');
  
  if (!deviceId) {
    deviceId = generateDeviceId();
    localStorage.setItem('unibot_device_id', deviceId);
  }
  
  return deviceId;
};

export const isDeviceAuthenticated = (): boolean => {
  if (typeof window === 'undefined') {
    return false;
  }
  
  return !!localStorage.getItem('unibot_device_id');
};

export const clearDeviceId = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('unibot_device_id');
  }
};
