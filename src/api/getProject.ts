// src/services/templateService.ts
import axios from 'axios';
import {Project} from "../types/Project";

const API_URL = 'http://localhost:8080/api/v1/service';

export const getProject = async (id: string): Promise<Project> => {
    try {
        const response = await axios.get<Project>(API_URL+ "/" + id);
        return response.data;
    } catch (error) {
        console.error('Error fetching project:', error);
        throw error;
    }
};