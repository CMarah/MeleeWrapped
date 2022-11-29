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

export const sendToGcp = (data: CleanData | null, codes: Array<string>, name: string) => data &&
  fetch('https://us-central1-meleewrapped.cloudfunctions.net/cloud-functions-firestore', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ results: data, codes, name }),
  })
    .then((res) => res.text());
