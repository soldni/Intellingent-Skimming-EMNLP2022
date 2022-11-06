import { google } from 'googleapis'
import creds from './joseph.json'

const SHEET_ID = '11hN1QgPiFEmnjj0NSdlinEv3f8G7UCwKIsQ_MOpkOJ4'

export async function getPapeos() {
	try {
		const target = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
		const jwt = new google.auth.JWT(
			creds.client_email,
			null,
			(creds.private_key || '').replace(/\\n/g, '\n'),
			target
		);

		const sheets = google.sheets({ version: 'v4', auth: jwt });
		const response = await sheets.spreadsheets.values.get({
			spreadsheetId: SHEET_ID,
			range: 'Sheet1', // sheet name
		});

		const rows = response.data.values;
		console.log(rows)
		if (rows.length) {
			let papeos = rows.map((row) => ({
				author: row[0],
				email: row[1],
				title: row[2],
				status: row[3],
				link: row[4],
				conference: row[5],
				abstract: row[6]
			}))
			console.log(papeos)
			papeos = papeos
								.filter(papeo => ! Object.values(papeo).some(value => value === undefined))
								.filter(papeo => papeo.status.toLowerCase().trim() === 'done')
			return papeos
		}
	} catch (err) {
		console.log(err);
	}
	return [];
}

