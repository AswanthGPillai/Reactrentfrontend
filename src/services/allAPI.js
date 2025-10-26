import {commonAPI} from "./commonAPI";
import {serverURL} from "./serverURL";

// Get all members
export const getAllMembers = async () => {
    return await commonAPI("GET", `${serverURL}/members`);
}

// Add a new member
export const addMember = async (member) => {
    if (!member.name || !member.phone) {
        return {
            success: false,
            error: 'Name and phone number are required'
        };
    }

    // Basic phone number validation
    if (!/^\d{10}$/.test(member.phone)) {
        return {
            success: false,
            error: 'Please enter a valid 10-digit phone number'
        };
    }

    const response = await commonAPI("POST", `${serverURL}/members`, member);
    
    if (response.success) {
        return {
            success: true,
            data: response.data
        };
    }

    return {
        success: false,
        error: response.error || 'Failed to add member'
    };
}