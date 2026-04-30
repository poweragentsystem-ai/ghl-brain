# Surface Queue — questions for Telegram / Mobile / Chat Claude

Code Claude can't directly query Telegram / Mobile / Chat Claude (those are Anthropic-hosted apps with no repo access). When Code Claude needs context that lives in those surfaces — "what did Renée tell Telegram about voice picks?" / "did Mobile capture a phone number for the new lead?" — drop the question here.

## Protocol

```
surface-queue/
  pending/   ← questions waiting for an answer
  done/      ← answered questions with the response captured
```

### Writing a question (Code Claude)
1. Create `pending/NNN-question.md`. Include:
   - Which surface to ask (telegram / mobile / chat)
   - Exactly what to ask
   - Why we need it
2. Tell Renée: "Forward this question to Telegram (or whichever): <one-line>" — she pastes, the surface replies, she pastes back.

### Answering a question (Renée or whichever Claude is on the other side)
1. Reply with the surface's answer.
2. Move file to `done/NNN-question.md` with the answer appended.

### Future bridge (not built yet)
If we ever ship a "log to ghl-brain" web endpoint that Telegram / Mobile / Chat can hit via WebFetch, those surfaces can answer directly without Renée pasting. Until then, she's the relay — but it's a one-paste relay, not a "go figure this out yourself" ask.
