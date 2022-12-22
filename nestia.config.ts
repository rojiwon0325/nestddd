import type nestia from '@nestia/sdk';

const NESTIA_CONFIG: nestia.INestiaConfig = {
  input: 'src/**/*.controller.ts',
  output: 'doc/sdk',
  json: true,
  primitive: false,
  swagger: {
    output: 'doc/swagger.json',
  },
};

export default NESTIA_CONFIG;
