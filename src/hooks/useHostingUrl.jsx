
const useHostingUrl = () => {
    const hostingKey = import.meta.env.VITE_HOSTINGURL;
    const hostingURL = `https://api.imgbb.com/1/upload?key=${hostingKey}`
    return hostingURL;
};

export default useHostingUrl;