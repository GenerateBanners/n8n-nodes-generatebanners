import type { IAuthenticateGeneric, ICredentialTestRequest, ICredentialType, INodeProperties } from 'n8n-workflow';

export class GenerateBannersApi implements ICredentialType {
	name = 'generateBannersApi';

	displayName = 'GenerateBanners API';

	documentationUrl = 'https://www.generatebanners.com/helpdesk/how-to-get-my-generatebanners-api-keys';

	properties: INodeProperties[] = [
		{
			displayName: 'Public API Key',
			name: 'publicApiKey',
			type: 'string',
			default: '',
		},
		{
			displayName: 'Secret API Key',
			name: 'secretApiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '={{"Bearer " + $credentials.secretApiKey}}',
			}
		},
	};

  test: ICredentialTestRequest = {
    request: {
      baseURL: '={{"https://api.generatebanners.com/api/v1/" + $credentials.publicApiKey}}',
      url: '/me',
    },
  };
}
