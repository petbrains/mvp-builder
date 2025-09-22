---
name: prompt
description: Optimize user prompt
allowed-tools: prompt_guide
argument-hints: [user_input]
---

# Instructions

Based on [user_input], compose a clearly optimized prompt according to the instructions in prompt_guide and return the result to the user. If something is unclear, ask the user questions until they confirm that your response is correct.

**Tools Usage:**
- See @.claude/tools/prompt.md for building optimized prompts
