import axios from "axios";

const SendBirdApplicationId = import.meta.env.VITE_SEND_BIRD_APP_ID;
const SendBirdApiToken = import.meta.env.VITE_SEND_BIRD_API_TOKEN;
const FormatResult = (resp) => {
    let result = [];
    let finalResult = [];
    resp.forEach(item => {
        const listingId = item.carListing?.id;
        if(!result[listingId])
        {
            result[listingId] = {
                car: item.carListing,
                images: []
            }
        }

        if(item.carImages)
        {
            result[listingId].images.push(item.carImages)
        }
    })

    result.forEach(item => {
        finalResult.push({
            ...item.car,
            images: item.images
        })
    })

    return finalResult;
}

const CreateSendBirdUser = (userId, nickName, profileUrl) => {
    return axios.post('https://api-'+SendBirdApplicationId+'.sendbird.com/v3/users',{
        user_id: userId,
        nickname: nickName,
        profile_url: profileUrl,
        issue_access_token: false
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Api-Token': SendBirdApiToken
        }
    })
}

export default { FormatResult, CreateSendBirdUser };