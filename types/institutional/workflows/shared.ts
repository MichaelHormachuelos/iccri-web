/**
 * Shared shape for every workflow in this directory. A
 * WorkflowDefinition is pure data — a declared graph of valid
 * transitions and the architectural rules governing them. Nothing
 * here executes a transition, persists a state, or calls anything.
 * A future runtime (Infrastructure layer, explicitly out of scope
 * for this milestone) would read one of these definitions to decide
 * whether a proposed transition is valid; none exists yet.
 */

export interface WorkflowTransition<TState extends string> {
  from: TState;
  to: TState;
  /** The architectural rule that makes this transition valid — documentation, not an enforced check. */
  rule: string;
}

export interface WorkflowDefinition<TState extends string> {
  name: string;
  states: readonly TState[];
  initialState: TState;
  /** States from which no further transition is defined — the workflow's natural endpoints. */
  terminalStates: readonly TState[];
  transitions: readonly WorkflowTransition<TState>[];
  /** Rules that hold across the whole workflow, not tied to one transition. */
  invariants: readonly string[];
}
