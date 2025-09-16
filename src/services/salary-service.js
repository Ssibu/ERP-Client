import apiClient from '@/api/axiosConfig';


export const getSalaryComponents = async () => {
    const { data } = await apiClient.get('/salary/components');
    return data;
};

export const createSalaryComponent = async (componentData) => {
    const { data } = await apiClient.post('/salary/components', componentData);
    return data;
};
export const updateSalaryComponent = async (id, componentData) => {
    const { data } = await apiClient.put(`/salary/components/${id}`, componentData);
    return data;
};
export const deleteSalaryComponent = async (id) => {
    const { data } = await apiClient.delete(`/salary/components/${id}`);
    return data;
};


export const getEmployeeList = async () => {
    const { data } = await apiClient.get('/salary/list-employees');
    return data;
};

export const getEmployeeSalaryStructure = async (employeeId) => {
    const { data } = await apiClient.get(`/salary/structure/${employeeId}`);
    return data;
};

export const updateEmployeeSalaryStructure = async (employeeId, structureData) => {
    const { data } = await apiClient.post(`/salary/structure/${employeeId}`, structureData);
    return data;
};