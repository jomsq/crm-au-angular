import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {
  private secretKey = 'CRMAUSTRALIA'; // Replace with your secret key

  constructor() { }

  encrypt(value: string): string {
    const encrypted = CryptoJS.AES.encrypt(value, this.secretKey).toString();
    return this.urlSafeBase64Encode(encrypted);
  }

  decrypt(encryptedValue: string): string {
    const decrypted = this.urlSafeBase64Decode(encryptedValue);
    const bytes = CryptoJS.AES.decrypt(decrypted, this.secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  }

  private urlSafeBase64Encode(value: string): string {
    return value.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }

  private urlSafeBase64Decode(value: string): string {
    value = value.replace(/-/g, '+').replace(/_/g, '/');
    while (value.length % 4) {
      value += '=';
    }
    return value;
  }
}
