const USER_ID = 'itstony1911';
// Your PAT (Personal Access Token) can be found in the portal under Authentification
const PAT = '9ea57ce396c04818a9045a18c47ea3f1';
const APP_ID = 'ztm-face-reco-brain';

const handleApiCall = (req, res) => {
    const { input } = req.body

    const raw = JSON.stringify({
        "user_app_id": {
            "user_id": USER_ID,
            "app_id": APP_ID
        },
        "inputs": [
            {
                "data": {
                    "image": {
                        "url": input
                    }
                }
            }
        ]
    });
    
    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Key ' + PAT
        },
        body: raw
    };
    
    res.json(requestOptions)
}


const handleImage = (req,res,db) => {
    const { id } = req.body;
    db('users').where('id','=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0].entries);
    })
    .catch(err => res.status(400).json('unable to get entries'))
}

export {handleImage, handleApiCall};