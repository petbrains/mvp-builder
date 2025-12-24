/**
 * Route Generator Module
 *
 * Build-time route generation using date-based seeding for deterministic
 * daily venue selection across 4 food groups and 4 time slots.
 *
 * AICODE-NOTE: Entry point re-exports all public types and constants.
 * Implementation files (validator.ts, generator.ts) will be added in Phase 2.
 */

// Types
export type {
  VenueData,
  SlotPool,
  GroupData,
  SourceData,
  Venue,
  GroupRoute,
  DailyRoutes,
  Slot,
  GroupName,
} from "./types";

// Constants
export {
  GROUP_NAMES,
  SLOTS,
  SLOT_LABELS,
  MIN_VENUES_PER_SLOT,
  MAX_VENUES_PER_SLOT,
  TOTAL_VENUES,
  TOTAL_DAILY_VENUES,
  DATE_SEED_FORMAT,
} from "./constants";

// AICODE-TODO: Export validateSourceData from ./validator after IMPL-001
// AICODE-TODO: Export generateDailyRoutes from ./generator after IMPL-006
