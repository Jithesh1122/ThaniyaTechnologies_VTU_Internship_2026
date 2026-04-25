const environmentConfigs = {
  development: {
    replicas: 1,
    logLevel: "debug",
    cacheEnabled: false,
  },
  staging: {
    replicas: 2,
    logLevel: "info",
    cacheEnabled: true,
  },
  production: {
    replicas: 4,
    logLevel: "warn",
    cacheEnabled: true,
  },
};

function compareEnvironments(configs) {
  console.log("Environment comparison simulation\n");

  for (const [name, config] of Object.entries(configs)) {
    console.log(`Environment: ${name}`);
    console.table(config);
  }
}

compareEnvironments(environmentConfigs);
