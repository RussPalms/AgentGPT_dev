import { createSelectors } from "./helpers";
import type { StateCreator } from "zustand";
import { create } from "zustand";
import type AutonomousAgent from "../../components/AutonomousAgent";

const initialAgentState = {
  agent: null,
  isAgentStopped: true,
};

interface AgentSlice {
  agent: AutonomousAgent | null;
  isAgentStopped: boolean;
  setIsAgentStopped: () => void;
  setAgent: (newAgent: AutonomousAgent | null) => void;
}

const createAgentSlice: StateCreator<AgentSlice> = (set, get) => {
  return {
    ...initialAgentState,
    setIsAgentStopped: () => {
      set((state) => ({
        isAgentStopped: !state.agent?.isRunning,
      }));
    },
    setAgent: (newAgent) => {
      console.log("newAgent: ", newAgent);
      set(() => ({
        agent: newAgent,
      }));
    },
  };
};

export const useAgentStore = createSelectors(
  create<AgentSlice>()((...a) => ({
    ...createAgentSlice(...a),
  }))
);