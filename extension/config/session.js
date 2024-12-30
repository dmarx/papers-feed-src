// extension/config/session.js

// Default configuration values
const DEFAULT_CONFIG = {
    idleThresholdMinutes: 5,
    minSessionDurationSeconds: 30,
    // Adding more granular control
    requireContinuousActivity: true,  // If true, resets timer on idle
    logPartialSessions: false,        // If true, logs sessions even if under minimum duration
    activityUpdateIntervalSeconds: 1  // How often to update active time
};

// Load session configuration from storage
async function loadSessionConfig() {
    const items = await chrome.storage.sync.get('sessionConfig');
    return { ...DEFAULT_CONFIG, ...items.sessionConfig };
}

// Save session configuration to storage
async function saveSessionConfig(config) {
    await chrome.storage.sync.set({
        sessionConfig: {
            idleThresholdMinutes: Number(config.idleThresholdMinutes),
            minSessionDurationSeconds: Number(config.minSessionDurationSeconds),
            requireContinuousActivity: Boolean(config.requireContinuousActivity),
            logPartialSessions: Boolean(config.logPartialSessions),
            activityUpdateIntervalSeconds: Number(config.activityUpdateIntervalSeconds)
        }
    });
}

// Convert configuration to milliseconds for internal use
function getConfigurationInMs(config) {
    return {
        idleThreshold: config.idleThresholdMinutes * 60 * 1000,
        minSessionDuration: config.minSessionDurationSeconds * 1000,
        activityUpdateInterval: config.activityUpdateIntervalSeconds * 1000,
        requireContinuousActivity: config.requireContinuousActivity,
        logPartialSessions: config.logPartialSessions
    };
}

export { loadSessionConfig, saveSessionConfig, getConfigurationInMs, DEFAULT_CONFIG };