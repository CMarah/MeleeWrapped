import { toBlob }    from 'html-to-image';
import { CleanData } from './types';

export const screenshotAndCopy = (current_ref: HTMLDivElement, is_chrome: boolean) =>
  toBlob(current_ref)
    .then(blob => {
      if (!blob) return null;
      const type = blob.type;
      if (is_chrome) {
        navigator.clipboard.write([
          new ClipboardItem({ [type]: blob })
        ]);
      }
      return blob;
    })
    .catch((err) => {
      console.log('Error rendering image:', err);
      return null;
    });

export const toBase64 = (blob: Blob | null) => {
  if (!blob) return Promise.resolve('');
  const reader = new FileReader();
  reader.readAsDataURL(blob);
  return new Promise<string>((resolve) => {
    reader.onloadend = () => {
      return resolve((reader.result || '') as string);
    }
  });
};

export const getSlippiggElo = async (code: String) => {
  try {
    const data = await fetch("https://gql-gateway-dot-slippi.uc.r.appspot.com/graphql", {
      "headers": {
        "accept": "*/*",
        "accept-language": "en,es-ES;q=0.9,es;q=0.8",
        "apollographql-client-name": "slippi-web",
        "content-type": "application/json",
        "sec-ch-ua": "\"Google Chrome\";v=\"119\", \"Chromium\";v=\"119\", \"Not?A_Brand\";v=\"24\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "cross-site"
      },
      "referrer": "https://slippi.gg/",
      "referrerPolicy": "strict-origin-when-cross-origin",
      "body": '{"operationName":"AccountManagementPageQuery","variables":{"cc":"' + code +
        '","uid":"' + code +
        '"},"query":"fragment profileFields on NetplayProfile {\\n  id\\n  ratingOrdinal\\n  ratingUpdateCount\\n  wins\\n  losses\\n  characters {\\n    id\\n    character\\n    gameCount\\n   }\\n  }\\n\\nfragment userProfilePage on User {\\n  fbUid\\n  displayName\\n  connectCode {\\n    code\\n    }\\n  status\\n  rankedNetplayProfile {\\n    ...profileFields\\n  }\\n  netplayProfiles {\\n    ...profileFields\\n    season {\\n      id\\n      startedAt\\n      endedAt\\n      name\\n      status\\n      }\\n    }\\n  }\\n\\nquery AccountManagementPageQuery($cc: String!, $uid: String!) {\\n  getUser(fbUid: $uid) {\\n    ...userProfilePage\\n   }\\n  getConnectCode(code: $cc) {\\n    user {\\n      ...userProfilePage\\n      }\\n    }\\n}\\n"}',
      "method": "POST",
      "mode": "cors",
      "credentials": "omit"
    })
      .then(r => r.json())
      .then(r => r.data.getConnectCode.user.netplayProfiles);
    return data.reduce((max_elo: number, profile: any) =>
      (profile.ratingUpdateCount && profile.ratingOrdinal > max_elo) ? profile.ratingOrdinal : max_elo
    , 0);
  } catch (e) {
    return null;
  }
};

export const get2022Results = async (id: String, codes: Array<String>) => {
  try {
    const prev_year_results = await fetch(`https://us-east1-meleewrapped.cloudfunctions.net/get-2022-player-data?id=${encodeURIComponent(id as string)}`)
      .then(res => res.json());
    if (!prev_year_results?.error) return prev_year_results;
    if (codes.length < 2) return null;
    const ids = codes.map(code => btoa(code.toString()));
    const pyr_1 = await fetch(`https://us-east1-meleewrapped.cloudfunctions.net/get-2022-player-data?id=${encodeURIComponent(ids[0] as string)}`)
      .then(res => res.json());
    if (!pyr_1?.error) return pyr_1;
    const pyr_2 = await fetch(`https://us-east1-meleewrapped.cloudfunctions.net/get-2022-player-data?id=${encodeURIComponent(ids[1] as string)}`)
      .then(res => res.json());
    return pyr_2?.error ? null : pyr_2;
  } catch (e) {
    return null;
  }
};

export const getFromGcp = (id: String) =>
  fetch(`https://us-central1-meleewrapped.cloudfunctions.net/set-2023-player-data?id=${encodeURIComponent(id as string)}`)
    .then(res => res.json());

export const sendToGcp = (data: CleanData | null, codes: Array<string>, name: string) => data &&
  fetch('https://us-central1-meleewrapped.cloudfunctions.net/set-2023-player-data', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ results: data, codes, name }),
  })
    .then((res) => res.text());
