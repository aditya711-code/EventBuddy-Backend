import axios from "axios";
export const getEvents=async(req,res)=>{
    try{

        const apiKey = process.env.THIRD_PARTY_API_KEY;
        const apiUrl = `https://www.eventbriteapi.com/v3/organizations/${process.env.ORGANIZATION_ID}/events`;
        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        });
        
        // Process the API response
        const responseData = response.data;
        res.status(200).json({ data: responseData });
    }catch(error)
    {
        res.status(500).json(error)
    }
}