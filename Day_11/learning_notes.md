# Learning Notes

## Topic Focus
Alerting and anomaly detection as an extension of backend observability.

## Concepts Learned
1. Alert rule design:
- Define clear thresholds for error rate and latency spikes.
- Use realistic bounds based on service behavior.

2. Signal quality control:
- Avoid noisy alerts by using cooldown windows.
- Deduplicate repeated alerts for the same incident pattern.

3. Severity mapping:
- Warning level for early degradation.
- Critical level for sustained failures or severe latency.

4. Incident context:
- Include metric snapshots, affected route, and error category.
- Incident summaries should be actionable for faster triage.

5. Operational continuity:
- Alerting should complement logs and metrics, not replace them.
- Monitoring quality depends on consistent telemetry inputs.

## Practical Completion
- Implemented:
  - anomaly threshold checks
  - cooldown-based alert suppression
  - deduplicated incident keying
  - incident summary output with severity labels

## Outcome
Improved ability to convert backend telemetry into actionable operational alerts for production-like reliability workflows.
