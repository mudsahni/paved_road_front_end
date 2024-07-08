import axios from 'axios';
import {Project} from "../types/Project";

const API_URL = 'http://localhost:8080/api/v1/service';

export const triggerGithubAction = async (id: string): Promise<void> => {
    try {
        const response = await axios.post(`${API_URL}/${id}/trigger`, null, {
            validateStatus: (status) => status === 202
        });

        // if (response.status !== 204) {
        //     console.error(`Expected 202 status, but received ${response.status}`);
        // } else {
        //     console.log(`Successfully triggered github action.`)
        // }
    } catch (error) {
        console.error('Error triggering GitHub action:', error);
    }
};