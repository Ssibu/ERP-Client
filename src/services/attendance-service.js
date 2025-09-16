import apiClient from '@/api/axiosConfig';

export const getTodaysAttendance = async () => {
    const { data } = await apiClient.get('/attendance/today');
    return data;
};

export const checkIn = async () => {
    const { data } = await apiClient.post('/attendance/check-in');
    return data;
};

export const checkOut = async () => {
    const { data } = await apiClient.put('/attendance/check-out');
    return data;
};