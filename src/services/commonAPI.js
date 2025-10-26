import axios from 'axios';

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const commonAPI = async (httpMethod, url, reqbody, retryCount = 0) => {
    const reqConfig = {
        method: httpMethod,
        url,
        data: reqbody,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        timeout: 15000, // 15 seconds
        validateStatus: status => status >= 200 && status < 500 // Don't reject if status is 4xx
    };
    
    try {
        const response = await axios(reqConfig);
        
        // Check if the response is valid JSON
        if (response.headers['content-type']?.includes('application/json')) {
            return {
                success: response.status >= 200 && response.status < 300,
                data: response.data,
                status: response.status
            };
        }
        
        return {
            success: false,
            error: 'Invalid response format from server',
            status: response.status
        };
        
    } catch (error) {
        // If we haven't exceeded max retries and it's a network error or 5xx, retry
        if (retryCount < MAX_RETRIES && 
            (error.code === 'ECONNABORTED' || 
             !error.response || 
             (error.response && error.response.status >= 500))) {
            
            await wait(RETRY_DELAY * (retryCount + 1));
            return commonAPI(httpMethod, url, reqbody, retryCount + 1);
        }

        const errorResponse = {
            success: false,
            status: error.response?.status,
            error: 'An error occurred'
        };

        if (error.code === 'ECONNABORTED') {
            errorResponse.error = 'Request timed out - please try again';
        } else if (!error.response) {
            errorResponse.error = 'Cannot connect to server - please check your internet connection';
        } else if (error.response.status === 404) {
            errorResponse.error = 'The requested resource was not found';
        } else if (error.response.status >= 500) {
            errorResponse.error = 'Server error - please try again later';
        }

        return errorResponse;
    }
}