import apiClient from '../api/axiosConfig'; // Assuming you have a central API client


export const getCompanyPolicies = async () => {
    const { data } = await apiClient.get('/get-rules');
    return data;
};

// --- Leave Type Services ---

export const getLeaveTypes = async () => {
    const { data } = await apiClient.get('/rules/leave-types');
    return data;
};

export const createLeaveType = async (leaveTypeData) => {
    const { data } = await apiClient.post('/rules/leave-types', leaveTypeData);
    return data;
};

export const updateLeaveType = async (id, leaveTypeData) => {
    const { data } = await apiClient.put(`/rules/leave-types/${id}`, leaveTypeData);
    return data;
};

export const deleteLeaveType = async (id) => {
    const { data } = await apiClient.delete(`/rules/leave-types/${id}`);
    return data;
};

// --- Company Rule Services ---

export const getCompanyRules = async () => {
    const { data } = await apiClient.get('/rules/company-rules');
    return data;
};

export const updateCompanyRules = async (rulesData) => {
    const { data } = await apiClient.put('/rules/company-rules', rulesData);
    return data;
};


// HOLIDAYS SERVICES

export const getPublicHolidays = async () => {
    const { data } = await apiClient.get('/rules/public-holidays');
    return data;
};

export const createPublicHoliday = async (holidayData) => {
    const { data } = await apiClient.post('/rules/public-holidays', holidayData);
    return data;
};

export const deletePublicHoliday = async (id) => {
    const { data } = await apiClient.delete(`/rules/public-holidays/${id}`);
    return data;
};