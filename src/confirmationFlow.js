import { createMachine, state, transition, invoke, reduce } from "robot3"

const deleteSomething = async () => {
  return new Promise((resolve) => {
    console.log("Beginning deletion...")
    setTimeout(() => {
      console.log("Done deleting")
      resolve()
    }, 1000)
  })
}

const confirmationFlow = createMachine({
  initial: state(transition("begin", "confirming")),
  confirming: state(
    transition("confirm", "loading"),
    transition("cancel", "initial")
  ),
  loading: invoke(
    deleteSomething,
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
