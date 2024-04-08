import Menus from "../../../ui/Menus"
import Table from "../../../ui/Table"
import { useTemplate } from "../useTemplate"
import QuestionsRow from "./QuestionsRow"

const QuestionsTable = () => {
  const { template } = useTemplate()
  const questions = template!.questions.sort((a, b) => a.id - b.id)
  return (
    <Menus>
      <Table columns="1.5rem 1fr 1fr 3rem">
        <Table.Header>
          <div>#</div>
          <div>Question</div>
          <div>Description</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={questions}
          render={(question) => (
            <QuestionsRow key={question.id} question={question} />
          )}
        />
      </Table>
    </Menus>
  )
}

export default QuestionsTable
