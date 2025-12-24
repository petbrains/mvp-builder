/**
 * Route Generator Type Definitions
 * AICODE-NOTE: Types derived from data-model.md entities
 */

/**
 * Individual venue from source JSON.
 * Contains all venue details except name (which is the object key).
 */
export interface VenueData {
  /** Venue category (e.g., "Chinese Restaurant") */
  primaryType: string;
  /** 2-3 sentence cultural narrative */
  story: string;
  /** Google Places rating (1.0-5.0) */
  rating: number;
  /** Pre-built Google Maps navigation URL */
  googleMapsUri: string;
}

/**
 * Collection of venues available for a time slot.
 * Keyed by venue name, contains 3-5 venues per slot.
 */
export interface SlotPool {
  [venueName: string]: VenueData;
}

/**
 * Single food group containing description and time slots.
 */
export interface GroupData {
  /** Describes the group vibe */
  group_description: string;
  /** Morning slot venues (3-5 venues) */
  Morning: SlotPool;
  /** Lunch slot venues (3-5 venues) */
  Lunch: SlotPool;
  /** Afternoon slot venues (3-5 venues) */
  Afternoon: SlotPool;
  /** Evening slot venues (3-5 venues) */
  Evening: SlotPool;
}

/**
 * Structure of bantadthong_places.json input file.
 * Contains 4 food groups, each with 4 time slots.
 */
export interface SourceData {
  [groupName: string]: GroupData;
}

/**
 * Runtime venue object with name extracted from source key.
 * Used in the generated routes output.
 */
export interface Venue {
  /** Venue name (extracted from source object key) */
  name: string;
  /** Venue category */
  primaryType: string;
  /** Cultural narrative */
  story: string;
  /** Google Places rating */
  rating: number;
  /** Google Maps navigation URL */
  googleMapsUri: string;
}

/**
 * Selected venues for one group's daily route.
 * Contains exactly one venue per time slot.
 */
export interface GroupRoute {
  /** Group description copied from source GroupData */
  groupDescription: string;
  /** Selected venue for morning slot */
  Morning: Venue;
  /** Selected venue for lunch slot */
  Lunch: Venue;
  /** Selected venue for afternoon slot */
  Afternoon: Venue;
  /** Selected venue for evening slot */
  Evening: Venue;
}

/**
 * Generated output containing selected venues for all groups.
 * Total of 16 venues (4 groups x 4 slots).
 */
export interface DailyRoutes {
  [groupName: string]: GroupRoute;
}

/**
 * Time slot type literal union.
 */
export type Slot = "Morning" | "Lunch" | "Afternoon" | "Evening";

/**
 * Group name type literal union.
 */
export type GroupName =
  | "Pan-Asian Flavors"
  | "Urban Hideaways"
  | "Sweet Bangkok"
  | "Local Thai Experience";
