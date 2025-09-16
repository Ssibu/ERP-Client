import  apiClient from '@/api/axiosConfig'

export const getLeaveConfig = async () => {
    try {
        const { data } = await apiClient.get('/leave/config');
        return data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to fetch leave configuration');
    }
};

export const getCalendarData = async () => {
    try {
        const { data } = await apiClient.get('/leave/calendar-data');
        return data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to fetch calendar data');
    }
};


export const validateLeaveRequest = async (requestData) => {
    try {
        const { data } = await apiClient.post('/leave/validate', requestData);
        return data; // This will return { status: 'ok' } or { status: 'split_required', proposal: {...} }
    } catch (error) {
        // Re-throw the error to be caught by the form's submit handler
        throw new Error(error.response?.data?.message || 'Failed to validate leave request');
    }
};

export const createSingleLeaveRequest = async (requestData) => {
    try {
        const { data } = await apiClient.post('/leave/create-single', requestData);
        return data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to create leave request');
    }
};

export const createSplitLeaveRequest = async (proposalData) => {
    try {
        const { data } = await apiClient.post('/leave/create-split', proposalData);
        return data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to create split leave request');
    }
};

export const getMyLeaveRequests = async (params) => {
    try {
        const queryParams = new URLSearchParams(params).toString();
        const { data } = await apiClient.get(`/leave/my-requests?${queryParams}`);
        return data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to fetch your leave requests');
    }
};

export const getManagedLeaveRequests = async () => {
    try {
        const { data } = await apiClient.get('/leave/manage');
        return data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to fetch managed leave requests');
    }
};

export const createLeaveRequest = async (requestData) => {
    try {
        const { data } = await apiClient.post('/leave', requestData);
        return data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to create leave request');
    }
};

export const updateLeaveStatus = async (id, updateData) => {
    try {
        const { data } = await apiClient.put(`/leave/${id}`, updateData);
        return data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to update leave status');
    }
};