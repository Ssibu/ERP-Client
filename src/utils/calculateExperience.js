export const calculateExperience = (joinDate) => {
    if (!joinDate) return "N/A";
    const start = new Date(joinDate);
    const now = new Date();
    
    let years = now.getFullYear() - start.getFullYear();
    let months = now.getMonth() - start.getMonth();
    
    if (months < 0) {
        years--;
        months += 12;
    }
    
    return `${years} year(s), ${months} month(s)`;
};