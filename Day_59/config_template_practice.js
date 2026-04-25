const baseTemplate = {
  appName: "sample-service",
  port: "${PORT}",
  apiUrl: "${API_URL}",
  environment: "${ENVIRONMENT}",
};

const environments = {
  development: {
    PORT: "3000",
    API_URL: "http://localhost:3000",
    ENVIRONMENT: "development",
  },
  production: {
    PORT: "8080",
    API_URL: "https://api.example.com",
    ENVIRONMENT: "production",
  },
};

function renderTemplate(template, values) {
  const rendered = {};

  for (const [key, value] of Object.entries(template)) {
    let finalValue = value;

    for (const [variable, replacement] of Object.entries(values)) {
      finalValue = finalValue.replace(`\${${variable}}`, replacement);
    }

    rendered[key] = finalValue;
  }

  return rendered;
}

function runPractice() {
  console.log("Configuration templating simulation\n");

  for (const [environmentName, values] of Object.entries(environments)) {
    const renderedConfig = renderTemplate(baseTemplate, values);
    console.log(`Rendered config for ${environmentName}:`);
    console.table(renderedConfig);
  }
}

runPractice();
