export const updatedat = ()=>{
    const date = new Date()
    return new Date(date.getTime() + 5 * 60 * 60 * 1000).toISOString();
} 