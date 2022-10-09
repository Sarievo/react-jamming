const CLIENT_ID = "REDACTED"; // FILL IN USING https://developer.spotify.com/dashboard
const REDIRECT_URI = "http://localhost:3000/"
const AUTHORIZE_URL = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&scope=playlist-modify-public&redirect_uri=${REDIRECT_URI}`

let accessToken
const Spotify = {
  getAccessToken() {
    if (accessToken) return accessToken
    // check info match
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/)
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/)

    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1]
      const expiresIn = Number(expiresInMatch[1])
      // clear params when expire
      window.setTimeout(() => accessToken = '', expiresIn + 1000);
      window.history.pushState('Access Token', null, '/')
      return accessToken
    } else {
      window.location = AUTHORIZE_URL
    }
  },
  search: function (term) {
    const accessToken = Spotify.getAccessToken()
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: {Authorization: `Bearer ${accessToken}`}
    }).then(response => {
      return response.json();
    }).then(jsonResponse => {
      if (!jsonResponse.tracks) {
        return []
      }
      return jsonResponse.tracks.items.map(track => ({
        id: track.id, name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri
      }))
    })
  },
  savePlaylist(name, trackUris) {
    if (!name || !trackUris.length) return
    const accessToken = Spotify.getAccessToken();
    const headers = {Authorization: `Bearer ${accessToken}`};
    let userId;

    return fetch('https://api.spotify.com/v1/me', {headers})
      .then(response => response.json())
      .then(jsonResponse => {
        userId = jsonResponse.id;
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
          headers,
          method: 'POST',
          body: JSON.stringify({name})
        }).then(response => response.json())
          .then(jsonResponse => {
            const playlistId = jsonResponse.id;
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
                headers,
                method: "POST",
                body: JSON.stringify({uris: trackUris})
              }
            )
          })
      })
  }
}

export default Spotify;