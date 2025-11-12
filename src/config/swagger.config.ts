import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('API Link Shortener')
    .setDescription('Documentação da API de encurtador de links')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document, {
    customSiteTitle: 'API Link Shortener - Docs',
    customCss: `
      /* --- Variáveis de Cor (Tema Claro Moderno) --- */
      :root {
        --color-bg: #f6f8fa; /* Fundo principal da página */
        --color-bg-element: #ffffff; /* Fundo dos elementos (blocos, topbar) */
        --color-border: #d0d7de; /* Cor da borda */
        --color-text-primary: #24292f; /* Cor do texto principal */
        --color-text-secondary: #57606a; /* Cor do texto secundário */
        --color-accent: #0969da; /* Azul (accent) - melhor contraste no claro */
        --color-get: #0969da; /* GET (azul) */
        --color-post: #2ea44f; /* POST (verde) */
        --color-put: #dbab09; /* PUT (amarelo) */
        --color-delete: #d73a49; /* DELETE (vermelho) */
        --color-patch: #a040f0; /* Adicionado Patch */
        --radius-sm: 6px;
        --radius-md: 8px;
      }

      /* --- Geral & Tipografia --- */
      body {
        background-color: var(--color-bg) !important;
        color: var(--color-text-primary) !important;
        font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      }

      /* --- Topbar --- */
      .swagger-ui .topbar {
        background-color: var(--color-bg-element) !important;
        border-bottom: 1px solid var(--color-border) !important;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      }

      .swagger-ui .topbar .download-url-wrapper {
        display: none;
      }

      .swagger-ui .info hgroup.main a,
      .swagger-ui .info .title small {
        color: var(--color-accent) !important;
      }
      
      .swagger-ui .info .title {
        color: var(--color-text-primary);
      }

      /* --- Contêineres (Models, Auth) --- */
      .swagger-ui .scheme-container,
      .swagger-ui section.models {
        background-color: var(--color-bg-element) !important;
        border: 1px solid var(--color-border) !important;
        border-radius: var(--radius-md) !important;
        box-shadow: 0 1px 3px rgba(0,0,0,0.1);
      }

      /* --- Endpoints (Opblocks) --- */
      .swagger-ui .opblock {
        background-color: var(--color-bg-element) !important;
        border: 1px solid var(--color-border) !important;
        border-radius: var(--radius-md) !important;
        box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        margin-bottom: 16px !important;
      }

      .swagger-ui .opblock-summary {
        padding: 12px;
        border-bottom: 1px solid var(--color-border);
      }
      
      .swagger-ui .opblock.opblock-post .opblock-summary {
         border-color: var(--color-post);
      }
      .swagger-ui .opblock.opblock-get .opblock-summary {
         border-color: var(--color-get);
      }
      .swagger-ui .opblock.opblock-put .opblock-summary {
         border-color: var(--color-put);
      }
      .swagger-ui .opblock.opblock-delete .opblock-summary {
         border-color: var(--color-delete);
      }
      .swagger-ui .opblock.opblock-patch .opblock-summary {
         border-color: var(--color-patch);
      }

      .swagger-ui .opblock-summary-method {
        color: #ffffff !important;
        font-weight: 600;
        border-radius: var(--radius-sm) !important;
        box-shadow: 0 1px 2px rgba(0,0,0,0.1);
      }

      .swagger-ui .opblock-summary-path {
        color: var(--color-text-secondary);
      }
      
      .swagger-ui .opblock-summary-description {
         color: var(--color-text-secondary);
      }

      .swagger-ui .opblock-section-header {
        background-color: var(--color-bg) !important;
        color: var(--color-text-primary) !important;
        font-weight: 600;
        border-bottom: 1px solid var(--color-border);
        border-top: 1px solid var(--color-border);
      }

      .swagger-ui .responses-wrapper {
        background-color: var(--color-bg) !important;
        border-top: 1px solid var(--color-border);
        border-bottom-left-radius: var(--radius-md);
        border-bottom-right-radius: var(--radius-md);
      }
      
      .swagger-ui .response-col_status {
        color: var(--color-text-primary);
        font-weight: 600;
      }

      /* --- HTTP Method Colors --- */
      .swagger-ui .opblock .opblock-summary-method.get {
        background-color: var(--color-get) !important;
      }
      .swagger-ui .opblock .opblock-summary-method.post {
        background-color: var(--color-post) !important;
      }
      .swagger-ui .opblock .opblock-summary-method.put {
        background-color: var(--color-put) !important;
      }
      .swagger-ui .opblock .opblock-summary-method.delete {
        background-color: var(--color-delete) !important;
      }
       .swagger-ui .opblock .opblock-summary-method.patch {
        background-color: var(--color-patch) !important;
      }

      /* --- Inputs, Botões & Tabs --- */
      .swagger-ui input, .swagger-ui select, .swagger-ui textarea {
        background-color: var(--color-bg) !important;
        color: var(--color-text-primary) !important;
        border: 1px solid var(--color-border) !important;
        border-radius: var(--radius-sm) !important;
      }

      .swagger-ui input:focus, .swagger-ui select:focus, .swagger-ui textarea:focus {
        border-color: var(--color-accent) !important;
        box-shadow: 0 0 0 2px rgba(88, 166, 255, 0.3) !important;
        outline: none;
      }

      .swagger-ui .btn.execute {
        background-color: var(--color-accent) !important;
        color: #fff !important;
        border: none;
        border-radius: var(--radius-sm);
        font-weight: 600;
        box-shadow: 0 1px 2px rgba(0,0,0,0.1);
      }

      .swagger-ui .btn.execute:hover {
        background-color: #4ea3ff !important;
        filter: brightness(1.1);
      }
      
      .swagger-ui .btn.authorize {
        background-color: var(--color-post) !important;
        color: #fff !important;
        border-color: var(--color-post) !important;
        border-radius: var(--radius-sm);
      }

      .swagger-ui .tab {
        color: var(--color-text-secondary) !important;
        font-weight: 600;
      }

      .swagger-ui .tab.active {
        border-color: var(--color-accent) !important;
        color: var(--color-accent) !important;
      }
    `,
  });
}