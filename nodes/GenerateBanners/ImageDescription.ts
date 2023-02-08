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
	{
		displayName: 'Variables',
		name: 'variables',
		placeholder: 'Add Variable',
		type: 'fixedCollection',
		default: {},
		typeOptions: {
			multipleValues: true,
		},
		options: [
			{
				name: 'variableValues',
				displayName: 'Variable',
				values: [
					{
						displayName: 'Name',
						name: 'name',
						type: 'string',
						default: '',
						description: 'Name of the variable to add. You can use the click-to-copy feature from the template form view.',
					},
					{
						displayName: 'Value',
						name: 'value',
						type: 'string',
						default: '',
						description: 'Value to set for the variable',
					},
				],
			},
		],
		displayOptions: {
			show: {
				resource: ['image'],
				operation: ['create'],
			},
		},
	}
];
