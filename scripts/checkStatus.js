async function isUserBlocked(email) {
    try {
        // '../' dahil kailangang lumabas sa scripts folder para makita ang db folder
        const response = await fetch("../db/blocked_users.json");

        if (!response.ok) {
            console.warn("Blocked list not found. Allowing access.");
            return false;
        }

        const data = await response.json();
        // Chine-check kung ang email ay nasa array ng 'blocked_emails'
        return data.blocked_emails.includes(email);
    } catch (error) {
        console.error("Error checking block status:", error);
        return false;
    }
}
