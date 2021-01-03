import { useMachine } from "react-robot"
import Modal from "react-modal"
import { confirmationFlow } from "./confirmationFlow"

const App = () => {
  const [current, send] = useMachine(confirmationFlow)

  return (
    <div>
      <h1>Modal Test</h1>
      Current state: {current.name}
      <button onClick={() => send("begin")}>Destroy your secret?</button>
      <Modal
        onRequestClose={() => send("cancel")}
        isOpen={current.name === "confirming" || current.name === "loading"}
      >
        Are you sure?
        <button
          onClick={() => send("cancel")}
          disabled={current.name === "loading"}
        >
          Cancel
        </button>
        <button
          onClick={() => send("confirm")}
          disabled={current.name === "loading"}
        >
          Yes
        </button>
      </Modal>
    </div>
  )
}

export { App }
