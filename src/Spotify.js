// To get an access token for Spotify Web API 
// Search for tracks by keywords
// Create and save playlists with specifics tracks 

const clientId = '114c11423c0a4343a83234705f8ea995';
const redirectUri = 'https://react-jammming-sigma.vercel.app';

// To make authorised requests to Spotify API 
let accessToken;

// GetAccessToken() method
const Spotify = {
    getAccessToken(){
        // checks if there is an access token, returns the accessToken
        if(accessToken){
            return accessToken
        }

        // To extract the access token and expiration time from the browser's URL 
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

        // If both information are found in the browser URL:
        if(accessTokenMatch && expiresInMatch) {
            // accessTokenMatch is an array, so assign accessToken to the 1st index of the array
            accessToken = accessTokenMatch[1];
            // converts expiresInMatch to a number 
            const expiresIn = Number(expiresInMatch[1]);
            // Set timeout to clear the accessToken after the specified expiration time to ensure that access token is only used when valid 
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            // Manipulate the browser's history by replacing the current url with a new one '/'
            // Removes access token + expiration parameters from visible url to enhance security 
            window.history.pushState('Access Token', null, '/');
            return accessToken;

        // If access token not present + parameters not exists in url 
        } else{
            // construct the Spotify authorisation URL ('accessUrl') with client id, response type, scope and redirect Url
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
            // user will be redirected to the url to initate authentication 
            window.location = accessUrl;
        }
    },

    // Takes in a parameter - term to search for tracks 
    async search(term) {
        // call getAccessToken() method to obtain the accessToken
        const accessToken = Spotify.getAccessToken();
        // fetch - make a HTTP request to the Spotify API's search endpoint 
        // type=track - specifies that search is for track 
        // ${term} - includes user-provided search term 
        const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            // set the headers for authorization to be Bearer with accessToken obtained earlier 
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
            // handle API response and convert response to json 
        });
        const jsonResponse = await response.json();
        // if x exists, returns an empty array
        if (!jsonResponse.tracks) {
            return [];
        }
        console.log(jsonResponse);
        return jsonResponse.tracks.items.map(track => ({
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri
        }));
    },

    // to create new playlist on user's Spotify account and adding a list of tracks into that playlist
    savePlaylist(name, trackUris){
        // checks if both parameters exists, otherwise returns early i.e. inputs are invalid
        if(!name || !trackUris.length) {
            return ;
        }

        // obtains access token to ensure that user is authenticated
        const accessToken = Spotify.getAccessToken();
        const headers = { Authorization: `Bearer ${accessToken}` };
        
        // makes a request to Spotify API to fetch information about the authenticated user i.e. user's ID and store it in userId
        let userId;
        return fetch(`https://api.spotify.com/v1/me`, {headers: headers}
        ).then (response => response.json()
        ).then (jsonResponse => {
            userId = jsonResponse.id;
            // using the obtained userId, sends a request to create a new playlist for the user 
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
                headers: headers,
                // 'POST' request, includes the playlist name in the request body 
                method: 'POST',
                body: JSON.stringify({name: name})
            }).then (response => response.json()
            ).then(jsonResponse => {
                // store the new platlist's ID in the playlistId variable
                const playlistId = jsonResponse.id;
                // add tracks to the playlist 
                return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
                    headers: headers,
                    method: 'POST',
                    body: JSON.stringify({uris: trackUris})
                })
            })
        })
    }
};

export default Spotify;