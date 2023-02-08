import type { IExecuteFunctions } from 'n8n-core';

import type {
	IDataObject,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

import { generateBannersApiRequest } from './GenericFunctions';

import { imageFields, imageOperations } from './ImageDescription';

export class GenerateBanners implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'GenerateBanners',
		name: 'generatebanners',
		// eslint-disable-next-line n8n-nodes-base/node-class-description-icon-not-svg
		icon: 'file:logo.svg',
		group: ['output'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Consume GenerateBanners API',
		defaults: {
			name: 'GenerateBanners',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'generateBannersApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Image',
						value: 'image',
					},
				],
				default: 'image',
			},
			// IMAGE
			...imageOperations,
			...imageFields,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: IDataObject[] = [];
		const length = items.length;
		let responseData;
		const resource = this.getNodeParameter('resource', 0);
		const operation = this.getNodeParameter('operation', 0);
		for (let i = 0; i < length; i++) {
			if (resource === 'image') {
				if (operation === 'create') {
					const templateId = this.getNodeParameter('templateId', i) as string;
					const query: IDataObject = {};
					responseData = await generateBannersApiRequest.call(this, 'GET', `/template/${templateId}/sign-url`, {}, query);
				}
			}
			if (Array.isArray(responseData)) {
				returnData.push.apply(returnData, responseData as IDataObject[]);
			} else {
				returnData.push(responseData);
			}
		}
		return [this.helpers.returnJsonArray(returnData)];
	}
}
