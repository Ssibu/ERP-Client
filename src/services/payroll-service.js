import apiClient  from '@/api/axiosConfig';

export const calculateSalary = async (payrollData) => {
    try {
        const { data } = await apiClient.post('/payroll/calculate', payrollData);
        return data; 
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to calculate salary');
    }
};


export const getEmployeeListForPayroll = async () => {
     try {
        const { data } = await apiClient.get('/payroll/list-employees');
        return data; 
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to fetch employee list');
    }
}   


export const generatePayrollReport = async (reportData) => {
    try {
        const { data } = await apiClient.post('/payroll/generate-report', reportData);
        return data; 
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to generate payroll report');
    }
};


export const getRecentReports = async () => {
    const { data } = await apiClient.get('/payroll/recent');
    return data;
};


export const getPayrollPreview = async (data) => {
    try {
        const { data: previewData } = await apiClient.post('/payroll/preview', data);
        return previewData;
    } catch (error) {
  
        throw new Error(error.response?.data?.message || 'Failed to fetch payroll preview');
    }
};


export const initiatePayrollGeneration = async (reportData) => {
    // reportData is { month, year }
    const { data } = await apiClient.post('/payroll/initiate', reportData);
    return data; // Returns { message, reportId }
};

export const getReportStatus = async (reportId) => {
    const { data } = await apiClient.get(`/payroll/status/${reportId}`);
    return data; // Returns { id, status, error_log }
};

export const getPayrollReport = async (reportId) => {
    const { data } = await apiClient.get(`/payroll/report/${reportId}`);
    return data; // Returns the full, detailed report object
};