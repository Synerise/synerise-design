import { getEnvironmentVar } from '../index';
import { applyToken } from '../accessToken';

const bp_timezone = 'bp_timezone';
const getItem = () => localStorage.getItem(bp_timezone);
const setItem = item => localStorage.setItem(bp_timezone, item);

localStorage.removeItem(bp_timezone);

const getEndpoint = () => `${getEnvironmentVar('REACT_APP_TIMEZONE_API')}/authenticated/settings/business-profile`;
const Timezone = {
  fetch: null,
  defaultTimezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  requestTimezone() {
    let endpoint;
    try {
      endpoint = getEndpoint();
    } catch (e) {
      return new Promise((resolve, reject) => reject('No endpoint'));
    }
    return fetch(endpoint, {
      headers: new Headers(applyToken()),
      credentials: 'include',
    })
      .then(response => {
        if (!response.ok) {
          throw Error('Cannot fetch timezone');
        }
        return response.json();
      })
      .then(obj => {
        const timezone = obj.timezone;
        localStorage.removeItem(bp_timezone);
        !!getItem && timezone && setItem(timezone);
        window.CURRENT_TIMEZONE = timezone;
        return timezone;
      });
  },
  fetchTimezone() {
    if (this.fetch) {
      return this.fetch;
    } else {
      this.fetch = new Promise((resolve, reject) => {
        const currentTz = getItem();
        if (currentTz) resolve(currentTz);
        else
          this.requestTimezone()
            .then(resolve)
            .catch(e => {
              !!e && resolve(this.defaultTimezone);
            });
      });
      return this.fetch;
    }
  },
  getTimezone() {
    return this.fetchTimezone();
  },
};

export const getTimezone = Timezone.getTimezone.bind(Timezone);
