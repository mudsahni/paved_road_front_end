// src/services/templateService.ts
import axios from 'axios';
import { Template } from '../types/Template';

const API_URL = 'http://localhost:8080/api/v1/template';

export const getTemplates = async (): Promise<Template[]> => {
    try {
        const response = await axios.get<Template[]>(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching templates:', error);
        throw error;
    }
};