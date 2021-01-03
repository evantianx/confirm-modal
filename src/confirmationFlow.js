import { createMachine, state, transition, invoke, reduce } from "robot3"

const confirmationFlow = createMachine({
  initial: state(
    transition(
      "begin",
      "confirming",
      reduce((context, event) => ({
        ...context,
        onCommit: event.onCommit,
      }))
    )
  ),
  confirming: state(
    transition("confirm", "loading"),
    transition("cancel", "initial")
  ),
  loading: invoke(
    (context, event) => context.onCommit(context, event),
    transition("done", "initial"),
    transition(
      "error",
      "confirming",
      reduce((context, event) => ({
        ...context,
        error: event.error,
      }))
    )
  ),
})

export { confirmationFlow }
