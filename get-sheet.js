const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library');

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

const privateKey = `-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCT/Go1B28xffFt
S6wJU9ynwHpFHW+J/TSp7Ih542pMl3xdVla9dLApS0RjutMnFp3Nk0kTQF1h6ffd
iszhcaLLk8X3zJI3nUuiEM0xU2e4u3a2UwdvFlye4cG8vSLUuqtRBHbYHbxPKl0q
+MaBl4eAhgkiOzZyO0RG+Uxp08pdvcntKOdPlNxZp5GnMy0YUQz7i9PSWemXiM9G
0edeRoL04TA+35WS/gmmCUEI8yvHuTicLgywLl3Bz0dKAgZhYNShNCvi8os2FcbI
8iN7sUf0bAlwAe0idLkNrXZVwL2Gw80LlcohC5dZ7D3umkgAiLRHhYPBvr8TaibdK
SKFOu5HvAgMBAAECggEAJbliT6tZ/plW6qAwNl6A8OiBos3Kqbf47VpFPiEpb2Xs
h5SjXv94isZLpEqzWhMLXiTuK3CsfXHZxEmGSfAgaln8zNsC6Rd5eNJkpG7ZEYAE
Vp0a14gxSzVMoHLshqMhWfFT5GrMHrgzcOljHRUGL0671FSY4AzYrmkNwCqDu1pr
eYPbCenPGW1oWCSl6CmggEFiZxg0efcNRWwlWI3pHWHVpj1Xnss0T9Hmjc2ynhuz
iz70pZy3VDsPHd4n2otdu4qO51KiHq97VV1Tuw9cgDBgqdh97yjBePst1XWDFSPz
fYFs+u5l9Z7CD6dx8X0VkXOtBiPi0c28diMFyV69gQKBgQDFG83T3JYnfdhVknXr
HYNI6rdmF/Ko+AaJ57K50mTZdmqbwdqS3etrQQQ6qLZucrJuf4GUKAryvuiMpAra
7QBxigY7ydJ7UmMgMnkUk6wVZppxIf0C/tEb7UhUy6fyqmdqP0ULwrny/8qXb1WH
laQDnVPllj6Q7PWyVjczpMPWbwKBgQDAM2HLYRWRmoQ4/CNBzHkYE/UgVIBQDwwb
2nAcpEPEdWpf3eLtBcyJIBl33YpSsyFR0Q99/GIy4+lWHtMQgWAB5VIEgr21uMh+
cWFUGcwAhbrXjG/ElE0kVh3RoDvb/W+ViNMrNHUSQjs0q6u5i0k9m1omZV52hUF7
y7jMlB28gQKBgFzmyu9lU5xPcyx5+HwVj/BJOKG0/dln9WUAQLvWj1PzvTGmf8ej
Mzd9EGo5ZKrQAouUK1XSPb7F/kNzee5PsFrTTDbX3A3l+fSN9YWeSIhZsMdL1r2X
rqV0BBh7WLBGYrGwGnH9mLkQmMMhZXWfMQvHFmjqlJioJvGkMyZzLR6fAoGBALLU
nB+R23G4pWIoJ93nFJz0pNVKCoFzHr8jxcDAjlVTMoC0gZosFR1ZgpjmxvcfuNbZ
gGKm2++h48+/qn7nAZ+B8YhE5aMZpWMQt5B62Dd8NlasUqpDmms+vUv4nPmZm6M0
xdajXnJ4sYHWYVeoY6Mw0vZ6xyPb5Qv8h5vCDNEBAoGAb4Izq2cwdzyAHCUCemcN
gne0OW+nLUZrvAYiaAXKXp6kzWrNkPkNTxlWqx6nz5OBMpHNSWcw1VSfhqOJb7d3
56VezLPu/6dGq3byTPhjn/3gVgQfqOnRbJGh6P58LVcOzdvJD+Dmvo07T20QPnf+
gUbNf8KXtF7LUys5ptw5nBw=
-----END PRIVATE KEY-----`;

const serviceAccountAuth = new JWT({
  email: 'nezar-leads-agent@nezar-leads.iam.gserviceaccount.com',
  key: privateKey,
  scopes: SCOPES,
});

const doc = new GoogleSpreadsheet('1IMyPQyWYFD_7a3CtF340pu0LwV-TCU5hXCa8mii7JYE', serviceAccountAuth);

(async () => {
  await doc.loadInfo();
  console.log('Sheets:', doc.sheetsByIndex.map(s => s.title));
  
  // Get Master Leads sheet
  const sheet = doc.sheetsByIndex[1];
  console.log('Getting rows from:', sheet.title);
  
  // Use different method - get all values
  const response = await sheet.spreadsheet.get({
    ranges: [`${sheet.title}!A1:Z100`]
  });
  console.log('Response:', JSON.stringify(response, null, 2).substring(0, 2000));
})();
