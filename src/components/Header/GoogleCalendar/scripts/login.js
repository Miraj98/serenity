/* global gapi */
import store from '../../../../redux/store'
import { updateSignInStatus } from '../../../../redux/actions'

export const initGoogleAPI = () => {
    gapi.load('client:auth2', () => {
      gapi.client.init({
        clientId: '231257347247-o39t6jc9bi9dc93peltrj3bs17nfq721.apps.googleusercontent.com',
        discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
        scope: "https://www.googleapis.com/auth/calendar"
      })
      .then(() => {
      // Listen for sign-in state changes.
        gapi.auth2.getAuthInstance().isSignedIn.listen();
        store.dispatch(updateSignInStatus(gapi.auth2.getAuthInstance().isSignedIn.get()));
      });
    });
}
