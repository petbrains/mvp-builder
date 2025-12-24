/**
 * Route Generator Constants
 * AICODE-NOTE: Constants derived from data-model.md and PRD specifications
 */

import type { GroupName, Slot } from "./types";

/**
 * Fixed order of food groups.
 * Source: PRD.Constants
 */
export const GROUP_NAMES: readonly GroupName[] = [
  "Pan-Asian Flavors",
  "Urban Hideaways",
  "Sweet Bangkok",
  "Local Thai Experience",
] as const;

/**
 * Time slot order.
 * Source: PRD.Constants
 */
export const SLOTS: readonly Slot[] = [
  "Morning",
  "Lunch",
  "Afternoon",
  "Evening",
] as const;

/**
 * Display labels with emojis for each time slot.
 * Source: PRD.Constants
 */
export const SLOT_LABELS: Readonly<Record<Slot, string>> = {
  Morning: "Morning",
  Lunch: "Lunch",
  Afternoon: "Afternoon",
  Evening: "Evening",
} as const;

/**
 * Minimum venues required per slot (>=).
 * Source: PRD.Venue Pools
 */
export const MIN_VENUES_PER_SLOT = 3;

/**
 * Maximum venues allowed per slot (<=).
 * Source: PRD.Venue Pools
 */
export const MAX_VENUES_PER_SLOT = 5;

/**
 * Expected total venues in database.
 * Source: PRD.Technical Constraints
 */
export const TOTAL_VENUES = 72;

/**
 * Output venues count (4 groups x 4 slots).
 * Source: FR-006
 */
export const TOTAL_DAILY_VENUES = 16;

/**
 * Format for deterministic seed string.
 * Source: FR-004
 */
export const DATE_SEED_FORMAT = "YYYY-MM-DD";
