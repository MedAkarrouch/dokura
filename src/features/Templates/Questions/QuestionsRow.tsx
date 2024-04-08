import { HiEye, HiPencil, HiTrash } from "react-icons/hi2"
import Menus from "../../../ui/Menus"
import Table from "../../../ui/Table"
import Modal from "../../../ui/Modal"
import { useNavigate } from "react-router-dom"
import ConfirmDeleteQuestion from "./ConfirmDeleteQuestion"

const QuestionsRow = ({ question }: { question: Question }) => {
  const navigate = useNavigate()
  return (
    <Table.Row id={`menus-row--${question.id}`}>
      <div></div>
      <div className="hideOverflow">{question.questionText}</div>
      <div className="hideOverflow">{question.description}</div>
      <Menus.Toggle id={String(question.id)} />
      <Menus.List id={String(question.id)}>
        {question.valueType.startsWith("checkbox") && (
          <Menus.Button
            icon={<HiEye />}
            onClick={() => navigate(`${question.id}`)}
          >
            See Choices
          </Menus.Button>
        )}
        <Menus.Button
          icon={<HiPencil />}
          onClick={() => navigate(`editQuestion/${question.id}`)}
        >
          Edit
        </Menus.Button>

        <Modal.Open opens={`delete-question-${question.id}`}>
          <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
        </Modal.Open>
      </Menus.List>

      <Modal.Window name={`delete-question-${question.id}`}>
        <ConfirmDeleteQuestion questionId={question.id} />
      </Modal.Window>
    </Table.Row>
  )
}

export default QuestionsRow
