import type { OptionsWithUri } from 'request';

import type { IExecuteFunctions, ILoadOptionsFunctions } from 'n8n-core';

import type { IDataObject, IHookFunctions, IWebhookFunctions } from 'n8n-workflow';
import { NodeApiError } from 'n8n-workflow';

export async function generateBannersApiRequest(
	this: IExecuteFunctions | IWebhookFunctions | IHookFunctions | ILoadOptionsFunctions,
	method: string,
	resource: string,

	body: any = {},
	query: IDataObject = {},
	uri?: string,
	headers: IDataObject = {},
): Promise<any> {
	const credentials = await this.getCredentials('generateBannersApi');

	const options: OptionsWithUri = {
		headers: {
			Authorization: `Bearer ${credentials.secretApiKey}`,
		},
		method,
		uri: uri || `https://api.generatebanners.com/api/v1/${credentials.publicApiKey}${resource}`,
		baseUrl: 'https://api.generatebanners.com/',
		json: true,
	};
	if (Object.keys(query).length) {
		options.qs = query;
	}
	if (Object.keys(body).length) {
		options.body = body;
	}
	options.headers = Object.assign({}, options.headers, headers);
	try {
		console.log('request', JSON.stringify(options, null, 2));
		return await this.helpers.request(options);
	} catch (error) {
		console.log(error);
		throw new NodeApiError(this.getNode(), error);
	}
}

