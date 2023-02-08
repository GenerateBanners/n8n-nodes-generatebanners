import type { INodeProperties } from 'n8n-workflow';

export const imageOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['image'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create an image',
				action: 'Create an image',
			},
		],
		default: 'create',
	},
];

export const imageFields: INodeProperties[] = [
	{
		displayName: 'Template ID',
		name: 'templateId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['image'],
				operation: ['create'],
			},
		},
		description:
			'The template ID you want to use. Go to <a href="https://www.generatebanners.com/app">your template list</a> to find your template, click on it and then select the "Template ID" value.',
	},
];
