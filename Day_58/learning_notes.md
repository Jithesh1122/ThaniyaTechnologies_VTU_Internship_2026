# Learning Notes: Deployment Strategies and Safe Rollouts

## Why This Topic Matters
After code passes CI, the next challenge is releasing it safely. A deployment is not only about getting the new version online. It is also about minimizing user impact if something goes wrong.

Without strategy, a release can:
- Affect all users at once
- Make rollback harder
- Turn one defect into a full outage

This is why controlled rollout strategies are important.

## All-at-Once Deployment
In a direct deployment, the old version is replaced by the new version immediately.

Advantages:
- Simple to understand
- Fast to execute

Risks:
- All users are affected if the release is unhealthy
- Rollback urgency becomes higher

## Blue-Green Deployment
Blue-green deployment keeps two environments:
- One currently serving production traffic
- One prepared with the new version

Traffic switches from the old environment to the new one only when the new version is ready.

Benefits:
- Clear separation between old and new version
- Fast rollback by switching traffic back

## Canary Deployment
Canary deployment introduces the new version gradually to a smaller percentage of users.

Typical idea:
- Send a small portion of traffic to the new version
- Observe health and error behavior
- Increase traffic only if the release stays healthy

Benefits:
- Reduces blast radius
- Gives early warning before full rollout

## Health Checks and Rollback
A release should be observed after rollout begins. Important signals include:
- Error rate
- Response latency
- Health endpoint status
- Service stability

If those signals become unhealthy, rollback should happen quickly and clearly.

## Design Lessons
- A successful build does not guarantee a safe production release
- Deployment strategy reduces operational risk
- Gradual rollout provides observation time
- Rollback planning is part of deployment design
- Safety and speed must be balanced intentionally

## Practical Reflection
The practical exercises showed that deployment is not just a final button press. It is a decision process involving traffic control, health validation, and safe recovery if the new version behaves badly.
