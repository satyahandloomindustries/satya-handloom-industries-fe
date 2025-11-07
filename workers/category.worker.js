import ApiService from "@/services/ApiService";
self.onmessage = async (event) => {
    const { url } = event.data;    
  
    try {
        const data = await ApiService.get(`${self.location.origin}/${url}`);        
        postMessage({ success: true, data });
    } catch (error) {        
      postMessage({ success: false, error: error.message });
    }
  };
  