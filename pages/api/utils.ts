import { google } from 'googleapis'
import creds from './joseph.json'


const SHEET_ID = '11hN1QgPiFEmnjj0NSdlinEv3f8G7UCwKIsQ_MOpkOJ4'
const SHEET_NAME = 'Sheet2'

export interface PapeoType {
	authors: string[]
	title: string
	reader: string
	arr: string
	track: string
	type: string
	sha1: string
	status: string
	index: string
}

export async function getPapeos() {
	try {
		const target = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
		const jwt = new google.auth.JWT(
			creds.client_email,
			undefined,
			(creds.private_key || '').replace(/\\n/g, '\n'),
			target
		);

		const sheets = google.sheets({ version: 'v4', auth: jwt });
		const response = await sheets.spreadsheets.values.get({
			spreadsheetId: SHEET_ID,
			range: SHEET_NAME
		});

		const rows = response.data.values;
		if (rows && rows.length) {
			let papeos = rows.map((row) => ({
				authors: row[6].replace(' and ', ', ').split(', '),
				title: row[3],
				reader: row[11],
				arr: row[9] ?? '',
				track: row[5],
				type: row[8],
				sha1: row[10],
				status: row[4].substring(7),
				index: `${row[6]} ${row[3]} ${row[5]} ${row[8]} ${row[4].substring(7)}`.toLowerCase()
			}))
			papeos.shift()
			papeos = papeos
								.filter(papeo => Boolean(papeo))
								.filter(papeo => ! Object.values(papeo).some(value => value === undefined))
			console.log('POST', papeos.length)
			return papeos as PapeoType[]
		}
	} catch (err) {
		console.log(err);
	}
	return [];
}
