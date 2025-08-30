import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  RfqTracker,
  PoTracker,
} from "./types";

interface TrackerState {
  rfqs: RfqTracker[];
  pos: PoTracker[];
  setRfqs: (fn: (rfqs: RfqTracker[]) => RfqTracker[]) => void;
  setPos: (fn: (pos: PoTracker[]) => PoTracker[]) => void;
}

export const useTrackerStore = create<TrackerState>()(
  persist(
    (set) => ({
      rfqs: [],
      pos: [],
      setRfqs: (fn) => set((state) => ({ rfqs: fn(state.rfqs) })),
      setPos: (fn) => set((state) => ({ pos: fn(state.pos) })),
    }),
    { name: "tracker-store" }
  )
);
